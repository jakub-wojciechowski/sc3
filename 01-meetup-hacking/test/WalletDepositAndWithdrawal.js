var SimpleWallet = artifacts.require("SimpleWallet");
var SimpleWalletLibrary = artifacts.require("SimpleWalletLibrary");

const BigNumber = web3.BigNumber

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should()

contract('SimpleWallet', function ([owner, user1, user2, hacker]) {
	var library, wallet1, wallet2;

	before("deploy SimpleWallet", async function () {
		library = await SimpleWalletLibrary.new();

	});

	it("should deploy first wallet", async function () {
		wallet1 = await SimpleWallet.new(library.address, {from: user1});
		await web3.eth.sendTransaction({to: wallet1.address, from: user1, value: 100});

		(await wallet1.owner()).should.be.bignumber.equal(user1);
		(await web3.eth.getBalance(wallet1.address)).should.be.bignumber.equal(100);
	});


	it("should deploy second wallet", async function () {
		wallet2 = await SimpleWallet.new(library.address, {from: user2});
		await web3.eth.sendTransaction({to: wallet2.address, from: user2, value: 200});

		(await wallet2.owner()).should.be.bignumber.equal(user2);
		(await web3.eth.getBalance(wallet2.address)).should.be.bignumber.equal(200);
	});


	it("should withdraw the funds", async function () {
		await wallet1.withdraw({from: user1});

		(await web3.eth.getBalance(wallet1.address)).should.be.bignumber.equal(0);
	});

});