utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
    var hideTMButtons = 0;
    //Create empty CSS style
    $('<style id="tmuiStyleSheet"></style>').appendTo('head');
    //Create the show hide button
    $('<span id="showHideTMButtons" title="Show/Hide TM Buttons">Show/Hide TM Buttons</span>')
        .insertAfter('#app_header')
        .css('cursor', 'pointer')
        .css('margin-left', '50px')
        .css('position', 'fixed')
        .css('top', '5px')
        .css('color', 'rgb(4, 127, 195)')
        .css('font-size', 'larger')
        .css('z-index', '500')
        .click(function() {
            hideTMButtons = hideTMButtons ? 0 : 1;
            if (hideTMButtons == 1) {
                // $('#tmuiStyleSheet').html('.tmui{display:none !important;}');
                $('.tmui').hide();
                $('.tmui-color').css('color', '#FFFFFF');
                $('#globalMessageButton').css('cursor', 'default').css('color', 'rgb(4, 127, 195)').addClass('tmui-color');
                __getGlobalMessageAllow = 'false';
                console.log('Tampermonkey Buttons Are Currently Hidden');
                // if (features.removeAlias.enabled) {
                //     restoreAlias();
                // }
            } else {
                $('.tmui').show();
                $('.tmui-color').css('color', '#C71585');
                $('#globalMessageButton').css('cursor', 'pointer').css('color', '#C71585').addClass('tmui-color');
                __getGlobalMessageAllow = 'true';
                console.log('Tampermonkey Buttons Are Currently Visible');
                // if (features.removeAlias.enabled) {
                //     hideAlias();
                // }
            }
        });

})