import express from "express";
import {validator_deleteOrder} from "../../middlewares/validator/validator-order.js";
import {deleteOrder} from "../../services/order-services.js";
const router = express.Router();

// 주문 취소(삭제) 라우터
router.delete("/:orderNumber", validator_deleteOrder, async (req, res, next) => {
  const orderNumber = req.params.orderNumber;
  try {
    const result = await deleteOrder(orderNumber);
    if (result.status === 200) {
      res.status(200).json({status: "200", message: "주문이 성공적으로 취소되었습니다."});
    } else {
      res.status(500).json({status: "500", message: "서버 오류입니다."});
    }
  } catch (error) {
    next(error);
  }
});

export default router;
