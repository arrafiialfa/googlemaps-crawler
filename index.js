const express = require("express");
const bodyParser = require("body-parser");
const db = require("./app/models");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
require("./app/routes/index")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
