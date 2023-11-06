import express from "express";
import {deleteOrder} from "../services/order-services.js";
// import validateOrder from "../middlewares/validator/validator-order.js";
const router = express.Router();

// 주문 취소(삭제) 라우터
router.delete("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const result = await deleteOrder(orderId);
    if (result === "주문이 정상적으로 삭제되었습니다.") {
      res.json({message: result});
    } else {
      res.status(404).json({message: result});
    }
  } catch (error) {
    res.status(500).json({message: "서버 오류"});
  }
});

export default router;
