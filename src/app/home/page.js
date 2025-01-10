// pages/index.js
import { FiAlertTriangle, FiMapPin, FiUsers, FiBell, FiBarChart, FiCloudRain } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 to-blue-500 text-white py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-6">
            Safer Roads, Smarter Driving
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Transforming road safety with real-time insights, AI-driven alerts, and community-powered reporting.
          </p>
          <div>
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 text-lg font-semibold mr-4">
              Get Started
            </button>
            <button className="px-6 py-3 bg-white text-black rounded-lg border border-black hover:bg-gray-100 text-lg font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-700">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-Time Alerts",
                desc: "Overspeeding, distraction monitoring, and weather alerts.",
                icon: <FiAlertTriangle size={40} className="text-blue-700" />,
              },
              {
                title: "User Reporting",
                desc: "Report incidents and verify genuineness with the community.",
                icon: <FiUsers size={40} className="text-blue-700" />,
              },
              {
                title: "Interactive Map",
                desc: "Mark and view real-time updates for safer navigation.",
                icon: <FiMapPin size={40} className="text-blue-700" />,
              },
              {
                title: "Smart Notifications",
                desc: "Personalized alerts based on driving patterns.",
                icon: <FiBell size={40} className="text-blue-700" />,
              },
              {
                title: "Dashboard",
                desc: "Insights on accident statistics and safety tips.",
                icon: <FiBarChart size={40} className="text-blue-700" />,
              },
              {
                title: "Weather Prediction",
                desc: "Current and future weather with a Driving Safety Index.",
                icon: <FiCloudRain size={40} className="text-blue-700" />,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 text-center"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Preview */}
      <section className="bg-blue-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-blue-700">Interactive Map Preview</h2>
          <p className="text-gray-800 mb-6">
            View real-time updates of road conditions and hazards.
          </p>
          <button className="px-6 py-3 bg-blue-700 rounded-lg hover:bg-blue-600 text-white text-lg font-semibold">
            View Full Map
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-700">What Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300">
              <p className="text-gray-800">
                "This app alerted me of an accident ahead, saving me time and ensuring my safety!"
              </p>
              <p className="mt-4 text-gray-600 font-semibold">- User A</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300">
              <p className="text-gray-800">
                "Real-time weather predictions and alerts have been incredibly useful for my road trips."
              </p>
              <p className="mt-4 text-gray-600 font-semibold">- User B</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-blue-700 text-white text-center py-16">
        <h2 className="text-4xl font-bold mb-6">Join our mission for safer roads</h2>
        <button className="px-6 py-3 bg-black rounded-lg hover:bg-gray-800 text-lg font-semibold">
          Sign Up Now
        </button>
      </section>
    </div>
  );
}
