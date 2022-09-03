chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
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
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.storage.local.set({ executeOperation: 'start' }, () => {});
  sendResponse({ status: 'OK' });
  return true;
});
