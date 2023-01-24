import express from 'express';
import { rootPath } from '../controllers/getController.js';
const getRouter = express.Router();

const initGetRouter = (app) => {

    getRouter.get("/", rootPath)

    return app.use('/', getRouter);
}

export {
    initGetRouter
}