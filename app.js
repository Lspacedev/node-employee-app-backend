const express = require("express");
const app = express();
const employeesRouter = require("./routes/employeesRouter");
const indexRouter = require("./routes/indexRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//const csrfProtection = csurf();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true, //included origin as true
    credentials: true,
  })
);

app.use(cookieParser());
//app.use(csrfProtection);
// app.all("*", (req, res, next) => {
//   //res.cookie("XSRF-TOKEN", req.csrfToken());
//   console.log(req.csrfToken());
//   next();
// });

app.use("/", indexRouter);
app.use("/employees", employeesRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
