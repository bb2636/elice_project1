import express from "express";
import {getUserOrders} from "../../services/order-services.js";

const router = express.Router();

// 주문 수정(관리자 -> 세션 필요할 것 같아욥) 배송 상태

//주문 내역 조회
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  if (userId == "" || userId == null) {
    res.status(500).json({status: "500", message: "주문자 정보를 찾을 수 없습니다."});
  }
  try {
    const orders = await getUserOrders(userId);

    if (orders.length > 0) {
      res.json(orders);
    } else {
      res.status(404).json({status: "404", message: "구매 내역을 찾을 수 없습니다."});
    }
  } catch (error) {
    res.status(500).json({status: "500", message: "서버 오류"});
  }
});

export default router;
