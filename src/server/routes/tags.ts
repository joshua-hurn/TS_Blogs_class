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

export default router;