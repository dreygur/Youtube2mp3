// ==UserScript==
// @name            YouTube 2 mp3
// @description     The Easy YouTube mp3 Add-on includes a Button on any YouTube Page and allows you to convert the YouTube Video to a mp3 with just one click.
// @icon            https://www.easy-youtube-mp3.com/addon/icon.png
//
// @author          Totul
// @namespace       https://rytotul.github.io
// @downloadURL     https://github.com/rytotul/Youtube2mp3/raw/master/Youtube2mp3.user.js
//
// @license         GPLv3 - http://www.gnu.org/licenses/gpl-3.0.txt
// @copyright       Copyright (C) 2018, by Totul
//
// @include         http://www.youtube.com/*
// @include         https://www.youtube.com/*
// @include         http://www.easy-youtube-mp3.com/*
// @include         https://www.easy-youtube-mp3.com/*
//
// @version         0.3
// @updateURL       https://github.com/rytotul/Youtube2mp3/raw/master/Youtube2mp3.user.js
//
// @run-at          document-end
// @unwrap
// ==/UserScript==

var easy_btn_onclick = function (){
  var path ='https://www.easy-youtube-mp3.com/download.php'+window.location.search;
  //window.open(path,'_blank');

  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  var left = ((width / 2) - (w / 2)) + dualScreenLeft;
  var top = ((height / 2) - (h / 2)) + dualScreenTop;

  newwindow=window.open(path,"Qr Code",'height=400,width=400,top='+top+',left='+left);
  if (window.focus) {newwindow.focus()}
  return false;
};




var getSpan = function(text, className) {
    var _tn = document.createTextNode(text);
    var span = document.createElement("span");
    span.className = className;
    span.appendChild(_tn);
    return span;
};

var myAppInterface = {
  init:function(){
    this.insertGlobalCSS()
  },
  addGlobalStyle: function(doc, css) {
    if(document.querySelector('.y2mp3-css'))return;
    var head = doc.getElementsByTagName('head')[0];
    if (!head) {return; }
    var style = doc.createElement('style');
    style.id = 'y2mp3-css';
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
  },
  insertGlobalCSS: function(){
    var css = function (){
      /*start
      #y3mp3.ytd-watch{padding-top:10px;overflow: auto;border-bottom: 1px solid #eee;padding-bottom: 10px;}
      #y3mp3 .easy_btn{background-color: #FF0000;border: #FF0000;border-radius: 2px;color: #FFF;padding: 10px 16px; font-size: 1.4em;cursor:pointer;display:inline-block}
      #y3mp3 .easy_btn:hover{background-color: #a22a2a}
      @media (min-width: 657px){ytd-watch[theater] #y3mp3.ytd-watch{margin-right:24px}}
      end*/
    }.toString().replace("/*start",'').replace("end*/",'').slice(14,-1);
    this.addGlobalStyle(document, css);
  },
}

var createButton = function() {
    var obj = document.querySelector('#primary-inner>#info');
    if(obj != null){
        // check if the button has already been created
        var btnRow = document.getElementById('y3mp3');
        if(btnRow == null){
            myAppInterface.init()
            var y3mp3 = document.createElement("div");
            y3mp3.id = "y3mp3";
            y3mp3.className = "style-scope ytd-watch";
            var easy_btn = document.createElement("div");
            easy_btn.className = "style-scope easy_btn";
            easy_btn.appendChild(getSpan("Download MP3"))
            easy_btn.onclick = easy_btn_onclick;
            obj.parentNode.insertBefore(y3mp3, obj);
            y3mp3.appendChild(easy_btn);
        }
    }
};

// yt does make use of some bogus AJAX functionality which breaks pagemod
// we have to check in intervals if the document has been replaced by yt to
// recreate the button if needed.
var intervalCheck = setInterval(function(){
    if (window.location.origin === "https://www.youtube.com") {
        createButton();
    } else {
        var button = document.getElementsByClassName('btn-success');
        button.toString;
        var link = button[0].href;
        var qr_code = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data="+link;
        window.open(qr_code, '_top', 'Youtube 2 mp3 QR-Code');
    }
}, 250);
