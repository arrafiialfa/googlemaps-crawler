const db = require("../models");
const SerpGmaps = db.serp_gmaps;

exports.findIds = async (query) => {
  // if (query.types) {
  //   query.types = { $in: query.types };
  // }

  query = {
    $or: [
      { name: { $in: [/coffee/, /food/, /kopi/, /cafe/] } },
      { types: { $in: ["cafe", "food", "restaurant"] } },
    ],
  };

  try {
    const data = await SerpGmaps.find({}, "place_id");

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
