# document
という名の制作メモ。

## TODO


## 仕様
* CommonJSモジュール


## Mod

### devDependencies
* jsdom
    - DOM関連。


## dir構成

### ./
* index.js
    - is.js, not.js, any.jsをまとめて返すだけ。
* is.js
    - ./\_is/を可変長引数化する。
* not.js
    - is.jsを元にnot関数を作成する。
* any.js
    - ./\_isを元にany関数を作成する。
* config.js
    - 設定オブジェクトを返すモジュール。

### ./\_is.
素の判定関数詰め合わせモジュールを返すディレクトリ。
* index.js
    - 本体。
* ^is-[a-z-]+\.js$
    - 個別の判定関数を返すモジュール。

### ./test
* index.js
    - 本体。
