import express from "express";
import cors from "cors";
import signupRouter from "./routers/signup.js";
import {result} from "./routers/signup.js";
//주문 아이디 찾는 함수
import {findByOrderId} from "./services/orderService.js";
//결제 라우터
import paymentRouter from "./routers/payment.js";
//구매내역 라우터
import orderRouter from "./routers/orders.js";
//구매 취소 라우터
import orderDeleteRouter from "./routers/orders.js";

import {config} from "dotenv";

config();
const {MONGO_NAME, MONGO_PASSWORD} = process.env;

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

//주문 내역 조회 라우터
app.use("/orders", orderRouter);

//주문 취소 라우터
app.use("/deleteorder", orderDeleteRouter);

app.get("/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  const order = findByOrderId(orderId);

  if (order) {
    res.status(201).json(order);
  } else {
    res.status(404).json({message: "주문을 찾을 수 없습니다."});
  }
});

app.listen(port, () => {
  console.log(`서버가 정상적으로 시작되었습니다. 주소: http://localhost:${port}`);
});
