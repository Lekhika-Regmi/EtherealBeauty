const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Customer = require("./customers.model.js"); // Adjust the path to your model
const User = require("../users.model.js"); // Adjust the path to your model

// Register a customer
router.post("/register/customer", async (req, res) => {
  try {
    const { username, phone_no, password, email } = req.body; 
    console.log(req.body);  // Log the received data

    // Extract data from the request body

    const existingUser = await User.findOne({ where: { email } });
if (existingUser) {
  return res.status(400).json({ error: "Email already in use" });
}

    
    const hashedPassword = await bcrypt.hash(password, 10);  
  
    //create user instance 
    const newUser = await User.create({ email, password: hashedPassword, role: "customer" });
    

    // Create Customer instance linked to User
    const newCustomer = await Customer.create({ username, phone_no, user_id: newUser.id });
    

     
    res.status(201).json({ message: "Customer registered successfully", user: newUser, customer: newCustomer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;