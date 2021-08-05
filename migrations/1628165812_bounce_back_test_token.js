const Survey = require('../src/models/Survey')
const BounceBackTestToken = artifacts.require('BouncebackTestToken')
const SurveyReward = artifacts.require('SurveyReward')

module.exports = async (_deployer) => {
    await _deployer.deploy(SurveyReward)
    await _deployer.deploy(BounceBackTestToken, 10000, SurveyReward.address)
    const rewarder = await SurveyReward.deployed()
    await rewarder.setRewardToken(BounceBackTestToken.address)
    let survey = Survey.make("Example Survey")
    await rewarder.addSurvey(survey.id, survey.name, JSON.stringify(survey))
    console.log("Survey ID " + survey.id)
};
