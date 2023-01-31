// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./@openzeppelin/contracts/access/Ownable.sol";
import "./@openzeppelin/contracts/utils/Counters.sol";
import "./@openzeppelin/contracts/utils/Strings.sol";

//Function Modifiers are used to modify the behaviour of a function. For example to add a prerequisite to a function.
contract Composable is Ownable, ERC721URIStorage, ReentrancyGuard{
    
    using Counters for Counters.Counter; //inicializar counters library - keep track of nft ids
    
    Counters.Counter private _tokenIdCounter; //counter de mint
    mapping(uint => Sample) public nfts; //registo de nfts/samples? idToken => Sample 
    uint256 taxArtist = 0.025 ether;
    address public algorithmOwner;
    bool public isMintEnabled = true;
    
    struct Sample { 
        uint idToken;
        address walletOwner;
        uint256 valueSample;
        string nameSample;
        uint[] samples;
    }

    //construtor para dar deploy 1 vez, construtor vazio contrói variaveis a vazio
    constructor() ERC721("Composable Music","CM") {}

    //When creating a new NFT, the contract will shout this information out to the world
    event NewSample(address sender, uint256 tokenId, string name);

    event NewMusic(address sender, uint256 tokenId);
  
    /*
    Artist methods:
        -fazer mint do token incrementado para o addr do autor - lista de samples vazia
        -preciso do valor que o artista quer dar à sample 
        -criar a Sample 
    */
    function generateNFTArtist(address to, uint256 value, string memory nameSample_, string memory tokenURI_) 
        public
        returns (uint256)
    {
        require(isMintEnabled, "Mint is not active!");
        // Increment _tokenIDCounter
        _tokenIdCounter.increment();
        uint256 newSampleId = _tokenIdCounter.current();

        //New sample
        Sample memory sample;
        uint256[] memory samplesEmpty;

        //Populate sample data
        sample.idToken = newSampleId;
        sample.walletOwner = to;
        sample.valueSample = value;
        sample.nameSample = nameSample_;
        sample.samples = samplesEmpty;
        
        //adiciono ao registo
        nfts[newSampleId]=sample;

        _safeMint(to, newSampleId);
        _setTokenURI(newSampleId, tokenURI_);

        //emit NewSample(to, newSampleId, nameSample);
        return newSampleId;
    }

    /*
    Buyer/Content Provider methods:
        -fazer mint do token incrementado para o addr do buyer - preciso de uma lista de samples para as royalties
        -valor total da musica - somatorio das samples
        -crio o nft para o buyer
    */

    function generateNFTMusic(address to, uint[] memory samplesUsed, uint256 value, string memory nameSample_, string memory tokenURI_) 
        public 
        payable
        returns (uint256)
    { //public payable virtual means that you are allowed to pay the contract to execute this function. 
        // Mint value has to be equal or lower than wallet balance 
        require(isMintEnabled, "Mint is not active!");

        //Increment _tokenIdCounter
        _tokenIdCounter.increment();
        uint256 newSampleId = _tokenIdCounter.current();

        //New sample
        Sample memory sample;

        //Populate sample data
        sample.idToken = newSampleId;
        sample.walletOwner = to;
        sample.valueSample = value;
        sample.nameSample = nameSample_;
        sample.samples = samplesUsed;

        
        //adiciono ao registo
        nfts[newSampleId]=sample;

        _safeMint(to, newSampleId);
        _setTokenURI(newSampleId, tokenURI_);

        //emit NewSample(to, newSampleId, nameSample);
        return newSampleId;
                     
        /*
        //transfer de value de sample para cada artista // se falhar numa das iteracoes, falha tudo?
        uint total = 0; //somatorio de 
        for(uint j=0; j<samplesA.length; j++){
                total += nfts[samplesA[j]].valueSample;
        }

        for(uint j=0; j<samplesA.length; j++){  
            //require(msg.value >= nfts[samplesA[j]].valueSample,"Not enough funds!");
            address seller = nfts[samplesA[j]].walletOwner;
            payable(seller).transfer(msg.value);  //send the ETH to the seller
        }*/
       
    } 
/*
Equipa methods:
*/

    function setIsMintEnabled(bool isMintEnabled_) external onlyOwner{
        isMintEnabled = isMintEnabled_;
    }

    //Método para alterar taxa de pagamento para mint de sample
    function setTaxArtist(uint256 _taxArtist) public onlyOwner {
        taxArtist = _taxArtist;
    }

    //Método para retornar a quantidade de mints (will represent the total number of NFTs minted using this contract.)
    function totalSupply() public view virtual returns (uint256) { //variavel privada?
        return _tokenIdCounter.current();
    }

    function getSamplesGenerated(uint tokenId_) public view returns (uint[] memory) {
        return nfts[tokenId_].samples;
    }

}
