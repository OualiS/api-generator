// Mod
const isString = require('./is-string.js');

/*
	引数文字列がすべて大文字か
*/
function isUppercase(arg){

	if( !isString(arg) ){
		return false;
	}

	return /^[A-Z]+$/.test(arg);
}

module.exports = isUppercase;
