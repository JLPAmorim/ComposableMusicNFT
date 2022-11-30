const mongoose = require('mongoose')

var userSchema = new mongoose.Schema(  
  
    {
        name: String,
        data: String,
        samples: [{
            tokenId: String
        }]
        
    });

module.exports = mongoose.model('sample', userSchema)