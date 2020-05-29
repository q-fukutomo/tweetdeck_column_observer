chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
        if(request.msg === 'start'){
            const searchBox = document.querySelector('input[value=\\#pan_dev_test]');
            const column = searchBox.closest('div.column-panel');
            
            const observeTarget = column.querySelector('div.js-column-content div.js-column-scroller div.js-chirp-container');
            const observer = new MutationObserver(records => {
                records.forEach(record => {
                    Array.from(record.addedNodes).forEach(newArticle => getTweetData(newArticle))
                });
            });
            observer.observe(observeTarget, {childList: true});
            sendResponse({msg: "observing start."});
        }else{
            sendResponse({msg: "error."});
        }
        return true;
    }
);

function getTweetData(article){
    const tweetData = {
        authorIconSrc: article.querySelector('img.tweet-avatar').getAttribute('src'),
        author: article.querySelector('span.username').innerText,
        tweetText: article.querySelector('p.tweet-text').innerText
    };

    popupUpdate(tweetData);
}

function popupUpdate(tweetData){
    chrome.runtime.sendMessage(
        {tweetData: tweetData}, res => console.log(res.status)
    );
}