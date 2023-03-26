const { connect, saveEntry, disconnect } = require('./db')
const Customer = require('../api/model/customer')
const db = require('./db');


jest.mock('./db.js')
//* jest 3 functions
beforeAll(async () => {
  return await connect()
})

describe('Customer Test Suite', () => {
  test('As a user I want to create and account', async () => {
    const customer = new Customer({
      "name":"Zachary Taylor",
      "orderCount": 23,
      "email": "example@example.com",
      "age": 30,
      "living": true
    });

    const newCustomer = await saveEntry(customer)
    expect(newCustomer.name).toEqual("Zachary Taylor")
    expect(newCustomer.email).toEqual("example@example.com")
    expect(newCustomer.age).toEqual(30)
    expect(newCustomer.living).toEqual(true)
  })

    afterAll(async () => {
      return await disconnect()
    })  
});