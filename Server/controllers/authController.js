const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User alredy exists!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      name,
      email,
      password: hashedPassword,
      role: role || "USER",
    });
    const token = generateToken(user);

    res.status(201).json({
      user: { id: user.id, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User did not found!!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!!" });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: { id: user.id, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login };