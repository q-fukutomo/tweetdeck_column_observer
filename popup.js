const triggerButton = document.getElementById('trigger');

// popup表示時
chrome.storage.local.get('executeOperation',(result) => {
    if(result.executeOperation === 'stop'){
        triggerButton.innerText = '監視停止';
        triggerButton.classList.add('stop');
    }
});

triggerButton.onclick = function(element) {
    let executeOperation;
    chrome.storage.local.get('executeOperation',(result) => {
        executeOperation = result.executeOperation;
    });
    console.log('executeOperation',executeOperation)

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {'msg': executeOperation},res => {
            switch (executeOperation) {
                case 'init':
                    if(res.status === 0){
                        triggerButton.innerText = '監視停止';
                        triggerButton.classList.add('stop');
                        chrome.storage.local.set({'executeOperation':'stop'},function(){});
                    }
                    break;
                case 'start':
                    triggerButton.innerText = '監視停止';
                    triggerButton.classList.add('stop');
                    chrome.storage.local.set({'executeOperation':'stop'},function(){});
                    break;
                case 'stop':
                    triggerButton.innerText = '監視開始';
                    triggerButton.classList.remove('stop');
                    chrome.storage.local.set({'executeOperation':'start'},function(){});
                    break;
                default:
                    break;
            }
        })
    });
};

// content側で停止押したときの処理
chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
        console.log(request);

        triggerButton.innerText = '監視開始';
        triggerButton.classList.remove('stop');
        chrome.storage.local.set({'executeOperation':'start'},function(){});

        sendResponse({status: "OK"});
        return true;
    }
);

document.querySelector('#openOptions').addEventListener("click", function() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});