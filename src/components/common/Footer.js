"use client";

import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const teamMembers = [
    { name: "Devesh Mehta", github: "https://github.com/devesh1217" },
    { name: "Akshay Amin", github: "https://github.com/akshayamin62" },
    { name: "Hanusha Jain", github: "https://github.com/HanushaJain66" },
    { name: "Darshan Vekariya", github: "https://github.com/devesh1217" },
    { name: "Lavanya", github: "https://github.com/devesh1217" },
  ];

  return (
    <footer className="bg-blue-900 pl-16 text-white py-8 px-4 sm:px-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Column 1: Location */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
            <FaMapMarkedAlt />
            <span>Our Location</span>
          </h3>
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.6299713662693!2d72.7826234111774!3d21.16711918043578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dec8b56fdf3%3A0x423b99085d26d1f9!2sSardar%20Vallabhbhai%20National%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1731955347182!5m2!1sen!2sin"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>

        {/* Column 2: Home & Services */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-3">Home & Services</h3>
          <ul className="space-y-2 pl-4 list-disc list-inside">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Team Members */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-3">Team Members</h3>
          <div className="grid grid-cols-2 gap-2">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center space-x-1">
                <Link href={member.github} target="_blank" rel="noopener noreferrer">
                  {member.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Column 4: Contact */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-1">
            <li className="flex items-center space-x-2">
              <FaPhoneAlt />
              <span>+1 234 567 890</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope />
              <span>info@example.com</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;