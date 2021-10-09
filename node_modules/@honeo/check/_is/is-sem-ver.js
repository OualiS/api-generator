/*
	SemVerな文字列かどうか
		regexpを長々と繋げて頑張ると次弄るときに頭痛くなるから極力分割する
	参考
		[SemVerのv1.0.0とv2.0.0-rc.1、node-semverを見比べてみた - /var/log/kozy4324](http://kozy4324.github.io/blog/2012/12/19/semver/)
*/

function isSemVer(arg){
	if( typeof arg!=='string'){
		return false;
	}

	if( /^\d\.\d\.\d$/.test(arg) ){
		return true;
	}

	if( /^\d\.\d\.\d-[0-9A-Za-z-.]*$/.test(arg) ){
		return true;
	}
}

module.exports = isSemVer;
