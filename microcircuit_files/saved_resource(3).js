YUI.add(
  "transition",
  function (e, t) {
      var n = "",
          r = "",
          i = e.config.doc,
          s = "documentElement",
          o = i[s].style,
          u = "transition",
          a = "transitionProperty",
          f,
          l,
          c,
          h,
          p,
          d,
          v = {},
          m = ["Webkit", "Moz"],
          g = { Webkit: "webkitTransitionEnd" },
          y = function () {
              this.init.apply(this, arguments);
          };
      (y._TRANSFORM = "transform"),
          (y._toCamel = function (e) {
              return (
                  (e = e.replace(/-([a-z])/gi, function (e, t) {
                      return t.toUpperCase();
                  })),
                  e
              );
          }),
          (y._toHyphen = function (e) {
              return (
                  (e = e.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function (e, t, n, r) {
                      var i = (t ? "-" + t.toLowerCase() : "") + n;
                      return r && (i += "-" + r.toLowerCase()), i;
                  })),
                  e
              );
          }),
          (y.SHOW_TRANSITION = "fadeIn"),
          (y.HIDE_TRANSITION = "fadeOut"),
          (y.useNative = !1),
          "transition" in o && "transitionProperty" in o && "transitionDuration" in o && "transitionTimingFunction" in o && "transitionDelay" in o
              ? ((y.useNative = !0), (y.supported = !0))
              : e.Array.each(m, function (e) {
                    var t = e + "Transition";
                    t in i[s].style && ((n = e), (r = y._toHyphen(e) + "-"), (y.useNative = !0), (y.supported = !0), (y._VENDOR_PREFIX = e));
                }),
          typeof o.transform == "undefined" &&
              e.Array.each(m, function (e) {
                  var t = e + "Transform";
                  typeof o[t] != "undefined" && (y._TRANSFORM = t);
              }),
          n && ((u = n + "Transition"), (a = n + "TransitionProperty")),
          (f = r + "transition-property"),
          (l = r + "transition-duration"),
          (c = r + "transition-timing-function"),
          (h = r + "transition-delay"),
          (p = "transitionend"),
          (d = "on" + n.toLowerCase() + "transitionend"),
          (p = g[n] || p),
          (y.fx = {}),
          (y.toggles = {}),
          (y._hasEnd = {}),
          (y._reKeywords = /^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i),
          (e.Node.DOM_EVENTS[p] = 1),
          (y.NAME = "transition"),
          (y.DEFAULT_EASING = "ease"),
          (y.DEFAULT_DURATION = 0.5),
          (y.DEFAULT_DELAY = 0),
          (y._nodeAttrs = {}),
          (y.prototype = {
              constructor: y,
              init: function (e, t) {
                  var n = this;
                  return (
                      (n._node = e),
                      !n._running &&
                          t &&
                          ((n._config = t),
                          (e._transition = n),
                          (n._duration = "duration" in t ? t.duration : n.constructor.DEFAULT_DURATION),
                          (n._delay = "delay" in t ? t.delay : n.constructor.DEFAULT_DELAY),
                          (n._easing = t.easing || n.constructor.DEFAULT_EASING),
                          (n._count = 0),
                          (n._running = !1)),
                      n
                  );
              },
              addProperty: function (t, n) {
                  var r = this,
                      i = this._node,
                      s = e.stamp(i),
                      o = e.one(i),
                      u = y._nodeAttrs[s],
                      a,
                      f,
                      l,
                      c,
                      h;
                  u || (u = y._nodeAttrs[s] = {}),
                      (c = u[t]),
                      n && n.value !== undefined ? (h = n.value) : n !== undefined && ((h = n), (n = v)),
                      typeof h == "function" && (h = h.call(o, o)),
                      c && c.transition && c.transition !== r && c.transition._count--,
                      r._count++,
                      (l = (typeof n.duration != "undefined" ? n.duration : r._duration) || 1e-4),
                      (u[t] = { value: h, duration: l, delay: typeof n.delay != "undefined" ? n.delay : r._delay, easing: n.easing || r._easing, transition: r }),
                      (a = e.DOM.getComputedStyle(i, t)),
                      (f = typeof h == "string" ? a : parseFloat(a)),
                      y.useNative &&
                          f === h &&
                          setTimeout(function () {
                              r._onNativeEnd.call(i, { propertyName: t, elapsedTime: l });
                          }, l * 1e3);
              },
              removeProperty: function (t) {
                  var n = this,
                      r = y._nodeAttrs[e.stamp(n._node)];
                  r && r[t] && (delete r[t], n._count--);
              },
              initAttrs: function (t) {
                  var n,
                      r = this._node;
                  t.transform && !t[y._TRANSFORM] && ((t[y._TRANSFORM] = t.transform), delete t.transform);
                  for (n in t) t.hasOwnProperty(n) && !y._reKeywords.test(n) && (this.addProperty(n, t[n]), r.style[n] === "" && e.DOM.setStyle(r, n, e.DOM.getComputedStyle(r, n)));
              },
              run: function (t) {
                  var n = this,
                      r = n._node,
                      i = n._config,
                      s = { type: "transition:start", config: i };
                  return n._running || ((n._running = !0), i.on && i.on.start && i.on.start.call(e.one(r), s), n.initAttrs(n._config), (n._callback = t), n._start()), n;
              },
              _start: function () {
                  this._runNative();
              },
              _prepDur: function (e) {
                  return (e = parseFloat(e) * 1e3), e + "ms";
              },
              _runNative: function () {
                  var t = this,
                      n = t._node,
                      r = e.stamp(n),
                      i = n.style,
                      s = n.ownerDocument.defaultView.getComputedStyle(n),
                      o = y._nodeAttrs[r],
                      u = "",
                      a = s[y._toCamel(f)],
                      d = f + ": ",
                      v = l + ": ",
                      m = c + ": ",
                      g = h + ": ",
                      b,
                      w,
                      E;
                  a !== "all" && ((d += a + ","), (v += s[y._toCamel(l)] + ","), (m += s[y._toCamel(c)] + ","), (g += s[y._toCamel(h)] + ","));
                  for (E in o)
                      (b = y._toHyphen(E)),
                          (w = o[E]),
                          (w = o[E]) &&
                              w.transition === t &&
                              (E in n.style ? ((v += t._prepDur(w.duration) + ","), (g += t._prepDur(w.delay) + ","), (m += w.easing + ","), (d += b + ","), (u += b + ": " + w.value + "; ")) : this.removeProperty(E));
                  (d = d.replace(/,$/, ";")),
                      (v = v.replace(/,$/, ";")),
                      (m = m.replace(/,$/, ";")),
                      (g = g.replace(/,$/, ";")),
                      y._hasEnd[r] || (n.addEventListener(p, t._onNativeEnd, ""), (y._hasEnd[r] = !0)),
                      (i.cssText += d + v + m + g + u);
              },
              _end: function (t) {
                  var n = this,
                      r = n._node,
                      i = n._callback,
                      s = n._config,
                      o = { type: "transition:end", config: s, elapsedTime: t },
                      u = e.one(r);
                  (n._running = !1),
                      (n._callback = null),
                      r &&
                          (s.on && s.on.end
                              ? setTimeout(function () {
                                    s.on.end.call(u, o), i && i.call(u, o);
                                }, 1)
                              : i &&
                                setTimeout(function () {
                                    i.call(u, o);
                                }, 1));
              },
              _endNative: function (e) {
                  var t = this._node,
                      n = t.ownerDocument.defaultView.getComputedStyle(t, "")[y._toCamel(f)];
                  (e = y._toHyphen(e)), typeof n == "string" && ((n = n.replace(new RegExp("(?:^|,\\s)" + e + ",?"), ",")), (n = n.replace(/^,|,$/, "")), (t.style[u] = n));
              },
              _onNativeEnd: function (t) {
                  var n = this,
                      r = e.stamp(n),
                      i = t,
                      s = y._toCamel(i.propertyName),
                      o = i.elapsedTime,
                      u = y._nodeAttrs[r],
                      f = u[s],
                      l = f ? f.transition : null,
                      c,
                      h;
                  l &&
                      (l.removeProperty(s),
                      l._endNative(s),
                      (h = l._config[s]),
                      (c = { type: "propertyEnd", propertyName: s, elapsedTime: o, config: h }),
                      h && h.on && h.on.end && h.on.end.call(e.one(n), c),
                      l._count <= 0 && (l._end(o), (n.style[a] = "")));
              },
              destroy: function () {
                  var e = this,
                      t = e._node;
                  t && (t.removeEventListener(p, e._onNativeEnd, !1), (e._node = null));
              },
          }),
          (e.Transition = y),
          (e.TransitionNative = y),
          (e.Node.prototype.transition = function (t, n, r) {
              var i = y._nodeAttrs[e.stamp(this._node)],
                  s = i ? i.transition || null : null,
                  o,
                  u;
              if (typeof t == "string") {
                  typeof n == "function" && ((r = n), (n = null)), (o = y.fx[t]);
                  if (n && typeof n != "boolean") {
                      n = e.clone(n);
                      for (u in o) o.hasOwnProperty(u) && (u in n || (n[u] = o[u]));
                  } else n = o;
              } else (r = n), (n = t);
              return s && !s._running ? s.init(this, n) : (s = new y(this._node, n)), s.run(r), this;
          }),
          (e.Node.prototype.show = function (t, n, r) {
              return this._show(), t && e.Transition && (typeof t != "string" && !t.push && (typeof n == "function" && ((r = n), (n = t)), (t = y.SHOW_TRANSITION)), this.transition(t, n, r)), this;
          }),
          (e.NodeList.prototype.show = function (t, n, r) {
              var i = this._nodes,
                  s = 0,
                  o;
              while ((o = i[s++])) e.one(o).show(t, n, r);
              return this;
          });
      var b = function (e, t, n) {
          return function () {
              t && t.call(e), n && typeof n == "function" && n.apply(e._node, arguments);
          };
      };
      (e.Node.prototype.hide = function (t, n, r) {
          return (
              t && e.Transition
                  ? (typeof n == "function" && ((r = n), (n = null)), (r = b(this, this._hide, r)), typeof t != "string" && !t.push && (typeof n == "function" && ((r = n), (n = t)), (t = y.HIDE_TRANSITION)), this.transition(t, n, r))
                  : this._hide(),
              this
          );
      }),
          (e.NodeList.prototype.hide = function (t, n, r) {
              var i = this._nodes,
                  s = 0,
                  o;
              while ((o = i[s++])) e.one(o).hide(t, n, r);
              return this;
          }),
          (e.NodeList.prototype.transition = function (t, n) {
              var r = this._nodes,
                  i = 0,
                  s;
              while ((s = r[i++])) e.one(s).transition(t, n);
              return this;
          }),
          (e.Node.prototype.toggleView = function (t, n, r) {
              (this._toggles = this._toggles || []), (r = arguments[arguments.length - 1]);
              if (typeof t != "string") {
                  (n = t), this._toggleView(n, r);
                  return;
              }
              return (
                  typeof n == "function" && (n = undefined),
                  typeof n == "undefined" && t in this._toggles && (n = !this._toggles[t]),
                  (n = n ? 1 : 0),
                  n ? this._show() : (r = b(this, this._hide, r)),
                  (this._toggles[t] = n),
                  this.transition(e.Transition.toggles[t][n], r),
                  this
              );
          }),
          (e.NodeList.prototype.toggleView = function (t, n, r) {
              var i = this._nodes,
                  s = 0,
                  o;
              while ((o = i[s++])) (o = e.one(o)), o.toggleView.apply(o, arguments);
              return this;
          }),
          e.mix(y.fx, {
              fadeOut: { opacity: 0, duration: 0.5, easing: "ease-out" },
              fadeIn: { opacity: 1, duration: 0.5, easing: "ease-in" },
              sizeOut: { height: 0, width: 0, duration: 0.75, easing: "ease-out" },
              sizeIn: {
                  height: function (e) {
                      return e.get("scrollHeight") + "px";
                  },
                  width: function (e) {
                      return e.get("scrollWidth") + "px";
                  },
                  duration: 0.5,
                  easing: "ease-in",
                  on: {
                      start: function () {
                          var e = this.getStyle("overflow");
                          e !== "hidden" && (this.setStyle("overflow", "hidden"), (this._transitionOverflow = e));
                      },
                      end: function () {
                          this._transitionOverflow && (this.setStyle("overflow", this._transitionOverflow), delete this._transitionOverflow);
                      },
                  },
              },
          }),
          e.mix(y.toggles, { size: ["sizeOut", "sizeIn"], fade: ["fadeOut", "fadeIn"] });
  },
  "patched-v3.11.0",
  { requires: ["node-style"] }
);
YUI.add(
  "base-core",
  function (e, t) {
      function v(e) {
          this._BaseInvoked || ((this._BaseInvoked = !0), this._initBase(e));
      }
      var n = e.Object,
          r = e.Lang,
          i = ".",
          s = "initialized",
          o = "destroyed",
          u = "initializer",
          a = "value",
          f = Object.prototype.constructor,
          l = "deep",
          c = "shallow",
          h = "destructor",
          p = e.AttributeCore,
          d = function (e, t, n) {
              var r;
              for (r in t) n[r] && (e[r] = t[r]);
              return e;
          };
      (v._ATTR_CFG = p._ATTR_CFG.concat("cloneDefaultValue")),
          (v._NON_ATTRS_CFG = ["plugins"]),
          (v.NAME = "baseCore"),
          (v.ATTRS = { initialized: { readOnly: !0, value: !1 }, destroyed: { readOnly: !0, value: !1 } }),
          (v.modifyAttrs = function (t, n) {
              typeof t != "function" && ((n = t), (t = this));
              var r, i, s;
              r = t.ATTRS || (t.ATTRS = {});
              if (n) {
                  t._CACHED_CLASS_DATA = null;
                  for (s in n) n.hasOwnProperty(s) && ((i = r[s] || (r[s] = {})), e.mix(i, n[s], !0));
              }
          }),
          (v.prototype = {
              _initBase: function (t) {
                  e.stamp(this), this._initAttribute(t);
                  var n = e.Plugin && e.Plugin.Host;
                  this._initPlugins && n && n.call(this), this._lazyAddAttrs !== !1 && (this._lazyAddAttrs = !0), (this.name = this.constructor.NAME), this.init.apply(this, arguments);
              },
              _initAttribute: function () {
                  p.call(this);
              },
              init: function (e) {
                  return this._baseInit(e), this;
              },
              _baseInit: function (e) {
                  this._initHierarchy(e), this._initPlugins && this._initPlugins(e), this._set(s, !0);
              },
              destroy: function () {
                  return this._baseDestroy(), this;
              },
              _baseDestroy: function () {
                  this._destroyPlugins && this._destroyPlugins(), this._destroyHierarchy(), this._set(o, !0);
              },
              _getClasses: function () {
                  return this._classes || this._initHierarchyData(), this._classes;
              },
              _getAttrCfgs: function () {
                  return this._attrs || this._initHierarchyData(), this._attrs;
              },
              _getInstanceAttrCfgs: function (e) {
                  var t = {},
                      r,
                      i,
                      s,
                      o,
                      u,
                      a,
                      f,
                      l = e._subAttrs,
                      c = this._attrCfgHash();
                  for (a in e)
                      if (e.hasOwnProperty(a) && a !== "_subAttrs") {
                          (f = e[a]), (r = t[a] = d({}, f, c)), (i = r.value), i && typeof i == "object" && this._cloneDefaultValue(a, r);
                          if (l && l.hasOwnProperty(a)) {
                              o = e._subAttrs[a];
                              for (u in o) (s = o[u]), s.path && n.setValue(r.value, s.path, s.value);
                          }
                      }
                  return t;
              },
              _filterAdHocAttrs: function (e, t) {
                  var n,
                      r = this._nonAttrs,
                      i;
                  if (t) {
                      n = {};
                      for (i in t) !e[i] && !r[i] && t.hasOwnProperty(i) && (n[i] = { value: t[i] });
                  }
                  return n;
              },
              _initHierarchyData: function () {
                  var e = this.constructor,
                      t = e._CACHED_CLASS_DATA,
                      n,
                      r,
                      i,
                      s,
                      o,
                      u = !e._ATTR_CFG_HASH,
                      a,
                      f = {},
                      l = [],
                      c = [];
                  n = e;
                  if (!t) {
                      while (n) {
                          (l[l.length] = n), n.ATTRS && (c[c.length] = n.ATTRS);
                          if (u) {
                              (s = n._ATTR_CFG), (o = o || {});
                              if (s) for (r = 0, i = s.length; r < i; r += 1) o[s[r]] = !0;
                          }
                          a = n._NON_ATTRS_CFG;
                          if (a) for (r = 0, i = a.length; r < i; r++) f[a[r]] = !0;
                          n = n.superclass ? n.superclass.constructor : null;
                      }
                      u && (e._ATTR_CFG_HASH = o), (t = e._CACHED_CLASS_DATA = { classes: l, nonAttrs: f, attrs: this._aggregateAttrs(c) });
                  }
                  (this._classes = t.classes), (this._attrs = t.attrs), (this._nonAttrs = t.nonAttrs);
              },
              _attrCfgHash: function () {
                  return this.constructor._ATTR_CFG_HASH;
              },
              _cloneDefaultValue: function (t, n) {
                  var i = n.value,
                      s = n.cloneDefaultValue;
                  s === l || s === !0 ? (n.value = e.clone(i)) : s === c ? (n.value = e.merge(i)) : s === undefined && (f === i.constructor || r.isArray(i)) && (n.value = e.clone(i));
              },
              _aggregateAttrs: function (e) {
                  var t,
                      n,
                      r,
                      s,
                      o,
                      u,
                      f = this._attrCfgHash(),
                      l,
                      c = {};
                  if (e)
                      for (u = e.length - 1; u >= 0; --u) {
                          n = e[u];
                          for (t in n)
                              n.hasOwnProperty(t) &&
                                  ((s = d({}, n[t], f)),
                                  (o = null),
                                  t.indexOf(i) !== -1 && ((o = t.split(i)), (t = o.shift())),
                                  (l = c[t]),
                                  o && l && l.value
                                      ? ((r = c._subAttrs), r || (r = c._subAttrs = {}), r[t] || (r[t] = {}), (r[t][o.join(i)] = { value: s.value, path: o }))
                                      : o || (l ? (l.valueFn && a in s && (l.valueFn = null), d(l, s, f)) : (c[t] = s)));
                      }
                  return c;
              },
              _initHierarchy: function (e) {
                  var t = this._lazyAddAttrs,
                      n,
                      r,
                      i,
                      s,
                      o,
                      a,
                      f,
                      l,
                      c,
                      h,
                      p,
                      d = [],
                      v = this._getClasses(),
                      m = this._getAttrCfgs(),
                      g = v.length - 1;
                  for (o = g; o >= 0; o--) {
                      (n = v[o]), (r = n.prototype), (h = n._yuibuild && n._yuibuild.exts), r.hasOwnProperty(u) && (d[d.length] = r.initializer);
                      if (h) for (a = 0, f = h.length; a < f; a++) (l = h[a]), l.apply(this, arguments), (c = l.prototype), c.hasOwnProperty(u) && (d[d.length] = c.initializer);
                  }
                  (p = this._getInstanceAttrCfgs(m)), this._preAddAttrs && this._preAddAttrs(p, e, t), this._allowAdHocAttrs && this.addAttrs(this._filterAdHocAttrs(m, e), e, t), this.addAttrs(p, e, t);
                  for (i = 0, s = d.length; i < s; i++) d[i].apply(this, arguments);
              },
              _destroyHierarchy: function () {
                  var e,
                      t,
                      n,
                      r,
                      i,
                      s,
                      o,
                      u,
                      a = this._getClasses();
                  for (n = 0, r = a.length; n < r; n++) {
                      (e = a[n]), (t = e.prototype), (o = e._yuibuild && e._yuibuild.exts);
                      if (o) for (i = 0, s = o.length; i < s; i++) (u = o[i].prototype), u.hasOwnProperty(h) && u.destructor.apply(this, arguments);
                      t.hasOwnProperty(h) && t.destructor.apply(this, arguments);
                  }
              },
              toString: function () {
                  return this.name + "[" + e.stamp(this, !0) + "]";
              },
          }),
          e.mix(v, p, !1, null, 1),
          (v.prototype.constructor = v),
          (e.BaseCore = v);
  },
  "patched-v3.11.0",
  { requires: ["attribute-core"] }
);
YUI.add(
  "aui-toggler-delegate",
  function (e, t) {
      var n = e.Lang,
          r = n.isBoolean,
          i = n.isObject,
          s = n.isString,
          o = e.Array,
          u = e.config.doc,
          a = e.Toggler,
          f = ".",
          l = "animated",
          c = "click",
          h = "closeAllOnExpand",
          p = "collapsed",
          d = "container",
          v = "content",
          m = "cubic-bezier(0, 0.1, 0, 1.0)",
          g = "expanded",
          y = "firstChild",
          b = "header",
          w = "keydown",
          E = "toggler",
          S = "toggler:animatingChange",
          x = "toggler-delegate",
          T = "transition",
          N = "wrapper",
          C = e.getClassName,
          k = C(E, v, N),
          L = C(E, b, p),
          A = C(E, b, g),
          O = e.Component.create({
              NAME: x,
              ATTRS: {
                  animated: { validator: r, value: !1, writeOnce: !0 },
                  closeAllOnExpand: { validator: r, value: !1 },
                  container: { setter: e.one, value: u },
                  content: { validator: s },
                  expanded: { validator: r, value: !0 },
                  header: { validator: s },
                  transition: { validator: i, value: { duration: 0.4, easing: m } },
              },
              EXTENDS: e.Base,
              prototype: {
                  items: null,
                  initializer: function () {
                      var e = this;
                      (e.items = []), e.bindUI(), e.renderUI();
                  },
                  renderUI: function () {
                      var e = this;
                      e.get(h) && e.createAll();
                  },
                  bindUI: function () {
                      var t = this,
                          n = t.get(d),
                          r = t.get(b);
                      console.log('this', this);
                      console.log('n', n);
                      t._eventHandles = [n.delegate([c, w], e.bind("headerEventHandler", t), r), t.on(S, e.bind("_onAnimatingChange", t))];
                  },
                  destructor: function () {
                      var t = this;
                      o.each(t.items, function (e) {
                          e.destroy();
                      }),
                          (t.items = null),
                          new e.EventHandle(t._eventHandles).detach();
                  },
                  collapseAll: function (t) {
                      var n = this;
                      n.createAll(), e.Array.invoke(n.items, "collapse", t);
                  },
                  createAll: function () {
                      var e = this;
                      e.get(d)
                          .all(e.get(b))
                          .each(function (t) {
                              t.getData(E) || e._create(t);
                          });
                  },
                  expandAll: function (t) {
                      var n = this;
                      n.createAll(), e.Array.invoke(n.items, "expand", t);
                  },
                  findContentNode: function (e) {
                      var t = this,
                          n = t.get(v),
                          r = e.next(n) || e.one(n);
                      if (!r) {
                          var i = e.next(f + k);
                          i && (r = i.get(y));
                      }
                      return r;
                  },
                  headerEventHandler: function (e) {
                      var t = this;
                      if (t.animating) return !1;
                      var n = e.currentTarget,
                          r = n.getData(E) || t._create(n);
                      if (a.headerEventHandler(e, r) && t.get(h)) {
                          var i = r.get(v).ancestor(t.get(v));
                          o.each(t.items, function (e) {
                              if (e !== r && e.get(g))
                                  if (i) {
                                      var t = e.get(v);
                                      t !== i && i.contains(t) && e.collapse();
                                  } else e.collapse();
                          });
                      }
                  },
                  _create: function (e) {
                      var t = this,
                          n = t.get(g);
                      e.hasClass(A) ? (n = !0) : e.hasClass(L) && (n = !1);
                      var r = new a({ animated: t.get(l), bindDOMEvents: !1, bubbleTargets: [t], content: t.findContentNode(e), expanded: n, header: e, transition: t.get(T) });
                      return t.items.push(r), r;
                  },
                  _onAnimatingChange: function (e) {
                      var t = this;
                      t.animating = e.newVal;
                  },
              },
          });
      e.TogglerDelegate = O;
  },
  "2.0.0",
  { requires: ["array-invoke", "node-event-delegate", "aui-toggler-base"] }
);
YUI.add(
  "aui-widget-toggle",
  function (e, t) {
      function r() {}
      var n = "visible";
      (r.prototype = {
          toggle: function (t) {
              var r = this;
              return e.Lang.isBoolean(t) || (t = !r.get(n)), r.set(n, t);
          },
      }),
          (e.WidgetToggle = r);
  },
  "2.0.0"
);
YUI.add(
  "escape",
  function (e, t) {
      var n = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "/": "&#x2F;", "`": "&#x60;" },
          r = {
              html: function (e) {
                  return (e + "").replace(/[&<>"'\/`]/g, r._htmlReplacer);
              },
              regex: function (e) {
                  return (e + "").replace(/[\-$\^*()+\[\]{}|\\,.?\s]/g, "\\$&");
              },
              _htmlReplacer: function (e) {
                  return n[e];
              },
          };
      (r.regexp = r.regex), (e.Escape = r);
  },
  "patched-v3.11.0",
  { requires: ["yui-base"] }
);
YUI.add(
  "querystring-stringify",
  function (e, t) {
      var n = e.namespace("QueryString"),
          r = [],
          i = e.Lang;
      (n.escape = encodeURIComponent),
          (n.stringify = function (e, t, s) {
              var o,
                  u,
                  a,
                  f,
                  l,
                  c,
                  h = t && t.sep ? t.sep : "&",
                  p = t && t.eq ? t.eq : "=",
                  d = t && t.arrayKey ? t.arrayKey : !1;
              if (i.isNull(e) || i.isUndefined(e) || i.isFunction(e)) return s ? n.escape(s) + p : "";
              if (i.isBoolean(e) || Object.prototype.toString.call(e) === "[object Boolean]") e = +e;
              if (i.isNumber(e) || i.isString(e)) return n.escape(s) + p + n.escape(e);
              if (i.isArray(e)) {
                  (c = []), (s = d ? s + "[]" : s), (f = e.length);
                  for (a = 0; a < f; a++) c.push(n.stringify(e[a], t, s));
                  return c.join(h);
              }
              for (a = r.length - 1; a >= 0; --a) if (r[a] === e) throw new Error("QueryString.stringify. Cyclical reference");
              r.push(e), (c = []), (o = s ? s + "[" : ""), (u = s ? "]" : "");
              for (a in e) e.hasOwnProperty(a) && ((l = o + a + u), c.push(n.stringify(e[a], t, l)));
              return r.pop(), (c = c.join(h)), !c && s ? s + "=" : c;
          });
  },
  "patched-v3.11.0",
  { requires: ["yui-base"] }
);
YUI.add(
  "base-build",
  function (e, t) {
      function f(e, t, n) {
          n[e] && (t[e] = (t[e] || []).concat(n[e]));
      }
      function l(e, t, n) {
          n._ATTR_CFG && ((t._ATTR_CFG_HASH = null), f.apply(null, arguments));
      }
      function c(e, t, r) {
          n.modifyAttrs(t, r.ATTRS);
      }
      var n = e.BaseCore,
          r = e.Base,
          i = e.Lang,
          s = "initializer",
          o = "destructor",
          u = ["_PLUG", "_UNPLUG"],
          a;
      (r._build = function (t, n, i, u, a, f) {
          var l = r._build,
              c = l._ctor(n, f),
              h = l._cfg(n, f, i),
              p = l._mixCust,
              d = c._yuibuild.dynamic,
              v,
              m,
              g,
              y,
              b,
              w;
          for (v = 0, m = i.length; v < m; v++) (g = i[v]), (y = g.prototype), (b = y[s]), (w = y[o]), delete y[s], delete y[o], e.mix(c, g, !0, null, 1), p(c, g, h), b && (y[s] = b), w && (y[o] = w), c._yuibuild.exts.push(g);
          return u && e.mix(c.prototype, u, !0), a && (e.mix(c, l._clean(a, h), !0), p(c, a, h)), (c.prototype.hasImpl = l._impl), d && ((c.NAME = t), (c.prototype.constructor = c), (c.modifyAttrs = n.modifyAttrs)), c;
      }),
          (a = r._build),
          e.mix(a, {
              _mixCust: function (t, n, r) {
                  var s, o, u, a, f, l;
                  r && ((s = r.aggregates), (o = r.custom), (u = r.statics)), u && e.mix(t, n, !0, u);
                  if (s) for (l = 0, f = s.length; l < f; l++) (a = s[l]), !t.hasOwnProperty(a) && n.hasOwnProperty(a) && (t[a] = i.isArray(n[a]) ? [] : {}), e.aggregate(t, n, !0, [a]);
                  if (o) for (l in o) o.hasOwnProperty(l) && o[l](l, t, n);
              },
              _tmpl: function (t) {
                  function n() {
                      n.superclass.constructor.apply(this, arguments);
                  }
                  return e.extend(n, t), n;
              },
              _impl: function (e) {
                  var t = this._getClasses(),
                      n,
                      r,
                      i,
                      s,
                      o,
                      u;
                  for (n = 0, r = t.length; n < r; n++) {
                      i = t[n];
                      if (i._yuibuild) {
                          (s = i._yuibuild.exts), (o = s.length);
                          for (u = 0; u < o; u++) if (s[u] === e) return !0;
                      }
                  }
                  return !1;
              },
              _ctor: function (e, t) {
                  var n = t && !1 === t.dynamic ? !1 : !0,
                      r = n ? a._tmpl(e) : e,
                      i = r._yuibuild;
                  return i || (i = r._yuibuild = {}), (i.id = i.id || null), (i.exts = i.exts || []), (i.dynamic = n), r;
              },
              _cfg: function (t, n, r) {
                  var i = [],
                      s = {},
                      o = [],
                      u,
                      a = n && n.aggregates,
                      f = n && n.custom,
                      l = n && n.statics,
                      c = t,
                      h,
                      p;
                  while (c && c.prototype)
                      (u = c._buildCfg), u && (u.aggregates && (i = i.concat(u.aggregates)), u.custom && e.mix(s, u.custom, !0), u.statics && (o = o.concat(u.statics))), (c = c.superclass ? c.superclass.constructor : null);
                  if (r) for (h = 0, p = r.length; h < p; h++) (c = r[h]), (u = c._buildCfg), u && (u.aggregates && (i = i.concat(u.aggregates)), u.custom && e.mix(s, u.custom, !0), u.statics && (o = o.concat(u.statics)));
                  return a && (i = i.concat(a)), f && e.mix(s, n.cfgBuild, !0), l && (o = o.concat(l)), { aggregates: i, custom: s, statics: o };
              },
              _clean: function (t, n) {
                  var r,
                      i,
                      s,
                      o = e.merge(t),
                      u = n.aggregates,
                      a = n.custom;
                  for (r in a) o.hasOwnProperty(r) && delete o[r];
                  for (i = 0, s = u.length; i < s; i++) (r = u[i]), o.hasOwnProperty(r) && delete o[r];
                  return o;
              },
          }),
          (r.build = function (e, t, n, r) {
              return a(e, t, n, null, null, r);
          }),
          (r.create = function (e, t, n, r, i) {
              return a(e, t, n, r, i);
          }),
          (r.mix = function (e, t) {
              return e._CACHED_CLASS_DATA && (e._CACHED_CLASS_DATA = null), a(null, e, t, null, null, { dynamic: !1 });
          }),
          (n._buildCfg = { aggregates: u.concat(), custom: { ATTRS: c, _ATTR_CFG: l, _NON_ATTRS_CFG: f } }),
          (r._buildCfg = { aggregates: u.concat(), custom: { ATTRS: c, _ATTR_CFG: l, _NON_ATTRS_CFG: f } });
  },
  "patched-v3.11.0",
  { requires: ["base-base"] }
);
YUI.add(
  "aui-toggler-base",
  function (e, t) {
      var n = e.Lang,
          r = n.isBoolean,
          i = n.isObject,
          s = n.isUndefined,
          o = n.toInt,
          u = "animated",
          a = "animating",
          f = "bindDOMEvents",
          l = "click",
          c = "collapsed",
          h = "content",
          p = "cubic-bezier(0, 0.1, 0, 1.0)",
          d = "down",
          v = "enter",
          m = "esc",
          g = "expanded",
          y = "expandedChange",
          b = "getBoundingClientRect",
          w = "header",
          E = "keydown",
          S = "left",
          x = "marginTop",
          T = "num_minus",
          N = "num_plus",
          C = "offsetHeight",
          k = "px",
          L = "right",
          A = "space",
          O = "toggler",
          M = "transition",
          _ = "up",
          D = "wrapper",
          P = e.getClassName,
          H = P(O, h),
          B = P(O, h, c),
          j = P(O, h, g),
          F = P(O, h, D),
          I = P(O, w),
          q = P(O, w, c),
          R = P(O, w, g),
          U = { false: B, true: j },
          z = { false: q, true: R },
          W = '<div class="' + F + '"></div>',
          X = e.Component.create({
              NAME: O,
              ATTRS: {
                  animated: { validator: r, value: !1, writeOnce: !0 },
                  animating: { validator: r, value: !1 },
                  bindDOMEvents: { validator: r, value: !0, writeOnce: !0 },
                  content: { setter: e.one },
                  expanded: { validator: r, value: !0 },
                  header: { setter: e.one },
                  transition: { validator: i, value: { duration: 0.4, easing: p } },
              },
              EXTENDS: e.Base,
              headerEventHandler: function (e, t) {
                  if (e.type === l || e.isKey(v) || e.isKey(A)) return e.preventDefault(), t.toggle();
                  if (e.isKey(d) || e.isKey(L) || e.isKey(N)) return e.preventDefault(), t.expand();
                  if (e.isKey(_) || e.isKey(S) || e.isKey(m) || e.isKey(T)) return e.preventDefault(), t.collapse();
              },
              prototype: {
                  initializer: function () {
                      var e = this;
                      e.bindUI(), e.syncUI(), e._uiSetExpanded(e.get(g));
                  },
                  bindUI: function () {
                      var t = this,
                          n = t.get(w);
                      n.setData(O, t);
                      var r = [t.on(y, e.bind(t._onExpandedChange, t))];
                      t.get(f) && r.push(n.on([l, E], e.rbind(X.headerEventHandler, null, t))), (t._eventHandles = r);
                  },
                  syncUI: function () {
                      var e = this;
                      e.get(h).addClass(H), e.get(w).addClass(I);
                  },
                  destructor: function () {
                      var t = this;
                      t.get(w).setData(O, null), new e.EventHandle(t._eventHandles).detach();
                  },
                  animate: function (t, n) {
                      var r = this;
                      r._uiSetExpanded(!0);
                      var i = e.merge(t, r.get(M));
                      r.get(h).transition(i, e.bind(n, r));
                  },
                  collapse: function (e) {
                      var t = this;
                      return t.toggle(!1, e);
                  },
                  expand: function (e) {
                      var t = this;
                      return t.toggle(!0, e);
                  },
                  getContentHeight: function () {
                      var e = this,
                          t = e.get(h),
                          n = e.get(g),
                          r;
                      n || e._uiSetExpanded(!0);
                      if (t.hasMethod(b)) {
                          var i = t.invoke(b);
                          i && (r = i.bottom - i.top);
                      } else r = t.get(C);
                      return n || e._uiSetExpanded(!1), r;
                  },
                  toggle: function (e, t) {
                      var n = this,
                          r = n.get(w),
                          i;
                      if (!r.test(":visible")) return;
                      (i = n.get(g)), s(e) && (e = !i);
                      if (n.get(u) && e !== i) {
                          if (n.get(a)) return e;
                          var f = n.get(h),
                              l = n.getContentHeight(),
                              c = n.contentGutter;
                          s(c) && (c = n.contentGutter = o(f.getStyle(x))),
                              n.wrapped || (f.wrap(W), e && f.setStyle(x, -(l + c)), (n.wrapped = !0)),
                              n.set(a, !0),
                              n.animate({ marginTop: (e ? c : -(l + c)) + k }, function () {
                                  n.set(a, !1), n.set(g, e, t);
                              });
                      } else n.set(g, e, t);
                      return e;
                  },
                  _onExpandedChange: function (e) {
                      var t = this;
                      t._uiSetExpanded(e.newVal);
                  },
                  _uiSetExpanded: function (e) {
                      var t = this;
                      t.get(h).replaceClass(U[!e], U[e]), t.get(w).replaceClass(z[!e], z[e]);
                  },
              },
          });
      e.Toggler = X;
  },
  "2.0.0",
  { requires: ["transition", "aui-selector", "aui-event-base", "aui-node", "aui-component"], skinnable: !0 }
);
YUI.add(
  "aui-rating-thumb",
  function (e, t) {
      var n = "cssClasses",
          r = "down",
          i = "elements",
          s = "icon",
          o = "off",
          u = "on",
          a = "rating",
          f = "ThumbRating",
          l = "thumbs",
          c = "up",
          h = e.getClassName,
          p = h(s, l, r),
          d = h(s, l, c),
          v = h(a, o),
          m = h(a, u),
          g = e.Component.create({
              NAME: f,
              ATTRS: { cssClasses: { value: { down: p, element: v, hover: m, off: v, on: m, up: d } }, size: { value: 2, readOnly: !0 } },
              EXTENDS: e.Rating,
              prototype: {
                  renderUI: function () {
                      var e = this,
                          t = e.get(n);
                      g.superclass.renderUI.apply(this, arguments);
                      var r = e.get(i);
                      r.addClass(t.off), r.item(0).addClass(t.up), r.item(1).addClass(t.down);
                  },
                  fillTo: function (e) {
                      var t = this,
                          r = t.get(n);
                      this.clearSelection();
                      if (e >= 0) {
                          var s = this.get(i).item(e);
                          s.addClass(r.on), s.removeClass(r.off);
                      }
                  },
                  _syncElements: function () {},
              },
          });
      e.ThumbRating = g;
  },
  "2.0.0",
  { requires: ["aui-rating-base"] }
);
YUI.add(
  "aui-io-request",
  function (e, t) {
      var n = e.Lang,
          r = n.isBoolean,
          i = n.isFunction,
          s = n.isString,
          o = e.namespace("config.io"),
          u = function (e) {
              return function () {
                  return o[e];
              };
          },
          a = "active",
          f = "arguments",
          l = "autoLoad",
          c = "cache",
          h = "cfg",
          p = "complete",
          d = "content-type",
          v = "context",
          m = "data",
          g = "dataType",
          y = "",
          b = "end",
          w = "failure",
          E = "form",
          S = "get",
          x = "headers",
          T = "IORequest",
          N = "json",
          C = "method",
          k = "responseData",
          L = "start",
          A = "success",
          O = "sync",
          M = "timeout",
          _ = "transaction",
          D = "uri",
          P = "xdr",
          H = "xml",
          B = "Parser error: IO dataType is not correctly parsing",
          j = { all: "*/*", html: "text/html", json: "application/json, text/javascript", text: "text/plain", xml: "application/xml, text/xml" },
          F = e.Component.create({
              NAME: T,
              ATTRS: {
                  autoLoad: { value: !0, validator: r },
                  cache: { value: !0, validator: r },
                  dataType: {
                      setter: function (e) {
                          return (e || y).toLowerCase();
                      },
                      value: null,
                      validator: s,
                  },
                  responseData: {
                      setter: function (e) {
                          return this._setResponseData(e);
                      },
                      value: null,
                  },
                  uri: {
                      setter: function (e) {
                          return this._parseURL(e);
                      },
                      value: null,
                      validator: s,
                  },
                  active: { value: !1, validator: r },
                  cfg: {
                      getter: function () {
                          var t = this;
                          return {
                              arguments: t.get(f),
                              context: t.get(v),
                              data: t.getFormattedData(),
                              form: t.get(E),
                              headers: t.get(x),
                              method: t.get(C),
                              on: { complete: e.bind(t.fire, t, p), end: e.bind(t._end, t), failure: e.bind(t.fire, t, w), start: e.bind(t.fire, t, L), success: e.bind(t._success, t) },
                              sync: t.get(O),
                              timeout: t.get(M),
                              xdr: t.get(P),
                          };
                      },
                      readOnly: !0,
                  },
                  transaction: { value: null },
                  arguments: { valueFn: u(f) },
                  context: { valueFn: u(v) },
                  data: { valueFn: u(m) },
                  form: { valueFn: u(E) },
                  headers: {
                      getter: function (t) {
                          var n = [],
                              r = this,
                              i = r.get(g);
                          return i && n.push(j[i]), n.push(j.all), e.merge(t, { Accept: n.join(", ") });
                      },
                      valueFn: u(x),
                  },
                  method: { valueFn: u(C) },
                  selector: { value: null },
                  sync: { valueFn: u(O) },
                  timeout: { valueFn: u(M) },
                  xdr: { valueFn: u(P) },
              },
              EXTENDS: e.Plugin.Base,
              prototype: {
                  init: function (e) {
                      var t = this;
                      F.superclass.init.apply(this, arguments), t._autoStart();
                  },
                  destructor: function () {
                      var e = this;
                      e.stop(), e.set(_, null);
                  },
                  getFormattedData: function () {
                      var e = this,
                          t = e.get(m),
                          n = o.dataFormatter;
                      return i(n) && (t = n.call(e, t)), t;
                  },
                  start: function () {
                      var t = this;
                      t.destructor(), t.set(a, !0);
                      var n = t._yuiIOObj;
                      n || ((n = new e.IO()), (t._yuiIOObj = n));
                      var r = n.send(t.get(D), t.get(h));
                      t.set(_, r);
                  },
                  stop: function () {
                      var e = this,
                          t = e.get(_);
                      t && t.abort();
                  },
                  _autoStart: function () {
                      var e = this;
                      e.get(l) && e.start();
                  },
                  _parseURL: function (e) {
                      var t = this,
                          n = t.get(c),
                          r = t.get(C);
                      if (n === !1 && r == S) {
                          var s = +new Date(),
                              u = e.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + s + "$2");
                          e = u + (u == e ? (e.match(/\?/) ? "&" : "?") + "_=" + s : "");
                      }
                      var a = o.uriFormatter;
                      return i(a) && (e = a.apply(t, [e])), e;
                  },
                  _end: function (e, t) {
                      var n = this;
                      n.set(a, !1), n.set(_, null), n.fire(b, e, t);
                  },
                  _success: function (e, t, n) {
                      var r = this;
                      r.set(k, t), r.fire(A, e, t, n);
                  },
                  _setResponseData: function (t) {
                      var n = null,
                          r = this;
                      if (t) {
                          var i = r.get(g),
                              s = t.getResponseHeader(d) || "";
                          if (i == H || (!i && s.indexOf(H) >= 0)) {
                              n = t.responseXML;
                              if (n.documentElement.tagName == "parsererror") throw B;
                          } else n = t.responseText;
                          n === y && (n = null);
                          if (i == N)
                              try {
                                  n = e.JSON.parse(n);
                              } catch (o) {}
                          else {
                              var u = r.get("selector");
                              if (n && u) {
                                  var a;
                                  n.documentElement ? (a = e.one(n)) : (a = e.Node.create(n)), (n = a.all(u));
                              }
                          }
                      }
                      return n;
                  },
              },
          });
      (e.IORequest = F),
          (e.io.request = function (t, n) {
              return new e.IORequest(e.merge(n, { uri: t }));
          });
  },
  "2.0.0",
  { requires: ["io-base", "json", "plugin", "querystring-stringify", "aui-component"] }
);
YUI.add(
  "base-observable",
  function (e, t) {
      function f() {}
      var n = e.Lang,
          r = "destroy",
          i = "init",
          s = "bubbleTargets",
          o = "_bubbleTargets",
          u = e.AttributeObservable,
          a = e.BaseCore;
      (f._ATTR_CFG = u._ATTR_CFG.concat()),
          (f._NON_ATTRS_CFG = ["on", "after", "bubbleTargets"]),
          (f.prototype = {
              _initAttribute: function () {
                  a.prototype._initAttribute.apply(this, arguments), u.call(this), (this._eventPrefix = this.constructor.EVENT_PREFIX || this.constructor.NAME), (this._yuievt.config.prefix = this._eventPrefix);
              },
              init: function (e) {
                  var t = this._getFullType(i),
                      n = this._publish(t);
                  return (
                      (n.emitFacade = !0),
                      (n.fireOnce = !0),
                      (n.defaultTargetOnly = !0),
                      (n.defaultFn = this._defInitFn),
                      this._preInitEventCfg(e),
                      n._hasPotentialSubscribers() ? this.fire(t, { cfg: e }) : (this._baseInit(e), (n.fired = !0), (n.firedWith = [{ cfg: e }])),
                      this
                  );
              },
              _preInitEventCfg: function (e) {
                  e && (e.on && this.on(e.on), e.after && this.after(e.after));
                  var t,
                      r,
                      i,
                      u = e && s in e;
                  if (u || o in this) {
                      i = u ? e && e.bubbleTargets : this._bubbleTargets;
                      if (n.isArray(i)) for (t = 0, r = i.length; t < r; t++) this.addTarget(i[t]);
                      else i && this.addTarget(i);
                  }
              },
              destroy: function () {
                  return this.publish(r, { fireOnce: !0, defaultTargetOnly: !0, defaultFn: this._defDestroyFn }), this.fire(r), this.detachAll(), this;
              },
              _defInitFn: function (e) {
                  this._baseInit(e.cfg);
              },
              _defDestroyFn: function (e) {
                  this._baseDestroy(e.cfg);
              },
          }),
          e.mix(f, u, !1, null, 1),
          (e.BaseObservable = f);
  },
  "patched-v3.11.0",
  { requires: ["attribute-observable"] }
);
YUI.add(
  "aui-rating-base",
  function (e, t) {
      var n = e.Lang,
          r = n.isBoolean,
          i = n.isNumber,
          s = n.isString,
          o = function (t) {
              return t instanceof e.NodeList;
          },
          u = function (t) {
              return t instanceof e.Node;
          },
          a = "a",
          f = "boundingBox",
          l = "canReset",
          c = "contentBox",
          h = "defaultSelected",
          p = "disabled",
          d = ".",
          v = "elements",
          m = "href",
          g = "id",
          y = "input",
          b = "inputName",
          w = "label",
          E = "labelNode",
          t = "name",
          S = "nodeName",
          x = "rating",
          T = "selectedIndex",
          N = "showTitle",
          C = "size",
          k = "",
          L = "title",
          A = "value",
          O = "itemClick",
          M = "itemOut",
          _ = "itemOver",
          D = "itemSelect",
          P = e.getClassName,
          H = P("icon", "star"),
          B = P("icon", "star", "empty"),
          j = P(x, w),
          F = '<a class="{cssClasses}"></a>',
          I = '<span class="' + j + '"></span>',
          q = e.Component.create({
              NAME: "rating",
              ATTRS: {
                  disabled: { value: !1, validator: r },
                  canReset: { value: !0, validator: r },
                  cssClasses: { value: { element: B, hover: H, off: B, on: H } },
                  defaultSelected: { value: 0, writeOnce: !0, validator: i },
                  elements: { validator: o },
                  hiddenInput: { validator: u },
                  inputName: { value: k, validator: s },
                  label: { value: k, validator: s },
                  labelNode: {
                      valueFn: function () {
                          return e.Node.create(I);
                      },
                      validator: u,
                  },
                  selectedIndex: { value: -1, validator: i },
                  showTitle: { value: !0, validator: r },
                  size: {
                      value: 5,
                      validator: function (e) {
                          return i(e) && e > 0;
                      },
                  },
                  title: null,
                  value: null,
              },
              HTML_PARSER: {
                  elements: function (e) {
                      return e.all("a");
                  },
                  label: function (e) {
                      var t = e.one(d + j);
                      if (t) return t.html();
                  },
                  labelNode: d + j,
              },
              prototype: {
                  BOUNDING_TEMPLATE: "<span></span>",
                  CONTENT_TEMPLATE: "<span></span>",
                  initializer: function () {
                      var e = this;
                      (e.inputElementsData = {}), e.after("labelChange", this._afterSetLabel);
                  },
                  renderUI: function () {
                      var e = this;
                      e._parseInputElements(), e._renderLabel(), e._renderElements();
                  },
                  bindUI: function () {
                      var e = this;
                      e._createEvents(), e.on({ click: e._handleClickEvent, mouseover: e._handleMouseOverEvent, mouseout: e._handleMouseOutEvent });
                  },
                  syncUI: function () {
                      var e = this;
                      e._syncElements(), e._syncLabelUI();
                  },
                  clearSelection: function () {
                      var e = this,
                          t = e.get("cssClasses");
                      e.get(v).each(function (e) {
                          e.removeClass(t.on), e.removeClass(t.hover), e.addClass(t.element);
                      });
                  },
                  select: function (e) {
                      var t = this,
                          n = t.get(T),
                          r = t.get(l);
                      r && n === e && (e = -1), t.set(T, e);
                      var i = t.get(T),
                          s = t._getInputData(i),
                          o = L in s ? s.title : k,
                          u = A in s ? s.value : i;
                      t.fillTo(i), t.set(L, o), t.set(A, u);
                      var a = t.get("hiddenInput");
                      a.setAttribute(L, o), a.setAttribute(A, u);
                  },
                  fillTo: function (e, t) {
                      var n = this,
                          r = n.get("cssClasses");
                      n.clearSelection(),
                          e >= 0 &&
                              n.get(v).some(function (n, i) {
                                  return n.addClass(t || r.on), n.removeClass(r.element), i === Math.floor(e);
                              });
                  },
                  indexOf: function (e) {
                      var t = this;
                      return t.get(v).indexOf(e);
                  },
                  _canFireCustomEvent: function (e) {
                      var t = this,
                          n = e.domEvent.target;
                      return !t.get(p) && n.test("a");
                  },
                  _createElements: function () {
                      var t = this,
                          r = t.get("cssClasses"),
                          i = this.get(C),
                          s = [];
                      for (var o = 0; o < i; o++) s.push(n.sub(F, { cssClasses: r.element }));
                      return e.NodeList.create(s.join(k));
                  },
                  _createEvents: function () {
                      var e = this,
                          t = function (t, n) {
                              e.publish(t, { defaultFn: n, queuable: !1, emitFacade: !0, bubbles: !0 });
                          };
                      t(O, this._defRatingItemClickFn), t(D, this._defRatingItemSelectFn), t(_, this._defRatingItemOverFn), t(M, this._defRatingItemOutFn);
                  },
                  _defRatingItemClickFn: function (e) {
                      var t = this,
                          n = e.domEvent;
                      t.fire(D, { delegateEvent: e, domEvent: n, ratingItem: n.target });
                  },
                  _defRatingItemSelectFn: function (e) {
                      var t = this,
                          n = e.domEvent.target;
                      t.select(t.indexOf(n));
                  },
                  _defRatingItemOutFn: function () {
                      var e = this;
                      e.fillTo(e.get(T));
                  },
                  _defRatingItemOverFn: function (e) {
                      var t = this,
                          n = t.get("cssClasses"),
                          r = t.indexOf(e.domEvent.target);
                      t.fillTo(r, n.hover);
                  },
                  _parseInputElements: function () {
                      var n = this,
                          r = n.get(f),
                          i = r.all(y),
                          s = i.size(),
                          o = n.get(b),
                          u = e.Node.create('<input type="hidden" />');
                      if (s > 0) {
                          (o = o || i.item(0).getAttribute(t)), n.set(C, s);
                          var a = r.getElementsByTagName("label");
                          i.each(function (e, t) {
                              var r = e.get(g),
                                  i = k;
                              if (r) {
                                  var s = a.filter('[for="' + r + '"]');
                                  s.size() && (i = s.item(0).html());
                              }
                              n.inputElementsData[t] = { content: i, value: e.getAttribute(A) || t, title: e.getAttribute(L) };
                          }),
                              a.remove(!0),
                              i.remove(!0);
                      }
                      o && (u.setAttribute(t, o), r.appendChild(u)), n.set("hiddenInput", u);
                  },
                  _renderLabel: function () {
                      var e = this;
                      e.get(c).setContent(e.get(E));
                  },
                  _renderElements: function () {
                      var e = this,
                          t = e.get(c),
                          n = e.get(v);
                      if (!n || !n.size()) (n = e._createElements()), e.set(v, n);
                      n.each(function (t, n) {
                          var r = e._getInputData(n),
                              i = r.content,
                              s = r.title || e.get(L) || i;
                          s && e.get(N) && t.setAttribute(L, s), !t.attr(m) && t.get(S).toLowerCase() === a && t.setAttribute("onclick", "return false;");
                      }),
                          t.append(n.getDOM());
                  },
                  _syncElements: function () {
                      var e = this,
                          t = e.get(h) - 1;
                      e.set(T, t), e.select();
                  },
                  _syncLabelUI: function () {
                      var e = this,
                          t = e.get(w);
                      e.get(E).html(t);
                  },
                  _getInputData: function (e) {
                      var t = this;
                      return t.inputElementsData[e] || {};
                  },
                  _handleClickEvent: function (e) {
                      var t = this,
                          n = e.domEvent;
                      t._canFireCustomEvent(e) ? t.fire(O, { delegateEvent: e, domEvent: n }) : n.preventDefault();
                  },
                  _handleMouseOutEvent: function (e) {
                      var t = this;
                      t._canFireCustomEvent(e) && t.fire(M, { delegateEvent: e, domEvent: e.domEvent });
                  },
                  _handleMouseOverEvent: function (e) {
                      var t = this;
                      t._canFireCustomEvent(e) && t.fire(_, { delegateEvent: e, domEvent: e.domEvent });
                  },
                  _afterSetLabel: function () {
                      this._syncLabelUI();
                  },
              },
          });
      (e.Rating = q), (e.StarRating = q);
  },
  "2.0.0",
  { requires: ["widget-htmlparser", "widget-uievents", "aui-component", "aui-node-base"], skinnable: !0 }
);
YUI.add(
  "aui-widget-cssclass",
  function (e, t) {
      function s() {}
      var n = "boundingBox",
          r = "contentBox",
          i = "cssClassChange";
      (s.ATTRS = { cssClass: {} }),
          (s.CSS_CLASS_CONTENT_SUFFIX = "-content"),
          (s.prototype = {
              initializer: function (e) {
                  var t = this;
                  t._uiSetCssClass(e.cssClass), t.after(i, t._afterCssClassChange);
              },
              _afterCssClassChange: function (e) {
                  var t = this,
                      i;
                  (i = e.prevVal), i && (t.get(n).removeClass(i), t.get(r).removeClass(i + s.CSS_CLASS_CONTENT_SUFFIX)), t._uiSetCssClass(e.newVal);
              },
              _uiSetCssClass: function (e) {
                  var t = this;
                  e && (t.get(n).addClass(e), t.get(r).addClass(e + s.CSS_CLASS_CONTENT_SUFFIX));
              },
          }),
          (e.WidgetCssClass = s);
  },
  "2.0.0",
  { requires: ["widget-base"] }
);
(function (b, c) {
  var a = {};
  a.get = function (d) {
      return d;
  };
  b.use("io-base", function (d) {
      a.get = d.cached(function (i, j) {
          var e = this;
          var g = themeDisplay.getPathContext() + "/language/" + themeDisplay.getLanguageId() + "/" + i + "/";
          if (j) {
              if (typeof j == "string") {
                  g += j;
              } else {
                  if (c.Util.isArray(j)) {
                      g += j.join("/");
                  }
              }
          }
          var f = g;
          var h = c.authToken;
          if (h) {
              f = c.Util.addParams("p_auth=" + h, g);
          }
          d.io(f, {
              on: {
                  complete: function (k, l) {
                      value = l.responseText;
                  },
              },
              sync: true,
              type: "GET",
          });
          return value;
      });
  });
  c.Language = a;
})(AUI(), Liferay);
AUI.add(
  "liferay-store",
  function (b) {
      var c = b.Lang;
      var a = c.isObject;
      var e = "serialize://";
      var d = function (g, h) {
          var f = d;
          var i;
          if (c.isFunction(h)) {
              i = "get";
              if (c.isArray(g)) {
                  i = "getAll";
              }
          } else {
              i = "set";
              if (a(g)) {
                  i = "setAll";
              } else {
                  if (arguments.length == 1) {
                      i = null;
                  }
              }
          }
          if (i) {
              f[i].apply(d, arguments);
          }
      };
      b.mix(d, {
          get: function (g, h) {
              var f = this;
              f._getValues("get", g, h);
          },
          getAll: function (g, h) {
              var f = this;
              f._getValues("getAll", g, h);
          },
          set: function (g, h) {
              var f = this;
              var i = {};
              if (a(h)) {
                  h = e + b.JSON.stringify(h);
              }
              i[g] = h;
              f._setValues(i);
          },
          setAll: function (g) {
              var f = this;
              f._setValues(g);
          },
          _getValues: function (i, h, j) {
              var f = this;
              var g = {
                  after: {
                      success: function (l) {
                          var k = this.get("responseData");
                          if (c.isString(k) && k.indexOf(e) === 0) {
                              try {
                                  k = b.JSON.parse(k.substring(e.length));
                              } catch (m) {}
                          }
                          j(k);
                      },
                  },
                  data: { cmd: i },
              };
              g.data.key = h;
              if (i == "getAll") {
                  g.dataType = "json";
              }
              f._ioRequest(g);
          },
          _ioRequest: function (g) {
              var f = this;
              b.io.request(themeDisplay.getPathMain() + "/portal/session_click", g);
          },
          _setValues: function (g) {
              var f = this;
              f._ioRequest({ data: g });
          },
      });
      Liferay.Store = d;
  },
  "",
  { requires: ["aui-io-request"] }
);
AUI.add(
  "liferay-ratings",
  function (c) {
      var f = c.Lang;
      var a = f.emptyFn;
      var h = ["focus", "mousemove"];
      var g = "{desc} ({totalEntries} {voteLabel})";
      var e = [];
      var i = c.Component.create({
          ATTRS: { averageScore: {}, className: {}, classPK: {}, namespace: {}, size: {}, totalEntries: {}, totalScore: {}, type: {}, uri: {}, yourScore: {} },
          EXTENDS: c.Base,
          prototype: {
              initializer: function () {
                  var j = this;
                  j._renderRatings();
              },
              _bindRatings: function () {
                  var j = this;
                  j.ratings.after("itemSelect", j._itemSelect, j);
              },
              _convertToIndex: function (l) {
                  var j = this;
                  var k = -1;
                  if (l == 1) {
                      k = 0;
                  } else {
                      if (l == -1) {
                          k = 1;
                      }
                  }
                  return k;
              },
              _fixScore: function (l) {
                  var j = this;
                  var k = "";
                  if (l > 0) {
                      k = "+";
                  }
                  return k + l;
              },
              _getLabel: function (n, m, k) {
                  var j = this;
                  var l = "";
                  if (m == 1) {
                      l = "\u0056\u006f\u0074\u0065";
                  } else {
                      l = "\u0056\u006f\u0074\u0065\u0073";
                  }
                  return f.sub(g, { desc: n, totalEntries: m, voteLabel: l });
              },
              _itemSelect: a,
              _renderRatings: a,
              _sendVoteRequest: function (k, l, m) {
                  var j = this;
                  c.io.request(k, { data: { className: j.get("className"), classPK: j.get("classPK"), p_auth: Liferay.authToken, p_l_id: themeDisplay.getPlid(), score: l }, dataType: "json", on: { success: c.bind(m, j) } });
              },
              _showScoreTooltip: function (n) {
                  var k = this;
                  var l = k.ratingScore;
                  var m = "";
                  var j = l.get("selectedIndex") + 1;
                  if (j == 1) {
                      m = "\u0053\u0074\u0061\u0072";
                  } else {
                      m = "\u0053\u0074\u0061\u0072\u0073";
                  }
                  Liferay.Portal.ToolTip.show(n.currentTarget, j + " " + m);
              },
              _updateAverageScoreText: function (n) {
                  var j = this;
                  var l = j.ratingScore;
                  var m = l.get("boundingBox").one("img.rating-element");
                  if (m) {
                      var k = f.sub(
                          "\u0054\u0068\u0065\u0020\u0061\u0076\u0065\u0072\u0061\u0067\u0065\u0020\u0072\u0061\u0074\u0069\u006e\u0067\u0020\u0069\u0073\u0020\u007b\u0030\u007d\u0020\u0073\u0074\u0061\u0072\u0073\u0020\u006f\u0075\u0074\u0020\u006f\u0066\u0020\u007b\u0031\u007d\u002e",
                          [n, j.get("size")]
                      );
                      m.attr("alt", k);
                  }
              },
          },
          register: function (m) {
              var j = this;
              var l = m.containerId;
              var k = l && document.getElementById(m.containerId);
              if (k) {
                  e.push({ config: m, container: c.one(k) });
                  j._registerTask();
              } else {
                  j._registerRating(m);
              }
          },
          _registerRating: function (k) {
              var j = this;
              var m = Liferay.Ratings.StarRating;
              if (k.type != "stars") {
                  m = Liferay.Ratings.ThumbRating;
              }
              var l = new m(k);
              j._INSTANCES[k.id || k.namespace] = l;
              return l;
          },
          _registerTask: c.debounce(function () {
              c.Array.each(e, function (k, j, m) {
                  var l = k.container.on(h, function (n) {
                      l.detach();
                      i._registerRating(k.config);
                  });
              });
              e.length = 0;
          }, 100),
          _INSTANCES: {},
          _thumbScoreMap: { "-1": 0, down: -1, up: 1 },
      });
      var b = c.Component.create({
          EXTENDS: i,
          prototype: {
              _renderRatings: function () {
                  var o = this;
                  var k = o.get("namespace");
                  if (themeDisplay.isSignedIn()) {
                      var r = o.get("yourScore");
                      o.ratings = new c.StarRating({ boundingBox: "#" + k + "ratingStar", canReset: false, defaultSelected: r, srcNode: "#" + k + "ratingStarContent" }).render();
                      o._bindRatings();
                  }
                  var n = "\u0041\u0076\u0065\u0072\u0061\u0067\u0065";
                  var p = o.get("totalEntries");
                  var j = o.get("averageScore");
                  var q = o.get("size");
                  var m = o._getLabel(n, p, j);
                  var l = new c.StarRating({ boundingBox: "#" + k + "ratingScore", canReset: false, defaultSelected: j, disabled: true, label: m, size: q, srcNode: "#" + k + "ratingScoreContent" });
                  l.get("boundingBox").on("mouseenter", o._showScoreTooltip, o);
                  o.ratingScore = l.render();
              },
              _itemSelect: function (l) {
                  var j = this;
                  var k = j.get("uri");
                  var m = j.ratings.get("selectedIndex") + 1;
                  j._sendVoteRequest(k, m, j._saveCallback);
              },
              _saveCallback: function (j, k, l) {
                  var q = this;
                  var r = j.currentTarget;
                  var s = r.get("responseData");
                  var p = "\u0041\u0076\u0065\u0072\u0061\u0067\u0065";
                  var o = q._getLabel(p, s.totalEntries, s.averageScore);
                  var m = s.averageScore - 1;
                  var n = q.ratingScore;
                  n.set("label", o);
                  n.select(m);
                  q._updateAverageScoreText(s.averageScore);
              },
          },
      });
      var d = c.Component.create({
          EXTENDS: i,
          prototype: {
              _renderRatings: function () {
                  var o = this;
                  if (themeDisplay.isSignedIn()) {
                      var n = o._fixScore(o.get("totalScore"));
                      var p = o.get("totalEntries");
                      var j = o.get("averageScore");
                      var q = o.get("size");
                      var r = o.get("yourScore");
                      var m = o._getLabel(n, p, j);
                      var k = o._convertToIndex(r);
                      var l = o.get("namespace");
                      o.ratings = new c.ThumbRating({ boundingBox: "#" + l + "ratingThumb", label: m, srcNode: "#" + l + "ratingThumbContent" }).render();
                      o._bindRatings();
                      o.ratings.select(k);
                  }
              },
              _itemSelect: function (l) {
                  var j = this;
                  var k = j.get("uri");
                  var m = j.ratings.get("value");
                  var n = Liferay.Ratings._thumbScoreMap[m];
                  j._sendVoteRequest(k, n, j._saveCallback);
              },
              _saveCallback: function (j, k, m) {
                  var p = this;
                  var q = j.currentTarget;
                  var r = q.get("responseData");
                  var l = Math.round(r.totalEntries * r.averageScore);
                  var o = p._fixScore(l);
                  var n = p._getLabel(o, r.totalEntries);
                  p.ratings.set("label", n);
              },
          },
      });
      i.StarRating = b;
      i.ThumbRating = d;
      Liferay.Ratings = i;
  },
  "",
  { requires: ["aui-io-request", "aui-rating"] }
);
