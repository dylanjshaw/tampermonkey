function hideLeftPanelInfo(container) {
    container.find('.contextBox').find('.contextActionButtons').nextAll().remove();
    container.find('.rating-container').remove();
}
utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
    utui.util.pubsub.subscribe('accordion_expanded_tag', function(e) {
        var $container = $('#' + e.container);
        if(features.hideLeftPanelInfo.enabled){
            hideLeftPanelInfo($container)
        }
    });
});