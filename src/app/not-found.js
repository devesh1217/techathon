import React from 'react';
import Link from 'next/link';

function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-600 mb-8">Page Not Found</h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-500 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/" legacyBehavior>
          <a className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg sm:text-xl md:text-2xl hover:bg-blue-700 transition duration-300">
            Go to Home Page
          </a>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;