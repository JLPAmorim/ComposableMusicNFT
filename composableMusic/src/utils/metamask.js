import {pinJSONToIPFS} from './pinata.js'
import {createAlchemyWeb3} from "@alch/alchemy-web3"
import contractABI from './contract-abi.json'

const alchemyKey = import.meta.env.VITE_API_ALCHEMY_KEY
const web3 = createAlchemyWeb3(alchemyKey);
const contractAddress = "0xb66E84824Aa8aB9499dE1Be24856585F104b5316";


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
      console.log(alchemyKey)
      console.log(import.meta.env.VITE_API_PINATA_SECRET)
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

export const mintArtist = async(value,metadata) => {

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
          /* for para todas as musicas utilizadas
           axios.put(localhost:8001/sample#idtoken)
                 incrementar para cada token utilizada no mint o countUsed */
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

