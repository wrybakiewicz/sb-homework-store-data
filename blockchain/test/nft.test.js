const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function () {
  it("should mint two tokens", async function () {
    const [owner] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();
    await nft.deployed();
    const url1 = "some1.url"
    const url2 = "some2.url"

    const mintTx1 = await nft.mint(url1)
    const mintTx2 = await nft.mint(url2)

    expect(await nft.ownerOf(1)).to.equal(owner.address);
    expect(await nft.tokenURI(1)).to.equal(url1);
    expect(await nft.ownerOf(2)).to.equal(owner.address);
    expect(await nft.tokenURI(2)).to.equal(url2);
    expect(await nft.balanceOf(owner.address)).to.equal(2);
    await expect(mintTx1).to.emit(nft, "Transfer")
        .withArgs('0x0000000000000000000000000000000000000000', owner.address, 1);
    await expect(mintTx2).to.emit(nft, "Transfer")
        .withArgs('0x0000000000000000000000000000000000000000', owner.address, 2);
    expect(await nft.totalSupply()).to.equal(2);
  });
});
