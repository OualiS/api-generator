/*
	引数の日時が存在するものかをBooleanで返す

		引数
			1, 2, 3: number
		返り値
			boolean

		参考
			[Vanilla JavaScriptで簡単に日付が有効かどうかチェックする方法 | Rriver](https://parashuto.com/rriver/development/validate-date-using-vanilla-js)
*/

// Mod
const isNumber = require('./is-number.js');

function isValidDate(year, month, day){

	if( !isNumber(year, month, day) ){
		throw new TypeError(`Invalid arguments`);
	}

	const date = new Date(year, month-1, day);
	const isSameYear = date.getFullYear()===year;
	const isSameMonth = date.getMonth()===(month-1);
	const isSameDay = date.getDate()===day;
	const result = isSameYear && isSameMonth && isSameDay;
	return result;
}

module.exports = isValidDate
