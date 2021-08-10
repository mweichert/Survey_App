# Survey App

This is a test project to prove competence in Solidity and Truffle, as requested by Bounce Back Digital.

## Requirements

After a survey submission is complete, 70 tokens are sent to the surveyor's wallet as a reward.

## Implementation

Tested using Truffle's built-in version of Ganache.

There are two smart contracts, one for the token, and the other for the rewards mechanism. This design was selected to achieve separation of concerns, a common practice in software engineering.

Both contracts are developed in Solidity and inherit from OpenZepplin contracts for some security assurance.

When the survey is submitted, the submission is stored as JSON in the rewards smart contract. There was an assumption made that a surveyor would only be rewarded for a single submission, and therefore uses the stored submission information to determine whether a submission was stored previously before sending the rewards. There was also an assumption that this stored data would be utilized later and hence the need for easy retrieval.

## Automated tests

Available in the repo's test directory. There are several tests to assure that the rewards mechanism is working and secure. To test, run: `npm run test`

## How to run

The React app was provided by Bounce Back Digital, aside from the wallet integration.

To test, you'll need to start the development server using `npm start` and then open http://localhost:3000 to view it in the browser.

Your browser will need MetaMask installed and Gancahe configured and selected as a network.

## Questions?

Please send an e-mail to mweichert at gmail dot com. Thanks!