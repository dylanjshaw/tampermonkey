utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
    utui.util.setupQuickSwitchV2()
})

console.log('Quick Switch v2 Loading');
//Create a style sheet that will hide the original profile buttons and format the auto complete box
var hide_and_reformat = $('<style id="quickSwitchStyleSheet">\#profile_account-autocomplete,#lastaccount button[title="Show All Items"],#profile_profileid-autocomplete,#lastprofile button[title="Show All Items"],#lastrevision{\display:none;\}\.menu_list_container{width: 205px;}\.ui-autocomplete{width: 160px !important;}\#select_account,#select_profile{width: 154px;}\#profile_menu_list input{max-width: 152px;position:relative;bottom:8px;}\.ui-autocomplete .ui-menu-item {\text-decoration: none;\display: block;\padding: .2em .4em;\line-height: 1.5;\zoom: 1;\}\.ui-button-icon-only{\height: 23px;\top: 6px;\}\.quickSwitch{\display: inline-block !important;\padding-left: 6px !important;\}\#quickSwitchSort{\padding-left: 10px !important;\}\.quickSwitchFavIcon{\color: #E8D033;\cursor: pointer;\}\</style>');
$(hide_and_reformat).appendTo('head');

utui.util.truncate = function(str, len) {
    if (str.length > len) {
        str = str.substr(0, len - 3) + '...';
    }
    return str;
}

