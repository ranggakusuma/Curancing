const Model = require('../models/index')
const checkPassword = require('../helpers/checkPassword')

class UserController {
    static registerForm(req, res) {
        // res.send({title: 'Register Form', info: []})
        res.render('./pages/register/index.ejs', {title: 'Register Form', info: [], userLogin:null})
    }

    static registerAdd(req, res) {
        let input = {
            title: 'Register Form',
            data: req.body,
            info: [],
            userLogin: null
        }
        if (req.body.password !== req.body.confirmPassword) {
            input.info.push(`password tidak sesuai dengan confirm password`)
            res.render('./pages/register/index.ejs', input)
        } else {
            
            Model.User.create(req.body)
            .then((data) => {
                let msg = 'Berhasil daftar akun!'
                res.redirect('/?success='+msg)
            }).catch((err) => {
                err.errors.forEach(element => {
                    input.info.push(element.message)
                })
                // res.send(input)
                res.render('./pages/register/index.ejs', input)
            });
        }
    }

    static loginForm(req, res) {
        res.render('./pages/login/login.ejs', {title: 'Login Form', info: [], userLogin:null})
    }

    static loginUser(req, res) {
        let input = {
            title: 'Login Form',
            info: [],
            userLogin: null
        }
        Model.User.findOne({where: {
            username: req.body.username
        }})
            .then((data) => {
                if (data) {
                    let passwordLogin = checkPassword(req.body.password, data.password)
                    if (passwordLogin) {
                        req.session.userLogin = {
                            id: data.id,
                            username: data.username,
                            email: data.email,
                            name: data.name
                        }
                        // console.log(req.session)
                        input.userLogin = req.session.userLogin
                        res.redirect('/')
                    } else {
                        input.info.push('Password Salah')
                        res.render('./pages/login/login.ejs', input)
                    }
                } else {
                    input.info.push('Username tidak ditemukan')
                    res.render('./pages/login/login.ejs', input)
                }
            }).catch((err) => {
                res.send(err)
            });
        
    }

    static logout(req, res) {
        console.log(req.session, '=====')
        req.session.userLogin = null
        console.log(req.session, '++++')
        // res.send('destroy session')
        res.redirect('/')
    }

    static finCat(req, res) {
        // res.send('test')
        let input = {
            title: 'Adopsi Kucing',
            data: {},
            userLogin: req.session.userLogin
        }
        Model.Cat.findAll({
            include: [{
                model: Model.Type
            }]
        })
            .then((data) => {
                // res.send(data[0].getPrice())
                let newData = []
                data.forEach(element => {
                    element.dataValues.jenis = element.Type.name
                    element.price = element.getPrice()
                    // console.log(element)
                    newData.push(element.dataValues)
                });
                input.data = newData
                // res.send(newData)
                res.render('./pages/cat/index.ejs', input)
            }).catch((err) => {
                res.send(err)
            });
    }

    static beli(req, res) {
        let input = {
            title: 'Checkout',
            userLogin: req.session.userLogin,
            data: {}
        }
        Model.Cat.findOne({
            include: [{
                model: Model.Type
            }]
            ,where:{
                id: req.params.id
            }
        })
        .then((data) => {
            data.dataValues.harga = data.getPrice()
            data.dataValues.jenis = data.dataValues.Type.name
            // res.send(data)
            input.data = data.dataValues
            res.render('./pages/cat/beli.ejs', input)
        }).catch((err) => {
            res.send(err)
        });
        
    }

    static checkOut(req, res) {
        let input = {
            UserId: req.session.userLogin.id,
            CatId: req.params.id,
            status: 0,
        }

        Model.Transaction.create(input)
            .then((data) => {
                // res.send(data)
                res.render('./pages/cat/success.ejs', {title: 'Checkout', userLogin: req.session.userLogin})
            }).catch((err) => {
                res.send(err)
            });
    }
}

module.exports = UserController