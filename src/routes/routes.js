const router = require("express").Router();
const path = require("path");
const { child } = require("../../child_python.js");
const { registerUser } = require("../controller/user.register.js");
const { upload } = require("../middlewares/img_multer.js");
const { image } = require("../models/images.model.js");
const { uploadOnCloudinary } = require("../middlewares/img_cloudinary.js");
const fs = require("fs");


router.route("/").get((req, res) => {
  res.statusCode = 200;
  res.sendFile(path.join(__dirname, "../views/index.html"));
});


router.route("/login").post(async (req, res) => {
  createdUser = await registerUser(req, res);

  const images = path.join(__dirname, "../../static/images");
  const text = path.join(__dirname, "../../static/text");
  const content = path.join(__dirname, "../../static");
  const uploads = path.join(__dirname, "../../public");

  let dir = [images, text, content, uploads];

  dir.forEach((d) => {
    fs.mkdirSync(d, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error while creating the directory: ${err}`);
      } else {
        console.log("Directory created successfully");
      }
    });
  });
  res.statusCode = 200;
  res.sendFile(path.join(__dirname, "../views/upload.html"));
});



router.route("/upload").post(upload.single("pdfFile"), (req, res) => {
  child("pdf_extract.py");
});

router.route("/show").get((req, res) => {
  const imagePath = path.join(__dirname, "../../static/images");
  let imageArray = [];

  fs.readdir(imagePath, function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    files.forEach(async function (file) {
      if (path.extname(file) === ".png") {
        imageArray.push(file);
        file_path = imagePath + "/" + file;
        const file_upload = await uploadOnCloudinary(file_path);
        await image.create({
          image_url: file_upload.url,
          owner: createdUser._id,
        });
      }
    });

    res.json(imageArray);
  });

  // const directoryPath = path.join(__dirname, "../../static/text");
  // let textArray = [];

  // fs.readdirSync(directoryPath, function (err, files) {
  //   if (err) {
  //     return console.log("Unable to scan directory: " + err);
  //   }
  //   files.forEach(function (file) {
  //     const text = fs.readFileSync(file);
  //     textArray.push(text);
  //   });
  // });

});

router.route("/logout").delete((req, res) => {
  const imgPath = path.join(__dirname, "../../static/images");
  const txtPath = path.join(__dirname, "../../static/text");
  const conPath = path.join(__dirname, "../../static");
  const filPath = path.join(__dirname, "../../public");

  let files = [imgPath, txtPath, conPath, filPath];
  files.forEach((file) => {
    fs.rmSync(file, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error(`Error while deleting the directory: ${err}`);
      } else {
        console.log("Directory deleted successfully");
      }
    });
  });
});

module.exports = { router };
