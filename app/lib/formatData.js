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
      reviewer: review[0]
        ? {
            profile_link: review[0][0],
            name: review[0][1],
            profile_photo: review[0][2],
            total_reviews: review[12][1][1],
            level: review[12][1][0] ? review[12][1][0][0] : "",
            description: review[12][1][12][0] ? review[12][1][12][0] : "",
          }
        : {},

      timeDiff: review[1],
      text: review[3],
      rating: review[4],
    };

    return doc;
  } catch (err) {
    console.error(err);
  }
};

exports.formatPlaceData = (data) => {
  const document = {
    address: data[6][2] || "",
    website: data[6][7] ? data[6][7][1] : "",
    data_cid: data[6][37][0][0][29][1] || "",
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
        ? {
            friday: data[6][34][1][4][1][0],
            saturday: data[6][34][1][5][1][0],
            sunday: data[6][34][1][6][1][0],
            monday: data[6][34][1][0][1][0],
            tuesday: data[6][34][1][1][1][0],
            wednesday: data[6][34][1][2][1][0],
            thursday: data[6][34][1][3][1][0],
          }
        : {},
    phone: data[6][178] ? data[6][178][0][1][1][0] : "",
    place_id: data[6][78] || "",
    price: data[6][4] ? data[6][4][10] : "",
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
    service_options:
      data[6][100] && data[6][100] && data[6][100][1] && data[6][100][1][0]
        ? {
            name: data[6][100][1][0][0],
            options: data[6][100][1][0][2],
          }
        : {},
    title: data[6][11] || "",
    type: data[6][13] || [],
    photos: {
      food: [],
    },
    popular_times:
      data[6][84] && data[6][84][0]
        ? data[6][84][0].map((day) => {
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
          })
        : [],
    labels:
      data[6][25] && data[6][25][18]
        ? data[6][25][18].map((label) => label[1])
        : [],
  };

  return document;
};
