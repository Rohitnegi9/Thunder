import User from "../model/userSchema.js";

const loadUserMiddleware = async (req, res, next) => {
    try {
        const existingUser = await User.findById(req.userId);

        if (!existingUser) {
            return res.status(404).json({
                message: "User doesn't exist"
            });
        }

        req.user = existingUser;

        next();
    } catch (error) {
        console.log("Load user error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export default loadUserMiddleware;