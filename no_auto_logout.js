utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {

    setInterval(function() {
        utui.util.setSession();
    }, 300000);
    var ping_community_interval = setInterval(ping_community, 1500000); // 1,500,000ms = 25 minutes
    function ping_community() {
        utag.ut.loader({
            "type": "img",
            "src": "https://community.tealiumiq.com/"
        });
    }
  
})