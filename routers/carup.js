import { Router } from 'express';
//상품 등록

const router = Router();

router.get('/', (req, res, next) => {
    res.send("carup router");
})

const result = `Server is working`;

export default router;
export {result};