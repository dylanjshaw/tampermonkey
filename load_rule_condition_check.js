
utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
    var build_update_view_obj = function(rule) {
        if (typeof(rule) === 'object' && Object.keys(rule).length) {
            return {
                'action': 'updated_loadrule',
                'data': {
                    'id': '' + rule._id,
                    'name': rule.title,
                    'kind': 'Loadrule',
                    'operation': 'updated',
                    'container': rule.containerId,
                    'tab_name': 'loadrules'
                }
            };
        }
        return false;
    };

    var updateLoadruleValue = function(id, key, value) {
        var selector, key, o;
        if (isNaN(id)) {
            id = parseInt(id);
        }
        utui.automator.getLoadruleById(id)[key] = value;
        o = [];
        for (key in utui.loadrules.containerMap) {
            if ('function' != typeof utui.loadrules.containerMap[key]) {
                if (utui.loadrules.containerMap[key]._id && utui.loadrules.containerMap[key]._id === ('' + id)) {
                    selector = key + '_' + key;
                    $('#' + selector).val(value);
                    break;
                }
                o.push(void 0);
            } else {
                o.push(void 0);
            }
        }
        return o;
    };
    /**
     *  returns an unflattend object whose's keys are grouped by the path of the key values.
     *  @param   {object}  table  : an object to iterate over.
     *  @return  {object}         : cloned obj with grouped keys.
     */
    var group = function(object) {
        var result = {};
        var cursor, len, prop, idx, char, start, end, bracket, dot;
        /** path represents a key in an obj */
        for (var path in object)
            if (object.hasOwnProperty(path)) {
                cursor = result;
                len = path.length;
                prop = '';
                idx = 0;
                /** count back from the end of the path */
                while (idx < len) {
                    char = path.charAt(idx);
                    if (char === '[') {
                        start = idx + 1;
                        end = path.indexOf(']', start);
                        cursor = cursor[prop] = cursor[prop] || [];
                        prop = path.slice(start, end);
                        idx = end + 1;
                    } else {
                        cursor = cursor[prop] = cursor[prop] || {};
                        start = char === '.' ? idx + 1 : idx;
                        bracket = path.indexOf('[', start);
                        dot = path.indexOf('.', start);
                        if (bracket < 0 && dot < 0) {
                            end = idx = len;
                        } else if (bracket < 0) {
                            end = idx = dot;
                        } else if (dot < 0) {
                            end = idx = bracket;
                        } else {
                            end = idx = bracket < dot ? bracket : dot;
                        }
                        // get's the name of the prop derived from the path based on the calculated region
                        prop = path.slice(start, end);
                    }
                }
                cursor[prop] = object[path];
            }
        return result[''];
    };
    var add_defined = function(loadrule) {
        var insert_is_defined = function(remap) {
            /**
             *  returns an array with an is defined loadrule pattern.
             *  @param   {string}  value  : the value of the input/source of this loadrule's block.
             *  @return  {array}          : the array we will prepent into the loadrule block.
             */
            var buildIsDefinedPair = function(value) {
                return [
                    ['input', value['input']],
                    ['operator', 'defined'],
                    ['filter', '']
                ];
            };

            /**
             *  boolean check if we should be adding a is_defined check.
             *  @param   {string}   operator  : an input operator [is_defined, contains etc].
             *  @return  {Boolean}            : returns true if we should add an is_defined.
             */
            var isAllowedOperator = function(operator) {
                var excluded_operators = ['defined', 'notdefined', 'populated', 'notpopulated', 'is_badge_assigned'];
                return !excluded_operators.includes(operator);
            };

            /**
             *  boolean check if the udo param should be checked for existance. excludes TIQ added params guaranteed to be in UDO during loadrule execution.
             *  @param   {string}   input  : the udo param input value.
             *  @return  {Boolean}         : true if it's not a dom. param
             */
            var isAllowedInput = function(input) {
                return input.match(/^js\.|^cp\.|^meta\.|^js_page\.|^va\.|^qp\.|^channel_|^do_not_track|^previous_page_name/) ? true : false;
            };

            // the loadrule or block, or the only block in the loadrule
            var sub_cond = Object.assign({}, loadrule[key]);
            var keys = Object.keys(remap);
            var arr = [];
            var master = {};
            // we track if the input is already being safely handled here
            var safe_hash = {};

            /**
             *  handles updating the rules arr. prevents dupelicate keys etc. Mods to fix loadrules should be added here.
             *  to do: optimize loadrules.
             *  @param   {array}  arr    : the loadrule subcondition bin. a subcondition is a single loadrule block or an or block.
             *  @param   {array}  value  : the loadrule statement we want to push into the block. format [['input', remap[key]['input']],['operator', 'defined'],['filter', '']];
             *  @return  {method}        : will selectively update the loadrule block.
             */
            var push_unique = function(array, value) {
                var last, len;
                var last_input, last_operator, last_filter;
                var curr_input, curr_operator, curr_filter;

                curr_input = value[0][1];
                curr_operator = value[1][1];
                curr_filter = value[2][1];

                // if it's the first condition, go ahead and push it but track if it's a is defined or is populated check
                if (array.length === 0) {
                    array.push(value);
                    if (curr_operator === 'defined' || curr_operator === 'populated' || curr_operator === 'is_badge_assigned') {
                        safe_hash[curr_input] = curr_operator === 'populated' ? 2 : 1;
                        safe_hash[curr_input + "_loc"] = arr.length - 1;
                    }
                    return;
                }

                // if we're deeper into the block
                if (array.length >= 1) {
                    len = array.length;
                    last = array[len - 1];
                    last_input = last[0][1];
                    last_operator = last[1][1];
                    last_filter = last[2][1];
                }

                if (curr_operator === "populated" && typeof(safe_hash[curr_input]) !== "undefined" && safe_hash[curr_input] === 1) {
                    arr[safe_hash[curr_input + "_loc"]][1][1] = "populated";
                    safe_hash[curr_input] = 2;
                }

                if (curr_operator === 'populated' && typeof(safe_hash[curr_input]) !== 'undefined' && safe_hash[curr_input] === 2) {
                    return;
                }

                if (curr_operator === 'defined' && typeof(safe_hash[curr_input]) !== 'undefined') {
                    return;
                }

                if (curr_operator === 'is_badge_assigned' && typeof(safe_hash[curr_input]) !== 'undefined') {
                    return;
                }

                /** check for dupes and prevent pushing unecessary is_defined checks to a lodrule statement credit for hash check JP */
                if (curr_input === last_input) {
                    if (curr_operator === 'defined' && (last_operator === 'defined' || last_operator === 'populated' || typeof(safe_hash[curr_input]) !== 'undefined')) {
                        return;
                    }
                }

                /** prevent dupes, update loadrule block and track if we're already check for is_defined */
                if (last_input + last_operator + last_filter !== curr_input + curr_operator + curr_filter) {
                    array.push(value);
                    if (curr_operator === 'defined' || curr_operator === 'populated') {
                        safe_hash[curr_input] = curr_operator === 'populated' ? 2 : 1;
                        safe_hash[curr_input + "_loc"] = arr.length - 1;
                    }
                }
            };

            /** loadrule subcond redefined here */
            keys.forEach(function(key, i) {
                var input = remap[key]['input'];
                var operator = remap[key]['operator'];
                var filter = remap[key]['filter'];
                /** add is defined check to values that don't have them and are not added automatically by utag.js */
                if (isAllowedOperator(operator) && isAllowedInput(input)) {
                    // var is_defined_pair = [['input', remap[key]['input']],['operator', 'defined'],['filter', '']];
                    push_unique(arr, buildIsDefinedPair(remap[key]));
                    /** push the current loadrule operator */
                    push_unique(arr, [
                        ['input', input],
                        ['operator', operator],
                        ['filter', filter]
                    ]);
                } else {
                    push_unique(arr, [
                        ['input', input],
                        ['operator', operator],
                        ['filter', filter]
                    ]);
                }
            });

            /** reordering of subcondition here. this is what allows us to prepend values */
            for (var i = 0; i < arr.length; i++) {
                arr[i][0][0] = arr[i][0][0] + '_' + i;
                arr[i][1][0] = arr[i][1][0] + '_' + i;
                arr[i][2][0] = arr[i][2][0] + '_' + i;
                /** @type {object} :left join */
                master = Object.assign(master, _.fromPairs(arr[i]));
            }
            return master;
        };
        var sub_cond, loadrule, sub_cond_remap, sub_cond_redef, loadrule_backup, new_load_rule = {};
        if (!loadrule) {
            return;
        }
        for (var key in loadrule) {
            if (loadrule.hasOwnProperty(key)) {
                /** impossible to guess how many loadrules subconditions we have so find all keys of type int in loadrule */
                if (!isNaN(parseInt(key))) {
                    //prime a slot
                    new_load_rule[key] = {};
                    sub_cond = loadrule[key];
                    // prevents error on all_pages loadrule with no length. bug found by @Christina Sund
                    if (typeof(sub_cond) === 'object' && Object.keys(sub_cond).length) {
                        try {
                            // we flip and remap the keys of the sub_condition from filter_0 to 0.filter
                            sub_cond_remap = group(_.mapKeys(sub_cond, function(v, k) {
                                return k.replace(/(\w+)(_)(\d)/, '$3\.$1');
                            }));
                            // here we insert is_defined checks...
                            sub_cond_redef = insert_is_defined(sub_cond_remap);
                            new_load_rule[key] = Object.assign(new_load_rule[key], sub_cond_redef);
                        } catch (e) {
                            console.log(e);
                            // restore key if we failed in redef
                            new_load_rule[key] = loadrule[key];
                        }
                    } else {
                        new_load_rule[key] = loadrule[key];
                    }
                }
            }
        }
        return new_load_rule;
    };

    /** created to force update view. currently unnecessary */
    // var createInterfaceElements = function(rule_entries) {
    //     var elements = [];
    //     var parent_or, and, or_group, keys;
    //     var createElem = function(type, value) {
    //         var lookup = {
    //             'and': 'LRsANDcondition',
    //             'or': 'LRsORcondition',
    //             'filter': 'LRsCase',
    //             'input': 'LRsSource',
    //             'operator': 'LRsFilter'
    //         };
    //         var elem = document.createElement('div');
    //         elem.classList.add(lookup[type]);
    //         if (type === 'and' || type === 'or') {
    //             return elem;
    //         }
    //         elem.textContent = value;
    //         return elem;
    //     };
    //     for (var key in rule_entries) {
    //         if (rule_entries.hasOwnProperty(key)) {
    //             parent_or = createElem('or', null);
    //             keys = Object.keys(rule_entries[key]);
    //             while (keys.length) {
    //                 and = createElem('and', null);
    //                 or_group = keys.splice(0, 3);
    //                 or_group.forEach(function(entry, i) {
    //                     var t = entry.match(/(\w+)_(\d)/)[1];
    //                     var v = entry.match(/(\w+)_(\d)/)[0];
    //                     and.appendChild(createElem(t, rule_entries[key][v]));
    //                 });
    //                 parent_or.appendChild(and);
    //             }
    //             elements.push(parent_or);
    //         }
    //     }
    //     return elements;
    // };

    /**
     *  dispatcher: handles looping through an individual loadrule.
     *  @param   {int}  id     :the id of the loadrule.
     *  @return  {method}      :dispatches updating loadrule value, triggering ui view change and adding history event.
     */
    var build_loadrule = function(id) {
        function check_mod(a, b) {
            var mod = false;
            if (Object.keys(a).length !== Object.keys(b).length) {
                mod = true;
            } else {
                for (var key in a) {
                    if (a[key] !== b[key]) {
                        mod = true;
                        break;
                    }
                }
            }
            return mod;
        }
        var elem, parent, data, elems, keys, value, cloned, update_obj, mod_hash = {};
        // operate on a clone of the loadrule for safety
        cloned = Object.assign({}, utui.data.loadrules[id]);

        if (!cloned) {
            return;
        }

        data = add_defined(cloned);

        if (data) {
            keys = Object.keys(data);
            if (keys.length) {
                keys.forEach(function(key, idx) {
                    value = data[key];
                    /** if we modified a loadrule subcondition */
                    if (check_mod(utui.data.loadrules[id][key], value)) {
                        /** update the interface */
                        updateLoadruleValue('' + id, key, value);
                        /** if we haven't tracked a change yet */
                        if (!mod_hash[id]) {
                            /** set change in mod lookup */
                            mod_hash[id] = 1;
                            /** @type {obj} :build the update obj */
                            update_obj = build_update_view_obj(utui.data.loadrules[id]);
                            if (update_obj) {
                                utui.profile.showModifiedTabLabel(update_obj);
                                utui.historyManager.addEvent(update_obj);
                                update_obj = null;
                            }
                        }
                    }
                });
            }
        }
    };
    window.add_isDefined = build_loadrule;
    window.add_isDefinedAll = function() {
        for (var key in utui.data.loadrules) {
            if (utui.data.loadrules.hasOwnProperty(key)) {
                window.add_isDefined(parseInt(key));
            }
        }
    };
    var load_rules_header = jQuery("#loadrulesContainer_headerControls");
    var button = jQuery.parseHTML("<button id='fixConditions' class='btn btn-info tmui' style='float: left;margin-top:0;margin-left:10px;'>Fix Conditions</button>");
    load_rules_header.find(button).remove();
    jQuery(load_rules_header).append(button)
    jQuery(button).on('click', function() {
        window.add_isDefinedAll()
    });
})