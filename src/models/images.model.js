const mongoose = require("mongoose");

const imgSchema = mongoose.Schema(
  {
    image_url: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: String
    },
  },
  { timestamps: true }
);

const image = mongoose.model("image", imgSchema);

module.exports = { image };
