// app/education/page.js
export default function RoadSafetyEducation() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 mt-10">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Road Safety Education & Tips</h1>

        <section className="space-y-10">
          {/* Safe Driving Practices Section */}
          <div>
            <h2 className="text-3xl font-semibold text-blue-500 mb-4">Safe Driving Practices</h2>
            <p className="mb-4 text-lg">
              Following safe driving practices not only protects you but also ensures the safety of others on the road.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg">
              <li>Always wear your seatbelt.</li>
              <li>Maintain a safe distance from the vehicle ahead (2-3 seconds rule).</li>
              <li>Observe speed limits and adjust speed for road conditions (rain, fog, etc.).</li>
              <li>Avoid distractions such as using your phone while driving.</li>
              <li>Always signal before making turns or lane changes.</li>
              <li>Stay alert and avoid driving when tired.</li>
            </ul>
          </div>

          {/* First Aid Tips Section */}
          <div>
            <h2 className="text-3xl font-semibold text-blue-500 mb-4">First Aid Tips for Road Accidents</h2>
            <p className="mb-4 text-lg">
              In case of a road accident, knowing how to administer first aid can save lives. Here are essential tips:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg">
              <li>Call emergency services immediately (911 or your local emergency number).</li>
              <li>Check if the person is breathing and has a pulse. If not, perform CPR.</li>
              <li>If bleeding occurs, apply pressure with a clean cloth to stop the bleeding.</li>
              <li>Do not move the injured person unless there is a risk of fire or further danger.</li>
              <li>If the person is conscious, keep them calm and reassure them while waiting for help.</li>
            </ul>
          </div>

          {/* Emergency Contact Details Section */}
          <div>
            <h2 className="text-3xl font-semibold text-blue-500 mb-4">Emergency Contact Details</h2>
            <ul className="list-disc pl-6 space-y-3 text-lg">
              <li><strong>Emergency Services (Police, Fire, Ambulance):</strong> 911</li>
              <li><strong>Roadside Assistance:</strong> [Your Local Roadside Assistance Number]</li>
              <li><strong>Nearest Hospital:</strong> [Hospital Name & Contact Number]</li>
              <li><strong>Insurance Emergency Contact:</strong> [Insurance Provider & Number]</li>
            </ul>
          </div>

          {/* Pedestrian Safety Section */}
          <div>
            <h2 className="text-3xl font-semibold text-blue-500 mb-4">Pedestrian Safety Tips</h2>
            <p className="mb-4 text-lg">
              Pedestrians are among the most vulnerable road users. Here’s how you can stay safe:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg">
              <li>Always cross at designated pedestrian crossings and use traffic signals.</li>
              <li>Be visible at night by wearing bright clothing or reflective gear.</li>
              <li>Look both ways before crossing the street, even if the crosswalk light is green.</li>
              <li>Never use your phone while crossing the street.</li>
              <li>Be cautious around vehicles, especially in parking lots and intersections.</li>
            </ul>
          </div>

          {/* Vehicle Maintenance Section */}
          <div>
            <h2 className="text-3xl font-semibold text-blue-500 mb-4">Vehicle Maintenance for Safety</h2>
            <p className="mb-4 text-lg">
              A well-maintained vehicle ensures safer driving. Regular maintenance checks are important:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg">
              <li>Check tire pressure and tread regularly to prevent blowouts.</li>
              <li>Ensure brakes are in good condition and replace worn-out brake pads.</li>
              <li>Check oil levels and change it according to your vehicle’s requirements.</li>
              <li>Inspect headlights, taillights, and signals to ensure they’re working properly.</li>
              <li>Keep your windshield wipers and fluid in good condition for clear visibility.</li>
            </ul>
          </div>

          {/* Night Driving Tips Section */}
          <div>
            <h2 className="text-3xl font-semibold text-blue-500 mb-4">Night Driving Safety Tips</h2>
            <p className="mb-4 text-lg">
              Driving at night presents unique challenges. Here’s how to stay safe when driving after dark:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg">
              <li>Ensure your headlights are clean and properly adjusted.</li>
              <li>Drive at a slower speed to account for reduced visibility.</li>
              <li>Avoid looking directly at oncoming headlights; look at the road’s right edge.</li>
              <li>Make sure your vehicle’s interior lights are dimmed to reduce glare.</li>
              <li>Take breaks if you feel drowsy or fatigued.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
