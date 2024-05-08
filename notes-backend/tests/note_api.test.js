const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Note = require('../models/note')

describe('When there is initially some notes saved', () => {

  beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')


    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)

    assert(contents.includes('HTML is easy'))
  })

  describe('viewing a specific note', () => {

    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb()

      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })
  })

  describe('addition of a new note', () => {

    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'Unit testing is so incrediby easy',
        important: false
      }
  
      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
  
  
      const contents = notesAtEnd.map(n => n.content)
      assert(contents.includes('Unit testing is so incrediby easy'))
    })

    test('note without content is not added', async () => {
      const newNote = {
        important: false
      }
  
      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)
  
  
      const notesAtEnd = await helper.notesInDb()
  
  
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
  })

  describe('formatting the note object', () => {

    test('note id property name is correctly formatted without underscore', async () => {
      const notesAtStart = await helper.notesInDb()
  
      const noteToView = notesAtStart[0]
  
      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      assert(!resultNote.body._id)
    })

    test.only('if added note is missing important, randomize and set it ', async () => {
      const newNote = {
        content: 'Unit testing is so incrediby easy'
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      const addedNote = notesAtEnd.filter(note => note.content === newNote.content)[0]
      const hasImportant = addedNote.important
      assert.strictEqual((addedNote.important === true || addedNote.important === false), true)
    })
  })

  describe('deletion of a note', () => {
    test('a note can be deleted', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

      const notesAtEnd = await helper.notesInDb()

      const contents = notesAtEnd.map(r => r.content)
      assert(!contents.includes(noteToDelete.content))

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
    })
  })

})

after(async () => {
  await mongoose.connection.close()
})

