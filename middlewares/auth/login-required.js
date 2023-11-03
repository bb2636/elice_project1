import jwt from "jsonwebtoken";
import { User } from '../../db/models/users/user-model.js';


async function login_required (req, res, next) {
   const { shortId } = req.params || {};

   const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

   if (userToken === "null") {
      res.status(400).json({ message: "토큰이 없습니다."});
      return;
   }

   try {
      const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
      const jwtDecoded = jwt.verify(userToken, secretKey);
      
      // params에 shortId가 없고 역할이 ADMIN인 경우
      if(jwtDecoded.role === "ADMIN") {
         next();
         return;
      }

      const currentUser = await User.findOne(
         {shortId: shortId},
         { _id: 1}
      );
      
      if(currentUser._id == jwtDecoded.user_id) {
         next();
         return;
      }
         
      res.status(400).json({ message : "권한이 없습니다."});
         
   } catch (error) {
      if (error.name === "TokenExpiredError") {
         res.status(400).json({ message: "토큰이 만료되었습니다." });
      } else {
         res.status(400).json({ message: "정상적인 토큰이 아닙니다." });
      }
      return;
   }
}
  
  
export { login_required };