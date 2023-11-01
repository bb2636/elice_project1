
import { Router } from 'express';
import { User } from '../db/models/users/user-model.js';
import UserService from '../services/user-service.js';
const userService = new UserService;
const router = Router();

/* test code */
router.get('/', (req, res, next) => {
    //res.send("signup router");
    res.status(200);
    res.json({name: "ted"});
    
});

/*
 * 회원가입 요청
 */
router.post("/signup", async (req, res, next) => {
    const { userName, email, password, role} = req.body;
    try {
        const result = await userService.Signup({userName, email, password, role});
        if(result.message == "DUPLICATED") {
             throw new Error('이미 가입한 이메일입니다.');
        } else if(result.message == "SUCCESS") {
            res.status(201);
            res.json(
                {
                    message: "회원가입에 성공했습니다.",
                    user: result.user,
                });
        }
    } catch(err) {
        res.status(400);
        res.json(
            {
                message: err.message, 
            }
        )
    }
});


const result = `Server is working`;

export default router;
export {result};