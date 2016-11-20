/* global define */
define([
    'scope',
    'application/app',
    'client',
    'jquery',
    'imagesloaded',
    'skrollr',
    'easing',
    'application/routers/AppRouter',
    'modal'
], function (scope, app, client, $, imagesloaded, skrollr) {
    'use strict';

    var Default = scope.register('layouts.Default', client.views.View.extend({
        template: 'layouts/default',
        regions: {
            'content': '#content'
        },
        behaviors: {},
        ui: {
            'profile': '.profile',
            'viewer': '.viewer',
            'sidebar': '.sidebar'
        },
        events: {
            'click .profile-link': 'profileMenu',
            'click .topbar__menubutton--login': 'openMenu',
            'click .menu__close--link': 'closeMenu',
            'click .menu__link': 'activeMenu',
            'click .back-top': 'backTop'
        },
        backTop: function () {
            $('body').stop(true, true).animate({scrollTop :0}, 600, 'easeOutQuad');
        },
        activeMenu: function (e){
            window.scrollTo(0,0);
            this.closeMenu();

            var el = $(e.currentTarget);

            if(el.attr('target') != '_blank') {
                $('.menu__link').removeClass('active');

                el.addClass('active');
            }
        },
        openMenu: function (e) {
            var me = this,
                el = $(e.currentTarget);

            $('.menu').animate({opacity: 1, filter:1, right: 0}, 400, 'easeOutQuad', function () {
                
            });
        },
        closeMenu: function (e) {
            var me = this;
                
            if (e) {
                var el = $(e.currentTarget);

                if (el.hasClass('menu__link')) {
                    e.preventDefault();
                    var callback = function (){
                        window.location = $(el).attr('href');
                    };
                }
            }
            $('.menu').animate({opacity: 0, filter:0, right: '-300rem'}, 400, 'easeOutQuad', function () {
                if (callback) callback();
            });
        },
        profileMenu: function(){
            var me=this;

            if (me.ui.viewer.is(':hidden')){
                me.ui.viewer.fadeIn('fast');                
            } else {
                me.ui.viewer.fadeOut('fast');
            }
        },
        initialize: function(){},
        resetAnimation:function () {
            skrollr.init().destroy();
            $('body').stop(true, true).animate({scrollTop :0}, 400, 'easeOutQuad');
            $('#loader').stop(true, true).show(0);
        },
        initAnimations:function($page){
            this.resetAnimation();

            $('.topbar').animate({opacity: 1, filter:1, top: 0}, 800, 'easeInOutBack', function () {
                $(this).addClass('topbar__boder--top');
            });
            $('#main').imagesLoaded()
                .always( function( instance ) {
                    $('#loader').slideUp('fast', function(){
                        $page();           
                    });
                });
        },
        modal: function (url, args, callback) {
            var options = {
                afterClose: function() {
                    if (callback) callback();
                },
                afterShow: function () {
                    $('.fancybox-inner').css({
                        'overflow': 'visible'
                    });
                },
                autoSize: false,
                beforeShow: function () {
                    $('.fancybox-skin').css({
                        //'border-radius': 0
                    });
                },
                closeClick: false,
                closeEffect: 'fade', // fade/elastic
                fitToView: true, // if set to true, fancyBox is resized to fit inside viewport before opening
                height: 480,
                helpers: {
                    overlay : true,
                    css: {}
                },
                href: url,
                keys: {
                    next: {
                        13: 'left', // enter
                        34: 'up',   // page down
                        39: 'left', // right arrow
                        40: 'up'    // down arrow
                    },
                    prev: {
                        8: 'right',  // backspace
                        33: 'down',   // page up
                        37: 'right',  // left arrow
                        38: 'down'    // up arrow
                    },
                    close: [27], // escape key
                    play: [32], // space - start/stop slideshow
                    toggle: [70]  // letter "f" - toggle fullscreen
                },
                margin: 0,
                openEffect: 'fade', // fade/elastic
                padding: 0,
                topRatio: 0.3,
                swf: {
                    wmode: 'transparent',
                    allowfullscreen: 'true',
                    allowscriptaccess: 'always'
                },
                tpl: {
                    wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                    image: '<img class="fancybox-image" src="{href}" alt="">',
                    error: '<p class="fancybox-error">O conteúdo solicitado não pode ser carregado.</p>',
                    closeBtn: '<a title="Fechar" class="fancybox-close" href="javascript:;"></a>',
                    next: '<a title="Próxima" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                    prev: '<a title="Anterior" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
                },
                type: 'inline',
                width:  853
            },
            obj = $.extend({}, options, args);

            $.fancybox.open(obj);
        },
        onShow: function () {
            var me=this;

            scope.app.commands.setHandler('initAnimations', function ($page) {
                me.initAnimations($page);
            });

            $('body').on('click', '[href=#]', function(e){
                e.preventDefault();
            });

            $(window).on('scroll',function (event) {
                //console.log(event);
                // var scroll = $(window).scrollTop();
                // // Do something
                // console.log(scroll);
            });

            scope.app.commands.setHandler('modal', function () {
                me.modal('#fancyboxModal');
            });

            $('body').on('click', function (e) {
                if(!$(e.target).closest('.menu').length && !$(e.target).closest('.topbar__menubutton').length) {
                   me.closeMenu();
                }
            });

            $(function(){
                $(window).scroll(function () {
                    if($(window).scrollTop()){
                        $('.back-top').stop(true).fadeIn('fast');    
                    } else {
                        $('.back-top').stop(true).fadeOut('fast');
                    }
                });
            });
        }
    }));

    return Default;
});
