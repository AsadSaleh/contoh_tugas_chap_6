const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  createUser,
  editUser,
  deleteUser,
} = require("./userController");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Hello world, welcome!"));

app.get("/user", getAllUsers);
app.get("/user/:id", getSingleUser);
app.post("/user", createUser);
app.put("/user/:id", editUser);
app.delete("/user/:id", deleteUser);

app.listen(8080, () => {
  console.log("Server sudah menyala");
});
