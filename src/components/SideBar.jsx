import React, { useEffect, useRef, useState } from "react";
import { navLinks } from "../data";
import ThemeToggle from "./ThemeToggle";
import { ImCross } from "react-icons/im";
import { animate } from "framer-motion";

const SideBar = ({ showSideBar, setShowSideBar }) => {
  const [pathName, setPathName] = useState("home");
  const closeRef = useRef();

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => ({
        name: link.name,
        element: document.getElementById(link.name)
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (section.element) {
          const sectionTop = section.element.offsetTop;
          const sectionBottom = sectionTop + section.element.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setPathName(section.name);
            window.history.replaceState(null, null, `#${section.name}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        scrollToSection(hash);
      }, 100);
    }
  }, []);

  const scrollToSection = (name) => {
    const section = document.getElementById(name);
    if (section) {
      const targetPosition = section.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      
      // Custom scroll animation with easeInOut easing (800ms)
      animate(startPosition, targetPosition, {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1], // easeInOut cubic-bezier
        onUpdate: (latest) => window.scrollTo(0, latest)
      });
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 md:left-0 bg-blue-950 text-center py-4 h-[100vh] w-[160px] md:w-[110px] flex flex-col items-center text-white font-medium z-999 transition-transform duration-300 ease-in-out ${
        showSideBar ? "translate-x-0" : "translate-x-full md:translate-x-0"
      }`}
      ref={closeRef}
    >
      {/* Close Button */}
      <button
        className="flex justify-end w-full h-[29px] px-4 pb-1 visible md:hidden"
        onClick={() => setShowSideBar(false)}
      >
        <ImCross />
      </button>

      {/* Nav Links */}
      {navLinks.map(({ name, url, icon }) => (
        <a
          key={name}
          href={url}
          aria-label={name}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(name);
            setShowSideBar(false); // Close sidebar on mobile after clicking
          }}
          className={`text-sm px-4 py-4 flex flex-col items-center justify-center opacity-80 hover:opacity-100 w-full transition-all ${
            pathName === name
              ? "bg-gray-700/50 border-r-3 md:border-r-0 md:border-l-3 border-blue-400 opacity-100 text-blue-400"
              : ""
          }`}
        >
          <div className="text-[26px] mb-1">{icon}</div>
          {name.split("")[0].toUpperCase() + name.slice(1)}
        </a>
      ))}
      <ThemeToggle />
    </div>
  );
};

export default SideBar;
