import UserService from '../services/user-service.js';
import { Router } from 'express';
const router = Router();

const userService = new UserService;

/*
 * 회원가입 요청
 */
router.post("/", async (req, res, next) => {
    const { userName, email, password, role } = req.body;
    
    try {
        const result = await userService.Signup({userName, email, password, role});
        if(result.message === "SUCCESS") {
            res.status(201)
               .json(
                {
                    message: "회원가입에 성공했습니다.",
                    user: result.user,
                });
            return;
        } else if(result.message === "DUPLICATED") {
            throw {status: 400, message: '이미 가입한 이메일입니다.'};
        } else if(result.message === "MISSING_FIELD") {
            throw {status: 400, message: '이름, 이메일, 비밀번호는 필수 요청 값입니다.'};
        } else {
            throw {status: 404, message: 'unknown error'};
        }
        
    } catch(err) {
        res.status(err.status)
           .json(
            {
                message: err.message, 
            }
        )
    }
});



export default router;