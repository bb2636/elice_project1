import express from "express";
import {validator_deleteOrder} from "../../middlewares/validator/validator-order.js";
const router = express.Router();

// 주문 취소(삭제) 라우터 <userId = _id>
router.delete("/:userId", validator_deleteOrder, async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await deleteOrder(userId);
    if (result.status === 200) {
      res.status(200).json({status: "200", message: "주문이 성공적으로 취소되었습니다."});
    } else {
      const error = new Error("주문을 삭제하는 중에 오류가 발생하였습니다.");
      error.status = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

export default router;
