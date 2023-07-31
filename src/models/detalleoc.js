const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define('detalleoc', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    allowNull: false, 
    primaryKey: true,
  },
   idlibro: { type: DataTypes.STRING, allowNull: true, },
   nombrelibro: { type: DataTypes.STRING, allowNull: true, },
   valorunitario: { type: DataTypes.INTEGER, allowNull: true,  },
   cant: { type: DataTypes.INTEGER, allowNull: true,  },
   subtotal: { type: DataTypes.INTEGER, allowNull: true,  },
   idoc: { type: DataTypes.STRING, allowNull: true,  }
  });
};