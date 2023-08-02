require("dotenv").config();
const { Sequelize ,DataTypes,Op} = require("sequelize");
const fs = require("fs");
const pg = require('pg');
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_URL} = process.env;

const sequelize = new Sequelize(
    DB_URL,
    // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    {
        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed

        // -agregar ---------
        dialectModule: pg,
        dialectOptions: {
            ssl: {
              require: true,
            }
        }
        // ------------------
    }
);


const basename = path.basename(__filename);

const modelDefiners = [];

// Read all the files in Models directory and import them to sequelize
fs.readdirSync(path.join(__dirname, "/models"))
    .filter(
        (file) =>
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, "/models", file)));
    }
    );

// Inject the connection to sequelize
modelDefiners.forEach(model => model(sequelize));

// Capitalize the name of the models
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Create the relationships between the models
const { Libro, Genero, Usuario, TipoUsuario, Autor, Oc, Detalleoc, Review } = sequelize.models;
// console.log(sequelize.models);

TipoUsuario.hasMany(Usuario)
Usuario.belongsTo(TipoUsuario)

Genero.hasMany(Libro)
Libro.belongsTo(Genero)

Libro.belongsTo(Autor)
Autor.hasMany(Libro)

/*
Oc.belongsTo(Usuario)
Usuario.hasMany(Oc)


Detalleoc.belongsTo(Oc)
Oc.hasMany(Detalleoc)

Libro.hasMany(Detalleoc, { as: 'detalleocs', foreignKey: 'idLibro' })
Detalleoc.belongsTo(Libro, { as: 'libro', foreignKey: 'idLibro' });
**/

Review.belongsTo(Libro, {allowNull: true})
Review.belongsTo(Oc, {allowNull: true})
Review.belongsTo(Usuario)

Libro.hasMany(Review)
Oc.hasMany(Review)
Usuario.hasMany(Review)

module.exports = {
    ...sequelize.models, // Export the models 
    conn: sequelize, sequelize// Export the connection
};