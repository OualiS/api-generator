/*
	引数が空か

	判定基準
		文字列
			長さが0の場合
		配列
			長さが0の場合
		オブジェクト
			keyが存在しない場合
		それ以外
			常にfalse
*/
function isEmpty(arg){
	if(typeof arg==='string'){
		return !arg.length;
	}else if( Array.isArray(arg) ){
		return !arg.length;
	}else if(typeof arg==='object' && arg instanceof Object){
		return !Object.getOwnPropertyNames(arg).length;
	}else{
		return false;
	}
}

module.exports = isEmpty;
