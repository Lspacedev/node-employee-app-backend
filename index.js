const express = require("express");
const app = express();
const employeesRouter = require("./routes/employeesRouter");
const indexRouter = require("./routes/indexRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const { none } = require("./middleware/multerUpload");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  },
});
app.use(csrfProtection);

app.use("/", indexRouter);
app.use("/employees", employeesRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
