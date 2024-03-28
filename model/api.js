const { v4: uuidv4 } = require('uuid');

module.exports = function (sequelize, DataTypes) {
    const apiCall = sequelize.define(
        'apiCall', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: () => uuidv4()
        },
        event: DataTypes.STRING,
        //     

    });
    return apiCall;
};
