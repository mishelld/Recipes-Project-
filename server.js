const express = require("express");
const app = express();
const recipesRouter = require("./routes/recipesRoutes");
app.use(express.json());
app.use("/api/recipes", recipesRouter);

// Error Handling Middleware (always in the END)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
