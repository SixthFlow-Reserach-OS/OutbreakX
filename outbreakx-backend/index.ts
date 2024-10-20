import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './config/database';
import Marker from './models/Marker';
import cors from 'cors'

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());

sequelize.sync().then(() => console.log('Database connected'));

app.post('/markers', async (req: Request, res: Response) => {
  const { location, description } = req.body;
  console.log(req.body);
  try {
    const marker = await Marker.create({
      location: location,
      description
    });
    res.json(marker);
  } catch (error) {
    res.status(500).json({ error: 'Error creating marker' });
  }
});

app.get('/markers', async (req: Request, res: Response) => {
  try {
    const markers = await Marker.findAll();
    res.json(markers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching markers' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
