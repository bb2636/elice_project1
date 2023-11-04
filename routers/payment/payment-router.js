import express from "express";
const router = express.Router();
import Order from "../../db/models/orders/order-model.js";

// 결제하기 버튼을 눌렀을 때의 응답이 성공이면 -> 주문 내역에 주문 추가(생성)
router.post("/", async (req, res) => {
  const {productInfo, amountInfo, userId} = req.body;

  if (!productInfo || !amountInfo) {
    return res.status(400).json({error: "상품 정보 또는 금액 정보가 누락되었습니다."});
  }

  const {name, status, color, option, price} = productInfo;
  const totalprice = amountInfo;

  try {
    const newOrder = new Order({name, status, color, price, totalprice, option, userId});
    await newOrder.save();
    res.json({message: "결제가 성공적으로 완료되었습니다."});
  } catch (error) {
    res.status(500).json({error: "주문 생성 오류"});
  }
});

export default router;
