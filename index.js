const puppeteer = require("puppeteer");
const fs = require("fs");

//auto scroll
async function autoScroll(page) {
  await page.evaluate(() => {
    let totalHeight = 0;
    const distance = 100;
    const timer = setInterval(() => {
      const scrollHeight = document.body.scrollHeight;
      window.scrollBy(0, distance);
      totalHeight += distance;

      if (totalHeight >= scrollHeight - window.innerHeight) {
        // clearInterval(timer);
        // resolve();
      }
    }, 100);
    setTimeout(() => {
      clearInterval(timer);
    }, 10000);
  });
}

async function WriteDataFromURL(page, { requestString, saveTo }) {
  try {
    page.on("response", async (res) => {
      const string = requestString;

      if (res.url().indexOf(string) > 0) {
        const text = await res.text();
        // const json = await JSON.parse(text);
        fs.writeFileSync(saveTo, text);
        console.log("saved");
      }

      setTimeout(() => {
        try {
          return fs.readdirSync(saveTo);
        } catch (er) {
          console.error(er);
        }
      }, 30000);
    });
  } catch (er) {
    console.error(er);
  }
}

async function start() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disabled-setuid-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();

  const place_id = "ChIJp4JiUCNP0xQR1JaSjpW_Hms";
  const url = `https://www.google.com/maps/place/?q=place_id:${place_id}`;

  await page.goto(url);

  try {
    const morereviewsSelector = "button.M77dve";
    await page.waitForSelector(morereviewsSelector, { Visible: true });
    const [morereviewsbutton] = await page.$x(
      "//button[contains(., 'Ulasan lainnya')]"
    );

    await morereviewsbutton.evaluate((b) => {
      b.click();
    });

    await WriteDataFromURL(page, {
      requestString: "listentitiesreviews",
      saveTo: "reviews.text",
    });
  } catch (er) {
    console.error(er, "unable to find selectors");
  }

  page.on("response", async (res) => {
    const reviewsString = "listentitiesreviews";

    if (res.url().indexOf(reviewsString) > 0) {
      const text = await res.text();
      // const json = await JSON.parse(text);
      fs.writeFileSync("reviews.txt", text);
      console.log("reviews saved");
    }
  });

  try {
    const photomenuSelector = "span.fontTitleSmall.fontTitleMedium";
    await page2.waitForSelector(photomenuSelector, { Visible: true });
    const [photomenubutton] = await page2.$x("//span[contains(., 'Menu')]");

    await photomenubutton.evaluate((b) => {
      b.click();
    });

    page2.on("response", async (res) => {
      const photoString = "photo?authuser";

      if (res.url().indexOf(photoString) > 0) {
        const text = await res.text();
        // const json = await JSON.parse(text);
        fs.writeFileSync("photos.txt", text);
        console.log("photo saved");
      }
    });
  } catch (er) {
    console.log(er);
  }
}

start();
