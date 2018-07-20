var NaiveOwned = artifacts.require("NaiveOwned");

const BigNumber = web3.BigNumber

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should()

contract('NaiveOwned', function ([owner, other]) {
	var owned;

	before("deploy SimpleOwned", async function () {
		owned = await NaiveOwned.new();
	});


	it("should set owner", async function () {
		await owned.setOwner(owner);

		(await owned.owner()).should.be.equal(owner);
	});


	it("should allow owner to enter the protected zone", async function () {
		await owned.protected({from: owner}).should.be.fulfilled;
	});


	it("should not allow any other user to enter protected zone", async function () {
		await owned.protected({from: other}).should.be.rejectedWith('revert');
	});


	it("warning! it allows to take over the control", async function () {
		await owned.setOwner(other, {from: other});
		await owned.protected({from: other}).should.be.fulfilled;
	});

});