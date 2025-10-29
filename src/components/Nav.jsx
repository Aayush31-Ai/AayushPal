import { useState, useEffect } from "react";


const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  // 3. Active link ko track karne ke liye naya state
  const [activeLink, setActiveLink] = useState('home');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 4. Navigation links ko IDs se match kiya
  const navLinks = [
    { href: '#home', text: 'Home' },
    { href: '#about', text: 'About' },
    { href: '#expertise', text: 'Expertise' },
    { href: '#projects', text: 'Projects' },
    { href: '#contact', text: 'Contact' },
  ];

  // 5. Scroll ko track karne ke liye naya useEffect
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
      const scrollY = window.scrollY + 100; // 100px offset taaki link pehle hi active ho jaaye

      let current = 'home';
      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollY >= sectionTop) {
            current = section.id;
          }
        }
      }
      setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array, sirf ek baar run hoga

  return (
    <>
      {/* Nav bar: sticky, blureffect, opacity */}
      <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-md text-white">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Aayush gradient text (wapas add kar diya) */}
          <div className="text-3xl font-bold  text-white">
            Aayush <span className="text-indigo-400 font-">.</span>
          </div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.text}>
                {/* 6. Link ko relative banaya */}
                <a 
                  href={link.href} 
                  className="text-white hover:text-indigo-300 transition-colors relative"
                >
                  {link.text}
                  {/* 7. Bottom line, activeLink state ke hisaab se scale hogi */}
                  {/* <span 
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-300 transform transition-transform duration-300 origin-left ${
                      activeLink === link.href.substring(1) ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  ></span> */}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Mobile Menu Button (Hamburger/Close) */}
          <button 
            className="md:hidden text-white z-50" // z-50 taaki yeh slide-in menu ke upar rahe
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              // Close Icon (X)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Menu Icon (Hamburger)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Slide-in from right) */}
      <div 
        className={`fixed top-0 right-0 h-full bg-gray-900/80 backdrop-blur-xl text-white w-64 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-40`} // z-40, menu button ke neeche
      >
        <ul className="flex flex-col space-y-6 p-6 pt-20"> {/* pt-20 taaki content nav ke neeche se start ho */}
          {navLinks.map((link) => (
            <li key={link.text}>
              <a 
                href={link.href} 
                // 8. Mobile menu mein active link ko highlight kiya
                className={`text-white text-lg hover:text-indigo-300 ${
                  activeLink === link.href.substring(1) ? 'text-indigo-300 font-bold' : ''
                }`}
                onClick={toggleMenu} // Link click karne par menu close ho jayega
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Nav