require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  defaultNetwork: 'localhost',

  paths:{
    openzeppelin:'@openzeppelin/contracts'
  }

};
