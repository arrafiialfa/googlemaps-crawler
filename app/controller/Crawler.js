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
  let photomenu_result = [];
  let place_data = await db.google_places.findOne(
    { place_id },
    { _id: 0, id: 0 }
  );

  place_data = JSON.parse(JSON.stringify(place_data));

  delete place_data._id;
  delete place_data.id;

  console.log(place_data);

  let photoMenuFound = false;

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

  let photoSwitch = "all";
  let photos = {};
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
        if (!photos[photoSwitch]) {
          photos[photoSwitch] = [photo[6][0]];
        } else {
          photos[photoSwitch].push(photo[6][0]);
        }
        // photomenu_result.push(
        //   photo[6][0] //photo menu url
        // );
      });
    }
  });

  page.on("response", async (res) => {
    const string = "listentitiesreviews";
    if (res.url().indexOf(string) > 0) {
      console.log("reviews payload captured");
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
      const photokeywords = [
        ["menu", "menu"],
        ["food", "food"],
        ["suasana", "suasana"],
        ["drink", "drink"],
        ["makanan &amp; minuman", "makanan_minuman"],
        ["kopi", "kopi"],
      ];
      console.log("navigating to photo menus");
      const photoMenuSelector =
        "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div > div.fp2VUc > div.cRLbXd > div.dryRY > button > div.KoY8Lc > span.fontTitleSmall.fontTitleMedium";

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
        console.log("photo menu not found");
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
    }

    photoMenuFound = await navigateToPhotoMenu();

    //goto main page then go to more reviews page
    // await page.goBack();
    // return;

    console.log("navigating to more reviews page");
    const moreReviewsSelector =
      "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.TIHn2 > div.tAiQdd > div.lMbq3e > div.LBgpqf > div > div.fontBodyMedium.dmRWX > span > span > span > span.F7nice.mmu3tf > span > button";

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
