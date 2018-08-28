
unsafeWindow.__getGlobalMessageAllow = 'true';

function showGlobalMessagePopup(message_obj, showAll) {
    if (typeof message_obj.account_message === 'undefined') {
        message_obj.account_message = '';
    }
    if (typeof message_obj.profile_message === 'undefined') {
        message_obj.profile_message = '';
    }
    if (typeof showAll === 'undefined') {
        showAll = false;
    }
    if (message_obj.account_message === '' && message_obj.profile_message === '') {
        // return false;
    }
    $('#account_message_popup').remove();
    var html = '<button id="global_popup_update_btn" type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only">';
    html += '<span class="ui-button-text">Update</span>';
    html += '</button>';
    var update = $(html);
    update.css('cursor', 'pointer')
        .css('float', 'right')
        .css('margin-right', '10px')
        .css('display', 'none')
        .click(function() {
        setGlobalMessage()
    });
    var html = '<button id="global_popup_close_btn" type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only">';
    html += '<span class="ui-button-text">Close</span>';
    html += '</button>';
    var close = $(html);
    close.css('cursor', 'pointer')
        .css('float', 'right')
        .css('margin-right', '10px')
        .css('bottom', '35px')
        .click(function() {
        $('#account_message_popup').remove()
    });
    var html = '<div id="account_message_popup">';
    var width = 800;
    var left_px = Math.round(($(window).width() - width) / 2) + 'px';
    // html .= '<span class="alert" style="color:red;margin-left:20px;font-size:18px;"></span><br/>';
    //  html += '<span class="global_help_text" style="margin-left:20px; font-size:20px;">Global Message for account ' + $('#profile_legend_account').text() + '</span>';
    html += '<span id="close_upper_right"> X </span>';
    html += '<br><br><span id="important_popup_label">This is the Account Note and, cannot be edited from TiQ <a href="https://deploytealium.com/message/" target="_blank" style="text-decoration:none;">*</a></span>';
    html += '<textarea disabled id="important_popup_text" rows="10" cols="80" /><br>';
    html += '<span id="important_popup_last"></span>';
    html += '<br><br>';
    html += '<span id="global_popup_label">These shared Profile Notes can be edited by all Team Members, start typing to edit.</span>';
    html += '<textarea id="global_popup_text" rows="13" cols="80" />';
    html += '<span id="global_popup_last"></span>';
    html += '<br><br>';
    html += '</div>';
    global_help = $(html);
    global_help.css('position', 'fixed')
        .css('z-index', '10000')
        .css('background-color', 'white')
        .css('border-style', 'solid')
        .css('border-width', '3px')
        .css('left', left_px)
        .css('top', '100px')
        .css('border-color', '#057ABD')
        .css('border-radius', '10px')
        .width(width)
        .height(560)
        .append(close)
        .append(update)
        .appendTo(document.body);
    $('#global_popup_label')
        .css('margin-left', '4%')
        .css('font-size', 'small')
        .css('color', '#888888');
    $('#important_popup_label')
        .css('margin-left', '4%')
        .css('font-size', 'small')
        .css('color', '#888888')
        .css('margin-top', '2a%');
    $('#global_popup_text')
        .css('width', '90%')
        .css('margin-left', '4%')
        .css('font-size', 'medium')
        .css('margin-bottom', '0px')
        .val(message_obj.profile_message);
    $('#important_popup_text')
        .css('width', '90%')
        .css('margin-left', '4%')
        .css('font-size', 'medium')
        .css('color', 'mediumvioletred')
        .css('font-weight', 'bold')
        .css('margin-bottom', '0px')
        .val(message_obj.account_message);
    $('#close_upper_right')
        .css('cursor', 'pointer')
        .css('position', 'absolute')
        .css('top', '0')
        .css('right', '0')
        .css('background-color', '#057ABD')
        .css('color', 'white')
        .css('font-size', 'medium')
        .css('border-bottom-left-radius', '4px')
        .css('padding', '5px')
        .click(function() {
        $('#account_message_popup').remove()
    });
    $('#important_popup_last')
        .css('margin-left', '4%')
        .css('font-size', 'x-small')
        .css('color', '#888888')
        .css('border-top', '0px')
        .css('border', 'none');
    if (message_obj.account_date_modified == '') {
        $('#important_popup_last').text('');
    } else {
        $('#important_popup_last').text('Account Message Last Updated on ' + message_obj.account_date_modified + ' by ' + message_obj.account_last_email);
    }
    $('#global_popup_last')
        .css('margin-left', '4%')
        .css('font-size', 'x-small')
        .css('color', '#888888')
        .css('border-top', '0px')
        .css('border', 'none');
    if (message_obj.profile_date_modified == '') {
        $('#global_popup_last').text('');
    } else {
        $('#global_popup_last').text('Profile Message Last Updated on ' + message_obj.profile_date_modified + ' by ' + message_obj.profile_last_email);
    }
    $('#global_popup_text').keyup(function(e) {
        $('#global_popup_update_btn').show();
    });
    $('#global_popup_close_btn').focus();
}

