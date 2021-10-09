/*
	typeofと違ってnullは弾く

		ChangeLog
			2020.10.25
				判定をinstanceofから以前の方法に戻した。
				Object.create(null) で作られたものを検出できなかったため。
*/
function isObject(arg){
	return !!arg && arg===Object(arg);
}

module.exports = isObject;