utui.util.buildRecentHistory = function() {
    var html = '<div class="menulistheaderfont">Recent History (Sortable)    <i id="acct_refresh" class="icon-refresh" style="cursor: pointer;" title="Refresh Account List"></i></div><ul id="quickSwitchSort" style="list-style-type:none;">';
    var recentProfiles = JSON.parse(localStorage.getItem('recent_history'));
    if (!recentProfiles) {
        utui.util.storeHistory();
        recentProfiles = JSON.parse(localStorage.getItem('recent_history'));
    }
    for (var i = 0; i < recentProfiles.length; i++) {
        var favIcon = recentProfiles[i].favorite ? "icon-star" : "icon-star-empty";
        if (i === 0) {
            //This is the default profile, change the icon
            favIcon = 'icon-user';
        }
        html += '<li><div class="menulistitem"><i class="' + favIcon + ' quickSwitchFavIcon"></i><a class="menulistfont wordwrap quickSwitch" href="#" data-account="' + recentProfiles[i].account + '" data-profile="' + recentProfiles[i].profile + '">' + i + ': ' + truncate(recentProfiles[i].account + '/' + recentProfiles[i].profile, 25) + '</a></div></li>';
    }
    html += '</ul><div class="menudivider"></div>';
    return html;
}
utui.util.storeHistory = function(account, profile, defaultProfile) {
    var updatedProfileList = [];
    var nonFavList = [];
    var profileMaxLength = 10;
    var recentProfiles = JSON.parse(localStorage.getItem('recent_history'));
    if (recentProfiles) {
        var nonFavListCounter = 0;
        for (var i = 1; i < recentProfiles.length; i++) {
            if (!recentProfiles[i].favorite && !(recentProfiles[i].account === account && recentProfiles[i].profile === profile)) {
                nonFavList.push(recentProfiles[i]);
            }
        }
        if (defaultProfile) {
            recentProfiles[0].account = account;
            recentProfiles[0].profile = profile;
            recentProfiles[0].favorite = true;
            $('.quickSwitch:contains("0: ")').text('0: ' + account + '/' + profile);
            $('.quickSwitch:contains("0: ")').attr('data-account', account);
            $('.quickSwitch:contains("0: ")').attr('data-profile', profile);
            updatedProfileList = recentProfiles;
        } else {
            if (recentProfiles[0].account === account && recentProfiles[0].profile === profile) {
                //All we did was switch back to the default profile
                return true;
            }
            //Default profile doesn't change.  Just add it.
            updatedProfileList.push(recentProfiles[0]);
            var accountProfileExists = 0;
            for (var i = 1; i < recentProfiles.length; i++) {
                if (recentProfiles[i].account === account && recentProfiles[i].profile === profile) {
                    // console.log('Account/Profile exists in index: '+i);
                    accountProfileExists = i;
                    if (recentProfiles[i].favorite) {
                        //This is a favorite profile, return since no sorting is needed
                        return true;
                    }
                    nonFavList.unshift(recentProfiles[i]);
                    break;
                }
            }
            if (accountProfileExists) {
                //Reorder the list based on favorites
                for (var i = 1; i < recentProfiles.length; i++) {
                    // console.log('index == '+i+', '+JSON.stringify(recentProfiles[i]));
                    //Don't rewrite the account/profile we are swtiching to
                    if (accountProfileExists !== i) {
                        if (!recentProfiles[i].favorite) {
                            // console.log('This entry is not a favorite.  Going to place next available: '+JSON.stringify(nonFavList[nonFavListCounter]));
                            updatedProfileList.push(nonFavList[nonFavListCounter]);
                            nonFavListCounter++;
                        } else {
                            // console.log('This entry is a favorite.  placing: '+JSON.stringify(recentProfiles[i]));
                            updatedProfileList.push(recentProfiles[i]);
                        }
                    } else {
                        // console.log('going to replace where the profile was with the next available one: '+JSON.stringify(nonFavList[nonFavListCounter]));
                        updatedProfileList.push(nonFavList[nonFavListCounter]);
                        nonFavListCounter++;
                    }
                }
            } else {
                var obj = {};
                obj.account = account;
                obj.profile = profile;
                obj["default"] = false;
                obj.favorite = false;
                //Add the new account/profile to the front of the nonFavList array
                nonFavList.unshift(obj);
                //Ensure that we won't add more than 10 items in the array.
                var profileLength = recentProfiles.length > profileMaxLength ? profileMaxLength : recentProfiles.length;
                for (var i = 1; i < profileLength; i++) {
                    if (!recentProfiles[i].favorite) {
                        updatedProfileList.push(nonFavList[nonFavListCounter]);
                        nonFavListCounter++;
                    } else {
                        updatedProfileList.push(recentProfiles[i]);
                    }
                }
                // console.log('nonFavList[nonFavListCounter] == '+JSON.stringify(nonFavList[nonFavListCounter]));
                // console.log('updatedProfileList.length == '+updatedProfileList.length);
                if (typeof nonFavList[nonFavListCounter] !== 'undefined' && updatedProfileList.length < profileMaxLength) {
                    // console.log('going to add another entry');
                    updatedProfileList.push(nonFavList[nonFavListCounter]);
                }
            }
        }
    } else {
        var obj = {};
        obj.account = 'services-' + $('.admin-menu-name').text().split(' ')[0].toLowerCase();
        obj.profile = 'main';
        obj["default"] = true;
        obj.favorite = true;
        updatedProfileList.push(obj);
    }
    localStorage.setItem("recent_history", JSON.stringify(updatedProfileList));
    return true;
}
utui.util.updateHistory = function() {
    var updatedProfileList = [];
    $('#quickSwitchSort .menulistitem').each(function(i) {
        var obj = {};
        obj.favorite = $(this).find('i').hasClass('icon-star');
        var updatedText = $(this).find('.quickSwitch').text().replace(/\d+: /, i + ': ');
        $(this).find('.quickSwitch').text(updatedText);
        obj.account = $(this).find('.quickSwitch').data('account');
        obj.profile = $(this).find('.quickSwitch').data('profile');
        if (i) {
            obj["default"] = false;
        } else {
            //Only set index 0 to true
            obj["default"] = true;
            obj.favorite = true;
        }
        updatedProfileList.push(obj);
    });
    localStorage.setItem("recent_history", JSON.stringify(updatedProfileList));
}
utui.util.performSwitch = function(context, account, profile) {
    if (context) {
        account = $(context).attr('data-account');
        profile = $(context).attr('data-profile');
    }
    //Perform the switch
    utui.profile.getRevision({
        account: account,
        profile: profile,
        revision: 'latestversion'
    }, function() {
        utui.util.afterSwitch('', account, profile);
    });

}

