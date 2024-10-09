const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.post("/register", indexController.postRegister);
indexRouter.post("/login", indexController.postLogin);
indexRouter.post("/logout", indexController.logout);

module.exports = indexRouter;
