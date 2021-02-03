(function ($) {
    "use strict"; // use strict to start
    var ajaxurl = livekitchen.ajaxurl;

    // Free Estimate form
    function book_a_table_form(form) {
        var form = $(form);
        form.submit(function (event) {
            var $self = $(this);
            event.preventDefault();
            var data = form.serialize(); 
            $.ajax({
                type: "POST",
                dataType: "html",
                url: livekitchen.ajaxurl,
                data: data,
                beforeSend: function() {
                    $self.find('.btn.btn-default').append('<i class="fa fa-spinner fa-spin"></i>'); 
                },
                success: function () {
                    $self.find('.btn.btn-default .fa-spinner').remove();  
                    $('.booking-with-chif .modal-success').fadeIn();
                    $(".booking-with-chif .modal-success .btn-success").on("click", function() {
                        $('.booking-with-chif .modal-success').fadeOut();
                    });
                    $('.booking-with-chif .modal-success').each(function () {
                        setTimeout(function(){
                            $('.booking-with-chif .modal-success').slideUp();
                        }, 6000);
                    });
                },
                error: function () { 
                    $self.find('.btn.btn-default .fa-spinner').remove();  
                    $('.booking-with-chif .modal-error').fadeIn();
                    $(".booking-with-chif .modal-error .btn-danger").on("click", function() {
                        $('.booking-with-chif .modal-error').fadeOut();
                    });
                    $('.booking-with-chif .modal-error').each(function () {
                        setTimeout(function(){
                            $('.booking-with-chif .modal-error').slideUp();
                        }, 6000);
                    });
                }
            });
        });  
    }
    if ($('#book-a-table-form').length) {
        book_a_table_form('#book-a-table-form');
    }

})(jQuery);

(function($){"use strict";var ajaxurl=livekitchen.ajaxurl;$(function(){function asynchronousPostLoading($selector,$action){var $selectorContent=$($selector),$ajaxAction=$action;var loadingContent="<div class='text-center'><i class='fa fa-refresh fa-spin fa-3x fa-fw'></i></div>";var promise1=$selectorContent.html(loadingContent).promise();var promise2=$.ajax({url:ajaxurl,data:({action:$action}),dataType:'html',type:'GET'});$.when.apply($,[promise1,promise2]).done(function(elem,data){$selectorContent.html(data[0]).slideDown();var $containerBlog=$('.layout-masonry');$containerBlog.imagesLoaded(function(){$containerBlog.masonry({itemSelector:'.col-md-4, .col-md-12',});});});}
$('.popular-list').one("click",function(e){e.preventDefault();asynchronousPostLoading('#grid-popular','livekitchen_theme_popular_post');});$('.trending-list').one("click",function(e){e.preventDefault();asynchronousPostLoading('#grid-trending','livekitchen_theme_trending_post');});$('.recent-tab, .popular-list, .trending-list').on('click',function(){$(this).on('shown.bs.tab',function(){var $containerBlog=$('.layout-masonry');$containerBlog.imagesLoaded(function(){$containerBlog.masonry({itemSelector:'.col-md-4'});});});});var $selectSelector=$(".blog-menu-mobile");$selectSelector.on('change',function(e){var $url=$(this).val();if($url==="1"&&$('#grid-popular').children().length<1){asynchronousPostLoading('#grid-popular','livekitchen_theme_popular_post');}else if($url==="2"&&$('#grid-trending').children().length<1){asynchronousPostLoading('#grid-trending','livekitchen_theme_trending_post');}else{var $tabNav=$(".blog-nav-md li a");$tabNav.eq($url).on('shown.bs.tab',function(){var $containerBlog=$('.layout-masonry');$containerBlog.imagesLoaded(function(){$containerBlog.masonry({itemSelector:'.col-md-4'});});});}});});})(jQuery);