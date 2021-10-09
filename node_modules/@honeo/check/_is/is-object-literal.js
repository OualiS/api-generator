/*
	const obj = {} みたいなの
*/
function isObjectLiteral(arg){
    return arg.__proto__===Object.prototype;
}

module.exports = isObjectLiteral;
