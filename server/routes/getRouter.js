const express = require("express");
const getController = require("../controllers/getController");
const auth = require("../controllers/authController");
const getRouter = express.Router();

const initGetRouter = (app) => {

  getRouter.get("/api/validate", auth.isAuthenticated, auth.validate);
  getRouter.get("/api/get/users", auth.isAuthenticated, getController.getAllUsers);
  getRouter.get("/api/get/clients", auth.isAuthenticated, getController.getAllClients)
  getRouter.get("/api/get/client/notes/:clientID", auth.isAuthenticated, getController.getClientNotes);

  return app.use("/", getRouter);
};

module.exports = initGetRouter;