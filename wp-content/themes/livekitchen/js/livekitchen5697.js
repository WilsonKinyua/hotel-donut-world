(function ($) {
	"use strict";

    var check_rtl = livekitchen.check_rtl;
    if (check_rtl == 0) {
        var check_rtl = false;
    } else {
        var check_rtl = true;
    }  

    
    var livekitchenApp = {       
        /* ---------------------------------------------
         Preloader
         --------------------------------------------- */
        preloader: function() {
            $(window).on('load', function() {
                $("body").imagesLoaded(function() {
                    $('.preloader').delay(400).slideUp('slow', function() {
                        $(this).remove();
                    });
                });
            });
        },
        /* ---------------------------------------------
        Header Search
        --------------------------------------------- */    
        header_search: function() {
            var $searchSelector = $(".header-top .search-area .fa");
            $searchSelector.on('click', function (event) {
                event.stopPropagation();
                var $searchOverlay = $(".header-serach-overlay .header-search");
                $searchOverlay.addClass('overlay-open');
            });

            var $onFocusSlector = $(".header-serach-overlay .form-controller");
            $onFocusSlector.on("focus", function() {
                $(this).parent().addClass('on-focus');
            });

            var $searchClose = $(".serach-overlay-close");           
            $searchClose.on("click", function() {
                var $serachWraper = $(".header-serach-overlay .header-search");
                $serachWraper.removeClass('overlay-open');
                return false;
            });  

            $(document).on('click', function(e) {
                if (!$('.header-serach-overlay .header-search .search.default').is(e.target)
                    && $('.header-serach-overlay .header-search .search.default').has(e.target).length === 0) {
                    $('.header-serach-overlay .header-search').removeClass('overlay-open');
                }
            });

            $('.header-mini-cart > a').on('click', function () {
                 $('.header-mini-cart').toggleClass('open');
                 return false;
            });

            $(document).on('click', function (e) {
                if (!$(e.target).closest('.header-mini-cart').length) {
                    if ( $('.header-mini-cart').hasClass("open")) {
                        $('.header-mini-cart').removeClass('open');
                    }
                }
            });
        }, 
        /* ---------------------------------------------
         Menu
         --------------------------------------------- */
        menu: function() {
            var combinedmenu = $('.navigation .mainmenu').clone();
            combinedmenu.appendTo('#mobile-main-nav #main-mobile-container');

            var submenu = $('.mainmenu li').has('.sub-menu');

            // Main Navigation Mobile
            // --------------------------------            
            $('#main-mobile-container .main-navigation').addClass('slideLeft');

            var item_main = $('.mobile-menu-main .menucontent.overlaybg, .mobile-menu-main .slideLeft'),
                menu_main_content = $('.mobile-menu-main .menucontent'),
                menuopen_main = function () {
                    $(item_main).removeClass('menuclose').addClass('menuopen');
                },
                menuclose_main = function () {
                    $(item_main).removeClass('menuopen').addClass('menuclose');
                };
            $('#navtoggole-main').on('click', function () {
                if (menu_main_content.hasClass('menuopen')) {
                    $(menuclose_main);
                } else {
                    $(menuopen_main);
                }
            });
            menu_main_content.on('click', function () {
                if (menu_main_content.hasClass('menuopen')) {
                    $(menuclose_main);
                }
            });

            // Sub Menu
            // -------------------------------- 
            submenu.prepend('<span class="menu-click"><i class="menu-arrow fa fa-plus"></i></span>');
            $('.menu-mobile').on('click', function () {
                $('.menu-list').slideToggle('slow');
            });
            $('.menu-click').on('click', function () {
                $(this).siblings('.sub-menu').slideToggle('slow');
                $(this).children('.menu-arrow').toggleClass('menu-extend');
            });

            $(".navigation .mainmenu li").on('mouseenter mouseleave', function (e) {
                if ($('ul', this).length) {
                    var elm = $('ul:first', this);
                    var off = elm.offset();
                    var l = off.left;
                    var w = elm.width();
                    var docH = $(".header-bottom > .container").height();
                    var docW = $(".header-bottom > .container").width();

                    var isEntirelyVisible = (l + w <= docW);

                    if (!isEntirelyVisible) {
                        $(this).addClass('right-side-menu');
                    } else {
                        //$(this).removeClass('right-side-menu');
                    }
                }
            });
            var $navSelector = $(".sticky-nav");
            if ($navSelector.length) {
                var $navOffset = $navSelector.offset().top;
                $(window).scroll(function() {
                    var $scrollPos = $(window).scrollTop();
                    if ($scrollPos >= $navOffset) {
                        $navSelector.addClass("fixed");
                    } else {
                        $navSelector.removeClass("fixed");
                    }
                });
            }
        }, 
        /* ---------------------------------------------
         Video
         --------------------------------------------- */
        page_video:function() {
            var pageVideo = $(".single-post .entry-content");
            pageVideo.fitVids();
        },

        /* ---------------------------------------------
        Magnifying Pop-up
        --------------------------------------------- */
        popup_window: function() {
            $('a.video-popup-btn').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                preloader: false,
                removalDelay: 300,
                fixedContentPos: false
            });            
            $('a.image-popup-btn').magnificPopup({
                type: 'image',
                mainClass: 'mfp-fade'
            });
        },
        /* ---------------------------------------------
         Coming Soon
         --------------------------------------------- */
        coming_soon: function() {
            var $selector = $('.countdown-time');
            $selector.each(function(){
                var $this = $(this),
                    data_year = $this.attr('data-year'),
                    data_month = $this.attr('data-month'),
                    data_day = $this.attr('data-day'),
                    data_hour = $this.attr('data-hour'),
                    data_minutes = $this.attr('data-minutes');
                $this.syotimer({
                    year: data_year,
                    month: data_month,
                    day: data_day,
                    hour: data_hour,
                    minute: data_minutes
                });    
            });
        },
    
        /* ---------------------------------------------
        Calendar
        --------------------------------------------- */
        datePicker: function() {
            if ($.isFunction($.fn.datetimepicker)) {            
                $('.date-picker').datetimepicker({
                    yearOffset: 0,
                    lang:'en',
                    timepicker: false,
                    format:'d/m/Y',
                    formatDate:'Y/m/d',
                    minDate: "1"
                });
                $('.time-picker').datetimepicker({
                    datepicker:false,
                    format:'H:i',
                    step:5
                });
            }
        },

        /* ---------------------------------------------
        Count To
        --------------------------------------------- */
        countto: function() {
            $('.count-data').countTo();
        },
        
        /* ---------------------------------------------
        Product Gallery
        --------------------------------------------- */
        produce_gallery: function() {
            var galleryThumb = $('.product-gallery-thumblist a'),
                    galleryPreview = $('.product-gallery-preview > li');
            galleryThumb.on('click', function(e) {
                var target = $(this).attr('href');
                galleryThumb.parent().removeClass('active');
                $(this).parent().addClass('active');
                galleryPreview.removeClass('current');
                $(target).addClass('current');
                e.preventDefault();
            });
        },
        /* ---------------------------------------------
         Home Version Grid Masonry
         --------------------------------------------- */
        grid_masonry: function() {
            var $container = $('.layout-masonry');
            $container.imagesLoaded(function () {
                $container.masonry({
                    itemSelector: '.col-md-4'
                });
            });     

            if ($('.layout-product').length > 0) {
                var container = $('.layout-product');
                container.imagesLoaded(function () {
                    container.masonry({
                        itemSelector: '.layout-product > [class*="col-"]',
                        columnWidth: '.grid',
                        percentPosition: true
                    });
                });
                $(window).on('resize', function() {
                    container.masonry('layout');
                });
            } 
        },
        /* ---------------------------------------------
         Home Version Grid Masonry
         --------------------------------------------- */
        cart_update: function() {
            $('.quantity').on('click', '.plus', function(e) {
                var $input = $(this).prev().prev('input.qty');
                var val = parseInt($input.val());
                $input.val(val + 1).change();
                return false; });
            $('.quantity').on('click', '.minus', function(e) {
                var $input = $(this).prev('input.qty');
                var val = parseInt($input.val());
                if (val > 0) { $input.val(val - 1).change(); }
                return false;
            });
        },
        /* ---------------------------------------------
         Livekitchen Facility
         --------------------------------------------- */
        livekitchen_facility: function() {  
            var item = 1;
            $('#livekitchen-facility').owlCarousel({
                rtl: check_rtl,
                center: false,
                items: item,
                autoplay: false,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                singleItem: true,
                loop: true,
                margin: 7,
                nav: true,
                dots: false,
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
            });            
            $('.menu-item-slider').owlCarousel({
                rtl: check_rtl,
                center: false,
                items: item,
                autoplay: false,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                singleItem: true,
                loop: false,
                margin: 7,
                nav: false,
                dots: true
            });            
            $('.our-features-item').owlCarousel({
                rtl: check_rtl,
                center: false,
                items: 3,
                autoplay: false,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                singleItem: true,
                loop: false,
                margin: 30,
                nav: true,
                dots: false,
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                responsive:{
                    0:{
                        items:1
                    },
                    500:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    800:{
                        items:2
                    },
                    1000:{
                        items:3
                    },
                    1200:{
                        items:3
                    },
                    1400:{
                        items:3
                    }
                }
            });
        },

        /* ---------------------------------------------
         Livekitchen Hospitality
         --------------------------------------------- */
        livekitchen_hospitality: function() {
            $('.livekitchen-hospitality').owlCarousel({
                rtl: check_rtl,
                center: false,
                items: 4,
                autoplay: false,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                singleItem: true,
                loop: true,
                margin: 30,
                nav: false,
                dots: false,
                responsive:{
                    0:{
                        items:1
                    },
                    500:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    800:{
                        items:2
                    },
                    1000:{
                        items:3
                    },
                    1200:{
                        items:4
                    },
                    1400:{
                        items:4
                    }
                }
            });   
            $('.livekitchen-hospitality').each(function() {
                var $this = $(this),
                    $next_element = $this.next().find('.next'),
                    $previous_element = $this.next().find('.prev');

                $next_element.on('click', function () {
                    $this.trigger('next.owl.carousel');
                });
                $previous_element.on('click', function () {
                    $this.trigger('prev.owl.carousel', [300]);
                });
            });   
        },

        /* ---------------------------------------------
         Livekitchen Single Room
         --------------------------------------------- */
        livekitchen_single_room: function() {
            //room single gallery
            var $sync1 = $(".shop-thumb-full"),
                $sync2 = $(".shop-thumb-list"),
                duration = 300;
            $sync1
                .owlCarousel({
                    rtl: check_rtl,
                    items: 1,
                    margin: 10,
                    nav : false,
                    owl2row: 'true',
                    owl2rowTarget: 'item'
                })
                .on('changed.owl.carousel', function (e) {
                    var syncedPosition = syncPosition(e.item.index);
                    if ( syncedPosition != "stayStill" ) {
                        $sync2.trigger('to.owl.carousel', [syncedPosition, duration, true]);
                    }
                });
            $sync2
                .owlCarousel({
                    rtl: check_rtl,
                    margin: 15,
                    items: 3,
                    nav: false,
                    center: false,
                    dots: false,
                    responsive:{
                        0:{
                            items:2
                        },
                        500:{
                            items:2
                        },
                        600:{
                            items:3
                        },
                        800:{
                            items:3
                        },
                        1000:{
                            items:3
                        },
                        1200:{
                            items:3
                        },
                        1400:{
                            items:3
                        },
                    }
                })
                .on('initialized.owl.carousel', function() {
                   addClassCurrent(0);
                })
                .on('click', '.owl-item', function () {
                    $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);

                });
                function addClassCurrent( index ) {
                    $sync2
                        .find(".owl-item.active")
                        .removeClass("current")
                        .eq( index )
                        .addClass("current");
                }
                addClassCurrent(0);
                function syncPosition( index ) {
                    addClassCurrent( index );
                    var itemsNo = $sync2.find(".owl-item").length;
                    var visibleItemsNo = $sync2.find(".owl-item.active").length;
                
                    if (itemsNo === visibleItemsNo) {
                        return "stayStill";
                    }
                    var visibleCurrentIndex = $sync2.find(".owl-item.active").index( $sync2.find(".owl-item.current") );
                    if (visibleCurrentIndex == 0 && index != 0) {
                        return index - 1;
                    }
                    if (visibleCurrentIndex == (visibleItemsNo - 1) && index != (itemsNo - 1)) {
                        return index - visibleItemsNo + 2;
                    }
                    return "stayStill";
                } 
        },
         
        /* ---------------------------------------------
         Page Gallery
         --------------------------------------------- */
        page_gallery: function() {
            var item = 4;
            $('.page-gallery-carousel').owlCarousel({
                rtl: check_rtl,
                center: false,
                items: item,
                autoplay: false,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                singleItem: true,
                loop: true,
                margin: 0,
                nav: false,
                dots: false,
                responsive:{
                    0:{
                        items:2
                    },
                    500:{
                        items:2
                    },
                    600:{
                        items:3
                    },
                    800:{
                        items:4
                    },
                    1000:{
                        items:4
                    },
                    1200:{
                        items:4
                    },
                    1400:{
                        items:5
                    },
                }
            });            
        },
         
        /* ---------------------------------------------
        Customer Reviews
         --------------------------------------------- */
        customer_reviews: function() {
            var item = 2;
            $('.customer-reviews').owlCarousel({
                rtl: check_rtl,
                center: false,
                items: item,
                autoplay: false,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                singleItem: true,
                loop: true,
                margin: 30,
                nav: false,
                dots: true,
                responsive:{
                    0:{
                        items:1
                    },
                    500:{
                        items:1
                    },
                    600:{
                        items:1
                    },
                    800:{
                        items:2
                    },
                    1000:{
                        items:2
                    },
                    1200:{
                        items:2
                    },
                    1400:{
                        items:2
                    },
                }
            });            
        },
        
        /* ---------------------------------------------
        Gallery Photo
        --------------------------------------------- */
        gallery_photo: function () {
            $('.gallery-item-content').each(function(){
                var $this = $(this);
                $this.imagesLoaded(function () {
                    $this.isotope({
                        filter: '*',
                        animationOptions: {
                            duration: 1000,
                            easing: 'linear',
                            queue: false,
                        }
                    });
                });
                var $filterMenu = $this.prev().find('.gallery-filter-menu li a');
                $filterMenu.on('click', function() {
                    var selector = $(this).attr('data-filter');
                        $this.isotope({ 
                            filter: selector,
                            animationOptions: {
                                duration: 1000,
                                easing: 'linear',
                                queue: false, 
                            }
                        });
                    $(this).parents('ul').find('li').removeClass('current-tab');
                    $(this).parent().addClass('current-tab');
                    return false;
                });
            });
        },
                
        /* ---------------------------------------------
         Widget Mobile fix
         --------------------------------------------- */
        widget_mobile: function () {
            function debouncer(func, timeout) {
                var timeoutID, timeout = timeout || 500;
                return function () {
                    var scope = this,
                        args = arguments;
                    clearTimeout(timeoutID);
                    timeoutID = setTimeout(function () {
                        func.apply(scope, Array.prototype.slice.call(args));
                    }, timeout);
                }
            }
            function resized() {
                var getWidgetTitle = $('.widget .widget-title');
                var getWidgetTitleContent;
                if ($(window).width() <= 991) {
                    getWidgetTitleContent = $('.widget .widget-title').parent().nextAll().hide();
                    getWidgetTitle.addClass('expand-margin');
                    getWidgetTitle.on('click', function(e) {
                        e.stopImmediatePropagation();
                        $(this).toggleClass('expand');
                        $(this).parent().nextAll().slideToggle();
                        return false;
                    });
                    getWidgetTitle.each(function(){
                        $(this).parent().addClass('mb-widget');
                    });
                } else {
                    getWidgetTitleContent = $('.widget .widget-title').parent().nextAll().show();
                    getWidgetTitle.removeClass('expand-margin');
                    getWidgetTitle.each(function(){
                        $(this).parent().removeClass('mb-widget');
                    });
                };
            }
            resized();

            var prevW = window.innerWidth || $(window).width();
            $(window).resize(debouncer(function (e) {
                var currentW = window.innerWidth || $(window).width();
                if (currentW != prevW) {
                    resized();
                }
                prevW = window.innerWidth || $(window).width();
            }));

            //Mobile Responsive
            $('.extend-btn .extend-icon').on('click', function(e) {
                e.preventDefault();
                $(this).parent().prev().toggleClass('mobile-extend');
                $(this).parent().toggleClass('extend-btn');
                $(this).toggleClass('up');
            });
        },

        /* ---------------------------------------------
         IPad Parallax Issue
        --------------------------------------------- */
        ipad_parallax: function() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream || /android/i.test(userAgent) || /windows phone/i.test(userAgent)) {
                $(".jarallax,.error-page-area").each(function(){
                    var $self = $(this);

                    var $getImage = $self.attr("data-jarallax");
                    var $objImage = $.parseJSON( $getImage );
                    
                    $self.css({
                        "background-image": "url("+ $objImage.imgSrc +")",
                        "background-size": "cover",
                        "background-repeat": "no-repeat",
                        "background-position": "center center"
                    });
                });
            }
        },
        
        /* ---------------------------------------------
         Maps
        --------------------------------------------- */
        maps: function() {
            if ($('#gmaps').length) {
                $(".gmaps").each(function() {
                    var $self = $(this),
                        $dataLat = $self.data("lat"),
                        $dataLong = $self.data("long"),
                        $dataImage = $self.data("img");
                        
                    var map;
                    map = new GMaps({
                        el: $self[0].className,
                        lat: $dataLat,
                        lng: $dataLong,
                        scrollwheel: false,
                        zoom: 10,
                        zoomControl: true,
                        panControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        overviewMapControl: false,
                        clickable: false
                    });
                    var image = $dataImage;

                    map.addMarker({
                        lat: 43.04446,
                        lng: -76.130791,
                        icon: image,
                        animation: google.maps.Animation.DROP,
                        verticalAlign: 'bottom',
                        horizontalAlign: 'center'
                    });
                    var styles = [{
                        stylers: [
                            { hue: "#BBE5C1" },
                            { saturation: -45 }
                        ]
                    }, {
                        featureType: 'landscape',
                        elementType: 'geometry',
                        stylers: [
                            { hue: '#FEFACD' },
                            { saturation: 50 },
                            { lightness: -10 }
                        ]
                    }, {
                        featureType: "road",
                        elementType: "geometry",
                        stylers: [
                            { hue: "#0090E5" },
                            { lightness: -35 },
                            { visibility: "simplified" }
                        ]
                    }, {
                        featureType: "road",
                        elementType: "labels",
                        stylers: [
                            { visibility: "off" }
                        ]
                    }];
                    map.setOptions({ styles: styles });
                });
            }
        },
        
        /* ---------------------------------------------
         Scroll Top
         --------------------------------------------- */
        scroll_top:function scrolltop() {
            $("body").append("<a href='#top' id='scroll-top' class='topbutton btn-hide'><span class='glyphicon glyphicon-menu-up'></span></a>");
            var $scrolltop = $('#scroll-top');
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > $(this).height()) {
                    $scrolltop
                        .addClass('btn-show')
                        .removeClass('btn-hide');
                } else {
                    $scrolltop
                        .addClass('btn-hide')
                        .removeClass('btn-show');
                }
            });
            $("a[href='#top']").on('click', function () {
                $("html, body").animate({
                    scrollTop: 0
                }, "normal");
                return false;
            });
        },
        /* ---------------------------------------------
         Mobile Select
        --------------------------------------------- */
        mobileSelect: function() {
            var $selectSelector = $(".blog-menu-mobile");
            $selectSelector.on("change", function (e) {
                var url = $(this).val();
                if($.isNumeric(url) === true) {
                    var $tabNav = $(".blog-nav-md li a");
                    $tabNav.eq(url).tab('show'); 
                } else {
                    window.location = url;
                }
            });

            var $selectSelector2 = $(".woocommerce-tab-menu-mobile");
            $selectSelector2.on("change", function (e) {
                var $tabNav = $(this).val();

                var $tabNavSelect = $(".wc-tabs li a");
                var $selectorId = $tabNavSelect.eq($tabNav - 1).attr('href');

                var $tabs_wrapper = $( '.woocommerce-tabs' );
                var $tabs         = $tabs_wrapper.find( '.wc-tabs, ul.tabs' );

                $tabNavSelect.find( 'li' ).removeClass( 'active' );
                $tabs_wrapper.find( '.wc-tab, .panel:not(.panel .panel)' ).hide();

                $tabNavSelect.closest( 'li' ).addClass( 'active' );
                $tabs_wrapper.find( $selectorId ).show();
            });
        },
        /* ---------------------------------------------
         Post Share
         --------------------------------------------- */
        postShare: function() {
            function windowPopup(url, width, height) {
                var left = (screen.width / 2) - (width / 2),
                    top = (screen.height / 2) - (height / 2);

                window.open(
                    url, "",
                    "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
                );
            }
            var $shareSelector = $(".customer.share");
            $shareSelector.on("click", function(e) {
                e.preventDefault();
                windowPopup($(this).attr("href"), 500, 300);
            });
        },
        
        /* ---------------------------------------------
         function initializ
         --------------------------------------------- */
        initializ: function() {
            livekitchenApp.preloader();
            livekitchenApp.header_search();           
            livekitchenApp.menu();           
            livekitchenApp.popup_window();  
            livekitchenApp.page_video();  
            livekitchenApp.coming_soon();
            livekitchenApp.datePicker();           
            livekitchenApp.countto();           
            livekitchenApp.produce_gallery(); 
            livekitchenApp.grid_masonry();          
            livekitchenApp.cart_update();          
            livekitchenApp.livekitchen_facility();
            livekitchenApp.livekitchen_hospitality();
            livekitchenApp.livekitchen_single_room();
            livekitchenApp.page_gallery();
            livekitchenApp.customer_reviews();
            livekitchenApp.gallery_photo();
            livekitchenApp.widget_mobile();
            livekitchenApp.ipad_parallax();
            livekitchenApp.maps();
            livekitchenApp.scroll_top();
            livekitchenApp.mobileSelect();
            livekitchenApp.postShare();
        }
    };
    
    /* ---------------------------------------------
     Document ready function
     --------------------------------------------- */
    $(function() {
        livekitchenApp.initializ();
    });

})(jQuery);
function installmentPurchase() {
    jQuery("form.cart").append('<input type="hidden" name="installment_purchase" value="yes" />');
    jQuery("form.cart").submit();
}

