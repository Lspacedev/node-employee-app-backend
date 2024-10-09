const { admin } = require("../config/firebase-admin");
const authenticateUser = (req, res, next) => {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((decodedClaims) => {
      //serveContentForUser("/profile", req, res, decodedClaims);
    })
    .catch((error) => {
      // Session cookie is unavailable or invalid. Force user to login.
      res.redirect("/login");
    });
  next();
};

module.exports = authenticateUser;
