const mongoose = require('mongoose')

var sampleSchema = new mongoose.Schema(  
  
    {
        walletOwner: String,
        countMinted: String,
        mintDate: String,
        description: String,
        image: String,
        name: String,
        attributes: [{
            trait_type: String,
            value: String,
        }],
        value: String,
        soundFile: String,
    });

module.exports = mongoose.model('sample', sampleSchema)