const { DataTypes, UUID } = require ('sequelize');

module.exports = ( sequelize ) => {
    sequelize.define('tipoUsuario', {

        id: { 
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false, 
            primaryKey: true,  
        },

        rol: { 
            type: DataTypes.STRING,
            allowNull: false, 
        }
    });
};