function getGlobalMessage(showAll) {
    if (unsafeWindow.__getGlobalMessageAllow === 'false') {
        return false;
    }
    if (typeof showAll === 'undefined') {
        showAll = false;
    }
    var account_name = unsafeWindow.utui.login.account;
    var profile_name = unsafeWindow.utui.login.profile;
    var user_email = unsafeWindow.utui.login.email;
    var publishHistory = Object.keys(unsafeWindow.utui.data.publish_history).sort().reverse();
    var emails = [];
    for (var i = 0; i < publishHistory.length; i++) {
        var email = unsafeWindow.utui.data.publish_history[publishHistory[i]][unsafeWindow.utui.data.publish_history[publishHistory[i]].publishState['saved']].operator;
        if (emails.indexOf(email) === -1) {
            emails.push(email);
        }
    }
    jQuery.ajax({
        async: true,
        url: "https://deploytealium.com/message/globalMessage.php",
        type: "POST",
        data: JSON.stringify({
            "debug": "true",
            "action": "get_global_message",
            "account_name": account_name,
            "profile_name": profile_name,
            "email": user_email,
            "emails": JSON.stringify(emails)
        }),
        success: function(response) {
            // var globalMessageAccountHide = JSON.parse(localStorage.getItem('global_history')) || {};
            // if(typeof globalMessageAccountHide[account_name] === 'undefined'){
            //   globalMessageAccountHide[account_name] = '';
            // }
            // if(globalMessageAccountHide[account_name] !== response.date_modified){
            //   globalMessageAccountHide[account_name] = '';
            // }
            // localStorage.setItem("global_history", JSON.stringify(globalMessageAccountHide));
            if (response.success) {
                var account_message = '';
                var profile_message = '';
                if (response.account_message && response.account_message !== '') {
                    account_message = response.account_message;
                }
                if (response.profile_message && response.profile_message !== '') {
                    // if(globalMessageAccountHide[account_name] === ''){
                    profile_message = response.profile_message;
                    // }
                    // unsafeWindow.account_message_date_modified = response.date_modified;
                }
                if (account_message !== '' || profile_message !== '' || showAll) {
                    showGlobalMessagePopup(response, showAll);
                    if (!showAll) {
                        $('#globalMessageButton').css('cursor', 'pointer').css('color', '#C71585').addClass('tmui-color').removeClass('hidden');
                        unsafeWindow.__getGlobalMessageAllow = 'true';
                    }
                } else {
                    $('#globalMessageButton').css('cursor', 'default').css('color', 'rgb(16, 136, 200)').removeClass('tmui-color').addClass('hidden');
                    unsafeWindow.__getGlobalMessageAllow = 'false';
                }
            } else {
                $('#globalMessageButton').css('cursor', 'default').css('color', 'rgb(16, 136, 200)').removeClass('tmui-color').addClass('hidden');
                unsafeWindow.__getGlobalMessageAllow = 'false';
            }
        }
    });
}
// function hideGlobalMessage(){
//   var account_name = $('#profile_legend_account').text();
//   var globalMessageAccountHide = JSON.parse(localStorage.getItem('global_history')) || {};
//   globalMessageAccountHide[account_name] = unsafeWindow.account_message_date_modified;
//   localStorage.setItem("global_history", JSON.stringify(globalMessageAccountHide));
//   $('#account_message_popup').remove();
// }
function setGlobalMessage() {
    $('#global_popup_update_btn').hide();
    var profile_message = $('#global_popup_text').val();
    var account_name = unsafeWindow.utui.login.account;
    var profile_name = unsafeWindow.utui.login.profile;
    var user_email = unsafeWindow.utui.login.email;
    jQuery.ajax({
        async: true,
        url: "https://deploytealium.com/message/globalMessage.php",
        type: "POST",
        data: JSON.stringify({
            "action": "set_global_message",
            "account_name": account_name,
            "profile_name": profile_name,
            "profile_message": profile_message,
            "email": user_email
        }),
        success: function(response) {
            if (response.success) {
                var tmp_text = $('#account_message_popup .global_help_text').text();
                $('#account_message_popup .global_help_text').text('Yay, you successfully updated the global message!').css('color', 'green');
                setTimeout(function() {
                    $('#account_message_popup .global_help_text').text(tmp_text).css('color', 'black')
                }, 3000);
                $('#global_popup_update_btn').hide();
            }
        }
    });
}

$('<span id="globalMessageButton" title="Show Global Message" class="tmui">{ ! }</span>')
    .insertBefore('#showHideTMButtons')
    .css('cursor', 'pointer')
    .css('margin-left', '15px')
    .css('position', 'fixed')
    .css('color', 'rgb(4, 127, 195)')
    .css('font-weight', 'bold')
    .css('font-size', 'larger')
    .css('width', '25px')
    .css('z-index', '500')
    .css('top', '3px')
    .click(function() {
    unsafeWindow.__getGlobalMessageAllow = 'true';
    getGlobalMessage()
});