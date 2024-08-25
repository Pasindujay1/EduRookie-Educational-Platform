import express from "express";
import cors from "cors";
import stripe from "stripe";
import dotenv from "dotenv";
import { connect } from "./config/db_con.js";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("tiny"));

const stripeClient = stripe(process.env.STRIPE_KEY);

app.post("/checkout", async (req, res) => {
  console.log(req.body);

  const courses = req.body.courses;

  if (!courses) {
    return res.status(400).json({ error: "No courses found" });
  }

  //check if the stripeProductId is valid
  if (courses.some((course) => !course.stripeProductId)) {
    return res.status(400).json({ error: "Invalid course" });
  }

  const courseItems = courses.map((courses) => ({
    price: courses.stripeProductId,
    quantity: 1,
  }));

  const session = await stripeClient.checkout.sessions.create({
    line_items: courseItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(JSON.stringify({ url: session.url }));
});

app.post("/create-product", async (req, res) => {
  const { name, price, images } = req.body;

  if (!name || !price || !images) {
    return res.status(400).json({ error: "Please provide all fields" });
  }

  try {
    const product = await stripeClient.products.create({
      name: name,
      images: images,
      default_price_data: {
        unit_amount: price,
        currency: "lkr",
      },
      expand: ["default_price"],
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, async () => {
  try {
    // await connect();
    console.log(`Payment service is running on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
