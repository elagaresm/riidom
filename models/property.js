const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PropertiesSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    price: String,
    location: String,
    image: String,
})

module.exports = mongoose.model('Property', PropertiesSchema)
