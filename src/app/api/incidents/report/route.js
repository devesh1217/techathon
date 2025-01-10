import dbConnect from '@/utils/db';
import Incident from '@/models/incident';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import geoip from 'geoip-lite';

// Disable body parser for handling multipart form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    // Handle file upload
    const uploadMiddleware = upload.array('images'); // Process multiple files under 'images'
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, {}, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const { title, location: clientLocation, reportedBy } = req.body;

    if (!title || !reportedBy || !req.files) {
      return NextResponse.json(
        { message: 'Title, reportedBy, and images are required', success: false },
        { status: 400 }
      );
    }

    // Get location automatically using the client's IP address
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geoData = geoip.lookup(ip);
    const autoLocation = geoData
      ? { latitude: geoData.ll[0], longitude: geoData.ll[1] }
      : null;

    // If location is provided by the client, parse it
    const parsedLocation = clientLocation
      ? JSON.parse(clientLocation)
      : autoLocation;

    // Validate location
    if (!parsedLocation) {
      return NextResponse.json(
        { message: 'Location could not be determined', success: false },
        { status: 400 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_CLOUD_TYPE,
        project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
        private_key_id: process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLOUD_CLIENT_ID,
        auth_uri: process.env.GOOGLE_CLOUD_AUTH_URI,
        token_uri: process.env.GOOGLE_CLOUD_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_CLOUD_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.GOOGLE_CLOUD_CLIENT_X509_CERT_URL,
      },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const uploadFileToGoogleDrive = async (file) => {
      const fileMetadata = {
        name: file.originalname,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // Optional: specify folder ID
      };

      const media = {
        mimeType: file.mimetype,
        body: file.buffer,
      };

      const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
      });

      return response.data.id; // Return the file ID
    };

    const uploadedFileIds = await Promise.all(
      req.files.map((file) => uploadFileToGoogleDrive(file))
    );

    // Connect to the database
    await dbConnect();

    // Create the incident
    const incident = new Incident({
      title,
      location: parsedLocation,
      images: uploadedFileIds, // Store Google Drive file IDs
      reportedBy,
    });

    // Save the incident
    const savedIncident = await incident.save();

    return NextResponse.json({
      message: 'Incident reported successfully!',
      success: true,
      data: savedIncident,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error', success: false },
      { status: 500 }
    );
  }
}
