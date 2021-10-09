/*
	有効な比較演算子の文字列か
		[比較演算子 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)
*/

// 有効な比較演算子のset
const set_co = new Set([
	'<',
	'>',
	'<=',
	'>=',
	'==',
	'!=',
	'===',
	'!=='
]);

function isComparisonOperator(arg){
	return typeof arg==='string' && set_co.has(arg);
}

module.exports = isComparisonOperator;
