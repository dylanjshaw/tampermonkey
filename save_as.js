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
    $('#global_save').click(function() {
        when(function() {
            return ($('span:contains(Save As)').is(':visible'));
        }, function() {
            $('#checkBtn_dev').not('.publish_connector_connected').click();
            $('#checkBtn_qa').not('.publish_connector_connected').click();
            //Fix tab order
            $('input[name*=forceFTP]').attr('tabindex', 999);
            $('.ui-button-text:contains(Publish)').attr('tabindex', 1);
            var origSaveTitle = $('#profile_legend_revision').text().trim();
            var saveTitle = $('#profile_legend_revision').text().trim().replace(/\d{4}\.\d{2}\.\d{2}\.\d{4}/g, '').replace(/\d{4}\/\d{2}\/\d{2}\ \d{2}:\d{2}/g, '').trim();  
            if (!saveTitle.match(/ -$/)) {saveTitle += ' -';}
            $('span:contains(Save As)').on('pseudoclick', function() {
                if(origSaveTitle != $('#savepublish_version_title').val()){
                    $('#savepublish_version_title').val($('#savepublish_version_title').val().replace(/Version/, saveTitle).replace(/(\d{4})\.(\d{2})\.(\d{2})\.(\d{2})(\d{2})/, '$1/$2/$3 $4:$5'));
                    $('#publish_notes').focus();
                }
            })
        });
        setTimeout(function(){$('span:contains(Save As)').trigger('pseudoclick');},100)
    });
})

