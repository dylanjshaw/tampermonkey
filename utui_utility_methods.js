utui.util.retrieveTemplateCode = (uid, el, template_ref) => {
    utui.service.get(utui.service.restapis.GET_TEMPLATE,
        {
            account: utui.data.settings.account,
            profile: utui.data.settings.profileid,
            revision: utui.data.settings.revision,
            template: template_ref,
            cb: Math.random()
        },
        null,
        (data) => {
            el.innerHTML = data.content;
        }
    )
}

utui.util.copyToClipboard = (element) => {
    var $temp = $("<textarea>");
    var brRegex = /<br\s*[\/]?>/gi;
    $("body").append($temp);
    $temp.val($(element).text().replace(brRegex, "\r\n")).select();
    document.execCommand("copy");
    $temp.remove();
}


utui.util.truncate = (str, len) => {
    if (str.length > len) {
        str = str.substr(0, len - 3) + '...';
    }
    return str;
}