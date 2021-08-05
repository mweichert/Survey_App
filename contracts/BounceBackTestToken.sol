// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error E_ADMIN_ONLY();
error E_REWARDER_ONLY();

contract BouncebackTestToken is ERC20, Ownable {

    constructor(uint256 _supply, address rewarder) ERC20("BouncebackTestToken", "BBTT") {
        _mint(rewarder, _supply * (10 ** decimals()));
    }
}
