/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * VERSION: 1.20.4
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function(window, moduleName) {

		"use strict";
		var _exports = {},
			_doc = window.document,
			_globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
		if (_globals.TweenLite) {
			return; //in case the core set of classes is already loaded, don't instantiate twice.
		}
		var _namespace = function(ns) {
				var a = ns.split("."),
					p = _globals, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			_tinyNum = 0.0000000001,
			_slice = function(a) { //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++])) {}
				return b;
			},
			_emptyFunc = function() {},
			_isArray = (function() { //works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
				var toString = Object.prototype.toString,
					array = toString.call([]);
				return function(obj) {
					return obj != null && (obj instanceof Array || (typeof(obj) === "object" && !!obj.push && toString.call(obj) === array));
				};
			}()),
			a, i, p, _ticker, _tickerActive,
			_defLookup = {},

			/**
			 * @constructor
			 * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
			 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
			 * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
			 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
			 *
			 * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
			 * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
			 * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
			 * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
			 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
			 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
			 * sandbox the banner one like:
			 *
			 * <script>
			 *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
			 * </script>
			 * <script src="js/greensock/v1.7/TweenMax.js"></script>
			 * <script>
			 *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
			 * </script>
			 * <script src="js/greensock/v1.6/TweenMax.js"></script>
			 * <script>
			 *     gs.TweenLite.to(...); //would use v1.7
			 *     TweenLite.to(...); //would use v1.6
			 * </script>
			 *
			 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
			 * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
			 * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
			 * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
			 */
			Definition = function(ns, dependencies, func, global) {
				this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
				_defLookup[ns] = this;
				this.gsClass = null;
				this.func = func;
				var _classes = [];
				this.check = function(init) {
					var i = dependencies.length,
						missing = i,
						cur, a, n, cl;
					while (--i > -1) {
						if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
							_classes[i] = cur.gsClass;
							missing--;
						} else if (init) {
							cur.sc.push(this);
						}
					}
					if (missing === 0 && func) {
						a = ("com.greensock." + ns).split(".");
						n = a.pop();
						cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

						//exports to multiple environments
						if (global) {
							_globals[n] = _exports[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
							if (typeof(module) !== "undefined" && module.exports) { //node
								if (ns === moduleName) {
									module.exports = _exports[moduleName] = cl;
									for (i in _exports) {
										cl[i] = _exports[i];
									}
								} else if (_exports[moduleName]) {
									_exports[moduleName][n] = cl;
								}
							} else if (true){ //AMD
								!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() { return cl; }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
							}
						}
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check();
						}
					}
				};
				this.check(true);
			},

			//used to create Definition instances (which basically registers a class that has dependencies).
			_gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
				return new Definition(ns, dependencies, func, global);
			},

			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, func, global) {
				func = func || function() {};
				_gsDefine(ns, [], function(){ return func; }, global);
				return func;
			};

		_gsDefine.globals = _globals;



/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true),
			_easeMap = Ease.map = {},
			_easeReg = Ease.register = function(ease, names, types, create) {
				var na = names.split(","),
					i = na.length,
					ta = (types || "easeIn,easeOut,easeInOut").split(","),
					e, name, j, type;
				while (--i > -1) {
					name = na[i];
					e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
					j = ta.length;
					while (--j > -1) {
						type = ta[j];
						_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
					}
				}
			};

		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			}
			var t = this._type,
				pw = this._power,
				r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
			if (pw === 1) {
				r *= r;
			} else if (pw === 2) {
				r *= r * r;
			} else if (pw === 3) {
				r *= r * r * r;
			} else if (pw === 4) {
				r *= r * r * r * r;
			}
			return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
		};

		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
		i = a.length;
		while (--i > -1) {
			p = a[i]+",Power"+i;
			_easeReg(new Ease(null,null,1,i), p, "easeOut", true);
			_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
			_easeReg(new Ease(null,null,3,i), p, "easeInOut");
		}
		_easeMap.linear = gs.easing.Linear.easeIn;
		_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		var EventDispatcher = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		});
		p = EventDispatcher.prototype;

		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (this === _ticker && !_tickerActive) {
				_ticker.wake();
			}
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback && listener.s === scope) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
		};

		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type], i;
			if (list) {
				i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};

		p.dispatchEvent = function(type) {
			var list = this._listeners[type],
				i, t, listener;
			if (list) {
				i = list.length;
				if (i > 1) { 
					list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
				}
				t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener) {
						if (listener.up) {
							listener.c.call(listener.s || t, {type:type, target:t});
						} else {
							listener.c.call(listener.s || t);
						}
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _reqAnimFrame = window.requestAnimationFrame,
			_cancelAnimFrame = window.cancelAnimationFrame,
			_getTime = Date.now || function() {return new Date().getTime();},
			_lastUpdate = _getTime();

		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_reqAnimFrame) {
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}

		_class("Ticker", function(fps, useRAF) {
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false && _reqAnimFrame) ? "auto" : false,
				_lagThreshold = 500,
				_adjustedLag = 33,
				_tickWord = "tick", //helps reduce gc burden
				_fps, _req, _id, _gap, _nextTime,
				_tick = function(manual) {
					var elapsed = _getTime() - _lastUpdate,
						overlap, dispatch;
					if (elapsed > _lagThreshold) {
						_startTime += elapsed - _adjustedLag;
					}
					_lastUpdate += elapsed;
					_self.time = (_lastUpdate - _startTime) / 1000;
					overlap = _self.time - _nextTime;
					if (!_fps || overlap > 0 || manual === true) {
						_self.frame++;
						_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
						dispatch = true;
					}
					if (manual !== true) { //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
						_id = _req(_tick);
					}
					if (dispatch) {
						_self.dispatchEvent(_tickWord);
					}
				};

			EventDispatcher.call(_self);
			_self.time = _self.frame = 0;
			_self.tick = function() {
				_tick(true);
			};

			_self.lagSmoothing = function(threshold, adjustedLag) {
				if (!arguments.length) { //if lagSmoothing() is called with no arguments, treat it like a getter that returns a boolean indicating if it's enabled or not. This is purposely undocumented and is for internal use.
					return (_lagThreshold < 1 / _tinyNum);
				}
				_lagThreshold = threshold || (1 / _tinyNum); //zero should be interpreted as basically unlimited
				_adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
			};

			_self.sleep = function() {
				if (_id == null) {
					return;
				}
				if (!_useRAF || !_cancelAnimFrame) {
					clearTimeout(_id);
				} else {
					_cancelAnimFrame(_id);
				}
				_req = _emptyFunc;
				_id = null;
				if (_self === _ticker) {
					_tickerActive = false;
				}
			};

			_self.wake = function(seamless) {
				if (_id !== null) {
					_self.sleep();
				} else if (seamless) {
					_startTime += -_lastUpdate + (_lastUpdate = _getTime());
				} else if (_self.frame > 10) { //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
					_lastUpdate = _getTime() - _lagThreshold + 5;
				}
				_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
				if (_self === _ticker) {
					_tickerActive = true;
				}
				_tick(2);
			};

			_self.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_self.wake();
			};

			_self.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF;
				}
				_self.sleep();
				_useRAF = value;
				_self.fps(_fps);
			};
			_self.fps(fps);

			//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
			setTimeout(function() {
				if (_useRAF === "auto" && _self.frame < 5 && (_doc || {}).visibilityState !== "hidden") {
					_self.useRAF(false);
				}
			}, 1500);
		});

		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * Animation
 * ----------------------------------------------------------------
 */
		var Animation = _class("core.Animation", function(duration, vars) {
				this.vars = vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(vars.delay) || 0;
				this._timeScale = 1;
				this._active = (vars.immediateRender === true);
				this.data = vars.data;
				this._reversed = (vars.reversed === true);

				if (!_rootTimeline) {
					return;
				}
				if (!_tickerActive) { //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
					_ticker.wake();
				}

				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.add(this, tl._time);

				if (this.vars.paused) {
					this.paused(true);
				}
			});

		_ticker = Animation.ticker = new gs.Ticker();
		p = Animation.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
		p._paused = false;


		//some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
		var _checkTimeout = function() {
				if (_tickerActive && _getTime() - _lastUpdate > 2000 && ((_doc || {}).visibilityState !== "hidden" || !_ticker.lagSmoothing())) { //note: if the tab is hidden, we should still wake if lagSmoothing has been disabled.
					_ticker.wake();
				}
				var t = setTimeout(_checkTimeout, 2000);
				if (t.unref) {
					// allows a node process to exit even if the timeout’s callback hasn't been invoked. Without it, the node process could hang as this function is called every two seconds.
					t.unref();
				}
			};
		_checkTimeout();


		p.play = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.reversed(false).paused(false);
		};

		p.pause = function(atTime, suppressEvents) {
			if (atTime != null) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};

		p.resume = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};

		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), suppressEvents !== false);
		};

		p.restart = function(includeDelay, suppressEvents) {
			return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
		};

		p.reverse = function(from, suppressEvents) {
			if (from != null) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			return this.reversed(true).paused(false);
		};

		p.render = function(time, suppressEvents, force) {
			//stub - we override this method in subclasses.
		};

		p.invalidate = function() {
			this._time = this._totalTime = 0;
			this._initted = this._gc = false;
			this._rawPrevTime = -1;
			if (this._gc || !this.timeline) {
				this._enabled(true);
			}
			return this;
		};

		p.isActive = function() {
			var tl = this._timeline, //the 2 root timelines won't have a _timeline; they're always active.
				startTime = this._startTime,
				rawTime;
			return (!tl || (!this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale - 0.0000001));
		};

		p._enabled = function (enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			this._gc = !enabled;
			this._active = this.isActive();
			if (ignoreTimeline !== true) {
				if (enabled && !this.timeline) {
					this._timeline.add(this, this._startTime - this._delay);
				} else if (!enabled && this.timeline) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};


		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};

		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};

		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.timeline;
			while (tween) {
				tween._dirty = true;
				tween = tween.timeline;
			}
			return this;
		};

		p._swapSelfInParams = function(params) {
			var i = params.length,
				copy = params.concat();
			while (--i > -1) {
				if (params[i] === "{self}") {
					copy[i] = this;
				}
			}
			return copy;
		};

		p._callback = function(type) {
			var v = this.vars,
				callback = v[type],
				params = v[type + "Params"],
				scope = v[type + "Scope"] || v.callbackScope || this,
				l = params ? params.length : 0;
			switch (l) { //speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
				case 0: callback.call(scope); break;
				case 1: callback.call(scope, params[0]); break;
				case 2: callback.call(scope, params[0], params[1]); break;
				default: callback.apply(scope, params);
			}
		};

//----Animation getters/setters --------------------------------------------------------

		p.eventCallback = function(type, callback, params, scope) {
			if ((type || "").substr(0,2) === "on") {
				var v = this.vars;
				if (arguments.length === 1) {
					return v[type];
				}
				if (callback == null) {
					delete v[type];
				} else {
					v[type] = callback;
					v[type + "Params"] = (_isArray(params) && params.join("").indexOf("{self}") !== -1) ? this._swapSelfInParams(params) : params;
					v[type + "Scope"] = scope;
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;
				}
			}
			return this;
		};

		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
			if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};

		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0 && !uncapped) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					var totalDuration = this._totalDuration,
						tl = this._timeline;
					if (time > totalDuration && !uncapped) {
						time = totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
					if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
					if (tl._timeline) {
						while (tl._timeline) {
							if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
								tl.totalTime(tl._totalTime, true);
							}
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime !== time || this._duration === 0) {
					if (_lazyTweens.length) {
						_lazyRender();
					}
					this.render(time, suppressEvents, false);
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
						_lazyRender();
					}
				}
			}
			return this;
		};

		p.progress = p.totalProgress = function(value, suppressEvents) {
			var duration = this.duration();
			return (!arguments.length) ? (duration ? this._time / duration : this.ratio) : this.totalTime(duration * value, suppressEvents);
		};

		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value !== this._startTime) {
				this._startTime = value;
				if (this.timeline) if (this.timeline._sortChildren) {
					this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};

		p.endTime = function(includeRepeats) {
			return this._startTime + ((includeRepeats != false) ? this.totalDuration() : this.duration()) / this._timeScale;
		};

		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			var pauseTime, t;
			value = value || _tinyNum; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				pauseTime = this._pauseTime;
				t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			t = this.timeline;
			while (t && t.timeline) { //must update the duration/totalDuration of all ancestor timelines immediately in case in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
				t._dirty = true;
				t.totalDuration();
				t = t.timeline;
			}
			return this;
		};

		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(((this._timeline && !this._timeline.smoothChildTiming) ? this.totalDuration() - this._totalTime : this._totalTime), true);
			}
			return this;
		};

		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			var tl = this._timeline,
				raw, elapsed;
			if (value != this._paused) if (tl) {
				if (!_tickerActive && !value) {
					_ticker.wake();
				}
				raw = tl.rawTime();
				elapsed = raw - this._pauseTime;
				if (!value && tl.smoothChildTiming) {
					this._startTime += elapsed;
					this._uncache(false);
				}
				this._pauseTime = value ? raw : null;
				this._paused = value;
				this._active = this.isActive();
				if (!value && elapsed !== 0 && this._initted && this.duration()) {
					raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
					this.render(raw, (raw === this._totalTime), true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
				}
			}
			if (this._gc && !value) {
				this._enabled(true, false);
			}
			return this;
		};


/*
 * ----------------------------------------------------------------
 * SimpleTimeline
 * ----------------------------------------------------------------
 */
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
			Animation.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});

		p = SimpleTimeline.prototype = new Animation();
		p.constructor = SimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = p._recent = null;
		p._sortChildren = false;

		p.add = p.insert = function(child, position, align, stagger) {
			var prevTween, st;
			child._startTime = Number(position || 0) + child._delay;
			if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
				child._pauseTime = child._startTime + ((this.rawTime() - child._startTime) / child._timeScale);
			}
			if (child.timeline) {
				child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
			}
			child.timeline = child._timeline = this;
			if (child._gc) {
				child._enabled(true, true);
			}
			prevTween = this._last;
			if (this._sortChildren) {
				st = child._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				child._next = prevTween._next;
				prevTween._next = child;
			} else {
				child._next = this._first;
				this._first = child;
			}
			if (child._next) {
				child._next._prev = child;
			} else {
				this._last = child;
			}
			child._prev = prevTween;
			this._recent = child;
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};

		p._remove = function(tween, skipDisable) {
			if (tween.timeline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}

				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}
				tween._next = tween._prev = tween.timeline = null;
				if (tween === this._recent) {
					this._recent = this._last;
				}

				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};

		p.render = function(time, suppressEvents, force) {
			var tween = this._first,
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused && !tween._gc)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
					}
				}
				tween = next;
			}
		};

		p.rawTime = function() {
			if (!_tickerActive) {
				_ticker.wake();
			}
			return this._totalTime;
		};

/*
 * ----------------------------------------------------------------
 * TweenLite
 * ----------------------------------------------------------------
 */
		var TweenLite = _class("TweenLite", function(target, duration, vars) {
				Animation.call(this, duration, vars);
				this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

				if (target == null) {
					throw "Cannot tween a null target.";
				}

				this.target = target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;

				var isSelector = (target.jquery || (target.length && target !== window && target[0] && (target[0] === window || (target[0].nodeType && target[0].style && !target.nodeType)))),
					overwrite = this.vars.overwrite,
					i, targ, targets;

				this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];

				if ((isSelector || target instanceof Array || (target.push && _isArray(target))) && typeof(target[0]) !== "number") {
					this._targets = targets = _slice(target);  //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < targets.length; i++) {
						targ = targets[i];
						if (!targ) {
							targets.splice(i--, 1);
							continue;
						} else if (typeof(targ) === "string") {
							targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
							if (typeof(targ) === "string") {
								targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
							}
							continue;
						} else if (targ.length && targ !== window && targ[0] && (targ[0] === window || (targ[0].nodeType && targ[0].style && !targ.nodeType))) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
							targets.splice(i--, 1);
							this._targets = targets = targets.concat(_slice(targ));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}

				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
					this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
					this.render(Math.min(0, -this._delay)); //in case delay is negative
				}
			}, true),
			_isSelector = function(v) {
				return (v && v.length && v !== window && v[0] && (v[0] === window || (v[0].nodeType && v[0].style && !v.nodeType))); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
			},
			_autoCSS = function(vars, target) {
				var css = {},
					p;
				for (p in vars) {
					if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
						css[p] = vars[p];
						delete vars[p];
					}
				}
				vars.css = css;
			};

		p = TweenLite.prototype = new Animation();
		p.constructor = TweenLite;
		p.kill()._gc = false;

//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
		p._notifyPluginsOfEnabled = p._lazy = false;

		TweenLite.version = "1.20.4";
		TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		TweenLite.defaultOverwrite = "auto";
		TweenLite.ticker = _ticker;
		TweenLite.autoSleep = 120;
		TweenLite.lagSmoothing = function(threshold, adjustedLag) {
			_ticker.lagSmoothing(threshold, adjustedLag);
		};

		TweenLite.selector = window.$ || window.jQuery || function(e) {
			var selector = window.$ || window.jQuery;
			if (selector) {
				TweenLite.selector = selector;
				return selector(e);
			}
			return (typeof(_doc) === "undefined") ? e : (_doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById((e.charAt(0) === "#") ? e.substr(1) : e));
		};

		var _lazyTweens = [],
			_lazyLookup = {},
			_numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
			_relExp = /[\+-]=-?[\.\d]/,
			//_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
			_setRatio = function(v) {
				var pt = this._firstPT,
					min = 0.000001,
					val;
				while (pt) {
					val = !pt.blob ? pt.c * v + pt.s : (v === 1 && this.end != null) ? this.end : v ? this.join("") : this.start;
					if (pt.m) {
						val = pt.m(val, this._target || pt.t);
					} else if (val < min) if (val > -min && !pt.blob) { //prevents issues with converting very small numbers to strings in the browser
						val = 0;
					}
					if (!pt.f) {
						pt.t[pt.p] = val;
					} else if (pt.fp) {
						pt.t[pt.p](pt.fp, val);
					} else {
						pt.t[pt.p](val);
					}
					pt = pt._next;
				}
			},
			//compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
			_blobDif = function(start, end, filter, pt) {
				var a = [],
					charIndex = 0,
					s = "",
					color = 0,
					startNums, endNums, num, i, l, nonNumbers, currentNum;
				a.start = start;
				a.end = end;
				start = a[0] = start + ""; //ensure values are strings
				end = a[1] = end + "";
				if (filter) {
					filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
					start = a[0];
					end = a[1];
				}
				a.length = 0;
				startNums = start.match(_numbersExp) || [];
				endNums = end.match(_numbersExp) || [];
				if (pt) {
					pt._next = null;
					pt.blob = 1;
					a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
				}
				l = endNums.length;
				for (i = 0; i < l; i++) {
					currentNum = endNums[i];
					nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex)-charIndex);
					s += (nonNumbers || !i) ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
					charIndex += nonNumbers.length;
					if (color) { //sense rgba() values and round them.
						color = (color + 1) % 5;
					} else if (nonNumbers.substr(-5) === "rgba(") {
						color = 1;
					}
					if (currentNum === startNums[i] || startNums.length <= i) {
						s += currentNum;
					} else {
						if (s) {
							a.push(s);
							s = "";
						}
						num = parseFloat(startNums[i]);
						a.push(num);
						a._firstPT = {_next: a._firstPT, t:a, p: a.length-1, s:num, c:((currentNum.charAt(1) === "=") ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : (parseFloat(currentNum) - num)) || 0, f:0, m:(color && color < 4) ? Math.round : 0};
						//note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
					}
					charIndex += currentNum.length;
				}
				s += end.substr(charIndex);
				if (s) {
					a.push(s);
				}
				a.setRatio = _setRatio;
				if (_relExp.test(end)) { //if the end string contains relative values, delete it so that on the final render (in _setRatio()), we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
					a.end = null;
				}
				return a;
			},
			//note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
			_addPropTween = function(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
				if (typeof(end) === "function") {
					end = end(index || 0, target);
				}
				var type = typeof(target[prop]),
					getterName = (type !== "function") ? "" : ((prop.indexOf("set") || typeof(target["get" + prop.substr(3)]) !== "function") ? prop : "get" + prop.substr(3)),
					s = (start !== "get") ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](),
					isRelative = (typeof(end) === "string" && end.charAt(1) === "="),
					pt = {t:target, p:prop, s:s, f:(type === "function"), pg:0, n:overwriteProp || prop, m:(!mod ? 0 : (typeof(mod) === "function") ? mod : Math.round), pr:0, c:isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : (parseFloat(end) - s) || 0},
					blob;

				if (typeof(s) !== "number" || (typeof(end) !== "number" && !isRelative)) {
					if (funcParam || isNaN(s) || (!isRelative && isNaN(end)) || typeof(s) === "boolean" || typeof(end) === "boolean") {
						//a blob (string that has multiple numbers in it)
						pt.fp = funcParam;
						blob = _blobDif(s, (isRelative ? (parseFloat(pt.s) + pt.c) + (pt.s + "").replace(/[0-9\-\.]/g, "") : end), stringFilter || TweenLite.defaultStringFilter, pt);
						pt = {t: blob, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: overwriteProp || prop, pr: 0, m: 0}; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
					} else {
						pt.s = parseFloat(s);
						if (!isRelative) {
							pt.c = (parseFloat(end) - pt.s) || 0;
						}
					}
				}
				if (pt.c) { //only add it to the linked list if there's a change.
					if ((pt._next = this._firstPT)) {
						pt._next._prev = pt;
					}
					this._firstPT = pt;
					return pt;
				}
			},
			_internals = TweenLite._internals = {isArray:_isArray, isSelector:_isSelector, lazyTweens:_lazyTweens, blobDif:_blobDif}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
			_plugins = TweenLite._plugins = {},
			_tweenLookup = _internals.tweenLookup = {},
			_tweenLookupNum = 0,
			_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1, lazy:1, onOverwrite:1, callbackScope:1, stringFilter:1, id:1, yoyoEase:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
			_nextGCFrame = 30,
			_lazyRender = _internals.lazyRender = function() {
				var i = _lazyTweens.length,
					tween;
				_lazyLookup = {};
				while (--i > -1) {
					tween = _lazyTweens[i];
					if (tween && tween._lazy !== false) {
						tween.render(tween._lazy[0], tween._lazy[1], true);
						tween._lazy = false;
					}
				}
				_lazyTweens.length = 0;
			};

		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;
		setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

		Animation._updateRoot = TweenLite.render = function() {
				var i, a, p;
				if (_lazyTweens.length) { //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
					_lazyRender();
				}
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (_lazyTweens.length) {
					_lazyRender();
				}
				if (_ticker.frame >= _nextGCFrame) { //dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
					_nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
					//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
					p = _rootTimeline._first;
					if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
						while (p && p._paused) {
							p = p._next;
						}
						if (!p) {
							_ticker.sleep();
						}
					}
				}
			};

		_ticker.addEventListener("tick", Animation._updateRoot);

		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},
			_onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
				var func = overwrittenTween.vars.onOverwrite, r1, r2;
				if (func) {
					r1 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				func = TweenLite.onOverwrite;
				if (func) {
					r2 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				return (r1 !== false && r2 !== false);
			},
			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween, l;
				if (mode === 1 || mode >= 4) {
					l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) {
								if (curTween._kill(null, target, tween)) {
									changed = true;
								}
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + _tinyNum,
					overlaps = [],
					oCount = 0,
					zeroDur = (tween._duration === 0),
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
						//ignore
					} else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
						if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;
					}
				}

				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					if (mode === 2) if (curTween._kill(props, target, tween)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
						if (mode !== 2 && !_onOverwrite(curTween, tween)) {
							continue;
						}
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},
			_checkOverlap = function(tween, reference, zeroDur) {
				var tl = tween._timeline,
					ts = tl._timeScale,
					t = tween._startTime;
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * _tinyNum)) ? _tinyNum : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum) ? 0 : t - reference - _tinyNum;
			};


//---- TweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			var v = this.vars,
				op = this._overwrittenProps,
				dur = this._duration,
				immediate = !!v.immediateRender,
				ease = v.ease,
				i, initPlugins, pt, p, startVars, l;
			if (v.startAt) {
				if (this._startAt) {
					this._startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
					this._startAt.kill();
				}
				startVars = {};
				for (p in v.startAt) { //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
					startVars[p] = v.startAt[p];
				}
				startVars.data = "isStart";
				startVars.overwrite = false;
				startVars.immediateRender = true;
				startVars.lazy = (immediate && v.lazy !== false);
				startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).
				startVars.onUpdate = v.onUpdate;
				startVars.onUpdateParams = v.onUpdateParams;
				startVars.onUpdateScope = v.onUpdateScope || v.callbackScope || this;
				this._startAt = TweenLite.to(this.target, 0, startVars);
				if (immediate) {
					if (this._time > 0) {
						this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
					} else if (dur !== 0) {
						return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
					}
				}
			} else if (v.runBackwards && dur !== 0) {
				//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
				if (this._startAt) {
					this._startAt.render(-1, true);
					this._startAt.kill();
					this._startAt = null;
				} else {
					if (this._time !== 0) { //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
						immediate = false;
					}
					pt = {};
					for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
						if (!_reservedProps[p] || p === "autoCSS") {
							pt[p] = v[p];
						}
					}
					pt.overwrite = 0;
					pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
					pt.lazy = (immediate && v.lazy !== false);
					pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
					this._startAt = TweenLite.to(this.target, 0, pt);
					if (!immediate) {
						this._startAt._init(); //ensures that the initial values are recorded
						this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.
						if (this.vars.immediateRender) {
							this._startAt = null;
						}
					} else if (this._time === 0) {
						return;
					}
				}
			}
			this._ease = ease = (!ease) ? TweenLite.defaultEase : (ease instanceof Ease) ? ease : (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
			if (v.easeParams instanceof Array && ease.config) {
				this._ease = ease.config.apply(ease, v.easeParams);
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;

			if (this._targets) {
				l = this._targets.length;
				for (i = 0; i < l; i++) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null), i) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
			}

			if (initPlugins) {
				TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
			}
			if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (v.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = v.onUpdate;
			this._initted = true;
		};

		p._initProps = function(target, propLookup, siblings, overwrittenProps, index) {
			var p, i, initPlugins, plugin, pt, v;
			if (target == null) {
				return false;
			}

			if (_lazyLookup[target._gsTweenID]) {
				_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
			}

			if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
				_autoCSS(this.vars, target);
			}
			for (p in this.vars) {
				v = this.vars[p];
				if (_reservedProps[p]) {
					if (v) if ((v instanceof Array) || (v.push && _isArray(v))) if (v.join("").indexOf("{self}") !== -1) {
						this.vars[p] = v = this._swapSelfInParams(v, this);
					}

				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {

					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					//m - mod           [function | 0]
					this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:1, n:p, pg:1, pr:plugin._priority, m:0};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}
					if (pt._next) {
						pt._next._prev = pt;
					}

				} else {
					propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
				}
			}

			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._firstPT) if ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration)) { //zero duration tweens don't lazy render by default; everything else does.
				_lazyLookup[target._gsTweenID] = true;
			}
			return initPlugins;
		};

		p.render = function(time, suppressEvents, force) {
			var prevTime = this._time,
				duration = this._duration,
				prevRawPrevTime = this._rawPrevTime,
				isComplete, callback, pt, rawPrevTime;
			if (time >= duration - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = duration;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				if (!this._reversed ) {
					isComplete = true;
					callback = "onComplete";
					force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
				}
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && this.data === "isPause")) {
							force = true;
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!this._initted || (this._startAt && this._startAt.progress())) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately. Also, we check progress() because if startAt has already rendered at its end, we should force a render at its beginning. Otherwise, if you put the playhead directly on top of where a fromTo({immediateRender:false}) starts, and then move it backwards, the from() won't revert its values.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;

				if (this._easeType) {
					var r = time / duration, type = this._easeType, pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (time / duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else {
					this.ratio = this._ease.getRatio(time / duration);
				}
			}

			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) {
					this._time = this._totalTime = prevTime;
					this._rawPrevTime = prevRawPrevTime;
					_lazyTweens.push(this);
					this._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			if (this._lazy !== false) { //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
				this._lazy = false;
			}
			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
				this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, true, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._time !== 0 || duration === 0) if (!suppressEvents) {
					this._callback("onStart");
				}
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}

			if (this._onUpdate) {
				if (time < 0) if (this._startAt && time !== -0.0001) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (this._time !== prevTime || isComplete || force) {
					this._callback("onUpdate");
				}
			}
			if (callback) if (!this._gc || force) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && time !== -0.0001) { //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
					this._startAt.render(time, true, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
				if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;
				}
			}
		};

		p._kill = function(vars, target, overwritingTween) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target === this.target) {
				this._lazy = false;
				return this._enabled(false, false);
			}
			target = (typeof(target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
			var simultaneousOverwrite = (overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline),
				i, overwrittenProps, p, pt, propLookup, changed, killProps, record, killed;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i], overwritingTween)) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof(vars) !== "object" || !vars._tempKill)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
						for (p in killProps) {
							if (propLookup[p]) {
								if (!killed) {
									killed = [];
								}
								killed.push(p);
							}
						}
						if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) { //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
							return false;
						}
					}

					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (simultaneousOverwrite) { //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
								if (pt.f) {
									pt.t[pt.p](pt.s);
								} else {
									pt.t[pt.p] = pt.s;
								}
								changed = true;
							}
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) {
							overwrittenProps[p] = 1;
						}
					}
					if (!this._firstPT && this._initted) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
						this._enabled(false, false);
					}
				}
			}
			return changed;
		};

		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				TweenLite._onPluginEvent("_onDisable", this);
			}
			this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
			this._notifyPluginsOfEnabled = this._active = this._lazy = false;
			this._propLookup = (this._targets) ? {} : [];
			Animation.prototype.invalidate.call(this);
			if (this.vars.immediateRender) {
				this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
				this.render(Math.min(0, -this._delay)); //in case delay is negative.
			}
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (enabled && this._gc) {
				var targets = this._targets,
					i;
				if (targets) {
					i = targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};


//----TweenLite static methods -----------------------------------------------------

		TweenLite.to = function(target, duration, vars) {
			return new TweenLite(target, duration, vars);
		};

		TweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenLite(target, duration, vars);
		};

		TweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenLite(target, duration, toVars);
		};

		TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, lazy:false, useFrames:useFrames, overwrite:0});
		};

		TweenLite.set = function(target, vars) {
			return new TweenLite(target, 0, vars);
		};

		TweenLite.getTweensOf = function(target, onlyActive) {
			if (target == null) { return []; }
			target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;
			var i, a, j, t;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else if (target._gsTweenID) {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc || (onlyActive && !a[i].isActive())) {
						a.splice(i, 1);
					}
				}
			}
			return a || [];
		};

		TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {
			if (typeof(onlyActive) === "object") {
				vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)
				onlyActive = false;
			}
			var a = TweenLite.getTweensOf(target, onlyActive),
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};



/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
					this._super = TweenPlugin.prototype;
				}, true);

		p = TweenPlugin.prototype;
		TweenPlugin.version = "1.19.0";
		TweenPlugin.API = 2;
		p._firstPT = null;
		p._addTween = _addPropTween;
		p.setRatio = _setRatio;

		p._kill = function(lookup) {
			var a = this._overwriteProps,
				pt = this._firstPT,
				i;
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i]] != null) {
						a.splice(i, 1);
					}
				}
			}
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		};

		p._mod = p._roundProps = function(lookup) {
			var pt = this._firstPT,
				val;
			while (pt) {
				val = lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ]);
				if (val && typeof(val) === "function") { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					if (pt.f === 2) {
						pt.t._applyPT.m = val;
					} else {
						pt.m = val;
					}
				}
				pt = pt._next;
			}
		};

		TweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT,
				changed, pt2, first, last, next;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		};

		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					_plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		};

		//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
		_gsDefine.plugin = function(config) {
			if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
			var propName = config.propName,
				priority = config.priority || 0,
				overwriteProps = config.overwriteProps,
				map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_mod", mod:"_mod", initAll:"_onInitAllProps"},
				Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
					function() {
						TweenPlugin.call(this, propName, priority);
						this._overwriteProps = overwriteProps || [];
					}, (config.global === true)),
				p = Plugin.prototype = new TweenPlugin(propName),
				prop;
			p.constructor = Plugin;
			Plugin.API = config.API;
			for (prop in map) {
				if (typeof(config[prop]) === "function") {
					p[map[prop]] = config[prop];
				}
			}
			Plugin.version = config.version;
			TweenPlugin.activate([Plugin]);
			return Plugin;
		};


		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
		a = window._gsQueue;
		if (a) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _defLookup) {
				if (!_defLookup[p].func) {
					window.console.log("GSAP encountered missing dependency: " + p);
				}
			}
		}

		_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

})((typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window, "TweenLite");
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(8);

var _TweenMax = __webpack_require__(4);

var _TweenMax2 = _interopRequireDefault(_TweenMax);

var _TimelineMax = __webpack_require__(5);

var _TimelineMax2 = _interopRequireDefault(_TimelineMax);

__webpack_require__(10);

var _t_geo_city_ = __webpack_require__(6);

var _t_geo_city_2 = _interopRequireDefault(_t_geo_city_);

var _t_geo_state_ = __webpack_require__(7);

var _t_geo_state_2 = _interopRequireDefault(_t_geo_state_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports TweenLite
var questions = []; // imports TimelineLite

var intros = [];
var index = 0;
var intro_index = 0;
var started = false;
var moving = false;
var in_ending = false;
var validPersonalInfo = false;
var validname = false,
    validemail = false,
    validphone = false,
    validage = false;

//Mobile breakdown
var is_mobile = false;
var selected_file = "";

function moveToStep(step1, step2, dir) {
    if (!is_mobile) {
        moving = true;
        if (dir) {
            var tll = new _TimelineMax2.default({ onComplete: function onComplete() {
                    moving = false;
                    $(".column.step2." + step2).addClass("active");
                    $(".column.step2." + step2).removeClass("inactive");
                    $(step1).addClass("inactive");
                } });
            //Go to step 2
            tll.staggerTo($(step1), 0.8, { x: -200, opacity: 0, clearProps: 'x' }, 0.4);
            tll.staggerFrom(".column.step2." + step2, 0.8, { x: 200 }, 0.4, "same");
            tll.staggerTo(".column.step2." + step2, 0.8, { opacity: 1 }, 0.4, "same");
        } else {
            $(step1).removeClass("inactive");
            var tll = new _TimelineMax2.default({ onComplete: function onComplete() {
                    moving = false;
                    $(".column.step2." + step2).addClass("inactive");
                    $(".column.step2." + step2).removeClass("active");
                    //Unselect the 
                    $(".step1").find(".option.active").removeClass("active");
                } });
            //Go to step 1
            console.log("Step1: " + step1 + " Step2: " + step2);
            tll.staggerTo($(".column.step2." + step2), 0.8, { x: -200, opacity: 0, clearProps: 'x' }, 0.4);
            tll.staggerFrom($(step1), 0.8, { x: 200 }, 0.4, "same");
            tll.staggerTo($(step1), 0.8, { opacity: 1 }, 0.4, "same");
        }
        tll.play();
    } else {
        //is mobile, just show 
        $(".column.step2.active").hide();
        $(".column.step2." + step2).show();
        $(".column.step2." + step2).addClass('active');

        //update subtitle
        $(".step2subtitle strong").text(step2);
        if ($('.step2subtitle').css('display') == 'none') $(".step2subtitle").show();
    }
}

function updateProgressBar() {
    var total = questions.length;
    var newValue = (index + 1) * 100 / total;
    var beforeValue = $("#progress progress").val();
    var goingUp = newValue > beforeValue ? true : false;

    var update = setInterval(function () {
        if (goingUp && beforeValue >= newValue || !goingUp && beforeValue <= newValue) {
            $("#progress small span:first-of-type").text(index + 1);
            clearInterval(update);
        }
        if (goingUp) $("#progress progress").val(beforeValue++);else $("#progress progress").val(beforeValue--);
    }, 10);
}
function showQuestion(i) {
    if (!is_mobile) {
        moving = true;
        var tll = new _TimelineMax2.default({ onComplete: function onComplete() {
                $("#" + questions[index]).removeClass("active");
                $("#" + questions[i]).addClass("active");
                //Find any step2 in the question item and remove class active
                $("#" + questions[index]).find(".step2").removeClass("active");
                $("#" + questions[index]).find(".step2").addClass("inactive");
                $("#" + questions[index]).find(".step1").removeClass("inactive");
                $("#" + questions[index]).find(".step1").addClass("active");
                index = i;
                moving = false;
                updateProgressBar();
            } });

        if (i != index) tll.staggerTo("#" + questions[index] + " .column:not(.step2.inactive)", 0.8, { x: -200, opacity: 0, clearProps: 'x' }, 0.4);else {
            //is the first question. We have to dissappear the intro part
            $(".introdirs").removeClass("active");
            tll.staggerTo(["#intro_full .column", ".introdirs"], 0.8, { x: -200, opacity: 0, clearProps: 'x' }, 0.4);
        }
        tll.staggerFrom("#" + questions[i] + " .column:not(.step2)", 0.8, { x: 200 }, 0.4, "same");
        tll.staggerTo("#" + questions[i] + " .column:not(.step2)", 0.8, { opacity: 1 }, 0.4, "same");
        if (i == index) {
            tll.staggerFrom("#controls .questiondirs .level-item", 0.8, { x: 200 }, 0.4, "same");
            tll.staggerTo("#controls .questiondirs .level-item", 0.8, { opacity: 1 }, 0.4, "same");
            tll.staggerFrom("#progress .column:not(.step2)", 0.8, { x: 200 }, 0.4, "same");
            tll.staggerTo("#progress .column:not(.step2)", 0.8, { opacity: 1 }, 0.4, "same");
        }
        tll.play();
    }
}
function goToEnding() {
    if (!is_mobile) {
        moving = true;
        var tll = new _TimelineMax2.default({ onComplete: function onComplete() {
                $("#" + questions[questions.length - 1]).removeClass("active");
                //Find any step2 in the question item and remove class active
                $("#" + questions[questions.length - 1]).find(".step2").removeClass("active");
                $("#" + questions[questions.length - 1]).find(".step2").addClass("inactive");
                $("#" + questions[questions.length - 1]).find(".step1").removeClass("inactive");
                $("#" + questions[questions.length - 1]).find(".step1").addClass("active");
                $("#ending").addClass("active");
                moving = false;
                in_ending = true;
            } });
        tll.staggerTo("#" + questions[questions.length - 1] + " .column:not(.step2.inactive)", 0.8, { x: -200, opacity: 0, clearProps: 'x' }, 0.4);
        tll.staggerFrom("#ending .column", 0.8, { x: 200 }, 0.4, "same");
        tll.staggerTo("#ending .column", 0.8, { opacity: 1 }, 0.4, "same");
        tll.play();
    }
}
function backToQuestions() {
    moving = true;
    var tll = new _TimelineMax2.default({ onComplete: function onComplete() {
            $("#" + questions[index]).addClass("active");
            $("#ending").removeClass("active");
            moving = false;
            in_ending = false;
        } });
    tll.staggerTo("#ending .column", 0.8, { x: -200, opacity: 0, clearProps: 'x' }, 0.4);
    tll.staggerFrom("#" + questions[index] + " .column:not(.step2)", 0.8, { x: 200 }, 0.4, "same");
    tll.staggerTo("#" + questions[index] + " .column:not(.step2)", 0.8, { opacity: 1 }, 0.4, "same");
    tll.play();
}
function showIntro(i) {
    if (!is_mobile) {
        moving = true;
        var tll = new _TimelineMax2.default({ onComplete: function onComplete() {
                $("#" + intros[intro_index]).removeClass("active");
                $("#" + intros[i]).addClass("active");
                intro_index = i;
                moving = false;
                //If the current intro is the last one, change color and text of next button
                if (intro_index == intros.length - 1) {
                    $(".introdirs a.next").removeClass("is-linkcolor");
                    $(".introdirs a.next").addClass("is-primary");
                    $(".introdirs a.next").addClass("is-medium");
                    $(".introdirs a.next span:first-of-type").text("empezar formulario");
                }
            } });

        if (i != intro_index) tll.staggerTo("#" + intros[intro_index] + " > *", 0.8, { x: -200, opacity: 0, clearProps: 'x' }, 0.4);
        tll.staggerFrom("#" + intros[i] + " > *", 0.8, { x: 200 }, 0.4, "same");
        tll.staggerTo("#" + intros[i] + " > *", 0.8, { opacity: 1 }, 0.4, "same");
        tll.play();
    }
}
function checkValidations(i) {
    if ($("input[name='usertype']:checked").val() != 'anonymous') {
        if (i == 2) {
            $(".personalinfo input:not([type='radio'])").trigger("change");
            if (validphone && validemail && validname && validage) {
                validPersonalInfo = true;
                return true;
            } else {
                validPersonalInfo = false;
                return false;
            }
        }
    }
    validPersonalInfo = true;
    return true;
}
var iterify = function iterify() {
    questions.next = function () {
        var fromIntro = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (fromIntro) showQuestion(0);else if (index < this.length - 1 && !moving) {
            var tmp = 1;
            while (index + tmp < this.length && $("#" + questions[index + tmp]).hasClass("unavailable")) {
                tmp++;
            }
            if (index + tmp < this.length) {
                //Check validations
                showQuestion(index + 1);
            }
            return true;
        } else if (index == this.length - 1 && !moving && !in_ending) {
            if (checkValidations(index)) goToEnding();
        }

        return false;
    };
    questions.prev = function () {
        if (index > 0 && !moving && !in_ending) {
            showQuestion(index - 1);
            return true;
        } else if (index == this.length - 1 && !moving && in_ending) backToQuestions();
        return false;
    };
    intros.next = function () {
        var first = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (first) showIntro(0);else if (intro_index < this.length - 1 && !moving) {
            showIntro(intro_index + 1);
            return true;
        }

        return false;
    };
    return questions;
};
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function getCities(stateId) {
    $('[name="city_code"]').find('option').remove();
    var theCities = JSON.search(_t_geo_city_2.default, '//*[STA_ID="' + stateId + '"]');
    for (var i = 0; i < theCities.length; i++) {
        var city = theCities[i];

        var id = city.CIT_CODE;
        var name = capitalizeFirstLetter(city.CIT_NAME);
        $("[name='city_code']").append("<option value='" + id + "'>" + name + "</option>");
    }
}
function beforeSendValidations() {
    //validates EVERYTHING
    //At least one motive is selected
    $(".errors").empty();
    $(".personalinfo input:not([type='radio'])").trigger('change');

    //check if motive selected
    checkValidations();
    var errors = [];
    if ($('select[name="CATEGORY_A"] option:selected').val().length < 1) errors.push("Por favor selecciona por lo menos un motivo");else if ($('select[name="CATEGORY_B"] option:selected').val().length < 1) {
        errors.push("Por favor selecciona que te molesta más de <strong>" + $('select[name="CATEGORY_A"] option:selected').val() + "</strong>");
    }
    if ($("input[name='politic_b']:checked").val() == null) errors.push("Por favor selecciona si apoyarias o no a un politico en la pregunta 4");
    if (!validPersonalInfo && $("input[name='usertype']:checked").val() != 'anonymous') errors.push("Por favor llena tus datos personales");
    if ($("input[name='email']").val() && !isEmail($("input[name='email']").val())) errors.push("Por favor ingresa un correo electrónico valido");

    return errors;
}

function consumeWebService(url, method, data) {
    var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "json";

    $.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        beforeSend: function beforeSend(xhr) {
            //Espacio para enviar headers de auth y cosas así necesarias
            xhr.setRequestHeader('X-Test-Header', 'test-value');
        },
        statusCode: {
            404: function _() {
                //Si la URL no existe
                alert("page not found");
            }
        }
    }).done(function (response) {
        //Si todo sale bien
        console.log("success");
        console.log("response");
    }).fail(function () {
        //Si hay un error en el llamado
        console.log("error");
    }).always(function () {
        //Siempre que termine el call sin importar si HTTP 200 o lo que sea
        console.log("complete");
    });
}
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
$(document).ready(function () {
    if ($(window).width() <= 768) is_mobile = true;

    var searcher = JSON.search(_t_geo_city_2.default, '//*[CIT_CODE="43"]');

    //Put states
    for (var i = 0; i < _t_geo_state_2.default.length; i++) {
        var state = _t_geo_state_2.default[i];

        var id = state.STA_ID;
        var name = capitalizeFirstLetter(state.STA_NAME);
        $("[name='state_code']").append("<option value='" + id + "'>" + name + "</option>");
    }
    $("[name='state_code']").val($("[name='state_code'] option:first").val());

    $('[name="state_code"]').change(function () {
        getCities($(this).val());
    });

    $('[name="state_code"]').trigger("change");

    $(".personalinfo input[name='name']").on("change", function () {
        var input = $(this);
        if (input.val() || $("input[name='usertype']:checked").val() == 'anonymous') {
            input.removeClass("is-danger");
            validname = true;
        } else {
            input.addClass("is-danger");
            validname = false;
        }
        console.log("valid: " + validname);
    });
    $(".personalinfo input[name='phone']").on("change", function () {
        var input = $(this);
        if (input.val() || $("input[name='usertype']:checked").val() == 'anonymous') {
            input.removeClass("is-danger");
            validphone = true;
        } else {
            input.addClass("is-danger");
            validphone = false;
        }
        console.log("valid: " + validphone);
    });
    $(".personalinfo input[name='age']").on("change", function () {
        var input = $(this);
        if (input.val() || $("input[name='usertype']:checked").val() == 'anonymous') {
            input.removeClass("is-danger");
            validage = true;
        } else {
            input.addClass("is-danger");
            validage = false;
        }
        console.log("valid: " + validage);
    });
    $(".personalinfo input[type='email']").on("change", function () {
        var input = $(this);
        console.log("email change!");
        if (input.val() || $("input[name='usertype']:checked").val() == 'anonymous') {
            if (isEmail(input.val())) {
                input.removeClass("is-danger");
                validemail = true;
            } else {
                input.addClass("is-danger");
                validemail = false;
            }
        } else {
            input.addClass("is-danger");
            validemail = false;
        }
        console.log("valid: " + validemail);
    });

    $('#prooffile').change(function (e) {
        var maxSize = $(this).data('max-size');
        var fileSize = $(this).get(0).files[0].size / 1000; // in bytes
        if (fileSize > maxSize) $("#fileproblem").show();else $("#fileproblem").hide();
    });

    $(".fblogin").click(function (e) {
        e.preventDefault();
        FB.login(function (response) {
            if (response.status == "connected") {
                //user said YES. Get info
                FB.api("/me?fields=id,name,email", function (userData) {
                    $("input[name='fullname']").val(userData.name);
                    $("input[name='email']").val(userData.email);
                });
            }
        }, { scope: 'public_profile, email' });
    });

    $("#pruebaservice").click(function (e) {
        consumeWebService("https://prueba", "GET");
    });

    //1. Automatic creation of questions
    $(this).find(".item").each(function () {
        var id = $(this).attr('id');
        index = 0;
        questions.push(id);
    });
    $(this).find("#intro_full .slide").each(function () {
        var id = $(this).attr('id');
        index = 0;
        intros.push(id);
    });
    iterify();

    if (is_mobile) {
        //Add numeric stuff
        $(".item .title").each(function (index) {
            $(this).prepend(index + 1 + ") ");
        });
    }
    $("#progress small span:nth-of-type(2)").text(questions.length);

    $("a.intro").click(function (e) {
        e.preventDefault();
        questions.next(true);
        return false;
    });
    $(".questiondirs a.prev").click(function (e) {
        e.preventDefault();
        questions.prev();
    });

    $(".questiondirs a.next").click(function (e) {
        e.preventDefault();
        //Check if validations 
        questions.next();
    });
    $(".introdirs a.next").click(function (e) {
        e.preventDefault();
        if (intro_index == intros.length - 1) {
            questions.next(true);
            started = true;
        } else intros.next();
    });

    $(".selector.with-select.outter-select .option:not(.disabled)").click(function (e) {
        var parent = $(this).closest(".selector");
        var selector = $('select[name="CATEGORY_B"]');
        //if active do nothing
        if (!$(this).hasClass("active")) {
            //Find active one and deactivates it
            $(parent).find(".option.active").removeClass("active");
            $(this).addClass("active");
            //update input tag
            $(selector).val($(this).data("value"));

            if (!$(this).hasClass("notnext")) questions.next();
        }
    });
    //Create selector functionality
    $(".selector.with-select:not(.outter-select) .option:not(.disabled)").click(function (e) {
        var parent = $(this).closest(".selector");
        var selector = $(parent).children("select");
        //if active do nothing
        if (!$(this).hasClass("active")) {
            //Find active one and deactivates it
            $(parent).find(".option.active").removeClass("active");
            $(this).addClass("active");
            //update input tag
            $(selector).val($(this).data("value"));

            if ($(parent).hasClass("with-step")) {
                //Go to step 2
                moveToStep($(this).closest(".step1"), $(this).data("value"), true);
            } else {
                //Go to next question
                if (!$(this).hasClass("notnext")) questions.next();
            }
        }
    });
    //Create radio functionality
    $(".selector.with-radios .option:not(.disabled)").click(function (e) {
        var parent = $(this).closest(".selector");
        var radio = $(this).data("value");
        var item = $(this).data("item");
        var able = $(this).data("able");
        //if active do nothing
        if (!$(this).hasClass("active")) {
            //Find active one and deactivates it
            $(parent).find(".option.active").removeClass("active");
            $(this).addClass("active");
            //update input tag
            $("#" + radio).prop("checked", true);
            $("#" + radio).trigger("change");

            if (able) $("#" + item).removeClass("unavailable");else $("#" + item).addClass("unavailable");

            if (!$(this).hasClass("notnext")) questions.next();
        }
    });

    $("[name='usertype']").change(function (e) {
        if ($(this).val() == "anonymous") $(".personalinfo input, .personalinfo select").prop('disabled', true);else $(".personalinfo input, .personalinfo select").prop('disabled', false);
        $(".personalinfo .option:not(.usertype)").toggleClass('disabled');
    });

    $("input:file").change(function (e) {
        var reader = new FileReader();
        reader.onload = function () {

            var arrayBuffer = this.result,
                array = new Uint8Array(arrayBuffer),
                binaryString = String.fromCharCode.apply(null, array);

            selected_file = binaryString;
        };
        reader.readAsArrayBuffer(this.files[0]);
    });

    //Create multiple checkbox functionality
    $(".selector.with-checkboxes .option:not(.disabled)").click(function (e) {
        var parent = $(this).closest(".selector");
        var checkbox = $(this).data("value");
        //if active do nothing
        if ($(this).hasClass("active")) $("#" + checkbox).prop("checked", false);else {
            $("#" + checkbox).prop("checked", true);
            if ($(this).hasClass("deselectall")) {
                var activeitems = $(parent).find(".option.active").not(".deselectall");
                activeitems.each(function () {
                    $(this).removeClass('active');
                    var cb = $(this).data("value");
                    $("#" + cb).prop("checked", false);
                });
            } else {
                //Check if deselectall is active, if its then deactivates it
                var desall = parent.find(".option.deselectall");
                if (desall && $(desall).hasClass("active")) {
                    $(desall).removeClass('active');
                    var cb = $(desall).data("value");
                    $("#" + cb).prop("checked", false);
                }
            }
        }
        $(this).toggleClass("active");
    });

    $("a.backstep").click(function (e) {
        moveToStep($(".step1"), $(this).data("step") + ".active", false);
        return false;
    });
    $("a.backsteppersonalinfo").click(function (e) {
        moveToStep($(".step0"), "personalinfo", false);
        return false;
    });
    $("a.nextstep").click(function (e) {
        moveToStep($(this).closest(".step0"), "personalinfo", true);
        return false;
    });

    //Show first intro
    intros.next(true);

    $("#formulario").submit(function (event) {
        event.preventDefault();

        var err = beforeSendValidations();
        if (err.length == 0) {
            //send
            var datos = {
                type: $("input[name='type']").val(),
                category_a: $("select[name='CATEGORY_A'] option:selected").val(),
                category_b: $("select[name='CATEGORY_B'] option:selected").val(),
                attachments: selected_file,
                politic_a: $("input[name='politic_a']").val(),
                politic_b: $("input[name='politic_b']:checked").val(),
                politic_c: $("input[name='politic_c']:checked").val(),
                anonymous: $("input[name='usertype']:checked").val() == 'anonymous',
                name: $("input[name='name']").val(),
                email: $("input[name='email']").val(),
                phone: $("input[name='phone']").val(),
                age: $("input[name='age']").val(),
                state_code: $("select[name='state_code'] option:selected").val(),
                city_code: $("select[name='city_code'] option:selected").val(),
                gender: $("input[name='gender']:checked").val(),
                ip_info: navigator.userAgent,
                date: Date.now()
            };
            datos.comments = $("textarea[name='" + datos.category_a + "_extracomment']").val();
            $.getJSON('https://api.ipify.org?format=json', function (data) {
                datos.ip_address = data.ip;
                console.log(datos);
            });
            $("#formodal").addClass("is-active");
            _TweenMax2.default.to($("#formodal"), 0.6, { opacity: 1 });
        } else {
            //show errors
            for (i = 0; i < err.length; i++) {
                $("ul.errors").append("<li>" + err[i] + "</li>");
            }
        }
    });

    $(".modal-close, .closebtn").click(function (e) {
        _TweenMax2.default.to($(this).closest(".modal"), 0.8, { opacity: 0, onComplete: function onComplete() {
                _TweenMax2.default.delayedCall(0.5, function () {
                    $(this).closest(".modal").removeClass("is-active");
                });
                location.reload();
            } });
    });
    $("#termswitch").click(function (e) {
        e.preventDefault();
        $("#terms").addClass("is-active");
        _TweenMax2.default.to($("#terms"), 0.6, { opacity: 1 });

        return false;
    });
});
$(document).keyup(function (e) {
    if (e.which == 13 && !moving && started) {
        questions.next();
    }
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * VERSION: 1.20.4
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

	_gsScope._gsDefine("TweenMax", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {

		var _slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++]));
				return b;
			},
			_applyCycle = function(vars, targets, i) {
				var alt = vars.cycle,
					p, val;
				for (p in alt) {
					val = alt[p];
					vars[p] = (typeof(val) === "function") ? val(i, targets[i]) : val[i % val.length];
				}
				delete vars.cycle;
			},
			TweenMax = function(target, duration, vars) {
				TweenLite.call(this, target, duration, vars);
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true || !!this.vars.yoyoEase);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				if (this._repeat) {
					this._uncache(true); //ensures that if there is any repeat, the totalDuration will get recalculated to accurately report it.
				}
				this.render = TweenMax.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = TweenLite._internals,
			_isSelector = TweenLiteInternals.isSelector,
			_isArray = TweenLiteInternals.isArray,
			p = TweenMax.prototype = TweenLite.to({}, 0.1, {}),
			_blankArray = [];

		TweenMax.version = "1.20.4";
		p.constructor = TweenMax;
		p.kill()._gc = false;
		TweenMax.killTweensOf = TweenMax.killDelayedCallsTo = TweenLite.killTweensOf;
		TweenMax.getTweensOf = TweenLite.getTweensOf;
		TweenMax.lagSmoothing = TweenLite.lagSmoothing;
		TweenMax.ticker = TweenLite.ticker;
		TweenMax.render = TweenLite.render;

		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true || !!this.vars.yoyoEase);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._yoyoEase = null;
			this._uncache(true);
			return TweenLite.prototype.invalidate.call(this);
		};
		
		p.updateTo = function(vars, resetDuration) {
			var curRatio = this.ratio,
				immediate = this.vars.immediateRender || vars.immediateRender,
				p;
			if (resetDuration && this._startTime < this._timeline._time) {
				this._startTime = this._timeline._time;
				this._uncache(false);
				if (this._gc) {
					this._enabled(true, false);
				} else {
					this._timeline.insert(this, this._startTime - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			for (p in vars) {
				this.vars[p] = vars[p];
			}
			if (this._initted || immediate) {
				if (resetDuration) {
					this._initted = false;
					if (immediate) {
						this.render(0, true, true);
					}
				} else {
					if (this._gc) {
						this._enabled(true, false);
					}
					if (this._notifyPluginsOfEnabled && this._firstPT) {
						TweenLite._onPluginEvent("_onDisable", this); //in case a plugin like MotionBlur must perform some cleanup tasks
					}
					if (this._time / this._duration > 0.998) { //if the tween has finished (or come extremely close to finishing), we just need to rewind it to 0 and then render it again at the end which forces it to re-initialize (parsing the new vars). We allow tweens that are close to finishing (but haven't quite finished) to work this way too because otherwise, the values are so small when determining where to project the starting values that binary math issues creep in and can make the tween appear to render incorrectly when run backwards. 
						var prevTime = this._totalTime;
						this.render(0, true, false);
						this._initted = false;
						this.render(prevTime, true, false);
					} else {
						this._initted = false;
						this._init();
						if (this._time > 0 || immediate) {
							var inv = 1 / (1 - curRatio),
								pt = this._firstPT, endValue;
							while (pt) {
								endValue = pt.s + pt.c;
								pt.c *= inv;
								pt.s = endValue - pt.c;
								pt = pt._next;
							}
						}
					}
				}
			}
			return this;
		};
				
		p.render = function(time, suppressEvents, force) {
			if (!this._initted) if (this._duration === 0 && this.vars.repeat) { //zero duration tweens that render immediately have render() called from TweenLite's constructor, before TweenMax's constructor has finished setting _repeat, _repeatDelay, and _yoyo which are critical in determining totalDuration() so we need to call invalidate() which is a low-kb way to get those set properly.
				this.invalidate();
			}
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevTime = this._time,
				prevTotalTime = this._totalTime, 
				prevCycle = this._cycle,
				duration = this._duration,
				prevRawPrevTime = this._rawPrevTime,
				isComplete, callback, pt, cycleDuration, r, type, pow, rawPrevTime, yoyoEase;
			if (time >= totalDur - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = totalDur;
				this._cycle = this._repeat;
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = 0;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				} else {
					this._time = duration;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				}
				if (!this._reversed) {
					isComplete = true;
					callback = "onComplete";
					force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
				}
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}
				
			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = this._cycle = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTotalTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0) {
							force = true;
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;
				if (this._repeat !== 0) {
					cycleDuration = duration + this._repeatDelay;
					this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)
					if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
						this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
					}
					this._time = this._totalTime - (this._cycle * cycleDuration);
					if (this._yoyo) if ((this._cycle & 1) !== 0) {
						this._time = duration - this._time;
						yoyoEase = this._yoyoEase || this.vars.yoyoEase; //note: we don't set this._yoyoEase in _init() like we do other properties because it's TweenMax-specific and doing it here allows us to optimize performance (most tweens don't have a yoyoEase). Note that we also must skip the this.ratio calculation further down right after we _init() in this function, because we're doing it here.
						if (yoyoEase) {
							if (!this._yoyoEase) {
								if (yoyoEase === true && !this._initted) { //if it's not initted and yoyoEase is true, this._ease won't have been populated yet so we must discern it here.
									yoyoEase = this.vars.ease;
									this._yoyoEase = yoyoEase = !yoyoEase ? TweenLite.defaultEase : (yoyoEase instanceof Ease) ? yoyoEase : (typeof(yoyoEase) === "function") ? new Ease(yoyoEase, this.vars.easeParams) : Ease.map[yoyoEase] || TweenLite.defaultEase;
								} else {
									this._yoyoEase = yoyoEase = (yoyoEase === true) ? this._ease : (yoyoEase instanceof Ease) ? yoyoEase : Ease.map[yoyoEase];
								}
							}
							this.ratio = yoyoEase ? 1 - yoyoEase.getRatio((duration - this._time) / duration) : 0;
						}
					}
					if (this._time > duration) {
						this._time = duration;
					} else if (this._time < 0) {
						this._time = 0;
					}
				}
				if (this._easeType && !yoyoEase) {
					r = this._time / duration;
					type = this._easeType;
					pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (this._time / duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else if (!yoyoEase) {
					this.ratio = this._ease.getRatio(this._time / duration);
				}
				
			}
				
			if (prevTime === this._time && !force && prevCycle === this._cycle) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._callback("onUpdate");
				}
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) { //we stick it in the queue for rendering at the very end of the tick - this is a performance optimization because browsers invalidate styles and force a recalculation if you read, write, and then read style data (so it's better to read/read/read/write/write/write than read/write/read/write/read/write). The down side, of course, is that usually you WANT things to render immediately because you may have code running right after that which depends on the change. Like imagine running TweenLite.set(...) and then immediately after that, creating a nother tween that animates the same property to another value; the starting values of that 2nd tween wouldn't be accurate if lazy is true.
					this._time = prevTime;
					this._totalTime = prevTotalTime;
					this._rawPrevTime = prevRawPrevTime;
					this._cycle = prevCycle;
					TweenLiteInternals.lazyTweens.push(this);
					this._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete && !yoyoEase) {
					this.ratio = this._ease.getRatio(this._time / duration);
				} else if (isComplete && this._ease._calcEnd && !yoyoEase) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			if (this._lazy !== false) {
				this._lazy = false;
			}

			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
				this._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTotalTime === 0) {
				if (this._initted === 2 && time > 0) {
					//this.invalidate();
					this._init(); //will just apply overwriting since _initted of (2) means it was a from() tween that had immediateRender:true
				}
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, true, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._totalTime !== 0 || duration === 0) if (!suppressEvents) {
					this._callback("onStart");
				}
			}
			
			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}
			
			if (this._onUpdate) {
				if (time < 0) if (this._startAt && this._startTime) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (this._totalTime !== prevTotalTime || callback) {
					this._callback("onUpdate");
				}
			}
			if (this._cycle !== prevCycle) if (!suppressEvents) if (!this._gc) if (this.vars.onRepeat) {
				this._callback("onRepeat");
			}
			if (callback) if (!this._gc || force) { //check gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && this._startTime) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, true, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
				if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;
				}
			}
		};
		
//---- STATIC FUNCTIONS -----------------------------------------------------------------------------------------------------------
		
		TweenMax.to = function(target, duration, vars) {
			return new TweenMax(target, duration, vars);
		};
		
		TweenMax.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenMax(target, duration, vars);
		};
		
		TweenMax.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenMax(target, duration, toVars);
		};
		
		TweenMax.staggerTo = TweenMax.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			stagger = stagger || 0;
			var delay = 0,
				a = [],
				finalComplete = function() {
					if (vars.onComplete) {
						vars.onComplete.apply(vars.onCompleteScope || this, arguments);
					}
					onCompleteAll.apply(onCompleteAllScope || vars.callbackScope || this, onCompleteAllParams || _blankArray);
				},
				cycle = vars.cycle,
				fromCycle = (vars.startAt && vars.startAt.cycle),
				l, copy, i, p;
			if (!_isArray(targets)) {
				if (typeof(targets) === "string") {
					targets = TweenLite.selector(targets) || targets;
				}
				if (_isSelector(targets)) {
					targets = _slice(targets);
				}
			}
			targets = targets || [];
			if (stagger < 0) {
				targets = _slice(targets);
				targets.reverse();
				stagger *= -1;
			}
			l = targets.length - 1;
			for (i = 0; i <= l; i++) {
				copy = {};
				for (p in vars) {
					copy[p] = vars[p];
				}
				if (cycle) {
					_applyCycle(copy, targets, i);
					if (copy.duration != null) {
						duration = copy.duration;
						delete copy.duration;
					}
				}
				if (fromCycle) {
					fromCycle = copy.startAt = {};
					for (p in vars.startAt) {
						fromCycle[p] = vars.startAt[p];
					}
					_applyCycle(copy.startAt, targets, i);
				}
				copy.delay = delay + (copy.delay || 0);
				if (i === l && onCompleteAll) {
					copy.onComplete = finalComplete;
				}
				a[i] = new TweenMax(targets[i], duration, copy);
				delay += stagger;
			}
			return a;
		};
		
		TweenMax.staggerFrom = TweenMax.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return TweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
		
		TweenMax.staggerFromTo = TweenMax.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return TweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
				
		TweenMax.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenMax(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, useFrames:useFrames, overwrite:0});
		};
		
		TweenMax.set = function(target, vars) {
			return new TweenMax(target, 0, vars);
		};
		
		TweenMax.isTweening = function(target) {
			return (TweenLite.getTweensOf(target, true).length > 0);
		};
		
		var _getChildrenOf = function(timeline, includeTimelines) {
				var a = [],
					cnt = 0,
					tween = timeline._first;
				while (tween) {
					if (tween instanceof TweenLite) {
						a[cnt++] = tween;
					} else {
						if (includeTimelines) {
							a[cnt++] = tween;
						}
						a = a.concat(_getChildrenOf(tween, includeTimelines));
						cnt = a.length;
					}
					tween = tween._next;
				}
				return a;
			}, 
			getAllTweens = TweenMax.getAllTweens = function(includeTimelines) {
				return _getChildrenOf(Animation._rootTimeline, includeTimelines).concat( _getChildrenOf(Animation._rootFramesTimeline, includeTimelines) );
			};
		
		TweenMax.killAll = function(complete, tweens, delayedCalls, timelines) {
			if (tweens == null) {
				tweens = true;
			}
			if (delayedCalls == null) {
				delayedCalls = true;
			}
			var a = getAllTweens((timelines != false)),
				l = a.length,
				allTrue = (tweens && delayedCalls && timelines),
				isDC, tween, i;
			for (i = 0; i < l; i++) {
				tween = a[i];
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					if (complete) {
						tween.totalTime(tween._reversed ? 0 : tween.totalDuration());
					} else {
						tween._enabled(false, false);
					}
				}
			}
		};
		
		TweenMax.killChildTweensOf = function(parent, complete) {
			if (parent == null) {
				return;
			}
			var tl = TweenLiteInternals.tweenLookup,
				a, curParent, p, i, l;
			if (typeof(parent) === "string") {
				parent = TweenLite.selector(parent) || parent;
			}
			if (_isSelector(parent)) {
				parent = _slice(parent);
			}
			if (_isArray(parent)) {
				i = parent.length;
				while (--i > -1) {
					TweenMax.killChildTweensOf(parent[i], complete);
				}
				return;
			}
			a = [];
			for (p in tl) {
				curParent = tl[p].target.parentNode;
				while (curParent) {
					if (curParent === parent) {
						a = a.concat(tl[p].tweens);
					}
					curParent = curParent.parentNode;
				}
			}
			l = a.length;
			for (i = 0; i < l; i++) {
				if (complete) {
					a[i].totalTime(a[i].totalDuration());
				}
				a[i]._enabled(false, false);
			}
		};

		var _changePause = function(pause, tweens, delayedCalls, timelines) {
			tweens = (tweens !== false);
			delayedCalls = (delayedCalls !== false);
			timelines = (timelines !== false);
			var a = getAllTweens(timelines),
				allTrue = (tweens && delayedCalls && timelines),
				i = a.length,
				isDC, tween;
			while (--i > -1) {
				tween = a[i];
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					tween.paused(pause);
				}
			}
		};
		
		TweenMax.pauseAll = function(tweens, delayedCalls, timelines) {
			_changePause(true, tweens, delayedCalls, timelines);
		};
		
		TweenMax.resumeAll = function(tweens, delayedCalls, timelines) {
			_changePause(false, tweens, delayedCalls, timelines);
		};

		TweenMax.globalTimeScale = function(value) {
			var tl = Animation._rootTimeline,
				t = TweenLite.ticker.time;
			if (!arguments.length) {
				return tl._timeScale;
			}
			value = value || _tinyNum; //can't allow zero because it'll throw the math off
			tl._startTime = t - ((t - tl._startTime) * tl._timeScale / value);
			tl = Animation._rootFramesTimeline;
			t = TweenLite.ticker.frame;
			tl._startTime = t - ((t - tl._startTime) * tl._timeScale / value);
			tl._timeScale = Animation._rootTimeline._timeScale = value;
			return value;
		};
		
	
//---- GETTERS / SETTERS ----------------------------------------------------------------------------------------------------------
		
		p.progress = function(value, suppressEvents) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents);
		};
		
		p.totalProgress = function(value, suppressEvents) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, suppressEvents);
		};
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.duration = function(value) {
			if (!arguments.length) {
				return this._duration; //don't set _dirty = false because there could be repeats that haven't been factored into the _totalDuration yet. Otherwise, if you create a repeated TweenMax and then immediately check its duration(), it would cache the value and the totalDuration would not be correct, thus repeats wouldn't take effect.
			}
			return Animation.prototype.duration.call(this, value);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					//instead of Infinity, we use 999999999999 so that we can accommodate reverses
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (this._repeat === -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		};
		
		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};
		
		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};
		
		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};
		
		
		return TweenMax;
		
	}, true);








/*
 * ----------------------------------------------------------------
 * TimelineLite
 * ----------------------------------------------------------------
 */
	_gsScope._gsDefine("TimelineLite", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {

		var TimelineLite = function(vars) {
				SimpleTimeline.call(this, vars);
				this._labels = {};
				this.autoRemoveChildren = (this.vars.autoRemoveChildren === true);
				this.smoothChildTiming = (this.vars.smoothChildTiming === true);
				this._sortChildren = true;
				this._onUpdate = this.vars.onUpdate;
				var v = this.vars,
					val, p;
				for (p in v) {
					val = v[p];
					if (_isArray(val)) if (val.join("").indexOf("{self}") !== -1) {
						v[p] = this._swapSelfInParams(val);
					}
				}
				if (_isArray(v.tweens)) {
					this.add(v.tweens, 0, v.align, v.stagger);
				}
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = TweenLite._internals,
			_internals = TimelineLite._internals = {},
			_isSelector = TweenLiteInternals.isSelector,
			_isArray = TweenLiteInternals.isArray,
			_lazyTweens = TweenLiteInternals.lazyTweens,
			_lazyRender = TweenLiteInternals.lazyRender,
			_globals = _gsScope._gsDefine.globals,
			_copy = function(vars) {
				var copy = {}, p;
				for (p in vars) {
					copy[p] = vars[p];
				}
				return copy;
			},
			_applyCycle = function(vars, targets, i) {
				var alt = vars.cycle,
					p, val;
				for (p in alt) {
					val = alt[p];
					vars[p] = (typeof(val) === "function") ? val(i, targets[i]) : val[i % val.length];
				}
				delete vars.cycle;
			},
			_pauseCallback = _internals.pauseCallback = function() {},
			_slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++]));
				return b;
			},
			p = TimelineLite.prototype = new SimpleTimeline();

		TimelineLite.version = "1.20.4";
		p.constructor = TimelineLite;
		p.kill()._gc = p._forcingPlayhead = p._hasPause = false;

		/* might use later...
		//translates a local time inside an animation to the corresponding time on the root/global timeline, factoring in all nesting and timeScales.
		function localToGlobal(time, animation) {
			while (animation) {
				time = (time / animation._timeScale) + animation._startTime;
				animation = animation.timeline;
			}
			return time;
		}

		//translates the supplied time on the root/global timeline into the corresponding local time inside a particular animation, factoring in all nesting and timeScales
		function globalToLocal(time, animation) {
			var scale = 1;
			time -= localToGlobal(0, animation);
			while (animation) {
				scale *= animation._timeScale;
				animation = animation.timeline;
			}
			return time * scale;
		}
		*/

		p.to = function(target, duration, vars, position) {
			var Engine = (vars.repeat && _globals.TweenMax) || TweenLite;
			return duration ? this.add( new Engine(target, duration, vars), position) : this.set(target, vars, position);
		};

		p.from = function(target, duration, vars, position) {
			return this.add( ((vars.repeat && _globals.TweenMax) || TweenLite).from(target, duration, vars), position);
		};

		p.fromTo = function(target, duration, fromVars, toVars, position) {
			var Engine = (toVars.repeat && _globals.TweenMax) || TweenLite;
			return duration ? this.add( Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
		};

		p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, callbackScope:onCompleteAllScope, smoothChildTiming:this.smoothChildTiming}),
				cycle = vars.cycle,
				copy, i;
			if (typeof(targets) === "string") {
				targets = TweenLite.selector(targets) || targets;
			}
			targets = targets || [];
			if (_isSelector(targets)) { //senses if the targets object is a selector. If it is, we should translate it into an array.
				targets = _slice(targets);
			}
			stagger = stagger || 0;
			if (stagger < 0) {
				targets = _slice(targets);
				targets.reverse();
				stagger *= -1;
			}
			for (i = 0; i < targets.length; i++) {
				copy = _copy(vars);
				if (copy.startAt) {
					copy.startAt = _copy(copy.startAt);
					if (copy.startAt.cycle) {
						_applyCycle(copy.startAt, targets, i);
					}
				}
				if (cycle) {
					_applyCycle(copy, targets, i);
					if (copy.duration != null) {
						duration = copy.duration;
						delete copy.duration;
					}
				}
				tl.to(targets[i], duration, copy, i * stagger);
			}
			return this.add(tl, position);
		};

		p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.immediateRender = (vars.immediateRender != false);
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.call = function(callback, params, scope, position) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.set = function(target, vars, position) {
			position = this._parseTimeOrLabel(position, 0, true);
			if (vars.immediateRender == null) {
				vars.immediateRender = (position === this._time && !this._paused);
			}
			return this.add( new TweenLite(target, 0, vars), position);
		};

		TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new TimelineLite(vars),
				root = tl._timeline,
				hasNegativeStart, time,	tween, next;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			tween = root._first;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target === tween.vars.onComplete)) {
					time = tween._startTime - tween._delay;
					if (time < 0) {
						hasNegativeStart = 1;
					}
					tl.add(tween, time);
				}
				tween = next;
			}
			root.add(tl, 0);
			if (hasNegativeStart) { //calling totalDuration() will force the adjustment necessary to shift the children forward so none of them start before zero, and moves the timeline backwards the same amount, so the playhead is still aligned where it should be globally, but the timeline doesn't have illegal children that start before zero.
				tl.totalDuration();
			}
			return tl;
		};

		p.add = function(value, position, align, stagger) {
			var curTime, l, i, child, tl, beforeRawTime;
			if (typeof(position) !== "number") {
				position = this._parseTimeOrLabel(position, 0, true, value);
			}
			if (!(value instanceof Animation)) {
				if ((value instanceof Array) || (value && value.push && _isArray(value))) {
					align = align || "normal";
					stagger = stagger || 0;
					curTime = position;
					l = value.length;
					for (i = 0; i < l; i++) {
						if (_isArray(child = value[i])) {
							child = new TimelineLite({tweens:child});
						}
						this.add(child, curTime);
						if (typeof(child) !== "string" && typeof(child) !== "function") {
							if (align === "sequence") {
								curTime = child._startTime + (child.totalDuration() / child._timeScale);
							} else if (align === "start") {
								child._startTime -= child.delay();
							}
						}
						curTime += stagger;
					}
					return this._uncache(true);
				} else if (typeof(value) === "string") {
					return this.addLabel(value, position);
				} else if (typeof(value) === "function") {
					value = TweenLite.delayedCall(0, value);
				} else {
					throw("Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.");
				}
			}

			SimpleTimeline.prototype.add.call(this, value, position);

			if (value._time) { //in case, for example, the _startTime is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
				value.render((this.rawTime() - value._startTime) * value._timeScale, false, false);
			}

			//if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.
			if (this._gc || this._time === this._duration) if (!this._paused) if (this._duration < this.duration()) {
				//in case any of the ancestors had completed but should now be enabled...
				tl = this;
				beforeRawTime = (tl.rawTime() > value._startTime); //if the tween is placed on the timeline so that it starts BEFORE the current rawTime, we should align the playhead (move the timeline). This is because sometimes users will create a timeline, let it finish, and much later append a tween and expect it to run instead of jumping to its end state. While technically one could argue that it should jump to its end state, that's not what users intuitively expect.
				while (tl._timeline) {
					if (beforeRawTime && tl._timeline.smoothChildTiming) {
						tl.totalTime(tl._totalTime, true); //moves the timeline (shifts its startTime) if necessary, and also enables it.
					} else if (tl._gc) {
						tl._enabled(true, false);
					}
					tl = tl._timeline;
				}
			}

			return this;
		};

		p.remove = function(value) {
			if (value instanceof Animation) {
				this._remove(value, false);
				var tl = value._timeline = value.vars.useFrames ? Animation._rootFramesTimeline : Animation._rootTimeline; //now that it's removed, default it to the root timeline so that if it gets played again, it doesn't jump back into this timeline.
				value._startTime = (value._paused ? value._pauseTime : tl._time) - ((!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale); //ensure that if it gets played again, the timing is correct.
				return this;
			} else if (value instanceof Array || (value && value.push && _isArray(value))) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof(value) === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		};

		p._remove = function(tween, skipDisable) {
			SimpleTimeline.prototype._remove.call(this, tween, skipDisable);
			var last = this._last;
			if (!last) {
				this._time = this._totalTime = this._duration = this._totalDuration = 0;
			} else if (this._time > this.duration()) {
				this._time = this._duration;
				this._totalTime = this._totalDuration;
			}
			return this;
		};

		p.append = function(value, offsetOrLabel) {
			return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
		};

		p.insert = p.insertMultiple = function(value, position, align, stagger) {
			return this.add(value, position || 0, align, stagger);
		};

		p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
			return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
		};

		p.addLabel = function(label, position) {
			this._labels[label] = this._parseTimeOrLabel(position);
			return this;
		};

		p.addPause = function(position, callback, params, scope) {
			var t = TweenLite.delayedCall(0, _pauseCallback, params, scope || this);
			t.vars.onComplete = t.vars.onReverseComplete = callback;
			t.data = "isPause";
			this._hasPause = true;
			return this.add(t, position);
		};

		p.removeLabel = function(label) {
			delete this._labels[label];
			return this;
		};

		p.getLabelTime = function(label) {
			return (this._labels[label] != null) ? this._labels[label] : -1;
		};

		p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
			var clippedDuration, i;
			//if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().
			if (ignore instanceof Animation && ignore.timeline === this) {
				this.remove(ignore);
			} else if (ignore && ((ignore instanceof Array) || (ignore.push && _isArray(ignore)))) {
				i = ignore.length;
				while (--i > -1) {
					if (ignore[i] instanceof Animation && ignore[i].timeline === this) {
						this.remove(ignore[i]);
					}
				}
			}
			clippedDuration = (typeof(timeOrLabel) === "number" && !offsetOrLabel) ? 0 : (this.duration() > 99999999999) ? this.recent().endTime(false) : this._duration; //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
			if (typeof(offsetOrLabel) === "string") {
				return this._parseTimeOrLabel(offsetOrLabel, (appendIfAbsent && typeof(timeOrLabel) === "number" && this._labels[offsetOrLabel] == null) ? timeOrLabel - clippedDuration : 0, appendIfAbsent);
			}
			offsetOrLabel = offsetOrLabel || 0;
			if (typeof(timeOrLabel) === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) { //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
				i = timeOrLabel.indexOf("=");
				if (i === -1) {
					if (this._labels[timeOrLabel] == null) {
						return appendIfAbsent ? (this._labels[timeOrLabel] = clippedDuration + offsetOrLabel) : offsetOrLabel;
					}
					return this._labels[timeOrLabel] + offsetOrLabel;
				}
				offsetOrLabel = parseInt(timeOrLabel.charAt(i-1) + "1", 10) * Number(timeOrLabel.substr(i+1));
				timeOrLabel = (i > 1) ? this._parseTimeOrLabel(timeOrLabel.substr(0, i-1), 0, appendIfAbsent) : clippedDuration;
			} else if (timeOrLabel == null) {
				timeOrLabel = clippedDuration;
			}
			return Number(timeOrLabel) + offsetOrLabel;
		};

		p.seek = function(position, suppressEvents) {
			return this.totalTime((typeof(position) === "number") ? position : this._parseTimeOrLabel(position), (suppressEvents !== false));
		};

		p.stop = function() {
			return this.paused(true);
		};

		p.gotoAndPlay = function(position, suppressEvents) {
			return this.play(position, suppressEvents);
		};

		p.gotoAndStop = function(position, suppressEvents) {
			return this.pause(position, suppressEvents);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var prevTime = this._time,
				totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevPaused = this._paused,
				tween, isComplete, next, callback, internalForce, pauseTween, curTime;
			if (prevTime !== this._time) { //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
				time += this._time - prevTime;
			}
			if (time >= totalDur - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = totalDur;
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					if (this._duration === 0) if ((time <= 0 && time >= -0.0000001) || this._rawPrevTime < 0 || this._rawPrevTime === _tinyNum) if (this._rawPrevTime !== time && this._first) {
						internalForce = true;
						if (this._rawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				time = totalDur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7.

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime !== _tinyNum && (this._rawPrevTime > 0 || (time < 0 && this._rawPrevTime >= 0)))) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) { //ensures proper GC if a timeline is resumed after it's finished reversing.
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (this._rawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {
						internalForce = true;
					}
				}

			} else {

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					if (time >= prevTime) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay));
					}
				}

				this._totalTime = this._time = this._rawPrevTime = time;
			}
			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (!this._active) if (!this._paused && this._time !== prevTime && time > 0) {
				this._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}

			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0 || !this._duration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= curTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}

			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};

		p._hasPausedChild = function() {
			var tween = this._first;
			while (tween) {
				if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		};

		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [],
				tween = this._first,
				cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) {
					//do nothing
				} else if (tween instanceof TweenLite) {
					if (tweens !== false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines !== false) {
						a[cnt++] = tween;
					}
					if (nested !== false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		};

		p.getTweensOf = function(target, nested) {
			var disabled = this._gc,
				a = [],
				cnt = 0,
				tweens, i;
			if (disabled) {
				this._enabled(true, true); //getTweensOf() filters out disabled tweens, and we have to mark them as _gc = true when the timeline completes in order to allow clean garbage collection, so temporarily re-enable the timeline here.
			}
			tweens = TweenLite.getTweensOf(target);
			i = tweens.length;
			while (--i > -1) {
				if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
					a[cnt++] = tweens[i];
				}
			}
			if (disabled) {
				this._enabled(false, true);
			}
			return a;
		};

		p.recent = function() {
			return this._recent;
		};

		p._contains = function(tween) {
			var tl = tween.timeline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.timeline;
			}
			return false;
		};

		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first,
				labels = this._labels,
				p;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (p in labels) {
					if (labels[p] >= ignoreBeforeTime) {
						labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		};

		p._kill = function(vars, target) {
			if (!vars && !target) {
				return this._enabled(false, false);
			}
			var tweens = (!target) ? this.getChildren(true, true, false) : this.getTweensOf(target),
				i = tweens.length,
				changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		};

		p.clear = function(labels) {
			var tweens = this.getChildren(false, true, true),
				i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels !== false) {
				this._labels = {};
			}
			return this._uncache(true);
		};

		p.invalidate = function() {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return Animation.prototype.invalidate.call(this);;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled === this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			this._forcingPlayhead = true;
			var val = Animation.prototype.totalTime.apply(this, arguments);
			this._forcingPlayhead = false;
			return val;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0 && value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0,
						tween = this._last,
						prevStart = 999999999999,
						prev, end;
					while (tween) {
						prev = tween._prev; //record it here in case the tween changes position in the sequence...
						if (tween._dirty) {
							tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
						}
						if (tween._startTime > prevStart && this._sortChildren && !tween._paused && !this._calculatingDuration) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this._calculatingDuration = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add(), like _parseTimeOrLabel().
							this.add(tween, tween._startTime - tween._delay);
							this._calculatingDuration = 0;
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0 && !tween._paused) { //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
							max -= tween._startTime;
							if (this._timeline.smoothChildTiming) {
								this._startTime += tween._startTime / this._timeScale;
								this._time -= tween._startTime;
								this._totalTime -= tween._startTime;
								this._rawPrevTime -= tween._startTime;
							}
							this.shiftChildren(-tween._startTime, false, -9999999999);
							prevStart = 0;
						}
						end = tween._startTime + (tween._totalDuration / tween._timeScale);
						if (end > max) {
							max = end;
						}
						tween = prev;
					}
					this._duration = this._totalDuration = max;
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (value && this.totalDuration()) ? this.timeScale(this._totalDuration / value) : this;
		};

		p.paused = function(value) {
			if (!value) { //if there's a pause directly at the spot from where we're unpausing, skip it.
				var tween = this._first,
					time = this._time;
				while (tween) {
					if (tween._startTime === time && tween.data === "isPause") {
						tween._rawPrevTime = 0; //remember, _rawPrevTime is how zero-duration tweens/callbacks sense directionality and determine whether or not to fire. If _rawPrevTime is the same as _startTime on the next render, it won't fire.
					}
					tween = tween._next;
				}
			}
			return Animation.prototype.paused.apply(this, arguments);
		};

		p.usesFrames = function() {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return (tl === Animation._rootFramesTimeline);
		};

		p.rawTime = function(wrapRepeats) {
			return (wrapRepeats && (this._paused || (this._repeat && this.time() > 0 && this.totalProgress() < 1))) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(wrapRepeats) - this._startTime) * this._timeScale;
		};

		return TimelineLite;

	}, true);








	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * TimelineMax
 * ----------------------------------------------------------------
 */
	_gsScope._gsDefine("TimelineMax", ["TimelineLite","TweenLite","easing.Ease"], function(TimelineLite, TweenLite, Ease) {

		var TimelineMax = function(vars) {
				TimelineLite.call(this, vars);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._dirty = true;
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = TweenLite._internals,
			_lazyTweens = TweenLiteInternals.lazyTweens,
			_lazyRender = TweenLiteInternals.lazyRender,
			_globals = _gsScope._gsDefine.globals,
			_easeNone = new Ease(null, null, 1, 0),
			p = TimelineMax.prototype = new TimelineLite();

		p.constructor = TimelineMax;
		p.kill()._gc = false;
		TimelineMax.version = "1.20.4";

		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return TimelineLite.prototype.invalidate.call(this);
		};

		p.addCallback = function(callback, position, params, scope) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.removeCallback = function(callback, position) {
			if (callback) {
				if (position == null) {
					this._kill(null, callback);
				} else {
					var a = this.getTweensOf(callback, false),
						i = a.length,
						time = this._parseTimeOrLabel(position);
					while (--i > -1) {
						if (a[i]._startTime === time) {
							a[i]._enabled(false, false);
						}
					}
				}
			}
			return this;
		};

		p.removePause = function(position) {
			return this.removeCallback(TimelineLite._internals.pauseCallback, position);
		};

		p.tweenTo = function(position, vars) {
			vars = vars || {};
			var copy = {ease:_easeNone, useFrames:this.usesFrames(), immediateRender:false, lazy:false},
				Engine = (vars.repeat && _globals.TweenMax) || TweenLite,
				duration, p, t;
			for (p in vars) {
				copy[p] = vars[p];
			}
			copy.time = this._parseTimeOrLabel(position);
			duration = (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001;
			t = new Engine(this, duration, copy);
			copy.onStart = function() {
				t.target.paused(true);
				if (t.vars.time !== t.target.time() && duration === t.duration() && !t.isFromTo) { //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
					t.duration( Math.abs( t.vars.time - t.target.time()) / t.target._timeScale ).render(t.time(), true, true); //render() right away to ensure that things look right, especially in the case of .tweenTo(0).
				}
				if (vars.onStart) { //in case the user had an onStart in the vars - we don't want to overwrite it.
					vars.onStart.apply(vars.onStartScope || vars.callbackScope || t, vars.onStartParams || []); //don't use t._callback("onStart") or it'll point to the copy.onStart and we'll get a recursion error.
				}
			};
			return t;
		};

		p.tweenFromTo = function(fromPosition, toPosition, vars) {
			vars = vars || {};
			fromPosition = this._parseTimeOrLabel(fromPosition);
			vars.startAt = {onComplete:this.seek, onCompleteParams:[fromPosition], callbackScope:this};
			vars.immediateRender = (vars.immediateRender !== false);
			var t = this.tweenTo(toPosition, vars);
			t.isFromTo = 1; //to ensure we don't mess with the duration in the onStart (we've got the start and end values here, so lock it in)
			return t.duration((Math.abs( t.vars.time - fromPosition) / this._timeScale) || 0.001);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var prevTime = this._time,
				totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				dur = this._duration,
				prevTotalTime = this._totalTime,
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevRawPrevTime = this._rawPrevTime,
				prevPaused = this._paused,
				prevCycle = this._cycle,
				tween, isComplete, next, callback, internalForce, cycleDuration, pauseTween, curTime;
			if (prevTime !== this._time) { //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
				time += this._time - prevTime;
			}
			if (time >= totalDur - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				if (!this._locked) {
					this._totalTime = totalDur;
					this._cycle = this._repeat;
				}
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					if (this._duration === 0) if ((time <= 0 && time >= -0.0000001) || prevRawPrevTime < 0 || prevRawPrevTime === _tinyNum) if (prevRawPrevTime !== time && this._first) {
						internalForce = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = time = 0;
				} else {
					this._time = dur;
					time = dur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7. We cannot do less then 0.0001 because the same issue can occur when the duration is extremely large like 999999999999 in which case adding 0.00000001, for example, causes it to act like nothing was added.
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				if (!this._locked) {
					this._totalTime = this._cycle = 0;
				}
				this._time = 0;
				if (prevTime !== 0 || (dur === 0 && prevRawPrevTime !== _tinyNum && (prevRawPrevTime > 0 || (time < 0 && prevRawPrevTime >= 0)) && !this._locked)) { //edge case for checking time < 0 && prevRawPrevTime >= 0: a zero-duration fromTo() tween inside a zero-duration timeline (yeah, very rare)
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) {
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (prevRawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = (dur || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {
						internalForce = true;
					}
				}

			} else {
				if (dur === 0 && prevRawPrevTime < 0) { //without this, zero-duration repeating timelines (like with a simple callback nested at the very beginning and a repeatDelay) wouldn't render the first time through.
					internalForce = true;
				}
				this._time = this._rawPrevTime = time;
				if (!this._locked) {
					this._totalTime = time;
					if (this._repeat !== 0) {
						cycleDuration = dur + this._repeatDelay;
						this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but it gets reported as 0.79999999!)
						if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
							this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
						}
						this._time = this._totalTime - (this._cycle * cycleDuration);
						if (this._yoyo) if ((this._cycle & 1) !== 0) {
							this._time = dur - this._time;
						}
						if (this._time > dur) {
							this._time = dur;
							time = dur + 0.0001; //to avoid occasional floating point rounding error
						} else if (this._time < 0) {
							this._time = time = 0;
						} else {
							time = this._time;
						}
					}
				}

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					time = this._time;
					if (time >= prevTime || (this._repeat && prevCycle !== this._cycle)) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween && pauseTween._startTime < dur) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay));
					}
				}

			}

			if (this._cycle !== prevCycle) if (!this._locked) {
				/*
				make sure children at the end/beginning of the timeline are rendered properly. If, for example,
				a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
				would get transated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
				could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
				we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
				ensure that zero-duration tweens at the very beginning or end of the TimelineMax work.
				*/
				var backwards = (this._yoyo && (prevCycle & 1) !== 0),
					wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),
					recTotalTime = this._totalTime,
					recCycle = this._cycle,
					recRawPrevTime = this._rawPrevTime,
					recTime = this._time;

				this._totalTime = prevCycle * dur;
				if (this._cycle < prevCycle) {
					backwards = !backwards;
				} else {
					this._totalTime += dur;
				}
				this._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.

				this._rawPrevTime = (dur === 0) ? prevRawPrevTime - 0.0001 : prevRawPrevTime;
				this._cycle = prevCycle;
				this._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()
				prevTime = (backwards) ? 0 : dur;
				this.render(prevTime, suppressEvents, (dur === 0));
				if (!suppressEvents) if (!this._gc) {
					if (this.vars.onRepeat) {
						this._cycle = recCycle; //in case the onRepeat alters the playhead or invalidates(), we shouldn't stay locked or use the previous cycle.
						this._locked = false;
						this._callback("onRepeat");
					}
				}
				if (prevTime !== this._time) { //in case there's a callback like onComplete in a nested tween/timeline that changes the playhead position, like via seek(), we should just abort.
					return;
				}
				if (wrap) {
					this._cycle = prevCycle; //if there's an onRepeat, we reverted this above, so make sure it's set properly again. We also unlocked in that scenario, so reset that too.
					this._locked = true;
					prevTime = (backwards) ? dur + 0.0001 : -0.0001;
					this.render(prevTime, true, false);
				}
				this._locked = false;
				if (this._paused && !prevPaused) { //if the render() triggered callback that paused this timeline, we should abort (very rare, but possible)
					return;
				}
				this._time = recTime;
				this._totalTime = recTotalTime;
				this._cycle = recCycle;
				this._rawPrevTime = recRawPrevTime;
			}

			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._callback("onUpdate");
				}
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (!this._active) if (!this._paused && this._totalTime !== prevTotalTime && time > 0) {
				this._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}

			if (prevTotalTime === 0) if (this.vars.onStart) if (this._totalTime !== 0 || !this._totalDuration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}
			if (callback) if (!this._locked) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};

		p.getActive = function(nested, tweens, timelines) {
			if (nested == null) {
				nested = true;
			}
			if (tweens == null) {
				tweens = true;
			}
			if (timelines == null) {
				timelines = false;
			}
			var a = [],
				all = this.getChildren(nested, tweens, timelines),
				cnt = 0,
				l = all.length,
				i, tween;
			for (i = 0; i < l; i++) {
				tween = all[i];
				if (tween.isActive()) {
					a[cnt++] = tween;
				}
			}
			return a;
		};


		p.getLabelAfter = function(time) {
			if (!time) if (time !== 0) { //faster than isNan()
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				l = labels.length,
				i;
			for (i = 0; i < l; i++) {
				if (labels[i].time > time) {
					return labels[i].name;
				}
			}
			return null;
		};

		p.getLabelBefore = function(time) {
			if (time == null) {
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				i = labels.length;
			while (--i > -1) {
				if (labels[i].time < time) {
					return labels[i].name;
				}
			}
			return null;
		};

		p.getLabelsArray = function() {
			var a = [],
				cnt = 0,
				p;
			for (p in this._labels) {
				a[cnt++] = {time:this._labels[p], name:p};
			}
			a.sort(function(a,b) {
				return a.time - b.time;
			});
			return a;
		};

		p.invalidate = function() {
			this._locked = false; //unlock and set cycle in case invalidate() is called from inside an onRepeat
			return TimelineLite.prototype.invalidate.call(this);
		};


//---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------

		p.progress = function(value, suppressEvents) {
			return (!arguments.length) ? (this._time / this.duration()) || 0 : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents);
		};

		p.totalProgress = function(value, suppressEvents) {
			return (!arguments.length) ? (this._totalTime / this.totalDuration()) || 0 : this.totalTime( this.totalDuration() * value, suppressEvents);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					TimelineLite.prototype.totalDuration.call(this); //just forces refresh
					//Instead of Infinity, we use 999999999999 so that we can accommodate reverses.
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
				}
				return this._totalDuration;
			}
			return (this._repeat === -1 || !value) ? this : this.timeScale( this.totalDuration() / value );
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};

		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};

		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};

		p.currentLabel = function(value) {
			if (!arguments.length) {
				return this.getLabelBefore(this._time + 0.00000001);
			}
			return this.seek(value, true);
		};

		return TimelineMax;

	}, true);
	




	
	
	
	
	

	
/*
 * ----------------------------------------------------------------
 * BezierPlugin
 * ----------------------------------------------------------------
 */
	(function() {

		var _RAD2DEG = 180 / Math.PI,
			_r1 = [],
			_r2 = [],
			_r3 = [],
			_corProps = {},
			_globals = _gsScope._gsDefine.globals,
			Segment = function(a, b, c, d) {
				if (c === d) { //if c and d match, the final autoRotate value could lock at -90 degrees, so differentiate them slightly.
					c = d - (d - b) / 1000000;
				}
				if (a === b) { //if a and b match, the starting autoRotate value could lock at -90 degrees, so differentiate them slightly.
					b = a + (c - a) / 1000000;
				}
				this.a = a;
				this.b = b;
				this.c = c;
				this.d = d;
				this.da = d - a;
				this.ca = c - a;
				this.ba = b - a;
			},
			_correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
			cubicToQuadratic = function(a, b, c, d) {
				var q1 = {a:a},
					q2 = {},
					q3 = {},
					q4 = {c:d},
					mab = (a + b) / 2,
					mbc = (b + c) / 2,
					mcd = (c + d) / 2,
					mabc = (mab + mbc) / 2,
					mbcd = (mbc + mcd) / 2,
					m8 = (mbcd - mabc) / 8;
				q1.b = mab + (a - mab) / 4;
				q2.b = mabc + m8;
				q1.c = q2.a = (q1.b + q2.b) / 2;
				q2.c = q3.a = (mabc + mbcd) / 2;
				q3.b = mbcd - m8;
				q4.b = mcd + (d - mcd) / 4;
				q3.c = q4.a = (q3.b + q4.b) / 2;
				return [q1, q2, q3, q4];
			},
			_calculateControlPoints = function(a, curviness, quad, basic, correlate) {
				var l = a.length - 1,
					ii = 0,
					cp1 = a[0].a,
					i, p1, p2, p3, seg, m1, m2, mm, cp2, qb, r1, r2, tl;
				for (i = 0; i < l; i++) {
					seg = a[ii];
					p1 = seg.a;
					p2 = seg.d;
					p3 = a[ii+1].d;

					if (correlate) {
						r1 = _r1[i];
						r2 = _r2[i];
						tl = ((r2 + r1) * curviness * 0.25) / (basic ? 0.5 : _r3[i] || 0.5);
						m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : (r1 !== 0 ? tl / r1 : 0));
						m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : (r2 !== 0 ? tl / r2 : 0));
						mm = p2 - (m1 + (((m2 - m1) * ((r1 * 3 / (r1 + r2)) + 0.5) / 4) || 0));
					} else {
						m1 = p2 - (p2 - p1) * curviness * 0.5;
						m2 = p2 + (p3 - p2) * curviness * 0.5;
						mm = p2 - (m1 + m2) / 2;
					}
					m1 += mm;
					m2 += mm;

					seg.c = cp2 = m1;
					if (i !== 0) {
						seg.b = cp1;
					} else {
						seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6; //instead of placing b on a exactly, we move it inline with c so that if the user specifies an ease like Back.easeIn or Elastic.easeIn which goes BEYOND the beginning, it will do so smoothly.
					}

					seg.da = p2 - p1;
					seg.ca = cp2 - p1;
					seg.ba = cp1 - p1;

					if (quad) {
						qb = cubicToQuadratic(p1, cp1, cp2, p2);
						a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
						ii += 4;
					} else {
						ii++;
					}

					cp1 = m2;
				}
				seg = a[ii];
				seg.b = cp1;
				seg.c = cp1 + (seg.d - cp1) * 0.4; //instead of placing c on d exactly, we move it inline with b so that if the user specifies an ease like Back.easeOut or Elastic.easeOut which goes BEYOND the end, it will do so smoothly.
				seg.da = seg.d - seg.a;
				seg.ca = seg.c - seg.a;
				seg.ba = cp1 - seg.a;
				if (quad) {
					qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
					a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
				}
			},
			_parseAnchors = function(values, p, correlate, prepend) {
				var a = [],
					l, i, p1, p2, p3, tmp;
				if (prepend) {
					values = [prepend].concat(values);
					i = values.length;
					while (--i > -1) {
						if (typeof( (tmp = values[i][p]) ) === "string") if (tmp.charAt(1) === "=") {
							values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)); //accommodate relative values. Do it inline instead of breaking it out into a function for speed reasons
						}
					}
				}
				l = values.length - 2;
				if (l < 0) {
					a[0] = new Segment(values[0][p], 0, 0, values[0][p]);
					return a;
				}
				for (i = 0; i < l; i++) {
					p1 = values[i][p];
					p2 = values[i+1][p];
					a[i] = new Segment(p1, 0, 0, p2);
					if (correlate) {
						p3 = values[i+2][p];
						_r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
						_r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);
					}
				}
				a[i] = new Segment(values[i][p], 0, 0, values[i+1][p]);
				return a;
			},
			bezierThrough = function(values, curviness, quadratic, basic, correlate, prepend) {
				var obj = {},
					props = [],
					first = prepend || values[0],
					i, p, a, j, r, l, seamless, last;
				correlate = (typeof(correlate) === "string") ? ","+correlate+"," : _correlate;
				if (curviness == null) {
					curviness = 1;
				}
				for (p in values[0]) {
					props.push(p);
				}
				//check to see if the last and first values are identical (well, within 0.05). If so, make seamless by appending the second element to the very end of the values array and the 2nd-to-last element to the very beginning (we'll remove those segments later)
				if (values.length > 1) {
					last = values[values.length - 1];
					seamless = true;
					i = props.length;
					while (--i > -1) {
						p = props[i];
						if (Math.abs(first[p] - last[p]) > 0.05) { //build in a tolerance of +/-0.05 to accommodate rounding errors.
							seamless = false;
							break;
						}
					}
					if (seamless) {
						values = values.concat(); //duplicate the array to avoid contaminating the original which the user may be reusing for other tweens
						if (prepend) {
							values.unshift(prepend);
						}
						values.push(values[1]);
						prepend = values[values.length - 3];
					}
				}
				_r1.length = _r2.length = _r3.length = 0;
				i = props.length;
				while (--i > -1) {
					p = props[i];
					_corProps[p] = (correlate.indexOf(","+p+",") !== -1);
					obj[p] = _parseAnchors(values, p, _corProps[p], prepend);
				}
				i = _r1.length;
				while (--i > -1) {
					_r1[i] = Math.sqrt(_r1[i]);
					_r2[i] = Math.sqrt(_r2[i]);
				}
				if (!basic) {
					i = props.length;
					while (--i > -1) {
						if (_corProps[p]) {
							a = obj[props[i]];
							l = a.length - 1;
							for (j = 0; j < l; j++) {
								r = (a[j+1].da / _r2[j] + a[j].da / _r1[j]) || 0;
								_r3[j] = (_r3[j] || 0) + r * r;
							}
						}
					}
					i = _r3.length;
					while (--i > -1) {
						_r3[i] = Math.sqrt(_r3[i]);
					}
				}
				i = props.length;
				j = quadratic ? 4 : 1;
				while (--i > -1) {
					p = props[i];
					a = obj[p];
					_calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]); //this method requires that _parseAnchors() and _setSegmentRatios() ran first so that _r1, _r2, and _r3 values are populated for all properties
					if (seamless) {
						a.splice(0, j);
						a.splice(a.length - j, j);
					}
				}
				return obj;
			},
			_parseBezierData = function(values, type, prepend) {
				type = type || "soft";
				var obj = {},
					inc = (type === "cubic") ? 3 : 2,
					soft = (type === "soft"),
					props = [],
					a, b, c, d, cur, i, j, l, p, cnt, tmp;
				if (soft && prepend) {
					values = [prepend].concat(values);
				}
				if (values == null || values.length < inc + 1) { throw "invalid Bezier data"; }
				for (p in values[0]) {
					props.push(p);
				}
				i = props.length;
				while (--i > -1) {
					p = props[i];
					obj[p] = cur = [];
					cnt = 0;
					l = values.length;
					for (j = 0; j < l; j++) {
						a = (prepend == null) ? values[j][p] : (typeof( (tmp = values[j][p]) ) === "string" && tmp.charAt(1) === "=") ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
						if (soft) if (j > 1) if (j < l - 1) {
							cur[cnt++] = (a + cur[cnt-2]) / 2;
						}
						cur[cnt++] = a;
					}
					l = cnt - inc + 1;
					cnt = 0;
					for (j = 0; j < l; j += inc) {
						a = cur[j];
						b = cur[j+1];
						c = cur[j+2];
						d = (inc === 2) ? 0 : cur[j+3];
						cur[cnt++] = tmp = (inc === 3) ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
					}
					cur.length = cnt;
				}
				return obj;
			},
			_addCubicLengths = function(a, steps, resolution) {
				var inc = 1 / resolution,
					j = a.length,
					d, d1, s, da, ca, ba, p, i, inv, bez, index;
				while (--j > -1) {
					bez = a[j];
					s = bez.a;
					da = bez.d - s;
					ca = bez.c - s;
					ba = bez.b - s;
					d = d1 = 0;
					for (i = 1; i <= resolution; i++) {
						p = inc * i;
						inv = 1 - p;
						d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
						index = j * resolution + i - 1;
						steps[index] = (steps[index] || 0) + d * d;
					}
				}
			},
			_parseLengthData = function(obj, resolution) {
				resolution = resolution >> 0 || 6;
				var a = [],
					lengths = [],
					d = 0,
					total = 0,
					threshold = resolution - 1,
					segments = [],
					curLS = [], //current length segments array
					p, i, l, index;
				for (p in obj) {
					_addCubicLengths(obj[p], a, resolution);
				}
				l = a.length;
				for (i = 0; i < l; i++) {
					d += Math.sqrt(a[i]);
					index = i % resolution;
					curLS[index] = d;
					if (index === threshold) {
						total += d;
						index = (i / resolution) >> 0;
						segments[index] = curLS;
						lengths[index] = total;
						d = 0;
						curLS = [];
					}
				}
				return {length:total, lengths:lengths, segments:segments};
			},



			BezierPlugin = _gsScope._gsDefine.plugin({
					propName: "bezier",
					priority: -1,
					version: "1.3.8",
					API: 2,
					global:true,

					//gets called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
					init: function(target, vars, tween) {
						this._target = target;
						if (vars instanceof Array) {
							vars = {values:vars};
						}
						this._func = {};
						this._mod = {};
						this._props = [];
						this._timeRes = (vars.timeResolution == null) ? 6 : parseInt(vars.timeResolution, 10);
						var values = vars.values || [],
							first = {},
							second = values[0],
							autoRotate = vars.autoRotate || tween.vars.orientToBezier,
							p, isFunc, i, j, prepend;

						this._autoRotate = autoRotate ? (autoRotate instanceof Array) ? autoRotate : [["x","y","rotation",((autoRotate === true) ? 0 : Number(autoRotate) || 0)]] : null;
						for (p in second) {
							this._props.push(p);
						}

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];

							this._overwriteProps.push(p);
							isFunc = this._func[p] = (typeof(target[p]) === "function");
							first[p] = (!isFunc) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
							if (!prepend) if (first[p] !== values[0][p]) {
								prepend = first;
							}
						}
						this._beziers = (vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft") ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, (vars.type === "thruBasic"), vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
						this._segCount = this._beziers[p].length;

						if (this._timeRes) {
							var ld = _parseLengthData(this._beziers, this._timeRes);
							this._length = ld.length;
							this._lengths = ld.lengths;
							this._segments = ld.segments;
							this._l1 = this._li = this._s1 = this._si = 0;
							this._l2 = this._lengths[0];
							this._curSeg = this._segments[0];
							this._s2 = this._curSeg[0];
							this._prec = 1 / this._curSeg.length;
						}

						if ((autoRotate = this._autoRotate)) {
							this._initialRotations = [];
							if (!(autoRotate[0] instanceof Array)) {
								this._autoRotate = autoRotate = [autoRotate];
							}
							i = autoRotate.length;
							while (--i > -1) {
								for (j = 0; j < 3; j++) {
									p = autoRotate[i][j];
									this._func[p] = (typeof(target[p]) === "function") ? target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ] : false;
								}
								p = autoRotate[i][2];
								this._initialRotations[i] = (this._func[p] ? this._func[p].call(this._target) : this._target[p]) || 0;
								this._overwriteProps.push(p);
							}
						}
						this._startRatio = tween.vars.runBackwards ? 1 : 0; //we determine the starting ratio when the tween inits which is always 0 unless the tween has runBackwards:true (indicating it's a from() tween) in which case it's 1.
						return true;
					},

					//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
					set: function(v) {
						var segments = this._segCount,
							func = this._func,
							target = this._target,
							notStart = (v !== this._startRatio),
							curIndex, inv, i, p, b, t, val, l, lengths, curSeg;
						if (!this._timeRes) {
							curIndex = (v < 0) ? 0 : (v >= 1) ? segments - 1 : (segments * v) >> 0;
							t = (v - (curIndex * (1 / segments))) * segments;
						} else {
							lengths = this._lengths;
							curSeg = this._curSeg;
							v *= this._length;
							i = this._li;
							//find the appropriate segment (if the currently cached one isn't correct)
							if (v > this._l2 && i < segments - 1) {
								l = segments - 1;
								while (i < l && (this._l2 = lengths[++i]) <= v) {	}
								this._l1 = lengths[i-1];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s2 = curSeg[(this._s1 = this._si = 0)];
							} else if (v < this._l1 && i > 0) {
								while (i > 0 && (this._l1 = lengths[--i]) >= v) { }
								if (i === 0 && v < this._l1) {
									this._l1 = 0;
								} else {
									i++;
								}
								this._l2 = lengths[i];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
								this._s2 = curSeg[this._si];
							}
							curIndex = i;
							//now find the appropriate sub-segment (we split it into the number of pieces that was defined by "precision" and measured each one)
							v -= this._l1;
							i = this._si;
							if (v > this._s2 && i < curSeg.length - 1) {
								l = curSeg.length - 1;
								while (i < l && (this._s2 = curSeg[++i]) <= v) {	}
								this._s1 = curSeg[i-1];
								this._si = i;
							} else if (v < this._s1 && i > 0) {
								while (i > 0 && (this._s1 = curSeg[--i]) >= v) {	}
								if (i === 0 && v < this._s1) {
									this._s1 = 0;
								} else {
									i++;
								}
								this._s2 = curSeg[i];
								this._si = i;
							}
							t = ((i + (v - this._s1) / (this._s2 - this._s1)) * this._prec) || 0;
						}
						inv = 1 - t;

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];
							b = this._beziers[p][curIndex];
							val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;
							if (this._mod[p]) {
								val = this._mod[p](val, target);
							}
							if (func[p]) {
								target[p](val);
							} else {
								target[p] = val;
							}
						}

						if (this._autoRotate) {
							var ar = this._autoRotate,
								b2, x1, y1, x2, y2, add, conv;
							i = ar.length;
							while (--i > -1) {
								p = ar[i][2];
								add = ar[i][3] || 0;
								conv = (ar[i][4] === true) ? 1 : _RAD2DEG;
								b = this._beziers[ar[i][0]];
								b2 = this._beziers[ar[i][1]];

								if (b && b2) { //in case one of the properties got overwritten.
									b = b[curIndex];
									b2 = b2[curIndex];

									x1 = b.a + (b.b - b.a) * t;
									x2 = b.b + (b.c - b.b) * t;
									x1 += (x2 - x1) * t;
									x2 += ((b.c + (b.d - b.c) * t) - x2) * t;

									y1 = b2.a + (b2.b - b2.a) * t;
									y2 = b2.b + (b2.c - b2.b) * t;
									y1 += (y2 - y1) * t;
									y2 += ((b2.c + (b2.d - b2.c) * t) - y2) * t;

									val = notStart ? Math.atan2(y2 - y1, x2 - x1) * conv + add : this._initialRotations[i];

									if (this._mod[p]) {
										val = this._mod[p](val, target); //for modProps
									}

									if (func[p]) {
										target[p](val);
									} else {
										target[p] = val;
									}
								}
							}
						}
					}
			}),
			p = BezierPlugin.prototype;


		BezierPlugin.bezierThrough = bezierThrough;
		BezierPlugin.cubicToQuadratic = cubicToQuadratic;
		BezierPlugin._autoCSS = true; //indicates that this plugin can be inserted into the "css" object using the autoCSS feature of TweenLite
		BezierPlugin.quadraticToCubic = function(a, b, c) {
			return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
		};

		BezierPlugin._cssRegister = function() {
			var CSSPlugin = _globals.CSSPlugin;
			if (!CSSPlugin) {
				return;
			}
			var _internals = CSSPlugin._internals,
				_parseToProxy = _internals._parseToProxy,
				_setPluginRatio = _internals._setPluginRatio,
				CSSPropTween = _internals.CSSPropTween;
			_internals._registerComplexSpecialProp("bezier", {parser:function(t, e, prop, cssp, pt, plugin) {
				if (e instanceof Array) {
					e = {values:e};
				}
				plugin = new BezierPlugin();
				var values = e.values,
					l = values.length - 1,
					pluginValues = [],
					v = {},
					i, p, data;
				if (l < 0) {
					return pt;
				}
				for (i = 0; i <= l; i++) {
					data = _parseToProxy(t, values[i], cssp, pt, plugin, (l !== i));
					pluginValues[i] = data.end;
				}
				for (p in e) {
					v[p] = e[p]; //duplicate the vars object because we need to alter some things which would cause problems if the user plans to reuse the same vars object for another tween.
				}
				v.values = pluginValues;
				pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);
				pt.data = data;
				pt.plugin = plugin;
				pt.setRatio = _setPluginRatio;
				if (v.autoRotate === 0) {
					v.autoRotate = true;
				}
				if (v.autoRotate && !(v.autoRotate instanceof Array)) {
					i = (v.autoRotate === true) ? 0 : Number(v.autoRotate);
					v.autoRotate = (data.end.left != null) ? [["left","top","rotation",i,false]] : (data.end.x != null) ? [["x","y","rotation",i,false]] : false;
				}
				if (v.autoRotate) {
					if (!cssp._transform) {
						cssp._enableTransforms(false);
					}
					data.autoRotate = cssp._target._gsTransform;
					data.proxy.rotation = data.autoRotate.rotation || 0;
					cssp._overwriteProps.push("rotation");
				}
				plugin._onInitTween(data.proxy, v, cssp._tween);
				return pt;
			}});
		};

		p._mod = function(lookup) {
			var op = this._overwriteProps,
				i = op.length,
				val;
			while (--i > -1) {
				val = lookup[op[i]];
				if (val && typeof(val) === "function") {
					this._mod[op[i]] = val;
				}
			}
		};

		p._kill = function(lookup) {
			var a = this._props,
				p, i;
			for (p in this._beziers) {
				if (p in lookup) {
					delete this._beziers[p];
					delete this._func[p];
					i = a.length;
					while (--i > -1) {
						if (a[i] === p) {
							a.splice(i, 1);
						}
					}
				}
			}
			a = this._autoRotate;
			if (a) {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i][2]]) {
						a.splice(i, 1);
					}
				}
			}
			return this._super._kill.call(this, lookup);
		};

	}());






	
	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * CSSPlugin
 * ----------------------------------------------------------------
 */
	_gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin","TweenLite"], function(TweenPlugin, TweenLite) {

		/** @constructor **/
		var CSSPlugin = function() {
				TweenPlugin.call(this, "css");
				this._overwriteProps.length = 0;
				this.setRatio = CSSPlugin.prototype.setRatio; //speed optimization (avoid prototype lookup on this "hot" method)
			},
			_globals = _gsScope._gsDefine.globals,
			_hasPriority, //turns true whenever a CSSPropTween instance is created that has a priority other than 0. This helps us discern whether or not we should spend the time organizing the linked list or not after a CSSPlugin's _onInitTween() method is called.
			_suffixMap, //we set this in _onInitTween() each time as a way to have a persistent variable we can use in other methods like _parse() without having to pass it around as a parameter and we keep _parse() decoupled from a particular CSSPlugin instance
			_cs, //computed style (we store this in a shared variable to conserve memory and make minification tighter
			_overwriteProps, //alias to the currently instantiating CSSPlugin's _overwriteProps array. We use this closure in order to avoid having to pass a reference around from method to method and aid in minification.
			_specialProps = {},
			p = CSSPlugin.prototype = new TweenPlugin("css");

		p.constructor = CSSPlugin;
		CSSPlugin.version = "1.20.4";
		CSSPlugin.API = 2;
		CSSPlugin.defaultTransformPerspective = 0;
		CSSPlugin.defaultSkewType = "compensated";
		CSSPlugin.defaultSmoothOrigin = true;
		p = "px"; //we'll reuse the "p" variable to keep file size down
		CSSPlugin.suffixMap = {top:p, right:p, bottom:p, left:p, width:p, height:p, fontSize:p, padding:p, margin:p, perspective:p, lineHeight:""};


		var _numExp = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
			_relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
			_valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
			_NaNExp = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, //also allows scientific notation and doesn't kill the leading -/+ in -= and +=
			_suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
			_opacityExp = /opacity *= *([^)]*)/i,
			_opacityValExp = /opacity:([^;]*)/i,
			_alphaFilterExp = /alpha\(opacity *=.+?\)/i,
			_rgbhslExp = /^(rgb|hsl)/,
			_capsExp = /([A-Z])/g,
			_camelExp = /-([a-z])/gi,
			_urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, //for pulling out urls from url(...) or url("...") strings (some browsers wrap urls in quotes, some don't when reporting things like backgroundImage)
			_camelFunc = function(s, g) { return g.toUpperCase(); },
			_horizExp = /(?:Left|Right|Width)/i,
			_ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
			_ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
			_commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi, //finds any commas that are not within parenthesis
			_complexExp = /[\s,\(]/i, //for testing a string to find if it has a space, comma, or open parenthesis (clues that it's a complex value)
			_DEG2RAD = Math.PI / 180,
			_RAD2DEG = 180 / Math.PI,
			_forcePT = {},
			_dummyElement = {style:{}},
			_doc = _gsScope.document || {createElement: function() {return _dummyElement;}},
			_createElement = function(type, ns) {
				return _doc.createElementNS ? _doc.createElementNS(ns || "http://www.w3.org/1999/xhtml", type) : _doc.createElement(type);
			},
			_tempDiv = _createElement("div"),
			_tempImg = _createElement("img"),
			_internals = CSSPlugin._internals = {_specialProps:_specialProps}, //provides a hook to a few internal methods that we need to access from inside other plugins
			_agent = (_gsScope.navigator || {}).userAgent || "",
			_autoRound,
			_reqSafariFix, //we won't apply the Safari transform fix until we actually come across a tween that affects a transform property (to maintain best performance).

			_isSafari,
			_isFirefox, //Firefox has a bug that causes 3D transformed elements to randomly disappear unless a repaint is forced after each update on each element.
			_isSafariLT6, //Safari (and Android 4 which uses a flavor of Safari) has a bug that prevents changes to "top" and "left" properties from rendering properly if changed on the same frame as a transform UNLESS we set the element's WebkitBackfaceVisibility to hidden (weird, I know). Doing this for Android 3 and earlier seems to actually cause other problems, though (fun!)
			_ieVers,
			_supportsOpacity = (function() { //we set _isSafari, _ieVers, _isFirefox, and _supportsOpacity all in one function here to reduce file size slightly, especially in the minified version.
				var i = _agent.indexOf("Android"),
					a = _createElement("a");
				_isSafari = (_agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || parseFloat(_agent.substr(i+8, 2)) > 3));
				_isSafariLT6 = (_isSafari && (parseFloat(_agent.substr(_agent.indexOf("Version/")+8, 2)) < 6));
				_isFirefox = (_agent.indexOf("Firefox") !== -1);
				if ((/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(_agent) || (/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/).exec(_agent)) {
					_ieVers = parseFloat( RegExp.$1 );
				}
				if (!a) {
					return false;
				}
				a.style.cssText = "top:1px;opacity:.55;";
				return /^0.55/.test(a.style.opacity);
			}()),
			_getIEOpacity = function(v) {
				return (_opacityExp.test( ((typeof(v) === "string") ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ) ? ( parseFloat( RegExp.$1 ) / 100 ) : 1);
			},
			_log = function(s) {//for logging messages, but in a way that won't throw errors in old versions of IE.
				if (_gsScope.console) {
					console.log(s);
				}
			},
			_target, //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params
			_index, //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params

			_prefixCSS = "", //the non-camelCase vendor prefix like "-o-", "-moz-", "-ms-", or "-webkit-"
			_prefix = "", //camelCase vendor prefix like "O", "ms", "Webkit", or "Moz".

			// @private feed in a camelCase property name like "transform" and it will check to see if it is valid as-is or if it needs a vendor prefix. It returns the corrected camelCase property name (i.e. "WebkitTransform" or "MozTransform" or "transform" or null if no such property is found, like if the browser is IE8 or before, "transform" won't be found at all)
			_checkPropPrefix = function(p, e) {
				e = e || _tempDiv;
				var s = e.style,
					a, i;
				if (s[p] !== undefined) {
					return p;
				}
				p = p.charAt(0).toUpperCase() + p.substr(1);
				a = ["O","Moz","ms","Ms","Webkit"];
				i = 5;
				while (--i > -1 && s[a[i]+p] === undefined) { }
				if (i >= 0) {
					_prefix = (i === 3) ? "ms" : a[i];
					_prefixCSS = "-" + _prefix.toLowerCase() + "-";
					return _prefix + p;
				}
				return null;
			},

			_getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function() {},

			/**
			 * @private Returns the css style for a particular property of an element. For example, to get whatever the current "left" css value for an element with an ID of "myElement", you could do:
			 * var currentLeft = CSSPlugin.getStyle( document.getElementById("myElement"), "left");
			 *
			 * @param {!Object} t Target element whose style property you want to query
			 * @param {!string} p Property name (like "left" or "top" or "marginTop", etc.)
			 * @param {Object=} cs Computed style object. This just provides a way to speed processing if you're going to get several properties on the same element in quick succession - you can reuse the result of the getComputedStyle() call.
			 * @param {boolean=} calc If true, the value will not be read directly from the element's "style" property (if it exists there), but instead the getComputedStyle() result will be used. This can be useful when you want to ensure that the browser itself is interpreting the value.
			 * @param {string=} dflt Default value that should be returned in the place of null, "none", "auto" or "auto auto".
			 * @return {?string} The current property value
			 */
			_getStyle = CSSPlugin.getStyle = function(t, p, cs, calc, dflt) {
				var rv;
				if (!_supportsOpacity) if (p === "opacity") { //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
					return _getIEOpacity(t);
				}
				if (!calc && t.style[p]) {
					rv = t.style[p];
				} else if ((cs = cs || _getComputedStyle(t))) {
					rv = cs[p] || cs.getPropertyValue(p) || cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
				} else if (t.currentStyle) {
					rv = t.currentStyle[p];
				}
				return (dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto")) ? dflt : rv;
			},

			/**
			 * @private Pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number.
			 * @param {!Object} t Target element
			 * @param {!string} p Property name (like "left", "top", "marginLeft", etc.)
			 * @param {!number} v Value
			 * @param {string=} sfx Suffix (like "px" or "%" or "em")
			 * @param {boolean=} recurse If true, the call is a recursive one. In some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect.
			 * @return {number} value in pixels
			 */
			_convertToPixels = _internals.convertToPixels = function(t, p, v, sfx, recurse) {
				if (sfx === "px" || (!sfx && p !== "lineHeight")) { return v; }
				if (sfx === "auto" || !v) { return 0; }
				var horiz = _horizExp.test(p),
					node = t,
					style = _tempDiv.style,
					neg = (v < 0),
					precise = (v === 1),
					pix, cache, time;
				if (neg) {
					v = -v;
				}
				if (precise) {
					v *= 100;
				}
				if (p === "lineHeight" && !sfx) { //special case of when a simple lineHeight (without a unit) is used. Set it to the value, read back the computed value, and then revert.
					cache = _getComputedStyle(t).lineHeight;
					t.style.lineHeight = v;
					pix = parseFloat(_getComputedStyle(t).lineHeight);
					t.style.lineHeight = cache;
				} else if (sfx === "%" && p.indexOf("border") !== -1) {
					pix = (v / 100) * (horiz ? t.clientWidth : t.clientHeight);
				} else {
					style.cssText = "border:0 solid red;position:" + _getStyle(t, "position") + ";line-height:0;";
					if (sfx === "%" || !node.appendChild || sfx.charAt(0) === "v" || sfx === "rem") {
						node = t.parentNode || _doc.body;
						if (_getStyle(node, "display").indexOf("flex") !== -1) { //Edge and IE11 have a bug that causes offsetWidth to report as 0 if the container has display:flex and the child is position:relative. Switching to position: absolute solves it.
							style.position = "absolute";
						}
						cache = node._gsCache;
						time = TweenLite.ticker.frame;
						if (cache && horiz && cache.time === time) { //performance optimization: we record the width of elements along with the ticker frame so that we can quickly get it again on the same tick (seems relatively safe to assume it wouldn't change on the same tick)
							return cache.width * v / 100;
						}
						style[(horiz ? "width" : "height")] = v + sfx;
					} else {
						style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx;
					}
					node.appendChild(_tempDiv);
					pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
					node.removeChild(_tempDiv);
					if (horiz && sfx === "%" && CSSPlugin.cacheWidths !== false) {
						cache = node._gsCache = node._gsCache || {};
						cache.time = time;
						cache.width = pix / v * 100;
					}
					if (pix === 0 && !recurse) {
						pix = _convertToPixels(t, p, v, sfx, true);
					}
				}
				if (precise) {
					pix /= 100;
				}
				return neg ? -pix : pix;
			},
			_calculateOffset = _internals.calculateOffset = function(t, p, cs) { //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
				if (_getStyle(t, "position", cs) !== "absolute") { return 0; }
				var dim = ((p === "left") ? "Left" : "Top"),
					v = _getStyle(t, "margin" + dim, cs);
				return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
			},

			// @private returns at object containing ALL of the style properties in camelCase and their associated values.
			_getAllStyles = function(t, cs) {
				var s = {},
					i, tr, p;
				if ((cs = cs || _getComputedStyle(t, null))) {
					if ((i = cs.length)) {
						while (--i > -1) {
							p = cs[i];
							if (p.indexOf("-transform") === -1 || _transformPropCSS === p) { //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
								s[p.replace(_camelExp, _camelFunc)] = cs.getPropertyValue(p);
							}
						}
					} else { //some browsers behave differently - cs.length is always 0, so we must do a for...in loop.
						for (i in cs) {
							if (i.indexOf("Transform") === -1 || _transformProp === i) { //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
								s[i] = cs[i];
							}
						}
					}
				} else if ((cs = t.currentStyle || t.style)) {
					for (i in cs) {
						if (typeof(i) === "string" && s[i] === undefined) {
							s[i.replace(_camelExp, _camelFunc)] = cs[i];
						}
					}
				}
				if (!_supportsOpacity) {
					s.opacity = _getIEOpacity(t);
				}
				tr = _getTransform(t, cs, false);
				s.rotation = tr.rotation;
				s.skewX = tr.skewX;
				s.scaleX = tr.scaleX;
				s.scaleY = tr.scaleY;
				s.x = tr.x;
				s.y = tr.y;
				if (_supports3D) {
					s.z = tr.z;
					s.rotationX = tr.rotationX;
					s.rotationY = tr.rotationY;
					s.scaleZ = tr.scaleZ;
				}
				if (s.filters) {
					delete s.filters;
				}
				return s;
			},

			// @private analyzes two style objects (as returned by _getAllStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object with a "difs" property which refers to an object containing only those isolated properties and values for tweening, and a "firstMPT" property which refers to the first MiniPropTween instance in a linked list that recorded all the starting values of the different properties so that we can revert to them at the end or beginning of the tween - we don't want the cascading to get messed up. The forceLookup parameter is an optional generic object with properties that should be forced into the results - this is necessary for className tweens that are overwriting others because imagine a scenario where a rollover/rollout adds/removes a class and the user swipes the mouse over the target SUPER fast, thus nothing actually changed yet and the subsequent comparison of the properties would indicate they match (especially when px rounding is taken into consideration), thus no tweening is necessary even though it SHOULD tween and remove those properties after the tween (otherwise the inline styles will contaminate things). See the className SpecialProp code for details.
			_cssDif = function(t, s1, s2, vars, forceLookup) {
				var difs = {},
					style = t.style,
					val, p, mpt;
				for (p in s2) {
					if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (s1[p] !== (val = s2[p]) || (forceLookup && forceLookup[p])) if (p.indexOf("Origin") === -1) if (typeof(val) === "number" || typeof(val) === "string") {
						difs[p] = (val === "auto" && (p === "left" || p === "top")) ? _calculateOffset(t, p) : ((val === "" || val === "auto" || val === "none") && typeof(s1[p]) === "string" && s1[p].replace(_NaNExp, "") !== "") ? 0 : val; //if the ending value is defaulting ("" or "auto"), we check the starting value and if it can be parsed into a number (a string which could have a suffix too, like 700px), then we swap in 0 for "" or "auto" so that things actually tween.
						if (style[p] !== undefined) { //for className tweens, we must remember which properties already existed inline - the ones that didn't should be removed when the tween isn't in progress because they were only introduced to facilitate the transition between classes.
							mpt = new MiniPropTween(style, p, style[p], mpt);
						}
					}
				}
				if (vars) {
					for (p in vars) { //copy properties (except className)
						if (p !== "className") {
							difs[p] = vars[p];
						}
					}
				}
				return {difs:difs, firstMPT:mpt};
			},
			_dimensions = {width:["Left","Right"], height:["Top","Bottom"]},
			_margins = ["marginLeft","marginRight","marginTop","marginBottom"],

			/**
			 * @private Gets the width or height of an element
			 * @param {!Object} t Target element
			 * @param {!string} p Property name ("width" or "height")
			 * @param {Object=} cs Computed style object (if one exists). Just a speed optimization.
			 * @return {number} Dimension (in pixels)
			 */
			_getDimension = function(t, p, cs) {
				if ((t.nodeName + "").toLowerCase() === "svg") { //Chrome no longer supports offsetWidth/offsetHeight on SVG elements.
					return (cs || _getComputedStyle(t))[p] || 0;
				} else if (t.getCTM && _isSVG(t)) {
					return t.getBBox()[p] || 0;
				}
				var v = parseFloat((p === "width") ? t.offsetWidth : t.offsetHeight),
					a = _dimensions[p],
					i = a.length;
				cs = cs || _getComputedStyle(t, null);
				while (--i > -1) {
					v -= parseFloat( _getStyle(t, "padding" + a[i], cs, true) ) || 0;
					v -= parseFloat( _getStyle(t, "border" + a[i] + "Width", cs, true) ) || 0;
				}
				return v;
			},

			// @private Parses position-related complex strings like "top left" or "50px 10px" or "70% 20%", etc. which are used for things like transformOrigin or backgroundPosition. Optionally decorates a supplied object (recObj) with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
			_parsePosition = function(v, recObj) {
				if (v === "contain" || v === "auto" || v === "auto auto") { //note: Firefox uses "auto auto" as default whereas Chrome uses "auto".
					return v + " ";
				}
				if (v == null || v === "") {
					v = "0 0";
				}
				var a = v.split(" "),
					x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : a[0],
					y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : a[1],
					i;
				if (a.length > 3 && !recObj) { //multiple positions
					a = v.split(", ").join(",").split(",");
					v = [];
					for (i = 0; i < a.length; i++) {
						v.push(_parsePosition(a[i]));
					}
					return v.join(",");
				}
				if (y == null) {
					y = (x === "center") ? "50%" : "0";
				} else if (y === "center") {
					y = "50%";
				}
				if (x === "center" || (isNaN(parseFloat(x)) && (x + "").indexOf("=") === -1)) { //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN(). If there's an "=" sign in the value, it's relative.
					x = "50%";
				}
				v = x + " " + y + ((a.length > 2) ? " " + a[2] : "");
				if (recObj) {
					recObj.oxp = (x.indexOf("%") !== -1);
					recObj.oyp = (y.indexOf("%") !== -1);
					recObj.oxr = (x.charAt(1) === "=");
					recObj.oyr = (y.charAt(1) === "=");
					recObj.ox = parseFloat(x.replace(_NaNExp, ""));
					recObj.oy = parseFloat(y.replace(_NaNExp, ""));
					recObj.v = v;
				}
				return recObj || v;
			},

			/**
			 * @private Takes an ending value (typically a string, but can be a number) and a starting value and returns the change between the two, looking for relative value indicators like += and -= and it also ignores suffixes (but make sure the ending value starts with a number or +=/-= and that the starting value is a NUMBER!)
			 * @param {(number|string)} e End value which is typically a string, but could be a number
			 * @param {(number|string)} b Beginning value which is typically a string but could be a number
			 * @return {number} Amount of change between the beginning and ending values (relative values that have a "+=" or "-=" are recognized)
			 */
			_parseChange = function(e, b) {
				if (typeof(e) === "function") {
					e = e(_index, _target);
				}
				return (typeof(e) === "string" && e.charAt(1) === "=") ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : (parseFloat(e) - parseFloat(b)) || 0;
			},

			/**
			 * @private Takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @return {number} Parsed value
			 */
			_parseVal = function(v, d) {
				if (typeof(v) === "function") {
					v = v(_index, _target);
				}
				return (v == null) ? d : (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * parseFloat(v.substr(2)) + d : parseFloat(v) || 0;
			},

			/**
			 * @private Translates strings like "40deg" or "40" or 40rad" or "+=40deg" or "270_short" or "-90_cw" or "+=45_ccw" to a numeric radian angle. Of course a starting/default value must be fed in too so that relative values can be calculated properly.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @param {string=} p property name for directionalEnd (optional - only used when the parsed value is directional ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation). Property name would be "rotation", "rotationX", or "rotationY"
			 * @param {Object=} directionalEnd An object that will store the raw end values for directional angles ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation.
			 * @return {number} parsed angle in radians
			 */
			_parseAngle = function(v, d, p, directionalEnd) {
				var min = 0.000001,
					cap, split, dif, result, isRelative;
				if (typeof(v) === "function") {
					v = v(_index, _target);
				}
				if (v == null) {
					result = d;
				} else if (typeof(v) === "number") {
					result = v;
				} else {
					cap = 360;
					split = v.split("_");
					isRelative = (v.charAt(1) === "=");
					dif = (isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(split[0].substr(2)) : parseFloat(split[0])) * ((v.indexOf("rad") === -1) ? 1 : _RAD2DEG) - (isRelative ? 0 : d);
					if (split.length) {
						if (directionalEnd) {
							directionalEnd[p] = d + dif;
						}
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					result = d + dif;
				}
				if (result < min && result > -min) {
					result = 0;
				}
				return result;
			},

			_colorLookup = {aqua:[0,255,255],
				lime:[0,255,0],
				silver:[192,192,192],
				black:[0,0,0],
				maroon:[128,0,0],
				teal:[0,128,128],
				blue:[0,0,255],
				navy:[0,0,128],
				white:[255,255,255],
				fuchsia:[255,0,255],
				olive:[128,128,0],
				yellow:[255,255,0],
				orange:[255,165,0],
				gray:[128,128,128],
				purple:[128,0,128],
				green:[0,128,0],
				red:[255,0,0],
				pink:[255,192,203],
				cyan:[0,255,255],
				transparent:[255,255,255,0]},

			_hue = function(h, m1, m2) {
				h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
				return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
			},

			/**
			 * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if toHSL parameter is true, it will populate the array with hue, saturation, and lightness values. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
			 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
			 * @param {(boolean)} toHSL If true, an hsl() or hsla() value will be returned instead of rgb() or rgba()
			 * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order, or if the toHSL parameter was true, the array will contain hue, saturation and lightness (and optionally alpha) in that order. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and toHSL is true.
			 */
			_parseColor = CSSPlugin.parseColor = function(v, toHSL) {
				var a, r, g, b, h, s, l, max, min, d, wasHSL;
				if (!v) {
					a = _colorLookup.black;
				} else if (typeof(v) === "number") {
					a = [v >> 16, (v >> 8) & 255, v & 255];
				} else {
					if (v.charAt(v.length - 1) === ",") { //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
						v = v.substr(0, v.length - 1);
					}
					if (_colorLookup[v]) {
						a = _colorLookup[v];
					} else if (v.charAt(0) === "#") {
						if (v.length === 4) { //for shorthand like #9F0
							r = v.charAt(1);
							g = v.charAt(2);
							b = v.charAt(3);
							v = "#" + r + r + g + g + b + b;
						}
						v = parseInt(v.substr(1), 16);
						a = [v >> 16, (v >> 8) & 255, v & 255];
					} else if (v.substr(0, 3) === "hsl") {
						a = wasHSL = v.match(_numExp);
						if (!toHSL) {
							h = (Number(a[0]) % 360) / 360;
							s = Number(a[1]) / 100;
							l = Number(a[2]) / 100;
							g = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
							r = l * 2 - g;
							if (a.length > 3) {
								a[3] = Number(a[3]);
							}
							a[0] = _hue(h + 1 / 3, r, g);
							a[1] = _hue(h, r, g);
							a[2] = _hue(h - 1 / 3, r, g);
						} else if (v.indexOf("=") !== -1) { //if relative values are found, just return the raw strings with the relative prefixes in place.
							return v.match(_relNumExp);
						}
					} else {
						a = v.match(_numExp) || _colorLookup.transparent;
					}
					a[0] = Number(a[0]);
					a[1] = Number(a[1]);
					a[2] = Number(a[2]);
					if (a.length > 3) {
						a[3] = Number(a[3]);
					}
				}
				if (toHSL && !wasHSL) {
					r = a[0] / 255;
					g = a[1] / 255;
					b = a[2] / 255;
					max = Math.max(r, g, b);
					min = Math.min(r, g, b);
					l = (max + min) / 2;
					if (max === min) {
						h = s = 0;
					} else {
						d = max - min;
						s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
						h = (max === r) ? (g - b) / d + (g < b ? 6 : 0) : (max === g) ? (b - r) / d + 2 : (r - g) / d + 4;
						h *= 60;
					}
					a[0] = (h + 0.5) | 0;
					a[1] = (s * 100 + 0.5) | 0;
					a[2] = (l * 100 + 0.5) | 0;
				}
				return a;
			},
			_formatColors = function(s, toHSL) {
				var colors = s.match(_colorExp) || [],
					charIndex = 0,
					parsed = "",
					i, color, temp;
				if (!colors.length) {
					return s;
				}
				for (i = 0; i < colors.length; i++) {
					color = colors[i];
					temp = s.substr(charIndex, s.indexOf(color, charIndex)-charIndex);
					charIndex += temp.length + color.length;
					color = _parseColor(color, toHSL);
					if (color.length === 3) {
						color.push(1);
					}
					parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
				}
				return parsed + s.substr(charIndex);
			},
			_colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b"; //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

		for (p in _colorLookup) {
			_colorExp += "|" + p + "\\b";
		}
		_colorExp = new RegExp(_colorExp+")", "gi");

		CSSPlugin.colorStringFilter = function(a) {
			var combined = a[0] + " " + a[1],
				toHSL;
			if (_colorExp.test(combined)) {
				toHSL = (combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1);
				a[0] = _formatColors(a[0], toHSL);
				a[1] = _formatColors(a[1], toHSL);
			}
			_colorExp.lastIndex = 0;
		};

		if (!TweenLite.defaultStringFilter) {
			TweenLite.defaultStringFilter = CSSPlugin.colorStringFilter;
		}

		/**
		 * @private Returns a formatter function that handles taking a string (or number in some cases) and returning a consistently formatted one in terms of delimiters, quantity of values, etc. For example, we may get boxShadow values defined as "0px red" or "0px 0px 10px rgb(255,0,0)" or "0px 0px 20px 20px #F00" and we need to ensure that what we get back is described with 4 numbers and a color. This allows us to feed it into the _parseComplex() method and split the values up appropriately. The neat thing about this _getFormatter() function is that the dflt defines a pattern as well as a default, so for example, _getFormatter("0px 0px 0px 0px #777", true) not only sets the default as 0px for all distances and #777 for the color, but also sets the pattern such that 4 numbers and a color will always get returned.
		 * @param {!string} dflt The default value and pattern to follow. So "0px 0px 0px 0px #777" will ensure that 4 numbers and a color will always get returned.
		 * @param {boolean=} clr If true, the values should be searched for color-related data. For example, boxShadow values typically contain a color whereas borderRadius don't.
		 * @param {boolean=} collapsible If true, the value is a top/left/right/bottom style one that acts like margin or padding, where if only one value is received, it's used for all 4; if 2 are received, the first is duplicated for 3rd (bottom) and the 2nd is duplicated for the 4th spot (left), etc.
		 * @return {Function} formatter function
		 */
		var _getFormatter = function(dflt, clr, collapsible, multi) {
				if (dflt == null) {
					return function(v) {return v;};
				}
				var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
					dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
					pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
					sfx = (dflt.charAt(dflt.length - 1) === ")") ? ")" : "",
					delim = (dflt.indexOf(" ") !== -1) ? " " : ",",
					numVals = dVals.length,
					dSfx = (numVals > 0) ? dVals[0].replace(_numExp, "") : "",
					formatter;
				if (!numVals) {
					return function(v) {return v;};
				}
				if (clr) {
					formatter = function(v) {
						var color, vals, i, a;
						if (typeof(v) === "number") {
							v += dSfx;
						} else if (multi && _commasOutsideParenExp.test(v)) {
							a = v.replace(_commasOutsideParenExp, "|").split("|");
							for (i = 0; i < a.length; i++) {
								a[i] = formatter(a[i]);
							}
							return a.join(",");
						}
						color = (v.match(_colorExp) || [dColor])[0];
						vals = v.split(color).join("").match(_valuesExp) || [];
						i = vals.length;
						if (numVals > i--) {
							while (++i < numVals) {
								vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
							}
						}
						return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
					};
					return formatter;

				}
				formatter = function(v) {
					var vals, a, i;
					if (typeof(v) === "number") {
						v += dSfx;
					} else if (multi && _commasOutsideParenExp.test(v)) {
						a = v.replace(_commasOutsideParenExp, "|").split("|");
						for (i = 0; i < a.length; i++) {
							a[i] = formatter(a[i]);
						}
						return a.join(",");
					}
					vals = v.match(_valuesExp) || [];
					i = vals.length;
					if (numVals > i--) {
						while (++i < numVals) {
							vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
						}
					}
					return pfx + vals.join(delim) + sfx;
				};
				return formatter;
			},

			/**
			 * @private returns a formatter function that's used for edge-related values like marginTop, marginLeft, paddingBottom, paddingRight, etc. Just pass a comma-delimited list of property names related to the edges.
			 * @param {!string} props a comma-delimited list of property names in order from top to left, like "marginTop,marginRight,marginBottom,marginLeft"
			 * @return {Function} a formatter function
			 */
			_getEdgeParser = function(props) {
				props = props.split(",");
				return function(t, e, p, cssp, pt, plugin, vars) {
					var a = (e + "").split(" "),
						i;
					vars = {};
					for (i = 0; i < 4; i++) {
						vars[props[i]] = a[i] = a[i] || a[(((i - 1) / 2) >> 0)];
					}
					return cssp.parse(t, vars, pt, plugin);
				};
			},

			// @private used when other plugins must tween values first, like BezierPlugin or ThrowPropsPlugin, etc. That plugin's setRatio() gets called first so that the values are updated, and then we loop through the MiniPropTweens which handle copying the values into their appropriate slots so that they can then be applied correctly in the main CSSPlugin setRatio() method. Remember, we typically create a proxy object that has a bunch of uniquely-named properties that we feed to the sub-plugin and it does its magic normally, and then we must interpret those values and apply them to the css because often numbers must get combined/concatenated, suffixes added, etc. to work with css, like boxShadow could have 4 values plus a color.
			_setPluginRatio = _internals._setPluginRatio = function(v) {
				this.plugin.setRatio(v);
				var d = this.data,
					proxy = d.proxy,
					mpt = d.firstMPT,
					min = 0.000001,
					val, pt, i, str, p;
				while (mpt) {
					val = proxy[mpt.v];
					if (mpt.r) {
						val = Math.round(val);
					} else if (val < min && val > -min) {
						val = 0;
					}
					mpt.t[mpt.p] = val;
					mpt = mpt._next;
				}
				if (d.autoRotate) {
					d.autoRotate.rotation = d.mod ? d.mod(proxy.rotation, this.t) : proxy.rotation; //special case for ModifyPlugin to hook into an auto-rotating bezier
				}
				//at the end, we must set the CSSPropTween's "e" (end) value dynamically here because that's what is used in the final setRatio() method. Same for "b" at the beginning.
				if (v === 1 || v === 0) {
					mpt = d.firstMPT;
					p = (v === 1) ? "e" : "b";
					while (mpt) {
						pt = mpt.t;
						if (!pt.type) {
							pt[p] = pt.s + pt.xs0;
						} else if (pt.type === 1) {
							str = pt.xs0 + pt.s + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt[p] = str;
						}
						mpt = mpt._next;
					}
				}
			},

			/**
			 * @private @constructor Used by a few SpecialProps to hold important values for proxies. For example, _parseToProxy() creates a MiniPropTween instance for each property that must get tweened on the proxy, and we record the original property name as well as the unique one we create for the proxy, plus whether or not the value needs to be rounded plus the original value.
			 * @param {!Object} t target object whose property we're tweening (often a CSSPropTween)
			 * @param {!string} p property name
			 * @param {(number|string|object)} v value
			 * @param {MiniPropTween=} next next MiniPropTween in the linked list
			 * @param {boolean=} r if true, the tweened value should be rounded to the nearest integer
			 */
			MiniPropTween = function(t, p, v, next, r) {
				this.t = t;
				this.p = p;
				this.v = v;
				this.r = r;
				if (next) {
					next._prev = this;
					this._next = next;
				}
			},

			/**
			 * @private Most other plugins (like BezierPlugin and ThrowPropsPlugin and others) can only tween numeric values, but CSSPlugin must accommodate special values that have a bunch of extra data (like a suffix or strings between numeric values, etc.). For example, boxShadow has values like "10px 10px 20px 30px rgb(255,0,0)" which would utterly confuse other plugins. This method allows us to split that data apart and grab only the numeric data and attach it to uniquely-named properties of a generic proxy object ({}) so that we can feed that to virtually any plugin to have the numbers tweened. However, we must also keep track of which properties from the proxy go with which CSSPropTween values and instances. So we create a linked list of MiniPropTweens. Each one records a target (the original CSSPropTween), property (like "s" or "xn1" or "xn2") that we're tweening and the unique property name that was used for the proxy (like "boxShadow_xn1" and "boxShadow_xn2") and whether or not they need to be rounded. That way, in the _setPluginRatio() method we can simply copy the values over from the proxy to the CSSPropTween instance(s). Then, when the main CSSPlugin setRatio() method runs and applies the CSSPropTween values accordingly, they're updated nicely. So the external plugin tweens the numbers, _setPluginRatio() copies them over, and setRatio() acts normally, applying css-specific values to the element.
			 * This method returns an object that has the following properties:
			 *  - proxy: a generic object containing the starting values for all the properties that will be tweened by the external plugin.  This is what we feed to the external _onInitTween() as the target
			 *  - end: a generic object containing the ending values for all the properties that will be tweened by the external plugin. This is what we feed to the external plugin's _onInitTween() as the destination values
			 *  - firstMPT: the first MiniPropTween in the linked list
			 *  - pt: the first CSSPropTween in the linked list that was created when parsing. If shallow is true, this linked list will NOT attach to the one passed into the _parseToProxy() as the "pt" (4th) parameter.
			 * @param {!Object} t target object to be tweened
			 * @param {!(Object|string)} vars the object containing the information about the tweening values (typically the end/destination values) that should be parsed
			 * @param {!CSSPlugin} cssp The CSSPlugin instance
			 * @param {CSSPropTween=} pt the next CSSPropTween in the linked list
			 * @param {TweenPlugin=} plugin the external TweenPlugin instance that will be handling tweening the numeric values
			 * @param {boolean=} shallow if true, the resulting linked list from the parse will NOT be attached to the CSSPropTween that was passed in as the "pt" (4th) parameter.
			 * @return An object containing the following properties: proxy, end, firstMPT, and pt (see above for descriptions)
			 */
			_parseToProxy = _internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
				var bpt = pt,
					start = {},
					end = {},
					transform = cssp._transform,
					oldForce = _forcePT,
					i, p, xp, mpt, firstPT;
				cssp._transform = null;
				_forcePT = vars;
				pt = firstPT = cssp.parse(t, vars, pt, plugin);
				_forcePT = oldForce;
				//break off from the linked list so the new ones are isolated.
				if (shallow) {
					cssp._transform = transform;
					if (bpt) {
						bpt._prev = null;
						if (bpt._prev) {
							bpt._prev._next = null;
						}
					}
				}
				while (pt && pt !== bpt) {
					if (pt.type <= 1) {
						p = pt.p;
						end[p] = pt.s + pt.c;
						start[p] = pt.s;
						if (!shallow) {
							mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
							pt.c = 0;
						}
						if (pt.type === 1) {
							i = pt.l;
							while (--i > 0) {
								xp = "xn" + i;
								p = pt.p + "_" + xp;
								end[p] = pt.data[xp];
								start[p] = pt[xp];
								if (!shallow) {
									mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
								}
							}
						}
					}
					pt = pt._next;
				}
				return {proxy:start, end:end, firstMPT:mpt, pt:firstPT};
			},



			/**
			 * @constructor Each property that is tweened has at least one CSSPropTween associated with it. These instances store important information like the target, property, starting value, amount of change, etc. They can also optionally have a number of "extra" strings and numeric values named xs1, xn1, xs2, xn2, xs3, xn3, etc. where "s" indicates string and "n" indicates number. These can be pieced together in a complex-value tween (type:1) that has alternating types of data like a string, number, string, number, etc. For example, boxShadow could be "5px 5px 8px rgb(102, 102, 51)". In that value, there are 6 numbers that may need to tween and then pieced back together into a string again with spaces, suffixes, etc. xs0 is special in that it stores the suffix for standard (type:0) tweens, -OR- the first string (prefix) in a complex-value (type:1) CSSPropTween -OR- it can be the non-tweening value in a type:-1 CSSPropTween. We do this to conserve memory.
			 * CSSPropTweens have the following optional properties as well (not defined through the constructor):
			 *  - l: Length in terms of the number of extra properties that the CSSPropTween has (default: 0). For example, for a boxShadow we may need to tween 5 numbers in which case l would be 5; Keep in mind that the start/end values for the first number that's tweened are always stored in the s and c properties to conserve memory. All additional values thereafter are stored in xn1, xn2, etc.
			 *  - xfirst: The first instance of any sub-CSSPropTweens that are tweening properties of this instance. For example, we may split up a boxShadow tween so that there's a main CSSPropTween of type:1 that has various xs* and xn* values associated with the h-shadow, v-shadow, blur, color, etc. Then we spawn a CSSPropTween for each of those that has a higher priority and runs BEFORE the main CSSPropTween so that the values are all set by the time it needs to re-assemble them. The xfirst gives us an easy way to identify the first one in that chain which typically ends at the main one (because they're all prepende to the linked list)
			 *  - plugin: The TweenPlugin instance that will handle the tweening of any complex values. For example, sometimes we don't want to use normal subtweens (like xfirst refers to) to tween the values - we might want ThrowPropsPlugin or BezierPlugin some other plugin to do the actual tweening, so we create a plugin instance and store a reference here. We need this reference so that if we get a request to round values or disable a tween, we can pass along that request.
			 *  - data: Arbitrary data that needs to be stored with the CSSPropTween. Typically if we're going to have a plugin handle the tweening of a complex-value tween, we create a generic object that stores the END values that we're tweening to and the CSSPropTween's xs1, xs2, etc. have the starting values. We store that object as data. That way, we can simply pass that object to the plugin and use the CSSPropTween as the target.
			 *  - setRatio: Only used for type:2 tweens that require custom functionality. In this case, we call the CSSPropTween's setRatio() method and pass the ratio each time the tween updates. This isn't quite as efficient as doing things directly in the CSSPlugin's setRatio() method, but it's very convenient and flexible.
			 * @param {!Object} t Target object whose property will be tweened. Often a DOM element, but not always. It could be anything.
			 * @param {string} p Property to tween (name). For example, to tween element.width, p would be "width".
			 * @param {number} s Starting numeric value
			 * @param {number} c Change in numeric value over the course of the entire tween. For example, if element.width starts at 5 and should end at 100, c would be 95.
			 * @param {CSSPropTween=} next The next CSSPropTween in the linked list. If one is defined, we will define its _prev as the new instance, and the new instance's _next will be pointed at it.
			 * @param {number=} type The type of CSSPropTween where -1 = a non-tweening value, 0 = a standard simple tween, 1 = a complex value (like one that has multiple numbers in a comma- or space-delimited string like border:"1px solid red"), and 2 = one that uses a custom setRatio function that does all of the work of applying the values on each update.
			 * @param {string=} n Name of the property that should be used for overwriting purposes which is typically the same as p but not always. For example, we may need to create a subtween for the 2nd part of a "clip:rect(...)" tween in which case "p" might be xs1 but "n" is still "clip"
			 * @param {boolean=} r If true, the value(s) should be rounded
			 * @param {number=} pr Priority in the linked list order. Higher priority CSSPropTweens will be updated before lower priority ones. The default priority is 0.
			 * @param {string=} b Beginning value. We store this to ensure that it is EXACTLY what it was when the tween began without any risk of interpretation issues.
			 * @param {string=} e Ending value. We store this to ensure that it is EXACTLY what the user defined at the end of the tween without any risk of interpretation issues.
			 */
			CSSPropTween = _internals.CSSPropTween = function(t, p, s, c, next, type, n, r, pr, b, e) {
				this.t = t; //target
				this.p = p; //property
				this.s = s; //starting value
				this.c = c; //change value
				this.n = n || p; //name that this CSSPropTween should be associated to (usually the same as p, but not always - n is what overwriting looks at)
				if (!(t instanceof CSSPropTween)) {
					_overwriteProps.push(this.n);
				}
				this.r = r; //round (boolean)
				this.type = type || 0; //0 = normal tween, -1 = non-tweening (in which case xs0 will be applied to the target's property, like tp.t[tp.p] = tp.xs0), 1 = complex-value SpecialProp, 2 = custom setRatio() that does all the work
				if (pr) {
					this.pr = pr;
					_hasPriority = true;
				}
				this.b = (b === undefined) ? s : b;
				this.e = (e === undefined) ? s + c : e;
				if (next) {
					this._next = next;
					next._prev = this;
				}
			},

			_addNonTweeningNumericPT = function(target, prop, start, end, next, overwriteProp) { //cleans up some code redundancies and helps minification. Just a fast way to add a NUMERIC non-tweening CSSPropTween
				var pt = new CSSPropTween(target, prop, start, end - start, next, -1, overwriteProp);
				pt.b = start;
				pt.e = pt.xs0 = end;
				return pt;
			},

			/**
			 * Takes a target, the beginning value and ending value (as strings) and parses them into a CSSPropTween (possibly with child CSSPropTweens) that accommodates multiple numbers, colors, comma-delimited values, etc. For example:
			 * sp.parseComplex(element, "boxShadow", "5px 10px 20px rgb(255,102,51)", "0px 0px 0px red", true, "0px 0px 0px rgb(0,0,0,0)", pt);
			 * It will walk through the beginning and ending values (which should be in the same format with the same number and type of values) and figure out which parts are numbers, what strings separate the numeric/tweenable values, and then create the CSSPropTweens accordingly. If a plugin is defined, no child CSSPropTweens will be created. Instead, the ending values will be stored in the "data" property of the returned CSSPropTween like: {s:-5, xn1:-10, xn2:-20, xn3:255, xn4:0, xn5:0} so that it can be fed to any other plugin and it'll be plain numeric tweens but the recomposition of the complex value will be handled inside CSSPlugin's setRatio().
			 * If a setRatio is defined, the type of the CSSPropTween will be set to 2 and recomposition of the values will be the responsibility of that method.
			 *
			 * @param {!Object} t Target whose property will be tweened
			 * @param {!string} p Property that will be tweened (its name, like "left" or "backgroundColor" or "boxShadow")
			 * @param {string} b Beginning value
			 * @param {string} e Ending value
			 * @param {boolean} clrs If true, the value could contain a color value like "rgb(255,0,0)" or "#F00" or "red". The default is false, so no colors will be recognized (a performance optimization)
			 * @param {(string|number|Object)} dflt The default beginning value that should be used if no valid beginning value is defined or if the number of values inside the complex beginning and ending values don't match
			 * @param {?CSSPropTween} pt CSSPropTween instance that is the current head of the linked list (we'll prepend to this).
			 * @param {number=} pr Priority in the linked list order. Higher priority properties will be updated before lower priority ones. The default priority is 0.
			 * @param {TweenPlugin=} plugin If a plugin should handle the tweening of extra properties, pass the plugin instance here. If one is defined, then NO subtweens will be created for any extra properties (the properties will be created - just not additional CSSPropTween instances to tween them) because the plugin is expected to do so. However, the end values WILL be populated in the "data" property, like {s:100, xn1:50, xn2:300}
			 * @param {function(number)=} setRatio If values should be set in a custom function instead of being pieced together in a type:1 (complex-value) CSSPropTween, define that custom function here.
			 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parseComplex() call.
			 */
			_parseComplex = CSSPlugin.parseComplex = function(t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
				//DEBUG: _log("parseComplex: "+p+", b: "+b+", e: "+e);
				b = b || dflt || "";
				if (typeof(e) === "function") {
					e = e(_index, _target);
				}
				pt = new CSSPropTween(t, p, 0, 0, pt, (setRatio ? 2 : 1), null, false, pr, b, e);
				e += ""; //ensures it's a string
				if (clrs && _colorExp.test(e + b)) { //if colors are found, normalize the formatting to rgba() or hsla().
					e = [b, e];
					CSSPlugin.colorStringFilter(e);
					b = e[0];
					e = e[1];
				}
				var ba = b.split(", ").join(",").split(" "), //beginning array
					ea = e.split(", ").join(",").split(" "), //ending array
					l = ba.length,
					autoRound = (_autoRound !== false),
					i, xi, ni, bv, ev, bnums, enums, bn, hasAlpha, temp, cv, str, useHSL;
				if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
					if ((e + b).indexOf("rgb") !== -1 || (e + b).indexOf("hsl") !== -1) { //keep rgb(), rgba(), hsl(), and hsla() values together! (remember, we're splitting on spaces)
						ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
						ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
					} else {
						ba = ba.join(" ").split(",").join(", ").split(" ");
						ea = ea.join(" ").split(",").join(", ").split(" ");
					}
					l = ba.length;
				}
				if (l !== ea.length) {
					//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
					ba = (dflt || "").split(" ");
					l = ba.length;
				}
				pt.plugin = plugin;
				pt.setRatio = setRatio;
				_colorExp.lastIndex = 0;
				for (i = 0; i < l; i++) {
					bv = ba[i];
					ev = ea[i];
					bn = parseFloat(bv);
					//if the value begins with a number (most common). It's fine if it has a suffix like px
					if (bn || bn === 0) {
						pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), (autoRound && ev.indexOf("px") !== -1), true);

					//if the value is a color
					} else if (clrs && _colorExp.test(bv)) {
						str = ev.indexOf(")") + 1;
						str = ")" + (str ? ev.substr(str) : ""); //if there's a comma or ) at the end, retain it.
						useHSL = (ev.indexOf("hsl") !== -1 && _supportsOpacity);
						temp = ev; //original string value so we can look for any prefix later.
						bv = _parseColor(bv, useHSL);
						ev = _parseColor(ev, useHSL);
						hasAlpha = (bv.length + ev.length > 6);
						if (hasAlpha && !_supportsOpacity && ev[3] === 0) { //older versions of IE don't support rgba(), so if the destination alpha is 0, just use "transparent" for the end color
							pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
							pt.e = pt.e.split(ea[i]).join("transparent");
						} else {
							if (!_supportsOpacity) { //old versions of IE don't support rgba().
								hasAlpha = false;
							}
							if (useHSL) {
								pt.appendXtra(temp.substr(0, temp.indexOf("hsl")) + (hasAlpha ? "hsla(" : "hsl("), bv[0], _parseChange(ev[0], bv[0]), ",", false, true)
									.appendXtra("", bv[1], _parseChange(ev[1], bv[1]), "%,", false)
									.appendXtra("", bv[2], _parseChange(ev[2], bv[2]), (hasAlpha ? "%," : "%" + str), false);
							} else {
								pt.appendXtra(temp.substr(0, temp.indexOf("rgb")) + (hasAlpha ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", true, true)
									.appendXtra("", bv[1], ev[1] - bv[1], ",", true)
									.appendXtra("", bv[2], ev[2] - bv[2], (hasAlpha ? "," : str), true);
							}

							if (hasAlpha) {
								bv = (bv.length < 4) ? 1 : bv[3];
								pt.appendXtra("", bv, ((ev.length < 4) ? 1 : ev[3]) - bv, str, false);
							}
						}
						_colorExp.lastIndex = 0; //otherwise the test() on the RegExp could move the lastIndex and taint future results.

					} else {
						bnums = bv.match(_numExp); //gets each group of numbers in the beginning value string and drops them into an array

						//if no number is found, treat it as a non-tweening value and just append the string to the current xs.
						if (!bnums) {
							pt["xs" + pt.l] += (pt.l || pt["xs" + pt.l]) ? " " + ev : ev;

						//loop through all the numbers that are found and construct the extra values on the pt.
						} else {
							enums = ev.match(_relNumExp); //get each group of numbers in the end value string and drop them into an array. We allow relative values too, like +=50 or -=.5
							if (!enums || enums.length !== bnums.length) {
								//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
								return pt;
							}
							ni = 0;
							for (xi = 0; xi < bnums.length; xi++) {
								cv = bnums[xi];
								temp = bv.indexOf(cv, ni);
								pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", (autoRound && bv.substr(temp + cv.length, 2) === "px"), (xi === 0));
								ni = temp + cv.length;
							}
							pt["xs" + pt.l] += bv.substr(ni);
						}
					}
				}
				//if there are relative values ("+=" or "-=" prefix), we need to adjust the ending value to eliminate the prefixes and combine the values properly.
				if (e.indexOf("=") !== -1) if (pt.data) {
					str = pt.xs0 + pt.data.s;
					for (i = 1; i < pt.l; i++) {
						str += pt["xs" + i] + pt.data["xn" + i];
					}
					pt.e = str + pt["xs" + i];
				}
				if (!pt.l) {
					pt.type = -1;
					pt.xs0 = pt.e;
				}
				return pt.xfirst || pt;
			},
			i = 9;


		p = CSSPropTween.prototype;
		p.l = p.pr = 0; //length (number of extra properties like xn1, xn2, xn3, etc.
		while (--i > 0) {
			p["xn" + i] = 0;
			p["xs" + i] = "";
		}
		p.xs0 = "";
		p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;


		/**
		 * Appends and extra tweening value to a CSSPropTween and automatically manages any prefix and suffix strings. The first extra value is stored in the s and c of the main CSSPropTween instance, but thereafter any extras are stored in the xn1, xn2, xn3, etc. The prefixes and suffixes are stored in the xs0, xs1, xs2, etc. properties. For example, if I walk through a clip value like "rect(10px, 5px, 0px, 20px)", the values would be stored like this:
		 * xs0:"rect(", s:10, xs1:"px, ", xn1:5, xs2:"px, ", xn2:0, xs3:"px, ", xn3:20, xn4:"px)"
		 * And they'd all get joined together when the CSSPlugin renders (in the setRatio() method).
		 * @param {string=} pfx Prefix (if any)
		 * @param {!number} s Starting value
		 * @param {!number} c Change in numeric value over the course of the entire tween. For example, if the start is 5 and the end is 100, the change would be 95.
		 * @param {string=} sfx Suffix (if any)
		 * @param {boolean=} r Round (if true).
		 * @param {boolean=} pad If true, this extra value should be separated by the previous one by a space. If there is no previous extra and pad is true, it will automatically drop the space.
		 * @return {CSSPropTween} returns itself so that multiple methods can be chained together.
		 */
		p.appendXtra = function(pfx, s, c, sfx, r, pad) {
			var pt = this,
				l = pt.l;
			pt["xs" + l] += (pad && (l || pt["xs" + l])) ? " " + pfx : pfx || "";
			if (!c) if (l !== 0 && !pt.plugin) { //typically we'll combine non-changing values right into the xs to optimize performance, but we don't combine them when there's a plugin that will be tweening the values because it may depend on the values being split apart, like for a bezier, if a value doesn't change between the first and second iteration but then it does on the 3rd, we'll run into trouble because there's no xn slot for that value!
				pt["xs" + l] += s + (sfx || "");
				return pt;
			}
			pt.l++;
			pt.type = pt.setRatio ? 2 : 1;
			pt["xs" + pt.l] = sfx || "";
			if (l > 0) {
				pt.data["xn" + l] = s + c;
				pt.rxp["xn" + l] = r; //round extra property (we need to tap into this in the _parseToProxy() method)
				pt["xn" + l] = s;
				if (!pt.plugin) {
					pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
					pt.xfirst.xs0 = 0; //just to ensure that the property stays numeric which helps modern browsers speed up processing. Remember, in the setRatio() method, we do pt.t[pt.p] = val + pt.xs0 so if pt.xs0 is "" (the default), it'll cast the end value as a string. When a property is a number sometimes and a string sometimes, it prevents the compiler from locking in the data type, slowing things down slightly.
				}
				return pt;
			}
			pt.data = {s:s + c};
			pt.rxp = {};
			pt.s = s;
			pt.c = c;
			pt.r = r;
			return pt;
		};

		/**
		 * @constructor A SpecialProp is basically a css property that needs to be treated in a non-standard way, like if it may contain a complex value like boxShadow:"5px 10px 15px rgb(255, 102, 51)" or if it is associated with another plugin like ThrowPropsPlugin or BezierPlugin. Every SpecialProp is associated with a particular property name like "boxShadow" or "throwProps" or "bezier" and it will intercept those values in the vars object that's passed to the CSSPlugin and handle them accordingly.
		 * @param {!string} p Property name (like "boxShadow" or "throwProps")
		 * @param {Object=} options An object containing any of the following configuration options:
		 *                      - defaultValue: the default value
		 *                      - parser: A function that should be called when the associated property name is found in the vars. This function should return a CSSPropTween instance and it should ensure that it is properly inserted into the linked list. It will receive 4 paramters: 1) The target, 2) The value defined in the vars, 3) The CSSPlugin instance (whose _firstPT should be used for the linked list), and 4) A computed style object if one was calculated (this is a speed optimization that allows retrieval of starting values quicker)
		 *                      - formatter: a function that formats any value received for this special property (for example, boxShadow could take "5px 5px red" and format it to "5px 5px 0px 0px red" so that both the beginning and ending values have a common order and quantity of values.)
		 *                      - prefix: if true, we'll determine whether or not this property requires a vendor prefix (like Webkit or Moz or ms or O)
		 *                      - color: set this to true if the value for this SpecialProp may contain color-related values like rgb(), rgba(), etc.
		 *                      - priority: priority in the linked list order. Higher priority SpecialProps will be updated before lower priority ones. The default priority is 0.
		 *                      - multi: if true, the formatter should accommodate a comma-delimited list of values, like boxShadow could have multiple boxShadows listed out.
		 *                      - collapsible: if true, the formatter should treat the value like it's a top/right/bottom/left value that could be collapsed, like "5px" would apply to all, "5px, 10px" would use 5px for top/bottom and 10px for right/left, etc.
		 *                      - keyword: a special keyword that can [optionally] be found inside the value (like "inset" for boxShadow). This allows us to validate beginning/ending values to make sure they match (if the keyword is found in one, it'll be added to the other for consistency by default).
		 */
		var SpecialProp = function(p, options) {
				options = options || {};
				this.p = options.prefix ? _checkPropPrefix(p) || p : p;
				_specialProps[p] = _specialProps[this.p] = this;
				this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);
				if (options.parser) {
					this.parse = options.parser;
				}
				this.clrs = options.color;
				this.multi = options.multi;
				this.keyword = options.keyword;
				this.dflt = options.defaultValue;
				this.pr = options.priority || 0;
			},

			//shortcut for creating a new SpecialProp that can accept multiple properties as a comma-delimited list (helps minification). dflt can be an array for multiple values (we don't do a comma-delimited list because the default value may contain commas, like rect(0px,0px,0px,0px)). We attach this method to the SpecialProp class/object instead of using a private _createSpecialProp() method so that we can tap into it externally if necessary, like from another plugin.
			_registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p, options, defaults) {
				if (typeof(options) !== "object") {
					options = {parser:defaults}; //to make backwards compatible with older versions of BezierPlugin and ThrowPropsPlugin
				}
				var a = p.split(","),
					d = options.defaultValue,
					i, temp;
				defaults = defaults || [d];
				for (i = 0; i < a.length; i++) {
					options.prefix = (i === 0 && options.prefix);
					options.defaultValue = defaults[i] || d;
					temp = new SpecialProp(a[i], options);
				}
			},

			//creates a placeholder special prop for a plugin so that the property gets caught the first time a tween of it is attempted, and at that time it makes the plugin register itself, thus taking over for all future tweens of that property. This allows us to not mandate that things load in a particular order and it also allows us to log() an error that informs the user when they attempt to tween an external plugin-related property without loading its .js file.
			_registerPluginProp = _internals._registerPluginProp = function(p) {
				if (!_specialProps[p]) {
					var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";
					_registerComplexSpecialProp(p, {parser:function(t, e, p, cssp, pt, plugin, vars) {
						var pluginClass = _globals.com.greensock.plugins[pluginName];
						if (!pluginClass) {
							_log("Error: " + pluginName + " js file not loaded.");
							return pt;
						}
						pluginClass._cssRegister();
						return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
					}});
				}
			};


		p = SpecialProp.prototype;

		/**
		 * Alias for _parseComplex() that automatically plugs in certain values for this SpecialProp, like its property name, whether or not colors should be sensed, the default value, and priority. It also looks for any keyword that the SpecialProp defines (like "inset" for boxShadow) and ensures that the beginning and ending values have the same number of values for SpecialProps where multi is true (like boxShadow and textShadow can have a comma-delimited list)
		 * @param {!Object} t target element
		 * @param {(string|number|object)} b beginning value
		 * @param {(string|number|object)} e ending (destination) value
		 * @param {CSSPropTween=} pt next CSSPropTween in the linked list
		 * @param {TweenPlugin=} plugin If another plugin will be tweening the complex value, that TweenPlugin instance goes here.
		 * @param {function=} setRatio If a custom setRatio() method should be used to handle this complex value, that goes here.
		 * @return {CSSPropTween=} First CSSPropTween in the linked list
		 */
		p.parseComplex = function(t, b, e, pt, plugin, setRatio) {
			var kwd = this.keyword,
				i, ba, ea, l, bi, ei;
			//if this SpecialProp's value can contain a comma-delimited list of values (like boxShadow or textShadow), we must parse them in a special way, and look for a keyword (like "inset" for boxShadow) and ensure that the beginning and ending BOTH have it if the end defines it as such. We also must ensure that there are an equal number of values specified (we can't tween 1 boxShadow to 3 for example)
			if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
				ba = b.replace(_commasOutsideParenExp, "|").split("|");
				ea = e.replace(_commasOutsideParenExp, "|").split("|");
			} else if (kwd) {
				ba = [b];
				ea = [e];
			}
			if (ea) {
				l = (ea.length > ba.length) ? ea.length : ba.length;
				for (i = 0; i < l; i++) {
					b = ba[i] = ba[i] || this.dflt;
					e = ea[i] = ea[i] || this.dflt;
					if (kwd) {
						bi = b.indexOf(kwd);
						ei = e.indexOf(kwd);
						if (bi !== ei) {
							if (ei === -1) { //if the keyword isn't in the end value, remove it from the beginning one.
								ba[i] = ba[i].split(kwd).join("");
							} else if (bi === -1) { //if the keyword isn't in the beginning, add it.
								ba[i] += " " + kwd;
							}
						}
					}
				}
				b = ba.join(", ");
				e = ea.join(", ");
			}
			return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
		};

		/**
		 * Accepts a target and end value and spits back a CSSPropTween that has been inserted into the CSSPlugin's linked list and conforms with all the conventions we use internally, like type:-1, 0, 1, or 2, setting up any extra property tweens, priority, etc. For example, if we have a boxShadow SpecialProp and call:
		 * this._firstPT = sp.parse(element, "5px 10px 20px rgb(2550,102,51)", "boxShadow", this);
		 * It should figure out the starting value of the element's boxShadow, compare it to the provided end value and create all the necessary CSSPropTweens of the appropriate types to tween the boxShadow. The CSSPropTween that gets spit back should already be inserted into the linked list (the 4th parameter is the current head, so prepend to that).
		 * @param {!Object} t Target object whose property is being tweened
		 * @param {Object} e End value as provided in the vars object (typically a string, but not always - like a throwProps would be an object).
		 * @param {!string} p Property name
		 * @param {!CSSPlugin} cssp The CSSPlugin instance that should be associated with this tween.
		 * @param {?CSSPropTween} pt The CSSPropTween that is the current head of the linked list (we'll prepend to it)
		 * @param {TweenPlugin=} plugin If a plugin will be used to tween the parsed value, this is the plugin instance.
		 * @param {Object=} vars Original vars object that contains the data for parsing.
		 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parse() call.
		 */
		p.parse = function(t, e, p, cssp, pt, plugin, vars) {
			return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
		};

		/**
		 * Registers a special property that should be intercepted from any "css" objects defined in tweens. This allows you to handle them however you want without CSSPlugin doing it for you. The 2nd parameter should be a function that accepts 3 parameters:
		 *  1) Target object whose property should be tweened (typically a DOM element)
		 *  2) The end/destination value (could be a string, number, object, or whatever you want)
		 *  3) The tween instance (you probably don't need to worry about this, but it can be useful for looking up information like the duration)
		 *
		 * Then, your function should return a function which will be called each time the tween gets rendered, passing a numeric "ratio" parameter to your function that indicates the change factor (usually between 0 and 1). For example:
		 *
		 * CSSPlugin.registerSpecialProp("myCustomProp", function(target, value, tween) {
		 *      var start = target.style.width;
		 *      return function(ratio) {
		 *              target.style.width = (start + value * ratio) + "px";
		 *              console.log("set width to " + target.style.width);
		 *          }
		 * }, 0);
		 *
		 * Then, when I do this tween, it will trigger my special property:
		 *
		 * TweenLite.to(element, 1, {css:{myCustomProp:100}});
		 *
		 * In the example, of course, we're just changing the width, but you can do anything you want.
		 *
		 * @param {!string} name Property name (or comma-delimited list of property names) that should be intercepted and handled by your function. For example, if I define "myCustomProp", then it would handle that portion of the following tween: TweenLite.to(element, 1, {css:{myCustomProp:100}})
		 * @param {!function(Object, Object, Object, string):function(number)} onInitTween The function that will be called when a tween of this special property is performed. The function will receive 4 parameters: 1) Target object that should be tweened, 2) Value that was passed to the tween, 3) The tween instance itself (rarely used), and 4) The property name that's being tweened. Your function should return a function that should be called on every update of the tween. That function will receive a single parameter that is a "change factor" value (typically between 0 and 1) indicating the amount of change as a ratio. You can use this to determine how to set the values appropriately in your function.
		 * @param {number=} priority Priority that helps the engine determine the order in which to set the properties (default: 0). Higher priority properties will be updated before lower priority ones.
		 */
		CSSPlugin.registerSpecialProp = function(name, onInitTween, priority) {
			_registerComplexSpecialProp(name, {parser:function(t, e, p, cssp, pt, plugin, vars) {
				var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
				rv.plugin = plugin;
				rv.setRatio = onInitTween(t, e, cssp._tween, p);
				return rv;
			}, priority:priority});
		};






		//transform-related methods and properties
		CSSPlugin.useSVGTransformAttr = true; //Safari and Firefox both have some rendering bugs when applying CSS transforms to SVG elements, so default to using the "transform" attribute instead (users can override this).
		var _transformProps = ("scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent").split(","),
			_transformProp = _checkPropPrefix("transform"), //the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
			_transformPropCSS = _prefixCSS + "transform",
			_transformOriginProp = _checkPropPrefix("transformOrigin"),
			_supports3D = (_checkPropPrefix("perspective") !== null),
			Transform = _internals.Transform = function() {
				this.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
				this.force3D = (CSSPlugin.defaultForce3D === false || !_supports3D) ? false : CSSPlugin.defaultForce3D || "auto";
			},
			_SVGElement = _gsScope.SVGElement,
			_useSVGTransformAttr,
			//Some browsers (like Firefox and IE) don't honor transform-origin properly in SVG elements, so we need to manually adjust the matrix accordingly. We feature detect here rather than always doing the conversion for certain browsers because they may fix the problem at some point in the future.

			_createSVG = function(type, container, attributes) {
				var element = _doc.createElementNS("http://www.w3.org/2000/svg", type),
					reg = /([a-z])([A-Z])/g,
					p;
				for (p in attributes) {
					element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
				}
				container.appendChild(element);
				return element;
			},
			_docElement = _doc.documentElement || {},
			_forceSVGTransformAttr = (function() {
				//IE and Android stock don't support CSS transforms on SVG elements, so we must write them to the "transform" attribute. We populate this variable in the _parseTransform() method, and only if/when we come across an SVG element
				var force = _ieVers || (/Android/i.test(_agent) && !_gsScope.chrome),
					svg, rect, width;
				if (_doc.createElementNS && !force) { //IE8 and earlier doesn't support SVG anyway
					svg = _createSVG("svg", _docElement);
					rect = _createSVG("rect", svg, {width:100, height:50, x:100});
					width = rect.getBoundingClientRect().width;
					rect.style[_transformOriginProp] = "50% 50%";
					rect.style[_transformProp] = "scaleX(0.5)";
					force = (width === rect.getBoundingClientRect().width && !(_isFirefox && _supports3D)); //note: Firefox fails the test even though it does support CSS transforms in 3D. Since we can't push 3D stuff into the transform attribute, we force Firefox to pass the test here (as long as it does truly support 3D).
					_docElement.removeChild(svg);
				}
				return force;
			})(),
			_parseSVGOrigin = function(e, local, decoratee, absolute, smoothOrigin, skipRecord) {
				var tm = e._gsTransform,
					m = _getMatrix(e, true),
					v, x, y, xOrigin, yOrigin, a, b, c, d, tx, ty, determinant, xOriginOld, yOriginOld;
				if (tm) {
					xOriginOld = tm.xOrigin; //record the original values before we alter them.
					yOriginOld = tm.yOrigin;
				}
				if (!absolute || (v = absolute.split(" ")).length < 2) {
					b = e.getBBox();
					if (b.x === 0 && b.y === 0 && b.width + b.height === 0) { //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.
						b = {x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0, y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0, width:0, height:0};
					}
					local = _parsePosition(local).split(" ");
					v = [(local[0].indexOf("%") !== -1 ? parseFloat(local[0]) / 100 * b.width : parseFloat(local[0])) + b.x,
						 (local[1].indexOf("%") !== -1 ? parseFloat(local[1]) / 100 * b.height : parseFloat(local[1])) + b.y];
				}
				decoratee.xOrigin = xOrigin = parseFloat(v[0]);
				decoratee.yOrigin = yOrigin = parseFloat(v[1]);
				if (absolute && m !== _identity2DMatrix) { //if svgOrigin is being set, we must invert the matrix and determine where the absolute point is, factoring in the current transforms. Otherwise, the svgOrigin would be based on the element's non-transformed position on the canvas.
					a = m[0];
					b = m[1];
					c = m[2];
					d = m[3];
					tx = m[4];
					ty = m[5];
					determinant = (a * d - b * c);
					if (determinant) { //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
						x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + ((c * ty - d * tx) / determinant);
						y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - ((a * ty - b * tx) / determinant);
						xOrigin = decoratee.xOrigin = v[0] = x;
						yOrigin = decoratee.yOrigin = v[1] = y;
					}
				}
				if (tm) { //avoid jump when transformOrigin is changed - adjust the x/y values accordingly
					if (skipRecord) {
						decoratee.xOffset = tm.xOffset;
						decoratee.yOffset = tm.yOffset;
						tm = decoratee;
					}
					if (smoothOrigin || (smoothOrigin !== false && CSSPlugin.defaultSmoothOrigin !== false)) {
						x = xOrigin - xOriginOld;
						y = yOrigin - yOriginOld;
						//originally, we simply adjusted the x and y values, but that would cause problems if, for example, you created a rotational tween part-way through an x/y tween. Managing the offset in a separate variable gives us ultimate flexibility.
						//tm.x -= x - (x * m[0] + y * m[2]);
						//tm.y -= y - (x * m[1] + y * m[3]);
						tm.xOffset += (x * m[0] + y * m[2]) - x;
						tm.yOffset += (x * m[1] + y * m[3]) - y;
					} else {
						tm.xOffset = tm.yOffset = 0;
					}
				}
				if (!skipRecord) {
					e.setAttribute("data-svg-origin", v.join(" "));
				}
			},
			_getBBoxHack = function(swapIfPossible) { //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
				var svg = _createElement("svg", (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) || "http://www.w3.org/2000/svg"),
					oldParent = this.parentNode,
					oldSibling = this.nextSibling,
					oldCSS = this.style.cssText,
					bbox;
				_docElement.appendChild(svg);
				svg.appendChild(this);
				this.style.display = "block";
				if (swapIfPossible) {
					try {
						bbox = this.getBBox();
						this._originalGetBBox = this.getBBox;
						this.getBBox = _getBBoxHack;
					} catch (e) { }
				} else if (this._originalGetBBox) {
					bbox = this._originalGetBBox();
				}
				if (oldSibling) {
					oldParent.insertBefore(this, oldSibling);
				} else {
					oldParent.appendChild(this);
				}
				_docElement.removeChild(svg);
				this.style.cssText = oldCSS;
				return bbox;
			},
			_getBBox = function(e) {
				try {
					return e.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
				} catch (error) {
					return _getBBoxHack.call(e, true);
				}
			},
			_isSVG = function(e) { //reports if the element is an SVG on which getBBox() actually works
				return !!(_SVGElement && e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
			},
			_identity2DMatrix = [1,0,0,1,0,0],
			_getMatrix = function(e, force2D) {
				var tm = e._gsTransform || new Transform(),
					rnd = 100000,
					style = e.style,
					isDefault, s, m, n, dec, none;
				if (_transformProp) {
					s = _getStyle(e, _transformPropCSS, null, true);
				} else if (e.currentStyle) {
					//for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
					s = e.currentStyle.filter.match(_ieGetMatrixExp);
					s = (s && s.length === 4) ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), (tm.x || 0), (tm.y || 0)].join(",") : "";
				}
				isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
				if (_transformProp && ((none = (!_getComputedStyle(e) || _getComputedStyle(e).display === "none")) || !e.parentNode)) { //note: Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
					if (none) { //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
						n = style.display;
						style.display = "block";
					}
					if (!e.parentNode) {
						dec = 1; //flag
						_docElement.appendChild(e);
					}
					s = _getStyle(e, _transformPropCSS, null, true);
					isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
					if (n) {
						style.display = n;
					} else if (none) {
						_removeProp(style, "display");
					}
					if (dec) {
						_docElement.removeChild(e);
					}
				}
				if (tm.svg || (e.getCTM && _isSVG(e))) {
					if (isDefault && (style[_transformProp] + "").indexOf("matrix") !== -1) { //some browsers (like Chrome 40) don't correctly report transforms that are applied inline on an SVG element (they don't get included in the computed style), so we double-check here and accept matrix values
						s = style[_transformProp];
						isDefault = 0;
					}
					m = e.getAttribute("transform");
					if (isDefault && m) {
						m = e.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.
						s = "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.e + "," + m.f + ")";
						isDefault = 0;
					}
				}
				if (isDefault) {
					return _identity2DMatrix;
				}
				//split the matrix values out into an array (m for matrix)
				m = (s || "").match(_numExp) || [];
				i = m.length;
				while (--i > -1) {
					n = Number(m[i]);
					m[i] = (dec = n - (n |= 0)) ? ((dec * rnd + (dec < 0 ? -0.5 : 0.5)) | 0) / rnd + n : n; //convert strings to Numbers and round to 5 decimal places to avoid issues with tiny numbers. Roughly 20x faster than Number.toFixed(). We also must make sure to round before dividing so that values like 0.9999999999 become 1 to avoid glitches in browser rendering and interpretation of flipped/rotated 3D matrices. And don't just multiply the number by rnd, floor it, and then divide by rnd because the bitwise operations max out at a 32-bit signed integer, thus it could get clipped at a relatively low value (like 22,000.00000 for example).
				}
				return (force2D && m.length > 6) ? [m[0], m[1], m[4], m[5], m[12], m[13]] : m;
			},

			/**
			 * Parses the transform values for an element, returning an object with x, y, z, scaleX, scaleY, scaleZ, rotation, rotationX, rotationY, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
			 * @param {!Object} t target element
			 * @param {Object=} cs computed style object (optional)
			 * @param {boolean=} rec if true, the transform values will be recorded to the target element's _gsTransform object, like target._gsTransform = {x:0, y:0, z:0, scaleX:1...}
			 * @param {boolean=} parse if true, we'll ignore any _gsTransform values that already exist on the element, and force a reparsing of the css (calculated style)
			 * @return {object} object containing all of the transform properties/values like {x:0, y:0, z:0, scaleX:1...}
			 */
			_getTransform = _internals.getTransform = function(t, cs, rec, parse) {
				if (t._gsTransform && rec && !parse) {
					return t._gsTransform; //if the element already has a _gsTransform, use that. Note: some browsers don't accurately return the calculated style for the transform (particularly for SVG), so it's almost always safest to just use the values we've already applied rather than re-parsing things.
				}
				var tm = rec ? t._gsTransform || new Transform() : new Transform(),
					invX = (tm.scaleX < 0), //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
					min = 0.00002,
					rnd = 100000,
					zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin  || 0 : 0,
					defaultTransformPerspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0,
					m, i, scaleX, scaleY, rotation, skewX;

				tm.svg = !!(t.getCTM && _isSVG(t));
				if (tm.svg) {
					_parseSVGOrigin(t, _getStyle(t, _transformOriginProp, cs, false, "50% 50%") + "", tm, t.getAttribute("data-svg-origin"));
					_useSVGTransformAttr = CSSPlugin.useSVGTransformAttr || _forceSVGTransformAttr;
				}
				m = _getMatrix(t);
				if (m !== _identity2DMatrix) {

					if (m.length === 16) {
						//we'll only look at these position-related 6 variables first because if x/y/z all match, it's relatively safe to assume we don't need to re-parse everything which risks losing important rotational information (like rotationX:180 plus rotationY:180 would look the same as rotation:180 - there's no way to know for sure which direction was taken based solely on the matrix3d() values)
						var a11 = m[0], a21 = m[1], a31 = m[2], a41 = m[3],
							a12 = m[4], a22 = m[5], a32 = m[6], a42 = m[7],
							a13 = m[8], a23 = m[9], a33 = m[10],
							a14 = m[12], a24 = m[13], a34 = m[14],
							a43 = m[11],
							angle = Math.atan2(a32, a33),
							t1, t2, t3, t4, cos, sin;
						//we manually compensate for non-zero z component of transformOrigin to work around bugs in Safari
						if (tm.zOrigin) {
							a34 = -tm.zOrigin;
							a14 = a13*a34-m[12];
							a24 = a23*a34-m[13];
							a34 = a33*a34+tm.zOrigin-m[14];
						}
						//note for possible future consolidation: rotationX: Math.atan2(a32, a33), rotationY: Math.atan2(-a31, Math.sqrt(a33 * a33 + a32 * a32)), rotation: Math.atan2(a21, a11), skew: Math.atan2(a12, a22). However, it doesn't seem to be quite as reliable as the full-on backwards rotation procedure.
						tm.rotationX = angle * _RAD2DEG;
						//rotationX
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a12*cos+a13*sin;
							t2 = a22*cos+a23*sin;
							t3 = a32*cos+a33*sin;
							a13 = a12*-sin+a13*cos;
							a23 = a22*-sin+a23*cos;
							a33 = a32*-sin+a33*cos;
							a43 = a42*-sin+a43*cos;
							a12 = t1;
							a22 = t2;
							a32 = t3;
						}
						//rotationY
						angle = Math.atan2(-a31, a33);
						tm.rotationY = angle * _RAD2DEG;
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a11*cos-a13*sin;
							t2 = a21*cos-a23*sin;
							t3 = a31*cos-a33*sin;
							a23 = a21*sin+a23*cos;
							a33 = a31*sin+a33*cos;
							a43 = a41*sin+a43*cos;
							a11 = t1;
							a21 = t2;
							a31 = t3;
						}
						//rotationZ
						angle = Math.atan2(a21, a11);
						tm.rotation = angle * _RAD2DEG;
						if (angle) {
							cos = Math.cos(angle);
							sin = Math.sin(angle);
							t1 = a11*cos+a21*sin;
							t2 = a12*cos+a22*sin;
							t3 = a13*cos+a23*sin;
							a21 = a21*cos-a11*sin;
							a22 = a22*cos-a12*sin;
							a23 = a23*cos-a13*sin;
							a11 = t1;
							a12 = t2;
							a13 = t3;
						}

						if (tm.rotationX && Math.abs(tm.rotationX) + Math.abs(tm.rotation) > 359.9) { //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
							tm.rotationX = tm.rotation = 0;
							tm.rotationY = 180 - tm.rotationY;
						}

						//skewX
						angle = Math.atan2(a12, a22);

						//scales
						tm.scaleX = ((Math.sqrt(a11 * a11 + a21 * a21 + a31 * a31) * rnd + 0.5) | 0) / rnd;
						tm.scaleY = ((Math.sqrt(a22 * a22 + a32 * a32) * rnd + 0.5) | 0) / rnd;
						tm.scaleZ = ((Math.sqrt(a13 * a13 + a23 * a23 + a33 * a33) * rnd + 0.5) | 0) / rnd;
						a11 /= tm.scaleX;
						a12 /= tm.scaleY;
						a21 /= tm.scaleX;
						a22 /= tm.scaleY;
						if (Math.abs(angle) > min) {
							tm.skewX = angle * _RAD2DEG;
							a12 = 0; //unskews
							if (tm.skewType !== "simple") {
								tm.scaleY *= 1 / Math.cos(angle); //by default, we compensate the scale based on the skew so that the element maintains a similar proportion when skewed, so we have to alter the scaleY here accordingly to match the default (non-adjusted) skewing that CSS does (stretching more and more as it skews).
							}

						} else {
							tm.skewX = 0;
						}

						/* //for testing purposes
						var transform = "matrix3d(",
							comma = ",",
							zero = "0";
						a13 /= tm.scaleZ;
						a23 /= tm.scaleZ;
						a31 /= tm.scaleX;
						a32 /= tm.scaleY;
						a33 /= tm.scaleZ;
						transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
						transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
						transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
						transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma;
						transform += a14 + comma + a24 + comma + a34 + comma + (tm.perspective ? (1 + (-a34 / tm.perspective)) : 1) + ")";
						console.log(transform);
						document.querySelector(".test").style[_transformProp] = transform;
						*/

						tm.perspective = a43 ? 1 / ((a43 < 0) ? -a43 : a43) : 0;
						tm.x = a14;
						tm.y = a24;
						tm.z = a34;
						if (tm.svg) {
							tm.x -= tm.xOrigin - (tm.xOrigin * a11 - tm.yOrigin * a12);
							tm.y -= tm.yOrigin - (tm.yOrigin * a21 - tm.xOrigin * a22);
						}

					} else if ((!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || (!tm.rotationX && !tm.rotationY))) { //sometimes a 6-element matrix is returned even when we performed 3D transforms, like if rotationX and rotationY are 180. In cases like this, we still need to honor the 3D transforms. If we just rely on the 2D info, it could affect how the data is interpreted, like scaleY might get set to -1 or rotation could get offset by 180 degrees. For example, do a TweenLite.to(element, 1, {css:{rotationX:180, rotationY:180}}) and then later, TweenLite.to(element, 1, {css:{rotationX:0}}) and without this conditional logic in place, it'd jump to a state of being unrotated when the 2nd tween starts. Then again, we need to honor the fact that the user COULD alter the transforms outside of CSSPlugin, like by manually applying new css, so we try to sense that by looking at x and y because if those changed, we know the changes were made outside CSSPlugin and we force a reinterpretation of the matrix values. Also, in Webkit browsers, if the element's "display" is "none", its calculated style value will always return empty, so if we've already recorded the values in the _gsTransform object, we'll just rely on those.
						var k = (m.length >= 6),
							a = k ? m[0] : 1,
							b = m[1] || 0,
							c = m[2] || 0,
							d = k ? m[3] : 1;
						tm.x = m[4] || 0;
						tm.y = m[5] || 0;
						scaleX = Math.sqrt(a * a + b * b);
						scaleY = Math.sqrt(d * d + c * c);
						rotation = (a || b) ? Math.atan2(b, a) * _RAD2DEG : tm.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
						skewX = (c || d) ? Math.atan2(c, d) * _RAD2DEG + rotation : tm.skewX || 0;
						tm.scaleX = scaleX;
						tm.scaleY = scaleY;
						tm.rotation = rotation;
						tm.skewX = skewX;
						if (_supports3D) {
							tm.rotationX = tm.rotationY = tm.z = 0;
							tm.perspective = defaultTransformPerspective;
							tm.scaleZ = 1;
						}
						if (tm.svg) {
							tm.x -= tm.xOrigin - (tm.xOrigin * a + tm.yOrigin * c);
							tm.y -= tm.yOrigin - (tm.xOrigin * b + tm.yOrigin * d);
						}
					}
					if (Math.abs(tm.skewX) > 90 && Math.abs(tm.skewX) < 270) {
						if (invX) {
							tm.scaleX *= -1;
							tm.skewX += (tm.rotation <= 0) ? 180 : -180;
							tm.rotation += (tm.rotation <= 0) ? 180 : -180;
						} else {
							tm.scaleY *= -1;
							tm.skewX += (tm.skewX <= 0) ? 180 : -180;
						}
					}
					tm.zOrigin = zOrigin;
					//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs(). Also, browsers tend to render a SLIGHTLY rotated object in a fuzzy way, so we need to snap to exactly 0 when appropriate.
					for (i in tm) {
						if (tm[i] < min) if (tm[i] > -min) {
							tm[i] = 0;
						}
					}
				}
				//DEBUG: _log("parsed rotation of " + t.getAttribute("id")+": "+(tm.rotationX)+", "+(tm.rotationY)+", "+(tm.rotation)+", scale: "+tm.scaleX+", "+tm.scaleY+", "+tm.scaleZ+", position: "+tm.x+", "+tm.y+", "+tm.z+", perspective: "+tm.perspective+ ", origin: "+ tm.xOrigin+ ","+ tm.yOrigin);
				if (rec) {
					t._gsTransform = tm; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)
					if (tm.svg) { //if we're supposed to apply transforms to the SVG element's "transform" attribute, make sure there aren't any CSS transforms applied or they'll override the attribute ones. Also clear the transform attribute if we're using CSS, just to be clean.
						if (_useSVGTransformAttr && t.style[_transformProp]) {
							TweenLite.delayedCall(0.001, function(){ //if we apply this right away (before anything has rendered), we risk there being no transforms for a brief moment and it also interferes with adjusting the transformOrigin in a tween with immediateRender:true (it'd try reading the matrix and it wouldn't have the appropriate data in place because we just removed it).
								_removeProp(t.style, _transformProp);
							});
						} else if (!_useSVGTransformAttr && t.getAttribute("transform")) {
							TweenLite.delayedCall(0.001, function(){
								t.removeAttribute("transform");
							});
						}
					}
				}
				return tm;
			},

			//for setting 2D transforms in IE6, IE7, and IE8 (must use a "filter" to emulate the behavior of modern day browser transforms)
			_setIETransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					ang = -t.rotation * _DEG2RAD,
					skew = ang + t.skewX * _DEG2RAD,
					rnd = 100000,
					a = ((Math.cos(ang) * t.scaleX * rnd) | 0) / rnd,
					b = ((Math.sin(ang) * t.scaleX * rnd) | 0) / rnd,
					c = ((Math.sin(skew) * -t.scaleY * rnd) | 0) / rnd,
					d = ((Math.cos(skew) * t.scaleY * rnd) | 0) / rnd,
					style = this.t.style,
					cs = this.t.currentStyle,
					filters, val;
				if (!cs) {
					return;
				}
				val = b; //just for swapping the variables an inverting them (reused "val" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)
				b = -c;
				c = -val;
				filters = cs.filter;
				style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight
				var w = this.t.offsetWidth,
					h = this.t.offsetHeight,
					clip = (cs.position !== "absolute"),
					m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
					ox = t.x + (w * t.xPercent / 100),
					oy = t.y + (h * t.yPercent / 100),
					dx, dy;

				//if transformOrigin is being used, adjust the offset x and y
				if (t.ox != null) {
					dx = ((t.oxp) ? w * t.ox * 0.01 : t.ox) - w / 2;
					dy = ((t.oyp) ? h * t.oy * 0.01 : t.oy) - h / 2;
					ox += dx - (dx * a + dy * b);
					oy += dy - (dx * c + dy * d);
				}

				if (!clip) {
					m += ", sizingMethod='auto expand')";
				} else {
					dx = (w / 2);
					dy = (h / 2);
					//translate to ensure that transformations occur around the correct origin (default is center).
					m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
				}
				if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
					style.filter = filters.replace(_ieSetMatrixExp, m);
				} else {
					style.filter = m + " " + filters; //we must always put the transform/matrix FIRST (before alpha(opacity=xx)) to avoid an IE bug that slices part of the object when rotation is applied with alpha.
				}

				//at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.
				if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) if (filters.indexOf("gradient(" && filters.indexOf("Alpha")) === -1) {
					style.removeAttribute("filter");
				}

				//we must set the margins AFTER applying the filter in order to avoid some bugs in IE8 that could (in rare scenarios) cause them to be ignored intermittently (vibration).
				if (!clip) {
					var mult = (_ieVers < 8) ? 1 : -1, //in Internet Explorer 7 and before, the box model is broken, causing the browser to treat the width/height of the actual rotated filtered image as the width/height of the box itself, but Microsoft corrected that in IE8. We must use a negative offset in IE8 on the right/bottom
						marg, prop, dif;
					dx = t.ieOffsetX || 0;
					dy = t.ieOffsetY || 0;
					t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
					t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
					for (i = 0; i < 4; i++) {
						prop = _margins[i];
						marg = cs[prop];
						//we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)
						val = (marg.indexOf("px") !== -1) ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
						if (val !== t[prop]) {
							dif = (i < 2) ? -t.ieOffsetX : -t.ieOffsetY; //if another tween is controlling a margin, we cannot only apply the difference in the ieOffsets, so we essentially zero-out the dx and dy here in that case. We record the margin(s) later so that we can keep comparing them, making this code very flexible.
						} else {
							dif = (i < 2) ? dx - t.ieOffsetX : dy - t.ieOffsetY;
						}
						style[prop] = (t[prop] = Math.round( val - dif * ((i === 0 || i === 2) ? 1 : mult) )) + "px";
					}
				}
			},

			/* translates a super small decimal to a string WITHOUT scientific notation
			_safeDecimal = function(n) {
				var s = (n < 0 ? -n : n) + "",
					a = s.split("e-");
				return (n < 0 ? "-0." : "0.") + new Array(parseInt(a[1], 10) || 0).join("0") + a[0].split(".").join("");
			},
			*/

			_setTransformRatio = _internals.set3DTransformRatio = _internals.setTransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					style = this.t.style,
					angle = t.rotation,
					rotationX = t.rotationX,
					rotationY = t.rotationY,
					sx = t.scaleX,
					sy = t.scaleY,
					sz = t.scaleZ,
					x = t.x,
					y = t.y,
					z = t.z,
					isSVG = t.svg,
					perspective = t.perspective,
					force3D = t.force3D,
					skewY = t.skewY,
					skewX = t.skewX,
					t1,	a11, a12, a13, a21, a22, a23, a31, a32, a33, a41, a42, a43,
					zOrigin, min, cos, sin, t2, transform, comma, zero, skew, rnd;
				if (skewY) { //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
					skewX += skewY;
					angle += skewY;
				}

				//check to see if we should render as 2D (and SVGs must use 2D when _useSVGTransformAttr is true)
				if (((((v === 1 || v === 0) && force3D === "auto" && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime)) || !force3D) && !z && !perspective && !rotationY && !rotationX && sz === 1) || (_useSVGTransformAttr && isSVG) || !_supports3D) { //on the final render (which could be 0 for a from tween), if there are no 3D aspects, render in 2D to free up memory and improve performance especially on mobile devices. Check the tween's totalTime/totalDuration too in order to make sure it doesn't happen between repeats if it's a repeating tween.

					//2D
					if (angle || skewX || isSVG) {
						angle *= _DEG2RAD;
						skew = skewX * _DEG2RAD;
						rnd = 100000;
						a11 = Math.cos(angle) * sx;
						a21 = Math.sin(angle) * sx;
						a12 = Math.sin(angle - skew) * -sy;
						a22 = Math.cos(angle - skew) * sy;
						if (skew && t.skewType === "simple") { //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
							t1 = Math.tan(skew - skewY * _DEG2RAD);
							t1 = Math.sqrt(1 + t1 * t1);
							a12 *= t1;
							a22 *= t1;
							if (skewY) {
								t1 = Math.tan(skewY * _DEG2RAD);
								t1 = Math.sqrt(1 + t1 * t1);
								a11 *= t1;
								a21 *= t1;
							}
						}
						if (isSVG) {
							x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
							y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
							if (_useSVGTransformAttr && (t.xPercent || t.yPercent)) { //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the matrix to simulate it.
								min = this.t.getBBox();
								x += t.xPercent * 0.01 * min.width;
								y += t.yPercent * 0.01 * min.height;
							}
							min = 0.000001;
							if (x < min) if (x > -min) {
								x = 0;
							}
							if (y < min) if (y > -min) {
								y = 0;
							}
						}
						transform = (((a11 * rnd) | 0) / rnd) + "," + (((a21 * rnd) | 0) / rnd) + "," + (((a12 * rnd) | 0) / rnd) + "," + (((a22 * rnd) | 0) / rnd) + "," + x + "," + y + ")";
						if (isSVG && _useSVGTransformAttr) {
							this.t.setAttribute("transform", "matrix(" + transform);
						} else {
							//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 5 decimal places.
							style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + transform;
						}
					} else {
						style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + sx + ",0,0," + sy + "," + x + "," + y + ")";
					}
					return;

				}
				if (_isFirefox) { //Firefox has a bug (at least in v25) that causes it to render the transparent part of 32-bit PNG images as black when displayed inside an iframe and the 3D scale is very small and doesn't change sufficiently enough between renders (like if you use a Power4.easeInOut to scale from 0 to 1 where the beginning values only change a tiny amount to begin the tween before accelerating). In this case, we force the scale to be 0.00002 instead which is visually the same but works around the Firefox issue.
					min = 0.0001;
					if (sx < min && sx > -min) {
						sx = sz = 0.00002;
					}
					if (sy < min && sy > -min) {
						sy = sz = 0.00002;
					}
					if (perspective && !t.z && !t.rotationX && !t.rotationY) { //Firefox has a bug that causes elements to have an odd super-thin, broken/dotted black border on elements that have a perspective set but aren't utilizing 3D space (no rotationX, rotationY, or z).
						perspective = 0;
					}
				}
				if (angle || skewX) {
					angle *= _DEG2RAD;
					cos = a11 = Math.cos(angle);
					sin = a21 = Math.sin(angle);
					if (skewX) {
						angle -= skewX * _DEG2RAD;
						cos = Math.cos(angle);
						sin = Math.sin(angle);
						if (t.skewType === "simple") { //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
							t1 = Math.tan((skewX - skewY) * _DEG2RAD);
							t1 = Math.sqrt(1 + t1 * t1);
							cos *= t1;
							sin *= t1;
							if (t.skewY) {
								t1 = Math.tan(skewY * _DEG2RAD);
								t1 = Math.sqrt(1 + t1 * t1);
								a11 *= t1;
								a21 *= t1;
							}
						}
					}
					a12 = -sin;
					a22 = cos;

				} else if (!rotationY && !rotationX && sz === 1 && !perspective && !isSVG) { //if we're only translating and/or 2D scaling, this is faster...
					style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + x + "px," + y + "px," + z +"px)" + ((sx !== 1 || sy !== 1) ? " scale(" + sx + "," + sy + ")" : "");
					return;
				} else {
					a11 = a22 = 1;
					a12 = a21 = 0;
				}
				// KEY  INDEX   AFFECTS a[row][column]
				// a11  0       rotation, rotationY, scaleX
				// a21  1       rotation, rotationY, scaleX
				// a31  2       rotationY, scaleX
				// a41  3       rotationY, scaleX
				// a12  4       rotation, skewX, rotationX, scaleY
				// a22  5       rotation, skewX, rotationX, scaleY
				// a32  6       rotationX, scaleY
				// a42  7       rotationX, scaleY
				// a13  8       rotationY, rotationX, scaleZ
				// a23  9       rotationY, rotationX, scaleZ
				// a33  10      rotationY, rotationX, scaleZ
				// a43  11      rotationY, rotationX, perspective, scaleZ
				// a14  12      x, zOrigin, svgOrigin
				// a24  13      y, zOrigin, svgOrigin
				// a34  14      z, zOrigin
				// a44  15
				// rotation: Math.atan2(a21, a11)
				// rotationY: Math.atan2(a13, a33) (or Math.atan2(a13, a11))
				// rotationX: Math.atan2(a32, a33)
				a33 = 1;
				a13 = a23 = a31 = a32 = a41 = a42 = 0;
				a43 = (perspective) ? -1 / perspective : 0;
				zOrigin = t.zOrigin;
				min = 0.000001; //threshold below which browsers use scientific notation which won't work.
				comma = ",";
				zero = "0";
				angle = rotationY * _DEG2RAD;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					a31 = -sin;
					a41 = a43*-sin;
					a13 = a11*sin;
					a23 = a21*sin;
					a33 = cos;
					a43 *= cos;
					a11 *= cos;
					a21 *= cos;
				}
				angle = rotationX * _DEG2RAD;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					t1 = a12*cos+a13*sin;
					t2 = a22*cos+a23*sin;
					a32 = a33*sin;
					a42 = a43*sin;
					a13 = a12*-sin+a13*cos;
					a23 = a22*-sin+a23*cos;
					a33 = a33*cos;
					a43 = a43*cos;
					a12 = t1;
					a22 = t2;
				}
				if (sz !== 1) {
					a13*=sz;
					a23*=sz;
					a33*=sz;
					a43*=sz;
				}
				if (sy !== 1) {
					a12*=sy;
					a22*=sy;
					a32*=sy;
					a42*=sy;
				}
				if (sx !== 1) {
					a11*=sx;
					a21*=sx;
					a31*=sx;
					a41*=sx;
				}

				if (zOrigin || isSVG) {
					if (zOrigin) {
						x += a13*-zOrigin;
						y += a23*-zOrigin;
						z += a33*-zOrigin+zOrigin;
					}
					if (isSVG) { //due to bugs in some browsers, we need to manage the transform-origin of SVG manually
						x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
						y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
					}
					if (x < min && x > -min) {
						x = zero;
					}
					if (y < min && y > -min) {
						y = zero;
					}
					if (z < min && z > -min) {
						z = 0; //don't use string because we calculate perspective later and need the number.
					}
				}

				//optimized way of concatenating all the values into a string. If we do it all in one shot, it's slower because of the way browsers have to create temp strings and the way it affects memory. If we do it piece-by-piece with +=, it's a bit slower too. We found that doing it in these sized chunks works best overall:
				transform = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(");
				transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
				transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
				if (rotationX || rotationY || sz !== 1) { //performance optimization (often there's no rotationX or rotationY, so we can skip these calculations)
					transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
					transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma;
				} else {
					transform += ",0,0,0,0,1,0,";
				}
				transform += x + comma + y + comma + z + comma + (perspective ? (1 + (-z / perspective)) : 1) + ")";

				style[_transformProp] = transform;
			};

		p = Transform.prototype;
		p.x = p.y = p.z = p.skewX = p.skewY = p.rotation = p.rotationX = p.rotationY = p.zOrigin = p.xPercent = p.yPercent = p.xOffset = p.yOffset = 0;
		p.scaleX = p.scaleY = p.scaleZ = 1;

		_registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {parser:function(t, e, parsingProp, cssp, pt, plugin, vars) {
			if (cssp._lastParsedTransform === vars) { return pt; } //only need to parse the transform once, and only if the browser supports it.
			cssp._lastParsedTransform = vars;
			var scaleFunc = (vars.scale && typeof(vars.scale) === "function") ? vars.scale : 0, //if there's a function-based "scale" value, swap in the resulting numeric value temporarily. Otherwise, if it's called for both scaleX and scaleY independently, they may not match (like if the function uses Math.random()).
				swapFunc;
			if (typeof(vars[parsingProp]) === "function") { //whatever property triggers the initial parsing might be a function-based value in which case it already got called in parse(), thus we don't want to call it again in here. The most efficient way to avoid this is to temporarily swap the value directly into the vars object, and then after we do all our parsing in this function, we'll swap it back again.
				swapFunc = vars[parsingProp];
				vars[parsingProp] = e;
			}
			if (scaleFunc) {
				vars.scale = scaleFunc(_index, t);
			}
			var originalGSTransform = t._gsTransform,
				style = t.style,
				min = 0.000001,
				i = _transformProps.length,
				v = vars,
				endRotations = {},
				transformOriginString = "transformOrigin",
				m1 = _getTransform(t, _cs, true, v.parseTransform),
				orig = v.transform && ((typeof(v.transform) === "function") ? v.transform(_index, _target) : v.transform),
				m2, copy, has3D, hasChange, dr, x, y, matrix, p;
			m1.skewType = v.skewType || m1.skewType || CSSPlugin.defaultSkewType;
			cssp._transform = m1;
			if (orig && typeof(orig) === "string" && _transformProp) { //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
				copy = _tempDiv.style; //don't use the original target because it might be SVG in which case some browsers don't report computed style correctly.
				copy[_transformProp] = orig;
				copy.display = "block"; //if display is "none", the browser often refuses to report the transform properties correctly.
				copy.position = "absolute";
				_doc.body.appendChild(_tempDiv);
				m2 = _getTransform(_tempDiv, null, false);
				if (m1.skewType === "simple") { //the default _getTransform() reports the skewX/scaleY as if skewType is "compensated", thus we need to adjust that here if skewType is "simple".
					m2.scaleY *= Math.cos(m2.skewX * _DEG2RAD);
				}
				if (m1.svg) { //if it's an SVG element, x/y part of the matrix will be affected by whatever we use as the origin and the offsets, so compensate here...
					x = m1.xOrigin;
					y = m1.yOrigin;
					m2.x -= m1.xOffset;
					m2.y -= m1.yOffset;
					if (v.transformOrigin || v.svgOrigin) { //if this tween is altering the origin, we must factor that in here. The actual work of recording the transformOrigin values and setting up the PropTween is done later (still inside this function) so we cannot leave the changes intact here - we only want to update the x/y accordingly.
						orig = {};
						_parseSVGOrigin(t, _parsePosition(v.transformOrigin), orig, v.svgOrigin, v.smoothOrigin, true);
						x = orig.xOrigin;
						y = orig.yOrigin;
						m2.x -= orig.xOffset - m1.xOffset;
						m2.y -= orig.yOffset - m1.yOffset;
					}
					if (x || y) {
						matrix = _getMatrix(_tempDiv, true);
						m2.x -= x - (x * matrix[0] + y * matrix[2]);
						m2.y -= y - (x * matrix[1] + y * matrix[3]);
					}
				}
				_doc.body.removeChild(_tempDiv);
				if (!m2.perspective) {
					m2.perspective = m1.perspective; //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
				}
				if (v.xPercent != null) {
					m2.xPercent = _parseVal(v.xPercent, m1.xPercent);
				}
				if (v.yPercent != null) {
					m2.yPercent = _parseVal(v.yPercent, m1.yPercent);
				}
			} else if (typeof(v) === "object") { //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)
				m2 = {scaleX:_parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
					scaleY:_parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
					scaleZ:_parseVal(v.scaleZ, m1.scaleZ),
					x:_parseVal(v.x, m1.x),
					y:_parseVal(v.y, m1.y),
					z:_parseVal(v.z, m1.z),
					xPercent:_parseVal(v.xPercent, m1.xPercent),
					yPercent:_parseVal(v.yPercent, m1.yPercent),
					perspective:_parseVal(v.transformPerspective, m1.perspective)};
				dr = v.directionalRotation;
				if (dr != null) {
					if (typeof(dr) === "object") {
						for (copy in dr) {
							v[copy] = dr[copy];
						}
					} else {
						v.rotation = dr;
					}
				}
				if (typeof(v.x) === "string" && v.x.indexOf("%") !== -1) {
					m2.x = 0;
					m2.xPercent = _parseVal(v.x, m1.xPercent);
				}
				if (typeof(v.y) === "string" && v.y.indexOf("%") !== -1) {
					m2.y = 0;
					m2.yPercent = _parseVal(v.y, m1.yPercent);
				}

				m2.rotation = _parseAngle(("rotation" in v) ? v.rotation : ("shortRotation" in v) ? v.shortRotation + "_short" : ("rotationZ" in v) ? v.rotationZ : m1.rotation, m1.rotation, "rotation", endRotations);
				if (_supports3D) {
					m2.rotationX = _parseAngle(("rotationX" in v) ? v.rotationX : ("shortRotationX" in v) ? v.shortRotationX + "_short" : m1.rotationX || 0, m1.rotationX, "rotationX", endRotations);
					m2.rotationY = _parseAngle(("rotationY" in v) ? v.rotationY : ("shortRotationY" in v) ? v.shortRotationY + "_short" : m1.rotationY || 0, m1.rotationY, "rotationY", endRotations);
				}
				m2.skewX = _parseAngle(v.skewX, m1.skewX);
				m2.skewY = _parseAngle(v.skewY, m1.skewY);
			}
			if (_supports3D && v.force3D != null) {
				m1.force3D = v.force3D;
				hasChange = true;
			}

			has3D = (m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective);
			if (!has3D && v.scale != null) {
				m2.scaleZ = 1; //no need to tween scaleZ.
			}

			while (--i > -1) {
				p = _transformProps[i];
				orig = m2[p] - m1[p];
				if (orig > min || orig < -min || v[p] != null || _forcePT[p] != null) {
					hasChange = true;
					pt = new CSSPropTween(m1, p, m1[p], orig, pt);
					if (p in endRotations) {
						pt.e = endRotations[p]; //directional rotations typically have compensated values during the tween, but we need to make sure they end at exactly what the user requested
					}
					pt.xs0 = 0; //ensures the value stays numeric in setRatio()
					pt.plugin = plugin;
					cssp._overwriteProps.push(pt.n);
				}
			}

			orig = v.transformOrigin;
			if (m1.svg && (orig || v.svgOrigin)) {
				x = m1.xOffset; //when we change the origin, in order to prevent things from jumping we adjust the x/y so we must record those here so that we can create PropTweens for them and flip them at the same time as the origin
				y = m1.yOffset;
				_parseSVGOrigin(t, _parsePosition(orig), m2, v.svgOrigin, v.smoothOrigin);
				pt = _addNonTweeningNumericPT(m1, "xOrigin", (originalGSTransform ? m1 : m2).xOrigin, m2.xOrigin, pt, transformOriginString); //note: if there wasn't a transformOrigin defined yet, just start with the destination one; it's wasteful otherwise, and it causes problems with fromTo() tweens. For example, TweenLite.to("#wheel", 3, {rotation:180, transformOrigin:"50% 50%", delay:1}); TweenLite.fromTo("#wheel", 3, {scale:0.5, transformOrigin:"50% 50%"}, {scale:1, delay:2}); would cause a jump when the from values revert at the beginning of the 2nd tween.
				pt = _addNonTweeningNumericPT(m1, "yOrigin", (originalGSTransform ? m1 : m2).yOrigin, m2.yOrigin, pt, transformOriginString);
				if (x !== m1.xOffset || y !== m1.yOffset) {
					pt = _addNonTweeningNumericPT(m1, "xOffset", (originalGSTransform ? x : m1.xOffset), m1.xOffset, pt, transformOriginString);
					pt = _addNonTweeningNumericPT(m1, "yOffset", (originalGSTransform ? y : m1.yOffset), m1.yOffset, pt, transformOriginString);
				}
				orig = "0px 0px"; //certain browsers (like firefox) completely botch transform-origin, so we must remove it to prevent it from contaminating transforms. We manage it ourselves with xOrigin and yOrigin
			}
			if (orig || (_supports3D && has3D && m1.zOrigin)) { //if anything 3D is happening and there's a transformOrigin with a z component that's non-zero, we must ensure that the transformOrigin's z-component is set to 0 so that we can manually do those calculations to get around Safari bugs. Even if the user didn't specifically define a "transformOrigin" in this particular tween (maybe they did it via css directly).
				if (_transformProp) {
					hasChange = true;
					p = _transformOriginProp;
					orig = (orig || _getStyle(t, p, _cs, false, "50% 50%")) + ""; //cast as string to avoid errors
					pt = new CSSPropTween(style, p, 0, 0, pt, -1, transformOriginString);
					pt.b = style[p];
					pt.plugin = plugin;
					if (_supports3D) {
						copy = m1.zOrigin;
						orig = orig.split(" ");
						m1.zOrigin = ((orig.length > 2 && !(copy !== 0 && orig[2] === "0px")) ? parseFloat(orig[2]) : copy) || 0; //Safari doesn't handle the z part of transformOrigin correctly, so we'll manually handle it in the _set3DTransformRatio() method.
						pt.xs0 = pt.e = orig[0] + " " + (orig[1] || "50%") + " 0px"; //we must define a z value of 0px specifically otherwise iOS 5 Safari will stick with the old one (if one was defined)!
						pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n); //we must create a CSSPropTween for the _gsTransform.zOrigin so that it gets reset properly at the beginning if the tween runs backward (as opposed to just setting m1.zOrigin here)
						pt.b = copy;
						pt.xs0 = pt.e = m1.zOrigin;
					} else {
						pt.xs0 = pt.e = orig;
					}

					//for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp).
				} else {
					_parsePosition(orig + "", m1);
				}
			}
			if (hasChange) {
				cssp._transformType = (!(m1.svg && _useSVGTransformAttr) && (has3D || this._transformType === 3)) ? 3 : 2; //quicker than calling cssp._enableTransforms();
			}
			if (swapFunc) {
				vars[parsingProp] = swapFunc;
			}
			if (scaleFunc) {
				vars.scale = scaleFunc;
			}
			return pt;
		}, prefix:true});

		_registerComplexSpecialProp("boxShadow", {defaultValue:"0px 0px 0px 0px #999", prefix:true, color:true, multi:true, keyword:"inset"});

		_registerComplexSpecialProp("borderRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			e = this.format(e);
			var props = ["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],
				style = t.style,
				ea1, i, es2, bs2, bs, es, bn, en, w, h, esfx, bsfx, rel, hn, vn, em;
			w = parseFloat(t.offsetWidth);
			h = parseFloat(t.offsetHeight);
			ea1 = e.split(" ");
			for (i = 0; i < props.length; i++) { //if we're dealing with percentages, we must convert things separately for the horizontal and vertical axis!
				if (this.p.indexOf("border")) { //older browsers used a prefix
					props[i] = _checkPropPrefix(props[i]);
				}
				bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");
				if (bs.indexOf(" ") !== -1) {
					bs2 = bs.split(" ");
					bs = bs2[0];
					bs2 = bs2[1];
				}
				es = es2 = ea1[i];
				bn = parseFloat(bs);
				bsfx = bs.substr((bn + "").length);
				rel = (es.charAt(1) === "=");
				if (rel) {
					en = parseInt(es.charAt(0)+"1", 10);
					es = es.substr(2);
					en *= parseFloat(es);
					esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
				} else {
					en = parseFloat(es);
					esfx = es.substr((en + "").length);
				}
				if (esfx === "") {
					esfx = _suffixMap[p] || bsfx;
				}
				if (esfx !== bsfx) {
					hn = _convertToPixels(t, "borderLeft", bn, bsfx); //horizontal number (we use a bogus "borderLeft" property just because the _convertToPixels() method searches for the keywords "Left", "Right", "Top", and "Bottom" to determine of it's a horizontal or vertical property, and we need "border" in the name so that it knows it should measure relative to the element itself, not its parent.
					vn = _convertToPixels(t, "borderTop", bn, bsfx); //vertical number
					if (esfx === "%") {
						bs = (hn / w * 100) + "%";
						bs2 = (vn / h * 100) + "%";
					} else if (esfx === "em") {
						em = _convertToPixels(t, "borderLeft", 1, "em");
						bs = (hn / em) + "em";
						bs2 = (vn / em) + "em";
					} else {
						bs = hn + "px";
						bs2 = vn + "px";
					}
					if (rel) {
						es = (parseFloat(bs) + en) + esfx;
						es2 = (parseFloat(bs2) + en) + esfx;
					}
				}
				pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
			}
			return pt;
		}, prefix:true, formatter:_getFormatter("0px 0px 0px 0px", false, true)});
		_registerComplexSpecialProp("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			return _parseComplex(t.style, p, this.format(_getStyle(t, p, _cs, false, "0px 0px")), this.format(e), false, "0px", pt);
		}, prefix:true, formatter:_getFormatter("0px 0px", false, true)});
		_registerComplexSpecialProp("backgroundPosition", {defaultValue:"0 0", parser:function(t, e, p, cssp, pt, plugin) {
			var bp = "background-position",
				cs = (_cs || _getComputedStyle(t, null)),
				bs = this.format( ((cs) ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), //Internet Explorer doesn't report background-position correctly - we must query background-position-x and background-position-y and combine them (even in IE10). Before IE9, we must do the same with the currentStyle object and use camelCase
				es = this.format(e),
				ba, ea, i, pct, overlap, src;
			if ((bs.indexOf("%") !== -1) !== (es.indexOf("%") !== -1) && es.split(",").length < 2) {
				src = _getStyle(t, "backgroundImage").replace(_urlExp, "");
				if (src && src !== "none") {
					ba = bs.split(" ");
					ea = es.split(" ");
					_tempImg.setAttribute("src", src); //set the temp IMG's src to the background-image so that we can measure its width/height
					i = 2;
					while (--i > -1) {
						bs = ba[i];
						pct = (bs.indexOf("%") !== -1);
						if (pct !== (ea[i].indexOf("%") !== -1)) {
							overlap = (i === 0) ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
							ba[i] = pct ? (parseFloat(bs) / 100 * overlap) + "px" : (parseFloat(bs) / overlap * 100) + "%";
						}
					}
					bs = ba.join(" ");
				}
			}
			return this.parseComplex(t.style, bs, es, pt, plugin);
		}, formatter:_parsePosition});
		_registerComplexSpecialProp("backgroundSize", {defaultValue:"0 0", formatter:function(v) {
			v += ""; //ensure it's a string
			return _parsePosition(v.indexOf(" ") === -1 ? v + " " + v : v); //if set to something like "100% 100%", Safari typically reports the computed style as just "100%" (no 2nd value), but we should ensure that there are two values, so copy the first one. Otherwise, it'd be interpreted as "100% 0" (wrong).
		}});
		_registerComplexSpecialProp("perspective", {defaultValue:"0px", prefix:true});
		_registerComplexSpecialProp("perspectiveOrigin", {defaultValue:"50% 50%", prefix:true});
		_registerComplexSpecialProp("transformStyle", {prefix:true});
		_registerComplexSpecialProp("backfaceVisibility", {prefix:true});
		_registerComplexSpecialProp("userSelect", {prefix:true});
		_registerComplexSpecialProp("margin", {parser:_getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")});
		_registerComplexSpecialProp("padding", {parser:_getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")});
		_registerComplexSpecialProp("clip", {defaultValue:"rect(0px,0px,0px,0px)", parser:function(t, e, p, cssp, pt, plugin){
			var b, cs, delim;
			if (_ieVers < 9) { //IE8 and earlier don't report a "clip" value in the currentStyle - instead, the values are split apart into clipTop, clipRight, clipBottom, and clipLeft. Also, in IE7 and earlier, the values inside rect() are space-delimited, not comma-delimited.
				cs = t.currentStyle;
				delim = _ieVers < 8 ? " " : ",";
				b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
				e = this.format(e).split(",").join(delim);
			} else {
				b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
				e = this.format(e);
			}
			return this.parseComplex(t.style, b, e, pt, plugin);
		}});
		_registerComplexSpecialProp("textShadow", {defaultValue:"0px 0px 0px #999", color:true, multi:true});
		_registerComplexSpecialProp("autoRound,strictUnits", {parser:function(t, e, p, cssp, pt) {return pt;}}); //just so that we can ignore these properties (not tween them)
		_registerComplexSpecialProp("border", {defaultValue:"0px solid #000", parser:function(t, e, p, cssp, pt, plugin) {
			var bw = _getStyle(t, "borderTopWidth", _cs, false, "0px"),
				end = this.format(e).split(" "),
				esfx = end[0].replace(_suffixExp, "");
			if (esfx !== "px") { //if we're animating to a non-px value, we need to convert the beginning width to that unit.
				bw = (parseFloat(bw) / _convertToPixels(t, "borderTopWidth", 1, esfx)) + esfx;
			}
			return this.parseComplex(t.style, this.format(bw + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), end.join(" "), pt, plugin);
			}, color:true, formatter:function(v) {
				var a = v.split(" ");
				return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
			}});
		_registerComplexSpecialProp("borderWidth", {parser:_getEdgeParser("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}); //Firefox doesn't pick up on borderWidth set in style sheets (only inline).
		_registerComplexSpecialProp("float,cssFloat,styleFloat", {parser:function(t, e, p, cssp, pt, plugin) {
			var s = t.style,
				prop = ("cssFloat" in s) ? "cssFloat" : "styleFloat";
			return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
		}});

		//opacity-related
		var _setIEOpacityRatio = function(v) {
				var t = this.t, //refers to the element's style property
					filters = t.filter || _getStyle(this.data, "filter") || "",
					val = (this.s + this.c * v) | 0,
					skip;
				if (val === 100) { //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance, but make sure there isn't a transform (matrix) or gradient in the filters.
					if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1 && filters.indexOf("oader(") === -1) {
						t.removeAttribute("filter");
						skip = (!_getStyle(this.data, "filter")); //if a class is applied that has an alpha filter, it will take effect (we don't want that), so re-apply our alpha filter in that case. We must first remove it and then check.
					} else {
						t.filter = filters.replace(_alphaFilterExp, "");
						skip = true;
					}
				}
				if (!skip) {
					if (this.xn1) {
						t.filter = filters = filters || ("alpha(opacity=" + val + ")"); //works around bug in IE7/8 that prevents changes to "visibility" from being applied properly if the filter is changed to a different alpha on the same frame.
					}
					if (filters.indexOf("pacity") === -1) { //only used if browser doesn't support the standard opacity style property (IE 7 and 8). We omit the "O" to avoid case-sensitivity issues
						if (val !== 0 || !this.xn1) { //bugs in IE7/8 won't render the filter properly if opacity is ADDED on the same frame/render as "visibility" changes (this.xn1 is 1 if this tween is an "autoAlpha" tween)
							t.filter = filters + " alpha(opacity=" + val + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
						}
					} else {
						t.filter = filters.replace(_opacityExp, "opacity=" + val);
					}
				}
			};
		_registerComplexSpecialProp("opacity,alpha,autoAlpha", {defaultValue:"1", parser:function(t, e, p, cssp, pt, plugin) {
			var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")),
				style = t.style,
				isAutoAlpha = (p === "autoAlpha");
			if (typeof(e) === "string" && e.charAt(1) === "=") {
				e = ((e.charAt(0) === "-") ? -1 : 1) * parseFloat(e.substr(2)) + b;
			}
			if (isAutoAlpha && b === 1 && _getStyle(t, "visibility", _cs) === "hidden" && e !== 0) { //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
				b = 0;
			}
			if (_supportsOpacity) {
				pt = new CSSPropTween(style, "opacity", b, e - b, pt);
			} else {
				pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
				pt.xn1 = isAutoAlpha ? 1 : 0; //we need to record whether or not this is an autoAlpha so that in the setRatio(), we know to duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.
				style.zoom = 1; //helps correct an IE issue.
				pt.type = 2;
				pt.b = "alpha(opacity=" + pt.s + ")";
				pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
				pt.data = t;
				pt.plugin = plugin;
				pt.setRatio = _setIEOpacityRatio;
			}
			if (isAutoAlpha) { //we have to create the "visibility" PropTween after the opacity one in the linked list so that they run in the order that works properly in IE8 and earlier
				pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, ((b !== 0) ? "inherit" : "hidden"), ((e === 0) ? "hidden" : "inherit"));
				pt.xs0 = "inherit";
				cssp._overwriteProps.push(pt.n);
				cssp._overwriteProps.push(p);
			}
			return pt;
		}});


		var _removeProp = function(s, p) {
				if (p) {
					if (s.removeProperty) {
						if (p.substr(0,2) === "ms" || p.substr(0,6) === "webkit") { //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
							p = "-" + p;
						}
						s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
					} else { //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
						s.removeAttribute(p);
					}
				}
			},
			_setClassNameRatio = function(v) {
				this.t._gsClassPT = this;
				if (v === 1 || v === 0) {
					this.t.setAttribute("class", (v === 0) ? this.b : this.e);
					var mpt = this.data, //first MiniPropTween
						s = this.t.style;
					while (mpt) {
						if (!mpt.v) {
							_removeProp(s, mpt.p);
						} else {
							s[mpt.p] = mpt.v;
						}
						mpt = mpt._next;
					}
					if (v === 1 && this.t._gsClassPT === this) {
						this.t._gsClassPT = null;
					}
				} else if (this.t.getAttribute("class") !== this.e) {
					this.t.setAttribute("class", this.e);
				}
			};
		_registerComplexSpecialProp("className", {parser:function(t, e, p, cssp, pt, plugin, vars) {
			var b = t.getAttribute("class") || "", //don't use t.className because it doesn't work consistently on SVG elements; getAttribute("class") and setAttribute("class", value") is more reliable.
				cssText = t.style.cssText,
				difData, bs, cnpt, cnptLookup, mpt;
			pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClassNameRatio;
			pt.pr = -11;
			_hasPriority = true;
			pt.b = b;
			bs = _getAllStyles(t, _cs);
			//if there's a className tween already operating on the target, force it to its end so that the necessary inline styles are removed and the class name is applied before we determine the end state (we don't want inline styles interfering that were there just for class-specific values)
			cnpt = t._gsClassPT;
			if (cnpt) {
				cnptLookup = {};
				mpt = cnpt.data; //first MiniPropTween which stores the inline styles - we need to force these so that the inline styles don't contaminate things. Otherwise, there's a small chance that a tween could start and the inline values match the destination values and they never get cleaned.
				while (mpt) {
					cnptLookup[mpt.p] = 1;
					mpt = mpt._next;
				}
				cnpt.setRatio(1);
			}
			t._gsClassPT = pt;
			pt.e = (e.charAt(1) !== "=") ? e : b.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ((e.charAt(0) === "+") ? " " + e.substr(2) : "");
			t.setAttribute("class", pt.e);
			difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
			t.setAttribute("class", b);
			pt.data = difData.firstMPT;
			t.style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
			pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin); //we record the CSSPropTween as the xfirst so that we can handle overwriting propertly (if "className" gets overwritten, we must kill all the properties associated with the className part of the tween, so we can loop through from xfirst to the pt itself)
			return pt;
		}});


		var _setClearPropsRatio = function(v) {
			if (v === 1 || v === 0) if (this.data._totalTime === this.data._totalDuration && this.data.data !== "isFromStart") { //this.data refers to the tween. Only clear at the END of the tween (remember, from() tweens make the ratio go from 1 to 0, so we can't just check that and if the tween is the zero-duration one that's created internally to render the starting values in a from() tween, ignore that because otherwise, for example, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in).
				var s = this.t.style,
					transformParse = _specialProps.transform.parse,
					a, p, i, clearTransform, transform;
				if (this.e === "all") {
					s.cssText = "";
					clearTransform = true;
				} else {
					a = this.e.split(" ").join("").split(",");
					i = a.length;
					while (--i > -1) {
						p = a[i];
						if (_specialProps[p]) {
							if (_specialProps[p].parse === transformParse) {
								clearTransform = true;
							} else {
								p = (p === "transformOrigin") ? _transformOriginProp : _specialProps[p].p; //ensures that special properties use the proper browser-specific property name, like "scaleX" might be "-webkit-transform" or "boxShadow" might be "-moz-box-shadow"
							}
						}
						_removeProp(s, p);
					}
				}
				if (clearTransform) {
					_removeProp(s, _transformProp);
					transform = this.t._gsTransform;
					if (transform) {
						if (transform.svg) {
							this.t.removeAttribute("data-svg-origin");
							this.t.removeAttribute("transform");
						}
						delete this.t._gsTransform;
					}
				}

			}
		};
		_registerComplexSpecialProp("clearProps", {parser:function(t, e, p, cssp, pt) {
			pt = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClearPropsRatio;
			pt.e = e;
			pt.pr = -10;
			pt.data = cssp._tween;
			_hasPriority = true;
			return pt;
		}});

		p = "bezier,throwProps,physicsProps,physics2D".split(",");
		i = p.length;
		while (i--) {
			_registerPluginProp(p[i]);
		}








		p = CSSPlugin.prototype;
		p._firstPT = p._lastParsedTransform = p._transform = null;

		//gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.
		p._onInitTween = function(target, vars, tween, index) {
			if (!target.nodeType) { //css is only for dom elements
				return false;
			}
			this._target = _target = target;
			this._tween = tween;
			this._vars = vars;
			_index = index;
			_autoRound = vars.autoRound;
			_hasPriority = false;
			_suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
			_cs = _getComputedStyle(target, "");
			_overwriteProps = this._overwriteProps;
			var style = target.style,
				v, pt, pt2, first, last, next, zIndex, tpt, threeD;
			if (_reqSafariFix) if (style.zIndex === "") {
				v = _getStyle(target, "zIndex", _cs);
				if (v === "auto" || v === "") {
					//corrects a bug in [non-Android] Safari that prevents it from repainting elements in their new positions if they don't have a zIndex set. We also can't just apply this inside _parseTransform() because anything that's moved in any way (like using "left" or "top" instead of transforms like "x" and "y") can be affected, so it is best to ensure that anything that's tweening has a z-index. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly. Plus zIndex is less memory-intensive.
					this._addLazySet(style, "zIndex", 0);
				}
			}

			if (typeof(vars) === "string") {
				first = style.cssText;
				v = _getAllStyles(target, _cs);
				style.cssText = first + ";" + vars;
				v = _cssDif(target, v, _getAllStyles(target)).difs;
				if (!_supportsOpacity && _opacityValExp.test(vars)) {
					v.opacity = parseFloat( RegExp.$1 );
				}
				vars = v;
				style.cssText = first;
			}

			if (vars.className) { //className tweens will combine any differences they find in the css with the vars that are passed in, so {className:"myClass", scale:0.5, left:20} would work.
				this._firstPT = pt = _specialProps.className.parse(target, vars.className, "className", this, null, null, vars);
			} else {
				this._firstPT = pt = this.parse(target, vars, null);
			}

			if (this._transformType) {
				threeD = (this._transformType === 3);
				if (!_transformProp) {
					style.zoom = 1; //helps correct an IE issue.
				} else if (_isSafari) {
					_reqSafariFix = true;
					//if zIndex isn't set, iOS Safari doesn't repaint things correctly sometimes (seemingly at random).
					if (style.zIndex === "") {
						zIndex = _getStyle(target, "zIndex", _cs);
						if (zIndex === "auto" || zIndex === "") {
							this._addLazySet(style, "zIndex", 0);
						}
					}
					//Setting WebkitBackfaceVisibility corrects 3 bugs:
					// 1) [non-Android] Safari skips rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
					// 2) iOS Safari sometimes neglects to repaint elements in their new positions. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly.
					// 3) Safari sometimes displayed odd artifacts when tweening the transform (or WebkitTransform) property, like ghosts of the edges of the element remained. Definitely a browser bug.
					//Note: we allow the user to override the auto-setting by defining WebkitBackfaceVisibility in the vars of the tween.
					if (_isSafariLT6) {
						this._addLazySet(style, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden"));
					}
				}
				pt2 = pt;
				while (pt2 && pt2._next) {
					pt2 = pt2._next;
				}
				tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);
				this._linkCSSP(tpt, null, pt2);
				tpt.setRatio = _transformProp ? _setTransformRatio : _setIETransformRatio;
				tpt.data = this._transform || _getTransform(target, _cs, true);
				tpt.tween = tween;
				tpt.pr = -1; //ensures that the transforms get applied after the components are updated.
				_overwriteProps.pop(); //we don't want to force the overwrite of all "transform" tweens of the target - we only care about individual transform properties like scaleX, rotation, etc. The CSSPropTween constructor automatically adds the property to _overwriteProps which is why we need to pop() here.
			}

			if (_hasPriority) {
				//reorders the linked list in order of pr (priority)
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				this._firstPT = first;
			}
			return true;
		};


		p.parse = function(target, vars, pt, plugin) {
			var style = target.style,
				p, sp, bn, en, bs, es, bsfx, esfx, isStr, rel;
			for (p in vars) {
				es = vars[p]; //ending value string
				if (typeof(es) === "function") {
					es = es(_index, _target);
				}
				sp = _specialProps[p]; //SpecialProp lookup.
				if (sp) {
					pt = sp.parse(target, es, p, this, pt, plugin, vars);
				} else if (p.substr(0,2) === "--") { //for tweening CSS variables (which always start with "--"). To maximize performance and simplicity, we bypass CSSPlugin altogether and just add a normal property tween to the tween instance itself.
					this._tween._propLookup[p] = this._addTween.call(this._tween, target.style, "setProperty", _getComputedStyle(target).getPropertyValue(p) + "", es + "", p, false, p);
					continue;
				} else {
					bs = _getStyle(target, p, _cs) + "";
					isStr = (typeof(es) === "string");
					if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || (isStr && _rgbhslExp.test(es))) { //Opera uses background: to define color sometimes in addition to backgroundColor:
						if (!isStr) {
							es = _parseColor(es);
							es = ((es.length > 3) ? "rgba(" : "rgb(") + es.join(",") + ")";
						}
						pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);

					} else if (isStr && _complexExp.test(es)) {
						pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin);

					} else {
						bn = parseFloat(bs);
						bsfx = (bn || bn === 0) ? bs.substr((bn + "").length) : ""; //remember, bs could be non-numeric like "normal" for fontWeight, so we should default to a blank suffix in that case.

						if (bs === "" || bs === "auto") {
							if (p === "width" || p === "height") {
								bn = _getDimension(target, p, _cs);
								bsfx = "px";
							} else if (p === "left" || p === "top") {
								bn = _calculateOffset(target, p, _cs);
								bsfx = "px";
							} else {
								bn = (p !== "opacity") ? 0 : 1;
								bsfx = "";
							}
						}

						rel = (isStr && es.charAt(1) === "=");
						if (rel) {
							en = parseInt(es.charAt(0) + "1", 10);
							es = es.substr(2);
							en *= parseFloat(es);
							esfx = es.replace(_suffixExp, "");
						} else {
							en = parseFloat(es);
							esfx = isStr ? es.replace(_suffixExp, "") : "";
						}

						if (esfx === "") {
							esfx = (p in _suffixMap) ? _suffixMap[p] : bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
						}

						es = (en || en === 0) ? (rel ? en + bn : en) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.
						//if the beginning/ending suffixes don't match, normalize them...
						if (bsfx !== esfx) if (esfx !== "" || p === "lineHeight") if (en || en === 0) if (bn) { //note: if the beginning value (bn) is 0, we don't need to convert units!
							bn = _convertToPixels(target, p, bn, bsfx);
							if (esfx === "%") {
								bn /= _convertToPixels(target, p, 100, "%") / 100;
								if (vars.strictUnits !== true) { //some browsers report only "px" values instead of allowing "%" with getComputedStyle(), so we assume that if we're tweening to a %, we should start there too unless strictUnits:true is defined. This approach is particularly useful for responsive designs that use from() tweens.
									bs = bn + "%";
								}

							} else if (esfx === "em" || esfx === "rem" || esfx === "vw" || esfx === "vh") {
								bn /= _convertToPixels(target, p, 1, esfx);

							//otherwise convert to pixels.
							} else if (esfx !== "px") {
								en = _convertToPixels(target, p, en, esfx);
								esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
							}
							if (rel) if (en || en === 0) {
								es = (en + bn) + esfx; //the changes we made affect relative calculations, so adjust the end value here.
							}
						}

						if (rel) {
							en += bn;
						}

						if ((bn || bn === 0) && (en || en === 0)) { //faster than isNaN(). Also, previously we required en !== bn but that doesn't really gain much performance and it prevents _parseToProxy() from working properly if beginning and ending values match but need to get tweened by an external plugin anyway. For example, a bezier tween where the target starts at left:0 and has these points: [{left:50},{left:0}] wouldn't work properly because when parsing the last point, it'd match the first (current) one and a non-tweening CSSPropTween would be recorded when we actually need a normal tween (type:0) so that things get updated during the tween properly.
							pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, p, (_autoRound !== false && (esfx === "px" || p === "zIndex")), 0, bs, es);
							pt.xs0 = esfx;
							//DEBUG: _log("tween "+p+" from "+pt.b+" ("+bn+esfx+") to "+pt.e+" with suffix: "+pt.xs0);
						} else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
							_log("invalid " + p + " tween value: " + vars[p]);
						} else {
							pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, p, false, 0, bs, es);
							pt.xs0 = (es === "none" && (p === "display" || p.indexOf("Style") !== -1)) ? bs : es; //intermediate value should typically be set immediately (end value) except for "display" or things like borderTopStyle, borderBottomStyle, etc. which should use the beginning value during the tween.
							//DEBUG: _log("non-tweening value "+p+": "+pt.xs0);
						}
					}
				}
				if (plugin) if (pt && !pt.plugin) {
					pt.plugin = plugin;
				}
			}
			return pt;
		};


		//gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.
		p.setRatio = function(v) {
			var pt = this._firstPT,
				min = 0.000001,
				val, str, i;
			//at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards).
			if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
				while (pt) {
					if (pt.type !== 2) {
						if (pt.r && pt.type !== -1) {
							val = Math.round(pt.s + pt.c);
							if (!pt.type) {
								pt.t[pt.p] = val + pt.xs0;
							} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
								i = pt.l;
								str = pt.xs0 + val + pt.xs1;
								for (i = 1; i < pt.l; i++) {
									str += pt["xn"+i] + pt["xs"+(i+1)];
								}
								pt.t[pt.p] = str;
							}
						} else {
							pt.t[pt.p] = pt.e;
						}
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			} else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
				while (pt) {
					val = pt.c * v + pt.s;
					if (pt.r) {
						val = Math.round(val);
					} else if (val < min) if (val > -min) {
						val = 0;
					}
					if (!pt.type) {
						pt.t[pt.p] = val + pt.xs0;
					} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
						i = pt.l;
						if (i === 2) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
						} else if (i === 3) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
						} else if (i === 4) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
						} else if (i === 5) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
						} else {
							str = pt.xs0 + val + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt.t[pt.p] = str;
						}

					} else if (pt.type === -1) { //non-tweening value
						pt.t[pt.p] = pt.xs0;

					} else if (pt.setRatio) { //custom setRatio() for things like SpecialProps, external plugins, etc.
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			//if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).
			} else {
				while (pt) {
					if (pt.type !== 2) {
						pt.t[pt.p] = pt.b;
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}
			}
		};

		/**
		 * @private
		 * Forces rendering of the target's transforms (rotation, scale, etc.) whenever the CSSPlugin's setRatio() is called.
		 * Basically, this tells the CSSPlugin to create a CSSPropTween (type 2) after instantiation that runs last in the linked
		 * list and calls the appropriate (3D or 2D) rendering function. We separate this into its own method so that we can call
		 * it from other plugins like BezierPlugin if, for example, it needs to apply an autoRotation and this CSSPlugin
		 * doesn't have any transform-related properties of its own. You can call this method as many times as you
		 * want and it won't create duplicate CSSPropTweens.
		 *
		 * @param {boolean} threeD if true, it should apply 3D tweens (otherwise, just 2D ones are fine and typically faster)
		 */
		p._enableTransforms = function(threeD) {
			this._transform = this._transform || _getTransform(this._target, _cs, true); //ensures that the element has a _gsTransform property with the appropriate values.
			this._transformType = (!(this._transform.svg && _useSVGTransformAttr) && (threeD || this._transformType === 3)) ? 3 : 2;
		};

		var lazySet = function(v) {
			this.t[this.p] = this.e;
			this.data._linkCSSP(this, this._next, null, true); //we purposefully keep this._next even though it'd make sense to null it, but this is a performance optimization, as this happens during the while (pt) {} loop in setRatio() at the bottom of which it sets pt = pt._next, so if we null it, the linked list will be broken in that loop.
		};
		/** @private Gives us a way to set a value on the first render (and only the first render). **/
		p._addLazySet = function(t, p, v) {
			var pt = this._firstPT = new CSSPropTween(t, p, 0, 0, this._firstPT, 2);
			pt.e = v;
			pt.setRatio = lazySet;
			pt.data = this;
		};

		/** @private **/
		p._linkCSSP = function(pt, next, prev, remove) {
			if (pt) {
				if (next) {
					next._prev = pt;
				}
				if (pt._next) {
					pt._next._prev = pt._prev;
				}
				if (pt._prev) {
					pt._prev._next = pt._next;
				} else if (this._firstPT === pt) {
					this._firstPT = pt._next;
					remove = true; //just to prevent resetting this._firstPT 5 lines down in case pt._next is null. (optimized for speed)
				}
				if (prev) {
					prev._next = pt;
				} else if (!remove && this._firstPT === null) {
					this._firstPT = pt;
				}
				pt._next = next;
				pt._prev = prev;
			}
			return pt;
		};

		p._mod = function(lookup) {
			var pt = this._firstPT;
			while (pt) {
				if (typeof(lookup[pt.p]) === "function" && lookup[pt.p] === Math.round) { //only gets called by RoundPropsPlugin (ModifyPlugin manages all the rendering internally for CSSPlugin properties that need modification). Remember, we handle rounding a bit differently in this plugin for performance reasons, leveraging "r" as an indicator that the value should be rounded internally..
					pt.r = 1;
				}
				pt = pt._next;
			}
		};

		//we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.
		p._kill = function(lookup) {
			var copy = lookup,
				pt, p, xfirst;
			if (lookup.autoAlpha || lookup.alpha) {
				copy = {};
				for (p in lookup) { //copy the lookup so that we're not changing the original which may be passed elsewhere.
					copy[p] = lookup[p];
				}
				copy.opacity = 1;
				if (copy.autoAlpha) {
					copy.visibility = 1;
				}
			}
			if (lookup.className && (pt = this._classNamePT)) { //for className tweens, we need to kill any associated CSSPropTweens too; a linked list starts at the className's "xfirst".
				xfirst = pt.xfirst;
				if (xfirst && xfirst._prev) {
					this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); //break off the prev
				} else if (xfirst === this._firstPT) {
					this._firstPT = pt._next;
				}
				if (pt._next) {
					this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
				}
				this._classNamePT = null;
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.plugin && pt.plugin !== p && pt.plugin._kill) { //for plugins that are registered with CSSPlugin, we should notify them of the kill.
					pt.plugin._kill(lookup);
					p = pt.plugin;
				}
				pt = pt._next;
			}
			return TweenPlugin.prototype._kill.call(this, copy);
		};



		//used by cascadeTo() for gathering all the style properties of each child element into an array for comparison.
		var _getChildStyles = function(e, props, targets) {
				var children, i, child, type;
				if (e.slice) {
					i = e.length;
					while (--i > -1) {
						_getChildStyles(e[i], props, targets);
					}
					return;
				}
				children = e.childNodes;
				i = children.length;
				while (--i > -1) {
					child = children[i];
					type = child.type;
					if (child.style) {
						props.push(_getAllStyles(child));
						if (targets) {
							targets.push(child);
						}
					}
					if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
						_getChildStyles(child, props, targets);
					}
				}
			};

		/**
		 * Typically only useful for className tweens that may affect child elements, this method creates a TweenLite
		 * and then compares the style properties of all the target's child elements at the tween's start and end, and
		 * if any are different, it also creates tweens for those and returns an array containing ALL of the resulting
		 * tweens (so that you can easily add() them to a TimelineLite, for example). The reason this functionality is
		 * wrapped into a separate static method of CSSPlugin instead of being integrated into all regular className tweens
		 * is because it creates entirely new tweens that may have completely different targets than the original tween,
		 * so if they were all lumped into the original tween instance, it would be inconsistent with the rest of the API
		 * and it would create other problems. For example:
		 *  - If I create a tween of elementA, that tween instance may suddenly change its target to include 50 other elements (unintuitive if I specifically defined the target I wanted)
		 *  - We can't just create new independent tweens because otherwise, what happens if the original/parent tween is reversed or pause or dropped into a TimelineLite for tight control? You'd expect that tween's behavior to affect all the others.
		 *  - Analyzing every style property of every child before and after the tween is an expensive operation when there are many children, so this behavior shouldn't be imposed on all className tweens by default, especially since it's probably rare that this extra functionality is needed.
		 *
		 * @param {Object} target object to be tweened
		 * @param {number} Duration in seconds (or frames for frames-based tweens)
		 * @param {Object} Object containing the end values, like {className:"newClass", ease:Linear.easeNone}
		 * @return {Array} An array of TweenLite instances
		 */
		CSSPlugin.cascadeTo = function(target, duration, vars) {
			var tween = TweenLite.to(target, duration, vars),
				results = [tween],
				b = [],
				e = [],
				targets = [],
				_reservedProps = TweenLite._internals.reservedProps,
				i, difs, p, from;
			target = tween._targets || tween.target;
			_getChildStyles(target, b, targets);
			tween.render(duration, true, true);
			_getChildStyles(target, e);
			tween.render(0, true, true);
			tween._enabled(true);
			i = targets.length;
			while (--i > -1) {
				difs = _cssDif(targets[i], b[i], e[i]);
				if (difs.firstMPT) {
					difs = difs.difs;
					for (p in vars) {
						if (_reservedProps[p]) {
							difs[p] = vars[p];
						}
					}
					from = {};
					for (p in difs) {
						from[p] = b[i][p];
					}
					results.push(TweenLite.fromTo(targets[i], duration, from, difs));
				}
			}
			return results;
		};

		TweenPlugin.activate([CSSPlugin]);
		return CSSPlugin;

	}, true);

	
	
	
	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * RoundPropsPlugin
 * ----------------------------------------------------------------
 */
	(function() {

		var RoundPropsPlugin = _gsScope._gsDefine.plugin({
				propName: "roundProps",
				version: "1.6.0",
				priority: -1,
				API: 2,

				//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
				init: function(target, value, tween) {
					this._tween = tween;
					return true;
				}

			}),
			_roundLinkedList = function(node) {
				while (node) {
					if (!node.f && !node.blob) {
						node.m = Math.round;
					}
					node = node._next;
				}
			},
			p = RoundPropsPlugin.prototype;

		p._onInitAllProps = function() {
			var tween = this._tween,
				rp = (tween.vars.roundProps.join) ? tween.vars.roundProps : tween.vars.roundProps.split(","),
				i = rp.length,
				lookup = {},
				rpt = tween._propLookup.roundProps,
				prop, pt, next;
			while (--i > -1) {
				lookup[rp[i]] = Math.round;
			}
			i = rp.length;
			while (--i > -1) {
				prop = rp[i];
				pt = tween._firstPT;
				while (pt) {
					next = pt._next; //record here, because it may get removed
					if (pt.pg) {
						pt.t._mod(lookup);
					} else if (pt.n === prop) {
						if (pt.f === 2 && pt.t) { //a blob (text containing multiple numeric values)
							_roundLinkedList(pt.t._firstPT);
						} else {
							this._add(pt.t, prop, pt.s, pt.c);
							//remove from linked list
							if (next) {
								next._prev = pt._prev;
							}
							if (pt._prev) {
								pt._prev._next = next;
							} else if (tween._firstPT === pt) {
								tween._firstPT = next;
							}
							pt._next = pt._prev = null;
							tween._propLookup[prop] = rpt;
						}
					}
					pt = next;
				}
			}
			return false;
		};

		p._add = function(target, p, s, c) {
			this._addTween(target, p, s, s + c, p, Math.round);
			this._overwriteProps.push(p);
		};

	}());










/*
 * ----------------------------------------------------------------
 * AttrPlugin
 * ----------------------------------------------------------------
 */

	(function() {

		_gsScope._gsDefine.plugin({
			propName: "attr",
			API: 2,
			version: "0.6.1",

			//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
			init: function(target, value, tween, index) {
				var p, end;
				if (typeof(target.setAttribute) !== "function") {
					return false;
				}
				for (p in value) {
					end = value[p];
					if (typeof(end) === "function") {
						end = end(index, target);
					}
					this._addTween(target, "setAttribute", target.getAttribute(p) + "", end + "", p, false, p);
					this._overwriteProps.push(p);
				}
				return true;
			}

		});

	}());










/*
 * ----------------------------------------------------------------
 * DirectionalRotationPlugin
 * ----------------------------------------------------------------
 */
	_gsScope._gsDefine.plugin({
		propName: "directionalRotation",
		version: "0.3.1",
		API: 2,

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween, index) {
			if (typeof(value) !== "object") {
				value = {rotation:value};
			}
			this.finals = {};
			var cap = (value.useRadians === true) ? Math.PI * 2 : 360,
				min = 0.000001,
				p, v, start, end, dif, split;
			for (p in value) {
				if (p !== "useRadians") {
					end = value[p];
					if (typeof(end) === "function") {
						end = end(index, target);
					}
					split = (end + "").split("_");
					v = split[0];
					start = parseFloat( (typeof(target[p]) !== "function") ? target[p] : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]() );
					end = this.finals[p] = (typeof(v) === "string" && v.charAt(1) === "=") ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
					dif = end - start;
					if (split.length) {
						v = split.join("_");
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					if (dif > min || dif < -min) {
						this._addTween(target, p, start, start + dif, p);
						this._overwriteProps.push(p);
					}
				}
			}
			return true;
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {
			var pt;
			if (ratio !== 1) {
				this._super.setRatio.call(this, ratio);
			} else {
				pt = this._firstPT;
				while (pt) {
					if (pt.f) {
						pt.t[pt.p](this.finals[pt.p]);
					} else {
						pt.t[pt.p] = this.finals[pt.p];
					}
					pt = pt._next;
				}
			}
		}

	})._autoCSS = true;







	
	
	
	
/*
 * ----------------------------------------------------------------
 * EasePack
 * ----------------------------------------------------------------
 */
	_gsScope._gsDefine("easing.Back", ["easing.Ease"], function(Ease) {
		
		var w = (_gsScope.GreenSockGlobals || _gsScope),
			gs = w.com.greensock,
			_2PI = Math.PI * 2,
			_HALF_PI = Math.PI / 2,
			_class = gs._class,
			_create = function(n, f) {
				var C = _class("easing." + n, function(){}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				return C;
			},
			_easeReg = Ease.register || function(){}, //put an empty function in place just as a safety measure in case someone loads an OLD version of TweenLite.js where Ease.register doesn't exist.
			_wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {
				var C = _class("easing."+name, {
					easeOut:new EaseOut(),
					easeIn:new EaseIn(),
					easeInOut:new EaseInOut()
				}, true);
				_easeReg(C, name);
				return C;
			},
			EasePoint = function(time, value, next) {
				this.t = time;
				this.v = value;
				if (next) {
					this.next = next;
					next.prev = this;
					this.c = next.v - value;
					this.gap = next.t - time;
				}
			},

			//Back
			_createBack = function(n, f) {
				var C = _class("easing." + n, function(overshoot) {
						this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;
						this._p2 = this._p1 * 1.525;
					}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				p.config = function(overshoot) {
					return new C(overshoot);
				};
				return C;
			},

			Back = _wrap("Back",
				_createBack("BackOut", function(p) {
					return ((p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1);
				}),
				_createBack("BackIn", function(p) {
					return p * p * ((this._p1 + 1) * p - this._p1);
				}),
				_createBack("BackInOut", function(p) {
					return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
				})
			),


			//SlowMo
			SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
				power = (power || power === 0) ? power : 0.7;
				if (linearRatio == null) {
					linearRatio = 0.7;
				} else if (linearRatio > 1) {
					linearRatio = 1;
				}
				this._p = (linearRatio !== 1) ? power : 0;
				this._p1 = (1 - linearRatio) / 2;
				this._p2 = linearRatio;
				this._p3 = this._p1 + this._p2;
				this._calcEnd = (yoyoMode === true);
			}, true),
			p = SlowMo.prototype = new Ease(),
			SteppedEase, ExpoScaleEase, RoughEase, _createElastic;

		p.constructor = SlowMo;
		p.getRatio = function(p) {
			var r = p + (0.5 - p) * this._p;
			if (p < this._p1) {
				return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r);
			} else if (p > this._p3) {
				return this._calcEnd ? (p === 1 ? 0 : 1 - (p = (p - this._p3) / this._p1) * p) : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p); //added p === 1 ? 0 to avoid floating point rounding errors from affecting the final value, like 1 - 0.7 = 0.30000000000000004 instead of 0.3
			}
			return this._calcEnd ? 1 : r;
		};
		SlowMo.ease = new SlowMo(0.7, 0.7);

		p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {
			return new SlowMo(linearRatio, power, yoyoMode);
		};


		//SteppedEase
		SteppedEase = _class("easing.SteppedEase", function(steps, immediateStart) {
				steps = steps || 1;
				this._p1 = 1 / steps;
				this._p2 = steps + (immediateStart ? 0 : 1);
				this._p3 = immediateStart ? 1 : 0;
			}, true);
		p = SteppedEase.prototype = new Ease();
		p.constructor = SteppedEase;
		p.getRatio = function(p) {
			if (p < 0) {
				p = 0;
			} else if (p >= 1) {
				p = 0.999999999;
			}
			return (((this._p2 * p) | 0) + this._p3) * this._p1;
		};
		p.config = SteppedEase.config = function(steps, immediateStart) {
			return new SteppedEase(steps, immediateStart);
		};

		//ExpoScaleEase
		ExpoScaleEase = _class("easing.ExpoScaleEase", function(start, end, ease) {
			this._p1 = Math.log(end / start);
			this._p2 = end - start;
			this._p3 = start;
			this._ease = ease;
		}, true);
		p = ExpoScaleEase.prototype = new Ease();
		p.constructor = ExpoScaleEase;
		p.getRatio = function(p) {
			if (this._ease) {
				p = this._ease.getRatio(p);
			}
			return (this._p3 * Math.exp(this._p1 * p) - this._p3) / this._p2;
		};
		p.config = ExpoScaleEase.config = function(start, end, ease) {
			return new ExpoScaleEase(start, end, ease);
		};


		//RoughEase
		RoughEase = _class("easing.RoughEase", function(vars) {
			vars = vars || {};
			var taper = vars.taper || "none",
				a = [],
				cnt = 0,
				points = (vars.points || 20) | 0,
				i = points,
				randomize = (vars.randomize !== false),
				clamp = (vars.clamp === true),
				template = (vars.template instanceof Ease) ? vars.template : null,
				strength = (typeof(vars.strength) === "number") ? vars.strength * 0.4 : 0.4,
				x, y, bump, invX, obj, pnt;
			while (--i > -1) {
				x = randomize ? Math.random() : (1 / points) * i;
				y = template ? template.getRatio(x) : x;
				if (taper === "none") {
					bump = strength;
				} else if (taper === "out") {
					invX = 1 - x;
					bump = invX * invX * strength;
				} else if (taper === "in") {
					bump = x * x * strength;
				} else if (x < 0.5) {  //"both" (start)
					invX = x * 2;
					bump = invX * invX * 0.5 * strength;
				} else {				//"both" (end)
					invX = (1 - x) * 2;
					bump = invX * invX * 0.5 * strength;
				}
				if (randomize) {
					y += (Math.random() * bump) - (bump * 0.5);
				} else if (i % 2) {
					y += bump * 0.5;
				} else {
					y -= bump * 0.5;
				}
				if (clamp) {
					if (y > 1) {
						y = 1;
					} else if (y < 0) {
						y = 0;
					}
				}
				a[cnt++] = {x:x, y:y};
			}
			a.sort(function(a, b) {
				return a.x - b.x;
			});

			pnt = new EasePoint(1, 1, null);
			i = points;
			while (--i > -1) {
				obj = a[i];
				pnt = new EasePoint(obj.x, obj.y, pnt);
			}

			this._prev = new EasePoint(0, 0, (pnt.t !== 0) ? pnt : pnt.next);
		}, true);
		p = RoughEase.prototype = new Ease();
		p.constructor = RoughEase;
		p.getRatio = function(p) {
			var pnt = this._prev;
			if (p > pnt.t) {
				while (pnt.next && p >= pnt.t) {
					pnt = pnt.next;
				}
				pnt = pnt.prev;
			} else {
				while (pnt.prev && p <= pnt.t) {
					pnt = pnt.prev;
				}
			}
			this._prev = pnt;
			return (pnt.v + ((p - pnt.t) / pnt.gap) * pnt.c);
		};
		p.config = function(vars) {
			return new RoughEase(vars);
		};
		RoughEase.ease = new RoughEase();


		//Bounce
		_wrap("Bounce",
			_create("BounceOut", function(p) {
				if (p < 1 / 2.75) {
					return 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				}
				return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
			}),
			_create("BounceIn", function(p) {
				if ((p = 1 - p) < 1 / 2.75) {
					return 1 - (7.5625 * p * p);
				} else if (p < 2 / 2.75) {
					return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
				} else if (p < 2.5 / 2.75) {
					return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
				}
				return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
			}),
			_create("BounceInOut", function(p) {
				var invert = (p < 0.5);
				if (invert) {
					p = 1 - (p * 2);
				} else {
					p = (p * 2) - 1;
				}
				if (p < 1 / 2.75) {
					p = 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				} else {
					p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
				}
				return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
			})
		);


		//CIRC
		_wrap("Circ",
			_create("CircOut", function(p) {
				return Math.sqrt(1 - (p = p - 1) * p);
			}),
			_create("CircIn", function(p) {
				return -(Math.sqrt(1 - (p * p)) - 1);
			}),
			_create("CircInOut", function(p) {
				return ((p*=2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
			})
		);


		//Elastic
		_createElastic = function(n, f, def) {
			var C = _class("easing." + n, function(amplitude, period) {
					this._p1 = (amplitude >= 1) ? amplitude : 1; //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
					this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1);
					this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
					this._p2 = _2PI / this._p2; //precalculate to optimize
				}, true),
				p = C.prototype = new Ease();
			p.constructor = C;
			p.getRatio = f;
			p.config = function(amplitude, period) {
				return new C(amplitude, period);
			};
			return C;
		};
		_wrap("Elastic",
			_createElastic("ElasticOut", function(p) {
				return this._p1 * Math.pow(2, -10 * p) * Math.sin( (p - this._p3) * this._p2 ) + 1;
			}, 0.3),
			_createElastic("ElasticIn", function(p) {
				return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2 ));
			}, 0.3),
			_createElastic("ElasticInOut", function(p) {
				return ((p *= 2) < 1) ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 *(p -= 1)) * Math.sin( (p - this._p3) * this._p2 ) * 0.5 + 1;
			}, 0.45)
		);


		//Expo
		_wrap("Expo",
			_create("ExpoOut", function(p) {
				return 1 - Math.pow(2, -10 * p);
			}),
			_create("ExpoIn", function(p) {
				return Math.pow(2, 10 * (p - 1)) - 0.001;
			}),
			_create("ExpoInOut", function(p) {
				return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
			})
		);


		//Sine
		_wrap("Sine",
			_create("SineOut", function(p) {
				return Math.sin(p * _HALF_PI);
			}),
			_create("SineIn", function(p) {
				return -Math.cos(p * _HALF_PI) + 1;
			}),
			_create("SineInOut", function(p) {
				return -0.5 * (Math.cos(Math.PI * p) - 1);
			})
		);

		_class("easing.EaseLookup", {
				find:function(s) {
					return Ease.map[s];
				}
			}, true);

		//register the non-standard eases
		_easeReg(w.SlowMo, "SlowMo", "ease,");
		_easeReg(RoughEase, "RoughEase", "ease,");
		_easeReg(SteppedEase, "SteppedEase", "ease,");

		return Back;
		
	}, true);


});

if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); } //necessary in case TweenLite was already loaded separately.











/*
 * ----------------------------------------------------------------
 * Base classes like TweenLite, SimpleTimeline, Ease, Ticker, etc.
 * ----------------------------------------------------------------
 */
(function(window, moduleName) {

		"use strict";
		var _exports = {},
			_doc = window.document,
			_globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
		if (_globals.TweenLite) {
			return; //in case the core set of classes is already loaded, don't instantiate twice.
		}
		var _namespace = function(ns) {
				var a = ns.split("."),
					p = _globals, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			_tinyNum = 0.0000000001,
			_slice = function(a) { //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++])) {}
				return b;
			},
			_emptyFunc = function() {},
			_isArray = (function() { //works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
				var toString = Object.prototype.toString,
					array = toString.call([]);
				return function(obj) {
					return obj != null && (obj instanceof Array || (typeof(obj) === "object" && !!obj.push && toString.call(obj) === array));
				};
			}()),
			a, i, p, _ticker, _tickerActive,
			_defLookup = {},

			/**
			 * @constructor
			 * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
			 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
			 * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
			 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
			 *
			 * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
			 * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
			 * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
			 * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
			 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
			 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
			 * sandbox the banner one like:
			 *
			 * <script>
			 *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
			 * </script>
			 * <script src="js/greensock/v1.7/TweenMax.js"></script>
			 * <script>
			 *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
			 * </script>
			 * <script src="js/greensock/v1.6/TweenMax.js"></script>
			 * <script>
			 *     gs.TweenLite.to(...); //would use v1.7
			 *     TweenLite.to(...); //would use v1.6
			 * </script>
			 *
			 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
			 * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
			 * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
			 * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
			 */
			Definition = function(ns, dependencies, func, global) {
				this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
				_defLookup[ns] = this;
				this.gsClass = null;
				this.func = func;
				var _classes = [];
				this.check = function(init) {
					var i = dependencies.length,
						missing = i,
						cur, a, n, cl;
					while (--i > -1) {
						if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
							_classes[i] = cur.gsClass;
							missing--;
						} else if (init) {
							cur.sc.push(this);
						}
					}
					if (missing === 0 && func) {
						a = ("com.greensock." + ns).split(".");
						n = a.pop();
						cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

						//exports to multiple environments
						if (global) {
							_globals[n] = _exports[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
							if (typeof(module) !== "undefined" && module.exports) { //node
								if (ns === moduleName) {
									module.exports = _exports[moduleName] = cl;
									for (i in _exports) {
										cl[i] = _exports[i];
									}
								} else if (_exports[moduleName]) {
									_exports[moduleName][n] = cl;
								}
							} else if (true){ //AMD
								!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() { return cl; }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
							}
						}
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check();
						}
					}
				};
				this.check(true);
			},

			//used to create Definition instances (which basically registers a class that has dependencies).
			_gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
				return new Definition(ns, dependencies, func, global);
			},

			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, func, global) {
				func = func || function() {};
				_gsDefine(ns, [], function(){ return func; }, global);
				return func;
			};

		_gsDefine.globals = _globals;



/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true),
			_easeMap = Ease.map = {},
			_easeReg = Ease.register = function(ease, names, types, create) {
				var na = names.split(","),
					i = na.length,
					ta = (types || "easeIn,easeOut,easeInOut").split(","),
					e, name, j, type;
				while (--i > -1) {
					name = na[i];
					e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
					j = ta.length;
					while (--j > -1) {
						type = ta[j];
						_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
					}
				}
			};

		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			}
			var t = this._type,
				pw = this._power,
				r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
			if (pw === 1) {
				r *= r;
			} else if (pw === 2) {
				r *= r * r;
			} else if (pw === 3) {
				r *= r * r * r;
			} else if (pw === 4) {
				r *= r * r * r * r;
			}
			return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
		};

		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
		i = a.length;
		while (--i > -1) {
			p = a[i]+",Power"+i;
			_easeReg(new Ease(null,null,1,i), p, "easeOut", true);
			_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
			_easeReg(new Ease(null,null,3,i), p, "easeInOut");
		}
		_easeMap.linear = gs.easing.Linear.easeIn;
		_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		var EventDispatcher = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		});
		p = EventDispatcher.prototype;

		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (this === _ticker && !_tickerActive) {
				_ticker.wake();
			}
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback && listener.s === scope) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
		};

		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type], i;
			if (list) {
				i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};

		p.dispatchEvent = function(type) {
			var list = this._listeners[type],
				i, t, listener;
			if (list) {
				i = list.length;
				if (i > 1) {
					list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
				}
				t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener) {
						if (listener.up) {
							listener.c.call(listener.s || t, {type:type, target:t});
						} else {
							listener.c.call(listener.s || t);
						}
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _reqAnimFrame = window.requestAnimationFrame,
			_cancelAnimFrame = window.cancelAnimationFrame,
			_getTime = Date.now || function() {return new Date().getTime();},
			_lastUpdate = _getTime();

		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_reqAnimFrame) {
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}

		_class("Ticker", function(fps, useRAF) {
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false && _reqAnimFrame) ? "auto" : false,
				_lagThreshold = 500,
				_adjustedLag = 33,
				_tickWord = "tick", //helps reduce gc burden
				_fps, _req, _id, _gap, _nextTime,
				_tick = function(manual) {
					var elapsed = _getTime() - _lastUpdate,
						overlap, dispatch;
					if (elapsed > _lagThreshold) {
						_startTime += elapsed - _adjustedLag;
					}
					_lastUpdate += elapsed;
					_self.time = (_lastUpdate - _startTime) / 1000;
					overlap = _self.time - _nextTime;
					if (!_fps || overlap > 0 || manual === true) {
						_self.frame++;
						_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
						dispatch = true;
					}
					if (manual !== true) { //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
						_id = _req(_tick);
					}
					if (dispatch) {
						_self.dispatchEvent(_tickWord);
					}
				};

			EventDispatcher.call(_self);
			_self.time = _self.frame = 0;
			_self.tick = function() {
				_tick(true);
			};

			_self.lagSmoothing = function(threshold, adjustedLag) {
				if (!arguments.length) { //if lagSmoothing() is called with no arguments, treat it like a getter that returns a boolean indicating if it's enabled or not. This is purposely undocumented and is for internal use.
					return (_lagThreshold < 1 / _tinyNum);
				}
				_lagThreshold = threshold || (1 / _tinyNum); //zero should be interpreted as basically unlimited
				_adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
			};

			_self.sleep = function() {
				if (_id == null) {
					return;
				}
				if (!_useRAF || !_cancelAnimFrame) {
					clearTimeout(_id);
				} else {
					_cancelAnimFrame(_id);
				}
				_req = _emptyFunc;
				_id = null;
				if (_self === _ticker) {
					_tickerActive = false;
				}
			};

			_self.wake = function(seamless) {
				if (_id !== null) {
					_self.sleep();
				} else if (seamless) {
					_startTime += -_lastUpdate + (_lastUpdate = _getTime());
				} else if (_self.frame > 10) { //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
					_lastUpdate = _getTime() - _lagThreshold + 5;
				}
				_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
				if (_self === _ticker) {
					_tickerActive = true;
				}
				_tick(2);
			};

			_self.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_self.wake();
			};

			_self.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF;
				}
				_self.sleep();
				_useRAF = value;
				_self.fps(_fps);
			};
			_self.fps(fps);

			//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
			setTimeout(function() {
				if (_useRAF === "auto" && _self.frame < 5 && (_doc || {}).visibilityState !== "hidden") {
					_self.useRAF(false);
				}
			}, 1500);
		});

		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * Animation
 * ----------------------------------------------------------------
 */
		var Animation = _class("core.Animation", function(duration, vars) {
				this.vars = vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(vars.delay) || 0;
				this._timeScale = 1;
				this._active = (vars.immediateRender === true);
				this.data = vars.data;
				this._reversed = (vars.reversed === true);

				if (!_rootTimeline) {
					return;
				}
				if (!_tickerActive) { //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
					_ticker.wake();
				}

				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.add(this, tl._time);

				if (this.vars.paused) {
					this.paused(true);
				}
			});

		_ticker = Animation.ticker = new gs.Ticker();
		p = Animation.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
		p._paused = false;


		//some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
		var _checkTimeout = function() {
				if (_tickerActive && _getTime() - _lastUpdate > 2000 && ((_doc || {}).visibilityState !== "hidden" || !_ticker.lagSmoothing())) { //note: if the tab is hidden, we should still wake if lagSmoothing has been disabled.
					_ticker.wake();
				}
				var t = setTimeout(_checkTimeout, 2000);
				if (t.unref) {
					// allows a node process to exit even if the timeout’s callback hasn't been invoked. Without it, the node process could hang as this function is called every two seconds.
					t.unref();
				}
			};
		_checkTimeout();


		p.play = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.reversed(false).paused(false);
		};

		p.pause = function(atTime, suppressEvents) {
			if (atTime != null) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};

		p.resume = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};

		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), suppressEvents !== false);
		};

		p.restart = function(includeDelay, suppressEvents) {
			return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
		};

		p.reverse = function(from, suppressEvents) {
			if (from != null) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			return this.reversed(true).paused(false);
		};

		p.render = function(time, suppressEvents, force) {
			//stub - we override this method in subclasses.
		};

		p.invalidate = function() {
			this._time = this._totalTime = 0;
			this._initted = this._gc = false;
			this._rawPrevTime = -1;
			if (this._gc || !this.timeline) {
				this._enabled(true);
			}
			return this;
		};

		p.isActive = function() {
			var tl = this._timeline, //the 2 root timelines won't have a _timeline; they're always active.
				startTime = this._startTime,
				rawTime;
			return (!tl || (!this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale - 0.0000001));
		};

		p._enabled = function (enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			this._gc = !enabled;
			this._active = this.isActive();
			if (ignoreTimeline !== true) {
				if (enabled && !this.timeline) {
					this._timeline.add(this, this._startTime - this._delay);
				} else if (!enabled && this.timeline) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};


		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};

		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};

		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.timeline;
			while (tween) {
				tween._dirty = true;
				tween = tween.timeline;
			}
			return this;
		};

		p._swapSelfInParams = function(params) {
			var i = params.length,
				copy = params.concat();
			while (--i > -1) {
				if (params[i] === "{self}") {
					copy[i] = this;
				}
			}
			return copy;
		};

		p._callback = function(type) {
			var v = this.vars,
				callback = v[type],
				params = v[type + "Params"],
				scope = v[type + "Scope"] || v.callbackScope || this,
				l = params ? params.length : 0;
			switch (l) { //speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
				case 0: callback.call(scope); break;
				case 1: callback.call(scope, params[0]); break;
				case 2: callback.call(scope, params[0], params[1]); break;
				default: callback.apply(scope, params);
			}
		};

//----Animation getters/setters --------------------------------------------------------

		p.eventCallback = function(type, callback, params, scope) {
			if ((type || "").substr(0,2) === "on") {
				var v = this.vars;
				if (arguments.length === 1) {
					return v[type];
				}
				if (callback == null) {
					delete v[type];
				} else {
					v[type] = callback;
					v[type + "Params"] = (_isArray(params) && params.join("").indexOf("{self}") !== -1) ? this._swapSelfInParams(params) : params;
					v[type + "Scope"] = scope;
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;
				}
			}
			return this;
		};

		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
			if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};

		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0 && !uncapped) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					var totalDuration = this._totalDuration,
						tl = this._timeline;
					if (time > totalDuration && !uncapped) {
						time = totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
					if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
					if (tl._timeline) {
						while (tl._timeline) {
							if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
								tl.totalTime(tl._totalTime, true);
							}
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime !== time || this._duration === 0) {
					if (_lazyTweens.length) {
						_lazyRender();
					}
					this.render(time, suppressEvents, false);
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
						_lazyRender();
					}
				}
			}
			return this;
		};

		p.progress = p.totalProgress = function(value, suppressEvents) {
			var duration = this.duration();
			return (!arguments.length) ? (duration ? this._time / duration : this.ratio) : this.totalTime(duration * value, suppressEvents);
		};

		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value !== this._startTime) {
				this._startTime = value;
				if (this.timeline) if (this.timeline._sortChildren) {
					this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};

		p.endTime = function(includeRepeats) {
			return this._startTime + ((includeRepeats != false) ? this.totalDuration() : this.duration()) / this._timeScale;
		};

		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			var pauseTime, t;
			value = value || _tinyNum; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				pauseTime = this._pauseTime;
				t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			t = this.timeline;
			while (t && t.timeline) { //must update the duration/totalDuration of all ancestor timelines immediately in case in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
				t._dirty = true;
				t.totalDuration();
				t = t.timeline;
			}
			return this;
		};

		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(((this._timeline && !this._timeline.smoothChildTiming) ? this.totalDuration() - this._totalTime : this._totalTime), true);
			}
			return this;
		};

		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			var tl = this._timeline,
				raw, elapsed;
			if (value != this._paused) if (tl) {
				if (!_tickerActive && !value) {
					_ticker.wake();
				}
				raw = tl.rawTime();
				elapsed = raw - this._pauseTime;
				if (!value && tl.smoothChildTiming) {
					this._startTime += elapsed;
					this._uncache(false);
				}
				this._pauseTime = value ? raw : null;
				this._paused = value;
				this._active = this.isActive();
				if (!value && elapsed !== 0 && this._initted && this.duration()) {
					raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
					this.render(raw, (raw === this._totalTime), true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
				}
			}
			if (this._gc && !value) {
				this._enabled(true, false);
			}
			return this;
		};


/*
 * ----------------------------------------------------------------
 * SimpleTimeline
 * ----------------------------------------------------------------
 */
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
			Animation.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});

		p = SimpleTimeline.prototype = new Animation();
		p.constructor = SimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = p._recent = null;
		p._sortChildren = false;

		p.add = p.insert = function(child, position, align, stagger) {
			var prevTween, st;
			child._startTime = Number(position || 0) + child._delay;
			if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
				child._pauseTime = child._startTime + ((this.rawTime() - child._startTime) / child._timeScale);
			}
			if (child.timeline) {
				child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
			}
			child.timeline = child._timeline = this;
			if (child._gc) {
				child._enabled(true, true);
			}
			prevTween = this._last;
			if (this._sortChildren) {
				st = child._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				child._next = prevTween._next;
				prevTween._next = child;
			} else {
				child._next = this._first;
				this._first = child;
			}
			if (child._next) {
				child._next._prev = child;
			} else {
				this._last = child;
			}
			child._prev = prevTween;
			this._recent = child;
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};

		p._remove = function(tween, skipDisable) {
			if (tween.timeline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}

				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}
				tween._next = tween._prev = tween.timeline = null;
				if (tween === this._recent) {
					this._recent = this._last;
				}

				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};

		p.render = function(time, suppressEvents, force) {
			var tween = this._first,
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused && !tween._gc)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
					}
				}
				tween = next;
			}
		};

		p.rawTime = function() {
			if (!_tickerActive) {
				_ticker.wake();
			}
			return this._totalTime;
		};

/*
 * ----------------------------------------------------------------
 * TweenLite
 * ----------------------------------------------------------------
 */
		var TweenLite = _class("TweenLite", function(target, duration, vars) {
				Animation.call(this, duration, vars);
				this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

				if (target == null) {
					throw "Cannot tween a null target.";
				}

				this.target = target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;

				var isSelector = (target.jquery || (target.length && target !== window && target[0] && (target[0] === window || (target[0].nodeType && target[0].style && !target.nodeType)))),
					overwrite = this.vars.overwrite,
					i, targ, targets;

				this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];

				if ((isSelector || target instanceof Array || (target.push && _isArray(target))) && typeof(target[0]) !== "number") {
					this._targets = targets = _slice(target);  //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < targets.length; i++) {
						targ = targets[i];
						if (!targ) {
							targets.splice(i--, 1);
							continue;
						} else if (typeof(targ) === "string") {
							targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
							if (typeof(targ) === "string") {
								targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
							}
							continue;
						} else if (targ.length && targ !== window && targ[0] && (targ[0] === window || (targ[0].nodeType && targ[0].style && !targ.nodeType))) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
							targets.splice(i--, 1);
							this._targets = targets = targets.concat(_slice(targ));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}

				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
					this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
					this.render(Math.min(0, -this._delay)); //in case delay is negative
				}
			}, true),
			_isSelector = function(v) {
				return (v && v.length && v !== window && v[0] && (v[0] === window || (v[0].nodeType && v[0].style && !v.nodeType))); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
			},
			_autoCSS = function(vars, target) {
				var css = {},
					p;
				for (p in vars) {
					if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
						css[p] = vars[p];
						delete vars[p];
					}
				}
				vars.css = css;
			};

		p = TweenLite.prototype = new Animation();
		p.constructor = TweenLite;
		p.kill()._gc = false;

//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
		p._notifyPluginsOfEnabled = p._lazy = false;

		TweenLite.version = "1.20.4";
		TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		TweenLite.defaultOverwrite = "auto";
		TweenLite.ticker = _ticker;
		TweenLite.autoSleep = 120;
		TweenLite.lagSmoothing = function(threshold, adjustedLag) {
			_ticker.lagSmoothing(threshold, adjustedLag);
		};

		TweenLite.selector = window.$ || window.jQuery || function(e) {
			var selector = window.$ || window.jQuery;
			if (selector) {
				TweenLite.selector = selector;
				return selector(e);
			}
			return (typeof(_doc) === "undefined") ? e : (_doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById((e.charAt(0) === "#") ? e.substr(1) : e));
		};

		var _lazyTweens = [],
			_lazyLookup = {},
			_numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
			_relExp = /[\+-]=-?[\.\d]/,
			//_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
			_setRatio = function(v) {
				var pt = this._firstPT,
					min = 0.000001,
					val;
				while (pt) {
					val = !pt.blob ? pt.c * v + pt.s : (v === 1 && this.end != null) ? this.end : v ? this.join("") : this.start;
					if (pt.m) {
						val = pt.m(val, this._target || pt.t);
					} else if (val < min) if (val > -min && !pt.blob) { //prevents issues with converting very small numbers to strings in the browser
						val = 0;
					}
					if (!pt.f) {
						pt.t[pt.p] = val;
					} else if (pt.fp) {
						pt.t[pt.p](pt.fp, val);
					} else {
						pt.t[pt.p](val);
					}
					pt = pt._next;
				}
			},
			//compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
			_blobDif = function(start, end, filter, pt) {
				var a = [],
					charIndex = 0,
					s = "",
					color = 0,
					startNums, endNums, num, i, l, nonNumbers, currentNum;
				a.start = start;
				a.end = end;
				start = a[0] = start + ""; //ensure values are strings
				end = a[1] = end + "";
				if (filter) {
					filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
					start = a[0];
					end = a[1];
				}
				a.length = 0;
				startNums = start.match(_numbersExp) || [];
				endNums = end.match(_numbersExp) || [];
				if (pt) {
					pt._next = null;
					pt.blob = 1;
					a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
				}
				l = endNums.length;
				for (i = 0; i < l; i++) {
					currentNum = endNums[i];
					nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex)-charIndex);
					s += (nonNumbers || !i) ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
					charIndex += nonNumbers.length;
					if (color) { //sense rgba() values and round them.
						color = (color + 1) % 5;
					} else if (nonNumbers.substr(-5) === "rgba(") {
						color = 1;
					}
					if (currentNum === startNums[i] || startNums.length <= i) {
						s += currentNum;
					} else {
						if (s) {
							a.push(s);
							s = "";
						}
						num = parseFloat(startNums[i]);
						a.push(num);
						a._firstPT = {_next: a._firstPT, t:a, p: a.length-1, s:num, c:((currentNum.charAt(1) === "=") ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : (parseFloat(currentNum) - num)) || 0, f:0, m:(color && color < 4) ? Math.round : 0};
						//note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
					}
					charIndex += currentNum.length;
				}
				s += end.substr(charIndex);
				if (s) {
					a.push(s);
				}
				a.setRatio = _setRatio;
				if (_relExp.test(end)) { //if the end string contains relative values, delete it so that on the final render (in _setRatio()), we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
					a.end = null;
				}
				return a;
			},
			//note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
			_addPropTween = function(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
				if (typeof(end) === "function") {
					end = end(index || 0, target);
				}
				var type = typeof(target[prop]),
					getterName = (type !== "function") ? "" : ((prop.indexOf("set") || typeof(target["get" + prop.substr(3)]) !== "function") ? prop : "get" + prop.substr(3)),
					s = (start !== "get") ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](),
					isRelative = (typeof(end) === "string" && end.charAt(1) === "="),
					pt = {t:target, p:prop, s:s, f:(type === "function"), pg:0, n:overwriteProp || prop, m:(!mod ? 0 : (typeof(mod) === "function") ? mod : Math.round), pr:0, c:isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : (parseFloat(end) - s) || 0},
					blob;

				if (typeof(s) !== "number" || (typeof(end) !== "number" && !isRelative)) {
					if (funcParam || isNaN(s) || (!isRelative && isNaN(end)) || typeof(s) === "boolean" || typeof(end) === "boolean") {
						//a blob (string that has multiple numbers in it)
						pt.fp = funcParam;
						blob = _blobDif(s, (isRelative ? (parseFloat(pt.s) + pt.c) + (pt.s + "").replace(/[0-9\-\.]/g, "") : end), stringFilter || TweenLite.defaultStringFilter, pt);
						pt = {t: blob, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: overwriteProp || prop, pr: 0, m: 0}; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
					} else {
						pt.s = parseFloat(s);
						if (!isRelative) {
							pt.c = (parseFloat(end) - pt.s) || 0;
						}
					}
				}
				if (pt.c) { //only add it to the linked list if there's a change.
					if ((pt._next = this._firstPT)) {
						pt._next._prev = pt;
					}
					this._firstPT = pt;
					return pt;
				}
			},
			_internals = TweenLite._internals = {isArray:_isArray, isSelector:_isSelector, lazyTweens:_lazyTweens, blobDif:_blobDif}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
			_plugins = TweenLite._plugins = {},
			_tweenLookup = _internals.tweenLookup = {},
			_tweenLookupNum = 0,
			_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1, lazy:1, onOverwrite:1, callbackScope:1, stringFilter:1, id:1, yoyoEase:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
			_nextGCFrame = 30,
			_lazyRender = _internals.lazyRender = function() {
				var i = _lazyTweens.length,
					tween;
				_lazyLookup = {};
				while (--i > -1) {
					tween = _lazyTweens[i];
					if (tween && tween._lazy !== false) {
						tween.render(tween._lazy[0], tween._lazy[1], true);
						tween._lazy = false;
					}
				}
				_lazyTweens.length = 0;
			};

		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;
		setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

		Animation._updateRoot = TweenLite.render = function() {
				var i, a, p;
				if (_lazyTweens.length) { //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
					_lazyRender();
				}
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (_lazyTweens.length) {
					_lazyRender();
				}
				if (_ticker.frame >= _nextGCFrame) { //dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
					_nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
					//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
					p = _rootTimeline._first;
					if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
						while (p && p._paused) {
							p = p._next;
						}
						if (!p) {
							_ticker.sleep();
						}
					}
				}
			};

		_ticker.addEventListener("tick", Animation._updateRoot);

		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},
			_onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
				var func = overwrittenTween.vars.onOverwrite, r1, r2;
				if (func) {
					r1 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				func = TweenLite.onOverwrite;
				if (func) {
					r2 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				return (r1 !== false && r2 !== false);
			},
			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween, l;
				if (mode === 1 || mode >= 4) {
					l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) {
								if (curTween._kill(null, target, tween)) {
									changed = true;
								}
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + _tinyNum,
					overlaps = [],
					oCount = 0,
					zeroDur = (tween._duration === 0),
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
						//ignore
					} else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
						if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;
					}
				}

				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					if (mode === 2) if (curTween._kill(props, target, tween)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
						if (mode !== 2 && !_onOverwrite(curTween, tween)) {
							continue;
						}
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},
			_checkOverlap = function(tween, reference, zeroDur) {
				var tl = tween._timeline,
					ts = tl._timeScale,
					t = tween._startTime;
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * _tinyNum)) ? _tinyNum : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum) ? 0 : t - reference - _tinyNum;
			};


//---- TweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			var v = this.vars,
				op = this._overwrittenProps,
				dur = this._duration,
				immediate = !!v.immediateRender,
				ease = v.ease,
				i, initPlugins, pt, p, startVars, l;
			if (v.startAt) {
				if (this._startAt) {
					this._startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
					this._startAt.kill();
				}
				startVars = {};
				for (p in v.startAt) { //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
					startVars[p] = v.startAt[p];
				}
				startVars.data = "isStart";
				startVars.overwrite = false;
				startVars.immediateRender = true;
				startVars.lazy = (immediate && v.lazy !== false);
				startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).
				startVars.onUpdate = v.onUpdate;
				startVars.onUpdateParams = v.onUpdateParams;
				startVars.onUpdateScope = v.onUpdateScope || v.callbackScope || this;
				this._startAt = TweenLite.to(this.target, 0, startVars);
				if (immediate) {
					if (this._time > 0) {
						this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
					} else if (dur !== 0) {
						return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
					}
				}
			} else if (v.runBackwards && dur !== 0) {
				//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
				if (this._startAt) {
					this._startAt.render(-1, true);
					this._startAt.kill();
					this._startAt = null;
				} else {
					if (this._time !== 0) { //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
						immediate = false;
					}
					pt = {};
					for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
						if (!_reservedProps[p] || p === "autoCSS") {
							pt[p] = v[p];
						}
					}
					pt.overwrite = 0;
					pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
					pt.lazy = (immediate && v.lazy !== false);
					pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
					this._startAt = TweenLite.to(this.target, 0, pt);
					if (!immediate) {
						this._startAt._init(); //ensures that the initial values are recorded
						this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.
						if (this.vars.immediateRender) {
							this._startAt = null;
						}
					} else if (this._time === 0) {
						return;
					}
				}
			}
			this._ease = ease = (!ease) ? TweenLite.defaultEase : (ease instanceof Ease) ? ease : (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
			if (v.easeParams instanceof Array && ease.config) {
				this._ease = ease.config.apply(ease, v.easeParams);
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;

			if (this._targets) {
				l = this._targets.length;
				for (i = 0; i < l; i++) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null), i) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
			}

			if (initPlugins) {
				TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
			}
			if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (v.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = v.onUpdate;
			this._initted = true;
		};

		p._initProps = function(target, propLookup, siblings, overwrittenProps, index) {
			var p, i, initPlugins, plugin, pt, v;
			if (target == null) {
				return false;
			}

			if (_lazyLookup[target._gsTweenID]) {
				_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
			}

			if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
				_autoCSS(this.vars, target);
			}
			for (p in this.vars) {
				v = this.vars[p];
				if (_reservedProps[p]) {
					if (v) if ((v instanceof Array) || (v.push && _isArray(v))) if (v.join("").indexOf("{self}") !== -1) {
						this.vars[p] = v = this._swapSelfInParams(v, this);
					}

				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {

					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					//m - mod           [function | 0]
					this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:1, n:p, pg:1, pr:plugin._priority, m:0};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}
					if (pt._next) {
						pt._next._prev = pt;
					}

				} else {
					propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
				}
			}

			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._firstPT) if ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration)) { //zero duration tweens don't lazy render by default; everything else does.
				_lazyLookup[target._gsTweenID] = true;
			}
			return initPlugins;
		};

		p.render = function(time, suppressEvents, force) {
			var prevTime = this._time,
				duration = this._duration,
				prevRawPrevTime = this._rawPrevTime,
				isComplete, callback, pt, rawPrevTime;
			if (time >= duration - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = duration;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				if (!this._reversed ) {
					isComplete = true;
					callback = "onComplete";
					force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
				}
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && this.data === "isPause")) {
							force = true;
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!this._initted || (this._startAt && this._startAt.progress())) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately. Also, we check progress() because if startAt has already rendered at its end, we should force a render at its beginning. Otherwise, if you put the playhead directly on top of where a fromTo({immediateRender:false}) starts, and then move it backwards, the from() won't revert its values.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;

				if (this._easeType) {
					var r = time / duration, type = this._easeType, pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (time / duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else {
					this.ratio = this._ease.getRatio(time / duration);
				}
			}

			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) {
					this._time = this._totalTime = prevTime;
					this._rawPrevTime = prevRawPrevTime;
					_lazyTweens.push(this);
					this._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			if (this._lazy !== false) { //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
				this._lazy = false;
			}
			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
				this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, true, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._time !== 0 || duration === 0) if (!suppressEvents) {
					this._callback("onStart");
				}
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}

			if (this._onUpdate) {
				if (time < 0) if (this._startAt && time !== -0.0001) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (this._time !== prevTime || isComplete || force) {
					this._callback("onUpdate");
				}
			}
			if (callback) if (!this._gc || force) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && time !== -0.0001) { //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
					this._startAt.render(time, true, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
				if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;
				}
			}
		};

		p._kill = function(vars, target, overwritingTween) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target === this.target) {
				this._lazy = false;
				return this._enabled(false, false);
			}
			target = (typeof(target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
			var simultaneousOverwrite = (overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline),
				i, overwrittenProps, p, pt, propLookup, changed, killProps, record, killed;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i], overwritingTween)) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof(vars) !== "object" || !vars._tempKill)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
						for (p in killProps) {
							if (propLookup[p]) {
								if (!killed) {
									killed = [];
								}
								killed.push(p);
							}
						}
						if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) { //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
							return false;
						}
					}

					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (simultaneousOverwrite) { //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
								if (pt.f) {
									pt.t[pt.p](pt.s);
								} else {
									pt.t[pt.p] = pt.s;
								}
								changed = true;
							}
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) {
							overwrittenProps[p] = 1;
						}
					}
					if (!this._firstPT && this._initted) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
						this._enabled(false, false);
					}
				}
			}
			return changed;
		};

		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				TweenLite._onPluginEvent("_onDisable", this);
			}
			this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
			this._notifyPluginsOfEnabled = this._active = this._lazy = false;
			this._propLookup = (this._targets) ? {} : [];
			Animation.prototype.invalidate.call(this);
			if (this.vars.immediateRender) {
				this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
				this.render(Math.min(0, -this._delay)); //in case delay is negative.
			}
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (enabled && this._gc) {
				var targets = this._targets,
					i;
				if (targets) {
					i = targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};


//----TweenLite static methods -----------------------------------------------------

		TweenLite.to = function(target, duration, vars) {
			return new TweenLite(target, duration, vars);
		};

		TweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenLite(target, duration, vars);
		};

		TweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenLite(target, duration, toVars);
		};

		TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, lazy:false, useFrames:useFrames, overwrite:0});
		};

		TweenLite.set = function(target, vars) {
			return new TweenLite(target, 0, vars);
		};

		TweenLite.getTweensOf = function(target, onlyActive) {
			if (target == null) { return []; }
			target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;
			var i, a, j, t;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else if (target._gsTweenID) {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc || (onlyActive && !a[i].isActive())) {
						a.splice(i, 1);
					}
				}
			}
			return a || [];
		};

		TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {
			if (typeof(onlyActive) === "object") {
				vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)
				onlyActive = false;
			}
			var a = TweenLite.getTweensOf(target, onlyActive),
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};



/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
					this._super = TweenPlugin.prototype;
				}, true);

		p = TweenPlugin.prototype;
		TweenPlugin.version = "1.19.0";
		TweenPlugin.API = 2;
		p._firstPT = null;
		p._addTween = _addPropTween;
		p.setRatio = _setRatio;

		p._kill = function(lookup) {
			var a = this._overwriteProps,
				pt = this._firstPT,
				i;
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i]] != null) {
						a.splice(i, 1);
					}
				}
			}
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		};

		p._mod = p._roundProps = function(lookup) {
			var pt = this._firstPT,
				val;
			while (pt) {
				val = lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ]);
				if (val && typeof(val) === "function") { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					if (pt.f === 2) {
						pt.t._applyPT.m = val;
					} else {
						pt.m = val;
					}
				}
				pt = pt._next;
			}
		};

		TweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT,
				changed, pt2, first, last, next;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		};

		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					_plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		};

		//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
		_gsDefine.plugin = function(config) {
			if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
			var propName = config.propName,
				priority = config.priority || 0,
				overwriteProps = config.overwriteProps,
				map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_mod", mod:"_mod", initAll:"_onInitAllProps"},
				Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
					function() {
						TweenPlugin.call(this, propName, priority);
						this._overwriteProps = overwriteProps || [];
					}, (config.global === true)),
				p = Plugin.prototype = new TweenPlugin(propName),
				prop;
			p.constructor = Plugin;
			Plugin.API = config.API;
			for (prop in map) {
				if (typeof(config[prop]) === "function") {
					p[map[prop]] = config[prop];
				}
			}
			Plugin.version = config.version;
			TweenPlugin.activate([Plugin]);
			return Plugin;
		};


		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
		a = window._gsQueue;
		if (a) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _defLookup) {
				if (!_defLookup[p].func) {
					window.console.log("GSAP encountered missing dependency: " + p);
				}
			}
		}

		_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

})((typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window, "TweenMax");
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * VERSION: 1.20.4
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

	_gsScope._gsDefine("TimelineMax", ["TimelineLite","TweenLite","easing.Ease"], function(TimelineLite, TweenLite, Ease) {
		
		var TimelineMax = function(vars) {
				TimelineLite.call(this, vars);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._dirty = true;
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = TweenLite._internals,
			_lazyTweens = TweenLiteInternals.lazyTweens,
			_lazyRender = TweenLiteInternals.lazyRender,
			_globals = _gsScope._gsDefine.globals,
			_easeNone = new Ease(null, null, 1, 0),
			p = TimelineMax.prototype = new TimelineLite();
			
		p.constructor = TimelineMax;
		p.kill()._gc = false;
		TimelineMax.version = "1.20.4";
		
		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return TimelineLite.prototype.invalidate.call(this);
		};
		
		p.addCallback = function(callback, position, params, scope) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};
		
		p.removeCallback = function(callback, position) {
			if (callback) {
				if (position == null) {
					this._kill(null, callback);
				} else {
					var a = this.getTweensOf(callback, false),
						i = a.length,
						time = this._parseTimeOrLabel(position);
					while (--i > -1) {
						if (a[i]._startTime === time) {
							a[i]._enabled(false, false);
						}
					}
				}
			}
			return this;
		};

		p.removePause = function(position) {
			return this.removeCallback(TimelineLite._internals.pauseCallback, position);
		};

		p.tweenTo = function(position, vars) {
			vars = vars || {};
			var copy = {ease:_easeNone, useFrames:this.usesFrames(), immediateRender:false, lazy:false},
				Engine = (vars.repeat && _globals.TweenMax) || TweenLite,
				duration, p, t;
			for (p in vars) {
				copy[p] = vars[p];
			}
			copy.time = this._parseTimeOrLabel(position);
			duration = (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001;
			t = new Engine(this, duration, copy);
			copy.onStart = function() {
				t.target.paused(true);
				if (t.vars.time !== t.target.time() && duration === t.duration() && !t.isFromTo) { //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
					t.duration( Math.abs( t.vars.time - t.target.time()) / t.target._timeScale ).render(t.time(), true, true); //render() right away to ensure that things look right, especially in the case of .tweenTo(0).
				}
				if (vars.onStart) { //in case the user had an onStart in the vars - we don't want to overwrite it.
					vars.onStart.apply(vars.onStartScope || vars.callbackScope || t, vars.onStartParams || []); //don't use t._callback("onStart") or it'll point to the copy.onStart and we'll get a recursion error.
				}
			};
			return t;
		};

		p.tweenFromTo = function(fromPosition, toPosition, vars) {
			vars = vars || {};
			fromPosition = this._parseTimeOrLabel(fromPosition);
			vars.startAt = {onComplete:this.seek, onCompleteParams:[fromPosition], callbackScope:this};
			vars.immediateRender = (vars.immediateRender !== false);
			var t = this.tweenTo(toPosition, vars);
			t.isFromTo = 1; //to ensure we don't mess with the duration in the onStart (we've got the start and end values here, so lock it in)
			return t.duration((Math.abs( t.vars.time - fromPosition) / this._timeScale) || 0.001);
		};
		
		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var prevTime = this._time,
				totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				dur = this._duration,
				prevTotalTime = this._totalTime,
				prevStart = this._startTime, 
				prevTimeScale = this._timeScale, 
				prevRawPrevTime = this._rawPrevTime,
				prevPaused = this._paused, 
				prevCycle = this._cycle, 
				tween, isComplete, next, callback, internalForce, cycleDuration, pauseTween, curTime;
			if (prevTime !== this._time) { //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
				time += this._time - prevTime;
			}
			if (time >= totalDur - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				if (!this._locked) {
					this._totalTime = totalDur;
					this._cycle = this._repeat;
				}
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					if (this._duration === 0) if ((time <= 0 && time >= -0.0000001) || prevRawPrevTime < 0 || prevRawPrevTime === _tinyNum) if (prevRawPrevTime !== time && this._first) {
						internalForce = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = time = 0;
				} else {
					this._time = dur;
					time = dur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7. We cannot do less then 0.0001 because the same issue can occur when the duration is extremely large like 999999999999 in which case adding 0.00000001, for example, causes it to act like nothing was added.
				}
				
			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				if (!this._locked) {
					this._totalTime = this._cycle = 0;
				}
				this._time = 0;
				if (prevTime !== 0 || (dur === 0 && prevRawPrevTime !== _tinyNum && (prevRawPrevTime > 0 || (time < 0 && prevRawPrevTime >= 0)) && !this._locked)) { //edge case for checking time < 0 && prevRawPrevTime >= 0: a zero-duration fromTo() tween inside a zero-duration timeline (yeah, very rare)
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) {
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (prevRawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = (dur || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {
						internalForce = true;
					}
				}
				
			} else {
				if (dur === 0 && prevRawPrevTime < 0) { //without this, zero-duration repeating timelines (like with a simple callback nested at the very beginning and a repeatDelay) wouldn't render the first time through.
					internalForce = true;
				}
				this._time = this._rawPrevTime = time;
				if (!this._locked) {
					this._totalTime = time;
					if (this._repeat !== 0) {
						cycleDuration = dur + this._repeatDelay;
						this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but it gets reported as 0.79999999!)
						if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
							this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
						}
						this._time = this._totalTime - (this._cycle * cycleDuration);
						if (this._yoyo) if ((this._cycle & 1) !== 0) {
							this._time = dur - this._time;
						}
						if (this._time > dur) {
							this._time = dur;
							time = dur + 0.0001; //to avoid occasional floating point rounding error
						} else if (this._time < 0) {
							this._time = time = 0;
						} else {
							time = this._time;
						}
					}
				}

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					time = this._time;
					if (time >= prevTime || (this._repeat && prevCycle !== this._cycle)) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween && pauseTween._startTime < dur) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay));
					}
				}

			}
			
			if (this._cycle !== prevCycle) if (!this._locked) {
				/*
				make sure children at the end/beginning of the timeline are rendered properly. If, for example, 
				a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
				would get transated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
				could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So 
				we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
				ensure that zero-duration tweens at the very beginning or end of the TimelineMax work. 
				*/
				var backwards = (this._yoyo && (prevCycle & 1) !== 0),
					wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),
					recTotalTime = this._totalTime,
					recCycle = this._cycle,
					recRawPrevTime = this._rawPrevTime,
					recTime = this._time;
				
				this._totalTime = prevCycle * dur;
				if (this._cycle < prevCycle) {
					backwards = !backwards;
				} else {
					this._totalTime += dur;
				}
				this._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.
				
				this._rawPrevTime = (dur === 0) ? prevRawPrevTime - 0.0001 : prevRawPrevTime;
				this._cycle = prevCycle;
				this._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()
				prevTime = (backwards) ? 0 : dur;
				this.render(prevTime, suppressEvents, (dur === 0));
				if (!suppressEvents) if (!this._gc) {
					if (this.vars.onRepeat) {
						this._cycle = recCycle; //in case the onRepeat alters the playhead or invalidates(), we shouldn't stay locked or use the previous cycle.
						this._locked = false;
						this._callback("onRepeat");
					}
				}
				if (prevTime !== this._time) { //in case there's a callback like onComplete in a nested tween/timeline that changes the playhead position, like via seek(), we should just abort.
					return;
				}
				if (wrap) {
					this._cycle = prevCycle; //if there's an onRepeat, we reverted this above, so make sure it's set properly again. We also unlocked in that scenario, so reset that too.
					this._locked = true;
					prevTime = (backwards) ? dur + 0.0001 : -0.0001;
					this.render(prevTime, true, false);
				}
				this._locked = false;
				if (this._paused && !prevPaused) { //if the render() triggered callback that paused this timeline, we should abort (very rare, but possible)
					return;
				}
				this._time = recTime;
				this._totalTime = recTotalTime;
				this._cycle = recCycle;
				this._rawPrevTime = recRawPrevTime;
			}

			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._callback("onUpdate");
				}
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (!this._active) if (!this._paused && this._totalTime !== prevTotalTime && time > 0) {
				this._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}
			
			if (prevTotalTime === 0) if (this.vars.onStart) if (this._totalTime !== 0 || !this._totalDuration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}
			
			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}
			if (callback) if (!this._locked) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};
		
		p.getActive = function(nested, tweens, timelines) {
			if (nested == null) {
				nested = true;
			}
			if (tweens == null) {
				tweens = true;
			}
			if (timelines == null) {
				timelines = false;
			}
			var a = [], 
				all = this.getChildren(nested, tweens, timelines), 
				cnt = 0, 
				l = all.length,
				i, tween;
			for (i = 0; i < l; i++) {
				tween = all[i];
				if (tween.isActive()) {
					a[cnt++] = tween;
				}
			}
			return a;
		};
		
		
		p.getLabelAfter = function(time) {
			if (!time) if (time !== 0) { //faster than isNan()
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				l = labels.length,
				i;
			for (i = 0; i < l; i++) {
				if (labels[i].time > time) {
					return labels[i].name;
				}
			}
			return null;
		};
		
		p.getLabelBefore = function(time) {
			if (time == null) {
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				i = labels.length;
			while (--i > -1) {
				if (labels[i].time < time) {
					return labels[i].name;
				}
			}
			return null;
		};
		
		p.getLabelsArray = function() {
			var a = [],
				cnt = 0,
				p;
			for (p in this._labels) {
				a[cnt++] = {time:this._labels[p], name:p};
			}
			a.sort(function(a,b) {
				return a.time - b.time;
			});
			return a;
		};

		p.invalidate = function() {
			this._locked = false; //unlock and set cycle in case invalidate() is called from inside an onRepeat
			return TimelineLite.prototype.invalidate.call(this);
		};

		
//---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------
		
		p.progress = function(value, suppressEvents) {
			return (!arguments.length) ? (this._time / this.duration()) || 0 : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents);
		};
		
		p.totalProgress = function(value, suppressEvents) {
			return (!arguments.length) ? (this._totalTime / this.totalDuration()) || 0 : this.totalTime( this.totalDuration() * value, suppressEvents);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					TimelineLite.prototype.totalDuration.call(this); //just forces refresh
					//Instead of Infinity, we use 999999999999 so that we can accommodate reverses.
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
				}
				return this._totalDuration;
			}
			return (this._repeat === -1 || !value) ? this : this.timeScale( this.totalDuration() / value );
		};
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};
		
		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};
		
		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};
		
		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};
		
		p.currentLabel = function(value) {
			if (!arguments.length) {
				return this.getLabelBefore(this._time + 0.00000001);
			}
			return this.seek(value, true);
		};
		
		return TimelineMax;
		
	}, true);







/*
 * ----------------------------------------------------------------
 * TimelineLite
 * ----------------------------------------------------------------
 */

	_gsScope._gsDefine("TimelineLite", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {

		var TimelineLite = function(vars) {
				SimpleTimeline.call(this, vars);
				this._labels = {};
				this.autoRemoveChildren = (this.vars.autoRemoveChildren === true);
				this.smoothChildTiming = (this.vars.smoothChildTiming === true);
				this._sortChildren = true;
				this._onUpdate = this.vars.onUpdate;
				var v = this.vars,
					val, p;
				for (p in v) {
					val = v[p];
					if (_isArray(val)) if (val.join("").indexOf("{self}") !== -1) {
						v[p] = this._swapSelfInParams(val);
					}
				}
				if (_isArray(v.tweens)) {
					this.add(v.tweens, 0, v.align, v.stagger);
				}
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = TweenLite._internals,
			_internals = TimelineLite._internals = {},
			_isSelector = TweenLiteInternals.isSelector,
			_isArray = TweenLiteInternals.isArray,
			_lazyTweens = TweenLiteInternals.lazyTweens,
			_lazyRender = TweenLiteInternals.lazyRender,
			_globals = _gsScope._gsDefine.globals,
			_copy = function(vars) {
				var copy = {}, p;
				for (p in vars) {
					copy[p] = vars[p];
				}
				return copy;
			},
			_applyCycle = function(vars, targets, i) {
				var alt = vars.cycle,
					p, val;
				for (p in alt) {
					val = alt[p];
					vars[p] = (typeof(val) === "function") ? val(i, targets[i]) : val[i % val.length];
				}
				delete vars.cycle;
			},
			_pauseCallback = _internals.pauseCallback = function() {},
			_slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++]));
				return b;
			},
			p = TimelineLite.prototype = new SimpleTimeline();

		TimelineLite.version = "1.20.4";
		p.constructor = TimelineLite;
		p.kill()._gc = p._forcingPlayhead = p._hasPause = false;

		/* might use later...
		//translates a local time inside an animation to the corresponding time on the root/global timeline, factoring in all nesting and timeScales.
		function localToGlobal(time, animation) {
			while (animation) {
				time = (time / animation._timeScale) + animation._startTime;
				animation = animation.timeline;
			}
			return time;
		}

		//translates the supplied time on the root/global timeline into the corresponding local time inside a particular animation, factoring in all nesting and timeScales
		function globalToLocal(time, animation) {
			var scale = 1;
			time -= localToGlobal(0, animation);
			while (animation) {
				scale *= animation._timeScale;
				animation = animation.timeline;
			}
			return time * scale;
		}
		*/

		p.to = function(target, duration, vars, position) {
			var Engine = (vars.repeat && _globals.TweenMax) || TweenLite;
			return duration ? this.add( new Engine(target, duration, vars), position) : this.set(target, vars, position);
		};

		p.from = function(target, duration, vars, position) {
			return this.add( ((vars.repeat && _globals.TweenMax) || TweenLite).from(target, duration, vars), position);
		};

		p.fromTo = function(target, duration, fromVars, toVars, position) {
			var Engine = (toVars.repeat && _globals.TweenMax) || TweenLite;
			return duration ? this.add( Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
		};

		p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, callbackScope:onCompleteAllScope, smoothChildTiming:this.smoothChildTiming}),
				cycle = vars.cycle,
				copy, i;
			if (typeof(targets) === "string") {
				targets = TweenLite.selector(targets) || targets;
			}
			targets = targets || [];
			if (_isSelector(targets)) { //senses if the targets object is a selector. If it is, we should translate it into an array.
				targets = _slice(targets);
			}
			stagger = stagger || 0;
			if (stagger < 0) {
				targets = _slice(targets);
				targets.reverse();
				stagger *= -1;
			}
			for (i = 0; i < targets.length; i++) {
				copy = _copy(vars);
				if (copy.startAt) {
					copy.startAt = _copy(copy.startAt);
					if (copy.startAt.cycle) {
						_applyCycle(copy.startAt, targets, i);
					}
				}
				if (cycle) {
					_applyCycle(copy, targets, i);
					if (copy.duration != null) {
						duration = copy.duration;
						delete copy.duration;
					}
				}
				tl.to(targets[i], duration, copy, i * stagger);
			}
			return this.add(tl, position);
		};

		p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.immediateRender = (vars.immediateRender != false);
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.call = function(callback, params, scope, position) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.set = function(target, vars, position) {
			position = this._parseTimeOrLabel(position, 0, true);
			if (vars.immediateRender == null) {
				vars.immediateRender = (position === this._time && !this._paused);
			}
			return this.add( new TweenLite(target, 0, vars), position);
		};

		TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new TimelineLite(vars),
				root = tl._timeline,
				hasNegativeStart, time,	tween, next;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			tween = root._first;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target === tween.vars.onComplete)) {
					time = tween._startTime - tween._delay;
					if (time < 0) {
						hasNegativeStart = 1;
					}
					tl.add(tween, time);
				}
				tween = next;
			}
			root.add(tl, 0);
			if (hasNegativeStart) { //calling totalDuration() will force the adjustment necessary to shift the children forward so none of them start before zero, and moves the timeline backwards the same amount, so the playhead is still aligned where it should be globally, but the timeline doesn't have illegal children that start before zero.
				tl.totalDuration();
			}
			return tl;
		};

		p.add = function(value, position, align, stagger) {
			var curTime, l, i, child, tl, beforeRawTime;
			if (typeof(position) !== "number") {
				position = this._parseTimeOrLabel(position, 0, true, value);
			}
			if (!(value instanceof Animation)) {
				if ((value instanceof Array) || (value && value.push && _isArray(value))) {
					align = align || "normal";
					stagger = stagger || 0;
					curTime = position;
					l = value.length;
					for (i = 0; i < l; i++) {
						if (_isArray(child = value[i])) {
							child = new TimelineLite({tweens:child});
						}
						this.add(child, curTime);
						if (typeof(child) !== "string" && typeof(child) !== "function") {
							if (align === "sequence") {
								curTime = child._startTime + (child.totalDuration() / child._timeScale);
							} else if (align === "start") {
								child._startTime -= child.delay();
							}
						}
						curTime += stagger;
					}
					return this._uncache(true);
				} else if (typeof(value) === "string") {
					return this.addLabel(value, position);
				} else if (typeof(value) === "function") {
					value = TweenLite.delayedCall(0, value);
				} else {
					throw("Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.");
				}
			}

			SimpleTimeline.prototype.add.call(this, value, position);

			if (value._time) { //in case, for example, the _startTime is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
				value.render((this.rawTime() - value._startTime) * value._timeScale, false, false);
			}

			//if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.
			if (this._gc || this._time === this._duration) if (!this._paused) if (this._duration < this.duration()) {
				//in case any of the ancestors had completed but should now be enabled...
				tl = this;
				beforeRawTime = (tl.rawTime() > value._startTime); //if the tween is placed on the timeline so that it starts BEFORE the current rawTime, we should align the playhead (move the timeline). This is because sometimes users will create a timeline, let it finish, and much later append a tween and expect it to run instead of jumping to its end state. While technically one could argue that it should jump to its end state, that's not what users intuitively expect.
				while (tl._timeline) {
					if (beforeRawTime && tl._timeline.smoothChildTiming) {
						tl.totalTime(tl._totalTime, true); //moves the timeline (shifts its startTime) if necessary, and also enables it.
					} else if (tl._gc) {
						tl._enabled(true, false);
					}
					tl = tl._timeline;
				}
			}

			return this;
		};

		p.remove = function(value) {
			if (value instanceof Animation) {
				this._remove(value, false);
				var tl = value._timeline = value.vars.useFrames ? Animation._rootFramesTimeline : Animation._rootTimeline; //now that it's removed, default it to the root timeline so that if it gets played again, it doesn't jump back into this timeline.
				value._startTime = (value._paused ? value._pauseTime : tl._time) - ((!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale); //ensure that if it gets played again, the timing is correct.
				return this;
			} else if (value instanceof Array || (value && value.push && _isArray(value))) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof(value) === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		};

		p._remove = function(tween, skipDisable) {
			SimpleTimeline.prototype._remove.call(this, tween, skipDisable);
			var last = this._last;
			if (!last) {
				this._time = this._totalTime = this._duration = this._totalDuration = 0;
			} else if (this._time > this.duration()) {
				this._time = this._duration;
				this._totalTime = this._totalDuration;
			}
			return this;
		};

		p.append = function(value, offsetOrLabel) {
			return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
		};

		p.insert = p.insertMultiple = function(value, position, align, stagger) {
			return this.add(value, position || 0, align, stagger);
		};

		p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
			return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
		};

		p.addLabel = function(label, position) {
			this._labels[label] = this._parseTimeOrLabel(position);
			return this;
		};

		p.addPause = function(position, callback, params, scope) {
			var t = TweenLite.delayedCall(0, _pauseCallback, params, scope || this);
			t.vars.onComplete = t.vars.onReverseComplete = callback;
			t.data = "isPause";
			this._hasPause = true;
			return this.add(t, position);
		};

		p.removeLabel = function(label) {
			delete this._labels[label];
			return this;
		};

		p.getLabelTime = function(label) {
			return (this._labels[label] != null) ? this._labels[label] : -1;
		};

		p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
			var clippedDuration, i;
			//if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().
			if (ignore instanceof Animation && ignore.timeline === this) {
				this.remove(ignore);
			} else if (ignore && ((ignore instanceof Array) || (ignore.push && _isArray(ignore)))) {
				i = ignore.length;
				while (--i > -1) {
					if (ignore[i] instanceof Animation && ignore[i].timeline === this) {
						this.remove(ignore[i]);
					}
				}
			}
			clippedDuration = (typeof(timeOrLabel) === "number" && !offsetOrLabel) ? 0 : (this.duration() > 99999999999) ? this.recent().endTime(false) : this._duration; //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
			if (typeof(offsetOrLabel) === "string") {
				return this._parseTimeOrLabel(offsetOrLabel, (appendIfAbsent && typeof(timeOrLabel) === "number" && this._labels[offsetOrLabel] == null) ? timeOrLabel - clippedDuration : 0, appendIfAbsent);
			}
			offsetOrLabel = offsetOrLabel || 0;
			if (typeof(timeOrLabel) === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) { //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
				i = timeOrLabel.indexOf("=");
				if (i === -1) {
					if (this._labels[timeOrLabel] == null) {
						return appendIfAbsent ? (this._labels[timeOrLabel] = clippedDuration + offsetOrLabel) : offsetOrLabel;
					}
					return this._labels[timeOrLabel] + offsetOrLabel;
				}
				offsetOrLabel = parseInt(timeOrLabel.charAt(i-1) + "1", 10) * Number(timeOrLabel.substr(i+1));
				timeOrLabel = (i > 1) ? this._parseTimeOrLabel(timeOrLabel.substr(0, i-1), 0, appendIfAbsent) : clippedDuration;
			} else if (timeOrLabel == null) {
				timeOrLabel = clippedDuration;
			}
			return Number(timeOrLabel) + offsetOrLabel;
		};

		p.seek = function(position, suppressEvents) {
			return this.totalTime((typeof(position) === "number") ? position : this._parseTimeOrLabel(position), (suppressEvents !== false));
		};

		p.stop = function() {
			return this.paused(true);
		};

		p.gotoAndPlay = function(position, suppressEvents) {
			return this.play(position, suppressEvents);
		};

		p.gotoAndStop = function(position, suppressEvents) {
			return this.pause(position, suppressEvents);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevTime = this._time,
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevPaused = this._paused,
				tween, isComplete, next, callback, internalForce, pauseTween, curTime;
			if (time >= totalDur - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = totalDur;
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					if (this._duration === 0) if ((time <= 0 && time >= -0.0000001) || this._rawPrevTime < 0 || this._rawPrevTime === _tinyNum) if (this._rawPrevTime !== time && this._first) {
						internalForce = true;
						if (this._rawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				time = totalDur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7.

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime !== _tinyNum && (this._rawPrevTime > 0 || (time < 0 && this._rawPrevTime >= 0)))) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) { //ensures proper GC if a timeline is resumed after it's finished reversing.
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (this._rawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {
						internalForce = true;
					}
				}

			} else {

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					if (time >= prevTime) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay));
					}
				}

				this._totalTime = this._time = this._rawPrevTime = time;
			}
			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (!this._active) if (!this._paused && this._time !== prevTime && time > 0) {
				this._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}

			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0 || !this._duration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= curTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}

			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};

		p._hasPausedChild = function() {
			var tween = this._first;
			while (tween) {
				if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		};

		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [],
				tween = this._first,
				cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) {
					//do nothing
				} else if (tween instanceof TweenLite) {
					if (tweens !== false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines !== false) {
						a[cnt++] = tween;
					}
					if (nested !== false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		};

		p.getTweensOf = function(target, nested) {
			var disabled = this._gc,
				a = [],
				cnt = 0,
				tweens, i;
			if (disabled) {
				this._enabled(true, true); //getTweensOf() filters out disabled tweens, and we have to mark them as _gc = true when the timeline completes in order to allow clean garbage collection, so temporarily re-enable the timeline here.
			}
			tweens = TweenLite.getTweensOf(target);
			i = tweens.length;
			while (--i > -1) {
				if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
					a[cnt++] = tweens[i];
				}
			}
			if (disabled) {
				this._enabled(false, true);
			}
			return a;
		};

		p.recent = function() {
			return this._recent;
		};

		p._contains = function(tween) {
			var tl = tween.timeline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.timeline;
			}
			return false;
		};

		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first,
				labels = this._labels,
				p;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (p in labels) {
					if (labels[p] >= ignoreBeforeTime) {
						labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		};

		p._kill = function(vars, target) {
			if (!vars && !target) {
				return this._enabled(false, false);
			}
			var tweens = (!target) ? this.getChildren(true, true, false) : this.getTweensOf(target),
				i = tweens.length,
				changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		};

		p.clear = function(labels) {
			var tweens = this.getChildren(false, true, true),
				i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels !== false) {
				this._labels = {};
			}
			return this._uncache(true);
		};

		p.invalidate = function() {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return Animation.prototype.invalidate.call(this);;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled === this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			this._forcingPlayhead = true;
			var val = Animation.prototype.totalTime.apply(this, arguments);
			this._forcingPlayhead = false;
			return val;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0 && value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0,
						tween = this._last,
						prevStart = 999999999999,
						prev, end;
					while (tween) {
						prev = tween._prev; //record it here in case the tween changes position in the sequence...
						if (tween._dirty) {
							tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
						}
						if (tween._startTime > prevStart && this._sortChildren && !tween._paused && !this._calculatingDuration) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this._calculatingDuration = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add(), like _parseTimeOrLabel().
							this.add(tween, tween._startTime - tween._delay);
							this._calculatingDuration = 0;
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0 && !tween._paused) { //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
							max -= tween._startTime;
							if (this._timeline.smoothChildTiming) {
								this._startTime += tween._startTime / this._timeScale;
								this._time -= tween._startTime;
								this._totalTime -= tween._startTime;
								this._rawPrevTime -= tween._startTime;
							}
							this.shiftChildren(-tween._startTime, false, -9999999999);
							prevStart = 0;
						}
						end = tween._startTime + (tween._totalDuration / tween._timeScale);
						if (end > max) {
							max = end;
						}
						tween = prev;
					}
					this._duration = this._totalDuration = max;
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (value && this.totalDuration()) ? this.timeScale(this._totalDuration / value) : this;
		};

		p.paused = function(value) {
			if (!value) { //if there's a pause directly at the spot from where we're unpausing, skip it.
				var tween = this._first,
					time = this._time;
				while (tween) {
					if (tween._startTime === time && tween.data === "isPause") {
						tween._rawPrevTime = 0; //remember, _rawPrevTime is how zero-duration tweens/callbacks sense directionality and determine whether or not to fire. If _rawPrevTime is the same as _startTime on the next render, it won't fire.
					}
					tween = tween._next;
				}
			}
			return Animation.prototype.paused.apply(this, arguments);
		};

		p.usesFrames = function() {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return (tl === Animation._rootFramesTimeline);
		};

		p.rawTime = function(wrapRepeats) {
			return (wrapRepeats && (this._paused || (this._repeat && this.time() > 0 && this.totalProgress() < 1))) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(wrapRepeats) - this._startTime) * this._timeScale;
		};

		return TimelineLite;

	}, true);

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
	"use strict";
	var getGlobal = function() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof(module) !== "undefined" && module.exports) { //node
		__webpack_require__(1); //dependency
		module.exports = getGlobal();
	} else if (true) { //AMD
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (getGlobal),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
}("TimelineMax"));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = [{"CIT_ID":"","STA_ID":"","CIT_NAME":"","CIT_CODE":0},{"CIT_ID":"0099fbe1-07c1-47ce-9b5c-b3a5c740eff4","STA_ID":"25","CIT_NAME":"HACARI","CIT_CODE":43},{"CIT_ID":"00ebbd61-9917-4251-95d5-720654cc5a99","STA_ID":"11","CIT_NAME":"CAJIBIO","CIT_CODE":13},{"CIT_ID":"00fc7121-e219-4b54-994c-1fd6a6192307","STA_ID":"1","CIT_NAME":"CHIGORODO","CIT_CODE":106},{"CIT_ID":"019c45af-460e-4a3c-82e3-96d6935712ca","STA_ID":"27","CIT_NAME":"SANTA HELENA DEL OPON","CIT_CODE":194},{"CIT_ID":"01caec53-4eef-4503-a110-f545e35cc374","STA_ID":"88","CIT_NAME":"EL SALVADOR","CIT_CODE":340},{"CIT_ID":"01dad2b7-fb5a-4f54-8f65-d545a868894c","STA_ID":"12","CIT_NAME":"EL PASO","CIT_CODE":415},{"CIT_ID":"01f5e283-3871-4f24-8d44-ca1de5e8bf67","STA_ID":"11","CIT_NAME":"ROSAS","CIT_CODE":70},{"CIT_ID":"0248b9d0-d443-498b-b073-9a08b8f85c83","STA_ID":"24","CIT_NAME":"MISTRATO","CIT_CODE":62},{"CIT_ID":"02cb20b3-09c0-4ee1-bdcd-7bfbf0a73fda","STA_ID":"31","CIT_NAME":"CAICEDONIA","CIT_CODE":28},{"CIT_ID":"033dbf6b-3cea-4d1c-9476-12edb62a0896","STA_ID":"23","CIT_NAME":"PROVIDENCIA","CIT_CODE":101},{"CIT_ID":"037463ae-d92d-431a-80c9-af40c0e9f53e","STA_ID":"12","CIT_NAME":"BOSCONIA","CIT_CODE":200},{"CIT_ID":"03fc9961-aec7-4d79-9d29-ab4c720fc3a2","STA_ID":"23","CIT_NAME":"MALLAMA (PIEDRANCHA)","CIT_CODE":91},{"CIT_ID":"045cb2a3-adf1-41f9-83fd-0855731febad","STA_ID":"15","CIT_NAME":"GUATAQUI","CIT_CODE":121},{"CIT_ID":"04da77a7-e0ba-473c-af49-c5b9efbff8a6","STA_ID":"7","CIT_NAME":"PAYA","CIT_CODE":193},{"CIT_ID":"04f8130c-2d3c-4d80-a360-aa7085d9b1bc","STA_ID":"1","CIT_NAME":"GUATAPE","CIT_CODE":145},{"CIT_ID":"0504864a-8393-46b2-afc7-daa0a9c22726","STA_ID":"29","CIT_NAME":"COELLO","CIT_CODE":31},{"CIT_ID":"0639e4e3-89f0-4448-85ed-0b555d196a45","STA_ID":"31","CIT_NAME":"PALMIRA","CIT_CODE":79},{"CIT_ID":"067cb567-7a3f-47c1-bd5c-04a9872e732c","STA_ID":"1","CIT_NAME":"BOLIVAR","CIT_CODE":58},{"CIT_ID":"072d1763-9144-44cd-bdb2-7db321278e7f","STA_ID":"50","CIT_NAME":"CACAHUAL","CIT_CODE":73},{"CIT_ID":"0789981d-f803-4370-9e25-d240ddec2565","STA_ID":"1","CIT_NAME":"YARUMAL","CIT_CODE":295},{"CIT_ID":"07db34af-2dd6-42d8-8c0d-c515e5fc7afb","STA_ID":"31","CIT_NAME":"LA UNION","CIT_CODE":70},{"CIT_ID":"085207d7-0627-4eff-a524-68cb2d5e1d40","STA_ID":"1","CIT_NAME":"CAREPA","CIT_CODE":80},{"CIT_ID":"0870efca-5e29-4255-bab8-33103204a6cc","STA_ID":"7","CIT_NAME":"CHIVATA","CIT_CODE":77},{"CIT_ID":"08b1393b-61fe-4fff-9c9c-e33c807a259e","STA_ID":"7","CIT_NAME":"EL ESPINO","CIT_CODE":85},{"CIT_ID":"08b9c93f-15e9-4a1e-9fb9-042b9a4650c7","STA_ID":"7","CIT_NAME":"LA CAPILLA","CIT_CODE":130},{"CIT_ID":"091b9531-a4bd-4fce-9ace-82e85495efa6","STA_ID":"29","CIT_NAME":"DOLORES","CIT_CODE":43},{"CIT_ID":"0922aee9-484f-4efc-9af6-cfed02e3194b","STA_ID":"15","CIT_NAME":"SESQUILE","CIT_CODE":238},{"CIT_ID":"0929c0b2-a2cb-48cb-ab49-2fae726decb3","STA_ID":"7","CIT_NAME":"OICATA","CIT_CODE":173},{"CIT_ID":"095e1f7a-ddda-4246-8322-a362f5945650","STA_ID":"13","CIT_NAME":"CIENAGA DE ORO","CIT_CODE":13},{"CIT_ID":"09864dc2-0102-41f9-ac5b-09def4be9e16","STA_ID":"27","CIT_NAME":"SAN VICENTE DE CHUCURI","CIT_CODE":193},{"CIT_ID":"09d85ab3-4dbc-47eb-80d5-0506616d0ee2","STA_ID":"1","CIT_NAME":"APARTADO","CIT_CODE":35},{"CIT_ID":"09f8f7c3-900e-4b0a-a6af-13e5ba0b1dae","STA_ID":"25","CIT_NAME":"DURANIA","CIT_CODE":34},{"CIT_ID":"0a059b02-5fd3-42b0-b7e2-d79c9d404876","STA_ID":"44","CIT_NAME":"BELEN DE LOS ANDAQUIES","CIT_CODE":4},{"CIT_ID":"0a95487b-44bf-4ba9-bc2b-48708b5989ba","STA_ID":"31","CIT_NAME":"EL CERRITO","CIT_CODE":49},{"CIT_ID":"0ad40487-2eb9-4e89-92dd-694cb337b2b6","STA_ID":"15","CIT_NAME":"PACHO","CIT_CODE":190},{"CIT_ID":"0aea69c1-40da-420f-84a1-7476a6b31494","STA_ID":"17","CIT_NAME":"MEDIO BAUDO (PUERTO MELUK)","CIT_CODE":26},{"CIT_ID":"0b014811-17e6-456f-83f4-914ce3301083","STA_ID":"60","CIT_NAME":"LA CHORRERA","CIT_CODE":13},{"CIT_ID":"0b050950-1db7-4495-b46f-796d62e3e8fb","STA_ID":"7","CIT_NAME":"COVARACHIA","CIT_CODE":58},{"CIT_ID":"0b35fdb0-8e50-4aa0-b0a8-7224d74e6fe1","STA_ID":"21","CIT_NAME":"EL BANCO","CIT_CODE":25},{"CIT_ID":"0b40a317-c62a-4380-bc92-3f012c91920a","STA_ID":"88","CIT_NAME":"HOLANDA","CIT_CODE":435},{"CIT_ID":"0b4585eb-8eac-4c63-82f3-ecd8cf44cb26","STA_ID":"1","CIT_NAME":"GUADALUPE","CIT_CODE":140},{"CIT_ID":"0b679a7d-d0c0-4b39-943b-a7e166ca87e8","STA_ID":"1","CIT_NAME":"LA UNION","CIT_CODE":169},{"CIT_ID":"0b6f0894-0ab8-4d9b-bea9-ebeb654dfbd6","STA_ID":"52","CIT_NAME":"CUBARRAL","CIT_CODE":15},{"CIT_ID":"0b9c41ef-0570-4b5a-80b5-9f3a9ccbb980","STA_ID":"52","CIT_NAME":"RESTREPO","CIT_CODE":50},{"CIT_ID":"0bb6d270-82a0-4abc-b243-bd6a70bbcbc4","STA_ID":"13","CIT_NAME":"VALENCIA","CIT_CODE":61},{"CIT_ID":"0bcaaf9e-2b22-4cdb-8f46-4e69903ea229","STA_ID":"1","CIT_NAME":"YOLOMBO","CIT_CODE":298},{"CIT_ID":"0c227a70-ff51-4274-9c46-5f81f9d90ede","STA_ID":"15","CIT_NAME":"CHIA","CIT_CODE":55},{"CIT_ID":"0c416e0b-10e6-4007-970b-fd3ff73b06c3","STA_ID":"27","CIT_NAME":"GUACA","CIT_CODE":94},{"CIT_ID":"0c49532c-daf8-435d-bb03-5490e41d32a0","STA_ID":"15","CIT_NAME":"TAUSA","CIT_CODE":274},{"CIT_ID":"0ca412d4-85cd-45e9-8f0e-51026f136089","STA_ID":"25","CIT_NAME":"PAMPLONITA","CIT_CODE":67},{"CIT_ID":"0ce1c8cc-2ca9-46e3-8e8d-5fc430e3a22f","STA_ID":"88","CIT_NAME":"CHINA REPUBLICA POPULAR","CIT_CODE":315},{"CIT_ID":"0cf9cfe5-d31b-4dec-8c1c-b1ad6fc04d10","STA_ID":"27","CIT_NAME":"SOCORRO","CIT_CODE":199},{"CIT_ID":"0d6df63b-e9d2-4f53-ae01-0c005438c1c5","STA_ID":"23","CIT_NAME":"OSPINA","CIT_CODE":97},{"CIT_ID":"0d9eeeff-f56f-4375-9235-4c23a394494b","STA_ID":"31","CIT_NAME":"BOLIVAR","CIT_CODE":16},{"CIT_ID":"0dce2dd4-7e7c-4914-b3bb-e8f28afe197c","STA_ID":"23","CIT_NAME":"SANTA BARBARA (ISCUANDE)","CIT_CODE":125},{"CIT_ID":"0dd09e47-2a0f-4c06-816d-4dba860771d4","STA_ID":"15","CIT_NAME":"CARMEN DE CARUPA","CIT_CODE":40},{"CIT_ID":"0e18e815-069a-4345-a50c-d16408b300d0","STA_ID":"15","CIT_NAME":"EL COLEGIO","CIT_CODE":67},{"CIT_ID":"0e623bf7-410a-4fe2-92b9-604d15d0ae5f","STA_ID":"15","CIT_NAME":"CHOACHI","CIT_CODE":61},{"CIT_ID":"0e92b330-009d-4bcf-b665-2a330a669b94","STA_ID":"27","CIT_NAME":"CERRITO","CIT_CODE":43},{"CIT_ID":"0ebade96-1403-43a5-a985-ed4bf7a5b40f","STA_ID":"1","CIT_NAME":"ITAGUI","CIT_CODE":151},{"CIT_ID":"0ef4f952-bdfc-4808-ade1-3cedf398b97d","STA_ID":"27","CIT_NAME":"PINCHOTE","CIT_CODE":163},{"CIT_ID":"0f176e70-263e-4a09-a951-ea9a06d155f9","STA_ID":"27","CIT_NAME":"GAMBITA","CIT_CODE":88},{"CIT_ID":"0f176ffb-d783-4733-a28b-46b7e0dc07c3","STA_ID":"27","CIT_NAME":"VETAS","CIT_CODE":219},{"CIT_ID":"0f93e7a5-f0a5-4b7a-9a72-effb779e3ddc","STA_ID":"5","CIT_NAME":"TURBACO","CIT_CODE":118},{"CIT_ID":"0fe8d58d-569d-492e-9398-863b7b3bfa4e","STA_ID":"5","CIT_NAME":"NOROSI","CIT_CODE":50},{"CIT_ID":"0ff31cb2-da02-4ceb-8fd1-2cafec3273b0","STA_ID":"27","CIT_NAME":"BARICHARA","CIT_CODE":16},{"CIT_ID":"1048281c-00c9-4667-8cfa-42ba7f4474b9","STA_ID":"29","CIT_NAME":"FALAN","CIT_CODE":49},{"CIT_ID":"108eb682-56bb-45f1-945e-423b0f5e1438","STA_ID":"23","CIT_NAME":"EL PE?OL","CIT_CODE":44},{"CIT_ID":"109744f7-0ac2-4f57-a351-db67dc628666","STA_ID":"15","CIT_NAME":"JERUSALEN","CIT_CODE":133},{"CIT_ID":"1134db8a-38d8-4bb5-932e-c7b8fe956d89","STA_ID":"5","CIT_NAME":"BARRANCO DE LOBA","CIT_CODE":10},{"CIT_ID":"113fa2d9-9bfb-4220-bae6-313633aa8fa2","STA_ID":"11","CIT_NAME":"SUAREZ","CIT_CODE":87},{"CIT_ID":"117c9672-cb6d-40ea-a752-1a01650f5051","STA_ID":"31","CIT_NAME":"OBANDO","CIT_CODE":76},{"CIT_ID":"119d7fc2-d9dc-4c3d-8bf0-98d3d4b630e2","STA_ID":"46","CIT_NAME":"PAZ DE ARIPORO (MORENO)","CIT_CODE":680},{"CIT_ID":"11cfaae1-9b65-4cdd-acd0-b67b5a8995ff","STA_ID":"7","CIT_NAME":"SOCHA","CIT_CODE":274},{"CIT_ID":"11d143f9-7815-4859-a924-88ea552c6eec","STA_ID":"7","CIT_NAME":"SUSACON","CIT_CODE":286},{"CIT_ID":"12125c24-df79-41e3-8ca9-394ca0a87b0f","STA_ID":"15","CIT_NAME":"BOJACA","CIT_CODE":25},{"CIT_ID":"121d3666-8101-4fac-9dc2-c639f9528233","STA_ID":"88","CIT_NAME":"LUXEMBURGO","CIT_CODE":540},{"CIT_ID":"12862f49-e18b-44e0-829a-6a722f2ba285","STA_ID":"7","CIT_NAME":"PAIPA","CIT_CODE":181},{"CIT_ID":"12f4faea-9e27-4124-bd85-ef25dc26acd0","STA_ID":"12","CIT_NAME":"LA JAGUA DE IBIRICO","CIT_CODE":608},{"CIT_ID":"1391638a-9d0d-4fee-8f66-fdc6426020cf","STA_ID":"7","CIT_NAME":"JERICO","CIT_CODE":124},{"CIT_ID":"13c7e12e-0048-46e0-a759-28fdeb5f7799","STA_ID":"11","CIT_NAME":"SAN SEBASTIAN","CIT_CODE":73},{"CIT_ID":"13e38297-c299-4171-86f3-250790ac1001","STA_ID":"7","CIT_NAME":"QUIPAMA","CIT_CODE":215},{"CIT_ID":"140b45dc-3e01-417a-924a-cedf003ba6ef","STA_ID":"15","CIT_NAME":"SUBACHOQUE","CIT_CODE":256},{"CIT_ID":"14150771-196b-465e-9af7-c522230e2c39","STA_ID":"27","CIT_NAME":"TONA","CIT_CODE":211},{"CIT_ID":"144f8a13-3c76-4bfc-b28f-6bada5b9af73","STA_ID":"17","CIT_NAME":"MEDIO ATRATO (BETE)","CIT_CODE":12},{"CIT_ID":"14d283c2-e173-43e9-842a-15f70fef7480","STA_ID":"19","CIT_NAME":"VILLAVIEJA","CIT_CODE":91},{"CIT_ID":"150a2a81-a9e4-4b9e-9a52-1340629b06a4","STA_ID":"23","CIT_NAME":"PUPIALES","CIT_CODE":106},{"CIT_ID":"1543dd99-66b7-4714-97fd-31b64459b031","STA_ID":"5","CIT_NAME":"SAN JACINTO DEL CAUCA","CIT_CODE":78},{"CIT_ID":"156490a0-0a0c-47cd-9f30-1c9b5638748d","STA_ID":"7","CIT_NAME":"NOBSA","CIT_CODE":166},{"CIT_ID":"157a3878-f655-4fe0-b0d9-8e2875f3e240","STA_ID":"68","CIT_NAME":"MITU","CIT_CODE":1},{"CIT_ID":"161b587d-9b9f-4bf9-ac8b-fca7e5eea0d3","STA_ID":"11","CIT_NAME":"MIRANDA","CIT_CODE":49},{"CIT_ID":"16252321-4309-45ff-9363-d86d45476746","STA_ID":"23","CIT_NAME":"CONSACA","CIT_CODE":25},{"CIT_ID":"1675923e-286a-4ee4-a7cd-5aa332de5a20","STA_ID":"11","CIT_NAME":"BUENOS AIRES","CIT_CODE":10},{"CIT_ID":"168c9d19-4695-458f-bfc2-26163b3fd571","STA_ID":"5","CIT_NAME":"MARGARITA","CIT_CODE":37},{"CIT_ID":"16b8922b-7c9e-4156-a8db-84e23811de8d","STA_ID":"11","CIT_NAME":"CALOTO","CIT_CODE":19},{"CIT_ID":"1757c190-10d9-414e-9ed1-c1528ac64706","STA_ID":"1","CIT_NAME":"BRICE?O","CIT_CODE":62},{"CIT_ID":"1759e498-73af-4cbe-9572-45dad4649f28","STA_ID":"23","CIT_NAME":"CHACHAGUI","CIT_CODE":38},{"CIT_ID":"177029c2-dd18-4518-8ff8-4e0dea7e109a","STA_ID":"31","CIT_NAME":"ZARZAL","CIT_CODE":124},{"CIT_ID":"178d4b2d-d295-43c9-905d-8b36b5c56a74","STA_ID":"19","CIT_NAME":"PALESTINA","CIT_CODE":56},{"CIT_ID":"17be8a1c-6ac5-455d-856d-f28f1650c187","STA_ID":"29","CIT_NAME":"COYAIMA","CIT_CODE":34},{"CIT_ID":"17f91589-ce70-4bbc-89a1-bc6ea92ffd1c","STA_ID":"27","CIT_NAME":"SURATA","CIT_CODE":208},{"CIT_ID":"180c7a81-bfe8-459d-ad9d-4145466cf4da","STA_ID":"1","CIT_NAME":"ARMENIA","CIT_CODE":40},{"CIT_ID":"181b4e08-cf50-4e17-b36f-112bf3732c7f","STA_ID":"27","CIT_NAME":"BETULIA","CIT_CODE":22},{"CIT_ID":"18932a24-292e-4c0b-92ef-a92348d1dd8d","STA_ID":"52","CIT_NAME":"PUERTO GAITAN","CIT_CODE":43},{"CIT_ID":"19527092-0f47-4f2a-b2e5-947d867cb3b8","STA_ID":"23","CIT_NAME":"GUALMATAN","CIT_CODE":58},{"CIT_ID":"196571f1-a826-450b-bbf3-362900f14468","STA_ID":"28","CIT_NAME":"MAJAGUAL","CIT_CODE":60},{"CIT_ID":"19669dfa-5748-473e-9bdc-f1509c7833bd","STA_ID":"27","CIT_NAME":"CHIMA","CIT_CODE":67},{"CIT_ID":"1969af54-3399-4ecb-a403-35c27d5a2784","STA_ID":"15","CIT_NAME":"CABRERA","CIT_CODE":29},{"CIT_ID":"1979825f-6c22-4f7e-9c78-1b8cb2178401","STA_ID":"7","CIT_NAME":"VIRACACHA","CIT_CODE":340},{"CIT_ID":"1a772dcf-a842-4e94-87e8-3a59e65ff78c","STA_ID":"12","CIT_NAME":"LA PAZ","CIT_CODE":825},{"CIT_ID":"1abbdfc8-0be2-4ab0-88a7-957a544164fb","STA_ID":"17","CIT_NAME":"RIOSUCIO","CIT_CODE":34},{"CIT_ID":"1ad30954-dc1e-4c52-9aab-afd7e971e4ea","STA_ID":"5","CIT_NAME":"MORALES","CIT_CODE":44},{"CIT_ID":"1ad32ffc-cffd-4443-9cda-ea79d2434ba8","STA_ID":"1","CIT_NAME":"SAN ROQUE","CIT_CODE":241},{"CIT_ID":"1ad92db2-4927-49ee-ba90-5c15ed61a215","STA_ID":"64","CIT_NAME":"COLON","CIT_CODE":7},{"CIT_ID":"1b241002-2b8f-4c98-b4a3-b7e2863223cc","STA_ID":"29","CIT_NAME":"RIOBLANCO","CIT_CODE":97},{"CIT_ID":"1b40c19c-f728-4e36-912b-4ee2611c6f27","STA_ID":"46","CIT_NAME":"MONTERREY","CIT_CODE":540},{"CIT_ID":"1b77b065-1d28-443b-a0ae-fcb51f88770e","STA_ID":"68","CIT_NAME":"CARURU","CIT_CODE":4},{"CIT_ID":"1bb125d9-2077-4ee3-b6a1-c82dc34ef918","STA_ID":"1","CIT_NAME":"PUEBLORRICO","CIT_CODE":202},{"CIT_ID":"1bcc7546-98a2-4b2a-8659-4be92a9843c9","STA_ID":"7","CIT_NAME":"GARAGOA","CIT_CODE":100},{"CIT_ID":"1bdac65c-2f90-4ff0-91fb-f55172239090","STA_ID":"13","CIT_NAME":"SAN JOSE DE URE","CIT_CODE":52},{"CIT_ID":"1be0f671-8bb1-4c4d-a355-cc1dca052648","STA_ID":"1","CIT_NAME":"ENTRERRIOS","CIT_CODE":118},{"CIT_ID":"1bf2dc3d-74df-4f0a-9ab4-d41e698775fd","STA_ID":"40","CIT_NAME":"ARAUQUITA","CIT_CODE":10},{"CIT_ID":"1bfd0de5-1afc-4fae-8795-04941a57cbd8","STA_ID":"3","CIT_NAME":"REPELON","CIT_CODE":40},{"CIT_ID":"1c70c423-8409-41dc-bc8a-7d2dae7a1086","STA_ID":"19","CIT_NAME":"IQUIRA","CIT_CODE":46},{"CIT_ID":"1c802b1a-52d5-4446-a20a-47e6ec84e87d","STA_ID":"48","CIT_NAME":"EL MOLINO","CIT_CODE":6},{"CIT_ID":"1c984501-188e-46e0-ae9e-d73d2473069a","STA_ID":"1","CIT_NAME":"DON MATIAS","CIT_CODE":112},{"CIT_ID":"1cb7113b-70c6-41a1-bd3b-e25c5a0f562c","STA_ID":"88","CIT_NAME":"SUDAFRICA","CIT_CODE":745},{"CIT_ID":"1ce29a4e-cf58-4cbf-85db-e25626b32eb5","STA_ID":"13","CIT_NAME":"LA APARTADA (FRONTERA)","CIT_CODE":20},{"CIT_ID":"1ce4222d-4fa5-4b17-9431-224a5aff10eb","STA_ID":"19","CIT_NAME":"YAGUARA","CIT_CODE":94},{"CIT_ID":"1d0b624b-2ddf-4584-a2d2-e4ffca12d155","STA_ID":"46","CIT_NAME":"SACAMA","CIT_CODE":815},{"CIT_ID":"1d42c1b9-f09a-43ff-9458-e05173ac5f7c","STA_ID":"31","CIT_NAME":"VIJES","CIT_CODE":115},{"CIT_ID":"1d63b47e-053e-4442-9d99-0b270ccf263b","STA_ID":"28","CIT_NAME":"CAIMITO","CIT_CODE":20},{"CIT_ID":"1d943246-82aa-46bd-ae24-b7551d0c61d0","STA_ID":"23","CIT_NAME":"TANGUA","CIT_CODE":136},{"CIT_ID":"1ddce4fa-9a97-4b6c-b8e9-3f7d7f23864c","STA_ID":"88","CIT_NAME":"COREA DEL SUR","CIT_CODE":275},{"CIT_ID":"1dee0d06-0639-4214-88a6-c95444634959","STA_ID":"19","CIT_NAME":"AGRADO","CIT_CODE":7},{"CIT_ID":"1df07495-fb11-49d9-b518-771f2f8daf1f","STA_ID":"15","CIT_NAME":"UTICA","CIT_CODE":316},{"CIT_ID":"1e4ee322-21c3-4e74-84ff-17f74d5a3945","STA_ID":"19","CIT_NAME":"ELIAS","CIT_CODE":31},{"CIT_ID":"1e6c0f1e-ea61-4f99-93c6-42b3820ac3ab","STA_ID":"28","CIT_NAME":"EL ROBLE","CIT_CODE":42},{"CIT_ID":"1ec09832-6c10-4e2f-91a5-1ddc2e29bdd3","STA_ID":"54","CIT_NAME":"MIRAFLORES","CIT_CODE":12},{"CIT_ID":"1f7004b9-b636-4259-afae-ced16527b245","STA_ID":"25","CIT_NAME":"PUERTO SANTANDER","CIT_CODE":69},{"CIT_ID":"1f74886a-67fa-47b6-976c-9cb6dd6f3059","STA_ID":"17","CIT_NAME":"EL LITORAL DEL SAN JUAN","CIT_CODE":38},{"CIT_ID":"1f9066a4-27ba-4323-9943-5c34fd90fc53","STA_ID":"7","CIT_NAME":"TIPACOQUE","CIT_CODE":311},{"CIT_ID":"1f95b83d-c182-45ef-9aa2-5e24926c3c2a","STA_ID":"46","CIT_NAME":"TAMARA","CIT_CODE":840},{"CIT_ID":"1fbc4541-37bb-47fb-85c2-5c00d6ad1293","STA_ID":"5","CIT_NAME":"SANTA ROSA","CIT_CODE":94},{"CIT_ID":"1fca8e78-88c1-4e95-8e49-88927c9a1336","STA_ID":"25","CIT_NAME":"EL CARMEN","CIT_CODE":37},{"CIT_ID":"1fec3960-8d8b-4f7c-af5b-966a1e58d2bb","STA_ID":"50","CIT_NAME":"SAN FELIPE","CIT_CODE":92},{"CIT_ID":"2009ee7c-2f8a-40d4-853c-d268c853a329","STA_ID":"24","CIT_NAME":"SANTUARIO","CIT_CODE":94},{"CIT_ID":"208dcacf-8cfc-40eb-9da5-b14691c32487","STA_ID":"23","CIT_NAME":"SANDONA","CIT_CODE":118},{"CIT_ID":"2098ca19-2b92-4eaa-beb0-ffe494de616d","STA_ID":"23","CIT_NAME":"CONTADERO","CIT_CODE":28},{"CIT_ID":"20ecd0d0-4df1-4929-90f4-bcabb4f65323","STA_ID":"25","CIT_NAME":"OCA?A","CIT_CODE":61},{"CIT_ID":"210b2e98-f499-4665-8636-72839282ceb8","STA_ID":"19","CIT_NAME":"PITALITO","CIT_CODE":61},{"CIT_ID":"2193b272-c15c-4a63-8145-ddf5f8c4ad1d","STA_ID":"27","CIT_NAME":"CARCASI","CIT_CODE":37},{"CIT_ID":"21a94a2c-552a-4e99-997c-ad7987828e15","STA_ID":"44","CIT_NAME":"LA MONTA?ITA","CIT_CODE":7},{"CIT_ID":"2206b6b3-3715-4496-8e3c-9d6b5ff44a13","STA_ID":"31","CIT_NAME":"EL AGUILA","CIT_CODE":43},{"CIT_ID":"227d5395-d688-4ec0-8f36-0687f6f0a784","STA_ID":"15","CIT_NAME":"SAN BERNARDO","CIT_CODE":223},{"CIT_ID":"22a58dae-9f76-4796-b3d6-1641f9a70386","STA_ID":"15","CIT_NAME":"YACOPI","CIT_CODE":334},{"CIT_ID":"22ad3f28-4ddc-43d0-95a0-eb3ffc3bb8bd","STA_ID":"26","CIT_NAME":"GENOVA","CIT_CODE":40},{"CIT_ID":"22beda32-a19a-4b30-a1c7-4306f64825cc","STA_ID":"19","CIT_NAME":"CAMPOALEGRE","CIT_CODE":22},{"CIT_ID":"22eb549d-9444-44e1-b2e4-fd86c5e58579","STA_ID":"9","CIT_NAME":"ANSERMA","CIT_CODE":7},{"CIT_ID":"22ef69e0-fd82-4b5a-ae53-96f9815d9623","STA_ID":"7","CIT_NAME":"IZA","CIT_CODE":118},{"CIT_ID":"2302b33b-3cc4-45f5-bf15-ec1eb8a0958c","STA_ID":"5","CIT_NAME":"MOMPOS","CIT_CODE":43},{"CIT_ID":"23f1e6f0-2b17-4512-824e-2b6301d92629","STA_ID":"21","CIT_NAME":"PLATO","CIT_CODE":52},{"CIT_ID":"241d4a5e-4da7-4469-8e75-677d1d45d414","STA_ID":"1","CIT_NAME":"SAN FRANCISCO","CIT_CODE":227},{"CIT_ID":"243cfd0c-4900-4c9d-9da5-44e950a8f3c1","STA_ID":"46","CIT_NAME":"SAN LUIS DE PALENQUE","CIT_CODE":830},{"CIT_ID":"2466cff7-ad5d-4b8f-97b9-c671cbd1b5bd","STA_ID":"48","CIT_NAME":"BARRANCAS","CIT_CODE":4},{"CIT_ID":"248c66b4-5223-4026-8789-75adef3071ba","STA_ID":"13","CIT_NAME":"SAN ANTERO","CIT_CODE":43},{"CIT_ID":"249a45aa-c603-417c-9044-e06b4922f772","STA_ID":"11","CIT_NAME":"SILVIA","CIT_CODE":82},{"CIT_ID":"24d6a89a-74c1-40cc-b901-bce921e51458","STA_ID":"15","CIT_NAME":"LA PALMA","CIT_CODE":145},{"CIT_ID":"251617d7-9294-4304-8f68-b9f4b1955c6c","STA_ID":"9","CIT_NAME":"VITERBO","CIT_CODE":133},{"CIT_ID":"25624d67-5558-4106-95a6-fae466949ae0","STA_ID":"3","CIT_NAME":"SOLEDAD","CIT_CODE":52},{"CIT_ID":"256bfdb5-5be9-4b59-960c-54cc9ff88c3e","STA_ID":"7","CIT_NAME":"TASCO","CIT_CODE":298},{"CIT_ID":"25720af4-4864-4ef6-8606-5c236bb0a128","STA_ID":"11","CIT_NAME":"PURACE (COCONUCO)","CIT_CODE":67},{"CIT_ID":"26868c72-ef42-41bf-99fe-87b00199e11f","STA_ID":"1","CIT_NAME":"NECHI","CIT_CODE":191},{"CIT_ID":"26a558f5-e465-46e7-9e32-213e6cf5b823","STA_ID":"24","CIT_NAME":"GUATICA","CIT_CODE":29},{"CIT_ID":"26c358d4-1108-488a-abc6-1a0b72a1e516","STA_ID":"15","CIT_NAME":"CHIPAQUE","CIT_CODE":58},{"CIT_ID":"2761d8af-7614-4b9f-a350-49728d823b9a","STA_ID":"12","CIT_NAME":"AGUSTIN CODAZZI","CIT_CODE":150},{"CIT_ID":"278bf961-33f1-4126-93f8-f89024deea83","STA_ID":"7","CIT_NAME":"CHIQUIZA","CIT_CODE":68},{"CIT_ID":"27cefba4-eca8-4f61-b50f-cf2cafbb3087","STA_ID":"3","CIT_NAME":"JUAN DE ACOSTA","CIT_CODE":16},{"CIT_ID":"27eb1ce2-dc8f-4739-9e9c-99c2c1a0530d","STA_ID":"23","CIT_NAME":"POLICARPA","CIT_CODE":98},{"CIT_ID":"27fd23d9-5049-43de-8e45-91a4403786bc","STA_ID":"23","CIT_NAME":"SAPUYES","CIT_CODE":130},{"CIT_ID":"284a044c-4185-4f0b-88fc-1ffa17babc60","STA_ID":"27","CIT_NAME":"SIMACOTA","CIT_CODE":196},{"CIT_ID":"28586315-c250-49e0-99ef-75a1b45203b8","STA_ID":"11","CIT_NAME":"SANTA ROSA","CIT_CODE":79},{"CIT_ID":"28ccc26d-4ddf-4430-8ad5-2ad08f5865d8","STA_ID":"19","CIT_NAME":"ALGECIRAS","CIT_CODE":13},{"CIT_ID":"2906810b-9483-457b-97ff-9163c1636de2","STA_ID":"15","CIT_NAME":"PULI","CIT_CODE":205},{"CIT_ID":"29b75ca6-bd10-4237-8081-0115e86157d3","STA_ID":"21","CIT_NAME":"PIJI?O DEL CARMEN","CIT_CODE":48},{"CIT_ID":"29d07c00-2413-4372-a2a9-0e2ae5266bd2","STA_ID":"1","CIT_NAME":"SANTA ROSA DE OSOS","CIT_CODE":250},{"CIT_ID":"29f6b805-e73a-46c2-b016-e2e3c5292581","STA_ID":"15","CIT_NAME":"SUPATA","CIT_CODE":262},{"CIT_ID":"29fa6fd0-7eda-4144-b492-0477a8d0343e","STA_ID":"27","CIT_NAME":"ENCISO","CIT_CODE":79},{"CIT_ID":"29ffa396-bcb2-4168-a64c-7ee15587fe7d","STA_ID":"48","CIT_NAME":"DISTRACCION","CIT_CODE":8},{"CIT_ID":"2a023382-c126-4b0e-9d3b-20cdd0742901","STA_ID":"3","CIT_NAME":"SUAN","CIT_CODE":55},{"CIT_ID":"2a68f4f6-e8d0-44d3-a7a0-2432fe9f84ba","STA_ID":"15","CIT_NAME":"GIRARDOT","CIT_CODE":109},{"CIT_ID":"2a8e2aa7-8278-4708-a155-13847408e960","STA_ID":"23","CIT_NAME":"CUASPUD (CARLOSAMA)","CIT_CODE":34},{"CIT_ID":"2ab3c8dc-c5d5-4f93-96be-49a79741a2ca","STA_ID":"21","CIT_NAME":"TENERIFE","CIT_CODE":85},{"CIT_ID":"2ad36651-9908-44fe-a966-5a6186f882a9","STA_ID":"88","CIT_NAME":"IRAN","CIT_CODE":475},{"CIT_ID":"2af179c9-8b43-4e9b-b4d1-52481ee21948","STA_ID":"64","CIT_NAME":"PUERTO GUZMAN","CIT_CODE":25},{"CIT_ID":"2b6084c3-20a9-4c33-b7d3-d4757a4b7198","STA_ID":"17","CIT_NAME":"RIO QUITO (PAIMADO)","CIT_CODE":35},{"CIT_ID":"2bbcb928-bedf-4c13-9c42-6aac49d1773e","STA_ID":"19","CIT_NAME":"HOBO","CIT_CODE":43},{"CIT_ID":"2c03a3a2-a0b3-4c05-9045-17b688d7d828","STA_ID":"15","CIT_NAME":"MADRID","CIT_CODE":160},{"CIT_ID":"2c5827c7-b90a-4bcf-a18c-d765c9928e76","STA_ID":"27","CIT_NAME":"HATO","CIT_CODE":109},{"CIT_ID":"2c88e4e0-3f5e-4f30-aa28-c0b3a4d96c85","STA_ID":"1","CIT_NAME":"AMAGA","CIT_CODE":13},{"CIT_ID":"2d0f622e-2b0e-40a9-88a4-a5e29988f352","STA_ID":"1","CIT_NAME":"SAN JOSE DE LA MONTA?A","CIT_CODE":230},{"CIT_ID":"2d249323-05e5-439e-8dba-4851c50ead9e","STA_ID":"44","CIT_NAME":"MORELIA","CIT_CODE":17},{"CIT_ID":"2d700efd-4420-4caa-9aa3-c7bea652a828","STA_ID":"9","CIT_NAME":"MANZANARES","CIT_CODE":55},{"CIT_ID":"2dad2aa0-3437-4c1f-bb6f-e98b8cb1f2ee","STA_ID":"52","CIT_NAME":"SAN MARTIN DE LOS LLANOS","CIT_CODE":60},{"CIT_ID":"2dae58ab-ac63-4a17-9046-932b40be100a","STA_ID":"1","CIT_NAME":"BELLO","CIT_CODE":49},{"CIT_ID":"2de30b5b-7ce0-4a97-abf4-208cc69531da","STA_ID":"88","CIT_NAME":"FRANCIA","CIT_CODE":380},{"CIT_ID":"2deb8e73-117f-44d6-8cf8-d0bd2061b79f","STA_ID":"15","CIT_NAME":"ALBAN","CIT_CODE":7},{"CIT_ID":"2e50e358-753f-4fb3-ae48-daa4da1ea83b","STA_ID":"24","CIT_NAME":"SANTA ROSA DE CABAL","CIT_CODE":86},{"CIT_ID":"2e84bca0-054c-4864-ace3-afee1ea7f168","STA_ID":"12","CIT_NAME":"TAMALAMEQUE","CIT_CODE":900},{"CIT_ID":"2ed8dc93-f742-4abf-b914-4f82dfdc6733","STA_ID":"19","CIT_NAME":"COLOMBIA","CIT_CODE":28},{"CIT_ID":"2f03d952-0331-4777-8fa8-8511175c321b","STA_ID":"13","CIT_NAME":"TIERRALTA","CIT_CODE":58},{"CIT_ID":"2f286636-c04f-49b5-aa7a-55bfd8029aea","STA_ID":"19","CIT_NAME":"NEIVA","CIT_CODE":1},{"CIT_ID":"2f30fa24-0d1e-4c80-97e0-f083673c30c4","STA_ID":"28","CIT_NAME":"SAN BENITO ABAD","CIT_CODE":180},{"CIT_ID":"2f76d8a8-0624-49fc-8985-ac44ad223f8a","STA_ID":"29","CIT_NAME":"LIBANO","CIT_CODE":73},{"CIT_ID":"2fce659b-66f1-401e-9a31-c9cb832eeb08","STA_ID":"21","CIT_NAME":"REMOLINO","CIT_CODE":58},{"CIT_ID":"2fdebd17-1776-475a-aa41-128fd930db79","STA_ID":"23","CIT_NAME":"CORDOBA","CIT_CODE":31},{"CIT_ID":"2fe6d7b4-2f97-403b-9dd7-e135db40414d","STA_ID":"7","CIT_NAME":"SAMACA","CIT_CODE":235},{"CIT_ID":"30013421-6980-49c4-b244-0d523b3a742f","STA_ID":"27","CIT_NAME":"GUADALUPE","CIT_CODE":97},{"CIT_ID":"306c20fd-d300-4fca-8e07-25c3803c534b","STA_ID":"52","CIT_NAME":"EL DORADO","CIT_CODE":28},{"CIT_ID":"312cec3a-d2ad-4a39-987f-cdba8f096bd5","STA_ID":"15","CIT_NAME":"BITUIMA","CIT_CODE":22},{"CIT_ID":"313eea24-c9c3-49bb-bb29-ca1ed8a92bbe","STA_ID":"15","CIT_NAME":"UNE","CIT_CODE":307},{"CIT_ID":"31b5aba1-0981-4800-86a8-93e76c41885d","STA_ID":"46","CIT_NAME":"AGUAZUL","CIT_CODE":40},{"CIT_ID":"31cc900c-ede8-4eb6-97ab-00376a8c54e5","STA_ID":"15","CIT_NAME":"SASAIMA","CIT_CODE":235},{"CIT_ID":"31e6d18e-dd06-4f65-b92d-69a82f253d5e","STA_ID":"7","CIT_NAME":"GUACAMAYAS","CIT_CODE":103},{"CIT_ID":"3217e385-c8ab-4392-a6af-5fc2f9795133","STA_ID":"7","CIT_NAME":"CALDAS","CIT_CODE":37},{"CIT_ID":"322a11b3-dbb0-4ee9-8e46-53899954f778","STA_ID":"50","CIT_NAME":"LA GUADALUPE","CIT_CODE":78},{"CIT_ID":"324e11b9-31cf-4c02-becf-d2c68ee634f7","STA_ID":"31","CIT_NAME":"ANDALUCIA","CIT_CODE":7},{"CIT_ID":"3320aa2e-ad67-49d3-9560-ddab540d5bf4","STA_ID":"7","CIT_NAME":"TOCA","CIT_CODE":313},{"CIT_ID":"3397e481-c74e-4080-bf7a-4db66f77bd8e","STA_ID":"1","CIT_NAME":"MUTATA","CIT_CODE":187},{"CIT_ID":"3435c581-1145-4484-8413-a83912564f71","STA_ID":"88","CIT_NAME":"HUNGRIA REPUBLICA POPULAR","CIT_CODE":450},{"CIT_ID":"3498402c-fa49-43da-8fa0-b39e5c317403","STA_ID":"1","CIT_NAME":"SAN RAFAEL","CIT_CODE":238},{"CIT_ID":"34d38a1a-b3a8-48d7-848d-7654ebed96a6","STA_ID":"21","CIT_NAME":"NUEVA GRANADA","CIT_CODE":42},{"CIT_ID":"35825824-bcd6-4d45-8e62-70be1f32ab43","STA_ID":"15","CIT_NAME":"LA MESA","CIT_CODE":142},{"CIT_ID":"358fa806-cb8c-4afc-b592-5a2e458a1a0f","STA_ID":"15","CIT_NAME":"ZIPACON","CIT_CODE":337},{"CIT_ID":"35a5091a-c36d-4c6a-ae5c-ffd7f9a02c74","STA_ID":"7","CIT_NAME":"MONGUA","CIT_CODE":154},{"CIT_ID":"360536b6-682b-459b-8149-6fd058862751","STA_ID":"3","CIT_NAME":"PIOJO","CIT_CODE":31},{"CIT_ID":"3662f4c9-eeee-4a9f-9f82-1d4afaa516c6","STA_ID":"15","CIT_NAME":"GUATAVITA","CIT_CODE":124},{"CIT_ID":"36c10383-4479-40a9-b08e-942992cd83cc","STA_ID":"60","CIT_NAME":"LA PEDRERA","CIT_CODE":16},{"CIT_ID":"36cbe871-149d-47fc-8ed3-bf2924ffb00e","STA_ID":"19","CIT_NAME":"LA ARGENTINA (PLATA VIEJA)","CIT_CODE":47},{"CIT_ID":"36e9a219-6129-4a6d-98bb-c31b843c6200","STA_ID":"15","CIT_NAME":"EL PE?ON","CIT_CODE":70},{"CIT_ID":"37137252-e40e-43f0-96f2-9abd78c8b797","STA_ID":"7","CIT_NAME":"CHITA","CIT_CODE":73},{"CIT_ID":"374e186b-de32-40e0-a4f8-1a5ac3df8900","STA_ID":"19","CIT_NAME":"ALTAMIRA","CIT_CODE":16},{"CIT_ID":"3751df1c-77e9-4290-b73f-69a9c9eb21c3","STA_ID":"1","CIT_NAME":"ANDES","CIT_CODE":19},{"CIT_ID":"37605969-c0ee-4fe6-8bda-416abce3d9be","STA_ID":"52","CIT_NAME":"SAN JUANITO","CIT_CODE":59},{"CIT_ID":"37932db1-29d6-4754-8084-e96d063cb23f","STA_ID":"23","CIT_NAME":"ALBAN (SAN JOSE)","CIT_CODE":4},{"CIT_ID":"37ab2e72-2fdc-4514-bbcc-38e0f58e3397","STA_ID":"15","CIT_NAME":"VILLAPINZON","CIT_CODE":325},{"CIT_ID":"3831d22d-8944-418a-b857-045b5a52df6b","STA_ID":"15","CIT_NAME":"SUTATAUSA","CIT_CODE":268},{"CIT_ID":"38587f9f-64fa-4d95-a120-7a2220acf8c1","STA_ID":"19","CIT_NAME":"ISNOS","CIT_CODE":44},{"CIT_ID":"385abbc2-aa3c-4ea1-884c-7ec0f3ec5ad9","STA_ID":"7","CIT_NAME":"SAN JOSE DE PARE","CIT_CODE":238},{"CIT_ID":"389f18d1-6519-43e5-8c6b-a6ed0840137d","STA_ID":"7","CIT_NAME":"PACHAVITA","CIT_CODE":178},{"CIT_ID":"38a28cb2-b0cf-4662-ad44-2ead892d1baf","STA_ID":"5","CIT_NAME":"CICUCO","CIT_CODE":15},{"CIT_ID":"38d7ed65-9386-4db8-a1f9-8fdda302301b","STA_ID":"17","CIT_NAME":"BAJO BAUDO (PIZARRO)","CIT_CODE":10},{"CIT_ID":"38dcdc82-f042-4845-9be5-3d8e9efe768a","STA_ID":"13","CIT_NAME":"CHIMA","CIT_CODE":16},{"CIT_ID":"38e09627-91f1-4609-b137-644e5b7fd2bd","STA_ID":"64","CIT_NAME":"VALLE DEL GUAMUEZ (LA HORMIGA)","CIT_CODE":28},{"CIT_ID":"391fa751-8c3d-4836-9477-a431567aa62b","STA_ID":"15","CIT_NAME":"CAJICA","CIT_CODE":31},{"CIT_ID":"3951534a-316f-4b36-9336-b32c5cac056f","STA_ID":"31","CIT_NAME":"FLORIDA","CIT_CODE":55},{"CIT_ID":"3960de8c-bea9-4cea-963d-88efe1d2e455","STA_ID":"27","CIT_NAME":"LA BELLEZA","CIT_CODE":119},{"CIT_ID":"396fe2a7-51ee-4b71-9fd2-e7083fd33b5f","STA_ID":"17","CIT_NAME":"JURADO","CIT_CODE":22},{"CIT_ID":"39824efd-b0b8-4368-93b2-051f27ffa8d1","STA_ID":"15","CIT_NAME":"SOPO","CIT_CODE":250},{"CIT_ID":"39989c3b-8adf-4877-b06b-c27952377df4","STA_ID":"1","CIT_NAME":"GIRALDO","CIT_CODE":130},{"CIT_ID":"39deec4f-ec8a-4641-9dd6-78f09a93a27c","STA_ID":"7","CIT_NAME":"TOTA","CIT_CODE":322},{"CIT_ID":"3a0a3128-6d16-4343-b2c2-a99a4fb5de96","STA_ID":"23","CIT_NAME":"EL TABLON","CIT_CODE":43},{"CIT_ID":"3a0de215-9698-4f4d-94f4-69bc4ffa56e5","STA_ID":"21","CIT_NAME":"PEDRAZA","CIT_CODE":46},{"CIT_ID":"3a2a12ec-21ca-40b7-86f8-110d60a5a72e","STA_ID":"88","CIT_NAME":"PUERTO RICO","CIT_CODE":683},{"CIT_ID":"3ab8a6f9-63e4-4c8d-b2fd-b0fd45afbaf0","STA_ID":"27","CIT_NAME":"RIONEGRO","CIT_CODE":172},{"CIT_ID":"3ad00db7-084e-434e-a7ce-ce95cb98be0d","STA_ID":"11","CIT_NAME":"PADILLA","CIT_CODE":53},{"CIT_ID":"3b2d9cdc-119f-4d77-b83c-33c03d962f55","STA_ID":"27","CIT_NAME":"CONTRATACION","CIT_CODE":52},{"CIT_ID":"3b3f94b2-4a7b-4214-82e7-9c49502b348f","STA_ID":"9","CIT_NAME":"SALAMINA","CIT_CODE":109},{"CIT_ID":"3b9d9ec3-c776-495c-81be-34405a72b034","STA_ID":"19","CIT_NAME":"BARAYA","CIT_CODE":19},{"CIT_ID":"3bb04c3e-8d9a-49d3-9d97-64d932131a76","STA_ID":"88","CIT_NAME":"CHECOSLOVAQUIA","CIT_CODE":300},{"CIT_ID":"3be4efb3-3177-44ff-959f-5ca60efa0c86","STA_ID":"48","CIT_NAME":"RIOHACHA","CIT_CODE":1},{"CIT_ID":"3c01afe0-c40c-4517-aee8-2a1c090ff7f8","STA_ID":"88","CIT_NAME":"VENEZUELA","CIT_CODE":815},{"CIT_ID":"3c7f2124-5802-4de4-aa7d-98f6ededef67","STA_ID":"72","CIT_NAME":"LA PRIMAVERA","CIT_CODE":8},{"CIT_ID":"3c9ed9b2-8605-41ac-946d-28c64839cfe3","STA_ID":"15","CIT_NAME":"TENJO","CIT_CODE":280},{"CIT_ID":"3cd41d3d-97aa-4119-87ff-473fd3198cd2","STA_ID":"31","CIT_NAME":"YUMBO","CIT_CODE":121},{"CIT_ID":"3cdad93a-db70-4bc7-9deb-e46245a68812","STA_ID":"23","CIT_NAME":"LA LLANADA","CIT_CODE":77},{"CIT_ID":"3d1172bb-a2f8-4961-9707-31033e22e943","STA_ID":"48","CIT_NAME":"MAICAO","CIT_CODE":10},{"CIT_ID":"3d6a3f4c-2cb6-4751-931d-21a63954ed3c","STA_ID":"1","CIT_NAME":"SAN ANDRES","CIT_CODE":223},{"CIT_ID":"3d9c80d0-6d50-4d5f-8199-b5cec761d37d","STA_ID":"7","CIT_NAME":"SOATA","CIT_CODE":268},{"CIT_ID":"3dfa2d8b-2e9c-403a-8a23-01e6534982d7","STA_ID":"15","CIT_NAME":"MOSQUERA","CIT_CODE":169},{"CIT_ID":"3e0a842c-81fc-4744-bec0-1d1353c0667b","STA_ID":"1","CIT_NAME":"CA?ASGORDAS","CIT_CODE":76},{"CIT_ID":"3e3bba35-6c00-4ad8-9ed5-39e1a6065655","STA_ID":"31","CIT_NAME":"CALIMA (DARIEN)","CIT_CODE":40},{"CIT_ID":"3e45c743-4c0e-4ff1-9378-5280380ffcbf","STA_ID":"7","CIT_NAME":"SATIVANORTE","CIT_CODE":259},{"CIT_ID":"3e911eaf-f108-4c5d-942a-cf6437cca7f8","STA_ID":"17","CIT_NAME":"NUQUI","CIT_CODE":31},{"CIT_ID":"3edb44eb-adce-4297-979b-84d4cd64c919","STA_ID":"88","CIT_NAME":"NICARAGUA","CIT_CODE":620},{"CIT_ID":"3ee6c85f-a05e-4d1c-8fed-e0ef98b086fe","STA_ID":"15","CIT_NAME":"TIBACUY","CIT_CODE":283},{"CIT_ID":"3f109619-cdda-466f-9812-3dc00a04685b","STA_ID":"27","CIT_NAME":"ARATOCA","CIT_CODE":10},{"CIT_ID":"3f778238-6412-49e8-8b60-051478c14f9e","STA_ID":"52","CIT_NAME":"SAN CARLOS DE GUAROA","CIT_CODE":55},{"CIT_ID":"3fb62261-503c-4dd8-8922-0038d34283a7","STA_ID":"15","CIT_NAME":"NOCAIMA","CIT_CODE":184},{"CIT_ID":"408382ff-083e-459a-9f72-4d6526e6070b","STA_ID":"3","CIT_NAME":"PALMAR DE VARELA","CIT_CODE":28},{"CIT_ID":"40ce4008-a801-4f59-9f7d-b48d84b85269","STA_ID":"15","CIT_NAME":"NILO","CIT_CODE":178},{"CIT_ID":"40e4357b-bf9c-408d-84dd-ac7126d53c05","STA_ID":"13","CIT_NAME":"PUERTO LIBERTADOR","CIT_CODE":32},{"CIT_ID":"4109eee8-7c15-4496-b9d8-5975d86e0a49","STA_ID":"1","CIT_NAME":"ANTIOQUIA","CIT_CODE":31},{"CIT_ID":"411f6049-5a2d-43a8-abfb-256881a4d721","STA_ID":"1","CIT_NAME":"TAMESIS","CIT_CODE":268},{"CIT_ID":"41353a54-86df-465c-947a-790aaf3243c4","STA_ID":"5","CIT_NAME":"SAN ESTANISLAO","CIT_CODE":70},{"CIT_ID":"415e49a2-372c-4999-b944-4466bb733a9b","STA_ID":"23","CIT_NAME":"PASTO","CIT_CODE":1},{"CIT_ID":"417051df-9781-4594-a976-b0c0a85afe13","STA_ID":"29","CIT_NAME":"PLANADAS","CIT_CODE":89},{"CIT_ID":"41ad318b-568c-40be-96ea-92bc5548bc84","STA_ID":"11","CIT_NAME":"PAEZ (BELALCAZAR)","CIT_CODE":55},{"CIT_ID":"422e6758-38ec-4935-bb5c-274cbc1695f0","STA_ID":"1","CIT_NAME":"VENECIA","CIT_CODE":292},{"CIT_ID":"42947fbe-925f-4c64-ac29-3a895ec4c8d6","STA_ID":"88","CIT_NAME":"PORTUGAL","CIT_CODE":680},{"CIT_ID":"429f6c4b-40d8-42f2-81e0-8d91936dca10","STA_ID":"21","CIT_NAME":"EL RETEN","CIT_CODE":30},{"CIT_ID":"431444d2-75b7-4e1c-bad4-7c5561d31785","STA_ID":"88","CIT_NAME":"RUMANIA REPUBLICA SOCIAL","CIT_CODE":695},{"CIT_ID":"432df049-a97b-4b25-b19b-8f2e52a3de18","STA_ID":"1","CIT_NAME":"SAN PEDRO","CIT_CODE":235},{"CIT_ID":"43858fe3-5e3f-4fbf-8703-3483470a8063","STA_ID":"7","CIT_NAME":"RAMIRIQUI","CIT_CODE":217},{"CIT_ID":"4388170a-83fe-43c1-b223-a407ab654bf0","STA_ID":"3","CIT_NAME":"USIACURI","CIT_CODE":61},{"CIT_ID":"43dd2fd2-9ff6-4ec8-98d1-601cd5a0f245","STA_ID":"27","CIT_NAME":"SAN ANDRES","CIT_CODE":175},{"CIT_ID":"43f43d66-b82f-4a64-a43e-90c60cc99651","STA_ID":"44","CIT_NAME":"EL DONCELLO","CIT_CODE":5},{"CIT_ID":"4400c480-f173-405c-ae59-2c89de4160f9","STA_ID":"44","CIT_NAME":"PUERTO RICO","CIT_CODE":9},{"CIT_ID":"440db3a2-e93c-4ee0-80cc-f6e0ac72f279","STA_ID":"15","CIT_NAME":"AGUA DE DIOS","CIT_CODE":4},{"CIT_ID":"4433cf94-4f5d-4a62-9288-77474e838748","STA_ID":"1","CIT_NAME":"SEGOVIA","CIT_CODE":259},{"CIT_ID":"447dcd6b-f464-400d-b461-a5384d9b44d4","STA_ID":"27","CIT_NAME":"SUAITA","CIT_CODE":202},{"CIT_ID":"44d91fee-50ed-4a8d-b0d1-d049de3cceb2","STA_ID":"1","CIT_NAME":"BETULIA","CIT_CODE":55},{"CIT_ID":"455d7475-a6a8-4071-8b31-a84bf0b5cc21","STA_ID":"40","CIT_NAME":"FORTUL","CIT_CODE":17},{"CIT_ID":"45a49c17-344c-4fff-a645-b94ca8590ed5","STA_ID":"88","CIT_NAME":"CHIPRE","CIT_CODE":320},{"CIT_ID":"460b80db-85e2-461c-823c-1b505e185ab8","STA_ID":"15","CIT_NAME":"NIMAIMA","CIT_CODE":181},{"CIT_ID":"462dcad0-bfe0-4d12-9e0a-1af9405c2542","STA_ID":"23","CIT_NAME":"TUQUERRES","CIT_CODE":142},{"CIT_ID":"4648b337-56a8-4536-b73c-839f45fa0d7c","STA_ID":"72","CIT_NAME":"PUERTO CARRE?O","CIT_CODE":1},{"CIT_ID":"4665ce5a-ce5b-44ee-b488-c23505b83485","STA_ID":"1","CIT_NAME":"LA CEJA","CIT_CODE":163},{"CIT_ID":"46afbeab-b781-452e-9c3d-4cbe06d08b1d","STA_ID":"7","CIT_NAME":"CHISCAS","CIT_CODE":70},{"CIT_ID":"46c5cb57-0fd8-425f-9b3b-f898d96ee041","STA_ID":"23","CIT_NAME":"BELEN","CIT_CODE":17},{"CIT_ID":"46d8b99d-43f4-4a45-9c7c-d56d574391cd","STA_ID":"9","CIT_NAME":"NEIRA","CIT_CODE":76},{"CIT_ID":"46de88ac-9f6f-4745-8c47-6319e9b7399f","STA_ID":"13","CIT_NAME":"PUERTO ESCONDIDO","CIT_CODE":33},{"CIT_ID":"46e02bf6-992d-4011-8d9f-eed5a4b15fbf","STA_ID":"7","CIT_NAME":"SAN MIGUEL DE SEMA","CIT_CODE":248},{"CIT_ID":"46e1af76-045c-4c63-9257-7229f9e88f91","STA_ID":"13","CIT_NAME":"PUEBLO NUEVO","CIT_CODE":31},{"CIT_ID":"47b24a58-bc68-410f-87c7-344366a16002","STA_ID":"25","CIT_NAME":"CONVENCION","CIT_CODE":22},{"CIT_ID":"47dea327-f214-489a-a5f7-e62650da81c2","STA_ID":"15","CIT_NAME":"TOCANCIPA","CIT_CODE":292},{"CIT_ID":"47f06dae-5367-4205-a6b7-ae1ad0e3f737","STA_ID":"27","CIT_NAME":"MALAGA","CIT_CODE":130},{"CIT_ID":"47f3ab88-7555-4fa5-a481-1d2ecbc21fe6","STA_ID":"7","CIT_NAME":"PAZ DE RIO","CIT_CODE":199},{"CIT_ID":"47f48b67-0b60-442d-bcc8-023128d84cc5","STA_ID":"29","CIT_NAME":"MARIQUITA","CIT_CODE":76},{"CIT_ID":"48264ebd-f224-4bc1-961c-f20ec2307add","STA_ID":"1","CIT_NAME":"TITIRIBI","CIT_CODE":274},{"CIT_ID":"485aafc4-d71f-4894-8eb9-ee89ac94cf42","STA_ID":"64","CIT_NAME":"SIBUNDOY","CIT_CODE":19},{"CIT_ID":"48d08166-7ee8-4756-a016-81a8ff7b36e0","STA_ID":"48","CIT_NAME":"FONSECA","CIT_CODE":7},{"CIT_ID":"48dedf6a-c717-4384-b932-1577d0b2d2b3","STA_ID":"7","CIT_NAME":"PUERTO BOYACA","CIT_CODE":214},{"CIT_ID":"491bae36-e273-4562-8734-4283956e8367","STA_ID":"48","CIT_NAME":"VILLANUEVA","CIT_CODE":20},{"CIT_ID":"49d1102c-2b91-4d2f-bdd1-eeb3d165fc22","STA_ID":"3","CIT_NAME":"MALAMBO","CIT_CODE":22},{"CIT_ID":"49d4b898-8bbc-4940-8218-1b1eafc9ce02","STA_ID":"1","CIT_NAME":"ALEJANDRIA","CIT_CODE":10},{"CIT_ID":"4a20fa27-d411-4e1a-8ba3-712b0a18b423","STA_ID":"1","CIT_NAME":"CALDAS","CIT_CODE":70},{"CIT_ID":"4a2d1bb0-128b-440a-84a5-99e513e982d2","STA_ID":"7","CIT_NAME":"BUSBANZA","CIT_CODE":34},{"CIT_ID":"4a38b5a7-5067-494e-8499-93d88f6fdb43","STA_ID":"23","CIT_NAME":"SAN LORENZO","CIT_CODE":121},{"CIT_ID":"4a69d645-316e-4d7a-9dbb-e3b8c947f848","STA_ID":"31","CIT_NAME":"ULLOA","CIT_CODE":109},{"CIT_ID":"4a6ddc76-f103-431b-95fa-6af9c856e74f","STA_ID":"3","CIT_NAME":"TUBARA","CIT_CODE":58},{"CIT_ID":"4abd702a-9513-4ef5-8d10-c2d9e3efe7ab","STA_ID":"50","CIT_NAME":"MAPIRIPANA","CIT_CODE":50},{"CIT_ID":"4ac0bde6-97a8-49a3-9b2c-bbc7b051aec6","STA_ID":"7","CIT_NAME":"BOYACA","CIT_CODE":25},{"CIT_ID":"4ace23da-aeea-408a-904a-53afd58c65be","STA_ID":"23","CIT_NAME":"GUAITARILLA","CIT_CODE":55},{"CIT_ID":"4ad8366f-7ee6-4e5c-9a6b-2d36af1fa4c1","STA_ID":"7","CIT_NAME":"SIACHOQUE","CIT_CODE":265},{"CIT_ID":"4ae5c277-d68b-40b7-b05c-4b519ae82f3b","STA_ID":"15","CIT_NAME":"BELTRAN","CIT_CODE":19},{"CIT_ID":"4c0752dc-a260-49da-8b4b-f12e301c7187","STA_ID":"1","CIT_NAME":"CARAMANTA","CIT_CODE":79},{"CIT_ID":"4c2175d2-11d4-496c-b921-1c25c1a478c8","STA_ID":"7","CIT_NAME":"SANTA SOFIA","CIT_CODE":256},{"CIT_ID":"4c708cd2-5e24-4655-b49d-85b0c0b59831","STA_ID":"1","CIT_NAME":"NARI?O","CIT_CODE":190},{"CIT_ID":"4c95af8b-dadd-4529-9faf-9197b1f006eb","STA_ID":"7","CIT_NAME":"ALMEIDA","CIT_CODE":7},{"CIT_ID":"4cb735ab-cf28-4a35-9e65-ff97ef4a447a","STA_ID":"5","CIT_NAME":"RIOVIEJO","CIT_CODE":65},{"CIT_ID":"4d59e3c5-61aa-4133-9c6d-44839d2ee786","STA_ID":"25","CIT_NAME":"BUCARASICA","CIT_CODE":13},{"CIT_ID":"4d77047b-442b-4797-b4f4-ac2d7f2299eb","STA_ID":"26","CIT_NAME":"CIRCASIA","CIT_CODE":20},{"CIT_ID":"4d8686c2-b0d1-48db-b995-681321e8f9ac","STA_ID":"1","CIT_NAME":"SABANETA","CIT_CODE":218},{"CIT_ID":"4d8ddc1b-4f1d-4e34-a440-cad80667c088","STA_ID":"19","CIT_NAME":"GIGANTE","CIT_CODE":37},{"CIT_ID":"4da097fd-4459-4569-bf5f-508825f32020","STA_ID":"27","CIT_NAME":"SAN BENITO","CIT_CODE":178},{"CIT_ID":"4db47fb6-a910-4ed9-b2a1-9deb2de82cf4","STA_ID":"27","CIT_NAME":"ONZAGA","CIT_CODE":148},{"CIT_ID":"4dcf5f16-dccd-4dc6-82e7-bc1dddad8942","STA_ID":"3","CIT_NAME":"LURUACO","CIT_CODE":19},{"CIT_ID":"4e7dc1a4-6f20-4f89-a9d8-5a61d6193800","STA_ID":"24","CIT_NAME":"BELEN DE UMBRIA","CIT_CODE":21},{"CIT_ID":"4f04c168-cf6a-4452-8ba6-8069b23876b6","STA_ID":"19","CIT_NAME":"GARZON","CIT_CODE":34},{"CIT_ID":"4f11c17c-c6db-4c07-8ac5-d554a1f85dd4","STA_ID":"27","CIT_NAME":"BARRANCABERMEJA","CIT_CODE":19},{"CIT_ID":"4f1ddb06-269f-47ce-bedb-c219b26ce976","STA_ID":"27","CIT_NAME":"CALIFORNIA","CIT_CODE":31},{"CIT_ID":"4f23e8c2-b4cb-443e-8bd2-c075dad19c20","STA_ID":"27","CIT_NAME":"GUAPOTA","CIT_CODE":100},{"CIT_ID":"4f606fbd-63f8-427c-9047-fff7445a7cfc","STA_ID":"31","CIT_NAME":"EL DOVIO","CIT_CODE":52},{"CIT_ID":"4f784018-54ce-4e84-ab53-4e1e8548e646","STA_ID":"11","CIT_NAME":"FLORENCIA","CIT_CODE":27},{"CIT_ID":"4f79afbe-503c-4977-8430-cee571386824","STA_ID":"1","CIT_NAME":"TARSO","CIT_CODE":271},{"CIT_ID":"4f870c9f-baf7-43a5-8d21-a94145e296b1","STA_ID":"52","CIT_NAME":"CUMARAL","CIT_CODE":20},{"CIT_ID":"501287a7-5d6a-4251-8327-c2f2e8fbe6bd","STA_ID":"52","CIT_NAME":"GRANADA","CIT_CODE":35},{"CIT_ID":"50474d44-90da-479a-852b-880a610a1c31","STA_ID":"27","CIT_NAME":"PUENTE NACIONAL","CIT_CODE":166},{"CIT_ID":"50523d41-f319-487e-962a-cf67e5961a78","STA_ID":"17","CIT_NAME":"ALTO BAUDO (PIE DE PATO)","CIT_CODE":6},{"CIT_ID":"5083f93e-d77a-4f4f-aca4-e2b515bb9a89","STA_ID":"29","CIT_NAME":"ALPUJARRA","CIT_CODE":4},{"CIT_ID":"508c9e0f-e7ba-48f1-b814-a4b2af71300c","STA_ID":"19","CIT_NAME":"LA PLATA","CIT_CODE":49},{"CIT_ID":"509e88b2-bb68-447f-bf22-6ef185746c0b","STA_ID":"64","CIT_NAME":"VILLAGARZON","CIT_CODE":30},{"CIT_ID":"50db7a75-df58-4fb9-b092-fa36778c8e41","STA_ID":"60","CIT_NAME":"TARAPACA","CIT_CODE":22},{"CIT_ID":"50df5f3d-3f2f-4748-90d8-bc5f4c1bb1c9","STA_ID":"12","CIT_NAME":"CHIMICHAGUA","CIT_CODE":300},{"CIT_ID":"50e0b25a-3fdb-4a94-873e-ffcac6fdc89f","STA_ID":"5","CIT_NAME":"ACHI","CIT_CODE":4},{"CIT_ID":"514267d8-cfea-4635-a725-3729f8de2113","STA_ID":"27","CIT_NAME":"ENCINO","CIT_CODE":76},{"CIT_ID":"51681353-f126-46ae-9de8-9ee5bd6ad7e2","STA_ID":"15","CIT_NAME":"UBATE","CIT_CODE":304},{"CIT_ID":"51c37e60-8989-4bcb-b67e-6fc69fe69af4","STA_ID":"23","CIT_NAME":"LA UNION","CIT_CODE":79},{"CIT_ID":"51c42bab-5b93-46fd-aa68-68d7bff53a78","STA_ID":"64","CIT_NAME":"SANTIAGO","CIT_CODE":16},{"CIT_ID":"51dd7507-8124-4b48-bab6-16e44e19edd9","STA_ID":"21","CIT_NAME":"CERRO DE SAN ANTONIO","CIT_CODE":13},{"CIT_ID":"51ed8020-639d-4fae-947b-da153c8d3043","STA_ID":"24","CIT_NAME":"APIA","CIT_CODE":8},{"CIT_ID":"5211bbe4-19e9-4375-8ff1-7a5db18169f0","STA_ID":"11","CIT_NAME":"MORALES","CIT_CODE":52},{"CIT_ID":"525c2bcc-01bc-4ffa-9a8c-7913f750b147","STA_ID":"19","CIT_NAME":"SUAZA","CIT_CODE":76},{"CIT_ID":"526160c0-7126-4d4e-89a6-2035bca1eda9","STA_ID":"40","CIT_NAME":"PUERTO RONDON","CIT_CODE":20},{"CIT_ID":"5288d163-d96e-4084-ae86-ee9cf89e6415","STA_ID":"88","CIT_NAME":"ESPA?A","CIT_CODE":355},{"CIT_ID":"528dac77-b774-46d3-a0a3-767f10abd900","STA_ID":"5","CIT_NAME":"SANTA CATALINA","CIT_CODE":91},{"CIT_ID":"529e3882-78b1-40f6-b6a7-472d0ff7f41d","STA_ID":"7","CIT_NAME":"SUTATENZA","CIT_CODE":292},{"CIT_ID":"52eef7cb-b9c6-4ca1-ad75-2b0a3ffdafc3","STA_ID":"12","CIT_NAME":"SAN MARTIN","CIT_CODE":875},{"CIT_ID":"53276f4e-7dcf-4d17-8214-e624ada53b67","STA_ID":"31","CIT_NAME":"ANSERMANUEVO","CIT_CODE":10},{"CIT_ID":"53840da6-a5a4-430c-96a9-183949ea719b","STA_ID":"88","CIT_NAME":"ITALIA","CIT_CODE":495},{"CIT_ID":"53883318-3ec5-4a0c-bcff-21e23cf884b7","STA_ID":"7","CIT_NAME":"TUTA","CIT_CODE":328},{"CIT_ID":"54267010-5bec-4a29-8299-475ff668086d","STA_ID":"11","CIT_NAME":"TIMBIO","CIT_CODE":88},{"CIT_ID":"5426d6c5-9cd1-4e68-b494-ceffc4d4ee1e","STA_ID":"1","CIT_NAME":"ANZA","CIT_CODE":34},{"CIT_ID":"545b0236-4cfa-4088-a79f-160e04cf812b","STA_ID":"7","CIT_NAME":"SOGAMOSO","CIT_CODE":277},{"CIT_ID":"54eca2af-910a-423d-9daa-4106deb0d5a2","STA_ID":"13","CIT_NAME":"MO?ITOS","CIT_CODE":27},{"CIT_ID":"5510ab2c-6c5c-4f6c-94eb-d8f15bebd691","STA_ID":"3","CIT_NAME":"BARRANQUILLA","CIT_CODE":1},{"CIT_ID":"5560e76e-bac6-4b4f-a9db-2309376a4e4b","STA_ID":"27","CIT_NAME":"PUERTO PARRA","CIT_CODE":167},{"CIT_ID":"559bcc87-bbb1-4e61-a46c-05c931ce3ed7","STA_ID":"88","CIT_NAME":"BULGARIA","CIT_CODE":230},{"CIT_ID":"55ec0b73-91bb-4f32-9555-84dbedda1984","STA_ID":"15","CIT_NAME":"SUESCA","CIT_CODE":259},{"CIT_ID":"55fde16a-f3e2-4c9d-b0a5-bdb155aa8787","STA_ID":"13","CIT_NAME":"SAHAGUN","CIT_CODE":37},{"CIT_ID":"560ff727-2ccb-4589-94bb-6ba80564a7ea","STA_ID":"1","CIT_NAME":"CARACOLI","CIT_CODE":78},{"CIT_ID":"56635383-86ba-4c32-bac2-b26b8900b0b2","STA_ID":"23","CIT_NAME":"SAN PABLO","CIT_CODE":124},{"CIT_ID":"56be0d61-88d4-41fa-aff2-54b0ea939189","STA_ID":"17","CIT_NAME":"ISTMINA","CIT_CODE":19},{"CIT_ID":"56e68725-1405-475a-938d-02c85d339520","STA_ID":"7","CIT_NAME":"SUTAMARCHAN","CIT_CODE":289},{"CIT_ID":"56e9fa35-7710-4818-928c-e4e922886ccb","STA_ID":"1","CIT_NAME":"SANTUARIO","CIT_CODE":256},{"CIT_ID":"57433f53-af1a-4735-8fbf-d961ffbf3150","STA_ID":"40","CIT_NAME":"SARAVENA","CIT_CODE":25},{"CIT_ID":"5743d9a0-3048-409c-b548-c0e6dbeb262e","STA_ID":"27","CIT_NAME":"SAN MIGUEL","CIT_CODE":190},{"CIT_ID":"5751c2c6-6d0e-4aa8-880d-c43df8f95f51","STA_ID":"25","CIT_NAME":"EL ZULIA","CIT_CODE":38},{"CIT_ID":"576b4c47-2658-4450-acb5-0787b69d7429","STA_ID":"19","CIT_NAME":"PITAL","CIT_CODE":58},{"CIT_ID":"57842285-0198-4a06-8cce-29135aee0a4e","STA_ID":"5","CIT_NAME":"SIMITI","CIT_CODE":97},{"CIT_ID":"57d8980f-d965-44ec-9c08-44951209fb4f","STA_ID":"11","CIT_NAME":"MERCADERES","CIT_CODE":46},{"CIT_ID":"587aeef5-c7d5-464f-bab6-2bbd524f43cb","STA_ID":"88","CIT_NAME":"TAILANDIA","CIT_CODE":765},{"CIT_ID":"58a289ba-7cfd-4789-ab65-c202014c3c77","STA_ID":"27","CIT_NAME":"CHIPATA","CIT_CODE":70},{"CIT_ID":"58f42c5e-72ad-422a-9473-148e38c8d4bd","STA_ID":"27","CIT_NAME":"CABRERA","CIT_CODE":28},{"CIT_ID":"595c5cec-d397-47a1-8b16-f47e081f183c","STA_ID":"27","CIT_NAME":"ZAPATOCA","CIT_CODE":223},{"CIT_ID":"59ae6645-af09-4312-ac6e-a555208bf448","STA_ID":"11","CIT_NAME":"CALDONO","CIT_CODE":16},{"CIT_ID":"59b40323-1c76-4690-9ba5-2db0fcc4d595","STA_ID":"60","CIT_NAME":"MIRITI PARANA","CIT_CODE":19},{"CIT_ID":"5a1647af-b2fd-46d4-ba9e-7f1c99c4cd28","STA_ID":"17","CIT_NAME":"TADO","CIT_CODE":43},{"CIT_ID":"5a1e75de-1d5e-42b6-afec-0f21aa2c8cbf","STA_ID":"15","CIT_NAME":"PASCA","CIT_CODE":199},{"CIT_ID":"5a5d7909-6d1b-4b63-a2d8-52c07323a610","STA_ID":"31","CIT_NAME":"DAGUA","CIT_CODE":37},{"CIT_ID":"5a8c9dad-8fe7-4151-b565-5e0c00d8ba6d","STA_ID":"31","CIT_NAME":"BUGA","CIT_CODE":22},{"CIT_ID":"5a922cbd-1a54-4c54-97da-192ce25285d4","STA_ID":"3","CIT_NAME":"PUERTO COLOMBIA","CIT_CODE":37},{"CIT_ID":"5af30f24-a2eb-448d-8568-2598ee635dcc","STA_ID":"48","CIT_NAME":"HATONUEVO","CIT_CODE":9},{"CIT_ID":"5af35e89-6301-4efd-a97f-6d358378d3f9","STA_ID":"88","CIT_NAME":"AFRICA","CIT_CODE":115},{"CIT_ID":"5b1f1dba-8685-4259-a599-69fd59752555","STA_ID":"52","CIT_NAME":"PUERTO RICO","CIT_CODE":49},{"CIT_ID":"5b4e1d1f-35d8-4a52-b185-040e70094a90","STA_ID":"25","CIT_NAME":"LA ESPERANZA","CIT_CODE":51},{"CIT_ID":"5b8ed8bb-059f-4484-ba34-05c44678ef9e","STA_ID":"29","CIT_NAME":"CASABIANCA","CIT_CODE":28},{"CIT_ID":"5be157eb-1dcb-4880-bcd4-2199e714076a","STA_ID":"13","CIT_NAME":"BUENAVISTA","CIT_CODE":7},{"CIT_ID":"5c007ca1-46d7-48a8-9160-ec9991b2f249","STA_ID":"52","CIT_NAME":"CABUYARO","CIT_CODE":8},{"CIT_ID":"5c1cedfd-7833-48d8-9c5f-0ab68788e05c","STA_ID":"29","CIT_NAME":"ICONONZO","CIT_CODE":67},{"CIT_ID":"5c379e71-ec2e-4298-b040-328d61e27bca","STA_ID":"17","CIT_NAME":"SIPI","CIT_CODE":40},{"CIT_ID":"5c43929a-601c-40e1-ad6b-428e9bec52c4","STA_ID":"1","CIT_NAME":"BARBOSA","CIT_CODE":43},{"CIT_ID":"5c7a2965-1087-4442-b165-d61e87a1d8b6","STA_ID":"24","CIT_NAME":"BALBOA","CIT_CODE":13},{"CIT_ID":"5c8ecb21-3c45-4b9b-b170-564921be0499","STA_ID":"28","CIT_NAME":"GALERAS (NUEVA GRANADA)","CIT_CODE":48},{"CIT_ID":"5ccca7a2-f9f2-46ca-98e3-30168a8bdb99","STA_ID":"1","CIT_NAME":"LA ESTRELLA","CIT_CODE":166},{"CIT_ID":"5cdd6a5d-74ee-4884-8245-0c0f719b9165","STA_ID":"5","CIT_NAME":"ALTOS DEL ROSARIO","CIT_CODE":6},{"CIT_ID":"5d3cb431-3dbd-4695-a07e-7b769549b208","STA_ID":"19","CIT_NAME":"TERUEL","CIT_CODE":85},{"CIT_ID":"5d582bc3-c2e5-4255-94ae-f3256cecdb08","STA_ID":"88","CIT_NAME":"PANAMA","CIT_CODE":655},{"CIT_ID":"5d65fa20-4e03-4799-9cba-f3a4decabac6","STA_ID":"27","CIT_NAME":"GIRON","CIT_CODE":91},{"CIT_ID":"5d7c63da-c902-46a6-b5aa-29f86ed6699b","STA_ID":"46","CIT_NAME":"MANI","CIT_CODE":520},{"CIT_ID":"5d84f99d-d778-4560-a20b-d4d8510196f1","STA_ID":"9","CIT_NAME":"CHINCHINA","CIT_CODE":34},{"CIT_ID":"5da1edae-bcde-4194-840c-8616fdb61ecc","STA_ID":"21","CIT_NAME":"SALAMINA","CIT_CODE":67},{"CIT_ID":"5da2df51-68c0-4c74-8242-45e3072d32d3","STA_ID":"1","CIT_NAME":"SAN LUIS","CIT_CODE":232},{"CIT_ID":"5db82ab1-414e-4dbd-9e70-dbb1bee4d896","STA_ID":"52","CIT_NAME":"URIBE","CIT_CODE":74},{"CIT_ID":"5e2c3d96-50a6-4893-971c-0f5cbd41251c","STA_ID":"23","CIT_NAME":"CUMBAL","CIT_CODE":37},{"CIT_ID":"5e9ae98d-0aa0-43b3-9298-ba3eb7a447fe","STA_ID":"7","CIT_NAME":"BETEITIVA","CIT_CODE":19},{"CIT_ID":"5eac1264-ae43-4206-ba8e-065872463ed6","STA_ID":"25","CIT_NAME":"CUCUTILLA","CIT_CODE":25},{"CIT_ID":"5ecb8c0f-6572-472f-9375-80d183bd9f53","STA_ID":"60","CIT_NAME":"LA VICTORIA","CIT_CODE":17},{"CIT_ID":"5f85dfcd-60f8-4537-91c6-5437d6be962b","STA_ID":"25","CIT_NAME":"HERRAN","CIT_CODE":46},{"CIT_ID":"5fea1c1e-c1b3-4f30-823f-bd1c8d081666","STA_ID":"88","CIT_NAME":"AUSTRALIA","CIT_CODE":165},{"CIT_ID":"605ea99b-a169-48ea-9bb6-1b58434d881a","STA_ID":"3","CIT_NAME":"BARANOA","CIT_CODE":4},{"CIT_ID":"60e4af6d-61c2-4d9b-81ff-23dcc2fdeadd","STA_ID":"21","CIT_NAME":"ALGARROBO","CIT_CODE":8},{"CIT_ID":"61295152-e9f7-47d5-b2bd-62e99d562eb7","STA_ID":"29","CIT_NAME":"SANTA ISABEL","CIT_CODE":112},{"CIT_ID":"612d4bd6-b6b4-4668-a0f7-eb16880939d4","STA_ID":"17","CIT_NAME":"NOVITA","CIT_CODE":28},{"CIT_ID":"6156d43b-59bd-4924-83d7-0873a1a38ad5","STA_ID":"11","CIT_NAME":"VILLA RICA","CIT_CODE":98},{"CIT_ID":"61baeb38-8bda-4b8c-b78f-8f1e71441c78","STA_ID":"21","CIT_NAME":"SANTA BARBARA DE PINTO","CIT_CODE":78},{"CIT_ID":"61c85a30-cf96-425b-8c58-3e30c5eed497","STA_ID":"12","CIT_NAME":"EL COPEY","CIT_CODE":410},{"CIT_ID":"61d82183-d4e3-489e-aa26-8c6e4de1d036","STA_ID":"5","CIT_NAME":"SANTA ROSA DEL SUR","CIT_CODE":95},{"CIT_ID":"61da3542-d0b7-44bd-bdec-d3cb2e6831cb","STA_ID":"9","CIT_NAME":"SUPIA","CIT_CODE":124},{"CIT_ID":"62020e9b-f902-4807-b6d5-ef28c2357004","STA_ID":"7","CIT_NAME":"GUATEQUE","CIT_CODE":106},{"CIT_ID":"625f7c4c-0a99-4a5c-a4c9-b3eb6565a8c4","STA_ID":"31","CIT_NAME":"VERSALLES","CIT_CODE":112},{"CIT_ID":"628fe00a-03ac-4d84-a91a-1b4e2446d1a7","STA_ID":"1","CIT_NAME":"TOLEDO","CIT_CODE":277},{"CIT_ID":"62ee9cf1-d77b-4bdc-bec3-c88cb187f812","STA_ID":"5","CIT_NAME":"REGIDOR","CIT_CODE":63},{"CIT_ID":"631e1b33-c3e7-46ae-b99f-8c02b59ca412","STA_ID":"9","CIT_NAME":"ARANZAZU","CIT_CODE":13},{"CIT_ID":"632f51da-0c4a-47a9-aaa5-ddea78e1a4f3","STA_ID":"15","CIT_NAME":"SAN CAYETANO","CIT_CODE":226},{"CIT_ID":"638de6bb-0c54-496d-bbc5-b5d43eb74073","STA_ID":"1","CIT_NAME":"CAMPAMENTO","CIT_CODE":73},{"CIT_ID":"63c67c63-16f7-4262-991c-47ad8571a01a","STA_ID":"9","CIT_NAME":"NORCASIA","CIT_CODE":78},{"CIT_ID":"63cc0ef0-3ca1-4963-bf78-e5c9efa0163a","STA_ID":"46","CIT_NAME":"HATO COROZAL","CIT_CODE":320},{"CIT_ID":"64028542-1edf-4507-92a7-578b17b6e1ff","STA_ID":"21","CIT_NAME":"CIENAGA","CIT_CODE":16},{"CIT_ID":"64064100-e051-49bb-8005-5fbf406c0173","STA_ID":"28","CIT_NAME":"SINCE","CIT_CODE":260},{"CIT_ID":"6462660f-a97d-4b82-b883-fe9c2ff6425e","STA_ID":"23","CIT_NAME":"RICAURTE","CIT_CODE":109},{"CIT_ID":"648e6cf9-4f0b-4be2-bbee-dccbe608c7ac","STA_ID":"25","CIT_NAME":"LOS PATIOS","CIT_CODE":54},{"CIT_ID":"64eff993-1403-427e-aff7-547ddcc31a45","STA_ID":"26","CIT_NAME":"LA TEBAIDA","CIT_CODE":50},{"CIT_ID":"6577150f-66ba-4cb4-b682-f6b1011ef105","STA_ID":"7","CIT_NAME":"SAN MATEO","CIT_CODE":247},{"CIT_ID":"6598c126-0df4-4c05-948e-9a4381ebd53a","STA_ID":"68","CIT_NAME":"BUENOS AIRES (PACOA)","CIT_CODE":13},{"CIT_ID":"6634bf4c-9bdb-4df3-9f79-baa489ee2b62","STA_ID":"17","CIT_NAME":"EL CARMEN","CIT_CODE":16},{"CIT_ID":"664b8fe0-5e88-4fdd-8d10-6ca175b48b42","STA_ID":"88","CIT_NAME":"ISRAEL","CIT_CODE":490},{"CIT_ID":"6679f133-60a1-4ee0-b49c-ca915c629096","STA_ID":"88","CIT_NAME":"URUGUAY","CIT_CODE":805},{"CIT_ID":"66f43ae0-efb3-4aaa-9f18-6cd7990d3cfe","STA_ID":"1","CIT_NAME":"URAMITA","CIT_CODE":282},{"CIT_ID":"67332d1a-0aec-4453-9d7b-ab1ad972953c","STA_ID":"28","CIT_NAME":"PALMITO","CIT_CODE":120},{"CIT_ID":"6751bc50-21a5-404c-88b2-5115767ac7a8","STA_ID":"88","CIT_NAME":"PARAGUAY","CIT_CODE":665},{"CIT_ID":"675bd390-90c1-4f95-90ab-68272fa98c65","STA_ID":"64","CIT_NAME":"PUERTO LEGUIZAMO","CIT_CODE":4},{"CIT_ID":"67714abb-1d9f-49e6-81e5-aa180a23193c","STA_ID":"48","CIT_NAME":"ALBANIA","CIT_CODE":2},{"CIT_ID":"6777c23e-648b-4f3f-8d3f-c9d8ab37485d","STA_ID":"7","CIT_NAME":"PAEZ","CIT_CODE":179},{"CIT_ID":"67d4b9e4-d286-47ab-abb1-267f2f150dc1","STA_ID":"17","CIT_NAME":"LLORO","CIT_CODE":25},{"CIT_ID":"67f08013-baac-4d4a-9739-d8a19d3c13ab","STA_ID":"15","CIT_NAME":"LA CALERA","CIT_CODE":139},{"CIT_ID":"67f4ede1-ff66-4381-86f4-866ae80f26fe","STA_ID":"29","CIT_NAME":"HONDA","CIT_CODE":64},{"CIT_ID":"6856304a-5ed1-4516-8a1c-607406637cb5","STA_ID":"88","CIT_NAME":"SUIZA","CIT_CODE":760},{"CIT_ID":"68665214-dca7-46ab-9388-101c68ed6e86","STA_ID":"7","CIT_NAME":"CHIQUINQUIRA","CIT_CODE":67},{"CIT_ID":"68bc3b7a-4680-405b-afa6-5bdf59fe3478","STA_ID":"19","CIT_NAME":"SALADOBLANCO","CIT_CODE":67},{"CIT_ID":"69123f9e-9e3a-4daa-8200-7abe19e9336a","STA_ID":"1","CIT_NAME":"BETANIA","CIT_CODE":52},{"CIT_ID":"6928556b-da5a-4478-b3bb-3518424831c4","STA_ID":"27","CIT_NAME":"SUCRE","CIT_CODE":205},{"CIT_ID":"694de504-e133-4bfe-9a21-e20e5050aabb","STA_ID":"27","CIT_NAME":"PALMAR","CIT_CODE":151},{"CIT_ID":"69731b6d-38ff-49fb-bc17-aed7a3cd6ef7","STA_ID":"19","CIT_NAME":"RIVERA","CIT_CODE":64},{"CIT_ID":"69c1b76f-e986-4a62-a286-876c08d66c33","STA_ID":"29","CIT_NAME":"PRADO","CIT_CODE":91},{"CIT_ID":"6a05d4cb-fc2d-4d7e-8674-0c91c0aed966","STA_ID":"13","CIT_NAME":"TUCHIN","CIT_CODE":60},{"CIT_ID":"6a5de51b-16d7-4820-af97-9a477223c067","STA_ID":"15","CIT_NAME":"FOSCA","CIT_CODE":85},{"CIT_ID":"6a660a88-c277-4d56-813c-f07d82fa3a55","STA_ID":"7","CIT_NAME":"CERINZA","CIT_CODE":43},{"CIT_ID":"6aa69538-2eb0-46d6-95e3-237fd2449833","STA_ID":"88","CIT_NAME":"LIBANO","CIT_CODE":535},{"CIT_ID":"6ad731ac-d1cc-4593-9ae2-cae23f6fce77","STA_ID":"27","CIT_NAME":"CEPITA","CIT_CODE":40},{"CIT_ID":"6b8d557a-a2af-4e4b-99be-082835d30200","STA_ID":"1","CIT_NAME":"CONCEPCION","CIT_CODE":97},{"CIT_ID":"6b9262fb-d9b1-41af-aa66-094bbc310f88","STA_ID":"46","CIT_NAME":"OROCUE","CIT_CODE":640},{"CIT_ID":"6b9c64d6-2820-417b-8a3c-fd96a4ea103d","STA_ID":"5","CIT_NAME":"EL GUAMO","CIT_CODE":25},{"CIT_ID":"6bdb0d84-dfdd-4a11-9f5c-673bc6a7d2fb","STA_ID":"29","CIT_NAME":"FLANDES","CIT_CODE":52},{"CIT_ID":"6be8b45a-1157-472b-8500-99168c230301","STA_ID":"15","CIT_NAME":"TIBIRITA","CIT_CODE":286},{"CIT_ID":"6bf94071-de22-49ec-8a4a-e8d463bec8d3","STA_ID":"27","CIT_NAME":"SAN JOAQUIN","CIT_CODE":184},{"CIT_ID":"6c7f038d-6273-4da2-8ff9-0f817925f956","STA_ID":"7","CIT_NAME":"TIBANA","CIT_CODE":304},{"CIT_ID":"6cbf903e-750a-420b-975a-91646e86ae8b","STA_ID":"11","CIT_NAME":"POPAYAN","CIT_CODE":1},{"CIT_ID":"6cf291b5-bdcf-465d-8d75-7cc99d106cc3","STA_ID":"28","CIT_NAME":"MORROA","CIT_CODE":80},{"CIT_ID":"6d054084-8723-44c7-91c5-312fd5b3178d","STA_ID":"52","CIT_NAME":"SAN JUAN DE ARAMA","CIT_CODE":58},{"CIT_ID":"6d20c00d-5b11-4e5d-b0a7-beb7b8e88a2e","STA_ID":"1","CIT_NAME":"TURBO","CIT_CODE":280},{"CIT_ID":"6d4dfd8a-3e13-4cac-a764-dcb0e4b1b582","STA_ID":"15","CIT_NAME":"GRANADA","CIT_CODE":132},{"CIT_ID":"6d685167-37a9-4124-9d3d-e74b743de343","STA_ID":"23","CIT_NAME":"YACUANQUER","CIT_CODE":145},{"CIT_ID":"6d7133ee-cf42-4498-b7c8-8aef4634fb1e","STA_ID":"27","CIT_NAME":"EL PLAYON","CIT_CODE":74},{"CIT_ID":"6ed8b862-2799-4a1f-859d-ccdf9ecaf86d","STA_ID":"11","CIT_NAME":"ARGELIA","CIT_CODE":5},{"CIT_ID":"6f07a28a-61e9-4b03-a5e5-3d8927da3948","STA_ID":"52","CIT_NAME":"CASTILLA LA NUEVA","CIT_CODE":10},{"CIT_ID":"6fabf2c5-439f-47d8-b0a5-2c82bf4089f8","STA_ID":"7","CIT_NAME":"SANTA ROSA DE VITERBO","CIT_CODE":253},{"CIT_ID":"6fcfd54d-0144-410b-aae6-7cf8c4f71487","STA_ID":"29","CIT_NAME":"SAN LUIS","CIT_CODE":109},{"CIT_ID":"6feafd04-0a18-4e18-bcb9-af3cd4fb5f99","STA_ID":"11","CIT_NAME":"SUCRE","CIT_CODE":86},{"CIT_ID":"702512ab-f1a9-4a44-afd1-76b3a67504e4","STA_ID":"17","CIT_NAME":"CERTEGUI","CIT_CODE":14},{"CIT_ID":"70349574-8939-4f96-8b8d-2c1ee151866e","STA_ID":"23","CIT_NAME":"TAMINANGO","CIT_CODE":133},{"CIT_ID":"70adfc38-8871-4013-9382-601fc2fcf31f","STA_ID":"7","CIT_NAME":"BRICE?O","CIT_CODE":28},{"CIT_ID":"7154ea06-c215-4dbb-803a-1ccf02db705f","STA_ID":"12","CIT_NAME":"SAN DIEGO","CIT_CODE":850},{"CIT_ID":"716d17e6-a055-4e50-8a13-55529efb4b40","STA_ID":"13","CIT_NAME":"PLANETA RICA","CIT_CODE":28},{"CIT_ID":"71aa710a-450b-419d-aacb-91ead6f20ce7","STA_ID":"64","CIT_NAME":"MOCOA","CIT_CODE":1},{"CIT_ID":"71e93083-0c88-4f07-8ad6-c6f0ccd57b67","STA_ID":"1","CIT_NAME":"SAN PEDRO DE URABA","CIT_CODE":237},{"CIT_ID":"71f8da26-a928-405e-a31c-23b02948777e","STA_ID":"26","CIT_NAME":"CORDOBA","CIT_CODE":25},{"CIT_ID":"71fa20ba-f228-497a-9834-701df3212244","STA_ID":"9","CIT_NAME":"PACORA","CIT_CODE":79},{"CIT_ID":"720478fa-4746-4ed0-9f23-dba230166768","STA_ID":"52","CIT_NAME":"BARRANCA DE UPIA","CIT_CODE":6},{"CIT_ID":"7204d659-7e12-4fab-a96a-99db8851d642","STA_ID":"27","CIT_NAME":"BOLIVAR","CIT_CODE":25},{"CIT_ID":"7258e047-3827-4fe1-bf6a-e2e8df9eac7a","STA_ID":"7","CIT_NAME":"FIRAVITOBA","CIT_CODE":88},{"CIT_ID":"7263ceed-3ba1-4156-9594-9fb37596d2ee","STA_ID":"7","CIT_NAME":"DUITAMA","CIT_CODE":79},{"CIT_ID":"72722f27-2a98-4554-9981-adae45bb4710","STA_ID":"88","CIT_NAME":"FILIPINAS","CIT_CODE":370},{"CIT_ID":"72c06286-8a63-454a-9314-59d380723597","STA_ID":"1","CIT_NAME":"FREDONIA","CIT_CODE":124},{"CIT_ID":"72dd1ced-39df-48fa-9771-b653c22c3aba","STA_ID":"19","CIT_NAME":"ACEVEDO","CIT_CODE":4},{"CIT_ID":"730764b3-f67b-43a3-a9e6-990bc5b9bce1","STA_ID":"15","CIT_NAME":"VIANI","CIT_CODE":322},{"CIT_ID":"7329ab5c-f5e5-439d-b065-1c4dffb620bb","STA_ID":"15","CIT_NAME":"GUAYABETAL","CIT_CODE":128},{"CIT_ID":"7389be65-a1ec-407e-abde-9565b48ac9d8","STA_ID":"11","CIT_NAME":"PUERTO TEJADA","CIT_CODE":64},{"CIT_ID":"73b41936-2197-46b7-b6eb-2a7a57ce3032","STA_ID":"88","CIT_NAME":"GUATEMALA","CIT_CODE":410},{"CIT_ID":"73f7b2d8-c28c-41f7-be03-4124d3b86581","STA_ID":"11","CIT_NAME":"JAMBALO","CIT_CODE":34},{"CIT_ID":"7410b0ee-b342-4bac-b8ac-67cce53df4e1","STA_ID":"12","CIT_NAME":"GONZALEZ","CIT_CODE":525},{"CIT_ID":"743b7cd1-a75f-435e-b71e-ecd450b9cae0","STA_ID":"5","CIT_NAME":"MARIA LA BAJA","CIT_CODE":40},{"CIT_ID":"7452ea17-a9e7-48cc-a095-fcb767339ad8","STA_ID":"88","CIT_NAME":"FINLANDIA","CIT_CODE":375},{"CIT_ID":"74666bd9-4077-468a-87e5-0fd2e410fc3d","STA_ID":"7","CIT_NAME":"MUZO","CIT_CODE":163},{"CIT_ID":"74985980-f254-4d5c-90f1-3a81df8c8287","STA_ID":"31","CIT_NAME":"RESTREPO","CIT_CODE":85},{"CIT_ID":"74a67def-9562-4c21-ad84-2d63fce2f138","STA_ID":"21","CIT_NAME":"SABANAS DE SAN ANGEL","CIT_CODE":60},{"CIT_ID":"74b51b80-3e21-4951-aa84-0b5a62abff30","STA_ID":"60","CIT_NAME":"PUERTO ALEGRIA","CIT_CODE":30},{"CIT_ID":"74cf4493-b746-4b89-a2b6-0fcbd3e2f5e1","STA_ID":"7","CIT_NAME":"NUEVO COLON","CIT_CODE":169},{"CIT_ID":"74d70e59-839a-4dee-8592-3e5cceed336f","STA_ID":"26","CIT_NAME":"SALENTO","CIT_CODE":90},{"CIT_ID":"74f28fa2-e615-49d4-b568-ba91a137f2b9","STA_ID":"15","CIT_NAME":"COGUA","CIT_CODE":43},{"CIT_ID":"753b6f53-e85c-423c-b68c-fce8b1a90f3d","STA_ID":"88","CIT_NAME":"JAMAICA","CIT_CODE":500},{"CIT_ID":"75c5851c-b6ac-45dd-a026-e97a73dc78a7","STA_ID":"9","CIT_NAME":"MARMATO","CIT_CODE":58},{"CIT_ID":"75cf8a4c-99b9-41b3-aef0-645a032d6f44","STA_ID":"23","CIT_NAME":"SAN PEDRO DE CARTAGO","CIT_CODE":123},{"CIT_ID":"7610c2a3-733e-42bd-a722-ffde2f72f002","STA_ID":"5","CIT_NAME":"SAN JACINTO","CIT_CODE":76},{"CIT_ID":"76224b2e-fdd3-458a-b208-9a6f9607780d","STA_ID":"23","CIT_NAME":"TUMACO","CIT_CODE":139},{"CIT_ID":"76349312-72b0-43d0-9d04-528baf1fd3b6","STA_ID":"31","CIT_NAME":"TULUA","CIT_CODE":106},{"CIT_ID":"76625536-ed15-48f4-a49d-3681194785de","STA_ID":"21","CIT_NAME":"ZAPAYAN","CIT_CODE":90},{"CIT_ID":"76d29078-36b6-4893-a1e3-8805840b7a84","STA_ID":"15","CIT_NAME":"JUNIN","CIT_CODE":136},{"CIT_ID":"77234826-991a-400a-b119-f141ff4507b7","STA_ID":"5","CIT_NAME":"CALAMAR","CIT_CODE":13},{"CIT_ID":"773692de-94d0-4397-af31-225d2882c4de","STA_ID":"27","CIT_NAME":"MOGOTES","CIT_CODE":136},{"CIT_ID":"7747db94-6c4c-42bf-8718-6bad052a915a","STA_ID":"27","CIT_NAME":"CIMITARRA","CIT_CODE":45},{"CIT_ID":"776967b6-3446-41e9-bc0a-99a2a86ee5bc","STA_ID":"15","CIT_NAME":"VILLETA","CIT_CODE":328},{"CIT_ID":"7771d524-c063-4a15-a2a6-e98df3ae7c16","STA_ID":"50","CIT_NAME":"BARRANCO MINAS","CIT_CODE":70},{"CIT_ID":"7775cfb8-ab2a-4ede-9792-3bf124067458","STA_ID":"27","CIT_NAME":"CHARALA","CIT_CODE":61},{"CIT_ID":"77af6b57-0ac9-47bb-903b-7c9c59c59da9","STA_ID":"28","CIT_NAME":"SUCRE","CIT_CODE":280},{"CIT_ID":"78414948-ecf1-4cb7-b217-0936b56f70e0","STA_ID":"68","CIT_NAME":"MORICHAL (PAPUNAGUA)","CIT_CODE":10},{"CIT_ID":"78497f43-7a63-47bd-96f6-eeca2e032570","STA_ID":"29","CIT_NAME":"PALOCABILDO","CIT_CODE":87},{"CIT_ID":"7897b229-ad33-4cfd-b8a6-c406806f5c96","STA_ID":"5","CIT_NAME":"SAN MARTIN DE LOBA","CIT_CODE":82},{"CIT_ID":"78bd7903-20d6-4b27-8510-6967c9bd9440","STA_ID":"25","CIT_NAME":"BOCHALEMA","CIT_CODE":10},{"CIT_ID":"78c7c5ca-7f7b-4143-a4c8-35b6f35b32eb","STA_ID":"1","CIT_NAME":"YONDO-CASABE","CIT_CODE":300},{"CIT_ID":"79172832-4a53-4dde-9485-d5bc67d232ba","STA_ID":"1","CIT_NAME":"VALDIVIA","CIT_CODE":286},{"CIT_ID":"791fb975-233f-46af-b4d7-c729922e5c40","STA_ID":"44","CIT_NAME":"MILAN","CIT_CODE":16},{"CIT_ID":"792083cc-5998-4573-a750-13026bacf848","STA_ID":"1","CIT_NAME":"GRANADA","CIT_CODE":139},{"CIT_ID":"793fdf81-9812-461f-8224-646b43905e16","STA_ID":"15","CIT_NAME":"GUTIERREZ","CIT_CODE":130},{"CIT_ID":"796be384-0b4a-4791-8698-9d3b72d801b1","STA_ID":"1","CIT_NAME":"ITUANGO","CIT_CODE":154},{"CIT_ID":"7990613a-5746-4604-b125-2f4cb39240e7","STA_ID":"1","CIT_NAME":"VEGACHI","CIT_CODE":290},{"CIT_ID":"79a230ec-9f7a-4848-887b-50bf95e6c4ad","STA_ID":"1","CIT_NAME":"CAICEDO","CIT_CODE":67},{"CIT_ID":"79d51931-f934-4f2e-b0dd-f9130711b8fb","STA_ID":"5","CIT_NAME":"CLEMENCIA","CIT_CODE":18},{"CIT_ID":"7a497e28-1444-4821-a33f-51a1cbc5c6dd","STA_ID":"25","CIT_NAME":"LOURDES","CIT_CODE":55},{"CIT_ID":"7b9da129-e75c-4136-acc3-89797036c22a","STA_ID":"23","CIT_NAME":"EL CHARCO","CIT_CODE":41},{"CIT_ID":"7bac7a3b-7d52-4dd3-8c74-35822f2f7c53","STA_ID":"15","CIT_NAME":"CHAGUANI","CIT_CODE":52},{"CIT_ID":"7bd14b59-a53b-48e5-ba74-aa4fc1bba27b","STA_ID":"7","CIT_NAME":"LA VICTORIA","CIT_CODE":137},{"CIT_ID":"7be452f4-b821-4423-adce-17abf289cb96","STA_ID":"1","CIT_NAME":"LA PINTADA","CIT_CODE":170},{"CIT_ID":"7bf2a137-171f-4199-b558-2f154b75658d","STA_ID":"29","CIT_NAME":"VILLARRICA","CIT_CODE":127},{"CIT_ID":"7c04bc7e-9602-4ae8-873f-afc5b6e12156","STA_ID":"23","CIT_NAME":"IMUES","CIT_CODE":64},{"CIT_ID":"7c05da5c-af3f-44f2-9b48-bed96b578ee6","STA_ID":"29","CIT_NAME":"ARMERO (GUAYABAL)","CIT_CODE":16},{"CIT_ID":"7c07ff94-6bfb-4be4-99d7-aef1abfb7e30","STA_ID":"9","CIT_NAME":"RISARALDA","CIT_CODE":106},{"CIT_ID":"7c68f7a2-b8be-4fbe-8f01-b2aaf9b91d5a","STA_ID":"9","CIT_NAME":"FILADELFIA","CIT_CODE":37},{"CIT_ID":"7c794579-8b70-4ed6-bed1-13f6c847379f","STA_ID":"88","CIT_NAME":"KENIA","CIT_CODE":515},{"CIT_ID":"7c9e0643-43cb-404d-ab1e-5d2a2fe8717f","STA_ID":"7","CIT_NAME":"GUAYATA","CIT_CODE":109},{"CIT_ID":"7d067eec-d82e-45a8-a4b1-fd5b8047762b","STA_ID":"11","CIT_NAME":"ALMAGUER","CIT_CODE":4},{"CIT_ID":"7dac9939-ae71-4ab1-96c8-602864c54e8e","STA_ID":"7","CIT_NAME":"AQUITANIA (PUEBLOVIEJO)","CIT_CODE":8},{"CIT_ID":"7de4b0e2-9ab9-44a0-88b7-d95835879838","STA_ID":"1","CIT_NAME":"JERICO","CIT_CODE":160},{"CIT_ID":"7e329cd1-d457-49fa-b41b-ebcaf27b2cee","STA_ID":"31","CIT_NAME":"ARGELIA","CIT_CODE":13},{"CIT_ID":"7e5ab01d-b024-411d-a5ab-35f80812ea9e","STA_ID":"7","CIT_NAME":"CUCAITA","CIT_CODE":60},{"CIT_ID":"7e5fd5d7-ad9c-40b1-b15d-613ca8456250","STA_ID":"9","CIT_NAME":"MARQUETALIA","CIT_CODE":61},{"CIT_ID":"7e8806b7-f736-4d5e-bdd6-636cf4ba0301","STA_ID":"88","CIT_NAME":"RUSIA","CIT_CODE":700},{"CIT_ID":"7ea6ef4b-9497-4ba5-aeb6-bacf92651ee8","STA_ID":"1","CIT_NAME":"GUARNE","CIT_CODE":142},{"CIT_ID":"7ef0edf5-e702-4641-94be-87685768d4b1","STA_ID":"17","CIT_NAME":"BAHIA SOLANO (MUTIS)","CIT_CODE":8},{"CIT_ID":"7f124874-602f-48b4-a1c4-e7b430015527","STA_ID":"7","CIT_NAME":"ARCABUCO","CIT_CODE":10},{"CIT_ID":"7f3ed5aa-b0ae-43a9-880b-d253d7daf423","STA_ID":"15","CIT_NAME":"CACHIPAY","CIT_CODE":30},{"CIT_ID":"7f6c13ef-eaa6-471d-9b36-0908fd627982","STA_ID":"27","CIT_NAME":"VELEZ","CIT_CODE":220},{"CIT_ID":"7fa574f5-6e6c-418a-96c0-1bb09bc5fece","STA_ID":"7","CIT_NAME":"BOAVITA","CIT_CODE":22},{"CIT_ID":"7fbcdb3e-6b29-45aa-ba6d-7fb4708db723","STA_ID":"11","CIT_NAME":"BOLIVAR","CIT_CODE":7},{"CIT_ID":"7fc33029-952b-4f4f-b2da-fdb4af65243f","STA_ID":"15","CIT_NAME":"SUSA","CIT_CODE":265},{"CIT_ID":"7ff15aab-3ee7-4ca6-98db-c89602b4d8bc","STA_ID":"15","CIT_NAME":"FACATATIVA","CIT_CODE":76},{"CIT_ID":"8031fc6e-3b08-427c-a6c1-1e7836048d54","STA_ID":"11","CIT_NAME":"TORIBIO","CIT_CODE":94},{"CIT_ID":"80602484-964a-44cb-885b-8635ac247927","STA_ID":"28","CIT_NAME":"SAN PEDRO","CIT_CODE":240},{"CIT_ID":"80a411ea-9b6a-4053-b51a-17fb1e38fdee","STA_ID":"88","CIT_NAME":"ANTIGUA Y BARBUDA","CIT_CODE":125},{"CIT_ID":"80ba559c-22a9-499e-9574-215241c45338","STA_ID":"5","CIT_NAME":"ARROYO HONDO","CIT_CODE":9},{"CIT_ID":"80bbc604-e296-4123-948c-91de75bcb3df","STA_ID":"31","CIT_NAME":"EL CAIRO","CIT_CODE":46},{"CIT_ID":"810db487-0f2f-4db9-940c-2f9eff9bfa56","STA_ID":"27","CIT_NAME":"JESUS MARIA","CIT_CODE":112},{"CIT_ID":"8111e95d-d854-4049-b47e-1c6390b7dc1a","STA_ID":"7","CIT_NAME":"CHIVOR","CIT_CODE":78},{"CIT_ID":"811f416d-f43e-457e-baee-dcf8bf7a261c","STA_ID":"5","CIT_NAME":"SAN PABLO","CIT_CODE":84},{"CIT_ID":"81271e02-ea2d-4f20-a29d-46f4f841e197","STA_ID":"23","CIT_NAME":"LINARES","CIT_CODE":82},{"CIT_ID":"8136f314-cd9f-4d2f-9ee5-6bb66b3e6b3d","STA_ID":"15","CIT_NAME":"CUCUNUBA","CIT_CODE":49},{"CIT_ID":"82020fdb-c6a4-4021-a15c-ac2b9121fc15","STA_ID":"23","CIT_NAME":"COLON (GENOVA)","CIT_CODE":22},{"CIT_ID":"82314410-12ba-4775-91ae-0fe23522f113","STA_ID":"7","CIT_NAME":"PISBA","CIT_CODE":205},{"CIT_ID":"823bb122-dd35-439e-ac8e-2b09420675c2","STA_ID":"7","CIT_NAME":"COPER","CIT_CODE":52},{"CIT_ID":"823e730c-0546-425b-827e-b1f9439d7a4f","STA_ID":"26","CIT_NAME":"PIJAO","CIT_CODE":70},{"CIT_ID":"82e478bf-f04e-45ae-8d4e-e4c0b3c19cd1","STA_ID":"12","CIT_NAME":"RIO DE ORO","CIT_CODE":750},{"CIT_ID":"82eec373-6574-40a5-8861-2a4cc9f981c9","STA_ID":"7","CIT_NAME":"UMBITA","CIT_CODE":334},{"CIT_ID":"84060753-1e8d-4e47-bffa-d7354f8102c8","STA_ID":"40","CIT_NAME":"ARAUCA","CIT_CODE":1},{"CIT_ID":"841094f7-58ad-4cb8-8067-1ea9ab86c7c8","STA_ID":"11","CIT_NAME":"SOTARA (PAISPAMBA)","CIT_CODE":85},{"CIT_ID":"84272c66-2fed-4c2f-a465-ecbb0a1f2e6e","STA_ID":"64","CIT_NAME":"PUERTO CAICEDO","CIT_CODE":26},{"CIT_ID":"844bcc02-7506-40d4-a378-f63c4f9d9966","STA_ID":"88","CIT_NAME":"MEXICO","CIT_CODE":590},{"CIT_ID":"845db6dd-580e-4a53-8b4f-5ab5f8bbecc3","STA_ID":"88","CIT_NAME":"UCRANIA","CIT_CODE":780},{"CIT_ID":"849159d7-d02c-431b-bccd-64a5603a5924","STA_ID":"1","CIT_NAME":"SANTA BARBARA","CIT_CODE":247},{"CIT_ID":"84aeb4e9-b7f6-4532-b4d1-1a4b1761183a","STA_ID":"29","CIT_NAME":"FRESNO","CIT_CODE":55},{"CIT_ID":"854b4f67-3427-4693-b279-0d272b1cd7aa","STA_ID":"12","CIT_NAME":"MANAURE BALCON DEL CESAR (MANA","CIT_CODE":625},{"CIT_ID":"85ba570b-13e2-4813-be0f-254886475971","STA_ID":"27","CIT_NAME":"VALLE DE SAN JOSE","CIT_CODE":217},{"CIT_ID":"86385b62-5e63-4283-8abd-305bc16dfc3e","STA_ID":"31","CIT_NAME":"ALCALA","CIT_CODE":4},{"CIT_ID":"872b77f3-1566-45de-ac3d-f5c69dd6c937","STA_ID":"15","CIT_NAME":"MEDINA","CIT_CODE":166},{"CIT_ID":"8755b801-d905-47ac-919d-915044d01539","STA_ID":"15","CIT_NAME":"EL ROSAL","CIT_CODE":72},{"CIT_ID":"87923aaf-cded-43e0-b410-bdcc6ce77e34","STA_ID":"1","CIT_NAME":"PUERTO NARE-LA MAGDALENA","CIT_CODE":168},{"CIT_ID":"885e4b82-346e-42fe-99d3-225abbb6953c","STA_ID":"28","CIT_NAME":"BUENAVISTA","CIT_CODE":10},{"CIT_ID":"888cf69d-a217-4359-96b1-b154541e59b2","STA_ID":"12","CIT_NAME":"VALLEDUPAR","CIT_CODE":1},{"CIT_ID":"88b40bd3-a32b-4879-b237-e2ee42be1585","STA_ID":"29","CIT_NAME":"ATACO","CIT_CODE":19},{"CIT_ID":"89b7a1e2-0c81-4984-89ca-ec1e53be3992","STA_ID":"23","CIT_NAME":"IPIALES","CIT_CODE":67},{"CIT_ID":"89dc83b2-d559-477c-8378-5e6da621a528","STA_ID":"25","CIT_NAME":"MUTISCUA","CIT_CODE":58},{"CIT_ID":"89e7cb5c-cf1b-470d-9ea2-f7925ab5f716","STA_ID":"25","CIT_NAME":"TOLEDO","CIT_CODE":94},{"CIT_ID":"8a34300e-2f94-4dee-ac07-670dca75b5fa","STA_ID":"24","CIT_NAME":"QUINCHIA","CIT_CODE":78},{"CIT_ID":"8a56c19e-74e8-49d6-b409-d65bade199ef","STA_ID":"7","CIT_NAME":"SAN LUIS DE GACENO","CIT_CODE":241},{"CIT_ID":"8a5d31a8-f1b0-4bc5-9b08-1ed2c57e2e61","STA_ID":"17","CIT_NAME":"BAGADO","CIT_CODE":7},{"CIT_ID":"8accd29e-362c-4f79-a275-64f95f0af1da","STA_ID":"88","CIT_NAME":"PERU","CIT_CODE":670},{"CIT_ID":"8b14e06f-909d-437b-a9b8-d085188c9540","STA_ID":"19","CIT_NAME":"PALERMO","CIT_CODE":55},{"CIT_ID":"8c0ba7c8-6dab-4642-8384-99ec4ceab1ea","STA_ID":"7","CIT_NAME":"BERBEO","CIT_CODE":16},{"CIT_ID":"8c25328d-d294-4c43-824d-4fc951f24a6b","STA_ID":"31","CIT_NAME":"SAN PEDRO","CIT_CODE":94},{"CIT_ID":"8c2b1097-0d9c-4f61-857f-30504467ecb3","STA_ID":"26","CIT_NAME":"FILANDIA","CIT_CODE":30},{"CIT_ID":"8c3d23df-bf7b-41ba-ade7-32a6cee1012b","STA_ID":"88","CIT_NAME":"CUBA","CIT_CODE":290},{"CIT_ID":"8c3fa8f2-fba3-429f-bacf-ebbe0c9dc07f","STA_ID":"25","CIT_NAME":"VILLA CARO","CIT_CODE":97},{"CIT_ID":"8c9190eb-3ccb-4ac5-90b1-3fd9d3e6b3d5","STA_ID":"15","CIT_NAME":"GACHALA","CIT_CODE":97},{"CIT_ID":"8c921aa9-0ad7-4ef8-ab58-74f4071503f4","STA_ID":"15","CIT_NAME":"SIBATE","CIT_CODE":239},{"CIT_ID":"8cb2cab2-63a9-45cd-b863-1e78d5e911ad","STA_ID":"88","CIT_NAME":"IRLANDA","CIT_CODE":470},{"CIT_ID":"8cd47ec0-a384-49ec-82b6-894d2a9d186a","STA_ID":"25","CIT_NAME":"CHINACOTA","CIT_CODE":28},{"CIT_ID":"8cdfe651-0b61-44ed-9125-a6a383aa412a","STA_ID":"21","CIT_NAME":"PIVIJAY","CIT_CODE":49},{"CIT_ID":"8d415cc3-ccba-4921-a2d2-85d07cf7ef04","STA_ID":"1","CIT_NAME":"CAUCASIA","CIT_CODE":88},{"CIT_ID":"8d525fbc-ceab-4803-9847-cb046401580b","STA_ID":"25","CIT_NAME":"ABREGO","CIT_CODE":4},{"CIT_ID":"8d6011ff-3991-4687-87b0-4d1d5ee5612a","STA_ID":"25","CIT_NAME":"PAMPLONA","CIT_CODE":64},{"CIT_ID":"8da62ca9-0279-49b8-b9b7-34c062074ab1","STA_ID":"27","CIT_NAME":"ALBANIA","CIT_CODE":7},{"CIT_ID":"8e72befd-8f92-4187-9f58-3084ba64af16","STA_ID":"7","CIT_NAME":"VILLA DE LEIVA","CIT_CODE":139},{"CIT_ID":"8e8063e0-2e37-415e-b853-e28c801ff9f7","STA_ID":"1","CIT_NAME":"REMEDIOS","CIT_CODE":208},{"CIT_ID":"8e9cfbc9-ef2e-4995-9248-2bf44ee529b7","STA_ID":"1","CIT_NAME":"CONCORDIA","CIT_CODE":100},{"CIT_ID":"8ef76330-ec5f-4970-b22c-64525d0d0acb","STA_ID":"52","CIT_NAME":"FUENTE DE ORO","CIT_CODE":30},{"CIT_ID":"8f1b147f-dd3f-4663-8199-03b0c227f28e","STA_ID":"7","CIT_NAME":"MIRAFLORES","CIT_CODE":151},{"CIT_ID":"8f4a4ee1-f612-4be0-aa50-df7054becef4","STA_ID":"9","CIT_NAME":"VILLAMARIA","CIT_CODE":130},{"CIT_ID":"8f782d46-56cd-41ea-8b4c-6d63c786db4c","STA_ID":"1","CIT_NAME":"LIBORINA","CIT_CODE":172},{"CIT_ID":"8f9b0e03-9647-4084-afb0-361c556e5fc0","STA_ID":"27","CIT_NAME":"BARBOSA","CIT_CODE":13},{"CIT_ID":"8fa23dca-ae23-4041-8fc2-548eabcfdf2d","STA_ID":"23","CIT_NAME":"ROBERTO PAYAN (SAN JOSE)","CIT_CODE":112},{"CIT_ID":"8fab8bf6-c765-44f1-83a8-b853cc8a1bf4","STA_ID":"54","CIT_NAME":"CALAMAR","CIT_CODE":3},{"CIT_ID":"8fd5f994-f33e-498a-b8bc-bb8f31008408","STA_ID":"26","CIT_NAME":"MONTENEGRO","CIT_CODE":60},{"CIT_ID":"8ff4aa50-5374-4074-823a-b72127846f6c","STA_ID":"12","CIT_NAME":"PELAYA","CIT_CODE":700},{"CIT_ID":"9026afda-d6e6-479a-a5d8-eeb19bc3f8a2","STA_ID":"72","CIT_NAME":"SANTA ROSALIA","CIT_CODE":2},{"CIT_ID":"906a8f89-f71f-4ef4-8512-be63bf671a20","STA_ID":"7","CIT_NAME":"GUICAN","CIT_CODE":112},{"CIT_ID":"907b07fa-a656-48df-9d09-dadc867bc91b","STA_ID":"16","CIT_NAME":"BOGOTA. D.C.","CIT_CODE":1},{"CIT_ID":"90a7ab27-0872-476f-a9f4-4a44eee88d3c","STA_ID":"50","CIT_NAME":"INIRIDA","CIT_CODE":1},{"CIT_ID":"9112c193-2961-4dcd-9297-d60dedb10201","STA_ID":"29","CIT_NAME":"IBAGUE","CIT_CODE":1},{"CIT_ID":"918e1dd6-5c7c-4777-b94c-388368740d30","STA_ID":"11","CIT_NAME":"PIENDAMO","CIT_CODE":61},{"CIT_ID":"91a21d92-21ad-4e8f-ae3f-b3ce0d6c701b","STA_ID":"9","CIT_NAME":"RIOSUCIO","CIT_CODE":103},{"CIT_ID":"91da03f8-4fda-4322-8dbf-cd047dcad51e","STA_ID":"29","CIT_NAME":"LERIDA","CIT_CODE":70},{"CIT_ID":"91e10b7e-0f7f-40c7-ad12-9bf255205515","STA_ID":"29","CIT_NAME":"GUAMO","CIT_CODE":58},{"CIT_ID":"930210db-54e4-41c2-acf4-75b74538b3bc","STA_ID":"15","CIT_NAME":"GUADUAS","CIT_CODE":115},{"CIT_ID":"93e6ef24-ba79-4742-a0f8-e7472157492e","STA_ID":"29","CIT_NAME":"ORTEGA","CIT_CODE":85},{"CIT_ID":"94376cf2-3701-41c0-93aa-9dd35b431810","STA_ID":"25","CIT_NAME":"SANTIAGO","CIT_CODE":82},{"CIT_ID":"9477e0a2-2088-4138-9eaf-a014b7578996","STA_ID":"13","CIT_NAME":"COTORRA (BONGO)","CIT_CODE":14},{"CIT_ID":"948c216d-da72-45d3-9a9d-ec117fcba143","STA_ID":"15","CIT_NAME":"MACHETA","CIT_CODE":157},{"CIT_ID":"94ac6ccf-ae38-4174-ac37-e036a3269d14","STA_ID":"9","CIT_NAME":"PENSILVANIA","CIT_CODE":85},{"CIT_ID":"94b60b35-57ad-47e2-8c9e-dded518b9b45","STA_ID":"5","CIT_NAME":"SOPLAVIENTO","CIT_CODE":106},{"CIT_ID":"94beeade-16d0-4ca1-b994-20fd92a0bec0","STA_ID":"54","CIT_NAME":"EL RETORNO","CIT_CODE":7},{"CIT_ID":"94c78efd-c1d9-49cb-ac85-462aa950bc80","STA_ID":"1","CIT_NAME":"MONTEBELLO","CIT_CODE":181},{"CIT_ID":"94e41c85-d1d9-4859-89f8-cbcd06f1cb79","STA_ID":"23","CIT_NAME":"SANTACRUZ (GUACHAVES)","CIT_CODE":127},{"CIT_ID":"95da49fb-d290-4ed7-8f2c-c6c8dc0996ae","STA_ID":"27","CIT_NAME":"PALMAS DEL SOCORRO","CIT_CODE":154},{"CIT_ID":"95e7d828-5f4a-4302-9d6a-c410574ed2f2","STA_ID":"5","CIT_NAME":"HATILLO DE LOBA","CIT_CODE":26},{"CIT_ID":"96068da2-dc07-48bb-9fe4-be56773a4550","STA_ID":"1","CIT_NAME":"GOMEZ PLATA","CIT_CODE":136},{"CIT_ID":"965074fc-4310-469b-afa7-ea7255f55990","STA_ID":"88","CIT_NAME":"CHILE","CIT_CODE":305},{"CIT_ID":"96859146-871a-440b-95d8-40a8a0985c4c","STA_ID":"44","CIT_NAME":"ALBANIA","CIT_CODE":2},{"CIT_ID":"96b1d2fd-64ab-4f42-b0af-b214fd43b185","STA_ID":"11","CIT_NAME":"PIAMONTE","CIT_CODE":60},{"CIT_ID":"972a80e6-7647-441b-a8e3-8af47bffed13","STA_ID":"15","CIT_NAME":"NARI?O","CIT_CODE":172},{"CIT_ID":"975e871f-3552-4226-bd5f-f697b55ffaf4","STA_ID":"28","CIT_NAME":"SINCELEJO","CIT_CODE":1},{"CIT_ID":"97714845-a4ec-4771-9274-48cf9aac2586","STA_ID":"88","CIT_NAME":"SUECIA","CIT_CODE":755},{"CIT_ID":"97802235-c467-48fa-90ec-8797818b06d2","STA_ID":"23","CIT_NAME":"MOSQUERA","CIT_CODE":94},{"CIT_ID":"97f6b248-41b5-4bbc-be8e-23d767d26d10","STA_ID":"27","CIT_NAME":"SANTA BARBARA","CIT_CODE":195},{"CIT_ID":"9815abd4-bf32-4bd1-a90d-7af8370b808f","STA_ID":"15","CIT_NAME":"SOACHA","CIT_CODE":247},{"CIT_ID":"98d8bcc5-50df-4271-89e8-63b0087e8903","STA_ID":"5","CIT_NAME":"TIQUISIO (PTO. RICO)","CIT_CODE":113},{"CIT_ID":"9918ba8c-ce6b-49cf-8a1c-6899cc453196","STA_ID":"88","CIT_NAME":"COSTA RICA","CIT_CODE":285},{"CIT_ID":"992f8524-3af9-4d50-ad97-6fa096095355","STA_ID":"21","CIT_NAME":"ZONA BANANERA (SEVILLA)","CIT_CODE":95},{"CIT_ID":"9960425c-534d-484f-8f02-c7a59c9db934","STA_ID":"15","CIT_NAME":"PANDI","CIT_CODE":196},{"CIT_ID":"9968f9d7-7b1f-4338-b5bc-f4c15c0c82e6","STA_ID":"13","CIT_NAME":"MOMIL","CIT_CODE":24},{"CIT_ID":"99966b63-2009-48e1-82d4-44b83d941b50","STA_ID":"1","CIT_NAME":"BURITICA","CIT_CODE":61},{"CIT_ID":"99d1099d-97b0-4596-a127-7950625b0687","STA_ID":"28","CIT_NAME":"TOLU","CIT_CODE":300},{"CIT_ID":"99eddcfc-749d-4bb2-9da2-bda95eb69ac7","STA_ID":"1","CIT_NAME":"HELICONIA","CIT_CODE":148},{"CIT_ID":"9a17dbc9-16f4-4f78-bcd9-a9658fd8c11d","STA_ID":"1","CIT_NAME":"FRONTINO","CIT_CODE":127},{"CIT_ID":"9a271bfb-17d7-470a-b6e5-2ac532cdcd12","STA_ID":"31","CIT_NAME":"CARTAGO","CIT_CODE":34},{"CIT_ID":"9a4752c2-2302-4f5e-a2f5-c6ef8cf17049","STA_ID":"11","CIT_NAME":"GUACHENE","CIT_CODE":29},{"CIT_ID":"9a7e6158-c1dd-42cd-a119-63f84bf640f2","STA_ID":"15","CIT_NAME":"GAMA","CIT_CODE":106},{"CIT_ID":"9a87be5f-5552-42ff-8bfb-dba5b5bd665a","STA_ID":"7","CIT_NAME":"PANQUEBA","CIT_CODE":187},{"CIT_ID":"9a8b7868-1058-4640-a252-ff986ba056af","STA_ID":"52","CIT_NAME":"MAPIRIPAN","CIT_CODE":46},{"CIT_ID":"9aad823a-2691-4859-ac03-c5c9f6ae517d","STA_ID":"15","CIT_NAME":"FUQUENE","CIT_CODE":91},{"CIT_ID":"9acdf08c-4317-4812-9637-3fa9e4ae3661","STA_ID":"88","CIT_NAME":"CANADA","CIT_CODE":250},{"CIT_ID":"9ae53f73-9a04-4e01-8f8a-b4fdd5b39508","STA_ID":"15","CIT_NAME":"GUACHETA","CIT_CODE":112},{"CIT_ID":"9b9766ea-874b-4f85-983b-ab84bcb1a891","STA_ID":"46","CIT_NAME":"PORE","CIT_CODE":700},{"CIT_ID":"9c5dfc03-bb2d-45c8-a402-74bec1afb192","STA_ID":"19","CIT_NAME":"SANTA MARIA","CIT_CODE":74},{"CIT_ID":"9c6cf595-5f44-420e-b703-865dba23e742","STA_ID":"25","CIT_NAME":"SAN CALIXTO","CIT_CODE":76},{"CIT_ID":"9cc04bbd-6484-4bb8-8ccd-1366a8d790c2","STA_ID":"7","CIT_NAME":"CORRALES","CIT_CODE":55},{"CIT_ID":"9cc62817-cc32-4de0-8762-14af5c096a2c","STA_ID":"25","CIT_NAME":"SAN CAYETANO","CIT_CODE":79},{"CIT_ID":"9d41959e-834d-415e-b67b-96e2487bdd88","STA_ID":"5","CIT_NAME":"PINILLOS","CIT_CODE":59},{"CIT_ID":"9d7419b6-0ca3-4bc7-b898-d971a433f7b3","STA_ID":"52","CIT_NAME":"LEJANIAS","CIT_CODE":42},{"CIT_ID":"9d948058-8af1-49c7-b196-b42fe75f3905","STA_ID":"19","CIT_NAME":"SAN AGUSTIN","CIT_CODE":70},{"CIT_ID":"9dabe971-c6fc-4a26-8089-5ebf90a842d7","STA_ID":"27","CIT_NAME":"JORDAN","CIT_CODE":115},{"CIT_ID":"9db2ee4e-3c40-4786-8325-ba721d033c1b","STA_ID":"27","CIT_NAME":"VILLANUEVA","CIT_CODE":221},{"CIT_ID":"9df7ed70-1d32-47a9-836c-162b435d17ff","STA_ID":"3","CIT_NAME":"PONEDERA","CIT_CODE":35},{"CIT_ID":"9e531cfd-f2f2-4cf0-b5ce-e823f74bf9ab","STA_ID":"9","CIT_NAME":"VICTORIA","CIT_CODE":127},{"CIT_ID":"9eafc7d1-4e9e-4a8f-8c3f-50255a25ae84","STA_ID":"28","CIT_NAME":"LOS PALMITOS","CIT_CODE":55},{"CIT_ID":"9ecfeb63-cff9-480b-b9c9-93c30e25b0ec","STA_ID":"26","CIT_NAME":"QUIMBAYA","CIT_CODE":80},{"CIT_ID":"9f2d7cb9-213e-4ae0-b272-e5f1971575d4","STA_ID":"1","CIT_NAME":"SAN CARLOS","CIT_CODE":226},{"CIT_ID":"9f531940-fae4-48bd-9660-c6c7f02e1a18","STA_ID":"27","CIT_NAME":"MOLAGAVITA","CIT_CODE":139},{"CIT_ID":"9f96404d-f85a-4b94-9ab3-13c0a89ecf1a","STA_ID":"29","CIT_NAME":"ROVIRA","CIT_CODE":103},{"CIT_ID":"9fc55d5d-8ff7-4aad-b9e7-ec72eb26ee86","STA_ID":"88","CIT_NAME":"GRECIA","CIT_CODE":405},{"CIT_ID":"9fd264a4-fbe6-42bb-ba07-174003b5ab17","STA_ID":"7","CIT_NAME":"LA UVITA","CIT_CODE":136},{"CIT_ID":"9ff9f58e-9b00-4a14-975b-765f118bc8d2","STA_ID":"11","CIT_NAME":"TIMBIQUI","CIT_CODE":91},{"CIT_ID":"a0181a41-de26-44d8-a105-6a3190a4e441","STA_ID":"11","CIT_NAME":"LA VEGA","CIT_CODE":40},{"CIT_ID":"a01da608-31d0-41f6-9fe6-f53e831ee53d","STA_ID":"27","CIT_NAME":"EL PE?ON","CIT_CODE":75},{"CIT_ID":"a03fa444-121f-429d-9511-5a373c3186b7","STA_ID":"7","CIT_NAME":"SANTA MARIA","CIT_CODE":251},{"CIT_ID":"a07405aa-2870-4c45-8110-7a5f82a16ead","STA_ID":"15","CIT_NAME":"TENA","CIT_CODE":277},{"CIT_ID":"a07dfc31-a410-408a-abf5-2bba7f281586","STA_ID":"28","CIT_NAME":"SAN ONOFRE","CIT_CODE":220},{"CIT_ID":"a0b584ea-3e92-4cc9-9de9-716cfb2add29","STA_ID":"9","CIT_NAME":"LA DORADA","CIT_CODE":49},{"CIT_ID":"a0c75bf5-0f9c-4433-b8b4-dabc75c72f5f","STA_ID":"23","CIT_NAME":"PUERRES","CIT_CODE":103},{"CIT_ID":"a0ed54f1-503f-40e8-8f18-ba6aba9f989c","STA_ID":"1","CIT_NAME":"SONSON","CIT_CODE":262},{"CIT_ID":"a11355cd-a37b-497f-b610-2d4c4cdad9ac","STA_ID":"1","CIT_NAME":"SANTO DOMINGO","CIT_CODE":253},{"CIT_ID":"a13e443c-8db3-4cdc-ad00-5cfac98f7d0f","STA_ID":"15","CIT_NAME":"COTA","CIT_CODE":46},{"CIT_ID":"a15f55e4-3bb6-4375-b484-1089d06cf98e","STA_ID":"7","CIT_NAME":"OTANCHE","CIT_CODE":176},{"CIT_ID":"a1738a49-93cd-42a2-b24b-65ce1f18d6f8","STA_ID":"19","CIT_NAME":"TARQUI","CIT_CODE":79},{"CIT_ID":"a17f3a9d-2d44-412b-a631-925f46581bc7","STA_ID":"3","CIT_NAME":"POLONUEVO","CIT_CODE":34},{"CIT_ID":"a228f0fd-3e38-4da7-aa99-3d2860785c42","STA_ID":"88","CIT_NAME":"MALASIA","CIT_CODE":560},{"CIT_ID":"a22a4fcf-0b8a-4409-91ec-3e6cff2ad859","STA_ID":"15","CIT_NAME":"ANOLAIMA","CIT_CODE":13},{"CIT_ID":"a2655c4e-71d4-400b-bcf0-51b32f1c8ed8","STA_ID":"27","CIT_NAME":"CONCEPCION","CIT_CODE":46},{"CIT_ID":"a2a7d423-93eb-486b-a6a8-892f952deb71","STA_ID":"88","CIT_NAME":"PAKISTAN","CIT_CODE":660},{"CIT_ID":"a2b90a34-3131-4019-8f69-5477ade6af34","STA_ID":"23","CIT_NAME":"ARBOLEDA (BERRUECOS)","CIT_CODE":13},{"CIT_ID":"a2bc9b24-1126-44d0-96db-718c6fd044b5","STA_ID":"23","CIT_NAME":"LA FLORIDA","CIT_CODE":76},{"CIT_ID":"a34e7e07-e6dd-4f18-8db2-182df79894fd","STA_ID":"88","CIT_NAME":"JAPON","CIT_CODE":505},{"CIT_ID":"a36cae1a-6254-4a13-b395-60ab41a3eacb","STA_ID":"29","CIT_NAME":"CUNDAY","CIT_CODE":37},{"CIT_ID":"a402b43f-da5d-433c-be66-6ce5f24163fa","STA_ID":"13","CIT_NAME":"SAN CARLOS","CIT_CODE":49},{"CIT_ID":"a420d2c8-cc34-4360-bf3c-9c77034df9ca","STA_ID":"21","CIT_NAME":"SANTA ANA","CIT_CODE":76},{"CIT_ID":"a4710012-40cc-4b5c-9144-e091e0cfd845","STA_ID":"7","CIT_NAME":"SOTAQUIRA","CIT_CODE":283},{"CIT_ID":"a4bb3513-23ca-46b0-8287-95926fb39e53","STA_ID":"88","CIT_NAME":"AUSTRIA","CIT_CODE":170},{"CIT_ID":"a4d62a96-3ead-4d3f-94eb-c5e314b69cdc","STA_ID":"31","CIT_NAME":"CALI","CIT_CODE":1},{"CIT_ID":"a50efb28-78b6-4cca-8fa4-b9abd6a392da","STA_ID":"31","CIT_NAME":"CANDELARIA","CIT_CODE":31},{"CIT_ID":"a531c118-0d4e-4451-9393-76e4c1d987bc","STA_ID":"28","CIT_NAME":"SAN MARCOS","CIT_CODE":200},{"CIT_ID":"a536ba5e-2ef5-4f2f-95bf-5217ae0430a5","STA_ID":"5","CIT_NAME":"SAN JUAN NEPOMUCENO","CIT_CODE":79},{"CIT_ID":"a53fc08e-4aea-44d2-a7be-9244ec4da37c","STA_ID":"44","CIT_NAME":"SOLITA","CIT_CODE":24},{"CIT_ID":"a545b45a-cd1e-4477-9300-48c7f4528738","STA_ID":"17","CIT_NAME":"ACANDI","CIT_CODE":4},{"CIT_ID":"a59cced8-9ae8-4e0d-b681-90b376549b9d","STA_ID":"29","CIT_NAME":"SAN ANTONIO","CIT_CODE":106},{"CIT_ID":"a5bd00ad-362b-467f-8353-3006edfeb58b","STA_ID":"1","CIT_NAME":"DABEIBA","CIT_CODE":109},{"CIT_ID":"a5bdc88a-864f-4d6b-b4e9-e2b1cbeefaee","STA_ID":"15","CIT_NAME":"LA PE?A","CIT_CODE":148},{"CIT_ID":"a5c82d02-fa3a-4b5e-b948-503a95e41d9f","STA_ID":"7","CIT_NAME":"SOMONDOCO","CIT_CODE":280},{"CIT_ID":"a6bb624a-d478-466b-970e-31c6d3d11054","STA_ID":"25","CIT_NAME":"CUCUTA","CIT_CODE":1},{"CIT_ID":"a6e2d96c-c9c2-4cca-b76a-98ca03341673","STA_ID":"11","CIT_NAME":"PATIA (EL BORDO)","CIT_CODE":58},{"CIT_ID":"a731aaa3-8666-44d0-a3d6-fd4d9f8f07aa","STA_ID":"88","CIT_NAME":"EMIRATOS ARABES UNIDOS","CIT_CODE":350},{"CIT_ID":"a77c614b-6b86-4546-a8cb-751381be3325","STA_ID":"23","CIT_NAME":"LEIVA","CIT_CODE":80},{"CIT_ID":"a796a0be-fa68-49b9-952b-185e6058fb62","STA_ID":"17","CIT_NAME":"EL CANTON DEL SAN PABLO (MAN.","CIT_CODE":17},{"CIT_ID":"a7f0aa6a-3a21-422b-bd26-2e2be58837ad","STA_ID":"7","CIT_NAME":"SAN PABLO DE BORBUR","CIT_CODE":249},{"CIT_ID":"a8021263-ef2b-4e2b-bf27-b47243869fde","STA_ID":"7","CIT_NAME":"GAMEZA","CIT_CODE":97},{"CIT_ID":"a80b7f61-25cd-435c-bbd3-d5584dc6bf14","STA_ID":"15","CIT_NAME":"VENECIA","CIT_CODE":318},{"CIT_ID":"a8537981-3efd-48d2-aa78-9eff70f6d14f","STA_ID":"29","CIT_NAME":"VENADILLO","CIT_CODE":121},{"CIT_ID":"a8745959-d1b7-4ce6-a3ba-b75a6a617329","STA_ID":"7","CIT_NAME":"TINJACA","CIT_CODE":310},{"CIT_ID":"a881f215-13d4-4f99-bbe8-0dd7dd4a0624","STA_ID":"1","CIT_NAME":"BELMIRA","CIT_CODE":46},{"CIT_ID":"a8870319-3db7-4fd5-8c61-6f4cab4eea5b","STA_ID":"26","CIT_NAME":"BUENAVISTA","CIT_CODE":5},{"CIT_ID":"a8963680-bcd5-454a-8cd1-a7ac1a8bc084","STA_ID":"88","CIT_NAME":"ALEMANIA","CIT_CODE":120},{"CIT_ID":"a89ee779-da63-4152-aa3d-1a58c08d7be4","STA_ID":"60","CIT_NAME":"EL ENCANTO","CIT_CODE":10},{"CIT_ID":"a8add80b-5619-48a0-8c08-8b7dd77110db","STA_ID":"21","CIT_NAME":"CHIVOLO","CIT_CODE":15},{"CIT_ID":"a8d8b105-9889-4a39-aa29-e0ac6778a8c5","STA_ID":"29","CIT_NAME":"CHAPARRAL","CIT_CODE":40},{"CIT_ID":"a921ecf7-454e-4699-b09e-851b38fc5c92","STA_ID":"23","CIT_NAME":"SAN BERNARDO","CIT_CODE":120},{"CIT_ID":"a97345dc-5903-4309-bd06-b52dfcf4454f","STA_ID":"64","CIT_NAME":"ORITO","CIT_CODE":23},{"CIT_ID":"a9a9600c-d701-4e93-b4d9-1c5bf4aeba99","STA_ID":"1","CIT_NAME":"ANGOSTURA","CIT_CODE":25},{"CIT_ID":"a9c0b943-c516-4f3a-9235-e7501d3d53ac","STA_ID":"52","CIT_NAME":"ACACIAS","CIT_CODE":5},{"CIT_ID":"a9c80ef1-c4f1-41cf-bd57-63a80a4480f6","STA_ID":"29","CIT_NAME":"ANZOATEGUI","CIT_CODE":13},{"CIT_ID":"aa65a424-ca56-4ac0-9e6f-7223e5850784","STA_ID":"15","CIT_NAME":"NEMOCON","CIT_CODE":175},{"CIT_ID":"aa7c4dcf-ecb7-4ae6-b626-61b112a7d6ee","STA_ID":"5","CIT_NAME":"SAN CRISTOBAL","CIT_CODE":72},{"CIT_ID":"aa894340-4f80-4fd1-84c9-c7e3f27eef38","STA_ID":"48","CIT_NAME":"URIBIA","CIT_CODE":16},{"CIT_ID":"aabd82e9-f0b6-408c-a8a2-c7c79a88a3cb","STA_ID":"29","CIT_NAME":"CAJAMARCA","CIT_CODE":22},{"CIT_ID":"aadacc06-b2dd-4595-bdd5-60e17c0647d7","STA_ID":"31","CIT_NAME":"ROLDANILLO","CIT_CODE":91},{"CIT_ID":"aaeb9c70-344e-484a-916a-1bf476ec3c8f","STA_ID":"15","CIT_NAME":"UBALA","CIT_CODE":298},{"CIT_ID":"ab551f55-353c-4dff-bcf1-54f41f67caff","STA_ID":"27","CIT_NAME":"OCAMONTE","CIT_CODE":142},{"CIT_ID":"ab77eece-db48-471b-add3-adf5cec41f7b","STA_ID":"13","CIT_NAME":"CHINU","CIT_CODE":19},{"CIT_ID":"ab82ffaa-184f-4953-a129-5b9e0e7eceb2","STA_ID":"31","CIT_NAME":"LA VICTORIA","CIT_CODE":73},{"CIT_ID":"ab8cd89e-c84d-4d85-b602-2ae6b101f8bf","STA_ID":"15","CIT_NAME":"SILVANIA","CIT_CODE":241},{"CIT_ID":"aba98f62-ddee-4114-9512-9bda5e7c7590","STA_ID":"54","CIT_NAME":"SAN JOSE DEL GUAVIARE","CIT_CODE":1},{"CIT_ID":"abac530d-cc83-45d1-b456-6eba1d83a2a2","STA_ID":"7","CIT_NAME":"MACANAL","CIT_CODE":142},{"CIT_ID":"abd56046-aeb3-40e0-8e48-c31f7650f044","STA_ID":"52","CIT_NAME":"VILLAVICENCIO","CIT_CODE":1},{"CIT_ID":"abdb5527-36b3-4d7b-8597-09f133793f3d","STA_ID":"28","CIT_NAME":"TOLUVIEJO","CIT_CODE":320},{"CIT_ID":"ac361d6d-5ead-48ac-a3e5-f85d84cd4be6","STA_ID":"13","CIT_NAME":"PURISIMA","CIT_CODE":34},{"CIT_ID":"ac85e54a-3cab-4825-ac75-0dd1398db710","STA_ID":"7","CIT_NAME":"SOCOTA","CIT_CODE":271},{"CIT_ID":"ace36839-939e-4b6c-9108-c21a961f8f54","STA_ID":"23","CIT_NAME":"OLAYA HERRERA","CIT_CODE":95},{"CIT_ID":"ace645d0-e498-43e2-8147-edda7ae0b18b","STA_ID":"28","CIT_NAME":"SAMPUES","CIT_CODE":160},{"CIT_ID":"ad47b889-4385-4102-98fc-a6bd8214b069","STA_ID":"31","CIT_NAME":"GUACARI","CIT_CODE":61},{"CIT_ID":"ad6d9c61-5894-4407-abf0-c37deacace75","STA_ID":"11","CIT_NAME":"BALBOA","CIT_CODE":6},{"CIT_ID":"adb630b4-2c84-483d-9b40-8214b9649a9f","STA_ID":"25","CIT_NAME":"TEORAMA","CIT_CODE":91},{"CIT_ID":"ae819dc2-ca20-4355-abac-987370c3d3c2","STA_ID":"31","CIT_NAME":"YOTOCO","CIT_CODE":118},{"CIT_ID":"aeca034f-0242-450b-b623-8c93188faa33","STA_ID":"15","CIT_NAME":"ZIPAQUIRA","CIT_CODE":340},{"CIT_ID":"aed89b6d-e984-41dc-9727-1b14f848e123","STA_ID":"1","CIT_NAME":"VIGIA DEL FUERTE","CIT_CODE":291},{"CIT_ID":"af381554-963b-4d93-b3f9-f9a2a848a80b","STA_ID":"9","CIT_NAME":"LA MERCED","CIT_CODE":52},{"CIT_ID":"af68e92b-b486-419d-b5b5-dc9e56ad9812","STA_ID":"44","CIT_NAME":"SOLANO","CIT_CODE":22},{"CIT_ID":"afdf9426-2404-4dc0-9407-c9f6b823dbbf","STA_ID":"1","CIT_NAME":"COCORNA","CIT_CODE":94},{"CIT_ID":"b033b440-f943-4cf7-b3af-979f03c1421e","STA_ID":"29","CIT_NAME":"PURIFICACION","CIT_CODE":94},{"CIT_ID":"b07b6fe0-9167-49af-a00f-37dedf7c999c","STA_ID":"28","CIT_NAME":"COLOSO (RICAURTE)","CIT_CODE":30},{"CIT_ID":"b08ab06e-e2f7-408d-87bc-9fb2467e79ee","STA_ID":"31","CIT_NAME":"TORO","CIT_CODE":100},{"CIT_ID":"b097dd58-c822-4bd8-9380-04b4c89248de","STA_ID":"88","CIT_NAME":"GUYANA","CIT_CODE":425},{"CIT_ID":"b0cb9a87-65ac-4343-82cd-05776fa58fbc","STA_ID":"27","CIT_NAME":"GALAN","CIT_CODE":85},{"CIT_ID":"b1957727-25cd-4b59-a4e5-cea1ab0ec45c","STA_ID":"17","CIT_NAME":"QUIBDO","CIT_CODE":1},{"CIT_ID":"b200f090-a20e-4e25-8afe-0453cf9a009b","STA_ID":"7","CIT_NAME":"MOTAVITA","CIT_CODE":161},{"CIT_ID":"b2125f68-3a9a-4033-836f-d7a2bf7d990a","STA_ID":"25","CIT_NAME":"SALAZAR","CIT_CODE":73},{"CIT_ID":"b21da840-ae15-4269-974f-32b76aaad91b","STA_ID":"7","CIT_NAME":"EL COCUY","CIT_CODE":82},{"CIT_ID":"b23026ca-4c4c-425c-a404-d3c297301c77","STA_ID":"46","CIT_NAME":"SABANALARGA","CIT_CODE":800},{"CIT_ID":"b2841956-390a-4122-bbe7-200cbcba188f","STA_ID":"26","CIT_NAME":"CALARCA","CIT_CODE":10},{"CIT_ID":"b29502a6-f9f2-4bdd-ab43-563833a23dcd","STA_ID":"12","CIT_NAME":"CURUMANI","CIT_CODE":225},{"CIT_ID":"b299426d-1057-4998-a4ce-e4628a236cff","STA_ID":"15","CIT_NAME":"CAPARRAPI","CIT_CODE":34},{"CIT_ID":"b3189c9c-1851-4ec2-9e57-a28c27d05468","STA_ID":"7","CIT_NAME":"MARIPI","CIT_CODE":148},{"CIT_ID":"b376c4ba-ed7f-4e82-847a-8ecbc699c1cd","STA_ID":"88","CIT_NAME":"INGLATERRA","CIT_CODE":465},{"CIT_ID":"b3ba94ec-d59d-4e73-a850-0f63917eb627","STA_ID":"27","CIT_NAME":"OIBA","CIT_CODE":145},{"CIT_ID":"b3fb55db-a1dc-4631-9512-b97086776823","STA_ID":"1","CIT_NAME":"ANORI","CIT_CODE":28},{"CIT_ID":"b4332f25-c988-47e0-a644-7974820ebc72","STA_ID":"7","CIT_NAME":"SAN EDUARDO","CIT_CODE":237},{"CIT_ID":"b47e4137-ac90-41fc-8713-bfafe62b6094","STA_ID":"15","CIT_NAME":"PARATEBUENO (LA NAGUAYA)","CIT_CODE":198},{"CIT_ID":"b51f04b1-3308-41e9-b8b7-db5684f21270","STA_ID":"1","CIT_NAME":"YALI","CIT_CODE":293},{"CIT_ID":"b58a9799-93b4-4dba-8983-4189bd893b34","STA_ID":"9","CIT_NAME":"PALESTINA","CIT_CODE":82},{"CIT_ID":"b58e2ae1-6e2c-4ec3-88e6-8e97431bd035","STA_ID":"23","CIT_NAME":"FRANCISCO PIZARRO (SALAHONDA)","CIT_CODE":47},{"CIT_ID":"b59c0af1-0cec-4bc8-a24c-9dacf98c4c5c","STA_ID":"25","CIT_NAME":"TIBU","CIT_CODE":93},{"CIT_ID":"b59c18c6-077b-4c8b-adb0-66d0c01cb2c0","STA_ID":"1","CIT_NAME":"ARBOLETES","CIT_CODE":37},{"CIT_ID":"b5d78802-f478-41b4-9a85-e01b7bbc20cc","STA_ID":"23","CIT_NAME":"EL ROSARIO","CIT_CODE":40},{"CIT_ID":"b5ec8e74-3c39-438b-a993-631f0d365fd5","STA_ID":"25","CIT_NAME":"LA PLAYA","CIT_CODE":52},{"CIT_ID":"b5f68978-b8a8-4e54-923d-b826b941ebf5","STA_ID":"5","CIT_NAME":"TALAIGUA NUEVO","CIT_CODE":110},{"CIT_ID":"b633914e-4d00-4341-8947-bd40b4c5eafa","STA_ID":"12","CIT_NAME":"PUEBLO BELLO","CIT_CODE":720},{"CIT_ID":"b6369e32-dbaf-47c8-bb99-657d972fcdf8","STA_ID":"27","CIT_NAME":"CURITI","CIT_CODE":58},{"CIT_ID":"b6427fa8-58de-422d-8f36-4894f2e33c0b","STA_ID":"27","CIT_NAME":"FLORIDABLANCA","CIT_CODE":82},{"CIT_ID":"b6c868ff-0223-4e74-83f6-f5394ad3b8c3","STA_ID":"23","CIT_NAME":"BUESACO","CIT_CODE":19},{"CIT_ID":"b6f077ad-8aaa-42f1-a731-d13ca3ace6e4","STA_ID":"52","CIT_NAME":"VISTA HERMOSA","CIT_CODE":80},{"CIT_ID":"b6f59227-f960-4825-8cd9-17ad95e04382","STA_ID":"88","CIT_NAME":"ESTADOS UNIDOS","CIT_CODE":360},{"CIT_ID":"b7016673-ff97-4dae-b1b5-3c1a741ac00e","STA_ID":"15","CIT_NAME":"GACHANCIPA","CIT_CODE":100},{"CIT_ID":"b7091004-43df-4fa1-a151-0685646f8ffc","STA_ID":"50","CIT_NAME":"MORICHAL (MORICHAL NUEVO)","CIT_CODE":83},{"CIT_ID":"b7346b39-2665-49c2-ad49-51ad0f85bdb7","STA_ID":"23","CIT_NAME":"FUNES","CIT_CODE":49},{"CIT_ID":"b860e43b-1998-49f3-abe2-22b6719948ca","STA_ID":"88","CIT_NAME":"BOLIVIA","CIT_CODE":215},{"CIT_ID":"b8c53ee7-2630-42ce-9015-d2bb8b48850f","STA_ID":"11","CIT_NAME":"SANTANDER DE QUILICHAO","CIT_CODE":76},{"CIT_ID":"b91a1c45-541a-4ad6-babb-829a5872af65","STA_ID":"25","CIT_NAME":"CACHIRA","CIT_CODE":19},{"CIT_ID":"b92ec00e-8376-4ee2-841d-6bfa1cc877fb","STA_ID":"7","CIT_NAME":"TOPAGA","CIT_CODE":319},{"CIT_ID":"b9aebd8a-0ba2-419d-aa59-724827ac4666","STA_ID":"88","CIT_NAME":"HAITI","CIT_CODE":430},{"CIT_ID":"b9b9755f-d221-4b5f-8319-1899f743d09f","STA_ID":"27","CIT_NAME":"LEBRIJA","CIT_CODE":121},{"CIT_ID":"ba83b2a9-0083-4acf-86a1-abefdddbff8d","STA_ID":"21","CIT_NAME":"SAN SEBASTIAN DE BUENAVISTA","CIT_CODE":70},{"CIT_ID":"ba874aa3-6145-42b7-b3ee-e95c1c3b2d65","STA_ID":"15","CIT_NAME":"VILLAGOMEZ","CIT_CODE":323},{"CIT_ID":"bab5f4b4-75aa-44eb-b558-e518cb3a473c","STA_ID":"11","CIT_NAME":"INZA","CIT_CODE":31},{"CIT_ID":"bac1e945-2af0-4b5d-91d7-dcef3af66fdf","STA_ID":"7","CIT_NAME":"CUITIVA","CIT_CODE":61},{"CIT_ID":"bacee956-d2d0-4fb5-8f54-71a43eee824f","STA_ID":"48","CIT_NAME":"URUMITA","CIT_CODE":18},{"CIT_ID":"bae2783e-9072-4364-b8f2-ba7307bee608","STA_ID":"27","CIT_NAME":"EL GUACAMAYO","CIT_CODE":73},{"CIT_ID":"baeabd47-f542-40d9-8c23-d3701ae274fd","STA_ID":"1","CIT_NAME":"PEQUE","CIT_CODE":199},{"CIT_ID":"baf36c12-16d3-4aef-a6e4-ead5c715c9cc","STA_ID":"50","CIT_NAME":"PUERTO COLOMBIA","CIT_CODE":90},{"CIT_ID":"baf670df-528f-4a90-a8fa-28b81d9daaff","STA_ID":"19","CIT_NAME":"AIPE","CIT_CODE":10},{"CIT_ID":"bb43ccf9-5c06-4a74-bafb-2d8d6394653f","STA_ID":"1","CIT_NAME":"RIONEGRO","CIT_CODE":214},{"CIT_ID":"bce44680-a1bc-43e0-a953-ec35888e0f41","STA_ID":"7","CIT_NAME":"COMBITA","CIT_CODE":49},{"CIT_ID":"bcf56ebd-5525-4831-8153-6c94029d3744","STA_ID":"5","CIT_NAME":"SAN FERNANDO","CIT_CODE":73},{"CIT_ID":"bd1af7cd-b035-4f3f-b808-72e7a31b8637","STA_ID":"9","CIT_NAME":"MANIZALES","CIT_CODE":1},{"CIT_ID":"bd42eecd-1d78-47a5-a052-cd6d41f78175","STA_ID":"7","CIT_NAME":"CUBARA","CIT_CODE":59},{"CIT_ID":"bd6fdcfb-95a9-4ee3-8e22-7c55dc1e773a","STA_ID":"23","CIT_NAME":"POTOSI","CIT_CODE":100},{"CIT_ID":"bd865219-1fd0-4474-903c-421e141e01fa","STA_ID":"24","CIT_NAME":"LA CELIA","CIT_CODE":38},{"CIT_ID":"bdf92958-126c-4182-9376-947342785f11","STA_ID":"7","CIT_NAME":"CHINAVITA","CIT_CODE":64},{"CIT_ID":"be2fecea-7191-4c54-91cc-8e0e68294053","STA_ID":"12","CIT_NAME":"LA GLORIA","CIT_CODE":600},{"CIT_ID":"be6f3c3e-58cc-4dcc-aa29-bb71d789f44f","STA_ID":"17","CIT_NAME":"CARMEN DEL DARIEN","CIT_CODE":15},{"CIT_ID":"be835712-72ea-4ebb-9ac1-da26adf963e2","STA_ID":"44","CIT_NAME":"SAN JOSE DEL FRAGUA","CIT_CODE":20},{"CIT_ID":"bec715f5-7c12-4ee4-8972-143fc936715d","STA_ID":"13","CIT_NAME":"LOS CORDOBAS","CIT_CODE":23},{"CIT_ID":"bf0779dc-ed65-4acc-b5a2-ea6173b06c63","STA_ID":"52","CIT_NAME":"GUAMAL","CIT_CODE":40},{"CIT_ID":"bf263d83-500b-465b-a4d5-f34644c4fac8","STA_ID":"11","CIT_NAME":"CORINTO","CIT_CODE":22},{"CIT_ID":"bf748dfb-7fd6-4a22-a1d9-b89ca622aa2b","STA_ID":"88","CIT_NAME":"ECUADOR","CIT_CODE":330},{"CIT_ID":"bf8286aa-9ded-4bcd-a54d-473b51a38e11","STA_ID":"15","CIT_NAME":"PAIME","CIT_CODE":193},{"CIT_ID":"bf856b50-1b4a-4b9c-99a0-026ba0887def","STA_ID":"15","CIT_NAME":"TOCAIMA","CIT_CODE":289},{"CIT_ID":"bfb201a3-f827-40d1-b62d-0f7373292a7c","STA_ID":"15","CIT_NAME":"TABIO","CIT_CODE":271},{"CIT_ID":"c0049cfe-0c3b-4417-8f28-1d465fdafc7f","STA_ID":"15","CIT_NAME":"MANTA","CIT_CODE":163},{"CIT_ID":"c1159975-100f-44ab-942e-83b1ddc73121","STA_ID":"3","CIT_NAME":"GALAPA","CIT_CODE":13},{"CIT_ID":"c131dc10-1252-46f7-a22a-1c5b694f0b11","STA_ID":"15","CIT_NAME":"RICAURTE","CIT_CODE":218},{"CIT_ID":"c1d07483-16b7-48ab-a693-07b828027ebb","STA_ID":"44","CIT_NAME":"EL PAUJIL","CIT_CODE":6},{"CIT_ID":"c1fa078d-8735-4ca0-856e-72ef0b59c21c","STA_ID":"31","CIT_NAME":"TRUJILLO","CIT_CODE":103},{"CIT_ID":"c2025e77-2b60-419f-9c22-c5a6ef5c389b","STA_ID":"13","CIT_NAME":"LORICA","CIT_CODE":22},{"CIT_ID":"c2902c1f-81c0-46de-ba78-6215e0b71507","STA_ID":"27","CIT_NAME":"FLORIAN","CIT_CODE":80},{"CIT_ID":"c2b48688-1a59-4ac8-88f1-78daaf8d6027","STA_ID":"5","CIT_NAME":"CORDOBA","CIT_CODE":16},{"CIT_ID":"c2d76522-e128-442e-9479-a3a971599a6e","STA_ID":"11","CIT_NAME":"LOPEZ (MICAY)","CIT_CODE":43},{"CIT_ID":"c2f0d3f1-b028-497f-aa1a-aa0d26325635","STA_ID":"88","CIT_NAME":"TRINIDAD Y TOBAGO","CIT_CODE":785},{"CIT_ID":"c361e30e-e362-415d-9c73-200dd29d6f57","STA_ID":"60","CIT_NAME":"PUERTO NARI?O","CIT_CODE":7},{"CIT_ID":"c371a78f-0d31-4e4f-b00c-551afd91108c","STA_ID":"27","CIT_NAME":"LA PAZ","CIT_CODE":118},{"CIT_ID":"c410900e-70d2-4747-9b21-35c793e17e97","STA_ID":"1","CIT_NAME":"ABEJORRAL","CIT_CODE":4},{"CIT_ID":"c4241c61-71c4-401f-bd8e-51f4585f96fd","STA_ID":"1","CIT_NAME":"ARGELIA","CIT_CODE":39},{"CIT_ID":"c46f26bb-22e0-42f9-b99d-a2818081bd49","STA_ID":"23","CIT_NAME":"ILES","CIT_CODE":61},{"CIT_ID":"c499d5b0-c3c7-40ac-a984-7160e237d781","STA_ID":"7","CIT_NAME":"ZETAQUIRA","CIT_CODE":346},{"CIT_ID":"c4b7fddf-1a43-4693-8329-a10f0d2a0d2a","STA_ID":"23","CIT_NAME":"MAGUI (PAYAN)","CIT_CODE":88},{"CIT_ID":"c4d205e0-572a-4ff6-87f4-eaf7aea4f905","STA_ID":"1","CIT_NAME":"MURINDO","CIT_CODE":184},{"CIT_ID":"c4da38a0-210a-4777-b13a-476c6d1c8487","STA_ID":"48","CIT_NAME":"DIBULLA","CIT_CODE":5},{"CIT_ID":"c517cac1-3681-4da9-8545-ae0ef3d97147","STA_ID":"56","CIT_NAME":"PROVIDENCIA","CIT_CODE":4},{"CIT_ID":"c5694abe-4ee8-4496-b1fe-ecb886c553de","STA_ID":"1","CIT_NAME":"TARAZA","CIT_CODE":270},{"CIT_ID":"c5b9592d-ac5c-483c-a910-be4bc0a35bc5","STA_ID":"17","CIT_NAME":"BOJAYA (BELLAVISTA)","CIT_CODE":11},{"CIT_ID":"c5bb60c2-421a-4e7a-9ce6-fd8e3ad37a30","STA_ID":"15","CIT_NAME":"APULO","CIT_CODE":217},{"CIT_ID":"c5bc0279-1f97-4a1c-8b51-f3c3ac17982d","STA_ID":"52","CIT_NAME":"PUERTO LLERAS","CIT_CODE":48},{"CIT_ID":"c636c583-ac4a-4577-bf5b-4e97dec20935","STA_ID":"5","CIT_NAME":"MAGANGUE","CIT_CODE":28},{"CIT_ID":"c63d11df-5564-490d-9197-e40d9ea02064","STA_ID":"88","CIT_NAME":"ARUBA","CIT_CODE":160},{"CIT_ID":"c68066f8-0253-44bd-8ca5-57b1e0f68a2d","STA_ID":"29","CIT_NAME":"ALVARADO","CIT_CODE":7},{"CIT_ID":"c6a133f2-e0d3-4201-97b9-76fbcad1a037","STA_ID":"7","CIT_NAME":"VENTAQUEMADA","CIT_CODE":337},{"CIT_ID":"c6a5300a-84d2-4ed2-bf2e-e4a13d7b96cc","STA_ID":"5","CIT_NAME":"CANTAGALLO","CIT_CODE":14},{"CIT_ID":"c728a6f6-6c2f-44b1-b960-86b3ec8518d4","STA_ID":"1","CIT_NAME":"SALGAR","CIT_CODE":220},{"CIT_ID":"c7405578-cd3c-40af-9d13-942faa63258b","STA_ID":"1","CIT_NAME":"SAN VICENTE","CIT_CODE":244},{"CIT_ID":"c84dbca0-ed9a-491d-8ad9-8c5f5a97664c","STA_ID":"27","CIT_NAME":"LANDAZURI","CIT_CODE":120},{"CIT_ID":"c8a4acb4-faac-40b3-ab0d-cde019d0d547","STA_ID":"88","CIT_NAME":"NORUEGA","CIT_CODE":635},{"CIT_ID":"c8b66e49-7322-4210-8549-56c9f75eee29","STA_ID":"27","CIT_NAME":"CONFINES","CIT_CODE":49},{"CIT_ID":"c8e7be69-06a7-4432-9d8f-f857b610c6b9","STA_ID":"25","CIT_NAME":"CHITAGA","CIT_CODE":31},{"CIT_ID":"c8f101e5-748c-4fd2-a917-b602818351b8","STA_ID":"31","CIT_NAME":"JAMUNDI","CIT_CODE":64},{"CIT_ID":"c9764b2c-f618-44cd-a9fe-e4ba3c2cc6e4","STA_ID":"7","CIT_NAME":"TIBASOSA","CIT_CODE":307},{"CIT_ID":"c9857791-3760-45f2-b7bb-8fe1c87950b5","STA_ID":"27","CIT_NAME":"MACARAVITA","CIT_CODE":127},{"CIT_ID":"c98803ef-f942-48a3-b2cc-4d782ed29471","STA_ID":"12","CIT_NAME":"AGUACHICA","CIT_CODE":75},{"CIT_ID":"c9c9cb10-129f-4062-b037-a59601c68409","STA_ID":"17","CIT_NAME":"MEDIO SAN JUAN","CIT_CODE":27},{"CIT_ID":"ca847581-feb5-4e5d-a4bf-bae7e02c0107","STA_ID":"88","CIT_NAME":"INDIA","CIT_CODE":455},{"CIT_ID":"caad34f7-176d-428c-ab33-c76c8788f720","STA_ID":"60","CIT_NAME":"PUERTO ARICA","CIT_CODE":40},{"CIT_ID":"cade05ce-8649-4902-b9ef-9fa676895f2a","STA_ID":"7","CIT_NAME":"RONDON","CIT_CODE":223},{"CIT_ID":"cb3caf62-46ae-4d5c-a7d4-806be412f6dc","STA_ID":"1","CIT_NAME":"HISPANIA","CIT_CODE":150},{"CIT_ID":"cb86ed77-65e1-4ad9-bb13-a5e23915f348","STA_ID":"88","CIT_NAME":"INDONESIA","CIT_CODE":460},{"CIT_ID":"cba6831d-63d3-4bfe-a05c-2dbb32ca7784","STA_ID":"7","CIT_NAME":"PAJARITO","CIT_CODE":184},{"CIT_ID":"cbb81bc0-9616-4cea-a57e-be8617930cc6","STA_ID":"46","CIT_NAME":"NUNCHIA","CIT_CODE":560},{"CIT_ID":"cc1979f6-c12c-4f9d-a715-729d7ac71dc4","STA_ID":"23","CIT_NAME":"ALDANA","CIT_CODE":7},{"CIT_ID":"cc2428c8-716a-46e7-9328-e0a32addbe47","STA_ID":"60","CIT_NAME":"LETICIA","CIT_CODE":1},{"CIT_ID":"cc274f9c-1ee0-459b-a9f1-5e395e6fad9a","STA_ID":"27","CIT_NAME":"CAPITANEJO","CIT_CODE":34},{"CIT_ID":"cc5beb77-3ef6-457c-be67-bdf536495463","STA_ID":"15","CIT_NAME":"FOMEQUE","CIT_CODE":79},{"CIT_ID":"cc9cfeba-b04b-4c05-857e-26f18912058c","STA_ID":"9","CIT_NAME":"SAMANA","CIT_CODE":115},{"CIT_ID":"ccacd1a4-cc5c-4c62-a137-a5ed272781cb","STA_ID":"27","CIT_NAME":"MATANZA","CIT_CODE":133},{"CIT_ID":"ccb37256-2c90-4c18-b495-e781ef0b2364","STA_ID":"88","CIT_NAME":"EGIPTO","CIT_CODE":335},{"CIT_ID":"ccc05f2c-615c-4dc7-9a7c-409476500907","STA_ID":"5","CIT_NAME":"MONTECRISTO","CIT_CODE":41},{"CIT_ID":"cda148f0-f1f6-44ba-8ed1-9cc78f29ae83","STA_ID":"88","CIT_NAME":"REPUBLICA DOMINICANA","CIT_CODE":685},{"CIT_ID":"cdc49f44-7965-4f03-8f08-4108dfea4ce4","STA_ID":"7","CIT_NAME":"SORA","CIT_CODE":281},{"CIT_ID":"cdf8d4ad-b33f-4a65-8346-4f2fc8f3aea6","STA_ID":"26","CIT_NAME":"ARMENIA","CIT_CODE":1},{"CIT_ID":"ce5f505d-0090-47a0-90ff-302d892679ee","STA_ID":"21","CIT_NAME":"PUEBLOVIEJO","CIT_CODE":55},{"CIT_ID":"ce6bd3a1-4109-497d-8e0c-be45bf1bffa2","STA_ID":"31","CIT_NAME":"LA CUMBRE","CIT_CODE":67},{"CIT_ID":"ceb7077c-f4fc-4aa3-94a7-9abf3da3b93e","STA_ID":"7","CIT_NAME":"TOGUI","CIT_CODE":316},{"CIT_ID":"cedd3ecd-171b-4e71-a778-3072fa442ccf","STA_ID":"44","CIT_NAME":"FLORENCIA","CIT_CODE":1},{"CIT_ID":"cf06c857-e4dc-4f3e-a7cf-399d21e0b13d","STA_ID":"88","CIT_NAME":"LETONIA","CIT_CODE":520},{"CIT_ID":"cf2ba892-7802-4cbc-ae8c-1706c6d9c080","STA_ID":"23","CIT_NAME":"BARBACOAS","CIT_CODE":16},{"CIT_ID":"cf4addb8-0e3c-4478-97b4-4f08a3fa24b3","STA_ID":"21","CIT_NAME":"CONCORDIA","CIT_CODE":20},{"CIT_ID":"cf5c7f49-7e02-4699-a1a6-86a1e422b361","STA_ID":"5","CIT_NAME":"ARENAL","CIT_CODE":5},{"CIT_ID":"cf8fb7c8-bd16-454c-95fc-856b889e8f79","STA_ID":"1","CIT_NAME":"NECOCLI","CIT_CODE":192},{"CIT_ID":"cf95ddb6-86e4-4166-9678-3732fdf94eab","STA_ID":"1","CIT_NAME":"RETIRO","CIT_CODE":211},{"CIT_ID":"d02719b0-3948-4042-b0d5-03c80530b498","STA_ID":"46","CIT_NAME":"YOPAL","CIT_CODE":1},{"CIT_ID":"d0517421-1a29-4dc7-a0e7-bb907bb7ee0e","STA_ID":"29","CIT_NAME":"SALDA?A","CIT_CODE":105},{"CIT_ID":"d081fe76-27a0-4142-b887-140eaba991c7","STA_ID":"21","CIT_NAME":"ARIGUANI (EL DIFICIL)","CIT_CODE":12},{"CIT_ID":"d101d95f-4f22-4f2a-b820-2fb962526abe","STA_ID":"1","CIT_NAME":"EBEJICO","CIT_CODE":115},{"CIT_ID":"d109cf56-9dc1-46c4-b55f-7033efd96fcd","STA_ID":"60","CIT_NAME":"PUERTO SANTANDER","CIT_CODE":21},{"CIT_ID":"d119bfb3-7b59-40c5-ab0e-a23b31bf5010","STA_ID":"29","CIT_NAME":"AMBALEMA","CIT_CODE":10},{"CIT_ID":"d127f791-8fc3-4e85-b921-eb5cc81d81f0","STA_ID":"1","CIT_NAME":"SABANALARGA","CIT_CODE":217},{"CIT_ID":"d1328b34-a06c-4ff2-869d-17feca4e82e9","STA_ID":"7","CIT_NAME":"SABOYA","CIT_CODE":226},{"CIT_ID":"d1435746-a864-44b1-aa2b-2691be50a6d3","STA_ID":"1","CIT_NAME":"PUERTO BERRIO","CIT_CODE":205},{"CIT_ID":"d1a53a62-d3b2-4c20-bee0-2df62d3c54de","STA_ID":"3","CIT_NAME":"CAMPO DE LA CRUZ","CIT_CODE":7},{"CIT_ID":"d215d707-be84-4aab-a4e1-895115a82a4f","STA_ID":"15","CIT_NAME":"GUAYABAL DE SIQUIMA","CIT_CODE":127},{"CIT_ID":"d30b2e4f-18d3-4180-bd4e-ff8b6ad180e5","STA_ID":"52","CIT_NAME":"PUERTO LOPEZ","CIT_CODE":45},{"CIT_ID":"d31218b0-2508-41b3-8215-b86d26600d28","STA_ID":"28","CIT_NAME":"COROZAL","CIT_CODE":40},{"CIT_ID":"d4628fa2-6517-4719-81dd-2474b1e6ae30","STA_ID":"12","CIT_NAME":"BECERRIL","CIT_CODE":180},{"CIT_ID":"d4a9a416-955c-46de-94d7-f58f5baaae3f","STA_ID":"15","CIT_NAME":"SAN ANTONIO DEL TEQUENDAMA","CIT_CODE":220},{"CIT_ID":"d4accf6a-af86-4919-90f7-53b59e3a3597","STA_ID":"23","CIT_NAME":"LA TOLA","CIT_CODE":78},{"CIT_ID":"d5871dd5-967a-48bb-bb3c-332d7002cf29","STA_ID":"3","CIT_NAME":"SABANALARGA","CIT_CODE":46},{"CIT_ID":"d59e5084-139f-4a4c-959e-c6779748f4e8","STA_ID":"27","CIT_NAME":"SABANA DE TORRES","CIT_CODE":174},{"CIT_ID":"d5a84c03-7085-401b-ac45-c6f0fe0c302c","STA_ID":"7","CIT_NAME":"BELEN","CIT_CODE":13},{"CIT_ID":"d5d67073-60e3-4a28-93e2-2c3c4e828de0","STA_ID":"17","CIT_NAME":"UNION PANAMERICANA (LAS ANIMAS","CIT_CODE":60},{"CIT_ID":"d624c73b-4a1d-43f5-922a-86e20759e07b","STA_ID":"15","CIT_NAME":"PUERTO SALGAR","CIT_CODE":202},{"CIT_ID":"d63d976c-da36-4584-bcab-73c76285f152","STA_ID":"7","CIT_NAME":"SATIVASUR","CIT_CODE":262},{"CIT_ID":"d69402af-998d-4cc6-8915-2f32fc3061b9","STA_ID":"12","CIT_NAME":"CHIRIGUANA","CIT_CODE":375},{"CIT_ID":"d6cdc4f7-3f8c-4ee1-816e-32dfa74494ca","STA_ID":"40","CIT_NAME":"TAME","CIT_CODE":5},{"CIT_ID":"d72fccaa-597b-46eb-b1d7-4c24bcac324b","STA_ID":"5","CIT_NAME":"MAHATES","CIT_CODE":31},{"CIT_ID":"d77139bf-ebf6-4184-9eab-1eef158d34ef","STA_ID":"1","CIT_NAME":"OLAYA","CIT_CODE":193},{"CIT_ID":"d786ebd8-adbc-4a60-8202-6cb2566c2346","STA_ID":"23","CIT_NAME":"ANCUYA","CIT_CODE":10},{"CIT_ID":"d83ee51a-fe44-4b63-9603-1b7ca71a0e14","STA_ID":"31","CIT_NAME":"RIOFRIO","CIT_CODE":88},{"CIT_ID":"d8609371-9b45-4967-97f7-45bb615ca9fc","STA_ID":"28","CIT_NAME":"SAN JUAN DE BETULIA (BETULIA)","CIT_CODE":190},{"CIT_ID":"d86f0b70-dd50-4f8d-bf34-61cce0f66b3d","STA_ID":"68","CIT_NAME":"TARAIRA","CIT_CODE":17},{"CIT_ID":"d871963c-eca1-47aa-b6bd-30e634574790","STA_ID":"19","CIT_NAME":"PAICOL","CIT_CODE":52},{"CIT_ID":"d87a314d-4e28-4f11-92ad-67a2680a5b37","STA_ID":"29","CIT_NAME":"PIEDRAS","CIT_CODE":88},{"CIT_ID":"d88210b0-6abc-417e-9ff1-0b3a31044af0","STA_ID":"1","CIT_NAME":"CACERES","CIT_CODE":64},{"CIT_ID":"d894f5e0-ede1-4541-9963-2e90ff2476d6","STA_ID":"15","CIT_NAME":"FUSAGASUGA","CIT_CODE":94},{"CIT_ID":"d9721a50-6abc-4117-81b0-41d5a232300a","STA_ID":"7","CIT_NAME":"MONIQUIRA","CIT_CODE":160},{"CIT_ID":"d97bd49e-345a-49cb-9948-bc93b8e0b059","STA_ID":"28","CIT_NAME":"GUARANDA","CIT_CODE":49},{"CIT_ID":"d981ae07-db27-4a15-8afe-d7626b593ff8","STA_ID":"17","CIT_NAME":"UNGUIA","CIT_CODE":48},{"CIT_ID":"d99cf361-4a8d-47c0-9b8a-35d74b314793","STA_ID":"72","CIT_NAME":"CUMARIBO","CIT_CODE":6},{"CIT_ID":"d9a37354-7f6e-4978-8949-8c1ac671dab6","STA_ID":"23","CIT_NAME":"CUMBITARA","CIT_CODE":39},{"CIT_ID":"da102e6e-1add-4176-9f3b-bf220cfdbffb","STA_ID":"19","CIT_NAME":"NATAGA","CIT_CODE":50},{"CIT_ID":"da259ead-8ecc-4828-89c5-e2f7bcf819fa","STA_ID":"88","CIT_NAME":"POLONIA","CIT_CODE":675},{"CIT_ID":"da2bbd7e-b40f-426d-aecf-7a936fc3a3a9","STA_ID":"19","CIT_NAME":"TESALIA (CARNICERIAS)","CIT_CODE":25},{"CIT_ID":"da2c4037-420e-450e-8e16-72f5e5458519","STA_ID":"88","CIT_NAME":"ARGENTINA","CIT_CODE":155},{"CIT_ID":"da3bcdde-f988-4774-a967-71a4be7cf30e","STA_ID":"48","CIT_NAME":"LA JAGUA DEL PILAR","CIT_CODE":12},{"CIT_ID":"da907a19-a11f-4d99-aaa7-4ea1046bc0f4","STA_ID":"1","CIT_NAME":"EL BAGRE","CIT_CODE":117},{"CIT_ID":"daf40123-52b2-496b-b232-f0d6b119c74b","STA_ID":"15","CIT_NAME":"SIMIJACA","CIT_CODE":244},{"CIT_ID":"daf5df3a-de1e-415b-8cb1-71c55664ada2","STA_ID":"27","CIT_NAME":"LOS SANTOS","CIT_CODE":124},{"CIT_ID":"daf89686-d64c-4479-a293-e87c066b0fa8","STA_ID":"1","CIT_NAME":"CARMEN DE VIBORAL","CIT_CODE":82},{"CIT_ID":"daf89e15-3e22-443c-8c8a-57adcfeabcff","STA_ID":"28","CIT_NAME":"LA UNION","CIT_CODE":50},{"CIT_ID":"db61c482-433e-4097-9924-6e88c29f03f5","STA_ID":"5","CIT_NAME":"ZAMBRANO","CIT_CODE":127},{"CIT_ID":"dbb24b99-318f-40a1-8e61-cb6b7100a7c7","STA_ID":"15","CIT_NAME":"FUNZA","CIT_CODE":88},{"CIT_ID":"dbe51021-d533-48ac-a4ac-387d9cb4e453","STA_ID":"46","CIT_NAME":"LA SALINA","CIT_CODE":480},{"CIT_ID":"dc31c11b-0b87-4a19-9e6e-9ed601785d30","STA_ID":"15","CIT_NAME":"VERGARA","CIT_CODE":319},{"CIT_ID":"dc3d6cfc-1b4a-43b7-a9c3-3501950a58cc","STA_ID":"13","CIT_NAME":"SAN PELAYO","CIT_CODE":55},{"CIT_ID":"dcc4c6d2-6c0a-46ef-8e4e-39f7c18e6980","STA_ID":"7","CIT_NAME":"SORACA","CIT_CODE":282},{"CIT_ID":"dcd2f023-cb64-4bc3-a6e0-c6d0fe150915","STA_ID":"1","CIT_NAME":"JARDIN","CIT_CODE":157},{"CIT_ID":"dd5e4507-39dc-40b9-af20-7c6f35078c7c","STA_ID":"7","CIT_NAME":"BUENAVISTA","CIT_CODE":31},{"CIT_ID":"dd73b98e-5266-4c3b-979c-2adbdc87c242","STA_ID":"46","CIT_NAME":"TRINIDAD","CIT_CODE":865},{"CIT_ID":"dd83b5a5-d299-4fe0-bb8a-97069edac028","STA_ID":"15","CIT_NAME":"TOPAIPI","CIT_CODE":295},{"CIT_ID":"dd929380-08c8-4b11-88ec-77fec9cfd896","STA_ID":"27","CIT_NAME":"GUAVATA","CIT_CODE":103},{"CIT_ID":"ddd8a053-c8ab-492e-91c6-5bae0b35008c","STA_ID":"7","CIT_NAME":"SANTANA","CIT_CODE":250},{"CIT_ID":"ddf3b1c1-6dfd-47ab-9775-2bb335c58424","STA_ID":"88","CIT_NAME":"HONDURAS","CIT_CODE":440},{"CIT_ID":"ddf9730e-3623-425c-aeeb-d8fcad3bea69","STA_ID":"11","CIT_NAME":"TOTORO","CIT_CODE":97},{"CIT_ID":"de3a12c0-40b7-4ec6-9b1a-096a817f34fe","STA_ID":"88","CIT_NAME":"TURQUIA","CIT_CODE":770},{"CIT_ID":"de444628-cc99-4790-97c7-2b4f778ce5e5","STA_ID":"7","CIT_NAME":"TUNJA","CIT_CODE":1},{"CIT_ID":"dea59982-986f-44ad-aa05-52a8823bb11e","STA_ID":"13","CIT_NAME":"MONTERIA","CIT_CODE":1},{"CIT_ID":"ded66b84-a467-4db3-9548-775b4538a3c1","STA_ID":"27","CIT_NAME":"PIEDECUESTA","CIT_CODE":160},{"CIT_ID":"ded79557-3b9f-4919-bd33-10e15301db19","STA_ID":"7","CIT_NAME":"MONGUI","CIT_CODE":157},{"CIT_ID":"df1b9080-0f64-4d61-98af-ccc8856898c4","STA_ID":"21","CIT_NAME":"ARACATACA","CIT_CODE":10},{"CIT_ID":"df22ac28-5bb9-4674-86f3-e2ae7c556b41","STA_ID":"44","CIT_NAME":"CURILLO","CIT_CODE":12},{"CIT_ID":"df757040-7043-4d94-8f71-6fe04f6d0f88","STA_ID":"7","CIT_NAME":"TUTAZA","CIT_CODE":331},{"CIT_ID":"df91f1a8-1de4-4432-8dd4-823e6f906062","STA_ID":"29","CIT_NAME":"SUAREZ","CIT_CODE":115},{"CIT_ID":"dfcda610-c98a-4673-a484-5311e6a6ef8d","STA_ID":"24","CIT_NAME":"PEREIRA","CIT_CODE":1},{"CIT_ID":"e01ab79e-adbb-4790-8b70-472b5b6764bf","STA_ID":"27","CIT_NAME":"SAN JOSE DE MIRANDA","CIT_CODE":187},{"CIT_ID":"e0318ac7-e3c6-4c81-9691-1b88e1950659","STA_ID":"31","CIT_NAME":"PRADERA","CIT_CODE":82},{"CIT_ID":"e04f9b0f-01d0-443d-bc74-170f546740c5","STA_ID":"27","CIT_NAME":"EL CARMEN","CIT_CODE":71},{"CIT_ID":"e0717f72-b2a8-4c6a-9500-52b0d8a015c3","STA_ID":"31","CIT_NAME":"SEVILLA","CIT_CODE":97},{"CIT_ID":"e0d30bd7-121b-49e4-8a60-92db2c52cf5e","STA_ID":"7","CIT_NAME":"LABRANZAGRANDE","CIT_CODE":127},{"CIT_ID":"e0d8b12c-fe8a-4610-957a-5b9c1ed0c4e2","STA_ID":"1","CIT_NAME":"ZARAGOZA","CIT_CODE":301},{"CIT_ID":"e116bf7c-eefa-448a-800a-4e3908107990","STA_ID":"27","CIT_NAME":"SAN GIL","CIT_CODE":181},{"CIT_ID":"e1182043-490b-46e3-b0d2-81696ea092fa","STA_ID":"27","CIT_NAME":"COROMORO","CIT_CODE":55},{"CIT_ID":"e157d414-6d4b-4e13-8814-823d2e8d12b4","STA_ID":"64","CIT_NAME":"PUERTO ASIS","CIT_CODE":2},{"CIT_ID":"e1612862-0b3d-4a12-bc7f-670f5e1068d3","STA_ID":"27","CIT_NAME":"GUEPSA","CIT_CODE":106},{"CIT_ID":"e17c5904-b08d-41f1-a562-64abac234a87","STA_ID":"28","CIT_NAME":"CHALAN","CIT_CODE":45},{"CIT_ID":"e1d548df-50d4-4c86-8e1f-be8484b3e6e8","STA_ID":"21","CIT_NAME":"SANTA MARTA","CIT_CODE":1},{"CIT_ID":"e1d7bf3a-c03a-4c03-bf4f-4d20a426fb4b","STA_ID":"15","CIT_NAME":"SAN JUAN DE RIOSECO","CIT_CODE":232},{"CIT_ID":"e2ca5d11-6350-450d-8537-b5c44b224791","STA_ID":"19","CIT_NAME":"TELLO","CIT_CODE":82},{"CIT_ID":"e2e61206-879e-4c7d-96f5-d60435fe95b8","STA_ID":"15","CIT_NAME":"CAQUEZA","CIT_CODE":37},{"CIT_ID":"e2e69585-8b5f-43f8-b667-eaf817080969","STA_ID":"48","CIT_NAME":"SAN JUAN DEL CESAR","CIT_CODE":13},{"CIT_ID":"e32d0b41-b949-4948-a098-7c993d5449f8","STA_ID":"1","CIT_NAME":"SAN JUAN DE URABA","CIT_CODE":231},{"CIT_ID":"e3539675-1159-44b1-a1ca-b06ef4cc4b5b","STA_ID":"15","CIT_NAME":"GUASCA","CIT_CODE":118},{"CIT_ID":"e3572193-a542-43b4-97d1-74927ef0a3c6","STA_ID":"7","CIT_NAME":"TUNUNGUA","CIT_CODE":324},{"CIT_ID":"e35894bb-cce8-4e6b-be56-c077be193a81","STA_ID":"50","CIT_NAME":"PANA PANA (CAMPO ALEGRE)","CIT_CODE":87},{"CIT_ID":"e36138e7-9eaf-4156-9512-544d7257da65","STA_ID":"9","CIT_NAME":"SAN JOSE","CIT_CODE":120},{"CIT_ID":"e38f17e6-47fe-4bea-a941-41f3f0dbfba9","STA_ID":"3","CIT_NAME":"SANTA LUCIA","CIT_CODE":47},{"CIT_ID":"e38fbc70-a261-4aa1-8d10-819197f4678e","STA_ID":"1","CIT_NAME":"COPACABANA","CIT_CODE":103},{"CIT_ID":"e3ae352c-db3d-4471-983b-b239afc27df4","STA_ID":"7","CIT_NAME":"PAUNA","CIT_CODE":190},{"CIT_ID":"e3ea4879-a0d3-47b1-bea5-b909198a7e65","STA_ID":"15","CIT_NAME":"ARBELAEZ","CIT_CODE":16},{"CIT_ID":"e4485e79-9e8a-4fce-915e-a52c34f2837f","STA_ID":"88","CIT_NAME":"BRASIL","CIT_CODE":220},{"CIT_ID":"e46a42c5-9d0d-4df6-ae70-c1dad34623b1","STA_ID":"24","CIT_NAME":"MARSELLA","CIT_CODE":54},{"CIT_ID":"e4b32659-0f73-4fc3-b70d-2b9a71378c2f","STA_ID":"3","CIT_NAME":"CANDELARIA","CIT_CODE":10},{"CIT_ID":"e4f5aa9e-f8a6-4034-949e-8568b3451348","STA_ID":"15","CIT_NAME":"LA VEGA","CIT_CODE":151},{"CIT_ID":"e53d27ac-f34b-4868-b48d-e899eadffeb0","STA_ID":"25","CIT_NAME":"ARBOLEDAS","CIT_CODE":7},{"CIT_ID":"e6055f9c-7cc5-4b8c-9a0b-c6596457f509","STA_ID":"12","CIT_NAME":"PAILITAS","CIT_CODE":650},{"CIT_ID":"e62aa8e0-f012-47fa-9ba3-1bc01f09b10b","STA_ID":"13","CIT_NAME":"SAN BERNARDO DEL VIENTO","CIT_CODE":46},{"CIT_ID":"e64e58e3-c9b1-43fc-8ef3-787f8c6e98fb","STA_ID":"9","CIT_NAME":"AGUADAS","CIT_CODE":4},{"CIT_ID":"e65ff0e6-f79e-4d63-a531-8960cd2fec34","STA_ID":"7","CIT_NAME":"JENESANO","CIT_CODE":121},{"CIT_ID":"e663eaf9-214b-4a93-b2ce-351605db961a","STA_ID":"7","CIT_NAME":"CAMPOHERMOSO","CIT_CODE":40},{"CIT_ID":"e671678b-fff3-47e7-943e-ac6c1f383bee","STA_ID":"44","CIT_NAME":"CARTAGENA DEL CHAIRA","CIT_CODE":3},{"CIT_ID":"e6ae76f6-465c-4042-bd72-b19e800dd125","STA_ID":"5","CIT_NAME":"VILLANUEVA","CIT_CODE":124},{"CIT_ID":"e6c0eac9-d8f1-40df-b091-1617cd906ca0","STA_ID":"13","CIT_NAME":"CERETE","CIT_CODE":10},{"CIT_ID":"e7049a6d-74c4-437d-8f5c-bea34aa1c0ba","STA_ID":"13","CIT_NAME":"SAN ANDRES DE SOTAVENTO","CIT_CODE":40},{"CIT_ID":"e79de44b-f39d-4d0f-a228-c9a071041818","STA_ID":"19","CIT_NAME":"TIMANA","CIT_CODE":88},{"CIT_ID":"e7d6b82b-9366-4d65-9243-12707e1ab181","STA_ID":"1","CIT_NAME":"VALPARAISO","CIT_CODE":289},{"CIT_ID":"e7f0c2d6-8dc3-491d-b900-27f9b3225c49","STA_ID":"13","CIT_NAME":"CANALETE","CIT_CODE":9},{"CIT_ID":"e916c9e3-c61d-4247-bfc4-3a181132ce19","STA_ID":"52","CIT_NAME":"LA MACARENA","CIT_CODE":41},{"CIT_ID":"e94c6a47-aa2c-4872-9d2b-755ebaca3d6d","STA_ID":"1","CIT_NAME":"SOPETRAN","CIT_CODE":265},{"CIT_ID":"e9501e13-e830-45a6-822b-23c4d86d190a","STA_ID":"15","CIT_NAME":"LENGUAZAQUE","CIT_CODE":154},{"CIT_ID":"e96b86ae-23cf-4fac-b79e-5bd4ef97512b","STA_ID":"7","CIT_NAME":"GACHANTIVA","CIT_CODE":94},{"CIT_ID":"e9708e00-4fab-4a97-b2f2-d62939793a48","STA_ID":"88","CIT_NAME":"NUEVA ZELANDIA","CIT_CODE":625},{"CIT_ID":"e9994b37-f55e-47c9-bfa0-6461fd0aac8f","STA_ID":"7","CIT_NAME":"CHITARAQUE","CIT_CODE":76},{"CIT_ID":"e9acb057-6446-4225-99d9-bc9ad91300a0","STA_ID":"88","CIT_NAME":"MARRUECOS","CIT_CODE":580},{"CIT_ID":"e9be16f6-717d-4995-8f12-406681221412","STA_ID":"21","CIT_NAME":"EL PI?ON","CIT_CODE":28},{"CIT_ID":"e9ce7209-3d22-4671-9d62-d3cc23d9f1db","STA_ID":"23","CIT_NAME":"NARI?O","CIT_CODE":96},{"CIT_ID":"ea151cc8-b8d9-4be1-9f71-9d8a6876d8ce","STA_ID":"15","CIT_NAME":"UBAQUE","CIT_CODE":301},{"CIT_ID":"ea2aefcd-32b3-4d8a-bebb-934f0509103d","STA_ID":"7","CIT_NAME":"FLORESTA","CIT_CODE":91},{"CIT_ID":"ea8abf56-3275-4374-9b01-745d6e357c32","STA_ID":"17","CIT_NAME":"ATRATO (YUTO)","CIT_CODE":2},{"CIT_ID":"eaacc139-2d83-47aa-a646-fa123a2df272","STA_ID":"40","CIT_NAME":"CRAVO NORTE","CIT_CODE":15},{"CIT_ID":"eb0af46a-4236-4e11-bbb4-d47c4ba0ff24","STA_ID":"7","CIT_NAME":"PESCA","CIT_CODE":202},{"CIT_ID":"eb3aefd8-8ae3-43b3-a730-dd33e33eb8bf","STA_ID":"13","CIT_NAME":"MONTELIBANO","CIT_CODE":25},{"CIT_ID":"eb461548-d6fc-4317-9f12-bd6eb1862be2","STA_ID":"64","CIT_NAME":"SAN FRANCISCO","CIT_CODE":13},{"CIT_ID":"eb5deb6e-7065-4eab-80bd-443a947baa8f","STA_ID":"11","CIT_NAME":"EL TAMBO","CIT_CODE":25},{"CIT_ID":"ec1673c2-b1fe-44d6-bbe1-119e2e24ee92","STA_ID":"15","CIT_NAME":"GACHETA","CIT_CODE":103},{"CIT_ID":"ec31259e-3975-4f39-a6de-96fb458ec199","STA_ID":"1","CIT_NAME":"MARINILLA","CIT_CODE":178},{"CIT_ID":"ec897659-a9ea-4fed-bfa5-a9246aea5c8e","STA_ID":"25","CIT_NAME":"VILLA DEL ROSARIO","CIT_CODE":100},{"CIT_ID":"ecbf058b-b3b0-47df-9239-9ee7c06a4148","STA_ID":"5","CIT_NAME":"ARJONA","CIT_CODE":7},{"CIT_ID":"ed81f1ba-3eed-45ed-b64b-5049d4a7422d","STA_ID":"1","CIT_NAME":"AMALFI","CIT_CODE":16},{"CIT_ID":"ed9fc043-2142-4898-b450-c25fb5139f8d","STA_ID":"13","CIT_NAME":"AYAPEL","CIT_CODE":4},{"CIT_ID":"ee8f732b-3f7c-458d-8f6f-1bad7247ba24","STA_ID":"52","CIT_NAME":"PUERTO CONCORDIA","CIT_CODE":47},{"CIT_ID":"eec18431-0bdf-4413-bcd9-1dc6568c9c0a","STA_ID":"7","CIT_NAME":"CIENEGA","CIT_CODE":46},{"CIT_ID":"eef50de2-1d56-40e4-b4bb-2a24ab4ff946","STA_ID":"48","CIT_NAME":"MANAURE","CIT_CODE":11},{"CIT_ID":"ef2725a8-e432-4d35-9848-3e5c50f142e9","STA_ID":"44","CIT_NAME":"SAN VICENTE DEL CAGUAN","CIT_CODE":10},{"CIT_ID":"ef344922-b50d-4d51-8246-6a0101b57d46","STA_ID":"23","CIT_NAME":"SAMANIEGO","CIT_CODE":115},{"CIT_ID":"ef6c0ffe-d0cd-4f22-a461-4ce9d51624d3","STA_ID":"52","CIT_NAME":"MESETAS","CIT_CODE":44},{"CIT_ID":"ef7b8362-18a8-4cc1-97d0-9ba52192fb3b","STA_ID":"7","CIT_NAME":"TENZA","CIT_CODE":301},{"CIT_ID":"f0067413-5038-468f-92f7-448df17eaebd","STA_ID":"88","CIT_NAME":"DINAMARCA","CIT_CODE":325},{"CIT_ID":"f01757f8-747c-4bff-b2b3-d81521751141","STA_ID":"52","CIT_NAME":"EL CALVARIO","CIT_CODE":25},{"CIT_ID":"f02d0be6-0580-40eb-9ec1-a5567bc4c90d","STA_ID":"5","CIT_NAME":"CARTAGENA","CIT_CODE":1},{"CIT_ID":"f04ff632-5b3f-4482-9ffd-0247edf42425","STA_ID":"1","CIT_NAME":"GIRARDOTA","CIT_CODE":133},{"CIT_ID":"f054cbed-6f52-49a1-acbf-6bee48cad11d","STA_ID":"25","CIT_NAME":"EL TARRA","CIT_CODE":36},{"CIT_ID":"f05aee01-60d4-4398-945c-6cdb5537aa4d","STA_ID":"44","CIT_NAME":"VALPARAISO","CIT_CODE":40},{"CIT_ID":"f08933ce-65a3-465a-9c58-d76c189a1f97","STA_ID":"64","CIT_NAME":"SAN MIGUEL (LA DORADA)","CIT_CODE":18},{"CIT_ID":"f128a4af-fd11-4d56-8998-144a90a1b35a","STA_ID":"12","CIT_NAME":"ASTREA","CIT_CODE":170},{"CIT_ID":"f1759828-12ee-43d9-a451-73537dfff4cb","STA_ID":"27","CIT_NAME":"PUERTO WILCHES","CIT_CODE":169},{"CIT_ID":"f1a4781c-ec12-4e60-802a-9eecfe8e5d54","STA_ID":"7","CIT_NAME":"RAQUIRA","CIT_CODE":220},{"CIT_ID":"f1a7537b-7cd4-4c2c-a93a-e7590bd00fba","STA_ID":"17","CIT_NAME":"RIO IRO","CIT_CODE":32},{"CIT_ID":"f1a9a9a1-a1bd-43f8-a303-6d2113cde29c","STA_ID":"24","CIT_NAME":"PUEBLO RICO","CIT_CODE":70},{"CIT_ID":"f1a9ffc9-398c-4b8a-bfc5-5a77566c67a3","STA_ID":"28","CIT_NAME":"COVE?AS","CIT_CODE":41},{"CIT_ID":"f23cf282-9b91-429e-9c8b-13d373de63c7","STA_ID":"1","CIT_NAME":"MACEO","CIT_CODE":175},{"CIT_ID":"f2404247-d2a8-445b-b81d-da9624615eb9","STA_ID":"28","CIT_NAME":"OVEJAS","CIT_CODE":100},{"CIT_ID":"f24dfd1b-e155-4f08-b166-1ba011340892","STA_ID":"29","CIT_NAME":"HERVEO","CIT_CODE":61},{"CIT_ID":"f2bfa088-e3f0-4b44-948e-d9e9f35e6ae7","STA_ID":"1","CIT_NAME":"SAN JERONIMO","CIT_CODE":229},{"CIT_ID":"f2c44ef0-102f-4a25-9c62-256ae81b6fa8","STA_ID":"1","CIT_NAME":"ENVIGADO","CIT_CODE":121},{"CIT_ID":"f2c9bc60-16c8-4afc-a101-478f37bb391e","STA_ID":"1","CIT_NAME":"ANGELOPOLIS","CIT_CODE":22},{"CIT_ID":"f2dd389b-094d-44bf-8d3d-2ae464f006ce","STA_ID":"29","CIT_NAME":"NATAGAIMA","CIT_CODE":82},{"CIT_ID":"f2dd9c2b-716c-40cd-8798-d6252341bd0c","STA_ID":"3","CIT_NAME":"SABANAGRANDE","CIT_CODE":43},{"CIT_ID":"f2e70b31-40e6-448b-aafd-2a78440de71b","STA_ID":"21","CIT_NAME":"FUNDACION","CIT_CODE":31},{"CIT_ID":"f2ea7e0e-0377-417f-b7cb-4aa87b115213","STA_ID":"23","CIT_NAME":"EL TAMBO","CIT_CODE":46},{"CIT_ID":"f2eda671-68bd-43f9-a27c-20d63d142814","STA_ID":"29","CIT_NAME":"MELGAR","CIT_CODE":79},{"CIT_ID":"f3298f95-456e-4352-b4ce-6988eb01d073","STA_ID":"15","CIT_NAME":"SAN FRANCISCO","CIT_CODE":229},{"CIT_ID":"f3318542-5b1f-47be-822b-2a50e1d4db69","STA_ID":"46","CIT_NAME":"CHAMEZA","CIT_CODE":120},{"CIT_ID":"f35bfd48-52a2-480c-87bc-c9b4c1c4a3e6","STA_ID":"12","CIT_NAME":"SAN ALBERTO","CIT_CODE":800},{"CIT_ID":"f360b47b-f9dc-4112-9a07-4e804d12b431","STA_ID":"25","CIT_NAME":"SARDINATA","CIT_CODE":85},{"CIT_ID":"f37266b5-f654-449d-a01d-15bee5c9dfeb","STA_ID":"31","CIT_NAME":"GINEBRA","CIT_CODE":58},{"CIT_ID":"f3edef29-e980-40e1-afe6-5221fc5c652a","STA_ID":"88","CIT_NAME":"BELGICA","CIT_CODE":190},{"CIT_ID":"f410aa6d-5519-4b8b-9c2f-746cbc8569c5","STA_ID":"3","CIT_NAME":"SANTO TOMAS","CIT_CODE":49},{"CIT_ID":"f430ecb5-71c7-476e-8b85-87262d6454c3","STA_ID":"1","CIT_NAME":"URRAO","CIT_CODE":283},{"CIT_ID":"f43c459b-2684-4cfb-8a24-4f0d587c89d0","STA_ID":"3","CIT_NAME":"MANATI","CIT_CODE":25},{"CIT_ID":"f510ce2b-ce7e-460d-bdc2-47bb9bb46d73","STA_ID":"29","CIT_NAME":"MURILLO","CIT_CODE":80},{"CIT_ID":"f54f47ef-d1dc-4a1f-aec2-2d9c0bc8c347","STA_ID":"29","CIT_NAME":"CARMEN DE APICALA","CIT_CODE":25},{"CIT_ID":"f57732be-7d93-4111-a803-33ff7de9649b","STA_ID":"1","CIT_NAME":"ABRIAQUI","CIT_CODE":7},{"CIT_ID":"f5b04629-f145-4f7b-96c2-005179cf0ff7","STA_ID":"15","CIT_NAME":"CHOCONTA","CIT_CODE":64},{"CIT_ID":"f6522cf5-fa84-4ab6-a313-7f3a5d998b8a","STA_ID":"17","CIT_NAME":"SAN JOSE DEL PALMAR","CIT_CODE":37},{"CIT_ID":"f65d53aa-4c19-487a-aa1e-0ac6a04c1bfd","STA_ID":"9","CIT_NAME":"MARULANDA","CIT_CODE":67},{"CIT_ID":"f66218c8-ea59-41c6-a296-e0124c06e6a5","STA_ID":"68","CIT_NAME":"YAVARATE","CIT_CODE":22},{"CIT_ID":"f6ab2018-6cda-4e13-a89b-2f3361bff391","STA_ID":"27","CIT_NAME":"PARAMO","CIT_CODE":157},{"CIT_ID":"f6ead640-2653-424e-8d5a-3af1349cfae9","STA_ID":"12","CIT_NAME":"GAMARRA","CIT_CODE":450},{"CIT_ID":"f760af8e-9716-479f-9fce-a502fae06dde","STA_ID":"24","CIT_NAME":"LA VIRGINIA","CIT_CODE":46},{"CIT_ID":"f7706a3e-1501-479b-9114-e46032361bdf","STA_ID":"1","CIT_NAME":"PUERTO TRIUNFO","CIT_CODE":206},{"CIT_ID":"f784ac24-68ea-416c-b3d8-97fdf8007248","STA_ID":"25","CIT_NAME":"CACOTA","CIT_CODE":16},{"CIT_ID":"f7bbbf4c-275b-4239-965f-2fdfc742e92a","STA_ID":"7","CIT_NAME":"SACHICA","CIT_CODE":232},{"CIT_ID":"f7d93d41-8855-45b2-87ac-7a49aecb3233","STA_ID":"23","CIT_NAME":"GUACHUCAL","CIT_CODE":52},{"CIT_ID":"f7edcaa7-3596-44af-8137-7b34fc697c0f","STA_ID":"21","CIT_NAME":"SITIONUEVO","CIT_CODE":79},{"CIT_ID":"f7f14def-de5d-40f4-811b-958ae9c99c63","STA_ID":"1","CIT_NAME":"PE?OL","CIT_CODE":196},{"CIT_ID":"f815c643-681b-4ba9-a12e-8e186ad4a065","STA_ID":"7","CIT_NAME":"TURMEQUE","CIT_CODE":325},{"CIT_ID":"f824d2d5-bac1-44bc-a4d7-08c6d68b2b80","STA_ID":"1","CIT_NAME":"CAROLINA","CIT_CODE":85},{"CIT_ID":"f831c17b-16eb-4dae-9577-b47af22875ed","STA_ID":"1","CIT_NAME":"MEDELLIN","CIT_CODE":1},{"CIT_ID":"f8388f1a-dfae-44d3-bd5f-c803b404f2ed","STA_ID":"31","CIT_NAME":"BUGALAGRANDE","CIT_CODE":25},{"CIT_ID":"f873c5ad-0262-441b-b946-5c22298113f4","STA_ID":"31","CIT_NAME":"BUENAVENTURA","CIT_CODE":19},{"CIT_ID":"f8ab8707-3b77-4724-903b-a75a0d2ad3d4","STA_ID":"27","CIT_NAME":"CHARTA","CIT_CODE":64},{"CIT_ID":"f8dfbe9c-c717-4be7-a520-63bddece9f0e","STA_ID":"15","CIT_NAME":"QUEBRADANEGRA","CIT_CODE":208},{"CIT_ID":"f8f8dc14-4d50-4a52-8f2d-44b902a645f2","STA_ID":"25","CIT_NAME":"SILOS","CIT_CODE":88},{"CIT_ID":"f9127517-7249-4775-94f2-ba771a9535a7","STA_ID":"88","CIT_NAME":"CURAZAO","CIT_CODE":140},{"CIT_ID":"f94e9b02-c971-4a9d-bc3f-3b803e562ee3","STA_ID":"15","CIT_NAME":"ANAPOIMA","CIT_CODE":10},{"CIT_ID":"f99a77be-4c1e-408b-a939-064a35db580b","STA_ID":"9","CIT_NAME":"BELALCAZAR","CIT_CODE":22},{"CIT_ID":"f9a84321-c6b1-4249-8fab-65e79c93119f","STA_ID":"21","CIT_NAME":"GUAMAL","CIT_CODE":40},{"CIT_ID":"f9d9e9e9-906c-4acf-948b-e22c1aebf82e","STA_ID":"29","CIT_NAME":"VILLAHERMOSA","CIT_CODE":124},{"CIT_ID":"f9ec3216-ae96-4fef-8d09-4f3966057175","STA_ID":"46","CIT_NAME":"RECETOR","CIT_CODE":760},{"CIT_ID":"f9ee936f-9b0f-4d86-9c80-9e3389efeafa","STA_ID":"25","CIT_NAME":"GRAMALOTE","CIT_CODE":40},{"CIT_ID":"fa10a4f0-fe66-41b8-ae44-ba18100699a8","STA_ID":"15","CIT_NAME":"VIOTA","CIT_CODE":331},{"CIT_ID":"fa1cd5c9-c0ad-47f5-b0b8-27e7616f0c94","STA_ID":"5","CIT_NAME":"TURBANA","CIT_CODE":121},{"CIT_ID":"fa1dbaf7-fe5c-4f28-898e-8aa4df0b6980","STA_ID":"46","CIT_NAME":"TAURAMENA","CIT_CODE":850},{"CIT_ID":"fa279cfa-0b24-4c6b-902e-489e4e39795f","STA_ID":"46","CIT_NAME":"VILLANUEVA","CIT_CODE":880},{"CIT_ID":"fa468531-7f11-46d6-a2ec-a0e81d2bb751","STA_ID":"11","CIT_NAME":"LA SIERRA","CIT_CODE":37},{"CIT_ID":"fa584481-9899-4b68-b2f3-aaffdd789ff6","STA_ID":"15","CIT_NAME":"QUIPILE","CIT_CODE":214},{"CIT_ID":"fa8f304e-abcc-4491-bed0-05edec90245c","STA_ID":"56","CIT_NAME":"SAN ANDRES","CIT_CODE":1},{"CIT_ID":"faa2e97c-4e9a-4c54-8259-19168e7e451f","STA_ID":"24","CIT_NAME":"DOSQUEBRADAS","CIT_CODE":25},{"CIT_ID":"fb00bc81-73ef-44df-83c5-ec1b19a8222d","STA_ID":"25","CIT_NAME":"RAGONVALIA","CIT_CODE":70},{"CIT_ID":"fbc99383-6e7b-4253-aa10-9fd2a9ffccac","STA_ID":"15","CIT_NAME":"QUETAME","CIT_CODE":211},{"CIT_ID":"fc17c449-e064-4ae7-b994-2cb41215806a","STA_ID":"19","CIT_NAME":"OPORAPA","CIT_CODE":51},{"CIT_ID":"fc30d2c5-0bb8-478b-836d-003df4afe0fb","STA_ID":"17","CIT_NAME":"CONDOTO","CIT_CODE":13},{"CIT_ID":"fc515db7-7698-4f92-8e39-177677e82152","STA_ID":"29","CIT_NAME":"VALLE DE SAN JUAN","CIT_CODE":118},{"CIT_ID":"fcccc962-e8dd-495d-a9b5-8f5e4527b16b","STA_ID":"52","CIT_NAME":"EL CASTILLO","CIT_CODE":27},{"CIT_ID":"fd38161f-2db0-415f-890c-269e2599ccd7","STA_ID":"1","CIT_NAME":"CISNEROS","CIT_CODE":91},{"CIT_ID":"fd98477c-024e-4776-a4ee-94cab75f52e3","STA_ID":"5","CIT_NAME":"EL PE?ON","CIT_CODE":27},{"CIT_ID":"fd9ccb0a-dd49-40b0-b46f-20c5d211020f","STA_ID":"19","CIT_NAME":"GUADALUPE","CIT_CODE":40},{"CIT_ID":"fde02d75-a40a-4f1c-87c8-503cf4b0a43d","STA_ID":"27","CIT_NAME":"BUCARAMANGA","CIT_CODE":1},{"CIT_ID":"fe0916d4-5c31-4a5b-aff7-57a8a8fb501f","STA_ID":"21","CIT_NAME":"SAN ZENON","CIT_CODE":73},{"CIT_ID":"fe48dab7-c242-4ccd-b3de-582bb929ecb3","STA_ID":"27","CIT_NAME":"AGUADA","CIT_CODE":4},{"CIT_ID":"fe59fc75-ec1d-46d6-a58b-390d98bec96e","STA_ID":"11","CIT_NAME":"GUAPI","CIT_CODE":28},{"CIT_ID":"febf0dec-d758-4a14-b548-597c320d22bc","STA_ID":"23","CIT_NAME":"LOS ANDES (SOTOMAYOR)","CIT_CODE":85},{"CIT_ID":"ff3697ef-1f6a-4f05-8d1d-111aad97e2ab","STA_ID":"23","CIT_NAME":"LA CRUZ","CIT_CODE":73},{"CIT_ID":"ff69cdc9-b7c5-4fba-b95f-e500a5344894","STA_ID":"5","CIT_NAME":"EL CARMEN DE BOLIVAR","CIT_CODE":22},{"CIT_ID":"ffb8f117-1244-435b-9574-82b678cf2bc0","STA_ID":"29","CIT_NAME":"ESPINAL","CIT_CODE":46},{"CIT_ID":"fff3b6d2-6333-4b9b-b146-6fdb493d9bae","STA_ID":"25","CIT_NAME":"LABATECA","CIT_CODE":49},{"CIT_ID":"fffe2f97-f859-43e9-99cc-20709e5818a5","STA_ID":"29","CIT_NAME":"RONCESVALLES","CIT_CODE":100}]

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = [{"STA_ID":"1","T_G_COU_ID":49,"STA_NAME":"ANTIOQUIA"},{"STA_ID":"11","T_G_COU_ID":49,"STA_NAME":"CAUCA"},{"STA_ID":"12","T_G_COU_ID":49,"STA_NAME":"CESAR"},{"STA_ID":"13","T_G_COU_ID":49,"STA_NAME":"CORDOBA"},{"STA_ID":"15","T_G_COU_ID":49,"STA_NAME":"CUNDINAMARCA"},{"STA_ID":"16","T_G_COU_ID":49,"STA_NAME":"BOGOTA D.C."},{"STA_ID":"17","T_G_COU_ID":49,"STA_NAME":"CHOCO"},{"STA_ID":"19","T_G_COU_ID":49,"STA_NAME":"HUILA"},{"STA_ID":"21","T_G_COU_ID":49,"STA_NAME":"MAGDALENA"},{"STA_ID":"23","T_G_COU_ID":49,"STA_NAME":"NARI?O"},{"STA_ID":"24","T_G_COU_ID":49,"STA_NAME":"RISARALDA"},{"STA_ID":"25","T_G_COU_ID":49,"STA_NAME":"NORTE DE SANTANDER"},{"STA_ID":"26","T_G_COU_ID":49,"STA_NAME":"QUINDIO"},{"STA_ID":"27","T_G_COU_ID":49,"STA_NAME":"SANTANDER"},{"STA_ID":"28","T_G_COU_ID":49,"STA_NAME":"SUCRE"},{"STA_ID":"29","T_G_COU_ID":49,"STA_NAME":"TOLIMA"},{"STA_ID":"3","T_G_COU_ID":49,"STA_NAME":"ATLANTICO"},{"STA_ID":"31","T_G_COU_ID":49,"STA_NAME":"VALLE"},{"STA_ID":"40","T_G_COU_ID":49,"STA_NAME":"ARAUCA"},{"STA_ID":"44","T_G_COU_ID":49,"STA_NAME":"CAQUETA"},{"STA_ID":"46","T_G_COU_ID":49,"STA_NAME":"CASANARE"},{"STA_ID":"48","T_G_COU_ID":49,"STA_NAME":"LA GUAJIRA"},{"STA_ID":"5","T_G_COU_ID":49,"STA_NAME":"BOLIVAR"},{"STA_ID":"50","T_G_COU_ID":49,"STA_NAME":"GUAINIA"},{"STA_ID":"52","T_G_COU_ID":49,"STA_NAME":"META"},{"STA_ID":"54","T_G_COU_ID":49,"STA_NAME":"GUAVIARE"},{"STA_ID":"56","T_G_COU_ID":49,"STA_NAME":"SAN ANDRES"},{"STA_ID":"60","T_G_COU_ID":49,"STA_NAME":"AMAZONAS"},{"STA_ID":"64","T_G_COU_ID":49,"STA_NAME":"PUTUMAYO"},{"STA_ID":"68","T_G_COU_ID":49,"STA_NAME":"VAUPES"},{"STA_ID":"7","T_G_COU_ID":49,"STA_NAME":"BOYACA"},{"STA_ID":"72","T_G_COU_ID":49,"STA_NAME":"VICHADA"},{"STA_ID":"88","T_G_COU_ID":49,"STA_NAME":"CONSULADOS"},{"STA_ID":"9","T_G_COU_ID":49,"STA_NAME":"CALDAS"}]

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * defiant.js.js [v1.4.5]
 * http://www.defiantjs.com 
 * Copyright (c) 2013-2017, Hakan Bilgin <hbi@longscript.com> 
 * Licensed under the MIT License
 */
if (function (e, t) {
  var n = { init: function init() {
      return this;
    }, work_handler: function work_handler(e) {
      var t = Array.prototype.slice.call(e.data, 1),
          n = e.data[0],
          r = tree[n].apply(tree, t);postMessage([n, r]);
    }, setup: function setup(t) {
      var r = e.URL || e.webkitURL,
          a = "var tree = {" + this.parse(t).join(",") + "};",
          s = new Blob([a + 'self.addEventListener("message", ' + this.work_handler.toString() + ", false);"], { type: "text/javascript" }),
          o = new Worker(r.createObjectURL(s));return o.onmessage = function (e) {
        var t = Array.prototype.slice.call(e.data, 1),
            r = e.data[0];n.observer.emit("x10:" + r, t);
      }, o;
    }, call_handler: function call_handler(e, t) {
      return function () {
        var r = Array.prototype.slice.call(arguments, 0, -1),
            a = arguments[arguments.length - 1];r.unshift(e), n.observer.on("x10:" + e, function (e) {
          a(e.detail[0]);
        }), t.postMessage(r);
      };
    }, compile: function compile(e) {
      var t,
          n = this.setup("function" == typeof e ? { func: e } : e),
          r = {};if ("function" == typeof e) return r.func = this.call_handler("func", n), r.func;for (t in e) {
        r[t] = this.call_handler(t, n);
      }return r;
    }, parse: function parse(e, n) {
      var r,
          a,
          s,
          o = [];for (r in e) {
        if (s = e[r], null !== s) {
          if (s !== t) {
            switch (s.constructor) {case Date:
                a = "new Date(" + s.valueOf() + ")";break;case Object:
                a = "{" + this.parse(s).join(",") + "}";break;case Array:
                a = "[" + this.parse(s, !0).join(",") + "]";break;case String:
                a = '"' + s.replace(/"/g, '\\"') + '"';break;case RegExp:case Function:
                a = s.toString();break;default:
                a = s;}n ? o.push(a) : o.push(r + ":" + a);
          } else o.push(r + ":undefined");
        } else o.push(r + ":null");
      }return o;
    }, observer: function () {
      var e = {};return { on: function on(t, n) {
          e[t] || (e[t] = []), e[t].unshift(n);
        }, off: function off(t, n) {
          if (e[t]) {
            var r = e[t].indexOf(n);e[t].splice(r, 1);
          }
        }, emit: function emit(t, n) {
          if (e[t]) for (var r = { type: t, detail: n, isCanceled: !1, cancelBubble: function cancelBubble() {
              this.isCanceled = !0;
            } }, a = e[t].length; a--;) {
            if (r.isCanceled) return;e[t][a](r);
          }
        } };
    }() }; false ? e.x10 = n.init() : module.exports = n.init();
}(undefined), function (e, t, n) {
  "use strict";
  var r = { is_ie: /(msie|trident)/i.test(navigator.userAgent), is_safari: /safari/i.test(navigator.userAgent), env: "production", xml_decl: '<?xml version="1.0" encoding="utf-8"?>', namespace: 'xmlns:d="defiant-namespace"', tabsize: 4, render: function render(e, t) {
      var n,
          r,
          a,
          s,
          o = new XSLTProcessor(),
          i = document.createElement("span"),
          l = { match: "/" };switch (typeof e === "undefined" ? "undefined" : _typeof(e)) {case "object":
          this.extend(l, e), l.data || (l.data = t);break;case "string":
          l.template = e, l.data = t;break;default:
          throw "error";}if (l.data = JSON.toXML(l.data), n = '//xsl:template[@name="' + l.template + '"]', this.xsl_template || this.gatherTemplates(), l.sorter && (s = this.node.selectSingleNode(this.xsl_template, n + "//xsl:for-each//xsl:sort"), s && (l.sorter.order && s.setAttribute("order", l.sorter.order), l.sorter.select && s.setAttribute("select", l.sorter.select), s.setAttribute("data-type", l.sorter.type || "text"))), a = this.node.selectSingleNode(this.xsl_template, n), a.setAttribute("match", l.match), o.importStylesheet(this.xsl_template), i.appendChild(o.transformToFragment(l.data, document)), a.removeAttribute("match"), this.is_safari) {
        r = i.getElementsByTagName("script");for (var c = 0, u = r.length; c < u; c++) {
          r[c].defer = !0;
        }
      }return i.innerHTML;
    }, gatherTemplates: function gatherTemplates() {
      for (var e = document.getElementsByTagName("script"), t = "", n = 0, r = e.length; n < r; n++) {
        "defiant/xsl-template" === e[n].type && (t += e[n].innerHTML);
      }this.xsl_template = this.xmlFromString('<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" ' + this.namespace + ">" + t.replace(/defiant:(\w+)/g, "$1") + "</xsl:stylesheet>");
    }, getSnapshot: function getSnapshot(e, t) {
      return JSON.toXML(e, t || !0);
    }, xmlFromString: function xmlFromString(t) {
      var n, r;return t = t.replace(/>\s{1,}</g, "><"), null === t.trim().match(/<\?xml/) && (t = this.xml_decl + t), "ActiveXObject" in e ? (r = new ActiveXObject("Msxml2.DOMDocument"), r.loadXML(t), r.setProperty("SelectionNamespaces", this.namespace), t.indexOf("xsl:stylesheet") === -1 && r.setProperty("SelectionLanguage", "XPath")) : (n = new DOMParser(), r = n.parseFromString(t, "text/xml")), r;
    }, extend: function extend(e, t) {
      for (var n in t) {
        e[n] && "object" == _typeof(t[n]) ? this.extend(e[n], t[n]) : e[n] = t[n];
      }return e;
    }, node: {} };e.Defiant = t.exports = r;
}("undefined" != typeof window ? window : {},  true ? module : {}), "undefined" == typeof XSLTProcessor) {
  var XSLTProcessor = function XSLTProcessor() {};XSLTProcessor.prototype = { importStylesheet: function importStylesheet(e) {
      this.xsldoc = e;
    }, transformToFragment: function transformToFragment(e, t) {
      var n = e.transformNode(this.xsldoc),
          r = document.createElement("span");return r.innerHTML = n, r;
    } };
} else if ("function" != typeof XSLTProcessor && !XSLTProcessor) throw "XSLTProcessor transformNode not implemented";String.prototype.fill || (String.prototype.fill = function (e, t) {
  var n = this;for (t = t || " "; n.length < e; n += t) {}return n;
}), String.prototype.trim || (String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/gm, "");
}), String.prototype.xTransform || (String.prototype.xTransform = function () {
  var e = this;return this.indexOf("translate(") === -1 && (e = this.replace(/contains\(([^,]+),([^\\)]+)\)/g, function (e, t, n) {
    var r = "abcdefghijklmnopqrstuvwxyz";return "contains(translate(" + t + ', "' + r.toUpperCase() + '", "' + r + '"),' + n.toLowerCase() + ")";
  })), e.toString();
}), "undefined" == typeof JSON && (window.JSON = { parse: function parse(sJSON) {
    return eval("(" + sJSON + ")");
  }, stringify: function stringify(e) {
    if (e instanceof Object) {
      var t = "";if (e.constructor === Array) {
        for (var n = 0; n < e.length; t += this.stringify(e[n]) + ",", n++) {}return "[" + t.substr(0, t.length - 1) + "]";
      }if (e.toString !== Object.prototype.toString) return '"' + e.toString().replace(/"/g, "\\$&") + '"';for (var r in e) {
        t += '"' + r.replace(/"/g, "\\$&") + '":' + this.stringify(e[r]) + ",";
      }return "{" + t.substr(0, t.length - 1) + "}";
    }return "string" == typeof e ? '"' + e.replace(/"/g, "\\$&") + '"' : String(e);
  } }), JSON.toXML || (JSON.toXML = function (e, t) {
  "use strict";
  var n,
      r,
      a,
      s = { map: [], rx_validate_name: /^(?!xml)[a-z_][\w\d.:]*$/i, rx_node: /<(.+?)( .*?)>/, rx_constructor: /<(.+?)( d:contr=".*?")>/, rx_namespace: / xmlns\:d="defiant\-namespace"/, rx_data: /(<.+?>)(.*?)(<\/d:data>)/i, rx_function: /function (\w+)/i, namespace: 'xmlns:d="defiant-namespace"', to_xml_str: function to_xml_str(e) {
      return { str: this.hash_to_xml(null, e), map: this.map };
    }, hash_to_xml: function hash_to_xml(e, t, n) {
      var r,
          a,
          s,
          o,
          i,
          l,
          c,
          u,
          d,
          h = t.constructor === Array,
          p = this,
          m = [],
          f = [],
          g = function g(t, r) {
        if (a = r[t], null !== a && void 0 !== a && "NaN" !== a.toString() || (a = null), o = "@" === t.slice(0, 1), i = n ? e : t, i == +i && r.constructor !== Object && (i = "d:item"), null === a ? (l = null, c = !1) : (l = a.constructor, c = l.toString().match(p.rx_function)[1]), o) f.push(i.slice(1) + '="' + p.escape_xml(a) + '"'), "String" !== c && f.push("d:" + i.slice(1) + '="' + c + '"');else if (null === a) m.push(p.scalar_to_xml(i, a));else switch (l) {case Function:
            throw "JSON data should not contain functions. Please check your structure.";case Object:
            m.push(p.hash_to_xml(i, a));break;case Array:
            if (t === i) {
              if (s = a.constructor === Array) for (u = a.length; u--;) {
                null !== a[u] && a[u] && a[u].constructor !== Array || (s = !0), s || a[u].constructor !== Object || (s = !0);
              }m.push(p.scalar_to_xml(i, a, s));break;
            }case String:
            if ("string" == typeof a && (a = a.toString().replace(/\&/g, "&amp;").replace(/\r|\n/g, "&#13;")), "#text" === i) {
              p.map.push(r), f.push('d:mi="' + p.map.length + '"'), f.push('d:constr="' + c + '"'), m.push(p.escape_xml(a));break;
            }case Number:case Boolean:
            if ("#text" === i && "String" !== c) {
              p.map.push(r), f.push('d:mi="' + p.map.length + '"'), f.push('d:constr="' + c + '"'), m.push(p.escape_xml(a));break;
            }m.push(p.scalar_to_xml(i, a));}
      };if (t.constructor === Array) for (u = 0, d = t.length; u < d; u++) {
        g(u.toString(), t);
      } else for (r in t) {
        g(r, t);
      }return e || (e = "d:data", f.push(this.namespace), h && f.push('d:constr="Array"')), null === e.match(this.rx_validate_name) && (f.push('d:name="' + e + '"'), e = "d:name"), n ? m.join("") : (this.map.push(t), f.push('d:mi="' + this.map.length + '"'), "<" + e + (f.length ? " " + f.join(" ") : "") + (m.length ? ">" + m.join("") + "</" + e + ">" : "/>"));
    }, scalar_to_xml: function scalar_to_xml(e, t, n) {
      var r,
          a,
          s,
          o = "";if (null === e.match(this.rx_validate_name) && (o += ' d:name="' + e + '"', e = "d:name", n = !1), null !== t && "NaN" !== t.toString() || (t = null), null === t) return "<" + e + ' d:constr="null"/>';if (1 === t.length && t.constructor === Array && !t[0]) return "<" + e + ' d:constr="null" d:type="ArrayItem"/>';if (1 === t.length && t[0].constructor === Object) {
        r = this.hash_to_xml(!1, t[0]);var i = r.match(this.rx_node),
            l = r.match(this.rx_constructor);return i = null !== i ? i[2].replace(this.rx_namespace, "").replace(/>/, "").replace(/"\/$/, '"') : "", l = null !== l ? l[2] : "", r = r.match(this.rx_data), r = null !== r ? r[2] : "", "<" + e + i + " " + l + ' d:type="ArrayItem">' + r + "</" + e + ">";
      }return 0 === t.length && t.constructor === Array ? "<" + e + ' d:constr="Array"/>' : n ? this.hash_to_xml(e, t, !0) : (a = t.constructor, s = a.toString().match(this.rx_function)[1], r = a === Array ? this.hash_to_xml("d:item", t, !0) : this.escape_xml(t), o += ' d:constr="' + s + '"', this.map.push(t), o += ' d:mi="' + this.map.length + '"', "#text" === e ? this.escape_xml(t) : "<" + e + o + ">" + r + "</" + e + ">");
    }, escape_xml: function escape_xml(e) {
      return String(e).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/&nbsp;/g, "&#160;");
    } };switch (typeof t === "undefined" ? "undefined" : _typeof(t)) {case "function":
      return a = x10.compile(s), void a.to_xml_str(e, function (n) {
        t({ doc: Defiant.xmlFromString(n.str), src: e, map: n.map });
      });case "boolean":
      return n = s.to_xml_str.call(s, e), { doc: Defiant.xmlFromString(n.str), src: e, map: n.map };default:
      return n = s.to_xml_str.call(s, e), r = Defiant.xmlFromString(n.str), this.search.map = n.map, r;}
}), JSON.search || (JSON.search = function (e, t, n) {
  "use strict";
  var r,
      a,
      s = e.doc && e.doc.nodeType,
      o = s ? e.doc : JSON.toXML(e),
      i = s ? e.map : this.search.map,
      l = s ? e.src : e,
      c = Defiant.node[n ? "selectSingleNode" : "selectNodes"](o, t.xTransform()),
      u = [];for (n && (c = [c]), a = c.length; a--;) {
    switch (c[a].nodeType) {case 2:case 3:
        u.unshift(c[a].nodeValue);break;default:
        r = +c[a].getAttribute("d:mi"), u.unshift(i[r - 1]);}
  }return "development" === Defiant.env && (this.trace = JSON.mtrace(l, u, c)), u;
}), JSON.mtrace || (JSON.mtrace = function (e, t, n) {
  "use strict";
  for (var r, a, s, o, i, l = window, c = JSON.stringify, u = c(e, null, "\t").replace(/\t/g, ""), d = [], h = 0, p = n.length, m = !!p && n[h].ownerDocument.documentElement, f = (this.search.map, 0); h < p; h++) {
    switch (n[h].nodeType) {case 2:
        a = n[h].ownerElement ? n[h].ownerElement.getAttribute("d:" + n[h].nodeName) : "String", r = '"@' + n[h].nodeName + '": ' + l[a](t[h]), s = u.indexOf(r), i = 0;break;case 3:
        a = n[h].parentNode.getAttribute("d:constr"), r = l[a](t[h]), r = '"' + n[h].parentNode.nodeName + '": ' + ("Number" === r ? r : '"' + r + '"'), s = u.indexOf(r), i = 0;break;default:
        if (n[h] === m) continue;"String" === n[h].getAttribute("d:constr") || "Number" === n[h].getAttribute("d:constr") ? (a = n[h].getAttribute("d:constr"), r = l[a](t[h]), s = u.indexOf(r, f), r = '"' + n[h].nodeName + '": ' + ("Number" === a ? r : '"' + r + '"'), i = 0, f = s + 1) : (r = c(t[h], null, "\t").replace(/\t/g, ""), s = u.indexOf(r), i = r.match(/\n/g).length);}o = u.substring(0, s).match(/\n/g).length + 1, d.push([o, i]);
  }return d;
}), Defiant.node.selectNodes = function (e, t) {
  if (e.evaluate) {
    for (var n = e.createNSResolver(e.documentElement), r = e.evaluate(t, e, n, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), a = [], s = 0, o = r.snapshotLength; s < o; s++) {
      a.push(r.snapshotItem(s));
    }return a;
  }return e.selectNodes(t);
}, Defiant.node.selectSingleNode = function (e, t) {
  if (e.evaluate) {
    var n = this.selectNodes(e, t);return n.length > 0 ? n[0] : null;
  }return e.selectSingleNode(t);
}, Defiant.node.prettyPrint = function (e) {
  var t,
      n,
      r = Defiant,
      a = r.tabsize,
      s = r.xml_decl.toLowerCase();r.is_ie ? n = e.xml : (t = new XMLSerializer(), n = t.serializeToString(e)), "development" !== r.env && (n = n.replace(/ \w+\:d=".*?"| d\:\w+=".*?"/g, ""));for (var o, i, l = n.trim().replace(/(>)\s*(<)(\/*)/g, "$1\n$2$3"), c = l.split("\n"), u = -1, d = 0, h = c.length; d < h; d++) {
    0 === d && c[d].toLowerCase() === s || (o = null !== c[d].match(/<[A-Za-z_\:]+.*?>/g), i = null !== c[d].match(/<\/[\w\:]+>/g), null !== c[d].match(/<.*?\/>/g) && (o = i = !0), o && u++, c[d] = String().fill(u, "\t") + c[d], o && i && u--, !o && i && u--);
  }return c.join("\n").replace(/\t/g, String().fill(a, " "));
}, Defiant.node.toJSON = function (e, t) {
  "use strict";
  var n = function n(e) {
    var t,
        r,
        a,
        s,
        o,
        i,
        l,
        c,
        u,
        d,
        h = {},
        p = window;switch (e.nodeType) {case 1:
        for (o = e.getAttribute("d:constr"), "Array" === o ? h = [] : "String" === o && "" === e.textContent && (h = ""), t = e.attributes, c = 0, u = t.length; c < u; c++) {
          d = t.item(c), null === d.nodeName.match(/\:d|d\:/g) && (o = e.getAttribute("d:" + d.nodeName), i = o && "undefined" !== o ? "null" === d.nodeValue ? null : p[o]("false" === d.nodeValue ? "" : d.nodeValue) : d.nodeValue, h["@" + d.nodeName] = i);
        }break;case 3:
        r = e.parentNode.getAttribute("d:type"), i = r ? p[r]("false" === e.nodeValue ? "" : e.nodeValue) : e.nodeValue, h = i;}if (e.hasChildNodes()) for (c = 0, u = e.childNodes.length; c < u; c++) {
      if (a = e.childNodes.item(c), s = a.nodeName, t = e.attributes, "d:name" === s && (s = a.getAttribute("d:name")), "#text" === s) o = e.getAttribute("d:constr"), "undefined" === o && (o = void 0), l = a.textContent || a.text, i = "Boolean" === o && "false" === l ? "" : l, o || t.length ? o && 1 === u ? h = p[o](i) : e.hasChildNodes() && t.length < 3 ? h = o ? p[o](i) : i : h[s] = o ? p[o](i) : i : h = i;else {
        if ("null" === a.getAttribute("d:constr")) {
          h[s] && h[s].push ? h[s].push(null) : "ArrayItem" === a.getAttribute("d:type") ? h[s] = [h[s]] : h[s] = null;continue;
        }if (h[s]) {
          h[s].push ? h[s].push(n(a)) : h[s] = [h[s], n(a)];continue;
        }switch (o = a.getAttribute("d:constr")) {case "null":
            h.push ? h.push(null) : h[s] = null;break;case "Array":
            a.parentNode.firstChild === a && "Array" === o && "d:item" !== s ? "d:item" === s || "Array" === o ? (i = n(a), h[s] = i.length ? [i] : i) : h[s] = n(a) : h.push ? h.push(n(a)) : h[s] = n(a);break;case "String":case "Number":case "Boolean":
            l = a.textContent || a.text, i = "Boolean" === o && "false" === l ? "" : l, h.push ? h.push(p[o](i)) : h[s] = n(a);break;default:
            h.push ? h.push(n(a)) : h[s] = n(a);}
      }
    }return 1 === e.nodeType && "ArrayItem" === e.getAttribute("d:type") && (h = [h]), h;
  },
      r = 9 === e.nodeType ? e.documentElement : e,
      a = n(r),
      s = a[r.nodeName];return r === r.ownerDocument.documentElement && s && s.constructor === Array && (a = s), t && "true" === t.toString() && (t = "\t"), t ? JSON.stringify(a, null, t) : a;
}, "undefined" != typeof jQuery && !function (e) {
  "use strict";
  e.fn.defiant = function (e, t) {
    return this.html(Defiant.render(e, t)), this;
  };
}(jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)(module)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);