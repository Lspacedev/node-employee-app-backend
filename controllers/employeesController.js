const fs = require("fs");
const admin = require("firebase-admin");
const serviceAccount = require("../employee-app-e9838-firebase-adminsdk-dhwdn-09b7960701.json");
require("dotenv").config();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.BUCKET_URL,
});
const db = admin.firestore();
let bucket = admin.storage().bucket();
async function getAllEmployees(req, res) {
  let employees = [];
  try {
    const employeesRef = db.collection("employees");
    const snapshot = await employeesRef.get();

    snapshot.forEach((doc) => {
      employees.push({ docId: doc.id, ...doc.data() });
    });
  } catch (err) {
    console.log(err);
  }
  res.send(employees);
}
function getEmployeeByID(req, res) {
  const { id } = req.params;
}
async function addEmployee(req, res) {
  const { name, surname, id, email, department, position, phone, date } =
    req.body;

  try {
    //upload image and get url

    const resp = await bucket.upload("./tmp/" + req.file.filename, {
      destination: "profile-pictures/" + req.file.filename,
      gzip: true,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    });
    const imageUrl = await resp[0].getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });

    // Remove file from /tmp folder after it has been uploaded
    fs.unlink("./tmp/" + req.file.filename, (err) => {
      if (err) {
        console.error(err);
        return;
      }
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
    const result = await db.collection("employees").doc(id).set(data);
  } catch (err) {}
  res.send("success");
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

      const resp = await bucket.upload("./tmp/" + req.file.filename, {
        destination: "profile-pictures/" + req.file.filename,
        gzip: true,
        metadata: {
          cacheControl: "public, max-age=31536000",
        },
      });
      const imageUrl = await resp[0].getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });
      updateObj.pic = imageUrl;
      // Remove file from /tmp folder after it has been uploaded
      fs.unlink("./tmp/" + req.file.filename, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
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
      console.log(err);
    }
  }
  res.send("success");
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
  res.send("Delete success");
}

module.exports = {
  getAllEmployees,
  getEmployeeByID,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
