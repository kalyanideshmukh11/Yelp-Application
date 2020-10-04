const Sequelize = require('sequelize');
const { sequelize } = require('../db/sequelize');

const eventatendeeModel = sequelize.define('eventattendee', {
    attendee_id:{type: Sequelize.INTEGER,primaryKey: true,unique: true,allowNull: false,autoIncrement: true},
    event_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'event',
            key: 'event_id',
        },
    },
    rest_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'restaurant',
            key: 'id',
        },
    },
    customer_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'customer',
            key: 'id',
        },
    },
}, {
    tableName: 'eventattendee',
    timestamps: false
});

module.exports = eventatendeeModel;
