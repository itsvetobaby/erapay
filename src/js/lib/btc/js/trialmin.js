/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();


/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.4",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.4",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.4",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.4",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.4",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.4",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport),this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.4",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.4",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){
    var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.4",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a(document.body).height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);



    /*
 Coinjs 0.01 beta by OutCast3k{at}gmail.com
 A bitcoin frameworkcoinjs.

 http://github.com/OutCast3k/coinjs or http://coinb.in/coinjs
*/

(function () {

	var coinjs = window.coinjs = function () { };

	/* public vars */
	coinjs.pub = 0x00;
	coinjs.priv = 0x80;
	coinjs.multisig = 0x05;
	coinjs.hdkey = {'prv':0x0488ade4, 'pub':0x0488b21e};

	coinjs.compressed = false;

	/* other vars */
	coinjs.developer = '1CWHWkTWaq1K5hevimJia3cyinQsrgXUvg'; // bitcoin

	/* bit(coinb.in) api vars */
	coinjs.host = ('https:'==document.location.protocol?'https://':'http://')+'coinb.in/api/';
	coinjs.uid = '1';
	coinjs.key = '12345678901234567890123456789012';

	/* start of address functions */

	/* generate a private and public keypair, with address and WIF address */
	coinjs.newKeys = function(input){
		var privkey = (input) ? Crypto.SHA256(input) : this.newPrivkey();
		var pubkey = this.newPubkey(privkey);
		return {
			'privkey': privkey,
			'pubkey': pubkey,
			'address': this.pubkey2address(pubkey),
			'wif': this.privkey2wif(privkey),
			'compressed': this.compressed
		};
	}

	/* generate a new random private key */
	coinjs.newPrivkey = function(){
		var x = window.location;
		x += (window.screen.height * window.screen.width * window.screen.colorDepth);
		x += coinjs.random(64);
		x += (window.screen.availHeight * window.screen.availWidth * window.screen.pixelDepth);
		x += navigator.language;
		x += window.history.length;
		x += coinjs.random(64);
		x += navigator.userAgent;
		x += 'coinb.in';
		x += (Crypto.util.randomBytes(64)).join("");
		x += x.length;
		var dateObj = new Date();
		x += dateObj.getTimezoneOffset();
		x += coinjs.random(64);
		x += (document.getElementById("entropybucket")) ? document.getElementById("entropybucket").innerHTML : '';
		x += x+''+x;
		var r = x;
		for(i=0;i<(x).length/25;i++){
			r = Crypto.SHA256(r.concat(x));
		}
		var checkrBigInt = new BigInteger(r);
		var orderBigInt = new BigInteger("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
		while (checkrBigInt.compareTo(orderBigInt) >= 0 || checkrBigInt.equals(BigInteger.ZERO) || checkrBigInt.equals(BigInteger.ONE)) {
			r = Crypto.SHA256(r.concat(x));
			checkrBigInt = new BigInteger(r);
		}
		return r;
	}

	/* generate a public key from a private key */
	coinjs.newPubkey = function(hash){
		var privateKeyBigInt = BigInteger.fromByteArrayUnsigned(Crypto.util.hexToBytes(hash));
		var curve = EllipticCurve.getSECCurveByName("secp256k1");

		var curvePt = curve.getG().multiply(privateKeyBigInt);
		var x = curvePt.getX().toBigInteger();
		var y = curvePt.getY().toBigInteger();

		var publicKeyBytes = EllipticCurve.integerToBytes(x, 32);
		publicKeyBytes = publicKeyBytes.concat(EllipticCurve.integerToBytes(y,32));
		publicKeyBytes.unshift(0x04);

		if(coinjs.compressed==true){
			var publicKeyBytesCompressed = EllipticCurve.integerToBytes(x,32)
			if (y.isEven()){
				publicKeyBytesCompressed.unshift(0x02)
			} else {
				publicKeyBytesCompressed.unshift(0x03)
			}
			return Crypto.util.bytesToHex(publicKeyBytesCompressed);
		} else {
			return Crypto.util.bytesToHex(publicKeyBytes);
		}
	}

	/* provide a public key and return address */
	coinjs.pubkey2address = function(h){
		var r = ripemd160(Crypto.SHA256(Crypto.util.hexToBytes(h), {asBytes: true}));
		r.unshift(coinjs.pub);
		var hash = Crypto.SHA256(Crypto.SHA256(r, {asBytes: true}), {asBytes: true});
		var checksum = hash.slice(0, 4);
		return coinjs.base58encode(r.concat(checksum));
	}

	/* provide a scripthash and return address */
	coinjs.scripthash2address = function(h){
		var x = Crypto.util.hexToBytes(h);
		x.unshift(coinjs.pub);
		var r = x;
		r = Crypto.SHA256(Crypto.SHA256(r,{asBytes: true}),{asBytes: true});
		var checksum = r.slice(0,4);
		return coinjs.base58encode(x.concat(checksum));
	}

	/* new multisig address, provide the pubkeys AND required signatures to release the funds */
	coinjs.pubkeys2MultisigAddress = function(pubkeys, required) {
		return coinjs.pubkeysAndMandatory2MultisigAddress([], pubkeys, required);
	}

	/* new multisig address with some mandatory signment, provide the mandatory pubkeys, the multisig pubkeys
	   AND required signatures (of the multisig pubkeys) to release the funds */
	coinjs.pubkeysAndMandatory2MultisigAddress = function(mandatorykeys, pubkeys, required) {
		var s = coinjs.script();
		for(var i = 0; i < mandatorykeys.length; ++i) {
			s.writeBytes(Crypto.util.hexToBytes(mandatorykeys[i]));
			s.writeOp(173); // OP_CHECKSIGVERIFY
		}
		s.writeOp(81 + (required*1) - 1); //OP_1
		for (var i = 0; i < pubkeys.length; ++i) {
			s.writeBytes(Crypto.util.hexToBytes(pubkeys[i]));
		}
		s.writeOp(81 + pubkeys.length - 1); //OP_1 
		s.writeOp(174); //OP_CHECKMULTISIG
		var x = ripemd160(Crypto.SHA256(s.buffer, {asBytes: true}), {asBytes: true});
		x.unshift(coinjs.multisig);
		var r = x;
		r = Crypto.SHA256(Crypto.SHA256(r, {asBytes: true}), {asBytes: true});
		var checksum = r.slice(0,4);
		var redeemScript = Crypto.util.bytesToHex(s.buffer);
		var address = coinjs.base58encode(x.concat(checksum));
		return {'address':address, 'redeemScript':redeemScript};
	}

	/* provide a privkey and return an WIF  */
	coinjs.privkey2wif = function(h){
		var r = Crypto.util.hexToBytes(h);

		if(coinjs.compressed==true){
			r.push(0x01);
		}

		r.unshift(coinjs.priv);
		var hash = Crypto.SHA256(Crypto.SHA256(r, {asBytes: true}), {asBytes: true});
		var checksum = hash.slice(0, 4);

		return coinjs.base58encode(r.concat(checksum));
	}

	/* convert a wif key back to a private key */
	coinjs.wif2privkey = function(wif){
		var compressed = false;
		var decode = coinjs.base58decode(wif);
		var key = decode.slice(0, decode.length-4);
		key = key.slice(1, key.length);
		if(key.length>=33 && key[key.length-1]==0x01){
			key = key.slice(0, key.length-1);
			compressed = true;
		}
		return {'privkey': Crypto.util.bytesToHex(key), 'compressed':compressed};
	}

	/* convert a wif to a pubkey */
	coinjs.wif2pubkey = function(wif){
		var compressed = coinjs.compressed;
		var r = coinjs.wif2privkey(wif);
		coinjs.compressed = r['compressed'];
		var pubkey = coinjs.newPubkey(r['privkey']);
		coinjs.compressed = compressed;
		return {'pubkey':pubkey,'compressed':r['compressed']};
	}

	/* convert a wif to a address */
	coinjs.wif2address = function(wif){
		var r = coinjs.wif2pubkey(wif);
		return {'address':coinjs.pubkey2address(r['pubkey']), 'compressed':r['compressed']};
	}

	/* decode or validate an address and return the hash */
	coinjs.addressDecode = function(addr){
		try {
			var bytes = coinjs.base58decode(addr);
			var front = bytes.slice(0, bytes.length-4);
			var back = bytes.slice(bytes.length-4);
			var checksum = Crypto.SHA256(Crypto.SHA256(front, {asBytes: true}), {asBytes: true}).slice(0, 4);
			if (checksum+"" == back+"") {

				var o = {};
				o.bytes = front.slice(1);
				o.version = front[0];

				if(o.version==coinjs.pub){ // standard address
					o.type = 'standard';

				} else if (o.version==coinjs.multisig) { // multisig address or mandatory multisig
					o.type = 'multisig';

				} else if (o.version==coinjs.priv){ // wifkey
					o.type = 'wifkey';

				} else if (o.version==42) { // stealth address
					o.type = 'stealth';

					o.option = front[1];
					if (o.option != 0) {
						alert("Stealth Address option other than 0 is currently not supported!");
						return false;
					};

					o.scankey = Crypto.util.bytesToHex(front.slice(2, 35));
					o.n = front[35];

					if (o.n > 1) {
						alert("Stealth Multisig is currently not supported!");
						return false;
					};
				
					o.spendkey = Crypto.util.bytesToHex(front.slice(36, 69));
					o.m = front[69];
					o.prefixlen = front[70];
				
					if (o.prefixlen > 0) {
						alert("Stealth Address Prefixes are currently not supported!");
						return false;
					};
					o.prefix = front.slice(71);

				} else { // everything else
					o.type = 'other'; // address is still valid but unknown version
				}

				return o;
			} else {
				return false;
			}
		} catch(e) {
			return false;
		}
	}

	/* retreive the balance from a given address */
	coinjs.addressBalance = function(address, callback){
		coinjs.ajax(coinjs.host+'?uid='+coinjs.uid+'&key='+coinjs.key+'&setmodule=addresses&request=bal&address='+address+'&r='+Math.random(), callback, "GET");
	}

	/* decompress an compressed public key */
	coinjs.pubkeydecompress = function(pubkey) {
		var curve = EllipticCurve.getSECCurveByName("secp256k1");
		try {
			var pt = curve.curve.decodePointHex(pubkey);
			var x = pt.getX().toBigInteger();
			var y = pt.getY().toBigInteger();

			var publicKeyBytes = EllipticCurve.integerToBytes(x, 32);
			publicKeyBytes = publicKeyBytes.concat(EllipticCurve.integerToBytes(y,32));
			publicKeyBytes.unshift(0x04);
			return Crypto.util.bytesToHex(publicKeyBytes);
		} catch (e) {
			// console.log(e);
			return false;
		}
	}

	coinjs.testdeterministicK = function() {
		// https://github.com/bitpay/bitcore/blob/9a5193d8e94b0bd5b8e7f00038e7c0b935405a03/test/crypto/ecdsa.js
		// Line 21 and 22 specify digest hash and privkey for the first 2 test vectors.
		// Line 96-117 tells expected result.

		var tx = coinjs.transaction();

		var test_vectors = [
			{
				'message': 'test data',
				'privkey': 'fee0a1f7afebf9d2a5a80c0c98a31c709681cce195cbcd06342b517970c0be1e',
				'k_bad00': 'fcce1de7a9bcd6b2d3defade6afa1913fb9229e3b7ddf4749b55c4848b2a196e',
				'k_bad01': '727fbcb59eb48b1d7d46f95a04991fc512eb9dbf9105628e3aec87428df28fd8',
				'k_bad15': '398f0e2c9f79728f7b3d84d447ac3a86d8b2083c8f234a0ffa9c4043d68bd258'
			},
			{
				'message': 'Everything should be made as simple as possible, but not simpler.',
				'privkey': '0000000000000000000000000000000000000000000000000000000000000001',
				'k_bad00': 'ec633bd56a5774a0940cb97e27a9e4e51dc94af737596a0c5cbb3d30332d92a5',
				'k_bad01': 'df55b6d1b5c48184622b0ead41a0e02bfa5ac3ebdb4c34701454e80aabf36f56',
				'k_bad15': 'def007a9a3c2f7c769c75da9d47f2af84075af95cadd1407393dc1e26086ef87'
			},
			{
				'message': 'Satoshi Nakamoto',
				'privkey': '0000000000000000000000000000000000000000000000000000000000000002',
				'k_bad00': 'd3edc1b8224e953f6ee05c8bbf7ae228f461030e47caf97cde91430b4607405e',
				'k_bad01': 'f86d8e43c09a6a83953f0ab6d0af59fb7446b4660119902e9967067596b58374',
				'k_bad15': '241d1f57d6cfd2f73b1ada7907b199951f95ef5ad362b13aed84009656e0254a'
			},
			{
				'message': 'Diffie Hellman',
				'privkey': '7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f',
				'k_bad00': 'c378a41cb17dce12340788dd3503635f54f894c306d52f6e9bc4b8f18d27afcc',
				'k_bad01': '90756c96fef41152ac9abe08819c4e95f16da2af472880192c69a2b7bac29114',
				'k_bad15': '7b3f53300ab0ccd0f698f4d67db87c44cf3e9e513d9df61137256652b2e94e7c'
			},
			{
				'message': 'Japan',
				'privkey': '8080808080808080808080808080808080808080808080808080808080808080',
				'k_bad00': 'f471e61b51d2d8db78f3dae19d973616f57cdc54caaa81c269394b8c34edcf59',
				'k_bad01': '6819d85b9730acc876fdf59e162bf309e9f63dd35550edf20869d23c2f3e6d17',
				'k_bad15': 'd8e8bae3ee330a198d1f5e00ad7c5f9ed7c24c357c0a004322abca5d9cd17847'
			},
			{
				'message': 'Bitcoin',
				'privkey': 'fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140',
				'k_bad00': '36c848ffb2cbecc5422c33a994955b807665317c1ce2a0f59c689321aaa631cc',
				'k_bad01': '4ed8de1ec952a4f5b3bd79d1ff96446bcd45cabb00fc6ca127183e14671bcb85',
				'k_bad15': '56b6f47babc1662c011d3b1f93aa51a6e9b5f6512e9f2e16821a238d450a31f8'
			},
			{
				'message': 'i2FLPP8WEus5WPjpoHwheXOMSobUJVaZM1JPMQZq',
				'privkey': 'fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140',
				'k_bad00': '6e9b434fcc6bbb081a0463c094356b47d62d7efae7da9c518ed7bac23f4e2ed6',
				'k_bad01': 'ae5323ae338d6117ce8520a43b92eacd2ea1312ae514d53d8e34010154c593bb',
				'k_bad15': '3eaa1b61d1b8ab2f1ca71219c399f2b8b3defa624719f1e96fe3957628c2c4ea'
			},
			{
				'message': 'lEE55EJNP7aLrMtjkeJKKux4Yg0E8E1SAJnWTCEh',
				'privkey': '3881e5286abc580bb6139fe8e83d7c8271c6fe5e5c2d640c1f0ed0e1ee37edc9',
				'k_bad00': '5b606665a16da29cc1c5411d744ab554640479dd8abd3c04ff23bd6b302e7034',
				'k_bad01': 'f8b25263152c042807c992eacd2ac2cc5790d1e9957c394f77ea368e3d9923bd',
				'k_bad15': 'ea624578f7e7964ac1d84adb5b5087dd14f0ee78b49072aa19051cc15dab6f33'
			},
			{
				'message': '2SaVPvhxkAPrayIVKcsoQO5DKA8Uv5X/esZFlf+y',
				'privkey': '7259dff07922de7f9c4c5720d68c9745e230b32508c497dd24cb95ef18856631',
				'k_bad00': '3ab6c19ab5d3aea6aa0c6da37516b1d6e28e3985019b3adb388714e8f536686b',
				'k_bad01': '19af21b05004b0ce9cdca82458a371a9d2cf0dc35a813108c557b551c08eb52e',
				'k_bad15': '117a32665fca1b7137a91c4739ac5719fec0cf2e146f40f8e7c21b45a07ebc6a'
			},
			{
				'message': '00A0OwO2THi7j5Z/jp0FmN6nn7N/DQd6eBnCS+/b',
				'privkey': '0d6ea45d62b334777d6995052965c795a4f8506044b4fd7dc59c15656a28f7aa',
				'k_bad00': '79487de0c8799158294d94c0eb92ee4b567e4dc7ca18addc86e49d31ce1d2db6',
				'k_bad01': '9561d2401164a48a8f600882753b3105ebdd35e2358f4f808c4f549c91490009',
				'k_bad15': 'b0d273634129ff4dbdf0df317d4062a1dbc58818f88878ffdb4ec511c77976c0'
			}
		];

		var result_txt = '\n----------------------\nResults\n----------------------\n\n';

		for (i = 0; i < test_vectors.length; i++) {
			var hash = Crypto.SHA256(test_vectors[i]['message'].split('').map(function (c) { return c.charCodeAt (0); }), { asBytes: true });
			var wif = coinjs.privkey2wif(test_vectors[i]['privkey']);

			var KBigInt = tx.deterministicK(wif, hash);
			var KBigInt0 = tx.deterministicK(wif, hash, 0);
			var KBigInt1 = tx.deterministicK(wif, hash, 1);
			var KBigInt15 = tx.deterministicK(wif, hash, 15);

			var K = Crypto.util.bytesToHex(KBigInt.toByteArrayUnsigned());
			var K0 = Crypto.util.bytesToHex(KBigInt0.toByteArrayUnsigned());
			var K1 = Crypto.util.bytesToHex(KBigInt1.toByteArrayUnsigned());
			var K15 = Crypto.util.bytesToHex(KBigInt15.toByteArrayUnsigned());

			if (K != test_vectors[i]['k_bad00']) {
				result_txt += 'Failed Test #' + (i + 1) + '\n       K = ' + K + '\nExpected = ' + test_vectors[i]['k_bad00'] + '\n\n';
			} else if (K0 != test_vectors[i]['k_bad00']) {
				result_txt += 'Failed Test #' + (i + 1) + '\n      K0 = ' + K0 + '\nExpected = ' + test_vectors[i]['k_bad00'] + '\n\n';
			} else if (K1 != test_vectors[i]['k_bad01']) {
				result_txt += 'Failed Test #' + (i + 1) + '\n      K1 = ' + K1 + '\nExpected = ' + test_vectors[i]['k_bad01'] + '\n\n';
			} else if (K15 != test_vectors[i]['k_bad15']) {
				result_txt += 'Failed Test #' + (i + 1) + '\n     K15 = ' + K15 + '\nExpected = ' + test_vectors[i]['k_bad15'] + '\n\n';
			};
		};

		if (result_txt.length < 60) {
			result_txt = 'All Tests OK!';
		};

		return result_txt;
	};

	/* start of hd functions, thanks bip32.org */
	coinjs.hd = function(data){

		var r = {};

		/* some hd value parsing */
		r.parse = function() {

			var bytes = [];

			// some quick validation
			if(typeof(data) == 'string'){
				var decoded = coinjs.base58decode(data);
				if(decoded.length == 82){
					var checksum = decoded.slice(78, 82);
					var hash = Crypto.SHA256(Crypto.SHA256(decoded.slice(0, 78), { asBytes: true } ), { asBytes: true } );
					if(checksum[0]==hash[0] && checksum[1]==hash[1] && checksum[2]==hash[2] && checksum[3]==hash[3]){
						bytes = decoded.slice(0, 78);
					}
				}
			}

			// actual parsing code
			if(bytes && bytes.length>0) {
 				r.version = coinjs.uint(bytes.slice(0, 4) , 4);
 				r.depth = coinjs.uint(bytes.slice(4, 5) ,1);
				r.parent_fingerprint = bytes.slice(5, 9);
				r.child_index = coinjs.uint(bytes.slice(9, 13), 4);
 				r.chain_code = bytes.slice(13, 45);
				r.key_bytes = bytes.slice(45, 78);

				var c = coinjs.compressed; // get current default
				coinjs.compressed = true;

				if(r.key_bytes[0] == 0x00) {
					r.type = 'private';
					var privkey = (r.key_bytes).slice(1, 33);
					var privkeyHex = Crypto.util.bytesToHex(privkey);
					var pubkey = coinjs.newPubkey(privkeyHex);

					r.keys = {'privkey':privkeyHex,
						'pubkey':pubkey,
						'address':coinjs.pubkey2address(pubkey),
						'wif':coinjs.privkey2wif(privkeyHex)};

				} else if(r.key_bytes[0] == 0x02 || r.key_bytes[0] == 0x03) {
					r.type = 'public';
					var pubkeyHex = Crypto.util.bytesToHex(r.key_bytes);

					r.keys = {'pubkey': pubkeyHex,
						'address':coinjs.pubkey2address(pubkeyHex)};
				} else {
					r.type = 'invalid';
				}

				r.keys_extended = r.extend();

				coinjs.compressed = c; // reset to default
			}
		}

		// extend prv/pub key
		r.extend = function(){
			var hd = coinjs.hd();
			return hd.make({'depth':(this.depth*1)+1,
				'parent_fingerprint':this.parent_fingerprint,
				'child_index':this.child_index,
				'chain_code':this.chain_code,
				'privkey':this.keys.privkey,
				'pubkey':this.keys.pubkey});
		}

		// derive key from index
		r.derive = function(i){
			i = (i)?i:0;
			var blob = (Crypto.util.hexToBytes(this.keys.pubkey)).concat(coinjs.numToBytes(i,4).reverse());

			var j = new jsSHA(Crypto.util.bytesToHex(blob), 'HEX');
 			var hash = j.getHMAC(Crypto.util.bytesToHex(r.chain_code), "HEX", "SHA-512", "HEX");

			var il = new BigInteger(hash.slice(0, 64), 16);
			var ir = Crypto.util.hexToBytes(hash.slice(64,128));

			var ecparams = EllipticCurve.getSECCurveByName("secp256k1");
			var curve = ecparams.getCurve();

			var k, key, pubkey, o;

			o = coinjs.clone(this);
			o.chain_code = ir;
			o.child_index = i;

			if(this.type=='private'){
				// derive key pair from from a xprv key
				k = il.add(new BigInteger([0].concat(Crypto.util.hexToBytes(this.keys.privkey)))).mod(ecparams.getN());
				key = Crypto.util.bytesToHex(k.toByteArrayUnsigned());

				pubkey = coinjs.newPubkey(key);

				o.keys = {'privkey':key,
					'pubkey':pubkey,
					'wif':coinjs.privkey2wif(key),
					'address':coinjs.pubkey2address(pubkey)};

			} else if (this.type=='public'){
				// derive xpub key from an xpub key
				q = ecparams.curve.decodePointHex(this.keys.pubkey);
				var curvePt = ecparams.getG().multiply(il).add(q);

				var x = curvePt.getX().toBigInteger();
				var y = curvePt.getY().toBigInteger();

				var publicKeyBytesCompressed = EllipticCurve.integerToBytes(x,32)
				if (y.isEven()){
					publicKeyBytesCompressed.unshift(0x02)
				} else {
					publicKeyBytesCompressed.unshift(0x03)
				}
				pubkey = Crypto.util.bytesToHex(publicKeyBytesCompressed);

				o.keys = {'pubkey':pubkey,
					'address':coinjs.pubkey2address(pubkey)}
			} else {
				// fail
			}

			o.parent_fingerprint = (ripemd160(Crypto.SHA256(Crypto.util.hexToBytes(r.keys.pubkey),{asBytes:true}),{asBytes:true})).slice(0,4);
			o.keys_extended = o.extend();

			return o;
		}

		// make a master hd xprv/xpub
		r.master = function(pass) {
			var seed = (pass) ? Crypto.SHA256(pass) : coinjs.newPrivkey();
			var hasher = new jsSHA(seed, 'HEX');
			var I = hasher.getHMAC("Bitcoin seed", "TEXT", "SHA-512", "HEX");

			var privkey = Crypto.util.hexToBytes(I.slice(0, 64));
			var chain = Crypto.util.hexToBytes(I.slice(64, 128));

			var hd = coinjs.hd();
			return hd.make({'depth':0,
				'parent_fingerprint':[0,0,0,0],
				'child_index':0,
				'chain_code':chain,
				'privkey':I.slice(0, 64),
				'pubkey':coinjs.newPubkey(I.slice(0, 64))});
		}

		// encode data to a base58 string
		r.make = function(data){ // { (int) depth, (array) parent_fingerprint, (int) child_index, (byte array) chain_code, (hex str) privkey, (hex str) pubkey}
			var k = [];

			//depth
			k.push(data.depth*1);

			//parent fingerprint
			k = k.concat(data.parent_fingerprint);

			//child index
			k = k.concat((coinjs.numToBytes(data.child_index, 4)).reverse());

			//Chain code
			k = k.concat(data.chain_code);

			var o = {}; // results

			//encode xprv key
			if(data.privkey){
				var prv = (coinjs.numToBytes(coinjs.hdkey.prv, 4)).reverse();
				prv = prv.concat(k);
				prv.push(0x00);
				prv = prv.concat(Crypto.util.hexToBytes(data.privkey));
				var hash = Crypto.SHA256( Crypto.SHA256(prv, { asBytes: true } ), { asBytes: true } );
				var checksum = hash.slice(0, 4);
				var ret = prv.concat(checksum);
				o.privkey = coinjs.base58encode(ret);
			}

			//encode xpub key
			if(data.pubkey){
				var pub = (coinjs.numToBytes(coinjs.hdkey.pub, 4)).reverse();
				pub = pub.concat(k);
				pub = pub.concat(Crypto.util.hexToBytes(data.pubkey));
				var hash = Crypto.SHA256( Crypto.SHA256(pub, { asBytes: true } ), { asBytes: true } );
				var checksum = hash.slice(0, 4);
				var ret = pub.concat(checksum);
				o.pubkey = coinjs.base58encode(ret);
			}
			return o;
		}

		r.parse();
		return r;
	}


	/* start of script functions */
	coinjs.script = function(data) {
		var r = {};

		if(!data){
			r.buffer = [];
		} else if ("string" == typeof data) {
			r.buffer = Crypto.util.hexToBytes(data);
		} else if (coinjs.isArray(data)) {
			r.buffer = data;
		} else if (data instanceof coinjs.script) {
			r.buffer = r.buffer;
		} else {
			r.buffer = data;
		}

		/* parse buffer array */
		r.parse = function () {

			var self = this;
			r.chunks = [];
			var i = 0;

			function readChunk(n) {
				self.chunks.push(self.buffer.slice(i, i + n));
				i += n;
			};

			while (i < this.buffer.length) {
				var opcode = this.buffer[i++];
				if (opcode >= 0xF0) {
 					opcode = (opcode << 8) | this.buffer[i++];
				}

				var len;
				if (opcode > 0 && opcode < 76) { //OP_PUSHDATA1
					readChunk(opcode);
				} else if (opcode == 76) { //OP_PUSHDATA1
					len = this.buffer[i++];
					readChunk(len);
				} else if (opcode == 77) { //OP_PUSHDATA2
 					len = (this.buffer[i++] << 8) | this.buffer[i++];
					readChunk(len);
				} else if (opcode == 78) { //OP_PUSHDATA4
					len = (this.buffer[i++] << 24) | (this.buffer[i++] << 16) | (this.buffer[i++] << 8) | this.buffer[i++];
					readChunk(len);
				} else {
					this.chunks.push(opcode);
				}

				if(i<0x00){
					break;
				}
			}

			return true;
		};

		/* decode the redeemscript of a multisignature transaction */
		r.decodeRedeemScript = function(script){
			var r = false;
			try {
				var info = coinjs.script(Crypto.util.hexToBytes(script)).listMultisigKeys();
				if(info) {
					r = {};
					r.pubkeys = info.pubkeys;
					r.mandatorykeys = info.mandatorykeys;
					r.signaturesRequired = info.signaturesRequired;
					r.address = coinjs.pubkeysAndMandatory2MultisigAddress(r.mandatorykeys, r.pubkeys, r.signaturesRequired).address;
				}
			} catch(e) {
				// console.log(e);
				r = false;
			}
			return r;
		}

		/* retrieves the mandatory keys and multisig public keys from a multisig script */
		r.listMultisigKeys = function() {
			var r = false;
			var s = this;
			try {
				if((s.chunks.length>=3) && s.chunks[s.chunks.length-1] == 174){//OP_CHECKMULTISIG
					var npubs = s.chunks[s.chunks.length-2] - 80;
					var nsigs = s.chunks[s.chunks.length-3-npubs] - 80;
					
					var pubkeys = [];
					for(var i=1;i<=npubs;i++){
						var key = s.chunks[(s.chunks.length-3-npubs) + i];
						pubkeys.push(Crypto.util.bytesToHex(key));
					}

					var mandatorykeys = [];
					if(s.chunks.length > (3 + npubs) && s.chunks[1] == 173){// OP_CHECKSIGVERIFY
						for(var i=0; i < s.chunks.length-3-npubs; i += 2){
							var key = s.chunks[i];
							mandatorykeys.push(Crypto.util.bytesToHex(key));
						}
					}

					r = {};
					r.pubkeys = pubkeys;
					r.mandatorykeys = mandatorykeys;
					r.signaturesRequired = nsigs;
				}
			} catch(e) {
				r = false;
			}
			return r;
		}

		/* create output script to spend */
		r.spendToScript = function(address){
			var addr = coinjs.addressDecode(address);
			var s = coinjs.script();
			if(addr.version==5){ // multisig address
				s.writeOp(169); //OP_HASH160
				s.writeBytes(addr.bytes);
				s.writeOp(135); //OP_EQUAL
			} else { // regular address
				s.writeOp(118); //OP_DUP
				s.writeOp(169); //OP_HASH160
				s.writeBytes(addr.bytes);
				s.writeOp(136); //OP_EQUALVERIFY
				s.writeOp(172); //OP_CHECKSIG
			}
			return s;
		}

		/* geneate a (script) pubkey hash of the address - used for when signing */
		r.pubkeyHash = function(address) {
			var addr = coinjs.addressDecode(address);
			var s = coinjs.script();
			s.writeOp(118);//OP_DUP
			s.writeOp(169);//OP_HASH160
			s.writeBytes(addr.bytes);
			s.writeOp(136);//OP_EQUALVERIFY
			s.writeOp(172);//OP_CHECKSIG
			return s;
		}

		/* write to buffer */
		r.writeOp = function(op){
			this.buffer.push(op);
			this.chunks.push(op);
			return true;
		}

		/* write bytes to buffer */
		r.writeBytes = function(data){
			if (data.length < 76) {	//OP_PUSHDATA1
				this.buffer.push(data.length);
			} else if (data.length <= 0xff) {
				this.buffer.push(76); //OP_PUSHDATA1
				this.buffer.push(data.length);
			} else if (data.length <= 0xffff) {
				this.buffer.push(77); //OP_PUSHDATA2
				this.buffer.push(data.length & 0xff);
				this.buffer.push((data.length >>> 8) & 0xff);
			} else {
				this.buffer.push(78); //OP_PUSHDATA4
				this.buffer.push(data.length & 0xff);
				this.buffer.push((data.length >>> 8) & 0xff);
				this.buffer.push((data.length >>> 16) & 0xff);
				this.buffer.push((data.length >>> 24) & 0xff);
			}
			this.buffer = this.buffer.concat(data);
			this.chunks.push(data);
			return true;
		}

		r.parse();
		return r;
	}

	/* start of transaction functions */

	/* create a new transaction object */
	coinjs.transaction = function() {

		var r = {};
		r.version = 1;
		r.lock_time = 0;
		r.ins = [];
		r.outs = [];
		r.timestamp = null;
		r.block = null;

		/* add an input to a transaction */
		r.addinput = function(txid, index, script){
			var o = {};
			o.outpoint = {'hash':txid, 'index':index};
			o.script = coinjs.script(script||[]);
			o.sequence = (r.lock_time==0) ? 4294967295 : 0;
			return this.ins.push(o);
		}

		/* add an output to a transaction */
		r.addoutput = function(address, value){
			var o = {};
			o.value = new BigInteger('' + Math.round((value*1) * 1e8), 10);
			var s = coinjs.script();
			o.script = s.spendToScript(address);

			return this.outs.push(o);
		}

		/* add two outputs for stealth addresses to a transaction */
		r.addstealth = function(stealth, value){
			var ephemeralKeyBigInt = BigInteger.fromByteArrayUnsigned(Crypto.util.hexToBytes(coinjs.newPrivkey()));
			var curve = EllipticCurve.getSECCurveByName("secp256k1");
			
			var p = EllipticCurve.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F");
			var a = BigInteger.ZERO;
			var b = EllipticCurve.fromHex("7");
			var calccurve = new EllipticCurve.CurveFp(p, a, b);
			
			var ephemeralPt = curve.getG().multiply(ephemeralKeyBigInt);
			var scanPt = calccurve.decodePointHex(stealth.scankey);
			var sharedPt = scanPt.multiply(ephemeralKeyBigInt);
			var stealthindexKeyBigInt = BigInteger.fromByteArrayUnsigned(Crypto.SHA256(sharedPt.getEncoded(true), {asBytes: true}));
			
			var stealthindexPt = curve.getG().multiply(stealthindexKeyBigInt);
			var spendPt = calccurve.decodePointHex(stealth.spendkey);
			var addressPt = spendPt.add(stealthindexPt);
			
			var sendaddress = coinjs.pubkey2address(Crypto.util.bytesToHex(addressPt.getEncoded(true)));
			
			
			var OPRETBytes = [6].concat(Crypto.util.randomBytes(4)).concat(ephemeralPt.getEncoded(true)); // ephemkey data
			var q = coinjs.script();
			q.writeOp(106); // OP_RETURN
			q.writeBytes(OPRETBytes);
			v = {};
			v.value = 0;
			v.script = q;
			
			this.outs.push(v);
			
			var o = {};
			o.value = new BigInteger('' + Math.round((value*1) * 1e8), 10);
			var s = coinjs.script();
			o.script = s.spendToScript(sendaddress);
			
			return this.outs.push(o);
		}

		/* add data to a transaction */
		r.adddata = function(data){
			var r = false;
			if(((data.match(/^[a-f0-9]+$/gi)) && data.length<160) && (data.length%2)==0) {
				var s = coinjs.script();
				s.writeOp(106); // OP_RETURN
				s.writeBytes(Crypto.util.hexToBytes(data));
				o = {};
				o.value = 0;
				o.script = s;
				return this.outs.push(o);
			}
			return r;
		}

		/* list unspent transactions */
		r.listUnspent = function(address, callback) {
			coinjs.ajax(coinjs.host+'?uid='+coinjs.uid+'&key='+coinjs.key+'&setmodule=addresses&request=unspent&address='+address+'&r='+Math.random(), callback, "GET");
		}

		/* add unspent to transaction */
		r.addUnspent = function(address, callback){
			var self = this;
			this.listUnspent(address, function(data){
				var s = coinjs.script();
				var pubkeyScript = s.pubkeyHash(address);
				var value = 0;
				var total = 0;
				var x = {};

				if (window.DOMParser) {
					parser=new DOMParser();
					xmlDoc=parser.parseFromString(data,"text/xml");
				} else {
					xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.async=false;
					xmlDoc.loadXML(data);
				}

				var unspent = xmlDoc.getElementsByTagName("unspent")[0];

				for(i=1;i<=unspent.childElementCount;i++){
					var u = xmlDoc.getElementsByTagName("unspent_"+i)[0]
					var txhash = (u.getElementsByTagName("tx_hash")[0].childNodes[0].nodeValue).match(/.{1,2}/g).reverse().join("")+'';
					var n = u.getElementsByTagName("tx_output_n")[0].childNodes[0].nodeValue;
					var script = u.getElementsByTagName("script")[0].childNodes[0].nodeValue;

					self.addinput(txhash, n, script);

					value += u.getElementsByTagName("value")[0].childNodes[0].nodeValue*1;
					total++;
				}

				x.unspent = $(xmlDoc).find("unspent");
				x.value = value;
				x.total = total;
				return callback(x);
			});
		}

		/* add unspent and sign */
		r.addUnspentAndSign = function(wif, callback){
			var self = this;
			var address = coinjs.wif2address(wif);
			self.addUnspent(address['address'], function(data){
				self.sign(wif);
				return callback(data);
			});
		}

		/* broadcast a transaction */
		r.broadcast = function(callback, txhex){
			var tx = txhex || this.serialize();
			coinjs.ajax(coinjs.host+'?uid='+coinjs.uid+'&key='+coinjs.key+'&setmodule=bitcoin&request=sendrawtransaction&rawtx='+tx+'&r='+Math.random(), callback, "GET");
		}

		/* generate the transaction hash to sign from a transaction input */
		r.transactionHash = function(index) {
			var clone = coinjs.clone(this);
			if((clone.ins) && clone.ins[index]){
				for (var i = 0; i < clone.ins.length; i++) {
					if(index!=i){
						clone.ins[i].script = coinjs.script();
					}
				}

				var extract = this.extractScriptKey(index);
				clone.ins[index].script = coinjs.script(extract['script']);

				var buffer = Crypto.util.hexToBytes(clone.serialize());
				buffer = buffer.concat(coinjs.numToBytes(parseInt(1),4));
				var hash = Crypto.SHA256(buffer, {asBytes: true});
				var r = Crypto.util.bytesToHex(Crypto.SHA256(hash, {asBytes: true}));
				return r;
			} else {
				return false;
			}
		}

		/* extract the scriptSig, used in the transactionHash() function */
		r.extractScriptKey = function(index) {
			if(this.ins[index]){
				if((this.ins[index].script.chunks.length==5) && this.ins[index].script.chunks[4]==172 && coinjs.isArray(this.ins[index].script.chunks[2])){ //OP_CHECKSIG
					// regular scriptPubkey (not signed)
					return {'type':'scriptpubkey', 'signed':'false', 'signatures':0, 'script': Crypto.util.bytesToHex(this.ins[index].script.buffer)};
				} else if((this.ins[index].script.chunks.length==2) && this.ins[index].script.chunks[0][0]==48){ 
					// regular scriptPubkey (probably signed)
					return {'type':'scriptpubkey', 'signed':'true', 'signatures':1, 'script': Crypto.util.bytesToHex(this.ins[index].script.buffer)};
				} else if (this.ins[index].script.chunks[0]==0 && this.ins[index].script.chunks[this.ins[index].script.chunks.length-1][this.ins[index].script.chunks[this.ins[index].script.chunks.length-1].length-1]==174) { // OP_CHECKMULTISIG
					// multisig script, with signature(s) included
					return {'type':'multisig', 'signed':'true', 'signatures':this.ins[index].script.chunks.length-2, 'script': Crypto.util.bytesToHex(this.ins[index].script.chunks[this.ins[index].script.chunks.length-1])};
				} else if (this.ins[index].script.chunks.length >= 3 && this.ins[index].script.chunks[this.ins[index].script.chunks.length-1]==174 // OP_CHECKMULTISIG
				       &&  ((this.ins[index].script.chunks[1] == 173 && this.ins[index].script.chunks[0] instanceof Array)//OP_CHECKSIGVERIFY
				          || this.ins[index].script.chunks[0]>=80)) {
					// multisig script, without signature!					// multisig script, without signature!
					return {'type':'multisig', 'signed':'false', 'signatures':0, 'script': Crypto.util.bytesToHex(this.ins[index].script.buffer)};
				} else if (this.ins[index].script.chunks.length==0) {
					// empty
					return {'type':'empty', 'signed':'false', 'signatures':0, 'script': ''};
				} else {
					// something else
					return {'type':'unknown', 'signed':'false', 'signatures':0, 'script':Crypto.util.bytesToHex(this.ins[index].script.buffer)};
				}
			} else {
				return false;
			}
		}

		/* generate a signature from a transaction hash */
		r.transactionSig = function(index, wif){

			function serializeSig(r, s) {
				var rBa = r.toByteArraySigned();
				var sBa = s.toByteArraySigned();

				var sequence = [];
				sequence.push(0x02); // INTEGER
				sequence.push(rBa.length);
				sequence = sequence.concat(rBa);

				sequence.push(0x02); // INTEGER
				sequence.push(sBa.length);
				sequence = sequence.concat(sBa);

				sequence.unshift(sequence.length);
				sequence.unshift(0x30); // SEQUENCE

				return sequence;
			}

			var hash = Crypto.util.hexToBytes(this.transactionHash(index));

			if(hash){
				var curve = EllipticCurve.getSECCurveByName("secp256k1");
				var key = coinjs.wif2privkey(wif);
				var priv = BigInteger.fromByteArrayUnsigned(Crypto.util.hexToBytes(key['privkey']));
				var n = curve.getN();
				var e = BigInteger.fromByteArrayUnsigned(hash);
				var badrs = 0
				do {
					var k = this.deterministicK(wif, hash, badrs);
					var G = curve.getG();
					var Q = G.multiply(k);
					var r = Q.getX().toBigInteger().mod(n);
					var s = k.modInverse(n).multiply(e.add(priv.multiply(r))).mod(n);
					badrs++
				} while (r.compareTo(BigInteger.ZERO) <= 0 || s.compareTo(BigInteger.ZERO) <= 0);

				// Force lower s values per BIP62
				var halfn = n.shiftRight(1);
				if (s.compareTo(halfn) > 0) {
					s = n.subtract(s);
				};

				var sig = serializeSig(r, s);
				sig.push(parseInt(1, 10));

				return Crypto.util.bytesToHex(sig);
			} else {
				return false;
			}
		}

		// https://tools.ietf.org/html/rfc6979#section-3.2
		r.deterministicK = function(wif, hash, badrs) {
			// if r or s were invalid when this function was used in signing,
			// we do not want to actually compute r, s here for efficiency, so,
			// we can increment badrs. explained at end of RFC 6979 section 3.2

			// wif is b58check encoded wif privkey.
			// hash is byte array of transaction digest.
			// badrs is used only if the k resulted in bad r or s.

			// some necessary things out of the way for clarity.
			badrs = badrs || 0;
			var key = coinjs.wif2privkey(wif);
			var x = Crypto.util.hexToBytes(key['privkey'])
			var curve = EllipticCurve.getSECCurveByName("secp256k1");
			var N = curve.getN();

			// Step: a
			// hash is a byteArray of the message digest. so h1 == hash in our case

			// Step: b
			var v = new Uint8Array(32);
			v = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

			// Step: c
			var k = new Uint8Array(32);
			k = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

			// Step: d
			k = Crypto.HMAC(Crypto.SHA256, v.concat([0]).concat(x).concat(hash), k, { asBytes: true });

			// Step: e
			v = Crypto.HMAC(Crypto.SHA256, v, k, { asBytes: true });

			// Step: f
			k = Crypto.HMAC(Crypto.SHA256, v.concat([1]).concat(x).concat(hash), k, { asBytes: true });

			// Step: g
			v = Crypto.HMAC(Crypto.SHA256, v, k, { asBytes: true });

			// Step: h1
			var T = [];

			// Step: h2 (since we know tlen = qlen, just copy v to T.)
			v = Crypto.HMAC(Crypto.SHA256, v, k, { asBytes: true });
			T = v;

			// Step: h3
			var KBigInt = BigInteger.fromByteArrayUnsigned(T);

			// loop if KBigInt is not in the range of [1, N-1] or if badrs needs incrementing.
			var i = 0
			while (KBigInt.compareTo(N) >= 0 || KBigInt.compareTo(BigInteger.ZERO) <= 0 || i < badrs) {
				k = Crypto.HMAC(Crypto.SHA256, v.concat([0]), k, { asBytes: true });
				v = Crypto.HMAC(Crypto.SHA256, v, k, { asBytes: true });
				v = Crypto.HMAC(Crypto.SHA256, v, k, { asBytes: true });
				T = v;
				KBigInt = BigInteger.fromByteArrayUnsigned(T);
				i++
			};

			return KBigInt;
		};

		/* sign a "standard" input */
		r.signinput = function(index, wif){
			var key = coinjs.wif2pubkey(wif);
			var signature = this.transactionSig(index, wif);
			var s = coinjs.script();
			s.writeBytes(Crypto.util.hexToBytes(signature));
			s.writeBytes(Crypto.util.hexToBytes(key['pubkey']));
			this.ins[index].script = s;
			return true;
		}
		
		/* sign a multisig input */
		r.signmultisig = function(index, wif){

			function scriptListKeys(redeemScript){
				var info = redeemScript.listMultisigKeys();

				var pubkeys = {};
				for(var i=0; i < info.pubkeys.length; i++){
					pubkeys[i+1] = Crypto.util.hexToBytes(coinjs.pubkeydecompress(info.pubkeys[i]));
				}

				var mandatorykeys = {};
				for(var i=0; i < info.mandatorykeys.length; i++){
					var idx = info.mandatorykeys.length - i; // mandatorykeys must be signed the other way around
					mandatorykeys[idx] = Crypto.util.hexToBytes(coinjs.pubkeydecompress(info.mandatorykeys[i]));
				}

				return {'pubkeys': pubkeys, 'mandatorykeys': mandatorykeys};
			}
	
			function scriptListSigs(scriptSig){
				var r = {};
				if (scriptSig.chunks[0]==0 && scriptSig.chunks[scriptSig.chunks.length-1][scriptSig.chunks[scriptSig.chunks.length-1].length-1]==174){
					for(var i=1;i<scriptSig.chunks.length-1;i++){				
						r[i] = scriptSig.chunks[i];
					}
				}
				return r;
			}

			var redeemScript = (this.ins[index].script.chunks[this.ins[index].script.chunks.length-1]==174) ? this.ins[index].script.buffer : this.ins[index].script.chunks[this.ins[index].script.chunks.length-1];
			var sighash = Crypto.util.hexToBytes(this.transactionHash(index));
			var signature = Crypto.util.hexToBytes(this.transactionSig(index, wif));
			var s = coinjs.script();

			s.writeOp(0);

			if(this.ins[index].script.chunks[this.ins[index].script.chunks.length-1]==174){
				s.writeBytes(signature);

			}  else if (this.ins[index].script.chunks[0]==0 && this.ins[index].script.chunks[this.ins[index].script.chunks.length-1][this.ins[index].script.chunks[this.ins[index].script.chunks.length-1].length-1]==174){
				var pkeysList = scriptListKeys(coinjs.script(redeemScript));
				var pubkeyList = pkeysList.pubkeys;
				var mandatorykeyList = pkeysList.mandatorykeys;
				var sigsList = scriptListSigs(this.ins[index].script);
				sigsList[coinjs.countObject(sigsList)+1] = signature;

				for(x in pubkeyList){
					for(y in sigsList){
						if(coinjs.verifySignature(sighash, sigsList[y], pubkeyList[x])){
							s.writeBytes(sigsList[y]);
						}
					}
				}

				for(x in mandatorykeyList){
					for(y in sigsList){
						if(coinjs.verifySignature(sighash, sigsList[y], mandatorykeyList[x])){
							s.writeBytes(sigsList[y]);
						}
					}
				}
			}

			s.writeBytes(redeemScript);
			this.ins[index].script = s;
			return true;
		}

		/* sign inputs */
		r.sign = function(wif){
			for (var i = 0; i < this.ins.length; i++) {
				var d = this.extractScriptKey(i);

				var w2a = coinjs.wif2address(wif);
				var script = coinjs.script();
				var pubkeyHash = script.pubkeyHash(w2a['address']);

				if(((d['type'] == 'scriptpubkey' && d['script']==Crypto.util.bytesToHex(pubkeyHash.buffer)) || d['type'] == 'empty') && d['signed'] == "false"){
					this.signinput(i, wif);
				} else if (d['type'] == 'multisig') {
					this.signmultisig(i, wif);
				} else {
					// could not sign
				}
			}
			return this.serialize();
		}

		/* serialize a transaction */
		r.serialize = function(){
			var buffer = [];
			buffer = buffer.concat(coinjs.numToBytes(parseInt(this.version),4));
			buffer = buffer.concat(coinjs.numToVarInt(this.ins.length));

			for (var i = 0; i < this.ins.length; i++) {
				var txin = this.ins[i];
				buffer = buffer.concat(Crypto.util.hexToBytes(txin.outpoint.hash).reverse());
				buffer = buffer.concat(coinjs.numToBytes(parseInt(txin.outpoint.index),4));
				var scriptBytes = txin.script.buffer;
				buffer = buffer.concat(coinjs.numToVarInt(scriptBytes.length));
				buffer = buffer.concat(scriptBytes);
				buffer = buffer.concat(coinjs.numToBytes(parseInt(txin.sequence),4));
			}
			buffer = buffer.concat(coinjs.numToVarInt(this.outs.length));

			for (var i = 0; i < this.outs.length; i++) {
				var txout = this.outs[i];
 				buffer = buffer.concat(coinjs.numToBytes(txout.value,8));
				var scriptBytes = txout.script.buffer;
				buffer = buffer.concat(coinjs.numToVarInt(scriptBytes.length));
				buffer = buffer.concat(scriptBytes);
			}

			buffer = buffer.concat(coinjs.numToBytes(parseInt(this.lock_time),4));
			return Crypto.util.bytesToHex(buffer);
		}

		/* deserialize a transaction */
		r.deserialize = function(buffer){
			if (typeof buffer == "string") {
				buffer = Crypto.util.hexToBytes(buffer)
			}

			var pos = 0;
			var readAsInt = function(bytes) {
				if (bytes == 0) return 0;
				pos++;
				return buffer[pos-1] + readAsInt(bytes-1) * 256;
			}

			var readVarInt = function() {
				pos++;
				if (buffer[pos-1] < 253) {
					return buffer[pos-1];
				}
				return readAsInt(buffer[pos-1] - 251);
			}

			var readBytes = function(bytes) {
				pos += bytes;
				return buffer.slice(pos - bytes, pos);
			}

			var readVarString = function() {
				var size = readVarInt();
				return readBytes(size);
			}

			var obj = new coinjs.transaction();

			obj.version = readAsInt(4);
			var ins = readVarInt();
			for (var i = 0; i < ins; i++) {
				obj.ins.push({
					outpoint: {
						hash: Crypto.util.bytesToHex(readBytes(32).reverse()),
 						index: readAsInt(4)
					},
					script: coinjs.script(readVarString()),
					sequence: readAsInt(4)
				});
			}

			var outs = readVarInt();
			for (var i = 0; i < outs; i++) {
				obj.outs.push({
					value: coinjs.bytesToNum(readBytes(8)),
					script: coinjs.script(readVarString())
				});
			}

 			obj.lock_time = readAsInt(4);
			return obj;
		}

		r.size = function(){
			return ((this.serialize()).length/2).toFixed(0);
		}

		return r;
	}

	/* start of signature vertification functions */

	coinjs.verifySignature = function (hash, sig, pubkey) {

		function parseSig (sig) {
			var cursor;
			if (sig[0] != 0x30)
				throw new Error("Signature not a valid DERSequence");

			cursor = 2;
			if (sig[cursor] != 0x02)
				throw new Error("First element in signature must be a DERInteger"); ;

			var rBa = sig.slice(cursor + 2, cursor + 2 + sig[cursor + 1]);

			cursor += 2 + sig[cursor + 1];
			if (sig[cursor] != 0x02)
				throw new Error("Second element in signature must be a DERInteger");

			var sBa = sig.slice(cursor + 2, cursor + 2 + sig[cursor + 1]);

			cursor += 2 + sig[cursor + 1];

			var r = BigInteger.fromByteArrayUnsigned(rBa);
			var s = BigInteger.fromByteArrayUnsigned(sBa);

			return { r: r, s: s };
		}

		var r, s;

		if (coinjs.isArray(sig)) {
			var obj = parseSig(sig);
			r = obj.r;
			s = obj.s;
		} else if ("object" === typeof sig && sig.r && sig.s) {
			r = sig.r;
			s = sig.s;
		} else {
			throw "Invalid value for signature";
		}

		var Q;
		if (coinjs.isArray(pubkey)) {
			var ecparams = EllipticCurve.getSECCurveByName("secp256k1");
			Q = EllipticCurve.PointFp.decodeFrom(ecparams.getCurve(), pubkey);
		} else {
			throw "Invalid format for pubkey value, must be byte array";
		}
		var e = BigInteger.fromByteArrayUnsigned(hash);

		return coinjs.verifySignatureRaw(e, r, s, Q);
	}

	coinjs.verifySignatureRaw = function (e, r, s, Q) {
		var ecparams = EllipticCurve.getSECCurveByName("secp256k1");
		var n = ecparams.getN();
		var G = ecparams.getG();

		if (r.compareTo(BigInteger.ONE) < 0 || r.compareTo(n) >= 0)
			return false;

		if (s.compareTo(BigInteger.ONE) < 0 || s.compareTo(n) >= 0)
			return false;

		var c = s.modInverse(n);

		var u1 = e.multiply(c).mod(n);
		var u2 = r.multiply(c).mod(n);

		var point = G.multiply(u1).add(Q.multiply(u2));

		var v = point.getX().toBigInteger().mod(n);

		return v.equals(r);
	}

	/* start of privates functions */

	/* base58 encode function */
	coinjs.base58encode = function(buffer) {
		var alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
		var base = BigInteger.valueOf(58);

		var bi = BigInteger.fromByteArrayUnsigned(buffer);
		var chars = [];

		while (bi.compareTo(base) >= 0) {
			var mod = bi.mod(base);
			chars.unshift(alphabet[mod.intValue()]);
			bi = bi.subtract(mod).divide(base);
		}

		chars.unshift(alphabet[bi.intValue()]);
		for (var i = 0; i < buffer.length; i++) {
			if (buffer[i] == 0x00) {
				chars.unshift(alphabet[0]);
			} else break;
		}
		return chars.join('');
	}

	/* base58 decode function */
	coinjs.base58decode = function(buffer){
		var alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
		var base = BigInteger.valueOf(58);
		var validRegex = /^[1-9A-HJ-NP-Za-km-z]+$/;

		var bi = BigInteger.valueOf(0);
		var leadingZerosNum = 0;
		for (var i = buffer.length - 1; i >= 0; i--) {
			var alphaIndex = alphabet.indexOf(buffer[i]);
			if (alphaIndex < 0) {
				throw "Invalid character";
			}
			bi = bi.add(BigInteger.valueOf(alphaIndex).multiply(base.pow(buffer.length - 1 - i)));

			if (buffer[i] == "1") leadingZerosNum++;
			else leadingZerosNum = 0;
		}

		var bytes = bi.toByteArrayUnsigned();
		while (leadingZerosNum-- > 0) bytes.unshift(0);
		return bytes;		
	}

	/* raw ajax function to avoid needing bigger frame works like jquery, mootools etc */
	coinjs.ajax = function(u, f, m, a){
		var x = false;
		try{
			x = new ActiveXObject('Msxml2.XMLHTTP')
		} catch(e) {
			try {
				x = new ActiveXObject('Microsoft.XMLHTTP')
			} catch(e) {
				x = new XMLHttpRequest()
			}
		}

		if(x==false) {
			return false;
		}

		x.open(m, u, true);
		x.onreadystatechange=function(){
			if((x.readyState==4) && f)
				f(x.responseText);
		};

		if(m == 'POST'){
			x.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		}

		x.send(a);
	}

	/* clone an object */
	coinjs.clone = function(obj) {
		if(obj == null || typeof(obj) != 'object') return obj;
		var temp = obj.constructor();

		for(var key in obj) {
			if(obj.hasOwnProperty(key)) {
				temp[key] = coinjs.clone(obj[key]);
			}
		}
 		return temp;
	}

	coinjs.numToBytes = function(num,bytes) {
		if (typeof bytes === undefined) bytes = 8;
		if (bytes == 0) { 
			return [];
		} else {
			return [num % 256].concat(coinjs.numToBytes(Math.floor(num / 256),bytes-1));
		}
	}

	coinjs.numToVarInt = function(num) {
		if (num < 253) {
			return [num];
		} else if (num < 65536) {
			return [253].concat(coinjs.numToBytes(num,2));
		} else if (num < 4294967296) {
			return [254].concat(coinjs.numToBytes(num,4));
		} else {
			return [253].concat(coinjs.numToBytes(num,8));
		}
	}

	coinjs.bytesToNum = function(bytes) {
		if (bytes.length == 0) return 0;
		else return bytes[0] + 256 * coinjs.bytesToNum(bytes.slice(1));
	}

	coinjs.uint = function(f, size) {
		if (f.length < size)
			throw new Error("not enough data");
		var n = 0;
		for (var i = 0; i < size; i++) {
			n *= 256;
			n += f[i];
		}
		return n;
	}

	coinjs.isArray = function(o){
		return Object.prototype.toString.call(o) === '[object Array]';
	}

	coinjs.countObject = function(obj){
		var count = 0;
		var i;
		for (i in obj) {
			if (obj.hasOwnProperty(i)) {
				count++;
			}
		}
		return count;
	}

	coinjs.random = function(length) {
		var r = "";
		var l = length || 25;
		var chars = "!$%^&*()_+{}:@~?><|\./;'#][=-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		for(x=0;x<l;x++) {
			r += chars.charAt(Math.floor(Math.random() * 62));
		}
		return r;
	}

})();






$(document).ready(function() {

	/* open wallet code */

	var explorer_tx = "https://coinb.in/tx/"
	var explorer_addr = "https://coinb.in/addr/"
	var explorer_block = "https://coinb.in/block/"

	var wallet_timer = false;

	$('#up').on('click', function(e){
		user.create($('#alias').val(), $('#pass').val());
	});
  
	$('#sign').on('submit', function(e){
		e.preventDefault();
		user.auth($('#alias').val(), $('#pass').val());
		user.get('wallet').get("status").put("good")

	});

	$('#said').on('submit', function(e){
		e.preventDefault();
		if(!user.is){ return }
		user.get('wallet').get("status").put("good")
	});

	gun.on('auth', function(){
		$('#sign').hide();
		// not working
		user.get('wallet').get("status").on(v => {
			console.log(v)
		})

		var alias = $('#alias').val();
		var pass = $('#pass').val();
		var s = alias;
		s += '|'+pass+'|';
		s += s.length+'|!@'+((pass.length*7)+alias.length)*7;
		var regchars = (pass.match(/[a-z]+/g)) ? pass.match(/[a-z]+/g).length : 1;
		var regupchars = (pass.match(/[A-Z]+/g)) ? pass.match(/[A-Z]+/g).length : 1;
		var regnums = (pass.match(/[0-9]+/g)) ? pass.match(/[0-9]+/g).length : 1;
		s += ((regnums+regchars)+regupchars)*pass.length+'3571';
		s += (s+''+s);

		for(i=0;i<=50;i++){
			s = Crypto.SHA256(s);
		}

				coinjs.compressed = true;
					var keys = coinjs.newKeys(s);
					var address = keys.address;
					var wif = keys.wif;
					var pubkey = keys.pubkey;
					var privkeyaes = CryptoJS.AES.encrypt(keys.wif, pass);

					$("#walletKeys .walletSegWitRS").addClass("hidden");
					if($("#walletSegwit").is(":checked")){
						if($("#walletSegwitBech32").is(":checked")){
							var sw = coinjs.bech32Address(pubkey);
							address = sw.address;
						} else {

							var sw = coinjs.segwitAddress(pubkey);
							address = sw.address;
						}

						$("#walletKeys .walletSegWitRS").removeClass("hidden");
						$("#walletKeys .walletSegWitRS input:text").val(sw.redeemscript);
					}

					$("#walletAddress").html(address);
					$("#walletHistory").attr('href',explorer_addr+address);

					$("#walletQrCode").html("");
					var qrcode = new QRCode("walletQrCode");
					qrcode.makeCode("bitcoin:"+address);

					$("#walletKeys .privkey").val(wif);
					$("#walletKeys .pubkey").val(pubkey);
					$("#walletKeys .privkeyaes").val(privkeyaes);

					$("#openLogin").hide();
					$("#openWallet").removeClass("hidden").show();

					walletBalance();
	});

	$("#walletLogout").click(function(){
		$("#openEmail").val("");
		$("#openPass").val("");
		$("#openPassConfirm").val("");

		$("#openLogin").show();
		$("#openWallet").addClass("hidden").show();

		$("#walletAddress").html("");
		$("#walletHistory").attr('href','https://btc.blockr.io/address/info/');

		$("#walletQrCode").html("");
		var qrcode = new QRCode("walletQrCode");
		qrcode.makeCode("bitcoin:");

		$("#walletKeys .privkey").val("");
		$("#walletKeys .pubkey").val("");

	});

	$("#walletShowKeys").click(function(){
		$("#walletKeys").removeClass("hidden");
		$("#walletSpend").removeClass("hidden").addClass("hidden");
	});

	$("#walletBalance").click(function(){
		walletBalance();
	});

	$("#walletConfirmSend").click(function(){
		var thisbtn = $(this);
		var tx = coinjs.transaction();
		var txfee = $("#txFee");
		var devaddr = coinjs.developer;
		var devamount = $("#developerDonation");

		if((devamount.val()*1)>0){
			tx.addoutput(devaddr, devamount.val()*1);
		}

		var total = (devamount.val()*1) + (txfee.val()*1);

		$.each($("#walletSpendTo .output"), function(i,o){
			var addr = $('.addressTo',o);
			var amount = $('.amount',o);
			total += amount.val()*1;
			tx.addoutput(addr.val(), amount.val()*1);
		});

		thisbtn.attr('disabled',true);

		tx.addUnspent($("#walletAddress").html(), function(data){
			var dvalue = data.value/100000000
			if(dvalue>=total){
				var change = dvalue-total;
				if(change>0){
					tx.addoutput($("#walletAddress").html(), change);
				}

				// clone the transaction with out using coinjs.clone() function as it gives us trouble
				var tx2 = coinjs.transaction(); 
				var txunspent = tx2.deserialize(tx.serialize()); 

				// then sign
				var signed = txunspent.sign($("#walletKeys .privkey").val());

				// and finally broadcast!
				tx2.broadcast(function(data){
					if($(data).find("result").text()=="1"){
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html("txid: "+$(data).find("txid").text());
					} else {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html(unescape($(data).find("response").text()).replace(/\+/g,' '));
						thisbtn.attr('disabled',false);
					}

					// update wallet balance
					walletBalance();

				}, signed);
			} else {
				$("#walletSendConfirmStatus").removeClass("hidden").addClass('alert-danger').html("You have a confirmed balance of "+data.value+" BTC unable to send "+total+" BTC").fadeOut().fadeIn();
				thisbtn.attr('disabled',false);
			}

			$("#walletLoader").addClass("hidden");
		});
	});

	$("#walletSendBtn").click(function(){

		$("#walletSendStatus").addClass("hidden").html("");

		var thisbtn = $(this);
		var txfee = $("#txFee");
		var devamount = $("#developerDonation");

		if((!isNaN(devamount.val())) && devamount.val()>=0){
			$(devamount).parent().removeClass('has-error');
		} else {
			$(devamount).parent().addClass('has-error')
		}

		if((!isNaN(txfee.val())) && txfee.val()>=0){
			$(txfee).parent().removeClass('has-error');
		} else {
			$(txfee).parent().addClass('has-error');
		}

		var total = (devamount.val()*1) + (txfee.val()*1);

		$.each($("#walletSpendTo .output"), function(i,o){
			var amount = $('.amount',o);
			var address = $('.addressTo',o);

			total += amount.val()*1;

			if((!isNaN($(amount).val())) && $(amount).val()>0){
				$(amount).parent().removeClass('has-error');
			} else {
				$(amount).parent().addClass('has-error');			
			}

			if(coinjs.addressDecode($(address).val())){
				$(address).parent().removeClass('has-error');
			} else {
				$(address).parent().addClass('has-error');
			}
		});

		total = total.toFixed(8);

		if($("#walletSpend .has-error").length==0){
			var balance = ($("#walletBalance").html()).replace(/[^0-9\.]+/g,'')*1;
			if(total<=balance){
				$("#walletSendConfirmStatus").addClass("hidden").removeClass('alert-success').removeClass('alert-danger').html("");
				$("#spendAmount").html(total);
				$("#modalWalletConfirm").modal("show");
				$("#walletConfirmSend").attr('disabled',false);
			} else {
				$("#walletSendStatus").removeClass("hidden").html("You are trying to spend "+total+' but have a balance of '+balance);
			}
		} else {
			$("#walletSpend .has-error").fadeOut().fadeIn();
			$("#walletSendStatus").removeClass("hidden").html('<span class="glyphicon glyphicon-exclamation-sign"></span> One or more input has an error');
		}
	});

	$("#walletShowSpend").click(function(){
		$("#walletSpend").removeClass("hidden");
		$("#walletKeys").removeClass("hidden").addClass("hidden");
	});

	$("#walletSpendTo .addressAdd").click(function(){
		var clone = '<div class="form-horizontal output">'+$(this).parent().html()+'</div>';
		$("#walletSpendTo").append(clone);
		$("#walletSpendTo .glyphicon-plus:last").removeClass('glyphicon-plus').addClass('glyphicon-minus');
		$("#walletSpendTo .glyphicon-minus:last").parent().removeClass('addressAdd').addClass('addressRemove');
		$("#walletSpendTo .addressRemove").unbind("");
		$("#walletSpendTo .addressRemove").click(function(){
			$(this).parent().fadeOut().remove();
		});
	});

	function walletBalance(){
		var tx = coinjs.transaction();
		$("#walletLoader").removeClass("hidden");
		coinjs.addressBalance($("#walletAddress").html(),function(data){
			if($(data).find("result").text()==1){
				var v = $(data).find("balance").text()/100000000;
				$("#walletBalance").html(v+" BTC").attr('rel',v).fadeOut().fadeIn();
			} else {
				$("#walletBalance").html("0.00 BTC").attr('rel',v).fadeOut().fadeIn();
			}

			$("#walletLoader").addClass("hidden");
		});
	}

	function checkBalanceLoop(){
		setTimeout(function(){
			walletBalance();
			checkBalanceLoop();
		},45000);
	}

	/* new -> address code */

	$("#newKeysBtn").click(function(){
		coinjs.compressed = false;
		if($("#newCompressed").is(":checked")){
			coinjs.compressed = true;
		}
		var s = ($("#newBrainwallet").is(":checked")) ? $("#brainwallet").val() : null;
		var coin = coinjs.newKeys(s);
		$("#newBitcoinAddress").val(coin.address);
		$("#newPubKey").val(coin.pubkey);
		$("#newPrivKey").val(coin.wif);

		/* encrypted key code */
		if((!$("#encryptKey").is(":checked")) || $("#aes256pass").val()==$("#aes256pass_confirm").val()){
			$("#aes256passStatus").addClass("hidden");
			if($("#encryptKey").is(":checked")){
				$("#aes256wifkey").removeClass("hidden");
			}
		} else {
			$("#aes256passStatus").removeClass("hidden");
		}
		$("#newPrivKeyEnc").val(CryptoJS.AES.encrypt(coin.wif, $("#aes256pass").val())+'');

	});

	$("#newBrainwallet").click(function(){
		if($(this).is(":checked")){
			$("#brainwallet").removeClass("hidden");
		} else {
			$("#brainwallet").addClass("hidden");
		}
	});

	$("#encryptKey").click(function(){
		if($(this).is(":checked")){
			$("#aes256passform").removeClass("hidden");
		} else {
			$("#aes256wifkey, #aes256passform, #aes256passStatus").addClass("hidden");
		}
	});

	/* new -> multisig code */

	$("#newMultiSigAddress").click(function(){

		$("#multiSigData").removeClass('show').addClass('hidden').fadeOut();
		$("#multisigPubKeys .pubkey").parent().removeClass('has-error');
		$("#releaseCoins").parent().removeClass('has-error');
		$("#multiSigErrorMsg").hide();

		if((isNaN($("#releaseCoins option:selected").html())) || ((!isNaN($("#releaseCoins option:selected").html())) && ($("#releaseCoins option:selected").html()>$("#multisigPubKeys .pubkey").length || $("#releaseCoins option:selected").html()*1<=0 || $("#releaseCoins option:selected").html()*1>8))){
			$("#releaseCoins").parent().addClass('has-error');
			$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Minimum signatures required is greater than the amount of public keys provided').fadeIn();
			return false;
		}

		var keys = [];
		$.each($("#multisigPubKeys .pubkey"), function(i,o){
			if(coinjs.pubkeydecompress($(o).val())){
				keys.push($(o).val());
				$(o).parent().removeClass('has-error');
			} else {
				$(o).parent().addClass('has-error');
			}
		});

		if(($("#multisigPubKeys .pubkey").parent().hasClass('has-error')==false) && $("#releaseCoins").parent().hasClass('has-error')==false){
			var sigsNeeded = $("#releaseCoins option:selected").html();
			var multisig =  coinjs.pubkeys2MultisigAddress(keys, sigsNeeded);
			$("#multiSigData .address").val(multisig['address']);
			$("#multiSigData .script").val(multisig['redeemScript']);
			$("#multiSigData .scriptUrl").val(document.location.origin+''+document.location.pathname+'?verify='+multisig['redeemScript']+'#verify');
			$("#multiSigData").removeClass('hidden').addClass('show').fadeIn();
			$("#releaseCoins").removeClass('has-error');
		} else {
			$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> One or more public key is invalid!').fadeIn();
		}
	});

	$("#multisigPubKeys .pubkeyAdd").click(function(){
		if($("#multisigPubKeys .pubkeyRemove").length<14){
			var clone = '<div class="form-horizontal">'+$(this).parent().html()+'</div>';
			$("#multisigPubKeys").append(clone);
			$("#multisigPubKeys .glyphicon-plus:last").removeClass('glyphicon-plus').addClass('glyphicon-minus');
			$("#multisigPubKeys .glyphicon-minus:last").parent().removeClass('pubkeyAdd').addClass('pubkeyRemove');
			$("#multisigPubKeys .pubkeyRemove").unbind("");
			$("#multisigPubKeys .pubkeyRemove").click(function(){
				$(this).parent().fadeOut().remove();
			});
		}
	});

	$("#mediatorList").change(function(){
		var data = ($(this).val()).split(";");
		$("#mediatorPubkey").val(data[0]);
		$("#mediatorEmail").val(data[1]);
		$("#mediatorFee").val(data[2]);
	}).change();

	$("#mediatorAddKey").click(function(){
		var count = 0;
		var len = $(".pubkeyRemove").length;
		if(len<14){
			$.each($("#multisigPubKeys .pubkey"),function(i,o){
				if($(o).val()==''){
					$(o).val($("#mediatorPubkey").val()).fadeOut().fadeIn();
					$("#mediatorClose").click();
					return false;
				} else if(count==len){
					$("#multisigPubKeys .pubkeyAdd").click();
					$("#mediatorAddKey").click();
					return false;
				}
				count++;
			});

			$("#mediatorClose").click();
		}
	});

	/* new -> mandatory multisig code */

	$("#newMandatoryMultiSigAddress").click(function(){

		$("#m_multiSigData").removeClass('show').addClass('hidden').fadeOut();
		$("#m_multisigPubKeys .pubkey").parent().removeClass('has-error');
		$("#m_multisigMandatoryPubKeys .pubkey").parent().removeClass('has-error');
		$("#m_releaseCoins").parent().removeClass('has-error');
		$("#m_multiSigErrorMsg").hide();

		if((isNaN($("#m_releaseCoins option:selected").html())) || ((!isNaN($("#m_releaseCoins option:selected").html())) && ($("#m_releaseCoins option:selected").html()>$("#m_multisigPubKeys .pubkey").length || $("#m_releaseCoins option:selected").html()*1<=0 || $("#m_releaseCoins option:selected").html()*1>8))){
			$("#m_releaseCoins").parent().addClass('has-error');
			$("#m_multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Minimum signatures required is greater than the amount of public keys provided').fadeIn();
			return false;
		}

		var keys = [];
		$.each($("#m_multisigPubKeys .pubkey"), function(i,o){
			if(coinjs.pubkeydecompress($(o).val())){
				keys.push($(o).val());
				$(o).parent().removeClass('has-error');
			} else {
				$(o).parent().addClass('has-error');
			}
		});

		var mandatoryKeys = [];
		$.each($("#m_multisigMandatoryPubKeys .pubkey"), function(i,o){
			if(coinjs.pubkeydecompress($(o).val())){
				mandatoryKeys.push($(o).val());
				$(o).parent().removeClass('has-error');
			} else {
				$(o).parent().addClass('has-error');
			}
		});

		if(keys.length + mandatoryKeys.length > 15){
			$("#m_multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Too many keys. Sum of all keys must be less or equal to 15.').fadeIn();
			return false;
		}

		if($("#m_multisigPubKeys .pubkey").parent().hasClass('has-error')==false
		&& $("#m_multisigMandatoryPubKeys .pubkey").parent().hasClass('has-error')==false
		&& $("#m_releaseCoins").parent().hasClass('has-error')==false){
			var sigsNeeded = $("#m_releaseCoins option:selected").html();
			var m_multisig =  coinjs.pubkeysAndMandatory2MultisigAddress(mandatoryKeys, keys, sigsNeeded);
			$("#m_multiSigData .address").val(m_multisig['address']);
			$("#m_multiSigData .script").val(m_multisig['redeemScript']);
			$("#m_multiSigData .scriptUrl").val(document.location.origin+''+document.location.pathname+'?verify='+m_multisig['redeemScript']+'#verify');
			$("#m_multiSigData").removeClass('hidden').addClass('show').fadeIn();
			$("#m_releaseCoins").removeClass('has-error');
		} else {
			$("#m_multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> One or more public key is invalid!').fadeIn();
		}
	});

	$("#m_multisigPubKeys .pubkeyAdd").click(function(){
		if($("#m_multisigPubKeys .pubkeyRemove").length<14){
			var clone = '<div class="form-horizontal">'+$(this).parent().html()+'</div>';
			$("#m_multisigPubKeys").append(clone);
			$("#m_multisigPubKeys .glyphicon-plus:last").removeClass('glyphicon-plus').addClass('glyphicon-minus');
			$("#m_multisigPubKeys .glyphicon-minus:last").parent().removeClass('pubkeyAdd').addClass('pubkeyRemove');
			$("#m_multisigPubKeys .pubkeyRemove").unbind("");
			$("#m_multisigPubKeys .pubkeyRemove").click(function(){
				$(this).parent().fadeOut().remove();
			});
		}
	});

	$("#m_multisigMandatoryPubKeys .pubkeyAdd").click(function(){
		var clone = '<div class="form-horizontal">'+$(this).parent().html()+'</div>';
		$("#m_multisigMandatoryPubKeys").append(clone);
		$("#m_multisigMandatoryPubKeys .glyphicon-plus:last").removeClass('glyphicon-plus').addClass('glyphicon-minus');
		$("#m_multisigMandatoryPubKeys .glyphicon-minus:last").parent().removeClass('pubkeyAdd').addClass('pubkeyRemove');
		$("#m_multisigMandatoryPubKeys .pubkeyRemove").unbind("");
		$("#m_multisigMandatoryPubKeys .pubkeyRemove").click(function(){
			$(this).parent().fadeOut().remove();
		});
	});


	/* new -> Hd address code */

	$(".deriveHDbtn").click(function(){
		$("#verifyScript").val($("input[type='text']",$(this).parent().parent()).val());
		window.location = "#verify";
		$("#verifyBtn").click();
	});

	$("#newHDKeysBtn").click(function(){
		coinjs.compressed = true;
		var s = ($("#newHDBrainwallet").is(":checked")) ? $("#HDBrainwallet").val() : null;
		var hd = coinjs.hd();
		var pair = hd.master(s);
		$("#newHDxpub").val(pair.pubkey);
		$("#newHDxprv").val(pair.privkey);

	});

	$("#newHDBrainwallet").click(function(){
		if($(this).is(":checked")){
			$("#HDBrainwallet").removeClass("hidden");
		} else {
			$("#HDBrainwallet").addClass("hidden");
		}
	});

	/* new -> transaction code */

	$("#recipients .addressAddTo").click(function(){
		if($("#recipients .addressRemoveTo").length<19){
			var clone = '<div class="row recipient"><br>'+$(this).parent().parent().html()+'</div>';
			$("#recipients").append(clone);
			$("#recipients .glyphicon-plus:last").removeClass('glyphicon-plus').addClass('glyphicon-minus');
			$("#recipients .glyphicon-minus:last").parent().removeClass('addressAdd').addClass('addressRemoveTo');
			$("#recipients .addressRemoveTo").unbind("");
			$("#recipients .addressRemoveTo").click(function(){
				$(this).parent().parent().fadeOut().remove();
				validateOutputAmount();
			});
			validateOutputAmount();
		}
	});

	$("#inputs .txidAdd").click(function(){
		var clone = '<div class="row inputs"><br>'+$(this).parent().parent().html()+'</div>';
		$("#inputs").append(clone);
		$("#inputs .txidClear:last").remove();
		$("#inputs .glyphicon-plus:last").removeClass('glyphicon-plus').addClass('glyphicon-minus');
		$("#inputs .glyphicon-minus:last").parent().removeClass('txidAdd').addClass('txidRemove');
		$("#inputs .txidRemove").unbind("");
		$("#inputs .txidRemove").click(function(){
			$(this).parent().parent().fadeOut().remove();
			totalInputAmount();
		});
		$("#inputs .row:last input").attr('disabled',false);

		$("#inputs .txIdAmount").unbind("").change(function(){
			totalInputAmount();
		}).keyup(function(){
			totalInputAmount();
		});

	});

	$("#transactionBtn").click(function(){
		var tx = coinjs.transaction();

		$("#transactionCreate, #transactionCreateStatus").addClass("hidden");

		if(($("#nLockTime").val()).match(/^[0-9]+$/g)){
			tx.lock_time = $("#nLockTime").val()*1;
		}

		$("#inputs .row").removeClass('has-error');

		$('#putTabs a[href="#txinputs"], #putTabs a[href="#txoutputs"]').attr('style','');

		$.each($("#inputs .row"), function(i,o){
			if(!($(".txId",o).val()).match(/^[a-f0-9]+$/i)){
				$(o).addClass("has-error");
			} else if((!($(".txIdScript",o).val()).match(/^[a-f0-9]+$/i)) && $(".txIdScript",o).val()!=""){
				$(o).addClass("has-error");
			} else if (!($(".txIdN",o).val()).match(/^[0-9]+$/i)){
				$(o).addClass("has-error");
			}

			if(!$(o).hasClass("has-error")){
				tx.addinput($(".txId",o).val(), $(".txIdN",o).val(), $(".txIdScript",o).val());
			} else {
				$('#putTabs a[href="#txinputs"]').attr('style','color:#a94442;');
			}
		});

		$("#recipients .row").removeClass('has-error');

		$.each($("#recipients .row"), function(i,o){
			var a = ($(".address",o).val());
			var ad = coinjs.addressDecode(a);
			if(((a!="") && (ad.version == coinjs.pub || ad.version == coinjs.multisig)) && $(".amount",o).val()!=""){ // address
				tx.addoutput(a, $(".amount",o).val());
			} else if (((a!="") && ad.version === 42) && $(".amount",o).val()!=""){ // stealth address
				tx.addstealth(ad, $(".amount",o).val());
			} else if (((($("#opReturn").is(":checked")) && a.match(/^[a-f0-9]+$/ig)) && a.length<160) && (a.length%2)==0) { // data
				tx.adddata(a);
			} else { // neither address nor data
				$(o).addClass('has-error');
				$('#putTabs a[href="#txoutputs"]').attr('style','color:#a94442;');
			}
		});


		if(!$("#recipients .row, #inputs .row").hasClass('has-error')){
			$("#transactionCreate textarea").val(tx.serialize());
			$("#transactionCreate .txSize").html(tx.size());

			$("#transactionCreate").removeClass("hidden");

			if($("#transactionFee").val()>=0.01){
				$("#modalWarningFeeAmount").html($("#transactionFee").val());
				$("#modalWarningFee").modal("show");
			}
		} else {
			$("#transactionCreateStatus").removeClass("hidden").html("One or more input or output is invalid").fadeOut().fadeIn();
		}
	});

	$(".txidClear").click(function(){
		$("#inputs .row:first input").attr('disabled',false);
		$("#inputs .row:first input").val("");
		totalInputAmount();
	});

	$("#inputs .txIdAmount").unbind("").change(function(){
		totalInputAmount();
	}).keyup(function(){
		totalInputAmount();
	});

	/* code for the qr code scanner */

	$(".qrcodeScanner").click(function(){
		if ((typeof MediaStreamTrack === 'function') && typeof MediaStreamTrack.getSources === 'function'){
			MediaStreamTrack.getSources(function(sourceInfos){
				var f = 0;
				$("select#videoSource").html("");
				for (var i = 0; i !== sourceInfos.length; ++i) {
					var sourceInfo = sourceInfos[i];
					var option = document.createElement('option');
					option.value = sourceInfo.id;
					if (sourceInfo.kind === 'video') {
						option.text = sourceInfo.label || 'camera ' + ($("select#videoSource options").length + 1);
						$(option).appendTo("select#videoSource");
 					}
				}
			});

			$("#videoSource").unbind("change").change(function(){
				scannerStart()
			});

		} else {
			$("#videoSource").addClass("hidden");
		}
		scannerStart();
		$("#qrcode-scanner-callback-to").html($(this).attr('forward-result'));
	});

	function scannerStart(){
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || false;
		if(navigator.getUserMedia){
			if (!!window.stream) {
				$("video").attr('src',null);
				window.stream.stop();
  			}

			var videoSource = $("select#videoSource").val();
			var constraints = {
				video: {
					optional: [{sourceId: videoSource}]
				}
			};

			navigator.getUserMedia(constraints, function(stream){
				window.stream = stream; // make stream available to console
				var videoElement = document.querySelector('video');
				videoElement.src = window.URL.createObjectURL(stream);
				videoElement.play();
			}, function(error){ });

			QCodeDecoder().decodeFromCamera(document.getElementById('videoReader'), function(er,data){
				if(!er){
					var match = data.match(/^bitcoin\:([13][a-z0-9]{26,33})/i);
					var result = match ? match[1] : data;
					$(""+$("#qrcode-scanner-callback-to").html()).val(result);
					$("#qrScanClose").click();
				}
			});
		} else {
			$("#videoReaderError").removeClass("hidden");
			$("#videoReader, #videoSource").addClass("hidden");
		}
	}

	/* redeem from button code */

	$("#redeemFromBtn").click(function(){
		var redeem = redeemingFrom($("#redeemFrom").val());

		$("#redeemFromStatus, #redeemFromAddress").addClass('hidden');

		if(redeem.from=='multisigAddress'){
			$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> You should use the redeem script, not the multisig address!');
			return false;
		}

		if(redeem.from=='other'){
			$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> The address or multisig redeem script you have entered is invalid');
			return false;
		}

		if($("#clearInputsOnLoad").is(":checked")){
			$("#inputs .txidRemove, #inputs .txidClear").click();
		}

		$("#redeemFromBtn").html("Please wait, loading...").attr('disabled',true);

		var host = $(this).attr('rel');
		if(host=='blockr.io_bitcoinmainnet'){
			listUnspentBlockrio_BitcoinMainnet(redeem);
		} else if(host=='chain.so_litecoin'){
			listUnspentChainso_Litecoin(redeem);
		} else {
			listUnspentDefault(redeem);
		}
	});

	/* function to determine what we are redeeming from */
	function redeemingFrom(string){
		var r = {};
		var decode = coinjs.addressDecode(string);
		if(decode.version == coinjs.pub){ // regular address
			r.addr = string;
			r.from = 'address';
			r.isMultisig = false;
		} else if (decode.version == coinjs.priv){ // wif key
			var a = coinjs.wif2address(string);
			r.addr = a['address'];
			r.from = 'wif';
			r.isMultisig = false;
		} else if (decode.version == coinjs.multisig){ // mulisig address
			r.addr = '';
			r.from = 'multisigAddress';
			r.isMultisig = false;
		} else {
			var script = coinjs.script();
			var decodeRs = script.decodeRedeemScript(string);
			if(decodeRs){ // redeem script
				r.addr = decodeRs['address'];
				r.from = 'redeemScript';
				r.decodedRs = decodeRs;
				r.isMultisig = true;
			} else { // something else
				r.addr = '';
				r.from = 'other';
				r.isMultisig = false;
			}
		}
		return r;
	}

	/* mediator payment code for when you used a public key */
	function mediatorPayment(redeem){

		if(redeem.from=="redeemScript"){

			$('#recipients .row[rel="'+redeem.addr+'"]').parent().remove();

			$.each(redeem.decodedRs.pubkeys, function(i, o){
				$.each($("#mediatorList option"), function(mi, mo){

					var ms = ($(mo).val()).split(";");

					var pubkey = ms[0]; // mediators pubkey
					var fee = ms[2]*1; // fee in a percentage
					var payto = coinjs.pubkey2address(pubkey); // pay to mediators address

					if(o==pubkey){ // matched a mediators pubkey?

						var clone = '<span><div class="row recipients mediator mediator_'+pubkey+'" rel="'+redeem.addr+'">'+$("#recipients .addressAddTo").parent().parent().html()+'</div><br></span>';
						$("#recipients").prepend(clone);

						$("#recipients .mediator_"+pubkey+" .glyphicon-plus:first").removeClass('glyphicon-plus');
						$("#recipients .mediator_"+pubkey+" .address:first").val(payto).attr('disabled', true).attr('readonly',true).attr('title','Medation fee for '+$(mo).html());

						var amount = ((fee*$("#totalInput").html())/100).toFixed(8);
						$("#recipients .mediator_"+pubkey+" .amount:first").attr('disabled',(((amount*1)==0)?false:true)).val(amount).attr('title','Medation fee for '+$(mo).html());
					}
				});
			});

			validateOutputAmount();
		}
	}

	/* global function to add outputs to page */
	function addOutput(tx, n, script, amount) {
		if(tx){
			if($("#inputs .txId:last").val()!=""){
				$("#inputs .txidAdd").click();
			}

			$("#inputs .row:last input").attr('disabled',true);

			var txid = ((tx).match(/.{1,2}/g).reverse()).join("")+'';

			$("#inputs .txId:last").val(txid);
			$("#inputs .txIdN:last").val(n);
			$("#inputs .txIdAmount:last").val(amount);
			$("#inputs .txIdScript:last").val(script);
		}
	}

	/* default function to retreive unspent outputs*/	
	function listUnspentDefault(redeem){
		var tx = coinjs.transaction();
		tx.listUnspent(redeem.addr, function(data){
			if(redeem.addr) {
				$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://btc.blockr.io/address/info/'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');

				$.each($(data).find("unspent").children(), function(i,o){
					var tx = $(o).find("tx_hash").text();
					var n = $(o).find("tx_output_n").text();
					var script = (redeem.isMultisig==true) ? $("#redeemFrom").val() : $(o).find("script").text();
					var amount = (($(o).find("value").text()*1)/100000000).toFixed(8);

					addOutput(tx, n, script, amount);
				});
			}

			$("#redeemFromBtn").html("Load").attr('disabled',false);
			totalInputAmount();

			mediatorPayment(redeem);
		});
	}

	/* retrieve unspent data from blockrio for mainnet */
	function listUnspentBlockrio_BitcoinMainnet(redeem){
		$.ajax ({
			type: "POST",
			url: "https://btc.blockr.io/api/v1/address/unspent/"+redeem.addr+"?unconfirmed=1",
			dataType: "json",
			error: function(data) {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
			},
			success: function(data) {
				if((data.status && data.data) && data.status=='success'){
					$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://btc.blockr.io/address/info/'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
					for(var i in data.data.unspent){
						var o = data.data.unspent[i];
						var tx = o.tx;
						var n = o.n;
						var script = (redeem.isMultisig==true) ? $("#redeemFrom").val() : o.script;
						var amount = o.amount;
						addOutput(tx, n, script, amount);
					}
				} else {
					$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs.');
				}
			},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	/* retrieve unspent data from blockrio for litecoin */
	function listUnspentChainso_Litecoin(redeem){
		$.ajax ({
			type: "GET",
			url: "https://chain.so/api/v2/get_tx_unspent/ltc/"+redeem.addr,
			dataType: "json",
			error: function(data) {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
			},
			success: function(data) {
				console.log(data);
				if((data.status && data.data) && data.status=='success'){
					$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://btc.blockr.io/address/info/'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
					for(var i in data.data.txs){
						var o = data.data.txs[i];
						var tx = ((o.txid).match(/.{1,2}/g).reverse()).join("")+'';
						var n = o.output_no;
						var script = (redeem.isMultisig==true) ? $("#redeemFrom").val() : o.script_hex;
						var amount = o.value;
						addOutput(tx, n, script, amount);
					}
				} else {
					$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs.');
				}
			},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	/* math to calculate the inputs and outputs */

	function totalInputAmount(){
		$("#totalInput").html('0.00');
		$.each($("#inputs .txIdAmount"), function(i,o){
			if(isNaN($(o).val())){
				$(o).parent().addClass('has-error');
			} else {
				$(o).parent().removeClass('has-error');
				var f = 0;
				if(!isNaN($(o).val())){
					f += $(o).val()*1;
				}
				$("#totalInput").html((($("#totalInput").html()*1) + (f*1)).toFixed(8));
			}
		});
		totalFee();
	}

	function validateOutputAmount(){
		$("#recipients .amount").unbind('');
		$("#recipients .amount").keyup(function(){
			if(isNaN($(this).val())){
				$(this).parent().addClass('has-error');
			} else {
				$(this).parent().removeClass('has-error');
				var f = 0;
				$.each($("#recipients .amount"),function(i,o){
					if(!isNaN($(o).val())){
						f += $(o).val()*1;
					}
				});
				$("#totalOutput").html((f).toFixed(8));
			}
			totalFee();
		}).keyup();
	}

	function totalFee(){
		var fee = (($("#totalInput").html()*1) - ($("#totalOutput").html()*1)).toFixed(8);
		$("#transactionFee").val((fee>0)?fee:'0.00');
	}

	$("#optionsCollapse").click(function(){
		if($("#optionsAdvanced").hasClass('hidden')){
			$("#glyphcollapse").removeClass('glyphicon-collapse-down').addClass('glyphicon-collapse-up');
			$("#optionsAdvanced").removeClass("hidden");
		} else {
			$("#glyphcollapse").removeClass('glyphicon-collapse-up').addClass('glyphicon-collapse-down');
			$("#optionsAdvanced").addClass("hidden");
		}
	});

	/* broadcast a transaction */

	$("#rawSubmitBtn").click(function(){
		rawSubmitDefault(this);
	});

	// broadcast transaction vai coinbin (default)
	function rawSubmitDefault(btn){ 
		var thisbtn = btn;		
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		$.ajax ({
			type: "POST",
			url: coinjs.host+'?uid='+coinjs.uid+'&key='+coinjs.key+'&setmodule=bitcoin&request=sendrawtransaction',
			data: {'rawtx':$("#rawTransaction").val()},
			dataType: "xml",
			error: function(data) {
				$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(" There was an error submitting your request, please try again").prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			},
                        success: function(data) {
				$("#rawTransactionStatus").html(unescape($(data).find("response").text()).replace(/\+/g,' ')).removeClass('hidden');
				if($(data).find("result").text()==1){
					$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger');
					$("#rawTransactionStatus").html('txid: '+$(data).find("txid").text());
				} else {
					$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span> ');
				}
			},
			complete: function(data, status) {
				$("#rawTransactionStatus").fadeOut().fadeIn();
				$(thisbtn).val('Submit').attr('disabled',false);				
			}
		});
	}

	// broadcast transaction via blockr.io (mainnet)
	function rawSubmitBlockrio_BitcoinMainnet(thisbtn){ 
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		$.ajax ({
			type: "POST",
			url: "https://btc.blockr.io/api/v1/tx/push",
			data: {"hex":$("#rawTransaction").val()},
			dataType: "json",
			error: function(data) {
				var obj = $.parseJSON(data.responseText);
				var r = ' ';
				r += (obj.data) ? obj.data : '';
				r += (obj.message) ? ' '+obj.message : '';
				r = (r!='') ? r : ' Failed to broadcast'; // build response 
				$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			},
                        success: function(data) {
				var obj = $.parseJSON(data.responseText);
				if((obj.status && obj.data) && obj.status=='success'){
					$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(' Txid: '+obj.data);
				} else {
					$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
				}				
			},
			complete: function(data, status) {
				$("#rawTransactionStatus").fadeOut().fadeIn();
				$(thisbtn).val('Submit').attr('disabled',false);				
			}
		});
	}

	// broadcast transaction via blockr.io for litecoin
	function rawSubmitBlockrio_litecoin(thisbtn){ 
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		$.ajax ({
			type: "POST",
			url: "https://ltc.blockr.io/api/v1/tx/push",
			data: {"hex":$("#rawTransaction").val()},
			dataType: "json",
			error: function(data) {
				var obj = $.parseJSON(data.responseText);
				var r = ' ';
				r += (obj.data) ? obj.data : '';
				r += (obj.message) ? ' '+obj.message : '';
				r = (r!='') ? r : ' Failed to broadcast'; // build response 
				$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			},
                        success: function(data) {
				var obj = $.parseJSON(data.responseText);
				if((obj.status && obj.data) && obj.status=='success'){
					$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(' Txid: '+obj.data);
				} else {
					$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
				}
			},
			complete: function(data, status) {
				$("#rawTransactionStatus").fadeOut().fadeIn();
				$(thisbtn).val('Submit').attr('disabled',false);				
			}
		});
	}

	/* verify script code */

	$("#verifyBtn").click(function(){
		$(".verifyData").addClass("hidden");
		$("#verifyStatus").hide();
		if(!decodeRedeemScript()){
			if(!decodeTransactionScript()){
				if(!decodePrivKey()){
					if(!decodePubKey()){
						if(!decodeHDaddress()){
							$("#verifyStatus").removeClass('hidden').fadeOut().fadeIn();
						}
					}
				}
			}
		}

	});

	function decodeRedeemScript(){
		var script = coinjs.script();
		var decode = script.decodeRedeemScript($("#verifyScript").val());
		if(decode){
			$("#verifyRsData .multisigAddress").val(decode['address']);
			$("#verifyRsData .signaturesRequired").html(decode['signaturesRequired']);
			$("#verifyRsData table tbody").html("");
			for(var i=0;i<decode.pubkeys.length;i++){
				var pubkey = decode.pubkeys[i];
				var address = coinjs.pubkey2address(pubkey);
				$('<tr><td width="30%"><input type="text" class="form-control" value="'+address+'" readonly></td><td><input type="text" class="form-control" value="'+pubkey+'" readonly></td></tr>').appendTo("#verifyRsDataPubKeys tbody");
			}
			for(var i=0;i<decode.mandatorykeys.length;i++){
				var pubkey = decode.mandatorykeys[i];
				var address = coinjs.pubkey2address(pubkey);
				$('<tr><td width="30%"><input type="text" class="form-control" value="'+address+'" readonly></td><td><input type="text" class="form-control" value="'+pubkey+'" readonly></td></tr>').appendTo("#verifyRsDataMandatoryKeys tbody");
			}
			$("#verifyRsData").removeClass("hidden");
			$(".verifyLink").attr('href','?verify='+$("#verifyScript").val());

			if(decode.mandatorykeys.length>0){
				$("#verifyRsDataMandatory").removeClass("hidden");
			} else {
				$("#verifyRsDataMandatory").addClass("hidden");
			}

			return true;
		} else {
			return false;
		}
	}

	function decodeTransactionScript(){
		var tx = coinjs.transaction();
		try {
			var decode = tx.deserialize($("#verifyScript").val());
		//	console.log(decode);
			$("#verifyTransactionData .transactionVersion").html(decode['version']);
			$("#verifyTransactionData .transactionSize").html(decode.size()+' <i>bytes</i>');
			$("#verifyTransactionData .transactionLockTime").html(decode['lock_time']);
			$("#verifyTransactionData").removeClass("hidden");
			$("#verifyTransactionData tbody").html("");

			var h = '';
			$.each(decode.ins, function(i,o){
				var s = decode.extractScriptKey(i);
				h += '<tr>';
				h += '<td><input class="form-control" type="text" value="'+o.outpoint.hash+'" readonly></td>';
				h += '<td class="col-xs-1">'+o.outpoint.index+'</td>';
				h += '<td class="col-xs-2"><input class="form-control" type="text" value="'+Crypto.util.bytesToHex(o.script.buffer)+'" readonly></td>';
				h += '<td class="col-xs-1"> <span class="glyphicon glyphicon-'+((s.signed=='true')?'ok':'remove')+'-circle"></span>';
				if(s['type']=='multisig' && s['signatures']>=1){
					h += ' '+s['signatures'];
				}
				h += '</td>';
				h += '<td class="col-xs-1">';
				if(s['type']=='multisig'){
					var script = coinjs.script();
					var rs = script.decodeRedeemScript(s.script);
					if(rs['mandatorykeys'].length > 0) h += rs['mandatorykeys'].length + " and (";
					h += rs['signaturesRequired']+' of '+rs['pubkeys'].length;
					if(rs['mandatorykeys'].length > 0) h += ")";
				} else {
					h += '<span class="glyphicon glyphicon-remove-circle"></span>';
				}
				h += '</td>';
				h += '</tr>';
			});

			$(h).appendTo("#verifyTransactionData .ins tbody");

			h = '';
			$.each(decode.outs, function(i,o){

				if(o.script.chunks.length==2 && o.script.chunks[0]==106){ // OP_RETURN

					var data = Crypto.util.bytesToHex(o.script.chunks[1]);
					var dataascii = hex2ascii(data);

					if(dataascii.match(/^[\s\d\w]+$/ig)){
						data = dataascii;
					}

					h += '<tr>';
					h += '<td><input type="text" class="form-control" value="(OP_RETURN) '+data+'" readonly></td>';
					h += '<td class="col-xs-1">'+(o.value/100000000).toFixed(8)+'</td>';
					h += '<td class="col-xs-2"><input class="form-control" type="text" value="'+Crypto.util.bytesToHex(o.script.buffer)+'" readonly></td>';
					h += '</tr>';
				} else {

					var addr = '';
					if(o.script.chunks.length==5){
						addr = coinjs.scripthash2address(Crypto.util.bytesToHex(o.script.chunks[2]));
					} else {
						var pub = coinjs.pub;
						coinjs.pub = coinjs.multisig;
						addr = coinjs.scripthash2address(Crypto.util.bytesToHex(o.script.chunks[1]));
						coinjs.pub = pub;
					}

					h += '<tr>';
					h += '<td><input class="form-control" type="text" value="'+addr+'" readonly></td>';
					h += '<td class="col-xs-1">'+(o.value/100000000).toFixed(8)+'</td>';
					h += '<td class="col-xs-2"><input class="form-control" type="text" value="'+Crypto.util.bytesToHex(o.script.buffer)+'" readonly></td>';
					h += '</tr>';
				}
			});
			$(h).appendTo("#verifyTransactionData .outs tbody");

			$(".verifyLink").attr('href','?verify='+$("#verifyScript").val());
			return true;
		} catch(e) {
			return false;
		}
	}

	function hex2ascii(hex) {
		var str = '';
		for (var i = 0; i < hex.length; i += 2)
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		return str;
	}

	function decodePrivKey(){
		var wif = $("#verifyScript").val();
		if(wif.length==51 || wif.length==52){
			try {
				var w2address = coinjs.wif2address(wif);
				var w2pubkey = coinjs.wif2pubkey(wif);
				var w2privkey = coinjs.wif2privkey(wif);

				$("#verifyPrivKey .address").val(w2address['address']);
				$("#verifyPrivKey .pubkey").val(w2pubkey['pubkey']);
				$("#verifyPrivKey .privkey").val(w2privkey['privkey']);
				$("#verifyPrivKey .iscompressed").html(w2address['compressed']?'true':'false');

				$("#verifyPrivKey").removeClass("hidden");
				return true;
			} catch (e) {
				return false;
			}
		} else {
			return false;
		}
	}

	function decodePubKey(){
		var pubkey = $("#verifyScript").val();
		if(pubkey.length==66 || pubkey.length==130){
			try {
				$("#verifyPubKey .address").val(coinjs.pubkey2address(pubkey));
				$("#verifyPubKey").removeClass("hidden");
				$(".verifyLink").attr('href','?verify='+$("#verifyScript").val());
				return true;
			} catch (e) {
				return false;
			}
		} else {
			return false;
		}
	}

	function decodeHDaddress(){
		var s = $("#verifyScript").val();
		try {
			var hex = Crypto.util.bytesToHex((coinjs.base58decode(s)).slice(0,4));
			var hex_cmp_prv = Crypto.util.bytesToHex((coinjs.numToBytes(coinjs.hdkey.prv,4)).reverse());
			var hex_cmp_pub = Crypto.util.bytesToHex((coinjs.numToBytes(coinjs.hdkey.pub,4)).reverse());
			if(hex == hex_cmp_prv || hex == hex_cmp_pub){
				var hd = coinjs.hd(s);
				$("#verifyHDaddress .hdKey").html(s);
				$("#verifyHDaddress .chain_code").val(Crypto.util.bytesToHex(hd.chain_code));
				$("#verifyHDaddress .depth").val(hd.depth);
				$("#verifyHDaddress .version").val('0x'+(hd.version).toString(16));
				$("#verifyHDaddress .child_index").val(hd.child_index);
				$("#verifyHDaddress .hdwifkey").val((hd.keys.wif)?hd.keys.wif:'');
				$("#verifyHDaddress .key_type").html((((hd.depth==0 && hd.child_index==0)?'Master':'Derived')+' '+hd.type).toLowerCase());
				$("#verifyHDaddress .parent_fingerprint").val(Crypto.util.bytesToHex(hd.parent_fingerprint));
				$("#verifyHDaddress .derived_data table tbody").html("");
				deriveHDaddress();
				$(".verifyLink").attr('href','?verify='+$("#verifyScript").val());
				$("#verifyHDaddress").removeClass("hidden");
				return true;
			}
		} catch (e) {
			return false;
		}
	}

	function deriveHDaddress() {
		var hd = coinjs.hd($("#verifyHDaddress .hdKey").html());
		var index_start = $("#verifyHDaddress .derivation_index_start").val()*1;
		var index_end = $("#verifyHDaddress .derivation_index_end").val()*1;
		var html = '';
		$("#verifyHDaddress .derived_data table tbody").html("");
		for(var i=index_start;i<=index_end;i++){
			var derived = hd.derive(i);
			html += '<tr>';
			html += '<td>'+i+'</td>';
			html += '<td><input type="text" class="form-control" value="'+derived.keys.address+'" readonly></td>';
			html += '<td><input type="text" class="form-control" value="'+((derived.keys.wif)?derived.keys.wif:'')+'" readonly></td>';
			html += '<td><input type="text" class="form-control" value="'+derived.keys_extended.pubkey+'" readonly></td>';
			html += '<td><input type="text" class="form-control" value="'+((derived.keys_extended.privkey)?derived.keys_extended.privkey:'')+'" readonly></td>';
			html += '</tr>';
		}
		$(html).appendTo("#verifyHDaddress .derived_data table tbody");
	}


	/* sign code */

	$("#signBtn").click(function(){
		var wifkey = $("#signPrivateKey");
		var script = $("#signTransaction");

		if(coinjs.addressDecode(wifkey.val())){
			$(wifkey).parent().removeClass('has-error');
		} else {
			$(wifkey).parent().addClass('has-error');
		}

		if((script.val()).match(/^[a-f0-9]+$/ig)){
			$(script).parent().removeClass('has-error');
		} else {
			$(script).parent().addClass('has-error');
		}

		if($("#sign .has-error").length==0){
			$("#signedDataError").addClass('hidden');
			try {
				var tx = coinjs.transaction();
				var t = tx.deserialize(script.val());

				var signed = t.sign(wifkey.val());
				$("#signedData textarea").val(signed);
				$("#signedData .txSize").html(t.size());
				$("#signedData").removeClass('hidden').fadeIn();
			} catch(e) {
				// console.log(e);
			}
		} else {
			$("#signedDataError").removeClass('hidden');
			$("#signedData").addClass('hidden');
		}
	});


	/* page load code */

	function _get(value) {
		var dataArray = (document.location.search).match(/(([a-z0-9\_\[\]]+\=[a-z0-9\_\.\%\@]+))/gi);
		var r = [];
		if(dataArray) {
			for(var x in dataArray) {
				if((dataArray[x]) && typeof(dataArray[x])=='string') {
					if((dataArray[x].split('=')[0].toLowerCase()).replace(/\[\]$/ig,'') == value.toLowerCase()) {
						r.push(unescape(dataArray[x].split('=')[1]));
					}
				}
			}
		}
		return r;
	}

	$("#newKeysBtn, #newHDKeysBtn").click();

	var _getBroadcast = _get("broadcast");
	if(_getBroadcast[0]){
		$("#rawTransaction").val(_getBroadcast[0]);
		$("#rawSubmitBtn").click();
		window.location.hash = "#broadcast";
	}

	var _getVerify = _get("verify");
	if(_getVerify[0]){
		$("#verifyScript").val(_getVerify[0]);
		$("#verifyBtn").click();
		window.location.hash = "#verify";
	}

	$(".qrcodeBtn").click(function(){
		$("#qrcode").html("");
		var thisbtn = $(this).parent().parent();
		var qrstr = false;
		var ta = $("textarea",thisbtn);

		if(ta.length>0){
			var w = (screen.availWidth > screen.availHeight ? screen.availWidth : screen.availHeight)/3;
			var qrcode = new QRCode("qrcode", {width:w, height:w});
			qrstr = $(ta).val();
			if(qrstr.length > 1024){
				$("#qrcode").html("<p>Sorry the data is too long for the QR generator.</p>");
			}
		} else {
			var qrcode = new QRCode("qrcode");
			qrstr = "bitcoin:"+$('.address',thisbtn).val();
		}

		if(qrstr){
			qrcode.makeCode(qrstr);
		}
	});

	$('input[title!=""], abbr[title!=""]').tooltip({'placement':'bottom'});

	if (location.hash !== ''){
		$('a[href="' + location.hash + '"]').tab('show');
	}

	$(".showKey").click(function(){
		$("input[type='password']",$(this).parent().parent()).attr('type','text');
	});

	$("#homeBtn").click(function(e){
		e.preventDefault();
		history.pushState(null, null, '#home');
		$("#header .active, #content .tab-content").removeClass("active");
		$("#home").addClass("active");
	});

	$('a[data-toggle="tab"]').on('click', function(e) {
		e.preventDefault();
		if(e.target){
			history.pushState(null, null, '#'+$(e.target).attr('href').substr(1));
		}
	});

	window.addEventListener("popstate", function(e) {
		var activeTab = $('[href=' + location.hash + ']');
		if (activeTab.length) {
			activeTab.tab('show');
		} else {
			$('.nav-tabs a:first').tab('show');
		}
	});

	for(i=1;i<3;i++){
		$("#multisigPubKeys .pubkeyAdd").click();
		$("#m_multisigPubKeys .pubkeyAdd").click();
	}

	validateOutputAmount();

	/* settings page code */

	$("#coinjs_pub").val('0x'+(coinjs.pub).toString(16));
	$("#coinjs_priv").val('0x'+(coinjs.priv).toString(16));
	$("#coinjs_multisig").val('0x'+(coinjs.multisig).toString(16));

	$("#coinjs_hdpub").val('0x'+(coinjs.hdkey.pub).toString(16));
	$("#coinjs_hdprv").val('0x'+(coinjs.hdkey.prv).toString(16));	

	$("#settingsBtn").click(function(){

		// log out of openwallet
		$("#walletLogout").click();

		$("#statusSettings").removeClass("alert-success").removeClass("alert-danger").addClass("hidden").html("");
		$("#settings .has-error").removeClass("has-error");

		$.each($(".coinjssetting"),function(i, o){
			if(!$(o).val().match(/^0x[0-9a-f]+$/)){
				$(o).parent().addClass("has-error");
			}
		});

		if($("#settings .has-error").length==0){

			coinjs.pub =  $("#coinjs_pub").val()*1;
			coinjs.priv =  $("#coinjs_priv").val()*1;
			coinjs.multisig =  $("#coinjs_multisig").val()*1;

			coinjs.hdkey.pub =  $("#coinjs_hdpub").val()*1;
			coinjs.hdkey.prv =  $("#coinjs_hdprv").val()*1;

			configureBroadcast();
			configureGetUnspentTx();

			$("#statusSettings").addClass("alert-success").removeClass("hidden").html("<span class=\"glyphicon glyphicon-ok\"></span> Settings updates successfully").fadeOut().fadeIn();	
		} else {
			$("#statusSettings").addClass("alert-danger").removeClass("hidden").html("There is an error with one or more of your settings");	
		}
	});

	$("#coinjs_coin").change(function(){

		var o = ($("option:selected",this).attr("rel")).split(";");

		// deal with broadcasting settings
		if(o[5]=="false"){
			$("#coinjs_broadcast, #rawTransaction, #rawSubmitBtn, #openBtn").attr('disabled',true);
			$("#coinjs_broadcast").val("coinb.in");			
		} else {
			$("#coinjs_broadcast").val(o[5]);
			$("#coinjs_broadcast, #rawTransaction, #rawSubmitBtn, #openBtn").attr('disabled',false);
		}

		// deal with unspent output settings
		if(o[6]=="false"){
			$("#coinjs_utxo, #redeemFrom, #redeemFromBtn, #openBtn, .qrcodeScanner").attr('disabled',true);			
			$("#coinjs_utxo").val("coinb.in");
		} else {
			$("#coinjs_utxo").val(o[6]);
			$("#coinjs_utxo, #redeemFrom, #redeemFromBtn, #openBtn, .qrcodeScanner").attr('disabled',false);
		}

		// deal with the reset
		$("#coinjs_pub").val(o[0]);
		$("#coinjs_priv").val(o[1]);
		$("#coinjs_multisig").val(o[2]);
		$("#coinjs_hdpub").val(o[3]);
		$("#coinjs_hdprv").val(o[4]);

		// hide/show custom screen
		if($("option:selected",this).val()=="custom"){
			$("#settingsCustom").removeClass("hidden");
		} else {
			$("#settingsCustom").addClass("hidden");
		}
	});

	function configureBroadcast(){
		var host = $("#coinjs_broadcast option:selected").val();
		$("#rawSubmitBtn").unbind("");
		if(host=="blockr.io_litecoin"){
			$("#rawSubmitBtn").click(function(){
				rawSubmitBlockrio_litecoin(this)
			});
		} else if(host=="blockr.io_bitcoinmainnet"){
			$("#rawSubmitBtn").click(function(){
				rawSubmitBlockrio_BitcoinMainnet(this);
			});
		} else {
			$("#rawSubmitBtn").click(function(){
				rawSubmitDefault(this); // revert to default
			});
		}
	}

	function configureGetUnspentTx(){
		$("#redeemFromBtn").attr('rel',$("#coinjs_utxo option:selected").val());
	}

	/* capture mouse movement to add entropy */
	var IE = document.all?true:false // Boolean, is browser IE?
	if (!IE) document.captureEvents(Event.MOUSEMOVE)
	document.onmousemove = getMouseXY;
	function getMouseXY(e) {
		var tempX = 0;
		var tempY = 0;
		if (IE) { // If browser is IE
			tempX = event.clientX + document.body.scrollLeft;
			tempY = event.clientY + document.body.scrollTop;
		} else {
			tempX = e.pageX;
			tempY = e.pageY;
		};

		if (tempX < 0){tempX = 0};
		if (tempY < 0){tempY = 0};
		var xEnt = Crypto.util.bytesToHex([tempX]).slice(-2);
		var yEnt = Crypto.util.bytesToHex([tempY]).slice(-2);
		var addEnt = xEnt.concat(yEnt);

		if ($("#entropybucket").html().indexOf(xEnt) == -1 && $("#entropybucket").html().indexOf(yEnt) == -1) {
			$("#entropybucket").html(addEnt + $("#entropybucket").html());
		};

		if ($("#entropybucket").html().length > 128) {
			$("#entropybucket").html($("#entropybucket").html().slice(0, 128))
		};

		return true;
	};
});


/*
 * Crypto-JS v2.5.4
 * http://code.google.com/p/crypto-js/
 * (c) 2009-2012 by Jeff Mott. All rights reserved.
 * http://code.google.com/p/crypto-js/wiki/License
 */
(typeof Crypto=="undefined"||!Crypto.util)&&function(){var e=window.Crypto={},f=e.util={rotl:function(a,b){return a<<b|a>>>32-b},rotr:function(a,b){return a<<32-b|a>>>b},endian:function(a){if(a.constructor==Number)return f.rotl(a,8)&16711935|f.rotl(a,24)&4278255360;for(var b=0;b<a.length;b++)a[b]=f.endian(a[b]);return a},randomBytes:function(a){for(var b=[];a>0;a--)b.push(Math.floor(Math.random()*256));return b},bytesToWords:function(a){for(var b=[],c=0,d=0;c<a.length;c++,d+=8)b[d>>>5]|=(a[c]&255)<<
    24-d%32;return b},wordsToBytes:function(a){for(var b=[],c=0;c<a.length*32;c+=8)b.push(a[c>>>5]>>>24-c%32&255);return b},bytesToHex:function(a){for(var b=[],c=0;c<a.length;c++)b.push((a[c]>>>4).toString(16)),b.push((a[c]&15).toString(16));return b.join("")},hexToBytes:function(a){for(var b=[],c=0;c<a.length;c+=2)b.push(parseInt(a.substr(c,2),16));return b},bytesToBase64:function(a){for(var b=[],c=0;c<a.length;c+=3)for(var d=a[c]<<16|a[c+1]<<8|a[c+2],e=0;e<4;e++)c*8+e*6<=a.length*8?b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>>
    6*(3-e)&63)):b.push("=");return b.join("")},base64ToBytes:function(a){for(var a=a.replace(/[^A-Z0-9+\/]/ig,""),b=[],c=0,d=0;c<a.length;d=++c%4)d!=0&&b.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(c-1))&Math.pow(2,-2*d+8)-1)<<d*2|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(c))>>>6-d*2);return b}},e=e.charenc={};e.UTF8={stringToBytes:function(a){return g.stringToBytes(unescape(encodeURIComponent(a)))},bytesToString:function(a){return decodeURIComponent(escape(g.bytesToString(a)))}};
    var g=e.Binary={stringToBytes:function(a){for(var b=[],c=0;c<a.length;c++)b.push(a.charCodeAt(c)&255);return b},bytesToString:function(a){for(var b=[],c=0;c<a.length;c++)b.push(String.fromCharCode(a[c]));return b.join("")}}}();
    

    /*
 * Crypto-JS v2.5.4
 * http://code.google.com/p/crypto-js/
 * (c) 2009-2012 by Jeff Mott. All rights reserved.
 * http://code.google.com/p/crypto-js/wiki/License
 */
(typeof Crypto=="undefined"||!Crypto.util)&&function(){var d=window.Crypto={},k=d.util={rotl:function(b,a){return b<<a|b>>>32-a},rotr:function(b,a){return b<<32-a|b>>>a},endian:function(b){if(b.constructor==Number)return k.rotl(b,8)&16711935|k.rotl(b,24)&4278255360;for(var a=0;a<b.length;a++)b[a]=k.endian(b[a]);return b},randomBytes:function(b){for(var a=[];b>0;b--)a.push(Math.floor(Math.random()*256));return a},bytesToWords:function(b){for(var a=[],c=0,e=0;c<b.length;c++,e+=8)a[e>>>5]|=(b[c]&255)<<
    24-e%32;return a},wordsToBytes:function(b){for(var a=[],c=0;c<b.length*32;c+=8)a.push(b[c>>>5]>>>24-c%32&255);return a},bytesToHex:function(b){for(var a=[],c=0;c<b.length;c++)a.push((b[c]>>>4).toString(16)),a.push((b[c]&15).toString(16));return a.join("")},hexToBytes:function(b){for(var a=[],c=0;c<b.length;c+=2)a.push(parseInt(b.substr(c,2),16));return a},bytesToBase64:function(b){for(var a=[],c=0;c<b.length;c+=3)for(var e=b[c]<<16|b[c+1]<<8|b[c+2],p=0;p<4;p++)c*8+p*6<=b.length*8?a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e>>>
    6*(3-p)&63)):a.push("=");return a.join("")},base64ToBytes:function(b){for(var b=b.replace(/[^A-Z0-9+\/]/ig,""),a=[],c=0,e=0;c<b.length;e=++c%4)e!=0&&a.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(b.charAt(c-1))&Math.pow(2,-2*e+8)-1)<<e*2|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(b.charAt(c))>>>6-e*2);return a}},d=d.charenc={};d.UTF8={stringToBytes:function(b){return g.stringToBytes(unescape(encodeURIComponent(b)))},bytesToString:function(b){return decodeURIComponent(escape(g.bytesToString(b)))}};
    var g=d.Binary={stringToBytes:function(b){for(var a=[],c=0;c<b.length;c++)a.push(b.charCodeAt(c)&255);return a},bytesToString:function(b){for(var a=[],c=0;c<b.length;c++)a.push(String.fromCharCode(b[c]));return a.join("")}}}();
    (function(){var d=Crypto,k=d.util,g=d.charenc,b=g.UTF8,a=g.Binary,c=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,
    2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],e=d.SHA256=function(b,c){var f=k.wordsToBytes(e._sha256(b));return c&&c.asBytes?f:c&&c.asString?a.bytesToString(f):k.bytesToHex(f)};e._sha256=function(a){a.constructor==String&&(a=b.stringToBytes(a));var e=k.bytesToWords(a),f=a.length*8,a=[1779033703,3144134277,
    1013904242,2773480762,1359893119,2600822924,528734635,1541459225],d=[],g,m,r,i,n,o,s,t,h,l,j;e[f>>5]|=128<<24-f%32;e[(f+64>>9<<4)+15]=f;for(t=0;t<e.length;t+=16){f=a[0];g=a[1];m=a[2];r=a[3];i=a[4];n=a[5];o=a[6];s=a[7];for(h=0;h<64;h++){h<16?d[h]=e[h+t]:(l=d[h-15],j=d[h-2],d[h]=((l<<25|l>>>7)^(l<<14|l>>>18)^l>>>3)+(d[h-7]>>>0)+((j<<15|j>>>17)^(j<<13|j>>>19)^j>>>10)+(d[h-16]>>>0));j=f&g^f&m^g&m;var u=(f<<30|f>>>2)^(f<<19|f>>>13)^(f<<10|f>>>22);l=(s>>>0)+((i<<26|i>>>6)^(i<<21|i>>>11)^(i<<7|i>>>25))+
    (i&n^~i&o)+c[h]+(d[h]>>>0);j=u+j;s=o;o=n;n=i;i=r+l>>>0;r=m;m=g;g=f;f=l+j>>>0}a[0]+=f;a[1]+=g;a[2]+=m;a[3]+=r;a[4]+=i;a[5]+=n;a[6]+=o;a[7]+=s}return a};e._blocksize=16;e._digestsize=32})();
    (function(){var d=Crypto,k=d.util,g=d.charenc,b=g.UTF8,a=g.Binary;d.HMAC=function(c,e,d,g){e.constructor==String&&(e=b.stringToBytes(e));d.constructor==String&&(d=b.stringToBytes(d));d.length>c._blocksize*4&&(d=c(d,{asBytes:!0}));for(var f=d.slice(0),d=d.slice(0),q=0;q<c._blocksize*4;q++)f[q]^=92,d[q]^=54;c=c(f.concat(c(d.concat(e),{asBytes:!0})),{asBytes:!0});return g&&g.asBytes?c:g&&g.asString?a.bytesToString(c):k.bytesToHex(c)}})();

    /*
 * Crypto-JS v2.5.4
 * http://code.google.com/p/crypto-js/
 * (c) 2009-2012 by Jeff Mott. All rights reserved.
 * http://code.google.com/p/crypto-js/wiki/License
 */
(typeof Crypto=="undefined"||!Crypto.util)&&function(){var f=window.Crypto={},l=f.util={rotl:function(b,a){return b<<a|b>>>32-a},rotr:function(b,a){return b<<32-a|b>>>a},endian:function(b){if(b.constructor==Number)return l.rotl(b,8)&16711935|l.rotl(b,24)&4278255360;for(var a=0;a<b.length;a++)b[a]=l.endian(b[a]);return b},randomBytes:function(b){for(var a=[];b>0;b--)a.push(Math.floor(Math.random()*256));return a},bytesToWords:function(b){for(var a=[],c=0,d=0;c<b.length;c++,d+=8)a[d>>>5]|=(b[c]&255)<<
    24-d%32;return a},wordsToBytes:function(b){for(var a=[],c=0;c<b.length*32;c+=8)a.push(b[c>>>5]>>>24-c%32&255);return a},bytesToHex:function(b){for(var a=[],c=0;c<b.length;c++)a.push((b[c]>>>4).toString(16)),a.push((b[c]&15).toString(16));return a.join("")},hexToBytes:function(b){for(var a=[],c=0;c<b.length;c+=2)a.push(parseInt(b.substr(c,2),16));return a},bytesToBase64:function(b){for(var a=[],c=0;c<b.length;c+=3)for(var d=b[c]<<16|b[c+1]<<8|b[c+2],q=0;q<4;q++)c*8+q*6<=b.length*8?a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>>
    6*(3-q)&63)):a.push("=");return a.join("")},base64ToBytes:function(b){for(var b=b.replace(/[^A-Z0-9+\/]/ig,""),a=[],c=0,d=0;c<b.length;d=++c%4)d!=0&&a.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(b.charAt(c-1))&Math.pow(2,-2*d+8)-1)<<d*2|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(b.charAt(c))>>>6-d*2);return a}},f=f.charenc={};f.UTF8={stringToBytes:function(b){return i.stringToBytes(unescape(encodeURIComponent(b)))},bytesToString:function(b){return decodeURIComponent(escape(i.bytesToString(b)))}};
    var i=f.Binary={stringToBytes:function(b){for(var a=[],c=0;c<b.length;c++)a.push(b.charCodeAt(c)&255);return a},bytesToString:function(b){for(var a=[],c=0;c<b.length;c++)a.push(String.fromCharCode(b[c]));return a.join("")}}}();
    (function(){var f=Crypto,l=f.util,i=f.charenc,b=i.UTF8,a=i.Binary,c=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,
    2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],d=f.SHA256=function(b,c){var e=l.wordsToBytes(d._sha256(b));return c&&c.asBytes?e:c&&c.asString?a.bytesToString(e):l.bytesToHex(e)};d._sha256=function(a){a.constructor==String&&(a=b.stringToBytes(a));var d=l.bytesToWords(a),e=a.length*8,a=[1779033703,3144134277,
    1013904242,2773480762,1359893119,2600822924,528734635,1541459225],f=[],m,n,i,h,o,p,r,s,g,k,j;d[e>>5]|=128<<24-e%32;d[(e+64>>9<<4)+15]=e;for(s=0;s<d.length;s+=16){e=a[0];m=a[1];n=a[2];i=a[3];h=a[4];o=a[5];p=a[6];r=a[7];for(g=0;g<64;g++){g<16?f[g]=d[g+s]:(k=f[g-15],j=f[g-2],f[g]=((k<<25|k>>>7)^(k<<14|k>>>18)^k>>>3)+(f[g-7]>>>0)+((j<<15|j>>>17)^(j<<13|j>>>19)^j>>>10)+(f[g-16]>>>0));j=e&m^e&n^m&n;var t=(e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22);k=(r>>>0)+((h<<26|h>>>6)^(h<<21|h>>>11)^(h<<7|h>>>25))+
    (h&o^~h&p)+c[g]+(f[g]>>>0);j=t+j;r=p;p=o;o=h;h=i+k>>>0;i=n;n=m;m=e;e=k+j>>>0}a[0]+=e;a[1]+=m;a[2]+=n;a[3]+=i;a[4]+=h;a[5]+=o;a[6]+=p;a[7]+=r}return a};d._blocksize=16;d._digestsize=32})();

    
    /*!
* Basic Javascript Elliptic Curve implementation
* Ported loosely from BouncyCastle's Java EC code
* Only Fp curves implemented for now
* 
* Copyright Tom Wu, bitaddress.org  BSD License.
* http://www-cs-students.stanford.edu/~tjw/jsbn/LICENSE
*/
(function () {

	// Constructor function of Global EllipticCurve object
	var ec = window.EllipticCurve = function () { };


	// ----------------
	// ECFieldElementFp constructor
	// q instanceof BigInteger
	// x instanceof BigInteger
	ec.FieldElementFp = function (q, x) {
		this.x = x;
		// TODO if(x.compareTo(q) >= 0) error
		this.q = q;
	};

	ec.FieldElementFp.prototype.equals = function (other) {
		if (other == this) return true;
		return (this.q.equals(other.q) && this.x.equals(other.x));
	};

	ec.FieldElementFp.prototype.toBigInteger = function () {
		return this.x;
	};

	ec.FieldElementFp.prototype.negate = function () {
		return new ec.FieldElementFp(this.q, this.x.negate().mod(this.q));
	};

	ec.FieldElementFp.prototype.add = function (b) {
		return new ec.FieldElementFp(this.q, this.x.add(b.toBigInteger()).mod(this.q));
	};

	ec.FieldElementFp.prototype.subtract = function (b) {
		return new ec.FieldElementFp(this.q, this.x.subtract(b.toBigInteger()).mod(this.q));
	};

	ec.FieldElementFp.prototype.multiply = function (b) {
		return new ec.FieldElementFp(this.q, this.x.multiply(b.toBigInteger()).mod(this.q));
	};

	ec.FieldElementFp.prototype.square = function () {
		return new ec.FieldElementFp(this.q, this.x.square().mod(this.q));
	};

	ec.FieldElementFp.prototype.divide = function (b) {
		return new ec.FieldElementFp(this.q, this.x.multiply(b.toBigInteger().modInverse(this.q)).mod(this.q));
	};

	ec.FieldElementFp.prototype.getByteLength = function () {
		return Math.floor((this.toBigInteger().bitLength() + 7) / 8);
	};

	// D.1.4 91
	/**
	* return a sqrt root - the routine verifies that the calculation
	* returns the right value - if none exists it returns null.
	* 
	* Copyright (c) 2000 - 2011 The Legion Of The Bouncy Castle (http://www.bouncycastle.org)
	* Ported to JavaScript by bitaddress.org
	*/
	ec.FieldElementFp.prototype.sqrt = function () {
		if (!this.q.testBit(0)) throw new Error("even value of q");

		// p mod 4 == 3
		if (this.q.testBit(1)) {
			// z = g^(u+1) + p, p = 4u + 3
			var z = new ec.FieldElementFp(this.q, this.x.modPow(this.q.shiftRight(2).add(BigInteger.ONE), this.q));
			return z.square().equals(this) ? z : null;
		}

		// p mod 4 == 1
		var qMinusOne = this.q.subtract(BigInteger.ONE);
		var legendreExponent = qMinusOne.shiftRight(1);
		if (!(this.x.modPow(legendreExponent, this.q).equals(BigInteger.ONE))) return null;
		var u = qMinusOne.shiftRight(2);
		var k = u.shiftLeft(1).add(BigInteger.ONE);
		var Q = this.x;
		var fourQ = Q.shiftLeft(2).mod(this.q);
		var U, V;

		do {
			var rand = new SecureRandom();
			var P;
			do {
				P = new BigInteger(this.q.bitLength(), rand);
			}
			while (P.compareTo(this.q) >= 0 || !(P.multiply(P).subtract(fourQ).modPow(legendreExponent, this.q).equals(qMinusOne)));

			var result = ec.FieldElementFp.fastLucasSequence(this.q, P, Q, k);

			U = result[0];
			V = result[1];
			if (V.multiply(V).mod(this.q).equals(fourQ)) {
				// Integer division by 2, mod q
				if (V.testBit(0)) {
					V = V.add(this.q);
				}
				V = V.shiftRight(1);
				return new ec.FieldElementFp(this.q, V);
			}
		}
		while (U.equals(BigInteger.ONE) || U.equals(qMinusOne));

		return null;
	};

	/*
	* Copyright (c) 2000 - 2011 The Legion Of The Bouncy Castle (http://www.bouncycastle.org)
	* Ported to JavaScript by bitaddress.org
	*/
	ec.FieldElementFp.fastLucasSequence = function (p, P, Q, k) {
		// TODO Research and apply "common-multiplicand multiplication here"

		var n = k.bitLength();
		var s = k.getLowestSetBit();
		var Uh = BigInteger.ONE;
		var Vl = BigInteger.TWO;
		var Vh = P;
		var Ql = BigInteger.ONE;
		var Qh = BigInteger.ONE;

		for (var j = n - 1; j >= s + 1; --j) {
			Ql = Ql.multiply(Qh).mod(p);
			if (k.testBit(j)) {
				Qh = Ql.multiply(Q).mod(p);
				Uh = Uh.multiply(Vh).mod(p);
				Vl = Vh.multiply(Vl).subtract(P.multiply(Ql)).mod(p);
				Vh = Vh.multiply(Vh).subtract(Qh.shiftLeft(1)).mod(p);
			}
			else {
				Qh = Ql;
				Uh = Uh.multiply(Vl).subtract(Ql).mod(p);
				Vh = Vh.multiply(Vl).subtract(P.multiply(Ql)).mod(p);
				Vl = Vl.multiply(Vl).subtract(Ql.shiftLeft(1)).mod(p);
			}
		}

		Ql = Ql.multiply(Qh).mod(p);
		Qh = Ql.multiply(Q).mod(p);
		Uh = Uh.multiply(Vl).subtract(Ql).mod(p);
		Vl = Vh.multiply(Vl).subtract(P.multiply(Ql)).mod(p);
		Ql = Ql.multiply(Qh).mod(p);

		for (var j = 1; j <= s; ++j) {
			Uh = Uh.multiply(Vl).mod(p);
			Vl = Vl.multiply(Vl).subtract(Ql.shiftLeft(1)).mod(p);
			Ql = Ql.multiply(Ql).mod(p);
		}

		return [Uh, Vl];
	};

	// ----------------
	// ECPointFp constructor
	ec.PointFp = function (curve, x, y, z, compressed) {
		this.curve = curve;
		this.x = x;
		this.y = y;
		// Projective coordinates: either zinv == null or z * zinv == 1
		// z and zinv are just BigIntegers, not fieldElements
		if (z == null) {
			this.z = BigInteger.ONE;
		}
		else {
			this.z = z;
		}
		this.zinv = null;
		// compression flag
		this.compressed = !!compressed;
	};

	ec.PointFp.prototype.getX = function () {
		if (this.zinv == null) {
			this.zinv = this.z.modInverse(this.curve.q);
		}
		var r = this.x.toBigInteger().multiply(this.zinv);
		this.curve.reduce(r);
		return this.curve.fromBigInteger(r);
	};

	ec.PointFp.prototype.getY = function () {
		if (this.zinv == null) {
			this.zinv = this.z.modInverse(this.curve.q);
		}
		var r = this.y.toBigInteger().multiply(this.zinv);
		this.curve.reduce(r);
		return this.curve.fromBigInteger(r);
	};

	ec.PointFp.prototype.equals = function (other) {
		if (other == this) return true;
		if (this.isInfinity()) return other.isInfinity();
		if (other.isInfinity()) return this.isInfinity();
		var u, v;
		// u = Y2 * Z1 - Y1 * Z2
		u = other.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(other.z)).mod(this.curve.q);
		if (!u.equals(BigInteger.ZERO)) return false;
		// v = X2 * Z1 - X1 * Z2
		v = other.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(other.z)).mod(this.curve.q);
		return v.equals(BigInteger.ZERO);
	};

	ec.PointFp.prototype.isInfinity = function () {
		if ((this.x == null) && (this.y == null)) return true;
		return this.z.equals(BigInteger.ZERO) && !this.y.toBigInteger().equals(BigInteger.ZERO);
	};

	ec.PointFp.prototype.negate = function () {
		return new ec.PointFp(this.curve, this.x, this.y.negate(), this.z);
	};

	ec.PointFp.prototype.add = function (b) {
		if (this.isInfinity()) return b;
		if (b.isInfinity()) return this;

		// u = Y2 * Z1 - Y1 * Z2
		var u = b.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(b.z)).mod(this.curve.q);
		// v = X2 * Z1 - X1 * Z2
		var v = b.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(b.z)).mod(this.curve.q);


		if (BigInteger.ZERO.equals(v)) {
			if (BigInteger.ZERO.equals(u)) {
				return this.twice(); // this == b, so double
			}
			return this.curve.getInfinity(); // this = -b, so infinity
		}

		var THREE = new BigInteger("3");
		var x1 = this.x.toBigInteger();
		var y1 = this.y.toBigInteger();
		var x2 = b.x.toBigInteger();
		var y2 = b.y.toBigInteger();

		var v2 = v.square();
		var v3 = v2.multiply(v);
		var x1v2 = x1.multiply(v2);
		var zu2 = u.square().multiply(this.z);

		// x3 = v * (z2 * (z1 * u^2 - 2 * x1 * v^2) - v^3)
		var x3 = zu2.subtract(x1v2.shiftLeft(1)).multiply(b.z).subtract(v3).multiply(v).mod(this.curve.q);
		// y3 = z2 * (3 * x1 * u * v^2 - y1 * v^3 - z1 * u^3) + u * v^3
		var y3 = x1v2.multiply(THREE).multiply(u).subtract(y1.multiply(v3)).subtract(zu2.multiply(u)).multiply(b.z).add(u.multiply(v3)).mod(this.curve.q);
		// z3 = v^3 * z1 * z2
		var z3 = v3.multiply(this.z).multiply(b.z).mod(this.curve.q);

		return new ec.PointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3);
	};

	ec.PointFp.prototype.twice = function () {
		if (this.isInfinity()) return this;
		if (this.y.toBigInteger().signum() == 0) return this.curve.getInfinity();

		// TODO: optimized handling of constants
		var THREE = new BigInteger("3");
		var x1 = this.x.toBigInteger();
		var y1 = this.y.toBigInteger();

		var y1z1 = y1.multiply(this.z);
		var y1sqz1 = y1z1.multiply(y1).mod(this.curve.q);
		var a = this.curve.a.toBigInteger();

		// w = 3 * x1^2 + a * z1^2
		var w = x1.square().multiply(THREE);
		if (!BigInteger.ZERO.equals(a)) {
			w = w.add(this.z.square().multiply(a));
		}
		w = w.mod(this.curve.q);
		//this.curve.reduce(w);
		// x3 = 2 * y1 * z1 * (w^2 - 8 * x1 * y1^2 * z1)
		var x3 = w.square().subtract(x1.shiftLeft(3).multiply(y1sqz1)).shiftLeft(1).multiply(y1z1).mod(this.curve.q);
		// y3 = 4 * y1^2 * z1 * (3 * w * x1 - 2 * y1^2 * z1) - w^3
		var y3 = w.multiply(THREE).multiply(x1).subtract(y1sqz1.shiftLeft(1)).shiftLeft(2).multiply(y1sqz1).subtract(w.square().multiply(w)).mod(this.curve.q);
		// z3 = 8 * (y1 * z1)^3
		var z3 = y1z1.square().multiply(y1z1).shiftLeft(3).mod(this.curve.q);

		return new ec.PointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3);
	};

	// Simple NAF (Non-Adjacent Form) multiplication algorithm
	// TODO: modularize the multiplication algorithm
	ec.PointFp.prototype.multiply = function (k) {
		if (this.isInfinity()) return this;
		if (k.signum() == 0) return this.curve.getInfinity();

		var e = k;
		var h = e.multiply(new BigInteger("3"));

		var neg = this.negate();
		var R = this;

		var i;
		for (i = h.bitLength() - 2; i > 0; --i) {
			R = R.twice();

			var hBit = h.testBit(i);
			var eBit = e.testBit(i);

			if (hBit != eBit) {
				R = R.add(hBit ? this : neg);
			}
		}

		return R;
	};

	// Compute this*j + x*k (simultaneous multiplication)
	ec.PointFp.prototype.multiplyTwo = function (j, x, k) {
		var i;
		if (j.bitLength() > k.bitLength())
			i = j.bitLength() - 1;
		else
			i = k.bitLength() - 1;

		var R = this.curve.getInfinity();
		var both = this.add(x);
		while (i >= 0) {
			R = R.twice();
			if (j.testBit(i)) {
				if (k.testBit(i)) {
					R = R.add(both);
				}
				else {
					R = R.add(this);
				}
			}
			else {
				if (k.testBit(i)) {
					R = R.add(x);
				}
			}
			--i;
		}

		return R;
	};

	// patched by bitaddress.org and Casascius for use with Bitcoin.ECKey
	// patched by coretechs to support compressed public keys
	ec.PointFp.prototype.getEncoded = function (compressed) {
		var x = this.getX().toBigInteger();
		var y = this.getY().toBigInteger();
		var len = 32; // integerToBytes will zero pad if integer is less than 32 bytes. 32 bytes length is required by the Bitcoin protocol.
		var enc = ec.integerToBytes(x, len);

		// when compressed prepend byte depending if y point is even or odd 
		if (compressed) {
			if (y.isEven()) {
				enc.unshift(0x02);
			}
			else {
				enc.unshift(0x03);
			}
		}
		else {
			enc.unshift(0x04);
			enc = enc.concat(ec.integerToBytes(y, len)); // uncompressed public key appends the bytes of the y point
		}
		return enc;
	};

	ec.PointFp.decodeFrom = function (curve, enc) {
		var type = enc[0];
		var dataLen = enc.length - 1;

		// Extract x and y as byte arrays
		var xBa = enc.slice(1, 1 + dataLen / 2);
		var yBa = enc.slice(1 + dataLen / 2, 1 + dataLen);

		// Prepend zero byte to prevent interpretation as negative integer
		xBa.unshift(0);
		yBa.unshift(0);

		// Convert to BigIntegers
		var x = new BigInteger(xBa);
		var y = new BigInteger(yBa);

		// Return point
		return new ec.PointFp(curve, curve.fromBigInteger(x), curve.fromBigInteger(y));
	};

	ec.PointFp.prototype.add2D = function (b) {
		if (this.isInfinity()) return b;
		if (b.isInfinity()) return this;

		if (this.x.equals(b.x)) {
			if (this.y.equals(b.y)) {
				// this = b, i.e. this must be doubled
				return this.twice();
			}
			// this = -b, i.e. the result is the point at infinity
			return this.curve.getInfinity();
		}

		var x_x = b.x.subtract(this.x);
		var y_y = b.y.subtract(this.y);
		var gamma = y_y.divide(x_x);

		var x3 = gamma.square().subtract(this.x).subtract(b.x);
		var y3 = gamma.multiply(this.x.subtract(x3)).subtract(this.y);

		return new ec.PointFp(this.curve, x3, y3);
	};

	ec.PointFp.prototype.twice2D = function () {
		if (this.isInfinity()) return this;
		if (this.y.toBigInteger().signum() == 0) {
			// if y1 == 0, then (x1, y1) == (x1, -y1)
			// and hence this = -this and thus 2(x1, y1) == infinity
			return this.curve.getInfinity();
		}

		var TWO = this.curve.fromBigInteger(BigInteger.valueOf(2));
		var THREE = this.curve.fromBigInteger(BigInteger.valueOf(3));
		var gamma = this.x.square().multiply(THREE).add(this.curve.a).divide(this.y.multiply(TWO));

		var x3 = gamma.square().subtract(this.x.multiply(TWO));
		var y3 = gamma.multiply(this.x.subtract(x3)).subtract(this.y);

		return new ec.PointFp(this.curve, x3, y3);
	};

	ec.PointFp.prototype.multiply2D = function (k) {
		if (this.isInfinity()) return this;
		if (k.signum() == 0) return this.curve.getInfinity();

		var e = k;
		var h = e.multiply(new BigInteger("3"));

		var neg = this.negate();
		var R = this;

		var i;
		for (i = h.bitLength() - 2; i > 0; --i) {
			R = R.twice();

			var hBit = h.testBit(i);
			var eBit = e.testBit(i);

			if (hBit != eBit) {
				R = R.add2D(hBit ? this : neg);
			}
		}

		return R;
	};

	ec.PointFp.prototype.isOnCurve = function () {
		var x = this.getX().toBigInteger();
		var y = this.getY().toBigInteger();
		var a = this.curve.getA().toBigInteger();
		var b = this.curve.getB().toBigInteger();
		var n = this.curve.getQ();
		var lhs = y.multiply(y).mod(n);
		var rhs = x.multiply(x).multiply(x).add(a.multiply(x)).add(b).mod(n);
		return lhs.equals(rhs);
	};

	ec.PointFp.prototype.toString = function () {
		return '(' + this.getX().toBigInteger().toString() + ',' + this.getY().toBigInteger().toString() + ')';
	};

	/**
	* Validate an elliptic curve point.
	*
	* See SEC 1, section 3.2.2.1: Elliptic Curve Public Key Validation Primitive
	*/
	ec.PointFp.prototype.validate = function () {
		var n = this.curve.getQ();

		// Check Q != O
		if (this.isInfinity()) {
			throw new Error("Point is at infinity.");
		}

		// Check coordinate bounds
		var x = this.getX().toBigInteger();
		var y = this.getY().toBigInteger();
		if (x.compareTo(BigInteger.ONE) < 0 || x.compareTo(n.subtract(BigInteger.ONE)) > 0) {
			throw new Error('x coordinate out of bounds');
		}
		if (y.compareTo(BigInteger.ONE) < 0 || y.compareTo(n.subtract(BigInteger.ONE)) > 0) {
			throw new Error('y coordinate out of bounds');
		}

		// Check y^2 = x^3 + ax + b (mod n)
		if (!this.isOnCurve()) {
			throw new Error("Point is not on the curve.");
		}

		// Check nQ = 0 (Q is a scalar multiple of G)
		if (this.multiply(n).isInfinity()) {
			// TODO: This check doesn't work - fix.
			throw new Error("Point is not a scalar multiple of G.");
		}

		return true;
	};




	// ----------------
	// ECCurveFp constructor
	ec.CurveFp = function (q, a, b) {
		this.q = q;
		this.a = this.fromBigInteger(a);
		this.b = this.fromBigInteger(b);
		this.infinity = new ec.PointFp(this, null, null);
		this.reducer = new Barrett(this.q);
	}

	ec.CurveFp.prototype.getQ = function () {
		return this.q;
	};

	ec.CurveFp.prototype.getA = function () {
		return this.a;
	};

	ec.CurveFp.prototype.getB = function () {
		return this.b;
	};

	ec.CurveFp.prototype.equals = function (other) {
		if (other == this) return true;
		return (this.q.equals(other.q) && this.a.equals(other.a) && this.b.equals(other.b));
	};

	ec.CurveFp.prototype.getInfinity = function () {
		return this.infinity;
	};

	ec.CurveFp.prototype.fromBigInteger = function (x) {
		return new ec.FieldElementFp(this.q, x);
	};

	ec.CurveFp.prototype.reduce = function (x) {
		this.reducer.reduce(x);
	};

	// for now, work with hex strings because they're easier in JS
	// compressed support added by bitaddress.org
	ec.CurveFp.prototype.decodePointHex = function (s) {
		var firstByte = parseInt(s.substr(0, 2), 16);
		switch (firstByte) { // first byte
			case 0:
				return this.infinity;
			case 2: // compressed
			case 3: // compressed
				var yTilde = firstByte & 1;
				var xHex = s.substr(2, s.length - 2);
				var X1 = new BigInteger(xHex, 16);
				return this.decompressPoint(yTilde, X1);
			case 4: // uncompressed
			case 6: // hybrid
			case 7: // hybrid
				var len = (s.length - 2) / 2;
				var xHex = s.substr(2, len);
				var yHex = s.substr(len + 2, len);

				return new ec.PointFp(this,
					this.fromBigInteger(new BigInteger(xHex, 16)),
					this.fromBigInteger(new BigInteger(yHex, 16)));

			default: // unsupported
				return null;
		}
	};

	ec.CurveFp.prototype.encodePointHex = function (p) {
		if (p.isInfinity()) return "00";
		var xHex = p.getX().toBigInteger().toString(16);
		var yHex = p.getY().toBigInteger().toString(16);
		var oLen = this.getQ().toString(16).length;
		if ((oLen % 2) != 0) oLen++;
		while (xHex.length < oLen) {
			xHex = "0" + xHex;
		}
		while (yHex.length < oLen) {
			yHex = "0" + yHex;
		}
		return "04" + xHex + yHex;
	};

	/*
	* Copyright (c) 2000 - 2011 The Legion Of The Bouncy Castle (http://www.bouncycastle.org)
	* Ported to JavaScript by bitaddress.org
	*
	* Number yTilde
	* BigInteger X1
	*/
	ec.CurveFp.prototype.decompressPoint = function (yTilde, X1) {
		var x = this.fromBigInteger(X1);
		var alpha = x.multiply(x.square().add(this.getA())).add(this.getB());
		var beta = alpha.sqrt();
		// if we can't find a sqrt we haven't got a point on the curve - run!
		if (beta == null) throw new Error("Invalid point compression");
		var betaValue = beta.toBigInteger();
		var bit0 = betaValue.testBit(0) ? 1 : 0;
		if (bit0 != yTilde) {
			// Use the other root
			beta = this.fromBigInteger(this.getQ().subtract(betaValue));
		}
		return new ec.PointFp(this, x, beta, null, true);
	};


	ec.fromHex = function (s) { return new BigInteger(s, 16); };

	ec.integerToBytes = function (i, len) {
		var bytes = i.toByteArrayUnsigned();
		if (len < bytes.length) {
			bytes = bytes.slice(bytes.length - len);
		} else while (len > bytes.length) {
			bytes.unshift(0);
		}
		return bytes;
	};


	// Named EC curves
	// ----------------
	// X9ECParameters constructor
	ec.X9Parameters = function (curve, g, n, h) {
		this.curve = curve;
		this.g = g;
		this.n = n;
		this.h = h;
	}
	ec.X9Parameters.prototype.getCurve = function () { return this.curve; };
	ec.X9Parameters.prototype.getG = function () { return this.g; };
	ec.X9Parameters.prototype.getN = function () { return this.n; };
	ec.X9Parameters.prototype.getH = function () { return this.h; };

	// secp256k1 is the Curve used by Bitcoin
	ec.secNamedCurves = {
		// used by Bitcoin
		"secp256k1": function () {
			// p = 2^256 - 2^32 - 2^9 - 2^8 - 2^7 - 2^6 - 2^4 - 1
			var p = ec.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F");
			var a = BigInteger.ZERO;
			var b = ec.fromHex("7");
			var n = ec.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");
			var h = BigInteger.ONE;
			var curve = new ec.CurveFp(p, a, b);
			var G = curve.decodePointHex("04"
					+ "79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798"
					+ "483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8");
			return new ec.X9Parameters(curve, G, n, h);
		}
	};

	// secp256k1 called by Bitcoin's ECKEY
	ec.getSECCurveByName = function (name) {
		if (ec.secNamedCurves[name] == undefined) return null;
		return ec.secNamedCurves[name]();
	}
})();


/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery.min.map
*/(function(e,t){var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p="1.9.1",f=c.concat,d=c.push,h=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,b=function(e,t){return new b.fn.init(e,t,r)},x=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^[\],:{}\s]*$/,E=/(?:^|:|,)(?:\s*\[)+/g,S=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,A=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,j=/^-ms-/,D=/-([\da-z])/gi,L=function(e,t){return t.toUpperCase()},H=function(e){(o.addEventListener||"load"===e.type||"complete"===o.readyState)&&(q(),b.ready())},q=function(){o.addEventListener?(o.removeEventListener("DOMContentLoaded",H,!1),e.removeEventListener("load",H,!1)):(o.detachEvent("onreadystatechange",H),e.detachEvent("onload",H))};b.fn=b.prototype={jquery:p,constructor:b,init:function(e,n,r){var i,a;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:o,!0)),C.test(i[1])&&b.isPlainObject(n))for(i in n)b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(a=o.getElementById(i[2]),a&&a.parentNode){if(a.id!==i[2])return r.find(e);this.length=1,this[0]=a}return this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return h.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return b.each(this,e,t)},ready:function(e){return b.ready.promise().done(e),this},slice:function(){return this.pushStack(h.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(b.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:d,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||b.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(o=arguments[u]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,a=e&&b.isArray(e)?e:[]):a=e&&b.isPlainObject(e)?e:{},s[i]=b.extend(c,a,r)):r!==t&&(s[i]=r));return s},b.extend({noConflict:function(t){return e.$===b&&(e.$=u),t&&e.jQuery===b&&(e.jQuery=s),b},isReady:!1,readyWait:1,holdReady:function(e){e?b.readyWait++:b.ready(!0)},ready:function(e){if(e===!0?!--b.readyWait:!b.isReady){if(!o.body)return setTimeout(b.ready);b.isReady=!0,e!==!0&&--b.readyWait>0||(n.resolveWith(o,[b]),b.fn.trigger&&b(o).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===b.type(e)},isArray:Array.isArray||function(e){return"array"===b.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==b.type(e)||e.nodeType||b.isWindow(e))return!1;try{if(e.constructor&&!y.call(e,"constructor")&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||y.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=b.trim(n),n&&k.test(n.replace(S,"@").replace(A,"]").replace(E,"")))?Function("return "+n)():(b.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||b.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&b.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(j,"ms-").replace(D,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:v&&!v.call("\ufeff\u00a0")?function(e){return null==e?"":v.call(e)}:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?b.merge(n,"string"==typeof e?[e]:e):d.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(g)return g.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return f.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),b.isFunction(e)?(r=h.call(arguments,2),i=function(){return e.apply(n||this,r.concat(h.call(arguments)))},i.guid=e.guid=e.guid||b.guid++,i):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===b.type(r)){o=!0;for(u in r)b.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,b.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(b(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),b.ready.promise=function(t){if(!n)if(n=b.Deferred(),"complete"===o.readyState)setTimeout(b.ready);else if(o.addEventListener)o.addEventListener("DOMContentLoaded",H,!1),e.addEventListener("load",H,!1);else{o.attachEvent("onreadystatechange",H),e.attachEvent("onload",H);var r=!1;try{r=null==e.frameElement&&o.documentElement}catch(i){}r&&r.doScroll&&function a(){if(!b.isReady){try{r.doScroll("left")}catch(e){return setTimeout(a,50)}q(),b.ready()}}()}return n.promise(t)},b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=b.type(e);return b.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=b(o);var _={};function F(e){var t=_[e]={};return b.each(e.match(w)||[],function(e,n){t[n]=!0}),t}b.Callbacks=function(e){e="string"==typeof e?_[e]||F(e):b.extend({},e);var n,r,i,o,a,s,u=[],l=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=u.length,n=!0;u&&o>a;a++)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,u&&(l?l.length&&c(l.shift()):r?u=[]:p.disable())},p={add:function(){if(u){var t=u.length;(function i(t){b.each(t,function(t,n){var r=b.type(n);"function"===r?e.unique&&p.has(n)||u.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=u.length:r&&(s=t,c(r))}return this},remove:function(){return u&&b.each(arguments,function(e,t){var r;while((r=b.inArray(t,u,r))>-1)u.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?b.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],this},disable:function(){return u=l=r=t,this},disabled:function(){return!u},lock:function(){return l=t,r||p.disable(),this},locked:function(){return!l},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!u||i&&!l||(n?l.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},b.extend({Deferred:function(e){var t=[["resolve","done",b.Callbacks("once memory"),"resolved"],["reject","fail",b.Callbacks("once memory"),"rejected"],["notify","progress",b.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return b.Deferred(function(n){b.each(t,function(t,o){var a=o[0],s=b.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?b.extend(e,r):r}},i={};return r.pipe=r.then,b.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=h.call(arguments),r=n.length,i=1!==r||e&&b.isFunction(e.promise)?r:0,o=1===i?e:b.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?h.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,u,l;if(r>1)for(s=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(a(t,l,n)).fail(o.reject).progress(a(t,u,s)):--i;return i||o.resolveWith(l,n),o.promise()}}),b.support=function(){var t,n,r,a,s,u,l,c,p,f,d=o.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*"),r=d.getElementsByTagName("a")[0],!n||!r||!n.length)return{};s=o.createElement("select"),l=s.appendChild(o.createElement("option")),a=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={getSetAttribute:"t"!==d.className,leadingWhitespace:3===d.firstChild.nodeType,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:"/a"===r.getAttribute("href"),opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!a.value,optSelected:l.selected,enctype:!!o.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==o.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===o.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},a.checked=!0,t.noCloneChecked=a.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!l.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}a=o.createElement("input"),a.setAttribute("value",""),t.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),t.radioValue="t"===a.value,a.setAttribute("checked","t"),a.setAttribute("name","t"),u=o.createDocumentFragment(),u.appendChild(a),t.appendChecked=a.checked,t.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;return d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip,b(function(){var n,r,a,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",u=o.getElementsByTagName("body")[0];u&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",u.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",a=d.getElementsByTagName("td"),a[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===a[0].offsetHeight,a[0].style.display="",a[1].style.display="none",t.reliableHiddenOffsets=p&&0===a[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=4===d.offsetWidth,t.doesNotIncludeMarginInBodyOffset=1!==u.offsetTop,e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(o.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(u.style.zoom=1)),u.removeChild(n),n=d=a=r=null)}),n=s=u=l=r=a=null,t}();var O=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,B=/([A-Z])/g;function P(e,n,r,i){if(b.acceptData(e)){var o,a,s=b.expando,u="string"==typeof n,l=e.nodeType,p=l?b.cache:e,f=l?e[s]:e[s]&&s;if(f&&p[f]&&(i||p[f].data)||!u||r!==t)return f||(l?e[s]=f=c.pop()||b.guid++:f=s),p[f]||(p[f]={},l||(p[f].toJSON=b.noop)),("object"==typeof n||"function"==typeof n)&&(i?p[f]=b.extend(p[f],n):p[f].data=b.extend(p[f].data,n)),o=p[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[b.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[b.camelCase(n)])):a=o,a}}function R(e,t,n){if(b.acceptData(e)){var r,i,o,a=e.nodeType,s=a?b.cache:e,u=a?e[b.expando]:b.expando;if(s[u]){if(t&&(o=n?s[u]:s[u].data)){b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in o?t=[t]:(t=b.camelCase(t),t=t in o?[t]:t.split(" "));for(r=0,i=t.length;i>r;r++)delete o[t[r]];if(!(n?$:b.isEmptyObject)(o))return}(n||(delete s[u].data,$(s[u])))&&(a?b.cleanData([e],!0):b.support.deleteExpando||s!=s.window?delete s[u]:s[u]=null)}}}b.extend({cache:{},expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!$(e)},data:function(e,t,n){return P(e,t,n)},removeData:function(e,t){return R(e,t)},_data:function(e,t,n){return P(e,t,n,!0)},_removeData:function(e,t){return R(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),b.fn.extend({data:function(e,n){var r,i,o=this[0],a=0,s=null;if(e===t){if(this.length&&(s=b.data(o),1===o.nodeType&&!b._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>a;a++)i=r[a].name,i.indexOf("data-")||(i=b.camelCase(i.slice(5)),W(o,i,s[i]));b._data(o,"parsedAttrs",!0)}return s}return"object"==typeof e?this.each(function(){b.data(this,e)}):b.access(this,function(n){return n===t?o?W(o,e,b.data(o,e)):null:(this.each(function(){b.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){b.removeData(this,e)})}});function W(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(B,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:O.test(r)?b.parseJSON(r):r}catch(o){}b.data(e,n,r)}else r=t}return r}function $(e){var t;for(t in e)if(("data"!==t||!b.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}b.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=b._data(e,n),r&&(!i||b.isArray(r)?i=b._data(e,n,b.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=b.queue(e,t),r=n.length,i=n.shift(),o=b._queueHooks(e,t),a=function(){b.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return b._data(e,n)||b._data(e,n,{empty:b.Callbacks("once memory").add(function(){b._removeData(e,t+"queue"),b._removeData(e,n)})})}}),b.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?b.queue(this[0],e):n===t?this:this.each(function(){var t=b.queue(this,e,n);b._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&b.dequeue(this,e)})},dequeue:function(e){return this.each(function(){b.dequeue(this,e)})},delay:function(e,t){return e=b.fx?b.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=b.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=b._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var I,z,X=/[\t\r\n]/g,U=/\r/g,V=/^(?:input|select|textarea|button|object)$/i,Y=/^(?:a|area)$/i,J=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,G=/^(?:checked|selected)$/i,Q=b.support.getSetAttribute,K=b.support.input;b.fn.extend({attr:function(e,t){return b.access(this,b.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e)})},prop:function(e,t){return b.access(this,b.prop,e,t,arguments.length>1)},removeProp:function(e){return e=b.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=b.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?b.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return b.isFunction(e)?this.each(function(n){b(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=b(this),u=t,l=e.match(w)||[];while(o=l[a++])u=r?u:!s.hasClass(o),s[u?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&b._data(this,"__className__",this.className),this.className=this.className||e===!1?"":b._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(X," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=b.isFunction(e),this.each(function(n){var o,a=b(this);1===this.nodeType&&(o=i?e.call(this,n,a.val()):e,null==o?o="":"number"==typeof o?o+="":b.isArray(o)&&(o=b.map(o,function(e){return null==e?"":e+""})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=b.valHooks[o.type]||b.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(U,""):null==n?"":n)}}}),b.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;for(;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(b.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&b.nodeName(n.parentNode,"optgroup"))){if(t=b(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=b.makeArray(t);return b(e).find("option").each(function(){this.selected=b.inArray(b(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var o,a,s,u=e.nodeType;if(e&&3!==u&&8!==u&&2!==u)return typeof e.getAttribute===i?b.prop(e,n,r):(a=1!==u||!b.isXMLDoc(e),a&&(n=n.toLowerCase(),o=b.attrHooks[n]||(J.test(n)?z:I)),r===t?o&&a&&"get"in o&&null!==(s=o.get(e,n))?s:(typeof e.getAttribute!==i&&(s=e.getAttribute(n)),null==s?t:s):null!==r?o&&a&&"set"in o&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r):(b.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=b.propFix[n]||n,J.test(n)?!Q&&G.test(n)?e[b.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!b.support.radioValue&&"radio"===t&&b.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!b.isXMLDoc(e),a&&(n=b.propFix[n]||n,o=b.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):V.test(e.nodeName)||Y.test(e.nodeName)&&e.href?0:t}}}}),z={get:function(e,n){var r=b.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?K&&Q?null!=i:G.test(n)?e[b.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?b.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&b.propFix[n]||n,n):e[b.camelCase("default-"+n)]=e[n]=!0,n}},K&&Q||(b.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return b.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t},set:function(e,n,r){return b.nodeName(e,"input")?(e.defaultValue=n,t):I&&I.set(e,n,r)}}),Q||(I=b.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},b.attrHooks.contenteditable={get:I.get,set:function(e,t,n){I.set(e,""===t?!1:t,n)}},b.each(["width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),b.support.hrefNormalized||(b.each(["href","src","width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),b.each(["href","src"],function(e,t){b.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),b.support.style||(b.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),b.support.enctype||(b.propFix.enctype="encoding"),b.support.checkOn||b.each(["radio","checkbox"],function(){b.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),b.each(["radio","checkbox"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,n){return b.isArray(n)?e.checked=b.inArray(b(e).val(),n)>=0:t}})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}b.event={global:{},add:function(e,n,r,o,a){var s,u,l,c,p,f,d,h,g,m,y,v=b._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=b.guid++),(u=v.events)||(u=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof b===i||e&&b.event.triggered===e.type?t:b.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(w)||[""],l=n.length;while(l--)s=rt.exec(n[l])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),p=b.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=b.event.special[g]||{},d=b.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&b.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=u[g])||(h=u[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),b.event.global[g]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,p,f,d,h,g,m=b.hasData(e)&&b._data(e);if(m&&(c=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(s=rt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=b.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));u&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||b.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)b.event.remove(e,d+t[l],n,r,!0);b.isEmptyObject(c)&&(delete m.handle,b._removeData(e,"events"))}},trigger:function(n,r,i,a){var s,u,l,c,p,f,d,h=[i||o],g=y.call(n,"type")?n.type:n,m=y.call(n,"namespace")?n.namespace.split("."):[];if(l=f=i=i||o,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+b.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),u=0>g.indexOf(":")&&"on"+g,n=n[b.expando]?n:new b.Event(g,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:b.makeArray(r,[n]),p=b.event.special[g]||{},a||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!a&&!p.noBubble&&!b.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(l=l.parentNode);l;l=l.parentNode)h.push(l),f=l;f===(i.ownerDocument||o)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((l=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(b._data(l,"events")||{})[n.type]&&b._data(l,"handle"),s&&s.apply(l,r),s=u&&l[u],s&&b.acceptData(l)&&s.apply&&s.apply(l,r)===!1&&n.preventDefault();if(n.type=g,!(a||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===g&&b.nodeName(i,"a")||!b.acceptData(i)||!u||!i[g]||b.isWindow(i))){f=i[u],f&&(i[u]=null),b.event.triggered=g;try{i[g]()}catch(v){}b.event.triggered=t,f&&(i[u]=f)}return n.result}},dispatch:function(e){e=b.event.fix(e);var n,r,i,o,a,s=[],u=h.call(arguments),l=(b._data(this,"events")||{})[e.type]||[],c=b.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=b.event.handlers.call(this,e,l),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(o=[],a=0;u>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?b(r,this).index(l)>=0:b.find(r,this,null,[l]).length),o[r]&&o.push(i);o.length&&s.push({elem:l,handlers:o})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[b.expando])return e;var t,n,r,i=e.type,a=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new b.Event(a),t=r.length;while(t--)n=r[t],e[n]=a[n];return e.target||(e.target=a.srcElement||o),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,a):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,a,s=n.button,u=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||o,a=i.documentElement,r=i.body,e.pageX=n.clientX+(a&&a.scrollLeft||r&&r.scrollLeft||0)-(a&&a.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(a&&a.scrollTop||r&&r.scrollTop||0)-(a&&a.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&u&&(e.relatedTarget=u===e.target?n.toElement:u),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return b.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==o.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===o.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},b.removeEvent=o.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},b.Event=function(e,n){return this instanceof b.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&b.extend(this,n),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0,t):new b.Event(e,n)},b.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){b.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;
    return(!i||i!==r&&!b.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),b.support.submitBubbles||(b.event.special.submit={setup:function(){return b.nodeName(this,"form")?!1:(b.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=b.nodeName(n,"input")||b.nodeName(n,"button")?n.form:t;r&&!b._data(r,"submitBubbles")&&(b.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),b._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return b.nodeName(this,"form")?!1:(b.event.remove(this,"._submit"),t)}}),b.support.changeBubbles||(b.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(b.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),b.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate("change",this,e,!0)})),!1):(b.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!b._data(t,"changeBubbles")&&(b.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||b.event.simulate("change",this.parentNode,e,!0)}),b._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return b.event.remove(this,"._change"),!Z.test(this.nodeName)}}),b.support.focusinBubbles||b.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){b.event.simulate(t,e.target,b.event.fix(e),!0)};b.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),b.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return b().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=b.guid++)),this.each(function(){b.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){b.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){b.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?b.event.trigger(e,n,r,!0):t}}),function(e,t){var n,r,i,o,a,s,u,l,c,p,f,d,h,g,m,y,v,x="sizzle"+-new Date,w=e.document,T={},N=0,C=0,k=it(),E=it(),S=it(),A=typeof t,j=1<<31,D=[],L=D.pop,H=D.push,q=D.slice,M=D.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},_="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=F.replace("w","w#"),B="([*^$|!~]?=)",P="\\["+_+"*("+F+")"+_+"*(?:"+B+_+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+O+")|)|)"+_+"*\\]",R=":("+F+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+P.replace(3,8)+")*)|.*)\\)|)",W=RegExp("^"+_+"+|((?:^|[^\\\\])(?:\\\\.)*)"+_+"+$","g"),$=RegExp("^"+_+"*,"+_+"*"),I=RegExp("^"+_+"*([\\x20\\t\\r\\n\\f>+~])"+_+"*"),z=RegExp(R),X=RegExp("^"+O+"$"),U={ID:RegExp("^#("+F+")"),CLASS:RegExp("^\\.("+F+")"),NAME:RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:RegExp("^("+F.replace("w","w*")+")"),ATTR:RegExp("^"+P),PSEUDO:RegExp("^"+R),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+_+"*(even|odd|(([+-]|)(\\d*)n|)"+_+"*(?:([+-]|)"+_+"*(\\d+)|))"+_+"*\\)|)","i"),needsContext:RegExp("^"+_+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+_+"*((?:-\\d)?\\d*)"+_+"*\\)|)(?=[^-]|$)","i")},V=/[\x20\t\r\n\f]*[+~]/,Y=/^[^{]+\{\s*\[native code/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,G=/^(?:input|select|textarea|button)$/i,Q=/^h\d$/i,K=/'|\\/g,Z=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,et=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{q.call(w.documentElement.childNodes,0)[0].nodeType}catch(nt){q=function(e){var t,n=[];while(t=this[e++])n.push(t);return n}}function rt(e){return Y.test(e+"")}function it(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>i.cacheLength&&delete e[t.shift()],e[n]=r}}function ot(e){return e[x]=!0,e}function at(e){var t=p.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function st(e,t,n,r){var i,o,a,s,u,l,f,g,m,v;if((t?t.ownerDocument||t:w)!==p&&c(t),t=t||p,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!d&&!r){if(i=J.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&y(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return H.apply(n,q.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&T.getByClassName&&t.getElementsByClassName)return H.apply(n,q.call(t.getElementsByClassName(a),0)),n}if(T.qsa&&!h.test(e)){if(f=!0,g=x,m=t,v=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){l=ft(e),(f=t.getAttribute("id"))?g=f.replace(K,"\\$&"):t.setAttribute("id",g),g="[id='"+g+"'] ",u=l.length;while(u--)l[u]=g+dt(l[u]);m=V.test(e)&&t.parentNode||t,v=l.join(",")}if(v)try{return H.apply(n,q.call(m.querySelectorAll(v),0)),n}catch(b){}finally{f||t.removeAttribute("id")}}}return wt(e.replace(W,"$1"),t,n,r)}a=st.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},c=st.setDocument=function(e){var n=e?e.ownerDocument||e:w;return n!==p&&9===n.nodeType&&n.documentElement?(p=n,f=n.documentElement,d=a(n),T.tagNameNoComments=at(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),T.attributes=at(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),T.getByClassName=at(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),T.getByName=at(function(e){e.id=x+0,e.innerHTML="<a name='"+x+"'></a><div name='"+x+"'></div>",f.insertBefore(e,f.firstChild);var t=n.getElementsByName&&n.getElementsByName(x).length===2+n.getElementsByName(x+0).length;return T.getIdNotName=!n.getElementById(x),f.removeChild(e),t}),i.attrHandle=at(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==A&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},T.getIdNotName?(i.find.ID=function(e,t){if(typeof t.getElementById!==A&&!d){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){return e.getAttribute("id")===t}}):(i.find.ID=function(e,n){if(typeof n.getElementById!==A&&!d){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==A&&r.getAttributeNode("id").value===e?[r]:t:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){var n=typeof e.getAttributeNode!==A&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=T.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.NAME=T.getByName&&function(e,n){return typeof n.getElementsByName!==A?n.getElementsByName(name):t},i.find.CLASS=T.getByClassName&&function(e,n){return typeof n.getElementsByClassName===A||d?t:n.getElementsByClassName(e)},g=[],h=[":focus"],(T.qsa=rt(n.querySelectorAll))&&(at(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||h.push("\\["+_+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||h.push(":checked")}),at(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&h.push("[*^$]="+_+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||h.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),h.push(",.*:")})),(T.matchesSelector=rt(m=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){T.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",R)}),h=RegExp(h.join("|")),g=RegExp(g.join("|")),y=rt(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},v=f.compareDocumentPosition?function(e,t){var r;return e===t?(u=!0,0):(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&r||e.parentNode&&11===e.parentNode.nodeType?e===n||y(w,e)?-1:t===n||y(w,t)?1:0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return u=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:0;if(o===a)return ut(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?ut(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},u=!1,[0,0].sort(v),T.detectDuplicates=u,p):p},st.matches=function(e,t){return st(e,null,null,t)},st.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Z,"='$1']"),!(!T.matchesSelector||d||g&&g.test(t)||h.test(t)))try{var n=m.call(e,t);if(n||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return st(t,p,null,[e]).length>0},st.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},st.attr=function(e,t){var n;return(e.ownerDocument||e)!==p&&c(e),d||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):d||T.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},st.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},st.uniqueSort=function(e){var t,n=[],r=1,i=0;if(u=!T.detectDuplicates,e.sort(v),u){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e};function ut(e,t){var n=t&&e,r=n&&(~t.sourceIndex||j)-(~e.sourceIndex||j);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function lt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ct(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function pt(e){return ot(function(t){return t=+t,ot(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}o=st.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=st.selectors={cacheLength:50,createPseudo:ot,match:U,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||"").replace(et,tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||st.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&st.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return U.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&z.test(n)&&(t=ft(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(et,tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[e+" "];return t||(t=RegExp("(^|"+_+")"+e+"("+_+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==A&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=st.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[x]||(m[x]={}),l=c[e]||[],d=l[0]===N&&l[1],f=l[0]===N&&l[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[N,d,f];break}}else if(v&&(l=(t[x]||(t[x]={}))[e])&&l[0]===N)f=l[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[x]||(p[x]={}))[e]=[N,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||st.error("unsupported pseudo: "+e);return r[x]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ot(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=M.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ot(function(e){var t=[],n=[],r=s(e.replace(W,"$1"));return r[x]?ot(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ot(function(e){return function(t){return st(e,t).length>0}}),contains:ot(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ot(function(e){return X.test(e||"")||st.error("unsupported lang: "+e),e=e.replace(et,tt).toLowerCase(),function(t){var n;do if(n=d?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return Q.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:pt(function(){return[0]}),last:pt(function(e,t){return[t-1]}),eq:pt(function(e,t,n){return[0>n?n+t:n]}),even:pt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:pt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:pt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:pt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[n]=lt(n);for(n in{submit:!0,reset:!0})i.pseudos[n]=ct(n);function ft(e,t){var n,r,o,a,s,u,l,c=E[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=i.preFilter;while(s){(!n||(r=$.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(o=[])),n=!1,(r=I.exec(s))&&(n=r.shift(),o.push({value:n,type:r[0].replace(W," ")}),s=s.slice(n.length));for(a in i.filter)!(r=U[a].exec(s))||l[a]&&!(r=l[a](r))||(n=r.shift(),o.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?st.error(e):E(e,u).slice(0)}function dt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function ht(e,t,n){var i=t.dir,o=n&&"parentNode"===i,a=C++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,s){var u,l,c,p=N+" "+a;if(s){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[x]||(t[x]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,s)||r,l[1]===!0)return!0}}function gt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function mt(e,t,n,r,i){var o,a=[],s=0,u=e.length,l=null!=t;for(;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function yt(e,t,n,r,i,o){return r&&!r[x]&&(r=yt(r)),i&&!i[x]&&(i=yt(i,o)),ot(function(o,a,s,u){var l,c,p,f=[],d=[],h=a.length,g=o||xt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:mt(g,f,e,s,u),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,u),r){l=mt(y,d),r(l,[],s,u),c=l.length;while(c--)(p=l[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?M.call(o,p):f[c])>-1&&(o[l]=!(a[l]=p))}}else y=mt(y===a?y.splice(h,y.length):y),i?i(null,a,y,u):H.apply(a,y)})}function vt(e){var t,n,r,o=e.length,a=i.relative[e[0].type],s=a||i.relative[" "],u=a?1:0,c=ht(function(e){return e===t},s,!0),p=ht(function(e){return M.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>u;u++)if(n=i.relative[e[u].type])f=[ht(gt(f),n)];else{if(n=i.filter[e[u].type].apply(null,e[u].matches),n[x]){for(r=++u;o>r;r++)if(i.relative[e[r].type])break;return yt(u>1&&gt(f),u>1&&dt(e.slice(0,u-1)).replace(W,"$1"),n,r>u&&vt(e.slice(u,r)),o>r&&vt(e=e.slice(r)),o>r&&dt(e))}f.push(n)}return gt(f)}function bt(e,t){var n=0,o=t.length>0,a=e.length>0,s=function(s,u,c,f,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,T=l,C=s||a&&i.find.TAG("*",d&&u.parentNode||u),k=N+=null==T?1:Math.random()||.1;for(w&&(l=u!==p&&u,r=n);null!=(h=C[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,u,c)){f.push(h);break}w&&(N=k,r=++n)}o&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,o&&b!==v){g=0;while(m=t[g++])m(x,y,u,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=L.call(f));y=mt(y)}H.apply(f,y),w&&!s&&y.length>0&&v+t.length>1&&st.uniqueSort(f)}return w&&(N=k,l=T),x};return o?ot(s):s}s=st.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=ft(e)),n=t.length;while(n--)o=vt(t[n]),o[x]?r.push(o):i.push(o);o=S(e,bt(i,r))}return o};function xt(e,t,n){var r=0,i=t.length;for(;i>r;r++)st(e,t[r],n);return n}function wt(e,t,n,r){var o,a,u,l,c,p=ft(e);if(!r&&1===p.length){if(a=p[0]=p[0].slice(0),a.length>2&&"ID"===(u=a[0]).type&&9===t.nodeType&&!d&&i.relative[a[1].type]){if(t=i.find.ID(u.matches[0].replace(et,tt),t)[0],!t)return n;e=e.slice(a.shift().value.length)}o=U.needsContext.test(e)?0:a.length;while(o--){if(u=a[o],i.relative[l=u.type])break;if((c=i.find[l])&&(r=c(u.matches[0].replace(et,tt),V.test(a[0].type)&&t.parentNode||t))){if(a.splice(o,1),e=r.length&&dt(a),!e)return H.apply(n,q.call(r,0)),n;break}}}return s(e,p)(r,t,d,n,V.test(e)),n}i.pseudos.nth=i.pseudos.eq;function Tt(){}i.filters=Tt.prototype=i.pseudos,i.setFilters=new Tt,c(),st.attr=b.attr,b.find=st,b.expr=st.selectors,b.expr[":"]=b.expr.pseudos,b.unique=st.uniqueSort,b.text=st.getText,b.isXMLDoc=st.isXML,b.contains=st.contains}(e);var at=/Until$/,st=/^(?:parents|prev(?:Until|All))/,ut=/^.[^:#\[\.,]*$/,lt=b.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};b.fn.extend({find:function(e){var t,n,r,i=this.length;if("string"!=typeof e)return r=this,this.pushStack(b(e).filter(function(){for(t=0;i>t;t++)if(b.contains(r[t],this))return!0}));for(n=[],t=0;i>t;t++)b.find(e,this[t],n);return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=b(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(b.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1))},filter:function(e){return this.pushStack(ft(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?lt.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,o=[],a=lt.test(e)||"string"!=typeof e?b(e,t||this.context):0;for(;i>r;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&11!==n.nodeType){if(a?a.index(n)>-1:b.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}}return this.pushStack(o.length>1?b.unique(o):o)},index:function(e){return e?"string"==typeof e?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);return this.pushStack(b.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),b.fn.andSelf=b.fn.addBack;function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}b.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return b.dir(e,"parentNode")},parentsUntil:function(e,t,n){return b.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return b.dir(e,"nextSibling")},prevAll:function(e){return b.dir(e,"previousSibling")},nextUntil:function(e,t,n){return b.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return b.dir(e,"previousSibling",n)},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return b.sibling(e.firstChild)},contents:function(e){return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes)}},function(e,t){b.fn[e]=function(n,r){var i=b.map(this,t,n);return at.test(e)||(r=n),r&&"string"==typeof r&&(i=b.filter(r,i)),i=this.length>1&&!ct[e]?b.unique(i):i,this.length>1&&st.test(e)&&(i=i.reverse()),this.pushStack(i)}}),b.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t)},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!b(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(t=t||0,b.isFunction(t))return b.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return b.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=b.grep(e,function(e){return 1===e.nodeType});if(ut.test(t))return b.filter(t,r,!n);t=b.filter(t,r)}return b.grep(e,function(e){return b.inArray(e,t)>=0===n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Nt=/^(?:checkbox|radio)$/i,Ct=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:b.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(o),Dt=jt.appendChild(o.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,b.fn.extend({text:function(e){return b.access(this,function(e){return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(b.isFunction(e))return this.each(function(t){b(this).wrapAll(e.call(this,t))});if(this[0]){var t=b(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return b.isFunction(e)?this.each(function(t){b(this).wrapInner(e.call(this,t))}):this.each(function(){var t=b(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=b.isFunction(e);return this.each(function(n){b(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){b.nodeName(this,"body")||b(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=0;for(;null!=(n=this[r]);r++)(!e||b.filter(e,[n]).length>0)&&(t||1!==n.nodeType||b.cleanData(Ot(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Mt(Ot(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&b.cleanData(Ot(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&b.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return b.clone(this,e,t)})},html:function(e){return b.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!b.support.htmlSerialize&&mt.test(e)||!b.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(b.cleanData(Ot(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=b.isFunction(e);return t||"string"==typeof e||(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;n&&(b(this).remove(),n.insertBefore(e,t))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=f.apply([],e);var i,o,a,s,u,l,c=0,p=this.length,d=this,h=p-1,g=e[0],m=b.isFunction(g);if(m||!(1>=p||"string"!=typeof g||b.support.checkClone)&&Ct.test(g))return this.each(function(i){var o=d.eq(i);m&&(e[0]=g.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(p&&(l=b.buildFragment(e,this[0].ownerDocument,!1,this),i=l.firstChild,1===l.childNodes.length&&(l=i),i)){for(n=n&&b.nodeName(i,"tr"),s=b.map(Ot(l,"script"),Ht),a=s.length;p>c;c++)o=l,c!==h&&(o=b.clone(o,!0,!0),a&&b.merge(s,Ot(o,"script"))),r.call(n&&b.nodeName(this[c],"table")?Lt(this[c],"tbody"):this[c],o,c);if(a)for(u=s[s.length-1].ownerDocument,b.map(s,qt),c=0;a>c;c++)o=s[c],kt.test(o.type||"")&&!b._data(o,"globalEval")&&b.contains(u,o)&&(o.src?b.ajax({url:o.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):b.globalEval((o.text||o.textContent||o.innerHTML||"").replace(St,"")));l=i=null}return this}});function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function Ht(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function Mt(e,t){var n,r=0;for(;null!=(n=e[r]);r++)b._data(n,"globalEval",!t||b._data(t[r],"globalEval"))}function _t(e,t){if(1===t.nodeType&&b.hasData(e)){var n,r,i,o=b._data(e),a=b._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)b.event.add(t,n,s[n][r])}a.data&&(a.data=b.extend({},a.data))}}function Ft(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!b.support.noCloneEvent&&t[b.expando]){i=b._data(t);for(r in i.events)b.removeEvent(t,r,i.handle);t.removeAttribute(b.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Nt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){b.fn[e]=function(e){var n,r=0,i=[],o=b(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),b(o[r])[t](n),d.apply(i,n.get());return this.pushStack(i)}});function Ot(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||b.nodeName(o,n)?s.push(o):b.merge(s,Ot(o,n));return n===t||n&&b.nodeName(e,n)?b.merge([e],s):s}function Bt(e){Nt.test(e.type)&&(e.defaultChecked=e.checked)}b.extend({clone:function(e,t,n){var r,i,o,a,s,u=b.contains(e.ownerDocument,e);if(b.support.html5Clone||b.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(b.support.noCloneEvent&&b.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||b.isXMLDoc(e)))for(r=Ot(o),s=Ot(e),a=0;null!=(i=s[a]);++a)r[a]&&Ft(i,r[a]);if(t)if(n)for(s=s||Ot(e),r=r||Ot(o),a=0;null!=(i=s[a]);a++)_t(i,r[a]);else _t(e,o);return r=Ot(o,"script"),r.length>0&&Mt(r,!u&&Ot(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,u,l,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===b.type(o))b.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),u=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[u]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!b.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!b.support.tbody){o="table"!==u||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)b.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l)
    }b.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),b.support.appendChecked||b.grep(Ot(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===b.inArray(o,r))&&(a=b.contains(o.ownerDocument,o),s=Ot(f.appendChild(o),"script"),a&&Mt(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,u=b.expando,l=b.cache,p=b.support.deleteExpando,f=b.event.special;for(;null!=(n=e[s]);s++)if((t||b.acceptData(n))&&(o=n[u],a=o&&l[o])){if(a.events)for(r in a.events)f[r]?b.event.remove(n,r):b.removeEvent(n,r,a.handle);l[o]&&(delete l[o],p?delete n[u]:typeof n.removeAttribute!==i?n.removeAttribute(u):n[u]=null,c.push(o))}}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+x+")(.*)$","i"),Yt=RegExp("^("+x+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+x+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===b.css(e,"display")||!b.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=b._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=b._data(r,"olddisplay",un(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&b._data(r,"olddisplay",i?n:b.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}b.fn.extend({css:function(e,n){return b.access(this,function(e,n,r){var i,o,a={},s=0;if(b.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=b.css(e,n[s],!1,o);return a}return r!==t?b.style(e,n,r):b.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?b(this).show():b(this).hide()})}}),b.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=b.camelCase(n),l=e.style;if(n=b.cssProps[u]||(b.cssProps[u]=tn(l,u)),s=b.cssHooks[n]||b.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(b.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||b.cssNumber[u]||(r+="px"),b.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=b.camelCase(n);return n=b.cssProps[u]||(b.cssProps[u]=tn(e.style,u)),s=b.cssHooks[n]||b.cssHooks[u],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||b.isNumeric(o)?o||0:a):a},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||b.contains(e.ownerDocument,e)||(u=b.style(e,n)),Yt.test(u)&&Ut.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):o.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),Yt.test(u)&&!zt.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=b.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=b.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=b.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=b.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=b.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function un(e){var t=o,n=Gt[e];return n||(n=ln(e,t),"none"!==n&&n||(Pt=(Pt||b("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=ln(e,t),Pt.detach()),Gt[e]=n),n}function ln(e,t){var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],"display");return n.remove(),r}b.each(["height","width"],function(e,n){b.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(b.css(e,"display"))?b.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,i),i):0)}}}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===b.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),b(function(){b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,n){return n?b.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!b.support.pixelPosition&&b.fn.position&&b.each(["top","left"],function(e,n){b.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?b(e).position()[n]+"px":r):t}}})}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!b.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||b.css(e,"display"))},b.expr.filters.visible=function(e){return!b.expr.filters.hidden(e)}),b.each({margin:"",padding:"",border:"Width"},function(e,t){b.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(b.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;b.fn.extend({serialize:function(){return b.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=b.prop(this,"elements");return e?b.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!b(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=b(this).val();return null==n?null:b.isArray(n)?b.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),b.param=function(e,n){var r,i=[],o=function(e,t){t=b.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional),b.isArray(e)||e.jquery&&!b.isPlainObject(e))b.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(b.isArray(t))b.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==b.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){b.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),b.fn.hover=function(e,t){return this.mouseenter(e).mouseleave(t||e)};var mn,yn,vn=b.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Nn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Cn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=b.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=a.href}catch(Ln){yn=o.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(b.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(u){var l;return o[u]=!0,b.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||a||o[c]?a?!(l=c):t:(n.dataTypes.unshift(c),s(c),!1)}),l}return s(n.dataTypes[0])||!o["*"]&&s("*")}function Mn(e,n){var r,i,o=b.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&b.extend(!0,e,r),e}b.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),b.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&b.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?b("<div>").append(b.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},b.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){b.fn[t]=function(e){return this.on(t,e)}}),b.each(["get","post"],function(e,n){b[n]=function(e,r,i,o){return b.isFunction(r)&&(o=o||i,i=r,r=t),b.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Nn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Mn(Mn(e,b.ajaxSettings),t):Mn(b.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,u,l,c,p=b.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?b(f):b.event,h=b.Deferred(),g=b.Callbacks("once memory"),m=p.statusCode||{},y={},v={},x=0,T="canceled",N={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else N.always(e[N.status]);return this},abort:function(e){var t=e||T;return l&&l.abort(t),k(0,t),this}};if(h.promise(N).complete=g.add,N.success=N.done,N.error=N.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=b.trim(p.dataType||"*").toLowerCase().match(w)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?80:443))==(mn[3]||("http:"===mn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=b.param(p.data,p.traditional)),qn(An,p,n,N),2===x)return N;u=p.global,u&&0===b.active++&&b.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Cn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(b.lastModified[o]&&N.setRequestHeader("If-Modified-Since",b.lastModified[o]),b.etag[o]&&N.setRequestHeader("If-None-Match",b.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&N.setRequestHeader("Content-Type",p.contentType),N.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)N.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,N,p)===!1||2===x))return N.abort();T="abort";for(i in{success:1,error:1,complete:1})N[i](p[i]);if(l=qn(jn,p,n,N)){N.readyState=1,u&&d.trigger("ajaxSend",[N,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){N.abort("timeout")},p.timeout));try{x=1,l.send(y,k)}catch(C){if(!(2>x))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,C=n;2!==x&&(x=2,s&&clearTimeout(s),l=t,a=i||"",N.readyState=e>0?4:0,r&&(w=_n(p,N,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=N.getResponseHeader("Last-Modified"),T&&(b.lastModified[o]=T),T=N.getResponseHeader("etag"),T&&(b.etag[o]=T)),204===e?(c=!0,C="nocontent"):304===e?(c=!0,C="notmodified"):(c=Fn(p,w),C=c.state,y=c.data,v=c.error,c=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),N.status=e,N.statusText=(n||C)+"",c?h.resolveWith(f,[y,C,N]):h.rejectWith(f,[N,C,v]),N.statusCode(m),m=t,u&&d.trigger(c?"ajaxSuccess":"ajaxError",[N,p,c?y:v]),g.fireWith(f,[N,C]),u&&(d.trigger("ajaxComplete",[N,p]),--b.active||b.event.trigger("ajaxStop")))}return N},getScript:function(e,n){return b.get(e,t,n,"script")},getJSON:function(e,t,n){return b.get(e,t,n,"json")}});function _n(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(s in c)s in r&&(n[c[s]]=r[s]);while("*"===l[0])l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in u)if(u[s]&&u[s].test(o)){l.unshift(s);break}if(l[0]in r)a=l[0];else{for(s in r){if(!l[0]||e.converters[s+" "+l[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function Fn(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(i in e.converters)a[i.toLowerCase()]=e.converters[i];for(;r=u[++s];)if("*"!==r){if("*"!==l&&l!==r){if(i=a[l+" "+r]||a["* "+r],!i)for(n in a)if(o=n.split(" "),o[1]===r&&(i=a[l+" "+o[0]]||a["* "+o[0]])){i===!0?i=a[n]:a[n]!==!0&&(r=o[0],u.splice(s--,0,r));break}if(i!==!0)if(i&&e["throws"])t=i(t);else try{t=i(t)}catch(c){return{state:"parsererror",error:i?c:"No conversion from "+l+" to "+r}}}l=r}return{state:"success",data:t}}b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return b.globalEval(e),e}}}),b.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),b.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=o.head||b("head")[0]||o.documentElement;return{send:function(t,i){n=o.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var On=[],Bn=/(=)\?(?=&|$)|\?\?/;b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=On.pop()||b.expando+"_"+vn++;return this[e]=!0,e}}),b.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||b.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,On.push(o)),s&&b.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}b.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=b.ajaxSettings.xhr(),b.support.cors=!!Rn&&"withCredentials"in Rn,Rn=b.support.ajax=!!Rn,Rn&&b.ajaxTransport(function(n){if(!n.crossDomain||b.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=b.noop,$n&&delete Pn[a]),i)4!==u.readyState&&u.abort();else{p={},s=u.status,l=u.getAllResponseHeaders(),"string"==typeof u.responseText&&(p.text=u.responseText);try{c=u.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,l)},n.async?4===u.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},b(e).unload($n)),Pn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+x+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=Yn.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(b.cssNumber[e]?"":"px"),"px"!==r&&s){s=b.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,b.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=b.now()}function Zn(e,t){b.each(t,function(t,n){var r=(Qn[t]||[]).concat(Qn["*"]),i=0,o=r.length;for(;o>i;i++)if(r[i].call(e,t,n))return})}function er(e,t,n){var r,i,o=0,a=Gn.length,s=b.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;for(;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=b.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(tr(c,l.opts.specialEasing);a>o;o++)if(r=Gn[o].call(l,e,c,l.opts))return r;return Zn(l,c),b.isFunction(l.opts.start)&&l.opts.start.call(e,l),b.fx.timer(b.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function tr(e,t){var n,r,i,o,a;for(i in e)if(r=b.camelCase(i),o=t[r],n=e[i],b.isArray(n)&&(o=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),a=b.cssHooks[r],a&&"expand"in a){n=a.expand(n),delete e[r];for(i in n)i in e||(e[i]=n[i],t[i]=o)}else t[r]=o}b.Animation=b.extend(er,{tweener:function(e,t){b.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,u,l,c,p,f=this,d=e.style,h={},g=[],m=e.nodeType&&nn(e);n.queue||(c=b._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,p=c.empty.fire,c.empty.fire=function(){c.unqueued||p()}),c.unqueued++,f.always(function(){f.always(function(){c.unqueued--,b.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===b.css(e,"display")&&"none"===b.css(e,"float")&&(b.support.inlineBlockNeedsLayout&&"inline"!==un(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",b.support.shrinkWrapBlocks||f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(i in t)if(a=t[i],Vn.exec(a)){if(delete t[i],u=u||"toggle"===a,a===(m?"hide":"show"))continue;g.push(i)}if(o=g.length){s=b._data(e,"fxshow")||b._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?b(e).show():f.done(function(){b(e).hide()}),f.done(function(){var t;b._removeData(e,"fxshow");for(t in h)b.style(e,t,h[t])});for(i=0;o>i;i++)r=g[i],l=f.createTween(r,m?s[r]:0),h[r]=s[r]||b.style(e,r),r in s||(s[r]=l.start,m&&(l.end=l.start,l.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(b.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=b.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[b.cssProps[e.prop]]||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},b.each(["toggle","show","hide"],function(e,t){var n=b.fn[t];b.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),b.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=b.isEmptyObject(e),o=b.speed(t,n,r),a=function(){var t=er(this,b.extend({},e),o);a.finish=function(){t.stop(!0)},(i||b._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=b.timers,a=b._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&b.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=b._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=b.timers,a=r?r.length:0;for(n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}b.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){b.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),b.speed=function(e,t,n){var r=e&&"object"==typeof e?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};return r.duration=b.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue)},r},b.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){var e,n=b.timers,r=0;for(Xn=b.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||b.fx.stop(),Xn=t},b.fx.timer=function(e){e()&&b.timers.push(e)&&b.fx.start()},b.fx.interval=13,b.fx.start=function(){Un||(Un=setInterval(b.fx.tick,b.fx.interval))},b.fx.stop=function(){clearInterval(Un),Un=null},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){return b.grep(b.timers,function(t){return e===t.elem}).length}),b.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){b.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,b.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},b.offset={setOffset:function(e,t,n){var r=b.css(e,"position");"static"===r&&(e.style.position="relative");var i=b(e),o=i.offset(),a=b.css(e,"top"),s=b.css(e,"left"),u=("absolute"===r||"fixed"===r)&&b.inArray("auto",[a,s])>-1,l={},c={},p,f;u?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),b.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(l.top=t.top-o.top+p),null!=t.left&&(l.left=t.left-o.left+f),"using"in t?t.using.call(e,l):i.css(l)}},b.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===b.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],"html")||(n=e.offset()),n.top+=b.css(e[0],"borderTopWidth",!0),n.left+=b.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-b.css(r,"marginTop",!0),left:t.left-n.left-b.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||o.documentElement;while(e&&!b.nodeName(e,"html")&&"static"===b.css(e,"position"))e=e.offsetParent;return e||o.documentElement})}}),b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);b.fn[e]=function(i){return b.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?b(a).scrollLeft():o,r?o:b(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return b.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}b.each({Height:"height",Width:"width"},function(e,n){b.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){b.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return b.access(this,function(n,r,i){var o;return b.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?b.css(n,r,s):b.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=b,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return b})})(window);

    // Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
var dbits;

// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary&0xffffff)==0xefcafe);

// (public) Constructor
function BigInteger(a,b,c) {
  if (!(this instanceof BigInteger)) {
    return new BigInteger(a, b, c);
  }

  if(a != null) {
    if("number" == typeof a) this.fromNumber(a,b,c);
    else if(b == null && "string" != typeof a) this.fromString(a,256);
    else this.fromString(a,b);
  }
}

var proto = BigInteger.prototype;

// return new, unset BigInteger
function nbi() { return new BigInteger(null); }

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i,x,w,j,c,n) {
  while(--n >= 0) {
    var v = x*this[i++]+w[j]+c;
    c = Math.floor(v/0x4000000);
    w[j++] = v&0x3ffffff;
  }
  return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i,x,w,j,c,n) {
  var xl = x&0x7fff, xh = x>>15;
  while(--n >= 0) {
    var l = this[i]&0x7fff;
    var h = this[i++]>>15;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
    w[j++] = l&0x3fffffff;
  }
  return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i,x,w,j,c,n) {
  var xl = x&0x3fff, xh = x>>14;
  while(--n >= 0) {
    var l = this[i]&0x3fff;
    var h = this[i++]>>14;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x3fff)<<14)+w[j]+c;
    c = (l>>28)+(m>>14)+xh*h;
    w[j++] = l&0xfffffff;
  }
  return c;
}

// wtf?
BigInteger.prototype.am = am1;
dbits = 26;

/*
if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
  BigInteger.prototype.am = am2;
  dbits = 30;
}
else if(j_lm && (navigator.appName != "Netscape")) {
  BigInteger.prototype.am = am1;
  dbits = 26;
}
else { // Mozilla/Netscape seems to prefer am3
  BigInteger.prototype.am = am3;
  dbits = 28;
}
*/

BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1<<dbits)-1);
var DV = BigInteger.prototype.DV = (1<<dbits);

var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2,BI_FP);
BigInteger.prototype.F1 = BI_FP-dbits;
BigInteger.prototype.F2 = 2*dbits-BI_FP;

// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr,vv;
rr = "0".charCodeAt(0);
for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

function int2char(n) { return BI_RM.charAt(n); }
function intAt(s,i) {
  var c = BI_RC[s.charCodeAt(i)];
  return (c==null)?-1:c;
}

// (protected) copy this to r
function bnpCopyTo(r) {
  for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
  r.t = this.t;
  r.s = this.s;
}

// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
  this.t = 1;
  this.s = (x<0)?-1:0;
  if(x > 0) this[0] = x;
  else if(x < -1) this[0] = x+DV;
  else this.t = 0;
}

// return bigint initialized to value
function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

// (protected) set from string and radix
function bnpFromString(s,b) {
  var self = this;

  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 256) k = 8; // byte array
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else { self.fromRadix(s,b); return; }
  self.t = 0;
  self.s = 0;
  var i = s.length, mi = false, sh = 0;
  while(--i >= 0) {
    var x = (k==8)?s[i]&0xff:intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-") mi = true;
      continue;
    }
    mi = false;
    if(sh == 0)
      self[self.t++] = x;
    else if(sh+k > self.DB) {
      self[self.t-1] |= (x&((1<<(self.DB-sh))-1))<<sh;
      self[self.t++] = (x>>(self.DB-sh));
    }
    else
      self[self.t-1] |= x<<sh;
    sh += k;
    if(sh >= self.DB) sh -= self.DB;
  }
  if(k == 8 && (s[0]&0x80) != 0) {
    self.s = -1;
    if(sh > 0) self[self.t-1] |= ((1<<(self.DB-sh))-1)<<sh;
  }
  self.clamp();
  if(mi) BigInteger.ZERO.subTo(self,self);
}

// (protected) clamp off excess high words
function bnpClamp() {
  var c = this.s&this.DM;
  while(this.t > 0 && this[this.t-1] == c) --this.t;
}

// (public) return string representation in given radix
function bnToString(b) {
  var self = this;
  if(self.s < 0) return "-"+self.negate().toString(b);
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else return self.toRadix(b);
  var km = (1<<k)-1, d, m = false, r = "", i = self.t;
  var p = self.DB-(i*self.DB)%k;
  if(i-- > 0) {
    if(p < self.DB && (d = self[i]>>p) > 0) { m = true; r = int2char(d); }
    while(i >= 0) {
      if(p < k) {
        d = (self[i]&((1<<p)-1))<<(k-p);
        d |= self[--i]>>(p+=self.DB-k);
      }
      else {
        d = (self[i]>>(p-=k))&km;
        if(p <= 0) { p += self.DB; --i; }
      }
      if(d > 0) m = true;
      if(m) r += int2char(d);
    }
  }
  return m?r:"0";
}

// (public) -this
function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

// (public) |this|
function bnAbs() { return (this.s<0)?this.negate():this; }

// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
  var r = this.s-a.s;
  if(r != 0) return r;
  var i = this.t;
  r = i-a.t;
  if(r != 0) return (this.s<0)?-r:r;
  while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
  return 0;
}

// returns bit length of the integer x
function nbits(x) {
  var r = 1, t;
  if((t=x>>>16) != 0) { x = t; r += 16; }
  if((t=x>>8) != 0) { x = t; r += 8; }
  if((t=x>>4) != 0) { x = t; r += 4; }
  if((t=x>>2) != 0) { x = t; r += 2; }
  if((t=x>>1) != 0) { x = t; r += 1; }
  return r;
}

// (public) return the number of bits in "this"
function bnBitLength() {
  if(this.t <= 0) return 0;
  return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
}

// (protected) r = this << n*DB
function bnpDLShiftTo(n,r) {
  var i;
  for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
  for(i = n-1; i >= 0; --i) r[i] = 0;
  r.t = this.t+n;
  r.s = this.s;
}

// (protected) r = this >> n*DB
function bnpDRShiftTo(n,r) {
  for(var i = n; i < this.t; ++i) r[i-n] = this[i];
  r.t = Math.max(this.t-n,0);
  r.s = this.s;
}

// (protected) r = this << n
function bnpLShiftTo(n,r) {
  var self = this;
  var bs = n%self.DB;
  var cbs = self.DB-bs;
  var bm = (1<<cbs)-1;
  var ds = Math.floor(n/self.DB), c = (self.s<<bs)&self.DM, i;
  for(i = self.t-1; i >= 0; --i) {
    r[i+ds+1] = (self[i]>>cbs)|c;
    c = (self[i]&bm)<<bs;
  }
  for(i = ds-1; i >= 0; --i) r[i] = 0;
  r[ds] = c;
  r.t = self.t+ds+1;
  r.s = self.s;
  r.clamp();
}

// (protected) r = this >> n
function bnpRShiftTo(n,r) {
  var self = this;
  r.s = self.s;
  var ds = Math.floor(n/self.DB);
  if(ds >= self.t) { r.t = 0; return; }
  var bs = n%self.DB;
  var cbs = self.DB-bs;
  var bm = (1<<bs)-1;
  r[0] = self[ds]>>bs;
  for(var i = ds+1; i < self.t; ++i) {
    r[i-ds-1] |= (self[i]&bm)<<cbs;
    r[i-ds] = self[i]>>bs;
  }
  if(bs > 0) r[self.t-ds-1] |= (self.s&bm)<<cbs;
  r.t = self.t-ds;
  r.clamp();
}

// (protected) r = this - a
function bnpSubTo(a,r) {
  var self = this;
  var i = 0, c = 0, m = Math.min(a.t,self.t);
  while(i < m) {
    c += self[i]-a[i];
    r[i++] = c&self.DM;
    c >>= self.DB;
  }
  if(a.t < self.t) {
    c -= a.s;
    while(i < self.t) {
      c += self[i];
      r[i++] = c&self.DM;
      c >>= self.DB;
    }
    c += self.s;
  }
  else {
    c += self.s;
    while(i < a.t) {
      c -= a[i];
      r[i++] = c&self.DM;
      c >>= self.DB;
    }
    c -= a.s;
  }
  r.s = (c<0)?-1:0;
  if(c < -1) r[i++] = self.DV+c;
  else if(c > 0) r[i++] = c;
  r.t = i;
  r.clamp();
}

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a,r) {
  var x = this.abs(), y = a.abs();
  var i = x.t;
  r.t = i+y.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
  r.s = 0;
  r.clamp();
  if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
}

// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
  var x = this.abs();
  var i = r.t = 2*x.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < x.t-1; ++i) {
    var c = x.am(i,x[i],r,2*i,0,1);
    if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
      r[i+x.t] -= x.DV;
      r[i+x.t+1] = 1;
    }
  }
  if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
  r.s = 0;
  r.clamp();
}

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m,q,r) {
  var self = this;
  var pm = m.abs();
  if(pm.t <= 0) return;
  var pt = self.abs();
  if(pt.t < pm.t) {
    if(q != null) q.fromInt(0);
    if(r != null) self.copyTo(r);
    return;
  }
  if(r == null) r = nbi();
  var y = nbi(), ts = self.s, ms = m.s;
  var nsh = self.DB-nbits(pm[pm.t-1]);	// normalize modulus
  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
  else { pm.copyTo(y); pt.copyTo(r); }
  var ys = y.t;
  var y0 = y[ys-1];
  if(y0 == 0) return;
  var yt = y0*(1<<self.F1)+((ys>1)?y[ys-2]>>self.F2:0);
  var d1 = self.FV/yt, d2 = (1<<self.F1)/yt, e = 1<<self.F2;
  var i = r.t, j = i-ys, t = (q==null)?nbi():q;
  y.dlShiftTo(j,t);
  if(r.compareTo(t) >= 0) {
    r[r.t++] = 1;
    r.subTo(t,r);
  }
  BigInteger.ONE.dlShiftTo(ys,t);
  t.subTo(y,y);	// "negative" y so we can replace sub with am later
  while(y.t < ys) y[y.t++] = 0;
  while(--j >= 0) {
    // Estimate quotient digit
    var qd = (r[--i]==y0)?self.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
    if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
      y.dlShiftTo(j,t);
      r.subTo(t,r);
      while(r[i] < --qd) r.subTo(t,r);
    }
  }
  if(q != null) {
    r.drShiftTo(ys,q);
    if(ts != ms) BigInteger.ZERO.subTo(q,q);
  }
  r.t = ys;
  r.clamp();
  if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
  if(ts < 0) BigInteger.ZERO.subTo(r,r);
}

// (public) this mod a
function bnMod(a) {
  var r = nbi();
  this.abs().divRemTo(a,null,r);
  if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
  return r;
}

// Modular reduction using "classic" algorithm
function Classic(m) { this.m = m; }
function cConvert(x) {
  if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
  else return x;
}
function cRevert(x) { return x; }
function cReduce(x) { x.divRemTo(this.m,null,x); }
function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
  if(this.t < 1) return 0;
  var x = this[0];
  if((x&1) == 0) return 0;
  var y = x&3;		// y == 1/x mod 2^2
  y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
  y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly;
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
  y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV
  return (y>0)?this.DV-y:-y;
}

// Montgomery reduction
function Montgomery(m) {
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp&0x7fff;
  this.mph = this.mp>>15;
  this.um = (1<<(m.DB-15))-1;
  this.mt2 = 2*m.t;
}

// xR mod m
function montConvert(x) {
  var r = nbi();
  x.abs().dlShiftTo(this.m.t,r);
  r.divRemTo(this.m,null,r);
  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
  return r;
}

// x/R mod m
function montRevert(x) {
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}

// x = x/R mod m (HAC 14.32)
function montReduce(x) {
  while(x.t <= this.mt2)	// pad x so am has enough room later
    x[x.t++] = 0;
  for(var i = 0; i < this.m.t; ++i) {
    // faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i]&0x7fff;
    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
    // use am to combine the multiply-shift-add into one call
    j = i+this.m.t;
    x[j] += this.m.am(0,u0,x,i,0,this.m.t);
    // propagate carry
    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
  }
  x.clamp();
  x.drShiftTo(this.m.t,x);
  if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = "x^2/R mod m"; x != r
function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = "xy/R mod m"; x,y != r
function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

// (protected) true iff this is even
function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e,z) {
  if(e > 0xffffffff || e < 1) return BigInteger.ONE;
  var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
  g.copyTo(r);
  while(--i >= 0) {
    z.sqrTo(r,r2);
    if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
    else { var t = r; r = r2; r2 = t; }
  }
  return z.revert(r);
}

// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e,m) {
  var z;
  if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
  return this.exp(e,z);
}

// protected
proto.copyTo = bnpCopyTo;
proto.fromInt = bnpFromInt;
proto.fromString = bnpFromString;
proto.clamp = bnpClamp;
proto.dlShiftTo = bnpDLShiftTo;
proto.drShiftTo = bnpDRShiftTo;
proto.lShiftTo = bnpLShiftTo;
proto.rShiftTo = bnpRShiftTo;
proto.subTo = bnpSubTo;
proto.multiplyTo = bnpMultiplyTo;
proto.squareTo = bnpSquareTo;
proto.divRemTo = bnpDivRemTo;
proto.invDigit = bnpInvDigit;
proto.isEven = bnpIsEven;
proto.exp = bnpExp;

// public
proto.toString = bnToString;
proto.negate = bnNegate;
proto.abs = bnAbs;
proto.compareTo = bnCompareTo;
proto.bitLength = bnBitLength;
proto.mod = bnMod;
proto.modPowInt = bnModPowInt;

//// jsbn2

function nbi() { return new BigInteger(null); }

// (public)
function bnClone() { var r = nbi(); this.copyTo(r); return r; }

// (public) return value as integer
function bnIntValue() {
  if(this.s < 0) {
    if(this.t == 1) return this[0]-this.DV;
    else if(this.t == 0) return -1;
  }
  else if(this.t == 1) return this[0];
  else if(this.t == 0) return 0;
  // assumes 16 < DB < 32
  return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
}

// (public) return value as byte
function bnByteValue() { return (this.t==0)?this.s:(this[0]<<24)>>24; }

// (public) return value as short (assumes DB>=16)
function bnShortValue() { return (this.t==0)?this.s:(this[0]<<16)>>16; }

// (protected) return x s.t. r^x < DV
function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

// (public) 0 if this == 0, 1 if this > 0
function bnSigNum() {
  if(this.s < 0) return -1;
  else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
  else return 1;
}

// (protected) convert to radix string
function bnpToRadix(b) {
  if(b == null) b = 10;
  if(this.signum() == 0 || b < 2 || b > 36) return "0";
  var cs = this.chunkSize(b);
  var a = Math.pow(b,cs);
  var d = nbv(a), y = nbi(), z = nbi(), r = "";
  this.divRemTo(d,y,z);
  while(y.signum() > 0) {
    r = (a+z.intValue()).toString(b).substr(1) + r;
    y.divRemTo(d,y,z);
  }
  return z.intValue().toString(b) + r;
}

// (protected) convert from radix string
function bnpFromRadix(s,b) {
  var self = this;
  self.fromInt(0);
  if(b == null) b = 10;
  var cs = self.chunkSize(b);
  var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
  for(var i = 0; i < s.length; ++i) {
    var x = intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-" && self.signum() == 0) mi = true;
      continue;
    }
    w = b*w+x;
    if(++j >= cs) {
      self.dMultiply(d);
      self.dAddOffset(w,0);
      j = 0;
      w = 0;
    }
  }
  if(j > 0) {
    self.dMultiply(Math.pow(b,j));
    self.dAddOffset(w,0);
  }
  if(mi) BigInteger.ZERO.subTo(self,self);
}

// (protected) alternate constructor
function bnpFromNumber(a,b,c) {
  var self = this;
  if("number" == typeof b) {
    // new BigInteger(int,int,RNG)
    if(a < 2) self.fromInt(1);
    else {
      self.fromNumber(a,c);
      if(!self.testBit(a-1))	// force MSB set
        self.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,self);
      if(self.isEven()) self.dAddOffset(1,0); // force odd
      while(!self.isProbablePrime(b)) {
        self.dAddOffset(2,0);
        if(self.bitLength() > a) self.subTo(BigInteger.ONE.shiftLeft(a-1),self);
      }
    }
  }
  else {
    // new BigInteger(int,RNG)
    var x = new Array(), t = a&7;
    x.length = (a>>3)+1;
    b.nextBytes(x);
    if(t > 0) x[0] &= ((1<<t)-1); else x[0] = 0;
    self.fromString(x,256);
  }
}

// (public) convert to bigendian byte array
function bnToByteArray() {
  var self = this;
  var i = self.t, r = new Array();
  r[0] = self.s;
  var p = self.DB-(i*self.DB)%8, d, k = 0;
  if(i-- > 0) {
    if(p < self.DB && (d = self[i]>>p) != (self.s&self.DM)>>p)
      r[k++] = d|(self.s<<(self.DB-p));
    while(i >= 0) {
      if(p < 8) {
        d = (self[i]&((1<<p)-1))<<(8-p);
        d |= self[--i]>>(p+=self.DB-8);
      }
      else {
        d = (self[i]>>(p-=8))&0xff;
        if(p <= 0) { p += self.DB; --i; }
      }
      if((d&0x80) != 0) d |= -256;
      if(k === 0 && (self.s&0x80) != (d&0x80)) ++k;
      if(k > 0 || d != self.s) r[k++] = d;
    }
  }
  return r;
}

function bnEquals(a) { return(this.compareTo(a)==0); }
function bnMin(a) { return(this.compareTo(a)<0)?this:a; }
function bnMax(a) { return(this.compareTo(a)>0)?this:a; }

// (protected) r = this op a (bitwise)
function bnpBitwiseTo(a,op,r) {
  var self = this;
  var i, f, m = Math.min(a.t,self.t);
  for(i = 0; i < m; ++i) r[i] = op(self[i],a[i]);
  if(a.t < self.t) {
    f = a.s&self.DM;
    for(i = m; i < self.t; ++i) r[i] = op(self[i],f);
    r.t = self.t;
  }
  else {
    f = self.s&self.DM;
    for(i = m; i < a.t; ++i) r[i] = op(f,a[i]);
    r.t = a.t;
  }
  r.s = op(self.s,a.s);
  r.clamp();
}

// (public) this & a
function op_and(x,y) { return x&y; }
function bnAnd(a) { var r = nbi(); this.bitwiseTo(a,op_and,r); return r; }

// (public) this | a
function op_or(x,y) { return x|y; }
function bnOr(a) { var r = nbi(); this.bitwiseTo(a,op_or,r); return r; }

// (public) this ^ a
function op_xor(x,y) { return x^y; }
function bnXor(a) { var r = nbi(); this.bitwiseTo(a,op_xor,r); return r; }

// (public) this & ~a
function op_andnot(x,y) { return x&~y; }
function bnAndNot(a) { var r = nbi(); this.bitwiseTo(a,op_andnot,r); return r; }

// (public) ~this
function bnNot() {
  var r = nbi();
  for(var i = 0; i < this.t; ++i) r[i] = this.DM&~this[i];
  r.t = this.t;
  r.s = ~this.s;
  return r;
}

// (public) this << n
function bnShiftLeft(n) {
  var r = nbi();
  if(n < 0) this.rShiftTo(-n,r); else this.lShiftTo(n,r);
  return r;
}

// (public) this >> n
function bnShiftRight(n) {
  var r = nbi();
  if(n < 0) this.lShiftTo(-n,r); else this.rShiftTo(n,r);
  return r;
}

// return index of lowest 1-bit in x, x < 2^31
function lbit(x) {
  if(x == 0) return -1;
  var r = 0;
  if((x&0xffff) == 0) { x >>= 16; r += 16; }
  if((x&0xff) == 0) { x >>= 8; r += 8; }
  if((x&0xf) == 0) { x >>= 4; r += 4; }
  if((x&3) == 0) { x >>= 2; r += 2; }
  if((x&1) == 0) ++r;
  return r;
}

// (public) returns index of lowest 1-bit (or -1 if none)
function bnGetLowestSetBit() {
  for(var i = 0; i < this.t; ++i)
    if(this[i] != 0) return i*this.DB+lbit(this[i]);
  if(this.s < 0) return this.t*this.DB;
  return -1;
}

// return number of 1 bits in x
function cbit(x) {
  var r = 0;
  while(x != 0) { x &= x-1; ++r; }
  return r;
}

// (public) return number of set bits
function bnBitCount() {
  var r = 0, x = this.s&this.DM;
  for(var i = 0; i < this.t; ++i) r += cbit(this[i]^x);
  return r;
}

// (public) true iff nth bit is set
function bnTestBit(n) {
  var j = Math.floor(n/this.DB);
  if(j >= this.t) return(this.s!=0);
  return((this[j]&(1<<(n%this.DB)))!=0);
}

// (protected) this op (1<<n)
function bnpChangeBit(n,op) {
  var r = BigInteger.ONE.shiftLeft(n);
  this.bitwiseTo(r,op,r);
  return r;
}

// (public) this | (1<<n)
function bnSetBit(n) { return this.changeBit(n,op_or); }

// (public) this & ~(1<<n)
function bnClearBit(n) { return this.changeBit(n,op_andnot); }

// (public) this ^ (1<<n)
function bnFlipBit(n) { return this.changeBit(n,op_xor); }

// (protected) r = this + a
function bnpAddTo(a,r) {
  var self = this;

  var i = 0, c = 0, m = Math.min(a.t,self.t);
  while(i < m) {
    c += self[i]+a[i];
    r[i++] = c&self.DM;
    c >>= self.DB;
  }
  if(a.t < self.t) {
    c += a.s;
    while(i < self.t) {
      c += self[i];
      r[i++] = c&self.DM;
      c >>= self.DB;
    }
    c += self.s;
  }
  else {
    c += self.s;
    while(i < a.t) {
      c += a[i];
      r[i++] = c&self.DM;
      c >>= self.DB;
    }
    c += a.s;
  }
  r.s = (c<0)?-1:0;
  if(c > 0) r[i++] = c;
  else if(c < -1) r[i++] = self.DV+c;
  r.t = i;
  r.clamp();
}

// (public) this + a
function bnAdd(a) { var r = nbi(); this.addTo(a,r); return r; }

// (public) this - a
function bnSubtract(a) { var r = nbi(); this.subTo(a,r); return r; }

// (public) this * a
function bnMultiply(a) { var r = nbi(); this.multiplyTo(a,r); return r; }

// (public) this^2
function bnSquare() { var r = nbi(); this.squareTo(r); return r; }

// (public) this / a
function bnDivide(a) { var r = nbi(); this.divRemTo(a,r,null); return r; }

// (public) this % a
function bnRemainder(a) { var r = nbi(); this.divRemTo(a,null,r); return r; }

// (public) [this/a,this%a]
function bnDivideAndRemainder(a) {
  var q = nbi(), r = nbi();
  this.divRemTo(a,q,r);
  return new Array(q,r);
}

// (protected) this *= n, this >= 0, 1 < n < DV
function bnpDMultiply(n) {
  this[this.t] = this.am(0,n-1,this,0,0,this.t);
  ++this.t;
  this.clamp();
}

// (protected) this += n << w words, this >= 0
function bnpDAddOffset(n,w) {
  if(n == 0) return;
  while(this.t <= w) this[this.t++] = 0;
  this[w] += n;
  while(this[w] >= this.DV) {
    this[w] -= this.DV;
    if(++w >= this.t) this[this.t++] = 0;
    ++this[w];
  }
}

// A "null" reducer
function NullExp() {}
function nNop(x) { return x; }
function nMulTo(x,y,r) { x.multiplyTo(y,r); }
function nSqrTo(x,r) { x.squareTo(r); }

NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;

// (public) this^e
function bnPow(e) { return this.exp(e,new NullExp()); }

// (protected) r = lower n words of "this * a", a.t <= n
// "this" should be the larger one if appropriate.
function bnpMultiplyLowerTo(a,n,r) {
  var i = Math.min(this.t+a.t,n);
  r.s = 0; // assumes a,this >= 0
  r.t = i;
  while(i > 0) r[--i] = 0;
  var j;
  for(j = r.t-this.t; i < j; ++i) r[i+this.t] = this.am(0,a[i],r,i,0,this.t);
  for(j = Math.min(a.t,n); i < j; ++i) this.am(0,a[i],r,i,0,n-i);
  r.clamp();
}

// (protected) r = "this * a" without lower n words, n > 0
// "this" should be the larger one if appropriate.
function bnpMultiplyUpperTo(a,n,r) {
  --n;
  var i = r.t = this.t+a.t-n;
  r.s = 0; // assumes a,this >= 0
  while(--i >= 0) r[i] = 0;
  for(i = Math.max(n-this.t,0); i < a.t; ++i)
    r[this.t+i-n] = this.am(n-i,a[i],r,0,0,this.t+i-n);
  r.clamp();
  r.drShiftTo(1,r);
}

// Barrett modular reduction
function Barrett(m) {
  // setup Barrett
  this.r2 = nbi();
  this.q3 = nbi();
  BigInteger.ONE.dlShiftTo(2*m.t,this.r2);
  this.mu = this.r2.divide(m);
  this.m = m;
}

function barrettConvert(x) {
  if(x.s < 0 || x.t > 2*this.m.t) return x.mod(this.m);
  else if(x.compareTo(this.m) < 0) return x;
  else { var r = nbi(); x.copyTo(r); this.reduce(r); return r; }
}

function barrettRevert(x) { return x; }

// x = x mod m (HAC 14.42)
function barrettReduce(x) {
  var self = this;
  x.drShiftTo(self.m.t-1,self.r2);
  if(x.t > self.m.t+1) { x.t = self.m.t+1; x.clamp(); }
  self.mu.multiplyUpperTo(self.r2,self.m.t+1,self.q3);
  self.m.multiplyLowerTo(self.q3,self.m.t+1,self.r2);
  while(x.compareTo(self.r2) < 0) x.dAddOffset(1,self.m.t+1);
  x.subTo(self.r2,x);
  while(x.compareTo(self.m) >= 0) x.subTo(self.m,x);
}

// r = x^2 mod m; x != r
function barrettSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = x*y mod m; x,y != r
function barrettMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;

// (public) this^e % m (HAC 14.85)
function bnModPow(e,m) {
  var i = e.bitLength(), k, r = nbv(1), z;
  if(i <= 0) return r;
  else if(i < 18) k = 1;
  else if(i < 48) k = 3;
  else if(i < 144) k = 4;
  else if(i < 768) k = 5;
  else k = 6;
  if(i < 8)
    z = new Classic(m);
  else if(m.isEven())
    z = new Barrett(m);
  else
    z = new Montgomery(m);

  // precomputation
  var g = new Array(), n = 3, k1 = k-1, km = (1<<k)-1;
  g[1] = z.convert(this);
  if(k > 1) {
    var g2 = nbi();
    z.sqrTo(g[1],g2);
    while(n <= km) {
      g[n] = nbi();
      z.mulTo(g2,g[n-2],g[n]);
      n += 2;
    }
  }

  var j = e.t-1, w, is1 = true, r2 = nbi(), t;
  i = nbits(e[j])-1;
  while(j >= 0) {
    if(i >= k1) w = (e[j]>>(i-k1))&km;
    else {
      w = (e[j]&((1<<(i+1))-1))<<(k1-i);
      if(j > 0) w |= e[j-1]>>(this.DB+i-k1);
    }

    n = k;
    while((w&1) == 0) { w >>= 1; --n; }
    if((i -= n) < 0) { i += this.DB; --j; }
    if(is1) {	// ret == 1, don't bother squaring or multiplying it
      g[w].copyTo(r);
      is1 = false;
    }
    else {
      while(n > 1) { z.sqrTo(r,r2); z.sqrTo(r2,r); n -= 2; }
      if(n > 0) z.sqrTo(r,r2); else { t = r; r = r2; r2 = t; }
      z.mulTo(r2,g[w],r);
    }

    while(j >= 0 && (e[j]&(1<<i)) == 0) {
      z.sqrTo(r,r2); t = r; r = r2; r2 = t;
      if(--i < 0) { i = this.DB-1; --j; }
    }
  }
  return z.revert(r);
}

// (public) gcd(this,a) (HAC 14.54)
function bnGCD(a) {
  var x = (this.s<0)?this.negate():this.clone();
  var y = (a.s<0)?a.negate():a.clone();
  if(x.compareTo(y) < 0) { var t = x; x = y; y = t; }
  var i = x.getLowestSetBit(), g = y.getLowestSetBit();
  if(g < 0) return x;
  if(i < g) g = i;
  if(g > 0) {
    x.rShiftTo(g,x);
    y.rShiftTo(g,y);
  }
  while(x.signum() > 0) {
    if((i = x.getLowestSetBit()) > 0) x.rShiftTo(i,x);
    if((i = y.getLowestSetBit()) > 0) y.rShiftTo(i,y);
    if(x.compareTo(y) >= 0) {
      x.subTo(y,x);
      x.rShiftTo(1,x);
    }
    else {
      y.subTo(x,y);
      y.rShiftTo(1,y);
    }
  }
  if(g > 0) y.lShiftTo(g,y);
  return y;
}

// (protected) this % n, n < 2^26
function bnpModInt(n) {
  if(n <= 0) return 0;
  var d = this.DV%n, r = (this.s<0)?n-1:0;
  if(this.t > 0)
    if(d == 0) r = this[0]%n;
    else for(var i = this.t-1; i >= 0; --i) r = (d*r+this[i])%n;
  return r;
}

// (public) 1/this % m (HAC 14.61)
function bnModInverse(m) {
  var ac = m.isEven();
  if((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
  var u = m.clone(), v = this.clone();
  var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
  while(u.signum() != 0) {
    while(u.isEven()) {
      u.rShiftTo(1,u);
      if(ac) {
        if(!a.isEven() || !b.isEven()) { a.addTo(this,a); b.subTo(m,b); }
        a.rShiftTo(1,a);
      }
      else if(!b.isEven()) b.subTo(m,b);
      b.rShiftTo(1,b);
    }
    while(v.isEven()) {
      v.rShiftTo(1,v);
      if(ac) {
        if(!c.isEven() || !d.isEven()) { c.addTo(this,c); d.subTo(m,d); }
        c.rShiftTo(1,c);
      }
      else if(!d.isEven()) d.subTo(m,d);
      d.rShiftTo(1,d);
    }
    if(u.compareTo(v) >= 0) {
      u.subTo(v,u);
      if(ac) a.subTo(c,a);
      b.subTo(d,b);
    }
    else {
      v.subTo(u,v);
      if(ac) c.subTo(a,c);
      d.subTo(b,d);
    }
  }
  if(v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
  if(d.compareTo(m) >= 0) return d.subtract(m);
  if(d.signum() < 0) d.addTo(m,d); else return d;
  if(d.signum() < 0) return d.add(m); else return d;
}

// protected
proto.chunkSize = bnpChunkSize;
proto.toRadix = bnpToRadix;
proto.fromRadix = bnpFromRadix;
proto.fromNumber = bnpFromNumber;
proto.bitwiseTo = bnpBitwiseTo;
proto.changeBit = bnpChangeBit;
proto.addTo = bnpAddTo;
proto.dMultiply = bnpDMultiply;
proto.dAddOffset = bnpDAddOffset;
proto.multiplyLowerTo = bnpMultiplyLowerTo;
proto.multiplyUpperTo = bnpMultiplyUpperTo;
proto.modInt = bnpModInt;

// public
proto.clone = bnClone;
proto.intValue = bnIntValue;
proto.byteValue = bnByteValue;
proto.shortValue = bnShortValue;
proto.signum = bnSigNum;
proto.toByteArray = bnToByteArray;
proto.equals = bnEquals;
proto.min = bnMin;
proto.max = bnMax;
proto.and = bnAnd;
proto.or = bnOr;
proto.xor = bnXor;
proto.andNot = bnAndNot;
proto.not = bnNot;
proto.shiftLeft = bnShiftLeft;
proto.shiftRight = bnShiftRight;
proto.getLowestSetBit = bnGetLowestSetBit;
proto.bitCount = bnBitCount;
proto.testBit = bnTestBit;
proto.setBit = bnSetBit;
proto.clearBit = bnClearBit;
proto.flipBit = bnFlipBit;
proto.add = bnAdd;
proto.subtract = bnSubtract;
proto.multiply = bnMultiply;
proto.divide = bnDivide;
proto.remainder = bnRemainder;
proto.divideAndRemainder = bnDivideAndRemainder;
proto.modPow = bnModPow;
proto.modInverse = bnModInverse;
proto.pow = bnPow;
proto.gcd = bnGCD;

// JSBN-specific extension
proto.square = bnSquare;

// BigInteger interfaces not implemented in jsbn:

// BigInteger(int signum, byte[] magnitude)
// double doubleValue()
// float floatValue()
// int hashCode()
// long longValue()
// static BigInteger valueOf(long val)

// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
BigInteger.valueOf = nbv;


/// bitcoinjs addons

/**
 * Turns a byte array into a big integer.
 *
 * This function will interpret a byte array as a big integer in big
 * endian notation and ignore leading zeros.
 */
BigInteger.fromByteArrayUnsigned = function(ba) {

  if (!ba.length) {
    return new BigInteger.valueOf(0);
  } else if (ba[0] & 0x80) {
    // Prepend a zero so the BigInteger class doesn't mistake this
    // for a negative integer.
    return new BigInteger([0].concat(ba));
  } else {
    return new BigInteger(ba);
  }
};

/**
 * Parse a signed big integer byte representation.
 *
 * For details on the format please see BigInteger.toByteArraySigned.
 */
BigInteger.fromByteArraySigned = function(ba) {
  // Check for negative value
  if (ba[0] & 0x80) {
    // Remove sign bit
    ba[0] &= 0x7f;

    return BigInteger.fromByteArrayUnsigned(ba).negate();
  } else {
    return BigInteger.fromByteArrayUnsigned(ba);
  }
};

/**
 * Returns a byte array representation of the big integer.
 *
 * This returns the absolute of the contained value in big endian
 * form. A value of zero results in an empty array.
 */
BigInteger.prototype.toByteArrayUnsigned = function() {
    var ba = this.abs().toByteArray();

    // Empty array, nothing to do
    if (!ba.length) {
        return ba;
    }

    // remove leading 0
    if (ba[0] === 0) {
        ba = ba.slice(1);
    }

    // all values must be positive
    for (var i=0 ; i<ba.length ; ++i) {
      ba[i] = (ba[i] < 0) ? ba[i] + 256 : ba[i];
    }

    return ba;
};

/*
 * Converts big integer to signed byte representation.
 *
 * The format for this value uses the most significant bit as a sign
 * bit. If the most significant bit is already occupied by the
 * absolute value, an extra byte is prepended and the sign bit is set
 * there.
 *
 * Examples:
 *
 *      0 =>     0x00
 *      1 =>     0x01
 *     -1 =>     0x81
 *    127 =>     0x7f
 *   -127 =>     0xff
 *    128 =>   0x0080
 *   -128 =>   0x8080
 *    255 =>   0x00ff
 *   -255 =>   0x80ff
 *  16300 =>   0x3fac
 * -16300 =>   0xbfac
 *  62300 => 0x00f35c
 * -62300 => 0x80f35c
*/
BigInteger.prototype.toByteArraySigned = function() {
  var val = this.toByteArrayUnsigned();
  var neg = this.s < 0;

  // if the first bit is set, we always unshift
  // either unshift 0x80 or 0x00
  if (val[0] & 0x80) {
    val.unshift((neg) ? 0x80 : 0x00);
  }
  // if the first bit isn't set, set it if negative
  else if (neg) {
    val[0] |= 0x80;
  }

  return val;
};

!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.qrcode=t()}(this,function(){function e(e,t){this.count=e,this.dataCodewords=t,this.__defineGetter__("Count",function(){return this.count}),this.__defineGetter__("DataCodewords",function(){return this.dataCodewords})}function t(e,t,r){this.ecCodewordsPerBlock=e,this.ecBlocks=r?new Array(t,r):new Array(t),this.__defineGetter__("ECCodewordsPerBlock",function(){return this.ecCodewordsPerBlock}),this.__defineGetter__("TotalECCodewords",function(){return this.ecCodewordsPerBlock*this.NumBlocks}),this.__defineGetter__("NumBlocks",function(){for(var e=0,t=0;t<this.ecBlocks.length;t++)e+=this.ecBlocks[t].length;return e}),this.getECBlocks=function(){return this.ecBlocks}}function r(e,t,r,n,i,o){this.versionNumber=e,this.alignmentPatternCenters=t,this.ecBlocks=new Array(r,n,i,o);for(var a=0,s=r.ECCodewordsPerBlock,h=r.getECBlocks(),w=0;w<h.length;w++){var f=h[w];a+=f.Count*(f.DataCodewords+s)}this.totalCodewords=a,this.__defineGetter__("VersionNumber",function(){return this.versionNumber}),this.__defineGetter__("AlignmentPatternCenters",function(){return this.alignmentPatternCenters}),this.__defineGetter__("TotalCodewords",function(){return this.totalCodewords}),this.__defineGetter__("DimensionForVersion",function(){return 17+4*this.versionNumber}),this.buildFunctionPattern=function(){var e=this.DimensionForVersion,t=new d(e);t.setRegion(0,0,9,9),t.setRegion(e-8,0,8,9),t.setRegion(0,e-8,9,8);for(var r=this.alignmentPatternCenters.length,n=0;r>n;n++)for(var i=this.alignmentPatternCenters[n]-2,o=0;r>o;o++)0==n&&(0==o||o==r-1)||n==r-1&&0==o||t.setRegion(this.alignmentPatternCenters[o]-2,i,5,5);return t.setRegion(6,9,1,e-17),t.setRegion(9,6,e-17,1),this.versionNumber>6&&(t.setRegion(e-11,0,3,6),t.setRegion(0,e-11,6,3)),t},this.getECBlocksForLevel=function(e){return this.ecBlocks[e.ordinal()]}}function n(){return new Array(new r(1,new Array,new t(7,new e(1,19)),new t(10,new e(1,16)),new t(13,new e(1,13)),new t(17,new e(1,9))),new r(2,new Array(6,18),new t(10,new e(1,34)),new t(16,new e(1,28)),new t(22,new e(1,22)),new t(28,new e(1,16))),new r(3,new Array(6,22),new t(15,new e(1,55)),new t(26,new e(1,44)),new t(18,new e(2,17)),new t(22,new e(2,13))),new r(4,new Array(6,26),new t(20,new e(1,80)),new t(18,new e(2,32)),new t(26,new e(2,24)),new t(16,new e(4,9))),new r(5,new Array(6,30),new t(26,new e(1,108)),new t(24,new e(2,43)),new t(18,new e(2,15),new e(2,16)),new t(22,new e(2,11),new e(2,12))),new r(6,new Array(6,34),new t(18,new e(2,68)),new t(16,new e(4,27)),new t(24,new e(4,19)),new t(28,new e(4,15))),new r(7,new Array(6,22,38),new t(20,new e(2,78)),new t(18,new e(4,31)),new t(18,new e(2,14),new e(4,15)),new t(26,new e(4,13),new e(1,14))),new r(8,new Array(6,24,42),new t(24,new e(2,97)),new t(22,new e(2,38),new e(2,39)),new t(22,new e(4,18),new e(2,19)),new t(26,new e(4,14),new e(2,15))),new r(9,new Array(6,26,46),new t(30,new e(2,116)),new t(22,new e(3,36),new e(2,37)),new t(20,new e(4,16),new e(4,17)),new t(24,new e(4,12),new e(4,13))),new r(10,new Array(6,28,50),new t(18,new e(2,68),new e(2,69)),new t(26,new e(4,43),new e(1,44)),new t(24,new e(6,19),new e(2,20)),new t(28,new e(6,15),new e(2,16))),new r(11,new Array(6,30,54),new t(20,new e(4,81)),new t(30,new e(1,50),new e(4,51)),new t(28,new e(4,22),new e(4,23)),new t(24,new e(3,12),new e(8,13))),new r(12,new Array(6,32,58),new t(24,new e(2,92),new e(2,93)),new t(22,new e(6,36),new e(2,37)),new t(26,new e(4,20),new e(6,21)),new t(28,new e(7,14),new e(4,15))),new r(13,new Array(6,34,62),new t(26,new e(4,107)),new t(22,new e(8,37),new e(1,38)),new t(24,new e(8,20),new e(4,21)),new t(22,new e(12,11),new e(4,12))),new r(14,new Array(6,26,46,66),new t(30,new e(3,115),new e(1,116)),new t(24,new e(4,40),new e(5,41)),new t(20,new e(11,16),new e(5,17)),new t(24,new e(11,12),new e(5,13))),new r(15,new Array(6,26,48,70),new t(22,new e(5,87),new e(1,88)),new t(24,new e(5,41),new e(5,42)),new t(30,new e(5,24),new e(7,25)),new t(24,new e(11,12),new e(7,13))),new r(16,new Array(6,26,50,74),new t(24,new e(5,98),new e(1,99)),new t(28,new e(7,45),new e(3,46)),new t(24,new e(15,19),new e(2,20)),new t(30,new e(3,15),new e(13,16))),new r(17,new Array(6,30,54,78),new t(28,new e(1,107),new e(5,108)),new t(28,new e(10,46),new e(1,47)),new t(28,new e(1,22),new e(15,23)),new t(28,new e(2,14),new e(17,15))),new r(18,new Array(6,30,56,82),new t(30,new e(5,120),new e(1,121)),new t(26,new e(9,43),new e(4,44)),new t(28,new e(17,22),new e(1,23)),new t(28,new e(2,14),new e(19,15))),new r(19,new Array(6,30,58,86),new t(28,new e(3,113),new e(4,114)),new t(26,new e(3,44),new e(11,45)),new t(26,new e(17,21),new e(4,22)),new t(26,new e(9,13),new e(16,14))),new r(20,new Array(6,34,62,90),new t(28,new e(3,107),new e(5,108)),new t(26,new e(3,41),new e(13,42)),new t(30,new e(15,24),new e(5,25)),new t(28,new e(15,15),new e(10,16))),new r(21,new Array(6,28,50,72,94),new t(28,new e(4,116),new e(4,117)),new t(26,new e(17,42)),new t(28,new e(17,22),new e(6,23)),new t(30,new e(19,16),new e(6,17))),new r(22,new Array(6,26,50,74,98),new t(28,new e(2,111),new e(7,112)),new t(28,new e(17,46)),new t(30,new e(7,24),new e(16,25)),new t(24,new e(34,13))),new r(23,new Array(6,30,54,74,102),new t(30,new e(4,121),new e(5,122)),new t(28,new e(4,47),new e(14,48)),new t(30,new e(11,24),new e(14,25)),new t(30,new e(16,15),new e(14,16))),new r(24,new Array(6,28,54,80,106),new t(30,new e(6,117),new e(4,118)),new t(28,new e(6,45),new e(14,46)),new t(30,new e(11,24),new e(16,25)),new t(30,new e(30,16),new e(2,17))),new r(25,new Array(6,32,58,84,110),new t(26,new e(8,106),new e(4,107)),new t(28,new e(8,47),new e(13,48)),new t(30,new e(7,24),new e(22,25)),new t(30,new e(22,15),new e(13,16))),new r(26,new Array(6,30,58,86,114),new t(28,new e(10,114),new e(2,115)),new t(28,new e(19,46),new e(4,47)),new t(28,new e(28,22),new e(6,23)),new t(30,new e(33,16),new e(4,17))),new r(27,new Array(6,34,62,90,118),new t(30,new e(8,122),new e(4,123)),new t(28,new e(22,45),new e(3,46)),new t(30,new e(8,23),new e(26,24)),new t(30,new e(12,15),new e(28,16))),new r(28,new Array(6,26,50,74,98,122),new t(30,new e(3,117),new e(10,118)),new t(28,new e(3,45),new e(23,46)),new t(30,new e(4,24),new e(31,25)),new t(30,new e(11,15),new e(31,16))),new r(29,new Array(6,30,54,78,102,126),new t(30,new e(7,116),new e(7,117)),new t(28,new e(21,45),new e(7,46)),new t(30,new e(1,23),new e(37,24)),new t(30,new e(19,15),new e(26,16))),new r(30,new Array(6,26,52,78,104,130),new t(30,new e(5,115),new e(10,116)),new t(28,new e(19,47),new e(10,48)),new t(30,new e(15,24),new e(25,25)),new t(30,new e(23,15),new e(25,16))),new r(31,new Array(6,30,56,82,108,134),new t(30,new e(13,115),new e(3,116)),new t(28,new e(2,46),new e(29,47)),new t(30,new e(42,24),new e(1,25)),new t(30,new e(23,15),new e(28,16))),new r(32,new Array(6,34,60,86,112,138),new t(30,new e(17,115)),new t(28,new e(10,46),new e(23,47)),new t(30,new e(10,24),new e(35,25)),new t(30,new e(19,15),new e(35,16))),new r(33,new Array(6,30,58,86,114,142),new t(30,new e(17,115),new e(1,116)),new t(28,new e(14,46),new e(21,47)),new t(30,new e(29,24),new e(19,25)),new t(30,new e(11,15),new e(46,16))),new r(34,new Array(6,34,62,90,118,146),new t(30,new e(13,115),new e(6,116)),new t(28,new e(14,46),new e(23,47)),new t(30,new e(44,24),new e(7,25)),new t(30,new e(59,16),new e(1,17))),new r(35,new Array(6,30,54,78,102,126,150),new t(30,new e(12,121),new e(7,122)),new t(28,new e(12,47),new e(26,48)),new t(30,new e(39,24),new e(14,25)),new t(30,new e(22,15),new e(41,16))),new r(36,new Array(6,24,50,76,102,128,154),new t(30,new e(6,121),new e(14,122)),new t(28,new e(6,47),new e(34,48)),new t(30,new e(46,24),new e(10,25)),new t(30,new e(2,15),new e(64,16))),new r(37,new Array(6,28,54,80,106,132,158),new t(30,new e(17,122),new e(4,123)),new t(28,new e(29,46),new e(14,47)),new t(30,new e(49,24),new e(10,25)),new t(30,new e(24,15),new e(46,16))),new r(38,new Array(6,32,58,84,110,136,162),new t(30,new e(4,122),new e(18,123)),new t(28,new e(13,46),new e(32,47)),new t(30,new e(48,24),new e(14,25)),new t(30,new e(42,15),new e(32,16))),new r(39,new Array(6,26,54,82,110,138,166),new t(30,new e(20,117),new e(4,118)),new t(28,new e(40,47),new e(7,48)),new t(30,new e(43,24),new e(22,25)),new t(30,new e(10,15),new e(67,16))),new r(40,new Array(6,30,58,86,114,142,170),new t(30,new e(19,118),new e(6,119)),new t(28,new e(18,47),new e(31,48)),new t(30,new e(34,24),new e(34,25)),new t(30,new e(20,15),new e(61,16))))}function i(e,t,r,n,o,a,s,h,d){this.a11=e,this.a12=n,this.a13=s,this.a21=t,this.a22=o,this.a23=h,this.a31=r,this.a32=a,this.a33=d,this.transformPoints1=function(e){for(var t=e.length,r=this.a11,n=this.a12,i=this.a13,o=this.a21,a=this.a22,s=this.a23,h=this.a31,d=this.a32,w=this.a33,f=0;t>f;f+=2){var c=e[f],u=e[f+1],l=i*c+s*u+w;e[f]=(r*c+o*u+h)/l,e[f+1]=(n*c+a*u+d)/l}},this.transformPoints2=function(e,t){for(var r=e.length,n=0;r>n;n++){var i=e[n],o=t[n],a=this.a13*i+this.a23*o+this.a33;e[n]=(this.a11*i+this.a21*o+this.a31)/a,t[n]=(this.a12*i+this.a22*o+this.a32)/a}},this.buildAdjoint=function(){return new i(this.a22*this.a33-this.a23*this.a32,this.a23*this.a31-this.a21*this.a33,this.a21*this.a32-this.a22*this.a31,this.a13*this.a32-this.a12*this.a33,this.a11*this.a33-this.a13*this.a31,this.a12*this.a31-this.a11*this.a32,this.a12*this.a23-this.a13*this.a22,this.a13*this.a21-this.a11*this.a23,this.a11*this.a22-this.a12*this.a21)},this.times=function(e){return new i(this.a11*e.a11+this.a21*e.a12+this.a31*e.a13,this.a11*e.a21+this.a21*e.a22+this.a31*e.a23,this.a11*e.a31+this.a21*e.a32+this.a31*e.a33,this.a12*e.a11+this.a22*e.a12+this.a32*e.a13,this.a12*e.a21+this.a22*e.a22+this.a32*e.a23,this.a12*e.a31+this.a22*e.a32+this.a32*e.a33,this.a13*e.a11+this.a23*e.a12+this.a33*e.a13,this.a13*e.a21+this.a23*e.a22+this.a33*e.a23,this.a13*e.a31+this.a23*e.a32+this.a33*e.a33)}}function o(e,t){this.bits=e,this.points=t}function a(e){this.image=e,this.resultPointCallback=null,this.sizeOfBlackWhiteBlackRun=function(e,t,r,n){var i=Math.abs(n-t)>Math.abs(r-e);if(i){var o=e;e=t,t=o,o=r,r=n,n=o}for(var a=Math.abs(r-e),s=Math.abs(n-t),h=-a>>1,d=n>t?1:-1,w=r>e?1:-1,f=0,c=e,u=t;c!=r;c+=w){var l=i?u:c,v=i?c:u;if(1==f?this.image[l+v*qrcode.width]&&f++:this.image[l+v*qrcode.width]||f++,3==f){var g=c-e,m=u-t;return Math.sqrt(g*g+m*m)}if(h+=s,h>0){if(u==n)break;u+=d,h-=a}}var y=r-e,p=n-t;return Math.sqrt(y*y+p*p)},this.sizeOfBlackWhiteBlackRunBothWays=function(e,t,r,n){var i=this.sizeOfBlackWhiteBlackRun(e,t,r,n),o=1,a=e-(r-e);0>a?(o=e/(e-a),a=0):a>=qrcode.width&&(o=(qrcode.width-1-e)/(a-e),a=qrcode.width-1);var s=Math.floor(t-(n-t)*o);return o=1,0>s?(o=t/(t-s),s=0):s>=qrcode.height&&(o=(qrcode.height-1-t)/(s-t),s=qrcode.height-1),a=Math.floor(e+(a-e)*o),i+=this.sizeOfBlackWhiteBlackRun(e,t,a,s),i-1},this.calculateModuleSizeOneWay=function(e,t){var r=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(e.X),Math.floor(e.Y),Math.floor(t.X),Math.floor(t.Y)),n=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(t.X),Math.floor(t.Y),Math.floor(e.X),Math.floor(e.Y));return isNaN(r)?n/7:isNaN(n)?r/7:(r+n)/14},this.calculateModuleSize=function(e,t,r){return(this.calculateModuleSizeOneWay(e,t)+this.calculateModuleSizeOneWay(e,r))/2},this.distance=function(e,t){return xDiff=e.X-t.X,yDiff=e.Y-t.Y,Math.sqrt(xDiff*xDiff+yDiff*yDiff)},this.computeDimension=function(e,t,r,n){var i=Math.round(this.distance(e,t)/n),o=Math.round(this.distance(e,r)/n),a=(i+o>>1)+7;switch(3&a){case 0:a++;break;case 2:a--;break;case 3:throw"Error"}return a},this.findAlignmentInRegion=function(e,t,r,n){var i=Math.floor(n*e),o=Math.max(0,t-i),a=Math.min(qrcode.width-1,t+i);if(3*e>a-o)throw"Error";var s=Math.max(0,r-i),h=Math.min(qrcode.height-1,r+i),d=new P(this.image,o,s,a-o,h-s,e,this.resultPointCallback);return d.find()},this.createTransform=function(e,t,r,n,o){var a,s,h,d,w=o-3.5;null!=n?(a=n.X,s=n.Y,h=d=w-3):(a=t.X-e.X+r.X,s=t.Y-e.Y+r.Y,h=d=w);var f=i.quadrilateralToQuadrilateral(3.5,3.5,w,3.5,h,d,3.5,w,e.X,e.Y,t.X,t.Y,a,s,r.X,r.Y);return f},this.sampleGrid=function(e,t,r){var n=GridSampler;return n.sampleGrid3(e,r,t)},this.processFinderPatternInfo=function(e){var t=e.TopLeft,n=e.TopRight,i=e.BottomLeft,a=this.calculateModuleSize(t,n,i);if(1>a)throw"Error";var s=this.computeDimension(t,n,i,a),h=r.getProvisionalVersionForDimension(s),d=h.DimensionForVersion-7,w=null;if(h.AlignmentPatternCenters.length>0)for(var f=n.X-t.X+i.X,c=n.Y-t.Y+i.Y,u=1-3/d,l=Math.floor(t.X+u*(f-t.X)),v=Math.floor(t.Y+u*(c-t.Y)),g=4;16>=g;g<<=1){w=this.findAlignmentInRegion(a,l,v,g);break}var m,y=this.createTransform(t,n,i,w,s),p=this.sampleGrid(this.image,y,s);return m=null==w?new Array(i,t,n):new Array(i,t,n,w),new o(p,m)},this.detect=function(){var e=(new S).findFinderPattern(this.image);return this.processFinderPatternInfo(e)}}function s(e){this.errorCorrectionLevel=h.forBits(e>>3&3),this.dataMask=7&e,this.__defineGetter__("ErrorCorrectionLevel",function(){return this.errorCorrectionLevel}),this.__defineGetter__("DataMask",function(){return this.dataMask}),this.GetHashCode=function(){return this.errorCorrectionLevel.ordinal()<<3|dataMask},this.Equals=function(e){var t=e;return this.errorCorrectionLevel==t.errorCorrectionLevel&&this.dataMask==t.dataMask}}function h(e,t,r){this.ordinal_Renamed_Field=e,this.bits=t,this.name=r,this.__defineGetter__("Bits",function(){return this.bits}),this.__defineGetter__("Name",function(){return this.name}),this.ordinal=function(){return this.ordinal_Renamed_Field}}function d(e,t){if(t||(t=e),1>e||1>t)throw"Both dimensions must be greater than 0";this.width=e,this.height=t;var r=e>>5;0!=(31&e)&&r++,this.rowSize=r,this.bits=new Array(r*t);for(var n=0;n<this.bits.length;n++)this.bits[n]=0;this.__defineGetter__("Width",function(){return this.width}),this.__defineGetter__("Height",function(){return this.height}),this.__defineGetter__("Dimension",function(){if(this.width!=this.height)throw"Can't call getDimension() on a non-square matrix";return this.width}),this.get_Renamed=function(e,t){var r=t*this.rowSize+(e>>5);return 0!=(1&A(this.bits[r],31&e))},this.set_Renamed=function(e,t){var r=t*this.rowSize+(e>>5);this.bits[r]|=1<<(31&e)},this.flip=function(e,t){var r=t*this.rowSize+(e>>5);this.bits[r]^=1<<(31&e)},this.clear=function(){for(var e=this.bits.length,t=0;e>t;t++)this.bits[t]=0},this.setRegion=function(e,t,r,n){if(0>t||0>e)throw"Left and top must be nonnegative";if(1>n||1>r)throw"Height and width must be at least 1";var i=e+r,o=t+n;if(o>this.height||i>this.width)throw"The region must fit inside the matrix";for(var a=t;o>a;a++)for(var s=a*this.rowSize,h=e;i>h;h++)this.bits[s+(h>>5)]|=1<<(31&h)}}function w(e,t){this.numDataCodewords=e,this.codewords=t,this.__defineGetter__("NumDataCodewords",function(){return this.numDataCodewords}),this.__defineGetter__("Codewords",function(){return this.codewords})}function f(e){var t=e.Dimension;if(21>t||1!=(3&t))throw"Error BitMatrixParser";this.bitMatrix=e,this.parsedVersion=null,this.parsedFormatInfo=null,this.copyBit=function(e,t,r){return this.bitMatrix.get_Renamed(e,t)?r<<1|1:r<<1},this.readFormatInformation=function(){if(null!=this.parsedFormatInfo)return this.parsedFormatInfo;for(var e=0,t=0;6>t;t++)e=this.copyBit(t,8,e);e=this.copyBit(7,8,e),e=this.copyBit(8,8,e),e=this.copyBit(8,7,e);for(var r=5;r>=0;r--)e=this.copyBit(8,r,e);if(this.parsedFormatInfo=s.decodeFormatInformation(e),null!=this.parsedFormatInfo)return this.parsedFormatInfo;var n=this.bitMatrix.Dimension;e=0;for(var i=n-8,t=n-1;t>=i;t--)e=this.copyBit(t,8,e);for(var r=n-7;n>r;r++)e=this.copyBit(8,r,e);if(this.parsedFormatInfo=s.decodeFormatInformation(e),null!=this.parsedFormatInfo)return this.parsedFormatInfo;throw"Error readFormatInformation"},this.readVersion=function(){if(null!=this.parsedVersion)return this.parsedVersion;var e=this.bitMatrix.Dimension,t=e-17>>2;if(6>=t)return r.getVersionForNumber(t);for(var n=0,i=e-11,o=5;o>=0;o--)for(var a=e-9;a>=i;a--)n=this.copyBit(a,o,n);if(this.parsedVersion=r.decodeVersionInformation(n),null!=this.parsedVersion&&this.parsedVersion.DimensionForVersion==e)return this.parsedVersion;n=0;for(var a=5;a>=0;a--)for(var o=e-9;o>=i;o--)n=this.copyBit(a,o,n);if(this.parsedVersion=r.decodeVersionInformation(n),null!=this.parsedVersion&&this.parsedVersion.DimensionForVersion==e)return this.parsedVersion;throw"Error readVersion"},this.readCodewords=function(){var e=this.readFormatInformation(),t=this.readVersion(),r=DataMask.forReference(e.DataMask),n=this.bitMatrix.Dimension;r.unmaskBitMatrix(this.bitMatrix,n);for(var i=t.buildFunctionPattern(),o=!0,a=new Array(t.TotalCodewords),s=0,h=0,d=0,w=n-1;w>0;w-=2){6==w&&w--;for(var f=0;n>f;f++)for(var c=o?n-1-f:f,u=0;2>u;u++)i.get_Renamed(w-u,c)||(d++,h<<=1,this.bitMatrix.get_Renamed(w-u,c)&&(h|=1),8==d&&(a[s++]=h,d=0,h=0));o^=!0}if(s!=t.TotalCodewords)throw"Error readCodewords";return a}}function c(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e,t){return 0==(e+t&1)}}function u(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e){return 0==(1&e)}}function l(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e,t){return t%3==0}}function v(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e,t){return(e+t)%3==0}}function g(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e,t){return 0==(A(e,1)+t/3&1)}}function m(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e,t){var r=e*t;return(1&r)+r%3==0}}function y(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e,t){var r=e*t;return 0==((1&r)+r%3&1)}}function b(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e,t){return 0==((e+t&1)+e*t%3&1)}}function C(e){this.field=e,this.decode=function(e,t){for(var r=new M(this.field,e),n=new Array(t),i=0;i<n.length;i++)n[i]=0;for(var o=!1,a=!0,i=0;t>i;i++){var s=r.evaluateAt(this.field.exp(o?i+1:i));n[n.length-1-i]=s,0!=s&&(a=!1)}if(!a)for(var h=new M(this.field,n),d=this.runEuclideanAlgorithm(this.field.buildMonomial(t,1),h,t),w=d[0],f=d[1],c=this.findErrorLocations(w),u=this.findErrorMagnitudes(f,c,o),i=0;i<c.length;i++){var l=e.length-1-this.field.log(c[i]);if(0>l)throw"ReedSolomonException Bad error location";e[l]=_.addOrSubtract(e[l],u[i])}},this.runEuclideanAlgorithm=function(e,t,r){if(e.Degree<t.Degree){var n=e;e=t,t=n}for(var i=e,o=t,a=this.field.One,s=this.field.Zero,h=this.field.Zero,d=this.field.One;o.Degree>=Math.floor(r/2);){var w=i,f=a,c=h;if(i=o,a=s,h=d,i.Zero)throw"r_{i-1} was zero";o=w;for(var u=this.field.Zero,l=i.getCoefficient(i.Degree),v=this.field.inverse(l);o.Degree>=i.Degree&&!o.Zero;){var g=o.Degree-i.Degree,m=this.field.multiply(o.getCoefficient(o.Degree),v);u=u.addOrSubtract(this.field.buildMonomial(g,m)),o=o.addOrSubtract(i.multiplyByMonomial(g,m))}s=u.multiply1(a).addOrSubtract(f),d=u.multiply1(h).addOrSubtract(c)}var y=d.getCoefficient(0);if(0==y)throw"ReedSolomonException sigmaTilde(0) was zero";var p=this.field.inverse(y),b=d.multiply2(p),C=o.multiply2(p);return new Array(b,C)},this.findErrorLocations=function(e){var t=e.Degree;if(1==t)return new Array(e.getCoefficient(1));for(var r=new Array(t),n=0,i=1;256>i&&t>n;i++)0==e.evaluateAt(i)&&(r[n]=this.field.inverse(i),n++);if(n!=t)throw"Error locator degree does not match number of roots";return r},this.findErrorMagnitudes=function(e,t,r){for(var n=t.length,i=new Array(n),o=0;n>o;o++){for(var a=this.field.inverse(t[o]),s=1,h=0;n>h;h++)o!=h&&(s=this.field.multiply(s,_.addOrSubtract(1,this.field.multiply(t[h],a))));i[o]=this.field.multiply(e.evaluateAt(a),this.field.inverse(s)),r&&(i[o]=this.field.multiply(i[o],a))}return i}}function M(e,t){if(null==t||0==t.length)throw"System.ArgumentException";this.field=e;var r=t.length;if(r>1&&0==t[0]){for(var n=1;r>n&&0==t[n];)n++;if(n==r)this.coefficients=e.Zero.coefficients;else{this.coefficients=new Array(r-n);for(var i=0;i<this.coefficients.length;i++)this.coefficients[i]=0;for(var o=0;o<this.coefficients.length;o++)this.coefficients[o]=t[n+o]}}else this.coefficients=t;this.__defineGetter__("Zero",function(){return 0==this.coefficients[0]}),this.__defineGetter__("Degree",function(){return this.coefficients.length-1}),this.__defineGetter__("Coefficients",function(){return this.coefficients}),this.getCoefficient=function(e){return this.coefficients[this.coefficients.length-1-e]},this.evaluateAt=function(e){if(0==e)return this.getCoefficient(0);var t=this.coefficients.length;if(1==e){for(var r=0,n=0;t>n;n++)r=_.addOrSubtract(r,this.coefficients[n]);return r}for(var i=this.coefficients[0],n=1;t>n;n++)i=_.addOrSubtract(this.field.multiply(e,i),this.coefficients[n]);return i},this.addOrSubtract=function(t){if(this.field!=t.field)throw"GF256Polys do not have same GF256 field";if(this.Zero)return t;if(t.Zero)return this;var r=this.coefficients,n=t.coefficients;if(r.length>n.length){var i=r;r=n,n=i}for(var o=new Array(n.length),a=n.length-r.length,s=0;a>s;s++)o[s]=n[s];for(var h=a;h<n.length;h++)o[h]=_.addOrSubtract(r[h-a],n[h]);return new M(e,o)},this.multiply1=function(e){if(this.field!=e.field)throw"GF256Polys do not have same GF256 field";if(this.Zero||e.Zero)return this.field.Zero;for(var t=this.coefficients,r=t.length,n=e.coefficients,i=n.length,o=new Array(r+i-1),a=0;r>a;a++)for(var s=t[a],h=0;i>h;h++)o[a+h]=_.addOrSubtract(o[a+h],this.field.multiply(s,n[h]));return new M(this.field,o)},this.multiply2=function(e){if(0==e)return this.field.Zero;if(1==e)return this;for(var t=this.coefficients.length,r=new Array(t),n=0;t>n;n++)r[n]=this.field.multiply(this.coefficients[n],e);return new M(this.field,r)},this.multiplyByMonomial=function(e,t){if(0>e)throw"System.ArgumentException";if(0==t)return this.field.Zero;for(var r=this.coefficients.length,n=new Array(r+e),i=0;i<n.length;i++)n[i]=0;for(var i=0;r>i;i++)n[i]=this.field.multiply(this.coefficients[i],t);return new M(this.field,n)},this.divide=function(e){if(this.field!=e.field)throw"GF256Polys do not have same GF256 field";if(e.Zero)throw"Divide by 0";for(var t=this.field.Zero,r=this,n=e.getCoefficient(e.Degree),i=this.field.inverse(n);r.Degree>=e.Degree&&!r.Zero;){var o=r.Degree-e.Degree,a=this.field.multiply(r.getCoefficient(r.Degree),i),s=e.multiplyByMonomial(o,a),h=this.field.buildMonomial(o,a);t=t.addOrSubtract(h),r=r.addOrSubtract(s)}return new Array(t,r)}}function _(e){this.expTable=new Array(256),this.logTable=new Array(256);for(var t=1,r=0;256>r;r++)this.expTable[r]=t,t<<=1,t>=256&&(t^=e);for(var r=0;255>r;r++)this.logTable[this.expTable[r]]=r;var n=new Array(1);n[0]=0,this.zero=new M(this,new Array(n));var i=new Array(1);i[0]=1,this.one=new M(this,new Array(i)),this.__defineGetter__("Zero",function(){return this.zero}),this.__defineGetter__("One",function(){return this.one}),this.buildMonomial=function(e,t){if(0>e)throw"System.ArgumentException";if(0==t)return zero;for(var r=new Array(e+1),n=0;n<r.length;n++)r[n]=0;return r[0]=t,new M(this,r)},this.exp=function(e){return this.expTable[e]},this.log=function(e){if(0==e)throw"System.ArgumentException";return this.logTable[e]},this.inverse=function(e){if(0==e)throw"System.ArithmeticException";return this.expTable[255-this.logTable[e]]},this.multiply=function(e,t){return 0==e||0==t?0:1==e?t:1==t?e:this.expTable[(this.logTable[e]+this.logTable[t])%255]}}function A(e,t){return e>=0?e>>t:(e>>t)+(2<<~t)}function q(e,t,r){this.x=e,this.y=t,this.count=1,this.estimatedModuleSize=r,this.__defineGetter__("EstimatedModuleSize",function(){return this.estimatedModuleSize}),this.__defineGetter__("Count",function(){return this.count}),this.__defineGetter__("X",function(){return this.x}),this.__defineGetter__("Y",function(){return this.y}),this.incrementCount=function(){this.count++},this.aboutEquals=function(e,t,r){if(Math.abs(t-this.y)<=e&&Math.abs(r-this.x)<=e){var n=Math.abs(e-this.estimatedModuleSize);return 1>=n||n/this.estimatedModuleSize<=1}return!1}}function k(e){this.bottomLeft=e[0],this.topLeft=e[1],this.topRight=e[2],this.__defineGetter__("BottomLeft",function(){return this.bottomLeft}),this.__defineGetter__("TopLeft",function(){return this.topLeft}),this.__defineGetter__("TopRight",function(){return this.topRight})}function S(){this.image=null,this.possibleCenters=[],this.hasSkipped=!1,this.crossCheckStateCount=new Array(0,0,0,0,0),this.resultPointCallback=null,this.__defineGetter__("CrossCheckStateCount",function(){return this.crossCheckStateCount[0]=0,this.crossCheckStateCount[1]=0,this.crossCheckStateCount[2]=0,this.crossCheckStateCount[3]=0,this.crossCheckStateCount[4]=0,this.crossCheckStateCount}),this.foundPatternCross=function(e){for(var t=0,r=0;5>r;r++){var n=e[r];if(0==n)return!1;t+=n}if(7>t)return!1;var i=Math.floor((t<<L)/7),o=Math.floor(i/2);return Math.abs(i-(e[0]<<L))<o&&Math.abs(i-(e[1]<<L))<o&&Math.abs(3*i-(e[2]<<L))<3*o&&Math.abs(i-(e[3]<<L))<o&&Math.abs(i-(e[4]<<L))<o},this.centerFromEnd=function(e,t){return t-e[4]-e[3]-e[2]/2},this.crossCheckVertical=function(e,t,r,n){for(var i=this.image,o=qrcode.height,a=this.CrossCheckStateCount,s=e;s>=0&&i[t+s*qrcode.width];)a[2]++,s--;if(0>s)return 0/0;for(;s>=0&&!i[t+s*qrcode.width]&&a[1]<=r;)a[1]++,s--;if(0>s||a[1]>r)return 0/0;for(;s>=0&&i[t+s*qrcode.width]&&a[0]<=r;)a[0]++,s--;if(a[0]>r)return 0/0;for(s=e+1;o>s&&i[t+s*qrcode.width];)a[2]++,s++;if(s==o)return 0/0;for(;o>s&&!i[t+s*qrcode.width]&&a[3]<r;)a[3]++,s++;if(s==o||a[3]>=r)return 0/0;for(;o>s&&i[t+s*qrcode.width]&&a[4]<r;)a[4]++,s++;if(a[4]>=r)return 0/0;var h=a[0]+a[1]+a[2]+a[3]+a[4];return 5*Math.abs(h-n)>=2*n?0/0:this.foundPatternCross(a)?this.centerFromEnd(a,s):0/0},this.crossCheckHorizontal=function(e,t,r,n){for(var i=this.image,o=qrcode.width,a=this.CrossCheckStateCount,s=e;s>=0&&i[s+t*qrcode.width];)a[2]++,s--;if(0>s)return 0/0;for(;s>=0&&!i[s+t*qrcode.width]&&a[1]<=r;)a[1]++,s--;if(0>s||a[1]>r)return 0/0;for(;s>=0&&i[s+t*qrcode.width]&&a[0]<=r;)a[0]++,s--;if(a[0]>r)return 0/0;for(s=e+1;o>s&&i[s+t*qrcode.width];)a[2]++,s++;if(s==o)return 0/0;for(;o>s&&!i[s+t*qrcode.width]&&a[3]<r;)a[3]++,s++;if(s==o||a[3]>=r)return 0/0;for(;o>s&&i[s+t*qrcode.width]&&a[4]<r;)a[4]++,s++;if(a[4]>=r)return 0/0;var h=a[0]+a[1]+a[2]+a[3]+a[4];return 5*Math.abs(h-n)>=n?0/0:this.foundPatternCross(a)?this.centerFromEnd(a,s):0/0},this.handlePossibleCenter=function(e,t,r){var n=e[0]+e[1]+e[2]+e[3]+e[4],i=this.centerFromEnd(e,r),o=this.crossCheckVertical(t,Math.floor(i),e[2],n);if(!isNaN(o)&&(i=this.crossCheckHorizontal(Math.floor(i),Math.floor(o),e[2],n),!isNaN(i))){for(var a=n/7,s=!1,h=this.possibleCenters.length,d=0;h>d;d++){var w=this.possibleCenters[d];if(w.aboutEquals(a,o,i)){w.incrementCount(),s=!0;break}}if(!s){var f=new q(i,o,a);this.possibleCenters.push(f),null!=this.resultPointCallback&&this.resultPointCallback.foundPossibleResultPoint(f)}return!0}return!1},this.selectBestPatterns=function(){var e=this.possibleCenters.length;if(3>e)throw"Couldn't find enough finder patterns";if(e>3){for(var t=0,r=0,n=0;e>n;n++){var i=this.possibleCenters[n].EstimatedModuleSize;t+=i,r+=i*i}var o=t/e;this.possibleCenters.sort(function(e,t){var r=Math.abs(t.EstimatedModuleSize-o),n=Math.abs(e.EstimatedModuleSize-o);return n>r?-1:r==n?0:1});for(var a=Math.sqrt(r/e-o*o),s=Math.max(.2*o,a),n=0;n<this.possibleCenters.length&&this.possibleCenters.length>3;n++){var h=this.possibleCenters[n];Math.abs(h.EstimatedModuleSize-o)>s&&(this.possibleCenters.remove(n),n--)}}return this.possibleCenters.length>3&&this.possibleCenters.sort(function(e,t){return e.count>t.count?-1:e.count<t.count?1:0}),new Array(this.possibleCenters[0],this.possibleCenters[1],this.possibleCenters[2])},this.findRowSkip=function(){var e=this.possibleCenters.length;if(1>=e)return 0;for(var t=null,r=0;e>r;r++){var n=this.possibleCenters[r];if(n.Count>=O){if(null!=t)return this.hasSkipped=!0,Math.floor((Math.abs(t.X-n.X)-Math.abs(t.Y-n.Y))/2);t=n}}return 0},this.haveMultiplyConfirmedCenters=function(){for(var e=0,t=0,r=this.possibleCenters.length,n=0;r>n;n++){var i=this.possibleCenters[n];i.Count>=O&&(e++,t+=i.EstimatedModuleSize)}if(3>e)return!1;for(var o=t/r,a=0,n=0;r>n;n++)i=this.possibleCenters[n],a+=Math.abs(i.EstimatedModuleSize-o);return.05*t>=a},this.findFinderPattern=function(e){var t=!1;this.image=e;var r=qrcode.height,n=qrcode.width,i=Math.floor(3*r/(4*V));(z>i||t)&&(i=z);for(var o=!1,a=new Array(5),s=i-1;r>s&&!o;s+=i){a[0]=0,a[1]=0,a[2]=0,a[3]=0,a[4]=0;for(var h=0,d=0;n>d;d++)if(e[d+s*qrcode.width])1==(1&h)&&h++,a[h]++;else if(0==(1&h))if(4==h)if(this.foundPatternCross(a)){var w=this.handlePossibleCenter(a,s,d);if(w)if(i=2,this.hasSkipped)o=this.haveMultiplyConfirmedCenters();else{var f=this.findRowSkip();f>a[2]&&(s+=f-a[2]-i,d=n-1)}else{do d++;while(n>d&&!e[d+s*qrcode.width]);d--}h=0,a[0]=0,a[1]=0,a[2]=0,a[3]=0,a[4]=0}else a[0]=a[2],a[1]=a[3],a[2]=a[4],a[3]=1,a[4]=0,h=3;else a[++h]++;else a[h]++;if(this.foundPatternCross(a)){var w=this.handlePossibleCenter(a,s,n);w&&(i=a[0],this.hasSkipped&&(o=haveMultiplyConfirmedCenters()))}}var c=this.selectBestPatterns();return qrcode.orderBestPatterns(c),new k(c)}}function E(e,t,r){this.x=e,this.y=t,this.count=1,this.estimatedModuleSize=r,this.__defineGetter__("EstimatedModuleSize",function(){return this.estimatedModuleSize}),this.__defineGetter__("Count",function(){return this.count}),this.__defineGetter__("X",function(){return Math.floor(this.x)}),this.__defineGetter__("Y",function(){return Math.floor(this.y)}),this.incrementCount=function(){this.count++},this.aboutEquals=function(e,t,r){if(Math.abs(t-this.y)<=e&&Math.abs(r-this.x)<=e){var n=Math.abs(e-this.estimatedModuleSize);return 1>=n||n/this.estimatedModuleSize<=1}return!1}}function P(e,t,r,n,i,o,a){this.image=e,this.possibleCenters=new Array,this.startX=t,this.startY=r,this.width=n,this.height=i,this.moduleSize=o,this.crossCheckStateCount=new Array(0,0,0),this.resultPointCallback=a,this.centerFromEnd=function(e,t){return t-e[2]-e[1]/2},this.foundPatternCross=function(e){for(var t=this.moduleSize,r=t/2,n=0;3>n;n++)if(Math.abs(t-e[n])>=r)return!1;return!0},this.crossCheckVertical=function(e,t,r,n){var i=this.image,o=qrcode.height,a=this.crossCheckStateCount;a[0]=0,a[1]=0,a[2]=0;for(var s=e;s>=0&&i[t+s*qrcode.width]&&a[1]<=r;)a[1]++,s--;if(0>s||a[1]>r)return 0/0;for(;s>=0&&!i[t+s*qrcode.width]&&a[0]<=r;)a[0]++,s--;if(a[0]>r)return 0/0;for(s=e+1;o>s&&i[t+s*qrcode.width]&&a[1]<=r;)a[1]++,s++;if(s==o||a[1]>r)return 0/0;for(;o>s&&!i[t+s*qrcode.width]&&a[2]<=r;)a[2]++,s++;if(a[2]>r)return 0/0;var h=a[0]+a[1]+a[2];return 5*Math.abs(h-n)>=2*n?0/0:this.foundPatternCross(a)?this.centerFromEnd(a,s):0/0},this.handlePossibleCenter=function(e,t,r){var n=e[0]+e[1]+e[2],i=this.centerFromEnd(e,r),o=this.crossCheckVertical(t,Math.floor(i),2*e[1],n);if(!isNaN(o)){for(var a=(e[0]+e[1]+e[2])/3,s=this.possibleCenters.length,h=0;s>h;h++){var d=this.possibleCenters[h];if(d.aboutEquals(a,o,i))return new E(i,o,a)}var w=new E(i,o,a);this.possibleCenters.push(w),null!=this.resultPointCallback&&this.resultPointCallback.foundPossibleResultPoint(w)}return null},this.find=function(){for(var t=this.startX,i=this.height,o=t+n,a=r+(i>>1),s=new Array(0,0,0),h=0;i>h;h++){var d=a+(0==(1&h)?h+1>>1:-(h+1>>1));s[0]=0,s[1]=0,s[2]=0;for(var w=t;o>w&&!e[w+qrcode.width*d];)w++;for(var f=0;o>w;){if(e[w+d*qrcode.width])if(1==f)s[f]++;else if(2==f){if(this.foundPatternCross(s)){var c=this.handlePossibleCenter(s,d,w);if(null!=c)return c}s[0]=s[2],s[1]=1,s[2]=0,f=1}else s[++f]++;else 1==f&&f++,s[f]++;w++}if(this.foundPatternCross(s)){var c=this.handlePossibleCenter(s,d,o);
if(null!=c)return c}}if(0!=this.possibleCenters.length)return this.possibleCenters[0];throw"Couldn't find enough alignment patterns"}}function D(e,t,r){this.blockPointer=0,this.bitPointer=7,this.dataLength=0,this.blocks=e,this.numErrorCorrectionCode=r,9>=t?this.dataLengthMode=0:t>=10&&26>=t?this.dataLengthMode=1:t>=27&&40>=t&&(this.dataLengthMode=2),this.getNextBits=function(e){var t=0;if(e<this.bitPointer+1){for(var r=0,n=0;e>n;n++)r+=1<<n;return r<<=this.bitPointer-e+1,t=(this.blocks[this.blockPointer]&r)>>this.bitPointer-e+1,this.bitPointer-=e,t}if(e<this.bitPointer+1+8){for(var i=0,n=0;n<this.bitPointer+1;n++)i+=1<<n;return t=(this.blocks[this.blockPointer]&i)<<e-(this.bitPointer+1),this.blockPointer++,t+=this.blocks[this.blockPointer]>>8-(e-(this.bitPointer+1)),this.bitPointer=this.bitPointer-e%8,this.bitPointer<0&&(this.bitPointer=8+this.bitPointer),t}if(e<this.bitPointer+1+16){for(var i=0,o=0,n=0;n<this.bitPointer+1;n++)i+=1<<n;var a=(this.blocks[this.blockPointer]&i)<<e-(this.bitPointer+1);this.blockPointer++;var s=this.blocks[this.blockPointer]<<e-(this.bitPointer+1+8);this.blockPointer++;for(var n=0;n<e-(this.bitPointer+1+8);n++)o+=1<<n;o<<=8-(e-(this.bitPointer+1+8));var h=(this.blocks[this.blockPointer]&o)>>8-(e-(this.bitPointer+1+8));return t=a+s+h,this.bitPointer=this.bitPointer-(e-8)%8,this.bitPointer<0&&(this.bitPointer=8+this.bitPointer),t}return 0},this.NextMode=function(){return this.blockPointer>this.blocks.length-this.numErrorCorrectionCode-2?0:this.getNextBits(4)},this.getDataLength=function(e){for(var t=0;;){if(e>>t==1)break;t++}return this.getNextBits(qrcode.sizeOfDataLengthInfo[this.dataLengthMode][t])},this.getRomanAndFigureString=function(e){var t=e,r=0,n="",i=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":");do if(t>1){r=this.getNextBits(11);var o=Math.floor(r/45),a=r%45;n+=i[o],n+=i[a],t-=2}else 1==t&&(r=this.getNextBits(6),n+=i[r],t-=1);while(t>0);return n},this.getFigureString=function(e){var t=e,r=0,n="";do t>=3?(r=this.getNextBits(10),100>r&&(n+="0"),10>r&&(n+="0"),t-=3):2==t?(r=this.getNextBits(7),10>r&&(n+="0"),t-=2):1==t&&(r=this.getNextBits(4),t-=1),n+=r;while(t>0);return n},this.get8bitByteArray=function(e){var t=e,r=0,n=new Array;do r=this.getNextBits(8),n.push(r),t--;while(t>0);return n},this.getKanjiString=function(e){var t=e,r=0,n="";do{r=getNextBits(13);var i=r%192,o=r/192,a=(o<<8)+i,s=0;s=40956>=a+33088?a+33088:a+49472,n+=String.fromCharCode(s),t--}while(t>0);return n},this.__defineGetter__("DataByte",function(){for(var e=new Array,t=1,r=2,n=4,i=8;;){var o=this.NextMode();if(0==o){if(e.length>0)break;throw"Empty data block"}if(o!=t&&o!=r&&o!=n&&o!=i)throw"Invalid mode: "+o+" in (block:"+this.blockPointer+" bit:"+this.bitPointer+")";if(dataLength=this.getDataLength(o),1>dataLength)throw"Invalid data length: "+dataLength;switch(o){case t:for(var a=this.getFigureString(dataLength),s=new Array(a.length),h=0;h<a.length;h++)s[h]=a.charCodeAt(h);e.push(s);break;case r:for(var a=this.getRomanAndFigureString(dataLength),s=new Array(a.length),h=0;h<a.length;h++)s[h]=a.charCodeAt(h);e.push(s);break;case n:var d=this.get8bitByteArray(dataLength);e.push(d);break;case i:var a=this.getKanjiString(dataLength);e.push(a)}}return e})}GridSampler={},GridSampler.checkAndNudgePoints=function(e,t){for(var r=qrcode.width,n=qrcode.height,i=!0,o=0;o<t.length&&i;o+=2){var a=Math.floor(t[o]),s=Math.floor(t[o+1]);if(-1>a||a>r||-1>s||s>n)throw"Error.checkAndNudgePoints ";i=!1,-1==a?(t[o]=0,i=!0):a==r&&(t[o]=r-1,i=!0),-1==s?(t[o+1]=0,i=!0):s==n&&(t[o+1]=n-1,i=!0)}i=!0;for(var o=t.length-2;o>=0&&i;o-=2){var a=Math.floor(t[o]),s=Math.floor(t[o+1]);if(-1>a||a>r||-1>s||s>n)throw"Error.checkAndNudgePoints ";i=!1,-1==a?(t[o]=0,i=!0):a==r&&(t[o]=r-1,i=!0),-1==s?(t[o+1]=0,i=!0):s==n&&(t[o+1]=n-1,i=!0)}},GridSampler.sampleGrid3=function(e,t,r){for(var n=new d(t),i=new Array(t<<1),o=0;t>o;o++){for(var a=i.length,s=o+.5,h=0;a>h;h+=2)i[h]=(h>>1)+.5,i[h+1]=s;r.transformPoints1(i),GridSampler.checkAndNudgePoints(e,i);try{for(var h=0;a>h;h+=2){var w=4*Math.floor(i[h])+Math.floor(i[h+1])*qrcode.width*4,f=e[Math.floor(i[h])+qrcode.width*Math.floor(i[h+1])];qrcode.imagedata.data[w]=f?255:0,qrcode.imagedata.data[w+1]=f?255:0,qrcode.imagedata.data[w+2]=0,qrcode.imagedata.data[w+3]=255,f&&n.set_Renamed(h>>1,o)}}catch(c){throw"Error.checkAndNudgePoints"}}return n},GridSampler.sampleGridx=function(e,t,r,n,o,a,s,h,d,w,f,c,u,l,v,g,m,y){var p=i.quadrilateralToQuadrilateral(r,n,o,a,s,h,d,w,f,c,u,l,v,g,m,y);return GridSampler.sampleGrid3(e,t,p)},r.VERSION_DECODE_INFO=new Array(31892,34236,39577,42195,48118,51042,55367,58893,63784,68472,70749,76311,79154,84390,87683,92361,96236,102084,102881,110507,110734,117786,119615,126325,127568,133589,136944,141498,145311,150283,152622,158308,161089,167017),r.VERSIONS=n(),r.getVersionForNumber=function(e){if(1>e||e>40)throw"ArgumentException";return r.VERSIONS[e-1]},r.getProvisionalVersionForDimension=function(e){if(e%4!=1)throw"Error getProvisionalVersionForDimension";try{return r.getVersionForNumber(e-17>>2)}catch(t){throw"Error getVersionForNumber"}},r.decodeVersionInformation=function(e){for(var t=4294967295,n=0,i=0;i<r.VERSION_DECODE_INFO.length;i++){var o=r.VERSION_DECODE_INFO[i];if(o==e)return this.getVersionForNumber(i+7);var a=s.numBitsDiffering(e,o);t>a&&(n=i+7,t=a)}return 3>=t?this.getVersionForNumber(n):null},i.quadrilateralToQuadrilateral=function(e,t,r,n,i,o,a,s,h,d,w,f,c,u,l,v){var g=this.quadrilateralToSquare(e,t,r,n,i,o,a,s),m=this.squareToQuadrilateral(h,d,w,f,c,u,l,v);return m.times(g)},i.squareToQuadrilateral=function(e,t,r,n,o,a,s,h){return dy2=h-a,dy3=t-n+a-h,0==dy2&&0==dy3?new i(r-e,o-r,e,n-t,a-n,t,0,0,1):(dx1=r-o,dx2=s-o,dx3=e-r+o-s,dy1=n-a,denominator=dx1*dy2-dx2*dy1,a13=(dx3*dy2-dx2*dy3)/denominator,a23=(dx1*dy3-dx3*dy1)/denominator,new i(r-e+a13*r,s-e+a23*s,e,n-t+a13*n,h-t+a23*h,t,a13,a23,1))},i.quadrilateralToSquare=function(e,t,r,n,i,o,a,s){return this.squareToQuadrilateral(e,t,r,n,i,o,a,s).buildAdjoint()};var x=21522,B=new Array(new Array(21522,0),new Array(20773,1),new Array(24188,2),new Array(23371,3),new Array(17913,4),new Array(16590,5),new Array(20375,6),new Array(19104,7),new Array(30660,8),new Array(29427,9),new Array(32170,10),new Array(30877,11),new Array(26159,12),new Array(25368,13),new Array(27713,14),new Array(26998,15),new Array(5769,16),new Array(5054,17),new Array(7399,18),new Array(6608,19),new Array(1890,20),new Array(597,21),new Array(3340,22),new Array(2107,23),new Array(13663,24),new Array(12392,25),new Array(16177,26),new Array(14854,27),new Array(9396,28),new Array(8579,29),new Array(11994,30),new Array(11245,31)),F=new Array(0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4);s.numBitsDiffering=function(e,t){return e^=t,F[15&e]+F[15&A(e,4)]+F[15&A(e,8)]+F[15&A(e,12)]+F[15&A(e,16)]+F[15&A(e,20)]+F[15&A(e,24)]+F[15&A(e,28)]},s.decodeFormatInformation=function(e){var t=s.doDecodeFormatInformation(e);return null!=t?t:s.doDecodeFormatInformation(e^x)},s.doDecodeFormatInformation=function(e){for(var t=4294967295,r=0,n=0;n<B.length;n++){var i=B[n],o=i[0];if(o==e)return new s(i[1]);var a=this.numBitsDiffering(e,o);t>a&&(r=i[1],t=a)}return 3>=t?new s(r):null},h.forBits=function(e){if(0>e||e>=R.length)throw"ArgumentException";return R[e]};var G=new h(0,1,"L"),I=new h(1,0,"M"),T=new h(2,3,"Q"),N=new h(3,2,"H"),R=new Array(I,G,N,T);w.getDataBlocks=function(e,t,r){if(e.length!=t.TotalCodewords)throw"ArgumentException";for(var n=t.getECBlocksForLevel(r),i=0,o=n.getECBlocks(),a=0;a<o.length;a++)i+=o[a].Count;for(var s=new Array(i),h=0,d=0;d<o.length;d++)for(var f=o[d],a=0;a<f.Count;a++){var c=f.DataCodewords,u=n.ECCodewordsPerBlock+c;s[h++]=new w(c,new Array(u))}for(var l=s[0].codewords.length,v=s.length-1;v>=0;){var g=s[v].codewords.length;if(g==l)break;v--}v++;for(var m=l-n.ECCodewordsPerBlock,y=0,a=0;m>a;a++)for(var d=0;h>d;d++)s[d].codewords[a]=e[y++];for(var d=v;h>d;d++)s[d].codewords[m]=e[y++];for(var p=s[0].codewords.length,a=m;p>a;a++)for(var d=0;h>d;d++){var b=v>d?a:a+1;s[d].codewords[b]=e[y++]}return s},DataMask={},DataMask.forReference=function(e){if(0>e||e>7)throw"System.ArgumentException";return DataMask.DATA_MASKS[e]},DataMask.DATA_MASKS=new Array(new c,new u,new l,new v,new g,new m,new y,new b),_.QR_CODE_FIELD=new _(285),_.DATA_MATRIX_FIELD=new _(301),_.addOrSubtract=function(e,t){return e^t},Decoder={},Decoder.rsDecoder=new C(_.QR_CODE_FIELD),Decoder.correctErrors=function(e,t){for(var r=e.length,n=new Array(r),i=0;r>i;i++)n[i]=255&e[i];var o=e.length-t;try{Decoder.rsDecoder.decode(n,o)}catch(a){throw a}for(var i=0;t>i;i++)e[i]=n[i]},Decoder.decode=function(e){for(var t=new f(e),r=t.readVersion(),n=t.readFormatInformation().ErrorCorrectionLevel,i=t.readCodewords(),o=w.getDataBlocks(i,r,n),a=0,s=0;s<o.length;s++)a+=o[s].NumDataCodewords;for(var h=new Array(a),d=0,c=0;c<o.length;c++){var u=o[c],l=u.Codewords,v=u.NumDataCodewords;Decoder.correctErrors(l,v);for(var s=0;v>s;s++)h[d++]=l[s]}var g=new D(h,r.VersionNumber,n.Bits);return g},qrcode={},qrcode.imagedata=null,qrcode.width=0,qrcode.height=0,qrcode.qrCodeSymbol=null,qrcode.debug=!1,qrcode.maxImgSize=1048576,qrcode.canvasElement=null,qrcode.sizeOfDataLengthInfo=[[10,9,8,8],[12,11,16,10],[14,13,16,12]],qrcode.callback=null,qrcode.setCanvasElement=function(e){qrcode.canvasElement=e},qrcode.decode=function(e,t){if(0==arguments.length){var r=qrcode.canvasElement,n=r.getContext("2d");return qrcode.width=r.width,qrcode.height=r.height,qrcode.imagedata=n.getImageData(0,0,qrcode.width,qrcode.height),qrcode.result=qrcode.process(n),null!=qrcode.callback&&qrcode.callback(qrcode.result),qrcode.result}var i=new Image;i.onload=function(){var e=document.createElement("canvas"),r=e.getContext("2d"),n=i.height,o=i.width;if(i.width*i.height>qrcode.maxImgSize){var a=i.width/i.height;n=Math.sqrt(qrcode.maxImgSize/a),o=a*n}e.width=o,e.height=n,r.drawImage(i,0,0,e.width,e.height),qrcode.width=e.width,qrcode.height=e.height;try{qrcode.imagedata=r.getImageData(0,0,e.width,e.height)}catch(s){return qrcode.result="Cross domain Error",null!=qrcode.callback&&qrcode.callback(qrcode.result),void 0}try{qrcode.result=qrcode.process(r),t(null,qrcode.result)}catch(s){qrcode.result="Error decoding QR Code from Image",t(new Error("Error decoding QR Code from Image"))}null!=qrcode.callback&&qrcode.callback(qrcode.result)},i.src=e},qrcode.isUrl=function(e){var t=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return t.test(e)},qrcode.decode_url=function(e){var t="";try{t=escape(e)}catch(r){t=e}var n="";try{n=decodeURIComponent(t)}catch(r){n=t}return n},qrcode.decode_utf8=function(e){return qrcode.isUrl(e)?qrcode.decode_url(e):e},qrcode.process=function(e){var t=((new Date).getTime(),qrcode.grayScaleToBitmap(qrcode.grayscale()));if(qrcode.debug){for(var r=0;r<qrcode.height;r++)for(var n=0;n<qrcode.width;n++){var i=4*n+r*qrcode.width*4;qrcode.imagedata.data[i]=t[n+r*qrcode.width]?0:0,qrcode.imagedata.data[i+1]=t[n+r*qrcode.width]?0:0,qrcode.imagedata.data[i+2]=t[n+r*qrcode.width]?255:0}e.putImageData(qrcode.imagedata,0,0)}var o=new a(t),s=o.detect();qrcode.debug&&e.putImageData(qrcode.imagedata,0,0);for(var h=Decoder.decode(s.bits),d=h.DataByte,w="",f=0;f<d.length;f++)for(var c=0;c<d[f].length;c++)w+=String.fromCharCode(d[f][c]);(new Date).getTime();return qrcode.decode_utf8(w)},qrcode.getPixel=function(e,t){if(qrcode.width<e)throw"point error";if(qrcode.height<t)throw"point error";return point=4*e+t*qrcode.width*4,p=(33*qrcode.imagedata.data[point]+34*qrcode.imagedata.data[point+1]+33*qrcode.imagedata.data[point+2])/100},qrcode.binarize=function(e){for(var t=new Array(qrcode.width*qrcode.height),r=0;r<qrcode.height;r++)for(var n=0;n<qrcode.width;n++){var i=qrcode.getPixel(n,r);t[n+r*qrcode.width]=e>=i?!0:!1}return t},qrcode.getMiddleBrightnessPerArea=function(e){for(var t=4,r=Math.floor(qrcode.width/t),n=Math.floor(qrcode.height/t),i=new Array(t),o=0;t>o;o++){i[o]=new Array(t);for(var a=0;t>a;a++)i[o][a]=new Array(0,0)}for(var s=0;t>s;s++)for(var h=0;t>h;h++){i[h][s][0]=255;for(var d=0;n>d;d++)for(var w=0;r>w;w++){var f=e[r*h+w+(n*s+d)*qrcode.width];f<i[h][s][0]&&(i[h][s][0]=f),f>i[h][s][1]&&(i[h][s][1]=f)}}for(var c=new Array(t),u=0;t>u;u++)c[u]=new Array(t);for(var s=0;t>s;s++)for(var h=0;t>h;h++)c[h][s]=Math.floor((i[h][s][0]+i[h][s][1])/2);return c},qrcode.grayScaleToBitmap=function(e){for(var t=qrcode.getMiddleBrightnessPerArea(e),r=t.length,n=Math.floor(qrcode.width/r),i=Math.floor(qrcode.height/r),o=new Array(qrcode.height*qrcode.width),a=0;r>a;a++)for(var s=0;r>s;s++)for(var h=0;i>h;h++)for(var d=0;n>d;d++)o[n*s+d+(i*a+h)*qrcode.width]=e[n*s+d+(i*a+h)*qrcode.width]<t[s][a]?!0:!1;return o},qrcode.grayscale=function(){for(var e=new Array(qrcode.width*qrcode.height),t=0;t<qrcode.height;t++)for(var r=0;r<qrcode.width;r++){var n=qrcode.getPixel(r,t);e[r+t*qrcode.width]=n}return e},Array.prototype.remove=function(e,t){var r=this.slice((t||e)+1||this.length);return this.length=0>e?this.length+e:e,this.push.apply(this,r)};var z=3,V=57,L=8,O=2;return qrcode.orderBestPatterns=function(e){function t(e,t){return xDiff=e.X-t.X,yDiff=e.Y-t.Y,Math.sqrt(xDiff*xDiff+yDiff*yDiff)}function r(e,t,r){var n=t.x,i=t.y;return(r.x-n)*(e.y-i)-(r.y-i)*(e.x-n)}var n,i,o,a=t(e[0],e[1]),s=t(e[1],e[2]),h=t(e[0],e[2]);if(s>=a&&s>=h?(i=e[0],n=e[1],o=e[2]):h>=s&&h>=a?(i=e[1],n=e[0],o=e[2]):(i=e[2],n=e[0],o=e[1]),r(n,i,o)<0){var d=n;n=o,o=d}e[0]=n,e[1]=i,e[2]=o},qrcode}),function(e,t){"function"==typeof define&&define.amd?define(["qrcode"],t):"object"==typeof exports?module.exports=t(require("../build/qrcode")):e.QCodeDecoder=t(qrcode)}(this,function(e){"use strict";function t(){return this instanceof t?(this.timerCapture=null,this.canvasElem=null,this.stream=null,this.videoConstraints={video:!0,audio:!1},void 0):new t}return t.prototype.isCanvasSupported=function(){var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))},t.prototype.hasGetUserMedia=function(){return navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,!!navigator.getUserMedia},t.prototype._prepareCanvas=function(t){return this.canvasElem||(this.canvasElem=document.createElement("canvas"),this.canvasElem.style.width=t.videoWidth+"px",this.canvasElem.style.height=t.videoHeight+"px",this.canvasElem.width=t.videoWidth,this.canvasElem.height=t.videoHeight),e.setCanvasElement(this.canvasElem),this},t.prototype._captureToCanvas=function(t,r,n){if(this.timerCapture&&clearTimeout(this.timerCapture),t.videoWidth&&t.videoHeight){this.canvasElem||this._prepareCanvas(t);var i=this.canvasElem.getContext("2d");i.clearRect(0,0,t.videoWidth,t.videoHeight),i.drawImage(t,0,0,t.videoWidth,t.videoHeight);try{if(r(null,e.decode()),n)return}catch(o){"Couldn't find enough finder patterns"!==o&&r(new Error(o))}}this.timerCapture=setTimeout(function(){this._captureToCanvas.call(this,t,r,n)}.bind(this),500)},t.prototype.decodeFromCamera=function(e,t,r){var n=(this.stop(),this);return this.hasGetUserMedia()||t(new Error("Couldn't get video from camera")),navigator.getUserMedia(this.videoConstraints,function(i){e.src=window.URL.createObjectURL(i),n.videoElem=e,n.stream=i,n.videoDimensions=!1,setTimeout(function(){n._captureToCanvas.call(n,e,t,r)},500)},t),this},t.prototype.decodeFromVideo=function(e,t,r){return setTimeout(function(){this._captureToCanvas.call(this,e,t,r)}.bind(this),500),this},t.prototype.decodeFromImage=function(t,r){if(+t.nodeType>0&&!t.src)throw new Error("The ImageElement must contain a src");return t=t.src?t.src:t,e.decode(t,r),this},t.prototype.stop=function(){return this.stream&&(this.stream.stop(),this.stream=void 0),this.timerCapture&&(clearTimeout(this.timerCapture),this.timerCapture=void 0),this},t.prototype.setSourceId=function(e){return this.videoConstraints.video=e?{optional:[{sourceId:e}]}:!0,this},t.prototype.getVideoSources=function(e){var t=[];return MediaStreamTrack&&MediaStreamTrack.getSources?MediaStreamTrack.getSources(function(r){r.forEach(function(e){"video"===e.kind&&t.push(e)}),e(null,t)}):e(new Error("Current browser doest not support MediaStreamTrack.getSources")),this},t});

/**
 * @fileoverview
 * - Using the 'QRCode for Javascript library'
 * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
 * - this library has no dependencies.
 * 
 * @author davidshimjs
 * @see <a href="http://www.d-project.com/" target="_blank">http://www.d-project.com/</a>
 * @see <a href="http://jeromeetienne.github.com/jquery-qrcode/" target="_blank">http://jeromeetienne.github.com/jquery-qrcode/</a>
 */
 var QRCode;

 (function () {
     //---------------------------------------------------------------------
     // QRCode for JavaScript
     //
     // Copyright (c) 2009 Kazuhiko Arase
     //
     // URL: http://www.d-project.com/
     //
     // Licensed under the MIT license:
     //   http://www.opensource.org/licenses/mit-license.php
     //
     // The word "QR Code" is registered trademark of 
     // DENSO WAVE INCORPORATED
     //   http://www.denso-wave.com/qrcode/faqpatent-e.html
     //
     //---------------------------------------------------------------------
     function QR8bitByte(data) {
         this.mode = QRMode.MODE_8BIT_BYTE;
         this.data = data;
         this.parsedData = [];
 
         // Added to support UTF-8 Characters
         for (var i = 0, l = this.data.length; i < l; i++) {
             var byteArray = [];
             var code = this.data.charCodeAt(i);
 
             if (code > 0x10000) {
                 byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
                 byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
                 byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
                 byteArray[3] = 0x80 | (code & 0x3F);
             } else if (code > 0x800) {
                 byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
                 byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
                 byteArray[2] = 0x80 | (code & 0x3F);
             } else if (code > 0x80) {
                 byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
                 byteArray[1] = 0x80 | (code & 0x3F);
             } else {
                 byteArray[0] = code;
             }
 
             this.parsedData.push(byteArray);
         }
 
         this.parsedData = Array.prototype.concat.apply([], this.parsedData);
 
         if (this.parsedData.length != this.data.length) {
             this.parsedData.unshift(191);
             this.parsedData.unshift(187);
             this.parsedData.unshift(239);
         }
     }
 
     QR8bitByte.prototype = {
         getLength: function (buffer) {
             return this.parsedData.length;
         },
         write: function (buffer) {
             for (var i = 0, l = this.parsedData.length; i < l; i++) {
                 buffer.put(this.parsedData[i], 8);
             }
         }
     };
 
     function QRCodeModel(typeNumber, errorCorrectLevel) {
         this.typeNumber = typeNumber;
         this.errorCorrectLevel = errorCorrectLevel;
         this.modules = null;
         this.moduleCount = 0;
         this.dataCache = null;
         this.dataList = [];
     }
 
     QRCodeModel.prototype={addData:function(data){var newData=new QR8bitByte(data);this.dataList.push(newData);this.dataCache=null;},isDark:function(row,col){if(row<0||this.moduleCount<=row||col<0||this.moduleCount<=col){throw new Error(row+","+col);}
     return this.modules[row][col];},getModuleCount:function(){return this.moduleCount;},make:function(){this.makeImpl(false,this.getBestMaskPattern());},makeImpl:function(test,maskPattern){this.moduleCount=this.typeNumber*4+17;this.modules=new Array(this.moduleCount);for(var row=0;row<this.moduleCount;row++){this.modules[row]=new Array(this.moduleCount);for(var col=0;col<this.moduleCount;col++){this.modules[row][col]=null;}}
     this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(test,maskPattern);if(this.typeNumber>=7){this.setupTypeNumber(test);}
     if(this.dataCache==null){this.dataCache=QRCodeModel.createData(this.typeNumber,this.errorCorrectLevel,this.dataList);}
     this.mapData(this.dataCache,maskPattern);},setupPositionProbePattern:function(row,col){for(var r=-1;r<=7;r++){if(row+r<=-1||this.moduleCount<=row+r)continue;for(var c=-1;c<=7;c++){if(col+c<=-1||this.moduleCount<=col+c)continue;if((0<=r&&r<=6&&(c==0||c==6))||(0<=c&&c<=6&&(r==0||r==6))||(2<=r&&r<=4&&2<=c&&c<=4)){this.modules[row+r][col+c]=true;}else{this.modules[row+r][col+c]=false;}}}},getBestMaskPattern:function(){var minLostPoint=0;var pattern=0;for(var i=0;i<8;i++){this.makeImpl(true,i);var lostPoint=QRUtil.getLostPoint(this);if(i==0||minLostPoint>lostPoint){minLostPoint=lostPoint;pattern=i;}}
     return pattern;},createMovieClip:function(target_mc,instance_name,depth){var qr_mc=target_mc.createEmptyMovieClip(instance_name,depth);var cs=1;this.make();for(var row=0;row<this.modules.length;row++){var y=row*cs;for(var col=0;col<this.modules[row].length;col++){var x=col*cs;var dark=this.modules[row][col];if(dark){qr_mc.beginFill(0,100);qr_mc.moveTo(x,y);qr_mc.lineTo(x+cs,y);qr_mc.lineTo(x+cs,y+cs);qr_mc.lineTo(x,y+cs);qr_mc.endFill();}}}
     return qr_mc;},setupTimingPattern:function(){for(var r=8;r<this.moduleCount-8;r++){if(this.modules[r][6]!=null){continue;}
     this.modules[r][6]=(r%2==0);}
     for(var c=8;c<this.moduleCount-8;c++){if(this.modules[6][c]!=null){continue;}
     this.modules[6][c]=(c%2==0);}},setupPositionAdjustPattern:function(){var pos=QRUtil.getPatternPosition(this.typeNumber);for(var i=0;i<pos.length;i++){for(var j=0;j<pos.length;j++){var row=pos[i];var col=pos[j];if(this.modules[row][col]!=null){continue;}
     for(var r=-2;r<=2;r++){for(var c=-2;c<=2;c++){if(r==-2||r==2||c==-2||c==2||(r==0&&c==0)){this.modules[row+r][col+c]=true;}else{this.modules[row+r][col+c]=false;}}}}}},setupTypeNumber:function(test){var bits=QRUtil.getBCHTypeNumber(this.typeNumber);for(var i=0;i<18;i++){var mod=(!test&&((bits>>i)&1)==1);this.modules[Math.floor(i/3)][i%3+this.moduleCount-8-3]=mod;}
     for(var i=0;i<18;i++){var mod=(!test&&((bits>>i)&1)==1);this.modules[i%3+this.moduleCount-8-3][Math.floor(i/3)]=mod;}},setupTypeInfo:function(test,maskPattern){var data=(this.errorCorrectLevel<<3)|maskPattern;var bits=QRUtil.getBCHTypeInfo(data);for(var i=0;i<15;i++){var mod=(!test&&((bits>>i)&1)==1);if(i<6){this.modules[i][8]=mod;}else if(i<8){this.modules[i+1][8]=mod;}else{this.modules[this.moduleCount-15+i][8]=mod;}}
     for(var i=0;i<15;i++){var mod=(!test&&((bits>>i)&1)==1);if(i<8){this.modules[8][this.moduleCount-i-1]=mod;}else if(i<9){this.modules[8][15-i-1+1]=mod;}else{this.modules[8][15-i-1]=mod;}}
     this.modules[this.moduleCount-8][8]=(!test);},mapData:function(data,maskPattern){var inc=-1;var row=this.moduleCount-1;var bitIndex=7;var byteIndex=0;for(var col=this.moduleCount-1;col>0;col-=2){if(col==6)col--;while(true){for(var c=0;c<2;c++){if(this.modules[row][col-c]==null){var dark=false;if(byteIndex<data.length){dark=(((data[byteIndex]>>>bitIndex)&1)==1);}
     var mask=QRUtil.getMask(maskPattern,row,col-c);if(mask){dark=!dark;}
     this.modules[row][col-c]=dark;bitIndex--;if(bitIndex==-1){byteIndex++;bitIndex=7;}}}
     row+=inc;if(row<0||this.moduleCount<=row){row-=inc;inc=-inc;break;}}}}};QRCodeModel.PAD0=0xEC;QRCodeModel.PAD1=0x11;QRCodeModel.createData=function(typeNumber,errorCorrectLevel,dataList){var rsBlocks=QRRSBlock.getRSBlocks(typeNumber,errorCorrectLevel);var buffer=new QRBitBuffer();for(var i=0;i<dataList.length;i++){var data=dataList[i];buffer.put(data.mode,4);buffer.put(data.getLength(),QRUtil.getLengthInBits(data.mode,typeNumber));data.write(buffer);}
     var totalDataCount=0;for(var i=0;i<rsBlocks.length;i++){totalDataCount+=rsBlocks[i].dataCount;}
     if(buffer.getLengthInBits()>totalDataCount*8){throw new Error("code length overflow. ("
     +buffer.getLengthInBits()
     +">"
     +totalDataCount*8
     +")");}
     if(buffer.getLengthInBits()+4<=totalDataCount*8){buffer.put(0,4);}
     while(buffer.getLengthInBits()%8!=0){buffer.putBit(false);}
     while(true){if(buffer.getLengthInBits()>=totalDataCount*8){break;}
     buffer.put(QRCodeModel.PAD0,8);if(buffer.getLengthInBits()>=totalDataCount*8){break;}
     buffer.put(QRCodeModel.PAD1,8);}
     return QRCodeModel.createBytes(buffer,rsBlocks);};QRCodeModel.createBytes=function(buffer,rsBlocks){var offset=0;var maxDcCount=0;var maxEcCount=0;var dcdata=new Array(rsBlocks.length);var ecdata=new Array(rsBlocks.length);for(var r=0;r<rsBlocks.length;r++){var dcCount=rsBlocks[r].dataCount;var ecCount=rsBlocks[r].totalCount-dcCount;maxDcCount=Math.max(maxDcCount,dcCount);maxEcCount=Math.max(maxEcCount,ecCount);dcdata[r]=new Array(dcCount);for(var i=0;i<dcdata[r].length;i++){dcdata[r][i]=0xff&buffer.buffer[i+offset];}
     offset+=dcCount;var rsPoly=QRUtil.getErrorCorrectPolynomial(ecCount);var rawPoly=new QRPolynomial(dcdata[r],rsPoly.getLength()-1);var modPoly=rawPoly.mod(rsPoly);ecdata[r]=new Array(rsPoly.getLength()-1);for(var i=0;i<ecdata[r].length;i++){var modIndex=i+modPoly.getLength()-ecdata[r].length;ecdata[r][i]=(modIndex>=0)?modPoly.get(modIndex):0;}}
     var totalCodeCount=0;for(var i=0;i<rsBlocks.length;i++){totalCodeCount+=rsBlocks[i].totalCount;}
     var data=new Array(totalCodeCount);var index=0;for(var i=0;i<maxDcCount;i++){for(var r=0;r<rsBlocks.length;r++){if(i<dcdata[r].length){data[index++]=dcdata[r][i];}}}
     for(var i=0;i<maxEcCount;i++){for(var r=0;r<rsBlocks.length;r++){if(i<ecdata[r].length){data[index++]=ecdata[r][i];}}}
     return data;};var QRMode={MODE_NUMBER:1<<0,MODE_ALPHA_NUM:1<<1,MODE_8BIT_BYTE:1<<2,MODE_KANJI:1<<3};var QRErrorCorrectLevel={L:1,M:0,Q:3,H:2};var QRMaskPattern={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var QRUtil={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:(1<<10)|(1<<8)|(1<<5)|(1<<4)|(1<<2)|(1<<1)|(1<<0),G18:(1<<12)|(1<<11)|(1<<10)|(1<<9)|(1<<8)|(1<<5)|(1<<2)|(1<<0),G15_MASK:(1<<14)|(1<<12)|(1<<10)|(1<<4)|(1<<1),getBCHTypeInfo:function(data){var d=data<<10;while(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G15)>=0){d^=(QRUtil.G15<<(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G15)));}
     return((data<<10)|d)^QRUtil.G15_MASK;},getBCHTypeNumber:function(data){var d=data<<12;while(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G18)>=0){d^=(QRUtil.G18<<(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G18)));}
     return(data<<12)|d;},getBCHDigit:function(data){var digit=0;while(data!=0){digit++;data>>>=1;}
     return digit;},getPatternPosition:function(typeNumber){return QRUtil.PATTERN_POSITION_TABLE[typeNumber-1];},getMask:function(maskPattern,i,j){switch(maskPattern){case QRMaskPattern.PATTERN000:return(i+j)%2==0;case QRMaskPattern.PATTERN001:return i%2==0;case QRMaskPattern.PATTERN010:return j%3==0;case QRMaskPattern.PATTERN011:return(i+j)%3==0;case QRMaskPattern.PATTERN100:return(Math.floor(i/2)+Math.floor(j/3))%2==0;case QRMaskPattern.PATTERN101:return(i*j)%2+(i*j)%3==0;case QRMaskPattern.PATTERN110:return((i*j)%2+(i*j)%3)%2==0;case QRMaskPattern.PATTERN111:return((i*j)%3+(i+j)%2)%2==0;default:throw new Error("bad maskPattern:"+maskPattern);}},getErrorCorrectPolynomial:function(errorCorrectLength){var a=new QRPolynomial([1],0);for(var i=0;i<errorCorrectLength;i++){a=a.multiply(new QRPolynomial([1,QRMath.gexp(i)],0));}
     return a;},getLengthInBits:function(mode,type){if(1<=type&&type<10){switch(mode){case QRMode.MODE_NUMBER:return 10;case QRMode.MODE_ALPHA_NUM:return 9;case QRMode.MODE_8BIT_BYTE:return 8;case QRMode.MODE_KANJI:return 8;default:throw new Error("mode:"+mode);}}else if(type<27){switch(mode){case QRMode.MODE_NUMBER:return 12;case QRMode.MODE_ALPHA_NUM:return 11;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 10;default:throw new Error("mode:"+mode);}}else if(type<41){switch(mode){case QRMode.MODE_NUMBER:return 14;case QRMode.MODE_ALPHA_NUM:return 13;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 12;default:throw new Error("mode:"+mode);}}else{throw new Error("type:"+type);}},getLostPoint:function(qrCode){var moduleCount=qrCode.getModuleCount();var lostPoint=0;for(var row=0;row<moduleCount;row++){for(var col=0;col<moduleCount;col++){var sameCount=0;var dark=qrCode.isDark(row,col);for(var r=-1;r<=1;r++){if(row+r<0||moduleCount<=row+r){continue;}
     for(var c=-1;c<=1;c++){if(col+c<0||moduleCount<=col+c){continue;}
     if(r==0&&c==0){continue;}
     if(dark==qrCode.isDark(row+r,col+c)){sameCount++;}}}
     if(sameCount>5){lostPoint+=(3+sameCount-5);}}}
     for(var row=0;row<moduleCount-1;row++){for(var col=0;col<moduleCount-1;col++){var count=0;if(qrCode.isDark(row,col))count++;if(qrCode.isDark(row+1,col))count++;if(qrCode.isDark(row,col+1))count++;if(qrCode.isDark(row+1,col+1))count++;if(count==0||count==4){lostPoint+=3;}}}
     for(var row=0;row<moduleCount;row++){for(var col=0;col<moduleCount-6;col++){if(qrCode.isDark(row,col)&&!qrCode.isDark(row,col+1)&&qrCode.isDark(row,col+2)&&qrCode.isDark(row,col+3)&&qrCode.isDark(row,col+4)&&!qrCode.isDark(row,col+5)&&qrCode.isDark(row,col+6)){lostPoint+=40;}}}
     for(var col=0;col<moduleCount;col++){for(var row=0;row<moduleCount-6;row++){if(qrCode.isDark(row,col)&&!qrCode.isDark(row+1,col)&&qrCode.isDark(row+2,col)&&qrCode.isDark(row+3,col)&&qrCode.isDark(row+4,col)&&!qrCode.isDark(row+5,col)&&qrCode.isDark(row+6,col)){lostPoint+=40;}}}
     var darkCount=0;for(var col=0;col<moduleCount;col++){for(var row=0;row<moduleCount;row++){if(qrCode.isDark(row,col)){darkCount++;}}}
     var ratio=Math.abs(100*darkCount/moduleCount/moduleCount-50)/5;lostPoint+=ratio*10;return lostPoint;}};var QRMath={glog:function(n){if(n<1){throw new Error("glog("+n+")");}
     return QRMath.LOG_TABLE[n];},gexp:function(n){while(n<0){n+=255;}
     while(n>=256){n-=255;}
     return QRMath.EXP_TABLE[n];},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)};for(var i=0;i<8;i++){QRMath.EXP_TABLE[i]=1<<i;}
     for(var i=8;i<256;i++){QRMath.EXP_TABLE[i]=QRMath.EXP_TABLE[i-4]^QRMath.EXP_TABLE[i-5]^QRMath.EXP_TABLE[i-6]^QRMath.EXP_TABLE[i-8];}
     for(var i=0;i<255;i++){QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]]=i;}
     function QRPolynomial(num,shift){if(num.length==undefined){throw new Error(num.length+"/"+shift);}
     var offset=0;while(offset<num.length&&num[offset]==0){offset++;}
     this.num=new Array(num.length-offset+shift);for(var i=0;i<num.length-offset;i++){this.num[i]=num[i+offset];}}
     QRPolynomial.prototype={get:function(index){return this.num[index];},getLength:function(){return this.num.length;},multiply:function(e){var num=new Array(this.getLength()+e.getLength()-1);for(var i=0;i<this.getLength();i++){for(var j=0;j<e.getLength();j++){num[i+j]^=QRMath.gexp(QRMath.glog(this.get(i))+QRMath.glog(e.get(j)));}}
     return new QRPolynomial(num,0);},mod:function(e){if(this.getLength()-e.getLength()<0){return this;}
     var ratio=QRMath.glog(this.get(0))-QRMath.glog(e.get(0));var num=new Array(this.getLength());for(var i=0;i<this.getLength();i++){num[i]=this.get(i);}
     for(var i=0;i<e.getLength();i++){num[i]^=QRMath.gexp(QRMath.glog(e.get(i))+ratio);}
     return new QRPolynomial(num,0).mod(e);}};function QRRSBlock(totalCount,dataCount){this.totalCount=totalCount;this.dataCount=dataCount;}
     QRRSBlock.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];QRRSBlock.getRSBlocks=function(typeNumber,errorCorrectLevel){var rsBlock=QRRSBlock.getRsBlockTable(typeNumber,errorCorrectLevel);if(rsBlock==undefined){throw new Error("bad rs block @ typeNumber:"+typeNumber+"/errorCorrectLevel:"+errorCorrectLevel);}
     var length=rsBlock.length/3;var list=[];for(var i=0;i<length;i++){var count=rsBlock[i*3+0];var totalCount=rsBlock[i*3+1];var dataCount=rsBlock[i*3+2];for(var j=0;j<count;j++){list.push(new QRRSBlock(totalCount,dataCount));}}
     return list;};QRRSBlock.getRsBlockTable=function(typeNumber,errorCorrectLevel){switch(errorCorrectLevel){case QRErrorCorrectLevel.L:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+0];case QRErrorCorrectLevel.M:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+1];case QRErrorCorrectLevel.Q:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+2];case QRErrorCorrectLevel.H:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+3];default:return undefined;}};function QRBitBuffer(){this.buffer=[];this.length=0;}
     QRBitBuffer.prototype={get:function(index){var bufIndex=Math.floor(index/8);return((this.buffer[bufIndex]>>>(7-index%8))&1)==1;},put:function(num,length){for(var i=0;i<length;i++){this.putBit(((num>>>(length-i-1))&1)==1);}},getLengthInBits:function(){return this.length;},putBit:function(bit){var bufIndex=Math.floor(this.length/8);if(this.buffer.length<=bufIndex){this.buffer.push(0);}
     if(bit){this.buffer[bufIndex]|=(0x80>>>(this.length%8));}
     this.length++;}};var QRCodeLimitLength=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];
     
     function _isSupportCanvas() {
         return typeof CanvasRenderingContext2D != "undefined";
     }
     
     // android 2.x doesn't support Data-URI spec
     function _getAndroid() {
         var android = false;
         var sAgent = navigator.userAgent;
         
         if (/android/i.test(sAgent)) { // android
             android = true;
             var aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);
             
             if (aMat && aMat[1]) {
                 android = parseFloat(aMat[1]);
             }
         }
         
         return android;
     }
     
     var svgDrawer = (function() {
 
         var Drawing = function (el, htOption) {
             this._el = el;
             this._htOption = htOption;
         };
 
         Drawing.prototype.draw = function (oQRCode) {
             var _htOption = this._htOption;
             var _el = this._el;
             var nCount = oQRCode.getModuleCount();
             var nWidth = Math.floor(_htOption.width / nCount);
             var nHeight = Math.floor(_htOption.height / nCount);
 
             this.clear();
 
             function makeSVG(tag, attrs) {
                 var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
                 for (var k in attrs)
                     if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
                 return el;
             }
 
             var svg = makeSVG("svg" , {'viewBox': '0 0 ' + String(nCount) + " " + String(nCount), 'width': '100%', 'height': '100%', 'fill': _htOption.colorLight});
             svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
             _el.appendChild(svg);
 
             svg.appendChild(makeSVG("rect", {"fill": _htOption.colorLight, "width": "100%", "height": "100%"}));
             svg.appendChild(makeSVG("rect", {"fill": _htOption.colorDark, "width": "1", "height": "1", "id": "template"}));
 
             for (var row = 0; row < nCount; row++) {
                 for (var col = 0; col < nCount; col++) {
                     if (oQRCode.isDark(row, col)) {
                         var child = makeSVG("use", {"x": String(row), "y": String(col)});
                         child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template")
                         svg.appendChild(child);
                     }
                 }
             }
         };
         Drawing.prototype.clear = function () {
             while (this._el.hasChildNodes())
                 this._el.removeChild(this._el.lastChild);
         };
         return Drawing;
     })();
 
     var useSVG = document.documentElement.tagName.toLowerCase() === "svg";
 
     // Drawing in DOM by using Table tag
     var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? (function () {
         var Drawing = function (el, htOption) {
             this._el = el;
             this._htOption = htOption;
         };
             
         /**
          * Draw the QRCode
          * 
          * @param {QRCode} oQRCode
          */
         Drawing.prototype.draw = function (oQRCode) {
             var _htOption = this._htOption;
             var _el = this._el;
             var nCount = oQRCode.getModuleCount();
             var nWidth = Math.floor(_htOption.width / nCount);
             var nHeight = Math.floor(_htOption.height / nCount);
             var aHTML = ['<table style="border:0;border-collapse:collapse;">'];
             
             for (var row = 0; row < nCount; row++) {
                 aHTML.push('<tr>');
                 
                 for (var col = 0; col < nCount; col++) {
                     aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
                 }
                 
                 aHTML.push('</tr>');
             }
             
             aHTML.push('</table>');
             _el.innerHTML = aHTML.join('');
             
             // Fix the margin values as real size.
             var elTable = _el.childNodes[0];
             var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
             var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
             
             if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
                 elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";	
             }
         };
         
         /**
          * Clear the QRCode
          */
         Drawing.prototype.clear = function () {
             this._el.innerHTML = '';
         };
         
         return Drawing;
     })() : (function () { // Drawing in Canvas
         function _onMakeImage() {
             this._elImage.src = this._elCanvas.toDataURL("image/png");
             this._elImage.style.display = "block";
             this._elCanvas.style.display = "none";			
         }
         
         // Android 2.1 bug workaround
         // http://code.google.com/p/android/issues/detail?id=5141
         if (this._android && this._android <= 2.1) {
             var factor = 1 / window.devicePixelRatio;
             var drawImage = CanvasRenderingContext2D.prototype.drawImage; 
             CanvasRenderingContext2D.prototype.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
                 if (("nodeName" in image) && /img/i.test(image.nodeName)) {
                     for (var i = arguments.length - 1; i >= 1; i--) {
                         arguments[i] = arguments[i] * factor;
                     }
                 } else if (typeof dw == "undefined") {
                     arguments[1] *= factor;
                     arguments[2] *= factor;
                     arguments[3] *= factor;
                     arguments[4] *= factor;
                 }
                 
                 drawImage.apply(this, arguments); 
             };
         }
         
         /**
          * Check whether the user's browser supports Data URI or not
          * 
          * @private
          * @param {Function} fSuccess Occurs if it supports Data URI
          * @param {Function} fFail Occurs if it doesn't support Data URI
          */
         function _safeSetDataURI(fSuccess, fFail) {
             var self = this;
             self._fFail = fFail;
             self._fSuccess = fSuccess;
 
             // Check it just once
             if (self._bSupportDataURI === null) {
                 var el = document.createElement("img");
                 var fOnError = function() {
                     self._bSupportDataURI = false;
 
                     if (self._fFail) {
                         self._fFail.call(self);
                     }
                 };
                 var fOnSuccess = function() {
                     self._bSupportDataURI = true;
 
                     if (self._fSuccess) {
                         self._fSuccess.call(self);
                     }
                 };
 
                 el.onabort = fOnError;
                 el.onerror = fOnError;
                 el.onload = fOnSuccess;
                 el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // the Image contains 1px data.
                 return;
             } else if (self._bSupportDataURI === true && self._fSuccess) {
                 self._fSuccess.call(self);
             } else if (self._bSupportDataURI === false && self._fFail) {
                 self._fFail.call(self);
             }
         };
         
         /**
          * Drawing QRCode by using canvas
          * 
          * @constructor
          * @param {HTMLElement} el
          * @param {Object} htOption QRCode Options 
          */
         var Drawing = function (el, htOption) {
             this._bIsPainted = false;
             this._android = _getAndroid();
         
             this._htOption = htOption;
             this._elCanvas = document.createElement("canvas");
             this._elCanvas.width = htOption.width;
             this._elCanvas.height = htOption.height;
             el.appendChild(this._elCanvas);
             this._el = el;
             this._oContext = this._elCanvas.getContext("2d");
             this._bIsPainted = false;
             this._elImage = document.createElement("img");
             this._elImage.alt = "Scan me!";
             this._elImage.style.display = "none";
             this._el.appendChild(this._elImage);
             this._bSupportDataURI = null;
         };
             
         /**
          * Draw the QRCode
          * 
          * @param {QRCode} oQRCode 
          */
         Drawing.prototype.draw = function (oQRCode) {
             var _elImage = this._elImage;
             var _oContext = this._oContext;
             var _htOption = this._htOption;
             
             var nCount = oQRCode.getModuleCount();
             var nWidth = _htOption.width / nCount;
             var nHeight = _htOption.height / nCount;
             var nRoundedWidth = Math.round(nWidth);
             var nRoundedHeight = Math.round(nHeight);
 
             _elImage.style.display = "none";
             this.clear();
             
             for (var row = 0; row < nCount; row++) {
                 for (var col = 0; col < nCount; col++) {
                     var bIsDark = oQRCode.isDark(row, col);
                     var nLeft = col * nWidth;
                     var nTop = row * nHeight;
                     _oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
                     _oContext.lineWidth = 1;
                     _oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;					
                     _oContext.fillRect(nLeft, nTop, nWidth, nHeight);
                     
                     // 안티 앨리어싱 방지 처리
                     _oContext.strokeRect(
                         Math.floor(nLeft) + 0.5,
                         Math.floor(nTop) + 0.5,
                         nRoundedWidth,
                         nRoundedHeight
                     );
                     
                     _oContext.strokeRect(
                         Math.ceil(nLeft) - 0.5,
                         Math.ceil(nTop) - 0.5,
                         nRoundedWidth,
                         nRoundedHeight
                     );
                 }
             }
             
             this._bIsPainted = true;
         };
             
         /**
          * Make the image from Canvas if the browser supports Data URI.
          */
         Drawing.prototype.makeImage = function () {
             if (this._bIsPainted) {
                 _safeSetDataURI.call(this, _onMakeImage);
             }
         };
             
         /**
          * Return whether the QRCode is painted or not
          * 
          * @return {Boolean}
          */
         Drawing.prototype.isPainted = function () {
             return this._bIsPainted;
         };
         
         /**
          * Clear the QRCode
          */
         Drawing.prototype.clear = function () {
             this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
             this._bIsPainted = false;
         };
         
         /**
          * @private
          * @param {Number} nNumber
          */
         Drawing.prototype.round = function (nNumber) {
             if (!nNumber) {
                 return nNumber;
             }
             
             return Math.floor(nNumber * 1000) / 1000;
         };
         
         return Drawing;
     })();
     
     /**
      * Get the type by string length
      * 
      * @private
      * @param {String} sText
      * @param {Number} nCorrectLevel
      * @return {Number} type
      */
     function _getTypeNumber(sText, nCorrectLevel) {			
         var nType = 1;
         var length = _getUTF8Length(sText);
         
         for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
             var nLimit = 0;
             
             switch (nCorrectLevel) {
                 case QRErrorCorrectLevel.L :
                     nLimit = QRCodeLimitLength[i][0];
                     break;
                 case QRErrorCorrectLevel.M :
                     nLimit = QRCodeLimitLength[i][1];
                     break;
                 case QRErrorCorrectLevel.Q :
                     nLimit = QRCodeLimitLength[i][2];
                     break;
                 case QRErrorCorrectLevel.H :
                     nLimit = QRCodeLimitLength[i][3];
                     break;
             }
             
             if (length <= nLimit) {
                 break;
             } else {
                 nType++;
             }
         }
         
         if (nType > QRCodeLimitLength.length) {
             throw new Error("Too long data");
         }
         
         return nType;
     }
 
     function _getUTF8Length(sText) {
         var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
         return replacedText.length + (replacedText.length != sText ? 3 : 0);
     }
     
     /**
      * @class QRCode
      * @constructor
      * @example 
      * new QRCode(document.getElementById("test"), "http://jindo.dev.naver.com/collie");
      *
      * @example
      * var oQRCode = new QRCode("test", {
      *    text : "http://naver.com",
      *    width : 128,
      *    height : 128
      * });
      * 
      * oQRCode.clear(); // Clear the QRCode.
      * oQRCode.makeCode("http://map.naver.com"); // Re-create the QRCode.
      *
      * @param {HTMLElement|String} el target element or 'id' attribute of element.
      * @param {Object|String} vOption
      * @param {String} vOption.text QRCode link data
      * @param {Number} [vOption.width=256]
      * @param {Number} [vOption.height=256]
      * @param {String} [vOption.colorDark="#000000"]
      * @param {String} [vOption.colorLight="#ffffff"]
      * @param {QRCode.CorrectLevel} [vOption.correctLevel=QRCode.CorrectLevel.H] [L|M|Q|H] 
      */
     QRCode = function (el, vOption) {
         this._htOption = {
             width : 256, 
             height : 256,
             typeNumber : 4,
             colorDark : "#000000",
             colorLight : "#ffffff",
             correctLevel : QRErrorCorrectLevel.H
         };
         
         if (typeof vOption === 'string') {
             vOption	= {
                 text : vOption
             };
         }
         
         // Overwrites options
         if (vOption) {
             for (var i in vOption) {
                 this._htOption[i] = vOption[i];
             }
         }
         
         if (typeof el == "string") {
             el = document.getElementById(el);
         }
 
         if (this._htOption.useSVG) {
             Drawing = svgDrawer;
         }
         
         this._android = _getAndroid();
         this._el = el;
         this._oQRCode = null;
         this._oDrawing = new Drawing(this._el, this._htOption);
         
         if (this._htOption.text) {
             this.makeCode(this._htOption.text);	
         }
     };
     
     /**
      * Make the QRCode
      * 
      * @param {String} sText link data
      */
     QRCode.prototype.makeCode = function (sText) {
         this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
         this._oQRCode.addData(sText);
         this._oQRCode.make();
         this._el.title = sText;
         this._oDrawing.draw(this._oQRCode);			
         this.makeImage();
     };
     
     /**
      * Make the Image from Canvas element
      * - It occurs automatically
      * - Android below 3 doesn't support Data-URI spec.
      * 
      * @private
      */
     QRCode.prototype.makeImage = function () {
         if (typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3)) {
             this._oDrawing.makeImage();
         }
     };
     
     /**
      * Clear the QRCode
      */
     QRCode.prototype.clear = function () {
         this._oDrawing.clear();
     };
     
     /**
      * @name QRCode.CorrectLevel
      */
     QRCode.CorrectLevel = QRErrorCorrectLevel;
 })();

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
/** @preserve
(c) 2012 by Cédric Mesnil. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Constants table
var zl = [
    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
    7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
    3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
    1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
    4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13];
var zr = [
    5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
    6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
    15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
    8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
    12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11];
var sl = [
     11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
    7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
    11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
      11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
    9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ];
var sr = [
    8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
    9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
    9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
    15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
    8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ];

var hl =  [ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
var hr =  [ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];

var bytesToWords = function (bytes) {
  var words = [];
  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
    words[b >>> 5] |= bytes[i] << (24 - b % 32);
  }
  return words;
};

var wordsToBytes = function (words) {
  var bytes = [];
  for (var b = 0; b < words.length * 32; b += 8) {
    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
  }
  return bytes;
};

var processBlock = function (H, M, offset) {

  // Swap endian
  for (var i = 0; i < 16; i++) {
    var offset_i = offset + i;
    var M_offset_i = M[offset_i];

    // Swap
    M[offset_i] = (
        (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
        (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
    );
  }

  // Working variables
  var al, bl, cl, dl, el;
  var ar, br, cr, dr, er;

  ar = al = H[0];
  br = bl = H[1];
  cr = cl = H[2];
  dr = dl = H[3];
  er = el = H[4];
  // Computation
  var t;
  for (var i = 0; i < 80; i += 1) {
    t = (al +  M[offset+zl[i]])|0;
    if (i<16){
        t +=  f1(bl,cl,dl) + hl[0];
    } else if (i<32) {
        t +=  f2(bl,cl,dl) + hl[1];
    } else if (i<48) {
        t +=  f3(bl,cl,dl) + hl[2];
    } else if (i<64) {
        t +=  f4(bl,cl,dl) + hl[3];
    } else {// if (i<80) {
        t +=  f5(bl,cl,dl) + hl[4];
    }
    t = t|0;
    t =  rotl(t,sl[i]);
    t = (t+el)|0;
    al = el;
    el = dl;
    dl = rotl(cl, 10);
    cl = bl;
    bl = t;

    t = (ar + M[offset+zr[i]])|0;
    if (i<16){
        t +=  f5(br,cr,dr) + hr[0];
    } else if (i<32) {
        t +=  f4(br,cr,dr) + hr[1];
    } else if (i<48) {
        t +=  f3(br,cr,dr) + hr[2];
    } else if (i<64) {
        t +=  f2(br,cr,dr) + hr[3];
    } else {// if (i<80) {
        t +=  f1(br,cr,dr) + hr[4];
    }
    t = t|0;
    t =  rotl(t,sr[i]) ;
    t = (t+er)|0;
    ar = er;
    er = dr;
    dr = rotl(cr, 10);
    cr = br;
    br = t;
  }
  // Intermediate hash value
  t    = (H[1] + cl + dr)|0;
  H[1] = (H[2] + dl + er)|0;
  H[2] = (H[3] + el + ar)|0;
  H[3] = (H[4] + al + br)|0;
  H[4] = (H[0] + bl + cr)|0;
  H[0] =  t;
};

function f1(x, y, z) {
  return ((x) ^ (y) ^ (z));
}

function f2(x, y, z) {
  return (((x)&(y)) | ((~x)&(z)));
}

function f3(x, y, z) {
  return (((x) | (~(y))) ^ (z));
}

function f4(x, y, z) {
  return (((x) & (z)) | ((y)&(~(z))));
}

function f5(x, y, z) {
  return ((x) ^ ((y) |(~(z))));
}

function rotl(x,n) {
  return (x<<n) | (x>>>(32-n));
}

function ripemd160(message) {
  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];

  var m = bytesToWords(message);

  var nBitsLeft = message.length * 8;
  var nBitsTotal = message.length * 8;

  // Add padding
  m[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
  m[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
      (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
      (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
  );

  for (var i=0 ; i<m.length; i += 16) {
    processBlock(H, m, i);
  }

  // Swap endian
  for (var i = 0; i < 5; i++) {
      // Shortcut
    var H_i = H[i];

    // Swap
    H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
          (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
  }

  var digestbytes = wordsToBytes(H);
  return digestbytes;
}



(function() {/*
    A JavaScript implementation of the SHA family of hashes, as defined in FIPS
    PUB 180-2 as well as the corresponding HMAC implementation as defined in
    FIPS PUB 198a
   
    Copyright Brian Turek 2008-2012
    Distributed under the BSD License
    See http://caligatio.github.com/jsSHA/ for more information
   
    Several functions taken from Paul Johnson
   */
   function n(a){throw a;}var q=null;function s(a,b){this.a=a;this.b=b}function u(a,b){var d=[],h=(1<<b)-1,f=a.length*b,g;for(g=0;g<f;g+=b)d[g>>>5]|=(a.charCodeAt(g/b)&h)<<32-b-g%32;return{value:d,binLen:f}}function x(a){var b=[],d=a.length,h,f;0!==d%2&&n("String of HEX type must be in byte increments");for(h=0;h<d;h+=2)f=parseInt(a.substr(h,2),16),isNaN(f)&&n("String of HEX type contains invalid characters"),b[h>>>3]|=f<<24-4*(h%8);return{value:b,binLen:4*d}}
   function B(a){var b=[],d=0,h,f,g,k,m;-1===a.search(/^[a-zA-Z0-9=+\/]+$/)&&n("Invalid character in base-64 string");h=a.indexOf("=");a=a.replace(/\=/g,"");-1!==h&&h<a.length&&n("Invalid '=' found in base-64 string");for(f=0;f<a.length;f+=4){m=a.substr(f,4);for(g=k=0;g<m.length;g+=1)h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(m[g]),k|=h<<18-6*g;for(g=0;g<m.length-1;g+=1)b[d>>2]|=(k>>>16-8*g&255)<<24-8*(d%4),d+=1}return{value:b,binLen:8*d}}
   function E(a,b){var d="",h=4*a.length,f,g;for(f=0;f<h;f+=1)g=a[f>>>2]>>>8*(3-f%4),d+="0123456789abcdef".charAt(g>>>4&15)+"0123456789abcdef".charAt(g&15);return b.outputUpper?d.toUpperCase():d}
   function F(a,b){var d="",h=4*a.length,f,g,k;for(f=0;f<h;f+=3){k=(a[f>>>2]>>>8*(3-f%4)&255)<<16|(a[f+1>>>2]>>>8*(3-(f+1)%4)&255)<<8|a[f+2>>>2]>>>8*(3-(f+2)%4)&255;for(g=0;4>g;g+=1)d=8*f+6*g<=32*a.length?d+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(k>>>6*(3-g)&63):d+b.b64Pad}return d}
   function G(a){var b={outputUpper:!1,b64Pad:"="};try{a.hasOwnProperty("outputUpper")&&(b.outputUpper=a.outputUpper),a.hasOwnProperty("b64Pad")&&(b.b64Pad=a.b64Pad)}catch(d){}"boolean"!==typeof b.outputUpper&&n("Invalid outputUpper formatting option");"string"!==typeof b.b64Pad&&n("Invalid b64Pad formatting option");return b}
   function H(a,b){var d=q,d=new s(a.a,a.b);return d=32>=b?new s(d.a>>>b|d.b<<32-b&4294967295,d.b>>>b|d.a<<32-b&4294967295):new s(d.b>>>b-32|d.a<<64-b&4294967295,d.a>>>b-32|d.b<<64-b&4294967295)}function I(a,b){var d=q;return d=32>=b?new s(a.a>>>b,a.b>>>b|a.a<<32-b&4294967295):new s(0,a.a>>>b-32)}function J(a,b,d){return new s(a.a&b.a^~a.a&d.a,a.b&b.b^~a.b&d.b)}function U(a,b,d){return new s(a.a&b.a^a.a&d.a^b.a&d.a,a.b&b.b^a.b&d.b^b.b&d.b)}
   function V(a){var b=H(a,28),d=H(a,34);a=H(a,39);return new s(b.a^d.a^a.a,b.b^d.b^a.b)}function W(a){var b=H(a,14),d=H(a,18);a=H(a,41);return new s(b.a^d.a^a.a,b.b^d.b^a.b)}function X(a){var b=H(a,1),d=H(a,8);a=I(a,7);return new s(b.a^d.a^a.a,b.b^d.b^a.b)}function Y(a){var b=H(a,19),d=H(a,61);a=I(a,6);return new s(b.a^d.a^a.a,b.b^d.b^a.b)}
   function Z(a,b){var d,h,f;d=(a.b&65535)+(b.b&65535);h=(a.b>>>16)+(b.b>>>16)+(d>>>16);f=(h&65535)<<16|d&65535;d=(a.a&65535)+(b.a&65535)+(h>>>16);h=(a.a>>>16)+(b.a>>>16)+(d>>>16);return new s((h&65535)<<16|d&65535,f)}
   function aa(a,b,d,h){var f,g,k;f=(a.b&65535)+(b.b&65535)+(d.b&65535)+(h.b&65535);g=(a.b>>>16)+(b.b>>>16)+(d.b>>>16)+(h.b>>>16)+(f>>>16);k=(g&65535)<<16|f&65535;f=(a.a&65535)+(b.a&65535)+(d.a&65535)+(h.a&65535)+(g>>>16);g=(a.a>>>16)+(b.a>>>16)+(d.a>>>16)+(h.a>>>16)+(f>>>16);return new s((g&65535)<<16|f&65535,k)}
   function ba(a,b,d,h,f){var g,k,m;g=(a.b&65535)+(b.b&65535)+(d.b&65535)+(h.b&65535)+(f.b&65535);k=(a.b>>>16)+(b.b>>>16)+(d.b>>>16)+(h.b>>>16)+(f.b>>>16)+(g>>>16);m=(k&65535)<<16|g&65535;g=(a.a&65535)+(b.a&65535)+(d.a&65535)+(h.a&65535)+(f.a&65535)+(k>>>16);k=(a.a>>>16)+(b.a>>>16)+(d.a>>>16)+(h.a>>>16)+(f.a>>>16)+(g>>>16);return new s((k&65535)<<16|g&65535,m)}
   function $(a,b,d){var h,f,g,k,m,j,A,C,K,e,L,v,l,M,t,p,y,z,r,N,O,P,Q,R,c,S,w=[],T,D;"SHA-384"===d||"SHA-512"===d?(L=80,h=(b+128>>>10<<5)+31,M=32,t=2,c=s,p=Z,y=aa,z=ba,r=X,N=Y,O=V,P=W,R=U,Q=J,S=[new c(1116352408,3609767458),new c(1899447441,602891725),new c(3049323471,3964484399),new c(3921009573,2173295548),new c(961987163,4081628472),new c(1508970993,3053834265),new c(2453635748,2937671579),new c(2870763221,3664609560),new c(3624381080,2734883394),new c(310598401,1164996542),new c(607225278,1323610764),
   new c(1426881987,3590304994),new c(1925078388,4068182383),new c(2162078206,991336113),new c(2614888103,633803317),new c(3248222580,3479774868),new c(3835390401,2666613458),new c(4022224774,944711139),new c(264347078,2341262773),new c(604807628,2007800933),new c(770255983,1495990901),new c(1249150122,1856431235),new c(1555081692,3175218132),new c(1996064986,2198950837),new c(2554220882,3999719339),new c(2821834349,766784016),new c(2952996808,2566594879),new c(3210313671,3203337956),new c(3336571891,
   1034457026),new c(3584528711,2466948901),new c(113926993,3758326383),new c(338241895,168717936),new c(666307205,1188179964),new c(773529912,1546045734),new c(1294757372,1522805485),new c(1396182291,2643833823),new c(1695183700,2343527390),new c(1986661051,1014477480),new c(2177026350,1206759142),new c(2456956037,344077627),new c(2730485921,1290863460),new c(2820302411,3158454273),new c(3259730800,3505952657),new c(3345764771,106217008),new c(3516065817,3606008344),new c(3600352804,1432725776),new c(4094571909,
   1467031594),new c(275423344,851169720),new c(430227734,3100823752),new c(506948616,1363258195),new c(659060556,3750685593),new c(883997877,3785050280),new c(958139571,3318307427),new c(1322822218,3812723403),new c(1537002063,2003034995),new c(1747873779,3602036899),new c(1955562222,1575990012),new c(2024104815,1125592928),new c(2227730452,2716904306),new c(2361852424,442776044),new c(2428436474,593698344),new c(2756734187,3733110249),new c(3204031479,2999351573),new c(3329325298,3815920427),new c(3391569614,
   3928383900),new c(3515267271,566280711),new c(3940187606,3454069534),new c(4118630271,4000239992),new c(116418474,1914138554),new c(174292421,2731055270),new c(289380356,3203993006),new c(460393269,320620315),new c(685471733,587496836),new c(852142971,1086792851),new c(1017036298,365543100),new c(1126000580,2618297676),new c(1288033470,3409855158),new c(1501505948,4234509866),new c(1607167915,987167468),new c(1816402316,1246189591)],e="SHA-384"===d?[new c(3418070365,3238371032),new c(1654270250,914150663),
   new c(2438529370,812702999),new c(355462360,4144912697),new c(1731405415,4290775857),new c(41048885895,1750603025),new c(3675008525,1694076839),new c(1203062813,3204075428)]:[new c(1779033703,4089235720),new c(3144134277,2227873595),new c(1013904242,4271175723),new c(2773480762,1595750129),new c(1359893119,2917565137),new c(2600822924,725511199),new c(528734635,4215389547),new c(1541459225,327033209)]):n("Unexpected error in SHA-2 implementation");a[b>>>5]|=128<<24-b%32;a[h]=b;T=a.length;for(v=0;v<
   T;v+=M){b=e[0];h=e[1];f=e[2];g=e[3];k=e[4];m=e[5];j=e[6];A=e[7];for(l=0;l<L;l+=1)w[l]=16>l?new c(a[l*t+v],a[l*t+v+1]):y(N(w[l-2]),w[l-7],r(w[l-15]),w[l-16]),C=z(A,P(k),Q(k,m,j),S[l],w[l]),K=p(O(b),R(b,h,f)),A=j,j=m,m=k,k=p(g,C),g=f,f=h,h=b,b=p(C,K);e[0]=p(b,e[0]);e[1]=p(h,e[1]);e[2]=p(f,e[2]);e[3]=p(g,e[3]);e[4]=p(k,e[4]);e[5]=p(m,e[5]);e[6]=p(j,e[6]);e[7]=p(A,e[7])}"SHA-384"===d?D=[e[0].a,e[0].b,e[1].a,e[1].b,e[2].a,e[2].b,e[3].a,e[3].b,e[4].a,e[4].b,e[5].a,e[5].b]:"SHA-512"===d?D=[e[0].a,e[0].b,
   e[1].a,e[1].b,e[2].a,e[2].b,e[3].a,e[3].b,e[4].a,e[4].b,e[5].a,e[5].b,e[6].a,e[6].b,e[7].a,e[7].b]:n("Unexpected error in SHA-2 implementation");return D}
   window.jsSHA=function(a,b,d){var h=q,f=q,g=0,k=[0],m=0,j=q,m="undefined"!==typeof d?d:8;8===m||16===m||n("charSize must be 8 or 16");"HEX"===b?(0!==a.length%2&&n("srcString of HEX type must be in byte increments"),j=x(a),g=j.binLen,k=j.value):"ASCII"===b||"TEXT"===b?(j=u(a,m),g=j.binLen,k=j.value):"B64"===b?(j=B(a),g=j.binLen,k=j.value):n("inputFormat must be HEX, TEXT, ASCII, or B64");this.getHash=function(a,b,d){var e=q,m=k.slice(),j="";switch(b){case "HEX":e=E;break;case "B64":e=F;break;default:n("format must be HEX or B64")}"SHA-384"===
   a?(q===h&&(h=$(m,g,a)),j=e(h,G(d))):"SHA-512"===a?(q===f&&(f=$(m,g,a)),j=e(f,G(d))):n("Chosen SHA variant is not supported");return j};this.getHMAC=function(a,b,d,e,f){var h,l,j,t,p,y=[],z=[],r=q;switch(e){case "HEX":h=E;break;case "B64":h=F;break;default:n("outputFormat must be HEX or B64")}"SHA-384"===d?(j=128,p=384):"SHA-512"===d?(j=128,p=512):n("Chosen SHA variant is not supported");"HEX"===b?(r=x(a),t=r.binLen,l=r.value):"ASCII"===b||"TEXT"===b?(r=u(a,m),t=r.binLen,l=r.value):"B64"===b?(r=B(a),
   t=r.binLen,l=r.value):n("inputFormat must be HEX, TEXT, ASCII, or B64");a=8*j;b=j/4-1;j<t/8?(l=$(l,t,d),l[b]&=4294967040):j>t/8&&(l[b]&=4294967040);for(j=0;j<=b;j+=1)y[j]=l[j]^909522486,z[j]=l[j]^1549556828;d=$(z.concat($(y.concat(k),a+g,d)),a+p,d);return h(d,G(f))}};})();

   
   ;(function(){

    /* UNBUILD */
    function USE(arg, req){
      return req? require(arg) : arg.slice? USE[R(arg)] : function(mod, path){
        arg(mod = {exports: {}});
        USE[R(path)] = mod.exports;
      }
      function R(p){
        return p.split('/').slice(-1).toString().replace('.js','');
      }
    }
    if(typeof module !== "undefined"){ var MODULE = module }
    /* UNBUILD */
  
      ;USE(function(module){
          // Generic javascript utilities.
          var Type = {};
          //Type.fns = Type.fn = {is: function(fn){ return (!!fn && fn instanceof Function) }}
          Type.fn = {is: function(fn){ return (!!fn && 'function' == typeof fn) }}
          Type.bi = {is: function(b){ return (b instanceof Boolean || typeof b == 'boolean') }}
          Type.num = {is: function(n){ return !list_is(n) && ((n - parseFloat(n) + 1) >= 0 || Infinity === n || -Infinity === n) }}
          Type.text = {is: function(t){ return (typeof t == 'string') }}
          Type.text.ify = function(t){
              if(Type.text.is(t)){ return t }
              if(typeof JSON !== "undefined"){ return JSON.stringify(t) }
              return (t && t.toString)? t.toString() : t;
          }
          Type.text.random = function(l, c){
              var s = '';
              l = l || 24; // you are not going to make a 0 length random number, so no need to check type
              c = c || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz';
              while(l > 0){ s += c.charAt(Math.floor(Math.random() * c.length)); l-- }
              return s;
          }
          Type.text.match = function(t, o){ var tmp, u;
              if('string' !== typeof t){ return false }
              if('string' == typeof o){ o = {'=': o} }
              o = o || {};
              tmp = (o['='] || o['*'] || o['>'] || o['<']);
              if(t === tmp){ return true }
              if(u !== o['=']){ return false }
              tmp = (o['*'] || o['>'] || o['<']);
              if(t.slice(0, (tmp||'').length) === tmp){ return true }
              if(u !== o['*']){ return false }
              if(u !== o['>'] && u !== o['<']){
                  return (t >= o['>'] && t <= o['<'])? true : false;
              }
              if(u !== o['>'] && t >= o['>']){ return true }
              if(u !== o['<'] && t <= o['<']){ return true }
              return false;
          }
          Type.text.hash = function(s, c){ // via SO
              if(typeof s !== 'string'){ return }
          c = c || 0;
          if(!s.length){ return c }
          for(var i=0,l=s.length,n; i<l; ++i){
            n = s.charCodeAt(i);
            c = ((c<<5)-c)+n;
            c |= 0;
          }
          return c;
        }
          Type.list = {is: function(l){ return (l instanceof Array) }}
          Type.list.slit = Array.prototype.slice;
          Type.list.sort = function(k){ // creates a new sort function based off some key
              return function(A,B){
                  if(!A || !B){ return 0 } A = A[k]; B = B[k];
                  if(A < B){ return -1 }else if(A > B){ return 1 }
                  else { return 0 }
              }
          }
          Type.list.map = function(l, c, _){ return obj_map(l, c, _) }
          Type.list.index = 1; // change this to 0 if you want non-logical, non-mathematical, non-matrix, non-convenient array notation
          Type.obj = {is: function(o){ return o? (o instanceof Object && o.constructor === Object) || Object.prototype.toString.call(o).match(/^\[object (\w+)\]$/)[1] === 'Object' : false }}
          Type.obj.put = function(o, k, v){ return (o||{})[k] = v, o }
          Type.obj.has = function(o, k){ return o && Object.prototype.hasOwnProperty.call(o, k) }
          Type.obj.del = function(o, k){
              if(!o){ return }
              o[k] = null;
              delete o[k];
              return o;
          }
          Type.obj.as = function(o, k, v, u){ return o[k] = o[k] || (u === v? {} : v) }
          Type.obj.ify = function(o){
              if(obj_is(o)){ return o }
              try{o = JSON.parse(o);
              }catch(e){o={}};
              return o;
          }
          ;(function(){ var u;
              function map(v,k){
                  if(obj_has(this,k) && u !== this[k]){ return }
                  this[k] = v;
              }
              Type.obj.to = function(from, to){
                  to = to || {};
                  obj_map(from, map, to);
                  return to;
              }
          }());
          Type.obj.copy = function(o){ // because http://web.archive.org/web/20140328224025/http://jsperf.com/cloning-an-object/2
              return !o? o : JSON.parse(JSON.stringify(o)); // is shockingly faster than anything else, and our data has to be a subset of JSON anyways!
          }
          ;(function(){
              function empty(v,i){ var n = this.n, u;
                  if(n && (i === n || (obj_is(n) && obj_has(n, i)))){ return }
                  if(u !== i){ return true }
              }
              Type.obj.empty = function(o, n){
                  if(!o){ return true }
                  return obj_map(o,empty,{n:n})? false : true;
              }
          }());
          ;(function(){
              function t(k,v){
                  if(2 === arguments.length){
                      t.r = t.r || {};
                      t.r[k] = v;
                      return;
                  } t.r = t.r || [];
                  t.r.push(k);
              };
              var keys = Object.keys, map, u;
              Object.keys = Object.keys || function(o){ return map(o, function(v,k,t){t(k)}) }
              Type.obj.map = map = function(l, c, _){
                  var u, i = 0, x, r, ll, lle, f = 'function' == typeof c;
                  t.r = u;
                  if(keys && obj_is(l)){
                      ll = keys(l); lle = true;
                  }
                  _ = _ || {};
                  if(list_is(l) || ll){
                      x = (ll || l).length;
                      for(;i < x; i++){
                          var ii = (i + Type.list.index);
                          if(f){
                              r = lle? c.call(_, l[ll[i]], ll[i], t) : c.call(_, l[i], ii, t);
                              if(r !== u){ return r }
                          } else {
                              //if(Type.test.is(c,l[i])){ return ii } // should implement deep equality testing!
                              if(c === l[lle? ll[i] : i]){ return ll? ll[i] : ii } // use this for now
                          }
                      }
                  } else {
                      for(i in l){
                          if(f){
                              if(obj_has(l,i)){
                                  r = _? c.call(_, l[i], i, t) : c(l[i], i, t);
                                  if(r !== u){ return r }
                              }
                          } else {
                              //if(a.test.is(c,l[i])){ return i } // should implement deep equality testing!
                              if(c === l[i]){ return i } // use this for now
                          }
                      }
                  }
                  return f? t.r : Type.list.index? 0 : -1;
              }
          }());
          Type.time = {};
          Type.time.is = function(t){ return t? t instanceof Date : (+new Date().getTime()) }
  
          var fn_is = Type.fn.is;
          var list_is = Type.list.is;
          var obj = Type.obj, obj_is = obj.is, obj_has = obj.has, obj_map = obj.map;
          module.exports = Type;
      })(USE, './type');
  
      ;USE(function(module){
          // On event emitter generic javascript utility.
          module.exports = function onto(tag, arg, as){
              if(!tag){ return {to: onto} }
              var u, tag = (this.tag || (this.tag = {}))[tag] ||
              (this.tag[tag] = {tag: tag, to: onto._ = {
                  next: function(arg){ var tmp;
                      if((tmp = this.to)){
                          tmp.next(arg);
                  }}
              }});
              if('function' == typeof arg){
                  var be = {
                      off: onto.off ||
                      (onto.off = function(){
                          if(this.next === onto._.next){ return !0 }
                          if(this === this.the.last){
                              this.the.last = this.back;
                          }
                          this.to.back = this.back;
                          this.next = onto._.next;
                          this.back.to = this.to;
                          if(this.the.last === this.the){
                              delete this.on.tag[this.the.tag];
                          }
                      }),
                      to: onto._,
                      next: arg,
                      the: tag,
                      on: this,
                      as: as,
                  };
                  (be.back = tag.last || tag).to = be;
                  return tag.last = be;
              }
              if((tag = tag.to) && u !== arg){ tag.next(arg) }
              return tag;
          };
      })(USE, './onto');
  
      ;USE(function(module){
          var to = (typeof setImmediate !== "undefined")? setImmediate : setTimeout, puff = function(cb){
              if(Q.length){ Q.push(cb); return } Q = [cb];
              to(function go(S){ S = S || +new Date;
                  var i = 0, cb; while(i < 9 && (cb = Q[i++])){ cb() }
                  console.STAT && console.STAT(S, +new Date - S, 'puff');
                  if(cb && !(+new Date - S)){ return go(S) }
                  if(!(Q = Q.slice(i)).length){ return }
                  to(go, 0);
              }, 0);
          }, Q = [];
          module.exports = setTimeout.puff = puff;
      })(USE, './puff');
  
      ;USE(function(module){
          /* Based on the Hypothetical Amnesia Machine thought experiment */
          function HAM(machineState, incomingState, currentState, incomingValue, currentValue){
              if(machineState < incomingState){
                  return {defer: true}; // the incoming value is outside the boundary of the machine's state, it must be reprocessed in another state.
              }
              if(incomingState < currentState){
                  return {historical: true}; // the incoming value is within the boundary of the machine's state, but not within the range.
  
              }
              if(currentState < incomingState){
                  return {converge: true, incoming: true}; // the incoming value is within both the boundary and the range of the machine's state.
  
              }
              if(incomingState === currentState){
                  incomingValue = Lexical(incomingValue) || "";
                  currentValue = Lexical(currentValue) || "";
                  if(incomingValue === currentValue){ // Note: while these are practically the same, the deltas could be technically different
                      return {state: true};
                  }
                  /*
                      The following is a naive implementation, but will always work.
                      Never change it unless you have specific needs that absolutely require it.
                      If changed, your data will diverge unless you guarantee every peer's algorithm has also been changed to be the same.
                      As a result, it is highly discouraged to modify despite the fact that it is naive,
                      because convergence (data integrity) is generally more important.
                      Any difference in this algorithm must be given a new and different name.
                  */
                  if(incomingValue < currentValue){ // Lexical only works on simple value types!
                      return {converge: true, current: true};
                  }
                  if(currentValue < incomingValue){ // Lexical only works on simple value types!
                      return {converge: true, incoming: true};
                  }
              }
              return {err: "Invalid CRDT Data: "+ incomingValue +" to "+ currentValue +" at "+ incomingState +" to "+ currentState +"!"};
          }
          if(typeof JSON === 'undefined'){
              throw new Error(
                  'JSON is not included in this browser. Please load it first: ' +
                  'ajax.cdnjs.com/ajax/libs/json2/20110223/json2.js'
              );
          }
          var Lexical = JSON.stringify, undefined;
          module.exports = HAM;
      })(USE, './HAM');
  
      ;USE(function(module){
          var Type = USE('./type');
          var Val = {};
          Val.is = function(v){ // Valid values are a subset of JSON: null, binary, number (!Infinity), text, or a soul relation. Arrays need special algorithms to handle concurrency, so they are not supported directly. Use an extension that supports them if needed but research their problems first.
              if(v === u){ return false }
              if(v === null){ return true } // "deletes", nulling out keys.
              if(v === Infinity){ return false } // we want this to be, but JSON does not support it, sad face.
              if(text_is(v) // by "text" we mean strings.
              || bi_is(v) // by "binary" we mean boolean.
              || num_is(v)){ // by "number" we mean integers or decimals.
                  return true; // simple values are valid.
              }
              return Val.link.is(v) || false; // is the value a soul relation? Then it is valid and return it. If not, everything else remaining is an invalid data type. Custom extensions can be built on top of these primitives to support other types.
          }
          Val.link = Val.rel = {_: '#'};
          ;(function(){
              Val.link.is = function(v){ // this defines whether an object is a soul relation or not, they look like this: {'#': 'UUID'}
                  if(v && v[rel_] && !v._ && obj_is(v)){ // must be an object.
                      var o = {};
                      obj_map(v, map, o);
                      if(o.id){ // a valid id was found.
                          return o.id; // yay! Return it.
                      }
                  }
                  return false; // the value was not a valid soul relation.
              }
              function map(s, k){ var o = this; // map over the object...
                  if(o.id){ return o.id = false } // if ID is already defined AND we're still looping through the object, it is considered invalid.
                  if(k == rel_ && text_is(s)){ // the key should be '#' and have a text value.
                      o.id = s; // we found the soul!
                  } else {
                      return o.id = false; // if there exists anything else on the object that isn't the soul, then it is considered invalid.
                  }
              }
          }());
          Val.link.ify = function(t){ return obj_put({}, rel_, t) } // convert a soul into a relation and return it.
          Type.obj.has._ = '.';
          var rel_ = Val.link._, u;
          var bi_is = Type.bi.is;
          var num_is = Type.num.is;
          var text_is = Type.text.is;
          var obj = Type.obj, obj_is = obj.is, obj_put = obj.put, obj_map = obj.map;
          module.exports = Val;
      })(USE, './val');
  
      ;USE(function(module){
          var Type = USE('./type');
          var Val = USE('./val');
          var Node = {_: '_'};
          Node.soul = function(n, o){ return (n && n._ && n._[o || soul_]) } // convenience function to check to see if there is a soul on a node and return it.
          Node.soul.ify = function(n, o){ // put a soul on an object.
              o = (typeof o === 'string')? {soul: o} : o || {};
              n = n || {}; // make sure it exists.
              n._ = n._ || {}; // make sure meta exists.
              n._[soul_] = o.soul || n._[soul_] || text_random(); // put the soul on it.
              return n;
          }
          Node.soul._ = Val.link._;
          ;(function(){
              Node.is = function(n, cb, as){ var s; // checks to see if an object is a valid node.
                  if(!obj_is(n)){ return false } // must be an object.
                  if(s = Node.soul(n)){ // must have a soul on it.
                      return !obj_map(n, map, {as:as,cb:cb,s:s,n:n});
                  }
                  return false; // nope! This was not a valid node.
              }
              function map(v, k){ // we invert this because the way we check for this is via a negation.
                  if(k === Node._){ return } // skip over the metadata.
                  if(!Val.is(v)){ return true } // it is true that this is an invalid node.
                  if(this.cb){ this.cb.call(this.as, v, k, this.n, this.s) } // optionally callback each key/value.
              }
          }());
          ;(function(){
              Node.ify = function(obj, o, as){ // returns a node from a shallow object.
                  if(!o){ o = {} }
                  else if(typeof o === 'string'){ o = {soul: o} }
                  else if('function' == typeof o){ o = {map: o} }
                  if(o.map){ o.node = o.map.call(as, obj, u, o.node || {}) }
                  if(o.node = Node.soul.ify(o.node || {}, o)){
                      obj_map(obj, map, {o:o,as:as});
                  }
                  return o.node; // This will only be a valid node if the object wasn't already deep!
              }
              function map(v, k){ var o = this.o, tmp, u; // iterate over each key/value.
                  if(o.map){
                      tmp = o.map.call(this.as, v, ''+k, o.node);
                      if(u === tmp){
                          obj_del(o.node, k);
                      } else
                      if(o.node){ o.node[k] = tmp }
                      return;
                  }
                  if(Val.is(v)){
                      o.node[k] = v;
                  }
              }
          }());
          var obj = Type.obj, obj_is = obj.is, obj_del = obj.del, obj_map = obj.map;
          var text = Type.text, text_random = text.random;
          var soul_ = Node.soul._;
          var u;
          module.exports = Node;
      })(USE, './node');
  
      ;USE(function(module){
          var Type = USE('./type');
          var Node = USE('./node');
          function State(){
              var t;
              /*if(perf){
                  t = start + perf.now(); // Danger: Accuracy decays significantly over time, even if precise.
              } else {*/
                  t = +new Date;
              //}
              if(last < t){
                  return N = 0, last = t + State.drift;
              }
              return last = t + ((N += 1) / D) + State.drift;
          }
          var time = Type.time.is, last = -Infinity, N = 0, D = 1000; // WARNING! In the future, on machines that are D times faster than 2016AD machines, you will want to increase D by another several orders of magnitude so the processing speed never out paces the decimal resolution (increasing an integer effects the state accuracy).
          var perf = (typeof performance !== 'undefined')? (performance.timing && performance) : false, start = (perf && perf.timing && perf.timing.navigationStart) || (perf = false);
          var S_ = State._ = '>';
          State.drift = 0;
          State.is = function(n, k, o){ // convenience function to get the state on a key on a node and return it.
              var tmp = (k && n && n[N_] && n[N_][S_]) || o;
              if(!tmp){ return }
              return num_is(tmp = tmp[k])? tmp : -Infinity;
          }
          State.lex = function(){ return State().toString(36).replace('.','') }
          State.ify = function(n, k, s, v, soul){ // put a key's state on a node.
              if(!n || !n[N_]){ // reject if it is not node-like.
                  if(!soul){ // unless they passed a soul
                      return;
                  }
                  n = Node.soul.ify(n, soul); // then make it so!
              }
              var tmp = obj_as(n[N_], S_); // grab the states data.
              if(u !== k && k !== N_){
                  if(num_is(s)){
                      tmp[k] = s; // add the valid state.
                  }
                  if(u !== v){ // Note: Not its job to check for valid values!
                      n[k] = v;
                  }
              }
              return n;
          }
          State.to = function(from, k, to){
              var val = (from||{})[k];
              if(obj_is(val)){
                  val = obj_copy(val);
              }
              return State.ify(to, k, State.is(from, k), val, Node.soul(from));
          }
          ;(function(){
              State.map = function(cb, s, as){ var u; // for use with Node.ify
                  var o = obj_is(o = cb || s)? o : null;
                  cb = fn_is(cb = cb || s)? cb : null;
                  if(o && !cb){
                      s = num_is(s)? s : State();
                      o[N_] = o[N_] || {};
                      obj_map(o, map, {o:o,s:s});
                      return o;
                  }
                  as = as || obj_is(s)? s : u;
                  s = num_is(s)? s : State();
                  return function(v, k, o, opt){
                      if(!cb){
                          map.call({o: o, s: s}, v,k);
                          return v;
                      }
                      cb.call(as || this || {}, v, k, o, opt);
                      if(obj_has(o,k) && u === o[k]){ return }
                      map.call({o: o, s: s}, v,k);
                  }
              }
              function map(v,k){
                  if(N_ === k){ return }
                  State.ify(this.o, k, this.s) ;
              }
          }());
          var obj = Type.obj, obj_as = obj.as, obj_has = obj.has, obj_is = obj.is, obj_map = obj.map, obj_copy = obj.copy;
          var num = Type.num, num_is = num.is;
          var fn = Type.fn, fn_is = fn.is;
          var N_ = Node._, u;
          module.exports = State;
      })(USE, './state');
  
      ;USE(function(module){
          var Type = USE('./type');
          var Val = USE('./val');
          var Node = USE('./node');
          var Graph = {};
          ;(function(){
              Graph.is = function(g, cb, fn, as){ // checks to see if an object is a valid graph.
                  if(!g || !obj_is(g) || obj_empty(g)){ return false } // must be an object.
                  return !obj_map(g, map, {cb:cb,fn:fn,as:as}); // makes sure it wasn't an empty object.
              }
              function map(n, s){ // we invert this because the way'? we check for this is via a negation.
                  if(!n || s !== Node.soul(n) || !Node.is(n, this.fn, this.as)){ return true } // it is true that this is an invalid graph.
                  if(!this.cb){ return }
                  nf.n = n; nf.as = this.as; // sequential race conditions aren't races.
                  this.cb.call(nf.as, n, s, nf);
              }
              function nf(fn){ // optional callback for each node.
                  if(fn){ Node.is(nf.n, fn, nf.as) } // where we then have an optional callback for each key/value.
              }
          }());
          ;(function(){
              Graph.ify = function(obj, env, as){
                  var at = {path: [], obj: obj};
                  if(!env){
                      env = {};
                  } else
                  if(typeof env === 'string'){
                      env = {soul: env};
                  } else
                  if('function' == typeof env){
                      env.map = env;
                  }
                  if(typeof as === 'string'){
                      env.soul = env.soul || as;
                      as = u;
                  }
                  if(env.soul){
                      at.link = Val.link.ify(env.soul);
                  }
                  env.shell = (as||{}).shell;
                  env.graph = env.graph || {};
                  env.seen = env.seen || [];
                  env.as = env.as || as;
                  node(env, at);
                  env.root = at.node;
                  return env.graph;
              }
              function node(env, at){ var tmp;
                  if(tmp = seen(env, at)){ return tmp }
                  at.env = env;
                  at.soul = soul;
                  if(Node.ify(at.obj, map, at)){
                      at.link = at.link || Val.link.ify(Node.soul(at.node));
                      if(at.obj !== env.shell){
                          env.graph[Val.link.is(at.link)] = at.node;
                      }
                  }
                  return at;
              }
              function map(v,k,n){
                  var at = this, env = at.env, is, tmp;
                  if(Node._ === k && obj_has(v,Val.link._)){
                      return n._; // TODO: Bug?
                  }
                  if(!(is = valid(v,k,n, at,env))){ return }
                  if(!k){
                      at.node = at.node || n || {};
                      if(obj_has(v, Node._) && Node.soul(v)){ // ? for safety ?
                          at.node._ = obj_copy(v._);
                      }
                      at.node = Node.soul.ify(at.node, Val.link.is(at.link));
                      at.link = at.link || Val.link.ify(Node.soul(at.node));
                  }
                  if(tmp = env.map){
                      tmp.call(env.as || {}, v,k,n, at);
                      if(obj_has(n,k)){
                          v = n[k];
                          if(u === v){
                              obj_del(n, k);
                              return;
                          }
                          if(!(is = valid(v,k,n, at,env))){ return }
                      }
                  }
                  if(!k){ return at.node }
                  if(true === is){
                      return v;
                  }
                  tmp = node(env, {obj: v, path: at.path.concat(k)});
                  if(!tmp.node){ return }
                  return tmp.link; //{'#': Node.soul(tmp.node)};
              }
              function soul(id){ var at = this;
                  var prev = Val.link.is(at.link), graph = at.env.graph;
                  at.link = at.link || Val.link.ify(id);
                  at.link[Val.link._] = id;
                  if(at.node && at.node[Node._]){
                      at.node[Node._][Val.link._] = id;
                  }
                  if(obj_has(graph, prev)){
                      graph[id] = graph[prev];
                      obj_del(graph, prev);
                  }
              }
              function valid(v,k,n, at,env){ var tmp;
                  if(Val.is(v)){ return true }
                  if(obj_is(v)){ return 1 }
                  if(tmp = env.invalid){
                      v = tmp.call(env.as || {}, v,k,n);
                      return valid(v,k,n, at,env);
                  }
                  env.err = "Invalid value at '" + at.path.concat(k).join('.') + "'!";
                  if(Type.list.is(v)){ env.err += " Use `.set(item)` instead of an Array." }
              }
              function seen(env, at){
                  var arr = env.seen, i = arr.length, has;
                  while(i--){ has = arr[i];
                      if(at.obj === has.obj){ return has }
                  }
                  arr.push(at);
              }
          }());
          Graph.node = function(node){
              var soul = Node.soul(node);
              if(!soul){ return }
              return obj_put({}, soul, node);
          }
          ;(function(){
              Graph.to = function(graph, root, opt){
                  if(!graph){ return }
                  var obj = {};
                  opt = opt || {seen: {}};
                  obj_map(graph[root], map, {obj:obj, graph: graph, opt: opt});
                  return obj;
              }
              function map(v,k){ var tmp, obj;
                  if(Node._ === k){
                      if(obj_empty(v, Val.link._)){
                          return;
                      }
                      this.obj[k] = obj_copy(v);
                      return;
                  }
                  if(!(tmp = Val.link.is(v))){
                      this.obj[k] = v;
                      return;
                  }
                  if(obj = this.opt.seen[tmp]){
                      this.obj[k] = obj;
                      return;
                  }
                  this.obj[k] = this.opt.seen[tmp] = Graph.to(this.graph, tmp, this.opt);
              }
          }());
          var fn_is = Type.fn.is;
          var obj = Type.obj, obj_is = obj.is, obj_del = obj.del, obj_has = obj.has, obj_empty = obj.empty, obj_put = obj.put, obj_map = obj.map, obj_copy = obj.copy;
          var u;
          module.exports = Graph;
      })(USE, './graph');
  
      ;USE(function(module){
          // request / response module, for asking and acking messages.
          USE('./onto'); // depends upon onto!
          module.exports = function ask(cb, as){
              if(!this.on){ return }
              if(!('function' == typeof cb)){
                  if(!cb || !as){ return }
                  var id = cb['#'] || cb, tmp = (this.tag||'')[id];
                  if(!tmp){ return }
                  tmp = this.on(id, as);
                  clearTimeout(tmp.err);
                  return true;
              }
              var id = (as && as['#']) || Math.random().toString(36).slice(2);
              if(!cb){ return id }
              var to = this.on(id, cb, as);
              to.err = to.err || setTimeout(function(){
                  to.next({err: "Error: No ACK yet.", lack: true});
                  to.off();
              }, (this.opt||{}).lack || 9000);
              return id;
          }
      })(USE, './ask');
  
      ;USE(function(module){
          var Type = USE('./type');
          function Dup(opt){
              var dup = {s:{}}, s = dup.s;
              opt = opt || {max: 1000, age: /*1000 * 9};//*/ 1000 * 9 * 3};
              dup.check = function(id){
                  if(!s[id]){ return false }
                  return dt(id);
              }
              var dt = dup.track = function(id){
                  var it = s[id] || (s[id] = {});
                  it.was = +new Date;
                  if(!dup.to){ dup.to = setTimeout(dup.drop, opt.age + 9) }
                  return it;
              }
              dup.drop = function(age){
                  var now = +new Date;
                  Type.obj.map(s, function(it, id){
                      if(it && (age || opt.age) > (now - it.was)){ return }
                      delete s[id];
                  });
                  dup.to = null;
                  console.STAT && (age = +new Date - now) > 9 && console.STAT(now, age, 'dup drop');
              }
              return dup;
          }
          module.exports = Dup;
      })(USE, './dup');
  
      ;USE(function(module){
  
          function Gun(o){
              if(o instanceof Gun){ return (this._ = {$: this}).$ }
              if(!(this instanceof Gun)){ return new Gun(o) }
              return Gun.create(this._ = {$: this, opt: o});
          }
  
          Gun.is = function($){ return ($ instanceof Gun) || ($ && $._ && ($ === $._.$)) || false }
  
          Gun.version = 0.2020;
  
          Gun.chain = Gun.prototype;
          Gun.chain.toJSON = function(){};
  
          var Type = USE('./type');
          Type.obj.to(Type, Gun);
          Gun.HAM = USE('./HAM');
          Gun.val = USE('./val');
          Gun.node = USE('./node');
          Gun.state = USE('./state');
          Gun.graph = USE('./graph');
          Gun.on = USE('./onto');
          Gun.ask = USE('./ask');
          Gun.dup = USE('./dup');
          Gun.puff = USE('./puff');
  
          ;(function(){
              Gun.create = function(at){
                  at.root = at.root || at;
                  at.graph = at.graph || {};
                  at.on = at.on || Gun.on;
                  at.ask = at.ask || Gun.ask;
                  at.dup = at.dup || Gun.dup();
                  var gun = at.$.opt(at.opt);
                  if(!at.once){
                      at.on('in', universe, at);
                      at.on('out', universe, at);
                      at.on('put', map, at);
                      Gun.on('create', at);
                      at.on('create', at);
                  }
                  at.once = 1;
                  return gun;
              }
              function universe(msg){
                  if(!msg){ return }
                  if(msg.out === universe){ this.to.next(msg); return }
                  var eve = this, as = eve.as, at = as.at || as, gun = at.$, dup = at.dup, tmp, DBG = msg.DBG;
                  (tmp = msg['#']) || (tmp = msg['#'] = text_rand(9));
                  if(dup.check(tmp)){ return } dup.track(tmp);
                  tmp = msg._; msg._ = ('function' == typeof tmp)? tmp : function(){};
                  (msg.$ && (msg.$ === (msg.$._||'').$)) || (msg.$ = gun);
                  if(!at.ask(msg['@'], msg)){ // is this machine listening for an ack?
                      DBG && (DBG.u = +new Date);
                      if(msg.get){ Gun.on._get(msg, gun) }
                      if(msg.put){ put(msg); return }
                  }
                  DBG && (DBG.uc = +new Date);
                  eve.to.next(msg);
                  DBG && (DBG.ua = +new Date);
                  msg.out = universe; at.on('out', msg);
                  DBG && (DBG.ue = +new Date);
              }
              function put(msg){
                  if(!msg){ return }
                  var ctx = msg._||'', root = ctx.root = ((ctx.$ = msg.$||'')._||'').root;
                  var put = msg.put, id = msg['#'], err, tmp;
                  var DBG = ctx.DBG = msg.DBG;
                  if(put['#'] && put['.']){ root.on('put', msg); return } // TODO: BUG! This needs to call HAM instead.
                  /*root.on(id, function(m){
                      console.log('ack:', m);
                  });*/
                  ctx.out = msg;
                  ctx.lot = {s: 0, more: 1};
                  var S = +new Date;
                  DBG && (DBG.p = S);
                  for(var soul in put){ // Gun.obj.native() makes this safe.
                      var node = put[soul], states;
                      if(!node){ err = ERR+cut(soul)+"no node."; break }
                      if(!(tmp = node._)){ err = ERR+cut(soul)+"no meta."; break }
                      if(soul !== tmp[_soul]){ err = ERR+cut(soul)+"soul not same."; break }
                      if(!(states = tmp[state_])){ err = ERR+cut(soul)+"no state."; break }
                      for(var key in node){ // double loop uncool, but have to support old format.
                          if(node_ === key){ continue }
                          var val = node[key], state = states[key];
                          if(u === state){ err = ERR+cut(key)+"on"+cut(soul)+"no state."; break }
                          if(!val_is(val)){ err = ERR+cut(key)+"on"+cut(soul)+"bad "+(typeof val)+cut(val); break }
                          ham(val, key, soul, state, msg);
                      }
                      if(err){ break }
                  }
                  DBG && (DBG.pe = +new Date);
                  if(console.STAT){ console.STAT(S, +new Date - S, 'mix');console.STAT(S, ctx.lot.s, 'mix #') }
                  if(ctx.err = err){ root.on('in', {'@': id, err: Gun.log(err)}); return }
                  if(!(--ctx.lot.more)){ fire(ctx) } // if synchronous.
                  if(!ctx.stun && !msg['@']){ root.on('in', {'@': id, ok: -1}) } // in case no diff sent to storage, etc., still ack.
              } Gun.on.put = put;
              function ham(val, key, soul, state, msg){
                  var ctx = msg._||'', root = ctx.root, graph = root.graph, lot;
                  var vertex = graph[soul] || empty, was = state_is(vertex, key, 1), known = vertex[key];
                  var machine = State(), is = HAM(machine, state, was, val, known), u;
                  if(!is.incoming){
                      if(is.defer){
                          var to = state - machine;
                          setTimeout(function(){
                              ham(val, key, soul, state, msg);
                          }, to > MD? MD : to); // setTimeout Max Defer 32bit :(
                          if(!ctx.to){ root.on('in', {'@': msg['#'], err: to}) } ctx.to = 1; // TODO: This causes too many problems unless sending peers auto-retry.
                          return to;
                      }
                      //return; // it should be this
                      if(!ctx.miss){ return } // but some chains have a cache miss that need to re-fire. // TODO: Improve in future.
                  }
                  (lot = ctx.lot||'').s++; lot.more++;
                  (ctx.stun || (ctx.stun = {}))[soul+key] = 1;
                  var DBG = ctx.DBG; DBG && (DBG.ph = DBG.ph || +new Date);
                  root.on('put', {'#': msg['#'], '@': msg['@'], put: {'#': soul, '.': key, ':': val, '>': state}, _: ctx});
              }
              function map(msg){
                  var DBG; if(DBG = (msg._||'').DBG){ DBG.pa = +new Date; DBG.pm = DBG.pm || +new Date}
            var eve = this, root = eve.as, graph = root.graph, ctx = msg._, put = msg.put, soul = put['#'], key = put['.'], val = put[':'], state = put['>'], id = msg['#'], tmp;
                  graph[soul] = state_ify(graph[soul], key, state, val, soul); // TODO: Only put in graph if subscribed? Relays vs Browsers?
                  chain(ctx, soul, key, (u !== (tmp = put['=']))? tmp : val, state); // TODO: This should NOT be how the API works, this should be done at an extension layer, but hacky solution to migrate with old code for now.
                  if((tmp = ctx.out) && (tmp = tmp.put)){
                      tmp[soul] = state_ify(tmp[soul], key, state, val, soul); // TODO: Hacky, fix & come back later, for actual pushing messages.
                  }
                  if(!(--ctx.lot.more)){ fire(ctx) } // TODO: 'forget' feature in SEA tied to this, bad approach, but hacked in for now. Any changes here must update there.
                  eve.to.next(msg);
              }
              function chain(ctx, soul, key,val, state){
                  var root = ctx.root, put, tmp;
                  (root.opt||'').super && root.$.get(soul); // I think we need super for now, but since we are rewriting, should consider getting rid of it.
                  if(!root || !(tmp = root.next) || !(tmp = tmp[soul]) || !tmp.$){ return }
                  (put = ctx.put || (ctx.put = {}))[soul] = state_ify(put[soul], key, state, val, soul);
                  tmp.put = state_ify(tmp.put, key, state, val, soul);
              }
              function fire(ctx){
                  if(ctx.err){ return }
                  var stop = {};
                  var root = ((ctx.$||'')._||'').root, next = (root||'').next||'', put = ctx.put, tmp;
                  var S = +new Date;
                  //Gun.graph.is(put, function(node, soul){
                  for(var soul in put){ var node = put[soul]; // Gun.obj.native() makes this safe.
                      if(!(tmp = next[soul]) || !tmp.$){ continue }
                      root.stop = stop; // temporary fix till a better solution?
                      tmp.on('in', {$: tmp.$, get: soul, put: node});
                      root.stop = null; // temporary fix till a better solution?
                  }
                  console.STAT && console.STAT(S, +new Date - S, 'fire');
                  ctx.DBG && (ctx.DBG.f = +new Date);
                  if(!(tmp = ctx.out)){ return }
                  tmp.out = universe;
                  root.on('out', tmp);
              }
              var ERR = "Error: Invalid graph!";
              var cut = function(s){ return " '"+(''+s).slice(0,9)+"...' " }
              var HAM = Gun.HAM, MD = 2147483647, State = Gun.state;
          }());
  
          ;(function(){
              Gun.on._put = function(msg, gun){
                  var at = gun._, ctx = {$: gun, graph: at.graph, put: {}, map: {}, souls: {}, machine: Gun.state(), ack: msg['@'], cat: at, stop: {}};
                  if(!Gun.obj.map(msg.put, perf, ctx)){ return } // HNPERF: performance test, not core code, do not port.
                  if(!Gun.graph.is(msg.put, null, verify, ctx)){ ctx.err = "Error: Invalid graph!" }
                  if(ctx.err){ return at.on('in', {'@': msg['#'], err: Gun.log(ctx.err) }) }
                  obj_map(ctx.put, merge, ctx);
                  if(!ctx.async){ obj_map(ctx.map, map, ctx) }
                  if(u !== ctx.defer){
                      var to = ctx.defer - ctx.machine;
                      setTimeout(function(){
                          Gun.on._put(msg, gun);
                      }, to > MD? MD : to ); // setTimeout Max Defer 32bit :(
                  }
                  if(!ctx.diff){ return }
                  at.on('put', obj_to(msg, {put: ctx.diff}));
              };
              function verify(val, key, node, soul){ var ctx = this;
                  var state = Gun.state.is(node, key), tmp;
                  if(!state){ return ctx.err = "Error: No state on '"+key+"' in node '"+soul+"'!" }
                  var vertex = ctx.graph[soul] || empty, was = Gun.state.is(vertex, key, true), known = vertex[key];
                  var HAM = Gun.HAM(ctx.machine, state, was, val, known);
                  if(!HAM.incoming){
                      if(HAM.defer){ // pick the lowest
                          ctx.defer = (state < (ctx.defer || Infinity))? state : ctx.defer;
                      }
                      return;
                  }
                  ctx.put[soul] = Gun.state.to(node, key, ctx.put[soul]);
                  (ctx.diff || (ctx.diff = {}))[soul] = Gun.state.to(node, key, ctx.diff[soul]);
                  ctx.souls[soul] = true;
              }
              function merge(node, soul){
                  var ctx = this, cat = ctx.$._, at = (cat.next || empty)[soul];
                  if(!at){
                      if(!(cat.opt||empty).super){
                          ctx.souls[soul] = false;
                          return;
                      }
                      at = (ctx.$.get(soul)._);
                  }
                  var msg = ctx.map[soul] = {
                      put: node,
                      get: soul,
                      $: at.$
                  }, as = {ctx: ctx, msg: msg};
                  ctx.async = !!cat.tag.node;
                  if(ctx.ack){ msg['@'] = ctx.ack }
                  obj_map(node, each, as);
                  if(!ctx.async){ return }
                  if(!ctx.and){
                      // If it is async, we only need to setup one listener per context (ctx)
                      cat.on('node', function(m){
                          this.to.next(m); // make sure to call other context's listeners.
                          if(m !== ctx.map[m.get]){ return } // filter out events not from this context!
                          ctx.souls[m.get] = false; // set our many-async flag
                          obj_map(m.put, patch, m); // merge into view
                          if(obj_map(ctx.souls, function(v){ if(v){ return v } })){ return } // if flag still outstanding, keep waiting.
                          if(ctx.c){ return } ctx.c = 1; // failsafe for only being called once per context.
                          this.off();
                          obj_map(ctx.map, map, ctx); // all done, trigger chains.
                      });
                  }
                  ctx.and = true;
                  cat.on('node', msg); // each node on the current context's graph needs to be emitted though.
              }
              function each(val, key){
                  var ctx = this.ctx, graph = ctx.graph, msg = this.msg, soul = msg.get, node = msg.put, at = (msg.$._), tmp;
                  graph[soul] = Gun.state.to(node, key, graph[soul]);
                  if(ctx.async){ return }
                  at.put = Gun.state.to(node, key, at.put);
              }
              function patch(val, key){
                  var msg = this, node = msg.put, at = (msg.$._);
                  at.put = Gun.state.to(node, key, at.put);
              }
              function map(msg, soul){
                  if(!msg.$){ return }
                  this.cat.stop = this.stop; // temporary fix till a better solution?
                  (msg.$._).on('in', msg);
                  this.cat.stop = null; // temporary fix till a better solution?
              }
              function perf(node, soul){ if(node !== this.graph[soul]){ return true } } // HNPERF: do not port!
  
              Gun.on._get = function(msg, gun){
                  var root = gun._, get = msg.get, soul = get[_soul], node = root.graph[soul], has = get[_has], tmp;
                  var next = root.next || (root.next = {}), at = next[soul];
                  // queue concurrent GETs?
                  var ctx = msg._||'', DBG = ctx.DBG = msg.DBG;
                  DBG && (DBG.g = +new Date);
                  if(!node){ return root.on('get', msg) }
                  if(has){
                      if('string' != typeof has || !obj_has(node, has)){ return root.on('get', msg) }
                      node = Gun.state.to(node, has);
                      // If we have a key in-memory, do we really need to fetch?
                      // Maybe... in case the in-memory key we have is a local write
                      // we still need to trigger a pull/merge from peers.
                  } else {
                      node = Gun.window? Gun.obj.copy(node) : node; // HNPERF: If !browser bump Performance? Is this too dangerous to reference root graph? Copy / shallow copy too expensive for big nodes. Gun.obj.to(node); // 1 layer deep copy // Gun.obj.copy(node); // too slow on big nodes
                  }
                  node = Gun.graph.node(node);
                  tmp = (at||empty).ack;
                  var faith = function(){}; faith.ram = faith.faith = true; // HNPERF: We're testing performance improvement by skipping going through security again, but this should be audited.
                  faith.$ = msg.$;
                  DBG && (DBG.ga = +new Date);
                  root.on('in', {
                      '@': msg['#'],
                      put: node,
                      ram: 1,
                      $: gun,
                      _: faith
                  });
                  DBG && (DBG.gm = +new Date);
                  //if(0 < tmp){ return }
                  root.on('get', msg);
                  DBG && (DBG.gd = +new Date);
              }
          }());
  
          ;(function(){
              Gun.chain.opt = function(opt){
                  opt = opt || {};
                  var gun = this, at = gun._, tmp = opt.peers || opt;
                  if(!obj_is(opt)){ opt = {} }
                  if(!obj_is(at.opt)){ at.opt = opt }
                  if(text_is(tmp)){ tmp = [tmp] }
                  if(list_is(tmp)){
                      tmp = obj_map(tmp, function(url, i, map){
                          i = {}; i.id = i.url = url; map(url, i);
                      });
                      if(!obj_is(at.opt.peers)){ at.opt.peers = {}}
                      at.opt.peers = obj_to(tmp, at.opt.peers);
                  }
                  at.opt.peers = at.opt.peers || {};
                  obj_map(opt, function each(v,k){
                      if(!obj_has(this, k) || text.is(v) || obj.empty(v)){ this[k] = v ; return }
                      if(v && v.constructor !== Object && !list_is(v)){ return }
                      obj_map(v, each, this[k]);
                  }, at.opt);
                  Gun.on('opt', at);
                  //at.opt.uuid = at.opt.uuid || function(){ return state_lex() + text_rand(12) }
                  Gun.obj.native();
                  return gun;
              }
          }());
          Gun.obj.native = function(){ var p = Object.prototype; for(var i in p){ console.log("Native Object.prototype polluted, reverting", i); delete p[i]; } };
  
          var list_is = Gun.list.is;
          var text = Gun.text, text_is = text.is, text_rand = text.random;
          var obj = Gun.obj, obj_empty = obj.empty, obj_is = obj.is, obj_has = obj.has, obj_to = obj.to, obj_map = obj.map, obj_copy = obj.copy;
          var state_lex = Gun.state.lex, state_ify = Gun.state.ify, state_is = Gun.state.is, _soul = Gun.val.link._, _has = '.', node_ = Gun.node._, val_is = Gun.val.is, rel_is = Gun.val.link.is, state_ = Gun.state._;
          var empty = {}, u;
          var C;
  
          Gun.log = function(){ return (!Gun.log.off && C.log.apply(C, arguments)), [].slice.call(arguments).join(' ') };
          Gun.log.once = function(w,s,o){ return (o = Gun.log.once)[w] = o[w] || 0, o[w]++ || Gun.log(s) };
  
          if(typeof window !== "undefined"){ (window.GUN = window.Gun = Gun).window = window }
          try{ if(typeof MODULE !== "undefined"){ MODULE.exports = Gun } }catch(e){}
          module.exports = Gun;
  
          (Gun.window||'').console = (Gun.window||'').console || {log: function(){}};
          (C = console).only = function(i, s){ return (C.only.i && i === C.only.i && C.only.i++) && (C.log.apply(C, arguments) || s) };
  
          ;"Please do not remove welcome log unless you are paying for a monthly sponsorship, thanks!";
          Gun.log.once("welcome", "Hello wonderful person! :) Thanks for using GUN, please ask for help on http://chat.gun.eco if anything takes you longer than 5min to figure out!");
      })(USE, './root');
  
      ;USE(function(module){
          var Gun = USE('./root');
          Gun.chain.back = function(n, opt){ var tmp;
              n = n || 1;
              if(-1 === n || Infinity === n){
                  return this._.root.$;
              } else
              if(1 === n){
                  return (this._.back || this._).$;
              }
              var gun = this, at = gun._;
              if(typeof n === 'string'){
                  n = n.split('.');
              }
              if(n instanceof Array){
                  var i = 0, l = n.length, tmp = at;
                  for(i; i < l; i++){
                      tmp = (tmp||empty)[n[i]];
                  }
                  if(u !== tmp){
                      return opt? gun : tmp;
                  } else
                  if((tmp = at.back)){
                      return tmp.$.back(n, opt);
                  }
                  return;
              }
              if('function' == typeof n){
                  var yes, tmp = {back: at};
                  while((tmp = tmp.back)
                  && u === (yes = n(tmp, opt))){}
                  return yes;
              }
              if(Gun.num.is(n)){
                  return (at.back || at).$.back(n - 1);
              }
              return this;
          }
          var empty = {}, u;
      })(USE, './back');
  
      ;USE(function(module){
          // WARNING: GUN is very simple, but the JavaScript chaining API around GUN
          // is complicated and was extremely hard to build. If you port GUN to another
          // language, consider implementing an easier API to build.
          var Gun = USE('./root');
          Gun.chain.chain = function(sub){
              var gun = this, at = gun._, chain = new (sub || gun).constructor(gun), cat = chain._, root;
              cat.root = root = at.root;
              cat.id = ++root.once;
              cat.back = gun._;
              cat.on = Gun.on;
              cat.on('in', input, cat); // For 'in' if I add my own listeners to each then I MUST do it before in gets called. If I listen globally for all incoming data instead though, regardless of individual listeners, I can transform the data there and then as well.
              cat.on('out', output, cat); // However for output, there isn't really the global option. I must listen by adding my own listener individually BEFORE this one is ever called.
              return chain;
          }
  
          function output(msg){
              var put, get, at = this.as, back = at.back, root = at.root, tmp;
              if(!msg.$){ msg.$ = at.$ }
              this.to.next(msg);
              if(get = msg.get){
                  /*if(u !== at.put){
                      at.on('in', at);
                      return;
                  }*/
                  if(at.lex){ msg.get = obj_to(at.lex, msg.get) }
                  if(get['#'] || at.soul){
                      get['#'] = get['#'] || at.soul;
                      msg['#'] || (msg['#'] = text_rand(9));
                      back = (root.$.get(get['#'])._);
                      if(!(get = get['.'])){
                          tmp = back.ack;
                          if(!tmp){ back.ack = -1 }
                          if(obj_has(back, 'put')){
                              back.on('in', back);
                          }
                          if(tmp && u !== back.put){ return } //if(tmp){ return }
                          msg.$ = back.$;
                      } else
                      if(obj_has(back.put, get)){ // TODO: support #LEX !
                          put = (back.$.get(get)._);
                          if(!(tmp = put.ack)){ put.ack = -1 }
                          back.on('in', {
                              $: back.$,
                              put: Gun.state.to(back.put, get),
                              get: back.get
                          });
                          if(tmp){ return }
                      } else
                      if('string' != typeof get){
                          var put = {}, meta = (back.put||{})._;
                          Gun.obj.map(back.put, function(v,k){
                              if(!Gun.text.match(k, get)){ return }
                              put[k] = v;
                          })
                          if(!Gun.obj.empty(put)){
                              put._ = meta;
                              back.on('in', {$: back.$, put: put, get: back.get})
                          }
                          if(tmp = at.lex){
                              tmp = (tmp._) || (tmp._ = function(){});
                              if(back.ack < tmp.ask){ tmp.ask = back.ack }
                              if(tmp.ask){ return }
                              tmp.ask = 1;
                          }
                      }
                      root.ask(ack, msg);
                      return root.on('in', msg);
                  }
                  if(root.now){ root.now[at.id] = root.now[at.id] || true; at.pass = {} }
                  if(get['.']){
                      if(at.get){
                          msg = {get: {'.': at.get}, $: at.$};
                          //if(back.ask || (back.ask = {})[at.get]){ return }
                          (back.ask || (back.ask = {}));
                          back.ask[at.get] = msg.$._; // TODO: PERFORMANCE? More elegant way?
                          return back.on('out', msg);
                      }
                      msg = {get: {}, $: at.$};
                      return back.on('out', msg);
                  }
                  at.ack = at.ack || -1;
                  if(at.get){
                      msg.$ = at.$;
                      get['.'] = at.get;
                      (back.ask || (back.ask = {}))[at.get] = msg.$._; // TODO: PERFORMANCE? More elegant way?
                      return back.on('out', msg);
                  }
              }
              return back.on('out', msg);
          }
  
          function input(msg){
              var eve = this, cat = eve.as, root = cat.root, gun = msg.$, at = (gun||empty)._ || empty, change = msg.put, rel, tmp;
              if(cat.get && msg.get !== cat.get){
                  msg = obj_to(msg, {get: cat.get});
              }
              if(cat.has && at !== cat){
                  msg = obj_to(msg, {$: cat.$});
                  if(at.ack){
                      cat.ack = at.ack;
                      //cat.ack = cat.ack || at.ack;
                  }
              }
              if(u === change){
                  tmp = at.put;
                  eve.to.next(msg);
                  if(cat.soul){ return } // TODO: BUG, I believee the fresh input refactor caught an edge case that a `gun.get('soul').get('key')` that points to a soul that doesn't exist will not trigger val/get etc.
                  if(u === tmp && u !== at.put){ return }
                  echo(cat, msg, eve);
                  if(cat.has){
                      not(cat, msg);
                  }
                  obj_del(at.echo, cat.id);
                  obj_del(cat.map, at.id);
                  return;
              }
              if(cat.soul){
                  eve.to.next(msg);
                  echo(cat, msg, eve);
                  if(cat.next){ obj_map(change, map, {msg: msg, cat: cat}) }
                  return;
              }
              if(!(rel = Gun.val.link.is(change))){
                  if(Gun.val.is(change)){
                      if(cat.has || cat.soul){
                          not(cat, msg);
                      } else
                      if(at.has || at.soul){
                          (at.echo || (at.echo = {}))[cat.id] = at.echo[at.id] || cat;
                          (cat.map || (cat.map = {}))[at.id] = cat.map[at.id] || {at: at};
                          //if(u === at.put){ return } // Not necessary but improves performance. If we have it but at does not, that means we got things out of order and at will get it. Once at gets it, it will tell us again.
                      }
                      eve.to.next(msg);
                      echo(cat, msg, eve);
                      return;
                  }
                  if(cat.has && at !== cat && obj_has(at, 'put')){
                      cat.put = at.put;
                  };
                  if((rel = Gun.node.soul(change)) && at.has){
                      at.put = (cat.root.$.get(rel)._).put;
                  }
                  tmp = (root.stop || {})[at.id];
                  //if(tmp && tmp[cat.id]){ } else {
                      eve.to.next(msg);
                  //}
                  relate(cat, msg, at, rel);
                  echo(cat, msg, eve);
                  if(cat.next){ obj_map(change, map, {msg: msg, cat: cat}) }
                  return;
              }
              var was = root.stop;
              tmp = root.stop || {};
              tmp = tmp[at.id] || (tmp[at.id] = {});
              //if(tmp[cat.id]){ return }
              tmp.is = tmp.is || at.put;
              tmp[cat.id] = at.put || true;
              //if(root.stop){
                  eve.to.next(msg)
              //}
              relate(cat, msg, at, rel);
              echo(cat, msg, eve);
          }
  
          function relate(at, msg, from, rel){
              if(!rel || node_ === at.get){ return }
              var tmp = (at.root.$.get(rel)._);
              if(at.has){
                  from = tmp;
              } else
              if(from.has){
                  relate(from, msg, from, rel);
              }
              if(from === at){ return }
              if(!from.$){ from = {} }
              (from.echo || (from.echo = {}))[at.id] = from.echo[at.id] || at;
              if(at.has && !(at.map||empty)[from.id]){ // if we haven't seen this before.
                  not(at, msg);
              }
              tmp = from.id? ((at.map || (at.map = {}))[from.id] = at.map[from.id] || {at: from}) : {};
              if(rel === tmp.link){
                  if(!(tmp.pass || at.pass)){
                      return;
                  }
              }
              if(at.pass){
                  Gun.obj.map(at.map, function(tmp){ tmp.pass = true })
                  obj_del(at, 'pass');
              }
              if(tmp.pass){ obj_del(tmp, 'pass') }
              if(at.has){ at.link = rel }
              ask(at, tmp.link = rel);
          }
          function echo(at, msg, ev){
              if(!at.echo){ return } // || node_ === at.get ?
              //if(at.has){ msg = obj_to(msg, {event: ev}) }
              obj_map(at.echo, reverb, msg);
          }
          function reverb(to){
              if(!to || !to.on){ return }
              to.on('in', this);
          }
          function map(data, key){ // Map over only the changes on every update.
              var cat = this.cat, next = cat.next || empty, via = this.msg, chain, at, tmp;
              if(node_ === key && !next[key]){ return }
              if(!(at = next[key])){
                  return;
              }
              //if(data && data[_soul] && (tmp = Gun.val.link.is(data)) && (tmp = (cat.root.$.get(tmp)._)) && obj_has(tmp, 'put')){
              //	data = tmp.put;
              //}
              if(at.has){
                  //if(!(data && data[_soul] && Gun.val.link.is(data) === Gun.node.soul(at.put))){
                  if(u === at.put || !Gun.val.link.is(data)){
                      at.put = data;
                  }
                  chain = at.$;
              } else
              if(tmp = via.$){
                  tmp = (chain = via.$.get(key))._;
                  if(u === tmp.put || !Gun.val.link.is(data)){
                      tmp.put = data;
                  }
              }
              at.on('in', {
                  put: data,
                  get: key,
                  $: chain,
                  via: via
              });
          }
          function not(at, msg){
              if(!(at.has || at.soul)){ return }
              var tmp = at.map, root = at.root;
              at.map = null;
              if(at.has){
                  if(at.dub && at.root.stop){ at.dub = null }
                  at.link = null;
              }
              //if(!root.now || !root.now[at.id]){
              if(!at.pass){
                  if((!msg['@']) && null === tmp){ return }
                  //obj_del(at, 'pass');
              }
              if(u === tmp && Gun.val.link.is(at.put)){ return } // This prevents the very first call of a thing from triggering a "clean up" call. // TODO: link.is(at.put) || !val.is(at.put) ?
              obj_map(tmp, function(proxy){
                  if(!(proxy = proxy.at)){ return }
                  obj_del(proxy.echo, at.id);
              });
              tmp = at.put;
              obj_map(at.next, function(neat, key){
                  if(u === tmp && u !== at.put){ return true }
                  neat.put = u;
                  if(neat.ack){
                      neat.ack = -1; // Shouldn't this be reset to 0? If we do that, SEA test `set user ref should be found` fails, odd.
                  }
                  neat.on('in', {
                      get: key,
                      $: neat.$,
                      put: u
                  });
              });
          }
          function ask(at, soul){
              var tmp = (at.root.$.get(soul)._), lex = at.lex;
              if(at.ack || lex){
                  (lex = lex||{})['#'] = soul;
                  tmp.on('out', {get: lex});
                  if(!at.ask){ return } // TODO: PERFORMANCE? More elegant way?
              }
              tmp = at.ask; Gun.obj.del(at, 'ask');
              obj_map(tmp || at.next, function(neat, key){
                  var lex = neat.lex || {}; lex['#'] = soul; lex['.'] = lex['.'] || key;
                  neat.on('out', {get: lex});
              });
              Gun.obj.del(at, 'ask'); // TODO: PERFORMANCE? More elegant way?
          }
          function ack(msg, ev){
              var as = this.as, get = as.get||'', at = as.$._, tmp = (msg.put||'')[get['#']];
              if(at.ack){ at.ack = (at.ack + 1) || 1; }
              if(!msg.put || ('string' == typeof get['.'] && !obj_has(tmp, at.get))){
                  if(at.put !== u){ return }
                  at.on('in', {
                      get: at.get,
                      put: at.put = u,
                      $: at.$,
                      '@': msg['@']
                  });
                  return;
              }
              if(node_ == get['.']){ // is this a security concern?
                  at.on('in', {get: at.get, put: Gun.val.link.ify(get['#']), $: at.$, '@': msg['@']});
                  return;
              }
              if(at.$ === (msg._||'').$){ // replying to self, for perf, skip ham/security tho needs audit.
                  (msg._).miss = (at.put === u);
              }
              Gun.on.put(msg);
          }
          var empty = {}, u;
          var obj = Gun.obj, obj_has = obj.has, obj_put = obj.put, obj_del = obj.del, obj_to = obj.to, obj_map = obj.map;
          var text_rand = Gun.text.random;
          var _soul = Gun.val.link._, node_ = Gun.node._;
      })(USE, './chain');
  
      ;USE(function(module){
          var Gun = USE('./root');
          Gun.chain.get = function(key, cb, as){
              var gun, tmp;
              if(typeof key === 'string'){
                      if(key.length == 0) {
                            (as = this.chain())._.err = {err: Gun.log('Invalid zero length string key!', key)};
                            return null
                      }
                  var back = this, cat = back._;
                  var next = cat.next || empty;
                  if(!(gun = next[key])){
                      gun = cache(key, back);
                  }
                  gun = gun.$;
              } else
              if('function' == typeof key){
                  if(true === cb){ return soul(this, key, cb, as), this }
                  gun = this;
                  var at = gun._, root = at.root, tmp = root.now, ev;
                  as = cb || {};
                  as.at = at;
                  as.use = key;
                  as.out = as.out || {};
                  as.out.get = as.out.get || {};
                  (ev = at.on('in', use, as)).rid = rid;
                  (root.now = {$:1})[as.now = at.id] = ev;
                  var mum = root.mum; root.mum = {};
                  at.on('out', as.out);
                  root.mum = mum;
                  root.now = tmp;
                  return gun;
              } else
              if(num_is(key)){
                  return this.get(''+key, cb, as);
              } else
              if(tmp = rel.is(key)){
                  return this.get(tmp, cb, as);
              } else
              if(obj.is(key)){
                  gun = this;
                  if(tmp = ((tmp = key['#'])||empty)['='] || tmp){ gun = gun.get(tmp) }
                  gun._.lex = key;
                  return gun;
              } else {
                  (as = this.chain())._.err = {err: Gun.log('Invalid get request!', key)}; // CLEAN UP
                  if(cb){ cb.call(as, as._.err) }
                  return as;
              }
              if(tmp = this._.stun){ // TODO: Refactor?
                  gun._.stun = gun._.stun || tmp;
              }
              if(cb && 'function' == typeof cb){
                  gun.get(cb, as);
              }
              return gun;
          }
          function cache(key, back){
              var cat = back._, next = cat.next, gun = back.chain(), at = gun._;
              if(!next){ next = cat.next = {} }
              next[at.get = key] = at;
              if(back === cat.root.$){
                  at.soul = key;
              } else
              if(cat.soul || cat.has){
                  at.has = key;
                  //if(obj_has(cat.put, key)){
                      //at.put = cat.put[key];
                  //}
              }
              return at;
          }
          function soul(gun, cb, opt, as){
              var cat = gun._, acks = 0, tmp;
              if(tmp = cat.soul || cat.link || cat.dub){ return cb(tmp, as, cat) }
              if(cat.jam){ return cat.jam.push([cb, as]) }
              cat.jam = [[cb,as]];
              gun.get(function go(msg, eve){
                  if(u === msg.put && !cat.root.opt.super && (tmp = Object.keys(cat.root.opt.peers).length) && ++acks <= tmp){ // TODO: super should not be in core code, bring AXE up into core instead to fix?
                      return;
                  }
                  eve.rid(msg);
                  var at = ((at = msg.$) && at._) || {}, i = 0, as;
                  tmp = cat.jam; delete cat.jam; // tmp = cat.jam.splice(0, 100);
                  //if(tmp.length){ process.nextTick(function(){ go(msg, eve) }) }
                  while(as = tmp[i++]){ //Gun.obj.map(tmp, function(as, cb){
                      var cb = as[0], id; as = as[1];
                      cb && cb(id = at.link || at.soul || rel.is(msg.put) || node_soul(msg.put) || at.dub, as, msg, eve);
                  } //);
              }, {out: {get: {'.':true}}});
              return gun;
          }
          function use(msg){
              var eve = this, as = eve.as, cat = as.at, root = cat.root, gun = msg.$, at = (gun||{})._ || {}, data = msg.put || at.put, tmp;
              if((tmp = root.now) && eve !== tmp[as.now]){ return eve.to.next(msg) }
              //if(at.async && msg.root){ return }
              //if(at.async === 1 && cat.async !== true){ return }
              //if(root.stop && root.stop[at.id]){ return } root.stop && (root.stop[at.id] = true);
              //if(!at.async && !cat.async && at.put && msg.put === at.put){ return }
              //else if(!cat.async && msg.put !== at.put && root.stop && root.stop[at.id]){ return } root.stop && (root.stop[at.id] = true);
  
  
              //root.stop && (root.stop.id = root.stop.id || Gun.text.random(2));
              //if((tmp = root.stop) && (tmp = tmp[at.id] || (tmp[at.id] = {})) && tmp[cat.id]){ return } tmp && (tmp[cat.id] = true);
              if(eve.seen && at.id && eve.seen[at.id]){ return eve.to.next(msg) }
              //if((tmp = root.stop)){ if(tmp[at.id]){ return } tmp[at.id] = msg.root; } // temporary fix till a better solution?
              if((tmp = data) && tmp[rel._] && (tmp = rel.is(tmp))){
                  tmp = ((msg.$$ = at.root.$.get(tmp))._);
                  if(u !== tmp.put){
                      msg = obj_to(msg, {put: data = tmp.put});
                  }
              }
              if((tmp = root.mum) && at.id){ // TODO: can we delete mum entirely now?
                  var id = at.id + (eve.id || (eve.id = Gun.text.random(9)));
                  if(tmp[id]){ return }
                  if(u !== data && !rel.is(data)){ tmp[id] = true; }
              }
              as.use(msg, eve);
              if(eve.stun){
                  eve.stun = null;
                  return;
              }
              eve.to.next(msg);
          }
          function rid(at){
              var cat = this.on;
              if(!at || cat.soul || cat.has){ return this.off() }
              if(!(at = (at = (at = at.$ || at)._ || at).id)){ return }
              var map = cat.map, tmp, seen;
              //if(!map || !(tmp = map[at]) || !(tmp = tmp.at)){ return }
              if(tmp = (seen = this.seen || (this.seen = {}))[at]){ return true }
              seen[at] = true;
              return;
              //tmp.echo[cat.id] = {}; // TODO: Warning: This unsubscribes ALL of this chain's listeners from this link, not just the one callback event.
              //obj.del(map, at); // TODO: Warning: This unsubscribes ALL of this chain's listeners from this link, not just the one callback event.
              return;
          }
          var obj = Gun.obj, obj_map = obj.map, obj_has = obj.has, obj_to = Gun.obj.to;
          var num_is = Gun.num.is;
          var rel = Gun.val.link, node_soul = Gun.node.soul, node_ = Gun.node._;
          var empty = {}, u;
      })(USE, './get');
  
      ;USE(function(module){
          var Gun = USE('./root');
          Gun.chain.put = function(data, cb, as){
              var gun = this, at = (gun._), root = at.root.$, ctx = root._, M = 100, tmp;
              as = as || {};
              as.data = data;
              as.via = as.$ = as.via || as.$ || gun;
              if(typeof cb === 'string'){
                  as.soul = cb;
              } else {
                  as.ack = as.ack || cb;
              }
              if(at.soul){
                  as.soul = at.soul;
              }
              if(as.soul || root === gun){
                  if(!obj_is(as.data)){
                      (as.ack||noop).call(as, as.out = {err: Gun.log("Data saved to the root level of the graph must be a node (an object), not a", (typeof as.data), 'of "' + as.data + '"!')});
                      if(as.res){ as.res() }
                      return gun;
                  }
                  as.soul = as.soul || (as.not = Gun.node.soul(as.data) || (as.via.back('opt.uuid') || Gun.text.random)());
                  as.via._.stun = {};
                  if(!as.soul){ // polyfill async uuid for SEA
                      as.via.back('opt.uuid')(function(err, soul){ // TODO: improve perf without anonymous callback
                          if(err){ return Gun.log(err) } // TODO: Handle error!
                          (as.ref||as.$).put(as.data, as.soul = soul, as);
                      });
                      return gun;
                  }
                  as.$ = root.get(as.soul);
                  as.ref = as.$;
                  ify(as);
                  return gun;
              }
              as.via._.stun = {};
              if(Gun.is(data)){
                  data.get(function(soul, o, msg){
                      if(!soul){
                          delete as.via._.stun;
                          return Gun.log("The reference you are saving is a", typeof msg.put, '"'+ msg.put +'", not a node (object)!');
                      }
                      gun.put(Gun.val.link.ify(soul), cb, as);
                  }, true);
                  return gun;
              }
              if(at.has && (tmp = Gun.val.link.is(data))){ at.dub = tmp }
              as.ref = as.ref || (root._ === (tmp = at.back))? gun : tmp.$;
              if(as.ref._.soul && Gun.val.is(as.data) && at.get){
                  as.data = obj_put({}, at.get, as.data);
                  as.ref.put(as.data, as.soul, as);
                  return gun;
              }
              as.ref.get(any, true, {as: as});
              if(!as.out){
                  // TODO: Perf idea! Make a global lock, that blocks everything while it is on, but if it is on the lock it does the expensive lookup to see if it is a dependent write or not and if not then it proceeds full speed. Meh? For write heavy async apps that would be terrible.
                  as.res = as.res || stun; // Gun.on.stun(as.ref); // TODO: BUG! Deal with locking?
                  as.$._.stun = as.ref._.stun;
              }
              return gun;
          };
          /*Gun.chain.put = function(data, cb, as){ // don't rewrite! :(
              var gun = this, at = gun._;
              as = as || {};
              as.soul || (as.soul = at.soul || ('string' == typeof cb && cb));
              if(!as.soul){ return get(data, cb, as) }
  
              return gun;
          }*/
  
          function ify(as){
              as.batch = batch;
              var opt = as.opt||{}, env = as.env = Gun.state.map(map, opt.state);
              env.soul = as.soul;
              as.graph = Gun.graph.ify(as.data, env, as);
              if(env.err){
                  (as.ack||noop).call(as, as.out = {err: Gun.log(env.err)});
                  if(as.res){ as.res() }
                  return;
              }
              as.batch();
          }
  
          function stun(cb){
              if(cb){ cb() }
              return;
              var as = this;
              if(!as.ref){ return }
              if(cb){
                  as.after = as.ref._.tag;
                  as.now = as.ref._.tag = {};
                  cb();
                  return;
              }
              if(as.after){
                  as.ref._.tag = as.after;
              }
          }
  
          function batch(){ var as = this;
              if(!as.graph || !obj_empty(as.stun)){ return }
              as.res = as.res || function(cb){ if(cb){ cb() } };
              as.res(function(){
                  delete as.via._.stun;
                  var cat = (as.$.back(-1)._), ask = cat.ask(function(ack){
                      cat.root.on('ack', ack);
                      if(ack.err){ Gun.log(ack) }
                      if(++acks > (as.acks || 0)){ this.off() } // Adjustable ACKs! Only 1 by default.
                      if(!as.ack){ return }
                      as.ack(ack, this);
                      //--C;
                  }, as.opt), acks = 0;
                  //C++;
                  // NOW is a hack to get synchronous replies to correctly call.
                  // and STOP is a hack to get async behavior to correctly call.
                  // neither of these are ideal, need to be fixed without hacks,
                  // but for now, this works for current tests. :/
                  var tmp = cat.root.now; obj.del(cat.root, 'now');
                  var mum = cat.root.mum; cat.root.mum = {};
                  (as.ref._).on('out', {
                      $: as.ref, put: as.out = as.env.graph, opt: as.opt, '#': ask
                  });
                  cat.root.mum = mum? obj.to(mum, cat.root.mum) : mum;
                  cat.root.now = tmp;
                  as.via._.on('res', {}); delete as.via._.tag.res; // emitting causes mem leak?
              }, as);
              if(as.res){ as.res() }
          } function no(v,k){ if(v){ return true } }
  
          function map(v,k,n, at){ var as = this;
              var is = Gun.is(v);
              if(k || !at.path.length){ return }
              (as.res||iife)(function(){
                  var path = at.path, ref = as.ref, opt = as.opt;
                  var i = 0, l = path.length;
                  for(i; i < l; i++){
                      ref = ref.get(path[i]);
                  }
                  if(is){ ref = v }
                  //if(as.not){ (ref._).dub = Gun.text.random() } // This might optimize stuff? Maybe not needed anymore. Make sure it doesn't introduce bugs.
                  var id = (ref._).dub;
                  if(id || (id = Gun.node.soul(at.obj))){
                      ref.back(-1).get(id);
                      at.soul(id);
                      return;
                  }
                  (as.stun = as.stun || {})[path] = 1;
                  ref.get(soul, true, {as: {at: at, as: as, p:path, ref: ref}});
              }, {as: as, at: at});
              //if(is){ return {} }
          }
          var G = String.fromCharCode(31);
          function soul(id, as, msg, eve){
              var as = as.as, path = as.p, ref = as.ref, cat = as.at, pat = [], sat; as = as.as;
              ref.back(function(at){
                  if(sat = at.soul || at.link || at.dub){ return sat }
                  pat.push(at.has || at.get);
              });
              pat = [sat || as.soul].concat(pat.reverse());
              var at = ((msg || {}).$ || {})._ || {};
              id = at.dub = at.dub || id || Gun.node.soul(cat.obj) || Gun.node.soul(msg.put || at.put) || Gun.val.link.is(msg.put || at.put) || pat.join('/') /* || (function(){
                  return (as.soul+'.')+Gun.text.hash(path.join(G)).toString(32);
              })(); // TODO: BUG!? Do we really want the soul of the object given to us? Could that be dangerous? What about copy operations? */
              if(eve){ eve.stun = true }
              if(!id){ // polyfill async uuid for SEA
                  as.via.back('opt.uuid')(function(err, id){ // TODO: improve perf without anonymous callback
                      if(err){ return Gun.log(err) } // TODO: Handle error.
                      solve(at, at.dub = at.dub || id, cat, as);
                  });
                  return;
              }
              solve(at, at.dub = id, cat, as);
          }
  
          function solve(at, id, cat, as){
              at.$.back(-1).get(id);
              cat.soul(id);
              delete as.stun[cat.path];
              as.batch();
          }
  
          function any(soul, as, msg, eve){
              as = as.as;
              if(!msg.$ || !msg.$._){ return } // TODO: Handle
              if(msg.err){ // TODO: Handle
                  Gun.log("Please report this as an issue! Put.any.err");
                  return;
              }
              var at = (msg.$._), data = at.put, opt = as.opt||{}, root, tmp;
              if((tmp = as.ref) && tmp._.now){ return }
              if(eve){ eve.stun = true }
              if(as.ref !== as.$){
                  tmp = (as.$._).get || at.get;
                  if(!tmp){ // TODO: Handle
                      delete as.via._.stun;
                      Gun.log("Please report this as an issue! Put.no.get"); // TODO: BUG!??
                      return;
                  }
                  as.data = obj_put({}, tmp, as.data);
                  tmp = null;
              }
              if(u === data){
                  if(!at.get){ delete as.via._.stun; return } // TODO: Handle
                  if(!soul){
                      tmp = at.$.back(function(at){
                          if(at.link || at.soul){ return at.link || at.soul }
                          as.data = obj_put({}, at.get, as.data);
                      });
                      as.not = true; // maybe consider this?
                  }
                  tmp = tmp || at.soul || at.link || at.dub;// || at.get;
                  at = tmp? (at.root.$.get(tmp)._) : at;
                  as.soul = tmp;
                  data = as.data;
              }
              if(!as.not && !(as.soul = as.soul || soul)){
                  if(as.path && obj_is(as.data)){
                      as.soul = (opt.uuid || as.via.back('opt.uuid') || Gun.text.random)();
                  } else {
                      //as.data = obj_put({}, as.$._.get, as.data);
                      if(node_ == at.get){
                          as.soul = (at.put||empty)['#'] || at.dub;
                      }
                      as.soul = as.soul || at.soul || at.link || (opt.uuid || as.via.back('opt.uuid') || Gun.text.random)();
                  }
                  if(!as.soul){ // polyfill async uuid for SEA
                      as.via.back('opt.uuid')(function(err, soul){ // TODO: improve perf without anonymous callback
                          if(err){ delete as.via._.stun; return Gun.log(err) } // Handle error.
                          as.ref.put(as.data, as.soul = soul, as);
                      });
                      return;
                  }
              }
              as.ref.put(as.data, as.soul, as);
          }
          var obj = Gun.obj, obj_is = obj.is, obj_put = obj.put, obj_map = obj.map, obj_empty = obj.empty;
          var u, empty = {}, noop = function(){}, iife = function(fn,as){fn.call(as||empty)};
          var node_ = Gun.node._;
      })(USE, './put');
  
      ;USE(function(module){
          var Gun = USE('./root');
          USE('./chain');
          USE('./back');
          USE('./put');
          USE('./get');
          module.exports = Gun;
      })(USE, './index');
  
      ;USE(function(module){
          var Gun = USE('./index');
          Gun.chain.on = function(tag, arg, eas, as){
              var gun = this, at = gun._, tmp, act, off;
              if(typeof tag === 'string'){
                  if(!arg){ return at.on(tag) }
                  act = at.on(tag, arg, eas || at, as);
                  if(eas && eas.$){
                      (eas.subs || (eas.subs = [])).push(act);
                  }
                  return gun;
              }
              var opt = arg;
              opt = (true === opt)? {change: true} : opt || {};
              opt.at = at;
              opt.ok = tag;
              //opt.last = {};
              gun.get(ok, opt); // TODO: PERF! Event listener leak!!!?
              return gun;
          }
  
          function ok(msg, ev){ var opt = this;
              var gun = msg.$, at = (gun||{})._ || {}, data = at.put || msg.put, cat = opt.at, tmp;
              if(u === data){
                  return;
              }
              if(tmp = msg.$$){
                  tmp = (msg.$$._);
                  if(u === tmp.put){
                      return;
                  }
                  data = tmp.put;
              }
              if(opt.change){ // TODO: BUG? Move above the undef checks?
                  data = msg.put;
              }
              // DEDUPLICATE // TODO: NEEDS WORK! BAD PROTOTYPE
              //if(tmp.put === data && tmp.get === id && !Gun.node.soul(data)){ return }
              //tmp.put = data;
              //tmp.get = id;
              // DEDUPLICATE // TODO: NEEDS WORK! BAD PROTOTYPE
              //at.last = data;
              if(opt.as){
                  opt.ok.call(opt.as, msg, ev);
              } else {
                  opt.ok.call(gun, data, msg.get, msg, ev);
              }
          }
  
          Gun.chain.val = function(cb, opt){
              Gun.log.once("onceval", "Future Breaking API Change: .val -> .once, apologies unexpected.");
              return this.once(cb, opt);
          }
          Gun.chain.once = function(cb, opt){
              var gun = this, at = gun._, data = at.put;
              if(0 < at.ack && u !== data){
                  (cb || noop).call(gun, data, at.get);
                  return gun;
              }
              if(cb){
                  (opt = opt || {}).ok = cb;
                  opt.at = at;
                  opt.out = {'#': Gun.text.random(9)};
                  gun.get(val, {as: opt});
                  opt.async = true; //opt.async = at.stun? 1 : true;
              } else {
                  Gun.log.once("valonce", "Chainable val is experimental, its behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it.");
                  var chain = gun.chain();
                  chain._.nix = gun.once(function(){
                      chain._.on('in', gun._);
                  });
                  return chain;
              }
              return gun;
          }
  
          function val(msg, eve, to){
              if(!msg.$){ eve.off(); return }
              var opt = this.as, cat = opt.at, gun = msg.$, at = gun._, data = at.put || msg.put, link, tmp;
              if(tmp = msg.$$){
                  link = tmp = (msg.$$._);
                  if(u !== link.put){
                      data = link.put;
                  }
              }
              if((tmp = eve.wait) && (tmp = tmp[at.id])){ clearTimeout(tmp) }
              eve.ack = (eve.ack||0)+1;
              // TODO: super should not be in core code, bring AXE up into core instead to fix?
              if(!to && u === data && !at.root.opt.super && eve.ack <= (opt.acks || Object.keys(at.root.opt.peers).length)){ return }
              if((!to && (u === data || at.soul || at.link || (link && !(0 < link.ack))))
              || (u === data && !at.root.opt.super && (tmp = Object.keys(at.root.opt.peers).length) && (!to && (link||at).ack < tmp))){
                  tmp = (eve.wait = {})[at.id] = setTimeout(function(){
                      val.call({as:opt}, msg, eve, tmp || 1);
                  }, opt.wait || 99);
                  return;
              }
              if(link && u === link.put && (tmp = rel.is(data))){ data = Gun.node.ify({}, tmp) }
              eve.rid? eve.rid(msg) : eve.off();
              opt.ok.call(gun || opt.$, data, msg.get);
          }
  
          Gun.chain.off = function(){
              // make off more aggressive. Warning, it might backfire!
              var gun = this, at = gun._, tmp;
              var cat = at.back;
              if(!cat){ return }
              at.ack = 0; // so can resubscribe.
              if(tmp = cat.next){
                  if(tmp[at.get]){
                      obj_del(tmp, at.get);
                  } else {
  
                  }
              }
              if(tmp = cat.ask){
                  obj_del(tmp, at.get);
              }
              if(tmp = cat.put){
                  obj_del(tmp, at.get);
              }
              if(tmp = at.soul){
                  obj_del(cat.root.graph, tmp);
              }
              if(tmp = at.map){
                  obj_map(tmp, function(at){
                      if(at.link){
                          cat.root.$.get(at.link).off();
                      }
                  });
              }
              if(tmp = at.next){
                  obj_map(tmp, function(neat){
                      neat.$.off();
                  });
              }
              at.on('off', {});
              return gun;
          }
          var obj = Gun.obj, obj_map = obj.map, obj_has = obj.has, obj_del = obj.del, obj_to = obj.to;
          var rel = Gun.val.link;
          var empty = {}, noop = function(){}, u;
      })(USE, './on');
  
      ;USE(function(module){
          var Gun = USE('./index');
          Gun.chain.map = function(cb, opt, t){
              var gun = this, cat = gun._, chain;
              if(!cb){
                  if(chain = cat.each){ return chain }
                  cat.each = chain = gun.chain();
                  chain._.nix = gun.back('nix');
                  gun.on('in', map, chain._);
                  return chain;
              }
              Gun.log.once("mapfn", "Map functions are experimental, their behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it.");
              chain = gun.chain();
              gun.map().on(function(data, key, at, ev){
                  var next = (cb||noop).call(this, data, key, at, ev);
                  if(u === next){ return }
                  if(data === next){ return chain._.on('in', at) }
                  if(Gun.is(next)){ return chain._.on('in', next._) }
                  chain._.on('in', {get: key, put: next});
              });
              return chain;
          }
          function map(msg){
              if(!msg.put || Gun.val.is(msg.put)){ return this.to.next(msg) }
              if(this.as.nix){ this.off() } // TODO: Ugly hack!
              obj_map(msg.put, each, {at: this.as, msg: msg});
              this.to.next(msg);
          }
          function each(v,k){
              if(n_ === k){ return }
              var msg = this.msg, gun = msg.$, at = gun._, cat = this.at, tmp = at.lex;
              if(tmp && !Gun.text.match(k, tmp['.'] || tmp['#'] || tmp)){ return } // review?
              ((tmp = gun.get(k)._).echo || (tmp.echo = {}))[cat.id] = tmp.echo[cat.id] || cat;
          }
          var obj_map = Gun.obj.map, noop = function(){}, event = {stun: noop, off: noop}, n_ = Gun.node._, u;
      })(USE, './map');
  
      ;USE(function(module){
          var Gun = USE('./index');
          Gun.chain.set = function(item, cb, opt){
              var gun = this, soul;
              cb = cb || function(){};
              opt = opt || {}; opt.item = opt.item || item;
              if(soul = Gun.node.soul(item)){ item = Gun.obj.put({}, soul, Gun.val.link.ify(soul)) }
              if(!Gun.is(item)){
                  if(Gun.obj.is(item)){
                      //item = gun.back(-1).get(soul = soul || Gun.node.soul(item) || (gun.back('opt.uuid') || uuid)()).put(item);
                      soul = soul || Gun.node.soul(item) || uuid(); // this just key now, not a soul.
                  }
                  return gun.get(soul || uuid()).put(item, cb, opt);
              }
              item.get(function(soul, o, msg){
                  if(!soul && item._.stun){ item._.on('res', function(){ this.off(); gun.set(item, cb, opt) }); return }
                  if(!soul){ return cb.call(gun, {err: Gun.log('Only a node can be linked! Not "' + msg.put + '"!')}) }
                  gun.put(Gun.obj.put({}, soul, Gun.val.link.ify(soul)), cb, opt);
              },true);
              return item;
          }
          function uuid(){ return Gun.state.lex() + Gun.text.random(7) }
      })(USE, './set');
  
      ;USE(function(module){
          if(typeof Gun === 'undefined'){ return } // TODO: localStorage is Browser only. But it would be nice if it could somehow plugin into NodeJS compatible localStorage APIs?
  
          var root, noop = function(){}, store, u;
          try{store = (Gun.window||noop).localStorage}catch(e){}
          if(!store){
              Gun.log("Warning: No localStorage exists to persist data to!");
              store = {setItem: function(k,v){this[k]=v}, removeItem: function(k){delete this[k]}, getItem: function(k){return this[k]}};
          }
          /*
              NOTE: Both `lib/file.js` and `lib/memdisk.js` are based on this design!
              If you update anything here, consider updating the other adapters as well.
          */
  
          Gun.on('create', function(root){
              // This code is used to queue offline writes for resync.
              // See the next 'opt' code below for actual saving of data.
              var ev = this.to, opt = root.opt;
              if(root.once){ return ev.next(root) }
              if(false === opt.localStorage){ return ev.next(root) } // we want offline resynce queue regardless! // actually, this doesn't help, per @go1dfish 's observation. Disabling for now, will need better solution later.
              opt.prefix = opt.file || 'gun/';
              var gap = Gun.obj.ify(store.getItem('gap/'+opt.prefix)) || {};
              var empty = Gun.obj.empty, id, to, go;
              // add re-sync command.
              if(!empty(gap)){
                  var disk = Gun.obj.ify(store.getItem(opt.prefix)) || {}, send = {};
                  Gun.obj.map(gap, function(node, soul){
                      Gun.obj.map(node, function(val, key){
                          send[soul] = Gun.state.to(disk[soul], key, send[soul]);
                      });
                  });
                  setTimeout(function(){
                      // TODO: Holy Grail dangling by this thread! If gap / offline resync doesn't trigger, it doesn't work. Ouch, and this is a localStorage specific adapter. :(
                      root.on('out', {put: send, '#': root.ask(ack)});
                  },1);
              }
  
              root.on('out', function(msg){
                  if(msg.lS){ return } // TODO: for IndexedDB and others, shouldn't send to peers ACKs to our own GETs. // THIS IS BLOCKING BROWSERS REPLYING TO REQUESTS, NO??? CHANGE THIS SOON!! UNDER CONTROLLED CIRCUMSTANCES!! Or maybe in-memory already doe sit?
                  if(Gun.is(msg.$) && msg.put && !msg['@']){
                      id = msg['#'];
                      Gun.graph.is(msg.put, null, map);
                      if(!to){ to = setTimeout(flush, opt.wait || 1) }
                  }
                  this.to.next(msg);
              });
              root.on('ack', ack);
  
              function ack(ack){ // TODO: This is experimental, not sure if we should keep this type of event hook.
                  if(ack.err || !ack.ok){ return }
                  var id = ack['@'];
                  setTimeout(function(){
                      Gun.obj.map(gap, function(node, soul){
                          Gun.obj.map(node, function(val, key){
                              if(id !== val){ return }
                              delete node[key];
                          });
                          if(empty(node)){
                              delete gap[soul];
                          }
                      });
                      flush();
                  }, opt.wait || 1);
              };
              ev.next(root);
  
              var map = function(val, key, node, soul){
                  (gap[soul] || (gap[soul] = {}))[key] = id;
              }
              var flush = function(){
                  clearTimeout(to);
                  to = false;
                  try{store.setItem('gap/'+opt.prefix, JSON.stringify(gap));
                  }catch(e){ Gun.log(err = e || "localStorage failure") }
              }
          });
  
          Gun.on('create', function(root){
              this.to.next(root);
              var opt = root.opt;
              if(root.once){ return }
              if(false === opt.localStorage){ return }
              opt.prefix = opt.file || 'gun/';
              var graph = root.graph, acks = {}, count = 0, to;
              var disk = Gun.obj.ify(store.getItem(opt.prefix)) || {};
              var lS = function(){}, u;
              root.on('localStorage', disk); // NON-STANDARD EVENT!
  
              root.on('put', function(msg){
                  this.to.next(msg);
                  var put = msg.put, soul = put['#'], key = put['.'], val = put[':'], state = put['>'], tmp;
                  disk[soul] = Gun.state.ify(disk[soul], key, state, val, soul);
                  if(!msg['@']){ (acks[msg['#']] = (tmp = (msg._||'').lot || {})).lS = (tmp.lS||0)+1; } // only ack non-acks.
                  count += 1;
                  if(count >= (opt.batch || 1000)){
                      return flush();
                  }
                  if(to){ return }
                  to = setTimeout(flush, opt.wait || 1);
              });
  
              root.on('get', function(msg){
                  this.to.next(msg);
                  var lex = msg.get, soul, data, u;
                  function to(){
                  if(!lex || !(soul = lex['#'])){ return }
                  //if(0 >= msg.cap){ return }
                  var has = lex['.'];
                  data = disk[soul] || u;
                  if(data && has){
                      data = Gun.state.to(data, has);
                  }
                  //if(!data && !Gun.obj.empty(opt.peers)){ return } // if data not found, don't ack if there are peers. // Hmm, what if we have peers but we are disconnected?
                  root.on('in', {'@': msg['#'], put: Gun.graph.node(data), lS:1});// || root.$});
                  };
                  Gun.debug? setTimeout(to,1) : to();
              });
  
              var map = function(val, key, node, soul){
                  disk[soul] = Gun.state.to(node, key, disk[soul]);
              }
  
              var flush = function(data){
                  var err;
                  count = 0;
                  clearTimeout(to);
                  to = false;
                  var ack = acks;
                  acks = {};
                  if(data){ disk = data }
                  try{store.setItem(opt.prefix, JSON.stringify(disk));
                  }catch(e){
                      Gun.log(err = (e || "localStorage failure") + " Consider using GUN's IndexedDB plugin for RAD for more storage space, https://gun.eco/docs/RAD#install");
                      root.on('localStorage:error', {err: err, file: opt.prefix, flush: disk, retry: flush});
                  }
                  if(!err && !Gun.obj.empty(opt.peers)){ return } // only ack if there are no peers.
                  Gun.obj.map(ack, function(yes, id){
                      if(yes){
                          if(yes.more){ acks[id] = yes; return }
                          if(yes.s !== yes.lS){ err = "localStorage batch not same." }
                      }
                      root.on('in', {
                          '@': id,
                          err: err,
                          ok: 0 // localStorage isn't reliable, so make its `ok` code be a low number.
                      });
                  });
              }
          });
      })(USE, './adapters/localStorage');
  
      ;USE(function(module){
          var Type = USE('../type');
  
          function Mesh(root){
              var mesh = function(){};
              var opt = root.opt || {};
              opt.log = opt.log || console.log;
              opt.gap = opt.gap || opt.wait || 0;
              opt.pack = opt.pack || (opt.memory? (opt.memory * 1000 * 1000) : 1399000000) * 0.3; // max_old_space_size defaults to 1400 MB.
              opt.puff = opt.puff || 9; // IDEA: do a start/end benchmark, divide ops/result.
              var puff = setTimeout.puff || setTimeout;
  
              var dup = root.dup, dup_check = dup.check, dup_track = dup.track;
  
              var hear = mesh.hear = function(raw, peer){
                  if(!raw){ return }
                  if(opt.pack <= raw.length){ return mesh.say({dam: '!', err: "Message too big!"}, peer) }
                  var msg, id, hash, tmp = raw[0], DBG;
                  if(mesh === this){ hear.d += raw.length||0 ; ++hear.c } // STATS!
                  if('[' === tmp){
                      try{msg = JSON.parse(raw)}catch(e){opt.log('DAM JSON parse error', e)}
                      raw = '';
                      if(!msg){ return }
                      console.STAT && console.STAT(+new Date, msg.length, '# on hear batch');
                      var P = opt.puff;
                      (function go(){
                          var S = +new Date;
                          //var P = peer.puff || opt.puff, s = +new Date; // TODO: For future, but in mix?
                          var i = 0, m; while(i < P && (m = msg[i++])){ hear(m, peer) }
                          //peer.puff = Math.ceil((+new Date - s)? P * 1.1 : P * 0.9);
                          msg = msg.slice(i); // slicing after is faster than shifting during.
                          console.STAT && console.STAT(S, +new Date - S, 'hear loop');
                          flush(peer); // force send all synchronously batched acks.
                          if(!msg.length){ return }
                          puff(go, 0);
                      }());
                      return;
                  }
                  if('{' === tmp || ((raw['#'] || obj_is(raw)) && (msg = raw))){
                      try{msg = msg || JSON.parse(raw);
                      }catch(e){return opt.log('DAM JSON parse error', e)}
                      if(!msg){ return }
                      if(msg.DBG){ msg.DBG = DBG = {DBG: msg.DBG} }
                      DBG && (DBG.hp = +new Date);
                      if(!(id = msg['#'])){ id = msg['#'] = Type.text.random(9) }
                      if(tmp = dup_check(id)){ return }
                      /*if(!(hash = msg['##']) && u !== msg.put){ hash = msg['##'] = Type.obj.hash(msg.put) }
                      if(hash && (tmp = msg['@'] || (msg.get && id))){ // Reduces backward daisy in case varying hashes at different daisy depths are the same.
                          if(dup.check(tmp+hash)){ return }
                          dup.track(tmp+hash, true).it = it(msg); // GUN core also dedups, so `true` is needed. // Does GUN core need to dedup anymore?
                      }
                      if(tmp = msg['><']){ (msg._).to = Type.obj.map(tmp.split(','), tomap) }
                      */ // TOOD: COME BACK TO THIS LATER!!! IMPORTANT MESH STUFF!!
                      (msg._ = function(){}).via = mesh.leap = peer;
                      if(tmp = msg.dam){
                          if(tmp = mesh.hear[tmp]){
                              tmp(msg, peer, root);
                          }
                          dup_track(id);
                          return;
                      }
                      var S = +new Date, ST;
                      DBG && (DBG.is = S);
                      root.on('in', msg);
                      //ECHO = msg.put || ECHO; !(msg.ok !== -3740) && mesh.say({ok: -3740, put: ECHO, '@': msg['#']}, peer);
                      DBG && (DBG.hd = +new Date);
                      console.STAT && (ST = +new Date - S) > 9 && console.STAT(S, ST, 'msg'); // TODO: PERF: caught one > 1.5s on tgif
                      dup_track(id).via = peer;
                      mesh.leap = null; // warning! mesh.leap could be buggy.
                  }
              }
              var tomap = function(k,i,m){m(k,true)};
              var noop = function(){};
              hear.c = hear.d = 0;
  
              ;(function(){
                  var SMIA = 0;
                  var message, loop;
                  function each(peer){ mesh.say(message, peer) }
                  var say = mesh.say = function(msg, peer){ var tmp;
                      if((tmp = this) && (tmp = tmp.to) && tmp.next){ tmp.next(msg) } // compatible with middleware adapters.
                      if(!msg){ return false }
                      var id, hash, raw;
                      var DBG = msg.DBG, S; if(!peer){ S = +new Date ; DBG && (DBG.y = S) }
                      var meta = msg._||(msg._=function(){});
                      if(!(id = msg['#'])){ id = msg['#'] = Type.text.random(9) }
                      //if(!(hash = msg['##']) && u !== msg.put){ hash = msg['##'] = Type.obj.hash(msg.put) }
                      if(!(raw = meta.raw)){
                          raw = mesh.raw(msg);
                          /*if(hash && (tmp = msg['@'])){
                              dup.track(tmp+hash).it = it(msg);
                              if(tmp = (dup.s[tmp]||ok).it){
                                  if(hash === tmp['##']){ return false }
                                  tmp['##'] = hash;
                              }
                          }*/
                      }
                      S && console.STAT && console.STAT(S, +new Date - S, 'say prep');
                      !loop && dup_track(id);//.it = it(msg); // track for 9 seconds, default. Earth<->Mars would need more! // always track, maybe move this to the 'after' logic if we split function.
                      //console.log("SEND!", JSON.parse(JSON.stringify(msg)));
                      if(!peer && (tmp = msg['@'])){ peer = ((tmp = dup.s[tmp]) && (tmp.via || ((tmp = tmp.it) && (tmp = tmp._) && tmp.via))) || mesh.leap } // warning! mesh.leap could be buggy!
                      if(!peer && msg['@']){
                          console.STAT && console.STAT(+new Date, ++SMIA, 'total no peer to ack to');
                          return false;
                      } // TODO: Temporary? If ack via trace has been lost, acks will go to all peers, which trashes browser bandwidth. Not relaying the ack will force sender to ask for ack again. Note, this is technically wrong for mesh behavior.
                      if(!peer && mesh.way){ return mesh.way(msg) }
                      if(!peer || !peer.id){ message = msg;
                          if(!Type.obj.is(peer || opt.peers)){ return false }
                          var P = opt.puff, ps = opt.peers, pl = Object.keys(peer || opt.peers || {}); // TODO: BETTER PERF? No object.keys? It is polyfilled by Type.js tho.
                          ;(function go(){
                              var S = +new Date;
                              //Type.obj.map(peer || opt.peers, each); // in case peer is a peer list.
                              loop = 1; var wr = meta.raw; meta.raw = raw; // quick perf hack
                              var i = 0, p; while(i < 9 && (p = (pl||'')[i++])){
                                  if(!(p = ps[p])){ continue }
                                  say(msg, p);
                              }
                              meta.raw = wr; loop = 0;
                              pl = pl.slice(i); // slicing after is faster than shifting during.
                              console.STAT && console.STAT(S, +new Date - S, 'say loop');
                              if(!pl.length){ return }
                              puff(go, 0);
                              dup_track(msg['@']); // keep for later
                          }());
                          return;
                      }
                      // TODO: PERF: consider splitting function here, so say loops do less work.
                      if(!peer.wire && mesh.wire){ mesh.wire(peer) }
                      if(id === peer.last){ return } peer.last = id;  // was it just sent?
                      if(peer === meta.via){ return false } // don't send back to self.
                      if((tmp = meta.to) && (tmp[peer.url] || tmp[peer.pid] || tmp[peer.id]) /*&& !o*/){ return false }
                      if(peer.batch){
                          peer.tail = (tmp = peer.tail || 0) + raw.length;
                          if(peer.tail <= opt.pack){
                              //peer.batch.push(raw);
                              peer.batch += (tmp?',':'')+raw; // TODO: Prevent double JSON! // FOR v1.0 !?
                              return;
                          }
                          flush(peer);
                      }
                      //peer.batch = [];
                      peer.batch = '['; // TODO: Prevent double JSON!
                      var S = +new Date, ST;
                      setTimeout(function(){
                          console.STAT && (ST = +new Date - S) > 9 && console.STAT(S, ST, '0ms TO', id, peer.id);
                          flush(peer);
                      }, opt.gap);
                      send(raw, peer);
                  }
                  mesh.say.c = mesh.say.d = 0;
              }());
  
              function flush(peer){
                  var tmp = peer.batch, t = 'string' == typeof tmp, l;
                  if(t){ tmp += ']' }// TODO: Prevent double JSON!
                  peer.batch = peer.tail = null;
                  if(!tmp){ return }
                  if(t? 3 > tmp.length : !tmp.length){ return } // TODO: ^
                  if(!t){try{tmp = (1 === tmp.length? tmp[0] : JSON.stringify(tmp));
                  }catch(e){return opt.log('DAM JSON stringify error', e)}}
                  if(!tmp){ return }
                  send(tmp, peer);
              }
              // for now - find better place later.
              function send(raw, peer){ try{
                  var wire = peer.wire;
                  if(peer.say){
                      peer.say(raw);
                  } else
                  if(wire.send){
                      wire.send(raw);
                  }
                  mesh.say.d += raw.length||0; ++mesh.say.c; // STATS!
              }catch(e){
                  (peer.queue = peer.queue || []).push(raw);
              }}
  
              ;(function(){
                  // TODO: this caused a out-of-memory crash!
                  mesh.raw = function(msg){ // TODO: Clean this up / delete it / move logic out!
                      if(!msg){ return '' }
                      var meta = (msg._) || {}, put, hash, tmp;
                      if(tmp = meta.raw){ return tmp }
                      if('string' == typeof msg){ return msg }
                      /*if(!msg.dam){ // TOOD: COME BACK TO THIS LATER!!! IMPORTANT MESH STUFF!!
                          var i = 0, to = []; Type.obj.map(opt.peers, function(p){
                              to.push(p.url || p.pid || p.id); if(++i > 3){ return true } // limit server, fast fix, improve later! // For "tower" peer, MUST include 6 surrounding ids. // REDUCED THIS TO 3 for temporary relay peer performance, towers still should list neighbors.
                          }); if(i > 1){ msg['><'] = to.join() }
                      }*/  // TOOD: COME BACK TO THIS LATER!!! IMPORTANT MESH STUFF!!
                      var raw = $(msg); // optimize by reusing put = the JSON.stringify from .hash?
                      /*if(u !== put){
                          tmp = raw.indexOf(_, raw.indexOf('put'));
                          raw = raw.slice(0, tmp-1) + put + raw.slice(tmp + _.length + 1);
                          //raw = raw.replace('"'+ _ +'"', put); // NEVER USE THIS! ALSO NEVER DELETE IT TO NOT MAKE SAME MISTAKE! https://github.com/amark/gun/wiki/@$$ Heisenbug
                      }*/
                      // TODO: PERF: tgif, CPU way too much on re-JSONifying ^ it.
                      /*
                          // NOTE TO SELF: Switch NTS to DAM now.
                      */
                      if(meta && (raw||'').length < (1000 * 100)){ meta.raw = raw } // HNPERF: If string too big, don't keep in memory.
                      return raw;
                  }
                  var $ = JSON.stringify, _ = ':])([:';
  
              }());
  
              mesh.hi = function(peer){
                  var tmp = peer.wire || {};
                  if(peer.id){
                      opt.peers[peer.url || peer.id] = peer;
                  } else {
                      tmp = peer.id = peer.id || Type.text.random(9);
                      mesh.say({dam: '?', pid: root.opt.pid}, opt.peers[tmp] = peer);
                      delete dup.s[peer.last]; // IMPORTANT: see https://gun.eco/docs/DAM#self
                  }
                  peer.met = peer.met || +(new Date);
                  if(!tmp.hied){ root.on(tmp.hied = 'hi', peer) }
                  // @rogowski I need this here by default for now to fix go1dfish's bug
                  tmp = peer.queue; peer.queue = [];
                  Type.obj.map(tmp, function(msg){
                      send(msg, peer);
                  });
                  Type.obj.native && Type.obj.native(); // dirty place to check if other JS polluted.
              }
              mesh.bye = function(peer){
                  root.on('bye', peer);
                  var tmp = +(new Date); tmp = (tmp - (peer.met||tmp));
                  mesh.bye.time = ((mesh.bye.time || tmp) + tmp) / 2;
              }
              mesh.hear['!'] = function(msg, peer){ opt.log('Error:', msg.err) }
              mesh.hear['?'] = function(msg, peer){
                  if(msg.pid){
                      if(!peer.pid){ peer.pid = msg.pid }
                      if(msg['@']){ return }
                  }
                  mesh.say({dam: '?', pid: opt.pid, '@': msg['#']}, peer);
                  delete dup.s[peer.last]; // IMPORTANT: see https://gun.eco/docs/DAM#self
              }
  
              root.on('create', function(root){
                  root.opt.pid = root.opt.pid || Type.text.random(9);
                  this.to.next(root);
                  root.on('out', mesh.say);
              });
  
              root.on('bye', function(peer, tmp){
                  peer = opt.peers[peer.id || peer] || peer;
                  this.to.next(peer);
                  peer.bye? peer.bye() : (tmp = peer.wire) && tmp.close && tmp.close();
                  Type.obj.del(opt.peers, peer.id);
                  peer.wire = null;
              });
  
              var gets = {};
              root.on('bye', function(peer, tmp){ this.to.next(peer);
                  if(!(tmp = peer.url)){ return } gets[tmp] = true;
                  setTimeout(function(){ delete gets[tmp] },opt.lack || 9000);
              });
              root.on('hi', function(peer, tmp){ this.to.next(peer);
                  if(!(tmp = peer.url) || !gets[tmp]){ return } delete gets[tmp];
                  if(opt.super){ return } // temporary (?) until we have better fix/solution?
                  Type.obj.map(root.next, function(node, soul){
                      tmp = {}; tmp[soul] = root.graph[soul];
                      mesh.say({'##': Type.obj.hash(tmp), get: {'#': soul}}, peer);
                  })
              });
  
              return mesh;
          }
  
          ;(function(){
              var $ = JSON.stringify, u;
  
              Type.obj.hash = function(obj, hash){
                  if(!hash && u === (obj = $(obj, sort))){ return }
                  return Type.text.hash(hash || obj || '');
              }
  
              function sort(k, v){ var tmp;
                  if(!(v instanceof Object)){ return v }
                  var S = +new Date;
                  Type.obj.map(Object.keys(v).sort(), map, {to: tmp = {}, on: v});
                  console.STAT && console.STAT(S, +new Date - S, 'sort');
                  return tmp;
              }
              Type.obj.hash.sort = sort;
  
              function map(k){
                  this.to[k] = this.on[k];
              }
          }());
  
          function it(msg){ return msg || {_: msg._, '##': msg['##']} } // HNPERF: Only need some meta data, not full reference (took up too much memory). // HNPERF: Garrrgh! We add meta data to msg over time, copying the object happens to early.
  
        var empty = {}, ok = true, u;
          var obj_is = Type.obj.is, obj_map = Type.obj.map;
  
        try{ module.exports = Mesh }catch(e){}
  
      })(USE, './adapters/mesh');
  
      ;USE(function(module){
          var Gun = USE('../index');
          Gun.Mesh = USE('./mesh');
  
          Gun.on('opt', function(root){
              this.to.next(root);
              var opt = root.opt;
              if(root.once){ return }
              if(false === opt.WebSocket){ return }
  
              var env;
              if(typeof window !== "undefined"){ env = window }
              if(typeof global !== "undefined"){ env = global }
              env = env || {};
  
              var websocket = opt.WebSocket || env.WebSocket || env.webkitWebSocket || env.mozWebSocket;
              if(!websocket){ return }
              opt.WebSocket = websocket;
  
              var mesh = opt.mesh = opt.mesh || Gun.Mesh(root);
  
              var wire = mesh.wire || opt.wire;
              mesh.wire = opt.wire = open;
              function open(peer){ try{
                  if(!peer || !peer.url){ return wire && wire(peer) }
                  var url = peer.url.replace(/^http/, 'ws');
                  var wire = peer.wire = new opt.WebSocket(url);
                  wire.onclose = function(){
                      opt.mesh.bye(peer);
                      reconnect(peer);
                  };
                  wire.onerror = function(error){
                      reconnect(peer);
                  };
                  wire.onopen = function(){
                      opt.mesh.hi(peer);
                  }
                  wire.onmessage = function(msg){
                      if(!msg){ return }
                      opt.mesh.hear(msg.data || msg, peer);
                  };
                  return wire;
              }catch(e){}}
  
              setTimeout(function(){ root.on('out', {dam:'hi'}) },1); // it can take a while to open a socket, so maybe no longer lazy load for perf reasons?
  
              var wait = 2 * 1000;
              function reconnect(peer){
                  clearTimeout(peer.defer);
                  if(doc && peer.retry <= 0){ return } peer.retry = (peer.retry || opt.retry || 60) - 1;
                  peer.defer = setTimeout(function to(){
                      if(doc && doc.hidden){ return setTimeout(to,wait) }
                      open(peer);
                  }, wait);
              }
              var doc = 'undefined' !== typeof document && document;
          });
          var noop = function(){};
      })(USE, './adapters/websocket');
  
  }());

  ;(function(){

    /* UNBUILD */
    function USE(arg, req){
      return req? require(arg) : arg.slice? USE[R(arg)] : function(mod, path){
        arg(mod = {exports: {}});
        USE[R(path)] = mod.exports;
      }
      function R(p){
        return p.split('/').slice(-1).toString().replace('.js','');
      }
    }
    if(typeof module !== "undefined"){ var MODULE = module }
    /* UNBUILD */
  
    ;USE(function(module){
      // Security, Encryption, and Authorization: SEA.js
      // MANDATORY READING: https://gun.eco/explainers/data/security.html
      // IT IS IMPLEMENTED IN A POLYFILL/SHIM APPROACH.
      // THIS IS AN EARLY ALPHA!
  
      if(typeof window !== "undefined"){ module.window = window }
  
      var tmp = module.window || module;
      var SEA = tmp.SEA || {};
  
      if(SEA.window = module.window){ SEA.window.SEA = SEA }
  
      try{ if(typeof MODULE !== "undefined"){ MODULE.exports = SEA } }catch(e){}
      module.exports = SEA;
    })(USE, './root');
  
    ;USE(function(module){
      var SEA = USE('./root');
      try{ if(SEA.window){
        if(location.protocol.indexOf('s') < 0
        && location.host.indexOf('localhost') < 0
        && ! /^127\.\d+\.\d+\.\d+$/.test(location.hostname)
        && location.protocol.indexOf('file:') < 0){
          console.warn('WebCrypto used by GUN SEA implementation does not work without HTTPS. Will automatically redirect.')
          location.protocol = 'https:'; // WebCrypto does NOT work without HTTPS!
        }
      } }catch(e){}
    })(USE, './https');
  
    ;USE(function(module){
      if(typeof btoa === "undefined"){
        if(typeof Buffer === "undefined") {
          global.Buffer = require("buffer").Buffer
        }
        global.btoa = function (data) { return Buffer.from(data, "binary").toString("base64"); };
        global.atob = function (data) { return Buffer.from(data, "base64").toString("binary"); };
      }
    })(USE, './base64');
  
    ;USE(function(module){
      USE('./base64');
      // This is Array extended to have .toString(['utf8'|'hex'|'base64'])
      function SeaArray() {}
      Object.assign(SeaArray, { from: Array.from })
      SeaArray.prototype = Object.create(Array.prototype)
      SeaArray.prototype.toString = function(enc, start, end) { enc = enc || 'utf8'; start = start || 0;
        const length = this.length
        if (enc === 'hex') {
          const buf = new Uint8Array(this)
          return [ ...Array(((end && (end + 1)) || length) - start).keys()]
          .map((i) => buf[ i + start ].toString(16).padStart(2, '0')).join('')
        }
        if (enc === 'utf8') {
          return Array.from(
            { length: (end || length) - start },
            (_, i) => String.fromCharCode(this[ i + start])
          ).join('')
        }
        if (enc === 'base64') {
          return btoa(this)
        }
      }
      module.exports = SeaArray;
    })(USE, './array');
  
    ;USE(function(module){
      USE('./base64');
      // This is Buffer implementation used in SEA. Functionality is mostly
      // compatible with NodeJS 'safe-buffer' and is used for encoding conversions
      // between binary and 'hex' | 'utf8' | 'base64'
      // See documentation and validation for safe implementation in:
      // https://github.com/feross/safe-buffer#update
      var SeaArray = USE('./array');
      function SafeBuffer(...props) {
        console.warn('new SafeBuffer() is depreciated, please use SafeBuffer.from()')
        return SafeBuffer.from(...props)
      }
      SafeBuffer.prototype = Object.create(Array.prototype)
      Object.assign(SafeBuffer, {
        // (data, enc) where typeof data === 'string' then enc === 'utf8'|'hex'|'base64'
        from() {
          if (!Object.keys(arguments).length || arguments[0]==null) {
            throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
          }
          const input = arguments[0]
          let buf
          if (typeof input === 'string') {
            const enc = arguments[1] || 'utf8'
            if (enc === 'hex') {
              const bytes = input.match(/([\da-fA-F]{2})/g)
              .map((byte) => parseInt(byte, 16))
              if (!bytes || !bytes.length) {
                throw new TypeError('Invalid first argument for type \'hex\'.')
              }
              buf = SeaArray.from(bytes)
            } else if (enc === 'utf8') {
              const length = input.length
              const words = new Uint16Array(length)
              Array.from({ length: length }, (_, i) => words[i] = input.charCodeAt(i))
              buf = SeaArray.from(words)
            } else if (enc === 'base64') {
              const dec = atob(input)
              const length = dec.length
              const bytes = new Uint8Array(length)
              Array.from({ length: length }, (_, i) => bytes[i] = dec.charCodeAt(i))
              buf = SeaArray.from(bytes)
            } else if (enc === 'binary') {
              buf = SeaArray.from(input)
            } else {
              console.info('SafeBuffer.from unknown encoding: '+enc)
            }
            return buf
          }
          const byteLength = input.byteLength // what is going on here? FOR MARTTI
          const length = input.byteLength ? input.byteLength : input.length
          if (length) {
            let buf
            if (input instanceof ArrayBuffer) {
              buf = new Uint8Array(input)
            }
            return SeaArray.from(buf || input)
          }
        },
        // This is 'safe-buffer.alloc' sans encoding support
        alloc(length, fill = 0 /*, enc*/ ) {
          return SeaArray.from(new Uint8Array(Array.from({ length: length }, () => fill)))
        },
        // This is normal UNSAFE 'buffer.alloc' or 'new Buffer(length)' - don't use!
        allocUnsafe(length) {
          return SeaArray.from(new Uint8Array(Array.from({ length : length })))
        },
        // This puts together array of array like members
        concat(arr) { // octet array
          if (!Array.isArray(arr)) {
            throw new TypeError('First argument must be Array containing ArrayBuffer or Uint8Array instances.')
          }
          return SeaArray.from(arr.reduce((ret, item) => ret.concat(Array.from(item)), []))
        }
      })
      SafeBuffer.prototype.from = SafeBuffer.from
      SafeBuffer.prototype.toString = SeaArray.prototype.toString
  
      module.exports = SafeBuffer;
    })(USE, './buffer');
  
    ;USE(function(module){
      const SEA = USE('./root')
      const Buffer = USE('./buffer')
      const api = {Buffer: Buffer}
      var o = {};
  
      if(SEA.window){
        api.crypto = window.crypto || window.msCrypto
        api.subtle = (api.crypto||o).subtle || (api.crypto||o).webkitSubtle;
        api.TextEncoder = window.TextEncoder;
        api.TextDecoder = window.TextDecoder;
        api.random = (len) => Buffer.from(api.crypto.getRandomValues(new Uint8Array(Buffer.alloc(len))));
      }
      if(!api.TextDecoder)
      {
        const { TextEncoder, TextDecoder } = require('text-encoding');
        api.TextDecoder = TextDecoder;
        api.TextEncoder = TextEncoder;
      }
      if(!api.crypto)
      {
        try
        {
        var crypto = USE('crypto', 1);
        Object.assign(api, {
          crypto,
          random: (len) => Buffer.from(crypto.randomBytes(len))
        });      
        const { Crypto: WebCrypto } = USE('@peculiar/webcrypto', 1);
        api.ossl = api.subtle = new WebCrypto({directory: 'ossl'}).subtle // ECDH
      }
      catch(e){
        console.log("text-encoding and @peculiar/webcrypto may not be included by default, please add it to your package.json!");
      }}
  
      module.exports = api
    })(USE, './shim');
  
    ;USE(function(module){
      var SEA = USE('./root');
      var Buffer = USE('./buffer');
      var s = {};
      s.pbkdf2 = {hash: {name : 'SHA-256'}, iter: 100000, ks: 64};
      s.ecdsa = {
        pair: {name: 'ECDSA', namedCurve: 'P-256'},
        sign: {name: 'ECDSA', hash: {name: 'SHA-256'}}
      };
      s.ecdh = {name: 'ECDH', namedCurve: 'P-256'};
  
      // This creates Web Cryptography API compliant JWK for sign/verify purposes
      s.jwk = function(pub, d){  // d === priv
        pub = pub.split('.');
        var x = pub[0], y = pub[1];
        var jwk = {kty: "EC", crv: "P-256", x: x, y: y, ext: true};
        jwk.key_ops = d ? ['sign'] : ['verify'];
        if(d){ jwk.d = d }
        return jwk;
      };
      
      s.keyToJwk = function(keyBytes) {
        const keyB64 = keyBytes.toString('base64');
        const k = keyB64.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
        return { kty: 'oct', k: k, ext: false, alg: 'A256GCM' };
      }
  
      s.recall = {
        validity: 12 * 60 * 60, // internally in seconds : 12 hours
        hook: function(props){ return props } // { iat, exp, alias, remember } // or return new Promise((resolve, reject) => resolve(props)
      };
  
      s.check = function(t){ return (typeof t == 'string') && ('SEA{' === t.slice(0,4)) }
      s.parse = function p(t){ try {
        var yes = (typeof t == 'string');
        if(yes && 'SEA{' === t.slice(0,4)){ t = t.slice(3) }
        return yes ? JSON.parse(t) : t;
        } catch (e) {}
        return t;
      }
  
      SEA.opt = s;
      module.exports = s
    })(USE, './settings');
  
    ;USE(function(module){
      var shim = USE('./shim');
      module.exports = async function(d, o){
        var t = (typeof d == 'string')? d : JSON.stringify(d);
        var hash = await shim.subtle.digest({name: o||'SHA-256'}, new shim.TextEncoder().encode(t));
        return shim.Buffer.from(hash);
      }
    })(USE, './sha256');
  
    ;USE(function(module){
      // This internal func returns SHA-1 hashed data for KeyID generation
      const __shim = USE('./shim')
      const subtle = __shim.subtle
      const ossl = __shim.ossl ? __shim.ossl : subtle
      const sha1hash = (b) => ossl.digest({name: 'SHA-1'}, new ArrayBuffer(b))
      module.exports = sha1hash
    })(USE, './sha1');
  
    ;USE(function(module){
      var SEA = USE('./root');
      var shim = USE('./shim');
      var S = USE('./settings');
      var sha = USE('./sha256');
      var u;
  
      SEA.work = SEA.work || (async (data, pair, cb, opt) => { try { // used to be named `proof`
        var salt = (pair||{}).epub || pair; // epub not recommended, salt should be random!
        opt = opt || {};
        if(salt instanceof Function){
          cb = salt;
          salt = u;
        }
        data = (typeof data == 'string')? data : JSON.stringify(data);
        if('sha' === (opt.name||'').toLowerCase().slice(0,3)){
          var rsha = shim.Buffer.from(await sha(data, opt.name), 'binary').toString(opt.encode || 'base64')
          if(cb){ try{ cb(rsha) }catch(e){console.log(e)} }
          return rsha;
        }
        salt = salt || shim.random(9);
        var key = await (shim.ossl || shim.subtle).importKey('raw', new shim.TextEncoder().encode(data), {name: opt.name || 'PBKDF2'}, false, ['deriveBits']);
        var work = await (shim.ossl || shim.subtle).deriveBits({
          name: opt.name || 'PBKDF2',
          iterations: opt.iterations || S.pbkdf2.iter,
          salt: new shim.TextEncoder().encode(opt.salt || salt),
          hash: opt.hash || S.pbkdf2.hash,
        }, key, opt.length || (S.pbkdf2.ks * 8))
        data = shim.random(data.length)  // Erase data in case of passphrase
        var r = shim.Buffer.from(work, 'binary').toString(opt.encode || 'base64')
        if(cb){ try{ cb(r) }catch(e){console.log(e)} }
        return r;
      } catch(e) { 
        console.log(e);
        SEA.err = e;
        if(SEA.throw){ throw e }
        if(cb){ cb() }
        return;
      }});
  
      module.exports = SEA.work;
    })(USE, './work');
  
    ;USE(function(module){
      var SEA = USE('./root');
      var shim = USE('./shim');
      var S = USE('./settings');
  
      SEA.name = SEA.name || (async (cb, opt) => { try {
        if(cb){ try{ cb() }catch(e){console.log(e)} }
        return;
      } catch(e) {
        console.log(e);
        SEA.err = e;
        if(SEA.throw){ throw e }
        if(cb){ cb() }
        return;
      }});
  
      //SEA.pair = async (data, proof, cb) => { try {
      SEA.pair = SEA.pair || (async (cb, opt) => { try {
  
        var ecdhSubtle = shim.ossl || shim.subtle;
        // First: ECDSA keys for signing/verifying...
        var sa = await shim.subtle.generateKey({name: 'ECDSA', namedCurve: 'P-256'}, true, [ 'sign', 'verify' ])
        .then(async (keys) => {
          // privateKey scope doesn't leak out from here!
          //const { d: priv } = await shim.subtle.exportKey('jwk', keys.privateKey)
          var key = {};
          key.priv = (await shim.subtle.exportKey('jwk', keys.privateKey)).d;
          var pub = await shim.subtle.exportKey('jwk', keys.publicKey);
          //const pub = Buff.from([ x, y ].join(':')).toString('base64') // old
          key.pub = pub.x+'.'+pub.y; // new
          // x and y are already base64
          // pub is UTF8 but filename/URL safe (https://www.ietf.org/rfc/rfc3986.txt)
          // but split on a non-base64 letter.
          return key;
        })
        
        // To include PGPv4 kind of keyId:
        // const pubId = await SEA.keyid(keys.pub)
        // Next: ECDH keys for encryption/decryption...
  
        try{
        var dh = await ecdhSubtle.generateKey({name: 'ECDH', namedCurve: 'P-256'}, true, ['deriveKey'])
        .then(async (keys) => {
          // privateKey scope doesn't leak out from here!
          var key = {};
          key.epriv = (await ecdhSubtle.exportKey('jwk', keys.privateKey)).d;
          var pub = await ecdhSubtle.exportKey('jwk', keys.publicKey);
          //const epub = Buff.from([ ex, ey ].join(':')).toString('base64') // old
          key.epub = pub.x+'.'+pub.y; // new
          // ex and ey are already base64
          // epub is UTF8 but filename/URL safe (https://www.ietf.org/rfc/rfc3986.txt)
          // but split on a non-base64 letter.
          return key;
        })
        }catch(e){
          if(SEA.window){ throw e }
          if(e == 'Error: ECDH is not a supported algorithm'){ console.log('Ignoring ECDH...') }
          else { throw e }
        } dh = dh || {};
  
        var r = { pub: sa.pub, priv: sa.priv, /* pubId, */ epub: dh.epub, epriv: dh.epriv }
        if(cb){ try{ cb(r) }catch(e){console.log(e)} }
        return r;
      } catch(e) {
        console.log(e);
        SEA.err = e;
        if(SEA.throw){ throw e }
        if(cb){ cb() }
        return;
      }});
  
      module.exports = SEA.pair;
    })(USE, './pair');
  
    ;USE(function(module){
      var SEA = USE('./root');
      var shim = USE('./shim');
      var S = USE('./settings');
      var sha = USE('./sha256');
      var u;
  
      SEA.sign = SEA.sign || (async (data, pair, cb, opt) => { try {
        opt = opt || {};
        if(!(pair||opt).priv){
          pair = await SEA.I(null, {what: data, how: 'sign', why: opt.why});
        }
        if(u === data){ throw '`undefined` not allowed.' }
        var json = S.parse(data);
        var check = opt.check = opt.check || json;
        if(SEA.verify && (SEA.opt.check(check) || (check && check.s && check.m))
        && u !== await SEA.verify(check, pair)){ // don't sign if we already signed it.
          var r = S.parse(check);
          if(!opt.raw){ r = 'SEA'+JSON.stringify(r) }
          if(cb){ try{ cb(r) }catch(e){console.log(e)} }
          return r;
        }
        var pub = pair.pub;
        var priv = pair.priv;
        var jwk = S.jwk(pub, priv);
        var hash = await sha(json);
        var sig = await (shim.ossl || shim.subtle).importKey('jwk', jwk, {name: 'ECDSA', namedCurve: 'P-256'}, false, ['sign'])
        .then((key) => (shim.ossl || shim.subtle).sign({name: 'ECDSA', hash: {name: 'SHA-256'}}, key, new Uint8Array(hash))) // privateKey scope doesn't leak out from here!
        var r = {m: json, s: shim.Buffer.from(sig, 'binary').toString(opt.encode || 'base64')}
        if(!opt.raw){ r = 'SEA'+JSON.stringify(r) }
  
        if(cb){ try{ cb(r) }catch(e){console.log(e)} }
        return r;
      } catch(e) {
        console.log(e);
        SEA.err = e;
        if(SEA.throw){ throw e }
        if(cb){ cb() }
        return;
      }});
  
      module.exports = SEA.sign;
    })(USE, './sign');
  
    ;USE(function(module){
      var SEA = USE('./root');
      var shim = USE('./shim');
      var S = USE('./settings');
      var sha = USE('./sha256');
      var u;
  
      SEA.verify = SEA.verify || (async (data, pair, cb, opt) => { try {
        var json = S.parse(data);
        if(false === pair){ // don't verify!
          var raw = S.parse(json.m);
          if(cb){ try{ cb(raw) }catch(e){console.log(e)} }
          return raw;
        }
        opt = opt || {};
        // SEA.I // verify is free! Requires no user permission.
        var pub = pair.pub || pair;
        var key = SEA.opt.slow_leak? await SEA.opt.slow_leak(pub) : await (shim.ossl || shim.subtle).importKey('jwk', S.jwk(pub), {name: 'ECDSA', namedCurve: 'P-256'}, false, ['verify']);
        var hash = await sha(json.m);
        var buf, sig, check, tmp; try{
          buf = shim.Buffer.from(json.s, opt.encode || 'base64'); // NEW DEFAULT!
          sig = new Uint8Array(buf);
          check = await (shim.ossl || shim.subtle).verify({name: 'ECDSA', hash: {name: 'SHA-256'}}, key, sig, new Uint8Array(hash));
          if(!check){ throw "Signature did not match." }
        }catch(e){
          if(SEA.opt.fallback){
            return await SEA.opt.fall_verify(data, pair, cb, opt);
          }
        }
        var r = check? S.parse(json.m) : u;
  
        if(cb){ try{ cb(r) }catch(e){console.log(e)} }
        return r;
      } catch(e) {
        console.log(e); // mismatched owner FOR MARTTI
        SEA.err = e;
        if(SEA.throw){ throw e }
        if(cb){ cb() }
        return;
      }});
  
      module.exports = SEA.verify;
      // legacy & ossl leak mitigation:
  
      var knownKeys = {};
      var keyForPair = SEA.opt.slow_leak = pair => {
        if (knownKeys[pair]) return knownKeys[pair];
        var jwk = S.jwk(pair);
        knownKeys[pair] = (shim.ossl || shim.subtle).importKey("jwk", jwk, {name: 'ECDSA', namedCurve: 'P-256'}, false, ["verify"]);
        return knownKeys[pair];
      };
  
      var O = SEA.opt;
      SEA.opt.fall_verify = async function(data, pair, cb, opt, f){
        if(f === SEA.opt.fallback){ throw "Signature did not match" } f = f || 1;
        var tmp = data||'';
        data = SEA.opt.unpack(data) || data;
        var json = S.parse(data), pub = pair.pub || pair, key = await SEA.opt.slow_leak(pub);
        var hash = (f <= SEA.opt.fallback)? shim.Buffer.from(await shim.subtle.digest({name: 'SHA-256'}, new shim.TextEncoder().encode(S.parse(json.m)))) : await sha(json.m); // this line is old bad buggy code but necessary for old compatibility.
        var buf; var sig; var check; try{
          buf = shim.Buffer.from(json.s, opt.encode || 'base64') // NEW DEFAULT!
          sig = new Uint8Array(buf)
          check = await (shim.ossl || shim.subtle).verify({name: 'ECDSA', hash: {name: 'SHA-256'}}, key, sig, new Uint8Array(hash))
          if(!check){ throw "Signature did not match." }
        }catch(e){
          buf = shim.Buffer.from(json.s, 'utf8') // AUTO BACKWARD OLD UTF8 DATA!
          sig = new Uint8Array(buf)
          check = await (shim.ossl || shim.subtle).verify({name: 'ECDSA', hash: {name: 'SHA-256'}}, key, sig, new Uint8Array(hash))
          if(!check){ throw "Signature did not match." }
        }
        var r = check? S.parse(json.m) : u;
        O.fall_soul = tmp['#']; O.fall_key = tmp['.']; O.fall_val = data; O.fall_state = tmp['>'];
        if(cb){ try{ cb(r) }catch(e){console.log(e)} }
        return r;
      }
      SEA.opt.fallback = 2;
  
    })(USE, './verify');
  
    ;USE(function(module){
      var shim = USE('./shim');
      var S = USE('./settings');
      var sha256hash = USE('./sha256');
  
      const importGen = async (key, salt, opt) => {
        //const combo = shim.Buffer.concat([shim.Buffer.from(key, 'utf8'), salt || shim.random(8)]).toString('utf8') // old
        opt = opt || {};
        const combo = key + (salt || shim.random(8)).toString('utf8'); // new
        const hash = shim.Buffer.from(await sha256hash(combo), 'binary')
        
        const jwkKey = S.keyToJwk(hash)      
        return await shim.subtle.importKey('jwk', jwkKey, {name:'AES-GCM'}, false, ['encrypt', 'decrypt'])
      }
      module.exports = importGen;
    })(USE, './aeskey');
  
    ;USE(function(module){
      var SEA = USE('./root');
      var shim = USE('./shim');
      var S = USE('./settings');
      var aeskey = USE('./aeskey');
      var u;
  
      SEA.encrypt = SEA.encrypt || (async (data, pair, cb, opt) => { try {
        opt = opt || {};
        var key = (pair||opt).epriv || pair;
        if(u === data){ throw '`undefined` not allowed.' }
        if(!key){
          pair = await SEA.I(null, {what: data, how: 'encrypt', why: opt.why});
          key = pair.epriv || pair;
        }
        var msg = (typeof data == 'string')? data : JSON.stringify(data);
        var rand = {s: shim.random(9), iv: shim.random(15)}; // consider making this 9 and 15 or 18 or 12 to reduce == padding.
        var ct = await aeskey(key, rand.s, opt).then((aes) => (/*shim.ossl ||*/ shim.subtle).encrypt({ // Keeping the AES key scope as private as possible...
          name: opt.name || 'AES-GCM', iv: new Uint8Array(rand.iv)
        }, aes, new shim.TextEncoder().encode(msg)));
        var r = {
          ct: shim.Buffer.from(ct, 'binary').toString(opt.encode || 'base64'),
          iv: rand.iv.toString(opt.encode || 'base64'),
          s: rand.s.toString(opt.encode || 'base64')
        }
        if(!opt.raw){ r = 'SEA'+JSON.stringify(r) }
  
        if(cb){ try{ cb(r) }catch(e){console.log(e)} }
        return r;
      } catch(e) { 
        console.log(e);
        SEA.err = e;
        if(SEA.throw){ throw e }
        if(cb){ cb() }
        return;
      }});
  
      module.exports = SEA.encrypt;
    })(USE, './encrypt');
  
    ;USE(function(module){
      var SEA = USE('./root');
      var shim = USE('./shim');
      var S = USE('./settings');
      var aeskey = USE('./aeskey');
  
      SEA.decrypt = SEA.decrypt || (async (data, pair, cb, opt) => { try {
        opt = opt || {};
        var key = (pair||opt).epriv || pair;
        if(!key){
          pair = await SEA.I(null, {what: data, how: 'decrypt', why: opt.why});
          key = pair.epriv || pair;
        }
        var json = S.parse(data);
        var buf, bufiv, bufct; try{
          buf = shim.Buffer.from(json.s, opt.encode || 'base64');
          bufiv = shim.Buffer.from(json.iv, opt.encode || 'base64');
          bufct = shim.Buffer.from(json.ct, opt.encode || 'base64');
          var ct = await aeskey(key, buf, opt).then((aes) => (/*shim.ossl ||*/ shim.subtle).decrypt({  // Keeping aesKey scope as private as possible...
            name: opt.name || 'AES-GCM', iv: new Uint8Array(bufiv), tagLength: 128
          }, aes, new Uint8Array(bufct)));
        }catch(e){
          if('utf8' === opt.encode){ throw "Could not decrypt" }
          if(SEA.opt.fallback){
            opt.encode = 'utf8';
            return await SEA.decrypt(data, pair, cb, opt);
          }
        }
        var r = S.parse(new shim.TextDecoder('utf8').decode(ct));
        if(cb){ try{ cb(r) }catch(e){console.log(e)} }
        return r;
      } catch(e) { 
        console.log(e);
        SEA.err = e;
        if(SEA.throw){ throw e }
        if(cb){ cb() }
        return;
      }});
  
      module.exports = SEA.decrypt;
    })(USE, './decrypt');
  
    ;USE(function(module){
      var SEA = USE('./root');
      var shim = USE('./shim');
      var S = USE('./settings');
      // Derive shared secret from other's pub and my epub/epriv 
      SEA.secret = SEA.secret || (async (key, pair, cb, opt) => { try {
        opt = opt || {};
        if(!pair || !pair.epriv || !pair.epub){
          pair = await SEA.I(null, {what: key, how: 'secret', why: opt.why});
        }
        var pub = key.epub || key;
        var epub = pair.epub;
        var epriv = pair.epriv;
        var ecdhSubtle = shim.ossl || shim.subtle;
        var pubKeyData = keysToEcdhJwk(pub);
        var props = Object.assign({ public: await ecdhSubtle.importKey(...pubKeyData, true, []) },{name: 'ECDH', namedCurve: 'P-256'}); // Thanks to @sirpy !
        var privKeyData = keysToEcdhJwk(epub, epriv);
        var derived = await ecdhSubtle.importKey(...privKeyData, false, ['deriveBits']).then(async (privKey) => {
          // privateKey scope doesn't leak out from here!
          var derivedBits = await ecdhSubtle.deriveBits(props, privKey, 256);
          var rawBits = new Uint8Array(derivedBits);
          var derivedKey = await ecdhSubtle.importKey('raw', rawBits,{ name: 'AES-GCM', length: 256 }, true, [ 'encrypt', 'decrypt' ]);
          return ecdhSubtle.exportKey('jwk', derivedKey).then(({ k }) => k);
        })
        var r = derived;
        if(cb){ try{ cb(r) }catch(e){console.log(e)} }
        return r;
      } catch(e) {
        console.log(e);
        SEA.err = e;
        if(SEA.throw){ throw e }
        if(cb){ cb() }
        return;
      }});
  
      // can this be replaced with settings.jwk?
      var keysToEcdhJwk = (pub, d) => { // d === priv
        //var [ x, y ] = Buffer.from(pub, 'base64').toString('utf8').split(':') // old
        var [ x, y ] = pub.split('.') // new
        var jwk = d ? { d: d } : {}
        return [  // Use with spread returned value...
          'jwk',
          Object.assign(
            jwk,
            { x: x, y: y, kty: 'EC', crv: 'P-256', ext: true }
          ), // ??? refactor
          {name: 'ECDH', namedCurve: 'P-256'}
        ]
      }
  
      module.exports = SEA.secret;
    })(USE, './secret');
  
    ;USE(function(module){
      var SEA = USE('./root');
      
      // This is to certify that a group of "certificants" can "put" anything at a group of matched "paths" to the certificate authority's graph
      SEA.certify = SEA.certify || (async (certificants, policy = {}, authority, cb, opt = {}) => { try {
        /*
        IMPORTANT: A Certificate is like a Signature. No one knows who (authority) created/signed a cert until you put it into their graph.
        "certificants": '*' or a String (Bob.pub) || an Object that contains "pub" as a key || an array of [object || string]. These people will have the rights.
        "policy": A string ('inbox'), or a RAD/LEX object {'*': 'inbox'}, or an Array of RAD/LEX objects or strings. RAD/LEX object can contain key "?" with indexOf("*") > -1 to force key equals certificant pub. This rule is used to check against soul+'/'+key using Gun.text.match or String.match.
        "authority": Key pair or priv of the certificate authority.
        "cb": A callback function after all things are done.
        "opt": If opt.expiry (a timestamp) is set, SEA won't sync data after opt.expiry. If opt.blacklist is set, SEA will look for blacklist before syncing.
        */
        
        console.log('SEA.certify() is an early experimental community supported method that may change API behavior without warning in any future version.')
  
        certificants = (() => {
          var data = []
          if (certificants) {
            if ((typeof certificants === 'string' || Array.isArray(certificants)) && certificants.indexOf('*') !== -1) return '*'
            
            if (typeof certificants === 'string') {
              return certificants
            }
  
            if (Array.isArray(certificants)) {
              if (certificants.length === 1 && certificants[0]) return typeof certificants[0] === 'object' && certificants[0].pub ? certificants[0].pub : typeof certificants[0] === 'string' ? certificants[0] : null
              certificants.map(certificant => {
                if (typeof certificant ==='string') data.push(certificant)
                else if (typeof certificant === 'object' && certificant.pub) data.push(certificant.pub)
              })
            }
  
            if (typeof certificants === 'object' && certificants.pub) return certificants.pub
            
            return data.length > 0 ? data : null
          }
          return null
        })()
  
        if (!certificants) return console.log("No certificant found.")
  
        const expiry = opt.expiry && (typeof opt.expiry === 'number' || typeof opt.expiry === 'string') ? parseFloat(opt.expiry) : null
        const readPolicy = (policy || {}).read ? policy.read : null
        const writePolicy = (policy || {}).write ? policy.write : typeof policy === 'string' || Array.isArray(policy) || policy["+"] || policy["#"] || policy["."] || policy["="] || policy["*"] || policy[">"] || policy["<"] ? policy : null
        const readBlacklist = ((opt || {}).blacklist || {}).read && (typeof opt.blacklist.read === 'string' || opt.blacklist.read['#']) ? opt.blacklist.read : null
        const writeBlacklist = typeof (opt || {}).blacklist === 'string' || (((opt || {}).blacklist || {}).write || {})['#'] ? opt.blacklist : ((opt || {}).blacklist || {}).write && (typeof opt.blacklist.write === 'string' || opt.blacklist.write['#']) ? opt.blacklist.write : null
  
        if (!readPolicy && !writePolicy) return console.log("No policy found.")
  
        // reserved keys: c, e, r, w, rb, wb
        const data = JSON.stringify({
          c: certificants,
          ...(expiry ? {e: expiry} : {}), // inject expiry if possible
          ...(readPolicy ? {r: readPolicy }  : {}), // "r" stands for read, which means read permission.
          ...(writePolicy ? {w: writePolicy} : {}), // "w" stands for write, which means write permission.
          ...(readBlacklist ? {rb: readBlacklist} : {}), // inject READ blacklist if possible
          ...(writeBlacklist ? {wb: writeBlacklist} : {}), // inject WRITE blacklist if possible
        })
  
        const certificate = await SEA.sign(data, authority, null, {raw:1})
  
        var r = certificate
        if(!opt.raw){ r = 'SEA'+JSON.stringify(r) }
        if(cb){ try{ cb(r) }catch(e){console.log(e)} }
        return r;
      } catch(e) {
        SEA.err = e;
        if(SEA.throw){ throw e }
        if(cb){ cb() }
        return;
      }});
  
      module.exports = SEA.certify;
    })(USE, './certify');
  
    ;USE(function(module){
      var shim = USE('./shim');
      // Practical examples about usage found in tests.
      var SEA = USE('./root');
      SEA.work = USE('./work');
      SEA.sign = USE('./sign');
      SEA.verify = USE('./verify');
      SEA.encrypt = USE('./encrypt');
      SEA.decrypt = USE('./decrypt');
      SEA.certify = USE('./certify');
      //SEA.opt.aeskey = USE('./aeskey'); // not official! // this causes problems in latest WebCrypto.
  
      SEA.random = SEA.random || shim.random;
  
      // This is Buffer used in SEA and usable from Gun/SEA application also.
      // For documentation see https://nodejs.org/api/buffer.html
      SEA.Buffer = SEA.Buffer || USE('./buffer');
  
      // These SEA functions support now ony Promises or
      // async/await (compatible) code, use those like Promises.
      //
      // Creates a wrapper library around Web Crypto API
      // for various AES, ECDSA, PBKDF2 functions we called above.
      // Calculate public key KeyID aka PGPv4 (result: 8 bytes as hex string)
      SEA.keyid = SEA.keyid || (async (pub) => {
        try {
          // base64('base64(x):base64(y)') => Buffer(xy)
          const pb = Buffer.concat(
            pub.replace(/-/g, '+').replace(/_/g, '/').split('.')
            .map((t) => Buffer.from(t, 'base64'))
          )
          // id is PGPv4 compliant raw key
          const id = Buffer.concat([
            Buffer.from([0x99, pb.length / 0x100, pb.length % 0x100]), pb
          ])
          const sha1 = await sha1hash(id)
          const hash = Buffer.from(sha1, 'binary')
          return hash.toString('hex', hash.length - 8)  // 16-bit ID as hex
        } catch (e) {
          console.log(e)
          throw e
        }
      });
      // all done!
      // Obviously it is missing MANY necessary features. This is only an alpha release.
      // Please experiment with it, audit what I've done so far, and complain about what needs to be added.
      // SEA should be a full suite that is easy and seamless to use.
      // Again, scroll naer the top, where I provide an EXAMPLE of how to create a user and sign in.
      // Once logged in, the rest of the code you just read handled automatically signing/validating data.
      // But all other behavior needs to be equally easy, like opinionated ways of
      // Adding friends (trusted public keys), sending private messages, etc.
      // Cheers! Tell me what you think.
      var Gun = (SEA.window||{}).Gun || USE((typeof MODULE == "undefined"?'.':'')+'./gun', 1);
      Gun.SEA = SEA;
      SEA.GUN = SEA.Gun = Gun;
  
      module.exports = SEA
    })(USE, './sea');
  
    ;USE(function(module){
      var Gun = USE('./sea').Gun;
      Gun.chain.then = function(cb, opt){
        var gun = this, p = (new Promise(function(res, rej){
          gun.once(res, opt);
        }));
        return cb? p.then(cb) : p;
      }
    })(USE, './then');
  
    ;USE(function(module){
      var SEA = USE('./sea');
      var Gun = SEA.Gun;
      var then = USE('./then');
  
      function User(root){ 
        this._ = {$: this};
      }
      User.prototype = (function(){ function F(){}; F.prototype = Gun.chain; return new F() }()) // Object.create polyfill
      User.prototype.constructor = User;
  
      // let's extend the gun chain with a `user` function.
      // only one user can be logged in at a time, per gun instance.
      Gun.chain.user = function(pub){
        var gun = this, root = gun.back(-1), user;
        if(pub){ return root.get('~'+pub) }
        if(user = root.back('user')){ return user }
        var root = (root._), at = root, uuid = at.opt.uuid || Gun.state.lex;
        (at = (user = at.user = gun.chain(new User))._).opt = {};
        at.opt.uuid = function(cb){
          var id = uuid(), pub = root.user;
          if(!pub || !(pub = pub.is) || !(pub = pub.pub)){ return id }
          id = id + '~' + pub + '/';
          if(cb && cb.call){ cb(null, id) }
          return id;
        }
        return user;
      }
      Gun.User = User;
      module.exports = User;
    })(USE, './user');
  
    ;USE(function(module){
      // TODO: This needs to be split into all separate functions.
      // Not just everything thrown into 'create'.
  
      var SEA = USE('./sea');
      var User = USE('./user');
      var authsettings = USE('./settings');
      var Gun = SEA.Gun;
  
      var noop = function(){};
  
      // Well first we have to actually create a user. That is what this function does.
      User.prototype.create = function(...args){
        const pair = typeof args[0] === 'object' && (args[0].pub || args[0].epub) ? args[0] : typeof args[1] === 'object' && (args[1].pub || args[1].epub) ? args[1] : null;
        const alias = pair && (pair.pub || pair.epub) ? pair.pub : typeof args[0] === 'string' ? args[0] : null;
        const pass = pair && (pair.pub || pair.epub) ? pair : alias && typeof args[1] === 'string' ? args[1] : null;
        const cb = args.filter(arg => typeof arg === 'function')[0] || null; // cb now can stand anywhere, after alias/pass or pair
        const opt = args && args.length > 1 && typeof args[args.length-1] === 'object' ? args[args.length-1] : {}; // opt is always the last parameter which typeof === 'object' and stands after cb
        
        var gun = this, cat = (gun._), root = gun.back(-1);
        
        if(cat.ing){
          (cb || noop)({err: Gun.log("User is already being created or authenticated!"), wait: true});
          return gun;
        }
        cat.ing = true;
        var act = {}, u;
        act.a = function(pubs){
          act.pubs = pubs;
          if(pubs && !opt.already){
            // If we can enforce that a user name is already taken, it might be nice to try, but this is not guaranteed.
            var ack = {err: Gun.log('User already created!')};
            cat.ing = false;
            (cb || noop)(ack);
            gun.leave();
            return;
          }
          act.salt = Gun.text.random(64); // pseudo-randomly create a salt, then use PBKDF2 function to extend the password with it.
          SEA.work(pass, act.salt, act.b); // this will take some short amount of time to produce a proof, which slows brute force attacks.
        }
        act.b = function(proof){
          act.proof = proof;
          pair ? act.c(pair) : SEA.pair(act.c) // generate a brand new key pair or use the existing.
        }
        act.c = function(pair){
          var tmp
          act.pair = pair || {};
          if(tmp = cat.root.user){
            tmp._.sea = pair;
            tmp.is = {pub: pair.pub, epub: pair.epub, alias: alias};
          }
          // the user's public key doesn't need to be signed. But everything else needs to be signed with it! // we have now automated it! clean up these extra steps now!
          act.data = {pub: pair.pub};
          act.d();
        }
        act.d = function(){
          act.data.alias = alias;
          act.e();
        }
        act.e = function(){
          act.data.epub = act.pair.epub; 
          SEA.encrypt({priv: act.pair.priv, epriv: act.pair.epriv}, act.proof, act.f, {raw:1}); // to keep the private key safe, we AES encrypt it with the proof of work!
        }
        act.f = function(auth){
          act.data.auth = JSON.stringify({ek: auth, s: act.salt}); 
          act.g(act.data.auth);
        }
        act.g = function(auth){ var tmp;
          act.data.auth = act.data.auth || auth;
          root.get(tmp = '~'+act.pair.pub).put(act.data); // awesome, now we can actually save the user with their public key as their ID.
          root.get('~@'+alias).put(Gun.obj.put({}, tmp, Gun.val.link.ify(tmp)), act.h); // next up, we want to associate the alias with the public key. So we add it to the alias list.
        }
        act.h = function(){
          cat.ing = false;
          (cb || noop)({ok: 0, pub: act.pair.pub}); // callback that the user has been created. (Note: ok = 0 because we didn't wait for disk to ack)
          if(!cb) {pair ? gun.auth(pair) : gun.auth(alias, pass)} // if no callback is passed, auto-login after signing up.
        }
        root.get('~@'+alias).once(act.a);
        return gun;
      }
      // now that we have created a user, we want to authenticate them!
      User.prototype.auth = function(...args){
        const pair = typeof args[0] === 'object' && (args[0].pub || args[0].epub) ? args[0] : typeof args[1] === 'object' && (args[1].pub || args[1].epub) ? args[1] : null;
        const alias = !pair && typeof args[0] === 'string' ? args[0] : null;
        const pass = alias && typeof args[1] === 'string' ? args[1] : null;
        const cb = args.filter(arg => typeof arg === 'function')[0] || null; // cb now can stand anywhere, after alias/pass or pair
        const opt = args && args.length > 1 && typeof args[args.length-1] === 'object' ? args[args.length-1] : {}; // opt is always the last parameter which typeof === 'object' and stands after cb
        
        var gun = this, cat = (gun._), root = gun.back(-1);
        
        if(cat.ing){
          (cb || noop)({err: Gun.log("User is already being created or authenticated!"), wait: true});
          return gun;
        }
        cat.ing = true;
        
        var act = {}, u;
        act.a = function(data){
          if(!data){ return act.b() }
          if(!data.pub){
            var tmp = [];
            Gun.node.is(data, function(v){ tmp.push(v) })
            return act.b(tmp);
          }
          if(act.name){ return act.f(data) }
          act.c((act.data = data).auth);
        }
        act.b = function(list){
          var get = (act.list = (act.list||[]).concat(list||[])).shift();
          if(u === get){
            if(act.name){ return act.err('Your user account is not published for dApps to access, please consider syncing it online, or allowing local access by adding your device as a peer.') }
            return act.err('Wrong user or password.') 
          }
          root.get(get).once(act.a);
        }
        act.c = function(auth){
          if(u === auth){ return act.b() }
          if(Gun.text.is(auth)){ return act.c(Gun.obj.ify(auth)) } // in case of legacy
          SEA.work(pass, (act.auth = auth).s, act.d, act.enc); // the proof of work is evidence that we've spent some time/effort trying to log in, this slows brute force.
        }
        act.d = function(proof){
          SEA.decrypt(act.auth.ek, proof, act.e, act.enc);
        }
        act.e = function(half){
          if(u === half){
            if(!act.enc){ // try old format
              act.enc = {encode: 'utf8'};
              return act.c(act.auth);
            } act.enc = null; // end backwards
            return act.b();
          }
          act.half = half;
          act.f(act.data);
        }
        act.f = function(data){
          if(!data || !data.pub){ return act.b() }
          var tmp = act.half || {};
          act.g({pub: data.pub, epub: data.epub, priv: tmp.priv, epriv: tmp.epriv});
        }
        act.g = function(pair){
          act.pair = pair;
          var user = (root._).user, at = (user._);
          var tmp = at.tag;
          var upt = at.opt;
          at = user._ = root.get('~'+pair.pub)._;
          at.opt = upt;
          // add our credentials in-memory only to our root user instance
          user.is = {pub: pair.pub, epub: pair.epub, alias: alias || pair};
          at.sea = act.pair;
          cat.ing = false;
          try{if(pass && !Gun.obj.has(Gun.obj.ify(cat.root.graph['~'+pair.pub].auth), ':')){ opt.shuffle = opt.change = pass; } }catch(e){} // migrate UTF8 & Shuffle!
          opt.change? act.z() : (cb || noop)(at);
          if(SEA.window && ((gun.back('user')._).opt||opt).remember){
            // TODO: this needs to be modular.
            try{var sS = {};
            sS = window.sessionStorage;
            sS.recall = true;
            sS.pair = JSON.stringify(pair); // auth using pair is more reliable than alias/pass
            }catch(e){}
          }
          try{
            (root._).on('auth', at) // TODO: Deprecate this, emit on user instead! Update docs when you do.
            //at.on('auth', at) // Arrgh, this doesn't work without event "merge" code, but "merge" code causes stack overflow and crashes after logging in & trying to write data.
          }catch(e){
            Gun.log("Your 'auth' callback crashed with:", e);
          }
        }
        act.z = function(){
          // password update so encrypt private key using new pwd + salt
          act.salt = Gun.text.random(64); // pseudo-random
          SEA.work(opt.change, act.salt, act.y);
        }
        act.y = function(proof){
          SEA.encrypt({priv: act.pair.priv, epriv: act.pair.epriv}, proof, act.x, {raw:1});
        }
        act.x = function(auth){
          act.w(JSON.stringify({ek: auth, s: act.salt}));
        }
        act.w = function(auth){
          if(opt.shuffle){ // delete in future!
            console.log('migrate core account from UTF8 & shuffle');
            var tmp = Gun.obj.to(act.data);
            Gun.obj.del(tmp, '_');
            tmp.auth = auth;
            root.get('~'+act.pair.pub).put(tmp);
          } // end delete
          root.get('~'+act.pair.pub).get('auth').put(auth, cb || noop);
        }
        act.err = function(e){
          var ack = {err: Gun.log(e || 'User cannot be found!')};
          cat.ing = false;
          (cb || noop)(ack);
        }
        act.plugin = function(name){
          if(!(act.name = name)){ return act.err() }
          var tmp = [name];
          if('~' !== name[0]){
            tmp[1] = '~'+name;
            tmp[2] = '~@'+name;
          }
          act.b(tmp);
        }
        if(pair){
          act.g(pair);
        } else
        if(alias){
          root.get('~@'+alias).once(act.a);
        } else
        if(!alias && !pass){
          SEA.name(act.plugin);
        }
        return gun;
      }
      User.prototype.pair = function(){
        console.log("user.pair() IS DEPRECATED AND WILL BE DELETED!!!");
        var user = this;
        if(!user.is){ return false }
        return user._.sea;
      }
      User.prototype.leave = function(opt, cb){
        var gun = this, user = (gun.back(-1)._).user;
        if(user){
          delete user.is;
          delete user._.is;
          delete user._.sea;
        }
        if(SEA.window){
          try{var sS = {};
          sS = window.sessionStorage;
          delete sS.recall;
          delete sS.pair;
          }catch(e){};
        }
        return gun;
      }
      // If authenticated user wants to delete his/her account, let's support it!
      User.prototype.delete = async function(alias, pass, cb){
        console.log("user.delete() IS DEPRECATED AND WILL BE MOVED TO A MODULE!!!");
        var gun = this, root = gun.back(-1), user = gun.back('user');
        try {
          user.auth(alias, pass, function(ack){
            var pub = (user.is||{}).pub;
            // Delete user data
            user.map().once(function(){ this.put(null) });
            // Wipe user data from memory
            user.leave();
            (cb || noop)({ok: 0});
          });
        } catch (e) {
          Gun.log('User.delete failed! Error:', e);
        }
        return gun;
      }
      User.prototype.recall = function(opt, cb){
        var gun = this, root = gun.back(-1), tmp;
        opt = opt || {};
        if(opt && opt.sessionStorage){
          if(SEA.window){
            try{
              var sS = {};
              sS = window.sessionStorage;
              if(sS){
                (root._).opt.remember = true;
                ((gun.back('user')._).opt||opt).remember = true;
                if(sS.recall || sS.pair) root.user().auth(JSON.parse(sS.pair), cb); // pair is more reliable than alias/pass
              }
            }catch(e){}
          }
          return gun;
        }
        /*
          TODO: copy mhelander's expiry code back in.
          Although, we should check with community,
          should expiry be core or a plugin?
        */
        return gun;
      }
      User.prototype.alive = async function(){
        console.log("user.alive() IS DEPRECATED!!!");
        const gunRoot = this.back(-1)
        try {
          // All is good. Should we do something more with actual recalled data?
          await authRecall(gunRoot)
          return gunRoot._.user._
        } catch (e) {
          const err = 'No session!'
          Gun.log(err)
          throw { err }
        }
      }
      User.prototype.trust = async function(user){
        // TODO: BUG!!! SEA `node` read listener needs to be async, which means core needs to be async too.
        //gun.get('alice').get('age').trust(bob);
        if (Gun.is(user)) {
          user.get('pub').get((ctx, ev) => {
            console.log(ctx, ev)
          })
        }
        user.get('trust').get(path).put(theirPubkey);
  
        // do a lookup on this gun chain directly (that gets bob's copy of the data)
        // do a lookup on the metadata trust table for this path (that gets all the pubkeys allowed to write on this path)
        // do a lookup on each of those pubKeys ON the path (to get the collab data "layers")
        // THEN you perform Jachen's mix operation
        // and return the result of that to...
      }
      User.prototype.grant = function(to, cb){
        console.log("`.grant` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
        var gun = this, user = gun.back(-1).user(), pair = user._.sea, path = '';
        gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
        (async function(){
        var enc, sec = await user.get('grant').get(pair.pub).get(path).then();
        sec = await SEA.decrypt(sec, pair);
        if(!sec){
          sec = SEA.random(16).toString();
          enc = await SEA.encrypt(sec, pair);
          user.get('grant').get(pair.pub).get(path).put(enc);
        }
        var pub = to.get('pub').then();
        var epub = to.get('epub').then();
        pub = await pub; epub = await epub;
        var dh = await SEA.secret(epub, pair);
        enc = await SEA.encrypt(sec, dh);
        user.get('grant').get(pub).get(path).put(enc, cb);
        }());
        return gun;
      }
      User.prototype.secret = function(data, cb){
        console.log("`.secret` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
        var gun = this, user = gun.back(-1).user(), pair = user.pair(), path = '';
        gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
        (async function(){
        var enc, sec = await user.get('trust').get(pair.pub).get(path).then();
        sec = await SEA.decrypt(sec, pair);
        if(!sec){
          sec = SEA.random(16).toString();
          enc = await SEA.encrypt(sec, pair);
          user.get('trust').get(pair.pub).get(path).put(enc);
        }
        enc = await SEA.encrypt(data, sec);
        gun.put(enc, cb);
        }());
        return gun;
      }
  
      /**
       * returns the decrypted value, encrypted by secret
       * @returns {Promise<any>}
       // Mark needs to review 1st before officially supported
      User.prototype.decrypt = function(cb) {
        let gun = this,
          path = ''
        gun.back(function(at) {
          if (at.is) {
            return
          }
          path += at.get || ''
        })
        return gun
          .then(async data => {
            if (data == null) {
              return
            }
            const user = gun.back(-1).user()
            const pair = user.pair()
            let sec = await user
              .get('trust')
              .get(pair.pub)
              .get(path)
            sec = await SEA.decrypt(sec, pair)
            if (!sec) {
              return data
            }
            let decrypted = await SEA.decrypt(data, sec)
            return decrypted
          })
          .then(res => {
            cb && cb(res)
            return res
          })
      }
      */
      module.exports = User
    })(USE, './create');
  
    ;USE(function(module){
      var SEA = USE('./sea')
      var S = USE('./settings')
      var Gun = SEA.Gun;
      // After we have a GUN extension to make user registration/login easy, we then need to handle everything else.
  
      // We do this with a GUN adapter, we first listen to when a gun instance is created (and when its options change)
      Gun.on('opt', function(at){
        if(!at.sea){ // only add SEA once per instance, on the "at" context.
          at.sea = {own: {}};
          //at.on('in', security, at); // now listen to all input data, acting as a firewall.
          //at.on('out', signature, at); // and output listeners, to encrypt outgoing data.
          at.on('put', check, at);
        }
        this.to.next(at); // make sure to call the "next" middleware adapter.
      });
  
      // Alright, this next adapter gets run at the per node level in the graph database.
      // This will let us verify that every property on a node has a value signed by a public key we trust.
      // If the signature does not match, the data is just `undefined` so it doesn't get passed on.
      // If it does match, then we transform the in-memory "view" of the data into its plain value (without the signature).
      // Now NOTE! Some data is "system" data, not user data. Example: List of public keys, aliases, etc.
      // This data is self-enforced (the value can only match its ID), but that is handled in the `security` function.
      // From the self-enforced data, we can see all the edges in the graph that belong to a public key.
      // Example: ~ASDF is the ID of a node with ASDF as its public key, signed alias and salt, and
      // its encrypted private key, but it might also have other signed values on it like `profile = <ID>` edge.
      // Using that directed edge's ID, we can then track (in memory) which IDs belong to which keys.
      // Here is a problem: Multiple public keys can "claim" any node's ID, so this is dangerous!
      // This means we should ONLY trust our "friends" (our key ring) public keys, not any ones.
      // I have not yet added that to SEA yet in this alpha release. That is coming soon, but beware in the meanwhile!
      function each(msg){ // TODO: Warning: Need to switch to `gun.on('node')`! Do not use `Gun.on('node'` in your apps!
        // NOTE: THE SECURITY FUNCTION HAS ALREADY VERIFIED THE DATA!!!
        // WE DO NOT NEED TO RE-VERIFY AGAIN, JUST TRANSFORM IT TO PLAINTEXT.
        var to = this.to, vertex = (msg.$._).put, c = 0, d;
        Gun.node.is(msg.put, function(val, key, node){
          // only process if SEA formatted?
          var tmp = Gun.obj.ify(val) || noop;
          if(u !== tmp[':']){
            node[key] = SEA.opt.unpack(tmp);
            return;
          }
          if(!SEA.opt.check(val)){ return }
          c++; // for each property on the node
          SEA.verify(val, false, function(data){ c--; // false just extracts the plain data.
            node[key] = SEA.opt.unpack(data, key, node);; // transform to plain value.
            if(d && !c && (c = -1)){ to.next(msg) }
          });
        });
        if((d = true) && !c){ to.next(msg) }
      }
  
      // signature handles data output, it is a proxy to the security function.
      function signature(msg){
        if((msg._||noop).user){
          return this.to.next(msg);
        }
        var ctx = this.as;
        (msg._||(msg._=function(){})).user = ctx.user;
        security.call(this, msg);
      }
  
      var u;
      function check(msg){ // REVISE / IMPROVE, NO NEED TO PASS MSG/EVE EACH SUB?
        var eve = this, at = eve.as, put = msg.put, soul = put['#'], key = put['.'], val = put[':'], state = put['>'], id = msg['#'], tmp;
        if(!soul || !key){ return }
        if((msg._||'').faith && (at.opt||'').faith && 'function' == typeof msg._){
          SEA.verify(SEA.opt.pack(put), false, function(data){ // this is synchronous if false
            put['='] = SEA.opt.unpack(data);
            eve.to.next(msg);
          });
          return 
        }
        var no = function(why){ at.on('in', {'@': id, err: why}) };
        //var no = function(why){ msg.ack(why) };
        (msg._||'').DBG && ((msg._||'').DBG.c = +new Date);
        if(0 <= soul.indexOf('<?')){ // special case for "do not sync data X old"
          // 'a~pub.key/b<?9'
          tmp = parseFloat(soul.split('<?')[1]||'');
          if(tmp && (state < (Gun.state() - (tmp * 1000)))){ // sec to ms
            (tmp = msg._) && (tmp = tmp.lot) && (tmp.more--); // THIS IS BAD CODE! It assumes GUN internals do something that will probably change in future, but hacking in now.
            return; // omit!
          }
        }
        
        if('~@' === soul){  // special case for shared system data, the list of aliases.
          check.alias(eve, msg, val, key, soul, at, no); return;
        }
        if('~@' === soul.slice(0,2)){ // special case for shared system data, the list of public keys for an alias.
          check.pubs(eve, msg, val, key, soul, at, no); return;
        }
        //if('~' === soul.slice(0,1) && 2 === (tmp = soul.slice(1)).split('.').length){ // special case, account data for a public key.
        if(tmp = SEA.opt.pub(soul)){ // special case, account data for a public key.
          check.pub(eve, msg, val, key, soul, at, no, at.user||'', tmp); return;
        }
        if(0 <= soul.indexOf('#')){ // special case for content addressing immutable hashed data.
          check.hash(eve, msg, val, key, soul, at, no); return;
        } 
        check.any(eve, msg, val, key, soul, at, no, at.user||''); return;
        eve.to.next(msg); // not handled
      }
      check.hash = function(eve, msg, val, key, soul, at, no){
        SEA.work(val, null, function(data){
          if(data && data === key.split('#').slice(-1)[0]){ return eve.to.next(msg) }
          no("Data hash not same as hash!");
        }, {name: 'SHA-256'});
      }
      check.alias = function(eve, msg, val, key, soul, at, no){ // Example: {_:#~@, ~@alice: {#~@alice}}
        if(!val){ return no("Data must exist!") } // data MUST exist
        if('~@'+key === link_is(val)){ return eve.to.next(msg) } // in fact, it must be EXACTLY equal to itself
        no("Alias not same!"); // if it isn't, reject.
      };
      check.pubs = function(eve, msg, val, key, soul, at, no){ // Example: {_:#~@alice, ~asdf: {#~asdf}}
        if(!val){ return no("Alias must exist!") } // data MUST exist
        if(key === link_is(val)){ return eve.to.next(msg) } // and the ID must be EXACTLY equal to its property
        no("Alias not same!"); // that way nobody can tamper with the list of public keys.
      };
      check.pub = function(eve, msg, val, key, soul, at, no, user, pub){ var tmp // Example: {_:#~asdf, hello:'world'~fdsa}}
        const raw = S.parse(val) || {}
        const verify = (certificate, certificant, cb) => {
          if (certificate.m && certificate.s && certificant && pub)
            // now verify certificate
            return SEA.verify(certificate, pub, data => { // check if "pub" (of the graph owner) really issued this cert
              if (u !== data && u !== data.e && msg.put['>'] && msg.put['>'] > parseFloat(data.e)) return no("Certificate expired.") // certificate expired
              // "data.c" = a list of certificants/certified users
              // "data.w" = lex WRITE permission, in the future, there will be "data.r" which means lex READ permission
              if (u !== data && data.c && data.w && (data.c === certificant || data.c.indexOf('*' || certificant) > -1)) {
                // ok, now "certificant" is in the "certificants" list, but is "path" allowed? Check path
                let path = soul.indexOf('/') > -1 ? soul.replace(soul.substring(0, soul.indexOf('/') + 1), '') : ''
                String.match = String.match || Gun.text.match
                const w = Array.isArray(data.w) ? data.w : typeof data.w === 'object' || typeof data.w === 'string' ? [data.w] : []
                for (const lex of w) {
                  if ((String.match(path, lex['#']) && String.match(key, lex['.'])) || (!lex['.'] && String.match(path, lex['#'])) || (!lex['#'] && String.match(key, lex['.'])) || String.match((path ? path + '/' + key : key), lex['#'] || lex)) {
                    // is Certificant forced to present in Path
                    if (lex['+'] && lex['+'].indexOf('*') > -1 && path && path.indexOf(certificant) == -1 && key.indexOf(certificant) == -1) return no(`Path "${path}" or key "${key}" must contain string "${certificant}".`)
                    // path is allowed, but is there any WRITE blacklist? Check it out
                    if (data.wb && (typeof data.wb === 'string' || ((data.wb || {})['#']))) { // "data.wb" = path to the WRITE blacklist
                      var root = at.$.back(-1)
                      if (typeof data.wb === 'string' && '~' !== data.wb.slice(0, 1)) root = root.get('~' + pub)
                      return root.get(data.wb).get(certificant).once(value => {
                        if (value && (value === 1 || value === true)) return no("Certificant blacklisted.")
                        return cb(data)
                      })
                    }
                    return cb(data)
                  }
                }
                return no("Certificate verification fail.")
              }
            })
          return
        }
        
        if ('pub' === key && '~' + pub === soul) {
          if (val === pub) return eve.to.next(msg) // the account MUST match `pub` property that equals the ID of the public key.
          return no("Account not same!")
        }
  
        if ((tmp = user.is) && tmp.pub && !raw['*'] && !raw['+'] && (pub === tmp.pub || (pub !== tmp.pub && ((msg._.out || {}).opt || {}).cert))){
          SEA.sign(SEA.opt.pack(msg.put), (user._).sea, function(data){
            if (u === data) return no(SEA.err || 'Signature fail.')
            msg.put[':'] = {':': tmp = SEA.opt.unpack(data.m), '~': data.s}
            msg.put['='] = tmp
  
            // if writing to own graph, just allow it
            if (pub === user.is.pub) {
              if (tmp = link_is(val)) (at.sea.own[tmp] = at.sea.own[tmp] || {})[pub] = 1
              msg.put[':'] = JSON.stringify(msg.put[':'])
              return eve.to.next(msg)
            }
  
            // if writing to other's graph, check if cert exists then try to inject cert into put, also inject self pub so that everyone can verify the put
            if (pub !== user.is.pub && ((msg._.out || {}).opt || {}).cert) {
              const cert = S.parse(msg._.out.opt.cert)
              // even if cert exists, we must verify it
              if (cert && cert.m && cert.s)
                verify(cert, user.is.pub, _ => {
                  msg.put[':']['+'] = cert // '+' is a certificate
                  msg.put[':']['*'] = user.is.pub // '*' is pub of the user who puts
                  msg.put[':'] = JSON.stringify(msg.put[':'])
                  return eve.to.next(msg)
                })
            }
          }, {raw: 1})
          return;
        }
  
        SEA.verify(SEA.opt.pack(msg.put), raw['*'] || pub, function(data){ var tmp;
          data = SEA.opt.unpack(data);
          if (u === data) return no("Unverified data.") // make sure the signature matches the account it claims to be on. // reject any updates that are signed with a mismatched account.
          if ((tmp = link_is(data)) && pub === SEA.opt.pub(tmp)) (at.sea.own[tmp] = at.sea.own[tmp] || {})[pub] = 1
          
          // check if cert ('+') and putter's pub ('*') exist
          if (raw['+'] && raw['+']['m'] && raw['+']['s'] && raw['*'])
            // now verify certificate
            verify(raw['+'], raw['*'], _ => {
              msg.put['='] = data;
              return eve.to.next(msg);
            })
          else {
            msg.put['='] = data;
            return eve.to.next(msg);
          }
        });
      };
      check.any = function(eve, msg, val, key, soul, at, no, user){ var tmp, pub;
        if(at.opt.secure){ return no("Soul missing public key at '" + key + "'.") }
        // TODO: Ask community if should auto-sign non user-graph data.
        at.on('secure', function(msg){ this.off();
          if(!at.opt.secure){ return eve.to.next(msg) }
          no("Data cannot be changed.");
        }).on.on('secure', msg);
        return;
      }
      var link_is = Gun.val.link.is, state_ify = Gun.state.ify;
  
      // okay! The security function handles all the heavy lifting.
      // It needs to deal read and write of input and output of system data, account/public key data, and regular data.
      // This is broken down into some pretty clear edge cases, let's go over them:
      function security(msg){
        var at = this.as, sea = at.sea, to = this.to;
        if(at.opt.faith && (msg._||noop).faith){ // you probably shouldn't have faith in this!
          this.to.next(msg); // why do we allow skipping security? I'm very scared about it actually.
          return; // but so that way storage adapters that already verified something can get performance boost. This was a community requested feature. If anybody finds an exploit with it, please report immediately. It should only be exploitable if you have XSS control anyways, which if you do, you can bypass security regardless of this.
        }
        if(msg.get){
          // if there is a request to read data from us, then...
          var soul = msg.get['#'];
          if(soul){ // for now, only allow direct IDs to be read.
            if(typeof soul !== 'string'){ return to.next(msg) } // do not handle lexical cursors.
            if('alias' === soul){ // Allow reading the list of usernames/aliases in the system?
              return to.next(msg); // yes.
            } else
            if('~@' === soul.slice(0,2)){ // Allow reading the list of public keys associated with an alias?
              return to.next(msg); // yes.
            } else { // Allow reading everything?
              return to.next(msg); // yes // TODO: No! Make this a callback/event that people can filter on.
            }
          }
        }
        if(msg.put){
          /*
            NOTICE: THIS IS OLD AND GETTING DEPRECATED.
            ANY SECURITY CHANGES SHOULD HAPPEN ABOVE FIRST
            THEN PORTED TO HERE.
          */
          // potentially parallel async operations!!!
          var check = {}, each = {}, u;
          each.node = function(node, soul){
            if(Gun.obj.empty(node, '_')){ return check['node'+soul] = 0 } // ignore empty updates, don't reject them.
            Gun.obj.map(node, each.way, {soul: soul, node: node});
          };
          each.way = function(val, key){
            var soul = this.soul, node = this.node, tmp;
            if('_' === key){ return } // ignore meta data
            if('~@' === soul){  // special case for shared system data, the list of aliases.
              each.alias(val, key, node, soul); return;
            }
            if('~@' === soul.slice(0,2)){ // special case for shared system data, the list of public keys for an alias.
              each.pubs(val, key, node, soul); return;
            }
            if('~' === soul.slice(0,1) && 2 === (tmp = soul.slice(1)).split('.').length){ // special case, account data for a public key.
              each.pub(val, key, node, soul, tmp, (msg._||noop).user); return;
            }
            each.any(val, key, node, soul, (msg._||noop).user); return;
            return each.end({err: "No other data allowed!"});
          };
          each.alias = function(val, key, node, soul){ // Example: {_:#~@, ~@alice: {#~@alice}}
            if(!val){ return each.end({err: "Data must exist!"}) } // data MUST exist
            if('~@'+key === Gun.val.link.is(val)){ return check['alias'+key] = 0 } // in fact, it must be EXACTLY equal to itself
            each.end({err: "Mismatching alias."}); // if it isn't, reject.
          };
          each.pubs = function(val, key, node, soul){ // Example: {_:#~@alice, ~asdf: {#~asdf}}
            if(!val){ return each.end({err: "Alias must exist!"}) } // data MUST exist
            if(key === Gun.val.link.is(val)){ return check['pubs'+soul+key] = 0 } // and the ID must be EXACTLY equal to its property
            each.end({err: "Alias must match!"}); // that way nobody can tamper with the list of public keys.
          };
          each.pub = function(val, key, node, soul, pub, user){ var tmp; // Example: {_:#~asdf, hello:'world'~fdsa}}
            if('pub' === key){
              if(val === pub){ return (check['pub'+soul+key] = 0) } // the account MUST match `pub` property that equals the ID of the public key.
              return each.end({err: "Account must match!"});
            }
            check['user'+soul+key] = 1;
            if(Gun.is(msg.$) && user && user.is && pub === user.is.pub){
              SEA.sign(SEA.opt.prep(tmp = SEA.opt.parse(val), key, node, soul), (user._).sea, function(data){ var rel;
                if(u === data){ return each.end({err: SEA.err || 'Pub signature fail.'}) }
                if(rel = Gun.val.link.is(val)){
                  (at.sea.own[rel] = at.sea.own[rel] || {})[pub] = true;
                }
                node[key] = JSON.stringify({':': SEA.opt.unpack(data.m), '~': data.s});
                check['user'+soul+key] = 0;
                each.end({ok: 1});
              }, {check: SEA.opt.pack(tmp, key, node, soul), raw: 1});
              return;
            }
            SEA.verify(SEA.opt.pack(val,key,node,soul), pub, function(data){ var rel, tmp;
              data = SEA.opt.unpack(data, key, node);
              if(u === data){ // make sure the signature matches the account it claims to be on.
                return each.end({err: "Unverified data."}); // reject any updates that are signed with a mismatched account.
              }
              if((rel = Gun.val.link.is(data)) && pub === SEA.opt.pub(rel)){
                (at.sea.own[rel] = at.sea.own[rel] || {})[pub] = true;
              }
              check['user'+soul+key] = 0;
              each.end({ok: 1});
            });
          };
          each.any = function(val, key, node, soul, user){ var tmp, pub;
            if(!(pub = SEA.opt.pub(soul))){
              if(at.opt.secure){
                each.end({err: "Soul is missing public key at '" + key + "'."});
                return;
              }
              // TODO: Ask community if should auto-sign non user-graph data.
              check['any'+soul+key] = 1;
              at.on('secure', function(msg){ this.off();
                check['any'+soul+key] = 0;
                if(at.opt.secure){ msg = null }
                each.end(msg || {err: "Data cannot be modified."});
              }).on.on('secure', msg);
              //each.end({err: "Data cannot be modified."});
              return;
            }
            if(Gun.is(msg.$) && user && user.is && pub === user.is.pub){
              /*var other = Gun.obj.map(at.sea.own[soul], function(v, p){
                if((user.is||{}).pub !== p){ return p }
              });
              if(other){
                each.any(val, key, node, soul);
                return;
              }*/
              check['any'+soul+key] = 1;
              SEA.sign(SEA.opt.prep(tmp = SEA.opt.parse(val), key, node, soul), (user._).sea, function(data){
                if(u === data){ return each.end({err: 'My signature fail.'}) }
                node[key] = JSON.stringify({':': SEA.opt.unpack(data.m), '~': data.s});
                check['any'+soul+key] = 0;
                each.end({ok: 1});
              }, {check: SEA.opt.pack(tmp, key, node, soul), raw: 1});
              return;
            }
            check['any'+soul+key] = 1;
            SEA.verify(SEA.opt.pack(val,key,node,soul), pub, function(data){ var rel;
              data = SEA.opt.unpack(data, key, node);
              if(u === data){ return each.end({err: "Mismatched owner on '" + key + "'."}) } // thanks @rogowski !
              if((rel = Gun.val.link.is(data)) && pub === SEA.opt.pub(rel)){
                (at.sea.own[rel] = at.sea.own[rel] || {})[pub] = true;
              }
              check['any'+soul+key] = 0;
              each.end({ok: 1});
            });
          }
          each.end = function(ctx){ // TODO: Can't you just switch this to each.end = cb?
            if(each.err){ return }
            if((each.err = ctx.err) || ctx.no){
              console.log('NO!', each.err, msg.put); // 451 mistmached data FOR MARTTI
              return;
            }
            if(!each.end.ed){ return }
            if(Gun.obj.map(check, function(no){
              if(no){ return true }
            })){ return }
            (msg._||{}).user = at.user || security; // already been through firewall, does not need to again on out.
            to.next(msg);
          };
          Gun.obj.map(msg.put, each.node);
          each.end({end: each.end.ed = true});
          return; // need to manually call next after async.
        }
        to.next(msg); // pass forward any data we do not know how to handle or process (this allows custom security protocols).
      }
      var pubcut = /[^\w_-]/; // anything not alphanumeric or _ -
      SEA.opt.pub = function(s){
        if(!s){ return }
        s = s.split('~');
        if(!s || !(s = s[1])){ return }
        s = s.split(pubcut).slice(0,2);
        if(!s || 2 != s.length){ return }
        if('@' === (s[0]||'')[0]){ return }
        s = s.slice(0,2).join('.');
        return s;
      }
      SEA.opt.prep = function(d,k, n,s){ // prep for signing
        return {'#':s,'.':k,':':SEA.opt.parse(d),'>':Gun.state.is(n, k)};
      }
      SEA.opt.pack = function(d,k, n,s){ // pack for verifying
        if(SEA.opt.check(d)){ return d }
        var meta = (Gun.obj.ify((d && d[':'])||d)||''), sig = meta['~'];
        return sig? {m: {'#':s||d['#'],'.':k||d['.'],':':meta[':'],'>':d['>']||Gun.state.is(n, k)}, s: sig} : d;
      }
      var O = SEA.opt;
      SEA.opt.unpack = function(d, k, n){ var tmp;
        if(u === d){ return }
        if(d && (u !== (tmp = d[':']))){ return tmp }
        k = k || O.fall_key; if(!n && O.fall_val){ n = {}; n[k] = O.fall_val }
        if(!k || !n){ return }
        if(d === n[k]){ return d }
        if(!SEA.opt.check(n[k])){ return d }
        var soul = Gun.node.soul(n) || O.fall_soul, s = Gun.state.is(n, k) || O.fall_state;
        if(d && 4 === d.length && soul === d[0] && k === d[1] && fl(s) === fl(d[3])){
          return d[2];
        }
        if(s < SEA.opt.shuffle_attack){
          return d;
        }
      }
      SEA.opt.shuffle_attack = 1546329600000; // Jan 1, 2019
      var noop = function(){}, u;
      var fl = Math.floor; // TODO: Still need to fix inconsistent state issue.
      var rel_is = Gun.val.rel.is;
      var obj_ify = Gun.obj.ify;
      // TODO: Potential bug? If pub/priv key starts with `-`? IDK how possible.
  
    })(USE, './index');
  }());