// ==UserScript==
// @name         Single Tool Test
// @namespace     TIQ
// @require       http://code.jquery.com/jquery-2.1.1.min.js
// @require       https://raw.githubusercontent.com/ccampbell/mousetrap/master/mousetrap.min.js
// @require       https://raw.github.com/ccampbell/mousetrap/master/plugins/global-bind/mousetrap-global-bind.min.js
// @require       https://code.jquery.com/ui/1.11.2/jquery-ui.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/localforage/1.5.0/localforage.min.js
// @run-at        document-end
// @version       3.0
// @description   Addons to TealiumIQ
// @include       *my.tealiumiq.com/tms
// @updateURL     https://solutions.tealium.net/hosted/tampermonkey/tealiumiq.user.js
// ==/UserScript==


utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function(){
	var my_site_context = $('#tabs-dashboard #my_site_context').children()[0];
    var global_message_button = $('<li class="tmui"><a href="#" id="getGlobalMessage">Show Global Message</a></li>').click(function() {unsafeWindow.__getGlobalMessageAllow = 'true';getGlobalMessage(true);})
    $(global_message_button).appendTo(my_site_context)
})	


__getGlobalMessageAllow = 'true';

function showGlobalMessagePopup(message_obj, showAll) {
    $('#account_message_popup').remove();
    if (typeof message_obj.account_message === 'undefined') {message_obj.account_message = '';}
    if (typeof message_obj.profile_message === 'undefined') {message_obj.profile_message = '';}
    if (typeof showAll === 'undefined') {showAll = false;}

	var button_div = document.createElement('div');
	function createButton(type){
	    var click_handler = type === "Update" ? setGlobalMessage : function(){$('#account_message_popup').remove()}
		var btn = $.parseHTML('<button type="button" id="global_popup_'+type.toLowerCase()+'_btn"class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"><span class="ui-button-text"></span></button>')
	    $(btn).find('span').text(type);
	    $(btn).on('click', click_handler);
	    return btn; 
	}
	var close = createButton('Close');
	var update = createButton('Update');
	$(close).css({'cursor':'pointer', 'float':'right','margin-right':'10px','bottom':'35px'}).appendTo(button_div)
	$(update).css({'cursor':'pointer', 'float':'right','margin-right':'10px', 'bottom':'35px','display':'none'}).appendTo(button_div)


    var global_help = $.parseHTML('<div id="account_message_popup"><span id="close_upper_right"> X </span><br><br><span id="important_popup_label">This is the Account Note and, cannot be edited from TiQ <a href="https://deploytealium.com/message/" target="_blank" style="text-decoration:none">*</a></span><textarea disabled id="important_popup_text" rows="10" cols="80" /><br><span id="important_popup_last"></span><br><br><span id="global_popup_label">These shared Profile Notes can be edited by all Team Members, start typing to edit.</span><textarea id="global_popup_text" rows="13" cols="80" /><span id="global_popup_last"></span><br><br></div>');
	$(global_help).css({'margin-left':'20%','width':'65%','height':'560px','position':'fixed','z-index':'10000','background-color':'white','border-style':'solid','border-width':'3px','top':'100px','border-color':'#057ABD','border-radius':'10px'})    
	$(global_help).append(button_div)
	$(global_help).appendTo(document.body);

    $('#global_popup_label').css({'margin-left': '4%','font-size': 'small','color': '#888888'});
	$('#important_popup_label').css({'margin-left': '4%','font-size': 'small','color': '#888888','margin-top': '2a%'});
	$('#global_popup_text').css({'width': '90%','margin-left': '4%','font-size': 'medium','margin-bottom': '0px'}).val(message_obj.profile_message);
	$('#important_popup_text').css({'width': '90%','margin-left': '4%','font-size': 'medium','color': 'mediumvioletred','font-weight': 'bold','margin-bottom': '0px'}).val(message_obj.account_message);
	$('#close_upper_right').css({'cursor': 'pointer','position': 'absolute','top': '0','right': '0','background-color': '#057ABD','color': 'white','font-size': 'medium','border-bottom-left-radius': '4px','padding': '5px'}).click(function() {$('#account_message_popup').remove()});
	
	var important_txt = (message_obj.account_date_modified == '') ? '' : 'Account Message Last Updated on ' + message_obj.account_date_modified + ' by ' + message_obj.account_last_email; 
	$('#important_popup_last').text(important_txt);
	$('#important_popup_last').css({'margin-left': '4%','font-size': 'x-small','color': '#888888','border-top': '0px','border': 'none'});

	var global_txt = (message_obj.profile_date_modified == '') ? '' : 'Profile Message Last Updated on ' + message_obj.profile_date_modified + ' by ' + message_obj.profile_last_email
	$('#global_popup_last').text(global_txt);
	$('#global_popup_last').css({'margin-left': '4%','font-size': 'x-small','color':'#888888','border-top': '0px','border':'none'});
    
    $('#global_popup_text').keyup(function(e) {$('#global_popup_update_btn').show();});
    $('#global_popup_close_btn').focus();
}

function getGlobalMessage(showAll) {
    if (__getGlobalMessageAllow === 'false') {return false;}
    if (typeof showAll === 'undefined') {showAll = false;}
    var publishHistory = Object.keys(utui.data.publish_history).sort().reverse();
    var account_name = utui.login.account, profile_name = utui.login.profile, user_email = utui.login.email, emails = [];
    for (var i = 0; i < publishHistory.length; i++) {
        var email = utui.data.publish_history[publishHistory[i]][utui.data.publish_history[publishHistory[i]].publishState['saved']].operator;
        if (emails.indexOf(email) === -1) {emails.push(email);}
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
            if (response.success) {
                var account_message = '';
                var profile_message = '';
                if (response.account_message && response.account_message !== '') {
                    account_message = response.account_message;
                }
                if (response.profile_message && response.profile_message !== '') {
                    profile_message = response.profile_message;
                }
                if (account_message !== '' || profile_message !== '' || showAll) {
                    showGlobalMessagePopup(response, showAll);
                    if (!showAll) {
                        $('#globalMessageButton').css('cursor', 'pointer').css('color', '#C71585').addClass('tmui-color').removeClass('hidden');
                        __getGlobalMessageAllow = 'true';
                    }
                } else {
                    $('#globalMessageButton').css('cursor', 'default').css('color', 'rgb(16, 136, 200)').removeClass('tmui-color').addClass('hidden');
                    __getGlobalMessageAllow = 'false';
                }
            } else {
                $('#globalMessageButton').css('cursor', 'default').css('color', 'rgb(16, 136, 200)').removeClass('tmui-color').addClass('hidden');
                __getGlobalMessageAllow = 'false';
            }
        }
    });
}

function setGlobalMessage() {
    $('#global_popup_update_btn').hide();
    var profile_message = $('#global_popup_text').val();
    var account_name = utui.login.account;
    var profile_name = utui.login.profile;
    var user_email = utui.login.email;
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








