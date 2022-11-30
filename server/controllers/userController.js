// Controlador para o model user
let User = require('../models/user')

module.exports.inserir = q => {
    const novo = new User(q)
    return novo.save()
}



module.exports.remover = function(id){
    return User.deleteOne({id: id})
}