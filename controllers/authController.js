const authModel = require("../models/authModel.js");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({ status: 400, message: "Email or password missing" });
    }

    const result = await authModel.login(email, password);

    if (result) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Login successful",
        ...result, // contains { user, token }
      });
    } else {
      next({ status: 401, message: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    next({ status: 500, message: err.message });
  }
}
async function register(req, res, next) {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    if (!username || !email || !password || !firstName || !lastName) {
      return next({ status: 400, message: "All fields are required" });
    }
    const { user, token } = await authModel.register({
      username,
      email,
      password,
      firstName,
      lastName,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    next({
      status: err.message === "Email already registered" ? 400 : 500,
      message: err.message,
    });
  }
}
async function profile(req, res, next) {
  try {
    const user = await authModel.getProfile(req.user.id);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Profile retrieved successfully",
      user,
    });
  } catch (err) {
    next({ status: 500, message: err.message });
  }
}
module.exports = { login, register, profile };
