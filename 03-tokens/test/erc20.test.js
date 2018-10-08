require('./test-utils');

var BasicERC20Token = artifacts.require("BasicERC20Token");

contract('BasicERC20Token', function([owner, sender, receiver]) {
  var token

  before("deploy token", async function() {
    token = await BasicERC20Token.new();
  });

  it("should deploy token", async function() {
    (await token.name()).should.be.equal("SC3 Token");
  });

  it("approve allow ", async function() {
    await token.mint(sender, 100, {from: owner});
    (await token.balanceOf(sender)).should.be.bignumber.equal(100);

    token.approve(receiver, 100, {from: sender});
    token.transferFrom(sender, receiver, 100, {from: receiver});
    (await token.balanceOf(receiver)).should.be.bignumber.equal(100);
  });



});
