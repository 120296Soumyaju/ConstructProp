<?php
// -------------------------
//  BenoitConstruction Quote Form
// -------------------------

// Debugging (disable in production)
ini_set('display_errors', 1); // Remove or set to 0 in production
ini_set('display_startup_errors', 1); // Remove or set to 0 in production
error_reporting(E_ALL); // Set to E_ERROR | E_WARNING in production

// Set CORS & JSON headers
header("Access-Control-Allow-Origin: https://benoit.ae"); // Restrict in production
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
$envPath = __DIR__ . '/.env';
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

    $mail = new PHPMailer(true);

    try {
        // SMTP settings
        $mail->isSMTP();
        $mail->Host       = getenv('SMTP_HOST');
        $mail->SMTPAuth   = true;
        $mail->Username   = getenv('SMTP_USERNAME');
        $mail->Password   = getenv('SMTP_PASSWORD');
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Changed to SSL for port 465
        $mail->Port       = 465; // Changed to match your email settings

        // Recipients
        $from = getenv('MAIL_FROM_ADDRESS');
        $mail->setFrom($from, 'Benoit Contracting Quote Request');

        $toAddresses = explode(',', getenv('MAIL_TO_ADDRESS'));
        foreach ($toAddresses as $toAddress) {
            $toAddress = trim($toAddress);
            if (isValidEmail($toAddress)) {
                $mail->addAddress($toAddress);
            }
        }

        // Reply-to = customer
        if (isValidEmail($email)) {
            $mail->addReplyTo($email, $name);
        }

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Quote Request: $subject";
        $mail->Body    = "
            <h3>New Quote Request</h3>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Subject:</strong> $subject</p>
            <p><strong>Message:</strong><br/>" . nl2br($message) . "</p>
        ";
        $mail->AltBody = "Name: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";

        $mail->send();

        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => 'Your quote request has been sent successfully.']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'status'  => 'error',
            'message' => 'Mailer Error: ' . $mail->ErrorInfo . ' | Exception: ' . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    error_log("Request Method: " . $_SERVER["REQUEST_METHOD"]);
}