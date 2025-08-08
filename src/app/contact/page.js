"use client";

import Link from "next/link";
import { FaInstagram, FaYoutube, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 border-t border-gray-300 text-gray-800 py-12 shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Branding and Info */}
        <div>
          <h2 className="text-3xl font-extrabold text-blue-700 mb-4 tracking-wide">
            Vels Promoter
          </h2>
          <p className="text-lg font-medium">Virudhunagar, Tamil Nadu</p>
          <p className="mt-2 text-base italic text-gray-600">Building dreams with trust.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-gray-900 text-xl mb-3 tracking-wide">Quick Links</h3>
          <Link href="/" className="hover:text-blue-600 transition text-lg font-medium">
            Home
          </Link>
          <Link href="/#about" className="hover:text-blue-600 transition text-lg font-medium">
            About
          </Link>
          <Link href="/properties" className="hover:text-blue-600 transition text-lg font-medium">
            Properties
          </Link>
          <Link href="/#contact" className="hover:text-blue-600 transition text-lg font-medium">
            Contact
          </Link>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="font-semibold text-gray-900 text-xl mb-4 tracking-wide">Connect with us</h3>
          <div className="flex gap-6 text-3xl text-blue-700">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-900 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="tel:+919876543210"
              aria-label="Call"
              className="hover:text-green-600 transition"
            >
              <FaPhoneAlt />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-12 text-base text-gray-600 tracking-wide">
        © {new Date().getFullYear()} Vels Promoter. All rights reserved.
      </div>
    </footer>
  );
}
