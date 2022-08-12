module.exports = (mongoose) => {
  const GooglePlaces = mongoose.model(
    "places_from_googles",
    mongoose.Schema(
      {
        name: String,
        rating: Number,
        business_status: String,
        geometry: {},
        icon: String,
        icon_background_color: String,
        icon_mask_base_uri: String,
        opening_hours: {},
        photos: [],
        place_id: String,
        plus_code: {},
        reference: String,
        scope: String,
        types: [],
        user_ratings_total: Number,
        vicinity: String,
        details: {
          formatted_phone_number: String,
          international_phone_number: String,
          opening_hours: {},
          photos: [],
          rating: Number,
          reviews: [],
          website: String,
        },
        details_loaded: Boolean,
        photoFiles: [],
      },
      { timestamps: true }
    )
  );
  return GooglePlaces;
};
