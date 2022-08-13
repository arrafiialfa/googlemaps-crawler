const puppeteer = require("puppeteer");
const fs = require("fs");

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
        args: ["--no-sandbox", "--disable-dev-shm-usage"],
      });

      getData();
    } catch (error) {
      console.log(error, "Retrying");
      startApp();
    }
  }
}

startApp();

//auto scroll
async function autoScroll(page, selector, interval, timeout) {
  await page.waitForSelector(selector);

  await page.evaluate(
    ({ selector, interval, timeout }) => {
      const element = document.querySelector(selector);
      return new Promise((resolve, reject) => {
        const distance = 300;
        const timer = setInterval(() => {
          element.scrollBy(0, distance);
        }, interval);
        setTimeout(() => {
          clearInterval(timer);
          resolve();
        }, timeout);
      });
    },
    { selector, interval, timeout }
  );
}

async function navigateToPlaceInfo(page, selector) {
  await page.waitForSelector(selector, { Visible: true });

  //click place info
  await page.$$eval(selector, (elements) => {
    elements.map((element, i) => {
      element.click();
    });
  });
}
async function navigateToPhotoMenu(page, selector) {
  await page.waitForSelector(selector, { Visible: true });

  //click the photo
  await page.$$eval(selector, (elements) => {
    elements.map((element, i) => {
      if (
        element.innerHTML.toLowerCase() === "menu" ||
        element.innerHTML.toLowerCase() === "makanan &amp; minuman" ||
        element.innerHTML.toLowerCase() === "food & drink"
      ) {
        element.click();
      }
    });
  });
}

async function navigateToMoreReviews(page, selector, xpath) {
  await page.waitForSelector(selector, { Visible: true });
  const [button] = await page.$x(xpath);

  await button.evaluate((b) => {
    b.click();
  });
}

async function getData() {
  page = await browser.newPage();

  const place_id = "ChIJp4JiUCNP0xQR1JaSjpW_Hms";
  const url = `https://www.google.com/maps/place/?q=place_id:${place_id}`;

  const reviews_result = [];
  const photomenu_result = [];
  const mainDivToScrollSelector =
    "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf";
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

    await navigateToPlaceInfo(page, placeInfoSelector);
    await autoScroll(page, divToScrollSelector, 300, 5000);

    //goto main page then navigate to food/services menus then scroll
    await page.goto(url);
    console.log("navigating to photo menus");
    const photoMenuSelector =
      "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(20) > div.fp2VUc > div.cRLbXd > div.dryRY > button > div.KoY8Lc > span.fontTitleSmall.fontTitleMedium";

    await navigateToPhotoMenu(page, photoMenuSelector);
    await autoScroll(page, divToScrollSelector, 300, 15000);

    //goto main page then go to more reviews page
    await page.goto(url);

    console.log("navigating to more reviews page");

    const moreReviewsSelector = "button.M77dve";
    const xpath = "//button[contains(., 'Ulasan lainnya')]";

    await navigateToMoreReviews(page, moreReviewsSelector, xpath);
    await autoScroll(page, divToScrollSelector, 300, 15000);

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
