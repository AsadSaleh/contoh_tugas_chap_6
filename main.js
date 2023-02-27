const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  createUser,
  editUser,
  deleteUser,
} = require("./userController");

const app = express();

app.get("/", (req, res) => res.send("Hello world, welcome!"));

// 1.a. endpoint GET /user => ngambil list of users
app.get("/user", getAllUsers);

// 1.b. endpoint GET /user/:id => ngambil 1 user
app.get("/user/:id", getSingleUser);

// 1.c. endpoint POST /user => buat user
app.post("/user", createUser);

// 1.d. endpoint PUT /user/:id => ngedit user
app.put("/user/:id", editUser);

// 1.e. enpoint DELETE /user/:id => delete user
app.delete("/user/:id", deleteUser);

app.listen(8080, () => {
  console.log("Server sudah menyala");
});
