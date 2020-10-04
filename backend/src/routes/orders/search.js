const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Restaurant = require('../../models/restaurant');

router.get('/list', auth, async (req, res) => {
    try {
        console.log("try rest list")
        const restaurants = await Restaurant.findAll();
        if (restaurants) {
            console.log("sending data back")
            return res.status(200).json(restaurants);
        }
    } catch (e) {
        return res.status(500).json('Unable to fetch data.');
    }
});

module.exports = router;