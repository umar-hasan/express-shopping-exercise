process.env.NODE_ENV = "test"

const request = require("supertest")
const axios = require("axios")
const app = require("./app")
let items = require("./fakeDb")

let item = {name: "Test", price: "3.45"}

beforeEach(async function() {})

afterEach(function() {})

describe('POST items', function() {
    test('adds new item', async function() {
        const res = await request(app).post("/items").send({
            name: "Something",
            price: "1.50"
        })
        expect(res.status).toBe(200)
        expect(items.length).toBe(1)
    })
})

describe('GET items', function() {
    test('get all items', async function() {
        const res = await request(app).get("/items")
        expect(res.status).toBe(200)
        expect(items.length).toBe(1)
    })
    
})

describe('GET items', function() {
    test('get one item', async function() {
        const res = await request(app).get("/items/Something")
        expect(res.status).toBe(200)
        expect(items.length).toBe(1)
    })

    test('return 404', async () => {
        const res = await request(app).get("/items/asdf")
        expect(res.status).toBe(500)
    })
    
    
})

describe('PATCH items', function() {
    test('update an item', async function() {
        let i = {
            name: "Nothing",
            price: "2.70"
        }
        const res = await request(app).patch("/items/Something").send(i)
        expect(res.status).toBe(200)
        expect(items[0]).toHaveProperty("name", "Nothing")
    })
    
})

describe('DELETE items', function() {
    test('delete an item', async function() {
        const res = await request(app).delete("/items/Nothing")
        expect(res.status).toBe(200)
        expect(items).toHaveLength(0)
    })
    
})

