const db = require("../models");
const User = db.user;

exports.getAllPixels = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) return res.status(403).send({ auth: false, message: 'No token provided' });

        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Send the pixels array of the user
        res.status(200).send({ pixels: user.pixels });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "An error occurred while retrieving pixels" });
    }
};
