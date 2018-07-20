pragma solidity ^0.4.24;


/*
 * A naive implementation of a contract that could be owned
 */
contract NaiveOwned {

    address public owner;

    function setOwner(address _owner) public {
        owner = _owner;
    }

    function protected() public view {
        require(msg.sender == owner);
    }


}