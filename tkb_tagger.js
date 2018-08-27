utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {

    $.getJSON('https://deploytealium.com/utag/tagdocs.php').success(function(response) {
        // build articles object
        window.articleObject = response;
        var articleArr = articleObject['response']['threads']['thread'],
            lookupObj = {},
            dobj = {},
            tags;
        for (var i in articleArr) {
            lookupObj[articleArr[i]['messages']['topic']['subject']['$']] = articleArr[i]['messages']['topic']['view_href'];
        }

        // link tags to articles
        var $container, $divId;
        var form = '<div><form class="TKB tmui" method="get" action="" target="_blank"><button class="btn"><i class=""></i></button></form></div>',
            $form;


        utui.util.pubsub.subscribe('accordion_expanded_tag', function(e) {
            tags = utui.data.manage;
            // Create a smaller tags object for easier management
            Object.keys(tags).forEach(function(key) {
                if (typeof dobj[key] === 'undefined') {
                    dobj[key] = {};
                }
                dobj[key].loadrulesMapping = [];
                dobj[key].dataMapping = [];
                dobj[key].title = tags[key].title || '';
                dobj[key].name = tags[key].tag_name || '';
                dobj[key].loadruleIds = tags[key].loadrule ? tags[key].loadrule.split(',') : '';
                dobj[key].status = tags[key].status;

            });

            // remove all button instances
            jQuery('.TKB').closest('div').remove();


            $container = $('#' + e.container);
            $divId = e.id;
            $container.find('.contentContainer').find('div.titleButton:first').after(form);
            $form = $container.find('form.TKB');
            $form.css('margin-top', '10px');
            if (Object.keys(lookupObj).includes(dobj[$divId].name)) {
                $form.find('button i').text('View/Edit TKB Article');
                $form.find('button i').attr('class', 'icon-external-link');
                $form.attr('action', lookupObj[dobj[$divId].name]);
            } else {
                $form.find('button i').text('Create TKB Article');
                $form.find('button i').attr('class', 'icon-edit');
                $form.attr('action', 'https://community.tealiumiq.com/t5/tkb/choosetemplatepage/board-id/10');
            }
        });
    });
});