const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
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


app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.send('<a href="/properties">Properties</a>')
})


app.get('/properties', async (req, res) => {
    const properties = await Property.find({})
    res.render('properties/index', { properties })
})


app.get('/properties/new', async (req, res) => {
    res.render('properties/new')
})


app.post('/properties/', async (req, res) => {
    const property = new Property(req.body.property)
    await property.save()
    res.redirect(`properties/${property._id}`)
})


app.get('/properties/:id', async (req, res) => {
    const property = await Property.findById(req.params.id)
    res.render('properties/show', { property })
})


app.get('/properties/:id/edit', async (req, res) => {
        const property = await Property.findById(req.params.id)
        res.render('properties/edit', { property })
})


app.patch('/properties/:id', async (req, res) => {
    const property = await Property.findById(req.params.id)

})


app.listen(3000, () => {
    console.log('Serving on port 300')
})
