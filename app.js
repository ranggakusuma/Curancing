const express = require('express')
const routerIndex = require('./routes/routerIndex')
const routerRegister = require('./routes/routerRegister')
const routerLogin = require('./routes/routerLogin')
const routerLogout = require('./routes/routerLogout')
const session = require('express-session')


const PORT = 3001
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(session({
    secret: 'jual kucing'
}))

app.use('/', routerIndex)
app.use('/register', routerRegister)
app.use('/login', routerLogin)
app.use('/logout', routerLogout)


app.listen(PORT, () => {console.log('App is running in port:', PORT)})