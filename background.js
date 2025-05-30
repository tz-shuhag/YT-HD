chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === "install" || details.reason === "update") {
    chrome.tabs.create({ url: 'https://tz-shuhag.github.io/YT-HD/' });
  }
});
