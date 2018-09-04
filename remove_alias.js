		function hideAlias() {
            //Go through each data source
            Object.keys(utui.data.define).forEach(function(uid) {
                if (typeof utui.data.define[uid].title === 'undefined') {
                    //This data source was created before the alias feature, so we can move on.
                    return;
                }
                if (typeof utui.data.define[uid]._title === 'undefined') {
                    //Make a copy of the alias into a new property _title
                    utui.data.define[uid]._title = utui.data.define[uid].title;
                    //Clear out the current alias so that the UI uses the variable name
                    utui.data.define[uid].title = '';
                }
            });
        }

        function restoreAlias() {
            //Go through each data source
            Object.keys(utui.data.define).forEach(function(uid) {
                if (typeof utui.data.define[uid]._title !== 'undefined') {
                    //Restore the alias
                    utui.data.define[uid].title = utui.data.define[uid]._title;
                    //Delete our placeholder
                    delete utui.data.define[uid]._title;
                }
            });
        }


        utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
			hideAlias();
		})

        utui.util.pubsub.subscribe(utui.constants.profile.BEFORE_SAVE, function(){
        	restoreAlias();
        })

        utui.util.pubsub.subscribe(utui.constants.profile.PUBLISHED, function(){
        	hideAlias();
        })



