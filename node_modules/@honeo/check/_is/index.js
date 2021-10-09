/*
	可変長引数ではないis関数詰め合わせモジュール
		略称版メソッドもなし
*/

// 返り値
const _is = {

	// 型・インスタンス
	isArray: require('./is-array.js'),
	isBoolean: require('./is-boolean.js'),
	isBuffer: require('./is-buffer.js'),
	isError: require('./is-error.js'),
	isFunction: require('./is-function.js'),
	isNumber: require('./is-number.js'),
	isRegExp: require('./is-reg-exp.js'),
	isStats: require('./is-stats.js'),
	isString: require('./is-string.js'),
	isUndefined: require('./is-undefined.js'),
	isNull: require('./is-null.js'),
	isNaN: require('./is-nan.js'),
	isDate: require('./is-date.js'),
	isEvent: require('./is-event.js'),
	isEventTarget: require('./is-event-target.js'),
	isObject: require('./is-object.js'),
	isPromise: require('./is-promise.js'),

	// Number系
	isOdd: require('./is-odd.js'),
	isEven: require('./is-even.js'),
	isMultiple: require('./is-multiple.js'),

	// String系
	isLowercase: require('./is-lowercase.js'),
	isUppercase: require('./is-uppercase.js'),

	// DOM
	isNode: require('./is-node.js'),
	isTextNode: require('./is-text-node.js'),
	isElement: require('./is-element.js'),
	isDocumentFragment: require('./is-document-fragment.js'),

	// 雑多
	isTrue: require('./is-true.js'),
	isFalse: require('./is-false.js'),
	isTruthy: require('./is-truthy.js'),
	isFalsy: require('./is-falsy.js'),
	isInstance: require('./is-instance.js'),
	isObjectLiteral: require('./is-object-literal.js'),
	isArrayLike: require('./is-array-like.js'),
	isComparisonOperator: require('./is-comparison-operator.js'),
	isSemVer: require('./is-sem-ver.js'),
	isVersion: require('./is-version.js'),
	isEmpty: require('./is-empty.js'),
	isLeapYear: require('./is-leap-year.js'),
	isValidDate: require('./is-valid-date.js')
}

module.exports = _is;
