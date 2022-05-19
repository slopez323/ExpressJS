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
        sorted = blogPosts.sort((a, b) => a.id - b.id);
        res.json(sorted);
    };
});

router.get('/single-blog/:blogId', function (req, res, next) {
    const blogId = req.params.blogId;
    res.json(blogPosts.find(post => post.id == blogId));
});

router.get('/post-blog', function (req, res, next) {
    res.render('postBlog');
});

router.get('/display-blogs', function (req, res, next) {
    res.render('displayBlogs');
});

router.get('/display-single-blog', function (req, res, next) {
    res.render('displaySingleBlog');
});

router.post('/submit', function (req, res, next) {
    let newPost = req.body;
    blogPosts.push({createdAt: new Date().toISOString(), title: newPost.title, text: newPost.text, author: newPost.author, id: (blogPosts.length + 1).toString()});
    console.log(blogPosts)

    res.send('OK');
});

router.delete('/delete-blog/:blogId', function (req, res, next) {
    const blogId = req.params.blogId;
    const index = blogPosts.findIndex(post => post.id == blogId);
    blogPosts.splice(index, 1);
    
    res.send('OK');
});

module.exports = router;