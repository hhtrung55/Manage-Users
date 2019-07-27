const express = require("express");
const app = express();
const db = require("./db");

const userRouter = require("./routes/user.route");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/users", userRouter);

app.listen(3000, () =>
  console.log(
    "server started at " +
      new Date().getHours() +
      " : " +
      new Date().getMinutes()
  )
);
