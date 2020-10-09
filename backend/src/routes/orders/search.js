const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Order = require('../../models/order');
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
//update order status
router.post('/status', auth, async (req, res) => {
    try {
        const data = req.body;

        const orderDetails = await Order.findOne({
            where: {
                order_id: req.user.id,
            },
        });
        console.log("order found")
        if (orderDetails) {
            const updatedOrder = await Order.update({
                order_status: data.order_status,
                delivery_status: data.delivery_method,
            });
            console.log("updated")
            const order = await Order.findOne({
                where: {
                    order_id: updatedOrder.id,
                },
            });
            console.log("found back")
            res.status(200).json(order);
            console.log("send back")
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json('Unable to save data.');
    }
});

//customer's orders list

//restaurant's orders list
router.get('/info', auth, async (req, res) => {
    try {
        console.log("send rest list")
         orderList = await Order.findAll({
            where: {
                rest_id: req.user.id,
            },
        });
        
        if (orderList) {
            console.log(orderList)
            return res.status(200).json(orderList);
        }
    } catch (e) {
        return res.status(500).json('Unable to fetch data.');
    }
});

//customer create order
router.post('/create', auth, async (req, res) => {
    try {
        console.log("inside post order")
        const order = req.body;
        console.log(req.body)
        var orderDataEntry = new Order({
            ...order,
            customer_id: req.user.id
        })
            await orderDataEntry.save();
            console.log("done")
            res.status(200).json(orderDataEntry);
            console.log("sent back")
        }
     catch (e) {
        console.log(e);
        return res.status(500).json('Unable to save data.');
    }
});
module.exports = router;