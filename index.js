import express from "express";
import cors from "cors";
import signupRouter from "./routers/signup.js";
import {result} from "./routers/signup.js";
//결제 라우터
import paymentRouter from "./routers/payment.js";
//구매내역 라우터
import orderRoutes from "./routers/orders.js";

//require("dotenv").config();
import {config} from "dotenv";
import {env} from "process";
config();
const {MONGO_NAME, MONGO_PASSWORD} = env;

import mongoose from "mongoose";

const port = 3000;
const app = express();

mongoose
  .connect(`mongodb+srv://${MONGO_NAME}:${MONGO_PASSWORD}@project-db.duhldeb.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get("/", (req, res, next) => {
  res.send(result);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/signup", signupRouter);

//결제 응답 라우터
app.use("/payment", paymentRouter);

//주문 내역 라우터
app.use("/ordered", orderRoutes);

app.listen(port, () => {
  console.log(`서버가 정상적으로 시작되었습니다. 주소: http://localhost:${port}`);
});
