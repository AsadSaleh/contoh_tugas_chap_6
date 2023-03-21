const Prisma = require("@prisma/client");
const prisma = new Prisma.PrismaClient();

async function userUpdateScreenController(req, res) {
  // 1. Parsing user input
  const id = Number(req.params.id); // "15" => 15
  if (!id) {
    res.render("update-user", { user: null, error: "invalid id" });
  }

  // 2. Minta data yang sesuai ke Model (DB):
  const user = await prisma.userGame.findUnique({ where: { id } });

  // 3. Buat HTML, lalu return HTML ke client:
  res.render("update-user", { user }); // EJS
}

function userCreateScreenController(req, res) {
  res.render("create-user");
}

async function userListScreenController(req, res) {
  const users = await prisma.userGame.findMany({
    include: { userGameBiodata: true },
  }); // baca database
  res.render("index", { users: users }); // masukin data ke "index.ejs", lalu ditampilkan.
}

module.exports = {
  userUpdateScreenController,
  userCreateScreenController,
  userListScreenController,
};
