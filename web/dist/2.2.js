webpackJsonp([2],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    // never use services in there
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = ['$locationProvider', '$config', '$httpProvider', function ($locationProvider, $config, $httpProvider) {
	    $locationProvider.html5Mode(false);
	}];

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  openModal: ['$location', function ($location) {
	    return {
	      link: function link(scope, element, attributes) {
	        element.on("click", function () {
	          document.querySelector(attributes.openModal).showModal();
	        });
	      }
	    };
	  }],
	  closeModal: ['$location', function ($location) {
	    return {
	      link: function link(scope, element, attributes) {
	        element.on("click", function () {
	          document.querySelector(attributes.closeModal).close();
	        });
	      }
	    };
	  }],
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
	            element[i].style.backgroundImage = 'url(' + backgroundSrc + '), url(' + __webpack_require__(9) + ')';
	          } else {
	            if (backgroundSrc) {
	              if (scope.size) {
	                var ii = backgroundSrc.lastIndexOf('/');
	                backgroundSrc = backgroundSrc.substr(0, ii + 1) + scope.size + backgroundSrc.substr(ii);
	                element[i].style.backgroundImage = 'url(' + $config.services.mail + backgroundSrc + '), url(' + __webpack_require__(9) + ')';
	              } else {
	                element[i].style.backgroundImage = 'url(' + $config.services.mail + backgroundSrc + ')';
	              }
	            } else {
	              element[i].style.backgroundImage += 'url(' + __webpack_require__(9) + ')';
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
	            ee.setAttribute('src', __webpack_require__(9));
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
	              console.log($config.services.mail + imageSrc);
	              ee.setAttribute('src', $config.services.mail + imageSrc);
	            }
	          } else {
	            ee.setAttribute('src', __webpack_require__(9));
	          }
	        }
	      }
	    };
	  }]
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAACSElEQVRIS62WS6tBURTHyQfwYTyT8hpgZCQyEpISGYlSZGCAEZkykInEwKOkUOITYEQZyGPkWcrzrtu5ufece2z76KzZ2Wet9dtr773+e3MfjwcHz67X62634/F4fD6fy+XiBXE4AEDb/X5vtVoul0smkwkEAqFQqFKpgsHgaDR6F/r9/w1gv997vV7I+99EIlEmk7ndbmgMCnA6naxWK23252AymfwcAMHo7MSKdTodBONlBev1WiqVvgWAg8lkgn16xXgJKBaLONkJn+l0yhgQi8XwAc1mkzEgFArhAyqVCmNAPB7HB7TbbcaAWq2GCYCGWCwWjAHQYgqFAofhdDo/OaYQUygU3gIkEslwOPwQADKA3mpYnFKpxLiTIS+c616vt9lsQEHT6TRM838pIHnE6ZzNZoPBYLVa0ZKojdbv941GI5FOo9HAVkOXAg9kw2KxwIhWq3U4HNlsFvAgVk88VON2uwFGwZAA9Xod/CiThT2Eas7n89/Iw+FQLpcNBgPFWa1WTyaTv56/gPl8LpfLX+0qRHo8nmg0Gg6H7XY7cTfQmtlsvlwuT8YvIBKJvD0zmA7VapUKOB6PiElh5n262Ww2KqDb7TLNgvAXi8Xb7ZZg/CxRKpViEQCp4DSSAD6fj11APp8nAeBWYheQSCRIAL1ezy4ANIYEgBZlF+D3+0kAnU7HLoBaAcgIu4BcLkeqAB6HLAKgZ5fLJQkAH4yeEYjZgLY3Gg0aLYIh4pGrVCpBU5kadC8oeSAQGI/H9GqKvpg+/vsFrEdS1laSoKUAAAAASUVORK5CYII="

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  status: ['$filter', function ($filter) {
	    return function (input) {
	      if (input === 0) return 'PENDING';
	      if (input === 1) return 'ERROR';
	      if (input === 2) return 'FAILED';
	      if (input === 3) return 'DONE';
	      return 'UNKNOWN STATUS';
	    };
	  }]
	};

