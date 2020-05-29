const startButton = document.getElementById('start');
startButton.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {msg: 'start'},res => {startButton.innerText='監視中'})
    });
};

const authorIcon = document.getElementById('authorIcon');
const tweetTextBox = document.getElementById('tweetTextBox');
chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
        const tweetData = request.tweetData;
        authorIcon.setAttribute('src', tweetData.authorIconSrc);
        author.innerText = tweetData.author;
        tweetTextBox.innerText = tweetData.tweetText;
        sendResponse({status: "OK"});
        return true;
    }
);


