utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {

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

    function showManageFeatures(data) {
        //Make it so that you can see the whole feature list without scrolling
        $('.dialog-context-nav').css('max-height', '600px');
        //Make sure there isn't already a pop up before creating another one.
        $('#popup').remove();
        var buttons = $('<div><button style="margin-right: 10px; cursor: pointer;" id="saveFeatures">Save</button><button id="closePopup">Close</button></div>')
            .css('padding-top', '15px')
            .css('margin-left', '22%');
        $('<div id="popup"><h4 id="featuresMessage"></h4><form id="featuresForm"><table><thead><tr><th style="float: left;">Feature</th><th>Enabled?</th></tr></thead><tbody></tbody></table></form></div>')
            .css('position', 'relative')
            .css('z-index', '5001')
            .css('border', '1px black solid')
            .css('padding', '15px')
            .css('border-radius', '6px')
            .css('background', 'white')
            .append(buttons)
            .insertAfter($('#updateTMFeatures').parent());
        $('#featuresForm').css('height', 'auto');
        $('#closePopup')
            .css('cursor', 'pointer')
            .click(function() {
            $('#popup').remove();
        });
        $('#saveFeatures').click(function() {
            saveFeatures();
        });
        $('<li style="text-align:center;"><button id="documentTMFeatures" target="_blank">TM Documentation</button></li>').insertAfter('#featuresMessage');
        $('#documentTMFeatures').click(function() {
            window.open('https://community.tealiumiq.com/t5/Training-and-Onboarding/Tampermonkey-Enhancements-for-Tealium-iQ/m-p/13822#M28', '_blank');
        })
            // .insertAfter('#featuresMessage');
        var enabled = featuresOptIn ? 'checked' : '';
        $('<tr><td>Auto Enable Features</td><td><input type="checkbox" data-feature-name="tiq_features_opt_in" ' + enabled + ' /></td></tr>')
            .appendTo('#featuresForm tbody');
        Object.keys(data).forEach(function(key) {
            var checked = data[key].enabled ? 'checked' : '';
            $('<tr><td>' + data[key].name + '</td><td><input type="checkbox" data-feature-name="' + key + '" ' + checked + ' /></td></tr>')
                .appendTo('#featuresForm tbody');
        });
    }

    function saveFeatures() {
        console.log('Saving Feature Preferences');
        $('#featuresForm tbody tr').each(function() {
            var checked = $(this).find('td:last input').is(':checked') ? 1 : 0;
            var featureName = $(this).find('td:last input').attr('data-feature-name');
            if (featureName == 'tiq_features_opt_in') {
                featuresOptIn = checked;
            } else {
                features[featureName].enabled = checked;
            }
        });

        // clearing localStorage items on save of TM preferences
        localStorage.removeItem('tiq_features');
        localStorage.removeItem('tiq_features_opt_in');


        localStorage.setItem("tiq_features", JSON.stringify(features));
        localStorage.setItem("tiq_features_opt_in", featuresOptIn);
        $('#featuresMessage').html('Successfully Updated Your Preferences!<br/><br/><span style="color: red;"> You will need to refresh TIQ for updates to take effect.</span>');
    }

    var myiqObserver = new MutationObserver(function(mutations) {
        console.log('MutationObserver of the My iQ left navigation');
        if (!$('#updateTMFeatures').length) {
            $('<li class="tmui"><a href="#" id="updateTMFeatures">Enable/Disable TM Features</a></li>')
                .click(function() {
                showManageFeatures(features);
            })
                .insertAfter('#tabs-dashboard .dialog-context-nav li:last');
        }
    });
    myiqObserver.observe(document.querySelector('#tabs-dashboard #my_site_context'), {attributes: true,childList: true,characterData: true});
    when(function() {
        return $('#tabs-dashboard #my_site_context').is(':visible');
    }, function() {
        if (!$('#updateTMFeatures').length) {
            $('<li class="tmui"><a href="#" id="updateTMFeatures">Enable/Disable TM Features</a></li>')
                .click(function() {
                showManageFeatures(features);
            })
                .insertAfter('#tabs-dashboard .dialog-context-nav li:last');
        }
    });

})