const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('libro', {
    id: { 
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false, 
      primaryKey: true,
    },
    nombrelibro: { type: DataTypes.STRING, allowNull: true, },
    desclibro: { type: DataTypes.STRING, allowNull: true, },
    // nombreautor: { type: DataTypes.STRING, allowNull: true, },
    obslibro: { type: DataTypes.STRING, allowNull: true, },
    fotolibro: { type: DataTypes.STRING, allowNull: true, },
    preciolibro: { type: DataTypes.INTEGER, allowNull: true,  },
    displibro: { type: DataTypes.INTEGER, allowNull: true,  },
    // nombregenero: { type: DataTypes.STRING, allowNull: true, },
    esborrado: { type: DataTypes.INTEGER, allowNull: true, },
  }
);
};