// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./synthetix-interfaces/IAccountModule.sol";

contract Test {
    function test(address perpsMarketProxy) public returns(uint128) {
        return IAccountModule(perpsMarketProxy).createAccount();
    }
}
