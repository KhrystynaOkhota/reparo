var _functions = {}, winWidth, shareButton;

jQuery(function ($) {
    var isTouchScreen = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
    if (isTouchScreen)
        $('html').addClass('touch-screen');
    var winScr, winHeight, is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
        is_IE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent),
        is_Chrome = navigator.userAgent.indexOf('Chrome') >= 0 && navigator.userAgent.indexOf('Edge') < 0;
    winWidth = $(window).width();
    winHeight = $(window).height();
    if (is_Mac) {
        jQuery('html').addClass('mac');
    }
    if (is_IE) {
        jQuery('html').addClass('ie');
    }
    if (is_Chrome) {
        jQuery('html').addClass('chrome');
    }

    //popup
    let popupTop = 0;
    _functions.removeScroll = function () {
        popupTop = $(window).scrollTop();
        jQuery('html').css({
            "position": "fixed",
            "top": -$(window).scrollTop(),
            "width": "100%"
        });
    }
    _functions.addScroll = function () {

        jQuery('html').css({
            "position": "static"
        });
        window.scroll(0, popupTop);
    }

    _functions.openPopup = function (popup) {

        jQuery('.popup-content').removeClass('active');

        // $('.popup-content').removeClass('animate-away').addClass('animate-in');

        jQuery(popup + ', .popup-wrapper').addClass('active');
        _functions.removeScroll();
    };

    _functions.closePopup = function () {
        jQuery('.popup-wrapper, .popup-content').removeClass('active');
        _functions.addScroll();
    };

    $(document).on('click', '.open-popup', function (e) {
        e.preventDefault();
        _functions.openPopup('.popup-content[data-rel="' + $(this).data('rel') + '"]');
    });

    $(document).on('click', '.popup-wrapper .btn-close, .popup-wrapper .layer-close, .popup-wrapper .btn-back', function (e) {
        e.preventDefault();
        _functions.closePopup();
    });


    /* Function on page scroll */
    $(window).on('scroll', function () {
        _functions.scrollCall();
    });


    _functions.scrollCall = function () {
        winScr = $(window).scrollTop();
        if (winScr > 10) {
            jQuery('header').addClass('scrolled');
        } else {
            jQuery('header').removeClass('scrolled');
        }
    }
    _functions.scrollCall();


    // search
    $(document).on("click", ".js-open-search", function () {


        jQuery(".h-search").addClass("active");
        jQuery("html").removeClass("open-menu open-submenu");
        jQuery(`.h-sub-menu, .h-link-subnav`).removeClass("active");
        setTimeout(() => {
            jQuery(".autocomplete-product").focus();
        }, 10);
    });

    jQuery(document).on("click", ".js-close-search", function () {
        jQuery(".h-search, .h-search-results").removeClass("active");
        jQuery(".h-search input").val("");
    });
    $(document).on("click", ".h-overlay", function () {
        jQuery("html").removeClass("overflow-menu open-menu open-submenu");
        jQuery(".h-search").removeClass("active");
        jQuery(".h-search input").val("");
    });

});

function scrollAnime() {
    if (jQuery('.animation').length) {
        jQuery('.animation').not('.animated').each(function () {
            var th = jQuery(this);
            if (jQuery(window).width() < 768) {
                if (jQuery(window).scrollTop() >= th.offset().top - (jQuery(window).height() * 0.95)) {
                    th.addClass('animated');
                }
            } else {
                if (jQuery(window).scrollTop() >= th.offset().top - (jQuery(window).height() * 0.85)) {
                    th.addClass('animated');
                }
            }
        });
    }
}

scrollAnime();
jQuery(window).on('scroll', function () {
    scrollAnime();
});

// =============================
// BURGER
// =============================
jQuery(function () {
    jQuery(".burger__wrap").on("click", function () {
        jQuery(this).toggleClass("active"),
            jQuery(".navbar").toggleClass("is-visible")
    })

    _functions.scrollWidth = function () {
        let scrWidth = jQuery(window).outerWidth() - jQuery('body').innerWidth();
        jQuery('body,  .h-menu-toggle, .h-search-wrapp').css({
            "paddingRight": `${scrWidth}px`
        });
    }
    // Open menu
    jQuery(document).on('click', '.h-burger', function () {
        _functions.scrollWidth();
        jQuery('html').toggleClass('overflow-menu');
        jQuery(this).closest('header').toggleClass('open-menu');
    });


});


// =============================
// ACCORDEON
// =============================

