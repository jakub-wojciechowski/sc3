var SimpleDAO = artifacts.require("SimpleDAO");

const BigNumber = web3.BigNumber

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should()

contract('SimpleDAO', function ([owner, user1, user2]) {
	var dao;

	before("deploy SimpleDAO", async function () {
		dao = await SimpleDAO.new();
	});


	it("should register contribution from the first user", async function () {
		await dao.contribute({from: user1, value: 100});

		(await dao.getUserBalance(user1)).should.be.bignumber.equal(100);
	});


	it("should register contribution from the second user", async function () {
		await dao.contribute({from: user2, value: 100});

		(await dao.getUserBalance(user2)).should.be.bignumber.equal(100);
	});

});