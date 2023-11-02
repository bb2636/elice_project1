import express from "express";
import asyncHandler from "express-async-handler";
import {getUserOrders, createOrder, cancelOrder} from "../services/orderService.js";

const router = express.Router();

// 주문 수정(관리자) 배송 상태

// 주문 내역 저장
router.post(
  "/orders",
  asyncHandler(async (req, res) => {
    const {name, status, color, price, option, userId} = req.body;

    try {
      const newOrder = {
        name,
        status,
        color,
        price,
        option,
        userId,
      };
      const savedOrder = await createOrder(newOrder);
      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

//주문 내역 조회
router.get("/orders/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await getUserOrders(userId);

    if (orders.length > 0) {
      res.json(orders);
    } else {
      res.status(404).json({message: "구매 내역을 찾을 수 없습니다."});
    }
  } catch (error) {
    res.status(500).json({message: "서버 오류"});
  }
});

// 주문 취소(삭제)
router.delete(
  "/orders/:orderId",
  asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;
    const deletedOrder = await cancelOrder(orderId);

    if (deletedOrder) {
      res.json({message: "주문이 취소되었습니다."});
    } else {
      res.status(404).json({message: "주문 내역을 찾을 수 없습니다."});
    }
  })
);

export default router;
