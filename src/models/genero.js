const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define('genero', {
  idgenero: {  type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombregenero: { type: DataTypes.STRING, allowNull: true, },
  fotogenero: { type: DataTypes.STRING, allowNull: true, },
  });
};