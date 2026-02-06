const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const productRoute = require('./routes/productRoutes');

const app = express();

// middlewares
app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// test route
app.get("/test", (req, res) => {
  res.send("Backend is alive");
});

// routes

app.use('/api/products', productRoute);

// connect DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
