const { DataTypes, UUIDV4 } = require('sequelize');
// rol: usuario <- o -> admin
module.exports = (sequelize) => {
  sequelize.define('usuario', {
    idusuario: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true,  },
    email: { type: DataTypes.STRING, allowNull: true },
    emailVerified: {  type: DataTypes.BOOLEAN,  allowNull: true },
    name: { type: DataTypes.STRING,  allowNull: true  },
    nickname: {  type: DataTypes.STRING,  allowNull: true  },
    picture: {   type: DataTypes.STRING,  allowNull: true  },
    password: {  type: DataTypes.STRING, allowNull: true  },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
    deletedAt: { type: DataTypes.DATE, defaultValue: null,allowNull: true }
  },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );
};