const { hashPassword, comparePassword } = require("../Helper/Bcrypt");
const User = require("../Models/userModel");
const JWT = require("jsonwebtoken");

// Register
const authController = async (req, res) => {
  try {
    const formData = req.body;

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email: formData.email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered. Please log in.",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(formData.password);

    // Create a new User instance
    const newUser = new User({
      name: formData.name,
      gender: formData.gender,
      phno: formData.mobno,
      email: formData.email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// LOGIN

const loginController = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(200).json({ 
          success: false,
          message: "Invalid Email or Password" });
      }
  
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(200).json({ message: "Invalid credentials" });
      }

      const token = JWT.sign(
        
        { _id: user._id },
        process.env.JWT_SECRETKEY,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({
        success: true,
        message: "Login Successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      console.error("Error during student login:", error);
      res.status(500).json({ 
        success: false,
        message: "Internal server error" });
    }
  };
  

module.exports = {
  authController,loginController
};
