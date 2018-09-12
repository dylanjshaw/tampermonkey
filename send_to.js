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
         $('.label_select_checkbox').off('click').on('click', function(e) {
            e.stopPropagation();
            var tab = $(this).closest('div[id^="tabs-"]').attr('id');
            if($('#' + tab).find('.label_select_checkbox:checked').length > 0){
                if($('#' + tab).find('#sendToTop').length == 0){
                    $('<div class="tab-menu-item"><button id="sendToTop" class="btn btn-success tmui" style="margin-top:0;"><i class="icon-arrow-up"></i> Send to Top</button></div>').click(function(){sendToTop(tab)}).prependTo('#' + tab + ' div[id$="_headerControls"]');
                    $('<div class="tab-menu-item"><button id="sendToBottom" class="btn btn-success tmui" style="margin-top:0;"><i class="icon-arrow-down"></i> Send to Bottom</button></div>').click(function(){sendToBottom(tab)}).prependTo('#' + tab + ' div[id$="_headerControls"]');   
                    $(this).prop('checked','checked')
                }
            } else {$('#' + tab + ' #sendToTop,#' + tab + ' #sendToBottom').parent().remove();}
        })
    }

    function sendToBottom(tab) {
        // console.log('going to send to bottom');
        var elements = getCheckedElements(tab);
        for (var i = 0; i < elements.length; i++) {
            $(elements[i]).detach().appendTo('#' + tab + ' div[id$="_content"]');
            // $('#' + tab + ' div[id$="_content"]').remove()append(elements[i])
        }
        $('#' + tab).find('.label_select_checkbox:checked').prop('checked', false);
        $('#' + tab + ' #sendToTop,#' + tab + ' #sendToBottom').parent().remove();
        when(function(){
            return $('#' + tab).find('.label_select_checkbox:checked').length == 0; 
        }, function(){
            redrawUI(tab);
        })
    }

    function sendToTop(tab) {
        // console.log('going to send to top');
        var elements = [];
        getCheckedElements(tab).each(function() {
            elements.push(this);
        });
        debugger
        elements = elements.reverse();
        for (var i = 0; i < elements.length; i++) {
            $(elements[i]).detach().prependTo('#' + tab + ' div[id$="_content"]');
            // $('#' + tab + ' div[id$="_content"]').prepend(elements[i])
        }
        if (tab === 'tabs-loadrules') {
            //Need to make sure that All Pages stays on top
            $('div[data-id="all"]').prependTo('#' + tab + ' div[id$="_content"]');
        }
        $('#' + tab).find('.label_select_checkbox:checked').prop('checked', false);
        $('#' + tab + ' #sendToTop,#' + tab + ' #sendToBottom').parent().remove();
        when(function(){
            return $('#' + tab).find('.label_select_checkbox:checked').length == 0; 
        }, function(){
            redrawUI(tab);
        })
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