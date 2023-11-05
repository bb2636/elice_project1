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
  if (!orderId) {
    throw new Error("해당 주문ID와 일치하지 않습니다.");
  }

  try {
    const order = await findByOrderId(orderId);

    if (!order) {
      return "해당 유저의 주문 내역이 없습니다.";
    }

    const deleteResult = await Order.deleteOne({_id: orderId});

    if (deleteResult.deletedCount === 0) {
      return "삭제 가능한 주문이 없습니다.";
    }

    return "주문이 정상적으로 삭제되었습니다.";
  } catch (error) {
    throw new Error("주문을 삭제하는 동안 오류가 발생했습니다: " + error.message);
  }
}

export {getUserOrders, createOrder, findByOrderId, deleteOrder};
