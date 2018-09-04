utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {

    function showLabels() {
        jQuery('.columnToggle').not('.selected').click();
        jQuery('.container_label.collapsed').removeClass('collapsed').addClass('expanded');
    }

    showLabels();

	utui.util.pubsub.subscribe(utui.constants.views.TAB_CLICK, function(e) {
		 switch (e.screen_name.toLowerCase()) {
            case 'loadrules':
                showLabels()
                break;
            case 'tags':
				showLabels()
                break;
            case 'extensions':
                showLabels()
                break;
	     }
	})


})
