var SimpleOwned = artifacts.require("SimpleOwned");

const BigNumber = web3.BigNumber

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should()

contract('SimpleOwned', function ([owner, other]) {
	var simpleOwned;

	before("deploy SimpleOwned", async function () {
		simpleOwned = await SimpleOwned.new();
	});


	it("should set owner", async function () {
		await simpleOwned.setOwner(owner);

		(await simpleOwned.owner()).should.be.equal(owner);
	});


	it("should not allow any other user to enter protected zone", async function () {
		await simpleOwned.protected({from: other}).should.be.rejectedWith('revert');
	});


	it("should allow owner to enter the protected zone", async function () {
		await simpleOwned.protected({from: owner});
	});

});