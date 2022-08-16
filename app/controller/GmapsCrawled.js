const db = require("../models");
const GmapsCrawledData = db.gmaps_crawled_data;
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const navigate = require("../lib/navigate");
const formatData = require("../lib/formatData");
const GooglePlaces = require("./GooglePlaces");

/**
 * @type {puppeteer.Browser}
 */
let browser = null;
/**
 * @type {puppeteer.Page}
 */

let page = null;
let ids = null;
let checkpoint = null;
let i = 0;

exports.startApp = async (request, response) => {
  const arr = await GooglePlaces.findIds(request.query);
  ids = arr.map((place) => place.place_id);

  fs.writeFile(
    `${path.resolve(__dirname)}../../../crawl_data/idstocrawl.json`,
    `[${ids.map((id) => `"${id}"`).join(",")}]`,
    (err) => {
      if (err) {
        console.error("error saving ids", err);
      }
      console.log("ids saved");
    }
  );

  if (!browser) {
    try {
      browser = await puppeteer.launch({
        headless: false,
        args: ["--lang=en-UK", "--no-sandbox", "--disable-dev-shm-usage"],
      });
      page = await browser.newPage();
      response.status(200).json({
        message: `Crawler is Running, starting from ${i} ${ids[i]} of ${
          ids.length - 1
        } ${ids[ids.length - 1]}`,
      });
      getData(page, ids[i]);
    } catch (error) {
      console.log(error, "Retrying");
      this.startApp(request, response);
    }
  }
};

async function getData(page, place_id) {
  console.log(i, "currently at", ids[i]);
  checkpoint = place_id;

  fs.writeFile(
    `${path.resolve(__dirname)}../../../crawl_data/checkpoint.json`,
    ` ["${place_id}_${i}"]`,
    (err) => {
      if (err) {
        console.error("error saving checkpoint", err);
      }
      console.log("checkpoint saved");
    }
  );

  const url = `https://www.google.com/maps/place/?q=place_id:${place_id}`;

  let reviews_result = [];
  let photomenu_result = [];
  let place_data = null;

  const divToScrollSelector =
    "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf";

  //response listener
  page.on("response", async (res) => {
    const string = "place?authuser";
    if (res.url().indexOf(string) > 0) {
      console.log("place payload captured");
      const arr = await res.text();

      const datastring = `${arr}`;

      const [key, data] = datastring.split(")]}'");

      const obj = JSON.parse(data);

      place_data = formatData.formatPlaceData(obj);
    }
  });

  page.on("response", async (res) => {
    const string = "photo?authuser";
    if (res.url().indexOf(string) > 0) {
      console.log("photo payload captured");
      const arr = await res.text();

      const datastring = `${arr}`;

      const [key, data] = datastring.split(")]}'");

      const obj = JSON.parse(data);

      const photosarr = obj[0];

      photosarr.map((photo) => {
        photomenu_result.push(
          photo[6][0] //photo menu url
        );
      });
    }
  });

  page.on("response", async (res) => {
    const string = "listentitiesreviews";
    if (res.url().indexOf(string) > 0) {
      console.log("reviewes payload captured");
      const arr = await res.text();

      const datastring = `${arr}`;

      const [key, data] = datastring.split(")]}'");

      const obj = JSON.parse(data);

      const reviewsarr = obj[2];

      reviewsarr.map((review) => {
        reviews_result.push(formatData.formatReview(review));
      });
    }
  });

  try {
    //crawl data exsist => return
    const isCrawled = await GmapsCrawledData.findOne({
      place_id: place_id,
    });

    if (isCrawled) {
      return;
    }

    //goto main page then navigate to food/services menus then scroll
    await page.goto(url);
    console.log("navigating to photo menus");
    const photoMenuSelector =
      "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div > div.fp2VUc > div.cRLbXd > div.dryRY > button > div.KoY8Lc > span.fontTitleSmall.fontTitleMedium";

    await navigate.clickSelectorAndScroll(
      page,
      photoMenuSelector,
      [
        "menu",
        "food",
        "drink",
        "makanan &amp; minuman",
        "food &amp; drink",
        "all",
        "semua",
      ],
      {
        divToScrollSelector: divToScrollSelector,
        interval: 150,
        timeout: 7000,
      }
    );

    //goto main page then go to place info then scroll
    await page.goBack();

    const placeInfoSelector =
      "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.y0K5Df > button";

    await navigate.clickSelectorAndScroll(page, placeInfoSelector, null, {
      divToScrollSelector: divToScrollSelector,
      interval: 300,
      timeout: 1000,
    });

    //goto main page then go to more reviews page
    await page.goBack();

    console.log("navigating to more reviews page");

    const moreReviewsSelector =
      "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div > div > button > span > span";

    await navigate.clickSelectorAndScroll(
      page,
      moreReviewsSelector,
      ["more reviews", "ulasan lainnya"],
      {
        divToScrollSelector: divToScrollSelector,
        interval: 150,
        timeout: 15000,
      }
    );

    if (place_data) {
      place_data.photos = {
        food: [...photomenu_result],
      };
      place_data.reviews = reviews_result;

      create(place_data)
        .then((response) => {
          console.log("data is sucessfully saved to database", response);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("place request not captured");
    }

    return;
  } catch (err) {
    console.log(err);

    if (place_data) {
      place_data.photos = {
        food: [...photomenu_result],
      };
      create(place_data)
        .then((response) => {
          console.log("data is sucessfully saved to database", response);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("place request not captured");
    }

    return;
  } finally {
    if (i === ids.length - 1) {
      console.log("Crawl is complete");
      return;
    } else {
      i++;
      getData(page, ids[i]);
    }
  }
}

const create = async (document) => {
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
