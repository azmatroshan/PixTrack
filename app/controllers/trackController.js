const db = require("../models");
const User = db.user;
const Stat = db.stat;

exports.track = async (req, res) => {
    try {
        const trackId = req.params.trackId;
        const client_ip = req.ip;
        const path = req.path;
        const user_agent = req.headers["user-agent"];

        // Find the corresponding Stat document by its ID
        const stat = await Stat.findById(trackId);

        if (!stat) {
            return res.status(404).send({ message: "Stat not found" });
        }

        // Add visit information to the visits array
        stat.visits.push({ timestamp: Date.now(), client_ip, path, user_agent });

        // Save the updated Stat document
        await stat.save();

        // Respond with a 1x1 transparent pixel image
        res.contentType('image/png');
        const pixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwAB/7+9HgAAAABJRU5ErkJggg==', 'base64');
        res.send(pixel);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "An error occurred while tracking" });
    }
};

exports.deleteStatByTrackId = async (req, res) => {
    try {
        // Parse the trackId from the request query
        const trackId = req.query.trackId;

        // Find and delete the stat document based on the provided trackId
        const deletedStat = await Stat.findOneAndDelete({ _id: trackId });

        // Check if the stat was found and deleted
        if (!deletedStat) {
            return res.status(404).json({ message: "Stat not found" });
        }

        // Return a success message
        return res.status(200).json({ message: "Stat deleted successfully" });
    } catch (error) {
        console.error("Error deleting pixel stat:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
