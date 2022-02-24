// #########################
// config start
const defaultConfig = {
  event: 'pan_dev_test',
  nowplaying: 'pan_dev_test_なうぷれ',
  fontColor: 'FFFFFF',
  backgroundColor: '00FF00',
};

// config end
// #########################

// ページを開いた際の初期化処理
const config = loadConfig();

const observer = createObserver();
createExtentionView();

let isFirst = true;
// NOTE: trueを返さないとpopup.jsが下記のエラーを吐く
// Unchecked runtime.lastError: The message port closed before a response was received.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg === 'start') {
    if (!isFirst) {
      sendResponse({ status: 'WARNING', msg: '既に監視中' });
      return true;
    }

    const observeTarget = initObserveTarget();
    if (observeTarget === null) {
      sendResponse({ status: 'ERROR', msg: '対象列の取得に失敗' });
      return true;
    }
    const article = observeTarget.querySelector('article');
    if (article) {
      updateExtentionView(article);
    }
    getExtentionView().classList.remove('standby');
    observer.observe(observeTarget, { childList: true });
    isFirst = false;
    sendResponse({ status: 'OK', msg: '監視開始' });
    return true;
  }

  sendResponse({ status: 'ERROR', msg: '不明なエラー' });
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
  const extentionView = document.createElement('div');
  extentionView.id = 'extentionView';
  extentionView.classList.add('standby');

  const extensionSwitcher = document.createElement('div');
  extensionSwitcher.id = 'extensionSwitcher';
  extensionSwitcher.addEventListener('click', () => {
    if (getExtentionView().classList.contains('hidden')) {
      getExtentionView().classList.remove('hidden');
    } else {
      getExtentionView().classList.add('hidden');
    }
  });
  extentionView.appendChild(extensionSwitcher);

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

  document.body.appendChild(extentionView);

  console.log('created extentionView');
  return extentionView;
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
  if (searchBox === null) {
    alert(
      `#${config.nowplaying}の検索をしている列が見つかりませんでした\n` +
        '検索対象のタグがあっているか、また、その列が表示されていることを確認してください'
    );
    return null;
  }

  const column = searchBox.closest('div.column-panel');

  return column.querySelector(
    'div.js-column-content div.js-column-scroller div.js-chirp-container'
  );
}

function updateExtentionView(article) {
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
