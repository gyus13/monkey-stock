const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const basename = path.basename(__filename);
const dotenv = require('dotenv');
const db = {};

dotenv.config(); //LOAD CONFIG

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port:3306,
        timezone: '+09:00', //한국 시간 셋팅
        operatorsAliases: Sequelize.Op,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// const post = {
//     tags: "주식·투자",
//     url: "/stock",
// };

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// new db.Topic(post).save();

module.exports = db;
