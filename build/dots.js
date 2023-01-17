(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dotsjs"] = factory();
	else
		root["dotsjs"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findScript": () => (/* binding */ findScript),
/* harmony export */   "initDots": () => (/* binding */ initDots),
/* harmony export */   "loadScript": () => (/* binding */ loadScript),
/* harmony export */   "validateLoadParams": () => (/* binding */ validateLoadParams)
/* harmony export */ });
const V2_URL = 'https://js.tilled.com/v2';
const id = 'dots-js-script';
const EXISTING_SCRIPT_MESSAGE = 'loadStripe.setLoadParameters was called but an existing Dots.js script already exists in the document; existing script parameters will be used';
const dotsServerUrl = {
    sandbox: 'https://api.dots.dev/api',
    production: 'https://api.senddotssanbox.com/api',
    development: 'http://localhost:8080/api',
};
const findScript = () => {
    const scripts = document.querySelectorAll(`script[src^="${V2_URL}"]`);
    for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        return script;
    }
    return null;
};
const injectScript = (params) => {
    const script = document.createElement('script');
    script.src = V2_URL;
    script.id = id;
    const headOrBody = document.head || document.body;
    if (!headOrBody) {
        throw new Error('Expected document.body not to be null. Dots.js requires a <body> element.');
    }
    headOrBody.appendChild(script);
    return script;
};
const registerWrapper = (dots, startTime) => {
    if (!dots || !dots._registerWrapper) {
        return;
    }
    //dots._registerWrapper({ name: 'dots-js', version: _VERSION, startTime });
};
let dotsPromise = null;
let tilledPromise = null;
const loadScript = (params) => {
    // Ensure that we only attempt to load Tilled.js at most once
    if (tilledPromise !== null) {
        return tilledPromise;
    }
    tilledPromise = new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
            // Resolve to null when imported server side. This makes the module
            // safe to import in an isomorphic code base.
            resolve(null);
            return;
        }
        if (window.Tilled && params) {
            console.warn(EXISTING_SCRIPT_MESSAGE);
        }
        if (window.Tilled) {
            resolve(window.Tilled);
            return;
        }
        try {
            let script = findScript();
            if (script && params) {
                console.warn(EXISTING_SCRIPT_MESSAGE);
            }
            else if (!script) {
                script = injectScript(params);
            }
            script.addEventListener('load', () => {
                if (window.Tilled) {
                    resolve(window.Tilled);
                }
                else {
                    reject(new Error('Dots.js not available'));
                }
            });
            script.addEventListener('error', () => {
                reject(new Error('Failed to load Dots.js'));
            });
        }
        catch (error) {
            reject(error);
            return;
        }
    });
    return tilledPromise;
};
const initDots = async (maybeTilled, args, startTime) => {
    if (maybeTilled === null) {
        return null;
    }
    const resposne = await fetch(dotsServerUrl[args[1]] + '/v2/payments/public-account-information', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(args[0] + ':')
        }
    });
    const { public_key: publicKey, account_id: accountId } = await resposne.json();
    const dots = new maybeTilled(publicKey, accountId, {
        sandbox: args[1] === 'sandbox' || args[1] === 'development',
        log_level: 0,
    });
    registerWrapper(dots, startTime);
    return dots;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const validateLoadParams = (params) => {
    const errorMessage = `invalid load parameters; expected object of shape

    {advancedFraudSignals: boolean}

but received

    ${JSON.stringify(params)}
`;
    if (params === null || typeof params !== 'object') {
        throw new Error(errorMessage);
    }
    if (Object.keys(params).length === 1 &&
        typeof params.advancedFraudSignals === 'boolean') {
        return params;
    }
    throw new Error(errorMessage);
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadDots": () => (/* binding */ loadDots)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/helpers.ts");
// Execute our own script injection after a tick to give users time to do their

