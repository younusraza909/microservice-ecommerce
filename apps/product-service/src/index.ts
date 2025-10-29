import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  })
);
app.use(express.json());
// Clerk middleware to authenticate requests
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/test", shouldBeUser, (req: Request, res: Response) => {
  res.json({
    message: "Product Service! You are logged in",
    userId: req.userId,
  });
});

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong" });
});

app.listen(process.env.PORT, () => {
  console.log("Product service is running on port 8000");
});
