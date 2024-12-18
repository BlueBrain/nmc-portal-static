YUI.add(
  "event-touch",
  function (e, t) {
      var n = "scale",
          r = "rotation",
          i = "identifier",
          s = e.config.win,
          o = {};
      (e.DOMEventFacade.prototype._touch = function (t, s, o) {
          var u, a, f, l, c;
          if (t.touches) {
              (this.touches = []), (c = {});
              for (u = 0, a = t.touches.length; u < a; ++u) (l = t.touches[u]), (c[e.stamp(l)] = this.touches[u] = new e.DOMEventFacade(l, s, o));
          }
          if (t.targetTouches) {
              this.targetTouches = [];
              for (u = 0, a = t.targetTouches.length; u < a; ++u) (l = t.targetTouches[u]), (f = c && c[e.stamp(l, !0)]), (this.targetTouches[u] = f || new e.DOMEventFacade(l, s, o));
          }
          if (t.changedTouches) {
              this.changedTouches = [];
              for (u = 0, a = t.changedTouches.length; u < a; ++u) (l = t.changedTouches[u]), (f = c && c[e.stamp(l, !0)]), (this.changedTouches[u] = f || new e.DOMEventFacade(l, s, o));
          }
          n in t && (this[n] = t[n]), r in t && (this[r] = t[r]), i in t && (this[i] = t[i]);
      }),
          e.Node.DOM_EVENTS && e.mix(e.Node.DOM_EVENTS, { touchstart: 1, touchmove: 1, touchend: 1, touchcancel: 1, gesturestart: 1, gesturechange: 1, gestureend: 1, MSPointerDown: 1, MSPointerUp: 1, MSPointerMove: 1 }),
          s && "ontouchstart" in s && !(e.UA.chrome && e.UA.chrome < 6)
              ? ((o.start = "touchstart"), (o.end = "touchend"), (o.move = "touchmove"), (o.cancel = "touchcancel"))
              : s && "msPointerEnabled" in s.navigator
              ? ((o.start = "MSPointerDown"), (o.end = "MSPointerUp"), (o.move = "MSPointerMove"), (o.cancel = "MSPointerCancel"))
              : ((o.start = "mousedown"), (o.end = "mouseup"), (o.move = "mousemove"), (o.cancel = "mousecancel")),
          (e.Event._GESTURE_MAP = o);
  },
  "patched-v3.11.0",
  { requires: ["node-base"] }
);
YUI.add(
  "event-move",
  function (e, t) {
      var n = e.Event._GESTURE_MAP,
          r = { start: n.start, end: n.end, move: n.move },
          i = "start",
          s = "move",
          o = "end",
          u = "gesture" + s,
          a = u + o,
          f = u + i,
          l = "_msh",
          c = "_mh",
          h = "_meh",
          p = "_dmsh",
          d = "_dmh",
          v = "_dmeh",
          m = "_ms",
          g = "_m",
          y = "minTime",
          b = "minDistance",
          w = "preventDefault",
          E = "button",
          S = "ownerDocument",
          x = "currentTarget",
          T = "target",
          N = "nodeType",
          C = e.config.win && "msPointerEnabled" in e.config.win.navigator,
          k = "msTouchActionCount",
          L = "msInitTouchAction",
          A = function (t, n, r) {
              var i = r ? 4 : 3,
                  s = n.length > i ? e.merge(n.splice(i, 1)[0]) : {};
              return w in s || (s[w] = t.PREVENT_DEFAULT), s;
          },
          O = function (e, t) {
              return t._extra.root || e.get(N) === 9 ? e : e.get(S);
          },
          M = function (t) {
              var n = t.getDOMNode();
              return t.compareTo(e.config.doc) && n.documentElement ? n.documentElement : !1;
          },
          _ = function (e, t, n) {
              (e.pageX = t.pageX), (e.pageY = t.pageY), (e.screenX = t.screenX), (e.screenY = t.screenY), (e.clientX = t.clientX), (e.clientY = t.clientY), (e[T] = e[T] || t[T]), (e[x] = e[x] || t[x]), (e[E] = (n && n[E]) || 1);
          },
          D = function (t) {
              var n = M(t) || t.getDOMNode(),
                  r = t.getData(k);
              C && (r || ((r = 0), t.setData(L, n.style.msTouchAction)), (n.style.msTouchAction = e.Event._DEFAULT_TOUCH_ACTION), r++, t.setData(k, r));
          },
          P = function (e) {
              var t = M(e) || e.getDOMNode(),
                  n = e.getData(k),
                  r = e.getData(L);
              C && (n--, e.setData(k, n), n === 0 && t.style.msTouchAction !== r && (t.style.msTouchAction = r));
          },
          H = function (e, t) {
              t && (!t.call || t(e)) && e.preventDefault();
          },
          B = e.Event.define;
      (e.Event._DEFAULT_TOUCH_ACTION = "none"),
          B(f, {
              on: function (e, t, n) {
                  D(e), (t[l] = e.on(r[i], this._onStart, this, e, t, n));
              },
              delegate: function (e, t, n, s) {
                  var o = this;
                  t[p] = e.delegate(
                      r[i],
                      function (r) {
                          o._onStart(r, e, t, n, !0);
                      },
                      s
                  );
              },
              detachDelegate: function (e, t, n, r) {
                  var i = t[p];
                  i && (i.detach(), (t[p] = null)), P(e);
              },
              detach: function (e, t, n) {
                  var r = t[l];
                  r && (r.detach(), (t[l] = null)), P(e);
              },
              processArgs: function (e, t) {
                  var n = A(this, e, t);
                  return y in n || (n[y] = this.MIN_TIME), b in n || (n[b] = this.MIN_DISTANCE), n;
              },
              _onStart: function (t, n, i, u, a) {
                  a && (n = t[x]);
                  var f = i._extra,
                      l = !0,
                      c = f[y],
                      h = f[b],
                      p = f.button,
                      d = f[w],
                      v = O(n, i),
                      m;
                  t.touches ? (t.touches.length === 1 ? _(t, t.touches[0], f) : (l = !1)) : (l = p === undefined || p === t.button),
                      l &&
                          (H(t, d),
                          c === 0 || h === 0
                              ? this._start(t, n, u, f)
                              : ((m = [t.pageX, t.pageY]),
                                c > 0 &&
                                    ((f._ht = e.later(c, this, this._start, [t, n, u, f])),
                                    (f._hme = v.on(
                                        r[o],
                                        e.bind(function () {
                                            this._cancel(f);
                                        }, this)
                                    ))),
                                h > 0 &&
                                    (f._hm = v.on(
                                        r[s],
                                        e.bind(function (e) {
                                            (Math.abs(e.pageX - m[0]) > h || Math.abs(e.pageY - m[1]) > h) && this._start(t, n, u, f);
                                        }, this)
                                    ))));
              },
              _cancel: function (e) {
                  e._ht && (e._ht.cancel(), (e._ht = null)), e._hme && (e._hme.detach(), (e._hme = null)), e._hm && (e._hm.detach(), (e._hm = null));
              },
              _start: function (e, t, n, r) {
                  r && this._cancel(r), (e.type = f), t.setData(m, e), n.fire(e);
              },
              MIN_TIME: 0,
              MIN_DISTANCE: 0,
              PREVENT_DEFAULT: !1,
          }),
          B(u, {
              on: function (e, t, n) {
                  D(e);
                  var i = O(e, t, r[s]),
                      o = i.on(r[s], this._onMove, this, e, t, n);
                  t[c] = o;
              },
              delegate: function (e, t, n, i) {
                  var o = this;
                  t[d] = e.delegate(
                      r[s],
                      function (r) {
                          o._onMove(r, e, t, n, !0);
                      },
                      i
                  );
              },
              detach: function (e, t, n) {
                  var r = t[c];
                  r && (r.detach(), (t[c] = null)), P(e);
              },
              detachDelegate: function (e, t, n, r) {
                  var i = t[d];
                  i && (i.detach(), (t[d] = null)), P(e);
              },
              processArgs: function (e, t) {
                  return A(this, e, t);
              },
              _onMove: function (e, t, n, r, i) {
                  i && (t = e[x]);
                  var s = n._extra.standAlone || t.getData(m),
                      o = n._extra.preventDefault;
                  s && (e.touches && (e.touches.length === 1 ? _(e, e.touches[0]) : (s = !1)), s && (H(e, o), (e.type = u), r.fire(e)));
              },
              PREVENT_DEFAULT: !1,
          }),
          B(a, {
              on: function (e, t, n) {
                  D(e);
                  var i = O(e, t),
                      s = i.on(r[o], this._onEnd, this, e, t, n);
                  t[h] = s;
              },
              delegate: function (e, t, n, i) {
                  var s = this;
                  t[v] = e.delegate(
                      r[o],
                      function (r) {
                          s._onEnd(r, e, t, n, !0);
                      },
                      i
                  );
              },
              detachDelegate: function (e, t, n, r) {
                  var i = t[v];
                  i && (i.detach(), (t[v] = null)), P(e);
              },
              detach: function (e, t, n) {
                  var r = t[h];
                  r && (r.detach(), (t[h] = null)), P(e);
              },
              processArgs: function (e, t) {
                  return A(this, e, t);
              },
              _onEnd: function (e, t, n, r, i) {
                  i && (t = e[x]);
                  var s = n._extra.standAlone || t.getData(g) || t.getData(m),
                      o = n._extra.preventDefault;
                  s && (e.changedTouches && (e.changedTouches.length === 1 ? _(e, e.changedTouches[0]) : (s = !1)), s && (H(e, o), (e.type = a), r.fire(e), t.clearData(m), t.clearData(g)));
              },
              PREVENT_DEFAULT: !1,
          });
  },
  "patched-v3.11.0",
  { requires: ["node-base", "event-touch", "event-synthetic"] }
);
