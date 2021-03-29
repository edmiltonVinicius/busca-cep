import express from 'express'
const app = express()
const port = process.env.PORT || 8080

app.set('view engine', 'ejs')
app.use('/static', express.static('static'))

app.get('/', async (req, res) => {
    await res.render('index')
})

app.listen(port, () => console.log(`Server on in port: ${port}`))