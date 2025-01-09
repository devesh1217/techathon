import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    upvotesCount: {
      type: Number,
      default: 0,
    },
    upvotes: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
        location: {
          latitude: {
            type: Number,
            required: true,
          },
          longitude: {
            type: Number,
            required: true,
          },
        },
        upvotedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // References the User who upvoted
          required: true,
        },
      },
    ],
    images: [
      {
        type: String, // Store image URLs or paths
        required: true,
      },
    ],
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // References the User who reported the incident
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Ensure the model is defined only once
let Incident;

try {
  if (mongoose.models && mongoose.models.Incident) {
    Incident = mongoose.models.Incident;
  } else {
    Incident = mongoose.model('Incident', incidentSchema);
  }
} catch (error) {
  console.error("Error while checking or defining Incident model: ", error);
  throw error;
}

export default Incident;
