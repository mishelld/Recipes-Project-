const express = require("express");
const app = express();
const recipesRouter = require("./routes/recipesRoutes");
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
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
