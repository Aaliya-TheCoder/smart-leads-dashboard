import express from "express";
import cors from "cors";
import leadRoutes from "./routes/leadRoutes";
import testRoutes from "./routes/testRoutes";
import authRoutes from "./routes/authRoutes";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Smart Lead Dashboard API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/leads", leadRoutes);

export default app;