pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract BasicERC20Token is StandardToken, Ownable {
    using SafeMath for uint256;

    string public name = "SC3 Token";
    uint8 public decimals = 18;
    string public symbol = "SC3";
    string public version = '1.0';


    function mint(address _to, uint256 _value) public onlyOwner {
        totalSupply_ = totalSupply_.add(_value);
        balances[_to] =  balances[_to].add(_value);

        emit MintEvent(_to, _value);
    }

    event MintEvent(address indexed to, uint value);
    event DestroyEvent(address indexed from, uint value);
}
