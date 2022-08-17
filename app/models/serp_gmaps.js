module.exports = (mongoose) => {
  const SerpPlaces = mongoose.model(
    "serp_maps",
    mongoose.Schema(
      {
        id: String,
        address: String,
        createdAt: {},
        data_cid: String,
        data_id: String,
        description: String,
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
        reviews: [],
        reviews_link: String,
        service_options: {},
        thumbnail: String,
        title: String,
        type: String,
        updatedAt: {},
        photos: [],
      },
      { timestamps: true }
    )
  );
  return SerpPlaces;
};
