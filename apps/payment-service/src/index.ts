import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import { clerkMiddleware } from "@hono/clerk-auth";
import sessionRoute from "./routes/session.route.js";
import { cors } from "hono/cors";
import webhookRoute from "./routes/webhook.route.js";

const app = new Hono();

app.use("*", clerkMiddleware());
app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  })
);

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

app.route("/sessions", sessionRoute);
app.route("/webhook", webhookRoute);
// app.post("/create-stripe-product", async (c) => {
//   const res = await stripe.products.create({
//     id: "123",
//     name: "Test Product",
//     default_price_data: {
//       currency: "usd",
//       unit_amount: 10 * 100,
//     },
//   });

//   return c.json(res);
// });

// app.get("/stripe-product-price", async (c) => {
//   const res = await stripe.prices.list({
//     product: "123",
//   });

//   return c.json(res);
// });

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
