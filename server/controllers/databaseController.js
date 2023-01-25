const { DB } = require('../config/db');

/**
 * @returns All users as an Array
 */

exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT uuid, firstname, lastname, fullname, email FROM users", (err, data) => {
            try {
                if (err) throw new Error('Could not get users', {cause: err.message})
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    })
}

/**
 * @param {string} email Email to look up
 * @returns The user Object
 */

exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM users WHERE email = ?",[email], (err, user) => {
            try {
                if (err) throw new Error("Could not retrieve the user", {cause: err.message})
                resolve(user[0])
            } catch (err) {
                reject(err)
            }
        })
    })
}

/**
 * @param {string} uuid Automatically created by application
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} fullName 
 * @param {string} email 
 * @param {string} passwordHash 
 * @returns true if the user was created, rejects with new Error()
 */

exports.createUser = (uuid, firstName, lastName, fullName, email, passwordHash) => {
    return new Promise((resolve, reject) => {
        DB.query("INSERT INTO users SET ?",{
            uuid: uuid,
            firstName: firstName,
            lastName: lastName,
            fullName: fullName,
            email: email,
            password: passwordHash
        },(err) => {
            try {
                if (err) {
                    if (err.message === `Duplicate entry '${email}' for key 'users.email_UNIQUE'`) {
                        throw new Error('Could not create user in database', {cause: 'That email is already in use'})
                    } else {
                        throw new Error('Could not create user in database', {cause: err.message})
                    }
                }
                resolve(true)
            } catch (err) {
                reject(err)
            }
        })
    })
}

/**
 * 
 * @param {object} company 
 * @param {string} company.companyName
 * @param {string} company.street
 * @param {string} company.city
 * @param {string} company.state
 * @param {string} company.zip
 * @param {string} company.country
 * @param {string} company.primaryPhone
 * @param {string} company.fax
 * @param {string} company.website
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.createClient = (company) => {
    return new Promise((resolve, reject) => {
        DB.query("INSERT INTO clients SET ?",{
            companyName: company.companyName,
            street: company.street,
            city: company.city,
            state: company.state,
            zip: company.zip,
            country: company.country,
            primaryPhone: company.primaryPhone,
            fax: company.fax,
            website: company.website
        },(err) => {
            try {
                if (err) throw new Error('Could not create client', {cause: err.message})
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    })
}

/**
 * 
 * @param {object} note The Note Object
 * @param {string} note.data The message body
 * @param {string} note.timestamp A time stamp should be generated new Date()
 * @param {string} note.author Who wrote the note
 * @param {number} note.client The ID of the client the note should be assigned to
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.createClientNote = (note) => {
    return new Promise((resolve, reject) => {
        DB.query("INSERT INTO client_notes SET ?",{
            note: note.data,
            timestamp: note.timestamp,
            author: note.author,
            client: note.client
        },(err) => {
            try {
                if (err) throw new Error("Could not create the note", {cause: err.message})
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    })
}

/**
 * 
 * @param {object} contact The Contact Object
 * @param {string} contact.firstName
 * @param {string} contact.lastName
 * @param {string} contact.fullName
 * @param {string} contact.primaryPhone
 * @param {string} contact.cellPhone
 * @param {number} contact.client
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.createClientContact = (contact) => {
    return new Promise((resolve, reject) => {
        DB.query("INSERT INTO contacts SET ?",{
            firstName: contact.firstName,
            lastName: contact.lastName,
            fullName: contact.fullName,
            primaryPhone: contact.primaryPhone,
            cellPhone: contact.cellPhone,
            client: contact.client
        },(err) => {
            try {
                if (err) throw new Error('Could not create contact', {cause: err.message})
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    })
}