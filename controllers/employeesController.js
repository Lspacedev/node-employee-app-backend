const fs = require("fs");
const { db, bucket } = require("../config/firebase-admin");
async function getAllEmployees(req, res) {
  let employees = [];
  try {
    const employeesRef = db.collection("employees");
    const snapshot = await employeesRef.get();

    snapshot.forEach((doc) => {
      employees.push({ docId: doc.id, ...doc.data() });
    });
  } catch (err) {
    return res.send({ err: err.message });
  }
  return res.send(employees);
}
function getEmployeeByID(req, res) {
  const { id } = req.params;
}
async function addEmployee(req, res) {
  const { name, surname, id, email, department, position, phone, date } =
    req.body;

  try {
    //upload image and get url
    const buffer = req.file.buffer;
    const extension = req.file.originalname.substring(
      req.file.originalname.indexOf(".") + 1
    );
    const file = bucket.file("profile-pictures/" + id + "." + extension);
    const resp = await file.save(buffer, {});
    const imageUrl = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });

    let data = {
      name,
      surname,
      email,
      department,
      position,
      phone,
      date,
      pic: imageUrl,
    };
    const docRef = db.collection("employees").doc(id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      return res.send({ err: "Employee exists" });
    } else {
      const result = await db.collection("employees").doc(id).set(data);
      return res.send({ message: "Employee succesfully added" });
    }
  } catch (err) {
    return res.send({ err: err.message });
  }
}

async function updateEmployee(req, res) {
  const { id } = req.params;

  const { name, surname, email, department, position, phone, date } = req.body;
  if (JSON.stringify(req.body) === "{}" && typeof req.file === "undefined") {
    return res.send("Must have atleast one field to update");
  }
  let updateObj = {};
  if (req.file !== "undefined") {
    try {
      //upload image and get url

      const buffer = req.file.buffer;
      const extension = req.file.originalname.substring(
        req.file.originalname.indexOf(".") + 1
      );
      const file = bucket.file("profile-pictures/" + id + "." + extension);
      const resp = await file.save(buffer, {});
      const imageUrl = await file.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });

      updateObj.pic = imageUrl;
    } catch (err) {}
  }
  if (name !== "" && typeof name !== "undefined") {
    updateObj.name = name;
  }
  if (surname !== "" && typeof surname !== "undefined") {
    updateObj.surname = surname;
  }
  if (email !== "" && typeof email !== "undefined") {
    updateObj.email = email;
  }
  if (department !== "" && typeof department !== "undefined") {
    updateObj.department = department;
  }
  if (position !== "" && typeof position !== "undefined") {
    updateObj.position = position;
  }
  if (phone !== "" && typeof phone !== "undefined") {
    updateObj.phone = phone;
  }
  if (date !== "" && typeof date !== "undefined") {
    updateObj.date = date;
  }

  if (JSON.stringify(updateObj) !== "{}") {
    try {
      const result = await db.collection("employees").doc(id).update(updateObj);
    } catch (err) {
      return res.send({ err: err.message });
    }
  }
  res.send({ message: "Employee updated succesfully" });
}

async function deleteEmployee(req, res) {
  const { id } = req.params;
  try {
    const result = await db.collection("employees").doc(id).delete();
    bucket.deleteFiles({
      prefix: `profile-pictures/${id}`,
    });
  } catch (err) {
    console.log(err);
  }
  res.send({ message: "Employee deleted succesfully" });
}

module.exports = {
  getAllEmployees,
  getEmployeeByID,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
