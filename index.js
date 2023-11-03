import express from 'express';
import carRouter from './routers/carRouter.js';
import userRouter from './routers/user-router.js';
import signupRouter from './routers/signup-router.js';
import signinRouter from './routers/signin-router.js';
import signoutRouter from './routers/signout-router.js';

//주문 아이디 찾는 함수
import {findByOrderId} from "./services/order-service.js";
//결제 라우터
import paymentRouter from "./routers/payment-router.js";
//구매내역 라우터
import orderRouter from "./routers/orders-router.js";
//구매 취소 라우터
import orderDeleteRouter from "./routers/orders-router.js";

import cors from 'cors';
import { config } from 'dotenv';

config(); // dotenv 설정 호출

const MONGO_NAME = process.env.MONGO_NAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

import mongoose from 'mongoose';

const port = 3000;
const app = express();

mongoose
  .connect(
    `mongodb+srv://${MONGO_NAME}:${MONGO_PASSWORD}@project-db.duhldeb.mongodb.net/elice-motors?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// 상품 관련 CRUD 라우터를 사용
app.use(
  cors({
    origin: '*', // 모든 도메인에서 요청 허용
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* user router */
app.use("/users", userRouter);

/* auth router */
app.use("/signup", signupRouter);
app.use("/signin", signinRouter);
app.use("/signout", signoutRouter);


app.get("/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  const order = findByOrderId(orderId);

  if (order) {
    res.status(201).json(order);
  } else {
    res.status(404).json({message: "주문을 찾을 수 없습니다."});
  }
});


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

app.use('/car', carRouter); // '/car' 경로로 API 엔드포인트 사용

app.listen(port, () => {
  console.log(`서버가 정상적으로 시작되었습니다. 주소: http://localhost:${port}`);
});

