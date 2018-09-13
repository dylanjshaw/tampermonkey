utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
        var bulk_load_rules_import = function() {
            var bulk_add_link = $('<div class="tab-menu-item tmui" style="float:right;"><span id="loadrules_button_import" class="btn btn-success" style="margin-top:0;"><i class="icon-plus"></i><span> Bulk Import</span></span></div>');
            var import_container = $('<div id="load_rules_container" class="ui-dialog ui-widget ui-widget-content ui-corner-all" tabindex="-1" role="dialog" aria-labelledby="ui-dialog-title-admin_dialog"><div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"><span class="ui-dialog-title">Bulk Add Load Rules</span><a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="ui-icon ui-icon-closethick load_rules_btn"></span></a></div><div style="width: auto; height: auto;" class="ui-dialog-content ui-widget-content" scrolltop="0" scrollleft="0"><textarea id="csv_load_rules" cols="11" rows="25" style="margin-left:auto;display: block;margin-right: auto;margin-top: auto;margin-bottom: auto;"></textarea></div><div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"><div class="ui-dialog-buttonset"><button type="button" id="add_load_rules" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false" original-title="Click to import the load rules." title="Click to import the load rules."><span class="ui-button-text">Import</span></button><button type="button" style="float:left; margin-left: 12px" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false"><span class="ui-button-text load_rules_btn">Close</span></button></div></div></div>');
            $(import_container).css({'z-index': '1002', 'outline': '0px','height': 'auto','top': '200px','margin': 'auto auto auto 20%','width': '50%','min-width': '400px', 'display':'none'});
            if($("#loadrulesContainer_headerControls").find('#loadrules_button_import').length == 0){$("#loadrulesContainer_headerControls").append(bulk_add_link);}
            $("#tabs").append(import_container);
            $(".load_rules_btn").click(function() {
                $("#csv_load_rules").val("");
                $("#load_rules_container").hide();
            });
            $("#loadrules_button_import").off('click').click(function(e) {
                $("#csv_load_rules").val(""); 
                $("#load_rules_container").toggle();
            });
            $("#add_load_rules").click(function() {
                var rules = $("#csv_load_rules").val();
                if (rules) {
                    rules_rows = rules.split("\n");
                    for (row in rules_rows) {
                        if (rules_rows[row]) {
                            row_values = rules_rows[row].split(",");
                            udo_var = "js." + row_values[0].replace(/"|'/g, "");
                            operator = row_values[1].replace(/"|'/g, "").toLowerCase();
                            value_to_match = row_values[2].replace(/"|'/g, "");
                            title = "";
                            for (w in value_to_match.split("_")) {
                                x = value_to_match.split("_")[w];
                                x = x.charAt(0).toUpperCase() + x.slice(1);
                                title += x + " ";
                            }
                            title = title + udo_var.split(".")[1].split("_")[0].charAt(0).toUpperCase() + udo_var.split(".")[1].split("_")[0].slice(1);
                            lr = {
                                "0": {
                                    "input_0": udo_var,
                                    "operator_0": operator,
                                    "filter_0": value_to_match
                                },
                                "title": title,
                                "status": "active",
                                "startDate": "------------",
                                "endDate": "------------",
                                "editable": "true",
                            }
                            $("#csv_load_rules").val("");
                            utui.automator.addLoadrule(lr);
                        }
                    }
                    $("#load_rules_container").toggle();
                } else {
                    alert("Field cannot be blank!");
                }
            });
        }
        bulk_load_rules_import();
})