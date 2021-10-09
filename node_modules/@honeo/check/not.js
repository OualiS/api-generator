/*
	isを元にnot作成
*/
const is = require('./is.js');

const not = {}

for(let [key, func] of Object.entries(is) ){
	not[key] = (...args)=>{
		return !func(...args);
	}
}

module.exports = not;
