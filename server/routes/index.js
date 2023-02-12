//Roteador do servico API
const express = require('express');
const router = express.Router();

module.exports = router;


const User = require('../controllers/sampleController')
const Sample = require('../controllers/sampleController')
const UserModel = require('../models/sample')
const SampleModel = require('../models/sample')
const { spawn }= require("node:child_process")
const path = require('path')
const fs = require('fs');
const sample = require('../models/sample');

let idcounter = 0;



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
   * O login é feito normal com o wallet address
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
   * Mint de um Sample. 
   *  
   */

  router.post('/mintSample', function(req,res){
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time; 

    //Variáveis payload
    const payload = req.body;
    const objects = payload.objects;
    const sampleData = objects[0];
    const newID = objects[1];
    

    const newSample={
        walletOwner: sampleData.walletOwner,
        countMinted: sampleData.countMinted,
        mintDate: dateTime, 
        description: sampleData.description,
        image: sampleData.image,
        name: sampleData.name,
        animation_url: sampleData.animation_url,
        attributes: sampleData.attributes,
        value: sampleData.value,
        samplesUsed: sampleData.samplesUsed
    }

    console.log("ID " + newID)

    if(newSample.samplesUsed.length ==0){
        //Change directory of process
        process.chdir(path.dirname(__filename))
        console.log(`New working directory: ${process.cwd()}`) 
        
        const audioBuffer = Buffer.from(new Uint8Array(sampleData.audio))   
        fs.writeFileSync('../AI/Datasets/cmn-dataset/'+ sampleData.attributes[2].value +'/All/All/' + newID+'.wav', audioBuffer, (err) => {
          if (err){
            return res.status(500).send({ message: 'Error saving audio file' });
          }else{
            console.log("Sample " + newID + " from user " + sampleData.walletOwner + "saved locally")
          }
        });
        process.chdir('..')
        console.log(`After upload directory: ${process.cwd()}`) 
        Sample.inserir(newSample)
            .then(dados => res.status(201).jsonp({dados: dados}))
            .catch(e => res.status(500).jsonp({e: 'erro'}))
    }else{
      Sample.inserir(newSample)
            .then(dados => res.status(201).jsonp({dados: dados}))
            .catch(e => res.status(500).jsonp({error: 'erro'}))
    }


  });


  /**
   * Generate de uma Música
   * 
   */

  router.post('/generate', function(req,res){

    idcounter++;
    const generated_type = "Blues/All/All" // TO DO: 

    /*
    TO DO: 
    //const generated_type = newSample.body.genre+"/All/All"
    
    
    //Ciclo dinâmico para geração de música com >1 intrumentos
    //Diferentes instrumentos
    
    let i;
    for(i = 0; i<newSample.body.instruments.length; i++){
        
        generated_type = generated_type.concat(newSample.body.genre + "/All/All ")
    }

    //ficheiro gerado ao PATH especifico
    let path = "../AI/Generated/" // + req.body.attributes[2].value + "/" + req.body.attributes[3].value + "/"
    */    
    const file = '../AI/Generated/' + idcounter + '.wav'
    console.log(`--Working directory-- ${process.cwd()}`)
    const ids = '1 2 3' 
    
    //Geração e envio para frontend
    generateAudioFile(idcounter,generated_type)
    .then(()=> {
      fs.readFile(file, (err, audio) => {
        if (err) {
            console.log(err)
            res.writeHead(500, {'Content-Type': 'text/plain'})
            res.end('An error occurred');
        } else {
            // Envia o .mp3 file e correspondentes ids para o frontend
            //Ids hardcoded para já
            process.chdir('..')
            res.set('Content-Type', 'audio/mpeg')
            res.send({ audio, ids })  
                    
        }
      });
    })
    
  });

  /** Função auxiliar generatedAudioFile - Promise
   * 
   *  -Adicionar futuramente o path especifico
   */
  function generateAudioFile(idcounter,generated_type){  
    
    const generatePromise = new Promise((resolve, reject) => {
      //Processo filho que processa o script para geração com os componentes necessários 
      //C:\\Users\\USER\\Documents\\GitHub\\ComposableMusicNFT\\server\\AI\\ generate_music.py
      process.chdir('AI')
      const pythonProcess = spawn('python',['generate_music.py', idcounter.toString(), generated_type])
      pythonProcess.on('exit', function (code) {
        if (code === 0) {
          console.log("Child process exited successfully")
          resolve("File Created and ready to send")
        } else {
          console.log("Child process exited with code: " + code)
          reject(new Error('Erro, file was not created'))
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

  router.get('/getHomepage', (req,res) => {
    
    Sample.getHomepage()
      .then(samples => res.status(201).jsonp({samples: samples}))
      .catch(e => res.status(500).jsonp({error: 'erro'}))
  })