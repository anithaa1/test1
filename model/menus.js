const { v4: uuidv4 } = require('uuid');
module.exports = function (sequelize, DataTypes) {
    const Menus = sequelize.define(
        'menus',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: () => uuidv4()
            },
            menu_Name: DataTypes.STRING,
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            link: DataTypes.STRING,
            type: DataTypes.INTEGER,
            target: DataTypes.INTEGER,
            order_no: DataTypes.INTEGER,
            mainmenuid: {
                type: DataTypes.UUID,
                references: {
                    model: 'menus',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
        },


        {
            timestamps: true
        }
    );


    Menus.associate = function (models) {
        // Define associations here
        // For example, if Menus has a parent menu:
        Menus.belongsTo(models.menus, { foreignKey: 'mainmenuid', as: 'ParentMenu', });
    };


    return Menus;
};

