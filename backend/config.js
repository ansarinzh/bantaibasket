import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 6000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/amazona',
  // MONGODB_URL: process.env.MONGODB_URL || "mongodb+srv://cluster0.779hp.mongodb.net/bantaibasket --username admin",
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};