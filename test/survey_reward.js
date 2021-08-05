const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const { default: Web3 } = require('web3')
chai.use(chaiAsPromised)

const {assert} = chai

const Survey = require('../src/models/Survey')
const SurveyReward = artifacts.require("SurveyReward");
const BounceBackTestToken = artifacts.require('BouncebackTestToken')

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("SurveyReward", function ([owner, hacker, surveyor]) {
  it("should be deployed", async function () {
    await SurveyReward.deployed();
    return assert.isTrue(true);
  });

  it("should be able to add a survey as the contract owner", async () => {
    const contract = await SurveyReward.deployed()
    const survey = Survey.make("Test Survey")
    return assert.isFulfilled(contract.addSurvey(survey.id, survey.name, JSON.stringify(survey)))
  })

  it("should fail if a non-owner tries to add a survey", async () => {
    const contract = await SurveyReward.deployed()
    const survey = Survey.make("Test Survey")
    return assert.isRejected(contract.addSurvey(survey.id, survey.name, JSON.stringify(survey), {from: hacker}))
  })

  it("should allow a survey submission to an existing survey", async() => {
    const contract = await SurveyReward.deployed()
    const survey = Survey.make("Test Survey")
    const survey2 = Survey.make("Another Test Survey")

    await contract.addSurvey(survey2.id, survey2.name, JSON.stringify(survey))

    return assert.isFulfilled(
      contract.addSurvey(survey.id, survey.name, JSON.stringify(survey))
      .then(_ => contract.addSurveySubmission(survey.id, '{"foo": "bar"}'))
      .then(_ => contract.addSurveySubmission(survey2.id, '{"foo": "bar"}'))
    )
  })

  it("should not allow multiple survey submissions for a given survey from a single address", async () => {
    const contract = await SurveyReward.deployed()
    const survey = Survey.make("Test Survey")
    const surveyData = JSON.stringify({firstName: "Mike", lastName: "Weichert"})
    await contract.addSurvey(survey.id, survey.name, JSON.stringify(survey))
    return assert.isRejected(
      contract.addSurveySubmission(survey.id, surveyData)
      .then(_ => contract.addSurveySubmission(survey.id, surveyData))
    )
  })

  it("should not allow a survey submission for a non-existing survey", async () => {
    const contract = await SurveyReward.deployed()
    const survey = Survey.make("Test Survey")
    const surveyData = JSON.stringify({firstName: "Mike", lastName: "Weichert"})
    return assert.isRejected(contract.addSurveySubmission(survey.id, surveyData))
  })

  it("should only allow owner be able to set reward token", async() => {
    const contract = await SurveyReward.new()
    return assert.isFulfilled(contract.setRewardToken(BounceBackTestToken.address))
  })

  it("should not allow non-owner to set reward token", async() => {
    const contract = await SurveyReward.deployed()
    return assert.isRejected(contract.setRewardToken(BounceBackTestToken.address, {from: hacker}))
  })

  it("should reward surveyor for submission", async() => {
    let tokenContract = await BounceBackTestToken.deployed()
    let balanceBefore = await tokenContract.balanceOf(owner);
    const contract = await SurveyReward.deployed()
    const survey = Survey.make("Test Survey")
    const surveyData = JSON.stringify({firstName: "Mike", lastName: "Weichert"})
    await contract.addSurvey(survey.id, survey.name, JSON.stringify(survey));
    await contract.addSurveySubmission(survey.id, surveyData)
    let balanceAfter = await tokenContract.balanceOf(owner);    
    assert.isTrue(balanceAfter > balanceBefore)
  })
});
