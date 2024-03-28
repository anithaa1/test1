const { v4: uuidv4 } = require('uuid');

module.exports = function (sequelize, DataTypes) {
    const apiCall = sequelize.define(
        'apiCall',{
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: () => uuidv4() 
            },
            event: DataTypes.STRING,
    //     username: DataTypes.STRING,
    //     status: DataTypes.STRING,
    //     apiResponseTime: {
    //       type: DataTypes.STRING,
    //       allowNull: true,
    //       defaultValue: '0 sec'
    //     },
    //     comments: {
    //       type: DataTypes.STRING,
    //     },
    //     type: DataTypes.STRING,
       
    //   },
    //   {
    //     timestamps: true,
    //   }
    // );
    // apiCall.associate = function (models) {
  
     });
    return apiCall;
  };
  