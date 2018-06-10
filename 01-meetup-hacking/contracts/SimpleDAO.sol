pragma solidity ^0.4.23;

/*
 * A simplified version of the DAO contract created to illustrate
 * the core mechanism of the famous June 2016 hack.
 */
contract SimpleDao{


    // A variable that keeps a balance of users contribution to the DAO
    mapping(address => uint256) userBalances;

    /*
    * Return the amount of ether that the user has contributed to DAO
    */
    function getUserBalance(address user) public view returns(uint256) {
        return userBalances[user];
    }


    /*
    * A method invoked by the user to increase his contribution in the DAO
    */
    function contribute() {
        userBalances[msg.sender] = userBalances[msg.sender] + msg.value;
    }


    /*
    * A method invoked by the user to withdraw all of his contributions
    */
    function withdrawBalance() {
        uint amountToWithdraw = userBalances[msg.sender];
        if (msg.sender.call.value(amountToWithdraw)() == false) {
            throw;
        }
        userBalances[msg.sender] = 0;
    }
}