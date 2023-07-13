const {
  createProperty,
  getAllProperties,
  getMyProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const { protect, restrictTo } = require("../controllers/authController");

const router = require("express").Router();

router.post("/", protect, restrictTo("user"), createProperty);
router.get("/", getAllProperties);
router.get("/myproperties", protect, restrictTo("user"), getMyProperties);
router.get("/:id", getPropertyById);
router.patch("/:id", protect, restrictTo("user"), updateProperty);
router.delete("/:id", protect, restrictTo("user", "admin"), deleteProperty);

module.exports = router;
