const db = require("../models");
const User = db.user;
const Stat = db.stat;
const ShortUniqueId = require("short-unique-id");

exports.generate = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) return res.status(403).send({ auth: false, message: 'No token provided' });

        const subject = req.subject;

        const uid = new ShortUniqueId({ length: 10 });
        const uniqueId = uid.rnd();

        // Save the unique ID to the database
        const stat = new Stat({ _id: uniqueId });
        const savedStat = await stat.save();

        // Find the user and update their pixels array with the new pixel
        const user = await User.findByIdAndUpdate(userId, {
            $push: {
                pixels: {
                    subject: subject,
                    statId: savedStat._id
                }
            }
        }, { new: true, useFindAndModify: false });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "Pixel generated and saved successfully", pixelId: uniqueId });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "An error occurred while generating and saving the pixel" });
    }
};
