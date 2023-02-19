const { DB } = require('../config/db')

/**
 * @param {string} contactID 
 * @param {string} clientID 
 */

const removeNonPOC = (contactID, clientID) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM contacts WHERE client = ?", [clientID], (err, contacts) => {
            try {
                if (err) throw err.message
                for (let i = 0; i < contacts.length; i++) {
                    const contact = contacts[i];
                    if (contact.isPOC === 1 && contact.contactID !== contactID) {
                        DB.query('UPDATE contacts SET isPOC = 0 WHERE contactID = ?', [contact.contactID])
                    }
                }
                resolve(true)
            } catch (error) {
                reject(error)
            }
    })
    })
}

module.exports = {
    removeNonPOC: removeNonPOC
}