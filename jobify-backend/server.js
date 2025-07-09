import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import jobRoute from './routes/jobRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import authMiddleware from './middleware/authMiddleware.js';
dotenv.config();

const app = express();

//middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // stays false since you're not using cookies
  })
);

// app.use(cors({ origin: '*', credentials: true })); //dev only

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//Health Route
app.get('/api/health', (req, res) => {
  res.send('Server is up with ES6!');
});

//protected routes example

// Auth Routes
app.use('/api/auth', authRoutes);

// Job Routes (protected)
app.use('/api/jobs', authMiddleware, jobRoute);

app.use(errorHandler);

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
