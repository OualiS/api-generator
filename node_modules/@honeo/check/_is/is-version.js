/*
	versionを表した数字とdotの文字列か

	セーフ
		1
		1.2
		1.2.3
		1.2.3.4
	アウト
		1.2A
		其の弐
*/

function isVersion(arg){
	return typeof arg==='string' && /^\d(|[0-9.]*\d)$/.test(arg);
}

module.exports = isVersion;
