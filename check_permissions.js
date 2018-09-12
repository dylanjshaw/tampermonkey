utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
        function displayMessageBanner(message) {
            $('#messageBannerDiv').remove();
            $('<div id="messageBannerDiv"><span id="messageBannerClose">X</span><span id="messageBannerMessage">' + message + '</span></div>')
                .css('background-color', '#d9534f')
                .css('position', 'absolute')
                .css('top', '10px')
                .css('width', '531px')
                .css('height', '30px')
                .css('margin-left', '27%')
                .css('border-radius', '6px')
                .css('text-align', 'center')
                .appendTo('#app_header');
            $('#messageBannerMessage')
                .css('top', '5px')
                .css('color', 'black')
                .css('position', 'relative')
                .css('font-size', '15px');
            $('#messageBannerClose')
                .css('float', 'left')
                .css('border', '1px solid black')
                .css('border-radius', '6px')
                .css('cursor', 'pointer')
                .css('padding', '5.5px')
                .css('position', 'relative')
                .css('font-size', '15px')
                .click(function() {
                $('#messageBannerDiv').remove();
            });
            return true;
        }

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

        function checkForPermissions() {
            when(function() {
                return utui.permissions && utui.users && Object.keys(utui.permissions.getUserPermissions()).length > 0;
            }, function() {
                if (!utui.permissions.canPublishDev()) {
                    displayMessageBanner("You can't publish to DEV. You are probably read only!");
                } else {
                    $('#messageBannerDiv').remove();
                }
                if(utui.account.sso_isSAML()){
                  if(!$('#sso_status_message_parent_div').length){
                    $('<div id="sso_status_message_parent_div" class="global_status_message_container_wrapper tmui" style="display: block;position: absolute;left: 845px;top:82px">\
                      <div id="sso_status_message_container" class="ui-state-highlight global_status_message_container">\
                        <div id="sso_status_message" class="global_status_message"><span class="global_status_message_text"><strong>SSO Account</strong></span></div>\
                      </div>\
                    </div>').insertBefore('.productSearchContainer');
                  }
                }else{
                  $('#sso_status_message_parent_div').remove();
                }
            });
        }
        checkForPermissions();
});