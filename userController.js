const getAllUsers = (req, res) => {
  // Baca list users dari database
  const users = bacaDatabase();
  res.json(users);
};

const getSingleUser = (req, res) => {
  const id = req.params.id;

  const user = bacaDatabase(id);
  res.json(user);
};

const createUser = (req, res) => {
  const newUser = req.body;

  createUserKeDatabase(newUser);
  res.json({ status: "create user berhasil" });
};

const editUser = (req, res) => {
  const id = req.params.id;
  const newUser = req.body;

  updateUserKeDatabase(id, newUser);
  res.json({ status: "edit user berhasil" });
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  deleteuserKeDatabase(id);
  res.json({ status: "user berhasil dihapus" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  editUser,
  deleteUser,
};
