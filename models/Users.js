const Sequelize = require('sequelize')
const  db = new Sequelize('postgres://localhost:5432/passport')
const crypto = require('crypto')

const User = db.define('user', {
    email : {
        type : Sequelize.STRING,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING
    },
    salt : {
        type : Sequelize.STRING
    }


})
User.passwordSalt = () => {
    return crypto.randomBytes(20).toString('hex')
}
User.prototype.passwordHash = (password, salt) => {
    return crypto.createHmac('sha1', salt).update(password).digest('hex')
}
User.hook('beforeCreate', (user)=>{
    user.salt = User.passwordSalt();
    let { password, salt } = user
    user.password = user.passwordHash(password,salt)
})

module.exports = { db, User}