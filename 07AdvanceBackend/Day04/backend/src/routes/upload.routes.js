
import express from "express";
import { randomUUID } from "node:crypto";
import cloudinary from "../config/cloudinary.js";
import { requireAuth } from "../middleware/requireAuth.js";
import Media from "../models/Media.js";

const router = express.Router();

router.get("/media", requireAuth, async (req, res) => {
    try {
        const media = await Media.find({ userId: req.user._id, status: "completed" })
            .select("title folder resourceType publicId assetId secureUrl bytes createdAt")
            .sort({ createdAt: -1 })
            .lean();

        res.json({ media });
    } catch (error) {
        console.error("Media list error:", error);
        res.status(500).json({ message: "Unable to load media" });
    }
});

router.post("/signature", requireAuth, async (req, res) => {
    try {
        const { folder, resourceType } = req.body;
        const title = typeof req.body.title === "string" ? req.body.title.trim() : "";

        if (!title || title.length > 80) {
            return res.status(400).json({ message: "Name must be 1 to 80 characters" });
        }

        // 1. Validate the folder
        const allowedFolders = ["Arrays", "LinkedList", "Tree"];

        if (!allowedFolders.includes(folder)) {
            return res.status(400).json({
                message: "Invalid folder selected"
            });
        }

        // 2. Validate media type
        if (!["image", "video"].includes(resourceType)) {
            return res.status(400).json({
                message: "Invalid resource type"
            });
        }

        // 3. Generate a unique upload ID
        const uploadId = randomUUID();

        // 4. Create pending upload record in MongoDB
        const media = await Media.create({
            userId: req.user._id,
            uploadId: uploadId,
            folder: folder,
            resourceType: resourceType,
            title: title,
            status: "pending"
        });

        // 5. Generate Cloudinary signature
        const timestamp = Math.floor(Date.now() / 1000);

        const paramsToSign = {
            timestamp: timestamp,
            asset_folder: folder,
            context: `uploadId=${uploadId}`,
            notification_url: process.env.CLOUDINARY_WEBHOOK_URL
        };

        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET
        );

        // 6. Return upload authorization
        res.status(200).json({
            uploadId: media.uploadId,
            signature: signature,
            timestamp: timestamp,
            asset_folder: folder,
            context: paramsToSign.context,
            notification_url: paramsToSign.notification_url,
            api_key: process.env.CLOUDINARY_API_KEY,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME
        });

    } catch (error) {
        console.error("Upload signature error:", error);

        res.status(500).json({
            message: "Unable to generate upload signature"
        });
    }
});

export default router;
