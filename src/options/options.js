document.querySelector('#eventTagSave').addEventListener('click', function () {
  const eventTag = document.querySelector('#eventTag').value;

  // バリデーション
  if (eventTag.match(/^#/)) {
    alert('先頭の#は不要です');
    return;
  }

  chrome.storage.local.set({ eventTag }, function () {
    alert(`イベントタグに "${eventTag}" を設定しました`);
  });
});
document.querySelector('#eventTagCheck').addEventListener('click', function () {
  chrome.storage.local.get('eventTag', (result) => {
    alert(`現在のイベントタグは "${result.eventTag}" です`);
  });
});

document
  .querySelector('#nowplayingTagSave')
  .addEventListener('click', function () {
    const nowplayingTag = document.querySelector('#nowplayingTag').value;

    // バリデーション
    if (nowplayingTag.match(/^#/)) {
      alert('先頭の#は不要です');
      return;
    }

    chrome.storage.local.set({ nowplayingTag }, function () {
      alert(`なうぷれタグに "${nowplayingTag}" を設定しました`);
    });
  });
document
  .querySelector('#nowplayingTagCheck')
  .addEventListener('click', function () {
    chrome.storage.local.get('nowplayingTag', (result) => {
      alert(`現在のなうぷれタグは "${result.nowplayingTag}" です`);
    });
  });

document.querySelector('#fontColorSave').addEventListener('click', function () {
  const fontColor = document.querySelector('#fontColor').value;

  // バリデーション
  if (!fontColor.match(/^[0-9a-fA-F]{6}$/)) {
    alert('6桁の16進表記で入力してください');
    return;
  }

  chrome.storage.local.set({ fontColor }, function () {
    alert(`文字色に "${fontColor}" を設定しました`);
  });
});
document
  .querySelector('#fontColorCheck')
  .addEventListener('click', function () {
    chrome.storage.local.get('fontColor', (result) => {
      alert(`現在の文字色は "${result.fontColor}" です`);
    });
  });

document
  .querySelector('#backgroundColorSave')
  .addEventListener('click', function () {
    const backgroundColor = document.querySelector('#backgroundColor').value;

    // バリデーション
    if (!backgroundColor.match(/^[0-9a-fA-F]{6}$/)) {
      alert('6桁の16進表記で入力してください');
      return;
    }

    chrome.storage.local.set({ backgroundColor }, function () {
      alert(`背景色に "${backgroundColor}" を設定しました`);
    });
  });
document
  .querySelector('#backgroundColorCheck')
  .addEventListener('click', function () {
    chrome.storage.local.get('backgroundColor', (result) => {
      alert(`現在の背景色は "${result.backgroundColor}" です`);
    });
  });

const configKey = ['eventTag', 'nowplayingTag', 'fontColor', 'backgroundColor'];
document.querySelector('#allReset').addEventListener('click', function () {
  chrome.storage.local.remove(configKey, (result) => {
    alert('すべての設定をリセットしました');
  });
});
