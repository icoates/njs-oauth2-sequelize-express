const Sequelize = require('sequelize')
var db = require('../config/databases')
var user = require('./user')
// name table
var nametable = 'api_access_token'
const access_token = db.define('Access_token', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
  
      },
    access_token: Sequelize.STRING(128),
    
    user_id: {
        type: Sequelize.INTEGER(),
        references: {
            model: user.user,
            key: 'id'
        }
    },

},{
    tableName : nametable,
    timestamps: false,
})

exports.access_token = access_token;

exports.saveAccessToken= async function(accessToken, userID, cbfunc){
    await access_token.create({
        access_token: accessToken,
        user_id:userID
    }).catch(function(err){
        cbfunc(err.message)
    }) 
    cbfunc()

}

exports.getUserIDFromBearerToken = async function(bearerToken, cbfunc){
    const token = await access_token.findOne({
        where:{
            access_token: bearerToken
        }
    })
    cbfunc(token == undefined ? null :  token.user_id)

}

