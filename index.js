const path = require("path");
const ENV_FILE = path.join(__dirname, ".env");
require("dotenv").config({ path: ENV_FILE });
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cookieParser());

app.set("view engine", "ejs");

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.log(error.message));

db.once("connected", (connected) =>
  console.log("Successfully connected to database!")
);

const homeRoute = require("./routes/home");
const projectRoute = require("./routes/project");
const addProjectRoute = require("./routes/addProject");
const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
const deleteRoute = require("./routes/delete");
const editRoute = require("./routes/edit");
const updateRoute = require("./routes/update");
const { checkUser } = require("./middleware/check");
const filterRoute = require("./routes/filter");

app.use("*", checkUser);
app.use("/", homeRoute);
app.use(projectRoute);
app.use(addProjectRoute);
app.use(loginRoute);
app.use(signupRoute);
app.use("/", filterRoute);
app.use("/project/delete", deleteRoute);
app.use("/project/edit", editRoute);
app.use(updateRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
