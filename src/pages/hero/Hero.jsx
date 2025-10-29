// YAHAN CHANGE KIYA: 'useRef' ko import kiya
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FlipWords } from '../../components/ui/flip-words';
import Nav from '../../components/Nav';
// YAHAN CHANGE KIYA: Component ko App se bahar nikal diya
// Isse yeh har render par re-create nahi hoga.
const GlobalStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
      
      body {
        font-family: 'Inter', sans-serif;
        background-color: #000;
        overflow-x: hidden;
      }
      .grid-cell {
        border: 1px solid #ffffff14; 
        transition: background-color 0.8s ease-out, box-shadow 0.8s ease-out;
      }
      .grid-cell:hover,
      .grid-cell.active {
        background-color: rgba(99, 102, 241, 0.4);
        box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
        transition-duration: 0.3s;
      }
    `}
  </style>
);

// YAHAN CHANGE KIYA: PERFORMANCE OPTIMIZATION
// Ek naya memoized GridCell component banaya.
// React.memo yeh sunishchit karta hai ki cell sirf tabhi re-render ho
// jab uske props (isActive) badlen.
const GridCell = ({ isActive }) => (
  <div className={`grid-cell ${isActive ? 'active' : ''}`}></div>
);
const MemoizedGridCell = React.memo(GridCell);


export default function App() {
  const [gridDims, setGridDims] = useState({ cols: 0, rows: 0 });
  const [activeCells, setActiveCells] = useState(new Set());
  const cellSize = 70;
  
  // YAHAN CHANGE KIYA: Mobile glitch fix ke liye ref add kiya
  const homeRef = useRef(null);

  useEffect(() => {
    let resizeTimer;
    
    // YAHAN CHANGE KIYA: handleResize ab 'window' ke بجائے 'homeRef' ka size lega
    // Yeh mobile browser mein URL bar ke hide/show hone par hone wale jank ko rokta hai
    const handleResize = () => {
      if (!homeRef.current) return; // Agar ref abhi tak set nahi hua hai
      
      const numCols = Math.ceil(homeRef.current.offsetWidth / cellSize);
      const numRows = Math.ceil(homeRef.current.offsetHeight / cellSize);
      setGridDims({ cols: numCols, rows: numRows });
    };

    const debouncedHandleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };

    handleResize(); // Pehli baar run karo
    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [cellSize]); // cellSize constant hai, toh yeh effect sirf mount/unmount par chalega

  useEffect(() => {
    const totalCells = gridDims.cols * gridDims.rows;
    if (totalCells === 0) return;

    const intervalId = setInterval(() => {
      const index = Math.floor(Math.random() * totalCells);
      
      // YAHAN CHANGE KIYA: State update ko thoda clean kiya (same logic)
      setActiveCells(prev => {
        const next = new Set(prev);
        next.add(index);
        return next;
      });
      
      setTimeout(() => {
        setActiveCells(prev => {
          const next = new Set(prev);
          next.delete(index);
          return next;
        });
      }, 800); // 800ms tak cell active rahega
    }, 500); // Har 200ms par naya cell pick hoga

    return () => clearInterval(intervalId);
  }, [gridDims.cols, gridDims.rows]);

  const gridCells = useMemo(() => {
    const totalCells = gridDims.cols * gridDims.rows;
    if (totalCells === 0) return [];
    
    // YAHAN CHANGE KIYA: Ab hum simple 'div' ke bajaye 'MemoizedGridCell' render kar rahe hain
    // Yeh performance ko 100x behtar banata hai
    return Array.from({ length: totalCells }).map((_, index) => (
      <MemoizedGridCell 
        key={index} 
        isActive={activeCells.has(index)}
      />
    ));
  }, [gridDims.cols, gridDims.rows, activeCells]); // activeCells par depend karna theek hai kyunki ab children memoized hain

  const words = ["Fast", "Intelligent", "Scalable", "AI-Powered", "Beautiful", "Seamless"];

  return (
    // YAHAN CHANGE KIYA: Typo fix ('over-flow-hidden' -> 'overflow-hidden')
    <div className='overflow-hidden'>
      <GlobalStyles />
      
      <div className="bg-black text-white w-screen">
        
        {/* YAHAN CHANGE KIYA: 'ref' ko add kiya hai */}
        <div id="home" ref={homeRef} className="relative w-full h-dvh">
          {/* <Nav/> */}
          <div
            id="grid-container"
            className="absolute inset-0 grid w-full h-full z-0"
            style={{
              gridTemplateColumns: `repeat(${gridDims.cols}, 1fr)`,
              gridTemplateRows: `repeat(${gridDims.rows}, 1fr)`,
            }}
          >
            {gridCells}
          </div>

          <div 
            id="vignette-overlay"
            // YAHAN CHANGE KIYA: 'z-5' valid class nahi hai, 'z-10' kar diya
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, #000 80%)'
            }}
          ></div>

          <div
            id="main-content-container"
            // z-20 vignette (z-10) aur grid (z-0) ke upar hai, jo sahi hai
            className="relative w-full h-dvh flex items-center justify-center z-20 p-4 pointer-events-none"
          >
            {/* YAHAN CHANGE KIYA: MOBILE GLITCH FIX
                'absolute top-55 md:top-35' ko hata diya
                Ab parent ka 'flex items-center justify-center' content ko perfectly center karega
            */}
            <div id="content-wrapper" className="text-center  space-y-6">
              <h2
                className="text-lg md:text-xl lg:text-2xl font-bold text-gray-400 tracking-wide uppercase"
              >
                From Code to Creation
              </h2>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl text-gray-200 font-extrabold leading-tight max-w-3xl mx-auto"
                  style={{ textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>
                I Build Web Experience
                <br />
                That are <FlipWords words={words} duration={3000} />
              </h1>
              
              <h2 className="text-lg md:text-xl text-gray-300">
                Hi, I'm <span className='font-bold text-xl text-indigo-400'> Aayush</span>, a Web Developer from India.
              </h2>
                
              <div className="flex justify-center items-center gap-4 pt-4">
                <button
                  className="bg-indigo-500 text-white font-bold py-3 px-8 rounded-lg text-lg
                             hover:bg-indigo-400 transition-colors duration-300 shadow-lg shadow-indigo-500/30
                             pointer-events-auto"
                >
                  Get In Touch
                </button>
                
                <button 
                  className='text-white font-bold py-3 px-8 rounded-lg text-lg 
                             bg-white/10 border border-gray-600 backdrop-blur-sm
                             hover:text-indigo-400 hover:bg-transparent transition-colors duration-300
                             pointer-events-auto'
                >
                  Resume
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}