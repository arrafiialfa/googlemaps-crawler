const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const navigate = require("../lib/navigate");
const formatData = require("../lib/formatData");
const GooglePlaces = require("./GooglePlaces");
const GmapsCrawled = require("./GmapsCrawledData");
const db = require("../models/");
const e = require("express");

/**
 * @type {puppeteer.Browser}
 */
let browser = null;
/**
 * @type {puppeteer.Page}
 */

let page = null;
let ids = null;
let idsupdated = [];
let idsnotupdated = [];

exports.startApp = async (request, response) => {
  let headless = request.query.headless ? request.query.headless : true;
  let devtools = request.query.devtools ? request.query.devtools : true;
  startfrom = request.query.startfrom;
  endAt = request.query.endAt;

  if (request.query.a) {
    ids = ["ChIJMWm78j_0aS4ROB7UZpoE2kU"];
  } else {
    const arr = await GooglePlaces.findIds();
    ids = arr.map((place) => place.place_id);
  }

  // fs.writeFileSync(
  //   `${path.resolve(__dirname)}/../../crawl_data/idstocrawl.json`,
  //   `[${ids.map((id) => `"${id}"`).join(",")}]`
  // );

  if (startfrom && endAt) {
    ids = ids.slice(startfrom, endAt);
  } else if (startfrom) {
    ids = ids.slice(startfrom);
  }

  if (!browser) {
    try {
      browser = await puppeteer.launch({
        headless: true,
        devtools: false,

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
        message: `Crawler is Running, starting from ${startfrom} of ${
          ids.length - 1
        } `,
      });

      for (const id of ids) {
        await getData(page, id);
      }

      console.log("FINISHED CRAWLING DATA");
    } catch (error) {
      console.log(error, "Retrying");
      this.startApp(request, response);
    }
  }
};

exports.updatePhoto = async (request, response) => {
  startfrom = request.query.startfrom;
  endAt = request.query.endAt;

  const query = { "photos_categorized.Semua": { $exists: false } };

  const arr = await GmapsCrawled.findIds(query);
  ids = arr.map((place) => place.place_id);

  if (startfrom && endAt) {
    ids = ids.slice(startfrom, endAt);
  } else if (startfrom) {
    ids = ids.slice(startfrom);
  }

  if (!browser) {
    try {
      browser = await puppeteer.launch({
        headless: false,
        devtools: true,
        defaultViewport: null,
        args: [
          "--lang=id-ID",
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--start-maximized",
        ],
      });
      page = await browser.newPage();
      response.status(200).json({
        message: `Crawler is Running, starting from ${
          startfrom ? startfrom : 0
        } of ${ids.length - 1} `,
      });

      for (const id of ids) {
        await updateData(page, id);
      }

      console.log("FINISHED CRAWLING DATA");
    } catch (error) {
      console.log(error, "Retrying");
      this.updatePhoto(request, response);
    }
  }
};

exports.updatePlaceData = async (request, response) => {
  startfrom = request.query.startfrom;
  endAt = request.query.endAt;

  // const query = { "operating_hours.0.day": { $exists: false } };
  const query = {};

  const places = await GmapsCrawled.findIds(query);
  console.log(places.length, " places captured");

  if (startfrom && endAt) {
    ids = ids.slice(startfrom, endAt);
  } else if (startfrom) {
    ids = ids.slice(startfrom);
  }

  let crawl = false;

  for (const place of places) {
    const serp = await GooglePlaces.findOne(place.place_id);

    place.operating_hours = serp.operating_hours;

    place
      .save()
      .then((response) => {
        console.log("data is sucessfully updated", response.operating_hours);
        idsupdated.push(response.place_id);
      })
      .catch((error) => {
        idsnotupdated.push(place.place_id);
        console.error(error);
      });
  }

  console.log("all data successfully updated");
  response.status(200).send("success");

  if (crawl) {
    if (!browser) {
      try {
        browser = await puppeteer.launch({
          headless: false,
          devtools: false,
          defaultViewport: null,
          args: [
            "--lang=id-ID",
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--start-maximized",
          ],
        });
        page = await browser.newPage();
        response.status(200).json({
          message: `Crawler is Running, starting from ${
            startfrom ? startfrom : 0
          } of ${ids.length - 1} `,
        });

        for (const id of ids) {
          await updatePlaceData(page, id);
        }

        console.log("FINISHED CRAWLING DATA");
      } catch (error) {
        console.log(error, "Retrying");
        this.updatePlaceData(request, response);
      }
    }
  }
};

