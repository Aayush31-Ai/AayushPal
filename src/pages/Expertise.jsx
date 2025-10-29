import React from 'react'
import MyParticles from '../components/MyParticles';
import Shuffle from "../components/Shuffle";
import { LayoutDashboard, Brain, Cloud, DatabaseZap } from 'lucide-react';
import { CardSpotlight } from '../components/ui/card-spotlight';

const Expertise = () => {
  const data = [
    {
      icon: <LayoutDashboard size={36} />,
      title: "Frontend",
      description:
        "Designing responsive, modern UIs with React and Tailwind, emphasizing speed, accessibility, performance, and seamless user experiences across platforms.",
    },
    {
      icon: <DatabaseZap size={36} />,
      title: "Backend",
      description:
        "Building scalable APIs using Node.js, Express, and MySQL, efficiently managing data, authentication, security, and performance for reliable backend services.",
    },
    {
      icon: <Brain size={36} />,
      title: "AI Integration",
      description:
        "Integrating AI into web apps using OpenAI, OpenRouter, and LangChain — adding intelligent features, automation, and real-time insights that make applications smarter and more human-like.",
    },
    {
      icon: <Cloud size={36} />,
      title: "DevOps",
      description:
        "Deploying apps on Vercel, Netlify, and Docker with focus on scalability, automation, and seamless developer-to-production workflows.",
    },
  ];

  return (
    <div id='expertise' className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-2 sm:px-6 md:px-10 py-16">
      {/* Background Particles */}
      <div className="absolute inset-0 z-10">
        <MyParticles color="#FFFFFF" count={30} speed={0.5} />
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full flex flex-col items-center">
        <Shuffle
          text="MY EXPERTISE"
          shuffleDirection="right"
          duration={0.5}
          animationMode="evenodd"
          shuffleTimes={1}
          ease="power3.out"
          stagger={0.03}
          threshold={0.1}
          triggerOnce={true}
          triggerOnHover={true}
          respectReducedMotion={true}
          loop={false}
          // style={{ fontFamily: "Lilita One" }}
          className="text-xl sm:text-5xl lg:text-8xl text-center px-3  font-bold text-gray-300 mb-10"
        />

        <div
          id="expertise"
          className="relative z-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-[95vw] lg:max-w-[1400px]"
        >
          {data.map((item, i) => (
            <CardSpotlight
              key={i}
              className="relative rounded-xl overflow-hidden bg-transparent p-6 sm:p-8 shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-transform duration-300 hover:scale-[1.04]"
            >
              <div className="relative z-40 space-y-3 text-left">
                <div className="text-indigo-400">{item.icon}</div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {item.title}
                </h1>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expertise;
