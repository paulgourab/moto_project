/* Copyright 2021, SiteSpect, Inc. All Rights Reserved. */
(function(y, e) {
    var g = y.document;
    var E = "onpagehide"in y ? "pagehide" : "unload";
    var b = y.SS || {};
    y.SS = b;
    var S = y.encodeURIComponent;
    b.Cookie = function() {
        var r = "\v";
        function f(e, t, n, r, i, a, o) {
            var f;
            if (!n || n.toString().substr(0, 1) !== ";") {
                if (!a) {
                    a = "/"
                }
                if (!i) {
                    i = y.location.hostname.match(/^[\d.]+|(?:\.[\da-z\-]+)*[\da-z\-]+\.[\da-z\-]+$/i)[0]
                }
                if (i.substr(0, 1) !== ".") {
                    i = "." + i
                }
                r = !r ? "" : ";secure";
                if (o) {
                    var u = o.toLowerCase();
                    if (u === "lax") {
                        o = ";SameSite=Lax"
                    } else if (u === "strict") {
                        o = ";SameSite=Strict"
                    } else if (u === "none" && r) {
                        o = ";SameSite=None"
                    } else {
                        o = ""
                    }
                }
                if (n != null) {
                    n = parseInt(n, 10);
                    if (isNaN(n)) {
                        n = 0
                    }
                    n = ";expires=" + new Date(+new Date + n).toUTCString()
                }
                f = ";path=" + a + ";domain=" + i + n + o + r
            } else {
                f = n
            }
            return S(e) + "=" + S(t) + f
        }
        function i(e, t) {
            e = " " + e + "=";
            t = " " + t + ";";
            var n = t.indexOf(e);
            if (n >= 0) {
                n += e.length;
                return decodeURIComponent(t.substring(n, t.indexOf(";", n)))
            }
            return ""
        }
        function a(e) {
            return e.split(r)
        }
        function u(e) {
            return e.join(r)
        }
        function e(e, t) {
            if (!e) {
                return
            }
            var n = i(e, g.cookie);
            if (!n) {
                return ""
            }
            if (t) {
                t = t.substr(0, 1).toLowerCase()
            }
            switch (t) {
            case "s":
                return n;
            case "a":
                return a(n);
            default:
                return n.match(r) ? a(n) : n
            }
        }
        function t(e, t, n, r, i, a, o) {
            if (!e || /^(?:expires|max-age|path|domain|secure|HttpOnly)$/i.test(e)) {
                return
            }
            if (typeof t === "object") {
                t = u(t)
            }
            g.cookie = f(e, t, n, r, i, a, o)
        }
        return {
            get: e,
            set: t
        }
    }();
    b.JSEvents = function() {
        function a(e, t, n) {
            if (e.addEventListener) {
                e.addEventListener(t, n, false)
            } else if (e.attachEvent) {
                e.attachEvent("on" + t, n)
            }
        }
        function e(e, t, n) {
            if (e.removeEventListener) {
                e.removeEventListener(t, n, false)
            } else if (e.detachEvent) {
                e.detachEvent("on" + t, n)
            }
        }
        function t(e) {
            if (!e) {
                e = y.event
            }
            var t = e.target || e.srcElement || g;
            if (t.nodeType === 3) {
                t = t.parentNode
            }
            return t
        }
        function n(e) {
            var n = false, t = false, r, i;
            r = function() {
                if (!n) {
                    if (!g.body) {
                        return setTimeout(r, 1)
                    }
                    n = true;
                    e()
                }
            }
            ;
            if (g.addEventListener) {
                i = function() {
                    g.removeEventListener("DOMContentLoaded", i, false);
                    r()
                }
                ;
                g.addEventListener("DOMContentLoaded", i, false)
            } else if (g.attachEvent) {
                i = function() {
                    if (g.readyState === "complete") {
                        g.detachEvent("onreadystatechange", i);
                        r()
                    }
                }
                ;
                g.attachEvent("onreadystatechange", i);
                try {
                    t = y.frameElement === null
                } catch (e) {}
                if (g.documentElement.doScroll && t) {
                    (function t() {
                        if (n) {
                            return
                        }
                        try {
                            g.documentElement.doScroll("left")
                        } catch (e) {
                            setTimeout(t, 1);
                            return
                        }
                        r()
                    }
                    )()
                }
            }
            a(y, "load", r)
        }
        return {
            on: a,
            off: e,
            trgt: t,
            ready: n
        }
    }();
    b.TimerFactory = function() {
        function e() {
            var t = -1
              , e = -1;
            function n(e) {
                t = (e || new Date).getTime();
                return t > 0
            }
            function r() {
                e = (new Date).getTime();
                return e > 0
            }
            function i() {
                t = -1;
                e = -1
            }
            function a() {
                if (t <= 0) {
                    throw "Failure to Start Timer"
                }
                if (e <= 0) {
                    throw "Failure to Stop Timer"
                }
                if (t > e) {
                    throw "Failure to Reset Timer"
                }
                return (e - t) / 1e3
            }
            return {
                start: n,
                stop: r,
                reset: i,
                diff: a
            }
        }
        function t() {
            return new e
        }
        return {
            get: t
        }
    }();
    if (!b.ssGetObjPath) {
        var a;
        if (y.__ssaltpath) {
            return y.__ssaltpath
        }
        b.ssGetObjPath = function() {
            var e = "/__ssobj/";
            if (a) {
                return a
            }
            var t = g.getElementsByTagName("script");
            var n = g.currentScript || t[t.length - 1];
            if (n.getAttribute("ssobj")) {
                a = n.getAttribute("ssobj");
                return a
            }
            var r = n.src;
            var i = r;
            if (i.match(/\/__ssobj\//)) {
                a = e;
                return e
            } else {
                i = i.replace(/[^\/]*$/, "");
                if (i != r) {
                    a = i;
                    return i
                }
            }
            return e
        }
        ;
        b.ssGetObjPath()
    }
    b.EventTrack = function() {
        var f = y.location.host
          , u = y.location.protocol
          , s = b.ssGetObjPath() + "track"
          , c = Math.floor(Math.random() * 99999999)
          , t = []
          , a = []
          , o = false;
        y.addEventListener(E, function() {
            o = true;
            for (var e = 0; e < a.length; e++) {
                p(a[e])
            }
        });
        function l(e) {
            t.push(e)
        }
        function r(e) {
            e += "-3";
            var t = g.createElement("img");
            t.src = e;
            t.id = "SS.IMG" + c;
            t.style.width = "0px";
            t.style.height = "0px";
            g.body.appendChild(t);
            l(t)
        }
        function d(e, t) {
            var n = (new Date).getTime() + c, r = [], i;
            if (typeof e === "object") {
                for (i = 0; i < e.length; i++) {
                    e[i] = "event" + i + "=" + S(e[i])
                }
                e = e.join("&")
            } else {
                e = "event=" + S(e)
            }
            if (t && typeof t === "object") {
                for (i in t) {
                    if (t.hasOwnProperty(i)) {
                        r[r.length] = "value_" + S(i) + "=" + S(t[i])
                    }
                }
                t = r.join("&")
            } else {
                t = "value=" + S(t !== null ? t : "")
            }
            var a = s + "?" + e + "&" + t + "&x=" + n;
            var o = u !== y.location.protocol;
            if (m() || o) {
                a = "//" + f + a;
                if (o) {
                    a = u + a
                }
            }
            return a
        }
        function e(e) {
            var t = e.match(/^(?:(https?:)?\/\/)?([^\/]+)/);
            if (!t) {
                return
            }
            var n = t[1];
            var r = t[2];
            f = r;
            u = n || u
        }
        function i(e, t) {
            var n = e + "-b";
            e += "-1";
            var r;
            if (y.navigator && navigator.sendBeacon && (o || y.event && (y.event.type === "unload" || y.event.type === "pagehide"))) {
                try {
                    r = navigator.sendBeacon(n)
                } catch (e) {
                    r = false
                }
            }
            if (r) {
                return true
            }
            var i;
            try {
                i = y.ActiveXObject ? new y.ActiveXObject("Microsoft.XMLHTTP") : new y.XMLHttpRequest;
                i.open("GET", e, !t)
            } catch (e) {
                return false
            }
            try {
                i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                i.setRequestHeader("Accept", "*/*")
            } catch (e) {}
            try {
                i.send(null)
            } catch (e) {
                if (e.number & 65535 !== 1223) {
                    return false
                }
            }
            if (t) {
                v(i, this, 0)
            } else {
                i.onreadystatechange = function() {
                    v(i, this, 0)
                }
            }
            l(i);
            return true
        }
        function v(t, n, e) {
            if (typeof y.__ssmMetricResponseReadyChange === "undefined" && e < 10) {
                setTimeout(function() {
                    v(t, n, e + 1)
                }, 1e3)
            } else {
                if (typeof y.__ssmMetricResponseReadyChange !== "undefined") {
                    y.__ssmMetricResponseReadyChange.forEach(function(e) {
                        e(t, n)
                    })
                }
            }
        }
        function h(e) {
            e += "-2";
            var t = new Image;
            t.src = e;
            l(t)
        }
        function m() {
            return f !== y.location.host
        }
        function n(e, t, n) {
            var r = d(e, t);
            var i = {
                url: r,
                sync: n,
                ran: 0
            };
            a.push(i);
            if (m() || o) {
                p(i)
            } else {
                setTimeout(function() {
                    if (!o) {
                        p(i)
                    }
                }, 200)
            }
            return true
        }
        function p(e) {
            if (++e.ran > 1) {
                return
            }
            var t = e.url;
            var n = e.sync;
            if (m() || !i(t, n)) {
                if (u === "https:") {
                    r(t)
                } else {
                    h(t)
                }
            }
        }
        n.beaconPatched = true;
        return {
            metric: n,
            rp: n,
            rpAsync: function(e, t) {
                n(e, t, false)
            },
            rpSync: function(e, t) {
                n(e, t, true)
            },
            r: t,
            setDomain: e
        }
    }();
    b.PageTimer = function() {
        var i = b.JSEvents, a, o;
        function f(t, n) {
            var r = false;
            return function() {
                if (o && !r) {
                    r = true;
                    if (a.stop()) {
                        try {
                            var e = a.diff();
                            if (e <= 1795) {
                                b.EventTrack.rp(t, e, n)
                            }
                        } catch (e) {}
                    }
                }
            }
        }
        function e(e, t, n) {
            a = b.TimerFactory.get();
            o = a.start(n);
            if (o) {
                var r = false;
                if (e === "ready") {
                    i.ready(f(t, false));
                    r = true
                } else if (e === "load") {
                    i.on(y, "load", f(t, false));
                    r = true
                } else if (e === "dwell") {
                    i.on(y, E, f(t, true));
                    r = true
                } else if (e === "abandon") {
                    unloadEvent = f(t, true);
                    i.on(y, E, unloadEvent);
                    i.on(y, "load", function() {
                        i.off(y, E, unloadEvent)
                    });
                    r = true
                }
                return r
            } else {
                return false
            }
        }
        return {
            time: e
        }
    }();
    b.Debug = function() {
        function e(e) {
            y.addEventListener("error", t, false)
        }
        function t(e) {
            var t = e.filename;
            if (t.match(/scripterror/i)) {
                t = "externaljsfile"
            }
            b.EventTrack.rp("js-error", {
                path: e.filename,
                line: e.lineno,
                error: e.message
            })
        }
        return {
            trackJSErrors: e
        }
    }();
    b.Util = function() {
        function r(e, t) {
            if (Element.prototype.matches) {
                return e.matches(t)
            }
            var n = (e.document || e.ownerDocument).querySelectorAll(t)
              , r = n.length;
            while (--r >= 0 && n.item(r) !== e) {}
            return r > -1
        }
        function e(e, t) {
            if (Element.prototype.closest) {
                return e.closest(t)
            }
            var n = e;
            do {
                if (r(n, t))
                    return n;
                n = n.parentElement || n.parentNode
            } while (n !== null && n.nodeType === 1);
            return null
        }
        return {
            elementClosest: e,
            elementMatches: r
        }
    }()
}
)(this);
/* Copyright 2017, SiteSpect, Inc. All Rights Reserved. */
var ss_dom_var = function() {
    "use strict";
    var p = 1e3;
    var h = 1e3;
    var s = [];
    var _ = null;
    var i = [];
    var e = {};
    var m;
    var b;
    var t;
    var g;
    var y = false;
    var w = false;
    var S = false;
    var r = [];
    var o = {};
    var u = [];
    var E = [];
    var A;
    var O = {};
    var C = {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true
    };
    var M = "data-ss-variation-applied";
    var n = "(?#i)";
    var N = function(t) {
        var e = window.SS || {};
        e.getAsmtData = function() {
            return t
        }
        ;
        if (!e.ssGetObjPath) {
            var a;
            e.ssGetObjPath = function() {
                var t = "/__ssobj/";
                if (typeof __ssaltpath !== "undefined") {
                    return __ssaltpath
                }
                if (a) {
                    return a
                }
                var e = document.getElementsByTagName("script");
                var r = document.currentScript || e[e.length - 1];
                if (r.getAttribute("ssobj")) {
                    a = r.getAttribute("ssobj");
                    return a
                }
                var i = r.src;
                var n = i;
                if (n.match(/\/__ssobj\//)) {
                    a = t;
                    return t
                } else {
                    n = n.replace(/[^\/]*$/, "");
                    if (n != i) {
                        a = n;
                        return n
                    }
                }
                return t
            }
        }
        e.ssGetObjPath();
        window.SS = e
    };
    N();
    var a = function() {
        try {
            A = new MutationObserver(t)
        } catch (t) {}
        function t(t) {
            t.forEach(function(t) {
                var e = i(t.target);
                if (!w && document.body.contains(e)) {
                    var r = n(e);
                    if (r) {
                        r.forEach(function(t) {
                            s(e, t)
                        })
                    }
                }
            });
            e()
        }
        function i(t) {
            var e;
            var r = t;
            while (r) {
                if (r.nodeType === Node.ELEMENT_NODE) {
                    e = e || r;
                    if (r.getAttribute(M) || E.indexOf(t) > -1) {
                        return r
                    }
                }
                r = r.parentNode
            }
            return e
        }
        function e() {
            E.forEach(function(t, e) {
                if (!document.querySelector("[" + M + '="' + e + '"]')) {
                    delete E[e];
                    delete u[e]
                }
            })
        }
        function c(t, e) {
            t.innerHTML = e
        }
        function f(e, r) {
            Object.keys(r).forEach(function(t) {
                e.style[t] = r[t]
            })
        }
        function d(e, r) {
            Object.keys(r).forEach(function(t) {
                e.setAttribute(t, r[t])
            })
        }
        function l(t, e) {
            try {
                e.apply(t)
            } catch (t) {
                return false
            }
        }
        function r(t) {
            if (!t.selector) {
                return 0
            }
            if (!m(t)) {
                return 0
            }
            var e = document.querySelectorAll(t.selector);
            var r = 0;
            var i;
            for (i = 0; i < e.length; i++) {
                if (y && typeof __ssedit !== "undefined" && __ssedit.isVEContent(e[i])) {
                    continue
                }
                r += a(e[i], t)
            }
            return r
        }
        function n(t) {
            var e = t.getAttribute(M);
            if (e === null) {
                e = E.indexOf(t);
                if (e === -1) {
                    e = E.length;
                    E[e] = t;
                    if (A && !w) {
                        A.observe(t, C)
                    }
                }
                t.setAttribute(M, e)
            }
            var r = u[e];
            if (!r) {
                r = u[e] = []
            }
            return r
        }
        function a(t, e) {
            var r = n(t);
            if (r.indexOf(e) === -1) {
                r.push(e);
                return s(t, e)
            }
            return 0
        }
        function s(e, t) {
            if (!m(t)) {
                return
            }
            var r;
            var i = (new Date).getTime();
            var n = 0;
            if (S) {
                return
            }
            while (n < t.applied.length && t.applied[n] + h < i) {
                n++
            }
            t.applied.push(i);
            if (n) {
                t.applied.splice(0, n)
            }
            if (t.applied.length >= p) {
                console.warn("Possible infinite loop detected, aborting");
                return 0
            }
            if (y) {
                r = e.ss_revert || e.cloneNode(true)
            }
            if (t.html) {
                c(e, t.html)
            }
            if (t.css) {
                f(e, t.css)
            }
            if (t.attributes) {
                d(e, t.attributes)
            }
            if (t.custom) {
                l(e, t.custom)
            }
            if (!t.counted && t.trigger_counted && !O[t.campaign_id]) {
                t.counted = true;
                O[t.campaign_id] = true;
                if (typeof g !== "function") {
                    g = N
                }
                b({
                    handler: g,
                    payload: O,
                    target_domain: _
                })
            }
            v(t.id, 1);
            if (e.hasAttribute("data-sspvid")) {
                var a = document.querySelector(t.selector);
                if (t.custom && !a && t.attributes && t.attributes["data-sspvid"]) {
                    a = document.querySelector('[data-sspvid="' + t.attributes["data-sspvid"] + '"]')
                }
                if (a) {
                    if (t.custom) {
                        var s = ["data-sspvid", "data-ss-sole-change", "data-sspv-control", "data-ss-fe-edit-type", "data-ss-display-name", "data-ss-orig-order", "data-ssmid", "data-ss-metric-name"];
                        s.forEach(function(t) {
                            if (e.hasAttribute(t)) {
                                a.setAttribute(t, e.getAttribute(t))
                            }
                        });
                        var o = Array.prototype.slice.call(e.attributes).filter(function(t) {
                            return t.name.match(/^data-ss-(?:control-)?reference-node-/)
                        });
                        o.forEach(function(t) {
                            a.setAttribute(t.name, t.value)
                        })
                    }
                    if (y) {
                        if (r) {
                            a.ss_revert = r
                        }
                        if (typeof __ssedit !== "undefined") {
                            __ssedit.outlineEdited(a)
                        }
                    }
                    if (!a.hasAttribute(M) && e.hasAttribute(M)) {
                        a.setAttribute(M, e.getAttribute(M));
                        var u = E.indexOf(e);
                        if (u > -1) {
                            E[u] = a
                        }
                        if (A && !w) {
                            A.observe(a, C)
                        }
                    }
                }
            } else if (e.hasAttribute("data-ssmid") && y) {
                if (typeof __ssedit !== "undefined") {
                    __ssedit.outlineEdited(e)
                }
            }
            if (A) {
                A.takeRecords()
            }
            return 1
        }
        function v(t, e) {
            o[t] = o[t] || 0;
            o[t] += e;
            var r = "#ssp_history_panel .ss_csf_applied_" + t;
            var i = document.querySelectorAll(r);
            for (var n = 0; n < i.length; n++) {
                if (o[t]) {
                    i[n].style.display = "block"
                } else {
                    i[n].style.display = "none"
                }
            }
        }
        return r
    }();
    function c(t) {
        if (!(t instanceof Array)) {
            t = s
        }
        var e = t.map(a).reduce(function(t, e) {
            return t + e
        }, 0);
        return e
    }
    function q(t) {
        return !!(t && t.match(/\(\?#[^)]+_ss-invert\)/))
    }
    function f(t) {
        return t.replace(/\(\?#[^)]*\)/g, "")
    }
    function T(t) {
        var e = t.indexOf(n) !== -1 ? "i" : "";
        var r = f(t);
        return new RegExp(r,e)
    }
    function d(t) {
        return typeof t !== "undefined" && t !== null
    }
    m = function() {
        function a(t) {
            try {
                return t.script_criterion()
            } catch (t) {
                return false
            }
        }
        function s(t) {
            var e = !!document.location.hash.match(T(t.hash_criterion));
            if (q(t.hash_criterion)) {
                e = !e
            }
            return e
        }
        function o(t) {
            var e = document.location.hash.indexOf("?") + 1
              , r = [""];
            if (e) {
                r = document.location.hash.substring(e).split("&")
            }
            return i(t.hashquery_name_criterion, t.hashquery_value_criterion, r)
        }
        function u(t) {
            var e = !!document.location.pathname.match(T(t.path_criterion));
            if (q(t.path_criterion)) {
                e = !e
            }
            return e
        }
        function c(t) {
            var e = document.location.search.substring(1).split("&");
            return i(t.query_name_criterion, t.query_value_criterion, e)
        }
        function i(t, e, r) {
            var i = q(t);
            var n = !i;
            var a = q(e);
            var s = !a;
            var o = i || a;
            var u = i && a;
            var c = T(t);
            var f = T(e);
            var d;
            var l;
            var v;
            var p = r.forEach(function(t) {
                var e = t.split("=");
                var r = e.shift();
                var i = e.join("=");
                var n = r.match(c);
                var a = i.match(f);
                d = d || n;
                l = l || a;
                v = v || n && a
            });
            if (n && s) {
                return v
            } else if (i && s) {
                return l && !d
            } else if (n && a) {
                return !v
            } else {
                return !d && !l
            }
        }
        return function(t) {
            var e, r, i = {
                Path: u,
                Hash: s,
                Query: c,
                HashQuery: o,
                Custom: a
            };
            var n = false;
            for (e = 0; e < t.criteria.length; e++) {
                r = t.criteria[e];
                if (d(r.GroupNumber) && n && d(r.Pre) && d(t.criteria[r.Pre]) && r.GroupNumber === t.criteria[r.Pre].GroupNumber) {
                    continue
                }
                n = i[r.Type] && i[r.Type](r);
                if (!n) {
                    if (!(d(r.GroupNumber) && d(r.Next) && d(t.criteria[r.Next]) && r.GroupNumber === t.criteria[r.Next].GroupNumber)) {
                        return false
                    }
                }
            }
            return true
        }
    }();
    b = l({
        target: SS.ssGetObjPath() + "asmt_update"
    });
    t = l({
        target: SS.ssGetObjPath() + "api",
        alterRequest: function(t) {
            t.setRequestHeader("X-SiteSpect-CSM-Url", window.location.href)
        }
    });
    function l(t) {
        t = t || {};
        var i = t.target;
        var n = t.alterRequest;
        var e;
        var r = 100;
        var a;
        var s;
        var o;
        function u() {
            d();
            var t = JSON.stringify(a)
              , e = new XMLHttpRequest;
            if (o) {
                o = o.replace(/\/$/, "")
            }
            var r = o ? o + i : i;
            e.open("POST", r);
            if (n) {
                n(e)
            }
            e.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            e.withCredentials = true;
            e.addEventListener("load", c, false);
            e.send(t)
        }
        function c(t) {
            var e;
            try {
                e = JSON.parse(t.target.response);
                if (typeof s === "function") {
                    s(e, this)
                }
                v(e, 0)
            } catch (t) {}
        }
        function f(t) {
            if (t && e) {
                d()
            } else if (e) {
                return
            }
            e = setTimeout(u, r)
        }
        function d() {
            clearTimeout(e);
            e = null
        }
        return function(t) {
            s = t.handler;
            a = t.payload;
            o = t.target_domain;
            if (!e) {
                f()
            }
        }
    }
    function v(e, t) {
        if (typeof window.__sscCSFCountStatusChange === "undefined" && t < 5) {
            setTimeout(function() {
                v(e, t + 1)
            }, 1e3)
        } else {
            if (typeof window.__sscCSFCountStatusChange !== "undefined") {
                window.__sscCSFCountStatusChange.forEach(function(t) {
                    t(e)
                })
            }
        }
    }
    function j(t) {
        setTimeout(function() {
            w = !!t.is_ve_edit_mode
        }, 5e3)
    }
    function R(t) {
        if (t) {
            s = t.variations || s;
            e = t.timestamps || e;
            j(t);
            y = !!t.is_ve_edit_mode;
            _ = t.current_domain
        }
        s.forEach(function(t) {
            t.applied = t.applied || []
        });
        r.forEach(function(t) {
            t(s)
        })
    }
    function x(t) {
        i = t ? t.metrics || i : i
    }
    function G(t) {
        r.push(t);
        t(s)
    }
    function P(t) {
        return o[t] || 0
    }
    function V(t) {
        g = t
    }
    R(window.__ss_variations);
    x(window.__ss_variations);
    document.addEventListener("ready", function() {
        if (!s.length) {
            R(window.__ss_variations)
        }
        if (!i.length) {
            x(window.__ss_variations)
        }
    }, false);
    function k() {
        if (y) {
            S = true
        }
    }
    function L() {
        if (y) {
            S = false
        }
    }
    function D(t) {
        var r = t.identifying_attr_key;
        var i = t.identifying_attr_val;
        var n = t.identifying_script_content_regex;
        var a = t.new_selector;
        if (!y) {
            return
        }
        Object.keys(s).forEach(function(t) {
            var e = s[t];
            if (r && e.attributes && e.attributes[r] && e.attributes[r] === i || n && e.custom && e.custom.toString().match(n)) {
                e.selector = a
            }
        })
    }
    function H(r) {
        var t = true;
        if (s.length && !w) {
            var i = r.getAttribute("data-sspvid");
            if (i) {
                t = s.some(function(t) {
                    if (t.attributes && t.attributes["data-sspvid"] === i) {
                        var e = r.getAttribute("data-ss-fe-edit-type") === "frontend_order";
                        return !t.custom || e
                    }
                })
            }
        }
        return t
    }
    function F(t) {
        var e = [];
        var r = {
            visits: [{
                AsmtCounted: [],
                Data: {}
            }]
        };
        t.forEach(function(t) {
            r.visits[0].Data[t.id] = {
                Hits: 1
            };
            if (t.trigger_counting) {
                t.vg_ids.forEach(function(t) {
                    if (e.indexOf(t) <= -1) {
                        e.push(t)
                    }
                })
            }
        });
        if (e.length > 0) {
            r.visits[0].AsmtCounted = e
        }
        return r
    }
    function I() {
        var e = [];
        var r = false;
        i.forEach(function(t) {
            if (m(t)) {
                e.push(t);
                if (t.trigger_counting && t.tc_ids && t.tc_ids instanceof Array) {
                    t.tc_ids.forEach(function(t) {
                        if (!O[t]) {
                            O[t] = true;
                            r = true
                        }
                    })
                }
            }
        });
        if (e.length > 0) {
            t({
                handler: function(t, e) {
                    function r(e, t) {
                        if (typeof window.__ssmCSMetricResponseReadyChange === "undefined" && t < 5) {
                            setTimeout(function() {
                                r(e, t + 1)
                            }, 1e3)
                        } else {
                            if (typeof window.__ssmCSMetricResponseReadyChange !== "undefined") {
                                window.__ssmCSMetricResponseReadyChange.forEach(function(t) {
                                    t(e.getResponseHeader("SiteSpect-Metrics-Info"))
                                })
                            }
                        }
                    }
                    r(e, 0)
                },
                payload: F(e),
                target_domain: _
            });
            if (r) {
                b({
                    handler: g,
                    target_domain: _
                })
            }
        }
    }
    return {
        applyVariations: c,
        applySingleVariation: a,
        setVariations: R,
        setMetrics: x,
        registerVariationWatcher: G,
        checkVariationApplied: P,
        setAsmtCallback: V,
        pauseVariations: k,
        unpauseVariations: L,
        updateVariationSelector: D,
        isSafeToEdit: H,
        evaluateMetrics: I
    }
}();
(function() {
    "use strict";
    function e(e) {
        var t = {
            childList: true,
            attributes: true,
            subtree: true
        };
        var r;
        var i;
        var n;
        var a = e.callback;
        var s = document.querySelector("html");
        if (s) {
            if (window.MutationObserver) {
                i = new MutationObserver(c);
                r = s;
                n = i.observe.bind(i, r, t);
                n()
            } else {
                o(s)
            }
        }
        function o(t) {
            t.addEventListener("DOMSubtreeModified", f, false)
        }
        function u(t) {
            t.removeEventListener("DOMSubtreeModified", f, false)
        }
        function c() {
            if (i) {
                i.disconnect()
            }
            var t = document.querySelectorAll(e.selector);
            if (t.length > 0) {
                a()
            }
            if (n) {
                n()
            }
        }
        function f() {
            u(s);
            c();
            o(s)
        }
    }
    ss_dom_var.registerVariationWatcher(function(t) {
        t.forEach(function(t) {
            e({
                selector: t.selector,
                callback: ss_dom_var.applySingleVariation.bind(ss_dom_var, t)
            })
        })
    });
    var t = null;
    setInterval(function() {
        if (t === null || t !== window.location.href) {
            t = window.location.href;
            ss_dom_var.evaluateMetrics()
        }
    }, 500)
}
)();
/* Copyright 2016, SiteSpect, Inc. All Rights Reserved. */
if (!window.SS) {
    window.SS = {}
}
SS.SPA = function() {
    "use strict";
    var n = 1;
    var i = document.querySelectorAll.bind(document);
    function t(t) {
        var o = {
            childList: true,
            attributes: true
        };
        var c;
        var u;
        var f = "ss-modified-" + n++;
        var s = e.bind(null, t.dynamicContainer, f);
        var d;
        var l = t.callback || t.callbackFunction;
        if (i(t.staticContainer).length > 0) {
            if (window.MutationObserver) {
                if (t.watchSubtree) {
                    o.subtree = true
                }
                u = new MutationObserver(S);
                c = i(t.staticContainer)[0];
                d = u.observe.bind(u, c, o);
                d()
            } else {
                a(i(t.staticContainer), v)
            }
            if (t.runCallbackNow) {
                l()
            }
        }
        function v(n) {
            n.addEventListener("DOMSubtreeModified", w, false)
        }
        function b(n) {
            n.removeEventListener("DOMSubtreeModified", w, false)
        }
        function S() {
            if (u) {
                u.disconnect()
            }
            var n = s(true);
            if (n.length > 0) {
                a(n, r.bind(null, f));
                l()
            }
            if (d) {
                d()
            }
        }
        function w() {
            a(i(t.staticContainer), b);
            S();
            a(i(t.staticContainer), v)
        }
    }
    function e(n, t, e) {
        var a = [n];
        if (e) {
            a.push(":not(." + t + ")")
        }
        return i(a.join(""))
    }
    function a(n, i) {
        [].forEach.call(n, i)
    }
    function r(n, i) {
        if (i.className.indexOf(n) === -1) {
            i.className += " " + n
        }
    }
    return {
        dynamicModify: t
    }
}();
/* Copyright 2019, SiteSpect, Inc. All Rights Reserved. */
(function() {
    window.SS = window.SS || {};
    SS.Recs = SS.Recs || {};
    var n = "https://recs.sitespect.net/v1/:config_id/";
    var i = "revzilla";
    if (n && !n.match(/:site_id/) && !n.match(/:config_id/)) {
        U("recs api url missing site id/config id token", n);
        n = ""
    }
    var t = "ss_recs_event_cache";
    var a = {};
    var o = "events/";
    var e = "recs_event";
    var s = [];
    var r = "ss_recs_initial_event";
    var c = "recs_initial_event_flagged";
    var f = "ss_recs_initial_event_data";
    var u = 100;
    var l = setInterval(function() {
        if (u <= 0) {
            clearInterval(l);
            return
        }
        if (v && SS.EventTrack) {
            u = 0;
            C()
        }
        u--
    }, 100);
    var v;
    SS.Recs.registerRecsConfig = function(e) {
        v = e;
        var r = true;
        if (typeof v.automatic_page_view !== "undefined") {
            r = v.automatic_page_view
        }
        if (typeof v.setupPageViewListener === "function") {
            v.setupPageViewListener(function() {
                b({
                    action: "page-view"
                })
            })
        }
        if (r) {
            s.push({
                action: "page-view"
            })
        }
    }
    ;
    SS.Recs.getConfig = function() {
        return v || null
    }
    ;
    SS.Recs.sendRecsEvent = function(e) {
        s.push(e)
    }
    ;
    function S(e) {
        if (!e.toString) {
            return e
        }
        return e.toString().replace(/`/g, "`1").replace(/#/g, "`2").replace(/~/g, "`3")
    }
    function p(t) {
        var e = "~~";
        var n = e;
        var i = "###";
        return Object.keys(t).map(function(e) {
            var r = t[e];
            if (!(r instanceof Array)) {
                r = [r]
            }
            return [S(e), r.map(S).join(i)].join(n)
        }).join(e)
    }
    function d(t) {
        var n = v.page_types || {};
        return Object.keys(n).filter(function(e) {
            var r = n[e];
            if (typeof r === "function") {
                return r(t, v)
            }
        })
    }
    function g(e) {
        var r = e.actions;
        var c = e.args;
        var t = r.reduce(function(o, e) {
            var s = v.actions[e];
            if (!s && e === "page-view") {
                s = {}
            }
            if (!s) {
                throw "Unknown action: " + e
            }
            Object.keys(s).forEach(function(e) {
                var r = s[e];
                var t = r;
                if (typeof r === "function") {
                    t = r(c, v);
                    if (typeof t !== "string") {
                        return
                    }
                }
                if (o[e]) {
                    return
                }
                var n = v.data[t];
                if (!n) {
                    throw e + ": Data getter for " + t + " not defined."
                }
                var i;
                try {
                    i = n(c, v)
                } catch (e) {
                    window.console && console.error && console.error("Error trying to get data for " + t, e);
                    return
                }
                var a = _({
                    value: i
                });
                if (a.valid) {
                    o[e] = a.out
                }
            });
            return o
        }, {});
        return t
    }
    function _(e) {
        var r = e.value;
        var t = !e.nested;
        var n = (typeof r).match(/boolean|string|number|bigint/);
        var i = !n;
        var a = r;
        var o = r;
        var s = [];
        var c = y(r);
        if (h(r) || r === "") {
            n = false;
            s.push("Value is empty string or NaN.")
        } else if (t && y(r)) {
            i = false;
            n = r.length;
            if (!n) {
                s.push("Array cannot be empty.")
            }
            o = r.map(function(e) {
                var r = _({
                    value: e,
                    nested: true
                });
                if (!r.valid) {
                    n = false;
                    s = s.concat(r.reasons.map(function(e) {
                        return "Invalid nested value: " + e
                    }))
                }
                return r.out
            })
        } else if (c) {
            n = false;
            s.push("Value is an array, but arrays aren't allowed here.")
        }
        if (!n) {
            o = null
        } else if (typeof r === "boolean") {
            o = r.toString()
        } else if ((typeof r).match(/number|bigint/)) {
            o = r.toString("10")
        }
        var f, u;
        if (i) {
            f = "Invalid type. Must be a boolean, string, number,";
            u = "or number.";
            if (t) {
                u = "number, or a flat array of such values."
            }
            s.push([f, u].join(" "))
        }
        n = !!n;
        var l = {
            valid: n,
            input: a
        };
        if (!n) {
            l.reasons = s
        } else {
            l.out = o
        }
        return l
    }
    function y(e) {
        if (window.Array && Array.isArray) {
            return Array.isArray(e)
        } else {
            return Object.prototype.toString.call(e) === "[object Array]"
        }
    }
    function h(e) {
        return typeof e === "number" && e !== e
    }
    function b(r) {
        var e = r.action;
        if (!e) {
            throw "No action declared."
        }
        if (!(e instanceof Array)) {
            e = [e]
        }
        var t = [];
        e.some(function(e) {
            if (e !== "page-view") {
                return
            }
            t = t.concat(d(r));
            return true
        });
        var n = g({
            actions: e.concat(t),
            args: r
        });
        if (Object.keys(n).length) {
            if (R(n)) {
                return
            }
            w();
            m(n)
        }
    }
    function m(e) {
        var r = k(e);
        if (e.buy || !N(r)) {
            I(e);
            O(e);
            D(r)
        }
    }
    function R(e) {
        if (!e.buy && localStorage.getItem(r) !== c) {
            localStorage.setItem(r, c);
            localStorage.setItem(f, JSON.stringify(e));
            return true
        }
        return false
    }
    function w() {
        var e = localStorage.getItem(f);
        if (e) {
            localStorage.removeItem(f);
            var r;
            try {
                r = JSON.parse(e);
                m(r)
            } catch (e) {
                window.console && console.error && console.error("Error trying to get initial recs event data.", e);
                window.console && console.error && console.error("Initial event data:", r)
            }
        }
    }
    function I(r) {
        if (!SS.Recs.enable_et) {
            return
        }
        var t = {};
        Object.keys(r).forEach(function(e) {
            t[e] = r[e]
        });
        if (SS.GUID) {
            t["user-id"] = SS.GUID
        }
        SS.EventTrack.rp(e, p(t))
    }
    function A(e) {
        if (typeof e !== "string") {
            U("API endpoint suffix must be a string.", {
                provided: e
            })
        }
        var r;
        if (n.match(/:site_id/)) {
            if (!SS.site_id) {
                U("No Site ID configured");
                return ""
            }
            r = n.replace(/:site_id\b/g, SS.site_id)
        } else if (n.match(/:config_id/)) {
            if (!i || !SS.site_id) {
                U("No Site ID or Cluster ID configured");
                return ""
            }
            var t = [i, SS.site_id, "1"].join("-");
            r = n.replace(/:config_id\b/g, t)
        }
        if (SS.Recs.override_recs_api_url) {
            if (typeof SS.Recs.override_recs_api_url === "string" && SS.Recs.override_recs_api_url.indexOf("/") === -1) {
                r = r.replace(/(https?:\/\/)(.*?)(\/.*)/, "$1" + SS.Recs.override_recs_api_url + "$3")
            } else {
                U("SS.Recs.override_recs_api_url is invalid.  override_recs_api_url must be a valid fqdn without protocol or slashes")
            }
        }
        if (!r.match(/\/$/)) {
            r += "/"
        }
        r += e;
        return r
    }
    function O(e) {
        if (!n || !SS.Recs.enable_api) {
            return
        }
        var r = A(o);
        if (!r) {
            return
        }
        var t = new XMLHttpRequest;
        t.open("POST", r);
        t.setRequestHeader("Content-Type", "text/plain");
        t.send(JSON.stringify(j(e)))
    }
    function j(t) {
        var e = {
            events: Object.keys(t).map(function(e) {
                var r = t[e];
                if (!(r instanceof Array)) {
                    r = [r]
                }
                return {
                    name: e,
                    entityIds: r
                }
            })
        };
        if (SS.GUID) {
            e.userId = SS.GUID
        }
        return e
    }
    SS.Recs.generateHashValue = function e(r) {
        var t = 0, n, i;
        if (r.length === 0)
            return t;
        for (n = 0; n < r.length; n++) {
            i = r.charCodeAt(n);
            t = (t << 5) - t + i;
            t |= 0
        }
        return t
    }
    ;
    function E() {
        var e = sessionStorage.getItem(t);
        var r;
        try {
            r = JSON.parse(e)
        } catch (e) {}
        if (!r) {
            r = {}
        }
        a = r
    }
    function k(r) {
        var t = [];
        var e = Object.keys(r).sort();
        var n;
        e.forEach(function(e) {
            n = r[e];
            if (Array.isArray(n)) {
                n = n.sort()
            }
            t.push([e, n])
        });
        return SS.Recs.generateHashValue(JSON.stringify(t))
    }
    function N(e) {
        return !!a[e]
    }
    function D(e) {
        a[e] = 1;
        try {
            sessionStorage.setItem(t, JSON.stringify(a))
        } catch (e) {}
    }
    function C() {
        E();
        SS.Recs = SS.Recs || {};
        SS.Recs.sendRecsEvent = b;
        SS.Recs.getApiEndpoint = A;
        SS.Recs.enable_api = typeof SS.Recs.enable_api === "undefined" ? true : SS.Recs.enable_api;
        SS.Recs.enable_et = typeof SS.Recs.enable_et === "undefined" ? true : SS.Recs.enable_et;
        s.forEach(b);
        SS.Recs.capture_initialized = true
    }
    function U() {
        var e = [].slice.call(arguments);
        window.console && console.warn && console.warn.apply(console, e)
    }
}
)();
/* Copyright 2019, SiteSpect, Inc. All Rights Reserved. */
(function() {
    window.SS = window.SS || {};
    SS.Recs = SS.Recs || {};
    function N() {
        if (SS.Recs.enable_log_debug) {
            console.log.apply(console, arguments)
        }
    }
    var L = {};
    var t = {};
    var M;
    var U = false;
    var e = 100;
    var r = setInterval(function() {
        if (e <= 0) {
            clearInterval(r);
            return
        }
        if (SS.Recs && SS.Recs.capture_initialized) {
            e = 0;
            x()
        }
        e--
    }, 100);
    function H(e, r) {
        return "SS_RECOMMENDATION_" + e + "_" + r
    }
    var n = 100;
    var i = 3e5;
    var m = "RecsInput_Rules";
    var a = "RecsInput_CurrentItem";
    var s = 20;
    var u = {
        default: "RecsInput_Rules",
        Rules: "RecsInput_Rules",
        "Current Item": "RecsInput_Rules_CurrentItem",
        Favorites: "RecsInput_Rules_Favorites",
        Registry: "RecsInput_Rules_Registry",
        "Shopping Cart": "RecsInput_Rules_ShoppingCart",
        Wishlist: "RecsInput_Rules_Wishlist",
        "Custom Item": "RecsInput_Rules_CustomItem",
        "Custom Items": "RecsInput_Rules_CustomItems"
    };
    var l = {
        "Current Item": "RecsInput_CurrentItem",
        Favorites: "RecsInput_Favorites",
        Registry: "RecsInput_Registry",
        "Shopping Cart": "RecsInput_ShoppingCart",
        Wishlist: "RecsInput_Wishlist",
        "Custom Item": "RecsInput_CustomItem",
        "Custom Items": "RecsInput_CustomItems"
    };
    var c = {
        "User ID": "GUID"
    };
    var f = "User ID";
    var B = {
        Similar: "people-also-like",
        "People Also Like": "people-also-like",
        Complementary: "complementary",
        Popular: "popular",
        Personalized: "personalized",
        "Recently Viewed": "recently-viewed"
    };
    var o = {};
    var p = ["user", "userBias", "item", "itemBias", "itemSet", "itemSetBias", "from", "num", "rules", "dateRange", "blacklistItems", "returnSelf", "algorithm", "actionSkus"];
    var P = ["template_html", "template_id", "algorithm", "input", "order", "variation_id", "selected_element"];
    var d = ["userBias", "itemBias", "itemSetBias", "from", "dateRange", "blacklistItems", "returnSelf"];
    SS.Recs.displayRecommendation = function(r) {
        var e = r.template_html;
        var t = r.template_css;
        var n = r.template_js;
        var i = r.template_id;
        var a = r.algorithm;
        var s = r.input;
        var u = r.order;
        var o = r.variation_id;
        var l = parseInt(r.max_items);
        var c = r.selected_element;
        var f = r.ss_recs_title;
        var p = r.rules;
        N("ss-recsdisplay: called with arguments:", r);
        var d = X(o);
        d.recent_args = r;
        if (!U) {
            d.queue_display = true;
            N("Config not initialized: queueing display for later.");
            return
        }
        var y = P.every(function(e) {
            return typeof r[e] !== "undefined"
        });
        if (!y) {
            N("ss-recsdisplay: required parameter not defined. The following are required displayRecommendation parameters:", P);
            return
        }
        if ($(d)) {
            return
        }
        var v = H(o, "CSS");
        var h = document.getElementById(v);
        if (!h) {
            h = document.createElement("style");
            h.innerHTML = t;
            h.setAttribute("id", v);
            document.body.appendChild(h);
            N("ss-recsdisplay: appending CSS block:", h)
        }
        var g = {};
        V(g);
        W(g, s);
        var m;
        if (p) {
            g.rules = ee(p);
            if (typeof g.actionSkus === "undefined" && re(g.rules)) {
                g.actionSkus = te(g)
            }
            N("Evaluated rules:", g.rules)
        }
        g.num = l;
        g.algorithm = B[a] || a.toLowerCase();
        g = J({
            query: g,
            algorithm: g.algorithm
        });
        var _ = Z(g, o);
        if (!L[_]) {
            L[_] = {}
        }
        var S = L[_];
        var R = !S.data || S.expire < new Date;
        var w = !!S.data;
        G(g);
        var A = H(o, "HTML");
        var b = document.getElementById(A);
        var I;
        if (!b) {
            N("No HTML content found; inserting LOADING block.");
            I = K({
                order: u,
                content: e,
                context: {},
                css_class: "ss-recs-wrapper__LOADING",
                selected_element: c,
                html_unique_id: A,
                ss_recs_title: f
            })
        }
        var C;
        var k;
        var x;
        var q;
        var E;
        var j;
        var O = SS.Recs.getConfig().display_query_settings || {};
        var T = O.onNoResultsCallback;
        var D = typeof O.cleanup_recs_on_no_results !== "undefined" ? O.cleanup_recs_on_no_results : true;
        if (!S.call_queued && (!b || R)) {
            S.call_queued = true;
            C = e;
            k = new XMLHttpRequest;
            k.onreadystatechange = function() {
                if (this.readyState !== 4 || this.status !== 200) {
                    if (this.readyState === 4) {
                        N("Recs call returned with Non-200 status:", this.statusText);
                        S.call_queued = false;
                        Q(r, this, _)
                    }
                    return
                }
                try {
                    x = JSON.parse(this.responseText);
                    if (typeof x === "object" && x !== null && !Array.isArray(x)) {
                        if (x.results && Array.isArray(x.results)) {
                            q = x.results
                        } else {
                            throw "Recs call returned an object with non-array results property."
                        }
                    } else if (Array.isArray(x)) {
                        q = x
                    } else {
                        throw "Recs call returned an unknown response type."
                    }
                } catch (e) {
                    N("Recs response data is in neither the expected JSON array format, nor the JSON object format.");
                    S.call_queued = false;
                    Q(r, this, _);
                    return
                }
                if (SS.Recs.perItemDataTransform && typeof SS.Recs.perItemDataTransform === "function") {
                    q.forEach(SS.Recs.perItemDataTransform)
                }
                L[_] = {
                    data: {
                        items: q
                    },
                    expire: Y(),
                    call_queued: false
                };
                var e = document.getElementById(A);
                j = K({
                    order: u,
                    current_element: e,
                    content: C,
                    context: L[_].data,
                    css_class: "ss-recs-wrapper__LOADED",
                    selected_element: c,
                    html_unique_id: A,
                    ss_recs_title: f
                });
                if (n && typeof n === "function") {
                    n.call(j, r, L[_].data)
                }
                if (L[_].data.items.length === 0) {
                    if (D) {
                        F(r.variation_id)
                    }
                    typeof T === "function" && T(r)
                }
                z({
                    cache_hit: false,
                    data: L[_].data,
                    display_args: r,
                    inserted_element: j
                })
            }
            ;
            N("Initial request or cache invalidated. Sending call to:", M);
            N("Request body parameters:", JSON.stringify(g));
            k.open("POST", M, true);
            k.setRequestHeader("Content-type", "text/plain");
            k.send(JSON.stringify(g))
        } else if (w && !b && !R) {
            N("HTML missing, cache still valid.  Re-inserting HTML from cache.");
            j = K({
                order: u,
                current_element: I || b,
                content: C,
                context: L[_].data,
                css_class: "ss-recs-wrapper__LOADED",
                selected_element: c,
                html_unique_id: A,
                ss_recs_title: f
            });
            if (n) {
                n.call(j, r, L[_].data)
            }
            z({
                cache_hit: true,
                data: L[_].data,
                display_args: r,
                inserted_element: j
            })
        } else if (w && b && !R) {
            N("Cache hit, Recommendation found in HTML. No actions taken.");
            z({
                cache_hit: true,
                data: L[_].data,
                display_args: r,
                inserted_element: null
            })
        }
    }
    ;
    function F(e) {
        if (!e) {
            N("hideRecsDisplay called without valid args")
        }
        var r = H(e, "HTML");
        var t = document.getElementById(r);
        if (t) {
            t.style.display = "none"
        } else {
            N("hideRecsDisplay called but recs placement does not exist")
        }
        N("Hiding recs placement with hideRecsDisplay for " + r)
    }
    function z(e) {
        if (SS.Recs.onAfterRecsDisplayCycle && typeof SS.Recs.onAfterRecsDisplayCycle === "function") {
            SS.Recs.onAfterRecsDisplayCycle({
                cache_hit: e.cache_hit,
                data: e.data,
                display_args: e.display_args,
                inserted_element: e.inserted_element
            })
        }
    }
    function V(r) {
        var e = SS.Recs.getConfig();
        var t = e.display_query_defaults || {};
        d.forEach(function(e) {
            if (typeof t[e] !== "undefined") {
                r[e] = t[e]
            }
        })
    }
    function J(e) {
        var r = e.query
          , t = e.algorithm;
        if (o[t]) {
            return o[t](r)
        }
        return r
    }
    function W(e, r) {
        var t = SS.Recs.getConfig();
        if (!t.data || !r) {
            return
        }
        var n = l[r];
        var i = c[r];
        var a;
        var s;
        if (n) {
            a = t.data[n];
            if (typeof a !== "function") {
                console.warn("No data getter defined for input: " + r + "." + ' Please define "' + n + '" in your Recommendations data Configuration.');
                return
            }
            s = a({}, t) || ""
        } else if (i) {
            if (typeof SS[i] === "undefined") {
                console.warn("No SS variable defined for input: " + r + "." + 'Please define "' + i + '" in your SS object.');
                return
            }
            s = SS[i] || ""
        } else {
            console.warn("Unrecognized Recommendation input: " + r);
            return
        }
        var u = false;
        if (typeof t.flatten_single_item_arrays !== "undefined") {
            u = t.flatten_single_item_arrays
        }
        if (r !== f) {
            if (u && Array.isArray(s) && s.length === 1) {
                s = s[0]
            }
        }
        var o = y({
            input: r,
            value: s
        });
        e[o] = s
    }
    function y(e) {
        var r = e.input;
        var t = e.value;
        if (r === f) {
            return "user"
        }
        if (Array.isArray(t)) {
            return "itemSet"
        }
        return "item"
    }
    function G(e) {
        var r = SS.Recs.getConfig().display_query_settings || {};
        var t = r.itemset_limit || s;
        if (e.itemSet && Array.isArray(e.itemSet) && e.itemSet.length > t) {
            e.itemSet = e.itemSet.slice(0, t)
        }
    }
    function $(e) {
        var r = false;
        e = e || {};
        if (e.throttled) {
            e.queue_display = true;
            r = true;
            N("Display throttled, queueing display.")
        } else {
            e.throttled = true;
            setTimeout(function() {
                e.throttled = false;
                if (e.queue_display) {
                    e.queue_display = false;
                    SS.Recs.displayRecommendation(e.recent_args)
                }
            }, n)
        }
        return r
    }
    function X(e) {
        if (!t[e]) {
            t[e] = {}
        }
        return t[e]
    }
    function _() {
        Object.keys(t).forEach(function(e) {
            SS.Recs.displayRecommendation(t[e].recent_args)
        })
    }
    function S() {
        if (!t) {
            return
        }
        Object.keys(t).forEach(function(e) {
            var r = t[e];
            if (r.queue_display) {
                N("Running queued display.", r);
                r.queue_display = false;
                SS.Recs.displayRecommendation(r.recent_args)
            }
        })
    }
    function Z(r, e) {
        var t = [];
        p.forEach(function(e) {
            t.push(r[e])
        });
        t.push(e);
        return SS.Recs.generateHashValue(JSON.stringify(t))
    }
    function R(e) {
        var r = e.html_id;
        var t = e.css_class;
        var n = e.content;
        var i = t ? " " + t : "";
        n = "<div id=" + r + ' class="ss-recs-wrapper' + i + '">' + n + "</div>";
        return n
    }
    function v(e) {
        var r = document.createElement("div");
        r.innerHTML = e;
        return r.firstChild
    }
    function K(e) {
        var r = e.current_element;
        var t = e.order;
        var n = e.context;
        var i = e.content;
        var a = e.selected_element;
        var s = e.html_unique_id;
        var u = e.css_class;
        var o = e.ss_recs_title;
        var l;
        n.recs_heading = o;
        var c = Mustache.render(i, n);
        var f;
        if (r) {
            f = r.parentNode;
            l = v(c);
            f.replaceChild(l, r)
        } else if (t === "Inside") {
            a.innerHTML = c;
            l = a.firstChild
        } else {
            l = v(c);
            if (t === "Before") {
                a.parentElement.insertBefore(l, a)
            } else if (t === "After") {
                a.parentElement.insertBefore(l, a.nextSibling)
            }
        }
        l.setAttribute("id", s);
        l.className += " " + u;
        N("ss-recsdisplay: appending HTML block:", l);
        return l
    }
    function w() {
        return t
    }
    function h() {
        return L
    }
    function A(e) {
        SS.Recs.enable_log_debug = e
    }
    function ee(e) {
        e = JSON.parse(e);
        var u = {};
        return e.reduce(function(e, r) {
            var t;
            var n, i;
            var a = r.conditionScope || "default";
            var s = "Current Item";
            n = u[a] = u[a] || g(a);
            i = u[s] = u[s] || g(s);
            if (!r.conditions || b(r.conditions, n)) {
                t = I(r.actions, i);
                e = e.concat(t)
            }
            return e
        }, [])
    }
    function re(e) {
        return Array.isArray(e) && e.some(function(e) {
            return Array.isArray(e.values) && e.values.some(function(e) {
                return typeof e === "object"
            })
        })
    }
    function te(e) {
        var r;
        var t;
        var n = e.item || e.itemSet;
        if (!n) {
            r = SS.Recs.getConfig();
            t = r.data[a];
            if (typeof t !== "function") {
                return []
            }
            n = t({}, r)
        }
        if (n && !Array.isArray(n)) {
            n = [n]
        }
        return n || null
    }
    function b(e, r) {
        return jsonLogic.apply(e, r)
    }
    function I(e, r) {
        if (!Array.isArray(e)) {
            e = [e]
        }
        return e.map(function(e) {
            return C(e, r)
        })
    }
    function C(e, t) {
        var r = {
            name: e.name,
            bias: e.bias
        };
        if (Array.isArray(e.values)) {
            r.values = e.values.reduce(function(e, r) {
                return e.concat(k(r, t))
            }, [])
        } else if (e.values) {
            console.warn('Non-array "values" passed in for action "' + e.name + '". Please check your rules configuration.')
        }
        return r
    }
    function k(e, r) {
        var t;
        if (typeof e === "object") {
            t = jsonLogic.apply(e, r);
            if (t) {
                return t
            }
        }
        return e
    }
    function g(e) {
        var r = u[e];
        var t = SS.Recs.getConfig();
        var n = t.data[r];
        if (typeof n !== "function") {
            console.warn("Rules defined but specified data getter not available. Please define " + r + " in your Recommendations data Configuration.");
            return []
        }
        return n({}, t)
    }
    function Q(e, r, t) {
        var n = SS.Recs.getConfig().display_query_settings || {};
        var i = n.onFailCallback;
        var a = typeof n.cleanup_recs_on_fail !== "undefined" ? n.cleanup_recs_on_fail : true;
        if (a) {
            F(e.variation_id)
        }
        var s = h();
        s[t] = {
            data: {
                items: []
            },
            expire: Y(),
            call_queued: false
        };
        typeof i === "function" && i(e, r);
        z({
            cache_hit: false,
            data: s[t].data
        })
    }
    function Y() {
        var e = new Date;
        var r = e.setMilliseconds(e.getMilliseconds() + i);
        return r
    }
    function x() {
        SS.Recs.updateDisplays = _;
        var e = SS.Recs.getConfig();
        if (SS.Recs.debug) {
            SS.Recs.getRecsRegistry = w;
            SS.Recs.getRecsCache = h;
            SS.Recs.setDisplayLogging = A
        }
        M = SS.Recs.getApiEndpoint("recs/");
        if (!M) {
            throw "No recs server url specified.  Recommendations cannot be displayed without a recs server url."
        }
        SS.Recs.display_initialized = U = true;
        S()
    }
}
)();
(function() {
    var n;
    var i;
    (function e(r, t) {
        if (typeof n === "object" && n && typeof n.nodeName !== "string") {
            t(n)
        } else if (typeof i === "function" && i.amd) {
            i(["exports"], t)
        } else {
            r.Mustache = {};
            t(r.Mustache)
        }
    }
    )(this, function e(R) {
        var t = Object.prototype.toString;
        var w = Array.isArray || function e(r) {
            return t.call(r) === "[object Array]"
        }
        ;
        function f(e) {
            return typeof e === "function"
        }
        function a(e) {
            return w(e) ? "array" : typeof e
        }
        function A(e) {
            return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }
        function l(e, r) {
            return e != null && typeof e === "object" && r in e
        }
        function c(e, r) {
            return e != null && typeof e !== "object" && e.hasOwnProperty && e.hasOwnProperty(r)
        }
        var n = RegExp.prototype.test;
        function r(e, r) {
            return n.call(e, r)
        }
        var i = /\S/;
        function b(e) {
            return !r(i, e)
        }
        var s = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;",
            "`": "&#x60;",
            "=": "&#x3D;"
        };
        function u(e) {
            return String(e).replace(/[&<>"'`=\/]/g, function e(r) {
                return s[r]
            })
        }
        var I = /\s*/;
        var C = /\s+/;
        var k = /\s*=/;
        var x = /\s*\}/;
        var q = /#|\^|\/|>|\{|&|=|!/;
        function o(e, r) {
            if (!e)
                return [];
            var t = [];
            var n = [];
            var i = [];
            var a = false;
            var s = false;
            function u() {
                if (a && !s) {
                    while (i.length)
                        delete n[i.pop()]
                } else {
                    i = []
                }
                a = false;
                s = false
            }
            var o, l, c;
            function f(e) {
                if (typeof e === "string")
                    e = e.split(C, 2);
                if (!w(e) || e.length !== 2)
                    throw new Error("Invalid tags: " + e);
                o = new RegExp(A(e[0]) + "\\s*");
                l = new RegExp("\\s*" + A(e[1]));
                c = new RegExp("\\s*" + A("}" + e[1]))
            }
            f(r || R.tags);
            var p = new O(e);
            var d, y, v, h, g, m;
            while (!p.eos()) {
                d = p.pos;
                v = p.scanUntil(o);
                if (v) {
                    for (var _ = 0, S = v.length; _ < S; ++_) {
                        h = v.charAt(_);
                        if (b(h)) {
                            i.push(n.length)
                        } else {
                            s = true
                        }
                        n.push(["text", h, d, d + 1]);
                        d += 1;
                        if (h === "\n")
                            u()
                    }
                }
                if (!p.scan(o))
                    break;
                a = true;
                y = p.scan(q) || "name";
                p.scan(I);
                if (y === "=") {
                    v = p.scanUntil(k);
                    p.scan(k);
                    p.scanUntil(l)
                } else if (y === "{") {
                    v = p.scanUntil(c);
                    p.scan(x);
                    p.scanUntil(l);
                    y = "&"
                } else {
                    v = p.scanUntil(l)
                }
                if (!p.scan(l))
                    throw new Error("Unclosed tag at " + p.pos);
                g = [y, v, d, p.pos];
                n.push(g);
                if (y === "#" || y === "^") {
                    t.push(g)
                } else if (y === "/") {
                    m = t.pop();
                    if (!m)
                        throw new Error('Unopened section "' + v + '" at ' + d);
                    if (m[1] !== v)
                        throw new Error('Unclosed section "' + m[1] + '" at ' + d)
                } else if (y === "name" || y === "{" || y === "&") {
                    s = true
                } else if (y === "=") {
                    f(v)
                }
            }
            m = t.pop();
            if (m)
                throw new Error('Unclosed section "' + m[1] + '" at ' + p.pos);
            return j(E(n))
        }
        function E(e) {
            var r = [];
            var t, n;
            for (var i = 0, a = e.length; i < a; ++i) {
                t = e[i];
                if (t) {
                    if (t[0] === "text" && n && n[0] === "text") {
                        n[1] += t[1];
                        n[3] = t[3]
                    } else {
                        r.push(t);
                        n = t
                    }
                }
            }
            return r
        }
        function j(e) {
            var r = [];
            var t = r;
            var n = [];
            var i, a;
            for (var s = 0, u = e.length; s < u; ++s) {
                i = e[s];
                switch (i[0]) {
                case "#":
                case "^":
                    t.push(i);
                    n.push(i);
                    t = i[4] = [];
                    break;
                case "/":
                    a = n.pop();
                    a[5] = i[2];
                    t = n.length > 0 ? n[n.length - 1][4] : r;
                    break;
                default:
                    t.push(i)
                }
            }
            return r
        }
        function O(e) {
            this.string = e;
            this.tail = e;
            this.pos = 0
        }
        O.prototype.eos = function e() {
            return this.tail === ""
        }
        ;
        O.prototype.scan = function e(r) {
            var t = this.tail.match(r);
            if (!t || t.index !== 0)
                return "";
            var n = t[0];
            this.tail = this.tail.substring(n.length);
            this.pos += n.length;
            return n
        }
        ;
        O.prototype.scanUntil = function e(r) {
            var t = this.tail.search(r), n;
            switch (t) {
            case -1:
                n = this.tail;
                this.tail = "";
                break;
            case 0:
                n = "";
                break;
            default:
                n = this.tail.substring(0, t);
                this.tail = this.tail.substring(t)
            }
            this.pos += n.length;
            return n
        }
        ;
        function p(e, r) {
            this.view = e;
            this.cache = {
                ".": this.view
            };
            this.parent = r
        }
        p.prototype.push = function e(r) {
            return new p(r,this)
        }
        ;
        p.prototype.lookup = function e(r) {
            var t = this.cache;
            var n;
            if (t.hasOwnProperty(r)) {
                n = t[r]
            } else {
                var i = this, a, s, u, o = false;
                while (i) {
                    if (r.indexOf(".") > 0) {
                        a = i.view;
                        s = r.split(".");
                        u = 0;
                        while (a != null && u < s.length) {
                            if (u === s.length - 1)
                                o = l(a, s[u]) || c(a, s[u]);
                            a = a[s[u++]]
                        }
                    } else {
                        a = i.view[r];
                        o = l(i.view, r)
                    }
                    if (o) {
                        n = a;
                        break
                    }
                    i = i.parent
                }
                t[r] = n
            }
            if (f(n))
                n = n.call(this.view);
            return n
        }
        ;
        function d() {
            this.cache = {}
        }
        d.prototype.clearCache = function e() {
            this.cache = {}
        }
        ;
        d.prototype.parse = function e(r, t) {
            var n = this.cache;
            var i = r + ":" + (t || R.tags).join(":");
            var a = n[i];
            if (a == null)
                a = n[i] = o(r, t);
            return a
        }
        ;
        d.prototype.render = function e(r, t, n, i) {
            var a = this.parse(r, i);
            var s = t instanceof p ? t : new p(t);
            return this.renderTokens(a, s, n, r, i)
        }
        ;
        d.prototype.renderTokens = function e(r, t, n, i, a) {
            var s = "";
            var u, o, l;
            for (var c = 0, f = r.length; c < f; ++c) {
                l = undefined;
                u = r[c];
                o = u[0];
                if (o === "#")
                    l = this.renderSection(u, t, n, i);
                else if (o === "^")
                    l = this.renderInverted(u, t, n, i);
                else if (o === ">")
                    l = this.renderPartial(u, t, n, a);
                else if (o === "&")
                    l = this.unescapedValue(u, t);
                else if (o === "name")
                    l = this.escapedValue(u, t);
                else if (o === "text")
                    l = this.rawValue(u);
                if (l !== undefined)
                    s += l
            }
            return s
        }
        ;
        d.prototype.renderSection = function e(r, t, n, i) {
            var a = this;
            var s = "";
            var u = t.lookup(r[1]);
            function o(e) {
                return a.render(e, t, n)
            }
            if (!u)
                return;
            if (w(u)) {
                for (var l = 0, c = u.length; l < c; ++l) {
                    s += this.renderTokens(r[4], t.push(u[l]), n, i)
                }
            } else if (typeof u === "object" || typeof u === "string" || typeof u === "number") {
                s += this.renderTokens(r[4], t.push(u), n, i)
            } else if (f(u)) {
                if (typeof i !== "string")
                    throw new Error("Cannot use higher-order sections without the original template");
                u = u.call(t.view, i.slice(r[3], r[5]), o);
                if (u != null)
                    s += u
            } else {
                s += this.renderTokens(r[4], t, n, i)
            }
            return s
        }
        ;
        d.prototype.renderInverted = function e(r, t, n, i) {
            var a = t.lookup(r[1]);
            if (!a || w(a) && a.length === 0)
                return this.renderTokens(r[4], t, n, i)
        }
        ;
        d.prototype.renderPartial = function e(r, t, n, i) {
            if (!n)
                return;
            var a = f(n) ? n(r[1]) : n[r[1]];
            if (a != null)
                return this.renderTokens(this.parse(a, i), t, n, a)
        }
        ;
        d.prototype.unescapedValue = function e(r, t) {
            var n = t.lookup(r[1]);
            if (n != null)
                return n
        }
        ;
        d.prototype.escapedValue = function e(r, t) {
            var n = t.lookup(r[1]);
            if (n != null)
                return R.escape(n)
        }
        ;
        d.prototype.rawValue = function e(r) {
            return r[1]
        }
        ;
        R.name = "mustache.js";
        R.version = "3.0.1";
        R.tags = ["{{", "}}"];
        var y = new d;
        R.clearCache = function e() {
            return y.clearCache()
        }
        ;
        R.parse = function e(r, t) {
            return y.parse(r, t)
        }
        ;
        R.render = function e(r, t, n, i) {
            if (typeof r !== "string") {
                throw new TypeError('Invalid template! Template should be a "string" ' + 'but "' + a(r) + '" was given as the first ' + "argument for mustache#render(template, view, partials)")
            }
            return y.render(r, t, n, i)
        }
        ;
        R.to_html = function e(r, t, n, i) {
            var a = R.render(r, t, n);
            if (f(i)) {
                i(a)
            } else {
                return a
            }
        }
        ;
        R.escape = u;
        R.Scanner = O;
        R.Context = p;
        R.Writer = d;
        return R
    });
    (function(e, r) {
        if (typeof i === "function" && i.amd) {
            i(r)
        } else if (typeof n === "object") {
            module.exports = r()
        } else {
            e.jsonLogic = r()
        }
    }
    )(this, function() {
        "use strict";
        if (!Array.isArray) {
            Array.isArray = function(e) {
                return Object.prototype.toString.call(e) === "[object Array]"
            }
        }
        function i(e) {
            var r = [];
            for (var t = 0, n = e.length; t < n; t++) {
                if (r.indexOf(e[t]) === -1) {
                    r.push(e[t])
                }
            }
            return r
        }
        var p = {};
        var d = {
            "==": function(e, r) {
                return e == r
            },
            "===": function(e, r) {
                return e === r
            },
            "!=": function(e, r) {
                return e != r
            },
            "!==": function(e, r) {
                return e !== r
            },
            ">": function(e, r) {
                return e > r
            },
            ">=": function(e, r) {
                return e >= r
            },
            "<": function(e, r, t) {
                return t === undefined ? e < r : e < r && r < t
            },
            "<=": function(e, r, t) {
                return t === undefined ? e <= r : e <= r && r <= t
            },
            "!!": function(e) {
                return p.truthy(e)
            },
            "!": function(e) {
                return !p.truthy(e)
            },
            "%": function(e, r) {
                return e % r
            },
            log: function(e) {
                console.log(e);
                return e
            },
            in: function(e, r) {
                if (!r || typeof r.indexOf === "undefined")
                    return false;
                return r.indexOf(e) !== -1
            },
            cat: function() {
                return Array.prototype.join.call(arguments, "")
            },
            substr: function(e, r, t) {
                if (t < 0) {
                    var n = String(e).substr(r);
                    return n.substr(0, n.length + t)
                }
                return String(e).substr(r, t)
            },
            "+": function() {
                return Array.prototype.reduce.call(arguments, function(e, r) {
                    return parseFloat(e, 10) + parseFloat(r, 10)
                }, 0)
            },
            "*": function() {
                return Array.prototype.reduce.call(arguments, function(e, r) {
                    return parseFloat(e, 10) * parseFloat(r, 10)
                })
            },
            "-": function(e, r) {
                if (r === undefined) {
                    return -e
                } else {
                    return e - r
                }
            },
            "/": function(e, r) {
                return e / r
            },
            min: function() {
                return Math.min.apply(this, arguments)
            },
            max: function() {
                return Math.max.apply(this, arguments)
            },
            merge: function() {
                return Array.prototype.reduce.call(arguments, function(e, r) {
                    return e.concat(r)
                }, [])
            },
            var: function(e, r) {
                var t = r === undefined ? null : r;
                var n = this;
                if (typeof e === "undefined" || e === "" || e === null) {
                    return n
                }
                var i = String(e).split(".");
                for (var a = 0; a < i.length; a++) {
                    if (n === null) {
                        return t
                    }
                    n = n[i[a]];
                    if (n === undefined) {
                        return t
                    }
                }
                return n
            },
            missing: function() {
                var e = [];
                var r = Array.isArray(arguments[0]) ? arguments[0] : arguments;
                for (var t = 0; t < r.length; t++) {
                    var n = r[t];
                    var i = p.apply({
                        var: n
                    }, this);
                    if (i === null || i === "") {
                        e.push(n)
                    }
                }
                return e
            },
            missing_some: function(e, r) {
                var t = p.apply({
                    missing: r
                }, this);
                if (r.length - t.length >= e) {
                    return []
                } else {
                    return t
                }
            },
            method: function(e, r, t) {
                return e[r].apply(e, t)
            }
        };
        p.is_logic = function(e) {
            return typeof e === "object" && e !== null && !Array.isArray(e) && Object.keys(e).length === 1
        }
        ;
        p.truthy = function(e) {
            if (Array.isArray(e) && e.length === 0) {
                return false
            }
            return !!e
        }
        ;
        p.get_operator = function(e) {
            return Object.keys(e)[0]
        }
        ;
        p.get_values = function(e) {
            return e[p.get_operator(e)]
        }
        ;
        p.apply = function(e, r) {
            if (Array.isArray(e)) {
                return e.map(function(e) {
                    return p.apply(e, r)
                })
            }
            if (!p.is_logic(e)) {
                return e
            }
            r = r || {};
            var t = p.get_operator(e);
            var n = e[t];
            var i;
            var a;
            var s, u, o, l;
            if (!Array.isArray(n)) {
                n = [n]
            }
            if (t === "if" || t == "?:") {
                for (i = 0; i < n.length - 1; i += 2) {
                    if (p.truthy(p.apply(n[i], r))) {
                        return p.apply(n[i + 1], r)
                    }
                }
                if (n.length === i + 1)
                    return p.apply(n[i], r);
                return null
            } else if (t === "and") {
                for (i = 0; i < n.length; i += 1) {
                    a = p.apply(n[i], r);
                    if (!p.truthy(a)) {
                        return a
                    }
                }
                return a
            } else if (t === "or") {
                for (i = 0; i < n.length; i += 1) {
                    a = p.apply(n[i], r);
                    if (p.truthy(a)) {
                        return a
                    }
                }
                return a
            } else if (t === "filter") {
                u = p.apply(n[0], r);
                s = n[1];
                if (!Array.isArray(u)) {
                    return []
                }
                return u.filter(function(e) {
                    return p.truthy(p.apply(s, e))
                })
            } else if (t === "map") {
                u = p.apply(n[0], r);
                s = n[1];
                if (!Array.isArray(u)) {
                    return []
                }
                return u.map(function(e) {
                    return p.apply(s, e)
                })
            } else if (t === "reduce") {
                u = p.apply(n[0], r);
                s = n[1];
                l = typeof n[2] !== "undefined" ? n[2] : null;
                if (!Array.isArray(u)) {
                    return l
                }
                return u.reduce(function(e, r) {
                    return p.apply(s, {
                        current: r,
                        accumulator: e
                    })
                }, l)
            } else if (t === "all") {
                u = p.apply(n[0], r);
                s = n[1];
                if (!u.length) {
                    return false
                }
                for (i = 0; i < u.length; i += 1) {
                    if (!p.truthy(p.apply(s, u[i]))) {
                        return false
                    }
                }
                return true
            } else if (t === "none") {
                o = p.apply({
                    filter: n
                }, r);
                return o.length === 0
            } else if (t === "some") {
                o = p.apply({
                    filter: n
                }, r);
                return o.length > 0
            }
            n = n.map(function(e) {
                return p.apply(e, r)
            });
            if (typeof d[t] === "function") {
                return d[t].apply(r, n)
            } else if (t.indexOf(".") > 0) {
                var c = String(t).split(".");
                var f = d;
                for (i = 0; i < c.length; i++) {
                    f = f[c[i]];
                    if (f === undefined) {
                        throw new Error("Unrecognized operation " + t + " (failed at " + c.slice(0, i + 1).join(".") + ")")
                    }
                }
                return f.apply(r, n)
            }
            throw new Error("Unrecognized operation " + t)
        }
        ;
        p.uses_data = function(e) {
            var r = [];
            if (p.is_logic(e)) {
                var t = p.get_operator(e);
                var n = e[t];
                if (!Array.isArray(n)) {
                    n = [n]
                }
                if (t === "var") {
                    r.push(n[0])
                } else {
                    n.map(function(e) {
                        r.push.apply(r, p.uses_data(e))
                    })
                }
            }
            return i(r)
        }
        ;
        p.add_operation = function(e, r) {
            d[e] = r
        }
        ;
        p.rm_operation = function(e) {
            delete d[e]
        }
        ;
        p.rule_like = function(e, r) {
            if (r === e) {
                return true
            }
            if (r === "@") {
                return true
            }
            if (r === "number") {
                return typeof e === "number"
            }
            if (r === "string") {
                return typeof e === "string"
            }
            if (r === "array") {
                return Array.isArray(e) && !p.is_logic(e)
            }
            if (p.is_logic(r)) {
                if (p.is_logic(e)) {
                    var t = p.get_operator(r);
                    var n = p.get_operator(e);
                    if (t === "@" || t === n) {
                        return p.rule_like(p.get_values(e, false), p.get_values(r, false))
                    }
                }
                return false
            }
            if (Array.isArray(r)) {
                if (Array.isArray(e)) {
                    if (r.length !== e.length) {
                        return false
                    }
                    for (var i = 0; i < r.length; i += 1) {
                        if (!p.rule_like(e[i], r[i])) {
                            return false
                        }
                    }
                    return true
                } else {
                    return false
                }
            }
            return false
        }
        ;
        return p
    })
}
)();
