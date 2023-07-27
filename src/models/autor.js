const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define('autor', {
   idautor: {  type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   nombreautor: { type: DataTypes.STRING, allowNull: true, },
   fotoautor: { type: DataTypes.STRING, allowNull: true, },
  });
};