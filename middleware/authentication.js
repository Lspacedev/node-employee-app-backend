const { admin } = require("../config/firebase-admin");
const authenticateUser = (req, res, next) => {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((decodedClaims) => {
      if (decodedClaims.admin === true) {
        // Allow access to requested admin resource.
        next();
      } else {
        return res.status(403).json({
          message: "You do not have permission to access this resource.",
        });
      }

      //serveContentForUser("/profile", req, res, decodedClaims);
    })
    .catch((error) => {
      // Session cookie is unavailable or invalid. Force user to login.
      return res.redirect("/login");
    });
};

module.exports = authenticateUser;
