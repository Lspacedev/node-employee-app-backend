const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.BUCKET_URL,
});
const db = admin.firestore();
let bucket = admin.storage().bucket();

module.exports = { db, bucket, admin };
