var mongoose = require("mongoose");
var PLM = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	admin: Boolean
});

userSchema.plugin(PLM);
var User = mongoose.model("User", userSchema);

module.exports = User;