//require('dotenv').config();

import axios from 'axios'
//require('dotenv').config();
import dotenv from 'dotenv'
//const key = "70a0c83a59ac603787d4"
//const secret = "84c2cff1c6aeb5193aa41aa17640f39012c16a241ab44b356bfebe656e616c11"
const key = dotenv.APP_PINATA_KEY;
const secret = dotenv.APP_PINATA_SECRET;




export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};