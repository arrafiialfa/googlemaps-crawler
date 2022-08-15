//auto scroll
exports.autoScroll = async (page, selector, interval, timeout) => {
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
};

exports.clickSelector = async (page, selector, queries) => {
  await page.waitForSelector(selector, { Visible: true });

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
    await page.waitForSelector(selector, { Visible: true, timeout: 3000 });

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

    await this.autoScroll(page, divToScrollSelector, interval, timeout);
  } catch (err) {
    throw err;
  }
};
