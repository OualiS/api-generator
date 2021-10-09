/*
	comment
*/
const isNode = require('./is-node.js');

function isTextNode(arg){
	return isNode(arg) && arg.nodeType===3;
}

module.exports = isTextNode;
