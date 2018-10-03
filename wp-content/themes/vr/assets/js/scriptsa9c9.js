// text rotator plugin
!function(e){var t={animation:"dissolve",separator:",",speed:2e3};e.fx.step.textShadowBlur=function(t){e(t.elem).prop("textShadowBlur",t.now).css({textShadow:"0 0 "+Math.floor(t.now)+"px black"})};e.fn.textrotator=function(n){var r=e.extend({},t,n);return this.each(function(){var t=e(this);var n=[];e.each(t.text().split(r.separator),function(e,t){n.push(t)});t.text(n[0]);var i=function(){switch(r.animation){case"dissolve":t.animate({textShadowBlur:20,opacity:0},500,function(){s=e.inArray(t.text(),n);if(s+1==n.length)s=-1;t.text(n[s+1]).animate({textShadowBlur:0,opacity:1},500)});break;case"flip":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip").show().css({"-webkit-transform":" rotateY(-180deg)","-moz-transform":" rotateY(-180deg)","-o-transform":" rotateY(-180deg)",transform:" rotateY(-180deg)"});break;case"flipUp":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip up").show().css({"-webkit-transform":" rotateX(-180deg)","-moz-transform":" rotateX(-180deg)","-o-transform":" rotateX(-180deg)",transform:" rotateX(-180deg)"});break;case"flipCube":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube").show().css({"-webkit-transform":" rotateY(180deg)","-moz-transform":" rotateY(180deg)","-o-transform":" rotateY(180deg)",transform:" rotateY(180deg)"});break;case"flipCubeUp":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube up").show().css({"-webkit-transform":" rotateX(180deg)","-moz-transform":" rotateX(180deg)","-o-transform":" rotateX(180deg)",transform:" rotateX(180deg)"});break;case"spin":if(t.find(".rotating").length>0){t.html(t.find(".rotating").html())}s=e.inArray(t.text(),n);if(s+1==n.length)s=-1;t.wrapInner("<span class='rotating spin' />").find(".rotating").hide().text(n[s+1]).show().css({"-webkit-transform":" rotate(0) scale(1)","-moz-transform":"rotate(0) scale(1)","-o-transform":"rotate(0) scale(1)",transform:"rotate(0) scale(1)"});break;case"fade":t.fadeOut(r.speed,function(){s=e.inArray(t.text(),n);if(s+1==n.length)s=-1;t.text(n[s+1]).fadeIn(r.speed)});break}};setInterval(i,r.speed)})}}(window.jQuery)

