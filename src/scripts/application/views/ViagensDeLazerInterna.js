/* global define */
define([
    'scope',
    'client',
    'underscore',
    'skrollr',
    'handlebars',
    'validation',
    'mask',
    'chosen'
], function (scope, client, _, skrollr, Handlebars) {
    'use strict';

    var ViagensDeLazerInterna = scope.register(
        'views.ViagensDeLazerInterna',
        client.views.View.extend({
            template: 'templates/ViagensDeLazerInterna',
            behaviors: {},
            ui: {},
            events: {},
            isMobile: function () {
                if( navigator.userAgent.match(/Android/i)
                    || navigator.userAgent.match(/webOS/i)
                    || navigator.userAgent.match(/iPhone/i)
                    || navigator.userAgent.match(/iPad/i)
                    || navigator.userAgent.match(/iPod/i)
                    || navigator.userAgent.match(/BlackBerry/i)
                    || navigator.userAgent.match(/Windows Phone/i)
                ){
                    return true;
                }
                else {
                    return false;
                }
            },
            onShow: function(){
                var me=this;
                me.$el.find('select').chosen({
                    no_results_text: 'Nenhum resultado encontrado.',
                    width: '350px'
                });
                scope.app.execute('initAnimations', function () {
                    if(!me.isMobile() && $(window).width() > 768) {
                        skrollr.init({
                            forceHeight: true,
                            edgeStrategy: 'set',
                            //smoothScrolling: true,
                            scale: 1
                        });
                    }

                    var distance = $('.viagens-lazer__masthead').offset().top,
                        $window = $(window);

                    $window.scroll(function() {
                        if ( $window.scrollTop() >= distance ) {
                            $('.viagens-lazer__masthead').addClass('fixed');
                            $('#content').css('padding-top', $('.viagens-lazer__masthead').css('height'));
                        } else {
                            $('.viagens-lazer__masthead').removeClass('fixed');
                            $('#content').css('padding-top', 0);
                        }
                    });

                    $('.opacity-0').animate({opacity: 1, filter:1, top: 0}, 800, 'easeOutQuad');
                    $('.bullet-left').delay(600).animate({opacity: 1, filter:1, top: '-1.4rem'}, 400, 'easeOutQuad');
                    $('.bullet-top').delay(600).animate({opacity: 1, filter:1, left: '-4.5rem'}, 400, 'easeOutQuad');
                    $('.animation__masthead--title span').delay(600).animate({opacity: 1, filter:1, left: '0'}, 400, 'easeOutQuad');
                });
            }
        })
    );

    return ViagensDeLazerInterna;
});
