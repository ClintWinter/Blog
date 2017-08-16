var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware");

router.get('/', function(req, res) {
	res.render("home");
});

router.get('/login', function(req, res) {
	res.render("login");
});

router.post('/login', passport.authenticate("local", {
	successRedirect: "/posts",
	failureRedirect: "/login",
	successFlash: "Welcome!",
	failureFlash: "Invalid username or password."
}), function(req, res) {});

router.get('/signup', middleware.isAdmin, function(req, res) {
	res.render('signup');
});

router.post("/signup", middleware.isAdmin, function(req, res) {
	req.logout();
	var newUser = new User({username: req.body.username, admin: false});
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			req.flash("error", err.message);
			return res.redirect("/signup");
		}

		passport.authenticate("local")(req, res, function() {
			req.flash("success", "Welcome <strong>" + user.username + "</strong>! We hope you enjoy your stay!");
			res.redirect("/posts");
		});
	});
});

router.get('/logout', middleware.loggedIn, function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;