var mongoose = require("mongoose");
// var PLM = require("passport-local-mongoose");

var postSchema = new mongoose.Schema({
	title: String,
	thumbnail: String,
	body: String,
	created: {type: Date, default: Date.now},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

// postSchema.plugin(PLM);
var Post = mongoose.model("Post", postSchema);

module.exports = Post;