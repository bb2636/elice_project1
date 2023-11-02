import express from 'express';
import cors from "cors";
import userRouter from './routers/user-router.js';
//import {result} from './routers/user-router.js';

//require("dotenv").config();
import { config } from "dotenv";
import { env } from "process";
config();
const { MONGO_NAME, MONGO_PASSWORD } = env;

import mongoose from 'mongoose';



const port = 3000;
const app = express();


mongoose
  .connect(
    `mongodb+srv://${MONGO_NAME}:${MONGO_PASSWORD}@project-db.duhldeb.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'elice-motors' })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get("/", (req, res, next) => {
    res.send(result);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/* 사용자 관련 router 연결 */
app.use("/users", userRouter);



app.listen(port, () => {
    console.log(
      `서버가 정상적으로 시작되었습니다. 주소: http://localhost:${port}`
    );
});