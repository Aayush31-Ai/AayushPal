import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

// Projects data with desktop/mobile images and backgrounds
const projectsData = [
  {
    title: "Ai Crypto App",
    imageDesktop: "./cryptoD.png",
    imageMobile: "./cryptoM.png",
    link: "https://crypto-app-sepia-eight.vercel.app/",
    bg: "#28256f",
  },
  {
    title: "One For All",
    imageDesktop: "./Chatapp.png",
    imageMobile: "./chatappM.png",
    link: "https://github.com/Aayush31-Ai/OneForAll",
    bg: "#104a4e",
  },
  {
    title: "Class Combat",
    imageDesktop: "./class-combat.png",
    imageMobile: "./class-combatM.png",
    link: "https://hack-crypt.vercel.app/",
    bg: "#6b4c9a",
    isHackathon: true,
  },
  {
    title: "AroundU",
    imageDesktop: "./around-u.png",
    imageMobile: "./around-uM.png",
    link: "https://around-u-iota.vercel.app/",
    bg: "#6eb4a3",
    isHackathon: true,
  },
];

export default function Project() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const linkRef = useRef(null);
  const imageContainersRef = useRef([]);

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
          scrub: 0.8,
          pin: true,
          onUpdate: (self) => {
            const rawIndex = self.progress * projectsData.length;
            let index = Math.min(Math.floor(rawIndex), projectsData.length - 1);
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
        if (!currentCard) return;

        // Animate background
        tl.to(
          sectionRef.current,
          { backgroundColor: proj.bg, duration: 1 },
          i
        );

        // Animate the current card
        tl.to(
          currentCard,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
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
  }, []);

  // Add CSS for scrollable images and hide scrollbar
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollable-image-container {
        overflow-y: auto;
        overflow-x: hidden;
        height: 100%;
        width: 100%;
        cursor: grab;
        transition: transform 0.3s ease;
      }
      
      .scrollable-image-container:active {
        cursor: grabbing;
      }
      
      .scrollable-image-container:hover {
        transform: translateY(-5px);
      }
      
      .scrollable-image-container::-webkit-scrollbar {
        width: 6px;
      }
      
      .scrollable-image-container::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
      }
      
      .scrollable-image-container::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .scrollable-image-container:hover::-webkit-scrollbar-thumb {
        opacity: 1;
      }
      
      .scrollable-image-container::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }
      
      /* Firefox */
      .scrollable-image-container {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
      }
      
      .full-height-image {
        width: 100%;
        height: auto;
        min-height: 100%;
        object-fit: contain;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-screen w-full flex flex-col items-center justify-center transition-colors duration-700"
      style={{ backgroundColor: projectsData[0].bg }}
    >
      {/* Styled and aligned "My Work" header */}
      <h3 className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white text-3xl sm:text-4xl font-bold tracking-wide z-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        My Work
      </h3>

      {/* Card Container */}
      <div className="relative w-full flex justify-center items-center h-[65vh] pt-16">
        {projectsData.map((project, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="absolute w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] h-full rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10"
          >
            {/* Hackathon Badge */}
            {project.isHackathon && (
              <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm border border-white/20 text-white px-3 py-1.5 rounded-lg font-medium text-xs shadow-lg flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Hackathon
              </div>
            )}
            
            {/* Scrollable Image Container */}
            <div 
              ref={(el) => (imageContainersRef.current[index] = el)}
              className="scrollable-image-container"
            >
              {/* Desktop Image - Hidden on small screens (md and below) */}
              <img
                src={project.imageDesktop}
                alt={`${project.title} - Desktop View`}
                className="full-height-image hidden md:block"
              />
              {/* Mobile Image - Shown on small screens (md and below) */}
              <img
                src={project.imageMobile}
                alt={`${project.title} - Mobile View`}
                className="full-height-image block md:hidden"
              />
            </div>

            {/* Scroll Hint Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex flex-col items-center">
                <span className="text-white/70 text-xs mb-1 animate-pulse">Scroll to explore</span>
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Info */}
      <div className="z-10 text-center mt-8">
        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold mb-4 mt-4"
        >
          {projectsData[0].title}
        </h2>
        <a
          ref={linkRef}
          href={projectsData[0].link}
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