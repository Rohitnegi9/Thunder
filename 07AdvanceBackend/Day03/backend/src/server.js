import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import authRouter from "./routes/auth.routes.js";

const app = express();


// 1. CORS Configuration
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


// 2. Middleware
app.use(express.json());
app.use(cookieParser());


// 3. Routes
app.get("/api/health", (req, res) => {
    res.status(200).json({
        message: "Backend is running"
    });
});

app.use("/api/auth", authRouter);


// 4. Handle Unknown Routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});


// 5. Error Handling
app.use((error, req, res, next) => {
    console.error(error);

    res.status(500).json({
        message: "Something went wrong"
    });
});


// 6. Connect Database and Start Server
async function startServer() {
    try {
        await connectDB();
        await connectRedis();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
}

startServer();