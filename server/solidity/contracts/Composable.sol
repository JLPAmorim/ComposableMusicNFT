// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./@openzeppelin/contracts/access/Ownable.sol";
import "./@openzeppelin/contracts/utils/Counters.sol";
import "./@openzeppelin/contracts/utils/Strings.sol";

contract Composable is Ownable, ERC721URIStorage, ReentrancyGuard{
    //Initialize Counters Library
    using Counters for Counters.Counter;  
    
    //Counter for Current ID - Current Supply
    Counters.Counter private _tokenIdCounter; 
    //Record of All Existing NFT's
    mapping(uint => Sample) public nfts; 
    //Mint Enabling
    bool public isMintEnabled = true;
    //Royalties Given for Each Samples Used in Generation
    uint256 royaltiesValue = 0.0001 ether;
    //Generated Mint Value - Equivalent to 0.01 Ethereum
    uint256 mintValue = 10000000000000000;
    
    struct Sample { 
        uint idToken;
        address walletOwner;
        uint256 valueSample;
        string nameSample;
        uint[] samples;
        
    }

    //Constructor for Deployment
    constructor() ERC721("Composable Music","CM") {}
  
    /*
        Function for the Minting of Samples
            address to -> Address Minting the NFT
            uint256 value -> Value for Secondary Markets of the Generated Music 
            string memory nameSample_ -> Music Name
            string memory tokenURI_ -> Full IPFS Token URI that holds Off-Chain Metadata 
    */
    function generateNFTArtist(address to, uint256 value, string memory nameSample_, string memory tokenURI_) 
        public
        returns (uint256)
    {
        //Check if Mint is Enabled
        require(isMintEnabled, "Mint is not active!");
        //Increment _tokenIDCounter
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
        
        //Add to nfts Array
        nfts[newSampleId]=sample;

        _safeMint(to, newSampleId);
        _setTokenURI(newSampleId, tokenURI_);

        return newSampleId;
    }

    /*
        Function for the Minting of a Generated Music
            address to -> Address Minting the NFT
            uint[] memory samplesUsed -> Array with the ID's of the Samples used in the Music Generation
            uint256 value -> Value for Secondary Markets of the Generated Music 
            string memory nameSample_ -> Music Name
            string memory tokenURI_ -> Full IPFS Token URI that holds Off-Chain Metadata
    */

    function generateNFTMusic(address to, uint[] memory samplesUsed, uint256 value, string memory nameSample_, string memory tokenURI_) 
        public 
        payable
        returns (uint256)
    { 
        //Check if Mint is Enabled
        require(isMintEnabled, "Mint is not active!");
        // Mint value has to be equal or lower than wallet balance(1000000000000000000 == 0.01 Ether) 
        require(msg.value == mintValue, "Not enough ETH sent; check price!");

        //Increment _tokenIdCounter
        _tokenIdCounter.increment();
        uint256 newSampleId = _tokenIdCounter.current();
        address payable defaultAddy = payable(0x1c842cB66B736c74Eb3fF65DcA58E2B2628Db139);

        //New sample
        Sample memory sample;

        //Populate sample data
        sample.idToken = newSampleId;
        sample.walletOwner = to;
        sample.valueSample = value;
        sample.nameSample = nameSample_;
        sample.samples = samplesUsed;
 
        //Add to nfts Array
        nfts[newSampleId]=sample;

        //Royalties Transfer
        defaultAddy.transfer(0.001 ether);
        
        /*
        for(uint j=0; j<samplesUsed.length; j++){  
            address seller = nfts[samplesUsed[j]].walletOwner;
            payable(seller).transfer(royaltiesValue);  //send the ETH to the seller
        }*/

        _safeMint(to, newSampleId);
        _setTokenURI(newSampleId, tokenURI_);

        return newSampleId;
    } 

    //Enable or Disable any Minting on the platform
    function setIsMintEnabled(bool isMintEnabled_) external onlyOwner{
        isMintEnabled = isMintEnabled_;
    }

    //Return Total Supply Minted
    function totalSupply() public view virtual returns (uint256) { 
        return _tokenIdCounter.current();
    }

    //Return a specific sample by ID
    function getSamplesGenerated(uint tokenId_) public view returns (uint[] memory) {
        return nfts[tokenId_].samples;
    }

    //Get Mint Value for Generated Musics
    function getMintValue() public view returns (uint256) {
        return mintValue;
    }

    //Change Mint Value for Generated Musics
    function setMintValue(uint256 _mintValue) public onlyOwner {
        mintValue = _mintValue;
    }

    //Get Mint Value for Generated Musics
    function getRoyalties() public view returns (uint256) {
        return royaltiesValue;
    }

    //Change Mint Value for Generated Musics
    function setRoyalties(uint256 _royaltiesValue) public onlyOwner {
        royaltiesValue = _royaltiesValue;
    }

}
