
import { Router } from 'express';
import { User } from '../db/models/users/user-model.js';
import UserService from '../services/user-service.js';
const userService = new UserService;
const router = Router();

router.get('/', (req, res, next) => {
    //res.send("signup router");
    res.status(200);
    res.json({name: "ted"});
    
});

router.post("/", async (req, res, next) => {
    const { userName, email, password } = req.body;
    const result = await userService.Signup({userName, email, password});
    
    res.status(201);
    res.json(result);
});


const result = `Server is working`;

export default router;
export {result};