const router = require("express").Router();
const auth = require("../middleware/auth");
const { authorize } = require("../middleware/role");
const User = require("../models/User");

router.get("/users", auth, authorize("admin"), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;