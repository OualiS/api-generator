/*
	comment
*/

function isInstance(arg, arg2){
	try{
		return arg instanceof arg2;
	}catch(e){
		return false;
	}
}

module.exports = isInstance;
