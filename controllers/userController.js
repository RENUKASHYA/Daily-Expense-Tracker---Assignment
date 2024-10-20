const User = require("../models/User");

// Create a new user
const createUser = async (req, res) => {
  const { name, email, mobile } = req.body;
  try {
    const user = new User({ name, email, mobile });
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Get user details
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getUser,
};
