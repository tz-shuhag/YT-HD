(function() {
    var preferredQualityElement = document.getElementById('preferred-quality');

    chrome.storage.sync.get(['preferredQuality'], function(result) { 
        if (result.preferredQuality !== undefined) {
            preferredQualityElement.value = result.preferredQuality;
        }
    });

    preferredQualityElement.onchange = function() {
        var selectedString = preferredQualityElement.options[preferredQualityElement.selectedIndex].value;
        chrome.storage.sync.set({preferredQuality: selectedString}, function() {});
    }
})();
