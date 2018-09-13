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


utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function(){
    function highlight(input){input.setSelectionRange(0, input.value.length)}
    function visible(input){return input && input.offsetWidth > 0 && input.offsetHeight > 0}

    $(document).on('focus', '#select_account,#select_profile', function(e){highlight(e.target)})        
    $(document).on('mousedown', 'button[title="Show All Accounts"],button[title="Show All Profiles"]', function(e){highlight(e.target.parentElement.parentElement.parentElement.getElementsByTagName('input')[0])})


    $('#profile_menu_wrapper').on('mousedown', function(e){
        if(visible(document.getElementById('select_account'))){return}
        when(function(){return (document.getElementById('select_account') && document.getElementById('select_account').value.length)}, 
        function(){
            document.getElementById('select_account').focus()
        })
    })
})


