const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define('review', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    allowNull: false, 
    primaryKey: true,
  },
  eval: { type: DataTypes.INTEGER, allowNull: true, },
  observa: { type: DataTypes.STRING, allowNull: true, },
  // idlibro: { type: DataTypes.INTEGER, allowNull: true, },
  // idoc: { type: DataTypes.INTEGER, allowNull: true, },
  // idusuario: { type: DataTypes.INTEGER, allowNull: true,  }
  });
};