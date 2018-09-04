utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {

            var selectors = { versions: [".hist_verEventDetailsContent", ".histEventDate:first"], summary: [".verEnvInfo", ".verDate:first"]};
            var processDates = function(elements) {
                var idx = {
                        gmt: 0,
                        dates: 0
                    },
                    el, cl, local;
                idx.gmt = elements.length;
                while (idx.gmt--) {
                    idx.dates = elements[idx.gmt].length;
                    while (idx.dates--) {
                        e = jQuery(elements[idx.gmt][idx.dates]);
                        el = e.first();
                        cl = el.attr("class");
                        el.siblings("." + cl).remove();
                        local = new Date(el.text()).toLocaleString();
                        jQuery('<div class="' + cl + '">' + local + " (Local)</div>").insertAfter(el).addClass('tmui');
                    }
                }
            }
            var processQueue = function(queue) {
                        var $q = [], idx = queue.length;
                        while (idx--) {
                            $q.push(jQuery(queue[idx][0]).find(queue[idx][1]))
                        }
                        processDates($q)
            };

            processQueue([selectors.versions, selectors.summary]);

            var hist_eventRow = new MutationObserver(function(mutations) {processQueue([selectors.versions])});
            hist_eventRow.observe(document.querySelector(".hist_eventRow"), {attributes: true,childList: true,characterData: true});

            var dashboard_content = new MutationObserver(function(mutations) {processQueue([selectors.summary])});
            dashboard_content.observe(document.querySelector("#dashboard_content"), {attributes: true,childList: true,characterData: true});

})