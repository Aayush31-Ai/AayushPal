import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import {
  Play, Volume2, VolumeX, Sparkles,
  Linkedin, Github, Twitter, Instagram
} from "lucide-react";
import DecryptedText from "../components/DecryptedText";
import { CometCard } from "../components/ui/comet-card";

const NewContact = () => {
  const videoRef = useRef(null);
  const form = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (isPlaying) video.pause();
    else video.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const sendEmail = (data, e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID ,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Message sent successfully!");
          reset();
        },
        () => {
          alert("Something went wrong!");
        }
      );
  };

  return (
    <div id="contact" className="w-full min-h-screen relative overflow-hidden p-4 sm:p-6">
      {/* Title */}
      <div className="mt-7 mb-10 flex text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent md:gap-3 items-center gap-2">
        <Sparkles size={42} className="text-indigo-400" />
        <DecryptedText text="Contact Me" animateOn="view" revealDirection="center" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-6 sm:gap-10">
        {/* LEFT SIDE - VIDEO */}
        <CometCard className="flex flex-col backdrop-blur-md shadow-lg p-6 pb-8 rounded-xl">
          <div className="border border-indigo-400 bg-black rounded-xl flex items-center justify-center p-2">
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group aspect-video w-full"
              onClick={handleVideoClick}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-2xl"
                poster="./thumbnail.png"
                muted
              >
                <source src="./video.mp4" type="video/mp4" />
              </video>

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:scale-110">
                  <Play className="text-white w-16 h-16 opacity-80 hover:opacity-100 transition-transform transform hover:scale-110" />
                </div>
              )}

              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>

          <h1 className="text-white px-3 my-4 text-base">
            I look forward to the opportunity to collaborate with you. Please fill out the contact form, and I will get in touch with you shortly.
          </h1>

          <div className="flex justify-start items-center px-4 gap-4 text-gray-400">
            <a href="https://www.linkedin.com/in/aayush-pal-b01047358/" target="_blank"><Linkedin size={24} /></a>
            <a href="https://x.com/AayushPal225" target="_blank"><Twitter size={24} /></a>
            <a href="https://github.com/Aayush31-Ai" target="_blank"><Github size={24} /></a>
            <a href="https://www.instagram.com/itx_aayush.io/" target="_blank"><Instagram size={24} /></a>
            <a href="https://api.whatsapp.com/send/?phone=919930940153" target="_blank"><i className="fa-brands fa-whatsapp text-2xl"></i></a>
          </div>
        </CometCard>

        {/* RIGHT SIDE - FORM */}
        <div className="flex justify-end">
          <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-[450px]">
            <h2 className="text-2xl font-semibold text-white mb-4">Get in Touch</h2>

            <form ref={form} onSubmit={handleSubmit(sendEmail)} className="flex flex-col gap-4">
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your Name"
                className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}

              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                type="email"
                placeholder="Your Email"
                className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}

              <textarea
                {...register("message", { required: "Message is required" })}
                rows="4"
                placeholder="Your Message"
                className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none w-full"
              ></textarea>
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewContact;
