const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

require("dotenv").config();
const port = process.env.PORT || 3000;

// untuk mengakses file statis
app.use(express.static("public"));
// http://localhost:5000/images/1742180861006-logo.png

// Middleware untuk menampilkan log request
app.use(cors());
// app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// routes
const basicRoute = require("./routes/basicRoute");
const companyRoute = require("./routes/companyRoute");
const contactsRoute = require("./routes/contactsRoute");

app.use("/", basicRoute);
app.use("/company", companyRoute);
app.use("/api/contacts", contactsRoute);

app.use((req, res) => {
  res.status(404).send("<h1>Halaman tidak ditemukan</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
