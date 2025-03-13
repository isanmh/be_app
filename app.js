const express = require("express");
const morgan = require("morgan");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 3000;

// Middleware untuk menampilkan log request
app.use(morgan("dev"));

// routes
const basicRoute = require("./routes/basicRoute");

app.use("/", basicRoute);

app.use((req, res) => {
  res.status(404).send("<h1>Halaman tidak ditemukan</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
