const { app } = require("./app.js");
require("dotenv").config({ path: "./.env" });

const { connectDB } = require("./src/database/mongo.js");

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server running at port ${process.env.PORT}`);
    });
    app.on(`error`, (err) => {
      console.error(err);
    });
  })
  .catch((err) => {
    console.error(err);
  });
