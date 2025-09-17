import React, { useState, FormEvent } from "react";
import { SITE_CONTENT } from "../content";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: FormData = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})$/.test(
        formData.email
      )
    ) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isLoading) return;

    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const apiUrl =
        process.env.REACT_APP_API_URL || // Prefer env variable
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000/send_quote.php"
          : "https://benoit.ae/send_quote.php";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData as any).toString(), // Replace with explicit type
      });

      const raw = await response.text();
      let data;

      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(`Server returned invalid JSON: ${raw}`);
      }

      if (response.ok && data.status === "success") {
        setStatus({
          type: "success",
          message: data.message || SITE_CONTENT.contact.form.successMessage,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send request");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Network error or server unavailable. Please try again later.",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setStatus({ type: null, message: "" });
      }, 5000); // Consider making this configurable
    }
  };

  return (
    <section id="contact" className="py-20 bg-white fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900">
            {SITE_CONTENT.contact.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto slide-up">
            {SITE_CONTENT.contact.subtitle}
          </p>
          <div className="mt-4 mx-auto w-24 h-1 bg-blue-500 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-slate-50 p-8 rounded-lg slide-up">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              {SITE_CONTENT.contact.info.title}
            </h3>
            <div className="space-y-4 text-slate-600">
              <p>
                <strong>{SITE_CONTENT.contact.info.addressLabel}</strong>{" "}
                {SITE_CONTENT.contact.info.address.full}
              </p>
              <p>
                <strong>{SITE_CONTENT.contact.info.phoneLabel}</strong>{" "}
                <a
                  href={`tel:${SITE_CONTENT.contact.info.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {SITE_CONTENT.contact.info.phone}
                </a>
              </p>
              <p>
                <strong>{SITE_CONTENT.contact.info.emailLabel}</strong>{" "}
                <a
                  href={`mailto:${SITE_CONTENT.contact.info.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {SITE_CONTENT.contact.info.email}
                </a>
              </p>
              <p>
                <strong>{SITE_CONTENT.contact.info.websiteLabel}</strong>{" "}
                <a
                  href={SITE_CONTENT.contact.info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {SITE_CONTENT.contact.info.website}
                </a>
              </p>
              <p>
                <strong>{SITE_CONTENT.contact.info.hoursLabel}</strong>{" "}
                {SITE_CONTENT.contact.info.hours}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 slide-up"
            noValidate
          >
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={SITE_CONTENT.contact.form.namePlaceholder}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:ring-blue-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={SITE_CONTENT.contact.form.emailPlaceholder}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={SITE_CONTENT.contact.form.subjectPlaceholder}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                  errors.subject
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:ring-blue-500"
                }`}
              />
              {errors.subject && (
                <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
              )}
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={SITE_CONTENT.contact.form.messagePlaceholder}
                rows={5}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                  errors.message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:ring-blue-500"
                }`}
              ></textarea>
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600 transition-fast focus-visible disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center h-[50px]"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {SITE_CONTENT.contact.form.submitButtonLoading}
                </>
              ) : (
                SITE_CONTENT.contact.form.submitButton
              )}
            </button>
            {status.message && (
              <div
                className={`text-center p-4 rounded-md text-sm font-medium transition-opacity duration-300 ${
                  status.type === "success" ? "bg-green-100 text-green-800" : ""
                } ${status.type === "error" ? "bg-red-100 text-red-800" : ""}`}
                role="alert"
              >
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