//debug function
function debug(msg){
	console.log(msg);
}
function footerInit(){
	var footer = jQuery(".footer").clone();
	footer.addClass("visible");
	jQuery(".content > div.current_page > .post").append(footer);
	jQuery(".content > div.next_page > .post").append(footer);

}
jQuery(document).ready(function($){

	//footerInit();

	var anim_in = "pt-page-rotateCubeLeftIn";
	var anim_out = "pt-page-rotateCubeLeftOut";

	var anim_in_inv = "pt-page-rotateCubeRightIn";
	var anim_out_inv = "pt-page-rotateCubeRightOut";

	var curr_page_loaded = true;
	var next_page_loaded = false;

	var next_page;

	//description rotator
	$(".description .rotate").textrotator({
		animation: "dissolve",
		speed: 4500,
		separator: ",,"
	});

	if (!$(".portfolio_grid").hasClass("done")){

		$(".portfolio_grid").mixitup();

		$('.portfolio_grid > li ').each( function() { $(this).hoverdir(); } );
		
		$(".portfolio_grid").magnificPopup({
	        delegate: 'a',
	        type: 'inline',
	        removalDelay: 300,
	        mainClass: 'my-mfp-slide-bottom'
	    });

	    $(".portfolio_grid").addClass("done");
	}

	$(".vr_gmap").each(function(){
		if (!$(this).hasClass("done")){
			var latitude = $(this).attr("data-latitude");
			var longitude = $(this).attr("data-longitude");
			var map_zoom = $(this).attr("data-zoom");

			var tt = [
				latitude, longitude
			];

			new Maplace({
				map_div : $(this),
				map_options: {
					mapTypeId: google.maps.MapTypeId.HYBRID,
					set_center: tt,
					zoom: parseInt(map_zoom)
				}
			}).Load();

			$(this).addClass("done");
		}
	});

	//portfolio type selector
    $(".portfolio_grid li").on('click', function(){
        var popup = $("#portfolio_popup");
        var popup_details = $(this).find(".popup_information");

        if (popup_details.find(".top").hasClass("video")){
	        var video_url = popup_details.find(".top .video_url");
	        debug(video_url.html());
	        popup_details.find(".top iframe").attr("src", video_url.html());
	        popup_details.find(".top .video_url").remove();
	    }

        popup.html(popup_details.clone());
        popup.append('<button title="Close (Esc)" type="button" class="mfp-close fa fa-times"></button>');
    });

    //plus social icon click
	$(".social_icons a.plus").click(function(){
		if ($(this).next().hasClass("visible")){
			$(this).next().slideUp(function(){
				$(this).removeClass("visible");
			});
		}else{
			$(this).next().slideDown(function(){
				$(this).addClass("visible");
			});
		}
		return false;
	});


	//portfolio type selector
	$('.quickview_portfolio_item').magnificPopup({
	    image: {
	      markup: 	'<div class="quickview_content">'+
	                	'<div class="row">'+
		                    '<div class="col-md-12 top">'+
		                        '<div class="mfp-img item_image"></div>'+
		                        '<iframe class="item_video" width="560" height="315" src="" style="border:none;" allowfullscreen></iframe>'+
		                    '</div>'+
		                    '<div class="col-md-12 bottom">'+
		                        '<h3 class="title"></h3>'+
					            '<ul class="details">'+
					            	'<li>Client: <span class="client_name"></span></li>'+
					            	'<li>Date: <span class="project_date"></li>'+
					            '</ul>'+
					            '<div class="project_description"></div>'+
					            '<div class="line">'+
					                '<a href="#" class="project_link">Go to project</a>'+
					                '<div class="share">'+
					                    '<span class="project_share_text">or share it</span>'+
					                    '<a href="#" class="fa fa-twitter twitter_link"></a>'+
					                    '<a href="#" class="fa fa-facebook facebook_link"></a>'+
					                    '<a href="#" class="fa fa-youtube youtube_link"></a>'+
					                    '<div class="clear"></div>'+
					               '</div>'+
					            '</div>'+
		                    '</div>'+
	                  	'</div>'+
	              	'</div>', 
	      titleSrc: 'title',
	      verticalFit: true
	    },
	    type: 'image',
	    callbacks: {
	        open: function() {
	            var instance = $.magnificPopup.instance;
	            var current_item = instance.st.el;
	            var title = current_item.attr('data-title');
	            var client_name = current_item.attr('data-client-name');
	            var date = current_item.attr('data-date');
	            var description = current_item.attr('data-description');
	            var link = current_item.attr('data-link');
	            var link_text = current_item.attr('data-link-text');
	            var share_text = current_item.attr('data-share-text');
	            var twitter_url = current_item.attr('data-twitter-url');
	            var facebook_url = current_item.attr('data-facebook-url');
	            var youtube_url = current_item.attr('data-youtube-url');
	            var video_url = current_item.attr('data-video-url');
	            $('.quickview_content .title').text(title);
	            $('.quickview_content .client_name').text(client_name);
	            $('.quickview_content .project_date').text(date);
	            $('.quickview_content .project_description').html(description);
	            $('.quickview_content .project_link').attr("src", link);
	            $('.quickview_content .project_link').text(link_text);
	            $('.quickview_content .project_share_text').text(share_text);
	            if (twitter_url != undefined){
	            	$('.quickview_content .twitter_link').attr("href", twitter_url);
	        	}else{
	        		$('.quickview_content .twitter_link').hide();
	        	}
	        	if (facebook_url != undefined){
	            	$('.quickview_content .facebook_link').attr("href", facebook_url);
	        	}else{
	        		$('.quickview_content .facebook_link').hide();
	        	}
	        	if (youtube_url != undefined){
	            	$('.quickview_content .youtube_link').attr("href", youtube_url);
	        	}else{
	        		$('.quickview_content .youtube_link').hide();
	        	}

	            if (current_item.is(".is_video")){
	            	$('.quickview_content .item_image').css("display", "none !important");
	            	$('.quickview_content .item_video').css("display", "block !important");
            	  	$('.quickview_content .item_video').attr("src", video_url);
	            }else{
	            	$('.quickview_content .item_image').css("display", "block !important");
	            	$('.quickview_content .item_video').css("display", "none !important");
	            }
	        }
	    }
	});

	//plus social icon hover
	$(".social_icons li.more_social_icons_li").hover(
		function(){
			if (!$(this).find(".more_social_icons").hasClass("visible")){
				$(this).find(".more_social_icons").slideDown(function(){
					$(this).addClass("visible");
				});
			}
		},
		function(){
			if ($(this).find(".more_social_icons").hasClass("visible")){
				$(this).find(".more_social_icons").slideUp(function(){
					$(this).removeClass("visible");					
				});
			}
		}
	);

	$(".alert_close_btn").click(function(){
		$(this).parent().fadeOut();
		return false;
	});

	$(".sc_tab_select li a").click(function(){

		var tab = $(this).attr("href");
		tab = tab.replace("#", "");

		$(this).parents(".sc_tab_select").find("li a.active").removeClass("active");
		$(this).parents(".sc_tab_select").find('li a[href="#'+tab+'"]').addClass("active");

		$(this).parents(".sc_tab_select").next().find("li.active").removeClass("active");
		$(this).parents(".sc_tab_select").next().find("li#"+tab).addClass("active");

		return false;
	});


	$(".tab_select li").click(function(){
		var current = $(this).parents(".tabs").find(".tab.active");

		$(this).parents(".tabs").find(".tab_select li.active").removeClass("active");
		$(this).addClass("active");

		var id = $(this).attr("data-id");

		if (current.hasClass("tab_"+id))
			return false;

		$(this).parents(".tabs").find(".tab.active").slideUp("medium");
		$(this).parents(".tabs").find(".tab.active").removeClass("active");

		$(this).parents(".tabs").find(".tab.tab_"+id).slideDown("medium");
		$(this).parents(".tabs").find(".tab.tab_"+id).addClass("active");

	});

	$(".accordion .atitle").click(function(){

		if ($(this).hasClass("active"))
			return false;

		$(this).parents(".accordion").find(".atitle.active i").removeClass("fa-angle-up").addClass("fa-angle-down");
		$(this).parents(".accordion").find(".atitle.active").next().slideUp();
		$(this).parents(".accordion").find(".atitle.active").removeClass("active");

		$(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-up");
		$(this).next().slideDown();
		$(this).addClass("active");

	});

	//testimonials slide right button
	$(".testimonials_btns .left_btn, .testimonials_btns .right_btn").click(function(){
		if ($(this).hasClass("left_btn")){
			$('.testimonials .cycle-slideshow').cycle('prev');
		}else if ($(this).hasClass("right_btn")){
			$('.testimonials .cycle-slideshow').cycle('next');
		}
	});

	$(".post .media .btns .left_btn, .post .media .btns .right_btn").click(function(){
		if ($(this).hasClass("left_btn")){
			$(this).parent().next().cycle('prev');
		}else if ($(this).hasClass("right_btn")){
			$(this).parent().next().cycle('next');
		}
	});

	//tags menu clicker
	$(".tabs_menu a").click(function(){
		var active_tab_box = $(".tabs_menu a.active").attr("href");
		var tab_box = $(this).attr("href");

		if (active_tab_box == tab_box)
			return false;

		$(".tabs_menu a.active").removeClass("active");
		$(this).addClass("active");

		$(".tabs_body > div.active").slideUp("fast", function(){
			$(this).removeClass("active");
		});
		$(".tabs_body > div"+tab_box).slideDown("fast", function(){
			$(this).addClass("active");
		});

		return false;

	});
	
	//blog posts show when visible
	var total_items = 1;//1rst blog post
	var first_blog_view = false;
	$(window).scroll(function(){

		if (!$(".blog_posts").hasClass("animated")){
			
			$(".blog_posts > .post").each(function(i){

				if($(this).offset().top + 160 < $(window).scrollTop() + $(window).outerHeight() && !$(this).hasClass("animated")) {
					//handle video iframe
					if ($(this).find(".media").hasClass("video")){
						var video_url = $(this).find(".media .video_url");
						$(this).find(".media iframe").attr("src", video_url.html());
						$(this).find(".media .video_url").remove();
					}

					$(this).addClass("animate animated flipInX");
					total_items++;
					if (total_items == $(".blog_posts > .post").length){
						first_blog_view = true;

						setTimeout(function(){
							first_blog_view = false;//hack for last item in blog in order to not stop the animation
						}, 900);
					}
				}

			});

			if (total_items == $(".blog_posts > .post").length && first_blog_view == false){
				$(".blog_posts").addClass("animated");
				$(".blog_posts > .post").removeClass("animated");
				$(".blog_posts > .post").removeClass("flipInX");
				$(".blog_posts > .post").addClass("fullOpacity");
			}

		}

	});
	
	//page load animations
	setTimeout(function(){
		$(".loading_overlay").fadeOut("fast", function(){

			$("#wrapper").animate({
				"opacity" : "1"
			}, 200);
			if ($("#wrapper").width() != 300 && $("#wrapper").width() != 470){
				$("#wrapper").addClass("animated fadeInDown");
			}

			$(".theme_configs").addClass("visible");
			
			setTimeout(function(){
				$(".main_menu").animate({
					"opacity" : "1"
				}, 150);
				$(".main_menu").addClass("animated fadeInLeft");

				$(".social_icons").animate({
					"opacity" : "1"
				}, 150);
				$(".social_icons").addClass("animated fadeInRight");

				$("#wrapper").removeClass("animated fadeInDown");

				$(".vr_column").each(function(){
					if ($(this).attr("data-animation") != "")
						$(this).addClass("fullOpacity animated "+$(this).attr("data-animation"));
				});


				if (!$(".sidebar").hasClass("animated")){
					$(".sidebar").addClass("visible animated fadeInRight");
				}

				if ($(".skills").is(":visible")){
					if (!$(".skills").hasClass("animated")){
						$(".skills").addClass("animated");

						$(".skills .section .item .bar_outer .bar_inner").each(function(e){
							var width = $(this).attr("data-width");
							width = (width < 9) ? 12 : ((width < 15) ? 15 : width);
							$(this).animate({
								'width' : width+"%"
							}, 600, function(){
								$(this).find(".text").fadeIn();
							});
						});
					}
				}
			}, 300);
		});
	}, 750);


	$(".responsive_menu_btn").click(function(){

		if ($(this).next().is(":visible")){
			$(this).next().slideUp();
		}else{
			$(this).next().slideDown();
		}

		return false;
	});

	$(".theme_configs .button").click(function(){
		var box = $(this).parent();
		if (box.hasClass("hidden")){
			box.animate({
				"left" : "0px"
			}, 300);
			box.removeClass("hidden");
			$(this).removeClass("fa-angle-right").addClass("fa-angle-left");
		}else{
			box.animate({
				"left" : "-153px"
			}, 300);
			box.addClass("hidden");
			$(this).removeClass("fa-angle-left").addClass("fa-angle-right");
		}
	});

	$(".theme_configs .box.themes > div").click(function(){
		var current_theme = $("body").attr("class");

		var selected_theme = $(this).attr("class");

		if (current_theme == selected_theme)
			return false;

		$(".theme_configs .box.themes > div.active").removeClass("active");
		$("body").attr("class", selected_theme);
		$(this).addClass("active");

	});

	$(".theme_configs .patterns img").click(function(){
		var pattern = $(this).attr("src");

		$("body").attr("style", 'background: #F2F2F2 url('+pattern+');');

	});

	$(".theme_configs .bg img").click(function(){
		var bg = $(this).attr("src");

		$("body").attr("style", 'background: url('+bg+') center 0 no-repeat; background-size: cover; background-attachment: fixed;');

	});


});