utui.util.afterSwitch = function(data, account, profile) {
    utui.util.storeHistory(account, profile);
    $('#recentprofilesQuickSwitch').html(utui.util.buildRecentHistory());
    $('#acct_refresh').click(function() {
        updateAccountList();
    });
    $('.quickSwitch').click(function() {
        utui.util.performSwitch(this);
    });
    $('#quickSwitchSort').sortable({
        items: 'li:not(:first)',
        update: function() {
            utui.util.updateHistory();
        }
    });
    //Update the profile list
    getAccountProfiles(account);
    //Remove the status message about a publish message
    setTimeout(function() {
        $('#global_status_close_icon').click();
    }, 500);
}

window.getAccountProfiles = function(account) {
    if ($('#profile_account option[value="' + account + '"]').length) {
        console.log('Going to get profiles for account: ' + account);
        utui.profile.getProfiles(null, {
            account: account
        }, function(data) {
            if (data.profiles) {
                //Put the profiles in alphabetical order
                var profiles = data.profiles.sort();
                $('#select_profile').autocomplete({
                    source: profiles,
                    delay: 0,
                    minLength: 0
                });
                $('#select_profile').val(profiles[0] || '');
            } else {
                console.log('No profiles returned in object');
            }
        }, null, 1);
    } else {
        console.log(account + ' isn\'t available for your account.  A search for profiles won\'t be done');
    }
}
window.updateAccountList = function() {
    // make an ajax request to get all of the accounts for this user
    $("#acct_refresh").animate({
        'opacity': '0.3'
    }, 500);
    utui.service.get(utui.service.restapis.GET_ACCOUNTS, {}, null, function(data) {
        $("#acct_refresh").animate({
            'opacity': '1'
        }, 200);
        if (data) {
            var accounts = data.accounts;
            utui.login.accounts = accounts.sort();
            //Grab all accounts
            var sorted_accounts = utui.login.accounts.sort(utui.util.caseInsensitiveSort);
            $('#select_account').autocomplete({
                source: sorted_accounts,
                delay: 0,
                minLength: 0,
                select: function(event, ui) {
                    getAccountProfiles(ui.item.label);
                }
            });
            // Update TIQ select list
            $profileSelect = $("#profile_account");
            for (var i = 0; i < sorted_accounts.length; i++) {
                var account = sorted_accounts[i];
                $profileSelect.append($("<option></option>").attr("value", account).text(account));
            }
        }
    });
}

