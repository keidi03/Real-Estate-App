const router = require("express").Router();
const crypto = require("crypto-js");

const {
  userRegister,
  userLogin,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  logout,
} = require("../controllers/authController");

router.route("/register").post(userRegister);
router.post("/login", userLogin);
router.post("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updateMyPassword", protect, updatePassword);

module.exports = router;
