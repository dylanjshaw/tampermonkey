var when = function(test, run, sleep) {
    var args = Array.prototype.slice.call(arguments, 2);
    keepTrying(test, function() {
        run.apply(null, args);
    },
    sleep);
}

var check_for_errors = function() {
    when(

        function() {
            if (jQuery('#datasource_add_dialog').is(':visible') === true) {
                return true;
            } else {
                return false;
            }
        },

        function() {
            jQuery('#datasource_add_dialog_replaceVars').parent().hide();
        });
    when(

        function() {
            if (jQuery('#datasource_add_dialog').is(':visible') === false || jQuery('#datasource_add_dialog_bulkVarListErrs li').is(':visible') === true) {
                return true;
            } else {
                return false;
            }
        },

        function() {
            if (jQuery('#datasource_add_dialog').is(':visible') === true) {
                var a = {};
                a.errors = {};
                a.new = [];
                jQuery('#datasource_add_dialog_bulkVarListErrs li').each(function() {
                    a.tmp = jQuery(this).text().replace(/^Line /, '').replace(/\: Variable.+?defined$/, '');
                    if (!isNaN(parseInt(a.tmp))) {
                        a.tmp = a.tmp - 1;
                        a['errors'][a.tmp] = 1;
                    }
                });
                a.current = jQuery('#datasource_add_dialog_bulkVarList').val().split('\n');
                for (var i = 0; i < a.current.length; i++) {
                    if (typeof a.errors[i] === 'undefined') {
                        a.new.push(a.current[i]);
                    }
                }
                jQuery('#datasource_add_dialog_bulkVarList').val(a.new.join('\n'));
                jQuery('#datasource_add_dialog_bulkVarListErrs').html("The Tampermonkey automation removed all the duplicate variables. Confirm and click Apply again");
                jQuery('#datasource_add_dialogSaveBtn').mousedown(function() {
                    check_for_errors();
                });
            }
        });
}

utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
    jQuery('#dataSources_addBulkDataSourceBtn').click(function() {
        check_for_errors();
    });
})