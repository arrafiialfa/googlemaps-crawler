require("dotenv").config();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URL;
db.gmaps_crawled_data = require("./googlemaps_crawled.js")(mongoose);
db.google_places = require("./google_places.js")(mongoose);
db.serp_gmaps = require("./serp_gmaps")(mongoose);

mongoose.set("debug", true);
module.exports = db;
