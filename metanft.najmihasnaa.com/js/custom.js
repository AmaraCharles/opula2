/*global $, window, WOW*/

$(function () {
    
    "use strict";
    
    var win = $(window),
        htmlBody = $("html, body"),
        scrollToTop = $(".scroll-top"),
        header = $(".header");

    /*========== Color Switcher  ==========*/
     $(".switch-button").on("click", function () {
        $(this).addClass("hide");
        $(".switched-styles").addClass("show");
    });
    
    $(".switched-styles .hide-button").on("click", function () {
        $(this).parent().removeClass("show");
        $(".switch-button").removeClass("hide");
    });
    
    $(".switched-styles ul li").on("click", function () {
        $("link[href*='color']").attr("href", "css/colors/" + $(this).data('color') + ".css");
    });

    /*========== Add Class To Main Nav  ==========*/
    $(".header .header-inner .mobile-button").on("click", function () {
        $(this).toggleClass("active");
        $(".header .header-inner .main-nav").toggleClass("slidedown");
    });

    /*========== Slide Toggle Sub Menu  ==========*/
    $(".header .header-inner .main-nav .menu li a").on("click", function () {
        $(".header .header-inner .main-nav .sub-menu").not($(this).parent().find(".sub-menu")).slideUp();
        $(this).parent().find(".sub-menu").slideToggle();
    });

    /*========== Add Class To Main Nav Link  ==========*/
    $(".header .header-inner .main-nav .menu li.menu-item-has-children > a").on("click", function () {
        $(".header .header-inner .main-nav .menu li.menu-item-has-children > a").not($(this)).removeClass("slidedown");
        $(this).toggleClass("slidedown");
    });
    
    /*========== Navbar Animation On Scroll  ==========*/
    function activeNavbar() {
        
        if (win.scrollTop() > 30) {
            header.addClass("active-nav");
        } else {
            header.removeClass("active-nav");
        }

        if (win.scrollTop() > 150) {
            header.addClass("nav-effect");
        } else {
            header.removeClass("nav-effect");
        }
        
    }
    
    activeNavbar();
    
    win.on("scroll", function () {
        activeNavbar();
    });
    
    /*========== Mobile Menu  ==========*/
    $(".header-inner .menu-toggle").on("click", function () {
        headerInner.toggleClass("menu-active");
    });

    // ========================================================================= //
  //  NFTs Filter
  // ========================================================================= //

	$(".discover-nfts .nfts-filter .filter-wrap .filter button").on("click", function () {
        $(this).addClass("active").siblings("button").removeClass("active");
		var dataFilter = $(this).attr('data-filter');
        $('.grid').isotope({
            filter: dataFilter
        });
    });
    
    /*========== Fire wow js Plugin  ==========*/
    new WOW().init();	
	
	/*========== Start Owl Carousel Js Slider  ==========*/
    if ($('.home2 .owl-carousel')[0]) {
        
        $(".home2 .owl-carousel").owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            smartSpeed: 1300,
            autoplay: 2000,
            loop: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            mouseDrag: false,
            touchDrag: false,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });
    }
	
    $(".home2 .owl-carousel").on("translate.owl.carousel", function () {
        $(".home2 .owl-item h1").removeClass("animated fadeInUp").css("opacity", "0");
        $(".home2 .owl-item p").removeClass("animated fadeInDown").css("opacity", "0");
        $(".home2 .owl-item .my-btn").removeClass("animated fadeInDown").css("opacity", "0");
    });

    $(".home2 .owl-carousel").on("translated.owl.carousel", function () {
        $(".home2 .owl-item h1").addClass("animated fadeInUp").css("opacity", "1");
        $(".home2 .owl-item p").addClass("animated fadeInDown").css("opacity", "1");
        $(".home2 .owl-item .my-btn").addClass("animated fadeInDown").css("opacity", "1");
    });
	
	/*========== Ajax Contact Form  ==========*/
	$('.contact-form').on("submit", function () {
		
		var myForm = $(this),
			data = {};
		
		myForm.find('[name]').each(function() {
			
			var that = $(this),
				name = that.attr('name'),
				value = that.val();
			
			data[name] = value;
			
		});
		
		$.ajax({
			
			url: myForm.attr('action'),
			type: myForm.attr('method'),
			data: data,
			success: function (response) {
				
				if (response == "success") {
								
					$(".contact-form").find(".form-message").addClass("success");
					$(".form-message span").text("Message Sent!");
					
				} else {
					
					$(".contact-form").find(".form-message").addClass("error");
					$(".form-message span").text("Error Sending!");
					
				}
			}
			
		});
		
		return false;
		
	});
	
	/*========== Scroll To Top  ==========*/
    function scrollUp() {
        if (win.scrollTop() >= 1100) {
            scrollToTop.addClass("active");
        } else {
            scrollToTop.removeClass("active");
        }
    }
    
    scrollUp();
    
    win.on("scroll", function () {
        scrollUp();
    });
    
    scrollToTop.on("click", function (e) {
        e.preventDefault();
        htmlBody.animate({
            scrollTop: 0
        }, 800);
    });
	
});