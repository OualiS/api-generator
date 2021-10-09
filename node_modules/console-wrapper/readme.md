## なにこれ
よくあるconsoleラッパー。  
require()のキャッシュを利用して同ディレクトリ内モジュールのコンソール動作を一括設定する。  
[honeo/console-wrapper](https://github.com/honeo/console-wrapper)  
[console-wrapper](https://www.npmjs.com/package/console-wrapper)

## 使い方
```sh
$ npm i console-wrapper
```
```js
const console = require('console-wrapper');

console.log('hoge'); // no output

console.enable();
console.log('hoge'); //"hoge"
```
Method
-----
### .enable()
有効化。  
通常のconsoleメソッドを使う。
### .disable()
標準。  
無効化、何もしないダミー関数を使う。
### .extension({...})
有効化（拡張モード）、行数が表示されなくなる代わりに……。  
.cache: trueならコンソールメソッド実行時に引数を保存する。  
.callback: 関数ならコンソールメソッド実行時に引数を渡して実行する。  
.disable: trueならコンソールメソッドは実行しない。  
.result: trueならコンソールメソッド実行後に引数を配列に入れて返す。
```js
// example
console.ext({
    cache: false,
    callback({type, arguments}){},
    disable: false,
    result: false
});
```
### .sync.method();
既に動作モードが設定されていればそのまま。  
されていなければ.method()を実行する。

## Properties
### .cache
.ext({cache: true}) 時にコンソールメソッド実行時の引数が配列で保存される。  
メモリに注意。  
### ._console
ネイティブのconsoleオブジェクトへの参照。
