function extract_base_url(templateCode) {
    var base_url_array = [];
    var base_url_split = [];
    base_url_array = templateCode.match(/base_url(".*")/); //find base_url and get its line
    if (base_url_array && (base_url_array.length == 2 || base_url_array.length > 2)) {
        base_url_split = base_url_array[1].split("//");
        if (base_url_split && base_url_split.length == 2) {
            var tag_base_url = base_url_split[1].slice(0, -1); //remove extra double quotes in the end of the string
            tag_base_url = "//" + tag_base_url;
            return tag_base_url;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

String.prototype.trim = function(length) {
    return this.length > length ? this.substring(0, length) + "..." : this;
}

function expose_base_url(tag_base_url) {
    tag_base_url = tag_base_url.trim(40)
    if ($("#base_url_row").length > 0) {
        $("#base_url_row").remove();
    }
    $('.contentTable:contains("Title") > tbody:last-child').append('<tr id="base_url_row" class="tmui"><td class="contentTableLabel"><div class="tmui">Base URL</div></td><td class="contentTableValue"><div class="contentValueContainer" id="base_url_value" class="tmui"><div class="contentValue"></div></div></td></tr>')
    $('#base_url_value').text(tag_base_url)
}

utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
    utui.util.pubsub.subscribe('accordion_expanded_tag', function(e) {
        var o = {
            account: utui.data.settings.account,
            profile: utui.data.settings.profileid,
            revision: utui.data.settings.revision,
            cb: Math.random(),
            template: 'profile.' + e.id
        };
        utui.service.get(utui.service.restapis.GET_TEMPLATE, o, null, function(data) {
            var templateCode = data.content;
            var tag_base_url = extract_base_url(templateCode);
            if (tag_base_url) {
                expose_base_url(tag_base_url);
            }
        });

    });
});