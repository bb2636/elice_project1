import express from "express";
import {deleteOrder} from "../../services/order-services.js";
// import validateOrder from "../middlewares/validator/validator-order.js";
const router = express.Router();

// 주문 취소(삭제) 라우터
router.delete("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const result = await deleteOrder(orderId);
    if (result.status === 200) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({status: "500", message: "서버 오류"});
  }
});

export default router;
