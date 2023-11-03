import Order from "../db/models/orders/order-model.js";

// 특정 유저의 주문 내역을 불러오는 함수
async function getUserOrders(userId) {
  try {
    return await Order.find({userId});
  } catch (error) {
    throw new Error("주문 내역을 불러오는 중 오류가 발생했습니다.");
  }
}

// 주문 내역 저장 함수
async function createOrder(orderData) {
  try {
    const createdOrder = await Order.create(orderData);
    return createdOrder;
  } catch (error) {
    throw error;
  }
}

//주문 정보 찾는 함수
async function findByOrderId(orderId) {
  try {
    const order = await Order.findById(orderId);
    return order;
  } catch (error) {
    throw new Error("주문을 찾을 수 없습니다.");
  }
}

// 주문 삭제 함수
async function deleteOrder(orderId) {
  try {
    const result = await Order.deleteOne({_id: orderId});

    if (result.deletedCount === 0) {
      return "주문을 찾을 수 없습니다.";
    }

    return "주문이 삭제되었습니다.";
  } catch (error) {
    throw error;
  }
}

export {getUserOrders, createOrder, findByOrderId, deleteOrder};
