const bcrypt = require('bcryptjs')

function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = checkPassword