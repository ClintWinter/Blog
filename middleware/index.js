var Post = require("../models/post");
var User = require("../models/user");

var middleware = {};

middleware.loggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		req.flash("error", "You must be logged in to do that.");
		res.redirect("/login");
	}
};

middleware.postMatch = function(req, res, next) {
	if (req.isAuthenticated()) {
		Post.findById(req.params.id, function(err, post) {
			if (err) {
				req.flash('error', err);
				res.redirect('/posts/'+post.id);
			} else {
				if (post.author.id.equals(req.user.id)) {
					next();
				} else {
					req.flash('error', 'You are not authorized to do this.');
					next();
				}
			}
		});
	} else {
		req.flash("error", "You must be logged in to do that.");
		res.redirect("/login");
	}
}

middleware.isAdmin = function(req, res, next) {
	if (req.isAuthenticated()) {
		if (req.user.admin) {
			next();
		} else {
			req.flash("error", "You must be an administrator to do that.");
			res.redirect("/");
		}
	} else {
		req.flash("error", "You must be logged in to do that.");
		res.redirect("/login");
	}
}

module.exports = middleware;