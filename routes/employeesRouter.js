const { Router } = require("express");
const employeesRouter = Router();
const employeesController = require("../controllers/employeesController");
//const upload = require("../middleware/multerUpload");

employeesRouter.get("/", employeesController.getAllEmployees);
employeesRouter.get("/:id", employeesController.getEmployeeByID);

employeesRouter.post(
  "/",
  /*upload.single("profilePic"),*/ employeesController.addEmployee
);

employeesRouter.put(
  "/:id",
  /*
  upload.single("profilePic"),*/
  employeesController.updateEmployee
);

employeesRouter.delete("/:id", employeesController.deleteEmployee);
employeesRouter.use("*", (req, res) => {
  res.end("Error, route does not exist");
});
module.exports = employeesRouter;
