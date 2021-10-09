// Mod
const isNumber = require('./is-number.js');

/*
	偶数判定（0含む)
*/
function isEven(num){
	return isNumber(num) &&	!(num % 2);
}

module.exports = isEven;
