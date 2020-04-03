import * as express from 'express';
import db from '../db';

const router = express.Router();

// GET /api/blogs
router.get('/:id?', async (req, res) => {
    if (req.params.id) {
        const id: number = Number(req.params.id);
        try {
            const blogs = await db.blogs.one(id);
            res.json(blogs);
        } catch (e) {
            console.log(e);
            res.status(500).json('My code sucks in db.blogs.one.');
        }
    } else {
        try {
            const blogs = await db.blogs.all();
            res.json(blogs);
        } catch (e) {
            console.log(e);
            res.status(500).json('My code sucks in general.');
        }
    }
});

router.post('/', async (req, res) => {
    try {
        const newBlog = await db.blogs.post(req.body.title, req.body.content, Number(req.body.authorid));
        res.json(newBlog);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const edittedBlog = await db.blogs.put(req.body.content, Number(req.body.id));
        res.json(edittedBlog);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const deleted = await db.blogs.destroy(id);
        res.json(deleted);
    } catch (e) {
        console.log(e);
        res.status(500).json('delete failed');
    }
});

export default router;
