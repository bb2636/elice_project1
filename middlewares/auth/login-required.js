import jwt from "jsonwebtoken";

function login_required(req, res, next) {

    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  
    if (userToken === "null") {
      res.status(400).json({ message: "토큰이 없습니다."});
      return;
    }
  
    try {
      const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
      const jwtDecoded = jwt.verify(userToken, secretKey);
 
      const user_id = jwtDecoded.user_id;
      req.currentUserId = user_id;
      next();
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