chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === "install") {
    chrome.tabs.create({ url: 'https://tz-shuhag.github.io/YT-HD/' });
  }
});
