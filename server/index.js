import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import illustraRoutes from './routes/illustraRoutes.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));

const corsOptions = {
    origin: ["http://localhost:5174", "http://localhost:5173"],
  };
app.use(cors(corsOptions));
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/illustra', illustraRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from IllustraGen!',
      });
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server started on port http://localhost:8080'));
    }
    catch (error) {
        console.log(error);
    }
};

startServer();