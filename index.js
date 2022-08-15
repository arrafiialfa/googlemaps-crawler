const puppeteer = require("puppeteer");
const fs = require("fs");
const helper = require("./app/lib/helper");

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

startApp();

async function getData() {
  page = await browser.newPage();

  page.$$eval;

  const place_id = "ChIJF2dBfDn0aS4RAg02EhAYsB4";
  // const place_id = "ChIJh45PEwX0aS4R-jjr_KsRRUc";
  const url = `https://www.google.com/maps/place/?q=place_id:${place_id}`;

  const reviews_result = [];
  const photomenu_result = [];

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

        const obj = JSON.parse(data);
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

        console.log(photosarr);

        // fs.writeFileSync(`crawl_data/photos_timestamp_${Date.now()}`, data);

        photosarr.forEach((photo) => {
          photomenu_result.push(photo[6][0]); //photo menu url
          console.log("photo saved");
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
        const obj = JSON.parse(data);

        const reviewsarr = obj[2];

        reviewsarr.forEach((review) => {
          reviews_result.push(review);
          console.log("reviews saved");
        });
      }
    });

    //goto main page and scroll

    await page.goto(url);

    const placeInfoSelector =
      "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.y0K5Df > button";

    await helper.clickSelectorAndScroll(page, placeInfoSelector, null, {
      divToScrollSelector: divToScrollSelector,
      interval: 300,
      timeout: 5000,
    });

    //goto main page then navigate to food/services menus then scroll
    await page.goto(url);
    console.log("navigating to photo menus");
    const photoMenuSelector =
      "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div > div.fp2VUc > div.cRLbXd > div.dryRY > button > div.KoY8Lc > span.fontTitleSmall.fontTitleMedium";

    await helper.clickSelectorAndScroll(
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

    await helper.clickSelectorAndScroll(
      page,
      moreReviewsSelector,
      ["more reviews", "ulasan lainnya"],
      {
        divToScrollSelector: divToScrollSelector,
        interval: 300,
        timeout: 15000,
      }
    );

    //write data to fs
    fs.writeFileSync(`crawl_data/photos`, photomenu_result.toString());
    fs.writeFileSync(`crawl_data/reviews`, reviews_result.toString());

    //debugging
    page.evaluate(
      ({ reviews_result, photomenu_result }) => {
        console.log(reviews_result, "reviews saved");
        console.log(photomenu_result, "photo saved");
      },
      { photomenu_result, reviews_result }
    );
  } catch (er) {
    console.log(er);
  }
}
