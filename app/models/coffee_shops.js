module.exports = (mongoose) => {
  const CoffeeShops = mongoose.model(
    "coffee_shop",
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
        service_options: {},
        thumbnail: String,
        title: String,
        type: [],
        updatedAt: {},
        photos: [],
        photos_categorized: {},
        popular_times: [],
        rating_summary: {},
        services: [],
      },
      { timestamps: true }
    )
  );
  return CoffeeShops;
};
