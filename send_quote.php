<?php
// -------------------------
//  BenoitConstruction Quote Form
// -------------------------

// Debugging (disable in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set CORS & JSON headers
header("Access-Control-Allow-Origin: https://benoit.ae");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// -------------------------
// Load .env file manually
// -------------------------
$envPath = __DIR__ . '/../.env';
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            $_ENV[$key] = $value;
            putenv("$key=$value");
        }
    }
}

// Check if required environment variables are set
$requiredEnvVars = ['SMTP_HOST', 'SMTP_USERNAME', 'SMTP_PASSWORD', 'MAIL_FROM_ADDRESS', 'MAIL_TO_ADDRESS'];
foreach ($requiredEnvVars as $var) {
    if (!getenv($var)) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => "Environment variable $var is not set."]);
        exit;
    }
}

// -------------------------
// Load PHPMailer
// -------------------------
require __DIR__ . '/phpmailer/src/Exception.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// -------------------------
// Helper functions
// -------------------------
function sanitizeInput($data)
{
    return htmlspecialchars(stripslashes(trim($data)), ENT_QUOTES, 'UTF-8');
}

function isValidEmail($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// -------------------------
// Handle POST request
// -------------------------
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name    = sanitizeInput($_POST['name'] ?? '');
    $email   = sanitizeInput($_POST['email'] ?? '');
    $subject = sanitizeInput($_POST['subject'] ?? '');
    $message = sanitizeInput($_POST['message'] ?? '');

    // Validate input
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }

    if (!isValidEmail($email)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
        exit;
    }

    // -------------------------
    // Function to attempt sending
    // -------------------------
    function attemptSend($host, $port, $secure, $from, $toAddresses, $replyEmail, $replyName, $subject, $bodyHtml, $bodyAlt)
    {
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->SMTPDebug = 2; // verbose debug
            $mail->Debugoutput = 'error_log';

            $mail->Host       = $host;
            $mail->SMTPAuth   = true;
            $mail->Username   = getenv('SMTP_USERNAME');
            $mail->Password   = getenv('SMTP_PASSWORD');
            $mail->SMTPSecure = $secure;
            $mail->Port       = $port;

            // Allow self-signed certs
            $mail->SMTPOptions = [
                'ssl' => [
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true,
                ],
            ];

            // Recipients
            $mail->setFrom($from, 'Benoit Contracting Quote Request');
            foreach ($toAddresses as $to) {
                if (isValidEmail($to)) {
                    $mail->addAddress($to);
                }
            }

            if (isValidEmail($replyEmail)) {
                $mail->addReplyTo($replyEmail, $replyName);
            }

            // Content
            $mail->isHTML(true);
            $mail->Subject = "New Quote Request: $subject";
            $mail->Body    = $bodyHtml;
            $mail->AltBody = $bodyAlt;

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("SMTP attempt failed on $host:$port ($secure) - " . $e->getMessage());
            return false;
        }
    }

    $from = getenv('MAIL_FROM_ADDRESS');
    $toAddresses = array_map('trim', explode(',', getenv('MAIL_TO_ADDRESS')));

    $bodyHtml = "
        <h3>New Quote Request</h3>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Subject:</strong> $subject</p>
        <p><strong>Message:</strong><br/>" . nl2br($message) . "</p>
    ";
    $bodyAlt = "Name: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";

    // -------------------------
    // Try SSL/465 first, then TLS/587
    // -------------------------
    $success = attemptSend(
        getenv('SMTP_HOST'),
        465,
        PHPMailer::ENCRYPTION_SMTPS,
        $from,
        $toAddresses,
        $email,
        $name,
        $subject,
        $bodyHtml,
        $bodyAlt
    );

    if (!$success) {
        $success = attemptSend(
            getenv('SMTP_HOST'),
            587,
            PHPMailer::ENCRYPTION_STARTTLS,
            $from,
            $toAddresses,
            $email,
            $name,
            $subject,
            $bodyHtml,
            $bodyAlt
        );
    }

    if ($success) {
        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => 'Your quote request has been sent successfully.']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Mailer Error: Could not connect using either SSL:465 or TLS:587. Check error_log for details.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    error_log("Request Method: " . $_SERVER["REQUEST_METHOD"]);
}
