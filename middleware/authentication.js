const { admin } = require("../config/firebase-admin");
const authenticateUser = (req, res, next) => {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((decodedClaims) => {
      next();
      //serveContentForUser("/profile", req, res, decodedClaims);
    })
    .catch((error) => {
      // Session cookie is unavailable or invalid. Force user to login.
      return res.redirect("/login");
    });
};

module.exports = authenticateUser;
