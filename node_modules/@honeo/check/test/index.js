console.log('check: test');

const {is, not, any} = require('../');
const _is = require('../is');
const JSDOM = require('jsdom');

// jsdom set
global.document = JSDOM.jsdom('hogehoge');
global.head = document.head;
global.window = document.defaultView;
global.Node = window.Node;
global.Element = window.Element;
global.Event = window.Event;

// Cases
const cases = {}

/// type

// array, arr
cases.array = (arg)=>{
	return !is.Array()
		&& is.array([])
		&& is.Arr([])
		&& is.arr([], [])
		&& !is.arr('array!')
		&& !is.arr([], true);
}

// boolean, bool
cases.boolean = (arg)=>{
	return !is.Boolean()
		&& is.boolean(true)
		&& is.Bool(false)
		&& is.bool(true, false)
		&& !is.bool('boolean!')
		&& !is.bool(true, 'true');
}

// error, err
cases.error = (arg)=>{
	return !is.Error()
		&& is.error(new Error())
		&& is.Err(new Error())
		&& is.err(new Error(), new Error())
		&& !is.err('error')
		&& !is.err(new Error(), 'error');
}

// function, func, fn
cases.function = (arg)=>{
	const f = function(){};
	return !is.Function()
		&& is.function(f)
		&& is.Func(f)
		&& is.func(f, f)
		&& is.fn(f)
		&& !is.func('function!')
		&& !is.func(f, true);
}

// number, num
cases.number = (arg)=>{
	return !is.Number()
		&& is.number(123)
		&& is.Num(45)
		&& is.num(22, 80, 443)
		&& !is.num('number!')
		&& !is.num(1, true);
}

// regexp, re
cases.regexp = (arg)=>{
	const r = /hoge/;
	return !is.RegExp()
		&& is.regexp(r)
		&& is.RE(r)
		&& is.re(r, r)
		&& !is.re('rexexp!')
		&& !is.re(r, true);
}

// string, str
cases.string = (arg)=>{
	return !is.String()
		&& is.string('hoge')
		&& is.Str('fuga')
		&& is.str('foo', 'bar')
		&& !is.str(123)
		&& !is.str('piyo', true);
}

// undefined
cases.undefined = (arg)=>{
	return !is.Undefined()
		&& is.undefined(undefined)
		&& is.undefined(undefined, undefined)
		&& !is.undefined(null);
}

// null
cases.null = (arg)=>{
	return !is.Null()
		&& is.null(null)
		&& is.null(null, null)
		&& !is.null(undefined);
}

// NaN
cases.nan = (arg)=>{
	return !is.NaN()
		&& is.nan(NaN)
		&& is.nan(NaN, NaN)
		&& !is.nan(undefined);
}



/// instance


// buffer
cases.buffer = ()=>{
	const buffer = Buffer.from('hoge');
	return is.Buffer(buffer)
		&& is.Buf(buffer)
		&& is.buffer(buffer)
		&& is.buf(buffer)
		&& !is.Buffer('hoge')
		&& !is.Buffer()
		&& !is.Buffer(true)
		&& !is.Buffer({});
}


// date
cases.date = (arg)=>{
	return !is.Date()
		&& !is.date({})
		&& !is.date('date object')
		&& is.date(new Date());
}

// event
cases.event = (arg)=>{
	return !is.Event()
		&& !is.event({})
		&& !is.event('event')
		&& is.event( new Event('hoge') );
}

/// jsdomではEventTargetがfunctionではなくobjectなためinstanceofで判定ができないから省略
// // eventtarget
// cases.eventtarget = (arg)=>{
// 	return !is.eventtarget()
// 		&& !is.eventtarget({})
// 		&& !is.eventtarget('eventtarget')
// 	&& is.eventtarget(window);
// }

// eventtarget

// object, obj
cases.object = (arg)=>{
	return !is.Object()
		&& is.object({})
		&& is.Obj({})
		&& is.obj( Object.create(null) )
		&& is.obj({}, {})
		&& !is.obj('object!')
		&& !is.obj({}, true);
}

// stats
cases.stats = (arg)=>{
	const fs = require('fs');
	const stats_dir = fs.statSync('./');
	const stats_file = fs.statSync(__filename);
	return !is.stats()
		&& is.stats(stats_dir)
		&& is.stats(stats_dir, stats_file)
		&& !is.stats({}, true);
}

// promise
cases.promise = (arg)=>{
	const p = new Promise(_=>_);
	return !is.Promise()
		&& is.promise(p)
		&& is.promise(p, p)
		&& !is.promise('promise!')
		&& !is.promise(p, true);
}



/*
	Number
*/

// even
cases.even = (arg)=>{
	return is.Even(0)
		&& is.even(2)
		&& is.even(4, 6)
		&& !is.even(8, 9)
		&& !is.even('evennumber!');
}

// odd
cases.odd = (arg)=>{
	return is.Odd(1)
		&& is.odd(3)
		&& is.odd(5, 7)
		&& !is.odd(9, 10)
		&& !is.odd('oddnumber!');
}

// multiple
cases.multiple = (arg)=>{
	return is.Multiple(4, 2)
		&& is.multiple(8080, 80)
		&& !is.multiple(151, 50)
		&& !is.multiple('multiple!');
}


/*
	String系
 */
cases.lowercase = (arg)=>{
	return is.Lowercase('hoge')
		&& is.lowercase('foo', 'bar')
		&& !is.lowercase('Fuga')
		&& !is.lowercase(true);
}
cases.uppercase = (arg)=>{
	return is.Uppercase('HOGE')
		&& is.uppercase('FOO', 'BAR')
		&& !is.uppercase('Fuga')
		&& !is.uppercase(true);
}


/// DOM
const textnode = document.createTextNode('');
const element = document.createElement('div');

