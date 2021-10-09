/*
	閏年判定

		引数
			1: date or number
		返り値
			boolean

		参考
			[うるう年とは - はてなキーワード](http://d.hatena.ne.jp/keyword/%A4%A6%A4%EB%A4%A6%C7%AF)
*/
const isNumber = require('./is-number.js');
const isDate = require('./is-date.js');

function isLeapYear(arg){
	if( isNumber(arg) ){
		return isLeapYear_number(arg)
	}else if( isDate(arg) ){
		return isLeapYear_date(arg);
	}else{
		throw new TypeError(`Invalid arguments: ${arg}`);
	}
}

// dateインスタンス用
function isLeapYear_date(date){
	const year = date.getFullYear();
	return isLeapYear_number(year);
}

// 数値(年)用、本体
function isLeapYear_number(year){
	return year % 4 === 0 && (year % 100!==0 || year % 400===0);
}

module.exports = isLeapYear;
