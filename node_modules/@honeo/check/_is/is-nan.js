// arg!=argでいい気もするがPolyfill前提のコンセプトのため
function isNaN(arg){
	return Number.isNaN(arg);
}

module.exports = isNaN;
