function numToDay(num) {
  switch (num) {
    case 1:
      return "monday";
    case 2:
      return "tuesday";
    case 3:
      return "wednesday";
    case 4:
      return "thursday";
    case 5:
      return "friday";
    case 6:
      return "saturday";
    case 7:
      return "sunday";

    default:
      break;
  }
}

exports.formatReview = (review) => {
  try {
    const doc = {
      user:
        review[0] == null || review[0] == undefined
          ? {}
          : {
              link: review[0][0],
              name: review[0][1],
              profile_photo: review[0][2],
              reviews: review[12] ? review[12][1][1] : null,
              level: review[12][1][0] ? review[12][1][0][0] : null,
              description: review[12]
                ? review[12][1][12]
                  ? review[12][1][12][0]
                  : ""
                : "",
            },

      date: review[1],
      snippet: review[3],
      rating: review[4],
    };

    return doc;
  } catch (err) {
    console.error(err, "err formating reviews");
  }
};

exports.formatPlaceData = (data) => {
  const document = {
    thumbnail: data[6][72] ? data[6][72][0][1][6][0] : "",
    address: data[6][2] || [],
    plus_code: data[6][183] && data[6][183][2] ? data[6][183][2][2] : [],
    website: data[6][7]
      ? {
          full: data[6][7][0],
          shortened: data[6][7][1],
        }
      : null,
    data_cid: data[6][37] ? data[6][37][0][0][29][1] : "",
    data_id: data[6][10] || "",
    description: data[6][32] || [],
    gps_coordinates: data[6][9]
      ? {
          latitude: data[6][9][2],
          longitude: data[6][9][3],
        }
      : {},
    hours: data[6][34] ? data[6][34][4][4] : "",
    open_state: data[6][34] ? data[6][34][4][4] : "",
    operating_hours:
      data[6][34] && data[6][34][1]
        ? data[6][34][1].map((data) => {
            return {
              day: data[0],
              hours: data[1][0],
            };
          })
        : [],
    phone: data[6][178] ? data[6][178][0][1][1][0] : "",
    place_id: data[6][78] || "",
    price: data[6][4] ? data[6][4][10] : null,
    rating: data[6][4] ? data[6][4][7] : null,
    total_reviews: data[6][4] ? data[6][4][8] : null,
    rating_summary:
      data[6][52] && data[6][52][3]
        ? {
            five_stars: data[6][52][3][4],
            four_stars: data[6][52][3][3],
            three_stars: data[6][52][3][2],
            two_stars: data[6][52][3][1],
            one_stars: data[6][52][3][0],
          }
        : {},
    reviews:
      data[6][52] && data[6][52][0]
        ? data[6][52][0].map((review) => this.formatReview(review))
        : [],

    services:
      data[6][100] &&
      data[6][100][1] &&
      data[6][100][1].map((detail) => {
        return {
          name: detail[0] || detail[1],
          items: detail[2]
            ? detail[2].map((item) => {
                return {
                  [item[1]]: item[2][0],
                  path: item[0],
                  type: item[1],
                  flag: item[2] ? item[2][0] : null,
                  descriptions: item[2] ? item[2][2] : null,
                };
              })
            : [],
        };
      }),
    title: data[6][11] || "",
    type: data[6][13] || [],
    popular_times:
      data[6][84] &&
      data[6][84][0] &&
      data[6][84][0].map((day) => {
        return {
          day: numToDay(day[0]),
          chart: day[1]
            ? day[1].map((time) => {
                return {
                  time: time[0],
                  intensity: time[1],
                  description: time[2],
                  label: time[4],
                  alt_label: time[6],
                };
              })
            : null,
        };
      }),
  };

  return document;
};
