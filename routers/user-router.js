
import { Router } from 'express';
import UserService from '../services/user-service.js';
import { login_required } from "../middlewares/login/login-required.js";
import { admin_required } from "../middlewares/login/admin-required.js";


const userService = new UserService;
const router = Router();


/*
 * 모든 회원 정보 요청
 */
router.get("/",
    login_required, // 토큰 검증 미들웨어
    admin_required, // 관리자 검증 미들웨어
    async (req, res, next) => {
        try {
            const result = await userService.getAllUsersInfo();
            if(result.message ==="SUCCESS") {
                res.status(200)
                   .json({
                        message: "전체 회원 정보 조회에 성공했습니다.",
                        user: result.users,
                    });
                return;
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
    }
);


/*
 * 회원가입 요청
 */
router.post("/signup", async (req, res, next) => {
    const { userName, email, password, role} = req.body;
    
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


/*
 * 로그인 요청 (token 검증, 발급 로직은 TBD)
 */
router.post("/signin", async (req, res, next) => {

    try {
        const result = await userService.Signin(req.body);

        if(result.message === "SUCCESS") {
            res.setHeader('Authorization', `Bearer ${result.token}`);
            res.status(200)
               .json({
                message: "로그인에 성공했습니다.",
                user: result.user,
            });
            return;        
        } else if(result.message === "MISSING_FIELD") {
            throw {status: 401, message: '이메일, 비밀번호는 필수 요청 값입니다.'};
        } else if(result.message === "NOT_EXIST_USER") {
            throw {status: 400, message: '이메일 또는 비밀번호를 확인해주세요.'};
        }  else if(result.message === "NOT_MATCHED") {
            throw {status: 400, message: '비밀번호가 일치하지 않습니다.'};
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


/*
 * 회원 정보 조회 요청 (token 검증 로직은 TBD)
 */
router.get("/:email",
    login_required,  // 토큰 검증 미들웨어
    async (req, res, next) => {
        
        const { email } = req.params;

        try {
            const result = await userService.getUserInfo(email);
            if(result.message === "SUCCESS") {
                res.status(200)
                   .json({
                    message: "회원 정보 조회에 성공했습니다.",
                    user: result.user,
                })
                return;
            } else if (result.message ==="NO_MATCHES") {
                throw {status: 404, message: "존재하지 않는 계정입니다.",};
            } else {
                throw {status: 404, message: "unknown error",};
            }
        } catch(err) {
            res.status(err.status)
               .json(
                {
                    message: err.message, 
                }
            )
        }
    }
);


/*
 * 회원 정보 변경 요청 (token 검증 로직은 TBD)
 */
router.put("/:email",
    login_required, // 토큰 검증 미들웨어
    async (req, res, next) => {
        
        const { email } = req.params;

        const {userName, age, phone, address} = req.body;

        try {
            const result = await userService.updateUserInfo(email,  {userName, age, phone, address} );
            if(result.message === "SUCCESS") {
                res.status(200)
                   .json({
                    message: "회원 정보 변경에 성공했습니다.",
                    user: result.user,
                })
                return;
            } else if (result.message ==="NO_MATCHES") {
                throw {status: 404, message: "존재하지 않는 계정입니다.",};
            } else {
                throw {status: 404, message: "unknown error",};
            }
        } catch(err) {
            res.status(err.status)
               .json(
                {
                    message: err.message, 
                }
            )
        }
    }
);


/*
 * 회원 정보 삭제 요청 (token 검증 로직은 TBD)
 */
router.delete("/:email",
    login_required, // 토큰 검증 미들웨어
    async (req, res, next) => {
        const { email } = req.params;
        try {
            const result = await userService.deleteUserInfo(email);
            if(result.message === "SUCCESS") {
                res.status(204)
                   .json({
                    message: "회원 정보 삭제에 성공했습니다.",
                })
                return;
            } else if (result.message ==="NO_MATCHES") {
                throw {status: 404, message: "존재하지 않는 계정입니다.",};
            } else {
                throw {status: 404, message: "unknown error",};
            }
        } catch(err) {
            res.status(err.status)
               .json(
                {
                    message: err.message, 
                }
            )
        }
    }
);


export default router;
//const result = `Server is working`;
//export {result};