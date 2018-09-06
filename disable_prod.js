
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


                //Check for extension added
                utui.util.pubsub.subscribe(utui.constants.tagging.TAGGING, function(e){
                    if(!e.extension_type){return;}
                    var el = document.querySelector('.ext_publish_target[id*="_prod_target"]');
                    when(function() {
                        return (el);
                    }, function() {
                        if (el.offsetWidth > 0 && el.offsetHeight > 0) {
                            el.checked = false
                        }
                    });
                });

                //Check for tag added
                utui.util.pubsub.subscribe(utui.constants.tags.ADDED, function(e) {
                    var el = document.querySelector('#manage_config_locations_prod2');
                    when(function() {
                        return (el)
                    }, function() {
                        if (el.offsetWidth > 0 && el.offsetHeight > 0) {
                            $(el).click();
                        }
                    });
                });

    })