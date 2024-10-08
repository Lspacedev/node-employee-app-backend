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
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
}
function logout(req, res) {
  res.clearCookie("session");
  //res.redirect("/login");
}

module.exports = {
  postRegister,
  postLogin,
};
