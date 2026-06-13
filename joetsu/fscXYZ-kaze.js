/*
===========================================================
フォントサイズ変更スクリプト（タイプB）

Last Updated:08/21/2001
　　　10/23/2001最終更新版より下記のURIのみ変更

insomnia!
http://insomnia.jp/
http://insomnia.jp/workshop/
===========================================================
*/


/*
========== ::: ブラウザ判別時に使用する変数 ::: ==========
*/
uaName = navigator.userAgent;
appName = navigator.appVersion;


/*
========== ::: 初期設定 ::: ==========
*/

// 値の単位を設定（必ずダブルクオートかクオートで括る）
var fontSizeUnit = "%";

// 一回の操作で変化させる値を設定（ダブルクオートやクオートで括らない）
var perOrder = 21;

// 初期状態の値を設定（ダブルクオートやクオートで括らない）
var defaultSize = 100;

// クッキーの名前（必ずダブルクオートかクオートで括る）
var ckName = "FSCb";

// クッキーの有効期限（日）（ダブルクオートやクオートで括らない）
var ckDays = 2;

// クッキーのパス（必ずダブルクオートかクオートで括る。指定がいらない場合は"/"にする）
var ckPath = "/"


/*
========== :::ページ読み込み時の値を設定::: ==========
*/

// クッキー読み出し
var fsCK = GetCookie(ckName);

if ( fsCK == null ) {
  currentSize = defaultSize;      //クッキーが無ければ現在の値を初期状態の値に設定
}
else{
  currentSize = Number(fsCK);      //クッキーがあれば現在の値をクッキーの値に設定
}


/*===================================
  [関数 fscRef]
  BODY要素のイベントハンドラ"onload"ならびに関数fscから呼び出される。
  変数"currentSize"の値に従って
  オブジェクトのfontStyleプロパティを変更する
====================================*/

function fscRef(){

  // === ::: 変更を加えるオブジェクトの判定 ::: ===
  //
  //  NN4もしくはMacIE4.0の場合、エラーメッセージを回避
  if (( document.layers )||(( appName.indexOf("Mac",0) != -1 ) && ( uaName.indexOf("MSIE 4.0",0) != -1 ))){
    return false;
  }

  else if( document.body ){
  
  // オブジェクトのfontSizeプロパティを書き換える
    document.body.style.fontSize = currentSize + fontSizeUnit;
  }

var tds=document.getElementsByTagName("td");
for(var i=0;i<tds.length;i++){
tds[i].style.fontSize = currentSize + fontSizeUnit;}

  
}

// _______________________________________ end of function fscRef() ___ 


/*===================================
  [関数 fsc]
  引数CMDに渡される値に応じて
  変更後の値を算出しクッキーに書き込む。
====================================*/

function fsc( CMD ){

  // 拡大：現時点の値に一回の操作で変化させる値を加えて操作後の値"newSize"に代入
  if( CMD == "larger" ){
    var newSize = Number( currentSize + perOrder );
    SetCookie( ckName , newSize );      //クッキー書き込み
  }

  // 縮小：現時点の値から一回の操作で変化させる値を引き操作後の値に代入
  // 現時点のサイズの値が一回の操作で変化させる値と同じならそのまま操作後の値に代入
  if( CMD == "smaller" ){
    if ( currentSize != perOrder ){
      var newSize = Number( currentSize - perOrder );
      SetCookie( ckName , newSize );      //クッキー書き込み
    }
    else{
      var newSize=Number(currentSize);
    }
  }

  // 元に戻す：操作後の値を初期値にする
  if( CMD == "default" ){
    var newSize = defaultSize;
    DeleteCookie( ckName );      //クッキー削除
  }


  // NN4もしくはMacIE4.0の場合、エラーメッセージを回避しダイアログを表示する
  // NN4用ダイアログ
  if( document.layers ){
    window.alert( "このスクリプトはNetscape Communicator4.xでは動作しません" );
    return false;
  }

  // MacIE4用ダイアログ
  else if(( appName.indexOf("Mac",0) != -1 ) && ( uaName.indexOf("MSIE 4.0",0) != -1)){
    window.alert( "Sorry! MacIE4.0 is not supported." );
    return false;
  }

  else{
  // 現在の値を操作後の値に変更
  currentSize = newSize;

  // サイズ変更関数を呼び出す
  fscRef();
  }
}

// _______________________________________ end of function fsc() ___ 


/*===================================
  [関数 SetCookie]
  クッキーに値を書き込む
====================================*/

function SetCookie(name,value){
  var dobj = new Date();
  dobj.setTime( dobj.getTime() + 24 * 60 * 60 * ckDays * 1000);
  var expiryDate = dobj.toGMTString();
  document.cookie = name + '=' + escape(value)+ ';expires=' + expiryDate + ';path=' + ckPath;
}


/*===================================
  [関数 GetCookie]
  クッキーを取得する
====================================*/
function GetCookie (name){
  var arg  = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen){
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
    return getCookieVal (j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
   return null;
}

/*===================================
  [関数 getCookieVal]
  クッキーの値を抽出する
====================================*/
function getCookieVal (offset){
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
  endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset,endstr));
}

/*===================================
  [関数 DeleteCookie]
  クッキーを削除する
====================================*/
function DeleteCookie(name){
  if (GetCookie(name)) {
    document.cookie = name + '=' +
    '; expires=Thu, 01-Jan-70 00:00:01 GMT;path='+ckPath;
  }
}

//EOF