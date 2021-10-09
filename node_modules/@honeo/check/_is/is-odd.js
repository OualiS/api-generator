/*
	奇数判定（0含む)
*/
const isNumber = require('./is-number.js');

function isOdd(num){
	return isNumber(num) && !!(num % 2);
}

module.exports = isOdd;
