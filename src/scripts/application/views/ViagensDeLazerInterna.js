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

                    var distance = $('.viagens-de-lazer__masthead').offset().top,
                        $window = $(window);

                    $window.scroll(function() {
                        if ( $window.scrollTop() >= distance ) {
                            $('.viagens-de-lazer__masthead').addClass('fixed');
                            $('#content').css('padding-top', $('.viagens-de-lazer__masthead').css('height'));
                        } else {
                            $('.viagens-de-lazer__masthead').removeClass('fixed');
                            $('#content').css('padding-top', 0);
                        }
                    });

                    $('.opacity-0').animate({opacity: 1, filter:1, top: 0}, 800, 'easeOutQuad');
                    $('.bullet-left').delay(600).animate({opacity: 1, filter:1, top: '-1.4rem'}, 400, 'easeOutQuad');
                    $('.bullet-top').delay(600).animate({opacity: 1, filter:1, left: '-4.5rem'}, 400, 'easeOutQuad');
                    $('.animation__masthead--title span').delay(600).animate({opacity: 1, filter:1, left: '0'}, 400, 'easeOutQuad');

                    $(window).ready(function($) {
                        firebase.database().ref('ofertas/'+me.options.viagem).once('value', function(snap) {
                          console.log( snap.val() );


                          $('.viagens-lazer__title span').html(snap.val().titulo);
                          $('.viagens-de-lazer__masthead').css('background', 'url(\'' + snap.val().foto_destino + '\') 0 0/cover no-repeat');
                          $('.descricao_oferta').html(snap.val().descricao_oferta);
                          $('.preco').html('R$ ' + snap.val().preco + ',00');
                          $('.descricao_destino').html( snap.val().descricao_destino);

                          (snap.val().hoteis).forEach(function(value, index){
                            $('[data-hotel=\''+index+'\']')
                                .find('.short-img-hotel img').attr('src', value.foto_hotel).end()
                                .find('h4').html( value.nome_hotel).end()
                                .find('p').html( 'R$ '+value.preco_hotel+' a diária por pessoa').end()
                                .removeClass('hide');
                          });
                        });
                    });
                });
            }
        })
    );

    return ViagensDeLazerInterna;
});
