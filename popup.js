const triggerButton = document.getElementById('trigger');

// popup表示時
chrome.storage.local.get('executeOperation',(result) => {
    if(result.executeOperation === 'stop'){
        triggerButton.innerText = '監視停止';
        triggerButton.classList.add('stop');
    }else if(result.executeOperation === 'start'){
        triggerButton.innerText = '監視開始';
        triggerButton.classList.add('start');
    }
});

triggerButton.onclick = function(element) {
    let executeOperation;
    chrome.storage.local.get('executeOperation',(result) => {
        executeOperation = result.executeOperation;
        if(!executeOperation) executeOperation = 'init';
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

document.querySelector('#openOptions').addEventListener("click", function() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});