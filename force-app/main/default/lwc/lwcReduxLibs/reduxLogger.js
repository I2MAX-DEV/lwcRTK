const globals = {};
(function () {
	!(function (e, t) {
		'object' == typeof exports && 'undefined' != typeof module
			? t(exports)
			: 'function' == typeof define && define.amd
			? define(['exports'], t)
			: t((e.reduxLogger = e.reduxLogger || {}));
	})(this, function (e) {
		'use strict';
		var t,
			r,
			n = function (e, t) {
				return (
					(function (e, t) {
						return new Array(t + 1).join(e);
					})('0', t - e.toString().length) + e
				);
			},
			L = function (e) {
				return n(e.getHours(), 2) + ':' + n(e.getMinutes(), 2) + ':' + n(e.getSeconds(), 2) + '.' + n(e.getMilliseconds(), 3);
			},
			p = 'undefined' != typeof performance && null !== performance && 'function' == typeof performance.now ? performance : Date,
			v =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e;
					  }
					: function (e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
					  },
			i = function (e) {
				if (Array.isArray(e)) {
					for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
					return r;
				}
				return Array.from(e);
			},
			o = [];
		function a(e, t) {
			(e.super_ = t), (e.prototype = Object.create(t.prototype, {constructor: {value: e, enumerable: !1, writable: !0, configurable: !0}}));
		}
		function l(e, t) {
			Object.defineProperty(this, 'kind', {value: e, enumerable: !0}), t && t.length && Object.defineProperty(this, 'path', {value: t, enumerable: !0});
		}
		function y(e, t, r) {
			y.super_.call(this, 'E', e),
				Object.defineProperty(this, 'lhs', {value: t, enumerable: !0}),
				Object.defineProperty(this, 'rhs', {value: r, enumerable: !0});
		}
		function b(e, t) {
			b.super_.call(this, 'N', e), Object.defineProperty(this, 'rhs', {value: t, enumerable: !0});
		}
		function m(e, t) {
			m.super_.call(this, 'D', e), Object.defineProperty(this, 'lhs', {value: t, enumerable: !0});
		}
		function w(e, t, r) {
			w.super_.call(this, 'A', e),
				Object.defineProperty(this, 'index', {value: t, enumerable: !0}),
				Object.defineProperty(this, 'item', {value: r, enumerable: !0});
		}
		function x(e, t, r) {
			var n = e.slice((r || t) + 1 || e.length);
			return (e.length = t < 0 ? e.length + t : t), e.push.apply(e, n), e;
		}
		function S(e) {
			var t = void 0 === e ? 'undefined' : v(e);
			return 'object' !== t
				? t
				: e === Math
				? 'math'
				: null === e
				? 'null'
				: Array.isArray(e)
				? 'array'
				: '[object Date]' === Object.prototype.toString.call(e)
				? 'date'
				: 'function' == typeof e.toString && /^\/.*\//.test(e.toString())
				? 'regexp'
				: 'object';
		}
		function j(n, o, i, a, e, t, l) {
			l = l || [];
			var c = (e = e || []).slice(0);
			if (void 0 !== t) {
				if (a) {
					if ('function' == typeof a && a(c, t)) return;
					if ('object' === (void 0 === a ? 'undefined' : v(a))) {
						if (a.prefilter && a.prefilter(c, t)) return;
						if (a.normalize) {
							var r = a.normalize(c, t, n, o);
							r && ((n = r[0]), (o = r[1]));
						}
					}
				}
				c.push(t);
			}
			'regexp' === S(n) && 'regexp' === S(o) && ((n = n.toString()), (o = o.toString()));
			var u = void 0 === n ? 'undefined' : v(n),
				f = void 0 === o ? 'undefined' : v(o),
				s = 'undefined' !== u || (l && l[l.length - 1].lhs && l[l.length - 1].lhs.hasOwnProperty(t)),
				d = 'undefined' !== f || (l && l[l.length - 1].rhs && l[l.length - 1].rhs.hasOwnProperty(t));
			if (!s && d) i(new b(c, o));
			else if (!d && s) i(new m(c, n));
			else if (S(n) !== S(o)) i(new y(c, n, o));
			else if ('date' === S(n) && n - o != 0) i(new y(c, n, o));
			else if ('object' === u && null !== n && null !== o)
				if (
					l.filter(function (e) {
						return e.lhs === n;
					}).length
				)
					n !== o && i(new y(c, n, o));
				else {
					if ((l.push({lhs: n, rhs: o}), Array.isArray(n))) {
						var p;
						n.length;
						for (p = 0; p < n.length; p++) p >= o.length ? i(new w(c, p, new m(void 0, n[p]))) : j(n[p], o[p], i, a, c, p, l);
						for (; p < o.length; ) i(new w(c, p, new b(void 0, o[p++])));
					} else {
						var g = Object.keys(n),
							h = Object.keys(o);
						g.forEach(function (e, t) {
							var r = h.indexOf(e);
							0 <= r ? (j(n[e], o[e], i, a, c, e, l), (h = x(h, r))) : j(n[e], void 0, i, a, c, e, l);
						}),
							h.forEach(function (e) {
								j(void 0, o[e], i, a, c, e, l);
							});
					}
					l.length = l.length - 1;
				}
			else n !== o && (('number' === u && isNaN(n) && isNaN(o)) || i(new y(c, n, o)));
		}
		function c(e, t, r, n) {
			return (
				(n = n || []),
				j(
					e,
					t,
					function (e) {
						e && n.push(e);
					},
					r
				),
				n.length ? n : void 0
			);
		}
		function u(e, t, r) {
			if (e && t && r && r.kind) {
				for (var n = e, o = -1, i = r.path ? r.path.length - 1 : 0; ++o < i; )
					void 0 === n[r.path[o]] && (n[r.path[o]] = 'number' == typeof r.path[o] ? [] : {}), (n = n[r.path[o]]);
				switch (r.kind) {
					case 'A':
						!(function e(t, r, n) {
							if (n.path && n.path.length) {
								var o,
									i = t[r],
									a = n.path.length - 1;
								for (o = 0; o < a; o++) i = i[n.path[o]];
								switch (n.kind) {
									case 'A':
										e(i[n.path[o]], n.index, n.item);
										break;
									case 'D':
										delete i[n.path[o]];
										break;
									case 'E':
									case 'N':
										i[n.path[o]] = n.rhs;
								}
							} else
								switch (n.kind) {
									case 'A':
										e(t[r], n.index, n.item);
										break;
									case 'D':
										t = x(t, r);
										break;
									case 'E':
									case 'N':
										t[r] = n.rhs;
								}
							return t;
						})(r.path ? n[r.path[o]] : n, r.index, r.item);
						break;
					case 'D':
						delete n[r.path[o]];
						break;
					case 'E':
					case 'N':
						n[r.path[o]] = r.rhs;
				}
			}
		}
		(t = 'object' === ('undefined' == typeof global ? 'undefined' : v(global)) && global ? global : 'undefined' != typeof window ? window : {}),
			(r = t.DeepDiff) &&
				o.push(function () {
					void 0 !== r && t.DeepDiff === c && ((t.DeepDiff = r), (r = void 0));
				}),
			a(y, l),
			a(b, l),
			a(m, l),
			a(w, l),
			Object.defineProperties(c, {
				diff: {value: c, enumerable: !0},
				observableDiff: {value: j, enumerable: !0},
				applyDiff: {
					value: function (t, r, n) {
						t &&
							r &&
							j(t, r, function (e) {
								(n && !n(t, r, e)) || u(t, r, e);
							});
					},
					enumerable: !0
				},
				applyChange: {value: u, enumerable: !0},
				revertChange: {
					value: function (e, t, r) {
						if (e && t && r && r.kind) {
							var n,
								o,
								i = e;
							for (o = r.path.length - 1, n = 0; n < o; n++) void 0 === i[r.path[n]] && (i[r.path[n]] = {}), (i = i[r.path[n]]);
							switch (r.kind) {
								case 'A':
									!(function e(t, r, n) {
										if (n.path && n.path.length) {
											var o,
												i = t[r],
												a = n.path.length - 1;
											for (o = 0; o < a; o++) i = i[n.path[o]];
											switch (n.kind) {
												case 'A':
													e(i[n.path[o]], n.index, n.item);
													break;
												case 'D':
												case 'E':
													i[n.path[o]] = n.lhs;
													break;
												case 'N':
													delete i[n.path[o]];
											}
										} else
											switch (n.kind) {
												case 'A':
													e(t[r], n.index, n.item);
													break;
												case 'D':
												case 'E':
													t[r] = n.lhs;
													break;
												case 'N':
													t = x(t, r);
											}
										return t;
									})(i[r.path[n]], r.index, r.item);
									break;
								case 'D':
								case 'E':
									i[r.path[n]] = r.lhs;
									break;
								case 'N':
									delete i[r.path[n]];
							}
						}
					},
					enumerable: !0
				},
				isConflict: {
					value: function () {
						return void 0 !== r;
					},
					enumerable: !0
				},
				noConflict: {
					value: function () {
						return (
							o &&
								(o.forEach(function (e) {
									e();
								}),
								(o = null)),
							c
						);
					},
					enumerable: !0
				}
			});
		var f = {
			E: {color: '#2196F3', text: 'CHANGED:'},
			N: {color: '#4CAF50', text: 'ADDED:'},
			D: {color: '#F44336', text: 'DELETED:'},
			A: {color: '#2196F3', text: 'ARRAY:'}
		};
		function M(e, t, n, r) {
			var o = c(e, t);
			try {
				r ? n.groupCollapsed('diff') : n.group('diff');
			} catch (e) {
				n.log('diff');
			}
			o
				? o.forEach(function (e) {
						var t = e.kind,
							r = (function (e) {
								var t = e.kind,
									r = e.path,
									n = e.lhs,
									o = e.rhs,
									i = e.index,
									a = e.item;
								switch (t) {
									case 'E':
										return [r.join('.'), n, '→', o];
									case 'N':
										return [r.join('.'), o];
									case 'D':
										return [r.join('.')];
									case 'A':
										return [r.join('.') + '[' + i + ']', a];
									default:
										return [];
								}
							})(e);
						n.log.apply(
							n,
							[
								'%c ' + f[t].text,
								(function (e) {
									return 'color: ' + f[e].color + '; font-weight: bold';
								})(t)
							].concat(i(r))
						);
				  })
				: n.log('—— no diff ——');
			try {
				n.groupEnd();
			} catch (e) {
				n.log('—— diff end —— ');
			}
		}
		function _(e, t, r, n) {
			switch (void 0 === e ? 'undefined' : v(e)) {
				case 'object':
					return 'function' == typeof e[n] ? e[n].apply(e, i(r)) : e[n];
				case 'function':
					return e(t);
				default:
					return e;
			}
		}
		function g(E, k) {
			var A = k.logger,
				D = k.actionTransformer,
				e = k.titleFormatter,
				O =
					void 0 === e
						? (function (e) {
								var o = e.timestamp,
									i = e.duration;
								return function (e, t, r) {
									var n = ['action'];
									return n.push('%c' + String(e.type)), o && n.push('%c@ ' + t), i && n.push('%c(in ' + r.toFixed(2) + ' ms)'), n.join(' ');
								};
						  })(k)
						: e,
				N = k.collapsed,
				C = k.colors,
				P = k.level,
				T = k.diff,
				F = void 0 === k.titleFormatter;
			E.forEach(function (e, t) {
				var r = e.started,
					n = e.startedTime,
					o = e.action,
					i = e.prevState,
					a = e.error,
					l = e.took,
					c = e.nextState,
					u = E[t + 1];
				u && ((c = u.prevState), (l = u.started - r));
				var f = D(o),
					s =
						'function' == typeof N
							? N(
									function () {
										return c;
									},
									o,
									e
							  )
							: N,
					d = L(n),
					p = C.title ? 'color: ' + C.title(f) + ';' : '',
					g = ['color: gray; font-weight: lighter;'];
				g.push(p), k.timestamp && g.push('color: gray; font-weight: lighter;'), k.duration && g.push('color: gray; font-weight: lighter;');
				var h = O(f, d, l);
				try {
					s
						? C.title && F
							? A.groupCollapsed.apply(A, ['%c ' + h].concat(g))
							: A.groupCollapsed(h)
						: C.title && F
						? A.group.apply(A, ['%c ' + h].concat(g))
						: A.group(h);
				} catch (e) {
					A.log(h);
				}
				var v = _(P, f, [i], 'prevState'),
					y = _(P, f, [f], 'action'),
					b = _(P, f, [a, i], 'error'),
					m = _(P, f, [c], 'nextState');
				if (v)
					if (C.prevState) {
						var w = 'color: ' + C.prevState(i) + '; font-weight: bold';
						A[v]('%c prev state', w, i);
					} else A[v]('prev state', i);
				if (y)
					if (C.action) {
						var x = 'color: ' + C.action(f) + '; font-weight: bold';
						A[y]('%c action    ', x, f);
					} else A[y]('action    ', f);
				if (a && b)
					if (C.error) {
						var S = 'color: ' + C.error(a, i) + '; font-weight: bold;';
						A[b]('%c error     ', S, a);
					} else A[b]('error     ', a);
				if (m)
					if (C.nextState) {
						var j = 'color: ' + C.nextState(c) + '; font-weight: bold';
						A[m]('%c next state', j, c);
					} else A[m]('next state', c);
				A.withTrace && (A.groupCollapsed('TRACE'), A.trace(), A.groupEnd()), T && M(i, c, A, s);
				try {
					A.groupEnd();
				} catch (e) {
					A.log('—— log end ——');
				}
			});
		}
		var h = {
			level: 'log',
			logger: console,
			logErrors: !0,
			collapsed: void 0,
			predicate: void 0,
			duration: !1,
			timestamp: !0,
			stateTransformer: function (e) {
				return e;
			},
			actionTransformer: function (e) {
				return e;
			},
			errorTransformer: function (e) {
				return e;
			},
			colors: {
				title: function () {
					return 'inherit';
				},
				prevState: function () {
					return '#9E9E9E';
				},
				action: function () {
					return '#03A9F4';
				},
				nextState: function () {
					return '#4CAF50';
				},
				error: function () {
					return '#F20404';
				}
			},
			diff: !1,
			diffPredicate: void 0,
			transformer: void 0
		};
		function s() {
			var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
				a = Object.assign({}, h, e),
				t = a.logger,
				l = a.stateTransformer,
				c = a.errorTransformer,
				u = a.predicate,
				f = a.logErrors,
				s = a.diffPredicate;
			if (void 0 === t)
				return function () {
					return function (t) {
						return function (e) {
							return t(e);
						};
					};
				};
			if (e.getState && e.dispatch)
				return (
					console.error(
						"[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport { createLogger } from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"
					),
					function () {
						return function (t) {
							return function (e) {
								return t(e);
							};
						};
					}
				);
			var d = [];
			return function (e) {
				var i = e.getState;
				return function (o) {
					return function (e) {
						if ('function' == typeof u && !u(i, e)) return o(e);
						var t = {};
						d.push(t), (t.started = p.now()), (t.startedTime = new Date()), (t.prevState = l(i())), (t.action = e);
						var r = void 0;
						if (f)
							try {
								r = o(e);
							} catch (e) {
								t.error = c(e);
							}
						else r = o(e);
						(t.took = p.now() - t.started), (t.nextState = l(i()));
						var n = a.diff && 'function' == typeof s ? s(i, e) : a.diff;
						if ((g(d, Object.assign({}, a, {diff: n})), (d.length = 0), t.error)) throw t.error;
						return r;
					};
				};
			};
		}
		var d = function () {
			var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
				t = e.dispatch,
				r = e.getState;
			if ('function' == typeof t || 'function' == typeof r) return s()({dispatch: t, getState: r});
			console.error(
				"\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n"
			);
		};
		(e.defaults = h), (e.createLogger = s), (e.logger = d), (e.default = d), Object.defineProperty(e, '__esModule', {value: !0});
	});
}.bind(globals)());
export default globals.reduxLogger;