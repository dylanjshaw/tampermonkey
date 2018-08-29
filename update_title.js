utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function(){
	utui.data.settings.account ? document.title = 'TiQ - ' + utui.data.settings.account : null;
})
