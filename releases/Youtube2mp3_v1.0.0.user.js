// ==UserScript==
// @name            YouTube 2 mp3
// @description     The YouTube 2 mp3 Add-on includes a Button on any YouTube Page and allows you to convert the YouTube Video to a mp3 with just one click.
// @icon            https://raw.githubusercontent.com/rytotul/Youtube2mp3/master/icon.png
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
// @version         1.0.0
// @updateURL       https://github.com/rytotul/Youtube2mp3/raw/master/Youtube2mp3.user.js
//
// @run-at          document-end
// @unwrap
// ==/UserScript==


// Button That Captures the click and do the work
var easy_btn_onclick = function (){
    var path ='https://www.easy-youtube-mp3.com/download.php'+window.location.search; // path to download link
  
    // Some window measurement capturing
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    var left = ((width / 2) - (700 / 2)) + dualScreenLeft;
    var top = ((height / 2) - (700 / 2)) + dualScreenTop;
  
    // Property for new po-up window
    var newwindow = window.open(path,"Qr Code",'height=400,width=400,top='+top+',left='+left);
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
  
  // injecting interface to youtube
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
        #y2mp3.ytd-watch{padding-top:10px;overflow: auto;border-bottom: 1px solid #eee;padding-bottom: 10px;}
        #y2mp3 .easy_btn{background-color: #FF0000;border: #FF0000;border-radius: 2px;color: #FFF;padding: 10px 16px; font-size: 1.4em;cursor:pointer;display:inline-block}
        #y2mp3 .easy_btn:hover{background-color: #a22a2a}
        @media (min-width: 657px){ytd-watch[theater] #y2mp3.ytd-watch{margin-right:24px}}
        end*/
      }.toString().replace("/*start",'').replace("end*/",'').slice(14,-1);
      this.addGlobalStyle(document, css);
    },
  }
  
  var createButton = function() {
      var obj = document.querySelector('#primary-inner>#info');
      if(obj != null){
          // check if the button has already been created
          var btnRow = document.getElementById('y2mp3');
          if(btnRow == null){
              myAppInterface.init()
              var y2mp3 = document.createElement("div");
              y2mp3.id = "y2mp3";
              y2mp3.className = "style-scope ytd-watch";
              var easy_btn = document.createElement("div");
              easy_btn.className = "style-scope easy_btn";
              easy_btn.appendChild(getSpan("Download MP3"))
              easy_btn.onclick = easy_btn_onclick;
              obj.parentNode.insertBefore(y2mp3, obj);
              y2mp3.appendChild(easy_btn);
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
          //var qr_code = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data="+link;
          var qr_code = "https://chart.googleapis.com/chart?cht=qr&chl="+link+"&chs=300x300&chld=L|0";
          window.open(qr_code, '_top', 'Youtube 2 mp3 QR-Code');
      }
  }, 250);
  
