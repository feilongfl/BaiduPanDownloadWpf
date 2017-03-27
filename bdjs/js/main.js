// ==UserScript==
// @name         Baidu 密码发送
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include        http://pan.baidu.com/s/*
// @include        http://pan.baidu.com/share/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==


function logPass(data) {
    console.log(data);
}

function GM_Post(u,d)
    GM_xmlhttpRequest({
        method: "POST",
        url: u,
        data: d,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
    }

function Send()
{
    var data = "href=" + b64EncodeUnicode(window.location.href) + "&pass=" + document.getElementById("accessCode").value;
    logPass(data);
    GM_Post("http://127.0.0.1", data);
}

var site = {
    'yunpan.cn': {
        chk: /^[a-z0-9]{4}$/i,
        code: '.pwd-input',
        btn: '.submit-btn'
    },
    'baidu.com': {
        chk: /^[a-z0-9]{4}$/i,
        code: '#accessCode, .share-access-code',
        btn: '#submitBtn, a[node-type="share-access-btn"]'
    },
    'weiyun.com': {
        chk: /^[a-z0-9]{4}$/i,
        code: '#outlink_pwd',
        btn: '#outlink_pwd_ok'
    }
};

document.getElementById("submitBtn").addEventListener("click", Send, false)

