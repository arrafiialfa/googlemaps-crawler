const db = require("../models");
const GmapsCrawledData = db.coffee_shops;

exports.create = async (document) => {
  console.log(document);
  try {
    const data = await GmapsCrawledData.create(document);
    const result = {
      success: true,
      message: "Create Data Success!",
      data: data,
    };
    return result;
  } catch (error) {
    console.error(error);
    const result = {
      success: false,
      message: "Create Data Failed!",
      error: error,
    };
    return result;
  }
};

exports.findOne = async (query) => {
  try {
    const data = await GmapsCrawledData.findOne(query);
    return data;
  } catch (error) {
    console.error(error);
    const result = {
      success: false,
      message: "Find One Failed",
      error: error,
    };
    return result;
  }
};

exports.findIds = async (query) => {
  try {
    const data = await GmapsCrawledData.find(query, { place_id: 1 });
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

exports.findAll = async (query) => {
  try {
    const data = await GmapsCrawledData.find(query);
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
