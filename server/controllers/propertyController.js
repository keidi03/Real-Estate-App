const { default: mongoose } = require("mongoose");
const PropertySchema = require("../models/PropertySchema");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");

const createProperty = catchAsync(async (req, res, next) => {
  const newProperty = new PropertySchema({
    ...req.body,
    userId: req.user._id.toString(),
  });

  const addedProperty = await newProperty.save();
  res.status(200).json({
    ...addedProperty._doc,
    name: req.user.name,
    surname: req.user.surname,
  });
});

const getAllProperties = catchAsync(async (req, res, next) => {
  const allProperties = await PropertySchema.find();

  const promises = allProperties.map((el) => {
    return User.findById(el.userId).then((user) => ({
      ...(el._doc || {}),
      name: user.name,
      surname: user.surname,
    }));
  });
  const response = await Promise.all(promises);

  res.status(200).json(response);
});
const getMyProperties = catchAsync(async (req, res, next) => {
  const userId = req.user._id.toString();

  const userProperties = PropertySchema.findById({
    userId: userId,
  }).exec();

  res.status(200).json(userProperties);
});

const getPropertyById = catchAsync(async (req, res, next) => {
  const propertyId = req.params.id;

  const property = await PropertySchema.findById(propertyId).exec();

  res.status(200).json(property);
});

const updateProperty = catchAsync(async (req, res, next) => {
  const updatedProperty = await PropertySchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    ...updatedProperty._doc,
    name: req.user.name,
    surname: req.user.surname,
  });
});

const deleteProperty = catchAsync(async (req, res, next) => {
  await PropertySchema.findByIdAndDelete(req.params.id);
  res.status(200).json("Order is deleted");
});

module.exports = {
  createProperty,
  getAllProperties,
  getMyProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
