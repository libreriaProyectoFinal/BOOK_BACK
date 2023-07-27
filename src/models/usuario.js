const { DataTypes, UUIDV4 } = require('sequelize');
// rol: usuario <- o -> admin
module.exports = (sequelize) => {
  sequelize.define('usuario', {
    idusuario: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true,  },
    email: { type: DataTypes.STRING, allowNull: true },
    emailVerified: {  type: DataTypes.BOOLEAN,  allowNull: true },
    name: { type: DataTypes.STRING,  allowNull: true  },
    nickname: {  type: DataTypes.STRING,  allowNull: true  },
    picture: {   type: DataTypes.STRING,  allowNull: true  },
    // sub: { type: DataTypes.STRING, allowNull: true,  unique: true  },
    password: {  type: DataTypes.STRING, allowNull: true  },
    // rol: { type: DataTypes.INTEGER, allowNull: true, validate: {  isIn: [[1, 2]], }, },
    isBan: { type: DataTypes.BOOLEAN, defaultValue: true   },
    created_at: { type: DataTypes.DATE, allowNull: true  },
    updated_at: { type: DataTypes.DATE,  allowNull: true  },
    last_login: { type: DataTypes.DATE,  allowNull: true  },
    last_ip: {  type: DataTypes.STRING, allowNull: true  },
    logins_count: { type: DataTypes.INTEGER,  allowNull: true }
  });
};