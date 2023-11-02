import Order from "../db/models/order-model.js";
import asyncHandler from "express-async-handler";

// 특정 유저의 주문 내역을 불러오는 함수
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

//주문 정보 찾는 함수
export const findByOrderId = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    return order;
  } catch (error) {
    throw new Error("주문을 찾을 수 없습니다.");
  }
};

// 주문 취소 함수
const cancelOrder = asyncHandler(async (orderId) => {
  const deletedOrder = await Order.findByIdAndRemove(orderId);
  return deletedOrder;
});

export {getUserOrders, createOrder, cancelOrder};
