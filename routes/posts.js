var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var User = require("../models/user");
var passport = require("passport");
var m = require("../middleware");

// index
router.get('/', function(req, res) {
	Post.find({}, function(err, posts) {
		if (err) {
			req.flash('error', err);
			res.redirect('/');
		} else {
			res.render('posts/index', {posts: posts});
		}
	});
});

// new
router.get('/new', m.loggedIn, function(req, res) {
	res.render('posts/new');
});

// create
router.post('/', m.loggedIn, function(req, res) {
	Post.create(req.body.post, function(err, post) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/posts');
		}
		post.author.id = req.user.id;
		post.author.username = req.user.username;
		post.save();
		req.flash('success', 'Your post was successfully created');
		return res.redirect('/posts');
	});
});

// show
router.get('/:id', m.loggedIn, function(req, res) {
	Post.findById(req.params.id, function(err, post) {
		if (err) {
			req.flash('error', err);
			res.redirect('/posts');
		} else {
			res.render('posts/show', {post: post});
		}
	})
});

// edit
router.get('/:id/edit', m.loggedIn, function(req, res) {
	Post.findById(req.params.id, function(err, post) {
		if (err) {
			req.flash('error', err);
			res.redirect('back');
		} else {
			res.render('posts/edit', {post: post});
		}
	});
});

// update
router.put('/:id', m.postMatch, function(req, res) {
	Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, post) {
		if (err) {
			req.flash('error', err);
			res.redirect('/posts');
		} else {
			res.redirect('/posts/' + post.id);
		}
	});
});

// delete
router.delete('/:id', m.postMatch, function(req, res) {
	Post.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			req.flash('error', err);
			res.redirect('/posts/'+req.params.id);
		} else {
			req.flash('success', 'Post was successfuly deleted.');
			res.redirect('/posts');
		}
	});
});

module.exports = router;