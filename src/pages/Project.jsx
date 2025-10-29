import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

// Updated projectsData with separate desktop and mobile images
const projectsData = [
  {
    title: "Ai Crypto App",
    imageDesktop: "./cryptoD.png", // Desktop image URL
    imageMobile: "./cryptoM.jpg", // Mobile image URL (replace with your actual mobile image)
    link: "https://crypto-app-sepia-eight.vercel.app/",
    bg: "#28256f",
  },
  {
    title: "Magma Frontend",
    imageDesktop: "./magmaD.png", // Desktop image URL
    imageMobile: "./magmaM.png", // Mobile image URL (replace with your actual mobile image)
    link: "https://magma-coral-omega.vercel.app/",
    bg: "#3a7fc0",
  },
  {
    title: "One For All",
    imageDesktop: "./Chatapp.png", // Desktop image URL
    imageMobile: "./chatappM.png", // Mobile image URL (replace with your actual mobile image)
    link: "https://github.com/Aayush31-Ai/OneForAll",
    bg: "#104a4e",
  },
];

export default function Project() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const linkRef = useRef(null);

  // Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({ smooth: true, lerp: 0.1, wheelMultiplier: 1.2 });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // GSAP Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state for cards
      gsap.set(cardsRef.current, { opacity: 0, scale: 0.9 });
      // Ensure the first card is visible initially
      gsap.set(cardsRef.current[0], { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${projectsData.length * 100}%`,
          scrub: 0.8, // Adjust for desired smoothness
          pin: true,
          // Add the onUpdate callback here
          onUpdate: (self) => {
             // Calculate the current index based on progress
            // progress goes from 0 to 1 over the entire duration
            // So index = progress * (number_of_projects), then rounded/clamped
            const rawIndex = self.progress * projectsData.length;
            // Clamp to prevent index going out of bounds
            let index = Math.min(Math.floor(rawIndex), projectsData.length - 1);
            // Ensure index is at least 0
            index = Math.max(index, 0);

            const currentProject = projectsData[index];
            if (currentProject && titleRef.current && linkRef.current) {
              titleRef.current.textContent = currentProject.title;
              linkRef.current.href = currentProject.link;
            }
          }
        },
      });

      projectsData.forEach((proj, i) => {
        const currentCard = cardsRef.current[i];
        if (!currentCard) return; // Safety check

        // Animate background
        tl.to(
          sectionRef.current,
          { backgroundColor: proj.bg, duration: 1 }, // Duration can be longer for smoother visual transition
          i
        );

        // Animate the current card
        tl.to(
          currentCard,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5, // Keep card animation fast
            ease: "power2.out",
            // Remove onUpdate from here
          },
          i
        );

        // Hide other cards
        cardsRef.current.forEach((card, idx) => {
          if (idx !== i && card) {
            tl.to(card, { opacity: 0, scale: 0.9, duration: 0.5 }, i);
          }
        });
      });
    });

    return () => ctx.revert();
  }, []); // Keep [] dependency

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-screen w-full flex flex-col items-center justify-center transition-colors duration-700" // Keep CSS transition for bg color if desired, or remove if GSAP handles it smoothly
      style={{ backgroundColor: projectsData[0].bg }}
    >
      {/* Styled and aligned "My Work" header */}
      <h3 className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white text-3xl sm:text-4xl font-bold tracking-wide z-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        My Work
      </h3>

      {/* Card Container - Adjust height if needed, ensure it doesn't overlap header */}
      <div className="relative w-full flex justify-center items-center h-[65vh] pt-16"> {/* Added pt-16 to create space from the top */}
        {projectsData.map((project, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="absolute w-[90%] sm:w-[80%]   md:w-[70%] lg:w-[60%] h-full rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10"
          >
            {/* Desktop Image - Hidden on small screens (md and below) */}
            <img
              src={project.imageDesktop}
              alt={`${project.title} - Desktop View`}
              className="w-full h-full object-cover hidden md:block" // Hidden on mobile (sm and below), shown on medium (md) and larger
            />
            {/* Mobile Image - Shown on small screens (md and below) */}
            <img
              src={project.imageMobile}
              alt={`${project.title} - Mobile View`}
              className="w-full h-full object-cover block md:hidden" // Shown on mobile (sm and below), hidden on medium (md) and larger
            />
          </div>
        ))}
      </div>

      {/* Project Info */}
      <div className="z-10 text-center mt-8">
        {/* Added margin-top to the title */}
        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold mb-4 mt-4"
        >
          {projectsData[0].title} {/* Initial value */}
        </h2>
        <a
          ref={linkRef}
          href={projectsData[0].link} // Initial value
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          View Project
        </a>
      </div>
    </section>
  );
}