const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PropertiesSchema = new Schema ({
    title: String,
    price: String,
    location: String,
    image: String,
})

module.exports = mongoose.model('Property', PropertiesSchema)
