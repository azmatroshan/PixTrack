const db = require("../models");
const User = db.user;
const Stat = db.stat;

exports.track = async (req, res) => {
    try {
        const trackId = req.params.trackId;
        const client_ip = req.ip;
        const path = req.path;

        // Find the corresponding Stat document by its ID
        const stat = await Stat.findById(trackId);

        if (!stat) {
            return res.status(404).send({ message: "Stat not found" });
        }

        // Add visit information to the visits array
        stat.visits.push({ timestamp: Date.now(), client_ip, path });

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