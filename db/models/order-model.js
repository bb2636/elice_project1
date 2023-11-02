import mongoose from "mongoose";

//order 스키마 생성 (모두 필수 요소일까요?)
const orderSchema = new mongoose.Schema({
  name: String,
  status: String,
  color: String,
  price: Number,
  option: String,
  userId: String,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;