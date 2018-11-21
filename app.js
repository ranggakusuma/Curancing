const express = require('express')
const routerIndex = require('./routes/routerIndex')
const routerRegister = require('./routes/routerRegister')

const PORT = 3001
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))


app.use('/', routerIndex)
app.use('/register', routerRegister)

app.listen(PORT, () => {console.log('App is running in port:', PORT)})