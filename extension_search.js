utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {

    localStorage.setItem("extensionSearchQuery", "");

    function searchExtensions(string) {
        localStorage.setItem("extensionSearchQuery", string);
        var re = new RegExp(string, 'i');
        var data = utui.data.customizations;
        var extensions = {};
        if (string !== '') {
            Object.keys(data).forEach(function(id) {
                var extension = data[id];
                Object.keys(extension).forEach(function(key) {
                    var extData = extension[key];
                    if (key != '_id' && key != 'id' && key != 'labels' && key != 'scope' && key != 'scopevars' && key != 'sort' && key != 'status' && key != 'type' && key != '_ignoreError' && !key.match(/_setoption/) && key != 'settings') {
                        if (typeof extData === 'string' && extData.match(re)) {
                            extensions[extension.sort] = 1;
                        }
                    }
                });
            });
        }
        $('#customize_content .customize_container').each(function(i) {
            if (extensions[i] == 1) {
                $(this).find('h3').css('background-color', '#fad52d');
            } else {
                $(this).find('h3').css('background-color', '');
            }
        });
    }

    function setupExtensionSearch() {
        if (!$('input#extension-search').length) {
            var searchTerm = localStorage.getItem("extensionSearchQuery") || '';
            $('<div class="inputSearchContainer tmui"><input class="search" id="extension-search" value="' + searchTerm + '" type="text"></div>')
                .css('float', 'right')
                .css('z-index', '1')
                .appendTo('#tabs-customizations .config_button_nofloat');
            var keysPressed = 0;
            $('input#extension-search').bind('keydown', function() {
                var grabKeyCount = ++keysPressed;
                setTimeout(function() {
                    if (keysPressed == grabKeyCount) {
                        searchExtensions($('input#extension-search').val());
                    }
                }, 250);
            });
        } else {
            $('input#extension-search').val(searchTerm);
        }
        searchExtensions($('input#extension-search').val());
    }

    setupExtensionSearch()
})