utui.util.setupQuickSwitchV2 = function() {
    //Setup Recent History
    $('#recentprofiles').hide();
    if (!$('#recentprofilesQuickSwitch').length) {
        $('<div id="recentprofilesQuickSwitch">' + utui.util.buildRecentHistory() + '</div>').insertAfter('#recentprofiles');
        $('#acct_refresh').click(function() {
            updateAccountList();
        });
        $('.quickSwitch').click(function() {
            utui.util.performSwitch(this);
        });
        //Make the list sortable
        $('#quickSwitchSort').sortable({
            items: 'li:not(:first)',
            update: function() {
                utui.util.updateHistory();
            }
        });
        //Hide the original load button and create our own.
        $('button:contains("Load Version")').hide();
        $('<div class="config"><button id="quickSwitchLoadVersion" class="btn">Load Version</button></div>')
            .insertBefore('#loadversion_button')
            .click(function() {
                var account = $('#select_account').val();
                var profile = $('#select_profile').val();
                utui.util.performSwitch(null, account, profile);
            });
        $('<li class="menu-li"><a id="quickSwitchDefaultProfile" href="#">Set Quick Switch Default Profile</a></li>')
            .insertAfter($('#editUser_menuBtn').parent());
        $('#quickSwitchDefaultProfile').click(function() {
            $('#adminMenu_listing').hide();
            var account = utui.data.settings.account;
            var profile = utui.data.settings.profileid;
            utui.util.storeHistory(account, profile, true);
        });
        //Capture number inputs to allow for quick switch
        Mousetrap.bindGlobal(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], function(e, key) {
            // console.log('User typed '+key);
            // console.log('Recent History Visible = '+$('#recentprofilesQuickSwitch').is(':visible'));
            if ($('#recentprofilesQuickSwitch').is(':visible')) {
                setTimeout(function() {
                    // console.log('key: '+key);
                    // console.log('value: '+$('#profile_account-autocomplete').val());
                    if (key == $('#select_account').val()) {
                        // console.log(key +' == '+ $('#select_account').val());
                        // console.log($('#recentprofilesQuickSwitch a:contains("'+key+': ")'));
                        $('#recentprofilesQuickSwitch a:contains("' + key + ': ")').click();
                    }
                }, 300);
            }
        });
        //Set default focus in the account field
        $('#profile_menu_button').click(function() {
            when(function() {
                return ($('#lastaccount').is(':visible'));
            }, function() {
                //Get the current account and profile
                var current_account = $('#profile_legend_account').text();
                var current_profile = $('#profile_legend_profile').text();
                //Grab all accounts
                var accounts = [];
                $('#profile_account option').each(function() {
                    accounts.push($(this).text());
                });
                //Create our own account selector
                if (!$('#select_account').length) {
                    $('<input id="select_account" class="ui-widget ui-widget-content ui-corner-left" value="' + current_account + '"/>')
                        .insertAfter('#profile_account-autocomplete')
                        .change(function() {
                            if ($(this).val().length > 1) {
                                getAccountProfiles($(this).val());
                            }
                        });
                    $('<button type="button" tabindex="-1" title="Show All Accounts" class="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right ui-button-icon"><span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"></span><span class="ui-button-text"> </span></button>')
                        .insertAfter('#select_account')
                        .click(function() {
                            $('#select_account').focus().autocomplete("search", "");
                        });
                    //Turn on auto complete for accounts
                    $('#select_account').autocomplete({
                        source: accounts,
                        delay: 0,
                        minLength: 0,
                        select: function(event, ui) {
                            getAccountProfiles(ui.item.label);
                        }
                    });
                } else {
                    $('#select_account').val(current_account);
                }
                //Grab all profiles
                var profiles = [];
                $('#profile_profileid option').each(function() {
                    profiles.push($(this).text());
                });
                //Create our own profile selector
                if (!$('#select_profile').length) {
                    $('<input id="select_profile" class="ui-widget ui-widget-content ui-corner-left" value="' + current_profile + '"/>')
                        .insertAfter('#profile_profileid-autocomplete');
                    $('<button type="button" tabindex="-1" title="Show All Profiles" class="ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right ui-button-icon"><span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"></span><span class="ui-button-text"> </span></button>')
                        .insertAfter('#select_profile')
                        .click(function() {
                            $('#select_profile').focus().autocomplete("search", "");
                        });
                    //Turn on auto complete for profiles
                    $('#select_profile').autocomplete({
                        source: profiles,
                        delay: 0,
                        minLength: 0
                    });
                } else {
                    $('#select_profile').val(current_profile);
                }
                //Add focus to the account box
                $('#select_account').focus();
                $('#select_account')[0].setSelectionRange(0, $('#select_account').val().length);
                //Setup the tab index
                $('#select_account').attr('tabindex', 1);
                $('#select_profile').attr('tabindex', 2);
                $('#quickSwitchLoadVersion').attr('tabindex', 3);
                //Setup auto highlight of account and profile when there is focus
                $('#select_account,#select_profile').on('focus', function() {
                    $(this)[0].setSelectionRange(0, $(this).val().length);
                });
                //Setup sticky/favorite profiles
                $('.quickSwitchFavIcon').click(function() {
                    if ($(this).hasClass('icon-star')) {
                        $(this).removeClass('icon-star');
                        $(this).addClass('icon-star-empty');
                    } else if ($(this).hasClass('icon-star-empty')) {
                        $(this).addClass('icon-star');
                        $(this).removeClass('icon-star-empty');
                    }
                    utui.util.updateHistory();
                });
            }, 100);
        });
        //Open the profile selection window
        Mousetrap.bindGlobal('ctrl+z', function(e, key) {
            console.log('User is requesting profile selection window');
            $('#profile_menu_button').click();
        });
    }
}
console.log('Quick Switch v2 Loaded');