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

// FIXME: [TEST] This is broken
test('Update User', async () => { 
    const res = await DATABASE.updateUser(12, {
        firstName: 'Test1',
        lastName: "Test2",
        fullName: 'Test1 Test2',
        email: 'test1@test2.com2'
    })
    expect(res).toEqual(true)
})

test('Delete User', async () => {
    const res = await DATABASE.deleteUser("123")
    expect(res).toEqual(true)
})

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

test('Get Clients', async () => {
    const res = await DATABASE.getClients()
    expect(res.length).toBeGreaterThanOrEqual(0)
})

test('Delete Client', async () => {
    const id = await DATABASE.getClient('Test Company')
    const res = await DATABASE.deleteClient(id.id)
    expect(res).toEqual(true)
})