jQuery(document).on('click', '.accordion-title', function () {
    var accordeon = jQuery(this).closest('.accordeon');
    accordeon.find('.accordion-title.active').not(this).removeClass('active').next().slideUp();
    jQuery(this).toggleClass('active').next().slideToggle();
});


// =============================
// SumoSelect
// =============================

if (jQuery('.select-box').length) {

    jQuery('.default').SumoSelect();
};


// =============================
// PLAY AND STOP VIDEO
// =============================

jQuery(document).on('click', '.btn-play', function () {
    let videoItem = jQuery(this).closest('.video-with-control').find('video').get(0);

    if (videoItem.paused) {
        videoItem.play();
        jQuery(this).closest('.video-full').find('video').attr('controls', '');
        jQuery(this).closest('.btn-play').addClass('hide');
    } else {
        videoItem.pause();
        jQuery(this).closest('.video-full').find('video').removeAttr('controls');
        jQuery(this).closest('.btn-play').removeClass('hide');
    }
});
// about page
jQuery('.preload__btn').on('click', function () {
    jQuery(this).parents(".preload-entry").find(".preload").css({
        'z-index': -1,
        'opacity': 0
    });
    jQuery(this).parents(".preload-entry").find("video").css({
        "display": "block"
    });

    var video = $(this).parents(".preload-entry").find("video")[0];

    console.log(video.paused);
    if (video.paused === false) {
        $(this).parents(".preload-entry").find('.--pause').removeClass("d-block").addClass("d-none");
        $(this).parents(".preload-entry").find('.--play').removeClass("d-none").addClass("d-block");
        video.pause();
    } else {
        video.play();
        $(this).parents(".preload-entry").find('.--play').removeClass("d-block").addClass("d-none");
        $(this).parents(".preload-entry").find('.--pause').removeClass("d-none").addClass("d-block");
    }
});

// =============================
// FILTER
// =============================

jQuery(document).on("click", ".fl-title", function () {
    jQuery(this).toggleClass("is-active");
    //  $(".fl-menu-item").removeClass("is-open");
    jQuery(this).closest(".fl-menu-item").toggleClass("is-open");
    jQuery(this).closest(".fl-menu-item").find(".fl-toggle").first().slideToggle(300);
});
//open filters on mobile
jQuery(document).on("click", ".btn-filter", function () {
    jQuery("body,html").toggleClass("overflow-hidden");
    jQuery(this).toggleClass("is-open");
    jQuery(".fl-menu__wrap").toggleClass("is-open");
    jQuery(".fl-menu__overlay").toggleClass("is-active");
});
jQuery(document).on("click", ".fl-menu__overlay, .fl-menu__close", function () {
    jQuery(this).hasClass("is-active")
        ? jQuery(this).removeClass("is-active")
        : jQuery(this).addClass("is-active");

    jQuery(".fl-menu__wrap").removeClass("is-open"),
        jQuery("body,html").toggleClass("overflow-hidden");

});

// =============================
// LIGHTGALLERY
// =============================


// =============================
// TAB
// =============================
const tabs = document.querySelectorAll(".tab");

function tabify(tab) {
    const tabList = tab.querySelector(".tab__list");

    if (tabList) {
        const tabItems = [...tabList.children];
        const tabContent = tab.querySelector(".tab__content");
        const tabContentItems = [...tabContent.children];
        let tabIndex = 0;

        tabIndex = tabItems.findIndex((item, index) => {
            return [...item.classList].indexOf("is--active") > -1;
        });

        tabIndex > -1 ? (tabIndex = tabIndex) : (tabIndex = 0);

        function setTab(index) {
            tabItems.forEach((x, index) => x.classList.remove("is--active"));
            tabContentItems.forEach((x, index) => x.classList.remove("is--active"));

            tabItems[index].classList.add("is--active");
            tabContentItems[index].classList.add("is--active");
        }

        tabItems.forEach((x, index) =>
            x.addEventListener("click", () => setTab(index))
        );
        setTab(tabIndex);
        tab.querySelectorAll(".tab").forEach((tabContent) => tabify(tabContent));
    }
}

tabs.forEach(tabify);

// =============================
// OPEN SUBMENU
// =============================

jQuery(document).on("click", ".menu-item-has-children > a", function (e) {
    e.preventDefault();
    jQuery(this).closest(".menu-item").find(".sub-menu").first().slideToggle(300);
});

// =============================
// PRICE
// =============================


if (jQuery('#slider').length) {
    jQuery("#slider").slider({
        range: true,
        min: 0,
        max: 7000,
        values: [8, 6666],
        slide: function (event, ui) {
            jQuery(".from").val(ui.values[0]);
            jQuery(".to").val(ui.values[1]);
        }
    });
};