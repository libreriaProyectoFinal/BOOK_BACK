const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define('detalleoc', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    allowNull: false, 
    primaryKey: true,
  },
  // idlibro: { type: DataTypes.INTEGER, allowNull: true, },
  // nombrelibro: { type: DataTypes.STRING, allowNull: true, },
  cant: { type: DataTypes.INTEGER, allowNull: true,  },
  subtotal: { type: DataTypes.STRING, allowNull: true,  },
  // idoc: { type: DataTypes.INTEGER, allowNull: true,  }
  });
};