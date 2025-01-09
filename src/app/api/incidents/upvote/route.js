import dbConnect from '@/utils/db';
import Incident from '@/models/incident';

export async function POST(req) {
  try {
    const body = await req.json();
    const { incidentId, userId, location } = body;

    if (!incidentId || !userId || !location || !location.latitude || !location.longitude) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400 }
      );
    }

    await dbConnect();

    const incident = await Incident.findById(incidentId);

    if (incident.upvotes.some(upvote => upvote.upvotedBy.toString() === userId)) {
      return new Response(
        JSON.stringify({ error: 'You have already upvoted this incident' }),
        { status: 400 }
      );
    }

    incident.upvotes.push({
      timestamp: new Date(),
      location,
      upvotedBy: userId,
    });

    incident.upvotesCount += 1;

    const updatedIncident = await incident.save();

    return new Response(
      JSON.stringify(updatedIncident),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
