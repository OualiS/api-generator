# check
* [honeo/check](https://github.com/honeo/check)
* [@honeo/check](https://www.npmjs.com/package/@honeo/check)


## なにこれ
型・インスタンス等をチェックするやつ。  
Polyfill前提。


## 使い方
```bash
$ npm i @honeo/check
```
```js
const {is, not, any} = require('@honeo/check');
// or
const is = require('@honeo/check/is');

is.arr([]); // true

is.arr([], {}); // false
not.arr([], {}); // false
any.arr([], {}); // true
```
```js
// webpack v4~ webpack.config.js
{
	node: {
		fs: 'empty'
	}
}
```


## API
is, not, any共用。

### Alias
```js
is.FooBar===is.foobar; // true
```


### Type, Instance
```js
is.array([]); // true
is.arr([], []); // true

is.boolean(false); // true
is.bool(true, false); // true

is.buffer(new Buffer('foobar')); // true

is.error(new Error('hoge')); // true

is.function(function(){}); // true
is.func(()=>{}); // true
is.fn(_=>_); // true

is.number(1); // true
is.num(0, 1); // true

is.regexp(/hoge/); // true
is.re(/foo/, /bar/); // true

is.string('hoge'); // true
is.str('fuga', 'piyo'); // true

is.undefined(undefined); // true
is.undef(null); // false

is.null(null); // true

is.nan(NaN); // true

is.date(new Date()); // true

is.object({}); // true
is.obj(null); // false

is.promise(new Promise(_=>_)); // true

is.stats( fs.statSync('./') ); // true
```

| name                                   | type | varargs | description |
|:-------------------------------------- |:---- |:-------:|:----------- |
| Array, Arr, array, arr                 | any  |    ○    |             |
| Boolean, Bool, boolean, bool           | any  |    ○    |             |
| Buffer, Buf, buffer, buf               | any  |    ○    |             |
| Error, Err, error, err                 | any  |    ○    |             |
| Function, Func, Fn, function, func, fn | any  |    ○    |             |
| Number, Num, number, num               | any  |    ○    |             |
| RegExp, RE, regexp, re                 | any  |    ○    |             |
| String, Str, string, str               | any  |    ○    |             |
| Undefined, Undef, undefined, undef     | any  |    ○    |             |
| Null, null                             | any  |    ○    |             |
| NaN, nan                               | any  |    ○    |             |
| Date, date                             | any  |    ○    |             |
| Object, Obj, object, obj               | any  |    ○    |             |
| Promise, promise                       | any  |    ○    |             |
| Stats, stats                           | any  |    ○    |             |



### Number

```js
is.even(2); // true

is.odd(3); // true

is.multiple(8080, 80); // true
```

| name               | type | varargs | description            |
|:------------------ |:---- |:-------:|:---------------------- |
| Odd, odd           | any  |    ○    | 引数がすべて奇数か。     |
| Even, even         | any  |    ○    | 引数がすべて偶数か。    |
| Multiple, multiple | any  |    ✗    | 引数1が引数2の倍数か。 |

### String
```js
is.lowercase('hoge'); // true

is.uppercase('FOO', 'BAR'); // true
```

| name                 | type | varargs | description |
|:-------------------- |:---- |:-------:|:----------- |
| Lowercase, lowercase | any  |    ○    |             |
| Uppercase, uppercase | any  |    ○    |             |

### DOM

```js
is.node(document.body, document.createTextNode('hoge')); // true

is.textnode(document.createTextNode('hoge')); // true

is.element(document.head, document.body); // true

is.df(document.createDocumentFragment()); // true

is.event( new Event("hoge") ); // true

is.eventtarget(document, window); // true
```

| name                                       | type | varargs | description |
|:------------------------------------------ |:---- |:-------:|:----------- |
| Node, node                                 | any  |    ○    |             |
| TextNode, textnode                         | any  |    ○    |             |
| Element, Elm, element, elm                 | any  |    ○    |             |
| DocumentFragment, DF, documentfragment, df | any  |    ○    |             |
| Event, event                               | any  |    ○    |             |
| EventTarget, eventtarget                   | any  |    ○    |             |


### その他

```js
is.true(true, !0); // true

is.false(false !1); // true

is.truthy(true, "hoge", 1, [], {}); // true

is.falsy(null, undefined, "", 0, NaN); // true

is.instance(new Date(), Date); //true

is.objectliteral({}); // true
not.objectliteral([], new function(){}); // true

is.arraylike([], 'hoge'); // true

is.comparisonoperator('<='); // true

is.semver('1.2.3'); // true
is.semver('1.0.0-foo.bar'); // true

is.version('7.7.4', '2.5.0.1') // true
is.version('1.2A', 1.0); // false

is.empty('', [], {}) // true
is.empty(0, null); // false

is.leapyear(2020, new Date('2024'));

is.validdate(2019, 4, 17); // true
is.validdate(2020, 12, 32); // false
```

| name                                       | type         | varargs | description                                       |
|:------------------------------------------ |:------------ |:-------:|:------------------------------------------------- |
| ArrayLike(), arraylike()                   | any          |    ○    |                                                   |
| True(), true()                             | any          |    ○    |                                                   |
| False(), false()                           | any          |    ○    |                                                   |
| Truthy(), truthy()                         | any          |    ○    |                                                   |
| Falsy(), falsy()                           | any          |    ○    |                                                   |
| Empty(), empty()                           | any          |    ○    | 要素が空か。                                      |
| Instance(), instance()                     | any          |    ✗    | 引数1が引数2のConstructor/Classのインスタンスか。 |
| ObjectLiteral(), objectliteral()           | any          |    ○    | 未継承の素のオブジェクトか。                      |
| ComparisonOperator(), comparisonoperator() | any          |    ○    | 有効な比較演算子の文字列か。                      |
| SemVer(), semver()                         | any          |    ○    | 有効なSemVer文字列か。                            |
| Version(), Ver(), versiom(), ver()         | any          |    ○    | 有効な数字, dotのバージョン文字列か。             |
| LeapYear(), leapyear()                     | number, date |    ○    | 閏年か。                                          |
| ValidDate(year, mon, day), validdate()     | number       |    ✗    | 存在する日付か。                                  |
