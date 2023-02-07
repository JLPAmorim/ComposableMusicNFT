// Controlador para o model user
var Sample = require('../models/sample')


/**
 * Tratamento de registo de Samples
 * Cada sample no registo vai ser um NFT
 * Novo mint nova inserção
 */


// Devolve a lista de Samples mintados
module.exports.listar = () => {
    return Sample
        .find()
        .exec()
}

// Consulta um Sample
module.exports.consultar = id => {
    return Sample
        .findOne({id: id})
        .exec()
}


// Insere Sample
module.exports.inserir = q => {
    const novo = new Sample(q)
    return novo.save()
}


// Remove Sample
module.exports.remover = function(id){
    return Sample.deleteOne({id: id})
}

// Find Sample by wallet
module.exports.findByWallet = function(wallet){
    return Sample.find({walletOwner: wallet}).sort({ $natural: -1 })
}

// Get how many documents are in a collection (Total Supply of NFT's)
module.exports.getSupply = function(){
    return Sample.countDocuments()
}

// Get how many documents are in a collection (Total Supply of NFT's)
module.exports.getHomepage = function(){
    return Sample.find().limit(6).sort({$natural:-1})
}