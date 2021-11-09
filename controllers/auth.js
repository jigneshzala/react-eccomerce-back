const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  try {
    const { name, picture, email } = req.user;

    //Find by Email and update name and picture
    const user = await User.findOneAndUpdate(
      { email },
      { name },
      { new: true }
    );

    if (user) {
      console.log("User Updated", user);

      res.json(user);
    } else {
      const newUser = await new User({
        email,
        name,
        picture,
      }).save();
      console.log("User Create", newUser);

      res.json(newUser);
    }
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({
      err: error,
    });
  }
};
