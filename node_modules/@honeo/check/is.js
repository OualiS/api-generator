/*
	可変長引数化
*/

// 素の判定モジュール詰め合わせ
const _is = require('./_is');

// 設定
const config = require('./config.js');

// このモジュール返り値
const is = {}

/*
	_isの関数を元に改名＆可変長引数化
		可変長引数
			引数があれば判定関数を渡してevery、なければfalseを返す
			config.variadic.ignoreと一致するメソッド名は無視する
		改名
			config.shortのpropertyと一致する名前のメソッドは略称版を作る

*/
for(let [key, func] of Object.entries(_is)){


	// 関数名作り isFooBar => FooBar, foobar [, FB, fb]
	const nameArr = [];
	const name1 = key.slice(2);
	const name2 = name1.toLowerCase();
	nameArr.push(name1, name2);
	// 略称版があれば作る
	if( config.short[key] ){
		const arr_alias = Array.isArray(config.short[key]) ?
			config.short[key]:
			[config.short[key]];
		arr_alias.forEach( (name)=>{
			// console.log('methodName:', name);
			const str_Camel = name.slice(2); // "is"をカット
			const str_lower = str_Camel.toLowerCase(); // "Method" => "method"
			nameArr.push(str_Camel, str_lower);
		});
	}

	// 可変長引数化
	const method = (function(){
		const isVariadic = !config.variadic.ignore.includes(key);
		// console.log(`isVariadic: ${key} ${isVariadic}`);
		if( isVariadic ){
			return (...args)=>{
				return args.length ?
					args.every(func):
					false;
			}
		}else{
			return func;
		}
	}());

	nameArr.forEach( (name)=>{
		is[name] = method;
	});

}

module.exports = is;
