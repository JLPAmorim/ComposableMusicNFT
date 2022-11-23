const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Composable Contract",function (){
    
    async function deployComposableFixture() {

        // Get the ContractFactory and Signers here.
        const Composable = await ethers.getContractFactory("Composable");
        const [algorithmOwner, addr1, addr2] = await ethers.getSigners();
    
        // To deploy our contract, we just have to call Token.deploy() and await
        // its deployed() method, which happens once its transaction has been
        // mined.
        const hardhatComposable = await Composable.deploy();
    
        await hardhatComposable.deployed();
    
        // Fixtures can return anything you consider useful for your tests
        return { Composable, hardhatComposable, algorithmOwner, addr1, addr2 };


      }
    describe("Deployment", async function () {
        // `it` is another Mocha function. This is the one you use to define each
    // of your tests. It receives the test name, and a callback function.
    //
    // If the callback function is async, Mocha will `await` it.
        it("Right Owner should be the Algorithm that created Music NFT ", async function () {
            // We use loadFixture to setup our environment, and then assert that
            // things went well
            const { hardhatComposable, algorithmOwner } = await loadFixture(deployComposableFixture);
            
            // `expect` receives a value and wraps it in an assertion object. These
            // objects have a lot of utility methods to assert values.

            // This test expects the owner variable stored in the contract to be
            // equal to our Signer's owner.
            expect(await hardhatComposable.algorithmOwner()).to.equal(algorithmOwner.address);

        });
    
    });


});