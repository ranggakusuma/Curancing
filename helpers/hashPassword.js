const bcrypt = require('bcryptjs')

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(5)
    var hash = bcrypt.hashSync(password, salt);
    
    return hash
}

module.exports = hashPassword