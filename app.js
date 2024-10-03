const express = require("express");
const app = express();
const employeesRouter = require("./routes/employeesRouter");

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/employees", employeesRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
