/************** Add common utility functions Start ***************************/
var keepTrying = function(func, callback, sleep) {
    if (typeof(sleep) == 'undefined') {
        sleep = 100;
    }
    var args = Array.prototype.slice.call(arguments, 2);
    var timer = setInterval(function() {
        var functionResponse = func.apply(null, args);
        if (functionResponse) {
            clearInterval(timer);
            callback();
        } else {
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

/************** Add common utility functions End ***************************/
    var tws = {};
    tws.autoExpandAdvancedSettings = function(){
            if(!$('#tagConfigAdvSettings .dialog_section_body:visible').length){
                $('div.dialogSectionHeader:contains("Advanced Settings")').unbind('click')
                $('#tagConfigAdvSettings .dialog_section_body').slideToggle({
                    duration: 'fast',
                    queue: false
                });
                $('#tagConfigAdvSettings .dialogSectionHeader i').toggleClass('icon-caret-right').toggleClass('icon-caret-down');
            }
    }
    tws.setupDataMappingShortcuts = function() {
                //Clear the mapping toolbox text so that we know once it has been updated.
                $('#dialog-managetoolbox-content').text('');

                //Auto click Select Destination when you change Data Source under Data Mappings
                $('select[id*=mapselect]').on('change', function() {
                    var datasource = $(this).val().split('.');
                    $('span:contains("Select Destination")').click();
                    when(function() {
                        return ($('#ui-dialog-title-dialog-managetoolbox').length && $('#ui-dialog-title-dialog-managetoolbox:contains("' + datasource[1] + ' (' + datasource[0] + ')")') && $('#dialog-managetoolbox-content').text().length);
                    }, function() {
                        //Add click handler to the cancel button to move focus to the last entry
                        $('div[aria-labelledby="ui-dialog-title-dialog-managetoolbox"] span:contains(Cancel)').click(function() {
                            //Put focus in the last entry
                            $('ul[id*=mapcontent] input[type=text]:last').focus();
                        })
                        if ($('#dialog-managetoolbox-content:contains("There is no toolbox available for this vendor")').length) {
                            //Just click Cancel
                            $('div[aria-labelledby="ui-dialog-title-dialog-managetoolbox"] span:contains(Cancel)').click();
                        } else {
                            //If you doubleclick an option, auto select apply
                            $('div[id*=managetoolbox_] option').on('dblclick', function() {
                                $('div[aria-labelledby="ui-dialog-title-dialog-managetoolbox"] span:contains(Apply)').click();
                            });
                        }
                    });
                });
                $('span:contains("Add Destination")').on('click', function() {
                    wizard_controller.add_destination_handler = 1;
                    var variableText = $(this).closest('.managemap_div').find('.managemap_label').text().trim();
                    when(function() {
                        return ($('#ui-dialog-title-dialog-managetoolbox').length && $('#ui-dialog-title-dialog-managetoolbox:contains("' + variableText + '")') && $('#dialog-managetoolbox-content').text().length);
                    }, function() {
                        $('div[id*=managetoolbox_] option').on('dblclick', function() {
                            $('div[aria-labelledby="ui-dialog-title-dialog-managetoolbox"] span:contains(Apply)').click();
                        });
                    });
                });

                //Setup import/export tag mappings
                when(function(){
                    return ($('#wizard_variables_wrapper:visible'))
                }, function(){
                    tws.insertMappingsBulkRow()
                })

                //CSS Fix
                $('.variable_map_container').css('max-height', '330px');
                $('.noItemsMapVariable').css('top', '75px');
            }
    tws.markTagAsNotSaved = function(tag_id) {
        var containerId = $('.manage_container[data-id="' + tag_id + '"]').attr('id');
        var tagObj = utui.manage.containerMap[containerId];
        utui.profile.setActionPerformed({
            action: utui.constants.tags.UPDATED,
            data: {
                id: tagObj.id,
                tag_name: tagObj.tag_name || utui.util.getTagNameFromTagId(tagObj.tag_id),
                name: tagObj.title,
                kind: utui.constants.tags.TYPE,
                operation: utui.constants.operation.UPDATED,
                container: containerId
            }
        }, true);

        utui.manage.newTagFlag = false;
        utui.manage.saveData();

        utui.util.pubsub.publish(utui.constants.tags.UPDATED, {
            action: utui.constants.tags.UPDATED,
            data: {
                id: tagObj.id,
                tag_name: tagObj.tag_name || utui.util.getTagNameFromTagId(tagObj.tag_id),
                name: tagObj.title
            }
        });
    }
    tws.insertMappingsBulkRow = function() {
                if (!$('#mappingsBulkRow').length) {
                    $('<tr id="mappingsBulkRow" class="tmui"><td></td></tr>')
                        .appendTo('#wizard_variables_wrapper tbody');
                    $('<span id="mappingsImport" class="btn btn-small actionAddMapping i-color-add"><i class="icon-arrow-down"></i> Import from CSV</span>')
                        .appendTo('#mappingsBulkRow td')
                        .click(function() {
                            tws.showImportExportPopup('', 'div[aria-labelledby="ui-dialog-title-manage_dialog_wizard"]');
                        });
                    if ($('.noItemsMapVariable[style*="display: none;"]').length) {
                        $('<span id="mappingsExport" class="btn btn-small actionAddMapping i-color-add"><i class="icon-arrow-up"></i> Export to CSV</span>')
                            .css('margin-left', '10px')
                            .appendTo('#mappingsBulkRow td')
                            .click(tws.exportMappings);
                    }
                }
            }
    tws.showImportExportPopup = function(content, prepend) {
            $('#popup').remove();
            var close = $('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"><span class="ui-button-text">Close</span></button>').click(function() {
                $('#popup').remove();
            });
            close.css('cursor', 'pointer')
                .css('float', 'right')
                .css('margin-right', '10px');
            $('<div id="popup" class="ui-dialog ui-widget ui-widget-content ui-corner-all"><div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"><span class="ui-dialog-title">Bulk Add Data Mappings</span></div><span class="alert" style="color:red;margin-left:20px;font-size:16px;"></span><br/><span class="helpText" style="margin-left:20px; display:block;">Format: data layer variable, type (js,dom,meta,cp,qp,customization2), destination</span><textarea id="popupText" rows="10" cols="80" /></div>')
                .attr('style', 'position: absolute; z-index: 10000; left: 30%;top: 200px; width: 400px; height: 280px')
                .append(close)
                .prependTo(prepend);
            $('#popupText')
                .css('width', '90%')
                .css('margin-top', '4%')
                .css('margin-left', '4%')
                .css('margin-bottom', '5px')
                .val(content);
            if (!content) {
                //Create import button
                $('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"><span class="ui-button-text">Import</span></button>')
                    .click(tws.importMappings)
                    .css('cursor', 'pointer')
                    .css('float', 'left')
                    .css('margin-left', '10px')
                    .appendTo('#popup');
                //Create import checkbox to create data elements
                $('<input type="checkbox" id="createDataLayerOption" />')
                    .css('float', 'left')
                    .css('margin-left', '10px')
                    .appendTo('#popup');
                $('<label title="If data layer name isn\'t found, checking the box will create it.">Create Data Layer Elements?</label>')
                    .css('float', 'left')
                    .css('margin-top', '3px')
                    .appendTo('#popup');
                $('#popup .alert').text('');
                //Insert helpful text
                // $('#popup .helpText').text('Format: data layer variable, type (js,dom,meta,cp,qp), destination');
            }
            $('#popupText')[0].setSelectionRange(0, $('#popupText').val().length);
        }
    tws.getDataLayerNames = function() {
                var data = utui.data.define;
                var obj = {};
                Object.keys(data).forEach(function(key) {
                    if (data[key].name) {
                        obj[data[key].name] = 1;
                    }
                });
                return obj;
            }
    tws.exportMappings = function() {
                var csv = '';
                var data = utui.data.manage[$('#manage_editmapping_id').val()].map;
                Object.keys(data).forEach(function(key) {
                    csv += data[key].key + ',' + data[key].type + ',' + data[key].variable + '\n';
                });
                //Pass a message if there aren't any mappings when the user clicks export
                if (!csv) {
                    csv = 'NOTHING CURRENTLY MAPPED!';
                }
                tws.showImportExportPopup(csv, 'div[aria-labelledby="ui-dialog-title-manage_dialog_wizard"]');
            }
    tws.importMappings = function() {
                var contentLines = $('#popupText').val().split('\n');
                var inputData = [];
                var dataLayer = tws.getDataLayerNames();
                for (var i = 0; i < contentLines.length; i++) {
                    if (contentLines[i].length) {
                        var obj = {};
                        var content = contentLines[i].split(',');
                        obj.key = content[0];
                        obj.type = content[1];
                        obj.variable = content.splice(2).join(',');
                        if ($('#createDataLayerOption').is(':checked')) {
                            //arguments are: title,name,type,desc,bundleobj(optional)
                            var id = dsapi.getNextId();
                            utui.define.addDataSource(id, "", obj.key, obj.type, "");
                        } else if (obj.type != 'dom' && !obj.key.match(/_corder|_ctotal|_csubtotal|_cship|_ctax|_cstore|_ccurrency|_cpromo|_ctype|_ccustid|_ccity|_cstate|_czip|_ccountry|_cprod|_cprodname|_csku|_cbrand|_ccat|_ccat2|_cquan|_cprice|_cpdisc/) && !dataLayer[obj.key]) {
                            $('#popup .alert').text('\'' + obj.type + '.' + obj.key + '\' is not in your data layer!');
                            return false;
                        }
                        inputData.push(obj);
                    }
                }
                if (!inputData.length) {
                    $('#popup .alert').text('No data to import!');
                    return false;
                }
                //Must close the mapping toolbox because the user can't see the mappings this way and it is very confusing
                $('#popup span:contains(Close)').click();
                //Existing Tag
                $('span:contains(Apply):visible').click();
                //New Tag
                $('span:contains(Finish):visible').click();
                utui.automator.addMapping($('#manage_editmapping_id').val(), inputData);
                (function(id) {
                    setTimeout(function() {
                        $('.manage_container div[data-uid="' + id + '"]').siblings('.container_variables').find('.variableValue').text('' + Object.keys(utui.data.manage[id].map).length);
                        $('.manage_container div[data-uid="' + id + '"]').siblings('.container_variables').addClass('valuePositive');
                        utui.profile.toggleUnsavedChangesBtn();
                    }, 250);
                })($('#manage_editmapping_id').val());
            }
    tws.addEditTemplatesToManageScreen = function(container, tag_id) {
        if (!$(container).find('.manageScreenEditTemplatesButton').length) {
            $('<a href="#" data-container-id="'+ tag_id +'" class="manageScreenEditTemplatesButton actionAdvConfigEdit btn btn-small i-color-edit tmui" original-title="This will launch a window that will allow you to view and/or manage the code behind your tag."><i class="icon-edit"></i> Edit Templates</a>')
                .insertBefore($('.actionEditSettings:visible'))
                .css('margin-right', '5px')
                .css('display', 'inline-block')
                .click(function() {
                utui.adminlib.getTemplateList(tag_id);
            });
        }
    }
    tws.addTagTemplateChangeLogToManageScreen = function(tag_id){
        $('<div class="tmui tagTemplateChangeLogManage" style="position:relative;left:20px;width:155px;"><a href="#" class="btn btn-small tmui" style="font-size:12px;">Tag Template Change Log</a></div>')
            .appendTo('.contextBox:visible')
            .click(function() {common.utils.openWindow('https://solutions.tealium.net/tools/tagchangelog?uid=' + utui.data.manage[tag_id].tag_id, '_blank');});
    }
    tws.insideDialogWizard = function(){return $('div[aria-labelledby="ui-dialog-title-manage_dialog_wizard"]').is(':visible')}
    tws.addTemplateChangeLogModalToDialog = function(tag_id){
        if (!$('.wizard_nav').find('.tagTemplateChangeLogModal').length) {
            $('<div class="tmui tagTemplateChangeLogModal" style="position:relative;left:20px;top:10px;width:155px;"><a href="#" class="btn btn-small tmui" style="font-size:12px;">Tag Template Change Log</a></div>')
                .appendTo('.wizard_nav:visible')
                .click(function() {
                    common.utils.openWindow('https://solutions.tealium.net/tools/tagchangelog?uid=' + utui.data.manage[tag_id].tag_id, '_blank');
                    });
        }   
    }

    tws.dialogTabClickHandler = function(){
        when(function(){
            return $('#wizard_config_wrapper:visible').length
        }, function(){
            var div_id = $('#manage_dialog_wizard [name^="manage_content_"]:first').attr('id').match(/(manage_content_\d+)/)[1];
            var tag_uid = $('#' + div_id).data('id');
            tws.insertEditTemplatesBtns(tag_uid)
            tws.addTemplateChangeLogModalToDialog(tag_uid)
            tws.autoExpandAdvancedSettings()
        })
    }
    tws.insertEditTemplatesBtns = function(tag_id){
        if(!$('.edit-templates-btn').length){
            var btn1 = '<div id="btn1" class="wizard_config"><div class="wizard_label"><a style="padding-left:0px;" href="#" class="edit-templates-btn actionAdvConfigEdit btn btn-small i-color-edit tmui" original-title="This will launch a window that will allow you to view and/or manage the code behind your tag."><i class="icon-edit"></i> Edit Templates</a></div></div><br/><br/>';
            var btn2 = '<div id="btn2" class="wizard_config"><div class="wizard_label"><a style="padding-left:0px;" href="#" class="edit-templates-btn actionAdvConfigEdit btn btn-small i-color-edit tmui" original-title="This will launch a window that will allow you to view and/or manage the code behind your tag."><i class="icon-edit"></i> Edit Templates</a></div></div><br/><br/>';
            $(btn1).click(function() {utui.adminlib.getTemplateList(tag_id);}).insertBefore('.dialogSectionHeader:contains(Properties)');
            $(btn2).click(function() {utui.adminlib.getTemplateList(tag_id);}).insertAfter('#tagConfigBasicSettings');
        }
    }

/************** Shortcuts and Optimizations for Tag Wizard End ***************************/

    // mark tag as not saved on profile template save
    utui.util.pubsub.subscribe('updated_profile_template', function(e){
        var template_ref = $('#admin_template_select').val();
        var uid = template_ref.split('.')[1];
        tws.markTagAsNotSaved(uid)
    })


    // mark tag as not saved on version template save
    utui.util.pubsub.subscribe('updated_version_template', function(e){
        var template_ref = $('#admin_template_select').val();
        var uid = template_ref.split('.')[1];
        tws.markTagAsNotSaved(uid)
    })
    

    // auto-expand advanced settings and set up mapping stuff on new tag
    utui.util.pubsub.subscribe(utui.constants.tags.ADDED, function(e){
        when(function() {
            return tws.insideDialogWizard();
        }, function() {
            //Update text box length for pixel URL's
            $('div.wizard_item input').not('.wizard_title').css('width', '495px');
            tws.autoExpandAdvancedSettings();
            tws.setupDataMappingShortcuts();
            tws.addTemplateChangeLogModalToDialog(e.data.id)
        });
    })

    // do everything on tag expand
    utui.util.pubsub.subscribe('accordion_expanded_tag', function(e) {
            
            var tag_id = e.id;

            // MANAGE SCREEN

                //Add edit templates button on manage screen
                $('.manageScreenEditTemplatesButton').remove();
                if (!$(e.container).find('.manageScreenEditTemplatesButton').length) {
                    tws.addEditTemplatesToManageScreen(e.container,tag_id)
                }

                //Add tag template change log link on manage screen
                $('.tagTemplateChangeLogManage').remove();
                if (!$(e.container).find('.tagTemplateChangeLogManage').length) {
                    tws.addTagTemplateChangeLogToManageScreen(tag_id)
                }

            // DIALOG WIZARD
            
            var edit_btns = $('#' + e.container).find('span.actionEditSettings, span.actionEditRules, span.actionMapping');
            $(edit_btns).on('click', edit_btns, function(e) {

                    $('.wizard_tabBody.variables #wizard_config_tab').on('click', tws.dialogTabClickHandler())

                // DIALOG WIZARD
                tws.autoExpandAdvancedSettings();
                tws.setupDataMappingShortcuts();

                //Add tag template change log in tips section
                tws.addTemplateChangeLogModalToDialog(tag_id)

                //Update text box length for pixel URL's
                $('div.wizard_item input').not('.wizard_title').css('width', '495px');

                //Insert Edit Templates Buttons at the top and middle of dialog wizard
                tws.insertEditTemplatesBtns(tag_id)
            })

    });
})