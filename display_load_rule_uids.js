utui.util.pubsub.subscribe('accordion_expanded_tag', function(e){
    var $id;
    $('.LRsRule').each(function(){
        $id = $(this).attr('id').split('_').pop();
        $(this).find('.LRsTitle').append('  <span class="tmui">[UID:' + $id + ']</span>');
    });
});