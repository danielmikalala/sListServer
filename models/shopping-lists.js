const mongoose = require("mongoose");
const sListSchema = mongoose.Schema({
  name: { type: String, required: true },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  password: { type: String, required: true },
  members: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  items: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  ],
  isArchived: { type: Boolean, required: true },
});

const sList = mongoose.model("sList", sListSchema);
module.exports = sList;
