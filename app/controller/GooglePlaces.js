const db = require("../models");
const GooglePlaces = db.google_places;

exports.findIds = async () => {
  try {
    const data = await GooglePlaces.find({}, "place_id");

    return data;
  } catch (error) {
    console.error(error);
    const result = {
      success: false,
      message: "Get Data Failed!",
      error: error,
    };
    return result;
  }
};
