import express from "express";
import {createOrdered} from "../../services/order-services.js";
import {validator_createOrder} from "../../middlewares/validator/validator-order.js";
import {login_required} from "../../middlewares/auth/login-required.js";

const router = express.Router();

// 결제 성공하면 주문 생성 or 결제 실패
router.post("/", validator_createOrder, login_required, async (req, res) => {
  const {address, userId} = req.body;
  const products = req.body.products;

  try {
    const orderNumber = await createOrdered(products, userId, address);

    res.status(200).json({message: "결제가 성공적으로 완료되었습니다.", orderNumber});
  } catch (error) {
    res.status(500).json({status: "500", error: "결제 실패 및 주문 생성 실패: " + error.message});
  }
});

export default router;
