const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const Property = require('./models/property')
const ExpressError = require('./utils/ExpressError')

// mongoose.set('strictQuery', false)

// windows setup
// mongoose.connect('mongodb://10.0.0.5:27017/riidom')

//macos setup
mongoose.connect('mongodb://localhost:27017/riidom');


const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
    console.log('Database connected')
})

function isLoggedIn (req, res, next) {
    console.log(req.query)
    if (req.query.username !== 'konfle') {
        throw new ExpressError('Log in as Konfle to see this webpage', 301)
    }
    next()
}


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


app.get('/dog', isLoggedIn, (req, res) => {
    res.send('woof woof')
})


app.get('/properties/new', async (req, res) => {
    res.render('properties/new')
})


app.post('/properties/', async (req, res, next) => {
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
    const { id } = req.params
    const property = await Property.findByIdAndUpdate(id, { ...req.body.property });
    console.log('UPDATED', property)
    res.redirect(`/properties/${id}`)
})


app.delete('/properties/:id', async (req, res) => {
    const { id } = req.params
    const property = await Property.findByIdAndDelete(id)
    console.log('DELETED', property)
    res.redirect('/properties')
})


// not found url
app.use((req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})


app.use((err, req, res, next) => {
    const { statusCode = 500, stack, message } = err
    if (!message) message = 'Oh no! Something went wrong!'
    res.status(statusCode).send(message)
})


app.listen(3000, () => {
    console.log('Serving on port 3000')
})
