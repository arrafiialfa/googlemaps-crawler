const puppeteer = require("puppeteer");
const fs = require("fs");
const navigate = require("./app/lib/navigate");
const formatData = require("./app/lib/formatData");
const db = require("./app/models");
const Mongoose = require("./app/controller/MongooseController");

/**
 * @type {puppeteer.Browser}
 */
let browser = null;
/**
 * @type {puppeteer.Page}
 */

let page = null;

async function startApp() {
  if (!browser) {
    try {
      browser = await puppeteer.launch({
        headless: false,
        args: ["--lang=en-UK", "--no-sandbox", "--disable-dev-shm-usage"],
      });

      getData();
    } catch (error) {
      console.log(error, "Retrying");
      startApp();
    }
  }
}

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

startApp();

async function getData() {
  page = await browser.newPage();

  const place_id = "ChIJ7SN9VxX0aS4RG1kcAMetBMA";
  const url = `https://www.google.com/maps/place/?q=place_id:${place_id}`;

  let reviews_result = [];
  let photomenu_result = [];
  let place_data = null;

  const divToScrollSelector =
    "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf";

  try {
    //response listener
    page.on("response", async (res) => {
      const string = "place?authuser";
      if (res.url().indexOf(string) > 0) {
        console.log("place payload captured");
        const arr = await res.text();

        const datastring = `${arr}`;

        const [key, data] = datastring.split(")]}'");

        fs.writeFileSync(`crawl_data/place_timestamp_${Date.now()}`, data);
        console.log("place data saaved");

        const obj = JSON.parse(data);

        place_data = formatData.formatPlaceData(obj);
        console.log(place_data);
      }
    });

    page.on("response", async (res) => {
      const string = "photo?authuser";
      if (res.url().indexOf(string) > 0) {
        console.log("payload captured");
        const arr = await res.text();

        const datastring = `${arr}`;

        const [key, data] = datastring.split(")]}'");

        const obj = JSON.parse(data);

        const photosarr = obj[0];

        fs.writeFileSync(`crawl_data/photos_timestamp_${Date.now()}`, data);
        console.log("photo saved");

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
        console.log("payload captured");
        const arr = await res.text();

        const datastring = `${arr}`;

        const [key, data] = datastring.split(")]}'");

        fs.writeFileSync(`crawl_data/reviews_timestamp_${Date.now()}`, data);
        console.log("reviews saved");

        const obj = JSON.parse(data);

        const reviewsarr = obj[2];

        reviewsarr.map((review) => {
          reviews_result.push(formatData.formatReview(review));
        });
      }
    });

    //goto main page then go to place info then scroll

    await page.goto(url);

    const placeInfoSelector =
      "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.y0K5Df > button";

    await navigate.clickSelectorAndScroll(page, placeInfoSelector, null, {
      divToScrollSelector: divToScrollSelector,
      interval: 300,
      timeout: 1000,
    });

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
        interval: 300,
        timeout: 15000,
      }
    );

    //goto main page then go to more reviews page
    await page.goto(url);

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

      Mongoose.create(place_data)
        .then((response) => {
          console.log("data is sucessfully saved to database", response);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("place request not captured");
    }

    //debugging
    page.evaluate(
      ({ reviews_result, photomenu_result, place_data }) => {
        console.log(reviews_result, "reviews saved");
        console.log(photomenu_result, "photo saved");
        console.log(place_data, "placedata saved");
      },
      { photomenu_result, reviews_result, place_data }
    );
  } catch (er) {
    console.log(er);
  }
}
