var SimpleOwned = artifacts.require("SimpleOwned");

const BigNumber = web3.BigNumber

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should()

contract('SimpleOwned', function ([owner]) {
	var simpleOwned;

	before("deploy SimpleOwned", async function () {
		simpleOwned = await SimpleOwned.new();
	});


	it("should set owner", async function () {
		await simpleOwned.setOwner(owner);

		(await simpleOwned.owner()).should.be.equal(owner);
	});

});