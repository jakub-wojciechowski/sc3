pragma solidity ^0.4.24;


/*
 * A minimal implementation of contract that could be owned
 */
contract SimpleOwned {

    address public owner;

    function setOwner(address _owner) public {
        owner = _owner;
    }


}