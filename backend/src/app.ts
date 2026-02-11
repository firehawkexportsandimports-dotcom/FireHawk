import express from "express";
import cors from "cors";

import productsRoutes from "./routes/products.routes";
import categoriesRoutes from "./routes/categories.routes";
import homepageRoutes from "./routes/homepage.routes";
import testimonialRoutes from "./routes/testimonial.routes";
import aboutRoutes from "./routes/about.routes";
import productsContentRoutes from "./routes/productsContent.routes";
import contactRoutes from "./routes/contact.routes";
import enquiryRoutes from "./routes/enquiry.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import dashboardRoutes from "./routes/dashboard.routes";

const app = express();

// ✅ MUST BE FIRST
app.use(cors());

app.use(express.json());

// routes
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/content", homepageRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/content", aboutRoutes);
app.use("/api/products-content", productsContentRoutes);
app.use("/api/content/contact", contactRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (_, res) => {
  res.send("Firehawk Backend Running");
});

export default app;
