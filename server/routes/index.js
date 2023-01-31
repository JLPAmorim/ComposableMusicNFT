//Roteador do servico API
var express = require('express');
var router = express.Router();
var fs = require('fs');
var idcounter = 0;

const User = require('../controllers/sampleController')
const Sample = require('../controllers/sampleController')
const UserModel = require('../models/sample')
const SampleModel = require('../models/sample')
const { spawn }= require("node:child_process")

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
   * Listar todos os Users
   */

  router.get('/allUsers', (req, res, next) => {
    User.listar()
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: 'Wallet already in use'}))

  });

  router.get('/allUsers', (req, res, next) => {
    Sample.listar()
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: 'Wallet already in use'}))

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
              
              //let token = jwt.sign({userId: user._id}, 'secretkey');
              return res.status(201).json({
                title: 'Login successful',
                token: token
              })}*/
            return res.status(201).json({
                title: 'Login successful',
                walletAddress: req.body.walletAddress  
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
        walletOwner: req.body.walletOwner,
        countMinted: req.body.countMinted,
        mintDate: dateTime, 
        description: req.body.description,
        image: req.body.image,
        name: req.body.name,
        animation_url: req.body.animation_url,
        attributes: req.body.attributes,
        value: req.body.value,
        samplesUsed: req.body.samplesUsed
    }


    Sample.inserir(newSample)
        .then(dados => res.status(201).jsonp({dados: dados}))
        .catch(e => res.status(500).jsonp({error: 'erro'}))

  });


  /**
   * Generate de uma Música
   * 
   */

  router.post('/generate', function(req,res){
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    idcounter++;
    
    const newSample={
        body: req.body,
        date: dateTime,
        mintDate: dateTime, 
        description: req.body.description,
        image: req.body.image,
        name: req.body.name,
        animation_url: req.body.animation_url,
        attributes: req.body.attributes
       
    }

    const generated_type = newSample.body.genre+"/All/All";

    //Ciclo dinâmico para geração de música com >1 intrumentos
    //Diferentes instrumentos
    /*
    let i;
    for(i = 0; i<newSample.body.instruments.length; i++){
        
        generated_type = generated_type.concat(newSample.body.genre + "/All/All ");
    }
    */

    //ficheiro gerado ao PATH especifico
    let path = "../AI/Generated/" // + req.body.attributes[2].value + "/" + req.body.attributes[3].value + "/"
    const file = '../AI/Generated/' + idcounter + '.wav'
    
    
    const ids = '1 2 3' 
    
    //Geração e envio para frontend
    generateAudioFile(path,idcounter,generated_type)
    .then(()=> {
      fs.readFile(file, (err, audio) => {
        if (err) {
            // Handle any errors that occur when reading the file
            console.log(err);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('An error occurred');
        } else {
            // Send the .mp3 file and the correspondent ids to the frontend
            res.set('Content-Type', 'audio/mpeg')
            res.send({ audio, ids })  
                    
        }
      });
    })
  });

  /** Função auxiliar generatedAudioFile - Promise
   * Necessário identificar localização do ficheiro
   * 
   */
  function generateAudioFile(path,idcounter,generated_type){  
    
    const generatePromise = new Promise((resolve, reject) => {
      //Processo filho que processa o script para geração com os componentes necessários 
      //C:\\Users\\USER\\Documents\\GitHub\\ComposableMusicNFT\\server\\AI\\generate_music.py
      process.chdir('C:\\Users\\USER\\Documents\\GitHub\\ComposableMusicNFT\\server\\AI\\');
      const pythonProcess = spawn('python',['generate_music.py', idcounter.toString(), generated_type]);
    
      pythonProcess.on('exit', function (code) {
        if (code === 0) {
          console.log("Child process exited successfully");
          resolve("File Created and ready to send")
        } else {
          console.log("Child process exited with code: " + code);
          reject(new Error('Erro, file was not created'));
        }
      });
     
      
        
    });      
    return generatePromise;
  }

  /**
    * GET para os NFT's de uma wallet em especifico
    */

  router.get('/samplesByWallet', (req,res) => {
    console.log("Wallet recebida: " + req.headers.wallet)
    Sample.findByWallet(req.headers.wallet)
      .then(samples => res.status(201).jsonp({samples: samples}))
      .catch(e => res.status(500).jsonp({error: 'erro'}))
  })

  /**
    * GET para a supply existente
    */

  router.get('/getSupply', (req,res) => {
    
    Sample.getSupply()
      .then(samples => res.status(201).jsonp({samples: samples}))
      .catch(e => res.status(500).jsonp({error: 'erro'}))
  })