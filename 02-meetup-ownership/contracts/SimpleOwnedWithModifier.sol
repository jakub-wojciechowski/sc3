pragma solidity ^0.4.24;


/*
 * A minimal implementation of contract that could be owned
 */
contract SimpleOwnedWithModifier {

    address public owner;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function setOwner(address _owner) public onlyOwner {
        owner = _owner;
    }

    function protected() public view onlyOwner {

    }


}