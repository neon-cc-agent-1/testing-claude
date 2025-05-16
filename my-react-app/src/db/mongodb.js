import mongoose from 'mongoose';

// Track connection status to avoid multiple connections
let isConnected = false;
let connectionRetries = 0;
const MAX_RETRIES = 3;

const connectDB = async () => {
  // If already connected, return the existing connection
  if (isConnected) {
    return mongoose.connection;
  }

  // Check if MongoDB URI is configured
  if (!import.meta.env.VITE_MONGODB_URI) {
    throw new Error('MongoDB URI is not defined in environment variables. Please add VITE_MONGODB_URI to your .env file.');
  }

  try {
    // Connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30s default
    };

    const conn = await mongoose.connect(import.meta.env.VITE_MONGODB_URI, options);
    
    isConnected = true;
    connectionRetries = 0;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Add connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
      isConnected = false;
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
      isConnected = false;
    });

    return conn;
  } catch (error) {
    // Retry logic for transient connection issues
    if (connectionRetries < MAX_RETRIES) {
      connectionRetries++;
      console.warn(`MongoDB connection failed. Retrying (${connectionRetries}/${MAX_RETRIES})...`);
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * connectionRetries));
      return connectDB();
    }
    
    console.error(`MongoDB connection error: ${error.message}`);
    isConnected = false;
    throw new Error(`Failed to connect to MongoDB after ${MAX_RETRIES} retries: ${error.message}`);
  }
};

export default connectDB;