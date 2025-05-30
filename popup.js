(function() {
    var version                 = chrome.runtime.getManifest().version;
    var extensionStatusElement  = document.getElementById('extension-status');
    var extensionEnabledElement = document.getElementById('extension-enabled');
    var preferredQualityElement = document.getElementById('preferred-quality');
    var wrapperElement          = document.getElementsByClassName('wrapper')[0];

    function disableElements() {
        wrapperElement.classList.add('wrapper-enabled');
        document.body.style.backgroundColor = 'grey';
        extensionStatusElement.innerText = 'Extension Disabled';
    }

    chrome.storage.sync.get(['extensionEnabled'], function(result) { 
        if(result.extensionEnabled !== undefined && result.extensionEnabled === false) {
            extensionEnabledElement.checked = false; 
            disableElements();
        } else {

        }
    });

    chrome.storage.sync.get(['preferredQuality'], function(result) { 
        if(result.preferredQuality !== undefined) {
            preferredQualityElement.value = result.preferredQuality;
        }
    });

    preferredQualityElement.onchange = function() {
        var selectedString = preferredQualityElement.options[preferredQualityElement.selectedIndex].value;
        chrome.storage.sync.set({preferredQuality: selectedString}, function() {});
    };

    var setExtensionEnabledBoolean = function(extensionEnabled) {
        chrome.storage.sync.set({extensionEnabled: extensionEnabled}, function() {});
    };
})();
