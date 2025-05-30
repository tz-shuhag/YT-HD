(function() {
    var version                 = chrome.runtime.getManifest().version;
    var preferredQualityElement = document.getElementById('preferred-quality');

    var headerElem = document.querySelector('header .version');
    headerElem.innerText = 'v' + version;

    chrome.storage.sync.get(['preferredQuality'], function(result) { 
        if(result.preferredQuality !== undefined) {
            preferredQualityElement.value = result.preferredQuality;
        }
    });

    preferredQualityElement.onchange = function() {
        var selectedString = preferredQualityElement.options[preferredQualityElement.selectedIndex].value;

        chrome.storage.sync.set({preferredQuality: selectedString}, function() {});
    }
})();
