import dbConnect from '@/utils/db';
import Incident from '@/models/incident';

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { title, location, images, reportedBy } = body;

    // Validate input fields
    if (!title || !location || !location.latitude || !location.longitude || !images || !reportedBy) {
      return new Response(
        JSON.stringify({ message: 'All fields are required', success: false }),
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Create the incident
    const incident = new Incident({
      title,
      location,
      images,
      reportedBy,
    });

    // Save the incident
    const savedIncident = await incident.save();

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Incident created successfully', success: true, data: savedIncident }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error', success: false }),
      { status: 500 }
    );
  }
}
