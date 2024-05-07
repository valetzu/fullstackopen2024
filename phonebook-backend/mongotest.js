const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://valetzu:${password}@fullstackopen.5vdobbr.mongodb.net/`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Person = mongoose.model('Person', noteSchema)

const p = new Person({
  name: 'Grinding is hard',
  number: 'placeHolderNumber',
})

/* note.save().then(result => {
  console.log('note saved!', result)
  mongoose.connection.close()
}) */

Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })