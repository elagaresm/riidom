const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Property = require('./models/property')


// mongoose.set('strictQuery', false)
mongoose.connect('mongodb://10.0.0.5:27017/riidom')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
    console.log('Database connected')
})


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/properties', async (req, res) => {
    res.send('properties tab')
})

app.listen(3000, () => {
    console.log('Serving on port 300')
})
