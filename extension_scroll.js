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


utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
    jQuery(document.body).on('mousedown', 'div[id^=customizations][data-id] h3', function(e) {
        window.extensionElementID = jQuery(this).parent().attr('data-id');
        when(function() {
            return jQuery('#customizations_' + extensionElementID + '_accordionBody').is(':visible');
        }, function() {
            //Extensions
            var myContainer = $('#customize_content');
            var scrollTo = $('#customizations_' + extensionElementID);
            scrollTopInt = scrollTo.offset().top - myContainer.offset().top + myContainer.scrollTop();
            myContainer.animate({
                scrollTop: scrollTopInt,
                duration: 50
            });
        }, 100, 10);
    });
})