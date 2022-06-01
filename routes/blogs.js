var express = require('express');
var router = express.Router();
// var blogs = require('../public/sampleBlogs');
// var blogPosts = blogs.blogPosts;

const { blogsDB } = require("../mongo");

router.get('/', async function (req, res, next) {
    try {
        const collection = await blogsDB().collection('posts');
        const posts = await collection.find({}).toArray();
        res.json(posts);
    } catch (e) {
        res.status(500).send('Error fetching posts.');
    };
});


router.get('/all', async function (req, res, next) {
    try {
        let sort = req.query.sort;
        // let sorted = [];

        const collection = await blogsDB().collection('posts');
        const blogPosts = await collection.find({});

        if (sort == 'desc') {
            const sorted = await blogPosts.sort({ createdAt: -1 }).toArray();
            // sorted = blogPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            res.json(sorted);
        } else if (sort == 'asc') {
            const sorted = await blogPosts.sort({ createdAt: 1 }).toArray();
            // sorted = blogPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            res.json(sorted);
        } else {
            // sorted = blogPosts.sort((a, b) => a.id - b.id);
            const all = await blogPosts.toArray();
            res.json(all);
        };
    } catch (e) {
        res.status(500).send('Error fetching posts.');
    };
});

router.get('/single-blog/:blogId', async function (req, res, next) {
    try {
        const blogId = Number(req.params.blogId);
        const collection = await blogsDB().collection('posts');
        const singleBlog = await collection.find({ id: blogId }).toArray();

        res.json(singleBlog);
    } catch (e) {
        res.status(500).send('Error fetching posts.');
    }
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

router.post('/submit', async function (req, res, next) {
    try {
        const newPost = req.body;
        const collection = await blogsDB().collection('posts');

        const today = new Date().toISOString();
        const blogID = await collection.count() + 1;

        collection.insertOne({
            'createdAt': today,
            'title': newPost.title,
            'text': newPost.text,
            'author': newPost.author,
            'lastModified': today,
            'category': newPost.category,
            'id': blogID
        });

        // blogPosts.push({ createdAt: new Date().toISOString(), title: newPost.title, text: newPost.text, author: newPost.author, id: (blogCount + 1).toString() });
        // blogCount++;

        res.send('OK');
    } catch (e) {
        res.status(500).send('Error.');
    };
});

router.delete('/delete-blog/:blogId', async function (req, res, next) {
    try {
        const blogId = Number(req.params.blogId);
        const collection = await blogsDB().collection('posts');

        collection.deleteOne({ id: blogId });

        // const index = blogPosts.findIndex(post => post.id == blogId);
        // blogPosts.splice(index, 1);

        res.send('Deleted');
    } catch (e) {
        res.status(500).send('Error.');
    };
});

router.put('/modify-blog/:blogId', async function (req, res, next) {
    try {
        const blogId = Number(req.params.blogId);
        // const index = blogPosts.findIndex(post => post.id == blogId);
        const modification = req.body;
        const today = new Date().toISOString();
        const collection = await blogsDB().collection('posts');

        // blogPosts[index].title = modification.title;
        // blogPosts[index].author = modification.author;
        // blogPosts[index].text = modification.text;

        collection.updateOne({id: blogId}, { $set: { 
            title: modification.title,
            author: modification.author,
            text: modification.text,
            lastModified: today
         } })


        res.send('Modified');
    } catch (e) {
        res.status(500).send('Error.');
    }
});

module.exports = router;