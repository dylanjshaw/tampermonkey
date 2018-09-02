utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
    setupTagSearch()
})

    localStorage.setItem("tagSearchQuery", ""); //remove storage on login

    function searchTags(string) {
        // console.log('Running a search for "'+string+'"');
        localStorage.setItem("tagSearchQuery", string);
        var re = new RegExp(string, 'i');
        var data = utui.data.manage;
        var tags = {};
        if (string !== '') {
            Object.keys(data).forEach(function(id) {
                // console.log(data[id]);
                var tag = data[id];
                Object.keys(tag).forEach(function(key) {
                    // console.log(key,extension[key]);
                    var tagData = tag[key];
                    // console.log(key);
                    if (key != '_id' && key != 'id' && key != 'labels' && key != 'scope' && key != 'hash' && key != 'sort' && key != 'status' && key != 'new_flag' && key != 'loadrule' && key != 'publish_revisions' && key != 'publishedTargets' && key != 'selectedTargets' && key != 'tag_id' && key != 'map' && key != 'beforeonload') {
                        if (typeof tagData === 'string' && tagData.match(re)) {
                            tags[tag.sort] = 1;
                        }
                    } else if (key === 'map') {
                        Object.keys(tagData).forEach(function(mapping) {
                            var tagDataMap = tagData[mapping];
                            Object.keys(tagDataMap).forEach(function(map_key) {
                                if (map_key != 'dsID' && map_key != 'type') {
                                    if (typeof tagDataMap[map_key] === 'string' && tagDataMap[map_key].match(re)) {
                                        tags[tag.sort] = 1;
                                    }
                                }
                            });
                        });
                    }
                });
            });
        }
        $('#manage_content .manage_container').each(function(i) {
            if (tags[i] == 1) {
                $(this).find('h3').css('background-color', '#fad52d');
                $(this).find('h3').css('background-image', 'none');
            } else {
                $(this).find('h3').css('background-color', '');
                $(this).find('h3').css('background-image', '');
            }
        });
    }

    function setupTagSearch() {
        var searchTerm = localStorage.getItem("tagSearchQuery") || '';
        if (!$('#tag_search').length) {
            $('<div class="inputSearchContainer tmui"><input class="search" id="tag_search" value="' + searchTerm + '" type="text"></div>')
                .css('float', 'right')
                .css('z-index', '1')
                .appendTo('#tabs-manage .config_button_nofloat');
            var keysPressed = 0;
            $('#tag_search').bind('keydown', function() {
                // console.log('keydown');
                var grabKeyCount = ++keysPressed;
                setTimeout(function() {
                    if (keysPressed == grabKeyCount) {
                        searchTags($('#tag_search').val());
                    }
                }, 250);
            });
        } else {
            $('#tag_search').val(searchTerm);
        }
        searchTags($('#tag_search').val());
    }