//Roteador do servico API
let express = require('express');
let router = express.Router();

const User = require('../controllers/userController')
const Sample = require('../controllers/sampleController')
const UserModel = require('../models/user')
const SampleModel = require('../models/sample')

module.exports = router;

// -------------------------- USER ------------------------------

/**
 * Get de um User
 */

 router.get('/user', (req, res, next) => {
    let token = req.headers.token;
    jwt.verify(token, 'secretkey', (error, decoded) =>{
      if (error) return res.status(401).json({
        title: 'Unauthorized'
      })
      UserModel.findOne({ _id: decoded.userId }, (error, user) => {
        if (error) return console.log(error)
        return res.status(200).json({
          title: 'User Grabbed',
          user:{
            _id: user._id,
            name: user.name,
            walletAddress : user.walletAddress,

          }
        })
      })
    })
  });


/**
 * GET de wallet de Owner por id de NFT(Sample)
 */

  router.get('/sampleArtist', (req,res,next) => {
    let token = req.headers.token;
    jwt.verify(token, 'secretkey', (error, decoded) =>{
      if (error) return res.status(401).json({
        title: 'Unauthorized'
      })
      SampleModel.findOne({ _id: decoded.idToken}, (error, sample) => {
        if (error) return console.log(error)
        return res.status(200).json({
          title: 'Wallet address from Sample Grabbed',
          samples:{
            walletOwner: sample.walletOwner

          }
        })
      })
    })    

  }); 

  /**
   * Registro de um User
   */

  router.post('/user', function(req, res){
    const newUser = {
        name: req.body.name,
        walletAddress: req.body.walletAddress
    }

    //Inserimos na base de dados
    User.inserir(newUser)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: 'Wallet already in use'}))

  });

  /**
   * Login de User
   * O login é feito normal com o wallet address (é igual a um email)?
   */

  router.post('/login', (req,res) =>{
        UserModel.findOne({walletAddress: req.body.walletAddress}, (err,user) =>{
            if(err) return res.status(500).json({
                title: 'Server error',
                error: err
              })
              if(!user) {
                return res.status(401).json({
                  title: 'User not found',
                  error: 'Invalid Credentials'
                })
              }

           /*   if(!bcrypt.compareSync(req.body.password, user.password)){
                return res.status(401).json({
                  title: 'Login failed',
                  error: 'Invalid Credentials'
                })
              }*/
              let token = jwt.sign({userId: user._id}, 'secretkey');
              return res.status(201).json({
                title: 'Login successful',
                token: token
              })
        })  
  });

// -------------------------- NFT ------------------------------

  /**
   * Mint de um Sample
   */

  router.post('/mintSample', function(req,res){
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time; 



    const newSample={
        name: req.body.name,
        date: dateTime,
        //vazio significa que é uma sample
        samples: []
    }

    Sample.inserir(newSample)
        .then(dados => res.status(201).jsonp({dados: dados}))
        .catch(e => res.status(500).jsonp({error: 'erro'}))

  });


  /**
   * Mint de um Sample Música
   */

   router.post('/mintMusic', function(req,res){
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;



    const newSample={
        name: req.body.name,
        date: dateTime,
    }

    Sample.inserir(newSample)
        .then(dados => res.status(201).jsonp({dados: dados}))
        .catch(e => res.status(500).jsonp({error: 'erro'}))

  });
