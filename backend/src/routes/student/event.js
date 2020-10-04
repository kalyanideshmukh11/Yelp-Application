const express = require('express');

const router = express.Router();

// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null , file.originalname)
//     }
// });

// const upload = multer({ storage: storage });

const auth = require('../../middleware/auth');
const Event = require('../../models/event');
//const Company = require('../../models/company');

router.get('/', auth, async (req, res) => {
    try {
        let events;
        if (req.query && req.query.status) {
            events = await Event.findAll({
                where: {
                    status: req.query.status,
                },
            });
        } else if (req.query && req.query.companyId) {
            events = await Event.findAll({
                where: {
                    company_id: req.query.companyId,
                },
            });
        } else {
            events = await Event.findAll();
        }
        if (events) {
            return res.status(200).json(events);
        }
    } catch (e) {
        return res.status(500).json('Unable to fetch data.');
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const events = req.body;
        const eventEntry = new Event({
            ...events,
            company_id: 1,
        });
        await eventEntry.save();
        res.status(200).json('Successful');
    } catch (e) {
        return res.status(500).json('Unable to save data.');
    }
});

router.post('/register', auth, async (req, res) => {
    try {
        if (req.body.status) {
            const event = await Event.findOne({
                where: {
                    id: req.body.id,
                },
            });
            if (event) {
                const updatedEvent = await event.update({
                    status: req.body.status,
                });
                res.status(200).json('Successful');
            }
        } else {
            const events = req.body;
            const eventEntry = new Event({
                ...events,
                company_id: 1,
            });
            await eventEntry.save();
            res.status(200).json('Successful');
        }
    } catch (e) {
        return res.status(500).json('Unable to save data.');
    }
});

// router.post('/application', upload.single('resume'), auth, async (req, res) => {
//     try {
//         const appEntry = await Application.findOne({
//             where: {
//                 student_id: req.user.id,
//                 job_id: req.body.id,
//             },
//         });
//         if (appEntry) {
//             await appEntry.update({
//                 resume: req.file.filename,
//             });
//             res.status(200).json(req.file);
//         } else {
//             const newEntry = new Application({
//                 student_id: req.user.id,
//                 job_id: req.body.id,
//                 resume: req.file.filename,
//             });
//             await newEntry.save();
//         }
//         res.status(200).json('Successful');
//     } catch (e) {
//         return res.status(500).json('Unable to save data.');
//     }
// });

module.exports = router;
