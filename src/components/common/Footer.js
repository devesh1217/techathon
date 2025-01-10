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
    <footer className="bg-blue-200 pl-16 text-black py-8 px-4 sm:px-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <Link href="/contact-us">Contact</Link>
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