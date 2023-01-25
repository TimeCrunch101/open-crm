const { DB } = require('../config/db')
const DATABASE = require('./databaseController')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await DATABASE.getAllUsers()
        res.status(200).json({
            usersArray: users,
            YOU: res.user.fullName
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            cause: error.cause
        })
    }   
}