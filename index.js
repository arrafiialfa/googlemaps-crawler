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
async function autoScroll(page, selector) {
  await page.waitForSelector(selector);

  await page.evaluate((div) => {
    const element = document.querySelector(div);
    return new Promise((resolve, reject) => {
      const distance = 300;
      const timer = setInterval(() => {
        element.scrollBy(0, distance);
      }, 300);
      setTimeout(() => {
        clearInterval(timer);
        resolve();
      }, 15000);
    });
  }, selector);
}

async function navigateToPhotoMenu(page, selector) {
  await page.waitForSelector(selector, { Visible: true });

  //click the photo
  await page.$$eval(selector, (elements) => {
    elements.map((element, i) => {
      console.log(element.innerHTML, "map");
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

  const data = [];

  try {
    await page.goto(url);

    page.on("response", async (res) => {
      const string = "photo?authuser";
      if (res.url().indexOf(string) > 0) {
        const text = await res.text();
        // const json = await JSON.parse(text);
        fs.writeFileSync(
          `crawl_data/photos_timestamp_${Date.now()}.text`,
          text
        );
        console.log("saved");
      }
    });

    const photoMenuSelector =
      "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(20) > div.fp2VUc > div.cRLbXd > div.dryRY > button > div.KoY8Lc > span.fontTitleSmall.fontTitleMedium";

    console.log("navigating to photo menus");
    await navigateToPhotoMenu(page, photoMenuSelector);

    const divToScrollSelector =
      "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf";

    await autoScroll(page, divToScrollSelector);

    const page2 = await browser.newPage();
    await page2.goto(url);

    page2.on("response", async (res) => {
      const string = "listentitiesreviews";
      if (res.url().indexOf(string) > 0) {
        const text = await res.text();
        // const json = await JSON.parse(text);
        fs.writeFileSync(
          `crawl_data/reviews_timestamp_${Date.now()}.text`,
          text
        );
        console.log("saved");
      }
    });

    const moreReviewsSelector = "button.M77dve";
    const xpath = "//button[contains(., 'Ulasan lainnya')]";

    console.log("navigating to more reviews page");
    await navigateToMoreReviews(page2, moreReviewsSelector, xpath);

    await autoScroll(page2, divToScrollSelector);
  } catch (er) {
    console.log(er);
  }
}
