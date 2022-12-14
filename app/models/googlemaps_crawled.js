module.exports = (mongoose) => {
  const GooglemapsCrawledData = mongoose.model(
    "googlemaps_crawled_data_full",
    mongoose.Schema(
      {
        id: String,
        address: [],
        website: String,
        createdAt: {},
        data_cid: String,
        data_id: String,
        description: [],
        gps_coordinates: {},
        hours: String,
        open_state: String,
        operating_hours: {},
        phone: String,
        photos_link: String,
        place_id: String,
        place_id_search: String,
        position: Number,
        price: String,
        rating: Number,
        total_reviews: Number,
        reviews: [],
        reviews_link: String,
        thumbnail: String,
        title: String,
        type: [],
        updatedAt: {},
        photos: {},
        popular_times: [],
        rating_summary: {},
        services: [],
      },
      { timestamps: true }
    )
  );
  return GooglemapsCrawledData;
};
