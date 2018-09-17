function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function insertSelectAllButton(tab_name) {
    var tab = tab_name.split(' '),
        parentRef, boxesRef, button;
    var buttonRef = '#select-all-' + tab.join('-');
    if ($(buttonRef).length == 0) { // if there is no select-all button in DOM...create it with ID
        button = createElementFromHTML('<div class="tab-menu-item select-all-button tmui" style="float:left;margin-left:10px"><a class="btn"><i class="icon-edit"></i><span>Select All</span></a></div>');
        $(button).attr('id', buttonRef.replace('#', ''));
        switch (buttonRef) {
            case '#select-all-data-sources':
                parentRef = '#defineContainer_headerControls';
                button = '<div id="select-all-data-sources" class="tab-menu-item select-all-button"><a class="btn"><i class="icon-edit"></i><span>Select All</span></a></div>';
                boxesRef = '#defineObjectsList > div > input[type="checkbox"]';
                break;
            case '#select-all-loadrules':
                parentRef = '#loadrulesContainer_headerControls';
                boxesRef = '#loadrules_content > div > h3 > a > div > input';
                break;
            case '#select-all-tags':
                parentRef = '#manageContainer_headerControls';
                boxesRef = '#manage_content > div > h3 > a > div.container_bulk_select > input';
                break;
            case '#select-all-extensions':
                parentRef = '#customizeContainer_headerControls';
                boxesRef = '#customize_content > div > h3 > a > div.container_bulk_select > input';
                //boxesRef = '.label_select_checkbox.bulk_select_checkbox';
                break;
        }
        $(document).one('DOMNodeInserted', '.select-all-button', function(e) {
            e.target.addEventListener('click', function() {
                if ($(boxesRef).prop('checked') == true) {
                    $(boxesRef).prop('checked', false);
                } else {
                    $(boxesRef).prop('checked', true);
                }
            });
        });
        $(parentRef).prepend(button);
    }
}


utui.util.pubsub.subscribe(utui.constants.views.TAB_CLICK, function(e) {
    if (e.screen_name) {
        insertSelectAllButton(e.screen_name.toLowerCase());
    }
});