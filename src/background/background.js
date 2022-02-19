chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'tweetdeck.twitter.com' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

// content側で停止押したときの処理
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.storage.local.set({ executeOperation: 'start' }, function () {});
  sendResponse({ status: 'OK' });
  return true;
});
