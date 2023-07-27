const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define('libro', {
  idlibro: {  type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombrelibro: { type: DataTypes.STRING, allowNull: true, },
  desclibro: { type: DataTypes.STRING, allowNull: true, },
  nombreautor: { type: DataTypes.STRING, allowNull: true, },
  obslibro: { type: DataTypes.STRING, allowNull: true, },
  fotolibro: { type: DataTypes.STRING, allowNull: true, },
  preciolibro: { type: DataTypes.INTEGER, allowNull: true,  },
  displibro: { type: DataTypes.INTEGER, allowNull: true,  },
  nombregenero: { type: DataTypes.STRING, allowNull: true, },
  esborrado: { type: DataTypes.INTEGER, allowNull: true, },
  });
};