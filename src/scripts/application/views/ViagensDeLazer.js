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

    var ViagensDeLazer = scope.register(
        'views.ViagensDeLazer',
        client.views.View.extend({
            template: 'templates/ViagensDeLazer',
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
                
                var ids = [],
                    todas = [],
                    ativas = [],
                    result = undefined;

                Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {

                    lvalue = parseFloat(lvalue);
                    rvalue = parseFloat(rvalue);
                        
                    return {
                        "+": lvalue + rvalue,
                        "-": lvalue - rvalue,
                        "*": lvalue * rvalue,
                        "/": (lvalue / rvalue).toFixed(2).toString().replace('.',','),
                        "%": lvalue % rvalue
                    }[operator];
                });

                firebase.database().ref('ofertas').once('value', function(snap) {
                    
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

                    ids = Object.keys(snap.val());
                    todas = $.map(snap.val(), function(value) {
                        return [value];
                    });

                    todas.forEach(function(value, index) {
                        value.id= ids[index];
                    });

                    todas.forEach(function(value) {
                      var date = new Date(value.data_expiracao),
                      today = new Date();
                      today.setHours(0,0,0,0);

                      if ( !(date < today) && !value.rascunho ) {
                        ativas.push(value);
                      }
                    });

                    result = ativas.reverse();

                    var source   = $("#entry-template").html();
                    var template = Handlebars.compile(source);
                    var html    = template(result);
                    $('.short-post').html( html );

                    source = $("#entry-template-chosen").html();
                    template = Handlebars.compile(source);
                    html    = template(result);
                    $('#selectChosen').html(html);
                    me.$el.find('select').chosen({
                        no_results_text: 'Nenhum resultado encontrado.',
                        width: '350px'
                    });

                    me.$el.find('select').chosen().change(function(){
                        var id = $(this).val();
                        window.location='#/viagem/'+id;
                    });
                });
            }
        })
    );

    return ViagensDeLazer;
});
