webpackJsonp([2],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    // never use services in there
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	module.exports = ['$locationProvider', '$config', '$httpProvider', function ($locationProvider, $config, $httpProvider) {
	    $locationProvider.html5Mode(false);
	}];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(angular) {'use strict';

	module.exports = ['$location', '$http', '$window', '$config', function ($location, $http, $window, $config) {
	    $http.defaults.headers.common.token = $location.search().session;
	    angular.element($window.document).find('head').append('<link href="' + $location.search().theme + '" rel="stylesheet" type="text/css" />');
	    $config.services = $window.localStorage.services ? JSON.parse($window.localStorage.services) : '';
	    $window.onmessage = function (e) {
	        var data = JSON.parse(e.data);
	        if (data.type === 'INIT') {
	            $window.localStorage.services = JSON.stringify(data.data);
	            $config.services = data.data;
	        }
	    };
	}];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  goTo: ['$location', function ($location) {
	    return {
	      link: function link(scope, element, attributes) {
	        element.on("click", function () {
	          scope.$apply(function () {
	            $location.path(attributes.goTo);
	          });
	        });
	      }
	    };
	  }],
	  goBack: ['$window', function ($window) {
	    return {
	      link: function link(scope, element, attributes) {
	        element.on("click", function () {
	          $window.history.back();
	        });
	      }
	    };
	  }],
	  redirectTo: ['$window', function ($window) {
	    return {
	      link: function link(scope, element, attributes) {
	        element.on("click", function () {
	          $window.location.href = attributes.redirectTo;
	        });
	      }
	    };
	  }],
	  backgroundSrc: ['$config', function ($config) {
	    return {
	      scope: {
	        backgroundSrc: "=",
	        size: "<"
	      },
	      link: function link(scope, element, attributes) {
	        var backgroundSrc = scope.backgroundSrc;
	        for (var i = 0; i < element.length; i++) {
	          if (backgroundSrc.startsWith("http://") || backgroundSrc.startsWith("https://")) {
	            element[i].style.backgroundImage = 'url(' + backgroundSrc + '), url(' + __webpack_require__(12) + ')';
	          } else {
	            if (backgroundSrc) {
	              if (scope.size) {
	                var ii = backgroundSrc.lastIndexOf('/');
	                backgroundSrc = backgroundSrc.substr(0, ii + 1) + scope.size + backgroundSrc.substr(ii);
	                element[i].style.backgroundImage = 'url(' + $config.services.oauth + backgroundSrc + '), url(' + __webpack_require__(12) + ')';
	              } else {
	                element[i].style.backgroundImage = 'url(' + $config.services.oauth + backgroundSrc + ')';
	              }
	            } else {
	              element[i].style.backgroundImage += 'url(' + __webpack_require__(12) + ')';
	            }
	          }
	        }
	      }
	    };
	  }],
	  imageSrc: ['$config', function ($config) {
	    return {
	      scope: {
	        imageSrc: "=",
	        size: "<"
	      },
	      link: function link(scope, element, attributes) {
	        for (var i = 0; i < element.length; i++) {
	          var ee = element[i];
	          ee.addEventListener('error', function (e) {
	            ee.setAttribute('src', __webpack_require__(12));
	          });
	          if (typeof scope.imageSrc != 'undefined' && scope.imageSrc != null) {
	            if (scope.imageSrc.startsWith("http://") || scope.imageSrc.startsWith("https://")) {
	              ee.setAttribute('src', scope.imageSrc);
	            } else {
	              var imageSrc = scope.imageSrc;
	              if (imageSrc && scope.size) {
	                var ii = imageSrc.lastIndexOf('/');
	                imageSrc = imageSrc.substr(0, ii + 1) + scope.size + imageSrc.substr(ii);
	              }
	              console.log($config.services.oauth + imageSrc);
	              ee.setAttribute('src', $config.services.oauth + imageSrc);
	            }
	          } else {
	            ee.setAttribute('src', __webpack_require__(12));
	          }
	        }
	      }
	    };
	  }]
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAACSElEQVRIS62WS6tBURTHyQfwYTyT8hpgZCQyEpISGYlSZGCAEZkykInEwKOkUOITYEQZyGPkWcrzrtu5ufece2z76KzZ2Wet9dtr773+e3MfjwcHz67X62634/F4fD6fy+XiBXE4AEDb/X5vtVoul0smkwkEAqFQqFKpgsHgaDR6F/r9/w1gv997vV7I+99EIlEmk7ndbmgMCnA6naxWK23252AymfwcAMHo7MSKdTodBONlBev1WiqVvgWAg8lkgn16xXgJKBaLONkJn+l0yhgQi8XwAc1mkzEgFArhAyqVCmNAPB7HB7TbbcaAWq2GCYCGWCwWjAHQYgqFAofhdDo/OaYQUygU3gIkEslwOPwQADKA3mpYnFKpxLiTIS+c616vt9lsQEHT6TRM838pIHnE6ZzNZoPBYLVa0ZKojdbv941GI5FOo9HAVkOXAg9kw2KxwIhWq3U4HNlsFvAgVk88VON2uwFGwZAA9Xod/CiThT2Eas7n89/Iw+FQLpcNBgPFWa1WTyaTv56/gPl8LpfLX+0qRHo8nmg0Gg6H7XY7cTfQmtlsvlwuT8YvIBKJvD0zmA7VapUKOB6PiElh5n262Ww2KqDb7TLNgvAXi8Xb7ZZg/CxRKpViEQCp4DSSAD6fj11APp8nAeBWYheQSCRIAL1ezy4ANIYEgBZlF+D3+0kAnU7HLoBaAcgIu4BcLkeqAB6HLAKgZ5fLJQkAH4yeEYjZgLY3Gg0aLYIh4pGrVCpBU5kadC8oeSAQGI/H9GqKvpg+/vsFrEdS1laSoKUAAAAASUVORK5CYII="

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  money: ['$filter', function ($filter) {
	    return function (input, symbol) {
	      if (input === undefined) return '';
	      return $filter('number')(+input) + ' ' + symbol;
	    };
	  }],
	  mformat: ['$filter', function ($filter) {
	    return function (input, str) {
	      if (input === undefined) return '';
	      return str.replace('$n', $filter('number')(+input));
	    };
	  }],
	  amPm: ['$filter', function ($filter) {
	    return function (input, symbol) {
	      if (input === undefined) return '';
	      var tmp = input.split(':');
	      var hour = +tmp[0];
	      var min = +tmp[1];
	      if (hour > 12) return hour - 12 + ':' + min + ' PM';else return hour + ':' + min + ' AM';
	    };
	  }]
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    UtilsService: ['$window', function ($window) {
	        return {
	            throwError: function throwError(err) {
	                err.msg = err.msg || err.data;
	                $window.top.postMessage(JSON.stringify({ type: 'ERROR', data: err }), '*');
	            }
	        };
	    }],
	    Project: ['$http', '$rootScope', '$config', '$window', '$location', 'UtilsService', function ($http, $rootScope, $config, $window, $location, UtilsService) {
	        return {
	            initConfig: function initConfig(key) {
	                return $http.post($config.services[key] + '/config').catch(UtilsService.throwError);
	            },

	            updateConfig: function updateConfig(data) {
	                return $http.put($config.services.oauth + '/config', data).catch(UtilsService.throwError);
	            },
	            get: function get() {
	                return $http.get($config.services.oauth + '/project').catch(UtilsService.throwError);
	            },
	            add: function add(data) {
	                return $http.post($config.services.oauth + '/project', data).catch(UtilsService.throwError);
	            },
	            update: function update(data) {
	                return $http.put($config.services.oauth + '/project', data).catch(UtilsService.throwError);
	            },
	            getDetail: function getDetail(id) {
	                return $http.get($config.services.oauth + '/project/' + id).catch(UtilsService.throwError);
	            },
	            delete: function _delete(id) {
	                return $http.delete($config.services.oauth + '/project/' + id).catch(UtilsService.throwError);
	            }
	        };
	    }],
	    Role: ['$http', '$rootScope', '$config', 'UtilsService', function ($http, $rootScope, $config, UtilsService) {
	        return {
	            get: function get() {
	                return $http.get($config.services.oauth + '/role').catch(UtilsService.throwError);
	            },
	            add: function add(data) {
	                return $http.post($config.services.oauth + '/role', data).catch(UtilsService.throwError);
	            },
	            update: function update(data) {
	                return $http.put($config.services.oauth + '/role/' + data._id, data).catch(UtilsService.throwError);
	            },
	            getDetail: function getDetail(id) {
	                return $http.get($config.services.oauth + '/role/' + id).catch(UtilsService.throwError);
	            },
	            delete: function _delete(id) {
	                return $http.delete($config.services.oauth + '/role/' + id).catch(UtilsService.throwError);
	            }
	        };
	    }],
	    Account: ['$http', '$rootScope', '$config', 'UtilsService', 'md5', function ($http, $rootScope, $config, UtilsService, md5) {
	        return {
	            get: function get() {
	                return $http.get($config.services.oauth + '/account').catch(UtilsService.throwError);
	            },
	            login: function login(data, projectId) {
	                data = _.clone(data);
	                data.password = md5.createHash(data.password);
	                return $http.post($config.services.oauth + '/login', data, { headers: { pj: projectId } }).catch(UtilsService.throwError);
	            },
	            logout: function logout() {
	                return $http.post($config.services.oauth + '/logout').catch(UtilsService.throwError);
	            },

	            add: function add(data) {
	                data = _.clone(data);
	                data.password = md5.createHash(data.password);
	                return $http.post($config.services.oauth + '/account', data).catch(UtilsService.throwError);
	            },
	            author: function author(data) {
	                return $http.head($config.services.oauth + '/authoriz', { headers: data }).catch(UtilsService.throwError);
	            },
	            ping: function ping(data) {
	                return $http.head($config.services.oauth + '/ping').catch(UtilsService.throwError);
	            },
	            update: function update(account) {
	                if (account.password) account = _.clone(account);
	                account.password = md5.createHash(account.password);
	                return $http.put($config.services.oauth + '/account/' + account._id, account).catch(UtilsService.throwError);
	            },
	            getDetail: function getDetail(id) {
	                return $http.get($config.services.oauth + '/account/' + id).catch(UtilsService.throwError);
	            },
	            delete: function _delete(id) {
	                return $http.delete($config.services.oauth + '/account/' + id).catch(UtilsService.throwError);
	            }
	        };
	    }]
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(16);
	module.exports = {
	    name: 'myApp',
	    template: __webpack_require__(20),
	    $routeConfig: [{ path: '/login', name: 'Login', component: 'login', useAsDefault: true }, { path: '/logout', name: 'Logout', component: 'logout' }, { path: '/projects', name: 'Projects', component: 'projects' }, { path: '/config', name: 'Config', component: 'config' }, { path: '/role', name: 'Role', component: 'role' }, { path: '/account', name: 'Account', component: 'account' }]
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./my-app.css", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./my-app.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 18 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<ng-outlet></ng-outlet>";

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	    name: 'account',
	    template: __webpack_require__(22),
	    controller: ['$config', 'Role', 'Account', '$location', function ($config, Role, Account, $location) {
	        var _this = this;

	        // require('./account.scss');

	        var self = this;
	        self._account = {};
	        self.err = {};
	        this.$routerOnActivate = function (next) {
	            Role.get().then(function (res) {
	                if (res.data.constructor === Array) self._roles = res.data;
	            });

	            Account.get().then(function (res) {
	                self._accounts = res.data;
	            });
	        };

	        this.getID2LabelRole = function (arr) {
	            if (!arr || !self._roles) return;

	            var role = "";
	            for (var i = 0; i < arr.length; i++) {
	                for (var y = 0; y < self._roles.length; y++) {
	                    if (arr[i] == self._roles[y]._id) {
	                        role += self._roles[y].name + ", ";
	                        break;
	                    }
	                }
	            }
	            return role;
	        };

	        this.create = function () {
	            !self._account.username ? self.err.usr = "*" : self.err.usr = "";
	            !self._account.password ? self.err.pwd = "*" : self.err.pwd = "";
	            self._account.password !== self._account.repwd ? self.err.repwd = "*" : self.err.repwd = "";
	            self._account.status == undefined ? self.err.stt = "*" : self.err.stt = "";
	            !self._account.role_ids ? self.err.role = "*" : self.err.role = "";

	            if (self.err.usr == "*" || self.err.pwd == "*" || self.err.repwd == "*" || self.err.stt == "*" || self.err.role == "*") return;

	            delete self._account.repwd;
	            self._account.recover_by = self._account.username;

	            Account.add(self._account).then(function (res) {
	                if (!self._accounts) {
	                    self._accounts = [];
	                }
	                self._accounts.splice(0, 0, res.data);
	                _this.closeModal();
	            });
	        };
	        this.save = function () {
	            !self._account.username ? self.err.usr = "*" : self.err.usr = "";
	            if (self._oldItem.password !== self._account.password) {
	                !self._account.password ? self.err.pwd = "*" : self.err.pwd = "";
	                self._account.password !== self._account.repwd ? self.err.repwd = "*" : self.err.repwd = "";
	            }
	            self._account.status == undefined ? self.err.stt = "*" : self.err.stt = "";
	            !self._account.role_ids ? self.err.role = "*" : self.err.role = "";

	            if (self.err.usr == "*" || self.err.pwd == "*" || self.err.repwd == "*" || self.err.stt == "*" || self.err.role == "*") return;

	            delete self._account.repwd;

	            Account.update(self._account).then(function (res) {
	                self._account.password = '';
	                self._account.repwd = '';
	                _this.closeModal();
	            });
	        };
	        this.delete = function () {
	            if (!self._account) _this.closeModal();
	            var index = self._accounts.indexOf(self._account);

	            if (self._accounts[index] && self._accounts[index]._id === self._account._id) {
	                Account.delete(self._account._id).then(function (res) {
	                    self._accounts.splice(index, 1);
	                    _this.closeModal();
	                });
	            }
	        };
	        this.showModal = function (type, item) {
	            if (type === 'add') self._isCreate = 1;else if (type === 'delete') self._isDelete = 1;else if (type === 'edit') self._oldItem = _.cloneDeep(item);

	            self._account = !item ? {} : item;
	            document.getElementById('favDialog').showModal();
	        };
	        this.closeModal = function () {

	            if (self._oldItem && self._oldItem.password !== self._account.password) {
	                self._account.password = self._oldItem.password;
	                self._account.repwd = "";
	            }
	            self._isDelete = "";
	            self._isCreate = "";
	            self._account = {};
	            document.getElementById('favDialog').close();
	        };
	    }]
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "  <table class=\"form full-width\">\r\n    <tr>\r\n      <td>\r\n        <button class=\"btn btn-default\" ng-click=\"$ctrl.showModal('add',{})\" >Add user</button>\r\n      </td>\r\n      <td>\r\n          <input class=\"form-control search\" placeholder=\"Enter keyword for searching\" type=\"text\" ng-model=\"$ctrl._kword\">\r\n      </td>\r\n    </tr>\r\n  </table>\r\n\r\n    <table class=\"table\">\r\n      <thead>\r\n      <tr>\r\n        <th class=\"non-number\">Username</th>\r\n        <th class=\"non-number\">Status</th>\r\n        <th class=\"non-number\">Role</th>\r\n        <th class=\"date\">Created date</th>\r\n        <th></th>\r\n      </tr>\r\n      </thead>\r\n      <tbody>\r\n      <tr ng-repeat=\"item in $ctrl._accounts | filter : $ctrl._kword\">\r\n        <td class=\"non-number\">{{item.username}}</td>\r\n        <td class=\"non-number\">{{item.status=='1'?'Activate':'Deactivate'}}</td>\r\n        <td class=\"non-number\">{{$ctrl.getID2LabelRole(item.role_ids)}}</td>\r\n        <td class=\"date\">{{item.created_at | date:'yyyy-MM-dd HH:mm'}}</td>\r\n        <td class=\"number\">\r\n          <label class=\"link\" ng-click=\"$ctrl.showModal('edit', item)\">Edit</label>\r\n          <label class=\"link\" ng-click=\"$ctrl.showModal('delete', item)\">Delete</label>\r\n        </td>\r\n      </tr>\r\n      </tbody>\r\n    </table>\r\n\r\n<dialog id=\"favDialog\" class=\"modalDialog form\">\r\n\t<div class=\"w20vw\" ng-show=\"!$ctrl._isDelete\">\r\n\t\t<div class=\"form-group\">\r\n      <label>Username</label>\r\n      <input class=\"form-control\" type=\"text\" ng-model=\"$ctrl._account.username\">\r\n      <font class=\"err\" ng-show=\"$ctrl.err.usr\">Username is required</font>\r\n    </div>\r\n    \r\n    <div class=\"form-group\"> \r\n      <label>Password</label>\r\n      <input class=\"form-control\" type=\"password\" ng-model=\"$ctrl._account.password\">\r\n      <font class=\"err\" ng-show=\"$ctrl.err.pwd\">Password is required</font>\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label>Re-Password</label>\r\n      <input class=\"form-control\" type=\"password\" ng-model=\"$ctrl._account.repwd\">\r\n      <font class=\"err\" ng-show=\"$ctrl.err.repwd\">Password is not match</font>\r\n    </div>\r\n    \r\n    <div class=\"form-group\">\r\n      <label> Active Status</label>\r\n      <span class=\"noteField\" title=\"Sign-in Mode (Single = Only one user session exists at a time, Multiply = Multiply User sessions)\">? </span>\r\n       <select class=\"form-control\" ng-model=\"$ctrl._account.status\" ng-options=\"(item?'Activate':'Deactivate') for item in [1, 0]\"></select>\r\n       <font class=\"err\" ng-show=\"$ctrl.err.stt\">Status is required</font>\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label> Role </label>\r\n      <select class=\"form-control select\" multiple ng-model=\"$ctrl._account.role_ids\" ng-options=\"item._id as item.name for item in $ctrl._roles\"></select>\r\n      <font class=\"err\" ng-show=\"$ctrl.err.role\">Role is required</font>\r\n    </div>\r\n\r\n    <div class=\"form-group\" >\r\n        <button class=\"btn btn-default\" ng-click=\"$ctrl.create()\" ng-show=\"$ctrl._isCreate\">Create</button>\r\n        <button  class=\"btn btn-default\" ng-click=\"$ctrl.save()\" ng-show=\"!$ctrl._isCreate\">Save</button>\r\n        <button  class=\"btn btn-default\" ng-click=\"$ctrl.closeModal()\" >Cancel</button>\r\n    </div>\r\n\t</div>\r\n  <div class=\"w20vw\" ng-show=\"$ctrl._isDelete\">\r\n    <div class=\"form-group\">\r\n      <label> Do you want to delete this account ? </label>\r\n    </div>\r\n    <div class=\"form-group\" style=\"margin-top: 20px;\">\r\n        <button class=\"btn btn-default\" ng-click=\"$ctrl.delete()\">Delete</button>\r\n        <button class=\"btn btn-default\" ng-click=\"$ctrl.closeModal()\" >Cancel</button>\r\n    </div>\r\n  </div>\r\n</dialog>\r\n";

/***/ },
/* 23 */,
/* 24 */,
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	    name: 'config',
	    template: __webpack_require__(26),
	    controller: ['$config', '$location', '$window', 'Project', function ($config, $location, $window, Project) {
	        __webpack_require__(27);
	        var self = this;
	        this.ourService = {};
	        for (var k in $config.services) {
	            if (k === 'theme') continue;
	            this.ourService[k] = $config.services[k];
	        }
	        this.loadConfig = function (key) {
	            self.key = key;
	            if (!self._project.plugins[key]) {
	                Project.initConfig(key).then(function (resp) {
	                    if (!resp || !resp.data) delete self._project.plugins[key];else self._project.plugins[key] = JSON.stringify(resp.data, null, '  ');
	                });
	            }
	        };
	        this.storeConfig = function () {
	            if (!self.key) return;
	            try {
	                JSON.parse(self._project.plugins);
	            } catch (e) {
	                console.log('Config file is wrong format');
	            }
	        };

	        this.save = function () {
	            var value = {};
	            try {
	                for (var k in self._project.plugins) {
	                    eval('value[k] = ' + self._project.plugins[k]);
	                }
	                Project.update({
	                    _id: self._project._id,
	                    plugins: value
	                }).then(function (res) {
	                    // success
	                });
	            } catch (e) {
	                console.log('Config file is wrong format');
	            }
	        };

	        Project.get().then(function (res) {
	            self._project = res.data instanceof Array ? res.data[0] : res.data;
	            for (var k in self._project.plugins) {
	                self._project.plugins[k] = JSON.stringify(self._project.plugins[k], null, '  ');
	                if (k === 'oauth') self._project.plugins['oauth'] = self._project.plugins[k];
	            }
	        });
	    }]
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<details ng-repeat=\"(key, value) in $ctrl.ourService\">\r\n  <summary ng-click=\"$ctrl.loadConfig(key)\">\r\n    {{key}}\r\n  </summary>\r\n  <textarea ng-model=\"$ctrl._project.plugins[key]\" ng-if=\"$ctrl._project.plugins[key]\" rows=\"20\" style=\"width: 100%\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\"></textarea>\r\n</details>\r\n<div>\r\n    <button ng-click=\"$ctrl.save()\">Apply</button>\r\n</div>";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(28);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./config.scss", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./config.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	    name: 'login',
	    template: __webpack_require__(30),
	    controller: ['$config', 'Account', '$http', '$location', '$window', 'UtilsService', function ($config, Account, $http, $location, $window, UtilsService) {
	        __webpack_require__(31);
	        var self = this;
	        self.user = {};

	        this.$routerOnActivate = function (next) {};

	        this.login = function () {
	            self.err = {};

	            if (!$location.search().id) {
	                console.log("Lack of id");
	                return;
	            }
	            if (!self.user.username) {
	                self.err.usr = "*";
	                return;
	            }
	            if (!self.user.password) {
	                self.err.pwd = "*";
	                return;
	            }
	            var projectId = $location.search().id;
	            var theme = $location.search().theme;
	            Account.login(self.user, projectId).then(function (res) {
	                UtilsService.throwError({ theme: theme, token: res.headers('token') });
	            });
	        };
	    }]
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "<div class=\"login-card\">\r\n  <h1>Log-in</h1><br>\r\n  <form ng-submit=\"$ctrl.login()\">\r\n    <input type=\"text\" placeholder=\"Username\" ng-model=\"$ctrl.user.username\">\r\n    <label class=\"err\" ng-show=\"$ctrl.err.usr\">Username is required</label>\r\n    <input type=\"password\" placeholder=\"Password\" ng-model=\"$ctrl.user.password\">\r\n    <label class=\"err\"  ng-show=\"$ctrl.err.pwd\">Password is required</label>\r\n    <button type=\"submit\" class=\"primary\">login</button>\r\n  </form>\r\n</div>";

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(32);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./login.scss", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./login.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	// imports


	// module
	exports.push([module.id, "login .clear {\n  clear: both; }\n\nlogin ._component {\n  margin-top: 10px; }\n\nlogin .err {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 15px;\n  color: red; }\n\nlogin .login-card {\n  padding: 40px;\n  width: 274px;\n  background-color: #F7F7F7;\n  margin: 0 auto 10px;\n  border-radius: 2px;\n  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);\n  overflow: hidden; }\n\nlogin .login-card h1 {\n  font-weight: 100;\n  text-align: center;\n  font-size: 2.3em; }\n\nlogin .login-card input[type=button] {\n  width: 100%;\n  display: block;\n  margin-bottom: 10px;\n  position: relative; }\n\nlogin .login-card input[type=text],\nlogin input[type=password] {\n  height: 44px;\n  font-size: 16px;\n  width: 100%;\n  margin-bottom: 10px;\n  -webkit-appearance: none;\n  background: #fff;\n  border: 1px solid #d9d9d9;\n  border-top: 1px solid #c0c0c0;\n  padding: 0 8px;\n  box-sizing: border-box;\n  -moz-box-sizing: border-box; }\n\nlogin .login-card input[type=text]:hover,\nlogin input[type=password]:hover {\n  border: 1px solid #b9b9b9;\n  border-top: 1px solid #a0a0a0;\n  -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); }\n\nlogin .login {\n  text-align: center;\n  font-size: 14px;\n  font-family: 'Arial', sans-serif;\n  font-weight: 700;\n  height: 36px;\n  padding: 0 8px; }\n\nlogin .login-submit {\n  border: 0px;\n  color: #fff;\n  text-shadow: 0 1px rgba(0, 0, 0, 0.1);\n  background-color: #4d90fe; }\n\nlogin .login-submit:hover {\n  border: 0px;\n  text-shadow: 0 1px rgba(0, 0, 0, 0.3);\n  background-color: #357ae8; }\n\nlogin .login-card a {\n  text-decoration: none;\n  color: #666;\n  font-weight: 400;\n  text-align: center;\n  display: inline-block;\n  opacity: 0.6;\n  transition: opacity ease 0.5s; }\n\nlogin .login-card a:hover {\n  opacity: 1; }\n\nlogin .login-help {\n  width: 100%;\n  text-align: center;\n  font-size: 12px; }\n", ""]);

	// exports


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	    name: 'logout',
	    template: __webpack_require__(34),
	    controller: ['$config', 'Account', 'UtilsService', function ($config, Account, UtilsService) {
	        __webpack_require__(35);
	        Account.logout().then(function (res) {
	            UtilsService.throwError({ logout: true });
	        });
	    }]
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "";

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(36);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./logout.scss", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./logout.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	    name: 'projects',
	    template: __webpack_require__(38),
	    controller: ['$config', 'Project', '$location', 'UtilsService', function ($config, Project, $location, UtilsService) {
	        var _this = this;

	        __webpack_require__(39);

	        var self = this;
	        self._project = {};
	        self.err = {};
	        this.$routerOnActivate = function (next) {
	            Project.get().then(function (res) {
	                if (res.data instanceof Array) self._projects = res.data;
	                UtilsService.throwError({ currentProject: res.data });
	            });
	        };
	        this.create = function () {
	            !self._project.name ? self.err.name = "*" : self.err.name = "";
	            !self._project.email ? self.err.email = "*" : self.err.email = "";
	            self._project.status == undefined ? self.err.stt = "*" : self.err.stt = "";

	            if (self.err.name == "*" || self.err.email == "*" || self.err.stt == "*") return;

	            Project.add(self._project).then(function (res) {
	                if (!self._projects) {
	                    self._projects = [];
	                }
	                self._projects.splice(0, 0, res.data);
	                _this.closeModal();
	            });
	        };

	        this.delete = function () {
	            if (!self._project) _this.closeModal();
	            var index = self._projects.indexOf(self._project);

	            if (self._projects[index] && self._projects[index]._id === self._project._id) {
	                Project.delete(self._project._id).then(function (res) {
	                    self._projects.splice(index, 1);
	                    _this.closeModal();
	                });
	            }
	        };
	        this.showModal = function (type, item) {
	            if (type === 'add') {
	                self._isCreate = 1;
	                setTimeout(function () {
	                    self._project.status = 1;
	                }, 100);
	            } else if (type === 'delete') self._isDelete = 1;

	            self._project = !item ? {} : item;
	            document.getElementById('favDialog').showModal();
	        };

	        this.closeModal = function () {
	            self._isDelete = "";
	            self._isCreate = "";
	            self._project = {};
	            document.getElementById('favDialog').close();
	        };
	    }]
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = "<div class=\"_table-layer\">\r\n  \r\n  <table style=\"width:100%\">\r\n    <tr>\r\n      <td>\r\n        <button ng-click=\"$ctrl.showModal('add',{})\" style=\"padding: 4px 10px;font-size: 15px;margin-top: -6px;\">Add Project</button>\r\n      </td>\r\n      <td>\r\n          <input style=\"float: right;padding: 5px;width: 250px;\" class=\"form-control\" placeholder=\"Enter keyword for searching\" type=\"text\" ng-model=\"$ctrl._kword\">\r\n      </td>\r\n    </tr>\r\n  </table>\r\n \r\n    <table class=\"table\">\r\n      <thead>\r\n      <tr>\r\n        <th>ID</th>\r\n        <th>Project Name</th>        \r\n        <th>Status</th>\r\n        <th>Description</th>\r\n        <th>Created date</th>\r\n        <th></th>\r\n      </tr>\r\n      </thead>\r\n      <tbody>\r\n      <tr ng-repeat=\"item in $ctrl._projects | filter : $ctrl._kword\">\r\n        <td>{{item._id}}</td>\r\n        <td>{{item.name}}</td>        \r\n        <td>{{item.status=='1'?'Activate':'Deactivate'}}</td>\r\n        <td>{{item.des}}</td>\r\n        <td>{{item.created_at | date:'yyyy-MM-dd HH:mm'}}</td>\r\n        <td style=\"text-align: right;\">\r\n          <label class=\"_link\" ng-click=\"$ctrl.showModal('delete', item)\" ng-if=\"$index !== 0\">Delete</label>\r\n        </td>\r\n      </tr>\r\n      </tbody>\r\n    </table>\r\n</div>\r\n\r\n<dialog id=\"favDialog\" class=\"modalDialog\">\r\n\t<div ng-show=\"!$ctrl._isDelete\">\r\n    <label ng-click=\"$ctrl.closeModal()\" title=\"Close\" class=\"close\">X</label>\r\n\t\t<div class=\"_component\">\r\n      <label>Project name</label>\r\n      <input class=\"form-control\" type=\"text\" ng-model=\"$ctrl._project.name\">\r\n      <font style=\"color: red;\" ng-show=\"$ctrl.err.name\"><i>Project name is required</i></font>\r\n    </div>\r\n    \r\n    <div class=\"_component\"> \r\n      <label>Email</label>\r\n      <input class=\"form-control\" type=\"text\" ng-model=\"$ctrl._project.email\">\r\n      <font style=\"color: red;\" ng-show=\"$ctrl.err.email\"><i>Email is required</i></font>\r\n    </div>\r\n    \r\n    <div class=\"_component\">\r\n      <label> Active Status</label>\r\n       <select class=\"form-control\" style=\"height: 25px;\" ng-model=\"$ctrl._project.status\" ng-options=\"(item?'Activate':'Deactivate') for item in [1, 0]\"></select>\r\n       <font style=\"color: red;\" ng-show=\"$ctrl.err.stt\"><i>Status is required</i></font>\r\n    </div>\r\n\r\n    <div class=\"_component\"> \r\n      <label>Description</label>\r\n      <textarea class=\"form-control\" ng-model=\"$ctrl._project.des\" rows=\"4\"></textarea>\r\n    </div>\r\n\r\n    <div class=\"_component padding-bottom15\" style=\"margin-top: 20px;\">\r\n        <button class=\"padding-button5\" ng-click=\"$ctrl.create()\" ng-show=\"$ctrl._isCreate\">Create</button>\r\n        <button  class=\"padding-button5\" ng-click=\"$ctrl.closeModal()\" >Cancel</button>\r\n    </div>\r\n\t</div>\r\n  <div ng-show=\"$ctrl._isDelete\">\r\n    <div class=\"_component\">\r\n      <label> Do you want to delete \"{{$ctrl._project.name}}\" project ? </label>\r\n    </div>\r\n    <div class=\"_component padding-bottom15\" style=\"margin-top: 20px;\">\r\n        <button class=\"padding-button5\" ng-click=\"$ctrl.delete()\">Delete</button>\r\n        <button class=\"padding-button5\" ng-click=\"$ctrl.closeModal()\" >Cancel</button>\r\n    </div>\r\n  </div>\r\n</dialog>";

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(40);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./projects.scss", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./projects.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	// imports


	// module
	exports.push([module.id, "projects ._table-layer {\n  width: 95%;\n  margin: 0 auto; }\n\nprojects .clear {\n  clear: both; }\n\nprojects ._component {\n  margin-top: 10px;\n  width: 100%; }\n\nprojects label {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: 700; }\n\nprojects .form-control {\n  display: block;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #555;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;\n  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n  width: 98%;\n  padding-left: 5px; }\n\nprojects ._noteField {\n  margin-left: 8px;\n  cursor: pointer;\n  text-decoration: underline;\n  font-weight: bolder; }\n\nprojects .table {\n  width: 100%;\n  max-width: 100%;\n  border-collapse: collapse;\n  margin-bottom: 20px; }\n\nprojects .table > thead:first-child > tr:first-child > th {\n  border-top: 0; }\n\nprojects .table > thead > tr > th {\n  vertical-align: bottom;\n  border-bottom: 2px solid #ddd; }\n\nprojects .table > thead > tr > th {\n  padding: 8px;\n  line-height: 1.42857143;\n  vertical-align: top;\n  border-top: 1px solid #ddd; }\n\nprojects th {\n  text-align: left; }\n\nprojects .table > tbody > tr > td,\nprojects .table > tbody > tr > th,\nprojects .table > tfoot > tr > td,\nprojects .table > tfoot > tr > th,\nprojects .table > thead > tr > td,\nprojects .table > thead > tr > th {\n  padding: 8px;\n  line-height: 1.42857143;\n  vertical-align: top;\n  border-top: 1px solid #ddd; }\n\nprojects ._link {\n  color: -webkit-link;\n  text-decoration: underline;\n  cursor: pointer;\n  font-weight: 100; }\n\nprojects .padding-right5 {\n  padding-right: 5px; }\n\nprojects .padding-button5 {\n  padding: 4px 11px; }\n\nprojects .padding-bottom15 {\n  padding-bottom: 15px; }\n\nprojects .modalDialog {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: rgba(0, 0, 0, 0.8);\n  z-index: 99999;\n  opacity: 1;\n  -webkit-transition: opacity 400ms ease-in;\n  -moz-transition: opacity 400ms ease-in;\n  transition: opacity 400ms ease-in;\n  width: 100%;\n  height: 100vh; }\n\nprojects .modalDialog > div {\n  width: 400px;\n  position: relative;\n  margin: 10% auto;\n  padding: 5px 20px 13px 20px;\n  border-radius: 10px;\n  background: #fff;\n  background: -moz-linear-gradient(#fff, #999);\n  background: -webkit-linear-gradient(#fff, #DDD);\n  background: -o-linear-gradient(#fff, #999); }\n\nprojects .close {\n  background: #606061;\n  color: #FFFFFF;\n  line-height: 25px;\n  position: absolute;\n  right: -12px;\n  text-align: center;\n  top: -10px;\n  width: 24px;\n  text-decoration: none;\n  font-weight: bold;\n  -webkit-border-radius: 12px;\n  -moz-border-radius: 12px;\n  border-radius: 12px;\n  -moz-box-shadow: 1px 1px 3px #000;\n  -webkit-box-shadow: 1px 1px 3px #000;\n  box-shadow: 1px 1px 3px #000; }\n\nprojects .close:hover {\n  background: #00d9ff; }\n", ""]);

	// exports


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	    name: 'role',
	    template: __webpack_require__(42),
	    controller: ['$config', 'Role', '$location', function ($config, Role, $location) {
	        var _this = this;

	        __webpack_require__(43);
	        var self = this;
	        self._api = [];
	        self._web = [];
	        self._mob = [];
	        self._rname = "";

	        this.$routerOnActivate = function (next) {
	            Role.get().then(function (res) {
	                self._roles = res.data;

	                if (!self._roles) return;

	                for (var i = 0; i < self._roles.length; i++) {
	                    self._roles[i].api = _this.arrInOneLine(self._roles[i].api);
	                    self._roles[i].web = _this.arrInOneLine(self._roles[i].web);
	                    self._roles[i].mob = _this.arrInOneLine(self._roles[i].mob);
	                }
	            });
	        };

	        this.addRole = function () {
	            if (!self._rname) alert('Please enter Role name');
	            Role.add({ name: self._rname }).then(function (res) {
	                if (!self._roles) self._roles = [];
	                self._roles.push(res.data);
	                self._rname = "";
	            });
	        };
	        this.deleteRole = function (_index, _id) {
	            if (confirm("Do you want to delete this role")) {
	                Role.delete(_id).then(function (res) {
	                    self._roles.splice(_index, 1);
	                });
	            }
	        };
	        this.addConfigRow = function (_index, type) {
	            if (type == 'api') {

	                if (!self._api[_index] || !self._api[_index].path || !self._api[_index].actions) return;
	                self._api[_index].actions = self._api[_index].actions.toUpperCase();

	                if (self._roles[_index].api) {
	                    self._roles[_index].api.splice(0, 0, self._api[_index]);
	                } else {
	                    self._roles[_index].api = [];
	                    self._roles[_index].api.push(self._api[_index]);
	                }
	                self._api[_index] = {};
	            } else if (type == 'web') {
	                if (!self._web[_index] || !self._web[_index].path || !self._web[_index].actions) return;
	                self._web[_index].actions = self._web[_index].actions.toUpperCase();

	                if (self._roles[_index].web) {
	                    self._roles[_index].web.splice(0, 0, self._web[_index]);
	                } else {
	                    self._roles[_index].web = [];
	                    self._roles[_index].web.push(self._web[_index]);
	                }
	                self._web[_index] = {};
	            } else if (type == 'mob') {
	                if (!self._mob[_index] || !self._mob[_index].path || !self._mob[_index].actions) return;
	                self._mob[_index].actions = self._mob[_index].actions.toUpperCase();

	                if (self._roles[_index].mob) {
	                    self._roles[_index].mob.splice(0, 0, self._mob[_index]);
	                } else {
	                    self._roles[_index].mob = [];
	                    self._roles[_index].mob.push(self._mob[_index]);
	                }
	                self._mob[_index] = {};
	            }
	        };

	        this.save = function (_index, type) {
	            // validate object
	            var _temp = void 0;
	            if (type == 'api') {
	                var _lstAPIs = self._roles[_index].api;
	                self._roles[_index].api = _this.removeElement(_lstAPIs);
	                _temp = _.cloneDeep(self._roles[_index]);
	                _temp.api = _this.convert2Arr(_temp.api);

	                delete _temp.web;
	                delete _temp.mob;
	            } else if (type == 'web') {
	                var _lstAPIs2 = self._roles[_index].web;
	                self._roles[_index].web = _this.removeElement(_lstAPIs2);
	                _temp = _.cloneDeep(self._roles[_index]);
	                _temp.web = _this.convert2Arr(_temp.web);

	                delete _temp.mob;
	                delete _temp.api;
	            } else if (type == 'mob') {
	                var _lstAPIs3 = self._roles[_index].mob;
	                self._roles[_index].mob = _this.removeElement(_lstAPIs3);
	                _temp = _.cloneDeep(self._roles[_index]);
	                _temp.mob = _this.convert2Arr(_temp.mob);
	                delete _temp.web;
	                delete _temp.api;
	            }

	            Role.update(_temp).then(function (res) {
	                alert("Data is saved !");
	            });
	        };

	        this.convert2Arr = function (arr) {
	            if (!arr) return arr;
	            for (var i = 0; i < arr.length; i++) {
	                if (arr[i].actions != "") {
	                    arr[i].actions = arr[i].actions.split(",");
	                }
	            }
	            return arr;
	        };
	        this.removeElement = function (arr) {
	            if (!arr) return arr;
	            for (var i = 0; i < arr.length; i++) {
	                if (arr[i].path == "" || arr[i].actions == "") {
	                    arr.splice(i, 1);
	                    _this.removeElement(arr);
	                }
	            }
	            return arr;
	        };

	        this.arrInOneLine = function (_obj) {
	            if (!_obj || _obj.length == 0) return;
	            var append_str = "";
	            for (var i = 0; i < _obj.length; i++) {
	                if (_obj[i].actions && _obj[i].actions.length > 0) {
	                    append_str = "";
	                    for (var x = 0; x < _obj[i].actions.length; x++) {
	                        append_str += _obj[i].actions[x] + ",";
	                    }
	                    append_str = append_str.substr(0, append_str.length - 1);
	                    _obj[i].actions = append_str;
	                }
	            }
	            return _obj;
	        };
	    }]
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = "<div class=\"_authLayer\">\r\n  \r\n  <div class=\"_component\">\r\n    <label>Role name</label><br>\r\n    <input placeholder=\"Enter role name\" type=\"text\" ng-model=\"$ctrl._rname\">\r\n    <button ng-click=\"$ctrl.addRole()\">Add role</button>\r\n  </div>\r\n\r\n  <div class=\"_component\">\r\n    <label>Quick search</label><br>\r\n    <input placeholder=\"Enter keyword\" type=\"text\" ng-model=\"$ctrl._kword\">\r\n  </div>\r\n  <p></p>\r\n  <details ng-repeat=\"item in $ctrl._roles | filter : $ctrl._kword\">\r\n    <summary>{{item.name}} <b>{{item._id}}</b>\r\n      <button class=\"_btn-save\" ng-click=\"$ctrl.deleteRole($index,item._id)\">Delete</button>\r\n    </summary>\r\n    \r\n    <details class=\"_details-for\">\r\n      <summary class=\"_summary-for\">API \r\n        <button class=\"_btn-save\" ng-click=\"$ctrl.save($index,'api')\">Save</button>\r\n      </summary>\r\n        <table class=\"_table-for\">\r\n          <tr>\r\n            <td>\r\n                <label>Path</label>\r\n                <span class=\"_noteField\" title=\"Path API to privilege ('.*' for all path) \">? </span>\r\n            </td>\r\n            <td>\r\n              <label>Action</label>\r\n              <span class=\"_noteField\" title=\"User privilege ('.*' for all permission)\">? </span>\r\n            </td>\r\n          </tr>\r\n          <tr>\r\n            <td>\r\n                <input class=\"form-control\" placeholder=\"account\" type=\"text\" ng-model=\"$ctrl._api[$index].path\" ng-blur=\"$ctrl.addConfigRow($index,'api')\">\r\n            </td>\r\n            <td>\r\n                <input class=\"form-control uppercase\" placeholder='ADD,GET,DELETE,...' type=\"text\" ng-model=\"$ctrl._api[$index].actions\" ng-blur=\"$ctrl.addConfigRow($index,'api')\">\r\n            </td>\r\n          </tr>\r\n          <tr ng-repeat=\"api in item.api\">\r\n            <td>\r\n                <input class=\"form-control\" type=\"text\" ng-model=\"item.api[$index].path\">\r\n            </td>\r\n            <td>\r\n                <input class=\"form-control uppercase\" type=\"text\" ng-model=\"item.api[$index].actions\">\r\n            </td>\r\n          </tr>\r\n        </table>\r\n    </details>\r\n    \r\n    <details class=\"_details-for\">\r\n      <summary class=\"_summary-for\">Website<button class=\"_btn-save\" ng-click=\"$ctrl.save($index,'web')\">Save</button></summary>\r\n        <table class=\"_table-for\">\r\n          <tr>\r\n            <td>\r\n                <label>Path</label>\r\n                <span class=\"_noteField\" title=\"Path API to privilege ('.*' for all path) \">? </span>\r\n            </td>\r\n            <td>\r\n              <label>Action</label>\r\n              <span class=\"_noteField\" title=\"User privilege ('.*' for all permission)\">? </span>\r\n            </td>\r\n          </tr>\r\n          <tr>\r\n            <td>\r\n                <input class=\"form-control\" placeholder=\"/account\" type=\"text\" ng-model=\"$ctrl._web[$index].path\" ng-blur=\"$ctrl.addConfigRow($index,'web')\">\r\n            </td>\r\n            <td>\r\n                <input class=\"form-control  uppercase\" placeholder='LOGIN,REGISTER,...' type=\"text\" ng-model=\"$ctrl._web[$index].actions\" ng-blur=\"$ctrl.addConfigRow($index,'web')\">\r\n            </td>\r\n          </tr>\r\n\r\n          <tr ng-repeat=\"web in item.web\">\r\n            <td>\r\n                <input class=\"form-control\" placeholder=\"{{web.path}}\" type=\"text\" ng-model=\"item.web[$index].path\">\r\n            </td>\r\n            <td>\r\n                <input class=\"form-control uppercase\" placeholder=\"{{web.actions}}\" type=\"text\" ng-model=\"item.web[$index].actions\">\r\n            </td>\r\n          </tr>\r\n        </table>\r\n    </details>\r\n\r\n    <details class=\"_details-for\">\r\n      <summary class=\"_summary-for\">Mobile<button class=\"_btn-save\" ng-click=\"$ctrl.save($index,'mob')\">Save</button></summary>\r\n        <table class=\"_table-for\">\r\n          <tr>\r\n            <td>\r\n                <label>Path</label>\r\n                <span class=\"_noteField\" title=\"Path API to privilege ('.*' for all path) \">? </span>\r\n            </td>\r\n            <td>\r\n              <label>Action</label>\r\n              <span class=\"_noteField\" title=\"User privilege ('.*' for all permission)\">? </span>\r\n            </td>\r\n          </tr>\r\n          <tr>\r\n            <td>\r\n                <input class=\"form-control\" placeholder=\"/account\" type=\"text\" ng-model=\"$ctrl._mob[$index].path\" ng-blur=\"$ctrl.addConfigRow($index,'mob')\">\r\n            </td>\r\n            <td>\r\n                <input class=\"form-control uppercase\" placeholder='LOGIN,REGISTER,...' type=\"text\" ng-model=\"$ctrl._mob[$index].actions\" ng-blur=\"$ctrl.addConfigRow($index,'mob')\">\r\n            </td>\r\n          </tr>\r\n          <tr ng-repeat=\"mob in item.mob\">\r\n            <td>\r\n                <input class=\"form-control\" placeholder=\"{{mob.path}}\" type=\"text\" ng-model=\"item.mob[$index].path\">\r\n            </td>\r\n            <td>\r\n                <input class=\"form-control uppercase\" placeholder=\"{{mob.actions}}\" type=\"text\" ng-model=\"item.mob[$index].actions\">\r\n            </td>\r\n          </tr>\r\n        </table>\r\n    </details>\r\n    </div>\r\n  </details>\r\n";

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(44);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./role.scss", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./role.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	// imports


	// module
	exports.push([module.id, "role {\n  /* Style the summary when details box is open */ }\n  role ._authLayer {\n    width: 100%;\n    height: 100vh; }\n  role .clear {\n    clear: both; }\n  role ._component {\n    margin-top: 10px; }\n  role label {\n    display: inline-block;\n    max-width: 100%;\n    margin-bottom: 5px;\n    font-weight: 700; }\n  role .form-control {\n    display: block;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;\n    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\n    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\n    padding-left: 5px;\n    width: 95%; }\n  role ._noteField {\n    margin-left: 8px;\n    cursor: pointer;\n    text-decoration: underline;\n    font-weight: bolder; }\n  role summary {\n    outline: none;\n    cursor: pointer; }\n  role details {\n    border-radius: 3px;\n    background: #EEE;\n    margin: 1em 0; }\n  role summary {\n    background: #333;\n    color: #FFF;\n    border-radius: 3px;\n    padding: 5px 10px;\n    outline: none; }\n  role details[open] summary {\n    background: #69c773;\n    color: #333; }\n  role .detail-title {\n    text-align: left;\n    padding-left: 5px; }\n  role ._details-for {\n    margin-left: 10px;\n    margin-top: 5px; }\n  role ._summary-for {\n    background: none !important;\n    font-weight: 600; }\n  role ._table-for {\n    margin: 5px 15px 15px 20px;\n    width: 100%; }\n  role ._table-for td:first-child {\n    width: 40%; }\n  role ._btn-save {\n    float: right;\n    border-radius: 30px;\n    font-size: 12px; }\n  role .uppercase {\n    text-transform: uppercase; }\n", ""]);

	// exports


/***/ }
]);