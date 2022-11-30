import {pinJSONToIPFS} from './pinata.js'
//import {createAlchemyWeb3} from "@alch/alchemy-web3"

//const  alchemyKey= "https://eth-goerli.g.alchemy.com/v2/wi8nnp6eBKZRWBqFOmbnqpodZWDoJ2fY"
//const web3 = createAlchemyWeb3('https://eth-mainnet.alchemyapi.io/<api-key>');


//const alchemyKey = process.env.APP_ALCHEMY_KEY;

//const web3 = createAlchemyWeb3(alchemyKey);

import contractABI from '../contract-abi.json'
const contractAddress = "0x2E77B92900fB07162ad2F10642CB00c9aFD44690";

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: "You must install Metamask"
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
          
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: "You must install Metamask, a virtual Ethereum wallet, in your browser."
    };
  }
};

export const mintNFT = async(value, nameSample) => {

  //make metadata
  const metadata = new Object();
  metadata.style = "Jazz";
  metadata.description = "Jazz Music";
  metadata.image = "https://gateway.pinata.cloud/ipfs/QmUmXJLWKhxSHtPdQvy8aYnMkGRXbgbkqFJmtQAMoq8Ukr";
  metadata.name = nameSample;
  metadata.value = value;
  metadata.address = address;

  //pinata pin request
  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
      return {
          success: false,
          status: "😢 Something went wrong while uploading your tokenURI.",
      }
  } 
  const tokenURI = pinataResponse.pinataUrl;  

  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);//loadContract();

  //set up your Ethereum transaction
  const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      'data': window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI() //make call to NFT smart contract 
  };

  //sign transaction via Metamask
  try {
      const txHash = await window.ethereum
          .request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
          });
      return {
          success: true,
          status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
      }
  } catch (error) {
      return {
          success: false,
          status: "😥 Something went wrong: " + error.message
      }
  }
}



