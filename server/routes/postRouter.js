const express = require('express')
const postController = require('../controllers/postController')
const auth = require('../controllers/authController')
const postRouter = express.Router();

const initPostRouter = (app) => {

    postRouter.post("/api/login", auth.isNotAuthenticated, auth.logIn)
    postRouter.post("/api/register", auth.isNotAuthenticated, auth.register)
    postRouter.put("/api/create/client", auth.isAuthenticated, postController.createClient)
    postRouter.patch("/api/update/user/:userID", auth.isAuthenticated, postController.updateUser)
    postRouter.put("/api/create/client/note", auth.isAuthenticated, postController.createClientNote)
    postRouter.put("/api/create/client/contact", auth.isAuthenticated, postController.createClientContact)
    postRouter.delete("/api/delete/note/:noteID", auth.isAuthenticated, postController.deleteNote)

    return app.use('/', postRouter);
}

module.exports = initPostRouter