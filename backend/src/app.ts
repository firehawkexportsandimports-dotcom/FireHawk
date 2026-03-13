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

/* ================================
CORS CONFIG (FIRST MIDDLEWARE)
================================ */

const allowedOrigins = [
"http://localhost:5173",
"http://localhost:3000",
"https://firehawk.in",
"https://www.firehawk.in",
"https://fire-hawk.vercel.app",
"https://fire-hawk-s17n.vercel.app"
];

app.use(
cors({
origin: allowedOrigins,
methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"],
credentials: true
})
);

/* =================================
HANDLE PREFLIGHT REQUESTS
================================ */

app.use((req, res, next) => {
res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
res.header(
"Access-Control-Allow-Methods",
"GET,POST,PUT,PATCH,DELETE,OPTIONS"
);
res.header(
"Access-Control-Allow-Headers",
"Content-Type, Authorization"
);

if (req.method === "OPTIONS") {
return res.status(200).end();
}

next();
});

/* =================================
BASIC MIDDLEWARE
================================ */

app.use(express.json());

/* =================================
HEALTH CHECK ROUTES
================================ */

app.get("/api/ping", (_, res) => {
res.json({
alive: true,
db_url_set: !!process.env.DATABASE_URL,
db_url_preview: process.env.DATABASE_URL?.slice(0, 50)
});
});

app.get("/", (_, res) => {
res.json({
status: "OK",
service: "Firehawk API"
});
});

app.get("/api/health", (_, res) => {
res.json({ status: "OK", service: "Firehawk API" });
});

/* =================================
API ROUTES
================================ */

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

export default app;
