const { Router } = require("express");
const employeesRouter = Router();
const employeesController = require("../controllers/employeesController");
const authenticateUser = require("../middleware/authentication");
const upload = require("../middleware/multerUpload");

employeesRouter.get("/", authenticateUser, employeesController.getAllEmployees);
employeesRouter.get(
  "/:id",
  authenticateUser,
  employeesController.getEmployeeByID
);

employeesRouter.post(
  "/",
  authenticateUser,
  upload.single("pic"),
  employeesController.addEmployee
);

employeesRouter.put(
  "/:id",
  authenticateUser,
  upload.single("pic"),
  employeesController.updateEmployee
);

employeesRouter.delete(
  "/:id",
  authenticateUser,
  employeesController.deleteEmployee
);
employeesRouter.use("*", (req, res) => {
  res.end("Error, route does not exist");
});
module.exports = employeesRouter;
