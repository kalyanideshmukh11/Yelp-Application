const express = require('express');

const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname)
    }
});

const upload = multer({ storage: storage });

const dateformat = require('dateformat');

const fs = require('fs');

const auth = require('../../middleware/auth');

const Student = require('../../models/student');
const Education = require('../../models/education');
const Experience = require('../../models/experience');
const SkillSet = require('../../models/skillset');
const Customer= require('../../models/customer');
router.get('/details', auth, async (req, res) => {
    try {
        const basicDetails = await Student.findOne({
            where: {
                id: req.user.id,
            },
        });
        if (basicDetails) {
            return res.status(200).json(basicDetails);
        }
    } catch (e) {
        return res.status(500).json('Unable to fetch data.');
    }
});

router.post('/details', auth, async (req, res) => {
    try {
        const details = req.body;
        const basicDetails = await Customer.findOne({
            where: {
                id: details.id,
            },
        });
        if (basicDetails) {
            const updatedStudent = await basicDetails.update({
                first_name: details.first_name,
                last_name: details.last_name,
                dob: details.dob,
                city: details.city,
                state: details.state,
                country: details.country,
                career_obj: details.career_obj,
                email_id: details.email_id,
                password: details.password,
                phone_number: details.phone_number,
            });
            const student = await Student.findOne({
                where: {
                    id: updatedStudent.id,
                },
            });
            res.status(200).json(student);
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json('Unable to save data.');
    }
});

router.get('/education', auth, async (req, res) => {
    try {
        const education = await Education.findAll({
            where: {
                student_id: req.user.id,
            },
        });
        if (education) {
            return res.status(200).json(education);
        }
    } catch (e) {
        return res.status(500).json('Unable to fetch data.');
    }
});

router.post('/education', auth, async (req, res) => {
    try {
        const education = req.body;
        const educationEntry = new Education({
            ...education,
            student_id: req.user.id,
        });
        await educationEntry.save();
        res.status(200).json('Successful');
    } catch (e) {
        return res.status(500).json('Unable to save data.');
    }
});

router.get('/experience', auth, async (req, res) => {
    try {
        const experience = await Experience.findAll({
            where: {
                student_id: req.user.id,
            },
        });
        if (experience) {
            // experience[0].start = dateformat(experience[0].start_date, 'shortDate');
            // experience[0].end = dateformat(experience[0].start_date, 'shortDate');
            return res.status(200).json(experience);
        }
    } catch (e) {
        return res.status(500).json('Unable to fetch data.');
    }
});

router.post('/experience', auth, async (req, res) => {
    try {
        const experience = req.body;
        const experienceEntry = new Experience({
            ...experience,
            student_id: req.user.id,
        });
        await experienceEntry.save();
        res.status(200).json('Successful');
    } catch (e) {
        return res.status(500).json('Unable to save data.');
    }
});

router.get('/skillset', auth, async (req, res) => {
    try {
        const skillset = await SkillSet.findAll({
            where: {
                student_id: req.user.id,
            },
        });
        if (skillset) {
            const skills = [];
            skillset.forEach((skillObj) => {
                skills.push(skillObj.skill);
            })
            return res.status(200).json(skills);
        }
    } catch (e) {
        return res.status(500).json('Unable to fetch data.');
    }
});

router.post('/skillset', auth, async (req, res) => {
    try {
        const skillEntry = new SkillSet({
            skill: req.body.skill,
            student_id: req.user.id,
        });
        await skillEntry.save();
        res.status(200).json('Successful');
    } catch (e) {
        return res.status(500).json('Unable to save data.');
    }
});

router.get('/profilepic', auth, async (req, res) => {
    try {
        console.log(req.body.id)
        const profilepic = await Customer.findOne({
            where: {
                id: req.student_id,
            },
        });
        if (profilepic) {
            return res.status(200).json(profilepic);
        }
    } catch (e) {
        return res.status(500).json('Unable to fetch data.');
    }
});

router.post('/profilepic', upload.single('profile_pic'), auth, async (req, res) => {
    try {
        console.log(req.body.id)
        const basicDetails = await Customer.findOne({
            where: {
                id: req.body.id,
            },
        });
        if (basicDetails) {
            await basicDetails.update({
                photo: req.file.filename,
            });
            res.status(200).json(req.file);
        }
        // '../../../uploads/img2.jpg'
    } catch (e) {
        return res.status(400).json('Unable to fetch data.');
    }
});

module.exports = router;
