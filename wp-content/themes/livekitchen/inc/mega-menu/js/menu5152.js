jQuery(document).ready (function ($) {
	//category mega menu
	$('.cats-mega-wrap ul.sub-menu li').mouseenter(function() {
	    var id = $(this).attr('id');
	    var id = id.split('-');
	    $(this).parent().find('li').removeClass('active');
	    $(this).addClass('active');
	    $(this).parent().next('.subcat').find('.sh-cat-latest').hide();
	    $(this).parent().next('.subcat').find('#mn-latest-'+id[2]).show();
	});

	// mega menu code
	$('.sh_mega_cats .cats-mega-inner > ul > li').on('mouseenter', function(e) {
	    e.preventDefault();
	    var t = $(this);
	    var tid = t.attr('id');
	    tid = tid.split('-');
	    tid = tid[2];
	    var d = t.parent().next('.subcat').find('#mn-latest-'+tid);
	    var dest = t.parent().next('.subcat').find('#mn-latest-'+tid+' > ul');
	    var id = d.data('id');
	    var object = d.data('object');
	    var layout = d.data('layout');
	    if (dest.children().length === 0) {
			jQuery.ajax({
			    type: "post",
			    url: shAjaxL.url,
			    dataType: 'html',
			    data: "action=mmcl&nonce="+shAjaxL.nonce+"&id="+id+"&object="+object+"&layout="+layout,
			    beforeSend: function() {
					dest.addClass('loading');
			    },
			    success: function(data){
				dest.removeClass('loading');
				dest.html(data);
			    }
			});
    	}
	});

	//For safari Browser Detection
	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) { 
	    $('<style class="safari-menu">.dd-effect-fade ul.main-menu li:not(.sh_mega):not(.sh_mega_cats) > ul.sub-menu,#navigation.dd-effect-fade .main-menu li.sh_mega.menu-item-depth-0 > .sh_mega_wrap,#navigation.dd-effect-fade .main-menu li.menu-item-depth-0 > .cats-mega-wrap,.topbar .top-nav > li ul.sub-menu,.dd-effect-slide ul.main-menu li:not(.sh_mega):not(.sh_mega_cats) > ul.sub-menu,#navigation.dd-effect-slide .main-menu li.sh_mega.menu-item-depth-0 > .sh_mega_wrap,#navigation.dd-effect-slide .main-menu li.menu-item-depth-0 > .cats-mega-wrap,.dd-effect-skew ul.main-menu li:not(.sh_mega):not(.sh_mega_cats) > ul.sub-menu,#navigation.dd-effect-skew .main-menu li.sh_mega.menu-item-depth-0 > .sh_mega_wrap,#navigation.dd-effect-skew .main-menu li.menu-item-depth-0 > .cats-mega-wrap{display:none;}.dd-effect-fade ul.main-menu li:not(.sh_mega):not(.sh_mega_cats):hover > ul.sub-menu,#navigation.dd-effect-fade .main-menu li.sh_mega.menu-item-depth-0:hover .sh_mega_wrap,#navigation.dd-effect-fade .main-menu li.menu-item-depth-0:hover > .cats-mega-wrap,.topbar .top-nav li:hover > ul.sub-menu,.dd-effect-slide ul.main-menu li:not(.sh_mega):not(.sh_mega_cats):hover > ul.sub-menu,#navigation.dd-effect-slide .main-menu li.sh_mega.menu-item-depth-0:hover .sh_mega_wrap,#navigation.dd-effect-slide .main-menu li.menu-item-depth-0:hover > .cats-mega-wrap,.dd-effect-skew ul.main-menu li:not(.sh_mega):not(.sh_mega_cats):hover > ul.sub-menu,#navigation.dd-effect-skew .main-menu li.sh_mega.menu-item-depth-0:hover .sh_mega_wrap,#navigation.dd-effect-skew .main-menu li.menu-item-depth-0:hover > .cats-mega-wrap{display:block;visibility:visible}</style>').appendTo('head');
	}
});
