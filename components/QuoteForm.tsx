import React, { useState, FormEvent } from "react";
import { SITE_CONTENT } from "../content";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const toUrlSearchParams = (data: FormData): URLSearchParams => {
  const params = new URLSearchParams();
  params.append("name", data.name);
  params.append("email", data.email);
  params.append("subject", data.subject);
  params.append("message", data.message);
  return params;
};

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [errors, setErrors] = useState<FormErrors>({});

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})$/.test(
        formData.email
      )
    ) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    let apiUrl =
      process.env.REACT_APP_API_URL ||
      (process.env.NODE_ENV === "development"
        ? "http://localhost:8000/send_quote.php"
        : "https://benoit.ae/send_quote.php");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: toUrlSearchParams(formData).toString(),
      });

      const raw = await response.text();
      let data: any;
      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(`Server returned invalid response: ${raw}`);
      }

      if (response.ok && data.status === "success") {
        setSubmitStatus({
          type: "success",
          message:
            data.message || SITE_CONTENT.contact.form.successMessage,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send request");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : SITE_CONTENT.contact.form.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={SITE_CONTENT.contact.form.namePlaceholder}
          aria-label={SITE_CONTENT.contact.form.namePlaceholder}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
            errors.name
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-300 focus:ring-blue-500"
          }`}
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={SITE_CONTENT.contact.form.emailPlaceholder}
          aria-label={SITE_CONTENT.contact.form.emailPlaceholder}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
            errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-300 focus:ring-blue-500"
          }`}
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={SITE_CONTENT.contact.form.subjectPlaceholder}
          aria-label={SITE_CONTENT.contact.form.subjectPlaceholder}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
            errors.subject
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-300 focus:ring-blue-500"
          }`}
        />
        {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
      </div>

      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={SITE_CONTENT.contact.form.messagePlaceholder}
          aria-label={SITE_CONTENT.contact.form.messagePlaceholder}
          rows={5}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
            errors.message
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-300 focus:ring-blue-500"
          }`}
        />
        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-label={isSubmitting ? SITE_CONTENT.contact.form.submitButtonLoading : SITE_CONTENT.contact.form.submitButton}
        className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600 transition-fast focus-visible disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center h-[50px]"
      >
        {isSubmitting
          ? SITE_CONTENT.contact.form.submitButtonLoading
          : SITE_CONTENT.contact.form.submitButton}
      </button>

      {submitStatus.message && (
        <div
          className={`text-center p-4 rounded-md text-sm font-medium transition-opacity duration-300 ${
            submitStatus.type === "success" ? "bg-green-100 text-green-800" : ""
          } ${submitStatus.type === "error" ? "bg-red-100 text-red-800" : ""}`}
          role="alert"
          aria-live="polite"
        >
          {submitStatus.message}
        </div>
      )}
    </form>
  );
}
