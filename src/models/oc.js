const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 sequelize.define('oc', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    allowNull: false, 
    primaryKey: true,
  },
  fechahoraoc: { type: DataTypes.STRING, allowNull: true, },
  hashvalidacionpago: { type: DataTypes.STRING, allowNull: true, },
  // loginuser: { type: DataTypes.STRING, allowNull: true,  },
  valortotaloc: { type: DataTypes.INTEGER, allowNull: true,  },
  estadooc: { type: DataTypes.STRING, allowNull: true,  }
  });
};