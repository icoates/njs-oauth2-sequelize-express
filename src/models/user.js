const Sequelize = require('sequelize');
var db = require('../config/databases');
const moment = require('moment');
var crypto = require('crypto');
// name table
var nametable = 'api_user'
const user = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
  
      },
    password: Sequelize.STRING(128),
    last_login: Sequelize.DATE(),
    is_superuser: Sequelize.BOOLEAN(),
    first_name: Sequelize.STRING(150),
    last_name: Sequelize.STRING(150),
    is_staff: Sequelize.BOOLEAN(),
    is_active: Sequelize.BOOLEAN(),
    date_joined: Sequelize.DATE(),
    email: Sequelize.STRING(254),
    borrado: Sequelize.BOOLEAN(),
    

},{
    tableName : nametable,
    timestamps: false,
})

exports.user = user;

exports.getUser = async function(username, password, cbfunc){
    var shaPass = crypto.createHash("sha256").update(password).digest("hex");
    const usr = await user.findOne({
        where: {
            email: username,
            password: shaPass
        }
    })

    cbfunc(false, usr == undefined ? null : usr)
   
}

exports.getUserById = async function(idUser){
    return user.findOne({
        where: {
            id: idUser
        }
    })
    
}

exports.register = async function(username, password, cbFunc){
    var shaPass = crypto.createHash("sha256").update(password).digest("hex");
    await user.create({
        email: username,
        password: shaPass,
        last_login: moment(),
        date_joined: moment(),
        first_name: "",
        last_name:"",
        is_superuser:false,
        borrado:false,
        is_active:true,
        is_staff: false,


    }).then(function (item){
        cbFunc()
    }).catch(function(err){
        cbFunc(err.message)
    })
}

exports.isValidUser = async function(username, cbFunc){
    const usr = await user.findOne({
        where: {
            email: username,
        }
    }).catch(function(err){
        cbFunc(err,false)
    })

    cbFunc(null, usr == undefined ? true :false)
}

