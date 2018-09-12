var keepTrying = function(test, callback, sleep, maxAttempts) {
    if (typeof(sleep) == 'undefined') {
        sleep = 100;
    }
    var totalAttempts = 0;
    var args = Array.prototype.slice.call(arguments, 2);
    var incrementAttempts = function() {
        totalAttempts++;
        if (typeof maxAttempts !== 'undefined') {
            if (totalAttempts > maxAttempts) {
                clearInterval(timer);
                console.log('Reached maximum number of attempts.  Going to stop checking.')
            }
        }
    }
    var timer = setInterval(function() {
        try {
            if (test.apply(null, args)) {
                clearInterval(timer);
                // console.log('done trying: '+test);
                callback();
            } else {
                // console.log('tried: '+test);
                incrementAttempts();
            }
        } catch (e) {
            console.log('Failure in check: ' + e);
            incrementAttempts();
        }
    }, sleep);
}
var when = function(test, run, sleep, maxAttempts) {
    var args = Array.prototype.slice.call(arguments, 2);
    keepTrying(test, function() {
        run.apply(null, args);
    },
    sleep, maxAttempts);
}

    function sendToTopBottomListener() {
        //Let's first remove the listener before adding a new one.
        $('.label_select_checkbox').off('click');
        $('.label_select_checkbox').on('click', function() {
            var tab = $(this).closest('div[id^="tabs-"]').attr('id');
            // console.log('Clicked the checkbox in tab: '+tab);
            if ($('#' + tab).find('.label_select_checkbox:checked').length) {
                // console.log('Must have something checked');
                //Only add the buttons if they don't exist already
                if (!$('#' + tab + ' #sendToTop').length) {
                    $('<div class="tab-menu-item"><button id="sendToTop" class="btn btn-success tmui" style="margin-top:0;"><i class="icon-arrow-up"></i> Send to Top</button></div>')
                        .prependTo('#' + tab + ' div[id$="_headerControls"]');
                    $('<div class="tab-menu-item"><button id="sendToBottom" class="btn btn-success tmui" style="margin-top:0;"><i class="icon-arrow-down"></i> Send to Bottom</button></div>')
                        .prependTo('#' + tab + ' div[id$="_headerControls"]');
                    //Add click handlers
                    $('#' + tab + ' #sendToTop').click(function() {
                        sendToTop(tab);
                    });
                    $('#' + tab + ' #sendToBottom').click(function() {
                        sendToBottom(tab);
                    });
                }
                // if (features.fixExtensionConditions.enabled) {
                // fixExtensionConditionsListener();
                // }
            } else {
                // console.log('Nothing checked.');
                $('#' + tab + ' #sendToTop,#' + tab + ' #sendToBottom').parent().remove();
            }
        });
    }

    function sendToBottom(tab) {
        // console.log('going to send to bottom');
        var elements = getCheckedElements(tab);
        for (var i = 0; i < elements.length; i++) {
            $(elements[i]).appendTo('#' + tab + ' div[id$="_content"]');
        }
        redrawUI(tab);
    }

    function sendToTop(tab) {
        // console.log('going to send to top');
        var elements = [];
        getCheckedElements(tab).each(function() {
            elements.push(this);
        });
        elements = elements.reverse();
        for (var i = 0; i < elements.length; i++) {
            $(elements[i]).prependTo('#' + tab + ' div[id$="_content"]');
        }
        if (tab === 'tabs-loadrules') {
            //Need to make sure that All Pages stays on top
            $('div[data-id="all"]').prependTo('#' + tab + ' div[id$="_content"]');
        }
        redrawUI(tab);
    }

    function getCheckedElements(tab) {
        if (tab === 'tabs-customizations') {
            return $('#' + tab).find('.label_select_checkbox:checked').closest('.customize_container');
        } else {
            return $('#' + tab).find('.label_select_checkbox:checked').closest('div[id*="_content_"]');
        }
    }

    function redrawUI(tab) {
        switch (tab) {
            case "tabs-loadrules":
                utui.loadrules.view.updateAccordion();
                break;
            case "tabs-manage":
                utui.manage.updateAccordion();
                break;
            case "tabs-customizations":
                utui.customizations.drawJUIAccordion();
                break;
            default:
        }
        //Show the Save/Publish button
        utui.profile.toggleUnsavedChangesBtn();
    }

    utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function(e) {
        utui.util.pubsub.subscribe(utui.constants.views.TAB_CLICK, function(e) {
            switch (e.screen_name.toLowerCase()) {
                case 'loadrules':
                    when(function() {
                        return $('#tabs_content .ui-state-active #tabs_loadrules').length;
                    }, function() {
                        sendToTopBottomListener();
                    });
                    break;
                case 'tags':
                    when(function() {
                        return $('#tabs_content .ui-state-active #tabs_manage').length;
                    }, function() {
                        sendToTopBottomListener();
                    });
                    break;
                case 'extensions':
                    when(function() {
                        return $('#tabs_content .ui-state-active #tabs_customizations').length;
                    }, function() {
                        sendToTopBottomListener();
                        // if (features.fixExtensionConditions.enabled) {
                        //     fixExtensionConditionsListener();
                        // }
                    });
                    break;
            }
        });
    });