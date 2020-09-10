const Sequelize = require('sequelize')
const connection = require('../database/database')

const Game = connection.define('games',{
    coverUrl:{
        type:Sequelize.TEXT,
        allowNull:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    year:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    price:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})


module.exports = Game