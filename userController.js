const Prisma = require("@prisma/client");

const prisma = new Prisma.PrismaClient();

const getAllUsers = (req, res) => {
  prisma.userGame
    .findMany()
    .then((users) => {
      console.log("Read DB Success. Users: ", users);
      res.json(users);
    })
    .catch((error) => {
      console.log("Ada ERROR!: ", error);
      res.json([]);
    });
};

const getSingleUser = (req, res) => {
  const id = Number(req.params.id); // "1" => 1

  prisma.userGame
    .findUnique({ where: { id: id } })
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      res.json(user);
    })
    .catch((error) => {
      console.log("Ada ERROR!: ", error);
      res.json({ status: "user tidak ditemukan" });
    });
};

const createUser = async (req, res) => {
  // req.body = { id, username, password }

  // Proses validasi manual
  if (!req.body) {
    res.json({
      status: "failed to create user",
      message: "missing payload",
    });
    return;
  }
  if (!req.body.password) {
    res.json({
      status: "failed to create user",
      message: 'missing property "password" in payload',
    });
    return;
  }
  if (!req.body.username) {
    res.json({
      status: "failed to create user",
      message: 'missing property "username" in payload',
    });
    return;
  }

  try {
    const result = await prisma.userGame.create({
      data: { username: req.body.username, password: req.body.password },
    });
    res.json({ status: "berhasil membuat user", info: result });
  } catch (error) {
    res.json({ status: "gagal membuat user", info: error });
  }
};

const editUser = async (req, res) => {
  const id = Number(req.params.id);

  // Proses validasi manual
  if (!req.body) {
    res.json({
      status: "failed to update user",
      message: "missing payload",
    });
    return;
  }
  if (!req.body.password) {
    res.json({
      status: "failed to update user",
      message: 'missing property "password" in payload',
    });
    return;
  }
  if (!req.body.username) {
    res.json({
      status: "failed to update user",
      message: 'missing property "username" in payload',
    });
    return;
  }

  try {
    const result = await prisma.userGame.update({
      where: { id: id },
      data: { username: req.body.username, password: req.body.password },
    });
    res.json({ status: "berhasil mengupdate user", info: result });
  } catch (error) {
    res.json({ status: "gagal mengupdate user", info: error });
  }
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  prisma.userGame
    .delete({ where: { id: id } })
    .then((info) => {
      res.json({ info });
    })
    .catch((error) => {
      res.json({ status: "gagal menghapus user", message: error });
    });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  editUser,
  deleteUser,
};
