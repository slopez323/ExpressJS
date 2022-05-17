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

router.get('/:blogId', function (req, res, next) {
    const blogId = req.params.blogId;
    res.json(blogPosts.find(post => post.id == blogId));
});

module.exports = router;