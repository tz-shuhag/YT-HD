chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == "install") {
    chrome.tabs.create({
        url: 'https://tz-shuhag.github.io/youtube-auto-hd/'
    });
  } else if (details.reason == "update") {
    var version = chrome.runtime.getManifest().version;
    chrome.tabs.create({
        url: 'https://tz-shuhag.github.io/youtube-auto-hd/'
    });
  }
});
