// Mod
const isString = require('./is-string.js');

/*
	引数文字列がすべて半角小文字か
*/
function isLowercase(arg){

	if( !isString(arg) ){
		return false;
	}

	return /^[a-z]+$/.test(arg);
}

module.exports = isLowercase;
