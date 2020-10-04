const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const Student = require('../../models/student');

router.post('/login', async (req, res) => {
    try {
        const {email_id, password} = req.body;
        const userStudent = await Student.findOne({
            where: {
                email_id: email_id,
            },
        });
        // if (userStudent) {
        //     return res.status(200).json('Successful');
        // }

        if (!userStudent) {
            return res.status(400).json({ msg: 'User not found.' });
        }
        const isMatch = await bcrypt.compare(password.toString(), userStudent.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials. PLease try again.' });
        }
        const payload = {
            user: {
                id: userStudent.id,
            },
        };
        jwt.sign(
            payload,
            process.env.JWTPASSWORD,
            {
                expiresIn: 360000,
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            },
        );
    } catch (e) {
        return res.status(500).json('Unable to log in. Please try again.');
    }
});

router.post('/signup', async (req, res) => {
    try {
        const student = req.body;
        let userStudent = await Student.findOne({
            where: {
                email_id: student.email_id,
            },
        });
        if (userStudent) {
            return res.status(404).send('Email already exists! Please sign in or create a new account.');
        }
        userStudent = new Student({
            ...student,
        });
        // await userStudent.save();
        // res.status(200).json('Successful');
        const salt = await bcrypt.genSalt(10);

        userStudent.password = await bcrypt.hash(userStudent.password, salt);
        await userStudent.save();
        const payload = {
            user: {
                id: userStudent.id,
            },
        };
        jwt.sign(
            payload,
            process.env.JWTPASSWORD,
            {
                expiresIn: 360000,
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            },
        );
    } catch (e) {
        return res.status(500).json('Unable to sign up. Please try again.');
    }
});

module.exports = router;
