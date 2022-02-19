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

/***/ "./src/options/options.js":
/*!********************************!*\
  !*** ./src/options/options.js ***!
  \********************************/
/***/ (() => {

eval("document.querySelector('#eventTagSave').addEventListener('click', function () {\n  const eventTag = document.querySelector('#eventTag').value;\n\n  // バリデーション\n  if (eventTag.match(/^#/)) {\n    alert('先頭の#は不要です');\n    return;\n  }\n\n  chrome.storage.local.set({ eventTag }, function () {\n    alert(`イベントタグに \"${eventTag}\" を設定しました`);\n  });\n});\ndocument.querySelector('#eventTagCheck').addEventListener('click', function () {\n  chrome.storage.local.get('eventTag', (result) => {\n    alert(`現在のイベントタグは \"${result.eventTag}\" です`);\n  });\n});\n\ndocument\n  .querySelector('#nowplayingTagSave')\n  .addEventListener('click', function () {\n    const nowplayingTag = document.querySelector('#nowplayingTag').value;\n\n    // バリデーション\n    if (nowplayingTag.match(/^#/)) {\n      alert('先頭の#は不要です');\n      return;\n    }\n\n    chrome.storage.local.set({ nowplayingTag }, function () {\n      alert(`なうぷれタグに \"${nowplayingTag}\" を設定しました`);\n    });\n  });\ndocument\n  .querySelector('#nowplayingTagCheck')\n  .addEventListener('click', function () {\n    chrome.storage.local.get('nowplayingTag', (result) => {\n      alert(`現在のなうぷれタグは \"${result.nowplayingTag}\" です`);\n    });\n  });\n\ndocument.querySelector('#fontColorSave').addEventListener('click', function () {\n  const fontColor = document.querySelector('#fontColor').value;\n\n  // バリデーション\n  if (!fontColor.match(/^[0-9a-fA-F]{6}$/)) {\n    alert('6桁の16進表記で入力してください');\n    return;\n  }\n\n  chrome.storage.local.set({ fontColor }, function () {\n    alert(`文字色に \"${fontColor}\" を設定しました`);\n  });\n});\ndocument\n  .querySelector('#fontColorCheck')\n  .addEventListener('click', function () {\n    chrome.storage.local.get('fontColor', (result) => {\n      alert(`現在の文字色は \"${result.fontColor}\" です`);\n    });\n  });\n\ndocument\n  .querySelector('#backgroundColorSave')\n  .addEventListener('click', function () {\n    const backgroundColor = document.querySelector('#backgroundColor').value;\n\n    // バリデーション\n    if (!backgroundColor.match(/^[0-9a-fA-F]{6}$/)) {\n      alert('6桁の16進表記で入力してください');\n      return;\n    }\n\n    chrome.storage.local.set({ backgroundColor }, function () {\n      alert(`背景色に \"${backgroundColor}\" を設定しました`);\n    });\n  });\ndocument\n  .querySelector('#backgroundColorCheck')\n  .addEventListener('click', function () {\n    chrome.storage.local.get('backgroundColor', (result) => {\n      alert(`現在の背景色は \"${result.backgroundColor}\" です`);\n    });\n  });\n\nconst configKey = ['eventTag', 'nowplayingTag', 'fontColor', 'backgroundColor'];\ndocument.querySelector('#allReset').addEventListener('click', function () {\n  chrome.storage.local.remove(configKey, (result) => {\n    alert('すべての設定をリセットしました');\n  });\n});\n\n\n//# sourceURL=webpack://tweetdeck_colmuns_observer/./src/options/options.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/options/options.js"]();
/******/ 	
/******/ })()
;