/*
	引数がPromiseインスタンスか
*/
function isPromise(arg){
	return arg instanceof Promise;
}

module.exports = isPromise;
