import express from "express";
import asyncHandler from "express-async-handler";
import {getUserOrders, createOrder, cancelOrder} from "../services/orderService.js";

const router = express.Router();

// 주문 내역 불러오기
router.get(
  "/orders",
  asyncHandler(async (req, res) => {
    const orders = await getUserOrders("구매자id");
    res.json(orders);
  })
);

// 주문 내역 저장
router.post(
  "/orders",
  asyncHandler(async (req, res) => {
    const {name, status, color, price, option} = req.body;
    const userId = "주문자id";

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
      res.json(savedOrder);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

// 주문 취소
router.delete("/orders/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await cancelOrder(orderId);

    if (deletedOrder) {
      res.json({message: "주문이 취소되었습니다."});
    } else {
      res.status(404).json({message: "주문 내역을 찾을 수 없습니다."});
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
