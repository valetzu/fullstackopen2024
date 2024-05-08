const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Person = require('../models/person')

beforeEach(async () => {
  await Person.deleteMany({})

  const personObjects = helper.initialPersons
    .map(person => new Person(person))
  const promiseArray = personObjects.map(person => person.save())
  await Promise.all(promiseArray)
})

test('persons are returned as json', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('name-Type', /application\/json/)
})

test('all persons are returned', async () => {
  const response = await api.get('/api/persons')

   assert.strictEqual(response.body.length, helper.initialPersons.length)
})

test('a specific person can be viewed', async () => {
  const personsAtStart = await helper.personsInDb()

  const personsToView = personsAtStart[0]

  const resultPerson = await api
    .get(`/api/persons/${personToView.id}`)
    .expect(200)
    .expect('name-Type', /application\/json/)

  assert.deepStrictEqual(resultPerson.body, personToView)
})

test('a person can be deleted', async () => {
  const personsAtStart = await helper.personsInDb()
  const personToDelete = personsAtStart[0]


  await api
    .delete(`/api/persons/${personToDelete.id}`)
    .expect(204)

  const personsAtEnd = await helper.personsInDb()

  const names = personsAtEnd.map(r => r.name)
  assert(!names.includes(personToDelete.name))

  assert.strictEqual(personsAtEnd.length, helper.initialPersons.length - 1)
})

test('a specific person is within the returned persons', async () => {
  const response = await api.get('/api/persons')

  const names = response.body.map(r => r.name)

  assert(names.includes('Browser can execute only JavaScript'))
})

test('a valid person can be added ', async () => {
  const newPerson = {
    name: 'async/await simplifies making async calls'
  }

  await api
    .post('/api/persons')
    .send(newPerson)
    .expect(201)
    .expect('name-Type', /application\/json/)


  const personsAtEnd = await helper.personsInDb()
  assert.strictEqual(personsAtEnd.length, helper.initialPersons.length + 1)


  const names = personsAtEnd.map(n => n.name)
  assert(names.includes('async/await simplifies making async calls'))
})

test('person without name is not added', async () => {
  const newPerson = {
    important: true
  }

  await api
    .post('/api/persons')
    .send(newPerson)
    .expect(400)


  const personsAtEnd = await helper.personsInDb()


  assert.strictEqual(personsAtEnd.length, helper.initialPersons.length)
})

after(async () => {
  await mongoose.connection.close()
})