import * as dotenv from 'dotenv';

dotenv.config();

export const corsConfig = {
  exposedHeaders: ['Content-Disposition'],
  origin: process.env.CORS_OPTION_ORIGIN.split(','),
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders:
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-lang',
};
