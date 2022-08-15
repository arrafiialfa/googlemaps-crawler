exports.formatPlaceData = async (data) => {
  const document = {
    address: data[6][2] || "",
    data_cid: data[6][37][0][0][29][1] || "",
    data_id: data[6][10] || "",
    description: data[6][32]
      ? `${data[6][32]
          .map((data) => {
            return data[1];
          })
          .join(",")}`
      : "",
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
    photos_link: "serpapiurl",
    place_id: data[6][78] || "",
    place_id_search: "serpapiurl",
    position: -100,
    price: data[6][4] ? data[6][4][10] : "",
    rating: data[6][4] ? data[6][4][7] : "",
    reviews: [],
    reviews_link: "serpapiurl",
    service_options:
      data[6][100] && data[6][100] && data[6][100][1] && data[6][100][1][0]
        ? {
            name: data[6][100][1][0][0],
            options: data[6][100][1][0][2],
          }
        : {},
    thumbnail: "serpapi",
    title: data[6][11] || "",
    type: data[6][13] ? `${data[6][13].map((str) => str).join(",")}` : "",
    photos: [],
    popular_times: data[6][84] ? data[6][84][0] : [],
  };

  return document;
};
