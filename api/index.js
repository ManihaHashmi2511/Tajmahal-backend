const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../config/db");
const productRoute = require("../routes/productRoutes");
const adminRouter = require("../routes/adminRoutes");

const app = express();

/* =======================
   MIDDLEWARES
======================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",        // for local dev
      "https://tajmahal-frontend.vercel.app" // frontend production URL
    ], 
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

/* =======================
   TEST ROUTE
======================= */
app.get("/test", (req, res) => {
  res.send("Backend is alive 🚀");
});

/* =======================
   API ROUTES
======================= */
app.use("/api/products", productRoute);
app.use("/api/admin", adminRouter)

/* =======================
   DATABASE
======================= */
connectDB();

// app.listen(process.env.PORT || 5000, () => {
//   console.log(`Server running on port ${process.env.PORT || 5000}`);
// });


module.exports = app;
