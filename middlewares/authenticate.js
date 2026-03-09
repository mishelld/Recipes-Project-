const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw { status: 401, message: "No token provided" };
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUser; // Add user into to request (so route handler can use it)
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw { status: 401, message: "Token expired" };
    }
    throw { status: 401, message: "Invalid token" };
  }
}

module.exports = { authenticate };
