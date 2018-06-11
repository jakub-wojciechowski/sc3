pragma solidity ^0.4.23;

contract SimpleWalletLibrary {

    address public owner;

    function initOwner(address _owner) {
        owner = _owner;
    }

}