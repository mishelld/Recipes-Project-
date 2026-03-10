const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(email, password) {
  const user = await User.findOne({
    where: { email: email.toLowerCase() },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const { password: _, ...userNoPassword } = user.toJSON();
    const token = jwt.sign({ id: userNoPassword.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return { user: userNoPassword, token };
  }

  return null;
}

async function register({ username, email, password, firstName, lastName }) {
  const existingUser = await User.findOne({
    where: { email },
  });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const { password: _, ...userNoPassword } = user.toJSON();

  return { user: userNoPassword, token };
}

async function getProfile(userId) {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  const { password: _, ...userNoPassword } = user.toJSON();
  return userNoPassword;
}

module.exports = { login, register, getProfile };
