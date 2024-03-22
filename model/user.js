module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define(
      'User',
      {
       // user_id:DataTypes.STRING,
        
         firstName:DataTypes.STRING,
        lastName: DataTypes.STRING,
        email:DataTypes.STRING,
        password: DataTypes.STRING,
        phoneNumber:DataTypes.STRING,
        accessToken: DataTypes.STRING,
       // refreshToken: DataTypes.STRING,
        dob: DataTypes.DATE,
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        },
        isTrash: {
            type: DataTypes.BOOLEAN,
            defaultValue: false 
          }
      },
      {
        timestamps: true,
      }
    );
  
    // User.associate = function (models) {
    //   User.hasMany(models.UserPermission, {
    //     foreignKey: 'user_id',
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE'
    //   });
    //};
  
    return User;
  };
  