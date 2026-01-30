import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Sparkles,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Mail,
  Send,
  MapPin,
  
  Phone,
  CheckCircle2,
} from "lucide-react";
import DecryptedText from "../components/DecryptedText";

const NewContact = () => {
  const form = useRef();
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const sendEmail = async (data) => {
    setErrorMsg("");

    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/contact`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to send message');
      }

      setShowSuccess(true);
      reset();
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      console.error("Email send failed:", err);
      setErrorMsg(err.message || "Could not send the message. Please try again in a moment.");
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen px-4 sm:px-6 py-20 flex items-center justify-center overflow-hidden"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative w-full max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <Sparkles className="text-purple-400" size={36} />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities.
            Let's create something amazing together.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <SocialLink
              href="https://www.linkedin.com/in/aayush-pal-b01047358/"
              icon={<Linkedin size={20} />}
              label="LinkedIn"
            />
            <SocialLink
              href="https://github.com/Aayush31-Ai"
              icon={<Github size={20} />}
              label="GitHub"
            />
            <SocialLink
              href="https://x.com/AayushPal225"
              icon={<Twitter size={20} />}
              label="Twitter"
            />
            <SocialLink
              href="https://www.instagram.com/itx_aayush.io/"
              icon={<Instagram size={20} />}
              label="Instagram"
            />
            <SocialLink
              href="https://api.whatsapp.com/send/?phone=919930940153"
              icon={<i className="fa-brands fa-whatsapp text-lg"></i>}
              label="Phone"
            />
            <SocialLink
              href="mailto:aayush@example.com"
              icon={<Mail size={20} />}
              label="Email"
            />
          </div>
        </div>

        {/* FORM - PREMIUM */}
        {/* FORM - CLEAN & VISIBLE */}
<div className="relative max-w-2xl mx-auto">
  <div className="bg-[#0f0f1a] border border-white/20 p-8 md:p-10 rounded-2xl shadow-2xl">
    
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold text-white">
        Send a Message
      </h2>
      <Send className="text-purple-400" size={26} />
    </div>

    {showSuccess && (
      <div className="mb-4 p-4 bg-green-600/20 border border-green-500 rounded-lg flex items-center gap-3">
        <CheckCircle2 className="text-green-400" size={22} />
        <span className="text-green-300 font-medium">
          Message sent successfully!
        </span>
      </div>
    )}

    {errorMsg && (
      <div className="mb-4 p-4 bg-red-600/20 border border-red-500 rounded-lg text-red-200 text-sm">
        {errorMsg}
      </div>
    )}

    <form
      ref={form}
      onSubmit={handleSubmit(sendEmail)}
      className="flex flex-col gap-6"
    >
      <InputField
        label="Full Name"
        placeholder="Your Name"
        error={errors.name?.message}
        register={register("name", { required: "Name is required" })}
      />

      <InputField
        type="email"
        label="Email Address"
        placeholder="your.email@example.com"
        error={errors.email?.message}
        register={register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email",
          },
        })}
      />

      <div className="space-y-2">
        <label className="text-white/90 text-sm font-medium">
          Your Message
        </label>
        <textarea
          {...register("message", { required: "Message is required" })}
          rows="5"
          placeholder="Tell me about your project or idea..."
          className="w-full p-4 rounded-lg bg-[#151528] border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
        {errors.message && (
          <p className="text-red-400 text-sm">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  </div>
</div>

      </div>
    </section>
  );
};

/* Premium Reusable Components */

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
    title={label}
  >
    <div className="text-gray-300 group-hover:text-white transition-colors">
      {icon}
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:to-blue-500/20 rounded-xl transition-all duration-300"></div>
  </a>
);

const InputField = ({ type = "text", placeholder, register, error, label }) => (
  <div className="space-y-2">
    <label className="text-white/80 text-sm font-medium">{label}</label>
    <input
      {...register}
      type={type}
      placeholder={placeholder}
      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
    />
    {error && (
      <p className="text-red-400 text-sm flex items-center gap-2">
        <span>⚠</span>
        {error}
      </p>
    )}
  </div>
);

export default NewContact;
