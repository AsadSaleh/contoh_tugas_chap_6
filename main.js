const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  createUser,
  editUser,
  deleteUser,
} = require("./userController");
const Prisma = require("@prisma/client");
const {
  userUpdateScreenController,
  userCreateScreenController,
  userListScreenController,
} = require("./controllers/userController");
const {
  loginScreenController,
  loginSubmissionController,
} = require("./controllers/authController");
const prisma = new Prisma.PrismaClient();

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/static", express.static("public"));
app.set("view engine", "ejs");

app.get("/", userListScreenController);
app.get("/user/create", userCreateScreenController);
app.get("/user/update/:id", userUpdateScreenController);

app.get("/login", loginScreenController);
app.post("/login", loginSubmissionController);

app.post("/user/create", async (req, res) => {
  const { username, password } = req.body;

  // panggil database:
  // lalu kalau berhasil, redirect user ke halaman "/"
  await prisma.userGame.create({
    data: {
      username,
      password,
      userGameBiodata: {
        create: {
          age: Number(req.body.age),
          city: req.body.city,
          gender: req.body.gender,
          name: req.body.fullname,
        },
      },
    },
  });
  res.redirect("/");
});
app.post("/user/update", async (req, res) => {
  const { id, username, password } = req.body;
  const numberId = Number(id);

  await prisma.userGame.update({
    where: { id: numberId },
    data: { username, password },
  });
  res.redirect("/");
});

// Route untuk API:
app.get("/api/user", getAllUsers);
app.get("/api/user/:id", getSingleUser);
app.post("/api/user", createUser);
app.put("/api/user/:id", editUser);
app.delete("/api/user/:id", deleteUser);

app.listen(8080, () => {
  console.log("Server sudah menyala di url: http://localhost:8080");
});
