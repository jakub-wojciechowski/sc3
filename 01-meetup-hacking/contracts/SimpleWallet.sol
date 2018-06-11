pragma solidity ^0.4.23;

import "./SimpleWalletLibrary.sol";

/*
 * A simplified version of the Parity Wallet contract created to illustrate
 * the core mechanism of the famous July 2017 hack.
 */
contract SimpleWallet {

    address public owner;
    address public walletLibrary;

    event Deposit(address sender, uint256 value);

    constructor(address _walletLibrary) public {
        walletLibrary = _walletLibrary;

        walletLibrary.delegatecall(bytes4(sha3("initOwner(address)")), msg.sender);
    }

    function() payable public {
        if (msg.value > 0) {
            emit Deposit(msg.sender, msg.value);
        } else {
            walletLibrary.delegatecall(msg.data);
        }
    }

    function withdraw() public {
        require(msg.sender == owner);
        owner.send(this.balance);
    }

}