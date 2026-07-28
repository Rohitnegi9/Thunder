import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";

import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "AI Chat Backend is running"
  });
});

app.use("/", userRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at port ${process.env.PORT}`);
    });

  } catch (err) {
    console.log("Server failed to start");
    console.log(err.message);
    process.exit(1);
  }
};

startServer();