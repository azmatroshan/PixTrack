const controller = require("../controllers/trackController");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/track/:trackId", controller.track);
  
  app.get("/api/deletePixel", [authJwt.verifyToken], controller.deleteStatByTrackId);
};