const express = require('express');

const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname)
    }
});

const upload = multer({ storage: storage });

const auth = require('../../middleware/auth');

const Job = require('../../models/job');
const Application = require('../../models/application');

router.get('/', auth, async (req, res) => {
    try {
        const jobs = await Job.findAll();
        if (jobs) {
            return res.status(200).json(jobs);
        }
    } catch (e) {
        return res.status(500).json('Unable to fetch data.');
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const jobs = req.body;
        const jobEntry = new Job({
            ...jobs,
            company_id: 1,
        });
        await jobEntry.save();
        res.status(200).json('Successful');
    } catch (e) {
        return res.status(500).json('Unable to save data.');
    }
});

router.get('/application', auth, async (req, res) => {
    try {
        const appEntry = await Application.findAll({
            where: {
                student_id: req.user.id,
            },
        });
        if (appEntry) {
            res.status(200).json(appEntry);
        }
    } catch (e) {
        return res.status(500).json('Unable to fetch data.');
    }
});

router.post('/application', upload.single('resume'), auth, async (req, res) => {
    try {
        const appEntry = await Application.findOne({
            where: {
                student_id: req.user.id,
                job_id: req.body.id,
            },
        });
        if (appEntry) {
            await appEntry.update({
                resume: req.file.filename,
            });
            res.status(200).json(req.file);
        } else {
            const newEntry = new Application({
                student_id: req.user.id,
                job_id: req.body.id,
                resume: req.file.filename,
            });
            await newEntry.save();
        }
        res.status(200).json('Successful');
    } catch (e) {
        return res.status(500).json('Unable to save data.');
    }
});

module.exports = router;
