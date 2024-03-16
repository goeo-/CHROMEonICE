chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    fetch('https://iceportal.de/api1/rs/status').then(
        (res) => {res.json().then(sendResponse)}
    )
    return true;
});