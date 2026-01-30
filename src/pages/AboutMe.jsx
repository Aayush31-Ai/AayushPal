import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextType from "../components/TextType";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Glow effect configurations
const glows = [
  "-top-10 -left-10 w-[100px] h-[100px] md:w-[250px] md:h-[250px] opacity-20 blur-[120px]",
  "bottom-10 right-10 w-[150px] h-[150px] md:w-[450px] md:h-[450px] opacity-10 blur-[100px] translate-x-1/2 translate-y-1/2",
];

const boxDetail = [
  { title: "Experience", description: "1+ Year" },
  { title: "Speciality", description: "Full Stack with AI integration" },
  { title: "Focus", description: "Performance and Deployment" },
];

// Base classes for the info boxes
const box = "border border-gray-600 py-4 px-6 rounded-md h-28 w-64 max-w-xs flex flex-col justify-center items-center bg-gray-700/10 hover:bg-gray-700/40 transition-all duration-300";

const AboutMe = () => {
  // Create refs for elements to animate
  const profileImageRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const textTypeRef = useRef(null);
  const techIconsRef = useRef(null);
  const boxesContainerRef = useRef(null);
  const boxRefs = useRef([]); // Array to hold refs for each box

  useEffect(() => {
    // Animation for profile image
    gsap.fromTo(
      profileImageRef.current,
      { opacity: 0, scale: 0.8, y: 50 }, // Initial state
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: profileImageRef.current, // Element that triggers the animation
          start: "top 80%", // Animation starts when the top of the element hits 80% of the viewport height
          end: "top 60%",
          toggleActions: "play none none none", // Play on enter, reverse on leave
        },
      }
    );

    // Animation for name
    gsap.fromTo(
      nameRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: nameRef.current,
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation for title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation for description
    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation for TextType component container
    gsap.fromTo(
      textTypeRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textTypeRef.current,
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animation for tech icons container
    gsap.fromTo(
      techIconsRef.current,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: techIconsRef.current,
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation for the boxes container (as a whole)
    gsap.fromTo(
      boxesContainerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: boxesContainerRef.current,
          start: "top 85%",
          end: "top 65%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation for individual boxes WITH stagger
    gsap.fromTo(
      boxRefs.current, // Target the array of box elements
      { opacity: 0, y: 20, scale: 0.95 }, // Initial state for each box
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)", // Bouncy effect
        stagger: 0.1, // Delay between each box animation
        scrollTrigger: {
          trigger: boxesContainerRef.current, // Trigger based on the container
          start: "top 85%",
          end: "top 65%",
          toggleActions: "play none none none",
        },
      }
    );

    // Cleanup ScrollTrigger instances on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div
      id="about"
      className="min-h-screen w-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center relative bg-black text-white overflow-hidden"
    >
      {/* Background Glows Container */}
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (
          <div
            key={i}
            className={`absolute ${c} rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 animate-pulse`}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-4">
        {/* Main Flex Container (Stacks on small screens, flexes on medium+) */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Profile Image Section - Now on the left (or top on mobile) */}
          <div className="flex-shrink-0" ref={profileImageRef}> {/* Added ref */}
            <div
              className="w-48 h-48 sm:w-56 mt-15 md:mt-3 sm:h-56 md:w-64 md:h-64 rounded-lg overflow-hidden border-4 border-indigo-400/50"
              style={{ boxShadow: "0 0 25px rgba(139, 92, 246, 0.8)" }}
            >
              <img
                src="./aayush.PNG" // Ensure this path is correct
                alt="Aayush"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content Section - Now on the right (or bottom on mobile) */}
          <div className="flex-1 text-center md:text-left">
            <h1 ref={nameRef} className="text-3xl sm:text-4xl font-bold text-indigo-400 mt-6 md:mt-0"> {/* Added ref */}
              Aayush Pal
            </h1>
            <div ref={titleRef} className="relative my-6 inline-block md:block"> {/* Added ref */}
              <div className="flex justify-center md:justify-start">
                <span className="text-xl sm:text-2xl border-b-2 border-indigo-500 pb-1">
                  Full Stack Developer
                </span>
              </div>
            </div>

            <p ref={descriptionRef} className="text-sm sm:text-base md:text-lg leading-relaxed text-justify text-zinc-400 max-w-3xl mx-auto md:mx-0 px-2">
             Hi, I’m Aayush Pal, a 19-year-old Full Stack Web Developer, Hackathon Winner, and B.Sc. Computer Science student from India.

I enjoy building web applications based on unique, problem-first ideas that solve real-life challenges and genuinely make people’s lives easier. I actively integrate AI-powered features to turn innovative concepts into practical, scalable solutions.

I also have experience leading hackathon teams, where I focus on idea validation, solution architecture, and fast, effective execution under tight deadlines.

My approach is simple: think differently, build smart, and create products that actually matter.
            </p>

            {/* TextType Component Section */}
            <div ref={textTypeRef} className="flex justify-center md:justify-start my-8"> {/* Added ref */}
              <TextType
                text={["My Tech Stack", "My Skills"]}
                typingSpeed={100}
                pauseDuration={3000}
                showCursor={true}
                cursorCharacter="|"
                className={"text-2xl font-bold text-gray-300"}
              />
            </div>

            {/* Tech Icons Section */}
            <div ref={techIconsRef} className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 text-3xl sm:text-4xl px-4 mt-6">
              <i className="text-gray-400 devicon-javascript-plain hover:colored hover:text-yellow-300 transition-colors duration-300"></i>
              <i className="text-gray-400 devicon-tailwindcss-plain hover:text-blue-400 transition-colors duration-300"></i>
              <i className="text-gray-400 devicon-react-plain hover:text-blue-500 transition-colors duration-300"></i>
              <i className="text-gray-400 devicon-nextjs-plain hover:text-white transition-colors duration-300"></i>
              <i className="text-gray-400 devicon-express-original hover:text-white transition-colors duration-300"></i>
              <i className="text-gray-400 devicon-nodejs-plain-wordmark hover:text-green-400 transition-colors duration-300"></i>
              <i className="text-gray-400 devicon-mongodb-plain hover:text-green-400 transition-colors duration-300"></i>
              <i className="text-gray-400 devicon-docker-plain hover:text-blue-400 transition-colors duration-300"></i>
              <i className="text-gray-400 devicon-vercel-plain hover:text-white transition-colors duration-300"></i>
            </div>
          </div>
        </div>

        {/* Info Boxes Section - Below the main content block */}
        <div ref={boxesContainerRef} className="flex flex-wrap justify-center gap-6 sm:gap-8 my-10"> {/* Added ref to container */}
          {boxDetail.map((item, i) => (
            <div
              key={i}
              ref={(el) => (boxRefs.current[i] = el)} // Assign ref to each box element
              className={`${box} transform hover:scale-105`}
            >
              <span className="text-lg font-bold">{item.title}</span>
              <span className="text-slate-400 text-sm sm:text-base">{item.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Optional: Add Tailwind CSS keyframes for animations if not already defined in your CSS */}
      {/* Removed the previous Tailwind animation styles */}
    </div>
  );
};

export default AboutMe;