/***/ },
/* 11 */
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
	    Mail: ['$http', '$rootScope', '$config', 'UtilsService', function ($http, $rootScope, $config, UtilsService) {
	        return {
	            find: function find(status) {
	                return $http.get($config.services.mail + '/mail?status=' + status).catch(UtilsService.throwError);
	            },
	            init: function init() {
	                return $http.post($config.services.mail + '/config').catch(UtilsService.throwError);
	            },
	            delete: function _delete(_id) {
	                return $http.delete($config.services.mail + '/mail/' + _id).catch(UtilsService.throwError);
	            },
	            resend: function resend(_id) {
	                return $http.put($config.services.mail + '/mail/' + _id).catch(UtilsService.throwError);
	            }
	        };
	    }]
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(13);
	module.exports = {
	    name: 'myApp',
	    template: __webpack_require__(17),
	    $routeConfig: [{
	        path: '/',
	        name: 'MailList',
	        component: 'mailList',
	        useAsDefault: true
	    }]
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(16)(content, {});
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ function(module, exports) {

	module.exports = "<ng-outlet></ng-outlet>";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	    name: 'mailList',
	    template: __webpack_require__(19),
	    controller: ['$config', 'Mail', '$window', function ($config, Mail, $window) {
	        var _this = this;

	        __webpack_require__(20);
	        var self = this;
	        this.filterStatus = "";

	        this.loadData = function () {
	            Mail.find(_this.filterStatus).then(function (resp) {
	                self.mails = resp.data;
	            });
	        };

	        this.details = function (item) {
	            self.mail = item;
	            self.open = true;
	        };

	        this.delete = function (item) {
	            if (!$window.confirm('Are you sure to delete ?')) return;
	            Mail.delete(item._id).then(function (resp) {
	                _this.loadData();
	            });
	        };

	        this.resend = function (item) {
	            Mail.resend(item._id).then(function (resp) {
	                _this.loadData();
	            });
	        };

	        this.loadData();
	    }]
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<dialog id=\"formDetails\">    \r\n    <a href=\"javascript:void(0)\" close-modal=\"#formDetails\" class=\"close\">[X]</a>\r\n    <h1>Mail information</h1>\r\n    <div>\r\n        <h3>{{$ctrl.mail.title}}</h3>\r\n        <p ng-if=\"$ctrl.mail.html\" ng-bind-html-unsafe=\"$ctrl.mail.content\"></p>\r\n        <p ng-if=\"!$ctrl.mail.html\"><pre>{{$ctrl.mail.content}}</pre></p>\r\n        <div ng-if=\"$ctrl.mail.to\">To: [ <a href=\"mailto:{{to}}\" ng-repeat=\"to in $ctrl.mail.to\">{{to}}</a> ]</div>\r\n        <div ng-if=\"$ctrl.mail.cc\">CC: [ <a href=\"mailto:{{cc}}\" ng-repeat=\"cc in $ctrl.mail.cc\">{{cc}}</a> ]</div>\r\n        <div ng-if=\"$ctrl.mail.bcc\">BCC: [ <a href=\"mailto:{{bcc}}\" ng-repeat=\"bcc in $ctrl.mail.bcc\">{{bcc}}</a> ]</div>\r\n        <p>\r\n            Attachments: <a href=\"{{$ctrl.apiUrl}}{{att.path}}\" ng-repeat=\"att in $ctrl.mail.attachments\">{{att.name}}</a>\r\n        </p>\r\n        <p>Sender: <b>{{$ctrl.mail.config_name}}</b></p>\r\n    </div>\r\n</dialog>\r\n<table class=\"table\" width=\"100%\">\r\n    <thead>\r\n        <tr>\r\n            <th></th>\r\n            <th>Title</th>        \r\n            <th>\r\n                <select ng-model=\"$ctrl.filterStatus\" ng-change=\"$ctrl.loadData()\">\r\n                    <option value=\"\">Status (All)</option>\r\n                    <option value=\"0\" class=\"warn\">Pending</option>\r\n                    <option value=\"1\" class=\"error\">Error</option>\r\n                    <option value=\"2\" class=\"error\">Failed</option>\r\n                    <option value=\"3\" class=\"pass\">Done</option>\r\n                </select>\r\n            </th>\r\n            <th>Sender</th>\r\n            <th>Created date</th>\r\n            <th></th>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr ng-repeat=\"item in $ctrl.mails\">\r\n        <th>{{$index+1}}. </th>\r\n        <td>{{item.title}}</td>\r\n        <td title=\"{{item.msg}}\" ng-class=\"{warn: item.status == 0, error: (item.status == 1 || item.status == 2), pass: item.status === 3}\">{{item.status | status}}{{item.status === 1 ? (' (' + item.trying + ')') : ''}}</td>        \r\n        <td>{{item.config_name}}</td>\r\n        <td class=\"date\">{{item.updated_at | date:'yyyy-MM-dd HH:mm'}}</td>\r\n        <th>\r\n            <a href=\"javascript: void(0);\" open-modal=\"#formDetails\" ng-click=\"$ctrl.details(item)\">Details</a>&nbsp;\r\n            <a href=\"javascript: void(0);\" ng-click=\"$ctrl.resend(item)\">Try again</a>&nbsp;\r\n            <a href=\"javascript: void(0);\" ng-click=\"$ctrl.delete(item)\">Delete</a>\r\n        </th>\r\n    </tr>\r\n    </tbody>\r\n</table>";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(16)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./list.scss", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./list.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ }
]);