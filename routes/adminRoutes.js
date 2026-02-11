const express = require("express");
const adminAuth = require("../middlewares/adminAuth");
const { adminLogin, verifyCurrentCredentials, updateCredentials } = require("../controller/adminController");

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.post("/verify", adminAuth, verifyCurrentCredentials);
adminRouter.put("/update", adminAuth, updateCredentials);

module.exports = adminRouter;

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGM3YjRhODg2M2M4ODNhYjQ4NDk5NSIsImlhdCI6MTc3MDgxNDMxOCwiZXhwIjoxNzcwOTAwNzE4fQ.SdQU14NOlZQe1_mgL-E6WfeLkoSsgyMRFup2SjgLN_g"