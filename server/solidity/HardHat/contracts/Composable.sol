// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./@openzeppelin/contracts/access/Ownable.sol";
import "./@openzeppelin/contracts/utils/Counters.sol";
import "./@openzeppelin/contracts/utils/Strings.sol";



//Function Modifiers are used to modify the behaviour of a function. For example to add a prerequisite to a function.
contract Composable is Ownable, ERC721, ReentrancyGuard{
    
    using Counters for Counters.Counter; //inicializar counters library - keep track of nft ids
    // ver methods para estatisticas
    
    Counters.Counter private _tokenIdCounter; //counter de mint
    mapping(uint => Sample) public nfts; //registo de nfts/samples? idToken => Sample 
    uint256 taxArtist = 5000000000000000;
    address public algorithmOwner;
    
    struct Sample { 
        uint idToken;
        address walletOwner;
        uint valueSample;
        //uint valueLast;
        uint[] samples;
    }

    //construtor para dar deploy 1 vez, construtor vazio contrói variaveis a vazio
    constructor() ERC721("Composable Music Samples","CM") {}

    //When creating a new NFT, the contract will shout this information out to the world
    event NewSample(address sender, uint256 tokenId, string name);

    event NewMusic(address sender, uint256 tokenId);

    //variáveis publicas tem getters e setters implementadas na network


    /*
    Frontend methods:
    -Ver restantes funcionalidades no figma para saber que functions necessitamos para o frontend 
    */
    function getMusicas() public view returns (uint[] memory){
            uint[] memory n;
            uint i=0;           
            while(i<_tokenIdCounter.current()){
                n[i] = nfts[i].idToken;
            }
            return (n);
    }
  
    /*
    Artist methods:
        -fazer mint do token incrementado para o addr do autor - lista de samples vazia
        -preciso do valor que o artista quer dar à sample 
        -criar a Sample 
    */
    function generateNFTArtist(address to, uint value, string calldata nameSample) public payable virtual{
        // valor de dinheiro na wallet de artista tem de ser acima ou igual ao estipulado para a taxa de mint  
        require(msg.value >= taxArtist, "Not enough ETH sent; check price!");

        uint256 newSampleId = _tokenIdCounter.current();

        //New sample
        Sample memory sample;
        uint[] memory samplesEmpty;

        sample.valueSample = value;
        sample.walletOwner = to;
        sample.idToken = newSampleId;
        sample.samples = samplesEmpty;

        //J adiciono ao registo
        //nfts[newSampleId]=sample;
        //incremento o tokenId
        //_tokenIdCounter.increment();

        _safeMint(to, newSampleId);

        //adiciono ao registo
        nfts[newSampleId]=sample;

        //incremento o tokenId
        _tokenIdCounter.increment();

        emit NewSample(to, newSampleId, nameSample);


    }

    /*
    Buyer/Content Provider methods:
        -fazer mint do token incrementado para o addr do buyer - preciso de uma lista de samples para as royalties
        -valor total da musica - somatorio das samples
        -crio o nft para o buyer
    */

    function generateNFTMusic(address to, uint[] memory samplesA) public payable virtual{ //public payable virtual means that you are allowed to pay the contract to execute this function. 

        

        uint newSampleId = _tokenIdCounter.current();
    

        //New music, lista não vazia com samples
        Sample memory sample;
        
        uint i=0;           
        while(i<_tokenIdCounter.current()){
                sample.valueSample += nfts[i].valueSample;
        }
        
        sample.walletOwner = to;
        sample.idToken = newSampleId;
        sample.samples = samplesA;


        //transfer de value de sample para cada artista // se falhar numa das iteracoes, falha tudo?
        uint total = 0; //somatorio de 
        for(uint j=0; j<samplesA.length; j++){
                total += nfts[samplesA[j]].valueSample;
        }

        require(msg.value >= total,"Not enough funds!");  
        for(uint j=0; j<samplesA.length; j++){  
            //require(msg.value >= nfts[samplesA[j]].valueSample,"Not enough funds!");
            address seller = nfts[samplesA[j]].walletOwner;
            payable(seller).transfer(msg.value);  //send the ETH to the seller


        }

        //J adiciono ao Registo;
        //nfts[newSampleId] = sample;
        //incremento o tokenId
        // _tokenIdCounter.increment();

        //Devo dar mint direto ao comprador ou dou mint para nós, o algorithmOwner e dps _transfer para o to
        //_safeMint(algorithmOwner, newSampleId);
        //_transfer(algorithmOwner, to, newSampleId);

        // valor de dinheiro na wallet de artista tem de ser acima ou igual ao estipulado para a taxa de mint  
        require(msg.value >= taxArtist, "Not enough ETH sent; check price!");
        _safeMint(to, newSampleId);
        //adiciono ao Registo;
        nfts[newSampleId] = sample;

        _tokenIdCounter.increment();
       
        // Sendo o progama atómico o event será a última cena a relizar pois todas
        // as operacoes para trás fora realizadas
        emit NewMusic(to, newSampleId);

    } 
/*
Equipa methods:
*/
    /* J
    bool public isMintEnabled;
    function setIsMintEnabled(bool isMintEnabled_) external onlyOwner{
        isMintEnabled = isMintEnabled_;
    }*/

    //Método para alterar taxa de pagamento para mint de sample
    function setTaxArtist(uint256 _taxArtist) public onlyOwner {
        taxArtist = _taxArtist;
    }


    //Método para retornar a quantidade de mints (will represent the total number of NFTs minted using this contract.)
    function totalContent() public view virtual returns (uint256) { //variavel privada?
        return _tokenIdCounter.current();
    }

    /*J metadata URI
    string private _baseTokenURI;
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }
    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }*/

    //Método que permite retornar e 'ver' o NFT
    //Em principio vamos precisar deste tokenURI e passa-lo na função de mint, uma vez que 
    //so recebemos a metadata do frontend quando for para efetuar o mint. 
    //Fazer callback caso transação de mint falhe para o upload da metadata????
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory){
        require(_exists(tokenId),"ERC721Metadata: URI query for nonexistent token");
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? 
            string(abi.encodePacked(baseURI, Strings.toString(tokenId))) : "";
    }


}


    
    

    
    
    








