import * as express from 'express';
import db from '../db';

const router = express.Router();

// GET /api/tags
router.get('/:id?', async (req, res) => {
    try {
        const tags = await db.tags.all();
        res.json(tags);
    } catch (e) {
        console.log(e);
        res.status(500).json('My code sucks in general.');
    }
});

router.post('/', async (req, res) => {
    try {
        const tags = await db.tags.post(req.body.blogid, req.body.tagid);
        res.json(tags);
    } catch (e) {
        console.log(e);
        res.status(500).json("post failed.")
    }
});

export default router;