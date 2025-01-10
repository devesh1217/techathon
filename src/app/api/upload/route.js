import { google } from 'googleapis';
import multer from 'multer';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req) => {
  const buffers = [];
  for await (const chunk of req.body) {
    buffers.push(chunk);
  }
  const buffer = Buffer.concat(buffers);

  return new Promise((resolve, reject) => {
    const reqStream = new Readable();
    reqStream.push(buffer);
    reqStream.push(null);

    upload.single('file')(reqStream, {}, async (err) => {
      if (err) {
        resolve(NextResponse.json({ success: false, message: 'Error parsing form data' }, { status: 500 }));
        return;
      }

      const file = reqStream.file;
      if (!file) {
        resolve(NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 }));
        return;
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

      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null);

      const fileMetadata = {
        name: file.originalname,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
      };
      const media = {
        mimeType: file.mimetype,
        body: bufferStream,
      };

      try {
        const fileResponse = await drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: 'id, webViewLink, webContentLink',
        });

        resolve(NextResponse.json({
          success: true,
          fileId: fileResponse.data.id,
        }));
      } catch (error) {
        resolve(NextResponse.json({ success: false, message: 'Error uploading file to Google Drive' }, { status: 500 }));
      }
    });
  });
};
