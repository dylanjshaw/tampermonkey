// start load localForage
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.localforage=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){(function(a){"use strict";function c(){k=!0;for(var a,b,c=l.length;c;){for(b=l,l=[],a=-1;++a<c;)b[a]();c=l.length}k=!1}function d(a){1!==l.push(a)||k||e()}var e,f=a.MutationObserver||a.WebKitMutationObserver;if(f){var g=0,h=new f(c),i=a.document.createTextNode("");h.observe(i,{characterData:!0}),e=function(){i.data=g=++g%2}}else if(a.setImmediate||"undefined"==typeof a.MessageChannel)e="document"in a&&"onreadystatechange"in a.document.createElement("script")?function(){var b=a.document.createElement("script");b.onreadystatechange=function(){c(),b.onreadystatechange=null,b.parentNode.removeChild(b),b=null},a.document.documentElement.appendChild(b)}:function(){setTimeout(c,0)};else{var j=new a.MessageChannel;j.port1.onmessage=c,e=function(){j.port2.postMessage(0)}}var k,l=[];b.exports=d}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(a,b,c){"use strict";function d(){}function e(a){if("function"!=typeof a)throw new TypeError("resolver must be a function");this.state=s,this.queue=[],this.outcome=void 0,a!==d&&i(this,a)}function f(a,b,c){this.promise=a,"function"==typeof b&&(this.onFulfilled=b,this.callFulfilled=this.otherCallFulfilled),"function"==typeof c&&(this.onRejected=c,this.callRejected=this.otherCallRejected)}function g(a,b,c){o(function(){var d;try{d=b(c)}catch(b){return p.reject(a,b)}d===a?p.reject(a,new TypeError("Cannot resolve promise with itself")):p.resolve(a,d)})}function h(a){var b=a&&a.then;if(a&&"object"==typeof a&&"function"==typeof b)return function(){b.apply(a,arguments)}}function i(a,b){function c(b){f||(f=!0,p.reject(a,b))}function d(b){f||(f=!0,p.resolve(a,b))}function e(){b(d,c)}var f=!1,g=j(e);"error"===g.status&&c(g.value)}function j(a,b){var c={};try{c.value=a(b),c.status="success"}catch(a){c.status="error",c.value=a}return c}function k(a){return a instanceof this?a:p.resolve(new this(d),a)}function l(a){var b=new this(d);return p.reject(b,a)}function m(a){function b(a,b){function d(a){g[b]=a,++h!==e||f||(f=!0,p.resolve(j,g))}c.resolve(a).then(d,function(a){f||(f=!0,p.reject(j,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=new Array(e),h=0,i=-1,j=new this(d);++i<e;)b(a[i],i);return j}function n(a){function b(a){c.resolve(a).then(function(a){f||(f=!0,p.resolve(h,a))},function(a){f||(f=!0,p.reject(h,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=-1,h=new this(d);++g<e;)b(a[g]);return h}var o=a(1),p={},q=["REJECTED"],r=["FULFILLED"],s=["PENDING"];b.exports=c=e,e.prototype.catch=function(a){return this.then(null,a)},e.prototype.then=function(a,b){if("function"!=typeof a&&this.state===r||"function"!=typeof b&&this.state===q)return this;var c=new this.constructor(d);if(this.state!==s){var e=this.state===r?a:b;g(c,e,this.outcome)}else this.queue.push(new f(c,a,b));return c},f.prototype.callFulfilled=function(a){p.resolve(this.promise,a)},f.prototype.otherCallFulfilled=function(a){g(this.promise,this.onFulfilled,a)},f.prototype.callRejected=function(a){p.reject(this.promise,a)},f.prototype.otherCallRejected=function(a){g(this.promise,this.onRejected,a)},p.resolve=function(a,b){var c=j(h,b);if("error"===c.status)return p.reject(a,c.value);var d=c.value;if(d)i(a,d);else{a.state=r,a.outcome=b;for(var e=-1,f=a.queue.length;++e<f;)a.queue[e].callFulfilled(b)}return a},p.reject=function(a,b){a.state=q,a.outcome=b;for(var c=-1,d=a.queue.length;++c<d;)a.queue[c].callRejected(b);return a},c.resolve=k,c.reject=l,c.all=m,c.race=n},{1:1}],3:[function(a,b,c){(function(b){"use strict";"function"!=typeof b.Promise&&(b.Promise=a(2))}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2}],4:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function e(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(a){}}function f(){try{if(!ga)return!1;var a="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),b="function"==typeof fetch&&fetch.toString().indexOf("[native code")!==-1;return(!a||b)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(a){return!1}}function g(){return"function"==typeof openDatabase}function h(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&localStorage.setItem}catch(a){return!1}}function i(a,b){a=a||[],b=b||{};try{return new Blob(a,b)}catch(f){if("TypeError"!==f.name)throw f;for(var c="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,d=new c,e=0;e<a.length;e+=1)d.append(a[e]);return d.getBlob(b.type)}}function j(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}function k(a,b,c){"function"==typeof b&&a.then(b),"function"==typeof c&&a.catch(c)}function l(a){for(var b=a.length,c=new ArrayBuffer(b),d=new Uint8Array(c),e=0;e<b;e++)d[e]=a.charCodeAt(e);return c}function m(a){return new ja(function(b){var c=a.transaction(ka,"readwrite"),d=i([""]);c.objectStore(ka).put(d,"key"),c.onabort=function(a){a.preventDefault(),a.stopPropagation(),b(!1)},c.oncomplete=function(){var a=navigator.userAgent.match(/Chrome\/(\d+)/),c=navigator.userAgent.match(/Edge\//);b(c||!a||parseInt(a[1],10)>=43)}}).catch(function(){return!1})}function n(a){return"boolean"==typeof ha?ja.resolve(ha):m(a).then(function(a){return ha=a})}function o(a){var b=ia[a.name],c={};c.promise=new ja(function(a){c.resolve=a}),b.deferredOperations.push(c),b.dbReady?b.dbReady=b.dbReady.then(function(){return c.promise}):b.dbReady=c.promise}function p(a){var b=ia[a.name],c=b.deferredOperations.pop();c&&c.resolve()}function q(a,b){return new ja(function(c,d){if(a.db){if(!b)return c(a.db);o(a),a.db.close()}var e=[a.name];b&&e.push(a.version);var f=ga.open.apply(ga,e);b&&(f.onupgradeneeded=function(b){var c=f.result;try{c.createObjectStore(a.storeName),b.oldVersion<=1&&c.createObjectStore(ka)}catch(c){if("ConstraintError"!==c.name)throw c;console.warn('The database "'+a.name+'" has been upgraded from version '+b.oldVersion+" to version "+b.newVersion+', but the storage "'+a.storeName+'" already exists.')}}),f.onerror=function(a){a.preventDefault(),d(f.error)},f.onsuccess=function(){c(f.result),p(a)}})}function r(a){return q(a,!1)}function s(a){return q(a,!0)}function t(a,b){if(!a.db)return!0;var c=!a.db.objectStoreNames.contains(a.storeName),d=a.version<a.db.version,e=a.version>a.db.version;if(d&&(a.version!==b&&console.warn('The database "'+a.name+"\" can't be downgraded from version "+a.db.version+" to version "+a.version+"."),a.version=a.db.version),e||c){if(c){var f=a.db.version+1;f>a.version&&(a.version=f)}return!0}return!1}function u(a){return new ja(function(b,c){var d=new FileReader;d.onerror=c,d.onloadend=function(c){var d=btoa(c.target.result||"");b({__local_forage_encoded_blob:!0,data:d,type:a.type})},d.readAsBinaryString(a)})}function v(a){var b=l(atob(a.data));return i([b],{type:a.type})}function w(a){return a&&a.__local_forage_encoded_blob}function x(a){var b=this,c=b._initReady().then(function(){var a=ia[b._dbInfo.name];if(a&&a.dbReady)return a.dbReady});return k(c,a,a),c}function y(a){function b(){return ja.resolve()}var c=this,d={db:null};if(a)for(var e in a)d[e]=a[e];ia||(ia={});var f=ia[d.name];f||(f={forages:[],db:null,dbReady:null,deferredOperations:[]},ia[d.name]=f),f.forages.push(c),c._initReady||(c._initReady=c.ready,c.ready=x);for(var g=[],h=0;h<f.forages.length;h++){var i=f.forages[h];i!==c&&g.push(i._initReady().catch(b))}var j=f.forages.slice(0);return ja.all(g).then(function(){return d.db=f.db,r(d)}).then(function(a){return d.db=a,t(d,c._defaultConfig.version)?s(d):a}).then(function(a){d.db=f.db=a,c._dbInfo=d;for(var b=0;b<j.length;b++){var e=j[b];e!==c&&(e._dbInfo.db=d.db,e._dbInfo.version=d.version)}})}function z(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ja(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=f.get(a);g.onsuccess=function(){var a=g.result;void 0===a&&(a=null),w(a)&&(a=v(a)),b(a)},g.onerror=function(){d(g.error)}}).catch(d)});return j(d,b),d}function A(a,b){var c=this,d=new ja(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=f.openCursor(),h=1;g.onsuccess=function(){var c=g.result;if(c){var d=c.value;w(d)&&(d=v(d));var e=a(d,c.key,h++);void 0!==e?b(e):c.continue()}else b()},g.onerror=function(){d(g.error)}}).catch(d)});return j(d,b),d}function B(a,b,c){var d=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=new ja(function(c,e){var f;d.ready().then(function(){return f=d._dbInfo,"[object Blob]"===la.call(b)?n(f.db).then(function(a){return a?b:u(b)}):b}).then(function(b){var d=f.db.transaction(f.storeName,"readwrite"),g=d.objectStore(f.storeName),h=g.put(b,a);null===b&&(b=void 0),d.oncomplete=function(){void 0===b&&(b=null),c(b)},d.onabort=d.onerror=function(){var a=h.error?h.error:h.transaction.error;e(a)}}).catch(e)});return j(e,c),e}function C(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ja(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readwrite"),g=f.objectStore(e.storeName),h=g.delete(a);f.oncomplete=function(){b()},f.onerror=function(){d(h.error)},f.onabort=function(){var a=h.error?h.error:h.transaction.error;d(a)}}).catch(d)});return j(d,b),d}function D(a){var b=this,c=new ja(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readwrite"),f=e.objectStore(d.storeName),g=f.clear();e.oncomplete=function(){a()},e.onabort=e.onerror=function(){var a=g.error?g.error:g.transaction.error;c(a)}}).catch(c)});return j(c,a),c}function E(a){var b=this,c=new ja(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readonly").objectStore(d.storeName),f=e.count();f.onsuccess=function(){a(f.result)},f.onerror=function(){c(f.error)}}).catch(c)});return j(c,a),c}function F(a,b){var c=this,d=new ja(function(b,d){return a<0?void b(null):void c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=!1,h=f.openCursor();h.onsuccess=function(){var c=h.result;return c?void(0===a?b(c.key):g?b(c.key):(g=!0,c.advance(a))):void b(null)},h.onerror=function(){d(h.error)}}).catch(d)});return j(d,b),d}function G(a){var b=this,c=new ja(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readonly").objectStore(d.storeName),f=e.openCursor(),g=[];f.onsuccess=function(){var b=f.result;return b?(g.push(b.key),void b.continue()):void a(g)},f.onerror=function(){c(f.error)}}).catch(c)});return j(c,a),c}function H(a){var b,c,d,e,f,g=.75*a.length,h=a.length,i=0;"="===a[a.length-1]&&(g--,"="===a[a.length-2]&&g--);var j=new ArrayBuffer(g),k=new Uint8Array(j);for(b=0;b<h;b+=4)c=na.indexOf(a[b]),d=na.indexOf(a[b+1]),e=na.indexOf(a[b+2]),f=na.indexOf(a[b+3]),k[i++]=c<<2|d>>4,k[i++]=(15&d)<<4|e>>2,k[i++]=(3&e)<<6|63&f;return j}function I(a){var b,c=new Uint8Array(a),d="";for(b=0;b<c.length;b+=3)d+=na[c[b]>>2],d+=na[(3&c[b])<<4|c[b+1]>>4],d+=na[(15&c[b+1])<<2|c[b+2]>>6],d+=na[63&c[b+2]];return c.length%3===2?d=d.substring(0,d.length-1)+"=":c.length%3===1&&(d=d.substring(0,d.length-2)+"=="),d}function J(a,b){var c="";if(a&&(c=Ea.call(a)),a&&("[object ArrayBuffer]"===c||a.buffer&&"[object ArrayBuffer]"===Ea.call(a.buffer))){var d,e=qa;a instanceof ArrayBuffer?(d=a,e+=sa):(d=a.buffer,"[object Int8Array]"===c?e+=ua:"[object Uint8Array]"===c?e+=va:"[object Uint8ClampedArray]"===c?e+=wa:"[object Int16Array]"===c?e+=xa:"[object Uint16Array]"===c?e+=za:"[object Int32Array]"===c?e+=ya:"[object Uint32Array]"===c?e+=Aa:"[object Float32Array]"===c?e+=Ba:"[object Float64Array]"===c?e+=Ca:b(new Error("Failed to get type for BinaryArray"))),b(e+I(d))}else if("[object Blob]"===c){var f=new FileReader;f.onload=function(){var c=oa+a.type+"~"+I(this.result);b(qa+ta+c)},f.readAsArrayBuffer(a)}else try{b(JSON.stringify(a))}catch(c){console.error("Couldn't convert value into a JSON string: ",a),b(null,c)}}function K(a){if(a.substring(0,ra)!==qa)return JSON.parse(a);var b,c=a.substring(Da),d=a.substring(ra,Da);if(d===ta&&pa.test(c)){var e=c.match(pa);b=e[1],c=c.substring(e[0].length)}var f=H(c);switch(d){case sa:return f;case ta:return i([f],{type:b});case ua:return new Int8Array(f);case va:return new Uint8Array(f);case wa:return new Uint8ClampedArray(f);case xa:return new Int16Array(f);case za:return new Uint16Array(f);case ya:return new Int32Array(f);case Aa:return new Uint32Array(f);case Ba:return new Float32Array(f);case Ca:return new Float64Array(f);default:throw new Error("Unkown type: "+d)}}function L(a){var b=this,c={db:null};if(a)for(var d in a)c[d]="string"!=typeof a[d]?a[d].toString():a[d];var e=new ja(function(a,d){try{c.db=openDatabase(c.name,String(c.version),c.description,c.size)}catch(a){return d(a)}c.db.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS "+c.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],function(){b._dbInfo=c,a()},function(a,b){d(b)})})});return c.serializer=Fa,e}function M(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ja(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT * FROM "+e.storeName+" WHERE key = ? LIMIT 1",[a],function(a,c){var d=c.rows.length?c.rows.item(0).value:null;d&&(d=e.serializer.deserialize(d)),b(d)},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function N(a,b){var c=this,d=new ja(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT * FROM "+e.storeName,[],function(c,d){for(var f=d.rows,g=f.length,h=0;h<g;h++){var i=f.item(h),j=i.value;if(j&&(j=e.serializer.deserialize(j)),j=a(j,i.key,h+1),void 0!==j)return void b(j)}b()},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function O(a,b,c,d){var e=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var f=new ja(function(f,g){e.ready().then(function(){void 0===b&&(b=null);var h=b,i=e._dbInfo;i.serializer.serialize(b,function(b,j){j?g(j):i.db.transaction(function(c){c.executeSql("INSERT OR REPLACE INTO "+i.storeName+" (key, value) VALUES (?, ?)",[a,b],function(){f(h)},function(a,b){g(b)})},function(b){if(b.code===b.QUOTA_ERR){if(d>0)return void f(O.apply(e,[a,h,c,d-1]));g(b)}})})}).catch(g)});return j(f,c),f}function P(a,b,c){return O.apply(this,[a,b,c,1])}function Q(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ja(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("DELETE FROM "+e.storeName+" WHERE key = ?",[a],function(){b()},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function R(a){var b=this,c=new ja(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("DELETE FROM "+d.storeName,[],function(){a()},function(a,b){c(b)})})}).catch(c)});return j(c,a),c}function S(a){var b=this,c=new ja(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("SELECT COUNT(key) as c FROM "+d.storeName,[],function(b,c){var d=c.rows.item(0).c;a(d)},function(a,b){c(b)})})}).catch(c)});return j(c,a),c}function T(a,b){var c=this,d=new ja(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT key FROM "+e.storeName+" WHERE id = ? LIMIT 1",[a+1],function(a,c){var d=c.rows.length?c.rows.item(0).key:null;b(d)},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function U(a){var b=this,c=new ja(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("SELECT key FROM "+d.storeName,[],function(b,c){for(var d=[],e=0;e<c.rows.length;e++)d.push(c.rows.item(e).key);a(d)},function(a,b){c(b)})})}).catch(c)});return j(c,a),c}function V(a){var b=this,c={};if(a)for(var d in a)c[d]=a[d];return c.keyPrefix=c.name+"/",c.storeName!==b._defaultConfig.storeName&&(c.keyPrefix+=c.storeName+"/"),b._dbInfo=c,c.serializer=Fa,ja.resolve()}function W(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo.keyPrefix,c=localStorage.length-1;c>=0;c--){var d=localStorage.key(c);0===d.indexOf(a)&&localStorage.removeItem(d)}});return j(c,a),c}function X(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=c.ready().then(function(){var b=c._dbInfo,d=localStorage.getItem(b.keyPrefix+a);return d&&(d=b.serializer.deserialize(d)),d});return j(d,b),d}function Y(a,b){var c=this,d=c.ready().then(function(){for(var b=c._dbInfo,d=b.keyPrefix,e=d.length,f=localStorage.length,g=1,h=0;h<f;h++){var i=localStorage.key(h);if(0===i.indexOf(d)){var j=localStorage.getItem(i);if(j&&(j=b.serializer.deserialize(j)),j=a(j,i.substring(e),g++),void 0!==j)return j}}});return j(d,b),d}function Z(a,b){var c=this,d=c.ready().then(function(){var b,d=c._dbInfo;try{b=localStorage.key(a)}catch(a){b=null}return b&&(b=b.substring(d.keyPrefix.length)),b});return j(d,b),d}function $(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo,c=localStorage.length,d=[],e=0;e<c;e++)0===localStorage.key(e).indexOf(a.keyPrefix)&&d.push(localStorage.key(e).substring(a.keyPrefix.length));return d});return j(c,a),c}function _(a){var b=this,c=b.keys().then(function(a){return a.length});return j(c,a),c}function aa(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=c.ready().then(function(){var b=c._dbInfo;localStorage.removeItem(b.keyPrefix+a)});return j(d,b),d}function ba(a,b,c){var d=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=d.ready().then(function(){void 0===b&&(b=null);var c=b;return new ja(function(e,f){var g=d._dbInfo;g.serializer.serialize(b,function(b,d){if(d)f(d);else try{localStorage.setItem(g.keyPrefix+a,b),e(c)}catch(a){"QuotaExceededError"!==a.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==a.name||f(a),f(a)}})})});return j(e,c),e}function ca(a,b){a[b]=function(){var c=arguments;return a.ready().then(function(){return a[b].apply(a,c)})}}function da(){for(var a=1;a<arguments.length;a++){var b=arguments[a];if(b)for(var c in b)b.hasOwnProperty(c)&&(Oa(b[c])?arguments[0][c]=b[c].slice():arguments[0][c]=b[c])}return arguments[0]}function ea(a){for(var b in Ja)if(Ja.hasOwnProperty(b)&&Ja[b]===a)return!0;return!1}var fa="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},ga=e();"undefined"==typeof Promise&&a(3);var ha,ia,ja=Promise,ka="local-forage-detect-blob-support",la=Object.prototype.toString,ma={_driver:"asyncStorage",_initStorage:y,iterate:A,getItem:z,setItem:B,removeItem:C,clear:D,length:E,key:F,keys:G},na="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",oa="~~local_forage_type~",pa=/^~~local_forage_type~([^~]+)~/,qa="__lfsc__:",ra=qa.length,sa="arbf",ta="blob",ua="si08",va="ui08",wa="uic8",xa="si16",ya="si32",za="ur16",Aa="ui32",Ba="fl32",Ca="fl64",Da=ra+sa.length,Ea=Object.prototype.toString,Fa={serialize:J,deserialize:K,stringToBuffer:H,bufferToString:I},Ga={_driver:"webSQLStorage",_initStorage:L,iterate:N,getItem:M,setItem:P,removeItem:Q,clear:R,length:S,key:T,keys:U},Ha={_driver:"localStorageWrapper",_initStorage:V,iterate:Y,getItem:X,setItem:ba,removeItem:aa,clear:W,length:_,key:Z,keys:$},Ia={},Ja={INDEXEDDB:"asyncStorage",LOCALSTORAGE:"localStorageWrapper",WEBSQL:"webSQLStorage"},Ka=[Ja.INDEXEDDB,Ja.WEBSQL,Ja.LOCALSTORAGE],La=["clear","getItem","iterate","key","keys","length","removeItem","setItem"],Ma={description:"",driver:Ka.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},Na={};Na[Ja.INDEXEDDB]=f(),Na[Ja.WEBSQL]=g(),Na[Ja.LOCALSTORAGE]=h();var Oa=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},Pa=function(){function a(b){d(this,a),this.INDEXEDDB=Ja.INDEXEDDB,this.LOCALSTORAGE=Ja.LOCALSTORAGE,this.WEBSQL=Ja.WEBSQL,this._defaultConfig=da({},Ma),this._config=da({},this._defaultConfig,b),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return a.prototype.config=function(a){if("object"===("undefined"==typeof a?"undefined":fa(a))){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var b in a){if("storeName"===b&&(a[b]=a[b].replace(/\W/g,"_")),"version"===b&&"number"!=typeof a[b])return new Error("Database version must be a number.");this._config[b]=a[b]}return!("driver"in a&&a.driver)||this.setDriver(this._config.driver)}return"string"==typeof a?this._config[a]:this._config},a.prototype.defineDriver=function(a,b,c){var d=new ja(function(b,c){try{var d=a._driver,e=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),f=new Error("Custom driver name already in use: "+a._driver);if(!a._driver)return void c(e);if(ea(a._driver))return void c(f);for(var g=La.concat("_initStorage"),h=0;h<g.length;h++){var i=g[h];if(!i||!a[i]||"function"!=typeof a[i])return void c(e)}var j=ja.resolve(!0);"_support"in a&&(j=a._support&&"function"==typeof a._support?a._support():ja.resolve(!!a._support)),j.then(function(c){Na[d]=c,Ia[d]=a,b()},c)}catch(a){c(a)}});return k(d,b,c),d},a.prototype.driver=function(){return this._driver||null},a.prototype.getDriver=function(a,b,c){var d=this,e=ja.resolve().then(function(){if(!ea(a)){if(Ia[a])return Ia[a];throw new Error("Driver not found.")}switch(a){case d.INDEXEDDB:return ma;case d.LOCALSTORAGE:return Ha;case d.WEBSQL:return Ga}});return k(e,b,c),e},a.prototype.getSerializer=function(a){var b=ja.resolve(Fa);return k(b,a),b},a.prototype.ready=function(a){var b=this,c=b._driverSet.then(function(){return null===b._ready&&(b._ready=b._initDriver()),b._ready});return k(c,a,a),c},a.prototype.setDriver=function(a,b,c){function d(){g._config.driver=g.driver()}function e(a){return g._extend(a),d(),g._ready=g._initStorage(g._config),g._ready}function f(a){return function(){function b(){for(;c<a.length;){var f=a[c];return c++,g._dbInfo=null,g._ready=null,g.getDriver(f).then(e).catch(b)}d();var h=new Error("No available storage method found.");return g._driverSet=ja.reject(h),g._driverSet}var c=0;return b()}}var g=this;Oa(a)||(a=[a]);var h=this._getSupportedDrivers(a),i=null!==this._driverSet?this._driverSet.catch(function(){return ja.resolve()}):ja.resolve();return this._driverSet=i.then(function(){var a=h[0];return g._dbInfo=null,g._ready=null,g.getDriver(a).then(function(a){g._driver=a._driver,d(),g._wrapLibraryMethodsWithReady(),g._initDriver=f(h)})}).catch(function(){d();var a=new Error("No available storage method found.");return g._driverSet=ja.reject(a),g._driverSet}),k(this._driverSet,b,c),this._driverSet},a.prototype.supports=function(a){return!!Na[a]},a.prototype._extend=function(a){da(this,a)},a.prototype._getSupportedDrivers=function(a){for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c];this.supports(e)&&b.push(e)}return b},a.prototype._wrapLibraryMethodsWithReady=function(){for(var a=0;a<La.length;a++)ca(this,La[a])},a.prototype.createInstance=function(b){return new a(b)},a}(),Qa=new Pa;b.exports=Qa},{3:3}]},{},[4])(4)});
// end load localForage


function fixExtensionConditionsListener() {
    var save_off_buttonCount = window.buttonCount;
    var checkedCount = jQuery('.label_select_checkbox:checked').length == 0 ? save_off_buttonCount : jQuery('.label_select_checkbox:checked').length;
    jQuery("#fixExtensionConditions").text("Fix Conditions (" + checkedCount + ")");
}

// Add fix condition handler
jQuery(document.body).on('mousedown', '#fixExtensionConditions', function() {
    function getCheckedElements(tab) {
        if (tab === 'tabs-customizations') {
            return $('#' + tab).find('.label_select_checkbox:checked').closest('.customize_container');
        } else {
            return $('#' + tab).find('.label_select_checkbox:checked').closest('div[id*="_content_"]');
        }
    }
    // If user decides to only fix select conditions, loop through and get ids to pass into
    // fix conditions function, otherwise fix them all
    var elements = [];
    getCheckedElements("tabs-customizations").each(function() {
        var id = this.id.split("_")[1];
        elements.push(id);
    });
    elements = elements.reverse();
    if (elements.length > 0) {
        fixConditions(elements);
        jQuery('.label_select_checkbox').attr('checked', false);
    } else {
        fixConditions();
    }

});

// Toggle click funciton
(function($) {
    $.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function() {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };
}(jQuery));



var conditionChecker = function() {

    window.key_obj = {}
    window.buttonCount = 0;
    window.fix_conditions_array = [];

    var ext_conds = {};
    var new_object = {};
    var previous_condition_number_from_same_and = "";

    // Declare flag and variable keeper
    var safe_condition = false;
    var ignore = false;
    var save_off_variable = "";
    var condition_check = {
        "contains_ignore_case": 1,
        "contains": 1,
        "does_not_contain_ignore_case": 1,
        "does_not_equal_ignore_case": 1,
        "does_not_end_with_ignore_case": 1,
        "does_not_start_with_ignore_case": 1,
        "equals_ignore_case": 1,
        "starts_with_ignore_case": 1,
        "less_than": 1,
        "less_than_equal_to": 1,
        "greater_than": 1,
        "greater_than_equal_to": 1
    };




    // loop through all extensions and save each variable in the conditions only
    Object.keys(utui.data.customizations).forEach(function(id) {
        Object.keys(utui.data.customizations[id]).sort().reverse().forEach(function(keys) {

            if ((utui.data.customizations[id].repaired != undefined && utui.data.customizations[id].repaired == 1) || (utui.data.customizations[id].imported != undefined)) {
                return false;
            }

            // Assign extension id as a nested obj using condition stamps
            if (keys.match(/^\d/)) {
                if (!key_obj[id]) {
                    key_obj[id] = {};
                }

                // Remove underscores from keys
                var key_nums = keys.replace(/\D/g, '');

                if (keys.indexOf('_source') > 0) {

                    if (typeof key_obj[id][key_nums] === 'undefined') {
                        key_obj[id][key_nums] = {};
                    }

                    // Save the current variable name
                    key_obj[id][key_nums]["variable"] = utui.data.customizations[id][keys]
                }
                if (keys.indexOf('_filtertype') > 0) {

                    if (typeof key_obj[id][key_nums] === 'undefined') {
                        key_obj[id][key_nums] = {};
                    }

                    // Save the current condition
                    key_obj[id][key_nums]["condition"] = utui.data.customizations[id][keys];
                }
            }
        });
    });

    // Look over each extension
    Object.keys(key_obj).forEach(function(extension_number) {
        // Loop over each condition in extension
        Object.keys(key_obj[extension_number]).forEach(function(condition_id) {
            // Create array of AND conditions
            // Check to see if condition_id is first in AND
            if (condition_id.length <= 18) {
                // Save off condition number to use for rest of AND
                previous_condition_number_from_same_and = condition_id;
                // Check if extension number key is defined, otherwise make a new obj
                if (new_object[extension_number] === undefined) {
                    new_object[extension_number] = {};
                }
                // Check if condition id key is defined, otherwise make a new array
                if (new_object[extension_number][condition_id] === undefined) {
                    new_object[extension_number][condition_id] = [];
                }
                // Push variable and condition into current AND key
                var v = key_obj[extension_number][condition_id].variable || "";
                var c = key_obj[extension_number][condition_id].condition || "";
                new_object[extension_number][condition_id].push(v);
                new_object[extension_number][condition_id].push(c);
                // Check to see if condition id is second, third, in same AND
            } else if (condition_id.length > 18 && condition_id.indexOf(previous_condition_number_from_same_and) > -1) {
                // Push variable and condition into initial AND
                new_object[extension_number][previous_condition_number_from_same_and].push(key_obj[extension_number][condition_id].variable);
                new_object[extension_number][previous_condition_number_from_same_and].push(key_obj[extension_number][condition_id].condition);
            }
        });
    });


    // Loop through the new object and check each AND condition to make sure
    // required variables are checking for defined or populated
    // otherwise, create an error for the extension and condition row

    // Start by looping through each extension
    Object.keys(new_object).forEach(function(extension_number) {
        // Loop through each condition AND block in extension
        Object.keys(new_object[extension_number]).forEach(function(and_condition_block) {
            window.and_condition_block = and_condition_block;

            // Save the h3 element of the current extension
            var $extension = jQuery('#customizations_' + extension_number + ' h3');

            // Creaet variables for easier referencing
            var and_block_array = new_object[extension_number][and_condition_block];
            var current_variable, position_of_safe_condition;
            var variable_from_safe_condition = [];

            // Loop through array of the AND block
            for (var i = 0; i < and_block_array.length; i++) {

                // Reset flag
                var found_defined_or_populated = 0;

                // Check current index to see if it is variable then save variable for error application
                // If the variable type is 'dom', ignore the row (always safe)
                if (and_block_array[i].indexOf('js.') == 0 || and_block_array[i].indexOf('qp.') == 0 || and_block_array[i].indexOf('cp.') == 0 || and_block_array[i].indexOf('js_page.') == 0) {
                    current_variable = and_block_array[i]; //acme_page
                    ignore = false;
                } else if (and_block_array[i].indexOf('dom.') == 0) {
                    ignore = true;
                }

                // Check to see if current index is defined or populated and save off variable
                if (and_block_array[i] == 'defined' || and_block_array[i] == 'populated' || and_block_array[i] == 'is_badge_assigned') {
                    save_off_variable = and_block_array[i - 1]; //azm_merchID
                    found_defined_or_populated = 1;
                    position_of_safe_condition = i;
                    variable_from_safe_condition.push(and_block_array[i - 1]);
                    safe_condition = true;
                }

                // if(variable_from_safe_condition.indexOf(current_variable) > -1) {
                //     found_defined_or_populated = 1;
                //     safe_condition = true;
                // }

                // Check to see if current index variable is the same as one determined to be safe
                if (save_off_variable != current_variable && found_defined_or_populated == 0 && condition_check[and_block_array[i]] && !ignore) {

                    safe_condition = false;

                    if (fix_conditions_array.indexOf(extension_number) < 0) {
                        fix_conditions_array.push(extension_number);
                        buttonCount++;
                    }

                    // Apply error highlighting since the condition was determined to be unsafe
                    $extension.attr('style', 'background: #fef1ec url("images/ui-bg_glass_95_fef1ec_1x400.png") 50% 50% repeat-x;border: 1px solid #cd0a0a;');
                    $extension.find('.container_scope, .container_exType, .container_title').attr('style', 'color:#cd0a0a;');

                    $extension.clickToggle(function() {
                        console.log("header clicked to expand")
                        // Remove bold and shadow once user expands extension (cleaner) and reapply font color once they minimize
                        $extension.find('.container_scope, .container_exType, .container_title').attr('style', 'color:#cd0a0a;text-shadow: none; font-weight: normal;');
                    }, function() {
                        console.log("header clicked to minimize")
                        $extension.find('.container_scope, .container_exType, .container_title').attr('style', 'color:#cd0a0a;text-shadow: none; font-weight: normal;');
                    });

                }
            }

        });

    });

    // Once clicked, change button text to "Check Again"
    jQuery("#conditionCheck").remove();
    jQuery("#fixExtensionConditions").remove();
    jQuery("#nothingToFix").remove();

    // Remove if sendToTopBottom is not enabled
    if (!features.sendToTopBottom.enabled) {
        // Remove before adding
        jQuery('.label_select_checkbox').off('click');
        // Listen for single extension selection and update the button count
        jQuery('.label_select_checkbox').on('click', function() {
            var tab = jQuery(this).closest('div[id^="tabs-"]').attr('id');
            console.log('Clicked the checkbox in tab: ' + tab);
            if (jQuery('#' + tab).find('.label_select_checkbox:checked').length) {
                console.log('Must have something checked');
                //Only add the buttons if they don't exist already
                var checkedCount = jQuery('.label_select_checkbox:checked').length == 0 ? buttonCount : jQuery('.label_select_checkbox:checked').length;
                jQuery("#fixExtensionConditions").text("Fix Conditions (" + checkedCount + ")");
            } else if (jQuery('.label_select_checkbox:checked').length == 0) {
                jQuery("#fixExtensionConditions").text("Fix Conditions (" + buttonCount + ")");
            }
        });
    }

    // Add fix it button
    if (buttonCount > 0 && fix_conditions_array.length > 0) jQuery('<button id="fixExtensionConditions" class="btn btn-info tmui" style="float: left;margin-top:0;margin-left:10px;background-color:#a12727;background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#e06262), to(#ad3434));">Fix Conditions (' + buttonCount + ')</button>').insertAfter('#customize_addDebugBtn');
    else jQuery('<button id="nothingToFix" class="btn btn-info tmui" style="float: left;margin-top:0;margin-left:10px;background-color:#36702e;background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#3ccf3c), to(#196e2a));">Conditions are good</button>').insertAfter('#customize_addDebugBtn');
}

var fixConditions = function(ExtensionIdNumbers) {

    window._specificExtensionToRepair = ExtensionIdNumbers || "all";

    // get timestamp for condition id
    var ts = Date.now().toString();

    // create a new array to hold the extension key/value pairs
    var safeArray = [];

    // we track if the input is already being safely handled here
    var safeObject = {};

    // keeps track of incrementing number for both xx_xx and xx_xx_xx keys
    var extensionCounter = 1;
    var extensionCounter2 = 2;

    // create a new array for the renumbered keys
    var renumberedArray = [];

    // these are the keys we care about
    var interestedKeys = (/_filter|_filtertype|_source/);

    // jquery selector of current extension header - for css
    var $extension;

    var isAllowedInput = function(input) {
        return input.match(/^js\.|^cp\.|^meta\.|^js_page\.|^va\.|^qp\.|^channel_|^do_not_track|^previous_page_name/) ? true : false;
    };

    // gets the starting array once we convert the re ordered object to an array
    var startingArray = function(obj) {
        return _.toPairs(obj);
    }

    // makes a new key using the previous condition id, timestamp, and type (filtertype or source)
    var makeNewKey = function(extCnt, ts) {
        return ts + padDigits(incrementExtensionCounter(extCnt), 5);
    }

    // pads number if less than 5
    var padDigits = function(number, digits) {
        return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    }

    // increments the tail end of the condition keys
    var incrementExtensionCounter = function(extCnt) {
        extCnt++;
        return extCnt;
    }

    // returns how many underscores in key (for tracking order of conditions)
    var scoreCount = function(str) {
        return (str.match(/_/g) || []).length;
    }

    // removes the keys we will be manipulating so as not to produce duplicates
    var removeOldKeys = function(obj, ext) {
        var interestedKeys = (/_filter|_filtertype|_source/);
        Object.keys(obj).forEach(function(key) {
            if (key.match(interestedKeys)) {
                delete obj[key];
            }
        });
        return obj;
    }

    // builds the update view object check
    var buildUpdateViewObj = function(extension) {
        if (typeof(extension) === 'object' && Object.keys(extension).length) {
            return {
                'action': 'updated_extension',
                'data': {
                    'id': '' + extension._id,
                    'name': extension.title,
                    'type': '' + extension.id,
                    'kind': 'Extension',
                    'operation': 'updated',
                    'container': 'customizations_' + extension._id,
                    'tab_name': 'customizations'
                }
            };
        }
        return false;
    };

    // adds is defined to every condition row in the extension
    var addDefined = function(arr, ext) {
        var resultArray = [];
        for (var i = 0; i < arr.length; i++) {
            // only push into result array if _filtertype is found
            if (arr[i][0].indexOf('_filter') > -1 && arr[i][0].indexOf('_filtertype') == -1) {
                // push defined block
                resultArray.push([
                    [arr[i][0].substring(0, 18) + "_" + arr[i][0].substring(0, 18) + "_filter", ""],
                    [arr[i][0].substring(0, 18) + "_" + arr[i][0].substring(0, 18) + "_filtertype", "defined"],
                    [arr[i][0].substring(0, 18) + "_" + arr[i][0].substring(0, 18) + "_source", arr[i + 2][1]],
                ])
                // push the original condition row
                resultArray.push([
                    [arr[i][0], arr[i][1]],
                    [arr[i + 1][0], arr[i + 1][1]],
                    [arr[i + 2][0], arr[i + 2][1]]
                ]);
            }

        }
        return resultArray;
    }


    var pushUniqueHelper = function(safeArray, currentArray, safeObject, ext) {
        var last, length;
        var last_filter, last_filtertype, last_source, last_key_pattern;
        var current_filter, current_filtertype, current_source, current_key_pattern;

        for (var i = 0; i < currentArray.length; i++) {

            // record the current row information
            current_source = currentArray[i][2][1];
            current_filtertype = currentArray[i][1][1];
            current_filter = currentArray[i][0][1];
            current_key_pattern = currentArray[i][0][0];

            // if it is the first condition, just push it for now and compare later
            if (safeArray.length === 0) {
                if (current_filtertype === 'defined' && !isAllowedInput(current_source)) continue;
                safeArray.push(currentArray[i]);
                if (current_filtertype === 'defined' || current_filtertype === 'populated' || current_filtertype === 'is_badge_assigned') {
                    safeObject[current_source] = current_filtertype === 'populated' || current_filtertype === 'is_badge_assigned' ? 2 : 1;
                    safeObject[current_source + "_loc"] = safeArray.length - 1;
                }
                continue;
            }

            // if we're deeper into the block, get the row information for comparison later
            if (safeArray.length >= 1) {
                length = safeArray.length;
                last = safeArray[length - 1];
                last_source = last[2][1];
                last_filtertype = last[1][1];
                last_filter = last[0][1];
                last_key_pattern = last[0][0];
            }

            // checks for populated vs defined and assigns weight
            if (current_filtertype === "populated" && typeof(safeObject[current_source]) !== "undefined" && safeObject[current_source] === 1) {
                safeArray[safeObject[current_source + "_loc"]][1][1] = "populated";
                safeObject[current_source] = 2;
            }

            // checks for is badge assigned vs defined and assigns weight
            if (current_filtertype === "is_badge_assigned" && typeof(safeObject[current_source]) !== "undefined" && safeObject[current_source] === 1) {
                safeArray[safeObject[current_source + "_loc"]][1][1] = "is_badge_assigned";
                safeObject[current_source] = 2;
            }

            // checks for populated/defined/is_badge_assigned and doesn't push defined in that case
            if (current_filtertype === 'populated' && typeof(safeObject[current_source]) !== 'undefined' && safeObject[current_source] === 2) {
                continue;
            }

            if (current_filtertype === 'notdefined' && typeof(safeObject[current_source]) !== 'undefined') {
                safeArray[i - 1][1][1] = current_filtertype;
                continue;
            }

            if (current_filtertype === 'is_badge_assigned' && typeof(safeObject[current_source]) !== 'undefined') {
                continue;
            }

            if (current_filtertype === 'defined' && !isAllowedInput(current_source)) {
                continue;
            }

            // checks for dupes and prevent pushing unecessary is_defined checks to a extension
            if (current_source === last_source) {
                if (current_filtertype === 'defined' && (last_filtertype === 'defined' || last_filtertype === 'populated' /* || typeof(safeObject[current_source]) !== 'undefined'*/ )) {
                    continue;
                }
            }

            // prevents dupes, update loadrule block and track if we're already check for is_defined
            if (last_source + last_filtertype + last_filter !== current_source + current_filtertype + current_filter) {
                safeArray.push(currentArray[i]);
                if (current_filtertype === 'defined' || current_filtertype === 'populated') {
                    safeObject[current_source] = current_filtertype === 'populated' ? 2 : 1;
                    safeObject[current_source + "_loc"] = safeArray.length - 1;
                }
            }

            // checks each key and see if it should be x_x_x or x_x (two underscores - part of OR)
            for (var k = 0; k < safeArray.length; k++) {
                for (var j = 0; j < safeArray[k].length; j++) {
                    if (scoreCount(safeArray[k][j][0]) == 1) {
                        safeArray[k][j][0] = safeArray[k][j][0].split("_")[0] + "_" + safeArray[k][j][0].split("_")[0] + "_" + safeArray[k][j][0].split("_")[1];
                    }
                }
            }
        }

    }

    // Organize each OR block so that the top condition is in this format: xx_xx
    // and all the rest in this format xx_xx_xx
    var organizeOrBlocks = function(workingArray) {
        // reset the first key record
        var first_key_in_outter_array = undefined;

        for (var i = 0; i < workingArray.length; i++) {
            for (var j = 0; j < workingArray[i].length; j++) {

                // checks the key to see if it is part of the same block or should be the start of a new
                if (j == 0 && scoreCount(workingArray[i][j][0]) == 2) {

                    // if the first key in the block has not yet been recorded, record it and then set it as the first
                    // condition in the block
                    if (!first_key_in_outter_array) {
                        first_key_in_outter_array = workingArray[i][j][0].substring(0, 18)
                        var firstPart = workingArray[i][j][0].split("_")[0] + "_" + workingArray[i][j][0].split("_")[2];
                        workingArray[i][j][0] = firstPart;
                        workingArray[i][1][0] = workingArray[i][j][0].split("_")[0] + "_filtertype";
                        workingArray[i][2][0] = workingArray[i][j][0].split("_")[0] + "_source";

                        // if the first key has been recorded and it is not the same as the current key, make sure to keep
                        // as part of the current block
                    } else if (first_key_in_outter_array && first_key_in_outter_array !== workingArray[i][j][0].substring(0, 18)) {
                        first_key_in_outter_array = safeArray[i][j][0].substring(0, 18)
                        var secondPart = workingArray[i][j][0].split("_")[0] + "_" + workingArray[i][j][0].split("_")[2];
                        workingArray[i][j][0] = secondPart;
                        workingArray[i][1][0] = workingArray[i][j][0].split("_")[0] + "_filtertype";
                        workingArray[i][2][0] = workingArray[i][j][0].split("_")[0] + "_source";
                    }
                }
            }
        }
        return workingArray;
    }

    // renumbers the keys so that they fall in the correct order in the UI
    var renumberKeys = function(arr) {
        var type, key;
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].length; j++) {
                if (scoreCount(arr[i][j][0]) === 1) {
                    // make new key for second block of numbers in condition row key
                    key = makeNewKey(extensionCounter, ts);
                    type = arr[i][j][0].split("_")[1];
                    arr[i][j][0] = key + "_" + type;
                } else if (scoreCount(arr[i][j][0]) === 2) {
                    // make new key for second block of numbers in condition row key
                    var key2 = makeNewKey(extensionCounter2, ts);
                    type = arr[i][j][0].split("_")[2];
                    arr[i][j][0] = key + "_" + key2 + "_" + type;
                }
            }
            // increments the condition block key xx_xx and xx_xx_xx
            extensionCounter = incrementExtensionCounter(extensionCounter);
            extensionCounter2 = incrementExtensionCounter(extensionCounter2);

        }
        return arr;
    }

    // rebuilds the condition blocks by merging the new, repaired, reordered, renumbered, array into old object
    var rebuildConditionBlocks = function(masterObject, uniqueArray) {
        for (var i = 0; i < uniqueArray.length; i++) {
            masterObject = Object.assign(masterObject, _.fromPairs(uniqueArray[i]));
        }
        return masterObject;
    }

    var updateExtensionValue = function(id, key, value) {
        // this freezes UI
        utui.data.customizations[id][key] = value, utui.customizations.render()
    }

    var toggle_unsaved_changes_btn = function(bSaved) {
        var $save_publish_btn = $('#global_save'),
            $publish_diff_btn = $('#global_diff');

        if (bSaved) {
            $save_publish_btn.parent().removeClass('btn-group');
            $save_publish_btn.removeClass('btn-warning');
            $publish_diff_btn.hide();
            utui.profile.hideModifiedTabLabel();
        } else {
            if (!utui.permissions.isReadOnly()) {
                if (utui.historyManager.getNetChanges().length > 0) {
                    $save_publish_btn.parent().addClass('btn-group');
                    $save_publish_btn.addClass('btn-warning');
                    if ($save_publish_btn.is(':visible')) {
                        $publish_diff_btn.show();
                    }
                } else {
                    $save_publish_btn.parent().removeClass('btn-group');
                    $save_publish_btn.addClass('btn-warning');
                    $publish_diff_btn.hide();
                }
            }
        }
    };

    // update UI
    var updateView = function() {

        // redraw extension conditions
        utui.customizations.drawJUIAccordion();

        // loop through the extensions that should have been updated
        for (var i = 0; i < fix_conditions_array.length; i++) {

            utui.data.customizations[fix_conditions_array[i]].repaired = 1;

            // build the update object
            updateObject = buildUpdateViewObj(utui.data.customizations[fix_conditions_array[i]]);

            // updates the view to track changes
            if (updateObject) {
                utui.profile.showModifiedTabLabel(updateObject);
                utui.historyManager.addEvent(updateObject);
                updateObject = null;
            }

            // save the h3 element of the current extension
            $extension = jQuery('#customizations_' + fix_conditions_array[i] + ' h3');

            // remove error highlighting
            $extension.removeAttr('style');
            $extension.find('.container_scope, .container_exType, .container_title').removeAttr('style');
            $extension.off('click');

        }

        // remove the fix conditions button
        jQuery('#fixExtensionConditions').remove();
        buttonCount = 0;
        toggle_unsaved_changes_btn();

    }

    // main method
    var repairConditions = function(object) {

        // checks to see if object has changed, if not - doesn't do anything
        function checkModifications(a, b) {
            var mod = false;
            if (Object.keys(a).length !== Object.keys(b).length) {
                mod = true;
            } else {
                for (var key in a) {
                    if (a[key] !== b[key]) {
                        mod = true;
                        break;
                    }
                }
            }
            return mod;
        }

        Object.keys(object).forEach(function(extension_number, idx) {

            var extensionObject = {};
            extensionObject = object[extension_number];

            if (utui.util.typeOf(_specificExtensionToRepair) == "string" && _specificExtensionToRepair != "all") {
                fix_conditions_array = []; // empty out fix_contidions_array
                fix_conditions_array.push(_specificExtensionToRepair); // push id that was passed in
            } else if (utui.util.typeOf(_specificExtensionToRepair) == "array") {
                // empty out fix_contidions_array
                fix_conditions_array = [];
                for (var i = 0; i < _specificExtensionToRepair.length; i++) {
                    fix_conditions_array.push(_specificExtensionToRepair[i]); // push only desired extension numbers
                }
            } else if (utui.util.typeOf(_specificExtensionToRepair) != "string" && utui.util.typeOf(_specificExtensionToRepair) != "array" && _specificExtensionToRepair != "all") {
                alert("Please pass in extension id(s) as either a string or array of strings");
            }

            // re order the keys of the utui.data.customizations object for each extension
            var reorderedObject = _(extensionObject)
                .toPairs()
                .sortBy(function(pair) {
                    return pair[0].replace(/_/, pair[0].split('_').length);
                })
                .fromPairs()
                .value();

            // clone the reordered object for use when we merge objects
            var clonedResultObject = Object.assign({}, reorderedObject);

            // old object with manipulated keys removed
            var oldObject = removeOldKeys(clonedResultObject, extension_number);

            // this is the starting array (entire object's key/value pairs)
            var startingConditionArray = _.toPairs(reorderedObject);

            // clear out safeArray for new extension's conditions
            safeArray = [];

            if (fix_conditions_array.indexOf(extension_number) > -1) {

                // First check if extension accordion is expanded. If it is, collapse it
                if (jQuery('#customizations_' + extension_number + ' h3').hasClass('ui-state-active')) {
                    jQuery('#customizations_' + extension_number + ' h3').click();
                }

                // add 'defined' to everything
                var uniqueArray = addDefined(startingConditionArray, extension_number);

                // filter through each condition row to make sure 'defined' is appropriate
                pushUniqueHelper(safeArray, uniqueArray, safeObject, extension_number);

                // organize the OR blocks into the correct key formats are in the correct order (xx_xx and xx_xx_xx)
                var currentArray = organizeOrBlocks(safeArray);

                // renumber all the keys to make sure they are placed in the correct order in UI
                var renumberedArray = renumberKeys(currentArray);

                // if we modified an extension object
                if (checkModifications(extensionObject, rebuildConditionBlocks(oldObject, renumberedArray))) {
                    // set master object to UTUI
                    object[extension_number] = rebuildConditionBlocks(oldObject, renumberedArray);
                }
            }

        });

        updateView();
    }
    var backupThenRepair = function() {
        // backup the current extensions before updating
        var account = utui.data.settings.account;
        var profile = utui.data.settings.profileid;
        var curr_date = (new Date()).getTime();
        var label = account + "_" + profile + "_" + "ext_data_" + curr_date;
        var backup = Object.assign({}, utui.data.customizations);
        localforage.setItem(label, backup).then(function(data) {
            console.log(data);
            repairConditions(utui.data.customizations);
        }).
        catch(function(err) {
            if (err) {
                console.warn(err);
            }
        });

        // capture all the backups currently in indexdb
        localforage.keys().then(function(keys) {
            // An array of all the key names.
            for (var i = 0; i < keys.length; i++) {
                if (i >= 5) {
                    // Remove more than 5 backups
                    localforage.removeItem(keys[i]).then(function() {}).
                    catch(function(err) {
                        console.log(err);
                    });
                }
            }
        }).
        catch(function(err) {
            console.log(err);
        });
    };

    backupThenRepair();

}

utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
    if (!$('#conditionCheck').length) {
        console.log('ELEMENT CHECK: FIX EXTENSION CONDITIONS')
        $('<button id="conditionCheck" class="btn btn-info tmui">Condition Check</button>')
            .css('float', 'left')
            .css('margin-top', '0px')
            .css('margin-left', '10px')
            .click(conditionChecker)
            .appendTo('#tabs-customizations .config_button_nofloat');
    }
})

utui.util.pubsub.subscribe(utui.constants.views.TAB_CLICK, function(e) {
    if (e.screen_name.toLowerCase() == "extensions") {
        fixExtensionConditionsListener()
    }
})