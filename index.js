import express from 'express';
<<<<<<< HEAD
import carRouter from './routers/carRouter.js';
=======
//import carRouter from './routers/carRouter.js';
import userRouter from './routers/user-router.js';
>>>>>>> feature/api/users
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

<<<<<<< HEAD
app.get("/", (req, res, next) => {
  res.send(result);
});

=======

/* user router */
app.use("/users", userRouter);


>>>>>>> feature/api/users
app.use(cors());
app.use(express.json());


<<<<<<< HEAD
=======
app.listen(port, () => {
  console.log(`server is running in ${port}`);
});

>>>>>>> feature/api/users
