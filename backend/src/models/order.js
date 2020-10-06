// const Sequelize = require('sequelize');
// const { sequelize } = require('../db/sequelize');

// const orderModel = sequelize.define('order', {
//     order_id:{type: Sequelize.INTEGER,primaryKey: true,unique: true,allowNull: false,autoIncrement: true},
//     event_id: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: 'event',
//             key: 'event_id',
//         },
//     },
//     name: {
//         type: Sequelize.STRING,
//         references: {
//             model: 'event',
//             key: 'name',
//         },
//     },
//     date: {
//         type: Sequelize.DATE,
//         references: {
//             model: 'event',
//             key: 'date',
//         },
//     },
//     rest_id: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: 'restaurant',
//             key: 'id',
//         },
//     },
//     customer_id: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: 'customer',
//             key: 'id',
//         },
//     },
// }, {
//     tableName: 'order',
//     timestamps: false
// });

// module.exports = orderModel;
