const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Person = require('../models/person')

describe('When there is initially some persons saved', () => {

  beforeEach(async () => {
    await Person.deleteMany({})
    await Person.insertMany(helper.initialPersons)
  })

  test('persons are returned as json', async () => {
    await api
      .get('/api/persons')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all persons are returned', async () => {
    const response = await api.get('/api/persons')


    assert.strictEqual(response.body.length, helper.initialPersons.length)
  })

  test('a specific person is within the returned persons', async () => {
    const response = await api.get('/api/persons')

    const names = response.body.map(r => r.name)

    assert(names.includes('Harry Potter'))
  })

  describe('viewing a specific person', () => {

    test('succeeds with a valid id', async () => {
      const personsAtStart = await helper.personsInDb()

      const personToView = personsAtStart[0]

      const resultPerson = await api
        .get(`/api/persons/${personToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultPerson.body, personToView)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/persons/${invalidId}`)
        .expect(400)
    })

    test('fails with statuscode 404 if person does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/persons/${validNonexistingId}`)
        .expect(404)
    })
  })

  describe('addition of a new person', () => {

    test('succeeds with valid data', async () => {
      const newPerson = {
          name: 'Mestari Tikku',
          number: '+100123456'
      }
  
      await api
        .post('/api/persons')
        .send(newPerson)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const personsAtEnd = await helper.personsInDb()
      assert.strictEqual(personsAtEnd.length, helper.initialPersons.length + 1)
  
  
      const names = personsAtEnd.map(n => n.name)
      assert(names.includes('Mestari Tikku'))
    })

    test('person without name is not added', async () => {
      const newPerson = {
        number: '+100123456'
    }
  
      await api
        .post('/api/persons')
        .send(newPerson)
        .expect(400)
  
  
      const personsAtEnd = await helper.personsInDb()
  
  
      assert.strictEqual(personsAtEnd.length, helper.initialPersons.length)
    })
  })

  describe('formatting the person object', () => {

    test('person id property name is correctly formatted without underscore', async () => {
      const personsAtStart = await helper.personsInDb()
  
      const personToView = personsAtStart[0]
  
      const resultPerson = await api
        .get(`/api/persons/${personToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      assert(!resultPerson.body._id)
    })

    test.only('if added person is missing number, set it empty', async () => {
      const newPerson = {
        name: 'Mestari Tikku'
    }

      await api
        .post('/api/persons')
        .send(newPerson)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const personsAtEnd = await helper.personsInDb()
      const addedPerson = personsAtEnd.filter(person => person.name === newPerson.name)[0]
      assert.strictEqual(addedPerson.number , '')
    })
  })

  describe('deletion of a person', () => {
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
  })

})

after(async () => {
  await mongoose.connection.close()
})

