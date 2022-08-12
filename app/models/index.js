require("dotenv").config();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URL;
db.google_places = require("./google_places.js")(mongoose);
db.serp_maps = require("./serp_maps.js")(mongoose);

mongoose.set("debug", true);
module.exports = db;
