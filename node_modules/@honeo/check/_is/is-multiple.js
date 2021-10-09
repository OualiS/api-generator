/*
	偶数判定（0含む)
*/
const isNumber = require('./is-number.js');

// 倍数判定, AがBの倍数か
function isMultiple(A, B){
	return isNumber(A) && isNumber(B) && !(A%B);
}

module.exports = isMultiple;
