import Order from "../db/models/orderModel.js";
import asyncHandler from "express-async-handler";

// 주문 내역을 불러오는 함수
const getUserOrders = asyncHandler(async (userId) => {
  const orders = await Order.find({userId});
  return orders;
});

// 주문 내역 저장 함수
const createOrder = asyncHandler(async (orderData) => {
  const newOrder = new Order(orderData);
  const savedOrder = await newOrder.save();
  return savedOrder;
});

// 주문 취소 함수
const cancelOrder = asyncHandler(async (orderId) => {
  const deletedOrder = await Order.findByIdAndRemove(orderId);
  return deletedOrder;
});

export {getUserOrders, createOrder, cancelOrder};
