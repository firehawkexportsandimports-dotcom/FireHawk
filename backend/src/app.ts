import express from "express";
import cors from "cors";

import productsRoutes from "./routes/products.routes";
import categoriesRoutes from "./routes/categories.routes";

const app = express();

// ✅ MUST BE FIRST
app.use(cors());

app.use(express.json());

// routes
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);

app.get("/", (_, res) => {
  res.send("Firehawk Backend Running");
});

export default app;
