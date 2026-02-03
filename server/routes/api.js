import express from 'express';
import db from '../db.js';

const router = express.Router();

// =====================
// NEWS CRUD
// =====================
router.get('/news', (req, res) => {
    const rows = db.prepare('SELECT * FROM news ORDER BY created_at DESC').all();
    res.json(rows);
});

router.post('/news', (req, res) => {
    const { title, category, date, image, content } = req.body;
    const result = db.prepare('INSERT INTO news (title, category, date, image, content) VALUES (?, ?, ?, ?, ?)').run(title, category, date, image, content);
    res.json({ id: result.lastInsertRowid, title, category, date, image, content });
});

router.put('/news/:id', (req, res) => {
    const { title, category, date, image, content } = req.body;
    db.prepare('UPDATE news SET title = ?, category = ?, date = ?, image = ?, content = ? WHERE id = ?').run(title, category, date, image, content, req.params.id);
    res.json({ id: parseInt(req.params.id), title, category, date, image, content });
});

router.delete('/news/:id', (req, res) => {
    db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

// =====================
// SCHEDULE CRUD
// =====================
router.get('/schedule', (req, res) => {
    const rows = db.prepare('SELECT * FROM schedule ORDER BY id ASC').all();
    // Group by track for frontend compatibility
    const grouped = {
        basic: rows.filter(r => r.track === 'basic'),
        intermediate: rows.filter(r => r.track === 'intermediate'),
        master: rows.filter(r => r.track === 'master')
    };
    res.json(grouped);
});

router.post('/schedule', (req, res) => {
    const { track, month, image } = req.body;
    const result = db.prepare('INSERT INTO schedule (track, month, image) VALUES (?, ?, ?)').run(track, month, image);
    res.json({ id: result.lastInsertRowid, track, month, image });
});

router.put('/schedule/:id', (req, res) => {
    const { track, month, image } = req.body;
    db.prepare('UPDATE schedule SET track = ?, month = ?, image = ? WHERE id = ?').run(track, month, image, req.params.id);
    res.json({ id: parseInt(req.params.id), track, month, image });
});

router.delete('/schedule/:id', (req, res) => {
    db.prepare('DELETE FROM schedule WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

// =====================
// INSTRUCTORS CRUD
// =====================
router.get('/instructors', (req, res) => {
    const rows = db.prepare('SELECT * FROM instructors ORDER BY id ASC').all();
    res.json(rows);
});

router.post('/instructors', (req, res) => {
    const { name, title, image, philosophy, bio } = req.body;
    const result = db.prepare('INSERT INTO instructors (name, title, image, philosophy, bio) VALUES (?, ?, ?, ?, ?)').run(name, title, image, philosophy, bio);
    res.json({ id: result.lastInsertRowid, name, title, image, philosophy, bio });
});

router.put('/instructors/:id', (req, res) => {
    const { name, title, image, philosophy, bio } = req.body;
    db.prepare('UPDATE instructors SET name = ?, title = ?, image = ?, philosophy = ?, bio = ? WHERE id = ?').run(name, title, image, philosophy, bio, req.params.id);
    res.json({ id: parseInt(req.params.id), name, title, image, philosophy, bio });
});

router.delete('/instructors/:id', (req, res) => {
    db.prepare('DELETE FROM instructors WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

export default router;
