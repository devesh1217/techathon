import dbConnect from '@/utils/db';
import Incident from '@/models/incident';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { NextResponse } from 'next/server';
import geoip from 'geoip-lite';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Configure Multer-Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'incidents', // Folder name in Cloudinary
    format: async (req, file) => 'jpg', // Optional: Specify file format
    public_id: (req, file) => file.originalname.split('.')[0], // Use original file name
  },
});

// Initialize Multer with Cloudinary storage
const upload = multer({ storage });

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

    // Collect uploaded file URLs from Cloudinary
    const imageUrls = req.files.map((file) => file.path);

    // Connect to the database
    await dbConnect();

    // Create the incident
    const incident = new Incident({
      title,
      location: parsedLocation,
      images: imageUrls,
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
