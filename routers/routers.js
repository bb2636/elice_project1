import express from "express";
const mainRouter = express.Router();

import carRouter from "./cars/carRouter.js";
import userRouter from "./account/user-router.js";
import signupRouter from "./account/signup-router.js";
import signinRouter from "./account/signin-router.js";
import signoutRouter from "./account/signout-router.js";

//결제 라우터
import paymentRouter from "./payment/payment-router.js";
//구매내역 라우터
import orderRouter from "./orders/orders-router.js";
//구매 취소 라우터
import orderDeleteRouter from "./orders/orders-delete-router.js";

/* user router */
mainRouter.use("/users", userRouter);

/* auth router */
mainRouter.use("/signup", signupRouter);
mainRouter.use("/signin", signinRouter);
mainRouter.use("/signout", signoutRouter);

//결제 응답 라우터
mainRouter.use("/payment", paymentRouter);
//주문 내역 조회 라우터
mainRouter.use("/orders", orderRouter);
//주문 취소 라우터
mainRouter.use("/orders/delete", orderDeleteRouter);

mainRouter.use("/cars", carRouter); // '/car' 경로로 API 엔드포인트 사용

export default mainRouter;
