const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const authenticateUser = require("../middleware/authentication");

indexRouter.get("/", (req, res) => {
  res.send({ status: "success" });
});
indexRouter.post("/register", indexController.postRegister);
indexRouter.post("/admins", authenticateUser, indexController.postRegister);
indexRouter.get("/login", indexController.getLogout);
indexRouter.post("/login", indexController.postLogin);
indexRouter.post("/logout", indexController.logout);
indexRouter.get("/checkSession", authenticateUser, (req, res) => {
  res.send({ status: "session valid" });
});
module.exports = indexRouter;
