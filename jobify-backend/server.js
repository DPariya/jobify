import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import jobRoute from './routes/jobRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser);
app.use(morgan('dev'));
app.use(errorHandler);

//Health Route
app.get('/api/health', (req, res) => {
  res.send('Server is up with ES6!');
});

//protected routes example
app.use('/api/auth', authRoutes);
//Job Route
app.get('/api/jobs', authMiddleware, jobRoute);

//DB Connect + server start
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connect');

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Connection failed', err);
  }
};
startServer();
