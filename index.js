import express from "express";
import cors from "cors";
import routers from "./src/routers/index.js";

const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(routers);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
