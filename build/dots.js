(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof exports === 'object') exports['dotsjs'] = factory();
  else root['dotsjs'] = factory();
})(self, () => {
  return /******/ (() => {
    // webpackBootstrap
    /******/ 'use strict';
    /******/ var __webpack_modules__ = {
      /***/ './src/helpers.ts':
        /*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ findScript: () => /* binding */ findScript,
            /* harmony export */ initDots: () => /* binding */ initDots,
            /* harmony export */ loadScript: () => /* binding */ loadScript,
            /* harmony export */ validateLoadParams: () =>
              /* binding */ validateLoadParams,
            /* harmony export */
          });
          const V2_URL = 'https://js.tilled.com/v2';
          const id = 'dots-js-script';
          const EXISTING_SCRIPT_MESSAGE =
            'loadStripe.setLoadParameters was called but an existing Dots.js script already exists in the document; existing script parameters will be used';
          const dotsServerUrl = {
            sandbox: 'https://api.dots.dev/api',
            production: 'https://api.senddotssanbox.com/api',
            development: 'http://localhost:8080/api',
          };
          const findScript = () => {
            const scripts = document.querySelectorAll(
              `script[src^="${V2_URL}"]`
            );
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
              throw new Error(
                'Expected document.body not to be null. Dots.js requires a <body> element.'
              );
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
                } else if (!script) {
                  script = injectScript(params);
                }
                script.addEventListener('load', () => {
                  if (window.Tilled) {
                    resolve(window.Tilled);
                  } else {
                    reject(new Error('Dots.js not available'));
                  }
                });
                script.addEventListener('error', () => {
                  reject(new Error('Failed to load Dots.js'));
                });
              } catch (error) {
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
            const resposne = await fetch(
              dotsServerUrl[args[1]] + '/tilled-public-account-information',
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Basic ' + btoa(args[0] + ':'),
                },
              }
            );
            const { public_key: publicKey, account_id: accountId } =
              await resposne.json();
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
            if (
              Object.keys(params).length === 1 &&
              typeof params.advancedFraudSignals === 'boolean'
            ) {
              return params;
            }
            throw new Error(errorMessage);
          };

          /***/
        },

      /******/
    };
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
      /******/ // Check if module is in cache
      /******/ var cachedModule = __webpack_module_cache__[moduleId];
      /******/ if (cachedModule !== undefined) {
        /******/ return cachedModule.exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/ var module = (__webpack_module_cache__[moduleId] = {
        /******/ // no module.id needed
        /******/ // no module.loaded needed
        /******/ exports: {},
        /******/
      });
      /******/
      /******/ // Execute the module function
      /******/ __webpack_modules__[moduleId](
        module,
        module.exports,
        __webpack_require__
      );
      /******/
      /******/ // Return the exports of the module
      /******/ return module.exports;
      /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/define property getters */
    /******/ (() => {
      /******/ // define getter functions for harmony exports
      /******/ __webpack_require__.d = (exports, definition) => {
        /******/ for (var key in definition) {
          /******/ if (
            __webpack_require__.o(definition, key) &&
            !__webpack_require__.o(exports, key)
          ) {
            /******/ Object.defineProperty(exports, key, {
              enumerable: true,
              get: definition[key],
            });
            /******/
          }
          /******/
        }
        /******/
      };
      /******/
    })();
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/ (() => {
      /******/ __webpack_require__.o = (obj, prop) =>
        Object.prototype.hasOwnProperty.call(obj, prop);
      /******/
    })();
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/ (() => {
      /******/ // define __esModule on exports
      /******/ __webpack_require__.r = (exports) => {
        /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/ Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module',
          });
          /******/
        }
        /******/ Object.defineProperty(exports, '__esModule', { value: true });
        /******/
      };
      /******/
    })();
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
        /* harmony export */ loadDots: () => /* binding */ loadDots,
        /* harmony export */
      });
      /* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(/*! ./helpers */ './src/helpers.ts');
      // Execute our own script injection after a tick to give users time to do their

      // own script injection.
      const dotsPromise = Promise.resolve().then(() =>
        (0, _helpers__WEBPACK_IMPORTED_MODULE_0__.loadScript)(null)
      );
      let loadCalled = false;
      dotsPromise.catch((err) => {
        if (!loadCalled) {
          console.warn(err);
        }
      });
      const loadDots = async (...args) => {
        loadCalled = true;
        const startTime = Date.now();
        return dotsPromise.then(
          async (maybeTilled) =>
            await (0, _helpers__WEBPACK_IMPORTED_MODULE_0__.initDots)(
              maybeTilled,
              args,
              startTime
            )
        );
      };
    })();

    /******/ return __webpack_exports__;
    /******/
  })();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG90cy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0Esd0lBQXdJO0FBQ3hJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLDhEQUE4RCxPQUFPO0FBQ3JFLG9CQUFvQixvQkFBb0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwrQ0FBK0M7QUFDN0U7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxZQUFZLCtDQUErQztBQUMzRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLG1EQUFtRDs7QUFFbkQsS0FBSzs7QUFFTDs7QUFFQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN0SEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ2lEO0FBQ2pEO0FBQ0EsaURBQWlELG9EQUFVO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ007QUFDUDtBQUNBO0FBQ0EseURBQXlELGtEQUFRO0FBQ2pFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZG90c2pzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9kb3RzanMvLi9zcmMvaGVscGVycy50cyIsIndlYnBhY2s6Ly9kb3RzanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZG90c2pzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kb3RzanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kb3RzanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kb3RzanMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZG90c2pzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImRvdHNqc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCJjb25zdCBWMl9VUkwgPSAnaHR0cHM6Ly9qcy50aWxsZWQuY29tL3YyJztcbmNvbnN0IGlkID0gJ2RvdHMtanMtc2NyaXB0JztcbmNvbnN0IEVYSVNUSU5HX1NDUklQVF9NRVNTQUdFID0gJ2xvYWRTdHJpcGUuc2V0TG9hZFBhcmFtZXRlcnMgd2FzIGNhbGxlZCBidXQgYW4gZXhpc3RpbmcgRG90cy5qcyBzY3JpcHQgYWxyZWFkeSBleGlzdHMgaW4gdGhlIGRvY3VtZW50OyBleGlzdGluZyBzY3JpcHQgcGFyYW1ldGVycyB3aWxsIGJlIHVzZWQnO1xuY29uc3QgZG90c1NlcnZlclVybCA9IHtcbiAgICBzYW5kYm94OiAnaHR0cHM6Ly9hcGkuZG90cy5kZXYvYXBpJyxcbiAgICBwcm9kdWN0aW9uOiAnaHR0cHM6Ly9hcGkuc2VuZGRvdHNzYW5ib3guY29tL2FwaScsXG4gICAgZGV2ZWxvcG1lbnQ6ICdodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpJyxcbn07XG5leHBvcnQgY29uc3QgZmluZFNjcmlwdCA9ICgpID0+IHtcbiAgICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgc2NyaXB0W3NyY149XCIke1YyX1VSTH1cIl1gKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gc2NyaXB0c1tpXTtcbiAgICAgICAgcmV0dXJuIHNjcmlwdDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuY29uc3QgaW5qZWN0U2NyaXB0ID0gKHBhcmFtcykgPT4ge1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC5zcmMgPSBWMl9VUkw7XG4gICAgc2NyaXB0LmlkID0gaWQ7XG4gICAgY29uc3QgaGVhZE9yQm9keSA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuYm9keTtcbiAgICBpZiAoIWhlYWRPckJvZHkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBkb2N1bWVudC5ib2R5IG5vdCB0byBiZSBudWxsLiBEb3RzLmpzIHJlcXVpcmVzIGEgPGJvZHk+IGVsZW1lbnQuJyk7XG4gICAgfVxuICAgIGhlYWRPckJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICByZXR1cm4gc2NyaXB0O1xufTtcbmNvbnN0IHJlZ2lzdGVyV3JhcHBlciA9IChkb3RzLCBzdGFydFRpbWUpID0+IHtcbiAgICBpZiAoIWRvdHMgfHwgIWRvdHMuX3JlZ2lzdGVyV3JhcHBlcikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vZG90cy5fcmVnaXN0ZXJXcmFwcGVyKHsgbmFtZTogJ2RvdHMtanMnLCB2ZXJzaW9uOiBfVkVSU0lPTiwgc3RhcnRUaW1lIH0pO1xufTtcbmxldCBkb3RzUHJvbWlzZSA9IG51bGw7XG5sZXQgdGlsbGVkUHJvbWlzZSA9IG51bGw7XG5leHBvcnQgY29uc3QgbG9hZFNjcmlwdCA9IChwYXJhbXMpID0+IHtcbiAgICAvLyBFbnN1cmUgdGhhdCB3ZSBvbmx5IGF0dGVtcHQgdG8gbG9hZCBUaWxsZWQuanMgYXQgbW9zdCBvbmNlXG4gICAgaWYgKHRpbGxlZFByb21pc2UgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRpbGxlZFByb21pc2U7XG4gICAgfVxuICAgIHRpbGxlZFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gUmVzb2x2ZSB0byBudWxsIHdoZW4gaW1wb3J0ZWQgc2VydmVyIHNpZGUuIFRoaXMgbWFrZXMgdGhlIG1vZHVsZVxuICAgICAgICAgICAgLy8gc2FmZSB0byBpbXBvcnQgaW4gYW4gaXNvbW9ycGhpYyBjb2RlIGJhc2UuXG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuVGlsbGVkICYmIHBhcmFtcykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKEVYSVNUSU5HX1NDUklQVF9NRVNTQUdFKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LlRpbGxlZCkge1xuICAgICAgICAgICAgcmVzb2x2ZSh3aW5kb3cuVGlsbGVkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IGZpbmRTY3JpcHQoKTtcbiAgICAgICAgICAgIGlmIChzY3JpcHQgJiYgcGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKEVYSVNUSU5HX1NDUklQVF9NRVNTQUdFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFzY3JpcHQpIHtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBpbmplY3RTY3JpcHQocGFyYW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuVGlsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUod2luZG93LlRpbGxlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdEb3RzLmpzIG5vdCBhdmFpbGFibGUnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgRG90cy5qcycpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aWxsZWRQcm9taXNlO1xufTtcbmV4cG9ydCBjb25zdCBpbml0RG90cyA9IGFzeW5jIChtYXliZVRpbGxlZCwgYXJncywgc3RhcnRUaW1lKSA9PiB7XG4gICAgaWYgKG1heWJlVGlsbGVkID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCByZXNwb3NuZSA9IGF3YWl0IGZldGNoKGRvdHNTZXJ2ZXJVcmxbYXJnc1sxXV0gKyAnL3YyL3BheW1lbnRzL3B1YmxpYy1hY2NvdW50LWluZm9ybWF0aW9uJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmFzaWMgJyArIGJ0b2EoYXJnc1swXSArICc6JylcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHsgcHVibGljX2tleTogcHVibGljS2V5LCBhY2NvdW50X2lkOiBhY2NvdW50SWQgfSA9IGF3YWl0IHJlc3Bvc25lLmpzb24oKTtcbiAgICBjb25zdCBkb3RzID0gbmV3IG1heWJlVGlsbGVkKHB1YmxpY0tleSwgYWNjb3VudElkLCB7XG4gICAgICAgIHNhbmRib3g6IGFyZ3NbMV0gPT09ICdzYW5kYm94JyB8fCBhcmdzWzFdID09PSAnZGV2ZWxvcG1lbnQnLFxuICAgICAgICBsb2dfbGV2ZWw6IDAsXG4gICAgfSk7XG4gICAgcmVnaXN0ZXJXcmFwcGVyKGRvdHMsIHN0YXJ0VGltZSk7XG4gICAgcmV0dXJuIGRvdHM7XG59O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUxvYWRQYXJhbXMgPSAocGFyYW1zKSA9PiB7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYGludmFsaWQgbG9hZCBwYXJhbWV0ZXJzOyBleHBlY3RlZCBvYmplY3Qgb2Ygc2hhcGVcblxuICAgIHthZHZhbmNlZEZyYXVkU2lnbmFsczogYm9vbGVhbn1cblxuYnV0IHJlY2VpdmVkXG5cbiAgICAke0pTT04uc3RyaW5naWZ5KHBhcmFtcyl9XG5gO1xuICAgIGlmIChwYXJhbXMgPT09IG51bGwgfHwgdHlwZW9mIHBhcmFtcyAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgfVxuICAgIGlmIChPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICB0eXBlb2YgcGFyYW1zLmFkdmFuY2VkRnJhdWRTaWduYWxzID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBFeGVjdXRlIG91ciBvd24gc2NyaXB0IGluamVjdGlvbiBhZnRlciBhIHRpY2sgdG8gZ2l2ZSB1c2VycyB0aW1lIHRvIGRvIHRoZWlyXG5pbXBvcnQgeyBpbml0RG90cywgbG9hZFNjcmlwdCB9IGZyb20gJy4vaGVscGVycyc7XG4vLyBvd24gc2NyaXB0IGluamVjdGlvbi5cbmNvbnN0IGRvdHNQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiBsb2FkU2NyaXB0KG51bGwpKTtcbmxldCBsb2FkQ2FsbGVkID0gZmFsc2U7XG5kb3RzUHJvbWlzZS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgaWYgKCFsb2FkQ2FsbGVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihlcnIpO1xuICAgIH1cbn0pO1xuZXhwb3J0IGNvbnN0IGxvYWREb3RzID0gYXN5bmMgKC4uLmFyZ3MpID0+IHtcbiAgICBsb2FkQ2FsbGVkID0gdHJ1ZTtcbiAgICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBkb3RzUHJvbWlzZS50aGVuKGFzeW5jIChtYXliZVRpbGxlZCkgPT4gYXdhaXQgaW5pdERvdHMobWF5YmVUaWxsZWQsIGFyZ3MsIHN0YXJ0VGltZSkpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
