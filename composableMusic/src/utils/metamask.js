import {pinJSONToIPFS} from '../utils/pinata.js'
import {createAlchemyWeb3} from "@alch/alchemy-web3"
import contractABI from './contract-abi.json'


const alchemyKey = import.meta.env.VITE_API_ALCHEMY_KEY
const web3 = createAlchemyWeb3(alchemyKey)
const contractAddress = "0x709D585b869B6d709a34F2A6033c6FFfc3a3868b"

// Connect Wallet to Metamask
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

// Get Current Wallet Connected to Metamask
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

// Function for the Minting of a Sample from an Artist
export const mintArtist = async(value, metadata) => {

  //pinata pin request
  const pinataMetadata = await pinJSONToIPFS(metadata);
  if (!pinataMetadata.success) {
      return {
          success: false,
          status: "😢 Something went wrong while uploading your tokenURI.",
      }
  } 
  
  const tokenURI = pinataMetadata.pinataUrl;  

  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);//loadContract();

  //set up your Ethereum transaction
  const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      'data': window.contract.methods.generateNFTArtist(window.ethereum.selectedAddress, web3.utils.toBN(web3.utils.toWei(value)), metadata.name, tokenURI).encodeABI() //make call to NFT smart contract 
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

// Function for the Minting of an AI Generated Music
export const mintGenerated = async(sampleValue, metadata) => {

  //pinata pin request
  const pinataMetadata = await pinJSONToIPFS(metadata);
  if (!pinataMetadata.success) {
      return {
          success: false,
          status: "😢 Something went wrong while uploading your tokenURI.",
      }
  } 

  const tokenURI = pinataMetadata.pinataUrl;

  //Load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  var samplesUsed = []
  samplesUsed[0] = 12341
  samplesUsed[1] = 22134

  //Fixed Mint Value for a Generated Music
  const mintValue = web3.utils.toWei('0.01', 'ether');

  //Create transaction based on the generateNFTMusic data 
  const transaction = window.contract.methods.generateNFTMusic(window.ethereum.selectedAddress, samplesUsed, web3.utils.toBN(web3.utils.toWei(sampleValue)), metadata.name, tokenURI);

  //Send Transaction
  try {
    const txHash = await web3.eth.sendTransaction({
      from: window.ethereum.selectedAddress,
      to: contractAddress,
      data: transaction.encodeABI(),
      value: mintValue
    });

    console.log(txHash);

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