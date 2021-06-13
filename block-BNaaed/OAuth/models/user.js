let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
});

let User = mongoose.model('user', userSchema);

module.exports = User;
