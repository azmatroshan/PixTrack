const db = require("../models");
const Stat = require("../models/statModel");
const User = db.user;

exports.pixelStat = async (req, res) => {
    try {
        // Parse the trackId from the request query
        const trackId = req.query.trackId;

        // Query the Stat model based on the provided trackId
        const stat = await Stat.findOne({ _id: trackId });

        // Check if the stat exists
        if (!stat) {
            return res.status(404).json({ message: "Stat not found" });
        }

        // Return the stat data as a response
        return res.status(200).json({ stat });
    } catch (error) {
        console.error("Error fetching pixel stat:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
