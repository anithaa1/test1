module.exports = function (sequelize, DataTypes) {
    const Menus = sequelize.define(
        'menus',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            menu_Name: DataTypes.STRING,
            status: DataTypes.STRING,
            link: DataTypes.STRING,
            type: DataTypes.STRING,
            target: DataTypes.STRING,
            order_no: DataTypes.STRING
        },
        {
            timestamps: true
        }
    );

    return Menus;
};

  