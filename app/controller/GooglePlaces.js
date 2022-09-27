const db = require("../models");
const GooglePlaces = db.serp_gmaps;

exports.findOne = async (place_id) => {
  try {
    const data = await GooglePlaces.findOne(
      { place_id: place_id },
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );
    return data._doc;
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

exports.findIds = async (query) => {
  try {
    const data = await GooglePlaces.find({}, { place_id: 1 });
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
