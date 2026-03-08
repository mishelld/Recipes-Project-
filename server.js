const express = require("express");
const app = express();
const recipesRouter = require("./routes/recipesRoutes");
const { sequelize } = require("./db/models/index.js");

const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/recipes", recipesRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: true,
    message: err.message || "Server Error",
    statusCode: statusCode,
  });
});

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
}
const PORT = 3000;
app.listen(PORT, async () => {
  console.log("Server is listening on port " + PORT);
  await dbConnect();
});
