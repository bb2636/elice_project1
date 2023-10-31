
import { Router } from 'express';
//import { Post }  from '../db/models';

const router = Router();

router.get('/', (req, res, next) => {
    res.send("signup router");
})

const result = `Server is working`;

export default router;
export {result};