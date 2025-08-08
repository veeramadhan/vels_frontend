"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Common classes for scroll links
  const scrollLinkClass =
    "cursor-pointer text-white hover:text-blue-400 transition text-lg font-semibold";

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-2xl font-extrabold cursor-pointer">
          {/* Scroll to top on Home click */}
          <ScrollLink
            to="/"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            Vels Promoter
          </ScrollLink>
        </div>

        {/* Desktop menu + Admin icon */}
        <div className="hidden md:flex items-center space-x-8">

          <ScrollLink
            to="/"
            smooth={true}
            duration={500}
            className={scrollLinkClass}
            spy={true}
            offset={-70} // adjust for navbar height
          >
            Home
          </ScrollLink>


          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className={scrollLinkClass}
            spy={true}
            offset={-70} // adjust for navbar height
          >
            About
          </ScrollLink>

          <ScrollLink
            to="properties"
            smooth={true}
            duration={500}
            className={scrollLinkClass}
            spy={true}
            offset={-70}
          >
            Properties
          </ScrollLink>

          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className={scrollLinkClass}
            spy={true}
            offset={-70}
          >
            Contact
          </ScrollLink>

          {/* Admin Icon */}
          <Link
            href="/admin"
            aria-label="Admin Login"
            className="text-white hover:text-blue-400 transition text-2xl"
          >
            <FaUserCircle />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Admin Icon on mobile */}
          <Link
            href="/admin"
            aria-label="Admin Login"
            className="text-white hover:text-blue-400 transition text-2xl"
          >
            <FaUserCircle />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="focus:outline-none"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4 space-y-4">
           <ScrollLink
            to="/"
            smooth={true}
            duration={500}
            className="block text-lg font-semibold hover:text-blue-400 transition cursor-pointer"
            onClick={() => setIsOpen(false)}
            offset={-70}
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="block text-lg font-semibold hover:text-blue-400 transition cursor-pointer"
            onClick={() => setIsOpen(false)}
            offset={-70}
          >
            About
          </ScrollLink>

          <ScrollLink
            to="properties"
            smooth={true}
            duration={500}
            className="block text-lg font-semibold hover:text-blue-400 transition cursor-pointer"
            onClick={() => setIsOpen(false)}
            offset={-70}
          >
            Properties
          </ScrollLink>

          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="block text-lg font-semibold hover:text-blue-400 transition cursor-pointer"
            onClick={() => setIsOpen(false)}
            offset={-70}
          >
            Contact
          </ScrollLink>
        </div>
      )}
    </nav>
  );
}
