const clickedBtnStyle = document.createElement('style');
        clickedBtnStyle.type = 'text/css';
        clickedBtnStyle.innerHTML = '.clicked-copy-btn { background-color: #4ec236 !important; color: white !important; }';
        document.getElementsByTagName('head')[0].appendChild(clickedBtnStyle);      


        utui.util.pubsub.subscribe(utui.constants.profile.LOADED, () => {

            // update list on profile load/save
            saveLocalTemplateList()

            // update list on profile template save
            utui.util.pubsub.subscribe('updated_profile_template', (e) => {
                saveLocalTemplateList();
                updateSavedTemplate('profile');
            })


            // update list on version template save
            utui.util.pubsub.subscribe('updated_version_template', (e) => {
                saveLocalTemplateList();
                updateSavedTemplate('version');
            })


            utui.util.pubsub.subscribe('accordion_expanded_tag', (e) => {
                var $container = $('#'+e.container);
                if($container.find('.copy-btn-div').length == 0){insertButtons($container);}                
            })

            utui.util.pubsub.subscribe('/urest/legacy/dropTemplate')


        })

        const insertButtons = (container) => {
            $(container).find('.copy-template').remove();
            var uid = $(container).attr('data-id');
            var copy_btn_div = document.createElement('div');
            copy_btn_div.classList.add('contextSectionHeader', 'labels', 'js-labels-container', 'tmui', 'copy-btn-div');
            copy_btn_div.innerText = 'Copy Templates:';
            $(copy_btn_div).css('margin-bottom', '80px')
            $(copy_btn_div).append([(createButton(uid, "Profile")), createButton(uid, "Version")]);
            var original_buttons = $('.contextActionButtons')[0];
            $(copy_btn_div).appendTo(original_buttons);

        }



        const createButton = (uid, button_type) => {
            var template_ref;

            var btn = document.createElement('a');
            btn.classList.add('btn','btn-small','i-color-copy','copy-template','tmui');
            btn.innerText = ' ' + button_type;

            var i = document.createElement('i');
            i.classList = 'fas fa-copy';

            btn.prepend(i);

            $(btn).prepend('<script></script>');
            $(btn).css({'margin': '5px auto'})
            var btn_p = $(btn).find('script')[0];
            $(btn_p).attr('id', button_type.toLowerCase()+'-'+'template-copy-container'+'-'+uid);


            template_ref = button_type === "Profile" ? "profile" + '.' + uid : "revision" + '.' + uid;

            if(Object.keys(utui.template_list).includes(template_ref)){
                retrieveTemplateCode(uid, btn_p, template_ref);
            } else {
                $(btn).attr('disabled', 'disabled');
                i.classList = 'far fa-copy';
            }

            $(btn).on('click', () => {
                if($(btn_p).html().length > 0){
                    $(btn).parent().children().removeClass('clicked-copy-btn');
                    $(btn).addClass('clicked-copy-btn');
                    copyToClipboard(btn_p);
                }
            });
            return btn;
        }



        const retrieveTemplateCode = (uid, el, template_ref) => {
            utui.service.get(utui.service.restapis.GET_TEMPLATE,
                {
                    account: utui.data.settings.account,
                    profile: utui.data.settings.profileid,
                    revision: utui.data.settings.revision,
                    template: template_ref,
                    cb: Math.random()
                },
                null,
                (data) => {
                    el.innerHTML = data.content;
                }
            )
        }

        const copyToClipboard = (element) => {
            var temp = $("<textarea>");
            var brRegex = /<br\s*[\/]?>/gi;
            $("body").append(temp);
            temp.val($(element).text().replace(brRegex, "\r\n")).select();
            document.execCommand("copy");
            temp.remove();
        }


        const saveLocalTemplateList = () => {
            utui.service.get(utui.service.restapis.GET_TEMPLATE_LIST,
                {
                    account: utui.data.settings.account,
                    profile: utui.data.settings.profileid,
                    revision: utui.data.settings.revision,
                    cb: Math.random()
                },
                null,
                (data) => {
                    utui.template_list = data.templates;
                }
            )
        }

        const updateSavedTemplate = (type) => {
            var template_ref = $('#admin_template_select').val();
            var uid = template_ref.split('.')[1];
            var container = $('div[data-id='+uid+']').filter(function(i){return $(this).hasClass('manage_container')})
            var btn_p = $('#'+type+'-template-copy-container-'+uid);
            $(btn_p).parent().removeClass('clicked-copy-btn');
            $(btn_p).parent().attr('disabled', false);
            var i = $(btn_p).parent().find('i');
            i.classList = 'fas fa-copy';
            var script = $(container).find(btn_p)[0];
            script.innerHTML = utui.adminlib.editor.getValue()
        }
