require('dotenv').config()
const DATABASE = require('../controllers/databaseController')

// TODO: TEST getAllUsers

// TODO: TEST getUserByEmail

test("Register user", async () => {
    const result = await DATABASE.register('123', 'TEST', "TEST", 'TEST TEST', 'TEST1@TEST1.COM1', 'PASSWORD')
    expect(result).toEqual(true)
})

// TODO: TEST disableUser

// TODO: TEST updateUser

test('Delete User', async () => {
    const res = await DATABASE.deleteUser("123")
    expect(res).toEqual(true)
})

// TODO: TEST createClient

// TODO: TEST getClients

// TODO: TEST deleteClient

// TODO: TEST updateClient

// TODO: TEST createClientContact

// TODO: TEST getClientContacts

// TODO: TEST updateClientContact

// TODO: TEST DeleteClientContact

// TODO: TEST createClientNote

// TODO: TEST getClientNotes

// TODO: TEST updateClientNote

// TODO: TEST DeleteClientNote
