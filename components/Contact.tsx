
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear the error for the field being edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = { name: '', email: '', subject: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, you would handle form submission here (e.g., API call)
      setStatus('Thank you for your message! We will get back to you shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900">Get In Touch</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you.
          </p>
          <div className="mt-4 mx-auto w-24 h-1 bg-amber-500 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-slate-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Contact Information</h3>
            <div className="space-y-4 text-slate-600">
              <p><strong>Address:</strong> 123 Construction Ave, Metropolis, USA 10101</p>
              <p><strong>Phone:</strong> (123) 456-7890</p>
              <p><strong>Email:</strong> contact@constructpro.com</p>
              <p><strong>Business Hours:</strong> Mon-Fri, 8:00 AM - 5:00 PM</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-amber-500'}`} />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-amber-500'}`} />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-amber-500'}`} />
              {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
            </div>
            <div>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows={5} className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-amber-500'}`}></textarea>
              {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
            </div>
            <button type="submit" className="w-full bg-amber-500 text-white font-bold py-3 px-6 rounded-md hover:bg-amber-600 transition-colors duration-300">Send Message</button>
            {status && <p className="text-center mt-4 text-green-600">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
