const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
  
    console.log("Contract address of deployment:", waveContract.address);
    console.log("Contract deployed and owned by:", owner.address);
  
    await waveContract.getTotalWaves();
  
    const firstWave = await waveContract.wave();
    await firstWave.wait();
  
    await waveContract.getTotalWaves();
  
    const secondWave = await waveContract.connect(randomPerson).wave();
    await secondWave.wait();
  
    await waveContract.getTotalWaves();
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();