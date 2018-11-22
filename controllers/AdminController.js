const checkPassword = require('../helpers/checkPassword')
const Model = require('../models/index')

class AdminController {
    static adminForm(req, res) {
        // res.send('ini dari controller')
        let input = {
            title: 'Admin page'
        }
        if (req.query.error){
            input.error = req.query.error
        } else {
            input.error = null
        }
        res.render('./admin/login.ejs', input)
    }

    static adminLogin(req, res) {
        // res.send(req.body)
        Model.Admin.findOne({
            where: {
                username: req.body.username
            }
        })
            .then((data) => {
                if (data) {
                    // res.send(checkPassword(req.body.password, data.password))
                    if (checkPassword(req.body.password, data.password)) {
                        req.session.adminLogin = {
                            id: data.id,
                            name: data.name,
                            email: data.email,
                        }
                        console.log(req.session)
                        res.redirect('./')
                        
                    } else {
                        // res.send('Password salah')
                        let msg = 'Password salah'
                        res.redirect(`/admin/login?error=${msg}`)
                    }
                } else {
                    // res.send('Username not found')
                    let msg = 'Username Tidak Ditemukan'
                    res.redirect(`/admin/login?error=${msg}`)
                }
            }).catch((err) => {
                res.send(err)
            });
    }

    static logout(req, res) {
        req.session.adminLogin = null
        // res.send('berhasil logout')
        res.redirect('/admin/login')
    }

    static addForm(req, res) {
        Model.Type.findAll()
            .then((data) => {
                // res.send(data)
                res.render('./admin/adminAddForm.ejs', {data: data})
            }).catch((err) => {
                res.send(err)
            });
    }

    static dashBoard(req, res) {
        res.render('./admin/index.ejs', {name: req.session.adminLogin.name})
    }

    static addCat(req, res) {
        // res.send(req.body)
        let input = {
            name: req.body.name,
            age: req.body.age,
            price: req.body.price,
            TypeId: req.body.type,
            pic: req.file.filename,
            gender: req.body.gender,
            sold: 0
        }
        Model.Cat.create(input)
            .then((data) => {
                // res.send(data)
                res.redirect('/admin/all-cat')
            }).catch((err) => {
                res.send(err)
            });

    }

    static allCat(req, res) {
        Model.Cat.findAll({
            include: [{
                model: Model.Type
            }]
        })
            .then((data) => {
                let newData = []
                data.forEach(element => {
                    element.dataValues.jenis = element.Type.name
                    // console.log(element)
                    newData.push(element.dataValues)
                });
                // res.send(newData)
                res.render('admin/all-cat.ejs', {data:newData})
            }).catch((err) => {
                res.send(err)
            });
    }
    
    static deleteCat(req, res) {
        Model.Cat.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((data) => {
                res.redirect('/admin/all-cat')
            }).catch((err) => {
                res.send(err)
            });
    }

    static editCatForm(req, res) {
        let newData = {}
        Model.Cat.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Model.Type
            }]
        })
        .then((data) => {
            newData = data.dataValues
            newData.jenis = newData.Type.name
                return Model.Type.findAll() 
                // res.send(data)
                // res.render('admin/edit-cat.ejs', {data:newData})
            })
            .then(data => {
                // res.send(data)
                newData.allJenis = data
                // res.send(newData)
                res.render('admin/edit-cat.ejs', {data:newData})
            })
            .catch((err) => {
                res.send(err)
            });
    }

    static editCatUpdate(req, res) {
        // res.send(req.body)
        let input = {
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            price: req.body.price,
            TypeId: req.body.type
        }
        Model.Cat.update(input, {
            where: {
                id: req.params.id
            }
        })
            .then((data) => {
                if (data) {
                    // res.send(data)
                    res.redirect('/admin/all-cat')
                } else {
                    res.send('gagal update kucing')
                }
            }).catch((err) => {
                res.send(err)
            });
    }
}


module.exports = AdminController