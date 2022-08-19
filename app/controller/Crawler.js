const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const navigate = require("../lib/navigate");
const formatData = require("../lib/formatData");
const GooglePlaces = require("./GooglePlaces");
const GmapsCrawled = require("./GmapsCrawledData");
const db = require("../models/");

/**
 * @type {puppeteer.Browser}
 */
let browser = null;
/**
 * @type {puppeteer.Page}
 */

let page = null;
let ids = null;
let i = 0;

exports.startApp = async (request, response) => {
  if (request.query.a) {
    ids = ["ChIJMWm78j_0aS4ROB7UZpoE2kU"];
  } else {
    const arr = await GooglePlaces.findIds();
    // console.log(arr);
    ids = arr.map((place) => place.place_id);
  }

  fs.writeFileSync(
    `${path.resolve(__dirname)}/../../crawl_data/idstocrawl.json`,
    `[${ids.map((id) => `"${id}"`).join(",")}]`
  );

  if (request.query.startfrom) {
    i = request.query.startfrom;
  }

  if (!browser) {
    try {
      browser = await puppeteer.launch({
        headless: false,
        devtools: true,

        defaultViewport: null,
        userDataDir: "./user_data",
        args: [
          "--lang=id-ID",
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--start-maximized",
        ],
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

  fs.writeFileSync(
    `${path.resolve(__dirname)}../../../crawl_data/checkpoint.json`,
    ` ["${place_id}_${i}"]`
  );

  const url = `https://www.google.com/maps/place/?q=place_id:${place_id}`;

  let reviews_result = [];
  let place_data = null;

  const divToScrollSelector =
    "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf";
  const photoMenuSelector =
    "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div > div.fp2VUc > div.cRLbXd > div.dryRY > button > div.KoY8Lc > span.fontTitleSmall.fontTitleMedium";
  const allPhotoSelector =
    "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.ZKCDEc > div.RZ66Rb.FgCUCc > button";
  const moreReviewsSelector =
    "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.TIHn2 > div.tAiQdd > div.lMbq3e > div.LBgpqf > div > div.fontBodyMedium.dmRWX > span > span > span > span.F7nice.mmu3tf > span > button";

  //response listener
  page.on("response", async (res) => {
    const string = "place?authuser";
    if (res.url().indexOf(string) > 0) {
      try {
        const arr = await res.text();

        const datastring = `${arr}`;

        const [key, data] = datastring.split(")]}'");

        const obj = JSON.parse(data);

        place_data = formatData.formatPlaceData(obj);
      } catch (err) {
        console.error(err, "error processing place data at response listener");
      }
    }
  });

  let photoSwitch = "all";
  let photos = {};
  page.on("response", async (res) => {
    const string = "photo?authuser";
    if (res.url().indexOf(string) > 0) {
      try {
        const arr = await res.text();

        const datastring = `${arr}`;

        const [key, data] = datastring.split(")]}'");

        const obj = JSON.parse(data);

        const photosarr = obj[0];

        photosarr.map((photo) => {
          if (!photos[photoSwitch]) {
            photos[photoSwitch] = [photo[6][0]];
          } else {
            photos[photoSwitch].push(photo[6][0]);
          }
        });
      } catch (error) {
        console.error(
          error,
          "error processing photo menu data at response listener"
        );
      }
    }
  });

  page.on("response", async (res) => {
    const string = "listentitiesreviews";
    if (res.url().indexOf(string) > 0) {
      try {
        const arr = await res.text();

        const datastring = `${arr}`;

        const [key, data] = datastring.split(")]}'");

        const obj = JSON.parse(data);

        const reviewsarr = obj[2];

        if (reviewsarr) {
          reviewsarr.map((review) => {
            reviews_result.push(formatData.formatReview(review));
          });
        }
      } catch (error) {
        console.error(
          error,
          "error processing review data at response listener"
        );
      }
    }
  });
  let stop = false;
  try {
    //crawl data exsist => return
    if (
      await GmapsCrawled.findOne({
        place_id: place_id,
      })
    ) {
      console.log(place_id, " exists");
      return;
    }

    stop = true;

    //goto main page then navigate to food/services menus then scroll
    await page.goto(url);

    async function navigateToPhotoMenu() {
      try {
        const photokeywords = [
          ["menu", "menu"],
          ["food", "food"],
          ["suasana", "suasana"],
          ["drink", "drink"],
          ["makanan &amp; minuman", "makanan_minuman"],
          ["kopi", "kopi"],
        ];
        console.log("navigating to photo menus");

        let isFound = false;
        await page.waitForSelector(photoMenuSelector, {
          Visible: true,
          timeout: 2500,
        });
        for (let keyword of photokeywords) {
          console.log(`Looking photo of ${keyword}`);
          photoSwitch = keyword[1];
          let successs = await navigate.clickSelectorAndScroll(
            page,
            photoMenuSelector,
            keyword[0],
            {
              divToScrollSelector: divToScrollSelector,
              interval: 150,
              timeout: 7000,
            }
          );
          if (successs) {
            isFound = true;
            console.log(`Photo keyword ${keyword} found`);
            await new Promise((res) =>
              setTimeout(() => {
                res();
              }, 1000)
            );
          }
        }

        if (!isFound) {
          console.log("photo menu not found, searching for all photo");
          await navigate.clickSelectorAndScroll(
            page,
            photoMenuSelector,
            ["all", "semua"],
            {
              divToScrollSelector: divToScrollSelector,
              interval: 150,
              timeout: 7000,
            }
          );
          return isFound;
        } else {
          return isFound;
        }
      } catch (error) {
        console.log(
          "photo selector was not found, searching for all photo selector"
        );
        await navigate.clickSelectorAndScroll(page, allPhotoSelector, null, {
          divToScrollSelector: divToScrollSelector,
          interval: 150,
          timeout: 7000,
        });
        return false;
      }
    }

    console.log("navigating to photo menus");
    photoMenuFound = await navigateToPhotoMenu();

    console.log("navigating to more reviews page");
    await page.goBack();

    for (let keyword of ["reviews", "ulasan"]) {
      await navigate.clickSelectorAndScroll(
        page,
        moreReviewsSelector,
        keyword,
        {
          divToScrollSelector: divToScrollSelector,
          interval: 150,
          timeout: 15000,
        }
      );
    }

    if (place_data) {
      place_data.photos = photos;

      place_data.reviews = reviews_result;

      GmapsCrawled.create(place_data)
        .then((response) => {
          console.log("data is sucessfully saved to database", response);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("place request not captured");
    }
  } catch (err) {
    console.error(err);

    if (place_data) {
      place_data.photos = photos;

      if (reviews_result.length > 0) {
        place_data.reviews = reviews_result;
      }

      GmapsCrawled.create(place_data)
        .then((response) => {
          console.log("data is sucessfully saved to database", response);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("place request not captured");
    }
  } finally {
    if (i === ids.length - 1) {
      console.log("Crawl is complete");
      return;
    } else {
      i++;
      // if (!stop)
      getData(page, ids[i]);
    }
  }
}
