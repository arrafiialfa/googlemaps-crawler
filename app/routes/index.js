module.exports = (app) => {
  const crawler = require("../controller/GmapsCrawled");
  var router = require("express").Router();

  router.get("/", crawler.startApp);
  app.use("/api", router);
};
