const mangoose = require("mongoose");
const Schema = mangoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
});

const User = mangoose.model("User", UserSchema);
module.exports = User;
