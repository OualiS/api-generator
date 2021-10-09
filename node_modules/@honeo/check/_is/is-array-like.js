/*
	定義: truthyで、.lengthで数値を返すもの
*/

function isArrayLike(arg){
	return !!arg && typeof arg.length==='number';
}


module.exports = isArrayLike;
