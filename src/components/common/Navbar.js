"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/../public/icons/logo.png";
import Link from "next/link";
import { FaBars, FaTimes, FaCaretDown, FaLanguage } from "react-icons/fa";
import { toast } from 'react-hot-toast';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const dropdownRef = useRef(null);
  const translateRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const user = sessionStorage.getItem("user-auth-token");
    const clerk = sessionStorage.getItem("clerk-auth-token");
    const inspector = sessionStorage.getItem("inspector-auth-token");
    const cfo = sessionStorage.getItem("cfo-auth-token");
    const ho = sessionStorage.getItem("ho-auth-token");
    setIsLoggedIn(!!user || !!clerk || !!inspector || !!cfo || !!ho);
  }, [pathname]);

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsTranslateOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (translateRef.current && !translateRef.current.contains(event.target)) {
        setIsTranslateOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);

  const handleLanguageChange = (langCode) => {
    toast(`Translating page to ${langCode}`);
    if (typeof window !== 'undefined' && window.google) {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
      }
    }
    setIsTranslateOpen(false);
  };

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!window.googleTranslateElementInit) {
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            { pageLanguage: 'en' },
            'google_translate_element'
          );
        };

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.head.appendChild(script);
      }
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-screen bg-blue-900 text-white shadow-md transition-transform duration-300 z-50 ${showNavbar ? "transform translate-y-0" : "transform -translate-y-full"}`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center w-SCREEN max-w-screen">
        <div className="flex items-center space-x-2 ml-4 md:ml-16">
          {/* <Link href="/">
            <Image src={logo} alt="Pravartaka Logo" className="w-20 cursor-pointer" />
          </Link> */}
          <Link href="/">
            <h1 className="text-lg md:text-2xl ml-4 font-bold cursor-pointer">Pravartaka</h1>
          </Link>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link href="/" className="px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Home
          </Link>
          <Link href="/home/services" className="px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Services
          </Link>
          <Link href="/home/contact-us" className="px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Contact Us
          </Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Logout
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>Login</span>
                <FaCaretDown size={16} />
              </button>

              {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute left-0 mt-2 bg-blue-800 rounded-md shadow-lg w-auto max-w-full z-10">
                  <Link href="/auth/login" className="block px-4 py-2 text-white hover:bg-blue-700">
                    Citizen
                  </Link>
                  <Link href="/c/auth/login" className="block px-4 py-2 text-white hover:bg-blue-700">
                    Clerk
                  </Link>
                  <Link href="/i/auth/login" className="block px-4 py-2 text-white hover:bg-blue-700">
                    Inspector
                  </Link>
                  <Link href="/cfo/auth/login" className="block px-4 py-2 text-white hover:bg-blue-700">
                    Chief Fire Officer
                  </Link>
                  <Link href="/ho/auth/login" className="block px-4 py-2 text-white hover:bg-blue-700">
                    Head Office
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => setIsTranslateOpen(!isTranslateOpen)}
              className="px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <FaLanguage size={16} />
              <span>Translate</span>
            </button>

            {isTranslateOpen && (
              <div ref={translateRef} className="absolute right-0 mt-2 bg-blue-800 rounded-md shadow-lg w-auto max-w-full z-10">
                <button onClick={() => handleLanguageChange('en')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  English
                </button>
                <button onClick={() => handleLanguageChange('hi')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  हिंदी
                </button>
                <button onClick={() => handleLanguageChange('as')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  অসমীয়া
                </button>
                <button onClick={() => handleLanguageChange('bn')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  বাংলা
                </button>
                <button onClick={() => handleLanguageChange('gu')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  ગુજરાતી
                </button>
                <button onClick={() => handleLanguageChange('kn')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  ಕನ್ನಡ
                </button>
                <button onClick={() => handleLanguageChange('ks')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  كٲشُر
                </button>
                <button onClick={() => handleLanguageChange('kok')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  कोंकणी
                </button>
                <button onClick={() => handleLanguageChange('ml')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  മലയാളം
                </button>
                <button onClick={() => handleLanguageChange('mr')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  मराठी
                </button>
                <button onClick={() => handleLanguageChange('ne')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  नेपाली
                </button>
                <button onClick={() => handleLanguageChange('or')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  ଓଡ଼ିଆ
                </button>
                <button onClick={() => handleLanguageChange('pa')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  ਪੰਜਾਬੀ
                </button>
                <button onClick={() => handleLanguageChange('sa')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  संस्कृत
                </button>
                <button onClick={() => handleLanguageChange('ta')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  தமிழ்
                </button>
                <button onClick={() => handleLanguageChange('te')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  తెలుగు
                </button>
                <button onClick={() => handleLanguageChange('ur')} className="block px-4 py-2 text-white hover:bg-blue-700">
                  اردو
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      <div className={`absolute top-full left-0 md:hidden flex flex-col items-center space-y-4 bg-blue-800 py-4 w-full transition-all duration-300 ease-in-out ${
        isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      }`}>
        <Link href="/" className="px-4 py-2 w-full text-center rounded hover:bg-blue-700 transition-colors" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link href="/home/services" className="px-4 py-2 w-full text-center rounded hover:bg-blue-700 transition-colors" onClick={() => setIsMenuOpen(false)}>
          Services
        </Link>
        <Link href="/home/contact-us" className="px-4 py-2 w-full text-center rounded hover:bg-blue-700 transition-colors" onClick={() => setIsMenuOpen(false)}>
          Contact Us
        </Link>
      </div>
    </div>
  );
}