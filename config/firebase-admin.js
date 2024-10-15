const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");
require("dotenv").config();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.BUCKET_URL,
});
const db = admin.firestore();
let bucket = admin.storage().bucket();

module.exports = { db, bucket, admin };
