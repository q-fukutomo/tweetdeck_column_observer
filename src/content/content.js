// #########################
// config start
const defaultConfig = {
  event: 'pan_dev_test',
  nowplaying: 'pan_dev_test_なうぷれ',
  fontColor: 'FFFFFF',
  backgroundColor: '00FF00',
};
let config;

// config end
// #########################

// ページを開いた際の初期化処理
chrome.storage.local.set({ executeOperation: 'init' }, function () {});
config = loadConfig();

const observer = createObserver();
let observeTarget;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  createExtentionView();

  if (request.msg === 'init') {
    observeTarget = initObserveTarget();
    if (observeTarget) {
      // NOTE: 既に取得済みのツイートの中で最新のものを表示
      const article = observeTarget.querySelector('article');
      if (article) {
        updateExtentionView(article);
      }
      observer.observe(observeTarget, { childList: true });
      sendResponse({ status: 0, msg: 'OK' });
    } else {
      sendResponse({ status: 1, msg: 'target-column not found' });
    }
  } else if (request.msg === 'start') {
    enableExtentionView();
    observer.observe(observeTarget, { childList: true });
    sendResponse({ status: 0, msg: 'OK' });
  } else if (request.msg === 'stop') {
    disableExtentionView();
    observer.disconnect();
    sendResponse({ status: 0, msg: 'OK' });
  }

  return true;
});

function loadConfig() {
  const _config = defaultConfig;
  chrome.storage.local.get(
    ['eventTag', 'nowplayingTag', 'fontColor', 'backgroundColor'],
    (result) => {
      if (result.eventTag) _config.event = result.eventTag;
      if (result.nowplayingTag) _config.nowplaying = result.nowplayingTag;
      if (result.fontColor) _config.fontColor = result.fontColor;
      if (result.backgroundColor)
        _config.backgroundColor = result.backgroundColor;
    }
  );
  return _config;
}
function getExtentionView() {
  return document.querySelector('#extentionView');
}
function createExtentionView() {
  const _extentionView = getExtentionView();
  if (_extentionView !== null) {
    console.log('extentionView already exists');
    return _extentionView;
  }

  const extentionView = document.createElement('div');
  extentionView.id = 'extentionView';

  const extentionViewInner = document.createElement('div');
  extentionViewInner.id = 'extentionViewInner';
  extentionView.appendChild(extentionViewInner);

  const authorIcon = document.createElement('img');
  authorIcon.id = 'authorIcon';
  authorIcon.setAttribute('src', chrome.extension.getURL('img/egg.png'));
  extentionViewInner.appendChild(authorIcon);

  const author = document.createElement('p');
  author.id = 'author';
  author.innerText = '投稿者';
  extentionViewInner.appendChild(author);

  const tweetTextBox = document.createElement('p');
  tweetTextBox.id = 'tweetTextBox';
  tweetTextBox.innerText = 'ツイート本文';
  tweetTextBox.style.color = `#${config.fontColor}`;
  tweetTextBox.style.backgroundColor = `#${config.backgroundColor}`;
  extentionViewInner.appendChild(tweetTextBox);

  // extentionViewInner.appendChild(document.createElement('hr'));

  const closeButtonWrapper = document.createElement('div');
  closeButtonWrapper.id = 'closeButtonWrapper';
  extentionViewInner.appendChild(closeButtonWrapper);

  const closeButton = document.createElement('button');
  closeButton.id = 'closeButton';
  closeButton.innerText = '閉じる';
  closeButton.addEventListener('click', () => {
    disableExtentionView();
    observer.disconnect();
    chrome.runtime.sendMessage({ msg: 'close' }, (res) => {
      console.log(res);
    });
  });
  closeButtonWrapper.appendChild(closeButton);

  document.body.appendChild(extentionView);

  console.log('created extentionView');
  return extentionView;
}
function enableExtentionView() {
  const extentionView = document.querySelector('#extentionView');
  if (extentionView) {
    extentionView.setAttribute('style', 'display: block;');
    return 0;
  }
  return 1;
}
function disableExtentionView() {
  const extentionView = document.querySelector('#extentionView');
  if (extentionView) {
    extentionView.setAttribute('style', 'display: none;');
    return 0;
  }
  return 1;
}

function createObserver() {
  return new MutationObserver((mutations) => {
    mutations.forEach((mutate) => {
      if (
        mutate.addedNodes.length > 0 &&
        mutate.addedNodes[0].nodeName === 'ARTICLE'
      ) {
        updateExtentionView(mutate.addedNodes[0]);
      }
    });
  });
}
function initObserveTarget() {
  const searchBox = document.querySelector(
    `input[value=\\#${config.nowplaying}]`
  );
  if (searchBox === null) return null;

  const column = searchBox.closest('div.column-panel');

  return column.querySelector(
    'div.js-column-content div.js-column-scroller div.js-chirp-container'
  );
}

function updateExtentionView(article) {
  const extentionView = getExtentionView();
  if (extentionView === null) return 1;

  const tweetData = getTweetData(article);
  const authorIcon = document.getElementById('authorIcon');
  const author = document.getElementById('author');
  const tweetTextBox = document.getElementById('tweetTextBox');

  authorIcon.setAttribute('src', tweetData.authorIconSrc);
  author.innerText = tweetData.author;
  tweetTextBox.innerText = removeHashtag(tweetData.tweetText);

  return 0;
}
function getTweetData(article) {
  const tweetData = {
    authorIconSrc: article
      .querySelector('img.tweet-avatar')
      .getAttribute('src'),
    author: article.querySelector('span.username').innerText,
    tweetText: article.querySelector('p.tweet-text').innerText,
  };
  return tweetData;
}

// TODO: 正規表現、変数展開時のエスケープ処理とか丁寧に
function removeHashtag(tweetText) {
  let viewText = '';
  const preg = new RegExp(
    `#(${config.event}|${config.nowplaying})(\\s|$)`,
    'g'
  );

  tweetText.split('\n').forEach((line) => {
    if (!line.match(preg)) {
      viewText += `${line}\n`;
    } else {
      line = line.replace(preg, '');
      if (line.match(/\S/)) viewText += `${line}\n`;
    }
  });
  return viewText;
}
