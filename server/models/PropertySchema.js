const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    addresa: {
      type: String,
      required: true,
    },
    kati: {
      type: Number,
      required: true,
    },
    dhomat: {
      type: Number,
      required: true,
    },
    siperfaqja: {
      type: Number,
      required: true,
    },
    cmimi: {
      type: Number,
      required: true,
    },
    oferta: {
      type: Number,
      required: false,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PropertySchema", propertySchema);
