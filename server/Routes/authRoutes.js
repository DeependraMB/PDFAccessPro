const express = require("express");
const router = express.Router();
const { authController, loginController } = require('../Controllers/authController');

//REGISTER || User

router.post("/register", async (req,res) =>{
    try {
        await authController(req, res);
    } catch (error) {
        console.error("Error in /signup route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//LOGIN || User

router.post("/login" ,async (req,res) =>{
    try {
        await loginController(req, res);
    } catch (error) {
        console.error("Error in /signin route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;