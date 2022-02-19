/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/background.js":
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
/***/ (() => {

eval("chrome.runtime.onInstalled.addListener(function () {\n  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {\n    chrome.declarativeContent.onPageChanged.addRules([\n      {\n        conditions: [\n          new chrome.declarativeContent.PageStateMatcher({\n            pageUrl: { hostEquals: 'tweetdeck.twitter.com' },\n          }),\n        ],\n        actions: [new chrome.declarativeContent.ShowPageAction()],\n      },\n    ]);\n  });\n});\n\n// content側で停止押したときの処理\nchrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {\n  chrome.storage.local.set({ executeOperation: 'start' }, function () {});\n  sendResponse({ status: 'OK' });\n  return true;\n});\n\n\n//# sourceURL=webpack://tweetdeck_colmuns_observer/./src/background/background.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/background/background.js"]();
/******/ 	
/******/ })()
;