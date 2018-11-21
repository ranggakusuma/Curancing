const Model = require('../models/index')

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
}

module.exports = UserController