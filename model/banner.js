const { v4: uuidv4 } = require('uuid');

module.exports = function (sequelize, DataTypes) {
    const Banners = sequelize.define(
        'banners',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: () => uuidv4()
            },
            name: DataTypes.STRING,
            banner_type: DataTypes.INTEGER,
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            background_image: DataTypes.STRING,
            order_number: DataTypes.INTEGER,
            content: DataTypes.TEXT,
            group: DataTypes.STRING,
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE,

            // username: DataTypes.STRING,
            // password: DataTypes.STRING,
            // email: DataTypes.TEXT,

            duration: DataTypes.INTEGER,


        },

    );

    return Banners;
};
