const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const colors = require("colors");
const cors = require("cors");

// Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
// const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const otpRoutes = require("./routes/otpRoutes");

// express application
const app = express();

app.use(cors());

dotenv.config();

// Connecting to mongodb server
connectDB();

// Body Parser middleware, no need to install body-parser package
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to node server</h1>");
});

app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
// app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/otp", otpRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`.cyan);
});

module.exports = app; // for testing
