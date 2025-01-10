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

  const [token, setToken] = useState(null);


  useEffect(() => {
    setIsDropdownOpen(false);
    setIsTranslateOpen(false);
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("admin-token");
    if (token) {
      setIsLoggedIn(true);
      setToken(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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

  const handleLogOut = () => {
    localStorage.clear();
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


  return (
    <div className={`fixed top-0 left-0 w-screen bg-blue-100 text-black shadow-md transition-transform duration-300 z-50 ${showNavbar ? "transform translate-y-0" : "transform -translate-y-full"}`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center w-SCREEN max-w-screen">
        <div className="flex items-center space-x-2 ml-4 md:ml-16">
          <Link href="/">
            <Image src={logo} alt="Pravartaka Logo" className="w-44 cursor-pointer" />
          </Link>
          {/* <Link href="/">
            <h1 className="text-lg md:text-2xl ml-4 font-bold cursor-pointer">Pravartaka</h1>
          </Link> */}
        </div>

        <div className="hidden md:flex space-x-4">
          <Link href="/" className="px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/home/services" className="px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition-colors">
            Services
          </Link>
          <Link href="/contact-us" className="px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition-colors">
            Contact Us
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition-colors">
                Dashboard
              </Link>
              <button onClick={handleLogOut} className="px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition-colors">
                Logout
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>Login</span>
                <FaCaretDown size={16} />
              </button>

              {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute left-0 mt-2 bg-blue-800 rounded-md shadow-lg w-auto max-w-full z-10">
                  <Link href="/auth/login" className="block px-4 py-2 text-white hover:bg-blue-700 hover:text-white">
                    User
                  </Link>
                  <Link href="/ho/auth/login" className="block px-4 py-2 text-white hover:bg-blue-700 hover:text-white">
                    Admin
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      <div className={`absolute top-full left-0 md:hidden flex flex-col items-center space-y-4 bg-blue-800 py-4 w-full transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}>
        <Link href="/" className="px-4 py-2 w-full text-center rounded hover:bg-blue-700 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link href="/home/services" className="px-4 py-2 w-full text-center rounded hover:bg-blue-700 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
          Services
        </Link>
        <Link href="/contact-us" className="px-4 py-2 w-full text-center rounded hover:bg-blue-700 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
          Contact Us
        </Link>
      </div>
    </div>
  );
}