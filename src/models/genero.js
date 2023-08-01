const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define('genero', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    allowNull: false, 
    primaryKey: true,
  },
  nombregenero: { type: DataTypes.STRING, allowNull: true, },
  fotogenero: { type: DataTypes.STRING, allowNull: true, },
  });
};
