const mongoose = require('mongoose')

var userSchema = new mongoose.Schema(  
  
    {
        name: String,
        walletAddress: String 
    });

module.exports = mongoose.model('user', userSchema)