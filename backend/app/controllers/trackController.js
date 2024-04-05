const db = require("../models");
const User = db.user;
const Stat = db.stat;

exports.track = (req, res) => {
    // const trackId =  req.body.trackId; //TODO
    res.contentType('image/png');
    // Send a 1x1 transparent pixel image
    const pixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwAB/7+9HgAAAABJRU5ErkJggg==', 'base64');
    res.send(pixel);
}

