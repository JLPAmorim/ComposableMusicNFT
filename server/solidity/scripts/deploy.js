async function main() {
  // Grab the contract factory 
  const Composable = await ethers.getContractFactory("Composable");

  // Start deployment, returning a promise that resolves to a contract object
  const myComposable = await Composable.deploy(); // Instance of the contract 
  console.log("Contract deployed to address:", myComposable.address);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });
