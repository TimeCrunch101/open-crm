require('dotenv').config()
const DATABASE = require('../controllers/databaseController')

test("Register user", async () => {
    const result = await DATABASE.register('123', 'TEST', "TEST", 'TEST TEST', 'TEST1@TEST1.COM1', 'PASSWORD')
    expect(result).toEqual(true)
})

test("Get Users", async () => {
    const res = await DATABASE.getAllUsers()
    expect(res.length).toBeGreaterThanOrEqual(0)
})

test('Get User By Email', async () => {
    const res = await DATABASE.getUserByEmail('TEST1@TEST1.COM1')
    expect(res.email).toEqual('TEST1@TEST1.COM1')
})


// TODO: TEST disableUser

// TODO: TEST updateUser

test('Delete User', async () => {
    const res = await DATABASE.deleteUser("123")
    expect(res).toEqual(true)
})

// TODO: TEST createClient

test('Create Client', async () => {
    const res = await DATABASE.createClient({
        companyName: 'Test Company',
        street: '123 Test Street',
        city: "TEST CITY",
        state: 'TEST STATE',
        zip: '12345',
        country: "TEST COUNTRY",
        primaryPhone: "123-456-7899",
        fax: "987-654-3211",
        website: "www.test.com"
    })
    expect(res).toEqual(true)
})

// TODO: TEST getClients

test('Get Clients', async () => {
    const res = await DATABASE.getClients()
    expect(res.length).toBeGreaterThanOrEqual(0)
})

test('Delete Client', async () => {
    const id = await DATABASE.getClient('Test Company')
    const res = await DATABASE.deleteClient(id.id)
    expect(res).toEqual(true)
})

// TODO: TEST updateClient

// TODO: TEST createClientContact

// TODO: TEST getClientContacts

// TODO: TEST updateClientContact

// TODO: TEST DeleteClientContact

// TODO: TEST createClientNote

// TODO: TEST getClientNotes

// TODO: TEST updateClientNote

// TODO: TEST DeleteClientNote
