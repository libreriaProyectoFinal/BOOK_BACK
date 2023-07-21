const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define('review', {
  idreview: {  type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  eval: { type: DataTypes.INTEGER, allowNull: true, },
  observa: { type: DataTypes.STRING, allowNull: true, },
  idlibro: { type: DataTypes.INTEGER, allowNull: true, },
  idoc: { type: DataTypes.INTEGER, allowNull: true, },
  idusuario: { type: DataTypes.INTEGER, allowNull: true,  }
  });
};