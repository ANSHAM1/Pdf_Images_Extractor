const { user } = require("../models/user.model.js");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new Error("all field are required");
  }

  // const existedUser = await user.findOne({ email });
  // if (existedUser) {
  //   throw new Error("already exists");
  // }

  const User = await user.create({
    email: email,
    password: password,
  });

  const createdUser = await user
    .findById(User._id)
    .select("-password -refreshToken");

  if (!createdUser) {
    throw new Error("something went wrong");
  }
  console.log("user loged in successfuly");
  return createdUser;
};

module.exports = { registerUser };
