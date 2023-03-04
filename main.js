const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  createUser,
  editUser,
  deleteUser,
} = require("./userController");
const Prisma = require("@prisma/client");
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

// Route untuk page (HTML):
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/", async (req, res) => {
  const users = await prisma.userGame.findMany({
    include: { userGameBiodata: true },
  }); // baca database
  res.render("index", { users: users }); // masukin data ke "index.ejs", lalu ditampilkan.
});
app.get("/user/create", (req, res) => {
  res.render("create-user");
});
app.get("/user/update/:id", async (req, res) => {
  const id = Number(req.params.id); // "15" => 15

  const user = await prisma.userGame.findUnique({ where: { id } });
  res.render("update-user", { user });
});

// Route untuk handle Sumbit form:
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // kalau di hit dengan data yang sesuai: kita redirect ke halaman utama.
  // kalau di hit dengan data yang salah: kita biarkan di halaman login.
  if (username === "admin" && password === "superadminkerenabis") {
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});
app.post("/user/create", async (req, res) => {
  const { username, password } = req.body;

  // panggil database:
  // lalu kalau berhasil, redirect user ke halaman "/"
  await prisma.userGame.create({
    data: { username, password },
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
