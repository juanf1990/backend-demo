const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
