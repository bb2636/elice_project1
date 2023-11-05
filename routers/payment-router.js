import express from "express";
const router = express.Router();
import {createOrder} from "../services/order-services.js";
import Order from "../db/models/orders/order-model.js";
// import validateOrder from "../middlewares/validator/validator-order.js";

// 결제하기 버튼을 눌렀을 때의 응답이 성공이면 -> 주문 내역에 주문 추가(생성)
router.post("/", async (req, res) => {
  const {productInfo, amountInfo, userId, address, status} = req.body;

  if (!productInfo || !amountInfo || !userId || !address || !status) {
    return res.status(400).json({error: "정보가 누락되었습니다."});
  }

  try {
    const newOrder = new Order({
      products: [
        {
          productInfo,
          quantity: 1,
        },
      ],
      totalAmount: amountInfo,
      user: userId,
      address,
      status,
    });

    await createOrder(newOrder);
    res.json({message: "결제가 성공적으로 완료되었습니다."});
  } catch (error) {
    res.status(500).json({error: "결제 실패 및 주문 생성 실패: " + error.message});
  }
});

export default router;
