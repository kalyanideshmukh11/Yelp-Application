const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const constants = require('../backend/src/db/constants');
// 'http://localhost:3000'
//app.use(cors({ origin: 'http://13.52.163.10:3000', credentials: true }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.static('uploads'));

const loginHandler = require('./src/routes/customer/customerLogin');
// const studentProfileHandler = require('./src/routes/student/profile');
// const companyHandler = require('./src/routes/company/entryLogin');
// const jobHandler = require('./src/routes/student/job');
const eventHandler = require('./src/routes/event/eventadmin');
const customerHandler = require('./src/routes/customer/customerLogin');
const customerProfileHandler = require('./src/routes/customer/customerProfile');
const customerPhotoHandler = require('./src/routes/customer/customerPhoto');
const restaurantHandler= require('./src/routes/restaurant/restaurantLogin');
const restaurantProfile= require('./src/routes/restaurant/restaurantProfile');
const orderHandler= require('./src/routes/orders/search');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', loginHandler);
app.use('/restaurant',restaurantHandler);
app.use('/restaurantprofile',restaurantProfile);
app.use('/customer', customerHandler);
app.use('/customerprofile', customerProfileHandler);
app.use('/customerphoto', customerPhotoHandler);
app.use('/events', eventHandler);
app.use('/orders',orderHandler);
app.listen('3001', () => {
    console.log('Yelp backend running on port 3001');
});
