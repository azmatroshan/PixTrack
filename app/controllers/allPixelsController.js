const db = require("../models");
const Stat = require("../models/statModel");
const User = db.user;

exports.getAllPixels = async (req, res) => {
    try {
        const userId = req.userId;
        let { page = 1, limit = 10, search = "" } = req.query;
        if (!userId) return res.status(403).send({ auth: false, message: 'No token provided' });

        let searchQuery = {
            $and: [
                { userId: userId },
                { $or: [
                    { subject: { $regex: new RegExp(search, "i") } },
                ]},
            ],
        };

        // Fetch services with pagination
        const pixels = await Stat.find(searchQuery)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .exec();

        // Count total services
        const totalCount = await Stat.countDocuments(searchQuery).exec();

        // Send the pixels array of the user
        res.status(200).send({ pixels: pixels, total: totalCount });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "An error occurred while retrieving pixels" });
    }
};
