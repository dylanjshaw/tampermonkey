
    /************** Add common utility functions Start ***************************/
    var keepTrying = function(func, callback, sleep) {
        if (typeof(sleep) == 'undefined') {
            sleep = 100;
        }
        var args = Array.prototype.slice.call(arguments, 2);
        var timer = setInterval(function() {
            var functionResponse = func.apply(null, args);
            // console.log('functionResponse: '+functionResponse);
            if (functionResponse) {
                clearInterval(timer);
                // console.log('done trying: '+func);
                callback();
            } else {
                // console.log('tried: '+func);
            }
        }, sleep);
    }
    var when = function(test, run, sleep) {
        var args = Array.prototype.slice.call(arguments, 2);
        keepTrying(test, function() {
                run.apply(null, args);
            },
            sleep);
    }
    /************** Add common utility functions End ***************************/


    utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {

        function insideDialogWizard() {
            return $('div[aria-labelledby="ui-dialog-title-manage_dialog_wizard"]').is(':visible')
        }

        utui.util.pubsub.subscribe('accordion_expanded_tag', function(e) {

            if (e.tag_name.indexOf('Adobe Analytics') < 0) {
                return;
            }

            var edit_btns = $('#' + e.container).find('span.actionEditSettings, span.actionEditRules, span.actionMapping');
            $(edit_btns).on('click', function(e) {
                when(function() {
                    return insideDialogWizard();
                }, function() {
                    setTimeout(function(){
                        var sort_btn = $('<span id="sitecatSort" class="btn btn-small i-color-add"><i class="icon-sort"></i> Sort Mappings</span>').click(prepareSitecatMappings);
                        if (!$('div[aria-labelledby="ui-dialog-title-manage_dialog_wizard"]').find('#sitecatSort').length) {
                            if ($('#mappingsBulkRow').length) {;
                                $(sort_btn).css({'margin-left':'10px'}).appendTo('#mappingsBulkRow td');
                            } else {
                                $('#wizard_variables_wrapper tbody').append('<tr id="siteCatSortContainer" class="tmui"><td></td></tr>');
                                $(sort_btn).appendTo('#siteCatSortContainer td');
                            }
                        }
                    },100)
                })
            })
        })

    })

    function moveSitecatMappings(unordered, type) {
        var ordered = [];
        var keys = [];
        keys = Object.keys(unordered);
        keys.sort(alphaNumSort).reverse();
        keys.forEach(function(key) {
            ordered.push(unordered[key]);
        });
        for (var i = 0; i < ordered.length; i++) {
            $(ordered[i]).prependTo("#wizard_variables_wrapper ul.variable_map_container");
        }
    }

    function prepareSitecatMappings() {
        var props = {};
        var evars = {};
        var events = {};
        var valEvents = {};
        var prods = {}; //product level evars and events
        var others = {};
        $("li.managemap_div").each(function() {
            //we are going to sort on the first mapped variable
            var type = $(this).find(".js-variable-input").attr("value").split(',')[0];
            if (type.indexOf('prop') > -1) {
                props[type] = this;
            } else if (type.indexOf('PRODUCTS_') > -1) {
                prods[type] = this;
            } else if (type.indexOf('eVar') > -1) {
                evars[type] = this;
            } else if (type.indexOf('VALUE_') > -1) {
                valEvents[type] = this;
            } else if (type.indexOf(':') > -1) {
                events[type] = this;
            } else {
                others[type] = this;
            }
        });
        valEvents = moveSitecatMappings(valEvents, 'valEvents');
        events = moveSitecatMappings(events, 'events');
        prods = moveSitecatMappings(prods, 'prods');
        evars = moveSitecatMappings(evars, 'evars');
        props = moveSitecatMappings(props, 'props');
        others = moveSitecatMappings(others, 'others');
    }