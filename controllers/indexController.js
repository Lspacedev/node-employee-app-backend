const { db, admin } = require("../config/firebase-admin");
const { v4: uuidv4 } = require("uuid");

async function postRegister(req, res) {
  const { email, password } = req.body;

  admin
    .auth()
    .createUser({
      email: email,
      password: password,
    })
    .then(async (userRecord) => {
      const result = await db.collection("users").doc(userRecord.uid).set({
        userId: userRecord.uid,
        email: email,
        password: password,
      });

      console.log("Successfully created new user:", userRecord.uid);

      res.status(200).json({ message: "User registration successful" });
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
      res.status(500).json({ error: "Failed to register user" });
    });
}
async function postLogin(req, res) {
  const { email, password } = req.body;
  //verifiy user
  const userSnapshot = db
    .collection("users")
    .where("email", "==", email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        if (doc.id === "") {
          return res.send({ err: "User not found" });
        } else {
          const user = doc.data();
          if (user.password !== password) {
            return res.send({ err: "Invalid password" });
          } else {
            const uid = uuidv4();

            // admin
            //   .createCustomToken(uid)
            //   .then((customToken) => {
            //     console.log(customToken);
            //     // Send token back to client
            //   })
            //   .catch((error) => {
            //     console.log("Error creating custom token:", error);
            //   });
            return res.send({ message: "Login success" });
          }
        }
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  // admin.auth().createCustomToken(uid)
}

module.exports = {
  postRegister,
  postLogin,
};
