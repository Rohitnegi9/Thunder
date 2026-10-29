import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        uploadId: {
            type: String,
            required: true,
            unique: true
        },

        folder: {
            type: String,
            required: true,
            enum: ["Arrays", "LinkedList", "Tree"]
        },

        resourceType: {
            type: String,
            required: true,
            enum: ["image", "video"]
        },

        title: {
            type: String,
            trim: true,
            maxlength: 80,
            default: "Untitled media"
        },

        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending"
        },

        publicId: {
            type: String,
            default: null
        },

        assetId: {
            type: String,
            default: null
        },

        secureUrl: {
            type: String,
            default: null
        },

        bytes: {
            type: Number,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Media = mongoose.model("Media", mediaSchema);

export default Media;