async function getData(page, place_id) {
  console.log("currently at", place_id);
  //crawl data exsist => return
  if (
    await GmapsCrawled.findOne({
      place_id: place_id,
    })
  ) {
    console.log(place_id, " exists");
    return;
  }

  // fs.writeFileSync(
  //   `${path.resolve(__dirname)}../../../crawl_data/checkpoint.json`,
  //   ` ["${place_id}"]`
  // );

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
  let placerequest = false;
  page.on("response", async (res) => {
    const string = "place?authuser";
    if (res.url().indexOf(string) > 0) {
      if (!placerequest) {
        console.log("%cplace data captured", "color:blue");
        placerequest = true;
      }
      try {
        const arr = await res.text();

        const datastring = `${arr}`;

        const [key, data] = datastring.split(")]}'");

        const obj = JSON.parse(data);

        // fs.writeFileSync(
        //   path.join(__dirname, `../../crawl_data/place_${Date.now()}`),
        //   data
        // );

        place_data = formatData.formatPlaceData(obj);
      } catch (err) {
        console.error(err, "error processing place data at response listener");
      }
    }
  });

  let photoSwitch = "Semua";
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

        // fs.writeFileSync(
        //   path.join(__dirname, `../../crawl_data/photo_${Date.now()}`),
        //   data
        // );

        if (photosarr) {
          photosarr.map((photo) => {
            if (!photos[photoSwitch]) {
              photos[photoSwitch] = [
                {
                  thumbnail: photo[6][0],
                  image: photo[0],
                },
              ];
            } else {
              photos[photoSwitch].push({
                thumbnail: photo[6][0],
                image: photo[0],
              });
            }
          });
        }
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

  try {
    //goto main page then navigate to food/services menus then scroll
    await page.goto(url);

    async function navigateToPhotoMenu() {
      try {
        const photokeywords = [
          ["menu", "Menu"],
          ["suasana", "Suasana"],
          ["makanan &amp; minuman", "Makanan & minuman"],
          ["kopi", "Kopi"],
          ["semua", "Semua"],
        ];
        console.log("navigating to photo menus");

        let isFound = false;
        await page.waitForSelector(photoMenuSelector, {
          Visible: true,
          timeout: 5000,
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
              }, 2000)
            );
          }
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
    await navigateToPhotoMenu();

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
  } catch (err) {
    console.error(err);
  } finally {
    //save document to database
    if (!place_data) {
      console.log("place data is not captured, using serp_data instead");
      //if place data is not captured then adjust exsisting serp_data to be used as place data
      const docs = await GooglePlaces.findDoc(place_id);

      place_data = {
        ...docs,
        photos_categorized: photos,
        address: docs.address ? [docs.address] : [],
        website: { full: docs.website },
        description: docs.description ? [docs.description] : [],
        type: docs.type ? [docs.type] : [],
        reviews: reviews_result.length > 0 ? reviews_result : docs.reviews,
      };
    }

    place_data.photos_categorized = photos;

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
  }
}

