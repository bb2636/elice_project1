import Order from "../db/models/orders/order-model.js";

//주문 정보 찾는 함수
async function findByUserId(userId) {
  try {
    return await Order.findOne({userId});
  } catch (error) {
    throw {status: 404, message: "주문을 찾을 수 없습니다."};
  }
}

// 주문 삭제 함수
async function deleteOrder(orderNumber) {
  if (!orderNumber) {
    throw {status: 404, message: "orderNumber 불일치"};
  }

  try {
    const order = await Order.findOne({orderNumber});

    if (!order) {
      return {status: 404, message: "해당 유저의 주문 내역이 없습니다."};
    }

    const deleteResult = await Order.deleteOne({orderNumber});

    if (deleteResult.deletedCount === 0) {
      return {status: 404, message: "삭제 가능한 주문이 없습니다."};
    }

    return {status: 200, message: "주문이 정상적으로 삭제되었습니다."};
  } catch (error) {
    throw {status: 400, message: "주문을 삭제하는 동안 오류가 발생했습니다: " + error.message};
  }
}

// 주문 전체를 조회하는 함수
async function getAllOrders() {
  try {
    return await Order.find({});
  } catch (error) {
    throw {status: 404, message: "주문을 조회하는 중 오류가 발생했습니다."};
  }
}

// 총 금액 계산 함수
function calculateTotalPrice(products) {
  const totalPrice = products.reduce((total, product) => {
    return total + parseInt(product.carPrice, 10);
  }, 0);

  return totalPrice;
}

//주문 내역 생성 및 저장
async function createOrdered(products, userId, address) {
  const orderNumber = orderNumbers();

  const productItems = products.map((product) => {
    return {
      productInfo: {
        carId: product.carId,
        carName: product.carName,
        img: product.img,
        carPrice: product.carPrice,
        option: product.option,
        color: product.color,
      },
    };
  });

  const totalPrice = await calculateTotalPrice(products);

  const newOrderData = {
    orderNumber,
    products: productItems,
    userId: userId,
    address,
    totalAmount: totalPrice,
  };

  try {
    const order = new Order(newOrderData);
    await order.save();
    console.log("Order Saved Successfully:", order);
    return orderNumber;
  } catch (error) {
    throw {status: 404, message: "정보 누락으로 주문 저장에 실패하였습니다."};
  }
}

//제품 정보 누락 확인
function productMissing(product) {
  const {carId, carName, img, carPrice, option, color} = product;
  return !carId || !carName || !img || !carPrice || !option || !color;
}

// 주문 번호 생성
function orderNumbers() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let orderNumber = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderNumber += characters.charAt(randomIndex);
  }
  return orderNumber;
}

export {deleteOrder, findByUserId, getAllOrders, createOrdered, calculateTotalPrice};
export {productMissing, orderNumbers};
