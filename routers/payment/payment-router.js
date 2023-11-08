import express from "express";
import {createOrdered} from "../../services/order-services.js";

const router = express.Router();

//결제 성공하면 주문 생성 or 결제 실패
router.post("/", async (req, res) => {
  const {products, address, userId} = req.body;

  if (!products || !address || !userId) {
    return res.status(400).json({status: "400", error: "정보가 누락되었습니다."});
  }

  try {
    const newOrder = await createOrdered(products, userId, address);

    res.status(200).json({status: "200", message: "결제가 성공적으로 완료되었습니다.", order: newOrder});
  } catch (error) {
    res.status(500).json({status: "500", error: "결제 실패 및 주문 생성 실패: " + error.message});
  }
});

export default router;
