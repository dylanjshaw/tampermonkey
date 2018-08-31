utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
    var ecommMap = {
        corder: 'order_id',
        ctotal: 'order_total',
        csubtotal: 'order_subtotal',
        cship: 'order_shipping_amount',
        ctax: 'order_tax_amount',
        cstore: 'order_store',
        ccurrency: 'order_currency_code',
        cpromo: 'order_promo_code',
        ctype: 'order_type',
        ccustid: 'customer_id',
        ccity: 'customer_city',
        cstate: 'customer_state',
        czip: 'customer_postal_code',
        ccountry: 'customer_country',
        cprod: 'product_id',
        cprodname: 'product_name',
        csku: 'product_sku',
        cbrand: 'product_brand',
        ccat: 'product_category',
        ccat2: 'product_subcategory',
        cquan: 'product_quantity',
        cprice: 'product_price',
        cpdisc: 'product_discount_amount'
    };

    function ecommExtensionExists() {
        var data = utui.data.customizations;
        var exists = false;
        Object.keys(data).forEach(function(id) {
            if (data[id].id == "100005") {
                exists = true;
            }
        });
        return exists;
    }

    function configureEcommExtension(extId) {
        var ext = {
            title: "E-Commerce"
        };
        exapi.addExtension(extId, "100005", ext);
        utui.customizations.addItem(extId);
        utui.customizations.drawJUIAccordion(extId);
        utui.labels.helper.renderLabels(extId, utui.customizations.id);
        $('#customize_content').animate({
            scrollTop: $('#customizations_' + extId).offset().top - $('#customize_content').offset().top + $('#customize_content').scrollTop()
        }, 'slow');

        for (var k in ecommMap) {
            var opt = $("#" + k + " option[value='js." + ecommMap[k] + "']");
            if (opt.length > 0) {
                opt.attr("selected", "selected");
                $("#s2id_" + k + " > a").removeClass("select2-default");
                $("#s2id_" + k + " span.select2-chosen").text(opt.text());
            }
        }
    }

    function addEcommExtension() {
        if (!ecommExtensionExists()) {
            exapi.getNextIdFromServer(1, null,
                // onSuccess
                function(providedLastId, count, extId) {
                    configureEcommExtension(extId);
                    $("#customize_addEcommBtn").remove();
                },
                // onFailure
                function(extId) {
                    configureEcommExtension(extId);
                    $("#customize_addEcommBtn").remove();
                });
        }
    }

    function createEcommExtensionButton() {
        if (!$('#customize_addEcommBtn').length) {
            if (!ecommExtensionExists()) {
                $('<span id="customize_addEcommBtn" class="btn tmui"><i class="icon-wrench"></i> Add E-Commerce Extension</span>')
                    .css('float', 'left')
                    .css('margin-left', '10px')
                    .click(addEcommExtension)
                    .appendTo('#tabs-customizations .config_button_nofloat');
            }
        }
    }

    createEcommExtensionButton();

})