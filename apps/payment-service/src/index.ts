import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import { clerkMiddleware } from "@hono/clerk-auth";

const app = new Hono();
app.use("*", clerkMiddleware());

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/test", shouldBeUser, (c) => {
  return c.json({
    message: "Payment Service! You are logged in",
    userId: c.get("userId"),
  });
});

const start = async () => {
  try {
    await serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log(`Payment service is running on port 8002`);
      }
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
