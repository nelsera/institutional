/* global define */
define([
    'scope',
    'client',
    'underscore',
    'skrollr',
    'validation',
    'mask'
], function (scope, client, _, skrollr) {
    'use strict';

    var Home = scope.register(
        'views.Home',
        client.views.View.extend({
            template: 'templates/Home',
            behaviors: {},
            ui: {
                'form': '.home__form'
            },
            events: {
                'click .home__play': 'openModal',
                'click .home__send-new': 'sendNewMessage'
            },
            openModal: function (){
                scope.app.execute('modal');
            },
            sendNewMessage: function (){
                var me=this;

                me.$el.find('.home__form--message').slideUp('fast');
                $(me.ui.form).slideDown('fast');
                me.ui.form.find('input').removeClass('input--error');
                me.ui.form.find('.name').focus();
            },
            formValidation:function(){
                var me=this;

                this.ui.form.validate({
                    ignore: '',
                    messages: {
                        'name': {
                            required: ''
                        },
                        'phone': {
                            required: ''
                        },
                        'email':{
                            required: '',
                            email:''
                        }
                    },
                    errorClass: "input--error",
                    validClass: "valid",
                    highlight: function(element, errorClass) {
                        me.ui.form.find(element).addClass(errorClass);
                    },
                    unhighlight: function(element, errorClass) {
                        me.ui.form.find(element).removeClass(errorClass);
                    },
                    invalidHandler: function() {},
                    submitHandler: function() {
                        $(me.ui.form).slideUp('fast');
                        me.$el.find('.home__form--message').slideDown('fast');
                        $(me.ui.form)[0].reset();
                    }
                });
            },
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
                setTimeout(function(){
                    window.scrollTo(0,0);
                },10);

                var me =this;
                scope.app.execute('initAnimations', function () {
                    $('.masthead').delay(300).animate({opacity: 1, filter:1},300, 'easeInOutQuad');    
                    
                    $('.masthead__title--before').delay(400).animate({opacity: 1, filter:1, top: '1.3rem'}, 400, 'easeOutQuad');
                    $('.masthead__title--after').delay(400).animate({opacity: 1, filter:1, left: '.2rem'}, 400, 'easeOutQuad');
                    $('.masthead__title span').delay(400).animate({opacity: 1, filter:1, left: 0}, 400, 'easeOutQuad');

                    $('.down').delay(400).animate({opacity: 1, filter:1, bottom: '25px'},400, 'easeInOutQuad');

                    var distance = $('.masthead').offset().top,
                        $window = $(window);

                    $window.scroll(function() {
                        if ( $window.scrollTop() >= distance ) {
                            $('.masthead').addClass('fixed');
                            $('#content').css('padding-top', $('.masthead').css('height'));
                        } else {
                            $('.masthead').removeClass('fixed');
                            $('#content').css('padding-top', 0);
                        }
                    });

                    $(function(){
                        $(window).scroll(function () {
                            if($(window).scrollTop()){
                                $('.down').stop(true).animate({opacity: 0, filter:0, bottom: '-25px'},400, 'easeInOutQuad');    
                            } else {
                                $('.down').stop(true).animate({opacity: 1, filter:1, bottom: '25px'},400, 'easeInOutQuad');
                            }
                        });
                    });

                    if(!me.isMobile() && $(window).width() > 768) {
                        skrollr.init({
                            forceHeight: true,
                            edgeStrategy: 'set',
                            //smoothScrolling: true,
                            scale: 1
                        });
                    }
                });

                var maskBehavior = function (val) {
                    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
                },
                options = {onKeyPress: function(val, e, field, options) {
                    field.mask(maskBehavior.apply({}, arguments), options);
                }};
 
                me.ui.form.find('input.phone').mask(maskBehavior, options);
                this.formValidation();
            }
        })
    );

    return Home;
});
