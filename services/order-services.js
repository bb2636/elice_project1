import Order from "../db/models/orders/order-model.js";
import {Car} from "../db/models/cars/cars-model.js";

// // 특정 유저의 주문 내역을 불러오는 함수
// async function getUserOrders(userId) {
//   try {
//     return await Order.find({user: userId});
//   } catch (error) {
//     throw {status: 404, message: "주문 내역을 불러오는 중 오류가 발생했습니다."};
//   }
// }

//주문 정보 찾는 함수
async function findByUserId(userId) {
  try {
    return await Order.findOne({userId});
  } catch (error) {
    throw {status: 404, message: "주문을 찾을 수 없습니다."};
  }
}

// 주문 삭제 함수
async function deleteOrder(userId) {
  if (!userId) {
    throw {status: 404, message: "userID 불일치"};
  }

  try {
    const order = await findByUserId(userId);

    if (!order) {
      return {status: 404, message: "해당 유저의 주문 내역이 없습니다."};
    }

    const deleteResult = await Order.deleteOne({userId});

    if (deleteResult.deletedCount === 0) {
      return {status: 404, message: "삭제 가능한 주문이 없습니다."};
    }

    return {status: 200, message: "주문이 정상적으로 삭제되었습니다."};
  } catch (error) {
    throw {status: 500, message: "주문을 삭제하는 동안 오류가 발생했습니다: " + error.message};
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

//총 금액 계산 함수
async function calculateTotalPrice(products) {
  const carInfoPromises = products.map(async (product) => {
    const carInfo = await Car.findById(product.carId);
    return carInfo;
  });

  const carInfos = await Promise.all(carInfoPromises);

  const totalPrice = carInfos.reduce((total, carInfo, index) => {
    return total + carInfo.carPrice * products[index].quantity;
  }, 0);

  return totalPrice;
}

//주문 내역 생성 및 저장
async function createOrdered(products, userId, address) {
  const productItems = await Promise.all(
    products.map(async (product) => {
      const carInfo = await Car.findById(product.carId);
      if (carInfo) {
        return {
          productInfo: {
            carName: carInfo.carName,
            carPrice: carInfo.carPrice,
            img: carInfo.img,
            option: carInfo.option,
            color: carInfo.color,
          },
          quantity: product.quantity,
        };
      }
    })
  );

  const totalPrice = await calculateTotalPrice(products);

  const newOrderData = {
    products: productItems,
    totalAmount: totalPrice,
    userId: userId,
    address,
    // status <- default값
  };

  try {
    const createOrder = await Order.create(newOrderData);
    return createOrder;
  } catch (error) {
    throw {status: 404, message: "정보 누락으로 주문 저장에 실패하였습니다."};
  }
}
export {deleteOrder, findByUserId, getAllOrders, createOrdered, calculateTotalPrice};
