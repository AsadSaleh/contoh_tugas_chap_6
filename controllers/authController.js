function loginScreenController(req, res) {
  res.render("login");
}

function loginSubmissionController(req, res) {
  const { username, password } = req.body;

  // kalau di hit dengan data yang sesuai: kita redirect ke halaman utama.
  // kalau di hit dengan data yang salah: kita biarkan di halaman login.
  if (username === "admin" && password === "superadminkerenabis") {
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
}

module.exports = { loginScreenController, loginSubmissionController };
