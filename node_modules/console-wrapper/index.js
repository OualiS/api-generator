// native console
const _console = console;

// ダミー用
const dummy = function(){}

// 参考: https://developer.mozilla.org/en-US/docs/Web/API/Console
const methodNameArr = [
	'_exception',
	'assert',
	'count',
	'debug',
	'dir',
	'dirxml',
	'error',
	'group',
	'groupCollapsed',
	'groupEnd',
	'info',
	'log',
	'profile',
	'profileEnd',
	'table',
	'time',
	'timeEnd',
	'timeStamp',
	'trace',
	'warn'
];

// コンストラクタ
function Console(){
	this.disable();
	this.status = undefined;
}

// 状態
Console.prototype.status = undefined;

// 参照用
Console.prototype._console = _console;

// extで使う引数キャッシュ
Console.prototype.cache = [];

// 通常モード
Console.prototype.enable = function(){
	this.status = 'enable';
	methodNameArr.forEach( (name)=>{
		if( _console[name] ){
			this[name] = _console[name].bind(_console);
		}
	});
}

// ダミーモード、標準設定
Console.prototype.disable = function(){
	this.status = 'disable';
	methodNameArr.forEach( (name)=>{
		this[name] = dummy;
	});
}

/*
	拡張モード
	行数はわからなくなるが任意の処理を挟めるやつ
	@param {
		cache: boolean,
		calback: function,
		disable: boolean,
		result: boolean
	}
		.callback が関数ならmethod実行時にcallback({...})
		.cache:true なら引数を保存する
		.disable:true ならconsole.method()を実行しない。
		.result:true なら引数を配列にして返す
	@return undefined or [...arg]
*/
Console.prototype.ext = function({cache, callback, disable, result}){
	this.status = 'ext';
	methodNameArr.forEach( (name)=>{
		this[name] = (...arg)=>{
			disable===true || _console[name](...arg);
			typeof callback==='function' && callback({
				target: this,
				timestamp: Date.now(),
				type: name,
				arguments: [...arg]
			});
			cache && this.cache.push([...arg]);
			return this.result && [...arg];
		}
	});
}

/*
	同調モード
		console.sync.method();
		既に設定されていればそのまま何もしない。
		設定されていなければモード切替え。
*/
Console.prototype.__defineGetter__('sync', function(){
	return this.status ?
		{ext:dummy, enable:dummy, disable:dummy}:
		this;
});

module.exports = new Console();
