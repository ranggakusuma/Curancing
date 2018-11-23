const express = require('express')
const routerIndex = require('./routes/routerIndex')
const routerRegister = require('./routes/routerRegister')
const routerLogin = require('./routes/routerLogin')
const routerLogout = require('./routes/routerLogout')
const routerAdmin = require('./routes/routerAdmin')
const routerCat = require('./routes/routerCat')

const session = require('express-session')


const PORT = process.env.PORT || 3000
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static('./views/admin/assets'))
app.use(express.static('./uploads'))

app.use(session({
    secret: 'jual kucing'
}))

app.use('/', routerIndex)
app.use('/register', routerRegister)
app.use('/login', routerLogin)
app.use('/logout', routerLogout)
app.use('/admin', routerAdmin)
app.use('/cat', routerCat)

app.listen(PORT, () => {console.log('App is running in port:', PORT)})