pragma solidity ^0.4.24;


/*
 * A minimal implementation of a contract that could be owned
 */
contract SimpleOwned {

    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function setOwner(address _owner) public {
        require(msg.sender == owner);
        owner = _owner;
    }

    function protected() public view {
        require(msg.sender == owner);
    }


}