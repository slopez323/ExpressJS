var express = require('express');
var router = express.Router();
var blogs = require('../public/sampleBlogs');
var blogPosts = blogs.blogPosts;

router.get('/all', function (req, res, next) {
    let sort = req.query.sort;
    let sorted = [];

    if (sort == 'desc') {
        sorted = blogPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(sorted);
    } else if (sort == 'asc') {
        sorted = blogPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        res.json(sorted);
    } else {
        res.json(blogPosts);
    };
});

router.get('/singleBlog/:blogId', function (req, res, next) {
    const blogId = req.params.blogId;
    res.json(blogPosts.find(post => post.id == blogId));
});

router.get('/postBlog', function (req, res, next) {
    res.render('postBlog');
});

router.post('/submit', function (req, res, next) {
    let newPost = req.body;
    blogPosts.push({createdAt: new Date(), title: newPost.title, text: newPost.text, author: newPost.author, id: (blogPosts.length + 1).toString()});

    res.send('OK');
});

module.exports = router;