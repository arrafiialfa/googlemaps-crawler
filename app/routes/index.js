module.exports = (app) => {
  const crawler = require("../controller/Crawler");
  var router = require("express").Router();

  router.get("/", crawler.startApp);
  app.use("/api", router);
};
