const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define('autor', {
   id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    allowNull: false, 
    primaryKey: true,
   },
   nombreautor: { type: DataTypes.STRING, allowNull: true, },
   fotoautor: { type: DataTypes.STRING, allowNull: true, },
  });
};