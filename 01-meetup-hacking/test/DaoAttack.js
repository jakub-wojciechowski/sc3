var SimpleDAO = artifacts.require("SimpleDAO");
var DaoAttacker = artifacts.require("DaoAttacker");

const BigNumber = web3.BigNumber

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should()

contract('Dao Attacker', function ([owner, user1, hacker]) {
	var dao;
	var attacker;

	before("deploy SimpleDAO", async function () {
		dao = await SimpleDAO.new();
	});


	it("should register contribution from the first user", async function () {
		await dao.contribute({from: user1, value: 100});

		(await dao.getUserBalance(user1)).should.be.bignumber.equal(100);
	});


	it("should deploy attacker", async function () {
		attacker = await DaoAttacker.new(dao.address, {from: hacker});
	});


	it("should register the attacker contribution", async function () {
		await attacker.contribute({from: hacker,value: 100});

		(await dao.getUserBalance(attacker.address)).should.be.bignumber.equal(100);
	});


	it("should attack", async function () {
		(await web3.eth.getBalance(dao.address)).should.be.bignumber.equal(200);
		(await web3.eth.getBalance(attacker.address)).should.be.bignumber.equal(0);

		await attacker.attack({from: hacker});

		(await web3.eth.getBalance(dao.address)).should.be.bignumber.equal(0);
		(await web3.eth.getBalance(attacker.address)).should.be.bignumber.equal(200);
	});

});