// own script injection.
const dotsPromise = Promise.resolve().then(() => (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.loadScript)(null));
let loadCalled = false;
dotsPromise.catch((err) => {
    if (!loadCalled) {
        console.warn(err);
    }
});
const loadDots = async (...args) => {
    loadCalled = true;
    const startTime = Date.now();
    return dotsPromise.then(async (maybeTilled) => await (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.initDots)(maybeTilled, args, startTime));
};

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG90cy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0Esd0lBQXdJO0FBQ3hJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLDhEQUE4RCxPQUFPO0FBQ3JFLG9CQUFvQixvQkFBb0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwrQ0FBK0M7QUFDN0U7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxZQUFZLCtDQUErQztBQUMzRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLG1EQUFtRDs7QUFFbkQsS0FBSzs7QUFFTDs7QUFFQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN0SEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ2lEO0FBQ2pEO0FBQ0EsaURBQWlELG9EQUFVO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ007QUFDUDtBQUNBO0FBQ0EseURBQXlELGtEQUFRO0FBQ2pFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZG90c2pzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9kb3RzanMvLi9zcmMvaGVscGVycy50cyIsIndlYnBhY2s6Ly9kb3RzanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZG90c2pzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kb3RzanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kb3RzanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kb3RzanMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZG90c2pzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImRvdHNqc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCJjb25zdCBWMl9VUkwgPSAnaHR0cHM6Ly9qcy50aWxsZWQuY29tL3YyJztcclxuY29uc3QgaWQgPSAnZG90cy1qcy1zY3JpcHQnO1xyXG5jb25zdCBFWElTVElOR19TQ1JJUFRfTUVTU0FHRSA9ICdsb2FkU3RyaXBlLnNldExvYWRQYXJhbWV0ZXJzIHdhcyBjYWxsZWQgYnV0IGFuIGV4aXN0aW5nIERvdHMuanMgc2NyaXB0IGFscmVhZHkgZXhpc3RzIGluIHRoZSBkb2N1bWVudDsgZXhpc3Rpbmcgc2NyaXB0IHBhcmFtZXRlcnMgd2lsbCBiZSB1c2VkJztcclxuY29uc3QgZG90c1NlcnZlclVybCA9IHtcclxuICAgIHNhbmRib3g6ICdodHRwczovL2FwaS5kb3RzLmRldi9hcGknLFxyXG4gICAgcHJvZHVjdGlvbjogJ2h0dHBzOi8vYXBpLnNlbmRkb3Rzc2FuYm94LmNvbS9hcGknLFxyXG4gICAgZGV2ZWxvcG1lbnQ6ICdodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpJyxcclxufTtcclxuZXhwb3J0IGNvbnN0IGZpbmRTY3JpcHQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgc2NyaXB0W3NyY149XCIke1YyX1VSTH1cIl1gKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IHNjcmlwdHNbaV07XHJcbiAgICAgICAgcmV0dXJuIHNjcmlwdDtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5jb25zdCBpbmplY3RTY3JpcHQgPSAocGFyYW1zKSA9PiB7XHJcbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgIHNjcmlwdC5zcmMgPSBWMl9VUkw7XHJcbiAgICBzY3JpcHQuaWQgPSBpZDtcclxuICAgIGNvbnN0IGhlYWRPckJvZHkgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmJvZHk7XHJcbiAgICBpZiAoIWhlYWRPckJvZHkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGRvY3VtZW50LmJvZHkgbm90IHRvIGJlIG51bGwuIERvdHMuanMgcmVxdWlyZXMgYSA8Ym9keT4gZWxlbWVudC4nKTtcclxuICAgIH1cclxuICAgIGhlYWRPckJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgIHJldHVybiBzY3JpcHQ7XHJcbn07XHJcbmNvbnN0IHJlZ2lzdGVyV3JhcHBlciA9IChkb3RzLCBzdGFydFRpbWUpID0+IHtcclxuICAgIGlmICghZG90cyB8fCAhZG90cy5fcmVnaXN0ZXJXcmFwcGVyKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy9kb3RzLl9yZWdpc3RlcldyYXBwZXIoeyBuYW1lOiAnZG90cy1qcycsIHZlcnNpb246IF9WRVJTSU9OLCBzdGFydFRpbWUgfSk7XHJcbn07XHJcbmxldCBkb3RzUHJvbWlzZSA9IG51bGw7XHJcbmxldCB0aWxsZWRQcm9taXNlID0gbnVsbDtcclxuZXhwb3J0IGNvbnN0IGxvYWRTY3JpcHQgPSAocGFyYW1zKSA9PiB7XHJcbiAgICAvLyBFbnN1cmUgdGhhdCB3ZSBvbmx5IGF0dGVtcHQgdG8gbG9hZCBUaWxsZWQuanMgYXQgbW9zdCBvbmNlXHJcbiAgICBpZiAodGlsbGVkUHJvbWlzZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB0aWxsZWRQcm9taXNlO1xyXG4gICAgfVxyXG4gICAgdGlsbGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgLy8gUmVzb2x2ZSB0byBudWxsIHdoZW4gaW1wb3J0ZWQgc2VydmVyIHNpZGUuIFRoaXMgbWFrZXMgdGhlIG1vZHVsZVxyXG4gICAgICAgICAgICAvLyBzYWZlIHRvIGltcG9ydCBpbiBhbiBpc29tb3JwaGljIGNvZGUgYmFzZS5cclxuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAod2luZG93LlRpbGxlZCAmJiBwYXJhbXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKEVYSVNUSU5HX1NDUklQVF9NRVNTQUdFKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHdpbmRvdy5UaWxsZWQpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh3aW5kb3cuVGlsbGVkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgc2NyaXB0ID0gZmluZFNjcmlwdCgpO1xyXG4gICAgICAgICAgICBpZiAoc2NyaXB0ICYmIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKEVYSVNUSU5HX1NDUklQVF9NRVNTQUdFKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICghc2NyaXB0KSB7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBpbmplY3RTY3JpcHQocGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuVGlsbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh3aW5kb3cuVGlsbGVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0RvdHMuanMgbm90IGF2YWlsYWJsZScpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkIERvdHMuanMnKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRpbGxlZFByb21pc2U7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpbml0RG90cyA9IGFzeW5jIChtYXliZVRpbGxlZCwgYXJncywgc3RhcnRUaW1lKSA9PiB7XHJcbiAgICBpZiAobWF5YmVUaWxsZWQgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3Bvc25lID0gYXdhaXQgZmV0Y2goZG90c1NlcnZlclVybFthcmdzWzFdXSArICcvdjIvcGF5bWVudHMvcHVibGljLWFjY291bnQtaW5mb3JtYXRpb24nLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0Jhc2ljICcgKyBidG9hKGFyZ3NbMF0gKyAnOicpXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB7IHB1YmxpY19rZXk6IHB1YmxpY0tleSwgYWNjb3VudF9pZDogYWNjb3VudElkIH0gPSBhd2FpdCByZXNwb3NuZS5qc29uKCk7XHJcbiAgICBjb25zdCBkb3RzID0gbmV3IG1heWJlVGlsbGVkKHB1YmxpY0tleSwgYWNjb3VudElkLCB7XHJcbiAgICAgICAgc2FuZGJveDogYXJnc1sxXSA9PT0gJ3NhbmRib3gnIHx8IGFyZ3NbMV0gPT09ICdkZXZlbG9wbWVudCcsXHJcbiAgICAgICAgbG9nX2xldmVsOiAwLFxyXG4gICAgfSk7XHJcbiAgICByZWdpc3RlcldyYXBwZXIoZG90cywgc3RhcnRUaW1lKTtcclxuICAgIHJldHVybiBkb3RzO1xyXG59O1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG5leHBvcnQgY29uc3QgdmFsaWRhdGVMb2FkUGFyYW1zID0gKHBhcmFtcykgPT4ge1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYGludmFsaWQgbG9hZCBwYXJhbWV0ZXJzOyBleHBlY3RlZCBvYmplY3Qgb2Ygc2hhcGVcblxuICAgIHthZHZhbmNlZEZyYXVkU2lnbmFsczogYm9vbGVhbn1cblxuYnV0IHJlY2VpdmVkXG5cbiAgICAke0pTT04uc3RyaW5naWZ5KHBhcmFtcyl9XG5gO1xyXG4gICAgaWYgKHBhcmFtcyA9PT0gbnVsbCB8fCB0eXBlb2YgcGFyYW1zICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHBhcmFtcykubGVuZ3RoID09PSAxICYmXHJcbiAgICAgICAgdHlwZW9mIHBhcmFtcy5hZHZhbmNlZEZyYXVkU2lnbmFscyA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIEV4ZWN1dGUgb3VyIG93biBzY3JpcHQgaW5qZWN0aW9uIGFmdGVyIGEgdGljayB0byBnaXZlIHVzZXJzIHRpbWUgdG8gZG8gdGhlaXJcclxuaW1wb3J0IHsgaW5pdERvdHMsIGxvYWRTY3JpcHQgfSBmcm9tICcuL2hlbHBlcnMnO1xyXG4vLyBvd24gc2NyaXB0IGluamVjdGlvbi5cclxuY29uc3QgZG90c1Byb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IGxvYWRTY3JpcHQobnVsbCkpO1xyXG5sZXQgbG9hZENhbGxlZCA9IGZhbHNlO1xyXG5kb3RzUHJvbWlzZS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICBpZiAoIWxvYWRDYWxsZWQpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcclxuICAgIH1cclxufSk7XHJcbmV4cG9ydCBjb25zdCBsb2FkRG90cyA9IGFzeW5jICguLi5hcmdzKSA9PiB7XHJcbiAgICBsb2FkQ2FsbGVkID0gdHJ1ZTtcclxuICAgIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICByZXR1cm4gZG90c1Byb21pc2UudGhlbihhc3luYyAobWF5YmVUaWxsZWQpID0+IGF3YWl0IGluaXREb3RzKG1heWJlVGlsbGVkLCBhcmdzLCBzdGFydFRpbWUpKTtcclxufTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9