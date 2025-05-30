(function () {
    // Wait for the page to trigger "yt-navigate-finish" event
    document.addEventListener('yt-navigate-finish', function () {
        if (location.pathname === '/watch') {
            runObserverIfExtensionEnabled();
        }
    });

    function runObserverIfExtensionEnabled() {
        chrome.storage.sync.get(['extensionEnabled'], function(result) {
            if(result.extensionEnabled === false) {
                console.log('Youtube Auto HD Extension Disabled.');
            } else {
                console.log('Youtube Auto HD Extension Enabled. Initiating observer.');
                initiateObserverAndObserve();
            }
        });
    }

    var config = { childList: true, attributes: true, subtree: true, characterData: true };

    var qualitiesArray = [
        '4320p', '4320p60', '4320p50', '4320p48',
        '2160p', '2160p60', '2160p50', '2160p48',
        '1440p', '1440p60', '1440p50', '1440p48',
        '1080p', '1080p60', '1080p50', '1080p48',
        '720p', '720p60', '720p50', '720p48',
        '480p', '360p', '240p', '144p', 'Auto'
    ];

    var qualityTitles = [
        'Gehalte','Keyfiyyət','Kualitas','Kualiti','Kvalitet','Qualitat','Kvalita','Qualität','Kvaliteet','Quality',
        'Calidad','Kalitatea','Kalidad','Qualité','Calidade','Kvaliteta','Ikhwalithi','Gæði','Ubora','Kvalitāte',
        'Kokybė','Minőség','Kwaliteit','Sifati','Qualidade','Calitate','Cilësia','Kakovost','Laatu','Chất lượng',
        'Kalite','Якасць','Сапаты','Квалитет','Качество','Якість','Ποιότητα','Որակ','איכות','معیار','الجودة',
        'کیفیت','गुण','गुणवत्ता','क्वालिटी','গুণাগুণ','গুণমান','ਗੁਣਵੱਤਾ','ક્વૉલિટી','ଗୁଣବତ୍ତା','தரம்',
        'క్వాలిటీ','ಗುಣಮಟ್ಟ','നിലവാരം','ගුණත්වය','คุณภาพ','ຄຸນນະພາບ','အရည်အသွေး','ხარისხი','ጥራት',
        'គុណភាព​','画质','畫質','画質','화질'
    ];

    function initiateObserverAndObserve() {
        var observer = new MutationObserver(function () {
            if (!document.contains(document.querySelector('.ytp-settings-button'))) {
                return;
            }
            observer.disconnect();

            setTimeout(() => {
                selectPreferredQuality();
            }, 100);
        });

        observer.observe(document.body, config);
    }

    function selectPreferredQuality() {
        chrome.storage.sync.get(['preferredQuality'], function (result) {
            updateQuality(result.preferredQuality);
        });
    }

    function updateQuality(preferredQuality) {
        if (preferredQuality === undefined) {
            preferredQuality = 'best-available';
            chrome.storage.sync.set({ preferredQuality: preferredQuality });
        }

        var settingsButton = document.getElementsByClassName('ytp-settings-button')[0];
        settingsButton.click();

        var buttons = document.getElementsByClassName('ytp-menuitem-label');
        for (var i = 0; i < buttons.length; i++) {
            if (qualityTitles.includes(buttons[i].innerHTML)) {
                buttons[i].click();
            }
        }

        var targetItems = Array.from(document.querySelectorAll('.ytp-quality-menu .ytp-menuitem-label'))
            .filter(item => !item.innerHTML.includes("ytp-premium-label"));

        var targetItem;
        if (preferredQuality === 'best-available') {
            targetItem = targetItems[0];
        } else {
            targetItem = findTargetItem(preferredQuality, targetItems);
        }

        if (targetItem) targetItem.click();
    }

    function findTargetItem(preferredQuality, targetItems) {
        var targetItem = null;
        for (var i = 0; i < targetItems.length; i++) {
            var quality = targetItems[i].childNodes[0]?.childNodes[0]?.innerHTML?.split(' ')[0];
            if (quality === preferredQuality) {
                targetItem = targetItems[i].childNodes[0].childNodes[0];
                break;
            }
        }

        var key = qualitiesArray.indexOf(preferredQuality);
        if (!targetItem && qualitiesArray[key + 1]) {
            return findTargetItem(qualitiesArray[key + 1], targetItems);
        }

        return targetItem;
    }

    chrome.storage.onChanged.addListener(function (changes) {
        if (changes.preferredQuality) {
            selectPreferredQuality();
        }
    });
})();
