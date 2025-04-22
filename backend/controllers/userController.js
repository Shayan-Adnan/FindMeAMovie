const User = require("../models/user");

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ userId });

    if (user) {
      res.status(200).json({ success: true, user });
    }
  } catch (error) {
    res.status(500).json({ success: false });
    console.error("Error getting user profile: ", error);
  }
};

module.exports = { getUserProfile };
