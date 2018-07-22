var SimpleOwnedWithModifier = artifacts.require("SimpleOwnedWithModifier");

const BigNumber = web3.BigNumber

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should()

contract('SimpleOwnedWithModifier', function ([owner, other]) {
	var owned;

	before("deploy SimpleOwnedWithModifier", async function () {
		owned = await SimpleOwnedWithModifier.new();
	});


	it("should initialize owner to the creator", async function () {
		(await owned.owner()).should.be.equal(owner);
	});


	it("should allow owner to enter the protected zone", async function () {
		await owned.protected({from: owner}).should.be.fulfilled;
	});


	it("should not allow any other user to enter protected zone", async function () {
		await owned.protected({from: other}).should.be.rejectedWith('revert');
	});


	it("should not allow any other user to take over the ownership", async function () {
		await owned.setOwner(other, {from: other}).should.be.rejectedWith('revert');
		await owned.protected({from: other}).should.be.rejectedWith('revert');
	});


	it("should allow the owner to transfer ownership", async function () {
		await owned.setOwner(other, {from: owner});
		await owned.protected({from: other}).should.be.fulfilled;
	});

});