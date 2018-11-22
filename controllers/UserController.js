const Model = require('../models/index')
const checkPassword = require('../helpers/checkPassword')

class UserController {
    static registerForm(req, res) {
        // res.send({title: 'Register Form', info: []})
        res.render('./pages/register/index.ejs', {title: 'Register Form', info: []})
    }

    static registerAdd(req, res) {
        let input = {
            title: 'Register Form',
            data: req.body,
            info: []
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
        res.render('./pages/login/login.ejs', {title: 'Login Form', info: []})
    }

    static loginUser(req, res) {
        let input = {
            title: 'Login Form',
            info: []
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
                        console.log(req.session)
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
        res.send('destroy session')
    }
}

module.exports = UserController