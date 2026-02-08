import express from "express";
import cors from "cors";

import productsRoutes from "./routes/products.routes";
import categoriesRoutes from "./routes/categories.routes";
import homepageRoutes from "./routes/homepage.routes";

const app = express();

// ✅ MUST BE FIRST
app.use(cors());

app.use(express.json());

// routes
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/content", homepageRoutes);

app.get("/", (_, res) => {
  res.send("Firehawk Backend Running");
});

export default app;