// node
cases.node = (arg)=>{
	return !is.Node()
		&& is.node(textnode)
		&& is.node(element)
		&& is.node(textnode, element)
		&& !is.node('node!')
		&& !is.node(textnode, true);
}

// textnode
cases.textnode = (arg)=>{
	return !is.TextNode()
		&& is.textnode(textnode)
		&& is.textnode(textnode, textnode)
		&& !is.textnode('textnode!')
		&& !is.textnode(textnode, true);
}

// element
cases.element = (arg)=>{
	return !is.Element()
		&& is.Elm(element)
		&& is.element(element, element)
		&& !is.elm('element!')
		&& !is.element(element, true);
}

// documentfragment, df
cases.documentfragment = (arg)=>{
	const df = document.createDocumentFragment();
	return !is.DocumentFragment()
		&& is.documentfragment(df)
		&& is.DF(df)
		&& is.df(df, df)
		&& !is.df('documentfragment!')
		&& !is.df(df, true);
}



/*
	Other
*/

// true
cases.true = (arg)=>{
	return !is.True()
		&& is.true(true)
		&& is.true(true, true)
		&& !is.true('true!')
		&& !is.true(true, false);
}

// false
cases.false = (arg)=>{
	return !is.False()
		&& is.false(false)
		&& is.false(false, false)
		&& !is.false('false!')
		&& !is.false(false, true);
}

// truthy
cases.truthy = (arg)=>{
	return !is.Truthy()
		&& is.truthy(true)
		&& is.truthy("hoge", 123, [], {})
		&& !is.truthy(null, undefined)
		&& !is.truthy(true, false);
}

// falsy
cases.falsy = (arg)=>{
	return !is.Falsy()
		&& is.falsy(false)
		&& is.falsy("", 0, null, undefined, NaN)
		&& !is.falsy(true, "hoge", 123)
		&& !is.falsy(true, false);
}


// instance
cases.instance = (arg)=>{
	return !is.instance()
		&& is.instance(new Date, Date)
		&& !is.instance({}, Array)
		&& !is.instance(true, false);
}

// objectliteral
cases.objectliteral = (arg)=>{
	return !is.ObjectLiteral()
		&& is.objectliteral({})
		&& is.objectliteral({}, new Object({}))
		&& !is.objectliteral( new function(){} )
		&& !is.objectliteral({}, []);
}

// arraylike
cases.arraylike = (arg)=>{
	return !is.ArrayLike()
		&& is.arraylike([])
		&& is.arraylike('hoge', {length: 0})
		&& !is.arraylike(12345)
		&& !is.arraylike([], undefined);
}

// isComparisonOperator
cases.comparisonoperator = (arg)=>{
	return !is.ComparisonOperator()
		&& is.comparisonoperator('<')
		&& is.comparisonoperator('!==')
		&& !is.comparisonoperator('&&')
		&& !is.comparisonoperator(true, '>');
}

// isSemVer
cases.semver = (arg)=>{
	return !is.SemVer()
		&& is.semver('1.2.3')
		&& is.semver('1.0.0-foo.bar', '2.2.2')
		&& !is.semver('1.2.3.4')
		&& !is.semver(1.0)
		&& !is.semver(true, '1.0.0')
}

// isVersion
cases.version = (arg)=>{
	return !is.Version()
		&& is.Ver('1.2.3')
		&& is.version('1.0.0.0', '7.7.7.7.7.7.7')
		&& !is.ver('1.2.3.4.')
		&& !is.version(1.0)
		&& !is.version(true, '1.0.0A')
}

// isEmpty
cases.empty = (arg)=>{
	return is.Empty({})
		&& is.empty([])
		&& is.empty('')
		&& !is.empty()
		&& !is.empty(null)
		&& !is.empty({a: 1})
		&& !is.empty([1])
		&& !is.empty('0');
}

// isLeapYear
cases.leapyear = (arg)=>{
	return is.LeapYear(2020)
		&& is.leapyear(new Date('2016'))
		&& !is.leapyear(2019)
		&& !is.leapyear(new Date('2018'));
}

// isValidDate
cases.isvaliddate = (arg)=>{
	return is.ValidDate(2020, 11, 11)
		&& is.validdate(2019, 4, 17)
		&& !is.validdate(1995, 13, 1)
		&& !is.validdate(2010, 4, 32);
}

// 本体
for(let [key, method] of Object.entries(cases)){
	if( method() ){
		console.log(`${key}: success`);
	}else{
		throw new Error(`${key}: failed`);
	}
}


/*
	not
		中身はほぼ一緒だから適当
*/
const resultArr = [
	// string
	not.String(),
	!not.string('hoge'),
	!not.Str('fuga'),
	!not.str('foo', 'bar'),
	not.str(123),
	not.str(true, false),
	not.str('piyo', true),

	// multiple
	not.Multiple(5, 2),
	not.multiple(7777, 80),
	!not.multiple(150, 50),
	not.multiple('multiple!'),

	// element
	not.Element(true),
	!not.element(element),

	// 読み込みチェック
	(is===_is)
];


resultArr.forEach( (bool, index, arr)=>{
	if( bool ){
		console.log(`not: ${index+1}/${arr.length} success`);
	}else{
		throw new Error(`not: ${index}/${arr.length} failed`);
	}
});


/*
	any
*/
const resultArr_any = [
	any.true(false, true),
	any.True(false, true),
	!any.Number('123', true),
	!any.number('123', true),
	!any.Num('123', true),
	!any.num('123', true)
];

resultArr_any.forEach( (bool, index, arr)=>{
	if( bool ){
		console.log(`any: ${index+1}/${arr.length} success`);
	}else{
		throw new Error(`any: ${index}/${arr.length} failed`);
	}
});

console.log('check: test done');
