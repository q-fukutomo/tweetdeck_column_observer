import './popup.css';

const triggerButton = document.querySelector('#trigger');
triggerButton.addEventListener('click', function () {
  if (triggerButton.classList.contains('stop')) return;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { msg: 'start' }, (res) => {
      if (typeof res.status === 'undefined') {
        console.log('ERROR: レスポンスに異常があります');
        return;
      }

      console.log(`${res.status}: ${res.msg}`);
      if (res.status === 'OK') {
        triggerButton.innerText = '監視中';
        triggerButton.classList.add('stop');
      }
    });
  });
});

document.querySelector('#openOptions').addEventListener('click', function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});
