/*
	comment
*/
const isNode = require('./is-node.js');

function isDocumentFragment(arg){
	return isNode(arg) && arg.nodeType===11;
}

module.exports = isDocumentFragment;
