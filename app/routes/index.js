module.exports = (app) => {
  const crawler = require("../controller/Crawler");
  var router = require("express").Router();

  router.get("/", crawler.startApp);
  router.get("/update-photo",crawler.updatePhoto);
  app.use("/api", router);
};

const image =
  "https://lh5.googleusercontent.com/p/AF1QipMX0X_u0-ZIquJI9lQ_q-ArsPfceAOJPq9Xc7yH=w4032-h3024-k-no";
const thumbnail =
  "https://lh5.googleusercontent.com/p/AF1QipMX0X_u0-ZIquJI9lQ_q-ArsPfceAOJPq9Xc7yH=w203-h152-k-no";
