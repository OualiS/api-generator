/*

*/

function isStats(arg){
	try{
		const {Stats} = require('fs');
		return arg instanceof Stats;
	}catch(e){
		return false;
	}
}

module.exports = isStats;
