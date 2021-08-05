// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

error E_NonExistentSurvey(bytes32 id);
error E_ExistingSurvey(bytes32 id);
error E_ExistingSubmission(bytes32 id, address surveyor);

contract SurveyReward is Ownable {
  using EnumerableSet for EnumerableSet.Bytes32Set;
  using EnumerableSet for EnumerableSet.AddressSet;

  event SentReward(address surveyor, uint amount);

  struct Survey {
    bytes32 id;
    string name;
    string data;
    mapping(address => string) submissions;
    EnumerableSet.AddressSet surveyors;
  }

  // State variables
  EnumerableSet.Bytes32Set private knownSurveys;
  mapping(bytes32 => Survey) surveys;
  address payable public rewardToken;

  function addSurvey (bytes32 _id, string calldata _name, string calldata _data) public onlyOwner {
    if (!knownSurveys.add(_id)) 
      revert E_ExistingSurvey(_id);

    Survey storage survey = surveys[_id];
    survey.id = _id;
    survey.name = _name;
    survey.data = _data;
  }

  modifier existingSurvey(bytes32 id) {
    if (!knownSurveys.contains(id)) {
      revert E_NonExistentSurvey(id);
    }
    _;
  }

  function setRewardToken(address payable _rewardToken) public onlyOwner {
    rewardToken = _rewardToken;  
  }

  function hasAlreadySubmitted(bytes32 _surveyId) existingSurvey(_surveyId) private view returns (bool) {
    return surveys[_surveyId].surveyors.contains(msg.sender);
  }

  function addSurveySubmission (bytes32 _surveyId, string calldata data) existingSurvey(_surveyId) public {
    address payable _surveyor = payable(msg.sender);

    if (hasAlreadySubmitted(_surveyId)) {
      revert E_ExistingSubmission(_surveyId, _surveyor);
    }

    surveys[_surveyId].surveyors.add(_surveyor);
    surveys[_surveyId].submissions[_surveyor] = data;

    _sendReward(_surveyor, 70 ether);
  }

  function _sendReward(address payable surveyor, uint _amount) private {
    ERC20(rewardToken).approve(address(this), _amount);
    ERC20(rewardToken).transferFrom(address(this), surveyor, _amount);

  }
}
