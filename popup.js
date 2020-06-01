const triggerButton = document.getElementById('trigger');
let state = 0;

triggerButton.onclick = function(element) {
    let operation;
    switch (state) {
        case 0:
            operation = 'init';
            break;
        case 1:
            operation = 'start';
            break;
        case 2:
            operation = 'stop';
            break;
        default:
            break;
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {msg: operation},res => {
            switch (state) {
                case 0:
                    if(res.status === 0){
                        triggerButton.innerText = '監視停止';
                        triggerButton.classList.add('stop');
                        state = 2;
                    }
                    break;
                case 1:
                    triggerButton.innerText = '監視停止';
                    triggerButton.classList.add('stop');
                    state = 2;
                    break;
                case 2:
                    triggerButton.innerText = '監視開始';
                    triggerButton.classList.remove('stop');
                    state = 1;
                    break;
                default:
                    break;
            }
        })
    });
};

// content側で停止押したときの処理
// chrome.runtime.onMessage.addListener(
//     function(request,sender,sendResponse){
//         const tweetData = request.tweetData;
//         authorIcon.setAttribute('src', tweetData.authorIconSrc);
//         author.innerText = tweetData.author;
//         tweetTextBox.innerText = tweetData.tweetText;
//         sendResponse({status: "OK"});
//         return true;
//     }
// );
