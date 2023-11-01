
import { Router } from 'express';
import { User } from '../db/models/user-model.js';

const router = Router();

router.get('/', (req, res, next) => {
    //res.send("signup router");
    res.status(200);
    res.json({name: "ted"});
})


const result = `Server is working`;

export default router;
export {result};