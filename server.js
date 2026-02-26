const express = require("express");
const app = express();
const recipesRouter = require("./routes/recipesRoutes");
app.use(express.json());
app.use("/api/recipes", recipesRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
