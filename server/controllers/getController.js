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

exports.getAllClients = async (req, res) => {
    try {
        const clients = await DATABASE.getClients()
        res.status(200).json({
            clients: clients
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            cause: error.cause
        })
    }
}

exports.getClientNotes = async (req, res) => {
    try {
        const notes = await DATABASE.getClientNotes(req.params.clientID)
        res.status(200).json({
            notes: notes,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            cause: error.cause
        })
    }
}