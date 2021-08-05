const {assert} = require('chai')

const BounceBackTestToken = artifacts.require("BouncebackTestToken");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("BounceBackTestToken", function (addresses) {
  const [admin] = addresses

  console.log(admin)

  it("should have a supply of 10,000 tokens", async () => {
    const contract = await BounceBackTestToken.deployed()
    assert.isObject(contract)
    const supply = await contract.totalSupply()
    assert.strictEqual(supply.toString(), "10000000000000000000000")
  });
});
