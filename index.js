const puppeteer = require("puppeteer");
const fs = require("fs");

//auto scroll
async function autoScroll(page, selector) {
  await page.waitForSelector(selector);

  await page.evaluate((div) => {
    const element = document.querySelector(div);
    const distance = 300;
    const timer = setInterval(() => {
      element.scrollBy(0, distance);
    }, 300);
    setTimeout(() => {
      clearInterval(timer);
    }, 15000);
  }, selector);
}

async function WriteDataFromResponse(page, { requestString, saveTo }) {
  page.on("response", async (res) => {
    const string = requestString;

    if (res.url().indexOf(string) > 0) {
      const text = await res.text();
      // const json = await JSON.parse(text);
      fs.writeFileSync(saveTo, text);
      console.log("saved");
    }

    setTimeout(() => {
      return;
    }, 20000);
  });
}

async function start() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disabled-setuid-sandbox"],
    headless: false,
  });
  const page = await browser.newPage();

  const place_id = "ChIJp4JiUCNP0xQR1JaSjpW_Hms";
  const url = `https://www.google.com/maps/place/?q=place_id:${place_id}`;

  await page.goto(url);

  // try {
  //   console.log("seach reviews");
  //   const morereviewsSelector = "button.M77dve";
  //   await page.waitForSelector(morereviewsSelector, { Visible: true });
  //   const [morereviewsbutton] = await page.$x(
  //     "//button[contains(., 'Ulasan lainnya')]"
  //   );

  //   await morereviewsbutton.evaluate((b) => {
  //     b.click();
  //   });

  //   const divToScrollSelector = ".m6QErb.DxyBCb.kA9KIf.dS8AEf";

  //   autoScroll(page);

  //   page.on("response", async (res) => {
  //     const string = "listentitiesreviews";
  //     if (res.url().indexOf(string) > 0) {
  //       const text = await res.text();
  //       // const json = await JSON.parse(text);
  //       fs.writeFileSync("reviews.text", text);
  //       console.log("saved");
  //     }
  //   });
  // } catch (er) {
  //   console.error(er);
  // }

  // await page.goto(url);

  try {
    const spanSelector =
      "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(20) > div.fp2VUc > div.cRLbXd > div.dryRY > button > div.KoY8Lc > span.fontTitleSmall.fontTitleMedium";

    await page.waitForSelector(spanSelector, { Visible: true });

    //click the photo
    await page.$$eval(spanSelector, (elements) => {
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

    const divToScrollSelector =
      "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf";

    autoScroll(page, divToScrollSelector);

    page.on("response", async (res) => {
      const string = "photo?authuser";
      if (res.url().indexOf(string) > 0) {
        const text = await res.text();
        // const json = await JSON.parse(text);
        fs.writeFileSync("photos.text", text);
        console.log("saved");
      }
    });
  } catch (er) {
    console.log(er);
  }
}

start();
