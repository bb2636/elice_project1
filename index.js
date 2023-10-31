import express from 'express';
import signupRouter from './routers/signup.js';
import {result} from './routers/signup.js';

const port = 3000;
const app = express();

app.get("/", (req, res, next) => {
    res.send(result);
});

app.use("/signup", signupRouter);

app.listen(port, () => {
    console.log(
      `서버가 정상적으로 시작되었습니다. 주소: http://localhost:${port}`
    );
});