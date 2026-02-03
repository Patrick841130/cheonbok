import express from 'express';
import pool from '../db.js';

const router = express.Router();

// =====================
// NEWS CRUD
// =====================
router.get('/news', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM news ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching news:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

router.post('/news', async (req, res) => {
    try {
        const { title, category, date, image, content } = req.body;
        const result = await pool.query(
            'INSERT INTO news (title, category, date, image, content) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, category, date, image, content]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error creating news:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

router.put('/news/:id', async (req, res) => {
    try {
        const { title, category, date, image, content } = req.body;
        const result = await pool.query(
            'UPDATE news SET title = $1, category = $2, date = $3, image = $4, content = $5 WHERE id = $6 RETURNING *',
            [title, category, date, image, content, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating news:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

router.delete('/news/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM news WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting news:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// =====================
// SCHEDULE CRUD
// =====================
router.get('/schedule', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM schedule ORDER BY id ASC');
        // Group by track for frontend compatibility
        const rows = result.rows;
        const grouped = {
            basic: rows.filter(r => r.track === 'basic'),
            intermediate: rows.filter(r => r.track === 'intermediate'),
            master: rows.filter(r => r.track === 'master')
        };
        res.json(grouped);
    } catch (err) {
        console.error('Error fetching schedule:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

router.post('/schedule', async (req, res) => {
    try {
        const { track, month, image } = req.body;
        const result = await pool.query(
            'INSERT INTO schedule (track, month, image) VALUES ($1, $2, $3) RETURNING *',
            [track, month, image]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error creating schedule:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

router.put('/schedule/:id', async (req, res) => {
    try {
        const { track, month, image } = req.body;
        const result = await pool.query(
            'UPDATE schedule SET track = $1, month = $2, image = $3 WHERE id = $4 RETURNING *',
            [track, month, image, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating schedule:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

router.delete('/schedule/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM schedule WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting schedule:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// =====================
// INSTRUCTORS CRUD
// =====================
router.get('/instructors', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM instructors ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching instructors:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

router.post('/instructors', async (req, res) => {
    try {
        const { name, title, image, philosophy, bio } = req.body;
        const result = await pool.query(
            'INSERT INTO instructors (name, title, image, philosophy, bio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, title, image, philosophy, bio]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error creating instructor:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

router.put('/instructors/:id', async (req, res) => {
    try {
        const { name, title, image, philosophy, bio } = req.body;
        const result = await pool.query(
            'UPDATE instructors SET name = $1, title = $2, image = $3, philosophy = $4, bio = $5 WHERE id = $6 RETURNING *',
            [name, title, image, philosophy, bio, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating instructor:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

router.delete('/instructors/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM instructors WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting instructor:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

export default router;
