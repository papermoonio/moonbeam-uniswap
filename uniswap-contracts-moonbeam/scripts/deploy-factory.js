const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
   [account] = await ethers.getSigners();
   deployerAddress = account.address;
   console.log(`Deploying contracts using ${deployerAddress}`);

   //Deploy WETH
   const weth = await ethers.getContractFactory('WETH');
   const wethInstance = await weth.deploy();

   console.log(`WETH deployed to : ${wethInstance.address}`);

   //Deploy Factory
   const factory = await ethers.getContractFactory('UniswapV2Factory');
   const factoryInstance = await factory.deploy(deployerAddress);

   console.log(`Factory deployed to : ${factoryInstance.address}`);

   //Deploy Router passing Factory Address and WETH Address
   const router = await ethers.getContractFactory('UniswapV2Router02');
   const routerInstance = await router.deploy(
      factoryInstance.address,
      wethInstance.address
   );
   await routerInstance.deployed();

   console.log(`Router V02 deployed to :  ${routerInstance.address}`);

   //Deploy Multicall (needed for Interface)
   const multicall = await ethers.getContractFactory('Multicall');
   const multicallInstance = await multicall.deploy();
   await multicallInstance.deployed();

   console.log(`Multicall deployed to : ${multicallInstance.address}`);

   //Deploy Tokens

   const tok1 = await ethers.getContractFactory('Token');
   const tok1Instance = await tok1.deploy('Token1', 'TOK1');

   console.log(`Token1 deployed to : ${tok1Instance.address}`);

   const tok2 = await ethers.getContractFactory('Token');
   const tok2Instance = await tok2.deploy('Token2', 'TOK2');

   console.log(`Token2 deployed to : ${tok2Instance.address}`);

   /*
   //Approve router on tokens
   console.log(`Approving Router on Token1`);
   await tok1Instance.approve(
      routerInstance.address,
      '1000000000000000000000000'
   );
   console.log(`Approving Router on Token2`);
   await tok2Instance.approve(
      routerInstance.address,
      '1000000000000000000000000'
   );
   
   //Create Pair with Factory and Get Address
   await factoryInstance.createPair(tok1Instance.address, tok2Instance.address);
   const lpAddress = await factoryInstance.getPair(
      tok1Instance.address,
      tok2Instance.address
   );
   console.log(`Liquidity pool at address: ${lpAddress}`);
   
   //Get Block TimeStamp
   const blockTime = (await ethers.provider.getBlock()).timestamp;

   //Add Liquidity
   console.log(`Adding Liquidity...`);
   await routerInstance.addLiquidity(
      tok1Instance.address,
      tok2Instance.address,
      '1000000000000000000000',
      '1000000000000000000000',
      '100000000000000000000',
      '100000000000000000000',
      deployerAddress,
      blockTime + 100
   );*/
}

deploy()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
