const Sequelize = require('sequelize') 
const connection = require('../database/database')

const User = connection.define('users',{
    name:{
        type:Sequelize.STRING,
        allownull:false
    },
    email:{
        type:Sequelize.STRING,
        allownull:false
    },
    password:{
        type:Sequelize.STRING,
        allownull:false
    }
})



module.exports = User