    // import localforage
    ! function(a) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
        else if ("function" == typeof define && define.amd) define([], a);
        else {
            var b;
            b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.localforage = a()
        }
    }(function() {
        return function a(b, c, d) {
            function e(g, h) {
                if (!c[g]) {
                    if (!b[g]) {
                        var i = "function" == typeof require && require;
                        if (!h && i) return i(g, !0);
                        if (f) return f(g, !0);
                        var j = new Error("Cannot find module '" + g + "'");
                        throw j.code = "MODULE_NOT_FOUND", j
                    }
                    var k = c[g] = {
                        exports: {}
                    };
                    b[g][0].call(k.exports, function(a) {
                        var c = b[g][1][a];
                        return e(c ? c : a)
                    }, k, k.exports, a, b, c, d)
                }
                return c[g].exports
            }
            for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
            return e
        }({
            1: [function(a, b, c) {
                (function(a) {
                    "use strict";

                    function c() {
                        k = !0;
                        for (var a, b, c = l.length; c;) {
                            for (b = l, l = [], a = -1; ++a < c;) b[a]();
                            c = l.length
                        }
                        k = !1
                    }

                    function d(a) {
                        1 !== l.push(a) || k || e()
                    }
                    var e, f = a.MutationObserver || a.WebKitMutationObserver;
                    if (f) {
                        var g = 0,
                            h = new f(c),
                            i = a.document.createTextNode("");
                        h.observe(i, {
                            characterData: !0
                        }), e = function() {
                            i.data = g = ++g % 2
                        }
                    } else if (a.setImmediate || "undefined" == typeof a.MessageChannel) e = "document" in a && "onreadystatechange" in a.document.createElement("script") ? function() {
                        var b = a.document.createElement("script");
                        b.onreadystatechange = function() {
                            c(), b.onreadystatechange = null, b.parentNode.removeChild(b), b = null
                        }, a.document.documentElement.appendChild(b)
                    } : function() {
                        setTimeout(c, 0)
                    };
                    else {
                        var j = new a.MessageChannel;
                        j.port1.onmessage = c, e = function() {
                            j.port2.postMessage(0)
                        }
                    }
                    var k, l = [];
                    b.exports = d
                }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {}],
            2: [function(a, b, c) {
                "use strict";

                function d() {}

                function e(a) {
                    if ("function" != typeof a) throw new TypeError("resolver must be a function");
                    this.state = s, this.queue = [], this.outcome = void 0, a !== d && i(this, a)
                }

                function f(a, b, c) {
                    this.promise = a, "function" == typeof b && (this.onFulfilled = b, this.callFulfilled = this.otherCallFulfilled), "function" == typeof c && (this.onRejected = c, this.callRejected = this.otherCallRejected)
                }

                function g(a, b, c) {
                    o(function() {
                        var d;
                        try {
                            d = b(c)
                        } catch (b) {
                            return p.reject(a, b)
                        }
                        d === a ? p.reject(a, new TypeError("Cannot resolve promise with itself")) : p.resolve(a, d)
                    })
                }

                function h(a) {
                    var b = a && a.then;
                    if (a && "object" == typeof a && "function" == typeof b) return function() {
                        b.apply(a, arguments)
                    }
                }

                function i(a, b) {
                    function c(b) {
                        f || (f = !0, p.reject(a, b))
                    }

                    function d(b) {
                        f || (f = !0, p.resolve(a, b))
                    }

                    function e() {
                        b(d, c)
                    }
                    var f = !1,
                        g = j(e);
                    "error" === g.status && c(g.value)
                }

                function j(a, b) {
                    var c = {};
                    try {
                        c.value = a(b), c.status = "success"
                    } catch (a) {
                        c.status = "error", c.value = a
                    }
                    return c
                }

                function k(a) {
                    return a instanceof this ? a : p.resolve(new this(d), a)
                }

                function l(a) {
                    var b = new this(d);
                    return p.reject(b, a)
                }

                function m(a) {
                    function b(a, b) {
                        function d(a) {
                            g[b] = a, ++h !== e || f || (f = !0, p.resolve(j, g))
                        }
                        c.resolve(a).then(d, function(a) {
                            f || (f = !0, p.reject(j, a))
                        })
                    }
                    var c = this;
                    if ("[object Array]" !== Object.prototype.toString.call(a)) return this.reject(new TypeError("must be an array"));
                    var e = a.length,
                        f = !1;
                    if (!e) return this.resolve([]);
                    for (var g = new Array(e), h = 0, i = -1, j = new this(d); ++i < e;) b(a[i], i);
                    return j
                }

                function n(a) {
                    function b(a) {
                        c.resolve(a).then(function(a) {
                            f || (f = !0, p.resolve(h, a))
                        }, function(a) {
                            f || (f = !0, p.reject(h, a))
                        })
                    }
                    var c = this;
                    if ("[object Array]" !== Object.prototype.toString.call(a)) return this.reject(new TypeError("must be an array"));
                    var e = a.length,
                        f = !1;
                    if (!e) return this.resolve([]);
                    for (var g = -1, h = new this(d); ++g < e;) b(a[g]);
                    return h
                }
                var o = a(1),
                    p = {},
                    q = ["REJECTED"],
                    r = ["FULFILLED"],
                    s = ["PENDING"];
                b.exports = c = e, e.prototype.catch = function(a) {
                    return this.then(null, a)
                }, e.prototype.then = function(a, b) {
                    if ("function" != typeof a && this.state === r || "function" != typeof b && this.state === q) return this;
                    var c = new this.constructor(d);
                    if (this.state !== s) {
                        var e = this.state === r ? a : b;
                        g(c, e, this.outcome)
                    } else this.queue.push(new f(c, a, b));
                    return c
                }, f.prototype.callFulfilled = function(a) {
                    p.resolve(this.promise, a)
                }, f.prototype.otherCallFulfilled = function(a) {
                    g(this.promise, this.onFulfilled, a)
                }, f.prototype.callRejected = function(a) {
                    p.reject(this.promise, a)
                }, f.prototype.otherCallRejected = function(a) {
                    g(this.promise, this.onRejected, a)
                }, p.resolve = function(a, b) {
                    var c = j(h, b);
                    if ("error" === c.status) return p.reject(a, c.value);
                    var d = c.value;
                    if (d) i(a, d);
                    else {
                        a.state = r, a.outcome = b;
                        for (var e = -1, f = a.queue.length; ++e < f;) a.queue[e].callFulfilled(b)
                    }
                    return a
                }, p.reject = function(a, b) {
                    a.state = q, a.outcome = b;
                    for (var c = -1, d = a.queue.length; ++c < d;) a.queue[c].callRejected(b);
                    return a
                }, c.resolve = k, c.reject = l, c.all = m, c.race = n
            }, {
                1: 1
            }],
            3: [function(a, b, c) {
                (function(b) {
                    "use strict";
                    "function" != typeof b.Promise && (b.Promise = a(2))
                }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                2: 2
            }],
            4: [function(a, b, c) {
                "use strict";

                function d(a, b) {
                    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
                }

                function e() {
                    try {
                        if ("undefined" != typeof indexedDB) return indexedDB;
                        if ("undefined" != typeof webkitIndexedDB) return webkitIndexedDB;
                        if ("undefined" != typeof mozIndexedDB) return mozIndexedDB;
                        if ("undefined" != typeof OIndexedDB) return OIndexedDB;
                        if ("undefined" != typeof msIndexedDB) return msIndexedDB
                    } catch (a) {}
                }

                function f() {
                    try {
                        if (!ga) return !1;
                        var a = "undefined" != typeof openDatabase && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform),
                            b = "function" == typeof fetch && fetch.toString().indexOf("[native code") !== -1;
                        return (!a || b) && "undefined" != typeof indexedDB && "undefined" != typeof IDBKeyRange
                    } catch (a) {
                        return !1
                    }
                }

                function g() {
                    return "function" == typeof openDatabase
                }

                function h() {
                    try {
                        return "undefined" != typeof localStorage && "setItem" in localStorage && localStorage.setItem
                    } catch (a) {
                        return !1
                    }
                }

                function i(a, b) {
                    a = a || [], b = b || {};
                    try {
                        return new Blob(a, b)
                    } catch (f) {
                        if ("TypeError" !== f.name) throw f;
                        for (var c = "undefined" != typeof BlobBuilder ? BlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : WebKitBlobBuilder, d = new c, e = 0; e < a.length; e += 1) d.append(a[e]);
                        return d.getBlob(b.type)
                    }
                }

                function j(a, b) {
                    b && a.then(function(a) {
                        b(null, a)
                    }, function(a) {
                        b(a)
                    })
                }

                function k(a, b, c) {
                    "function" == typeof b && a.then(b), "function" == typeof c && a.catch(c)
                }

                function l(a) {
                    for (var b = a.length, c = new ArrayBuffer(b), d = new Uint8Array(c), e = 0; e < b; e++) d[e] = a.charCodeAt(e);
                    return c
                }

                function m(a) {
                    return new ja(function(b) {
                        var c = a.transaction(ka, "readwrite"),
                            d = i([""]);
                        c.objectStore(ka).put(d, "key"), c.onabort = function(a) {
                            a.preventDefault(), a.stopPropagation(), b(!1)
                        }, c.oncomplete = function() {
                            var a = navigator.userAgent.match(/Chrome\/(\d+)/),
                                c = navigator.userAgent.match(/Edge\//);
                            b(c || !a || parseInt(a[1], 10) >= 43)
                        }
                    }).catch(function() {
                        return !1
                    })
                }

                function n(a) {
                    return "boolean" == typeof ha ? ja.resolve(ha) : m(a).then(function(a) {
                        return ha = a
                    })
                }

                function o(a) {
                    var b = ia[a.name],
                        c = {};
                    c.promise = new ja(function(a) {
                        c.resolve = a
                    }), b.deferredOperations.push(c), b.dbReady ? b.dbReady = b.dbReady.then(function() {
                        return c.promise
                    }) : b.dbReady = c.promise
                }

                function p(a) {
                    var b = ia[a.name],
                        c = b.deferredOperations.pop();
                    c && c.resolve()
                }

                function q(a, b) {
                    return new ja(function(c, d) {
                        if (a.db) {
                            if (!b) return c(a.db);
                            o(a), a.db.close()
                        }
                        var e = [a.name];
                        b && e.push(a.version);
                        var f = ga.open.apply(ga, e);
                        b && (f.onupgradeneeded = function(b) {
                            var c = f.result;
                            try {
                                c.createObjectStore(a.storeName), b.oldVersion <= 1 && c.createObjectStore(ka)
                            } catch (c) {
                                if ("ConstraintError" !== c.name) throw c;
                                console.warn('The database "' + a.name + '" has been upgraded from version ' + b.oldVersion + " to version " + b.newVersion + ', but the storage "' + a.storeName + '" already exists.')
                            }
                        }), f.onerror = function(a) {
                            a.preventDefault(), d(f.error)
                        }, f.onsuccess = function() {
                            c(f.result), p(a)
                        }
                    })
                }

                function r(a) {
                    return q(a, !1)
                }

                function s(a) {
                    return q(a, !0)
                }

                function t(a, b) {
                    if (!a.db) return !0;
                    var c = !a.db.objectStoreNames.contains(a.storeName),
                        d = a.version < a.db.version,
                        e = a.version > a.db.version;
                    if (d && (a.version !== b && console.warn('The database "' + a.name + "\" can't be downgraded from version " + a.db.version + " to version " + a.version + "."), a.version = a.db.version), e || c) {
                        if (c) {
                            var f = a.db.version + 1;
                            f > a.version && (a.version = f)
                        }
                        return !0
                    }
                    return !1
                }

                function u(a) {
                    return new ja(function(b, c) {
                        var d = new FileReader;
                        d.onerror = c, d.onloadend = function(c) {
                            var d = btoa(c.target.result || "");
                            b({
                                __local_forage_encoded_blob: !0,
                                data: d,
                                type: a.type
                            })
                        }, d.readAsBinaryString(a)
                    })
                }

                function v(a) {
                    var b = l(atob(a.data));
                    return i([b], {
                        type: a.type
                    })
                }

                function w(a) {
                    return a && a.__local_forage_encoded_blob
                }

                function x(a) {
                    var b = this,
                        c = b._initReady().then(function() {
                            var a = ia[b._dbInfo.name];
                            if (a && a.dbReady) return a.dbReady
                        });
                    return k(c, a, a), c
                }

                function y(a) {
                    function b() {
                        return ja.resolve()
                    }
                    var c = this,
                        d = {
                            db: null
                        };
                    if (a)
                        for (var e in a) d[e] = a[e];
                    ia || (ia = {});
                    var f = ia[d.name];
                    f || (f = {
                        forages: [],
                        db: null,
                        dbReady: null,
                        deferredOperations: []
                    }, ia[d.name] = f), f.forages.push(c), c._initReady || (c._initReady = c.ready, c.ready = x);
                    for (var g = [], h = 0; h < f.forages.length; h++) {
                        var i = f.forages[h];
                        i !== c && g.push(i._initReady().catch(b))
                    }
                    var j = f.forages.slice(0);
                    return ja.all(g).then(function() {
                        return d.db = f.db, r(d)
                    }).then(function(a) {
                        return d.db = a, t(d, c._defaultConfig.version) ? s(d) : a
                    }).then(function(a) {
                        d.db = f.db = a, c._dbInfo = d;
                        for (var b = 0; b < j.length; b++) {
                            var e = j[b];
                            e !== c && (e._dbInfo.db = d.db, e._dbInfo.version = d.version)
                        }
                    })
                }

                function z(a, b) {
                    var c = this;
                    "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                    var d = new ja(function(b, d) {
                        c.ready().then(function() {
                            var e = c._dbInfo,
                                f = e.db.transaction(e.storeName, "readonly").objectStore(e.storeName),
                                g = f.get(a);
                            g.onsuccess = function() {
                                var a = g.result;
                                void 0 === a && (a = null), w(a) && (a = v(a)), b(a)
                            }, g.onerror = function() {
                                d(g.error)
                            }
                        }).catch(d)
                    });
                    return j(d, b), d
                }

                function A(a, b) {
                    var c = this,
                        d = new ja(function(b, d) {
                            c.ready().then(function() {
                                var e = c._dbInfo,
                                    f = e.db.transaction(e.storeName, "readonly").objectStore(e.storeName),
                                    g = f.openCursor(),
                                    h = 1;
                                g.onsuccess = function() {
                                    var c = g.result;
                                    if (c) {
                                        var d = c.value;
                                        w(d) && (d = v(d));
                                        var e = a(d, c.key, h++);
                                        void 0 !== e ? b(e) : c.continue()
                                    } else b()
                                }, g.onerror = function() {
                                    d(g.error)
                                }
                            }).catch(d)
                        });
                    return j(d, b), d
                }

                function B(a, b, c) {
                    var d = this;
                    "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                    var e = new ja(function(c, e) {
                        var f;
                        d.ready().then(function() {
                            return f = d._dbInfo, "[object Blob]" === la.call(b) ? n(f.db).then(function(a) {
                                return a ? b : u(b)
                            }) : b
                        }).then(function(b) {
                            var d = f.db.transaction(f.storeName, "readwrite"),
                                g = d.objectStore(f.storeName),
                                h = g.put(b, a);
                            null === b && (b = void 0), d.oncomplete = function() {
                                void 0 === b && (b = null), c(b)
                            }, d.onabort = d.onerror = function() {
                                var a = h.error ? h.error : h.transaction.error;
                                e(a)
                            }
                        }).catch(e)
                    });
                    return j(e, c), e
                }

                function C(a, b) {
                    var c = this;
                    "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                    var d = new ja(function(b, d) {
                        c.ready().then(function() {
                            var e = c._dbInfo,
                                f = e.db.transaction(e.storeName, "readwrite"),
                                g = f.objectStore(e.storeName),
                                h = g.delete(a);
                            f.oncomplete = function() {
                                b()
                            }, f.onerror = function() {
                                d(h.error)
                            }, f.onabort = function() {
                                var a = h.error ? h.error : h.transaction.error;
                                d(a)
                            }
                        }).catch(d)
                    });
                    return j(d, b), d
                }

                function D(a) {
                    var b = this,
                        c = new ja(function(a, c) {
                            b.ready().then(function() {
                                var d = b._dbInfo,
                                    e = d.db.transaction(d.storeName, "readwrite"),
                                    f = e.objectStore(d.storeName),
                                    g = f.clear();
                                e.oncomplete = function() {
                                    a()
                                }, e.onabort = e.onerror = function() {
                                    var a = g.error ? g.error : g.transaction.error;
                                    c(a)
                                }
                            }).catch(c)
                        });
                    return j(c, a), c
                }

                function E(a) {
                    var b = this,
                        c = new ja(function(a, c) {
                            b.ready().then(function() {
                                var d = b._dbInfo,
                                    e = d.db.transaction(d.storeName, "readonly").objectStore(d.storeName),
                                    f = e.count();
                                f.onsuccess = function() {
                                    a(f.result)
                                }, f.onerror = function() {
                                    c(f.error)
                                }
                            }).catch(c)
                        });
                    return j(c, a), c
                }

                function F(a, b) {
                    var c = this,
                        d = new ja(function(b, d) {
                            return a < 0 ? void b(null) : void c.ready().then(function() {
                                var e = c._dbInfo,
                                    f = e.db.transaction(e.storeName, "readonly").objectStore(e.storeName),
                                    g = !1,
                                    h = f.openCursor();
                                h.onsuccess = function() {
                                    var c = h.result;
                                    return c ? void(0 === a ? b(c.key) : g ? b(c.key) : (g = !0, c.advance(a))) : void b(null)
                                }, h.onerror = function() {
                                    d(h.error)
                                }
                            }).catch(d)
                        });
                    return j(d, b), d
                }

                function G(a) {
                    var b = this,
                        c = new ja(function(a, c) {
                            b.ready().then(function() {
                                var d = b._dbInfo,
                                    e = d.db.transaction(d.storeName, "readonly").objectStore(d.storeName),
                                    f = e.openCursor(),
                                    g = [];
                                f.onsuccess = function() {
                                    var b = f.result;
                                    return b ? (g.push(b.key), void b.continue()) : void a(g)
                                }, f.onerror = function() {
                                    c(f.error)
                                }
                            }).catch(c)
                        });
                    return j(c, a), c
                }

                function H(a) {
                    var b, c, d, e, f, g = .75 * a.length,
                        h = a.length,
                        i = 0;
                    "=" === a[a.length - 1] && (g--, "=" === a[a.length - 2] && g--);
                    var j = new ArrayBuffer(g),
                        k = new Uint8Array(j);
                    for (b = 0; b < h; b += 4) c = na.indexOf(a[b]), d = na.indexOf(a[b + 1]), e = na.indexOf(a[b + 2]), f = na.indexOf(a[b + 3]), k[i++] = c << 2 | d >> 4, k[i++] = (15 & d) << 4 | e >> 2, k[i++] = (3 & e) << 6 | 63 & f;
                    return j
                }

                function I(a) {
                    var b, c = new Uint8Array(a),
                        d = "";
                    for (b = 0; b < c.length; b += 3) d += na[c[b] >> 2], d += na[(3 & c[b]) << 4 | c[b + 1] >> 4], d += na[(15 & c[b + 1]) << 2 | c[b + 2] >> 6], d += na[63 & c[b + 2]];
                    return c.length % 3 === 2 ? d = d.substring(0, d.length - 1) + "=" : c.length % 3 === 1 && (d = d.substring(0, d.length - 2) + "=="), d
                }

                function J(a, b) {
                    var c = "";
                    if (a && (c = Ea.call(a)), a && ("[object ArrayBuffer]" === c || a.buffer && "[object ArrayBuffer]" === Ea.call(a.buffer))) {
                        var d, e = qa;
                        a instanceof ArrayBuffer ? (d = a, e += sa) : (d = a.buffer, "[object Int8Array]" === c ? e += ua : "[object Uint8Array]" === c ? e += va : "[object Uint8ClampedArray]" === c ? e += wa : "[object Int16Array]" === c ? e += xa : "[object Uint16Array]" === c ? e += za : "[object Int32Array]" === c ? e += ya : "[object Uint32Array]" === c ? e += Aa : "[object Float32Array]" === c ? e += Ba : "[object Float64Array]" === c ? e += Ca : b(new Error("Failed to get type for BinaryArray"))), b(e + I(d))
                    } else if ("[object Blob]" === c) {
                        var f = new FileReader;
                        f.onload = function() {
                            var c = oa + a.type + "~" + I(this.result);
                            b(qa + ta + c)
                        }, f.readAsArrayBuffer(a)
                    } else try {
                        b(JSON.stringify(a))
                    } catch (c) {
                        console.error("Couldn't convert value into a JSON string: ", a), b(null, c)
                    }
                }

                function K(a) {
                    if (a.substring(0, ra) !== qa) return JSON.parse(a);
                    var b, c = a.substring(Da),
                        d = a.substring(ra, Da);
                    if (d === ta && pa.test(c)) {
                        var e = c.match(pa);
                        b = e[1], c = c.substring(e[0].length)
                    }
                    var f = H(c);
                    switch (d) {
                        case sa:
                            return f;
                        case ta:
                            return i([f], {
                                type: b
                            });
                        case ua:
                            return new Int8Array(f);
                        case va:
                            return new Uint8Array(f);
                        case wa:
                            return new Uint8ClampedArray(f);
                        case xa:
                            return new Int16Array(f);
                        case za:
                            return new Uint16Array(f);
                        case ya:
                            return new Int32Array(f);
                        case Aa:
                            return new Uint32Array(f);
                        case Ba:
                            return new Float32Array(f);
                        case Ca:
                            return new Float64Array(f);
                        default:
                            throw new Error("Unkown type: " + d)
                    }
                }

                function L(a) {
                    var b = this,
                        c = {
                            db: null
                        };
                    if (a)
                        for (var d in a) c[d] = "string" != typeof a[d] ? a[d].toString() : a[d];
                    var e = new ja(function(a, d) {
                        try {
                            c.db = openDatabase(c.name, String(c.version), c.description, c.size)
                        } catch (a) {
                            return d(a)
                        }
                        c.db.transaction(function(e) {
                            e.executeSql("CREATE TABLE IF NOT EXISTS " + c.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], function() {
                                b._dbInfo = c, a()
                            }, function(a, b) {
                                d(b)
                            })
                        })
                    });
                    return c.serializer = Fa, e
                }

                function M(a, b) {
                    var c = this;
                    "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                    var d = new ja(function(b, d) {
                        c.ready().then(function() {
                            var e = c._dbInfo;
                            e.db.transaction(function(c) {
                                c.executeSql("SELECT * FROM " + e.storeName + " WHERE key = ? LIMIT 1", [a], function(a, c) {
                                    var d = c.rows.length ? c.rows.item(0).value : null;
                                    d && (d = e.serializer.deserialize(d)), b(d)
                                }, function(a, b) {
                                    d(b)
                                })
                            })
                        }).catch(d)
                    });
                    return j(d, b), d
                }

                function N(a, b) {
                    var c = this,
                        d = new ja(function(b, d) {
                            c.ready().then(function() {
                                var e = c._dbInfo;
                                e.db.transaction(function(c) {
                                    c.executeSql("SELECT * FROM " + e.storeName, [], function(c, d) {
                                        for (var f = d.rows, g = f.length, h = 0; h < g; h++) {
                                            var i = f.item(h),
                                                j = i.value;
                                            if (j && (j = e.serializer.deserialize(j)), j = a(j, i.key, h + 1), void 0 !== j) return void b(j)
                                        }
                                        b()
                                    }, function(a, b) {
                                        d(b)
                                    })
                                })
                            }).catch(d)
                        });
                    return j(d, b), d
                }

                function O(a, b, c, d) {
                    var e = this;
                    "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                    var f = new ja(function(f, g) {
                        e.ready().then(function() {
                            void 0 === b && (b = null);
                            var h = b,
                                i = e._dbInfo;
                            i.serializer.serialize(b, function(b, j) {
                                j ? g(j) : i.db.transaction(function(c) {
                                    c.executeSql("INSERT OR REPLACE INTO " + i.storeName + " (key, value) VALUES (?, ?)", [a, b], function() {
                                        f(h)
                                    }, function(a, b) {
                                        g(b)
                                    })
                                }, function(b) {
                                    if (b.code === b.QUOTA_ERR) {
                                        if (d > 0) return void f(O.apply(e, [a, h, c, d - 1]));
                                        g(b)
                                    }
                                })
                            })
                        }).catch(g)
                    });
                    return j(f, c), f
                }

                function P(a, b, c) {
                    return O.apply(this, [a, b, c, 1])
                }

                function Q(a, b) {
                    var c = this;
                    "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                    var d = new ja(function(b, d) {
                        c.ready().then(function() {
                            var e = c._dbInfo;
                            e.db.transaction(function(c) {
                                c.executeSql("DELETE FROM " + e.storeName + " WHERE key = ?", [a], function() {
                                    b()
                                }, function(a, b) {
                                    d(b)
                                })
                            })
                        }).catch(d)
                    });
                    return j(d, b), d
                }

                function R(a) {
                    var b = this,
                        c = new ja(function(a, c) {
                            b.ready().then(function() {
                                var d = b._dbInfo;
                                d.db.transaction(function(b) {
                                    b.executeSql("DELETE FROM " + d.storeName, [], function() {
                                        a()
                                    }, function(a, b) {
                                        c(b)
                                    })
                                })
                            }).catch(c)
                        });
                    return j(c, a), c
                }

                function S(a) {
                    var b = this,
                        c = new ja(function(a, c) {
                            b.ready().then(function() {
                                var d = b._dbInfo;
                                d.db.transaction(function(b) {
                                    b.executeSql("SELECT COUNT(key) as c FROM " + d.storeName, [], function(b, c) {
                                        var d = c.rows.item(0).c;
                                        a(d)
                                    }, function(a, b) {
                                        c(b)
                                    })
                                })
                            }).catch(c)
                        });
                    return j(c, a), c
                }

                function T(a, b) {
                    var c = this,
                        d = new ja(function(b, d) {
                            c.ready().then(function() {
                                var e = c._dbInfo;
                                e.db.transaction(function(c) {
                                    c.executeSql("SELECT key FROM " + e.storeName + " WHERE id = ? LIMIT 1", [a + 1], function(a, c) {
                                        var d = c.rows.length ? c.rows.item(0).key : null;
                                        b(d)
                                    }, function(a, b) {
                                        d(b)
                                    })
                                })
                            }).catch(d)
                        });
                    return j(d, b), d
                }

                function U(a) {
                    var b = this,
                        c = new ja(function(a, c) {
                            b.ready().then(function() {
                                var d = b._dbInfo;
                                d.db.transaction(function(b) {
                                    b.executeSql("SELECT key FROM " + d.storeName, [], function(b, c) {
                                        for (var d = [], e = 0; e < c.rows.length; e++) d.push(c.rows.item(e).key);
                                        a(d)
                                    }, function(a, b) {
                                        c(b)
                                    })
                                })
                            }).catch(c)
                        });
                    return j(c, a), c
                }

                function V(a) {
                    var b = this,
                        c = {};
                    if (a)
                        for (var d in a) c[d] = a[d];
                    return c.keyPrefix = c.name + "/", c.storeName !== b._defaultConfig.storeName && (c.keyPrefix += c.storeName + "/"), b._dbInfo = c, c.serializer = Fa, ja.resolve()
                }

                function W(a) {
                    var b = this,
                        c = b.ready().then(function() {
                            for (var a = b._dbInfo.keyPrefix, c = localStorage.length - 1; c >= 0; c--) {
                                var d = localStorage.key(c);
                                0 === d.indexOf(a) && localStorage.removeItem(d)
                            }
                        });
                    return j(c, a), c
                }

                function X(a, b) {
                    var c = this;
                    "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                    var d = c.ready().then(function() {
                        var b = c._dbInfo,
                            d = localStorage.getItem(b.keyPrefix + a);
                        return d && (d = b.serializer.deserialize(d)), d
                    });
                    return j(d, b), d
                }

                function Y(a, b) {
                    var c = this,
                        d = c.ready().then(function() {
                            for (var b = c._dbInfo, d = b.keyPrefix, e = d.length, f = localStorage.length, g = 1, h = 0; h < f; h++) {
                                var i = localStorage.key(h);
                                if (0 === i.indexOf(d)) {
                                    var j = localStorage.getItem(i);
                                    if (j && (j = b.serializer.deserialize(j)), j = a(j, i.substring(e), g++), void 0 !== j) return j
                                }
                            }
                        });
                    return j(d, b), d
                }

                function Z(a, b) {
                    var c = this,
                        d = c.ready().then(function() {
                            var b, d = c._dbInfo;
                            try {
                                b = localStorage.key(a)
                            } catch (a) {
                                b = null
                            }
                            return b && (b = b.substring(d.keyPrefix.length)), b
                        });
                    return j(d, b), d
                }

                function $(a) {
                    var b = this,
                        c = b.ready().then(function() {
                            for (var a = b._dbInfo, c = localStorage.length, d = [], e = 0; e < c; e++) 0 === localStorage.key(e).indexOf(a.keyPrefix) && d.push(localStorage.key(e).substring(a.keyPrefix.length));
                            return d
                        });
                    return j(c, a), c
                }

                function _(a) {
                    var b = this,
                        c = b.keys().then(function(a) {
                            return a.length
                        });
                    return j(c, a), c
                }

                function aa(a, b) {
                    var c = this;
                    "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                    var d = c.ready().then(function() {
                        var b = c._dbInfo;
                        localStorage.removeItem(b.keyPrefix + a)
                    });
                    return j(d, b), d
                }

                function ba(a, b, c) {
                    var d = this;
                    "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                    var e = d.ready().then(function() {
                        void 0 === b && (b = null);
                        var c = b;
                        return new ja(function(e, f) {
                            var g = d._dbInfo;
                            g.serializer.serialize(b, function(b, d) {
                                if (d) f(d);
                                else try {
                                    localStorage.setItem(g.keyPrefix + a, b), e(c)
                                } catch (a) {
                                    "QuotaExceededError" !== a.name && "NS_ERROR_DOM_QUOTA_REACHED" !== a.name || f(a), f(a)
                                }
                            })
                        })
                    });
                    return j(e, c), e
                }

                function ca(a, b) {
                    a[b] = function() {
                        var c = arguments;
                        return a.ready().then(function() {
                            return a[b].apply(a, c)
                        })
                    }
                }

                function da() {
                    for (var a = 1; a < arguments.length; a++) {
                        var b = arguments[a];
                        if (b)
                            for (var c in b) b.hasOwnProperty(c) && (Oa(b[c]) ? arguments[0][c] = b[c].slice() : arguments[0][c] = b[c])
                    }
                    return arguments[0]
                }

                function ea(a) {
                    for (var b in Ja)
                        if (Ja.hasOwnProperty(b) && Ja[b] === a) return !0;
                    return !1
                }
                var fa = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
                        return typeof a
                    } : function(a) {
                        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
                    },
                    ga = e();
                "undefined" == typeof Promise && a(3);
                var ha, ia, ja = Promise,
                    ka = "local-forage-detect-blob-support",
                    la = Object.prototype.toString,
                    ma = {
                        _driver: "asyncStorage",
                        _initStorage: y,
                        iterate: A,
                        getItem: z,
                        setItem: B,
                        removeItem: C,
                        clear: D,
                        length: E,
                        key: F,
                        keys: G
                    },
                    na = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                    oa = "~~local_forage_type~",
                    pa = /^~~local_forage_type~([^~]+)~/,
                    qa = "__lfsc__:",
                    ra = qa.length,
                    sa = "arbf",
                    ta = "blob",
                    ua = "si08",
                    va = "ui08",
                    wa = "uic8",
                    xa = "si16",
                    ya = "si32",
                    za = "ur16",
                    Aa = "ui32",
                    Ba = "fl32",
                    Ca = "fl64",
                    Da = ra + sa.length,
                    Ea = Object.prototype.toString,
                    Fa = {
                        serialize: J,
                        deserialize: K,
                        stringToBuffer: H,
                        bufferToString: I
                    },
                    Ga = {
                        _driver: "webSQLStorage",
                        _initStorage: L,
                        iterate: N,
                        getItem: M,
                        setItem: P,
                        removeItem: Q,
                        clear: R,
                        length: S,
                        key: T,
                        keys: U
                    },
                    Ha = {
                        _driver: "localStorageWrapper",
                        _initStorage: V,
                        iterate: Y,
                        getItem: X,
                        setItem: ba,
                        removeItem: aa,
                        clear: W,
                        length: _,
                        key: Z,
                        keys: $
                    },
                    Ia = {},
                    Ja = {
                        INDEXEDDB: "asyncStorage",
                        LOCALSTORAGE: "localStorageWrapper",
                        WEBSQL: "webSQLStorage"
                    },
                    Ka = [Ja.INDEXEDDB, Ja.WEBSQL, Ja.LOCALSTORAGE],
                    La = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"],
                    Ma = {
                        description: "",
                        driver: Ka.slice(),
                        name: "localforage",
                        size: 4980736,
                        storeName: "keyvaluepairs",
                        version: 1
                    },
                    Na = {};
                Na[Ja.INDEXEDDB] = f(), Na[Ja.WEBSQL] = g(), Na[Ja.LOCALSTORAGE] = h();
                var Oa = Array.isArray || function(a) {
                        return "[object Array]" === Object.prototype.toString.call(a)
                    },
                    Pa = function() {
                        function a(b) {
                            d(this, a), this.INDEXEDDB = Ja.INDEXEDDB, this.LOCALSTORAGE = Ja.LOCALSTORAGE, this.WEBSQL = Ja.WEBSQL, this._defaultConfig = da({}, Ma), this._config = da({}, this._defaultConfig, b), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function() {})
                        }
                        return a.prototype.config = function(a) {
                            if ("object" === ("undefined" == typeof a ? "undefined" : fa(a))) {
                                if (this._ready) return new Error("Can't call config() after localforage has been used.");
                                for (var b in a) {
                                    if ("storeName" === b && (a[b] = a[b].replace(/\W/g, "_")), "version" === b && "number" != typeof a[b]) return new Error("Database version must be a number.");
                                    this._config[b] = a[b]
                                }
                                return !("driver" in a && a.driver) || this.setDriver(this._config.driver)
                            }
                            return "string" == typeof a ? this._config[a] : this._config
                        }, a.prototype.defineDriver = function(a, b, c) {
                            var d = new ja(function(b, c) {
                                try {
                                    var d = a._driver,
                                        e = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),
                                        f = new Error("Custom driver name already in use: " + a._driver);
                                    if (!a._driver) return void c(e);
                                    if (ea(a._driver)) return void c(f);
                                    for (var g = La.concat("_initStorage"), h = 0; h < g.length; h++) {
                                        var i = g[h];
                                        if (!i || !a[i] || "function" != typeof a[i]) return void c(e)
                                    }
                                    var j = ja.resolve(!0);
                                    "_support" in a && (j = a._support && "function" == typeof a._support ? a._support() : ja.resolve(!!a._support)), j.then(function(c) {
                                        Na[d] = c, Ia[d] = a, b()
                                    }, c)
                                } catch (a) {
                                    c(a)
                                }
                            });
                            return k(d, b, c), d
                        }, a.prototype.driver = function() {
                            return this._driver || null
                        }, a.prototype.getDriver = function(a, b, c) {
                            var d = this,
                                e = ja.resolve().then(function() {
                                    if (!ea(a)) {
                                        if (Ia[a]) return Ia[a];
                                        throw new Error("Driver not found.")
                                    }
                                    switch (a) {
                                        case d.INDEXEDDB:
                                            return ma;
                                        case d.LOCALSTORAGE:
                                            return Ha;
                                        case d.WEBSQL:
                                            return Ga
                                    }
                                });
                            return k(e, b, c), e
                        }, a.prototype.getSerializer = function(a) {
                            var b = ja.resolve(Fa);
                            return k(b, a), b
                        }, a.prototype.ready = function(a) {
                            var b = this,
                                c = b._driverSet.then(function() {
                                    return null === b._ready && (b._ready = b._initDriver()), b._ready
                                });
                            return k(c, a, a), c
                        }, a.prototype.setDriver = function(a, b, c) {
                            function d() {
                                g._config.driver = g.driver()
                            }

                            function e(a) {
                                return g._extend(a), d(), g._ready = g._initStorage(g._config), g._ready
                            }

                            function f(a) {
                                return function() {
                                    function b() {
                                        for (; c < a.length;) {
                                            var f = a[c];
                                            return c++, g._dbInfo = null, g._ready = null, g.getDriver(f).then(e).catch(b)
                                        }
                                        d();
                                        var h = new Error("No available storage method found.");
                                        return g._driverSet = ja.reject(h), g._driverSet
                                    }
                                    var c = 0;
                                    return b()
                                }
                            }
                            var g = this;
                            Oa(a) || (a = [a]);
                            var h = this._getSupportedDrivers(a),
                                i = null !== this._driverSet ? this._driverSet.catch(function() {
                                    return ja.resolve()
                                }) : ja.resolve();
                            return this._driverSet = i.then(function() {
                                var a = h[0];
                                return g._dbInfo = null, g._ready = null, g.getDriver(a).then(function(a) {
                                    g._driver = a._driver, d(), g._wrapLibraryMethodsWithReady(), g._initDriver = f(h)
                                })
                            }).catch(function() {
                                d();
                                var a = new Error("No available storage method found.");
                                return g._driverSet = ja.reject(a), g._driverSet
                            }), k(this._driverSet, b, c), this._driverSet
                        }, a.prototype.supports = function(a) {
                            return !!Na[a]
                        }, a.prototype._extend = function(a) {
                            da(this, a)
                        }, a.prototype._getSupportedDrivers = function(a) {
                            for (var b = [], c = 0, d = a.length; c < d; c++) {
                                var e = a[c];
                                this.supports(e) && b.push(e)
                            }
                            return b
                        }, a.prototype._wrapLibraryMethodsWithReady = function() {
                            for (var a = 0; a < La.length; a++) ca(this, La[a])
                        }, a.prototype.createInstance = function(b) {
                            return new a(b)
                        }, a
                    }(),
                    Qa = new Pa;
                b.exports = Qa
            }, {
                3: 3
            }]
        }, {}, [4])(4)
    });

    // import lodash
    window.dylan = window.dylan || {};
    window.dylan.lodash = window.dylan.lodash || function() {
        var undefined, VERSION = "4.17.5",
            LARGE_ARRAY_SIZE = 200,
            CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",
            FUNC_ERROR_TEXT = "Expected a function",
            HASH_UNDEFINED = "__lodash_hash_undefined__",
            MAX_MEMOIZE_SIZE = 500,
            PLACEHOLDER = "__lodash_placeholder__",
            CLONE_DEEP_FLAG = 1,
            CLONE_FLAT_FLAG = 2,
            CLONE_SYMBOLS_FLAG = 4,
            COMPARE_PARTIAL_FLAG = 1,
            COMPARE_UNORDERED_FLAG = 2,
            WRAP_BIND_FLAG = 1,
            WRAP_BIND_KEY_FLAG = 2,
            WRAP_CURRY_BOUND_FLAG = 4,
            WRAP_CURRY_FLAG = 8,
            WRAP_CURRY_RIGHT_FLAG = 16,
            WRAP_PARTIAL_FLAG = 32,
            WRAP_PARTIAL_RIGHT_FLAG = 64,
            WRAP_ARY_FLAG = 128,
            WRAP_REARG_FLAG = 256,
            WRAP_FLIP_FLAG = 512,
            DEFAULT_TRUNC_LENGTH = 30,
            DEFAULT_TRUNC_OMISSION = "...",
            HOT_COUNT = 800,
            HOT_SPAN = 16,
            LAZY_FILTER_FLAG = 1,
            LAZY_MAP_FLAG = 2,
            LAZY_WHILE_FLAG = 3,
            INFINITY = 1 / 0,
            MAX_SAFE_INTEGER = 9007199254740991,
            MAX_INTEGER = 1.7976931348623157e308,
            NAN = 0 / 0,
            MAX_ARRAY_LENGTH = 4294967295,
            MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
            HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1,
            wrapFlags = [
                ["ary", WRAP_ARY_FLAG],
                ["bind", WRAP_BIND_FLAG],
                ["bindKey", WRAP_BIND_KEY_FLAG],
                ["curry", WRAP_CURRY_FLAG],
                ["curryRight", WRAP_CURRY_RIGHT_FLAG],
                ["flip", WRAP_FLIP_FLAG],
                ["partial", WRAP_PARTIAL_FLAG],
                ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
                ["rearg", WRAP_REARG_FLAG]
            ],
            argsTag = "[object Arguments]",
            arrayTag = "[object Array]",
            asyncTag = "[object AsyncFunction]",
            boolTag = "[object Boolean]",
            dateTag = "[object Date]",
            domExcTag = "[object DOMException]",
            errorTag = "[object Error]",
            funcTag = "[object Function]",
            genTag = "[object GeneratorFunction]",
            mapTag = "[object Map]",
            numberTag = "[object Number]",
            nullTag = "[object Null]",
            objectTag = "[object Object]",
            promiseTag = "[object Promise]",
            proxyTag = "[object Proxy]",
            regexpTag = "[object RegExp]",
            setTag = "[object Set]",
            stringTag = "[object String]",
            symbolTag = "[object Symbol]",
            undefinedTag = "[object Undefined]",
            weakMapTag = "[object WeakMap]",
            weakSetTag = "[object WeakSet]",
            arrayBufferTag = "[object ArrayBuffer]",
            dataViewTag = "[object DataView]",
            float32Tag = "[object Float32Array]",
            float64Tag = "[object Float64Array]",
            int8Tag = "[object Int8Array]",
            int16Tag = "[object Int16Array]",
            int32Tag = "[object Int32Array]",
            uint8Tag = "[object Uint8Array]",
            uint8ClampedTag = "[object Uint8ClampedArray]",
            uint16Tag = "[object Uint16Array]",
            uint32Tag = "[object Uint32Array]",
            reEmptyStringLeading = /\b__p \+= '';/g,
            reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
            reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
            reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
            reUnescapedHtml = /[&<>"']/g,
            reHasEscapedHtml = RegExp(reEscapedHtml.source),
            reHasUnescapedHtml = RegExp(reUnescapedHtml.source),
            reEscape = /<%-([\s\S]+?)%>/g,
            reEvaluate = /<%([\s\S]+?)%>/g,
            reInterpolate = /<%=([\s\S]+?)%>/g,
            reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
            reIsPlainProp = /^\w*$/,
            rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
            reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
            reHasRegExpChar = RegExp(reRegExpChar.source),
            reTrim = /^\s+|\s+$/g,
            reTrimStart = /^\s+/,
            reTrimEnd = /\s+$/,
            reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
            reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
            reSplitDetails = /,? & /,
            reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
            reEscapeChar = /\\(\\)?/g,
            reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
            reFlags = /\w*$/,
            reIsBadHex = /^[-+]0x[0-9a-f]+$/i,
            reIsBinary = /^0b[01]+$/i,
            reIsHostCtor = /^\[object .+?Constructor\]$/,
            reIsOctal = /^0o[0-7]+$/i,
            reIsUint = /^(?:0|[1-9]\d*)$/,
            reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
            reNoMatch = /($^)/,
            reUnescapedString = /['\n\r\u2028\u2029\\]/g,
            rsAstralRange = "\\ud800-\\udfff",
            rsComboMarksRange = "\\u0300-\\u036f",
            reComboHalfMarksRange = "\\ufe20-\\ufe2f",
            rsComboSymbolsRange = "\\u20d0-\\u20ff",
            rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
            rsDingbatRange = "\\u2700-\\u27bf",
            rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff",
            rsMathOpRange = "\\xac\\xb1\\xd7\\xf7",
            rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
            rsPunctuationRange = "\\u2000-\\u206f",
            rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
            rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde",
            rsVarRange = "\\ufe0e\\ufe0f",
            rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange,
            rsApos = "['’]",
            rsAstral = "[" + rsAstralRange + "]",
            rsBreak = "[" + rsBreakRange + "]",
            rsCombo = "[" + rsComboRange + "]",
            rsDigits = "\\d+",
            rsDingbat = "[" + rsDingbatRange + "]",
            rsLower = "[" + rsLowerRange + "]",
            rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]",
            rsFitz = "\\ud83c[\\udffb-\\udfff]",
            rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")",
            rsNonAstral = "[^" + rsAstralRange + "]",
            rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
            rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
            rsUpper = "[" + rsUpperRange + "]",
            rsZWJ = "\\u200d",
            rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")",
            rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")",
            rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?",
            rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?",
            reOptMod = rsModifier + "?",
            rsOptVar = "[" + rsVarRange + "]?",
            rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*",
            rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
            rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
            rsSeq = rsOptVar + reOptMod + rsOptJoin,
            rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq,
            rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")",
            reApos = RegExp(rsApos, "g"),
            reComboMark = RegExp(rsCombo, "g"),
            reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g"),
            reUnicodeWord = RegExp([rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")", rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")", rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower, rsUpper + "+" + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join("|"), "g"),
            reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]"),
            reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
            contextProps = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"],
            templateCounter = -1,
            typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        var cloneableTags = {};
        cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
        cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
        var deburredLetters = {
                "À": "A",
                "Á": "A",
                "Â": "A",
                "Ã": "A",
                "Ä": "A",
                "Å": "A",
                "à": "a",
                "á": "a",
                "â": "a",
                "ã": "a",
                "ä": "a",
                "å": "a",
                "Ç": "C",
                "ç": "c",
                "Ð": "D",
                "ð": "d",
                "È": "E",
                "É": "E",
                "Ê": "E",
                "Ë": "E",
                "è": "e",
                "é": "e",
                "ê": "e",
                "ë": "e",
                "Ì": "I",
                "Í": "I",
                "Î": "I",
                "Ï": "I",
                "ì": "i",
                "í": "i",
                "î": "i",
                "ï": "i",
                "Ñ": "N",
                "ñ": "n",
                "Ò": "O",
                "Ó": "O",
                "Ô": "O",
                "Õ": "O",
                "Ö": "O",
                "Ø": "O",
                "ò": "o",
                "ó": "o",
                "ô": "o",
                "õ": "o",
                "ö": "o",
                "ø": "o",
                "Ù": "U",
                "Ú": "U",
                "Û": "U",
                "Ü": "U",
                "ù": "u",
                "ú": "u",
                "û": "u",
                "ü": "u",
                "Ý": "Y",
                "ý": "y",
                "ÿ": "y",
                "Æ": "Ae",
                "æ": "ae",
                "Þ": "Th",
                "þ": "th",
                "ß": "ss",
                "Ā": "A",
                "Ă": "A",
                "Ą": "A",
                "ā": "a",
                "ă": "a",
                "ą": "a",
                "Ć": "C",
                "Ĉ": "C",
                "Ċ": "C",
                "Č": "C",
                "ć": "c",
                "ĉ": "c",
                "ċ": "c",
                "č": "c",
                "Ď": "D",
                "Đ": "D",
                "ď": "d",
                "đ": "d",
                "Ē": "E",
                "Ĕ": "E",
                "Ė": "E",
                "Ę": "E",
                "Ě": "E",
                "ē": "e",
                "ĕ": "e",
                "ė": "e",
                "ę": "e",
                "ě": "e",
                "Ĝ": "G",
                "Ğ": "G",
                "Ġ": "G",
                "Ģ": "G",
                "ĝ": "g",
                "ğ": "g",
                "ġ": "g",
                "ģ": "g",
                "Ĥ": "H",
                "Ħ": "H",
                "ĥ": "h",
                "ħ": "h",
                "Ĩ": "I",
                "Ī": "I",
                "Ĭ": "I",
                "Į": "I",
                "İ": "I",
                "ĩ": "i",
                "ī": "i",
                "ĭ": "i",
                "į": "i",
                "ı": "i",
                "Ĵ": "J",
                "ĵ": "j",
                "Ķ": "K",
                "ķ": "k",
                "ĸ": "k",
                "Ĺ": "L",
                "Ļ": "L",
                "Ľ": "L",
                "Ŀ": "L",
                "Ł": "L",
                "ĺ": "l",
                "ļ": "l",
                "ľ": "l",
                "ŀ": "l",
                "ł": "l",
                "Ń": "N",
                "Ņ": "N",
                "Ň": "N",
                "Ŋ": "N",
                "ń": "n",
                "ņ": "n",
                "ň": "n",
                "ŋ": "n",
                "Ō": "O",
                "Ŏ": "O",
                "Ő": "O",
                "ō": "o",
                "ŏ": "o",
                "ő": "o",
                "Ŕ": "R",
                "Ŗ": "R",
                "Ř": "R",
                "ŕ": "r",
                "ŗ": "r",
                "ř": "r",
                "Ś": "S",
                "Ŝ": "S",
                "Ş": "S",
                "Š": "S",
                "ś": "s",
                "ŝ": "s",
                "ş": "s",
                "š": "s",
                "Ţ": "T",
                "Ť": "T",
                "Ŧ": "T",
                "ţ": "t",
                "ť": "t",
                "ŧ": "t",
                "Ũ": "U",
                "Ū": "U",
                "Ŭ": "U",
                "Ů": "U",
                "Ű": "U",
                "Ų": "U",
                "ũ": "u",
                "ū": "u",
                "ŭ": "u",
                "ů": "u",
                "ű": "u",
                "ų": "u",
                "Ŵ": "W",
                "ŵ": "w",
                "Ŷ": "Y",
                "ŷ": "y",
                "Ÿ": "Y",
                "Ź": "Z",
                "Ż": "Z",
                "Ž": "Z",
                "ź": "z",
                "ż": "z",
                "ž": "z",
                "Ĳ": "IJ",
                "ĳ": "ij",
                "Œ": "Oe",
                "œ": "oe",
                "ŉ": "'n",
                "ſ": "s"
            },
            htmlEscapes = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            },
            htmlUnescapes = {
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                "&quot;": '"',
                "&#39;": "'"
            },
            stringEscapes = {
                "\\": "\\",
                "'": "'",
                "\n": "n",
                "\r": "r",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            freeParseFloat = parseFloat,
            freeParseInt = parseInt,
            freeGlobal = "object" == typeof global && global && global.Object === Object && global,
            freeSelf = "object" == typeof self && self && self.Object === Object && self,
            root = freeGlobal || freeSelf || Function("return this")(),
            freeExports = "object" == typeof exports && exports && !exports.nodeType && exports,
            freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module,
            moduleExports = freeModule && freeModule.exports === freeExports,
            freeProcess = moduleExports && freeGlobal.process,
            nodeUtil = function() {
                try {
                    return freeProcess && freeProcess.binding && freeProcess.binding("util")
                } catch (e) {}
            }(),
            nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
            nodeIsDate = nodeUtil && nodeUtil.isDate,
            nodeIsMap = nodeUtil && nodeUtil.isMap,
            nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
            nodeIsSet = nodeUtil && nodeUtil.isSet,
            nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

        function apply(func, thisArg, args) {
            switch (args.length) {
                case 0:
                    return func.call(thisArg);
                case 1:
                    return func.call(thisArg, args[0]);
                case 2:
                    return func.call(thisArg, args[0], args[1]);
                case 3:
                    return func.call(thisArg, args[0], args[1], args[2])
            }
            return func.apply(thisArg, args)
        }

        function arrayAggregator(array, setter, iteratee, accumulator) {
            var index = -1,
                length = null == array ? 0 : array.length;
            while (++index < length) {
                var value = array[index];
                setter(accumulator, value, iteratee(value), array)
            }
            return accumulator
        }

        function arrayEach(array, iteratee) {
            var index = -1,
                length = null == array ? 0 : array.length;
            while (++index < length) {
                if (false === iteratee(array[index], index, array)) {
                    break
                }
            }
            return array
        }

        function arrayEachRight(array, iteratee) {
            var length = null == array ? 0 : array.length;
            while (length--) {
                if (false === iteratee(array[length], length, array)) {
                    break
                }
            }
            return array
        }

        function arrayEvery(array, predicate) {
            var index = -1,
                length = null == array ? 0 : array.length;
            while (++index < length) {
                if (!predicate(array[index], index, array)) {
                    return false
                }
            }
            return true
        }

        function arrayFilter(array, predicate) {
            var index = -1,
                length = null == array ? 0 : array.length,
                resIndex = 0,
                result = [];
            while (++index < length) {
                var value = array[index];
                if (predicate(value, index, array)) {
                    result[resIndex++] = value
                }
            }
            return result
        }

        function arrayIncludes(array, value) {
            var length = null == array ? 0 : array.length;
            return !!length && baseIndexOf(array, value, 0) > -1
        }

        function arrayIncludesWith(array, value, comparator) {
            var index = -1,
                length = null == array ? 0 : array.length;
            while (++index < length) {
                if (comparator(value, array[index])) {
                    return true
                }
            }
            return false
        }

        function arrayMap(array, iteratee) {
            var index = -1,
                length = null == array ? 0 : array.length,
                result = Array(length);
            while (++index < length) {
                result[index] = iteratee(array[index], index, array)
            }
            return result
        }

        function arrayPush(array, values) {
            var index = -1,
                length = values.length,
                offset = array.length;
            while (++index < length) {
                array[offset + index] = values[index]
            }
            return array
        }

        function arrayReduce(array, iteratee, accumulator, initAccum) {
            var index = -1,
                length = null == array ? 0 : array.length;
            if (initAccum && length) {
                accumulator = array[++index]
            }
            while (++index < length) {
                accumulator = iteratee(accumulator, array[index], index, array)
            }
            return accumulator
        }

        function arrayReduceRight(array, iteratee, accumulator, initAccum) {
            var length = null == array ? 0 : array.length;
            if (initAccum && length) {
                accumulator = array[--length]
            }
            while (length--) {
                accumulator = iteratee(accumulator, array[length], length, array)
            }
            return accumulator
        }

        function arraySome(array, predicate) {
            var index = -1,
                length = null == array ? 0 : array.length;
            while (++index < length) {
                if (predicate(array[index], index, array)) {
                    return true
                }
            }
            return false
        }
        var asciiSize = baseProperty("length");

        function asciiToArray(string) {
            return string.split("")
        }

        function asciiWords(string) {
            return string.match(reAsciiWord) || []
        }

        function baseFindKey(collection, predicate, eachFunc) {
            var result;
            eachFunc(collection, function(value, key, collection) {
                if (predicate(value, key, collection)) {
                    result = key;
                    return false
                }
            });
            return result
        }

        function baseFindIndex(array, predicate, fromIndex, fromRight) {
            var length = array.length,
                index = fromIndex + (fromRight ? 1 : -1);
            while (fromRight ? index-- : ++index < length) {
                if (predicate(array[index], index, array)) {
                    return index
                }
            }
            return -1
        }

        function baseIndexOf(array, value, fromIndex) {
            return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex)
        }

        function baseIndexOfWith(array, value, fromIndex, comparator) {
            var index = fromIndex - 1,
                length = array.length;
            while (++index < length) {
                if (comparator(array[index], value)) {
                    return index
                }
            }
            return -1
        }

        function baseIsNaN(value) {
            return value !== value
        }

        function baseMean(array, iteratee) {
            var length = null == array ? 0 : array.length;
            return length ? baseSum(array, iteratee) / length : NAN
        }

        function baseProperty(key) {
            return function(object) {
                return null == object ? undefined : object[key]
            }
        }

        function basePropertyOf(object) {
            return function(key) {
                return null == object ? undefined : object[key]
            }
        }

        function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
            eachFunc(collection, function(value, index, collection) {
                accumulator = initAccum ? (initAccum = false,
                    value) : iteratee(accumulator, value, index, collection)
            });
            return accumulator
        }

        function baseSortBy(array, comparer) {
            var length = array.length;
            array.sort(comparer);
            while (length--) {
                array[length] = array[length].value
            }
            return array
        }

        function baseSum(array, iteratee) {
            var result, index = -1,
                length = array.length;
            while (++index < length) {
                var current = iteratee(array[index]);
                if (current !== undefined) {
                    result = result === undefined ? current : result + current
                }
            }
            return result
        }

        function baseTimes(n, iteratee) {
            var index = -1,
                result = Array(n);
            while (++index < n) {
                result[index] = iteratee(index)
            }
            return result
        }

        function baseToPairs(object, props) {
            return arrayMap(props, function(key) {
                return [key, object[key]]
            })
        }

        function baseUnary(func) {
            return function(value) {
                return func(value)
            }
        }

        function baseValues(object, props) {
            return arrayMap(props, function(key) {
                return object[key]
            })
        }

        function cacheHas(cache, key) {
            return cache.has(key)
        }

        function charsStartIndex(strSymbols, chrSymbols) {
            var index = -1,
                length = strSymbols.length;
            while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
            return index
        }

        function charsEndIndex(strSymbols, chrSymbols) {
            var index = strSymbols.length;
            while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
            return index
        }

        function countHolders(array, placeholder) {
            var length = array.length,
                result = 0;
            while (length--) {
                if (array[length] === placeholder) {
                    ++result
                }
            }
            return result
        }
        var deburrLetter = basePropertyOf(deburredLetters),
            escapeHtmlChar = basePropertyOf(htmlEscapes);

        function escapeStringChar(chr) {
            return "\\" + stringEscapes[chr]
        }

        function getValue(object, key) {
            return null == object ? undefined : object[key]
        }

        function hasUnicode(string) {
            return reHasUnicode.test(string)
        }

        function hasUnicodeWord(string) {
            return reHasUnicodeWord.test(string)
        }

        function iteratorToArray(iterator) {
            var data, result = [];
            while (!(data = iterator.next()).done) {
                result.push(data.value)
            }
            return result
        }

        function mapToArray(map) {
            var index = -1,
                result = Array(map.size);
            map.forEach(function(value, key) {
                result[++index] = [key, value]
            });
            return result
        }

        function overArg(func, transform) {
            return function(arg) {
                return func(transform(arg))
            }
        }

        function replaceHolders(array, placeholder) {
            var index = -1,
                length = array.length,
                resIndex = 0,
                result = [];
            while (++index < length) {
                var value = array[index];
                if (value === placeholder || value === PLACEHOLDER) {
                    array[index] = PLACEHOLDER;
                    result[resIndex++] = index
                }
            }
            return result
        }

        function safeGet(object, key) {
            return "__proto__" == key ? undefined : object[key]
        }

        function setToArray(set) {
            var index = -1,
                result = Array(set.size);
            set.forEach(function(value) {
                result[++index] = value
            });
            return result
        }

        function setToPairs(set) {
            var index = -1,
                result = Array(set.size);
            set.forEach(function(value) {
                result[++index] = [value, value]
            });
            return result
        }

        function strictIndexOf(array, value, fromIndex) {
            var index = fromIndex - 1,
                length = array.length;
            while (++index < length) {
                if (array[index] === value) {
                    return index
                }
            }
            return -1
        }

        function strictLastIndexOf(array, value, fromIndex) {
            var index = fromIndex + 1;
            while (index--) {
                if (array[index] === value) {
                    return index
                }
            }
            return index
        }

        function stringSize(string) {
            return hasUnicode(string) ? unicodeSize(string) : asciiSize(string)
        }

        function stringToArray(string) {
            return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string)
        }
        var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

        function unicodeSize(string) {
            var result = reUnicode.lastIndex = 0;
            while (reUnicode.test(string)) {
                ++result
            }
            return result
        }

        function unicodeToArray(string) {
            return string.match(reUnicode) || []
        }

        function unicodeWords(string) {
            return string.match(reUnicodeWord) || []
        }
        var runInContext = function runInContext(context) {
            context = null == context ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
            var Array = context.Array,
                Date = context.Date,
                Error = context.Error,
                Function = context.Function,
                Math = context.Math,
                Object = context.Object,
                RegExp = context.RegExp,
                String = context.String,
                TypeError = context.TypeError,
                arrayProto = Array.prototype,
                funcProto = Function.prototype,
                objectProto = Object.prototype,
                coreJsData = context["__core-js_shared__"],
                funcToString = funcProto.toString,
                hasOwnProperty = objectProto.hasOwnProperty,
                idCounter = 0,
                maskSrcKey = (uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || ""),
                    uid ? "Symbol(src)_1." + uid : ""),
                uid, nativeObjectToString = objectProto.toString,
                objectCtorString = funcToString.call(Object),
                oldDash = root._,
                reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                Buffer = moduleExports ? context.Buffer : undefined,
                Symbol = context.Symbol,
                Uint8Array = context.Uint8Array,
                allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
                getPrototype = overArg(Object.getPrototypeOf, Object),
                objectCreate = Object.create,
                propertyIsEnumerable = objectProto.propertyIsEnumerable,
                splice = arrayProto.splice,
                spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
                symIterator = Symbol ? Symbol.iterator : undefined,
                symToStringTag = Symbol ? Symbol.toStringTag : undefined,
                defineProperty = function() {
                    try {
                        var func = getNative(Object, "defineProperty");
                        func({}, "", {});
                        return func
                    } catch (e) {}
                }(),
                ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
                ctxNow = Date && Date.now !== root.Date.now && Date.now,
                ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout,
                nativeCeil = Math.ceil,
                nativeFloor = Math.floor,
                nativeGetSymbols = Object.getOwnPropertySymbols,
                nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
                nativeIsFinite = context.isFinite,
                nativeJoin = arrayProto.join,
                nativeKeys = overArg(Object.keys, Object),
                nativeMax = Math.max,
                nativeMin = Math.min,
                nativeNow = Date.now,
                nativeParseInt = context.parseInt,
                nativeRandom = Math.random,
                nativeReverse = arrayProto.reverse,
                DataView = getNative(context, "DataView"),
                Map = getNative(context, "Map"),
                Promise = getNative(context, "Promise"),
                Set = getNative(context, "Set"),
                WeakMap = getNative(context, "WeakMap"),
                nativeCreate = getNative(Object, "create"),
                metaMap = WeakMap && new WeakMap,
                realNames = {},
                dataViewCtorString = toSource(DataView),
                mapCtorString = toSource(Map),
                promiseCtorString = toSource(Promise),
                setCtorString = toSource(Set),
                weakMapCtorString = toSource(WeakMap),
                symbolProto = Symbol ? Symbol.prototype : undefined,
                symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
                symbolToString = symbolProto ? symbolProto.toString : undefined;

            function lodash(value) {
                if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
                    if (value instanceof LodashWrapper) {
                        return value
                    }
                    if (hasOwnProperty.call(value, "__wrapped__")) {
                        return wrapperClone(value)
                    }
                }
                return new LodashWrapper(value)
            }
            var baseCreate = function() {
                function object() {}
                return function(proto) {
                    if (!isObject(proto)) {
                        return {}
                    }
                    if (objectCreate) {
                        return objectCreate(proto)
                    }
                    object.prototype = proto;
                    var result = new object;
                    object.prototype = undefined;
                    return result
                }
            }();

            function baseLodash() {}

            function LodashWrapper(value, chainAll) {
                this.__wrapped__ = value;
                this.__actions__ = [];
                this.__chain__ = !!chainAll;
                this.__index__ = 0;
                this.__values__ = undefined
            }
            lodash.templateSettings = {
                escape: reEscape,
                evaluate: reEvaluate,
                interpolate: reInterpolate,
                variable: "",
                imports: {
                    _: lodash
                }
            };
            lodash.prototype = baseLodash.prototype;
            lodash.prototype.constructor = lodash;
            LodashWrapper.prototype = baseCreate(baseLodash.prototype);
            LodashWrapper.prototype.constructor = LodashWrapper;

            function LazyWrapper(value) {
                this.__wrapped__ = value;
                this.__actions__ = [];
                this.__dir__ = 1;
                this.__filtered__ = false;
                this.__iteratees__ = [];
                this.__takeCount__ = MAX_ARRAY_LENGTH;
                this.__views__ = []
            }

            function lazyClone() {
                var result = new LazyWrapper(this.__wrapped__);
                result.__actions__ = copyArray(this.__actions__);
                result.__dir__ = this.__dir__;
                result.__filtered__ = this.__filtered__;
                result.__iteratees__ = copyArray(this.__iteratees__);
                result.__takeCount__ = this.__takeCount__;
                result.__views__ = copyArray(this.__views__);
                return result
            }

            function lazyReverse() {
                if (this.__filtered__) {
                    var result = new LazyWrapper(this);
                    result.__dir__ = -1;
                    result.__filtered__ = true
                } else {
                    result = this.clone();
                    result.__dir__ *= -1
                }
                return result
            }

            function lazyValue() {
                var array = this.__wrapped__.value(),
                    dir = this.__dir__,
                    isArr = isArray(array),
                    isRight = dir < 0,
                    arrLength = isArr ? array.length : 0,
                    view = getView(0, arrLength, this.__views__),
                    start = view.start,
                    end = view.end,
                    length = end - start,
                    index = isRight ? end : start - 1,
                    iteratees = this.__iteratees__,
                    iterLength = iteratees.length,
                    resIndex = 0,
                    takeCount = nativeMin(length, this.__takeCount__);
                if (!isArr || !isRight && arrLength == length && takeCount == length) {
                    return baseWrapperValue(array, this.__actions__)
                }
                var result = [];
                outer: while (length-- && resIndex < takeCount) {
                    index += dir;
                    var iterIndex = -1,
                        value = array[index];
                    while (++iterIndex < iterLength) {
                        var data = iteratees[iterIndex],
                            iteratee = data.iteratee,
                            type = data.type,
                            computed = iteratee(value);
                        if (type == LAZY_MAP_FLAG) {
                            value = computed
                        } else if (!computed) {
                            if (type == LAZY_FILTER_FLAG) {
                                continue outer
                            } else {
                                break outer
                            }
                        }
                    }
                    result[resIndex++] = value
                }
                return result
            }
            LazyWrapper.prototype = baseCreate(baseLodash.prototype);
            LazyWrapper.prototype.constructor = LazyWrapper;

            function Hash(entries) {
                var index = -1,
                    length = null == entries ? 0 : entries.length;
                this.clear();
                while (++index < length) {
                    var entry = entries[index];
                    this.set(entry[0], entry[1])
                }
            }

            function hashClear() {
                this.__data__ = nativeCreate ? nativeCreate(null) : {};
                this.size = 0
            }

            function hashDelete(key) {
                var result = this.has(key) && delete this.__data__[key];
                this.size -= result ? 1 : 0;
                return result
            }

            function hashGet(key) {
                var data = this.__data__;
                if (nativeCreate) {
                    var result = data[key];
                    return result === HASH_UNDEFINED ? undefined : result
                }
                return hasOwnProperty.call(data, key) ? data[key] : undefined
            }

            function hashHas(key) {
                var data = this.__data__;
                return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key)
            }

            function hashSet(key, value) {
                var data = this.__data__;
                this.size += this.has(key) ? 0 : 1;
                data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
                return this
            }
            Hash.prototype.clear = hashClear;
            Hash.prototype["delete"] = hashDelete;
            Hash.prototype.get = hashGet;
            Hash.prototype.has = hashHas;
            Hash.prototype.set = hashSet;

            function ListCache(entries) {
                var index = -1,
                    length = null == entries ? 0 : entries.length;
                this.clear();
                while (++index < length) {
                    var entry = entries[index];
                    this.set(entry[0], entry[1])
                }
            }

            function listCacheClear() {
                this.__data__ = [];
                this.size = 0
            }

            function listCacheDelete(key) {
                var data = this.__data__,
                    index = assocIndexOf(data, key);
                if (index < 0) {
                    return false
                }
                var lastIndex = data.length - 1;
                if (index == lastIndex) {
                    data.pop()
                } else {
                    splice.call(data, index, 1)
                }
                --this.size;
                return true
            }

            function listCacheGet(key) {
                var data = this.__data__,
                    index = assocIndexOf(data, key);
                return index < 0 ? undefined : data[index][1]
            }

            function listCacheHas(key) {
                return assocIndexOf(this.__data__, key) > -1
            }

            function listCacheSet(key, value) {
                var data = this.__data__,
                    index = assocIndexOf(data, key);
                if (index < 0) {
                    ++this.size;
                    data.push([key, value])
                } else {
                    data[index][1] = value
                }
                return this
            }
            ListCache.prototype.clear = listCacheClear;
            ListCache.prototype["delete"] = listCacheDelete;
            ListCache.prototype.get = listCacheGet;
            ListCache.prototype.has = listCacheHas;
            ListCache.prototype.set = listCacheSet;

            function MapCache(entries) {
                var index = -1,
                    length = null == entries ? 0 : entries.length;
                this.clear();
                while (++index < length) {
                    var entry = entries[index];
                    this.set(entry[0], entry[1])
                }
            }

            function mapCacheClear() {
                this.size = 0;
                this.__data__ = {
                    hash: new Hash,
                    map: new(Map || ListCache),
                    string: new Hash
                }
            }

            function mapCacheDelete(key) {
                var result = getMapData(this, key)["delete"](key);
                this.size -= result ? 1 : 0;
                return result
            }

            function mapCacheGet(key) {
                return getMapData(this, key).get(key)
            }

            function mapCacheHas(key) {
                return getMapData(this, key).has(key)
            }

            function mapCacheSet(key, value) {
                var data = getMapData(this, key),
                    size = data.size;
                data.set(key, value);
                this.size += data.size == size ? 0 : 1;
                return this
            }
            MapCache.prototype.clear = mapCacheClear;
            MapCache.prototype["delete"] = mapCacheDelete;
            MapCache.prototype.get = mapCacheGet;
            MapCache.prototype.has = mapCacheHas;
            MapCache.prototype.set = mapCacheSet;

            function SetCache(values) {
                var index = -1,
                    length = null == values ? 0 : values.length;
                this.__data__ = new MapCache;
                while (++index < length) {
                    this.add(values[index])
                }
            }

            function setCacheAdd(value) {
                this.__data__.set(value, HASH_UNDEFINED);
                return this
            }

            function setCacheHas(value) {
                return this.__data__.has(value)
            }
            SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
            SetCache.prototype.has = setCacheHas;

            function Stack(entries) {
                var data = this.__data__ = new ListCache(entries);
                this.size = data.size
            }

            function stackClear() {
                this.__data__ = new ListCache;
                this.size = 0
            }

            function stackDelete(key) {
                var data = this.__data__,
                    result = data["delete"](key);
                this.size = data.size;
                return result
            }

            function stackGet(key) {
                return this.__data__.get(key)
            }

            function stackHas(key) {
                return this.__data__.has(key)
            }

            function stackSet(key, value) {
                var data = this.__data__;
                if (data instanceof ListCache) {
                    var pairs = data.__data__;
                    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
                        pairs.push([key, value]);
                        this.size = ++data.size;
                        return this
                    }
                    data = this.__data__ = new MapCache(pairs)
                }
                data.set(key, value);
                this.size = data.size;
                return this
            }
            Stack.prototype.clear = stackClear;
            Stack.prototype["delete"] = stackDelete;
            Stack.prototype.get = stackGet;
            Stack.prototype.has = stackHas;
            Stack.prototype.set = stackSet;

            function arrayLikeKeys(value, inherited) {
                var isArr = isArray(value),
                    isArg = !isArr && isArguments(value),
                    isBuff = !isArr && !isArg && isBuffer(value),
                    isType = !isArr && !isArg && !isBuff && isTypedArray(value),
                    skipIndexes = isArr || isArg || isBuff || isType,
                    result = skipIndexes ? baseTimes(value.length, String) : [],
                    length = result.length;
                for (var key in value) {
                    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && ("length" == key || isBuff && ("offset" == key || "parent" == key) || isType && ("buffer" == key || "byteLength" == key || "byteOffset" == key) || isIndex(key, length)))) {
                        result.push(key)
                    }
                }
                return result
            }

            function arraySample(array) {
                var length = array.length;
                return length ? array[baseRandom(0, length - 1)] : undefined
            }

            function arraySampleSize(array, n) {
                return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length))
            }

            function arrayShuffle(array) {
                return shuffleSelf(copyArray(array))
            }

            function assignMergeValue(object, key, value) {
                if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
                    baseAssignValue(object, key, value)
                }
            }

            function assignValue(object, key, value) {
                var objValue = object[key];
                if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
                    baseAssignValue(object, key, value)
                }
            }

            function assocIndexOf(array, key) {
                var length = array.length;
                while (length--) {
                    if (eq(array[length][0], key)) {
                        return length
                    }
                }
                return -1
            }

            function baseAggregator(collection, setter, iteratee, accumulator) {
                baseEach(collection, function(value, key, collection) {
                    setter(accumulator, value, iteratee(value), collection)
                });
                return accumulator
            }

            function baseAssign(object, source) {
                return object && copyObject(source, keys(source), object)
            }

            function baseAssignIn(object, source) {
                return object && copyObject(source, keysIn(source), object)
            }

            function baseAssignValue(object, key, value) {
                if ("__proto__" == key && defineProperty) {
                    defineProperty(object, key, {
                        configurable: true,
                        enumerable: true,
                        value,
                        writable: true
                    })
                } else {
                    object[key] = value
                }
            }

            function baseAt(object, paths) {
                var index = -1,
                    length = paths.length,
                    result = Array(length),
                    skip = null == object;
                while (++index < length) {
                    result[index] = skip ? undefined : get(object, paths[index])
                }
                return result
            }

            function baseClamp(number, lower, upper) {
                if (number === number) {
                    if (upper !== undefined) {
                        number = number <= upper ? number : upper
                    }
                    if (lower !== undefined) {
                        number = number >= lower ? number : lower
                    }
                }
                return number
            }

            function baseClone(value, bitmask, customizer, key, object, stack) {
                var result, isDeep = bitmask & CLONE_DEEP_FLAG,
                    isFlat = bitmask & CLONE_FLAT_FLAG,
                    isFull = bitmask & CLONE_SYMBOLS_FLAG;
                if (customizer) {
                    result = object ? customizer(value, key, object, stack) : customizer(value)
                }
                if (result !== undefined) {
                    return result
                }
                if (!isObject(value)) {
                    return value
                }
                var isArr = isArray(value);
                if (isArr) {
                    result = initCloneArray(value);
                    if (!isDeep) {
                        return copyArray(value, result)
                    }
                } else {
                    var tag = getTag(value),
                        isFunc = tag == funcTag || tag == genTag;
                    if (isBuffer(value)) {
                        return cloneBuffer(value, isDeep)
                    }
                    if (tag == objectTag || tag == argsTag || isFunc && !object) {
                        result = isFlat || isFunc ? {} : initCloneObject(value);
                        if (!isDeep) {
                            return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value))
                        }
                    } else {
                        if (!cloneableTags[tag]) {
                            return object ? value : {}
                        }
                        result = initCloneByTag(value, tag, isDeep)
                    }
                }
                stack || (stack = new Stack);
                var stacked = stack.get(value);
                if (stacked) {
                    return stacked
                }
                stack.set(value, result);
                if (isSet(value)) {
                    value.forEach(function(subValue) {
                        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack))
                    });
                    return result
                }
                if (isMap(value)) {
                    value.forEach(function(subValue, key) {
                        result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack))
                    });
                    return result
                }
                var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys,
                    props = isArr ? undefined : keysFunc(value);
                arrayEach(props || value, function(subValue, key) {
                    if (props) {
                        key = subValue;
                        subValue = value[key]
                    }
                    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
                });
                return result
            }

            function baseConforms(source) {
                var props = keys(source);
                return function(object) {
                    return baseConformsTo(object, source, props)
                }
            }

            function baseConformsTo(object, source, props) {
                var length = props.length;
                if (null == object) {
                    return !length
                }
                object = Object(object);
                while (length--) {
                    var key = props[length],
                        predicate = source[key],
                        value = object[key];
                    if (value === undefined && !(key in object) || !predicate(value)) {
                        return false
                    }
                }
                return true
            }

            function baseDelay(func, wait, args) {
                if ("function" != typeof func) {
                    throw new TypeError(FUNC_ERROR_TEXT)
                }
                return setTimeout(function() {
                    func.apply(undefined, args)
                }, wait)
            }

            function baseDifference(array, values, iteratee, comparator) {
                var index = -1,
                    includes = arrayIncludes,
                    isCommon = true,
                    length = array.length,
                    result = [],
                    valuesLength = values.length;
                if (!length) {
                    return result
                }
                if (iteratee) {
                    values = arrayMap(values, baseUnary(iteratee))
                }
                if (comparator) {
                    includes = arrayIncludesWith;
                    isCommon = false
                } else if (values.length >= LARGE_ARRAY_SIZE) {
                    includes = cacheHas;
                    isCommon = false;
                    values = new SetCache(values)
                }
                outer: while (++index < length) {
                    var value = array[index],
                        computed = null == iteratee ? value : iteratee(value);
                    value = comparator || 0 !== value ? value : 0;
                    if (isCommon && computed === computed) {
                        var valuesIndex = valuesLength;
                        while (valuesIndex--) {
                            if (values[valuesIndex] === computed) {
                                continue outer
                            }
                        }
                        result.push(value)
                    } else if (!includes(values, computed, comparator)) {
                        result.push(value)
                    }
                }
                return result
            }
            var baseEach = createBaseEach(baseForOwn),
                baseEachRight = createBaseEach(baseForOwnRight, true);

            function baseEvery(collection, predicate) {
                var result = true;
                baseEach(collection, function(value, index, collection) {
                    result = !!predicate(value, index, collection);
                    return result
                });
                return result
            }

            function baseExtremum(array, iteratee, comparator) {
                var index = -1,
                    length = array.length;
                while (++index < length) {
                    var value = array[index],
                        current = iteratee(value);
                    if (null != current && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) {
                        var computed = current,
                            result = value
                    }
                }
                return result
            }

            function baseFill(array, value, start, end) {
                var length = array.length;
                start = toInteger(start);
                if (start < 0) {
                    start = -start > length ? 0 : length + start
                }
                end = end === undefined || end > length ? length : toInteger(end);
                if (end < 0) {
                    end += length
                }
                end = start > end ? 0 : toLength(end);
                while (start < end) {
                    array[start++] = value
                }
                return array
            }

            function baseFilter(collection, predicate) {
                var result = [];
                baseEach(collection, function(value, index, collection) {
                    if (predicate(value, index, collection)) {
                        result.push(value)
                    }
                });
                return result
            }

            function baseFlatten(array, depth, predicate, isStrict, result) {
                var index = -1,
                    length = array.length;
                predicate || (predicate = isFlattenable);
                result || (result = []);
                while (++index < length) {
                    var value = array[index];
                    if (depth > 0 && predicate(value)) {
                        if (depth > 1) {
                            baseFlatten(value, depth - 1, predicate, isStrict, result)
                        } else {
                            arrayPush(result, value)
                        }
                    } else if (!isStrict) {
                        result[result.length] = value
                    }
                }
                return result
            }
            var baseFor = createBaseFor(),
                baseForRight = createBaseFor(true);

            function baseForOwn(object, iteratee) {
                return object && baseFor(object, iteratee, keys)
            }

            function baseForOwnRight(object, iteratee) {
                return object && baseForRight(object, iteratee, keys)
            }

            function baseFunctions(object, props) {
                return arrayFilter(props, function(key) {
                    return isFunction(object[key])
                })
            }

            function baseGet(object, path) {
                path = castPath(path, object);
                var index = 0,
                    length = path.length;
                while (null != object && index < length) {
                    object = object[toKey(path[index++])]
                }
                return index && index == length ? object : undefined
            }

            function baseGetAllKeys(object, keysFunc, symbolsFunc) {
                var result = keysFunc(object);
                return isArray(object) ? result : arrayPush(result, symbolsFunc(object))
            }

            function baseGetTag(value) {
                if (null == value) {
                    return value === undefined ? undefinedTag : nullTag
                }
                return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value)
            }

            function baseGt(value, other) {
                return value > other
            }

            function baseHas(object, key) {
                return null != object && hasOwnProperty.call(object, key)
            }

            function baseHasIn(object, key) {
                return null != object && key in Object(object)
            }

            function baseInRange(number, start, end) {
                return number >= nativeMin(start, end) && number < nativeMax(start, end)
            }

            function baseIntersection(arrays, iteratee, comparator) {
                var includes = comparator ? arrayIncludesWith : arrayIncludes,
                    length = arrays[0].length,
                    othLength = arrays.length,
                    othIndex = othLength,
                    caches = Array(othLength),
                    maxLength = Infinity,
                    result = [];
                while (othIndex--) {
                    var array = arrays[othIndex];
                    if (othIndex && iteratee) {
                        array = arrayMap(array, baseUnary(iteratee))
                    }
                    maxLength = nativeMin(array.length, maxLength);
                    caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined
                }
                array = arrays[0];
                var index = -1,
                    seen = caches[0];
                outer: while (++index < length && result.length < maxLength) {
                    var value = array[index],
                        computed = iteratee ? iteratee(value) : value;
                    value = comparator || 0 !== value ? value : 0;
                    if (!(seen ? cacheHas(seen, computed) : includes(result, computed, comparator))) {
                        othIndex = othLength;
                        while (--othIndex) {
                            var cache = caches[othIndex];
                            if (!(cache ? cacheHas(cache, computed) : includes(arrays[othIndex], computed, comparator))) {
                                continue outer
                            }
                        }
                        if (seen) {
                            seen.push(computed)
                        }
                        result.push(value)
                    }
                }
                return result
            }

            function baseInverter(object, setter, iteratee, accumulator) {
                baseForOwn(object, function(value, key, object) {
                    setter(accumulator, iteratee(value), key, object)
                });
                return accumulator
            }

            function baseInvoke(object, path, args) {
                path = castPath(path, object);
                object = parent(object, path);
                var func = null == object ? object : object[toKey(last(path))];
                return null == func ? undefined : apply(func, object, args)
            }

            function baseIsArguments(value) {
                return isObjectLike(value) && baseGetTag(value) == argsTag
            }

            function baseIsArrayBuffer(value) {
                return isObjectLike(value) && baseGetTag(value) == arrayBufferTag
            }

            function baseIsDate(value) {
                return isObjectLike(value) && baseGetTag(value) == dateTag
            }

            function baseIsEqual(value, other, bitmask, customizer, stack) {
                if (value === other) {
                    return true
                }
                if (null == value || null == other || !isObjectLike(value) && !isObjectLike(other)) {
                    return value !== value && other !== other
                }
                return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack)
            }

            function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
                var objIsArr = isArray(object),
                    othIsArr = isArray(other),
                    objTag = objIsArr ? arrayTag : getTag(object),
                    othTag = othIsArr ? arrayTag : getTag(other);
                objTag = objTag == argsTag ? objectTag : objTag;
                othTag = othTag == argsTag ? objectTag : othTag;
                var objIsObj = objTag == objectTag,
                    othIsObj = othTag == objectTag,
                    isSameTag = objTag == othTag;
                if (isSameTag && isBuffer(object)) {
                    if (!isBuffer(other)) {
                        return false
                    }
                    objIsArr = true;
                    objIsObj = false
                }
                if (isSameTag && !objIsObj) {
                    stack || (stack = new Stack);
                    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack)
                }
                if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
                    var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"),
                        othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
                    if (objIsWrapped || othIsWrapped) {
                        var objUnwrapped = objIsWrapped ? object.value() : object,
                            othUnwrapped = othIsWrapped ? other.value() : other;
                        stack || (stack = new Stack);
                        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack)
                    }
                }
                if (!isSameTag) {
                    return false
                }
                stack || (stack = new Stack);
                return equalObjects(object, other, bitmask, customizer, equalFunc, stack)
            }

            function baseIsMap(value) {
                return isObjectLike(value) && getTag(value) == mapTag
            }

            function baseIsMatch(object, source, matchData, customizer) {
                var index = matchData.length,
                    length = index,
                    noCustomizer = !customizer;
                if (null == object) {
                    return !length
                }
                object = Object(object);
                while (index--) {
                    var data = matchData[index];
                    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
                        return false
                    }
                }
                while (++index < length) {
                    data = matchData[index];
                    var key = data[0],
                        objValue = object[key],
                        srcValue = data[1];
                    if (noCustomizer && data[2]) {
                        if (objValue === undefined && !(key in object)) {
                            return false
                        }
                    } else {
                        var stack = new Stack;
                        if (customizer) {
                            var result = customizer(objValue, srcValue, key, object, source, stack)
                        }
                        if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
                            return false
                        }
                    }
                }
                return true
            }

            function baseIsNative(value) {
                if (!isObject(value) || isMasked(value)) {
                    return false
                }
                var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
                return pattern.test(toSource(value))
            }

            function baseIsRegExp(value) {
                return isObjectLike(value) && baseGetTag(value) == regexpTag
            }

            function baseIsSet(value) {
                return isObjectLike(value) && getTag(value) == setTag
            }

            function baseIsTypedArray(value) {
                return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)]
            }

            function baseIteratee(value) {
                if ("function" == typeof value) {
                    return value
                }
                if (null == value) {
                    return identity
                }
                if ("object" == typeof value) {
                    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value)
                }
                return property(value)
            }

            function baseKeys(object) {
                if (!isPrototype(object)) {
                    return nativeKeys(object)
                }
                var result = [];
                for (var key in Object(object)) {
                    if (hasOwnProperty.call(object, key) && "constructor" != key) {
                        result.push(key)
                    }
                }
                return result
            }

            function baseKeysIn(object) {
                if (!isObject(object)) {
                    return nativeKeysIn(object)
                }
                var isProto = isPrototype(object),
                    result = [];
                for (var key in object) {
                    if (!("constructor" == key && (isProto || !hasOwnProperty.call(object, key)))) {
                        result.push(key)
                    }
                }
                return result
            }

            function baseLt(value, other) {
                return value < other
            }

            function baseMap(collection, iteratee) {
                var index = -1,
                    result = isArrayLike(collection) ? Array(collection.length) : [];
                baseEach(collection, function(value, key, collection) {
                    result[++index] = iteratee(value, key, collection)
                });
                return result
            }

            function baseMatches(source) {
                var matchData = getMatchData(source);
                if (1 == matchData.length && matchData[0][2]) {
                    return matchesStrictComparable(matchData[0][0], matchData[0][1])
                }
                return function(object) {
                    return object === source || baseIsMatch(object, source, matchData)
                }
            }

            function baseMatchesProperty(path, srcValue) {
                if (isKey(path) && isStrictComparable(srcValue)) {
                    return matchesStrictComparable(toKey(path), srcValue)
                }
                return function(object) {
                    var objValue = get(object, path);
                    return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG)
                }
            }

            function baseMerge(object, source, srcIndex, customizer, stack) {
                if (object === source) {
                    return
                }
                baseFor(source, function(srcValue, key) {
                    if (isObject(srcValue)) {
                        stack || (stack = new Stack);
                        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack)
                    } else {
                        var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined;
                        if (newValue === undefined) {
                            newValue = srcValue
                        }
                        assignMergeValue(object, key, newValue)
                    }
                }, keysIn)
            }

            function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
                var objValue = safeGet(object, key),
                    srcValue = safeGet(source, key),
                    stacked = stack.get(srcValue);
                if (stacked) {
                    assignMergeValue(object, key, stacked);
                    return
                }
                var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined,
                    isCommon = newValue === undefined;
                if (isCommon) {
                    var isArr = isArray(srcValue),
                        isBuff = !isArr && isBuffer(srcValue),
                        isTyped = !isArr && !isBuff && isTypedArray(srcValue);
                    newValue = srcValue;
                    if (isArr || isBuff || isTyped) {
                        if (isArray(objValue)) {
                            newValue = objValue
                        } else if (isArrayLikeObject(objValue)) {
                            newValue = copyArray(objValue)
                        } else if (isBuff) {
                            isCommon = false;
                            newValue = cloneBuffer(srcValue, true)
                        } else if (isTyped) {
                            isCommon = false;
                            newValue = cloneTypedArray(srcValue, true)
                        } else {
                            newValue = []
                        }
                    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                        newValue = objValue;
                        if (isArguments(objValue)) {
                            newValue = toPlainObject(objValue)
                        } else if (!isObject(objValue) || srcIndex && isFunction(objValue)) {
                            newValue = initCloneObject(srcValue)
                        }
                    } else {
                        isCommon = false
                    }
                }
                if (isCommon) {
                    stack.set(srcValue, newValue);
                    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
                    stack["delete"](srcValue)
                }
                assignMergeValue(object, key, newValue)
            }

            function baseNth(array, n) {
                var length = array.length;
                if (!length) {
                    return
                }
                n += n < 0 ? length : 0;
                return isIndex(n, length) ? array[n] : undefined
            }

            function baseOrderBy(collection, iteratees, orders) {
                var index = -1;
                iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(getIteratee()));
                var result = baseMap(collection, function(value, key, collection) {
                    var criteria = arrayMap(iteratees, function(iteratee) {
                        return iteratee(value)
                    });
                    return {
                        criteria,
                        index: ++index,
                        value
                    }
                });
                return baseSortBy(result, function(object, other) {
                    return compareMultiple(object, other, orders)
                })
            }

            function basePick(object, paths) {
                return basePickBy(object, paths, function(value, path) {
                    return hasIn(object, path)
                })
            }

            function basePickBy(object, paths, predicate) {
                var index = -1,
                    length = paths.length,
                    result = {};
                while (++index < length) {
                    var path = paths[index],
                        value = baseGet(object, path);
                    if (predicate(value, path)) {
                        baseSet(result, castPath(path, object), value)
                    }
                }
                return result
            }

            function basePropertyDeep(path) {
                return function(object) {
                    return baseGet(object, path)
                }
            }

            function basePullAll(array, values, iteratee, comparator) {
                var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
                    index = -1,
                    length = values.length,
                    seen = array;
                if (array === values) {
                    values = copyArray(values)
                }
                if (iteratee) {
                    seen = arrayMap(array, baseUnary(iteratee))
                }
                while (++index < length) {
                    var fromIndex = 0,
                        value = values[index],
                        computed = iteratee ? iteratee(value) : value;
                    while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
                        if (seen !== array) {
                            splice.call(seen, fromIndex, 1)
                        }
                        splice.call(array, fromIndex, 1)
                    }
                }
                return array
            }

            function basePullAt(array, indexes) {
                var length = array ? indexes.length : 0,
                    lastIndex = length - 1;
                while (length--) {
                    var index = indexes[length];
                    if (length == lastIndex || index !== previous) {
                        var previous = index;
                        if (isIndex(index)) {
                            splice.call(array, index, 1)
                        } else {
                            baseUnset(array, index)
                        }
                    }
                }
                return array
            }

            function baseRandom(lower, upper) {
                return lower + nativeFloor(nativeRandom() * (upper - lower + 1))
            }

            function baseRange(start, end, step, fromRight) {
                var index = -1,
                    length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
                    result = Array(length);
                while (length--) {
                    result[fromRight ? length : ++index] = start;
                    start += step
                }
                return result
            }

            function baseRepeat(string, n) {
                var result = "";
                if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
                    return result
                }
                do {
                    if (n % 2) {
                        result += string
                    }
                    n = nativeFloor(n / 2);
                    if (n) {
                        string += string
                    }
                } while (n);
                return result
            }

            function baseRest(func, start) {
                return setToString(overRest(func, start, identity), func + "")
            }

            function baseSample(collection) {
                return arraySample(values(collection))
            }

            function baseSampleSize(collection, n) {
                var array = values(collection);
                return shuffleSelf(array, baseClamp(n, 0, array.length))
            }

            function baseSet(object, path, value, customizer) {
                if (!isObject(object)) {
                    return object
                }
                path = castPath(path, object);
                var index = -1,
                    length = path.length,
                    lastIndex = length - 1,
                    nested = object;
                while (null != nested && ++index < length) {
                    var key = toKey(path[index]),
                        newValue = value;
                    if (index != lastIndex) {
                        var objValue = nested[key];
                        newValue = customizer ? customizer(objValue, key, nested) : undefined;
                        if (newValue === undefined) {
                            newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {}
                        }
                    }
                    assignValue(nested, key, newValue);
                    nested = nested[key]
                }
                return object
            }
            var baseSetData = !metaMap ? identity : function(func, data) {
                    metaMap.set(func, data);
                    return func
                },
                baseSetToString = !defineProperty ? identity : function(func, string) {
                    return defineProperty(func, "toString", {
                        configurable: true,
                        enumerable: false,
                        value: constant(string),
                        writable: true
                    })
                };

            function baseShuffle(collection) {
                return shuffleSelf(values(collection))
            }

            function baseSlice(array, start, end) {
                var index = -1,
                    length = array.length;
                if (start < 0) {
                    start = -start > length ? 0 : length + start
                }
                end = end > length ? length : end;
                if (end < 0) {
                    end += length
                }
                length = start > end ? 0 : end - start >>> 0;
                start >>>= 0;
                var result = Array(length);
                while (++index < length) {
                    result[index] = array[index + start]
                }
                return result
            }

            function baseSome(collection, predicate) {
                var result;
                baseEach(collection, function(value, index, collection) {
                    result = predicate(value, index, collection);
                    return !result
                });
                return !!result
            }

            function baseSortedIndex(array, value, retHighest) {
                var low = 0,
                    high = null == array ? low : array.length;
                if ("number" == typeof value && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
                    while (low < high) {
                        var mid = low + high >>> 1,
                            computed = array[mid];
                        if (null !== computed && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                            low = mid + 1
                        } else {
                            high = mid
                        }
                    }
                    return high
                }
                return baseSortedIndexBy(array, value, identity, retHighest)
            }

            function baseSortedIndexBy(array, value, iteratee, retHighest) {
                value = iteratee(value);
                var low = 0,
                    high = null == array ? 0 : array.length,
                    valIsNaN = value !== value,
                    valIsNull = null === value,
                    valIsSymbol = isSymbol(value),
                    valIsUndefined = value === undefined;
                while (low < high) {
                    var mid = nativeFloor((low + high) / 2),
                        computed = iteratee(array[mid]),
                        othIsDefined = computed !== undefined,
                        othIsNull = null === computed,
                        othIsReflexive = computed === computed,
                        othIsSymbol = isSymbol(computed);
                    if (valIsNaN) {
                        var setLow = retHighest || othIsReflexive
                    } else if (valIsUndefined) {
                        setLow = othIsReflexive && (retHighest || othIsDefined)
                    } else if (valIsNull) {
                        setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull)
                    } else if (valIsSymbol) {
                        setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol)
                    } else if (othIsNull || othIsSymbol) {
                        setLow = false
                    } else {
                        setLow = retHighest ? computed <= value : computed < value
                    }
                    if (setLow) {
                        low = mid + 1
                    } else {
                        high = mid
                    }
                }
                return nativeMin(high, MAX_ARRAY_INDEX)
            }

            function baseSortedUniq(array, iteratee) {
                var index = -1,
                    length = array.length,
                    resIndex = 0,
                    result = [];
                while (++index < length) {
                    var value = array[index],
                        computed = iteratee ? iteratee(value) : value;
                    if (!index || !eq(computed, seen)) {
                        var seen = computed;
                        result[resIndex++] = 0 === value ? 0 : value
                    }
                }
                return result
            }

            function baseToNumber(value) {
                if ("number" == typeof value) {
                    return value
                }
                if (isSymbol(value)) {
                    return NAN
                }
                return +value
            }

            function baseToString(value) {
                if ("string" == typeof value) {
                    return value
                }
                if (isArray(value)) {
                    return arrayMap(value, baseToString) + ""
                }
                if (isSymbol(value)) {
                    return symbolToString ? symbolToString.call(value) : ""
                }
                var result = value + "";
                return "0" == result && 1 / value == -INFINITY ? "-0" : result
            }

            function baseUniq(array, iteratee, comparator) {
                var index = -1,
                    includes = arrayIncludes,
                    length = array.length,
                    isCommon = true,
                    result = [],
                    seen = result;
                if (comparator) {
                    isCommon = false;
                    includes = arrayIncludesWith
                } else if (length >= LARGE_ARRAY_SIZE) {
                    var set = iteratee ? null : createSet(array);
                    if (set) {
                        return setToArray(set)
                    }
                    isCommon = false;
                    includes = cacheHas;
                    seen = new SetCache
                } else {
                    seen = iteratee ? [] : result
                }
                outer: while (++index < length) {
                    var value = array[index],
                        computed = iteratee ? iteratee(value) : value;
                    value = comparator || 0 !== value ? value : 0;
                    if (isCommon && computed === computed) {
                        var seenIndex = seen.length;
                        while (seenIndex--) {
                            if (seen[seenIndex] === computed) {
                                continue outer
                            }
                        }
                        if (iteratee) {
                            seen.push(computed)
                        }
                        result.push(value)
                    } else if (!includes(seen, computed, comparator)) {
                        if (seen !== result) {
                            seen.push(computed)
                        }
                        result.push(value)
                    }
                }
                return result
            }

            function baseUnset(object, path) {
                path = castPath(path, object);
                object = parent(object, path);
                return null == object || delete object[toKey(last(path))]
            }

            function baseUpdate(object, path, updater, customizer) {
                return baseSet(object, path, updater(baseGet(object, path)), customizer)
            }

            function baseWhile(array, predicate, isDrop, fromRight) {
                var length = array.length,
                    index = fromRight ? length : -1;
                while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
                return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index)
            }

            function baseWrapperValue(value, actions) {
                var result = value;
                if (result instanceof LazyWrapper) {
                    result = result.value()
                }
                return arrayReduce(actions, function(result, action) {
                    return action.func.apply(action.thisArg, arrayPush([result], action.args))
                }, result)
            }

            function baseXor(arrays, iteratee, comparator) {
                var length = arrays.length;
                if (length < 2) {
                    return length ? baseUniq(arrays[0]) : []
                }
                var index = -1,
                    result = Array(length);
                while (++index < length) {
                    var array = arrays[index],
                        othIndex = -1;
                    while (++othIndex < length) {
                        if (othIndex != index) {
                            result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator)
                        }
                    }
                }
                return baseUniq(baseFlatten(result, 1), iteratee, comparator)
            }

            function baseZipObject(props, values, assignFunc) {
                var index = -1,
                    length = props.length,
                    valsLength = values.length,
                    result = {};
                while (++index < length) {
                    var value = index < valsLength ? values[index] : undefined;
                    assignFunc(result, props[index], value)
                }
                return result
            }

            function castArrayLikeObject(value) {
                return isArrayLikeObject(value) ? value : []
            }

            function castFunction(value) {
                return "function" == typeof value ? value : identity
            }

            function castPath(value, object) {
                if (isArray(value)) {
                    return value
                }
                return isKey(value, object) ? [value] : stringToPath(toString(value))
            }
            var castRest = baseRest;

            function castSlice(array, start, end) {
                var length = array.length;
                end = end === undefined ? length : end;
                return !start && end >= length ? array : baseSlice(array, start, end)
            }
            var clearTimeout = ctxClearTimeout || function(id) {
                return root.clearTimeout(id)
            };

            function cloneBuffer(buffer, isDeep) {
                if (isDeep) {
                    return buffer.slice()
                }
                var length = buffer.length,
                    result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
                buffer.copy(result);
                return result
            }

            function cloneArrayBuffer(arrayBuffer) {
                var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
                new Uint8Array(result).set(new Uint8Array(arrayBuffer));
                return result
            }

            function cloneDataView(dataView, isDeep) {
                var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
                return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength)
            }

            function cloneRegExp(regexp) {
                var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
                result.lastIndex = regexp.lastIndex;
                return result
            }

            function cloneSymbol(symbol) {
                return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {}
            }

            function cloneTypedArray(typedArray, isDeep) {
                var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
                return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length)
            }

            function compareAscending(value, other) {
                if (value !== other) {
                    var valIsDefined = value !== undefined,
                        valIsNull = null === value,
                        valIsReflexive = value === value,
                        valIsSymbol = isSymbol(value),
                        othIsDefined = other !== undefined,
                        othIsNull = null === other,
                        othIsReflexive = other === other,
                        othIsSymbol = isSymbol(other);
                    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
                        return 1
                    }
                    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
                        return -1
                    }
                }
                return 0
            }

            function compareMultiple(object, other, orders) {
                var index = -1,
                    objCriteria = object.criteria,
                    othCriteria = other.criteria,
                    length = objCriteria.length,
                    ordersLength = orders.length;
                while (++index < length) {
                    var result = compareAscending(objCriteria[index], othCriteria[index]);
                    if (result) {
                        if (index >= ordersLength) {
                            return result
                        }
                        var order = orders[index];
                        return result * ("desc" == order ? -1 : 1)
                    }
                }
                return object.index - other.index
            }

            function composeArgs(args, partials, holders, isCurried) {
                var argsIndex = -1,
                    argsLength = args.length,
                    holdersLength = holders.length,
                    leftIndex = -1,
                    leftLength = partials.length,
                    rangeLength = nativeMax(argsLength - holdersLength, 0),
                    result = Array(leftLength + rangeLength),
                    isUncurried = !isCurried;
                while (++leftIndex < leftLength) {
                    result[leftIndex] = partials[leftIndex]
                }
                while (++argsIndex < holdersLength) {
                    if (isUncurried || argsIndex < argsLength) {
                        result[holders[argsIndex]] = args[argsIndex]
                    }
                }
                while (rangeLength--) {
                    result[leftIndex++] = args[argsIndex++]
                }
                return result
            }

            function composeArgsRight(args, partials, holders, isCurried) {
                var argsIndex = -1,
                    argsLength = args.length,
                    holdersIndex = -1,
                    holdersLength = holders.length,
                    rightIndex = -1,
                    rightLength = partials.length,
                    rangeLength = nativeMax(argsLength - holdersLength, 0),
                    result = Array(rangeLength + rightLength),
                    isUncurried = !isCurried;
                while (++argsIndex < rangeLength) {
                    result[argsIndex] = args[argsIndex]
                }
                var offset = argsIndex;
                while (++rightIndex < rightLength) {
                    result[offset + rightIndex] = partials[rightIndex]
                }
                while (++holdersIndex < holdersLength) {
                    if (isUncurried || argsIndex < argsLength) {
                        result[offset + holders[holdersIndex]] = args[argsIndex++]
                    }
                }
                return result
            }

            function copyArray(source, array) {
                var index = -1,
                    length = source.length;
                array || (array = Array(length));
                while (++index < length) {
                    array[index] = source[index]
                }
                return array
            }

            function copyObject(source, props, object, customizer) {
                var isNew = !object;
                object || (object = {});
                var index = -1,
                    length = props.length;
                while (++index < length) {
                    var key = props[index],
                        newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
                    if (newValue === undefined) {
                        newValue = source[key]
                    }
                    if (isNew) {
                        baseAssignValue(object, key, newValue)
                    } else {
                        assignValue(object, key, newValue)
                    }
                }
                return object
            }

            function copySymbols(source, object) {
                return copyObject(source, getSymbols(source), object)
            }

            function copySymbolsIn(source, object) {
                return copyObject(source, getSymbolsIn(source), object)
            }

            function createAggregator(setter, initializer) {
                return function(collection, iteratee) {
                    var func = isArray(collection) ? arrayAggregator : baseAggregator,
                        accumulator = initializer ? initializer() : {};
                    return func(collection, setter, getIteratee(iteratee, 2), accumulator)
                }
            }

            function createAssigner(assigner) {
                return baseRest(function(object, sources) {
                    var index = -1,
                        length = sources.length,
                        customizer = length > 1 ? sources[length - 1] : undefined,
                        guard = length > 2 ? sources[2] : undefined;
                    customizer = assigner.length > 3 && "function" == typeof customizer ? (length--,
                        customizer) : undefined;
                    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                        customizer = length < 3 ? undefined : customizer;
                        length = 1
                    }
                    object = Object(object);
                    while (++index < length) {
                        var source = sources[index];
                        if (source) {
                            assigner(object, source, index, customizer)
                        }
                    }
                    return object
                })
            }

            function createBaseEach(eachFunc, fromRight) {
                return function(collection, iteratee) {
                    if (null == collection) {
                        return collection
                    }
                    if (!isArrayLike(collection)) {
                        return eachFunc(collection, iteratee)
                    }
                    var length = collection.length,
                        index = fromRight ? length : -1,
                        iterable = Object(collection);
                    while (fromRight ? index-- : ++index < length) {
                        if (false === iteratee(iterable[index], index, iterable)) {
                            break
                        }
                    }
                    return collection
                }
            }

            function createBaseFor(fromRight) {
                return function(object, iteratee, keysFunc) {
                    var index = -1,
                        iterable = Object(object),
                        props = keysFunc(object),
                        length = props.length;
                    while (length--) {
                        var key = props[fromRight ? length : ++index];
                        if (false === iteratee(iterable[key], key, iterable)) {
                            break
                        }
                    }
                    return object
                }
            }

            function createBind(func, bitmask, thisArg) {
                var isBind = bitmask & WRAP_BIND_FLAG,
                    Ctor = createCtor(func);

                function wrapper() {
                    var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
                    return fn.apply(isBind ? thisArg : this, arguments)
                }
                return wrapper
            }

            function createCaseFirst(methodName) {
                return function(string) {
                    string = toString(string);
                    var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined,
                        chr = strSymbols ? strSymbols[0] : string.charAt(0),
                        trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
                    return chr[methodName]() + trailing
                }
            }

            function createCompounder(callback) {
                return function(string) {
                    return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "")
                }
            }

            function createCtor(Ctor) {
                return function() {
                    var args = arguments;
                    switch (args.length) {
                        case 0:
                            return new Ctor;
                        case 1:
                            return new Ctor(args[0]);
                        case 2:
                            return new Ctor(args[0], args[1]);
                        case 3:
                            return new Ctor(args[0], args[1], args[2]);
                        case 4:
                            return new Ctor(args[0], args[1], args[2], args[3]);
                        case 5:
                            return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                        case 6:
                            return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                        case 7:
                            return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6])
                    }
                    var thisBinding = baseCreate(Ctor.prototype),
                        result = Ctor.apply(thisBinding, args);
                    return isObject(result) ? result : thisBinding
                }
            }

            function createCurry(func, bitmask, arity) {
                var Ctor = createCtor(func);

                function wrapper() {
                    var length = arguments.length,
                        args = Array(length),
                        index = length,
                        placeholder = getHolder(wrapper);
                    while (index--) {
                        args[index] = arguments[index]
                    }
                    var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
                    length -= holders.length;
                    if (length < arity) {
                        return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length)
                    }
                    var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
                    return apply(fn, this, args)
                }
                return wrapper
            }

            function createFind(findIndexFunc) {
                return function(collection, predicate, fromIndex) {
                    var iterable = Object(collection);
                    if (!isArrayLike(collection)) {
                        var iteratee = getIteratee(predicate, 3);
                        collection = keys(collection);
                        predicate = function(key) {
                            return iteratee(iterable[key], key, iterable)
                        }
                    }
                    var index = findIndexFunc(collection, predicate, fromIndex);
                    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined
                }
            }

            function createFlow(fromRight) {
                return flatRest(function(funcs) {
                    var length = funcs.length,
                        index = length,
                        prereq = LodashWrapper.prototype.thru;
                    if (fromRight) {
                        funcs.reverse()
                    }
                    while (index--) {
                        var func = funcs[index];
                        if ("function" != typeof func) {
                            throw new TypeError(FUNC_ERROR_TEXT)
                        }
                        if (prereq && !wrapper && "wrapper" == getFuncName(func)) {
                            var wrapper = new LodashWrapper([], true)
                        }
                    }
                    index = wrapper ? index : length;
                    while (++index < length) {
                        func = funcs[index];
                        var funcName = getFuncName(func),
                            data = "wrapper" == funcName ? getData(func) : undefined;
                        if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && 1 == data[9]) {
                            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3])
                        } else {
                            wrapper = 1 == func.length && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func)
                        }
                    }
                    return function() {
                        var args = arguments,
                            value = args[0];
                        if (wrapper && 1 == args.length && isArray(value)) {
                            return wrapper.plant(value).value()
                        }
                        var index = 0,
                            result = length ? funcs[index].apply(this, args) : value;
                        while (++index < length) {
                            result = funcs[index].call(this, result)
                        }
                        return result
                    }
                })
            }

            function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
                var isAry = bitmask & WRAP_ARY_FLAG,
                    isBind = bitmask & WRAP_BIND_FLAG,
                    isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
                    isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
                    isFlip = bitmask & WRAP_FLIP_FLAG,
                    Ctor = isBindKey ? undefined : createCtor(func);

                function wrapper() {
                    var length = arguments.length,
                        args = Array(length),
                        index = length;
                    while (index--) {
                        args[index] = arguments[index]
                    }
                    if (isCurried) {
                        var placeholder = getHolder(wrapper),
                            holdersCount = countHolders(args, placeholder)
                    }
                    if (partials) {
                        args = composeArgs(args, partials, holders, isCurried)
                    }
                    if (partialsRight) {
                        args = composeArgsRight(args, partialsRight, holdersRight, isCurried)
                    }
                    length -= holdersCount;
                    if (isCurried && length < arity) {
                        var newHolders = replaceHolders(args, placeholder);
                        return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length)
                    }
                    var thisBinding = isBind ? thisArg : this,
                        fn = isBindKey ? thisBinding[func] : func;
                    length = args.length;
                    if (argPos) {
                        args = reorder(args, argPos)
                    } else if (isFlip && length > 1) {
                        args.reverse()
                    }
                    if (isAry && ary < length) {
                        args.length = ary
                    }
                    if (this && this !== root && this instanceof wrapper) {
                        fn = Ctor || createCtor(fn)
                    }
                    return fn.apply(thisBinding, args)
                }
                return wrapper
            }

            function createInverter(setter, toIteratee) {
                return function(object, iteratee) {
                    return baseInverter(object, setter, toIteratee(iteratee), {})
                }
            }

            function createMathOperation(operator, defaultValue) {
                return function(value, other) {
                    var result;
                    if (value === undefined && other === undefined) {
                        return defaultValue
                    }
                    if (value !== undefined) {
                        result = value
                    }
                    if (other !== undefined) {
                        if (result === undefined) {
                            return other
                        }
                        if ("string" == typeof value || "string" == typeof other) {
                            value = baseToString(value);
                            other = baseToString(other)
                        } else {
                            value = baseToNumber(value);
                            other = baseToNumber(other)
                        }
                        result = operator(value, other)
                    }
                    return result
                }
            }

            function createOver(arrayFunc) {
                return flatRest(function(iteratees) {
                    iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
                    return baseRest(function(args) {
                        var thisArg = this;
                        return arrayFunc(iteratees, function(iteratee) {
                            return apply(iteratee, thisArg, args)
                        })
                    })
                })
            }

            function createPadding(length, chars) {
                chars = chars === undefined ? " " : baseToString(chars);
                var charsLength = chars.length;
                if (charsLength < 2) {
                    return charsLength ? baseRepeat(chars, length) : chars
                }
                var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
                return hasUnicode(chars) ? castSlice(stringToArray(result), 0, length).join("") : result.slice(0, length)
            }

            function createPartial(func, bitmask, thisArg, partials) {
                var isBind = bitmask & WRAP_BIND_FLAG,
                    Ctor = createCtor(func);

                function wrapper() {
                    var argsIndex = -1,
                        argsLength = arguments.length,
                        leftIndex = -1,
                        leftLength = partials.length,
                        args = Array(leftLength + argsLength),
                        fn = this && this !== root && this instanceof wrapper ? Ctor : func;
                    while (++leftIndex < leftLength) {
                        args[leftIndex] = partials[leftIndex]
                    }
                    while (argsLength--) {
                        args[leftIndex++] = arguments[++argsIndex]
                    }
                    return apply(fn, isBind ? thisArg : this, args)
                }
                return wrapper
            }

            function createRange(fromRight) {
                return function(start, end, step) {
                    if (step && "number" != typeof step && isIterateeCall(start, end, step)) {
                        end = step = undefined
                    }
                    start = toFinite(start);
                    if (end === undefined) {
                        end = start;
                        start = 0
                    } else {
                        end = toFinite(end)
                    }
                    step = step === undefined ? start < end ? 1 : -1 : toFinite(step);
                    return baseRange(start, end, step, fromRight)
                }
            }

            function createRelationalOperation(operator) {
                return function(value, other) {
                    if (!("string" == typeof value && "string" == typeof other)) {
                        value = toNumber(value);
                        other = toNumber(other)
                    }
                    return operator(value, other)
                }
            }

            function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
                var isCurry = bitmask & WRAP_CURRY_FLAG,
                    newHolders = isCurry ? holders : undefined,
                    newHoldersRight = isCurry ? undefined : holders,
                    newPartials = isCurry ? partials : undefined,
                    newPartialsRight = isCurry ? undefined : partials;
                bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
                bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
                if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
                    bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG)
                }
                var newData = [func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity],
                    result = wrapFunc.apply(undefined, newData);
                if (isLaziable(func)) {
                    setData(result, newData)
                }
                result.placeholder = placeholder;
                return setWrapToString(result, func, bitmask)
            }

            function createRound(methodName) {
                var func = Math[methodName];
                return function(number, precision) {
                    number = toNumber(number);
                    precision = null == precision ? 0 : nativeMin(toInteger(precision), 292);
                    if (precision) {
                        var pair = (toString(number) + "e").split("e"),
                            value = func(pair[0] + "e" + (+pair[1] + precision));
                        pair = (toString(value) + "e").split("e");
                        return +(pair[0] + "e" + (+pair[1] - precision))
                    }
                    return func(number)
                }
            }
            var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function(values) {
                return new Set(values)
            };

            function createToPairs(keysFunc) {
                return function(object) {
                    var tag = getTag(object);
                    if (tag == mapTag) {
                        return mapToArray(object)
                    }
                    if (tag == setTag) {
                        return setToPairs(object)
                    }
                    return baseToPairs(object, keysFunc(object))
                }
            }

            function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
                var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
                if (!isBindKey && "function" != typeof func) {
                    throw new TypeError(FUNC_ERROR_TEXT)
                }
                var length = partials ? partials.length : 0;
                if (!length) {
                    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
                    partials = holders = undefined
                }
                ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
                arity = arity === undefined ? arity : toInteger(arity);
                length -= holders ? holders.length : 0;
                if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
                    var partialsRight = partials,
                        holdersRight = holders;
                    partials = holders = undefined
                }
                var data = isBindKey ? undefined : getData(func),
                    newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
                if (data) {
                    mergeData(newData, data)
                }
                func = newData[0];
                bitmask = newData[1];
                thisArg = newData[2];
                partials = newData[3];
                holders = newData[4];
                arity = newData[9] = newData[9] === undefined ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
                if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
                    bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)
                }
                if (!bitmask || bitmask == WRAP_BIND_FLAG) {
                    var result = createBind(func, bitmask, thisArg)
                } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
                    result = createCurry(func, bitmask, arity)
                } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
                    result = createPartial(func, bitmask, thisArg, partials)
                } else {
                    result = createHybrid.apply(undefined, newData)
                }
                var setter = data ? baseSetData : setData;
                return setWrapToString(setter(result, newData), func, bitmask)
            }

            function customDefaultsAssignIn(objValue, srcValue, key, object) {
                if (objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                    return srcValue
                }
                return objValue
            }

            function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
                if (isObject(objValue) && isObject(srcValue)) {
                    stack.set(srcValue, objValue);
                    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
                    stack["delete"](srcValue)
                }
                return objValue
            }

            function customOmitClone(value) {
                return isPlainObject(value) ? undefined : value
            }

            function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
                var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
                    arrLength = array.length,
                    othLength = other.length;
                if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
                    return false
                }
                var stacked = stack.get(array);
                if (stacked && stack.get(other)) {
                    return stacked == other
                }
                var index = -1,
                    result = true,
                    seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache : undefined;
                stack.set(array, other);
                stack.set(other, array);
                while (++index < arrLength) {
                    var arrValue = array[index],
                        othValue = other[index];
                    if (customizer) {
                        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack)
                    }
                    if (compared !== undefined) {
                        if (compared) {
                            continue
                        }
                        result = false;
                        break
                    }
                    if (seen) {
                        if (!arraySome(other, function(othValue, othIndex) {
                                if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                                    return seen.push(othIndex)
                                }
                            })) {
                            result = false;
                            break
                        }
                    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                        result = false;
                        break
                    }
                }
                stack["delete"](array);
                stack["delete"](other);
                return result
            }

            function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
                switch (tag) {
                    case dataViewTag:
                        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                            return false
                        }
                        object = object.buffer;
                        other = other.buffer;
                    case arrayBufferTag:
                        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
                            return false
                        }
                        return true;
                    case boolTag:
                    case dateTag:
                    case numberTag:
                        return eq(+object, +other);
                    case errorTag:
                        return object.name == other.name && object.message == other.message;
                    case regexpTag:
                    case stringTag:
                        return object == other + "";
                    case mapTag:
                        var convert = mapToArray;
                    case setTag:
                        var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                        convert || (convert = setToArray);
                        if (object.size != other.size && !isPartial) {
                            return false
                        }
                        var stacked = stack.get(object);
                        if (stacked) {
                            return stacked == other
                        }
                        bitmask |= COMPARE_UNORDERED_FLAG;
                        stack.set(object, other);
                        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                        stack["delete"](object);
                        return result;
                    case symbolTag:
                        if (symbolValueOf) {
                            return symbolValueOf.call(object) == symbolValueOf.call(other)
                        }
                }
                return false
            }

            function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
                var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
                    objProps = getAllKeys(object),
                    objLength = objProps.length,
                    othProps = getAllKeys(other),
                    othLength = othProps.length;
                if (objLength != othLength && !isPartial) {
                    return false
                }
                var index = objLength;
                while (index--) {
                    var key = objProps[index];
                    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                        return false
                    }
                }
                var stacked = stack.get(object);
                if (stacked && stack.get(other)) {
                    return stacked == other
                }
                var result = true;
                stack.set(object, other);
                stack.set(other, object);
                var skipCtor = isPartial;
                while (++index < objLength) {
                    key = objProps[index];
                    var objValue = object[key],
                        othValue = other[key];
                    if (customizer) {
                        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack)
                    }
                    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                        result = false;
                        break
                    }
                    skipCtor || (skipCtor = "constructor" == key)
                }
                if (result && !skipCtor) {
                    var objCtor = object.constructor,
                        othCtor = other.constructor;
                    if (objCtor != othCtor && "constructor" in object && "constructor" in other && !("function" == typeof objCtor && objCtor instanceof objCtor && "function" == typeof othCtor && othCtor instanceof othCtor)) {
                        result = false
                    }
                }
                stack["delete"](object);
                stack["delete"](other);
                return result
            }

            function flatRest(func) {
                return setToString(overRest(func, undefined, flatten), func + "")
            }

            function getAllKeys(object) {
                return baseGetAllKeys(object, keys, getSymbols)
            }

            function getAllKeysIn(object) {
                return baseGetAllKeys(object, keysIn, getSymbolsIn)
            }
            var getData = !metaMap ? noop : function(func) {
                return metaMap.get(func)
            };

            function getFuncName(func) {
                var result = func.name + "",
                    array = realNames[result],
                    length = hasOwnProperty.call(realNames, result) ? array.length : 0;
                while (length--) {
                    var data = array[length],
                        otherFunc = data.func;
                    if (null == otherFunc || otherFunc == func) {
                        return data.name
                    }
                }
                return result
            }

            function getHolder(func) {
                var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
                return object.placeholder
            }

            function getIteratee() {
                var result = lodash.iteratee || iteratee;
                result = result === iteratee ? baseIteratee : result;
                return arguments.length ? result(arguments[0], arguments[1]) : result
            }

            function getMapData(map, key) {
                var data = map.__data__;
                return isKeyable(key) ? data["string" == typeof key ? "string" : "hash"] : data.map
            }

            function getMatchData(object) {
                var result = keys(object),
                    length = result.length;
                while (length--) {
                    var key = result[length],
                        value = object[key];
                    result[length] = [key, value, isStrictComparable(value)]
                }
                return result
            }

            function getNative(object, key) {
                var value = getValue(object, key);
                return baseIsNative(value) ? value : undefined
            }

            function getRawTag(value) {
                var isOwn = hasOwnProperty.call(value, symToStringTag),
                    tag = value[symToStringTag];
                try {
                    value[symToStringTag] = undefined;
                    var unmasked = true
                } catch (e) {}
                var result = nativeObjectToString.call(value);
                if (unmasked) {
                    if (isOwn) {
                        value[symToStringTag] = tag
                    } else {
                        delete value[symToStringTag]
                    }
                }
                return result
            }
            var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
                    if (null == object) {
                        return []
                    }
                    object = Object(object);
                    return arrayFilter(nativeGetSymbols(object), function(symbol) {
                        return propertyIsEnumerable.call(object, symbol)
                    })
                },
                getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
                    var result = [];
                    while (object) {
                        arrayPush(result, getSymbols(object));
                        object = getPrototype(object)
                    }
                    return result
                },
                getTag = baseGetTag;
            if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set) != setTag || WeakMap && getTag(new WeakMap) != weakMapTag) {
                getTag = function(value) {
                    var result = baseGetTag(value),
                        Ctor = result == objectTag ? value.constructor : undefined,
                        ctorString = Ctor ? toSource(Ctor) : "";
                    if (ctorString) {
                        switch (ctorString) {
                            case dataViewCtorString:
                                return dataViewTag;
                            case mapCtorString:
                                return mapTag;
                            case promiseCtorString:
                                return promiseTag;
                            case setCtorString:
                                return setTag;
                            case weakMapCtorString:
                                return weakMapTag
                        }
                    }
                    return result
                }
            }

            function getView(start, end, transforms) {
                var index = -1,
                    length = transforms.length;
                while (++index < length) {
                    var data = transforms[index],
                        size = data.size;
                    switch (data.type) {
                        case "drop":
                            start += size;
                            break;
                        case "dropRight":
                            end -= size;
                            break;
                        case "take":
                            end = nativeMin(end, start + size);
                            break;
                        case "takeRight":
                            start = nativeMax(start, end - size);
                            break
                    }
                }
                return {
                    start,
                    end
                }
            }

            function getWrapDetails(source) {
                var match = source.match(reWrapDetails);
                return match ? match[1].split(reSplitDetails) : []
            }

            function hasPath(object, path, hasFunc) {
                path = castPath(path, object);
                var index = -1,
                    length = path.length,
                    result = false;
                while (++index < length) {
                    var key = toKey(path[index]);
                    if (!(result = null != object && hasFunc(object, key))) {
                        break
                    }
                    object = object[key]
                }
                if (result || ++index != length) {
                    return result
                }
                length = null == object ? 0 : object.length;
                return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object))
            }

            function initCloneArray(array) {
                var length = array.length,
                    result = new array.constructor(length);
                if (length && "string" == typeof array[0] && hasOwnProperty.call(array, "index")) {
                    result.index = array.index;
                    result.input = array.input
                }
                return result
            }

            function initCloneObject(object) {
                return "function" == typeof object.constructor && !isPrototype(object) ? baseCreate(getPrototype(object)) : {}
            }

            function initCloneByTag(object, tag, isDeep) {
                var Ctor = object.constructor;
                switch (tag) {
                    case arrayBufferTag:
                        return cloneArrayBuffer(object);
                    case boolTag:
                    case dateTag:
                        return new Ctor(+object);
                    case dataViewTag:
                        return cloneDataView(object, isDeep);
                    case float32Tag:
                    case float64Tag:
                    case int8Tag:
                    case int16Tag:
                    case int32Tag:
                    case uint8Tag:
                    case uint8ClampedTag:
                    case uint16Tag:
                    case uint32Tag:
                        return cloneTypedArray(object, isDeep);
                    case mapTag:
                        return new Ctor;
                    case numberTag:
                    case stringTag:
                        return new Ctor(object);
                    case regexpTag:
                        return cloneRegExp(object);
                    case setTag:
                        return new Ctor;
                    case symbolTag:
                        return cloneSymbol(object)
                }
            }

            function insertWrapDetails(source, details) {
                var length = details.length;
                if (!length) {
                    return source
                }
                var lastIndex = length - 1;
                details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
                details = details.join(length > 2 ? ", " : " ");
                return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n")
            }

            function isFlattenable(value) {
                return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol])
            }

            function isIndex(value, length) {
                var type = typeof value;
                length = null == length ? MAX_SAFE_INTEGER : length;
                return !!length && ("number" == type || "symbol" != type && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length
            }

            function isIterateeCall(value, index, object) {
                if (!isObject(object)) {
                    return false
                }
                var type = typeof index;
                if ("number" == type ? isArrayLike(object) && isIndex(index, object.length) : "string" == type && index in object) {
                    return eq(object[index], value)
                }
                return false
            }

            function isKey(value, object) {
                if (isArray(value)) {
                    return false
                }
                var type = typeof value;
                if ("number" == type || "symbol" == type || "boolean" == type || null == value || isSymbol(value)) {
                    return true
                }
                return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || null != object && value in Object(object)
            }

            function isKeyable(value) {
                var type = typeof value;
                return "string" == type || "number" == type || "symbol" == type || "boolean" == type ? "__proto__" !== value : null === value
            }

            function isLaziable(func) {
                var funcName = getFuncName(func),
                    other = lodash[funcName];
                if ("function" != typeof other || !(funcName in LazyWrapper.prototype)) {
                    return false
                }
                if (func === other) {
                    return true
                }
                var data = getData(other);
                return !!data && func === data[0]
            }

            function isMasked(func) {
                return !!maskSrcKey && maskSrcKey in func
            }
            var isMaskable = coreJsData ? isFunction : stubFalse;

            function isPrototype(value) {
                var Ctor = value && value.constructor,
                    proto = "function" == typeof Ctor && Ctor.prototype || objectProto;
                return value === proto
            }

            function isStrictComparable(value) {
                return value === value && !isObject(value)
            }

            function matchesStrictComparable(key, srcValue) {
                return function(object) {
                    if (null == object) {
                        return false
                    }
                    return object[key] === srcValue && (srcValue !== undefined || key in Object(object))
                }
            }

            function memoizeCapped(func) {
                var result = memoize(func, function(key) {
                        if (cache.size === MAX_MEMOIZE_SIZE) {
                            cache.clear()
                        }
                        return key
                    }),
                    cache = result.cache;
                return result
            }

            function mergeData(data, source) {
                var bitmask = data[1],
                    srcBitmask = source[1],
                    newBitmask = bitmask | srcBitmask,
                    isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG),
                    isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
                if (!(isCommon || isCombo)) {
                    return data
                }
                if (srcBitmask & WRAP_BIND_FLAG) {
                    data[2] = source[2];
                    newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG
                }
                var value = source[3];
                if (value) {
                    var partials = data[3];
                    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
                    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4]
                }
                value = source[5];
                if (value) {
                    partials = data[5];
                    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
                    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6]
                }
                value = source[7];
                if (value) {
                    data[7] = value
                }
                if (srcBitmask & WRAP_ARY_FLAG) {
                    data[8] = null == data[8] ? source[8] : nativeMin(data[8], source[8])
                }
                if (null == data[9]) {
                    data[9] = source[9]
                }
                data[0] = source[0];
                data[1] = newBitmask;
                return data
            }

            function nativeKeysIn(object) {
                var result = [];
                if (null != object) {
                    for (var key in Object(object)) {
                        result.push(key)
                    }
                }
                return result
            }

            function objectToString(value) {
                return nativeObjectToString.call(value)
            }

            function overRest(func, start, transform) {
                start = nativeMax(start === undefined ? func.length - 1 : start, 0);
                return function() {
                    var args = arguments,
                        index = -1,
                        length = nativeMax(args.length - start, 0),
                        array = Array(length);
                    while (++index < length) {
                        array[index] = args[start + index]
                    }
                    index = -1;
                    var otherArgs = Array(start + 1);
                    while (++index < start) {
                        otherArgs[index] = args[index]
                    }
                    otherArgs[start] = transform(array);
                    return apply(func, this, otherArgs)
                }
            }

            function parent(object, path) {
                return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1))
            }

            function reorder(array, indexes) {
                var arrLength = array.length,
                    length = nativeMin(indexes.length, arrLength),
                    oldArray = copyArray(array);
                while (length--) {
                    var index = indexes[length];
                    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined
                }
                return array
            }
            var setData = shortOut(baseSetData),
                setTimeout = ctxSetTimeout || function(func, wait) {
                    return root.setTimeout(func, wait)
                },
                setToString = shortOut(baseSetToString);

            function setWrapToString(wrapper, reference, bitmask) {
                var source = reference + "";
                return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)))
            }

            function shortOut(func) {
                var count = 0,
                    lastCalled = 0;
                return function() {
                    var stamp = nativeNow(),
                        remaining = HOT_SPAN - (stamp - lastCalled);
                    lastCalled = stamp;
                    if (remaining > 0) {
                        if (++count >= HOT_COUNT) {
                            return arguments[0]
                        }
                    } else {
                        count = 0
                    }
                    return func.apply(undefined, arguments)
                }
            }

            function shuffleSelf(array, size) {
                var index = -1,
                    length = array.length,
                    lastIndex = length - 1;
                size = size === undefined ? length : size;
                while (++index < size) {
                    var rand = baseRandom(index, lastIndex),
                        value = array[rand];
                    array[rand] = array[index];
                    array[index] = value
                }
                array.length = size;
                return array
            }
            var stringToPath = memoizeCapped(function(string) {
                var result = [];
                if (46 === string.charCodeAt(0)) {
                    result.push("")
                }
                string.replace(rePropName, function(match, number, quote, subString) {
                    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match)
                });
                return result
            });

            function toKey(value) {
                if ("string" == typeof value || isSymbol(value)) {
                    return value
                }
                var result = value + "";
                return "0" == result && 1 / value == -INFINITY ? "-0" : result
            }

            function toSource(func) {
                if (null != func) {
                    try {
                        return funcToString.call(func)
                    } catch (e) {}
                    try {
                        return func + ""
                    } catch (e) {}
                }
                return ""
            }

            function updateWrapDetails(details, bitmask) {
                arrayEach(wrapFlags, function(pair) {
                    var value = "_." + pair[0];
                    if (bitmask & pair[1] && !arrayIncludes(details, value)) {
                        details.push(value)
                    }
                });
                return details.sort()
            }

            function wrapperClone(wrapper) {
                if (wrapper instanceof LazyWrapper) {
                    return wrapper.clone()
                }
                var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
                result.__actions__ = copyArray(wrapper.__actions__);
                result.__index__ = wrapper.__index__;
                result.__values__ = wrapper.__values__;
                return result
            }

            function chunk(array, size, guard) {
                if (guard ? isIterateeCall(array, size, guard) : size === undefined) {
                    size = 1
                } else {
                    size = nativeMax(toInteger(size), 0)
                }
                var length = null == array ? 0 : array.length;
                if (!length || size < 1) {
                    return []
                }
                var index = 0,
                    resIndex = 0,
                    result = Array(nativeCeil(length / size));
                while (index < length) {
                    result[resIndex++] = baseSlice(array, index, index += size)
                }
                return result
            }

            function compact(array) {
                var index = -1,
                    length = null == array ? 0 : array.length,
                    resIndex = 0,
                    result = [];
                while (++index < length) {
                    var value = array[index];
                    if (value) {
                        result[resIndex++] = value
                    }
                }
                return result
            }

            function concat() {
                var length = arguments.length;
                if (!length) {
                    return []
                }
                var args = Array(length - 1),
                    array = arguments[0],
                    index = length;
                while (index--) {
                    args[index - 1] = arguments[index]
                }
                return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1))
            }
            var difference = baseRest(function(array, values) {
                    return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true)) : []
                }),
                differenceBy = baseRest(function(array, values) {
                    var iteratee = last(values);
                    if (isArrayLikeObject(iteratee)) {
                        iteratee = undefined
                    }
                    return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2)) : []
                }),
                differenceWith = baseRest(function(array, values) {
                    var comparator = last(values);
                    if (isArrayLikeObject(comparator)) {
                        comparator = undefined
                    }
                    return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator) : []
                });

            function drop(array, n, guard) {
                var length = null == array ? 0 : array.length;
                if (!length) {
                    return []
                }
                n = guard || n === undefined ? 1 : toInteger(n);
                return baseSlice(array, n < 0 ? 0 : n, length)
            }

            function dropRight(array, n, guard) {
                var length = null == array ? 0 : array.length;
                if (!length) {
                    return []
                }
                n = guard || n === undefined ? 1 : toInteger(n);
                n = length - n;
                return baseSlice(array, 0, n < 0 ? 0 : n)
            }

            function dropRightWhile(array, predicate) {
                return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : []
            }

            function dropWhile(array, predicate) {
                return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : []
            }

            function fill(array, value, start, end) {
                var length = null == array ? 0 : array.length;
                if (!length) {
                    return []
                }
                if (start && "number" != typeof start && isIterateeCall(array, value, start)) {
                    start = 0;
                    end = length
                }
                return baseFill(array, value, start, end)
            }

            function findIndex(array, predicate, fromIndex) {
                var length = null == array ? 0 : array.length;
                if (!length) {
                    return -1
                }
                var index = null == fromIndex ? 0 : toInteger(fromIndex);
                if (index < 0) {
                    index = nativeMax(length + index, 0)
                }
                return baseFindIndex(array, getIteratee(predicate, 3), index)
            }

            function findLastIndex(array, predicate, fromIndex) {
                var length = null == array ? 0 : array.length;
                if (!length) {
                    return -1
                }
                var index = length - 1;
                if (fromIndex !== undefined) {
                    index = toInteger(fromIndex);
                    index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1)
                }
                return baseFindIndex(array, getIteratee(predicate, 3), index, true)
            }

            function flatten(array) {
                var length = null == array ? 0 : array.length;
                return length ? baseFlatten(array, 1) : []
            }

            function flattenDeep(array) {
                var length = null == array ? 0 : array.length;
                return length ? baseFlatten(array, INFINITY) : []
            }

            function flattenDepth(array, depth) {
                var length = null == array ? 0 : array.length;
                if (!length) {
                    return []
                }
                depth = depth === undefined ? 1 : toInteger(depth);
                return baseFlatten(array, depth)
            }

            function fromPairs(pairs) {
                var index = -1,
                    length = null == pairs ? 0 : pairs.length,
                    result = {};
                while (++index < length) {
                    var pair = pairs[index];
                    result[pair[0]] = pair[1]
                }
                return result
            }

            function head(array) {
                return array && array.length ? array[0] : undefined
            }

            function indexOf(array, value, fromIndex) {
                var length = null == array ? 0 : array.length;
                if (!length) {
                    return -1
                }
                var index = null == fromIndex ? 0 : toInteger(fromIndex);
                if (index < 0) {
                    index = nativeMax(length + index, 0)
                }
                return baseIndexOf(array, value, index)
            }

            function initial(array) {
                var length = null == array ? 0 : array.length;
                return length ? baseSlice(array, 0, -1) : []
            }
            var intersection = baseRest(function(arrays) {
                    var mapped = arrayMap(arrays, castArrayLikeObject);
                    return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : []
                }),
                intersectionBy = baseRest(function(arrays) {
                    var iteratee = last(arrays),
                        mapped = arrayMap(arrays, castArrayLikeObject);
                    if (iteratee === last(mapped)) {
                        iteratee = undefined
                    } else {
                        mapped.pop()
                    }
                    return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee, 2)) : []
                }),
                intersectionWith = baseRest(function(arrays) {
                    var comparator = last(arrays),
                        mapped = arrayMap(arrays, castArrayLikeObject);
                    comparator = "function" == typeof comparator ? comparator : undefined;
                    if (comparator) {
                        mapped.pop()
                    }
                    return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined, comparator) : []
                });

            function join(array, separator) {
                return null == array ? "" : nativeJoin.call(array, separator)
            }

            function last(array) {
                var length = null == array ? 0 : array.length;
                return length ? array[length - 1] : undefined
            }

            function lastIndexOf(array, value, fromIndex) {
                var length = null == array ? 0 : array.length;
                if (!length) {
                    return -1
                }
                var index = length;
                if (fromIndex !== undefined) {
                    index = toInteger(fromIndex);
                    index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1)
                }
                return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true)
            }

            function nth(array, n) {
                return array && array.length ? baseNth(array, toInteger(n)) : undefined
            }
            var pull = baseRest(pullAll);

            function pullAll(array, values) {
                return array && array.length && values && values.length ? basePullAll(array, values) : array
            }

            function pullAllBy(array, values, iteratee) {
                return array && array.length && values && values.length ? basePullAll(array, values, getIteratee(iteratee, 2)) : array
            }

            function pullAllWith(array, values, comparator) {
                return array && array.length && values && values.length ? basePullAll(array, values, undefined, comparator) : array
            }
            var pullAt = flatRest(function(array, indexes) {
                var length = null == array ? 0 : array.length,
                    result = baseAt(array, indexes);
                basePullAt(array, arrayMap(indexes, function(index) {
                    return isIndex(index, length) ? +index : index
                }).sort(compareAscending));
                return result
            });

            function remove(array, predicate) {
                var result = [];
                if (!(array && array.length)) {
                    return result
                }
                var index = -1,
                    indexes = [],
                    length = array.length;
                predicate = getIteratee(predicate, 3);
                while (++index < length) {
                    var value = array[index];
                    if (predicate(value, index, array)) {
                        result.push(value);
                        indexes.push(index)
                    }
                }
                basePullAt(array, indexes);
                return result
            }

            function reverse(array) {
                return null == array ? array : nativeReverse.call(array)
            }

            function slice(array, start, end) {
                var length = null == array ? 0 : array.length;
                if (!length) {
                    return []
                }
                if (end && "number" != typeof end && isIterateeCall(array, start, end)) {
                    start = 0;
                    end = length
                } else {
                    start = null == start ? 0 : toInteger(start);
                    end = end === undefined ? length : toInteger(end)
                }
                return baseSlice(array, start, end)
            }

            function sortedIndex(array, value) {
                return baseSortedIndex(array, value)
            }

            function sortedIndexBy(array, value, iteratee) {
                return baseSortedIndexBy(array, value, getIteratee(iteratee, 2))
            }

            function sortedIndexOf(array, value) {
                var length = null == array ? 0 : array.length;
                if (length) {
                    var index = baseSortedIndex(array, value);
                    if (index < length && eq(array[index], value)) {
                        return index
                    }
                }
                return -1
            }

            function sortedLastIndex(array, value) {
                return baseSortedIndex(array, value, true)
            }

            function sortedLastIndexBy(array, value, iteratee) {
                return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true)
            }

            function sortedLastIndexOf(array, value) {
                var length = null == array ? 0 : array.length;
                if (length) {
                    var index = baseSortedIndex(array, value, true) - 1;
                    if (eq(array[index], value)) {
                        return index
                    }
                }
                return -1
            }

            function sortedUniq(array) {
                return array && array.length ? baseSortedUniq(array) : []
            }

            function sortedUniqBy(array, iteratee) {
                return array && array.length ? baseSortedUniq(array, getIteratee(iteratee, 2)) : []
            }

            function tail(array) {
                var length = null == array ? 0 : array.length;
                return length ? baseSlice(array, 1, length) : []
            }

            function take(array, n, guard) {
                if (!(array && array.length)) {
                    return []
                }
                n = guard || n === undefined ? 1 : toInteger(n);
                return baseSlice(array, 0, n < 0 ? 0 : n)
            }

            function takeRight(array, n, guard) {
                var length = null == array ? 0 : array.length;
                if (!length) {
                    return []
                }
                n = guard || n === undefined ? 1 : toInteger(n);
                n = length - n;
                return baseSlice(array, n < 0 ? 0 : n, length)
            }

            function takeRightWhile(array, predicate) {
                return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : []
            }

            function takeWhile(array, predicate) {
                return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : []
            }
            var union = baseRest(function(arrays) {
                    return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true))
                }),
                unionBy = baseRest(function(arrays) {
                    var iteratee = last(arrays);
                    if (isArrayLikeObject(iteratee)) {
                        iteratee = undefined
                    }
                    return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
                }),
                unionWith = baseRest(function(arrays) {
                    var comparator = last(arrays);
                    comparator = "function" == typeof comparator ? comparator : undefined;
                    return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator)
                });

            function uniq(array) {
                return array && array.length ? baseUniq(array) : []
            }

            function uniqBy(array, iteratee) {
                return array && array.length ? baseUniq(array, getIteratee(iteratee, 2)) : []
            }

            function uniqWith(array, comparator) {
                comparator = "function" == typeof comparator ? comparator : undefined;
                return array && array.length ? baseUniq(array, undefined, comparator) : []
            }

            function unzip(array) {
                if (!(array && array.length)) {
                    return []
                }
                var length = 0;
                array = arrayFilter(array, function(group) {
                    if (isArrayLikeObject(group)) {
                        length = nativeMax(group.length, length);
                        return true
                    }
                });
                return baseTimes(length, function(index) {
                    return arrayMap(array, baseProperty(index))
                })
            }

            function unzipWith(array, iteratee) {
                if (!(array && array.length)) {
                    return []
                }
                var result = unzip(array);
                if (null == iteratee) {
                    return result
                }
                return arrayMap(result, function(group) {
                    return apply(iteratee, undefined, group)
                })
            }
            var without = baseRest(function(array, values) {
                    return isArrayLikeObject(array) ? baseDifference(array, values) : []
                }),
                xor = baseRest(function(arrays) {
                    return baseXor(arrayFilter(arrays, isArrayLikeObject))
                }),
                xorBy = baseRest(function(arrays) {
                    var iteratee = last(arrays);
                    if (isArrayLikeObject(iteratee)) {
                        iteratee = undefined
                    }
                    return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2))
                }),
                xorWith = baseRest(function(arrays) {
                    var comparator = last(arrays);
                    comparator = "function" == typeof comparator ? comparator : undefined;
                    return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator)
                }),
                zip = baseRest(unzip);

            function zipObject(props, values) {
                return baseZipObject(props || [], values || [], assignValue)
            }

            function zipObjectDeep(props, values) {
                return baseZipObject(props || [], values || [], baseSet)
            }
            var zipWith = baseRest(function(arrays) {
                var length = arrays.length,
                    iteratee = length > 1 ? arrays[length - 1] : undefined;
                iteratee = "function" == typeof iteratee ? (arrays.pop(),
                    iteratee) : undefined;
                return unzipWith(arrays, iteratee)
            });

            function chain(value) {
                var result = lodash(value);
                result.__chain__ = true;
                return result
            }

            function tap(value, interceptor) {
                interceptor(value);
                return value
            }

            function thru(value, interceptor) {
                return interceptor(value)
            }
            var wrapperAt = flatRest(function(paths) {
                var length = paths.length,
                    start = length ? paths[0] : 0,
                    value = this.__wrapped__,
                    interceptor = function(object) {
                        return baseAt(object, paths)
                    };
                if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
                    return this.thru(interceptor)
                }
                value = value.slice(start, +start + (length ? 1 : 0));
                value.__actions__.push({
                    func: thru,
                    args: [interceptor],
                    thisArg: undefined
                });
                return new LodashWrapper(value, this.__chain__).thru(function(array) {
                    if (length && !array.length) {
                        array.push(undefined)
                    }
                    return array
                })
            });

            function wrapperChain() {
                return chain(this)
            }

            function wrapperCommit() {
                return new LodashWrapper(this.value(), this.__chain__)
            }

            function wrapperNext() {
                if (this.__values__ === undefined) {
                    this.__values__ = toArray(this.value())
                }
                var done = this.__index__ >= this.__values__.length,
                    value = done ? undefined : this.__values__[this.__index__++];
                return {
                    done,
                    value
                }
            }

            function wrapperToIterator() {
                return this
            }

            function wrapperPlant(value) {
                var result, parent = this;
                while (parent instanceof baseLodash) {
                    var clone = wrapperClone(parent);
                    clone.__index__ = 0;
                    clone.__values__ = undefined;
                    if (result) {
                        previous.__wrapped__ = clone
                    } else {
                        result = clone
                    }
                    var previous = clone;
                    parent = parent.__wrapped__
                }
                previous.__wrapped__ = value;
                return result
            }

            function wrapperReverse() {
                var value = this.__wrapped__;
                if (value instanceof LazyWrapper) {
                    var wrapped = value;
                    if (this.__actions__.length) {
                        wrapped = new LazyWrapper(this)
                    }
                    wrapped = wrapped.reverse();
                    wrapped.__actions__.push({
                        func: thru,
                        args: [reverse],
                        thisArg: undefined
                    });
                    return new LodashWrapper(wrapped, this.__chain__)
                }
                return this.thru(reverse)
            }

            function wrapperValue() {
                return baseWrapperValue(this.__wrapped__, this.__actions__)
            }
            var countBy = createAggregator(function(result, value, key) {
                if (hasOwnProperty.call(result, key)) {
                    ++result[key]
                } else {
                    baseAssignValue(result, key, 1)
                }
            });

            function every(collection, predicate, guard) {
                var func = isArray(collection) ? arrayEvery : baseEvery;
                if (guard && isIterateeCall(collection, predicate, guard)) {
                    predicate = undefined
                }
                return func(collection, getIteratee(predicate, 3))
            }

            function filter(collection, predicate) {
                var func = isArray(collection) ? arrayFilter : baseFilter;
                return func(collection, getIteratee(predicate, 3))
            }
            var find = createFind(findIndex),
                findLast = createFind(findLastIndex);

            function flatMap(collection, iteratee) {
                return baseFlatten(map(collection, iteratee), 1)
            }

            function flatMapDeep(collection, iteratee) {
                return baseFlatten(map(collection, iteratee), INFINITY)
            }

            function flatMapDepth(collection, iteratee, depth) {
                depth = depth === undefined ? 1 : toInteger(depth);
                return baseFlatten(map(collection, iteratee), depth)
            }

            function forEach(collection, iteratee) {
                var func = isArray(collection) ? arrayEach : baseEach;
                return func(collection, getIteratee(iteratee, 3))
            }

            function forEachRight(collection, iteratee) {
                var func = isArray(collection) ? arrayEachRight : baseEachRight;
                return func(collection, getIteratee(iteratee, 3))
            }
            var groupBy = createAggregator(function(result, value, key) {
                if (hasOwnProperty.call(result, key)) {
                    result[key].push(value)
                } else {
                    baseAssignValue(result, key, [value])
                }
            });

            function includes(collection, value, fromIndex, guard) {
                collection = isArrayLike(collection) ? collection : values(collection);
                fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
                var length = collection.length;
                if (fromIndex < 0) {
                    fromIndex = nativeMax(length + fromIndex, 0)
                }
                return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1
            }
            var invokeMap = baseRest(function(collection, path, args) {
                    var index = -1,
                        isFunc = "function" == typeof path,
                        result = isArrayLike(collection) ? Array(collection.length) : [];
                    baseEach(collection, function(value) {
                        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args)
                    });
                    return result
                }),
                keyBy = createAggregator(function(result, value, key) {
                    baseAssignValue(result, key, value)
                });

            function map(collection, iteratee) {
                var func = isArray(collection) ? arrayMap : baseMap;
                return func(collection, getIteratee(iteratee, 3))
            }

            function orderBy(collection, iteratees, orders, guard) {
                if (null == collection) {
                    return []
                }
                if (!isArray(iteratees)) {
                    iteratees = null == iteratees ? [] : [iteratees]
                }
                orders = guard ? undefined : orders;
                if (!isArray(orders)) {
                    orders = null == orders ? [] : [orders]
                }
                return baseOrderBy(collection, iteratees, orders)
            }
            var partition = createAggregator(function(result, value, key) {
                result[key ? 0 : 1].push(value)
            }, function() {
                return [
                    [],
                    []
                ]
            });

            function reduce(collection, iteratee, accumulator) {
                var func = isArray(collection) ? arrayReduce : baseReduce,
                    initAccum = arguments.length < 3;
                return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach)
            }

            function reduceRight(collection, iteratee, accumulator) {
                var func = isArray(collection) ? arrayReduceRight : baseReduce,
                    initAccum = arguments.length < 3;
                return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight)
            }

            function reject(collection, predicate) {
                var func = isArray(collection) ? arrayFilter : baseFilter;
                return func(collection, negate(getIteratee(predicate, 3)))
            }

            function sample(collection) {
                var func = isArray(collection) ? arraySample : baseSample;
                return func(collection)
            }

            function sampleSize(collection, n, guard) {
                if (guard ? isIterateeCall(collection, n, guard) : n === undefined) {
                    n = 1
                } else {
                    n = toInteger(n)
                }
                var func = isArray(collection) ? arraySampleSize : baseSampleSize;
                return func(collection, n)
            }

            function shuffle(collection) {
                var func = isArray(collection) ? arrayShuffle : baseShuffle;
                return func(collection)
            }

            function size(collection) {
                if (null == collection) {
                    return 0
                }
                if (isArrayLike(collection)) {
                    return isString(collection) ? stringSize(collection) : collection.length
                }
                var tag = getTag(collection);
                if (tag == mapTag || tag == setTag) {
                    return collection.size
                }
                return baseKeys(collection).length
            }

            function some(collection, predicate, guard) {
                var func = isArray(collection) ? arraySome : baseSome;
                if (guard && isIterateeCall(collection, predicate, guard)) {
                    predicate = undefined
                }
                return func(collection, getIteratee(predicate, 3))
            }
            var sortBy = baseRest(function(collection, iteratees) {
                    if (null == collection) {
                        return []
                    }
                    var length = iteratees.length;
                    if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
                        iteratees = []
                    } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
                        iteratees = [iteratees[0]]
                    }
                    return baseOrderBy(collection, baseFlatten(iteratees, 1), [])
                }),
                now = ctxNow || function() {
                    return root.Date.now()
                };

            function after(n, func) {
                if ("function" != typeof func) {
                    throw new TypeError(FUNC_ERROR_TEXT)
                }
                n = toInteger(n);
                return function() {
                    if (--n < 1) {
                        return func.apply(this, arguments)
                    }
                }
            }

            function ary(func, n, guard) {
                n = guard ? undefined : n;
                n = func && null == n ? func.length : n;
                return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n)
            }

            function before(n, func) {
                var result;
                if ("function" != typeof func) {
                    throw new TypeError(FUNC_ERROR_TEXT)
                }
                n = toInteger(n);
                return function() {
                    if (--n > 0) {
                        result = func.apply(this, arguments)
                    }
                    if (n <= 1) {
                        func = undefined
                    }
                    return result
                }
            }
            var bind = baseRest(function(func, thisArg, partials) {
                    var bitmask = WRAP_BIND_FLAG;
                    if (partials.length) {
                        var holders = replaceHolders(partials, getHolder(bind));
                        bitmask |= WRAP_PARTIAL_FLAG
                    }
                    return createWrap(func, bitmask, thisArg, partials, holders)
                }),
                bindKey = baseRest(function(object, key, partials) {
                    var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
                    if (partials.length) {
                        var holders = replaceHolders(partials, getHolder(bindKey));
                        bitmask |= WRAP_PARTIAL_FLAG
                    }
                    return createWrap(key, bitmask, object, partials, holders)
                });

            function curry(func, arity, guard) {
                arity = guard ? undefined : arity;
                var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
                result.placeholder = curry.placeholder;
                return result
            }

            function curryRight(func, arity, guard) {
                arity = guard ? undefined : arity;
                var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
                result.placeholder = curryRight.placeholder;
                return result
            }

            function debounce(func, wait, options) {
                var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0,
                    leading = false,
                    maxing = false,
                    trailing = true;
                if ("function" != typeof func) {
                    throw new TypeError(FUNC_ERROR_TEXT)
                }
                wait = toNumber(wait) || 0;
                if (isObject(options)) {
                    leading = !!options.leading;
                    maxing = "maxWait" in options;
                    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
                    trailing = "trailing" in options ? !!options.trailing : trailing
                }

                function invokeFunc(time) {
                    var args = lastArgs,
                        thisArg = lastThis;
                    lastArgs = lastThis = undefined;
                    lastInvokeTime = time;
                    result = func.apply(thisArg, args);
                    return result
                }

                function leadingEdge(time) {
                    lastInvokeTime = time;
                    timerId = setTimeout(timerExpired, wait);
                    return leading ? invokeFunc(time) : result
                }

                function remainingWait(time) {
                    var timeSinceLastCall = time - lastCallTime,
                        timeSinceLastInvoke = time - lastInvokeTime,
                        timeWaiting = wait - timeSinceLastCall;
                    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting
                }

                function shouldInvoke(time) {
                    var timeSinceLastCall = time - lastCallTime,
                        timeSinceLastInvoke = time - lastInvokeTime;
                    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait
                }

                function timerExpired() {
                    var time = now();
                    if (shouldInvoke(time)) {
                        return trailingEdge(time)
                    }
                    timerId = setTimeout(timerExpired, remainingWait(time))
                }

                function trailingEdge(time) {
                    timerId = undefined;
                    if (trailing && lastArgs) {
                        return invokeFunc(time)
                    }
                    lastArgs = lastThis = undefined;
                    return result
                }

                function cancel() {
                    if (timerId !== undefined) {
                        clearTimeout(timerId)
                    }
                    lastInvokeTime = 0;
                    lastArgs = lastCallTime = lastThis = timerId = undefined
                }

                function flush() {
                    return timerId === undefined ? result : trailingEdge(now())
                }

                function debounced() {
                    var time = now(),
                        isInvoking = shouldInvoke(time);
                    lastArgs = arguments;
                    lastThis = this;
                    lastCallTime = time;
                    if (isInvoking) {
                        if (timerId === undefined) {
                            return leadingEdge(lastCallTime)
                        }
                        if (maxing) {
                            timerId = setTimeout(timerExpired, wait);
                            return invokeFunc(lastCallTime)
                        }
                    }
                    if (timerId === undefined) {
                        timerId = setTimeout(timerExpired, wait)
                    }
                    return result
                }
                debounced.cancel = cancel;
                debounced.flush = flush;
                return debounced
            }
            var defer = baseRest(function(func, args) {
                    return baseDelay(func, 1, args)
                }),
                delay = baseRest(function(func, wait, args) {
                    return baseDelay(func, toNumber(wait) || 0, args)
                });

            function flip(func) {
                return createWrap(func, WRAP_FLIP_FLAG)
            }

            function memoize(func, resolver) {
                if ("function" != typeof func || null != resolver && "function" != typeof resolver) {
                    throw new TypeError(FUNC_ERROR_TEXT)
                }
                var memoized = function() {
                    var args = arguments,
                        key = resolver ? resolver.apply(this, args) : args[0],
                        cache = memoized.cache;
                    if (cache.has(key)) {
                        return cache.get(key)
                    }
                    var result = func.apply(this, args);
                    memoized.cache = cache.set(key, result) || cache;
                    return result
                };
                memoized.cache = new(memoize.Cache || MapCache);
                return memoized
            }
            memoize.Cache = MapCache;

            function negate(predicate) {
                if ("function" != typeof predicate) {
                    throw new TypeError(FUNC_ERROR_TEXT)
                }
                return function() {
                    var args = arguments;
                    switch (args.length) {
                        case 0:
                            return !predicate.call(this);
                        case 1:
                            return !predicate.call(this, args[0]);
                        case 2:
                            return !predicate.call(this, args[0], args[1]);
                        case 3:
                            return !predicate.call(this, args[0], args[1], args[2])
                    }
                    return !predicate.apply(this, args)
                }
            }

            function once(func) {
                return before(2, func)
            }
            var overArgs = castRest(function(func, transforms) {
                    transforms = 1 == transforms.length && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
                    var funcsLength = transforms.length;
                    return baseRest(function(args) {
                        var index = -1,
                            length = nativeMin(args.length, funcsLength);
                        while (++index < length) {
                            args[index] = transforms[index].call(this, args[index])
                        }
                        return apply(func, this, args)
                    })
                }),
                partial = baseRest(function(func, partials) {
                    var holders = replaceHolders(partials, getHolder(partial));
                    return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders)
                }),
                partialRight = baseRest(function(func, partials) {
                    var holders = replaceHolders(partials, getHolder(partialRight));
                    return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders)
                }),
                rearg = flatRest(function(func, indexes) {
                    return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes)
                });

            function rest(func, start) {
                if ("function" != typeof func) {
                    throw new TypeError(FUNC_ERROR_TEXT)
                }
                start = start === undefined ? start : toInteger(start);
                return baseRest(func, start)
            }

            function spread(func, start) {
                if ("function" != typeof func) {
                    throw new TypeError(FUNC_ERROR_TEXT)
                }
                start = null == start ? 0 : nativeMax(toInteger(start), 0);
                return baseRest(function(args) {
                    var array = args[start],
                        otherArgs = castSlice(args, 0, start);
                    if (array) {
                        arrayPush(otherArgs, array)
                    }
                    return apply(func, this, otherArgs)
                })
            }

            function throttle(func, wait, options) {
                var leading = true,
                    trailing = true;
                if ("function" != typeof func) {
                    throw new TypeError(FUNC_ERROR_TEXT)
                }
                if (isObject(options)) {
                    leading = "leading" in options ? !!options.leading : leading;
                    trailing = "trailing" in options ? !!options.trailing : trailing
                }
                return debounce(func, wait, {
                    leading,
                    maxWait: wait,
                    trailing
                })
            }

            function unary(func) {
                return ary(func, 1)
            }

            function wrap(value, wrapper) {
                return partial(castFunction(wrapper), value)
            }

            function castArray() {
                if (!arguments.length) {
                    return []
                }
                var value = arguments[0];
                return isArray(value) ? value : [value]
            }

            function clone(value) {
                return baseClone(value, CLONE_SYMBOLS_FLAG)
            }

            function cloneWith(value, customizer) {
                customizer = "function" == typeof customizer ? customizer : undefined;
                return baseClone(value, CLONE_SYMBOLS_FLAG, customizer)
            }

            function cloneDeep(value) {
                return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
            }

            function cloneDeepWith(value, customizer) {
                customizer = "function" == typeof customizer ? customizer : undefined;
                return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer)
            }

            function conformsTo(object, source) {
                return null == source || baseConformsTo(object, source, keys(source))
            }

            function eq(value, other) {
                return value === other || value !== value && other !== other
            }
            var gt = createRelationalOperation(baseGt),
                gte = createRelationalOperation(function(value, other) {
                    return value >= other
                }),
                isArguments = baseIsArguments(function() {
                    return arguments
                }()) ? baseIsArguments : function(value) {
                    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee")
                },
                isArray = Array.isArray,
                isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

            function isArrayLike(value) {
                return null != value && isLength(value.length) && !isFunction(value)
            }

            function isArrayLikeObject(value) {
                return isObjectLike(value) && isArrayLike(value)
            }

            function isBoolean(value) {
                return true === value || false === value || isObjectLike(value) && baseGetTag(value) == boolTag
            }
            var isBuffer = nativeIsBuffer || stubFalse,
                isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

            function isElement(value) {
                return isObjectLike(value) && 1 === value.nodeType && !isPlainObject(value)
            }

            function isEmpty(value) {
                if (null == value) {
                    return true
                }
                if (isArrayLike(value) && (isArray(value) || "string" == typeof value || "function" == typeof value.splice || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
                    return !value.length
                }
                var tag = getTag(value);
                if (tag == mapTag || tag == setTag) {
                    return !value.size
                }
                if (isPrototype(value)) {
                    return !baseKeys(value).length
                }
                for (var key in value) {
                    if (hasOwnProperty.call(value, key)) {
                        return false
                    }
                }
                return true
            }

            function isEqual(value, other) {
                return baseIsEqual(value, other)
            }

            function isEqualWith(value, other, customizer) {
                customizer = "function" == typeof customizer ? customizer : undefined;
                var result = customizer ? customizer(value, other) : undefined;
                return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result
            }

            function isError(value) {
                if (!isObjectLike(value)) {
                    return false
                }
                var tag = baseGetTag(value);
                return tag == errorTag || tag == domExcTag || "string" == typeof value.message && "string" == typeof value.name && !isPlainObject(value)
            }

            function isFinite(value) {
                return "number" == typeof value && nativeIsFinite(value)
            }

            function isFunction(value) {
                if (!isObject(value)) {
                    return false
                }
                var tag = baseGetTag(value);
                return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
            }

            function isInteger(value) {
                return "number" == typeof value && value == toInteger(value)
            }

            function isLength(value) {
                return "number" == typeof value && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
            }

            function isObject(value) {
                var type = typeof value;
                return null != value && ("object" == type || "function" == type)
            }

            function isObjectLike(value) {
                return null != value && "object" == typeof value
            }
            var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

            function isMatch(object, source) {
                return object === source || baseIsMatch(object, source, getMatchData(source))
            }

            function isMatchWith(object, source, customizer) {
                customizer = "function" == typeof customizer ? customizer : undefined;
                return baseIsMatch(object, source, getMatchData(source), customizer)
            }

            function isNaN(value) {
                return isNumber(value) && value != +value
            }

            function isNative(value) {
                if (isMaskable(value)) {
                    throw new Error(CORE_ERROR_TEXT)
                }
                return baseIsNative(value)
            }

            function isNull(value) {
                return null === value
            }

            function isNil(value) {
                return null == value
            }

            function isNumber(value) {
                return "number" == typeof value || isObjectLike(value) && baseGetTag(value) == numberTag
            }

            function isPlainObject(value) {
                if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
                    return false
                }
                var proto = getPrototype(value);
                if (null === proto) {
                    return true
                }
                var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
                return "function" == typeof Ctor && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString
            }
            var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

            function isSafeInteger(value) {
                return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER
            }
            var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

            function isString(value) {
                return "string" == typeof value || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag
            }

            function isSymbol(value) {
                return "symbol" == typeof value || isObjectLike(value) && baseGetTag(value) == symbolTag
            }
            var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

            function isUndefined(value) {
                return value === undefined
            }

            function isWeakMap(value) {
                return isObjectLike(value) && getTag(value) == weakMapTag
            }

            function isWeakSet(value) {
                return isObjectLike(value) && baseGetTag(value) == weakSetTag
            }
            var lt = createRelationalOperation(baseLt),
                lte = createRelationalOperation(function(value, other) {
                    return value <= other
                });

            function toArray(value) {
                if (!value) {
                    return []
                }
                if (isArrayLike(value)) {
                    return isString(value) ? stringToArray(value) : copyArray(value)
                }
                if (symIterator && value[symIterator]) {
                    return iteratorToArray(value[symIterator]())
                }
                var tag = getTag(value),
                    func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
                return func(value)
            }

            function toFinite(value) {
                if (!value) {
                    return 0 === value ? value : 0
                }
                value = toNumber(value);
                if (value === INFINITY || value === -INFINITY) {
                    var sign = value < 0 ? -1 : 1;
                    return sign * MAX_INTEGER
                }
                return value === value ? value : 0
            }

            function toInteger(value) {
                var result = toFinite(value),
                    remainder = result % 1;
                return result === result ? remainder ? result - remainder : result : 0
            }

            function toLength(value) {
                return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0
            }

            function toNumber(value) {
                if ("number" == typeof value) {
                    return value
                }
                if (isSymbol(value)) {
                    return NAN
                }
                if (isObject(value)) {
                    var other = "function" == typeof value.valueOf ? value.valueOf() : value;
                    value = isObject(other) ? other + "" : other
                }
                if ("string" != typeof value) {
                    return 0 === value ? value : +value
                }
                value = value.replace(reTrim, "");
                var isBinary = reIsBinary.test(value);
                return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value
            }

            function toPlainObject(value) {
                return copyObject(value, keysIn(value))
            }

            function toSafeInteger(value) {
                return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : 0 === value ? value : 0
            }

            function toString(value) {
                return null == value ? "" : baseToString(value)
            }
            var assign = createAssigner(function(object, source) {
                    if (isPrototype(source) || isArrayLike(source)) {
                        copyObject(source, keys(source), object);
                        return
                    }
                    for (var key in source) {
                        if (hasOwnProperty.call(source, key)) {
                            assignValue(object, key, source[key])
                        }
                    }
                }),
                assignIn = createAssigner(function(object, source) {
                    copyObject(source, keysIn(source), object)
                }),
                assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
                    copyObject(source, keysIn(source), object, customizer)
                }),
                assignWith = createAssigner(function(object, source, srcIndex, customizer) {
                    copyObject(source, keys(source), object, customizer)
                }),
                at = flatRest(baseAt);

            function create(prototype, properties) {
                var result = baseCreate(prototype);
                return null == properties ? result : baseAssign(result, properties)
            }
            var defaults = baseRest(function(object, sources) {
                    object = Object(object);
                    var index = -1,
                        length = sources.length,
                        guard = length > 2 ? sources[2] : undefined;
                    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                        length = 1
                    }
                    while (++index < length) {
                        var source = sources[index],
                            props = keysIn(source),
                            propsIndex = -1,
                            propsLength = props.length;
                        while (++propsIndex < propsLength) {
                            var key = props[propsIndex],
                                value = object[key];
                            if (value === undefined || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                                object[key] = source[key]
                            }
                        }
                    }
                    return object
                }),
                defaultsDeep = baseRest(function(args) {
                    args.push(undefined, customDefaultsMerge);
                    return apply(mergeWith, undefined, args)
                });

            function findKey(object, predicate) {
                return baseFindKey(object, getIteratee(predicate, 3), baseForOwn)
            }

            function findLastKey(object, predicate) {
                return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight)
            }

            function forIn(object, iteratee) {
                return null == object ? object : baseFor(object, getIteratee(iteratee, 3), keysIn)
            }

            function forInRight(object, iteratee) {
                return null == object ? object : baseForRight(object, getIteratee(iteratee, 3), keysIn)
            }

            function forOwn(object, iteratee) {
                return object && baseForOwn(object, getIteratee(iteratee, 3))
            }

            function forOwnRight(object, iteratee) {
                return object && baseForOwnRight(object, getIteratee(iteratee, 3))
            }

            function functions(object) {
                return null == object ? [] : baseFunctions(object, keys(object))
            }

            function functionsIn(object) {
                return null == object ? [] : baseFunctions(object, keysIn(object))
            }

            function get(object, path, defaultValue) {
                var result = null == object ? undefined : baseGet(object, path);
                return result === undefined ? defaultValue : result
            }

            function has(object, path) {
                return null != object && hasPath(object, path, baseHas)
            }

            function hasIn(object, path) {
                return null != object && hasPath(object, path, baseHasIn)
            }
            var invert = createInverter(function(result, value, key) {
                    if (null != value && "function" != typeof value.toString) {
                        value = nativeObjectToString.call(value)
                    }
                    result[value] = key
                }, constant(identity)),
                invertBy = createInverter(function(result, value, key) {
                    if (null != value && "function" != typeof value.toString) {
                        value = nativeObjectToString.call(value)
                    }
                    if (hasOwnProperty.call(result, value)) {
                        result[value].push(key)
                    } else {
                        result[value] = [key]
                    }
                }, getIteratee),
                invoke = baseRest(baseInvoke);

            function keys(object) {
                return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object)
            }

            function keysIn(object) {
                return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object)
            }

            function mapKeys(object, iteratee) {
                var result = {};
                iteratee = getIteratee(iteratee, 3);
                baseForOwn(object, function(value, key, object) {
                    baseAssignValue(result, iteratee(value, key, object), value)
                });
                return result
            }

            function mapValues(object, iteratee) {
                var result = {};
                iteratee = getIteratee(iteratee, 3);
                baseForOwn(object, function(value, key, object) {
                    baseAssignValue(result, key, iteratee(value, key, object))
                });
                return result
            }
            var merge = createAssigner(function(object, source, srcIndex) {
                    baseMerge(object, source, srcIndex)
                }),
                mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
                    baseMerge(object, source, srcIndex, customizer)
                }),
                omit = flatRest(function(object, paths) {
                    var result = {};
                    if (null == object) {
                        return result
                    }
                    var isDeep = false;
                    paths = arrayMap(paths, function(path) {
                        path = castPath(path, object);
                        isDeep || (isDeep = path.length > 1);
                        return path
                    });
                    copyObject(object, getAllKeysIn(object), result);
                    if (isDeep) {
                        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone)
                    }
                    var length = paths.length;
                    while (length--) {
                        baseUnset(result, paths[length])
                    }
                    return result
                });

            function omitBy(object, predicate) {
                return pickBy(object, negate(getIteratee(predicate)))
            }
            var pick = flatRest(function(object, paths) {
                return null == object ? {} : basePick(object, paths)
            });

            function pickBy(object, predicate) {
                if (null == object) {
                    return {}
                }
                var props = arrayMap(getAllKeysIn(object), function(prop) {
                    return [prop]
                });
                predicate = getIteratee(predicate);
                return basePickBy(object, props, function(value, path) {
                    return predicate(value, path[0])
                })
            }

            function result(object, path, defaultValue) {
                path = castPath(path, object);
                var index = -1,
                    length = path.length;
                if (!length) {
                    length = 1;
                    object = undefined
                }
                while (++index < length) {
                    var value = null == object ? undefined : object[toKey(path[index])];
                    if (value === undefined) {
                        index = length;
                        value = defaultValue
                    }
                    object = isFunction(value) ? value.call(object) : value
                }
                return object
            }

            function set(object, path, value) {
                return null == object ? object : baseSet(object, path, value)
            }

            function setWith(object, path, value, customizer) {
                customizer = "function" == typeof customizer ? customizer : undefined;
                return null == object ? object : baseSet(object, path, value, customizer)
            }
            var toPairs = createToPairs(keys),
                toPairsIn = createToPairs(keysIn);

            function transform(object, iteratee, accumulator) {
                var isArr = isArray(object),
                    isArrLike = isArr || isBuffer(object) || isTypedArray(object);
                iteratee = getIteratee(iteratee, 4);
                if (null == accumulator) {
                    var Ctor = object && object.constructor;
                    if (isArrLike) {
                        accumulator = isArr ? new Ctor : []
                    } else if (isObject(object)) {
                        accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {}
                    } else {
                        accumulator = {}
                    }
                }
                (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
                    return iteratee(accumulator, value, index, object)
                });
                return accumulator
            }

            function unset(object, path) {
                return null == object ? true : baseUnset(object, path)
            }

            function update(object, path, updater) {
                return null == object ? object : baseUpdate(object, path, castFunction(updater))
            }

            function updateWith(object, path, updater, customizer) {
                customizer = "function" == typeof customizer ? customizer : undefined;
                return null == object ? object : baseUpdate(object, path, castFunction(updater), customizer)
            }

            function values(object) {
                return null == object ? [] : baseValues(object, keys(object))
            }

            function valuesIn(object) {
                return null == object ? [] : baseValues(object, keysIn(object))
            }

            function clamp(number, lower, upper) {
                if (upper === undefined) {
                    upper = lower;
                    lower = undefined
                }
                if (upper !== undefined) {
                    upper = toNumber(upper);
                    upper = upper === upper ? upper : 0
                }
                if (lower !== undefined) {
                    lower = toNumber(lower);
                    lower = lower === lower ? lower : 0
                }
                return baseClamp(toNumber(number), lower, upper)
            }

            function inRange(number, start, end) {
                start = toFinite(start);
                if (end === undefined) {
                    end = start;
                    start = 0
                } else {
                    end = toFinite(end)
                }
                number = toNumber(number);
                return baseInRange(number, start, end)
            }

            function random(lower, upper, floating) {
                if (floating && "boolean" != typeof floating && isIterateeCall(lower, upper, floating)) {
                    upper = floating = undefined
                }
                if (floating === undefined) {
                    if ("boolean" == typeof upper) {
                        floating = upper;
                        upper = undefined
                    } else if ("boolean" == typeof lower) {
                        floating = lower;
                        lower = undefined
                    }
                }
                if (lower === undefined && upper === undefined) {
                    lower = 0;
                    upper = 1
                } else {
                    lower = toFinite(lower);
                    if (upper === undefined) {
                        upper = lower;
                        lower = 0
                    } else {
                        upper = toFinite(upper)
                    }
                }
                if (lower > upper) {
                    var temp = lower;
                    lower = upper;
                    upper = temp
                }
                if (floating || lower % 1 || upper % 1) {
                    var rand = nativeRandom();
                    return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper)
                }
                return baseRandom(lower, upper)
            }
            var camelCase = createCompounder(function(result, word, index) {
                word = word.toLowerCase();
                return result + (index ? capitalize(word) : word)
            });

            function capitalize(string) {
                return upperFirst(toString(string).toLowerCase())
            }

            function deburr(string) {
                string = toString(string);
                return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "")
            }

            function endsWith(string, target, position) {
                string = toString(string);
                target = baseToString(target);
                var length = string.length;
                position = position === undefined ? length : baseClamp(toInteger(position), 0, length);
                var end = position;
                position -= target.length;
                return position >= 0 && string.slice(position, end) == target
            }

            function escape(string) {
                string = toString(string);
                return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string
            }

            function escapeRegExp(string) {
                string = toString(string);
                return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string
            }
            var kebabCase = createCompounder(function(result, word, index) {
                    return result + (index ? "-" : "") + word.toLowerCase()
                }),
                lowerCase = createCompounder(function(result, word, index) {
                    return result + (index ? " " : "") + word.toLowerCase()
                }),
                lowerFirst = createCaseFirst("toLowerCase");

            function pad(string, length, chars) {
                string = toString(string);
                length = toInteger(length);
                var strLength = length ? stringSize(string) : 0;
                if (!length || strLength >= length) {
                    return string
                }
                var mid = (length - strLength) / 2;
                return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars)
            }

            function padEnd(string, length, chars) {
                string = toString(string);
                length = toInteger(length);
                var strLength = length ? stringSize(string) : 0;
                return length && strLength < length ? string + createPadding(length - strLength, chars) : string
            }

            function padStart(string, length, chars) {
                string = toString(string);
                length = toInteger(length);
                var strLength = length ? stringSize(string) : 0;
                return length && strLength < length ? createPadding(length - strLength, chars) + string : string
            }

            function parseInt(string, radix, guard) {
                if (guard || null == radix) {
                    radix = 0
                } else if (radix) {
                    radix = +radix
                }
                return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0)
            }

            function repeat(string, n, guard) {
                if (guard ? isIterateeCall(string, n, guard) : n === undefined) {
                    n = 1
                } else {
                    n = toInteger(n)
                }
                return baseRepeat(toString(string), n)
            }

            function replace() {
                var args = arguments,
                    string = toString(args[0]);
                return args.length < 3 ? string : string.replace(args[1], args[2])
            }
            var snakeCase = createCompounder(function(result, word, index) {
                return result + (index ? "_" : "") + word.toLowerCase()
            });

            function split(string, separator, limit) {
                if (limit && "number" != typeof limit && isIterateeCall(string, separator, limit)) {
                    separator = limit = undefined
                }
                limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
                if (!limit) {
                    return []
                }
                string = toString(string);
                if (string && ("string" == typeof separator || null != separator && !isRegExp(separator))) {
                    separator = baseToString(separator);
                    if (!separator && hasUnicode(string)) {
                        return castSlice(stringToArray(string), 0, limit)
                    }
                }
                return string.split(separator, limit)
            }
            var startCase = createCompounder(function(result, word, index) {
                return result + (index ? " " : "") + upperFirst(word)
            });

            function startsWith(string, target, position) {
                string = toString(string);
                position = null == position ? 0 : baseClamp(toInteger(position), 0, string.length);
                target = baseToString(target);
                return string.slice(position, position + target.length) == target
            }

            function template(string, options, guard) {
                var settings = lodash.templateSettings;
                if (guard && isIterateeCall(string, options, guard)) {
                    options = undefined
                }
                string = toString(string);
                options = assignInWith({}, options, settings, customDefaultsAssignIn);
                var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
                    importsKeys = keys(imports),
                    importsValues = baseValues(imports, importsKeys),
                    isEscaping, isEvaluating, index = 0,
                    interpolate = options.interpolate || reNoMatch,
                    source = "__p += '",
                    reDelimiters = RegExp((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g"),
                    sourceURL = "//# sourceURL=" + ("sourceURL" in options ? options.sourceURL : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
                string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
                    interpolateValue || (interpolateValue = esTemplateValue);
                    source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
                    if (escapeValue) {
                        isEscaping = true;
                        source += "' +\n__e(" + escapeValue + ") +\n'"
                    }
                    if (evaluateValue) {
                        isEvaluating = true;
                        source += "';\n" + evaluateValue + ";\n__p += '"
                    }
                    if (interpolateValue) {
                        source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'"
                    }
                    index = offset + match.length;
                    return match
                });
                source += "';\n";
                var variable = options.variable;
                if (!variable) {
                    source = "with (obj) {\n" + source + "\n}\n"
                }
                source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
                source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\n" + "function print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
                var result = attempt(function() {
                    return Function(importsKeys, sourceURL + "return " + source).apply(undefined, importsValues)
                });
                result.source = source;
                if (isError(result)) {
                    throw result
                }
                return result
            }

            function toLower(value) {
                return toString(value).toLowerCase()
            }

            function toUpper(value) {
                return toString(value).toUpperCase()
            }

            function trim(string, chars, guard) {
                string = toString(string);
                if (string && (guard || chars === undefined)) {
                    return string.replace(reTrim, "")
                }
                if (!string || !(chars = baseToString(chars))) {
                    return string
                }
                var strSymbols = stringToArray(string),
                    chrSymbols = stringToArray(chars),
                    start = charsStartIndex(strSymbols, chrSymbols),
                    end = charsEndIndex(strSymbols, chrSymbols) + 1;
                return castSlice(strSymbols, start, end).join("")
            }

            function trimEnd(string, chars, guard) {
                string = toString(string);
                if (string && (guard || chars === undefined)) {
                    return string.replace(reTrimEnd, "")
                }
                if (!string || !(chars = baseToString(chars))) {
                    return string
                }
                var strSymbols = stringToArray(string),
                    end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
                return castSlice(strSymbols, 0, end).join("")
            }

            function trimStart(string, chars, guard) {
                string = toString(string);
                if (string && (guard || chars === undefined)) {
                    return string.replace(reTrimStart, "")
                }
                if (!string || !(chars = baseToString(chars))) {
                    return string
                }
                var strSymbols = stringToArray(string),
                    start = charsStartIndex(strSymbols, stringToArray(chars));
                return castSlice(strSymbols, start).join("")
            }

            function truncate(string, options) {
                var length = DEFAULT_TRUNC_LENGTH,
                    omission = DEFAULT_TRUNC_OMISSION;
                if (isObject(options)) {
                    var separator = "separator" in options ? options.separator : separator;
                    length = "length" in options ? toInteger(options.length) : length;
                    omission = "omission" in options ? baseToString(options.omission) : omission
                }
                string = toString(string);
                var strLength = string.length;
                if (hasUnicode(string)) {
                    var strSymbols = stringToArray(string);
                    strLength = strSymbols.length
                }
                if (length >= strLength) {
                    return string
                }
                var end = length - stringSize(omission);
                if (end < 1) {
                    return omission
                }
                var result = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
                if (separator === undefined) {
                    return result + omission
                }
                if (strSymbols) {
                    end += result.length - end
                }
                if (isRegExp(separator)) {
                    if (string.slice(end).search(separator)) {
                        var match, substring = result;
                        if (!separator.global) {
                            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + "g")
                        }
                        separator.lastIndex = 0;
                        while (match = separator.exec(substring)) {
                            var newEnd = match.index
                        }
                        result = result.slice(0, newEnd === undefined ? end : newEnd)
                    }
                } else if (string.indexOf(baseToString(separator), end) != end) {
                    var index = result.lastIndexOf(separator);
                    if (index > -1) {
                        result = result.slice(0, index)
                    }
                }
                return result + omission
            }

            function unescape(string) {
                string = toString(string);
                return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string
            }
            var upperCase = createCompounder(function(result, word, index) {
                    return result + (index ? " " : "") + word.toUpperCase()
                }),
                upperFirst = createCaseFirst("toUpperCase");

            function words(string, pattern, guard) {
                string = toString(string);
                pattern = guard ? undefined : pattern;
                if (pattern === undefined) {
                    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string)
                }
                return string.match(pattern) || []
            }
            var attempt = baseRest(function(func, args) {
                    try {
                        return apply(func, undefined, args)
                    } catch (e) {
                        return isError(e) ? e : new Error(e)
                    }
                }),
                bindAll = flatRest(function(object, methodNames) {
                    arrayEach(methodNames, function(key) {
                        key = toKey(key);
                        baseAssignValue(object, key, bind(object[key], object))
                    });
                    return object
                });

            function cond(pairs) {
                var length = null == pairs ? 0 : pairs.length,
                    toIteratee = getIteratee();
                pairs = !length ? [] : arrayMap(pairs, function(pair) {
                    if ("function" != typeof pair[1]) {
                        throw new TypeError(FUNC_ERROR_TEXT)
                    }
                    return [toIteratee(pair[0]), pair[1]]
                });
                return baseRest(function(args) {
                    var index = -1;
                    while (++index < length) {
                        var pair = pairs[index];
                        if (apply(pair[0], this, args)) {
                            return apply(pair[1], this, args)
                        }
                    }
                })
            }

            function conforms(source) {
                return baseConforms(baseClone(source, CLONE_DEEP_FLAG))
            }

            function constant(value) {
                return function() {
                    return value
                }
            }

            function defaultTo(value, defaultValue) {
                return null == value || value !== value ? defaultValue : value
            }
            var flow = createFlow(),
                flowRight = createFlow(true);

            function identity(value) {
                return value
            }

            function iteratee(func) {
                return baseIteratee("function" == typeof func ? func : baseClone(func, CLONE_DEEP_FLAG))
            }

            function matches(source) {
                return baseMatches(baseClone(source, CLONE_DEEP_FLAG))
            }

            function matchesProperty(path, srcValue) {
                return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG))
            }
            var method = baseRest(function(path, args) {
                    return function(object) {
                        return baseInvoke(object, path, args)
                    }
                }),
                methodOf = baseRest(function(object, args) {
                    return function(path) {
                        return baseInvoke(object, path, args)
                    }
                });

            function mixin(object, source, options) {
                var props = keys(source),
                    methodNames = baseFunctions(source, props);
                if (null == options && !(isObject(source) && (methodNames.length || !props.length))) {
                    options = source;
                    source = object;
                    object = this;
                    methodNames = baseFunctions(source, keys(source))
                }
                var chain = !(isObject(options) && "chain" in options) || !!options.chain,
                    isFunc = isFunction(object);
                arrayEach(methodNames, function(methodName) {
                    var func = source[methodName];
                    object[methodName] = func;
                    if (isFunc) {
                        object.prototype[methodName] = function() {
                            var chainAll = this.__chain__;
                            if (chain || chainAll) {
                                var result = object(this.__wrapped__),
                                    actions = result.__actions__ = copyArray(this.__actions__);
                                actions.push({
                                    func,
                                    args: arguments,
                                    thisArg: object
                                });
                                result.__chain__ = chainAll;
                                return result
                            }
                            return func.apply(object, arrayPush([this.value()], arguments))
                        }
                    }
                });
                return object
            }

            function noConflict() {
                if (root._ === this) {
                    root._ = oldDash
                }
                return this
            }

            function noop() {}

            function nthArg(n) {
                n = toInteger(n);
                return baseRest(function(args) {
                    return baseNth(args, n)
                })
            }
            var over = createOver(arrayMap),
                overEvery = createOver(arrayEvery),
                overSome = createOver(arraySome);

            function property(path) {
                return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path)
            }

            function propertyOf(object) {
                return function(path) {
                    return null == object ? undefined : baseGet(object, path)
                }
            }
            var range = createRange(),
                rangeRight = createRange(true);

            function stubArray() {
                return []
            }

            function stubFalse() {
                return false
            }

            function stubObject() {
                return {}
            }

            function stubString() {
                return ""
            }

            function stubTrue() {
                return true
            }

            function times(n, iteratee) {
                n = toInteger(n);
                if (n < 1 || n > MAX_SAFE_INTEGER) {
                    return []
                }
                var index = MAX_ARRAY_LENGTH,
                    length = nativeMin(n, MAX_ARRAY_LENGTH);
                iteratee = getIteratee(iteratee);
                n -= MAX_ARRAY_LENGTH;
                var result = baseTimes(length, iteratee);
                while (++index < n) {
                    iteratee(index)
                }
                return result
            }

            function toPath(value) {
                if (isArray(value)) {
                    return arrayMap(value, toKey)
                }
                return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)))
            }

            function uniqueId(prefix) {
                var id = ++idCounter;
                return toString(prefix) + id
            }
            var add = createMathOperation(function(augend, addend) {
                    return augend + addend
                }, 0),
                ceil = createRound("ceil"),
                divide = createMathOperation(function(dividend, divisor) {
                    return dividend / divisor
                }, 1),
                floor = createRound("floor");

            function max(array) {
                return array && array.length ? baseExtremum(array, identity, baseGt) : undefined
            }

            function maxBy(array, iteratee) {
                return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseGt) : undefined
            }

            function mean(array) {
                return baseMean(array, identity)
            }

            function meanBy(array, iteratee) {
                return baseMean(array, getIteratee(iteratee, 2))
            }

            function min(array) {
                return array && array.length ? baseExtremum(array, identity, baseLt) : undefined
            }

            function minBy(array, iteratee) {
                return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseLt) : undefined
            }
            var multiply = createMathOperation(function(multiplier, multiplicand) {
                    return multiplier * multiplicand
                }, 1),
                round = createRound("round"),
                subtract = createMathOperation(function(minuend, subtrahend) {
                    return minuend - subtrahend
                }, 0);

            function sum(array) {
                return array && array.length ? baseSum(array, identity) : 0
            }

            function sumBy(array, iteratee) {
                return array && array.length ? baseSum(array, getIteratee(iteratee, 2)) : 0
            }
            lodash.after = after;
            lodash.ary = ary;
            lodash.assign = assign;
            lodash.assignIn = assignIn;
            lodash.assignInWith = assignInWith;
            lodash.assignWith = assignWith;
            lodash.at = at;
            lodash.before = before;
            lodash.bind = bind;
            lodash.bindAll = bindAll;
            lodash.bindKey = bindKey;
            lodash.castArray = castArray;
            lodash.chain = chain;
            lodash.chunk = chunk;
            lodash.compact = compact;
            lodash.concat = concat;
            lodash.cond = cond;
            lodash.conforms = conforms;
            lodash.constant = constant;
            lodash.countBy = countBy;
            lodash.create = create;
            lodash.curry = curry;
            lodash.curryRight = curryRight;
            lodash.debounce = debounce;
            lodash.defaults = defaults;
            lodash.defaultsDeep = defaultsDeep;
            lodash.defer = defer;
            lodash.delay = delay;
            lodash.difference = difference;
            lodash.differenceBy = differenceBy;
            lodash.differenceWith = differenceWith;
            lodash.drop = drop;
            lodash.dropRight = dropRight;
            lodash.dropRightWhile = dropRightWhile;
            lodash.dropWhile = dropWhile;
            lodash.fill = fill;
            lodash.filter = filter;
            lodash.flatMap = flatMap;
            lodash.flatMapDeep = flatMapDeep;
            lodash.flatMapDepth = flatMapDepth;
            lodash.flatten = flatten;
            lodash.flattenDeep = flattenDeep;
            lodash.flattenDepth = flattenDepth;
            lodash.flip = flip;
            lodash.flow = flow;
            lodash.flowRight = flowRight;
            lodash.fromPairs = fromPairs;
            lodash.functions = functions;
            lodash.functionsIn = functionsIn;
            lodash.groupBy = groupBy;
            lodash.initial = initial;
            lodash.intersection = intersection;
            lodash.intersectionBy = intersectionBy;
            lodash.intersectionWith = intersectionWith;
            lodash.invert = invert;
            lodash.invertBy = invertBy;
            lodash.invokeMap = invokeMap;
            lodash.iteratee = iteratee;
            lodash.keyBy = keyBy;
            lodash.keys = keys;
            lodash.keysIn = keysIn;
            lodash.map = map;
            lodash.mapKeys = mapKeys;
            lodash.mapValues = mapValues;
            lodash.matches = matches;
            lodash.matchesProperty = matchesProperty;
            lodash.memoize = memoize;
            lodash.merge = merge;
            lodash.mergeWith = mergeWith;
            lodash.method = method;
            lodash.methodOf = methodOf;
            lodash.mixin = mixin;
            lodash.negate = negate;
            lodash.nthArg = nthArg;
            lodash.omit = omit;
            lodash.omitBy = omitBy;
            lodash.once = once;
            lodash.orderBy = orderBy;
            lodash.over = over;
            lodash.overArgs = overArgs;
            lodash.overEvery = overEvery;
            lodash.overSome = overSome;
            lodash.partial = partial;
            lodash.partialRight = partialRight;
            lodash.partition = partition;
            lodash.pick = pick;
            lodash.pickBy = pickBy;
            lodash.property = property;
            lodash.propertyOf = propertyOf;
            lodash.pull = pull;
            lodash.pullAll = pullAll;
            lodash.pullAllBy = pullAllBy;
            lodash.pullAllWith = pullAllWith;
            lodash.pullAt = pullAt;
            lodash.range = range;
            lodash.rangeRight = rangeRight;
            lodash.rearg = rearg;
            lodash.reject = reject;
            lodash.remove = remove;
            lodash.rest = rest;
            lodash.reverse = reverse;
            lodash.sampleSize = sampleSize;
            lodash.set = set;
            lodash.setWith = setWith;
            lodash.shuffle = shuffle;
            lodash.slice = slice;
            lodash.sortBy = sortBy;
            lodash.sortedUniq = sortedUniq;
            lodash.sortedUniqBy = sortedUniqBy;
            lodash.split = split;
            lodash.spread = spread;
            lodash.tail = tail;
            lodash.take = take;
            lodash.takeRight = takeRight;
            lodash.takeRightWhile = takeRightWhile;
            lodash.takeWhile = takeWhile;
            lodash.tap = tap;
            lodash.throttle = throttle;
            lodash.thru = thru;
            lodash.toArray = toArray;
            lodash.toPairs = toPairs;
            lodash.toPairsIn = toPairsIn;
            lodash.toPath = toPath;
            lodash.toPlainObject = toPlainObject;
            lodash.transform = transform;
            lodash.unary = unary;
            lodash.union = union;
            lodash.unionBy = unionBy;
            lodash.unionWith = unionWith;
            lodash.uniq = uniq;
            lodash.uniqBy = uniqBy;
            lodash.uniqWith = uniqWith;
            lodash.unset = unset;
            lodash.unzip = unzip;
            lodash.unzipWith = unzipWith;
            lodash.update = update;
            lodash.updateWith = updateWith;
            lodash.values = values;
            lodash.valuesIn = valuesIn;
            lodash.without = without;
            lodash.words = words;
            lodash.wrap = wrap;
            lodash.xor = xor;
            lodash.xorBy = xorBy;
            lodash.xorWith = xorWith;
            lodash.zip = zip;
            lodash.zipObject = zipObject;
            lodash.zipObjectDeep = zipObjectDeep;
            lodash.zipWith = zipWith;
            lodash.entries = toPairs;
            lodash.entriesIn = toPairsIn;
            lodash.extend = assignIn;
            lodash.extendWith = assignInWith;
            mixin(lodash, lodash);
            lodash.add = add;
            lodash.attempt = attempt;
            lodash.camelCase = camelCase;
            lodash.capitalize = capitalize;
            lodash.ceil = ceil;
            lodash.clamp = clamp;
            lodash.clone = clone;
            lodash.cloneDeep = cloneDeep;
            lodash.cloneDeepWith = cloneDeepWith;
            lodash.cloneWith = cloneWith;
            lodash.conformsTo = conformsTo;
            lodash.deburr = deburr;
            lodash.defaultTo = defaultTo;
            lodash.divide = divide;
            lodash.endsWith = endsWith;
            lodash.eq = eq;
            lodash.escape = escape;
            lodash.escapeRegExp = escapeRegExp;
            lodash.every = every;
            lodash.find = find;
            lodash.findIndex = findIndex;
            lodash.findKey = findKey;
            lodash.findLast = findLast;
            lodash.findLastIndex = findLastIndex;
            lodash.findLastKey = findLastKey;
            lodash.floor = floor;
            lodash.forEach = forEach;
            lodash.forEachRight = forEachRight;
            lodash.forIn = forIn;
            lodash.forInRight = forInRight;
            lodash.forOwn = forOwn;
            lodash.forOwnRight = forOwnRight;
            lodash.get = get;
            lodash.gt = gt;
            lodash.gte = gte;
            lodash.has = has;
            lodash.hasIn = hasIn;
            lodash.head = head;
            lodash.identity = identity;
            lodash.includes = includes;
            lodash.indexOf = indexOf;
            lodash.inRange = inRange;
            lodash.invoke = invoke;
            lodash.isArguments = isArguments;
            lodash.isArray = isArray;
            lodash.isArrayBuffer = isArrayBuffer;
            lodash.isArrayLike = isArrayLike;
            lodash.isArrayLikeObject = isArrayLikeObject;
            lodash.isBoolean = isBoolean;
            lodash.isBuffer = isBuffer;
            lodash.isDate = isDate;
            lodash.isElement = isElement;
            lodash.isEmpty = isEmpty;
            lodash.isEqual = isEqual;
            lodash.isEqualWith = isEqualWith;
            lodash.isError = isError;
            lodash.isFinite = isFinite;
            lodash.isFunction = isFunction;
            lodash.isInteger = isInteger;
            lodash.isLength = isLength;
            lodash.isMap = isMap;
            lodash.isMatch = isMatch;
            lodash.isMatchWith = isMatchWith;
            lodash.isNaN = isNaN;
            lodash.isNative = isNative;
            lodash.isNil = isNil;
            lodash.isNull = isNull;
            lodash.isNumber = isNumber;
            lodash.isObject = isObject;
            lodash.isObjectLike = isObjectLike;
            lodash.isPlainObject = isPlainObject;
            lodash.isRegExp = isRegExp;
            lodash.isSafeInteger = isSafeInteger;
            lodash.isSet = isSet;
            lodash.isString = isString;
            lodash.isSymbol = isSymbol;
            lodash.isTypedArray = isTypedArray;
            lodash.isUndefined = isUndefined;
            lodash.isWeakMap = isWeakMap;
            lodash.isWeakSet = isWeakSet;
            lodash.join = join;
            lodash.kebabCase = kebabCase;
            lodash.last = last;
            lodash.lastIndexOf = lastIndexOf;
            lodash.lowerCase = lowerCase;
            lodash.lowerFirst = lowerFirst;
            lodash.lt = lt;
            lodash.lte = lte;
            lodash.max = max;
            lodash.maxBy = maxBy;
            lodash.mean = mean;
            lodash.meanBy = meanBy;
            lodash.min = min;
            lodash.minBy = minBy;
            lodash.stubArray = stubArray;
            lodash.stubFalse = stubFalse;
            lodash.stubObject = stubObject;
            lodash.stubString = stubString;
            lodash.stubTrue = stubTrue;
            lodash.multiply = multiply;
            lodash.nth = nth;
            lodash.noConflict = noConflict;
            lodash.noop = noop;
            lodash.now = now;
            lodash.pad = pad;
            lodash.padEnd = padEnd;
            lodash.padStart = padStart;
            lodash.parseInt = parseInt;
            lodash.random = random;
            lodash.reduce = reduce;
            lodash.reduceRight = reduceRight;
            lodash.repeat = repeat;
            lodash.replace = replace;
            lodash.result = result;
            lodash.round = round;
            lodash.runInContext = runInContext;
            lodash.sample = sample;
            lodash.size = size;
            lodash.snakeCase = snakeCase;
            lodash.some = some;
            lodash.sortedIndex = sortedIndex;
            lodash.sortedIndexBy = sortedIndexBy;
            lodash.sortedIndexOf = sortedIndexOf;
            lodash.sortedLastIndex = sortedLastIndex;
            lodash.sortedLastIndexBy = sortedLastIndexBy;
            lodash.sortedLastIndexOf = sortedLastIndexOf;
            lodash.startCase = startCase;
            lodash.startsWith = startsWith;
            lodash.subtract = subtract;
            lodash.sum = sum;
            lodash.sumBy = sumBy;
            lodash.template = template;
            lodash.times = times;
            lodash.toFinite = toFinite;
            lodash.toInteger = toInteger;
            lodash.toLength = toLength;
            lodash.toLower = toLower;
            lodash.toNumber = toNumber;
            lodash.toSafeInteger = toSafeInteger;
            lodash.toString = toString;
            lodash.toUpper = toUpper;
            lodash.trim = trim;
            lodash.trimEnd = trimEnd;
            lodash.trimStart = trimStart;
            lodash.truncate = truncate;
            lodash.unescape = unescape;
            lodash.uniqueId = uniqueId;
            lodash.upperCase = upperCase;
            lodash.upperFirst = upperFirst;
            lodash.each = forEach;
            lodash.eachRight = forEachRight;
            lodash.first = head;
            mixin(lodash, function() {
                var source = {};
                baseForOwn(lodash, function(func, methodName) {
                    if (!hasOwnProperty.call(lodash.prototype, methodName)) {
                        source[methodName] = func
                    }
                });
                return source
            }(), {
                chain: false
            });
            lodash.VERSION = VERSION;
            arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
                lodash[methodName].placeholder = lodash
            });
            arrayEach(["drop", "take"], function(methodName, index) {
                LazyWrapper.prototype[methodName] = function(n) {
                    n = n === undefined ? 1 : nativeMax(toInteger(n), 0);
                    var result = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
                    if (result.__filtered__) {
                        result.__takeCount__ = nativeMin(n, result.__takeCount__)
                    } else {
                        result.__views__.push({
                            size: nativeMin(n, MAX_ARRAY_LENGTH),
                            type: methodName + (result.__dir__ < 0 ? "Right" : "")
                        })
                    }
                    return result
                };
                LazyWrapper.prototype[methodName + "Right"] = function(n) {
                    return this.reverse()[methodName](n).reverse()
                }
            });
            arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
                var type = index + 1,
                    isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
                LazyWrapper.prototype[methodName] = function(iteratee) {
                    var result = this.clone();
                    result.__iteratees__.push({
                        iteratee: getIteratee(iteratee, 3),
                        type
                    });
                    result.__filtered__ = result.__filtered__ || isFilter;
                    return result
                }
            });
            arrayEach(["head", "last"], function(methodName, index) {
                var takeName = "take" + (index ? "Right" : "");
                LazyWrapper.prototype[methodName] = function() {
                    return this[takeName](1).value()[0]
                }
            });
            arrayEach(["initial", "tail"], function(methodName, index) {
                var dropName = "drop" + (index ? "" : "Right");
                LazyWrapper.prototype[methodName] = function() {
                    return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1)
                }
            });
            LazyWrapper.prototype.compact = function() {
                return this.filter(identity)
            };
            LazyWrapper.prototype.find = function(predicate) {
                return this.filter(predicate).head()
            };
            LazyWrapper.prototype.findLast = function(predicate) {
                return this.reverse().find(predicate)
            };
            LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
                if ("function" == typeof path) {
                    return new LazyWrapper(this)
                }
                return this.map(function(value) {
                    return baseInvoke(value, path, args)
                })
            });
            LazyWrapper.prototype.reject = function(predicate) {
                return this.filter(negate(getIteratee(predicate)))
            };
            LazyWrapper.prototype.slice = function(start, end) {
                start = toInteger(start);
                var result = this;
                if (result.__filtered__ && (start > 0 || end < 0)) {
                    return new LazyWrapper(result)
                }
                if (start < 0) {
                    result = result.takeRight(-start)
                } else if (start) {
                    result = result.drop(start)
                }
                if (end !== undefined) {
                    end = toInteger(end);
                    result = end < 0 ? result.dropRight(-end) : result.take(end - start)
                }
                return result
            };
            LazyWrapper.prototype.takeRightWhile = function(predicate) {
                return this.reverse().takeWhile(predicate).reverse()
            };
            LazyWrapper.prototype.toArray = function() {
                return this.take(MAX_ARRAY_LENGTH)
            };
            baseForOwn(LazyWrapper.prototype, function(func, methodName) {
                var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
                    isTaker = /^(?:head|last)$/.test(methodName),
                    lodashFunc = lodash[isTaker ? "take" + ("last" == methodName ? "Right" : "") : methodName],
                    retUnwrapped = isTaker || /^find/.test(methodName);
                if (!lodashFunc) {
                    return
                }
                lodash.prototype[methodName] = function() {
                    var value = this.__wrapped__,
                        args = isTaker ? [1] : arguments,
                        isLazy = value instanceof LazyWrapper,
                        iteratee = args[0],
                        useLazy = isLazy || isArray(value),
                        interceptor = function(value) {
                            var result = lodashFunc.apply(lodash, arrayPush([value], args));
                            return isTaker && chainAll ? result[0] : result
                        };
                    if (useLazy && checkIteratee && "function" == typeof iteratee && 1 != iteratee.length) {
                        isLazy = useLazy = false
                    }
                    var chainAll = this.__chain__,
                        isHybrid = !!this.__actions__.length,
                        isUnwrapped = retUnwrapped && !chainAll,
                        onlyLazy = isLazy && !isHybrid;
                    if (!retUnwrapped && useLazy) {
                        value = onlyLazy ? value : new LazyWrapper(this);
                        var result = func.apply(value, args);
                        result.__actions__.push({
                            func: thru,
                            args: [interceptor],
                            thisArg: undefined
                        });
                        return new LodashWrapper(result, chainAll)
                    }
                    if (isUnwrapped && onlyLazy) {
                        return func.apply(this, args)
                    }
                    result = this.thru(interceptor);
                    return isUnwrapped ? isTaker ? result.value()[0] : result.value() : result
                }
            });
            arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
                var func = arrayProto[methodName],
                    chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru",
                    retUnwrapped = /^(?:pop|shift)$/.test(methodName);
                lodash.prototype[methodName] = function() {
                    var args = arguments;
                    if (retUnwrapped && !this.__chain__) {
                        var value = this.value();
                        return func.apply(isArray(value) ? value : [], args)
                    }
                    return this[chainName](function(value) {
                        return func.apply(isArray(value) ? value : [], args)
                    })
                }
            });
            baseForOwn(LazyWrapper.prototype, function(func, methodName) {
                var lodashFunc = lodash[methodName];
                if (lodashFunc) {
                    var key = lodashFunc.name + "",
                        names = realNames[key] || (realNames[key] = []);
                    names.push({
                        name: methodName,
                        func: lodashFunc
                    })
                }
            });
            realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
                name: "wrapper",
                func: undefined
            }];
            LazyWrapper.prototype.clone = lazyClone;
            LazyWrapper.prototype.reverse = lazyReverse;
            LazyWrapper.prototype.value = lazyValue;
            lodash.prototype.at = wrapperAt;
            lodash.prototype.chain = wrapperChain;
            lodash.prototype.commit = wrapperCommit;
            lodash.prototype.next = wrapperNext;
            lodash.prototype.plant = wrapperPlant;
            lodash.prototype.reverse = wrapperReverse;
            lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
            lodash.prototype.first = lodash.prototype.head;
            if (symIterator) {
                lodash.prototype[symIterator] = wrapperToIterator
            }
            return lodash
        };
        return runInContext()
    }();

    var keepTrying = function(test, callback, sleep, maxAttempts) {
        if (typeof(sleep) == 'undefined') {
            sleep = 100;
        }
        var totalAttempts = 0;
        var args = Array.prototype.slice.call(arguments, 2);
        var incrementAttempts = function() {
            totalAttempts++;
            if (typeof maxAttempts !== 'undefined') {
                if (totalAttempts > maxAttempts) {
                    clearInterval(timer);
                    console.log('Reached maximum number of attempts.  Going to stop checking.')
                }
            }
        }
        var timer = setInterval(function() {
            try {
                if (test.apply(null, args)) {
                    clearInterval(timer);
                    // console.log('done trying: '+test);
                    callback();
                } else {
                    // console.log('tried: '+test);
                    incrementAttempts();
                }
            } catch (e) {
                console.log('Failure in check: ' + e);
                incrementAttempts();
            }
        }, sleep);
    }
    var when = function(test, run, sleep, maxAttempts) {
        var args = Array.prototype.slice.call(arguments, 2);
        keepTrying(test, function() {
                run.apply(null, args);
            },
            sleep, maxAttempts);
    }




    utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {



        var debugCode = "try{\n    /*Set the debug flag if that is in the query string*/\n    if(utag.data['qp.utagdb']){\n        if(utag.data['qp.utagdb'].match(/1|true/i)){\n            document.cookie='utagdb=true';\n            utag.data['cp.utagdb']='true';\n            utag.cfg.utagdb=true;\n        }else{\n            document.cookie='utagdb=false';\n            utag.data['cp.utagdb']='false';\n            utag.cfg.utagdb=false;\n        }\n    }\n    /*If environment isn't prod, enable the debug flag unless it was already set to false*/\n    if(utag.cfg.path.indexOf('/prod/')===-1&&(typeof utag.data['cp.utagdb']==='undefined'||utag.data['cp.utagdb']==='true')){\n        document.cookie='utagdb=true';\n        utag.cfg.utagdb=true;\n    }\n}catch(e){\n    utag.DB('Tealium Debugging Tools Failed: '+e);\n}";
        var debugNotes = "To set debug in the browser console, add utagdb=1 to the url.\nhttp://www.domain.com/home.html?utagdb=1\nTo turn off the debug to the console, change 1 to 0\nhttp://www.domain.com/home.html?utagdb=0\nDebug is automatically enabled for environments that aren't prod";
        var debugTitle = "Tealium Debugging Tools";


        function findExtensionByTitle(title) {
            var data = utui.data.customizations;
            var matchFound = 0;
            if (title !== '') {
                Object.keys(data).forEach(function(id) {
                    if (data[id].title == title) {
                        // console.log('Found a match. Extension '+id);
                        matchFound = id;
                    }
                });
            }
            return matchFound;
        }

        function addDebugExtension() {
            //Should be 0 if extension doesn't exist, otherwise will be the ID of the extension
            var extensionID = findExtensionByTitle('Tealium Debugging Tools');
            if (!extensionID) {
                var ext = {
                    'code': debugCode,
                    'id': "100011",
                    'notes': debugNotes,
                    'scope': "global",
                    'scopevars': "",
                    'sort': 0,
                    'status': "active",
                    'title': debugTitle,
                    'type': "new"
                };
                exapi.getNextIdFromServer(1, null,
                    // onSuccess
                    function(providedLastId, count, extId) {
                        // Add to Model
                        exapi.addExtension(extId, ext.id, ext);
                        // Add to View
                        utui.customizations.addItem(extId);
                        moveDebugExtensionToTop();
                    },
                    // onFailure
                    function(extId) {
                        // Add to Model
                        exapi.addExtension(extId, ext.id, ext);
                        // Add to View
                        utui.customizations.addItem(extId);
                        moveDebugExtensionToTop();
                    });

            } else if (utui.data.customizations[extensionID].code != debugCode || utui.data.customizations[extensionID].notes != debugNotes) {
                console.log(debugTitle + ' Extension Already Present, but Not Up To Date');
                utui.data.customizations[extensionID].code = debugCode;
                utui.data.customizations[extensionID].notes = debugNotes;
                //Show the Save/Publish button
                utui.profile.toggleUnsavedChangesBtn();
            } else {
                console.log(debugTitle + ' Extension Already Present and Up To Date!');
            }
            addDebugTag();
            //Go ahead and remove the button since it is no longer needed.
            $('#customize_addDebugBtn').fadeOut();
        }

        function addDebugTag() {
            var tagID = findTagByTitle('DEBUG: Real-Time Audit');
            if (!tagID) {
                //Need to add the tag
                var tag = {
                    "title": "DEBUG: Real-Time Audit",
                    "status": "active",
                    "tag_id": "20067",
                    "config_tagtype": "script",
                    "config_baseurl": "https://deploytealium.com/verify/realTime.php",
                    "config_staticparams": "account=" + utui.data.settings.account + "&profile=" + utui.data.settings.profileid + "",
                    selectedTargets: {
                        dev: "true",
                        qa: "true",
                        prod: "false"
                    }
                }
                utui.automator.addTag(tag);
            } else {
                //Don't need to do anything
            }
        }

        function findTagByTitle(title) {
            var data = utui.data.manage;
            var matchFound = 0;
            if (title !== '') {
                Object.keys(data).forEach(function(id) {
                    if (data[id].title == title) {
                        matchFound = id;
                    }
                });
            }
            return matchFound;
        }

        function moveDebugExtensionToTop() {
            var extension_rev_order = [{
                scope: "All Tags",
                title: debugTitle
            }];

            for (var i = 0; i < extension_rev_order.length; i++) {
                var name_match = extension_rev_order[i].title;
                var scope_match = extension_rev_order[i].scope;
                // get extensions by scope
                $('div.container_scope:contains("' + scope_match + '")').closest("#customize_content>div").each(function(a, b) {
                    // Find the extension title
                    var titleText = $(b).find('.container_title').text().trim();
                    if (titleText.indexOf(name_match) >= 0) {
                        // Move it to the top of the list
                        $(b).prependTo("#customize_content");
                        // Grab the extension id
                        var id = $(b).attr('data-id');
                        // Figures out the new index
                        var newSort = $("#customize_content>div").index(b);
                        // Sets the sort index
                        utui.data.customizations[id].sort = newSort;
                        // Give the user some feedback
                        console.log("Moved: '" + titleText + "'");
                    }
                });
            }
            // Refresh the accordion with the new sort order
            utui.customizations.drawJUIAccordion();
        }

        function moveExtensions(elements) {
            for (var i = 0; i < elements.length; i++) {
                $(elements[i]).prependTo("#customize_content");
            }
        }

        function sortExtensions() {
            var preloader = [];
            var alltags = [];
            var vendortags = {};
            var domready = [];
            //Find out if the debug tag is in the account
            var debugtag = 0;
            $("#customize_content>div").each(function() {
                var scope = $(this).find('.container_scope').text().trim();
                if ($(this).find('.container_title').text().trim() == debugTitle) {
                    debugtag = 1;
                }
                switch (scope) {
                    case 'Pre Loader':
                        preloader.push(this);
                        break;
                    case 'All Tags':
                        alltags.push(this);
                        break;
                    case 'DOM Ready':
                        domready.push(this);
                        break;
                    default:
                        if (typeof vendortags[scope] === 'undefined') {
                            vendortags[scope] = [];
                        }
                        vendortags[scope].push(this);
                }
            });
            //Must reverse the arrays becuase we will be applying the extensions in reverse order
            moveExtensions(domready.reverse());
            Object.keys(vendortags).reverse().forEach(function(key) {
                moveExtensions(vendortags[key].reverse());
            });
            moveExtensions(alltags.reverse());
            moveExtensions(preloader.reverse());

            if (debugtag) {
                //Add extension to the top of the list
                $('.container_title:contains("' + debugTitle + '")').closest(".customize_container").prependTo("#customize_content");
            }

            //Update the sort index for all extensions
            $("#customize_content>div").each(function(index) {
                // Grab the extension id
                var id = $(this).attr('data-id');
                // Sets the sort index
                utui.data.customizations[id].sort = index;
            });

            // Refresh the accordion with the new sort order
            // Check to see if any extensions are already opened
            if (jQuery('.customize_container .ui-state-active').length) {
                var uid = jQuery('.customize_container .ui-state-active').parent().data('id');
                utui.customizations.drawJUIAccordion(uid);
                //Scroll the extension into proper view
                setTimeout(function() {
                    //Extensions
                    var myContainer = $('#customize_content');
                    var scrollTo = $('#customizations_' + uid);
                    scrollTopInt = scrollTo.offset().top - myContainer.offset().top + myContainer.scrollTop();
                    myContainer.animate({
                        scrollTop: scrollTopInt,
                        duration: 200
                    });
                }, 250);
            } else {
                // No extensions are opened, so just redraw the accordion
                utui.customizations.drawJUIAccordion();
            }

            //Show the Save/Publish button
            utui.profile.toggleUnsavedChangesBtn();

        }

        function createExtensionShortcutButtons() {

            if (!$('#conditionCheck').length) {
                $('<button id="conditionCheck" class="btn btn-info tmui">Condition Check</button>')
                    .css('float', 'left')
                    .css('margin-top', '0px')
                    .css('margin-left', '10px')
                    .click(conditionChecker)
                    .prependTo('#tabs-customizations .config_button_nofloat');
            }
            if (!$('#customize_sortBtn').length) {
                $('<span id="customize_sortBtn" class="btn btn-info tmui">Sort Extensions</span>')
                    .css('float', 'left')
                    .css('margin-left', '10px')
                    .click(sortExtensions)
                    .appendTo('#tabs-customizations .config_button_nofloat');
            }

            if (!$('#customize_addDebugBtn').length) {
                var extensionID = findExtensionByTitle(debugTitle);
                var classname = 'btn tmui';
                var buttonText = 'Add Debug Extension';
                if (extensionID) {
                    if (utui.data.customizations[extensionID].code != debugCode || utui.data.customizations[extensionID].notes != debugNotes) {
                        classname += ' btn-danger';
                        buttonText = 'Update Debug Extension';
                    }
                }
                $('<span id="customize_addDebugBtn" class="' + classname + '"> ' + buttonText + '</span>')
                    .css('float', 'left')
                    .css('margin-left', '10px')
                    .click(addDebugExtension)
                    .appendTo('#tabs-customizations .config_button_nofloat');
            }
        }

        when(function() {
            return utui.permissions && utui.users && Object.keys(utui.permissions.getUserPermissions()).length > 0;
        }, function() {
            var extensionTopObserver2 = new MutationObserver(function(mutations) {
                createExtensionShortcutButtons();
            });
            try {
                extensionTopObserver2.observe(document.querySelector('#customize_content'), {
                    attributes: true,
                    childList: true,
                    characterData: true
                });
            } catch (e) {
                console.log(e);
            }
        });

        function fixExtensionConditionsListener() {
            var save_off_buttonCount = window.buttonCount;
            var checkedCount = jQuery('.label_select_checkbox:checked').length == 0 ? save_off_buttonCount : jQuery('.label_select_checkbox:checked').length;
            jQuery("#fixExtensionConditions").text("Fix Conditions (" + checkedCount + ")");
        }

        // Add fix condition handler
        jQuery(document.body).on('click', '#fixExtensionConditions', function() {
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
            // jQuery("#fixExtensionConditions").remove();
            // jQuery("#nothingToFix").remove();


            // Remove if sendToTopBottom is not enabled
            // if (!features.sendToTopBottom.enabled) {
            //     // Remove before adding
            //     jQuery('.label_select_checkbox').off('click');
            //     // Listen for single extension selection and update the button count
            //     jQuery('.label_select_checkbox').on('click', function() {
            //         var tab = jQuery(this).closest('div[id^="tabs-"]').attr('id');
            //         console.log('Clicked the checkbox in tab: ' + tab);
            //         if (jQuery('#' + tab).find('.label_select_checkbox:checked').length) {
            //             console.log('Must have something checked');
            //             //Only add the buttons if they don't exist already
            //             var checkedCount = jQuery('.label_select_checkbox:checked').length == 0 ? buttonCount : jQuery('.label_select_checkbox:checked').length;
            //             jQuery("#fixExtensionConditions").text("Fix Conditions (" + checkedCount + ")");
            //         } else if (jQuery('.label_select_checkbox:checked').length == 0) {
            //             jQuery("#fixExtensionConditions").text("Fix Conditions (" + buttonCount + ")");
            //         }
            //     });
            // }

            var nuButton = (buttonCount > 0 && fix_conditions_array.length > 0) ? '<button id="fixExtensionConditions" class="btn btn-info tmui" style="float: left;margin-top:0;margin-left:10px;background-color:#a12727;background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#e06262), to(#ad3434));">Fix Conditions (' + buttonCount + ')</button>' : '<button id="nothingToFix" class="btn btn-info tmui" style="float: left;margin-top:0;margin-left:10px;background-color:#36702e;background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#3ccf3c), to(#196e2a));">Conditions are good</button>'
            jQuery("#conditionCheck").replaceWith(nuButton);


            // Add fix it button
            // if (buttonCount > 0 && fix_c$('#fixExtensionConditions')onditions_array.length > 0) jQuery('<button id="fixExtensionConditions" class="btn btn-info tmui" style="float: left;margin-top:0;margin-left:10px;background-color:#a12727;background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#e06262), to(#ad3434));">Fix Conditions (' + buttonCount + ')</button>').insertAfter('#customize_addDebugBtn');
            // else jQuery('<button id="nothingToFix" class="btn btn-info tmui" style="float: left;margin-top:0;margin-left:10px;background-color:#36702e;background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#3ccf3c), to(#196e2a));">Conditions are good</button>').insertAfter('#customize_addDebugBtn');
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
                return window.dylan.lodash.toPairs(obj);
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
                    masterObject = Object.assign(masterObject, window.dylan.lodash.fromPairs(uniqueArray[i]));
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
                    var reorderedObject = window.dylan.lodash(extensionObject)
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
                    var startingConditionArray = window.dylan.lodash.toPairs(reorderedObject);

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

		createExtensionShortcutButtons()

        utui.util.pubsub.subscribe(utui.constants.views.TAB_CLICK, function(e) {
            if (e.screen_name) {
                if (e.screen_name.toLowerCase() === "extensions") {
                    when(function() {
                        return $('#tabs_content .ui-state-active #tabs_customizations').length;
                    }, function() {
                        fixExtensionConditionsListener();
                    });
                }
            }
        })


    })