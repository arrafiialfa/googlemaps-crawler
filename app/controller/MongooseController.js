const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const db = require("../models");
const GmapsCrawledData = db.gmaps_crawled_data;

exports.create = async (document) => {
  // console.log(req.body);
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
