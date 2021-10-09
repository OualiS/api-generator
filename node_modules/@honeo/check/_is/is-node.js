/*
	comment
*/
const isNumber = require('./is-number.js');
const isObject = require('./is-object.js');

function isNode(arg){
	return arg instanceof Node;
}

module.exports = isNode;
