// import Puppeteer from "puppeteer";
//auto scroll
// let divToScrollSelectorLoaded = false;
exports.autoScroll = async (page, selector, interval, timeout) => {
  await page.waitForSelector(selector, { Visible: true, timeout: 7000 });
  // if (!divToScrollSelectorLoaded) {
  //   divToScrollSelectorLoaded = true;
  // }

  console.log(`Scrolling ... ${Date.now()}`);
  await page.evaluate(
    ({ selector, interval, timeout }) => {
      const element = document.querySelector(selector);
      return new Promise((resolve, reject) => {
        try {
          const distance = 300;
          const timer = setInterval(() => {
            element.scrollBy(0, distance);
          }, interval);
          setTimeout(() => {
            clearInterval(timer);
            // reset scrolling
            element.scroll(0, 0);
            resolve();
          }, timeout);
        } catch (error) {
          console.log(error);
          resolve();
        }
      });
    },
    { selector, interval, timeout }
  );
  console.log(`Scrolling Ended ${Date.now()}`);
};

exports.clickSelector = async (page, selector, queries) => {
  try {
    let found = false;
    await page.waitForSelector(selector, { Visible: true, timeout: 7000 });

    //click more reviews
    found = await page.$$eval(
      selector,
      (elements, queries) => {
        return new Promise((resolve, reject) => {
          elements.map((element, i) => {
            if (queries) {
              queries.map((query) => {
                if (new RegExp(query).test(element.innerHTML.toLowerCase())) {
                  console.log("checked");
                  element.click();
                  resolve(true);
                } else if (i + 1 === elements.length) {
                  resolve(false);
                }
              });
            } else {
              element.click();
              resolve(true);
            }
          });
        });
      },
      queries
    );

    return found;
  } catch (err) {
    console.log(err);
    console.error("selector not found");
    throw err;
  }
};

/**
 * @param {Puppeteer.Page} page
 */
exports.clickSelectorAndScroll = (
  page,
  selector,
  query,
  { divToScrollSelector, interval, timeout }
) => {
  return new Promise(async (res, rej) => {
    console.log(`Clickselector ${query}`);
    try {
      let found = false;

      //click more reviews
      await page.evaluate((query) => (window.searchfor = query), query);
      found = await page.$$eval(
        selector,
        (elements, query) => {
          console.log(`Starting query ${query} on ${elements.length} elements`);
          // console.log(query, window.searchfor);
          let elementClick = false;
          elements.map((element, i) => {
            console.log(`INNERTEXT ${element.innerHTML} testing ${query}`);
            if (query) {
              if (new RegExp(query).test(element.innerHTML.toLowerCase())) {
                console.log(query, "checked");
                element.click();
                elementClick = true;
                return;
              }
            } else {
              elementClick = true;
              element.click();
              return;
            }
          });
          console.log(`Finished query ${query}`);
          return elementClick;
        },
        query
      );
      console.log(`Makjoss ${found}`);
      if (found) {
        await this.autoScroll(page, divToScrollSelector, interval, timeout);
        await page.goBack({ timeout: 5000 });
        await new Promise((res) =>
          setTimeout(() => {
            res();
          }, 2000)
        );

        res(found);
      } else {
        res(found);
      }
    } catch (err) {
      console.log(err);
      console.error(`selector ${selector} ${query} not found`);
      res(false);
    }
  });
};
