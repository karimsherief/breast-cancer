const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Routes

const accountRoutes = require("./routes/accountRoutes");
const doctorsRoutes = require("./routes/doctorsRoutes");
const patientsRoutes = require("./routes/patientsRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use("/public", express.static("./public/"));
app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log(req.method, req.path);
  next();
});
app.get("/main", (req, res) =>
  res.render("main", { title: "Main page", css: "mainPage" })
);

app.get("/", (req, res) => {
  res.redirect("main");
});

app.use("/", patientsRoutes);
app.use("/account", accountRoutes);
app.use("/doctor", doctorsRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found", css: "404" });
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB succesfully");
    app.listen(port, () => {
      console.log(`listen on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
