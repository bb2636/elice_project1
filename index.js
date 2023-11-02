import express from 'express';
import carRouter from './routers/carRouter.js';
import cors from 'cors';
import { config } from 'dotenv';

config(); // dotenv 설정 호출

const MONGO_NAME = process.env.MONGO_NAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

import mongoose from "mongoose";

const port = 3000;
const app = express();

mongoose
  .connect(
    `mongodb+srv://${MONGO_NAME}:${MONGO_PASSWORD}@project-db.duhldeb.mongodb.net/elice-motors?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.get("/", (req, res, next) => {
  res.send(result);
});

app.use(cors());
app.use(express.json());


