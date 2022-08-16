//auto scroll
exports.autoScroll = async (page, selector, interval, timeout) => {
  await page.waitForSelector(selector, { Visible: true, timeout: 1500 });

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
};

exports.clickSelector = async (page, selector, queries) => {
  await page.waitForSelector(selector, { Visible: true, timeout: 1500 });

  //click more reviews
  await page.$$eval(
    selector,
    (elements, queries) => {
      elements.map((element, i) => {
        if (queries) {
          queries.map((query) => {
            if (new RegExp(query).test(element.innerHTML.toLowerCase())) {
              element.click();
            }
          });
        } else {
          element.click();
        }
      });
    },
    queries
  );
};

exports.clickSelectorAndScroll = async (
  page,
  selector,
  queries,
  { divToScrollSelector, interval, timeout }
) => {
  try {
    let found = false;
    await page.waitForSelector(selector, { Visible: true, timeout: 1500 });

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

    if (found) {
      await this.autoScroll(page, divToScrollSelector, interval, timeout);
      return found;
    } else {
      return found;
    }
  } catch (err) {
    console.error("error when navigating to selector");
    throw err;
  }
};
