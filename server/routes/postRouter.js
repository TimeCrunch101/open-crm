import express from 'express';
import { rootPath } from '../controllers/postController.js';
const postRouter = express.Router();

const initPostRouter = (app) => {

    postRouter.post("/post", rootPath)

    return app.use('/', postRouter);
}

export {
    initPostRouter
}