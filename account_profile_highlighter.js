utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
    var highlightAccount = function() {
        $('#profile_account-autocomplete')[0].setSelectionRange(0, $('#profile_account-autocomplete').val().length);
    }
    var highlightProfile = function() {
        $('#profile_profileid-autocomplete')[0].setSelectionRange(0, $('#profile_profileid-autocomplete').val().length);
    }
    $('#ui-active-menuitem').on('click', function() {
        console.log('clicked on active menu item');
    });
    $('#profile_menu_wrapper').click(function() {
        $('#profile_account-autocomplete')
            .attr('type', 'text')
            .click(highlightAccount)
            .change(function() {
                console.log('account changed');
                setTimeout(highlightProfile, 250);
            });
        $('#lastaccount button').click(highlightAccount);
        $('#profile_profileid-autocomplete')
            .attr('type', 'text')
            .click(highlightProfile);
        $('#lastprofile button').click(highlightProfile);
    });

})