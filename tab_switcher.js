utui.profile.setSearchFocus = function() {};


var waitFor = waitFor || function(function_to_check, function_to_run, interval_time, max_runs, this_run) {
    if (typeof max_runs === 'undefined') {
        max_runs = 10;
    }
    if (typeof this_run === 'undefined') {
        this_run = 1;
    }
    if (typeof interval_time === 'undefined') {
        interval_time = 50;
    }
    if (max_runs < this_run) {
        return;
    }
    if (function_to_check()) {
        function_to_run();
        return;
    } else {
        this_run++;
        setTimeout(function() {
            waitFor(function_to_check, function_to_run, interval_time, max_runs, this_run);
        }, interval_time);
    }
};


utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
    waitFor(checkDOMForTab, attachThing, 10, 10);
});


function checkDOMForTab() {
    return document.querySelectorAll(".ui-tabs-selected").length > 0 ? true : false;
}

// chrome/mac only (may conflict with other browser shortcuts)

function attachThing() {
    ($(document).unbind('keypress', easySwitch));
    document.addEventListener('keypress', easySwitch, false);
}

function easySwitch(e) {
    var newIndex, switched = false;
    var tabArr = ["dashboard", "define", "loadrules", "manage", "customizations", "publish"];
    if (e.altKey) {
        var currentIndex = $('#tabs_content > li').index($(document).find(".ui-tabs-selected")[0]);
        switch (e.which) {
            case 339: // alt + q
                if (currentIndex == 0) {
                    newIndex = 5;
                    switched = true;
                    break;
                }
                newIndex = (currentIndex - 1) % tabArr.length;
                switched = true;
                break;
            case 8721: // alt + w
                newIndex = (currentIndex + 1) % tabArr.length; // ctrl + x
                switched = true;
                break;
            default:
                break;
        }
        if (switched) {
            utui.profile.checkTab(tabArr[newIndex]);
        }
    }
}