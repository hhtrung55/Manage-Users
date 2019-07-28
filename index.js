const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const authMiddleware = require("./middleware/auth.middleware");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/auth", authRouter);
app.use("/users", authMiddleware.auth, userRouter);

app.listen(3000, () =>
  console.log(
    "server started at " +
      new Date().getHours() +
      " : " +
      new Date().getMinutes()
  )
);