async function updateData(page, place_id) {
  console.log("currently at", place_id);

  const doc = await GmapsCrawled.findOne({
    place_id: place_id,
  });

  fs.writeFileSync(
    `${path.resolve(__dirname)}../../../crawl_data/checkpoint.json`,
    ` ["${place_id}"]`
  );

  const url = `https://www.google.com/maps/place/?q=place_id:${place_id}`;

  const divToScrollSelector =
    "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf";
  const photoMenuSelector =
    "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div > div.fp2VUc > div.cRLbXd > div.dryRY > button > div.KoY8Lc > span.fontTitleSmall.fontTitleMedium";
  const allPhotoSelector =
    "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.ZKCDEc > div.RZ66Rb.FgCUCc > button";

  //response listener

  let photoSwitch = "Semua";
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

        // fs.writeFileSync(
        //   path.join(__dirname, `../../crawl_data/photo_${Date.now()}`),
        //   data
        // );

        if (photosarr) {
          photosarr.map((photo) => {
            if (!photos[photoSwitch]) {
              photos[photoSwitch] = [
                {
                  thumbnail: photo[6][0],
                  image: photo[0],
                },
              ];
            } else {
              photos[photoSwitch].push({
                thumbnail: photo[6][0],
                image: photo[0],
              });
            }
          });
        }
      } catch (error) {
        console.error(
          error,
          "error processing photo menu data at response listener"
        );
      }
    }
  });

  try {
    //goto main page then navigate to food/services menus then scroll
    await page.goto(url);

    async function navigateToPhotoMenu() {
      try {
        const photokeywords = [
          ["menu", "Menu"],
          ["suasana", "Suasana"],
          ["makanan &amp; minuman", "Makanan & minuman"],
          ["kopi", "Kopi"],
          ["semua", "Semua"],
        ];
        console.log("navigating to photo menus");

        let isFound = false;
        await page.waitForSelector(photoMenuSelector, {
          Visible: true,
          timeout: 5000,
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
              }, 2000)
            );
          }
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
    await navigateToPhotoMenu();
  } catch (err) {
    console.error(err);
  } finally {
    //update document

    doc.photos_categorized = {
      ...photos,
      ...doc.photos_categorized,
    };

    doc
      .save()
      .then((response) => {
        console.log("data is sucessfully updated", response);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

async function updatePlaceData(page, place_id) {
  console.log("currently at", place_id);

  fs.writeFileSync(
    `${path.resolve(__dirname)}../../../crawl_data/checkpoint_${
      process.env.PORT || 3000
    }.json`,
    ` ["${idsupdated}"]`
  );

  const url = `https://www.google.com/maps/place/?q=place_id:${place_id}`;

  const divToScrollSelector =
    "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf";
  const photoMenuSelector =
    "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div > div.fp2VUc > div.cRLbXd > div.dryRY > button > div.KoY8Lc > span.fontTitleSmall.fontTitleMedium";
  const allPhotoSelector =
    "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.ZKCDEc > div.RZ66Rb.FgCUCc > button";

  async function savePlaceData(place_data) {
    const doc = await GmapsCrawled.findOne({
      place_id: place_id,
    });

    return new Promise(function (resolve, reject) {
      doc.operating_hours = place_data.operating_hours;
      doc
        .save()
        .then((response) => {
          console.log("data is sucessfully updated", response.operating_hours);
          idsupdated.push(doc.place_id);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          resolve();
        });
    });
  }

  let place_data = null;

  page.on("response", async (res) => {
    const string = "place?authuser";
    if (res.url().indexOf(string) > 0) {
      console.log("%cplace data captured", "color:blue");
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

  //goto main page then navigate to food/services menus then scroll
  await page.goto(url);

  async function navigateToPhotoMenu() {
    try {
      const photokeywords = [
        ["semua", "Semua"],
        ["semua", "Semua"],
        ["semua", "Semua"],
      ];
      console.log("navigating to photo menus");

      let isFound = false;
      await page.waitForSelector(photoMenuSelector, {
        Visible: true,
        timeout: 5000,
      });
      for (let keyword of photokeywords) {
        if (place_data) {
          return;
        }
        console.log(`Looking photo of ${keyword}`);
        photoSwitch = keyword[1];
        let successs = await navigate.clickSelectorAndScroll(
          page,
          photoMenuSelector,
          keyword[0],
          {
            divToScrollSelector: divToScrollSelector,
            interval: 150,
            timeout: 2000,
          }
        );
        if (successs) {
          isFound = true;
          console.log(`Photo keyword ${keyword} found`);
          await new Promise((res) =>
            setTimeout(() => {
              res();
            }, 2000)
          );
        }
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
  await navigateToPhotoMenu();

  if (place_data) {
    await savePlaceData(place_data);
    idsupdated.push(place_data.place_id);
  } else {
    idsnotupdated.push(place_id);
  }
}
