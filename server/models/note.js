//////////////////////////////////////////////////////////
/* database logic */
////////////////////////////////////////////////////////////
require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL
console.log(url)

mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then(() => {
    console.log('connected')
  })
  .catch((err) => {
    console.log(err)
  })

const noteSchema = new mongoose.Schema({
  content: { type: String, minLength: 5, required: true },
  important: Boolean,
})
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model('Note', noteSchema)
