// ==UserScript==
// @name            YouTube 2 mp3
// @description     The YouTube 2 mp3 Add-on includes a Button on any YouTube Page and allows you to convert the YouTube Video to a mp3 with just one click.
// @icon            https://raw.githubusercontent.com/rytotul/Youtube2mp3/master/icon.png
//
// @author          Rakibul Yeasin
// @namespace       https://rytotul.github.io
// @downloadURL     https://github.com/rytotul/Youtube2mp3/raw/master/Youtube2mp3.user.js
//
// @license         GPLv3 - http://www.gnu.org/licenses/gpl-3.0.txt
// @copyright       Copyright (C) 2019, by 'Rakibul Yeasin'
//
// @include         http://*youtube.*/*watch*
// @include         https://*youtube.*/*watch*
// @include         http://*download-mp3-youtube.*
// @include         https://*download-mp3-youtube.*
// @include         http://chart.googleapis.com/*
// @include         https://chart.googleapis.com/*
//
// @version         1.0.7
// @updateURL       https://github.com/rytotul/Youtube2mp3/raw/master/Youtube2mp3.user.js
//
// @run-at          document-start
// @unwrap
// ==/UserScript==

// ==ChangeLog==
// @history        1.0.7 Changed api
// @history        1.0.5 Some Major Bug-Fix
// @history        1.0.4 Compatible with the latest update of Youtube
// @history        1.0.3 Server update
// @history        1.0.2 Server update
// @history        1.0.1 Server edit
// @history        1.0.0 Initial release.
// ==/ChangeLog==


// Button That Captures the click and do the work
function ytBtnOnclick() {
    // var path = 'https://www.easy-youtube-mp3.com/download.php'+window.location.search; // path to download link
    var path = 'https://www.download-mp3-youtube.com/api/?api_key=Mjk5NzI0MTYw&format=mp3&logo=1&video_id=' + window.location.search

    // Some window measurement capturing
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    var left = ((width / 2) - (700 / 2)) + dualScreenLeft;
    var top = ((height / 2) - (700 / 2)) + dualScreenTop;

    // Property for new po-up window
    // var newWindow = window.open(path,"Qr Code",'height=400,width=400,top='+top+',left='+left);
    var newWindow = window.open(path, '_blank');
    if (window.focus) {newWindow.focus();}
    return false;
}

// injecting interface to youtube
function getSpan(text, className) {
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
        if (document.querySelector('.y2mp3-css'))return;
        var head = doc.getElementsByTagName('head')[0];
        if (!head) {return;}
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
            #btn-padding{padding-top:10px;}
            #y2mp3.ytd-watch {
              padding-top:10px;
              overflow: auto;
              padding-bottom: 10px;
            }
            #y2mp3 .easy_btn {
              background-color: #FF0000;
              border: #FF0000;
              border-radius: 2px;
              color: #FFF;
              padding: 10px 16px;
              font-size: 1.4em;
              cursor:pointer;
              display:inline-block;
            }
            #y2mp3 .easy_btn:hover  {
              background-color: #a22a2a
            }
            @media (min-width: 657px) {ytd-watch[theater] #y2mp3.ytd-watch{margin-right:24px}}
            end*/
        }.toString().replace("/*start",'').replace("end*/",'').slice(14,-1);
        this.addGlobalStyle(document, css);
    },
}

function createButton() {
    var btnRow, y2mp3, yBtn;
    var obj = document.getElementById("sponsor-button");
    if(obj === null){
        // check if the button has already been created
        obj = document.getElementById("watch7-subscription-container");
        btnRow = document.getElementById('y2mp3');
        if(btnRow == null){
            myAppInterface.init();
            y2mp3 = document.createElement("div");
            y2mp3.id = "y2mp3";
            y2mp3.className = "yt-uix-button";
            yBtn = document.createElement("div");
            yBtn.className = "yt-uix-button yt-uix-button-subscribe-branded btn-padding";
            yBtn.appendChild(getSpan("Download MP3"))
            yBtn.onclick = ytBtnOnclick;
            obj.parentNode.insertBefore(y2mp3, obj);
            y2mp3.appendChild(yBtn);
        }
    }
    if(obj != null){
        // check if the button has already been created
        btnRow = document.getElementById('y2mp3');
        if(btnRow == null){
            myAppInterface.init();
            y2mp3 = document.createElement("div");
            y2mp3.id = "y2mp3";
            y2mp3.className = "style-scope ytd-watch";
            yBtn = document.createElement("div");
            yBtn.className = "style-scope easy_btn";
            yBtn.appendChild(getSpan("Download MP3"))
            yBtn.onclick = ytBtnOnclick;
            obj.parentNode.insertBefore(y2mp3, obj);
            y2mp3.appendChild(yBtn);
        }
    }
};

// yt does make use of some bogus AJAX functionality which breaks pagemod
// we have to check in intervals if the document has been replaced by yt to
// recreate the button if needed.
var intervalCheck = setInterval(function(){
    if (window.location.origin === "https://www.youtube.com") {
        createButton();
    }
    else if (window.location.origin === "https://chart.googleapis.com") {
        document.title = "Youtube to Mp3 QR-Code"
    } else {
        // var button = document.getElementById('downloadButton');
        // button.toString;
        var d_link = window.location.search;
        var link = button.href;
        //var qr_code = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data="+link;
        var qr_code = "https://chart.googleapis.com/chart?cht=qr&chl="+link+"&chs=300x300&chld=L|0";
        window.open(qr_code, '_top', 'Youtube 2 mp3 QR-Code');
    }
}, 250);
