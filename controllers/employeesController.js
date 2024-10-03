function getAllEmployees(req, res) {}
function getEmployeeByID(req, res) {
  const { id } = req.params;
}
function addEmployee(req, res) {
  const { id } = req.body;
}

function updateEmployee(req, res) {
  const { id } = req.body;
}

function deleteEmployee(req, res) {
  const { id } = req.params;
}

module.exports = {
  getAllEmployees,
  getEmployeeByID,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
