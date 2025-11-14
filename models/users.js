const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sList",
      required: true,
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
