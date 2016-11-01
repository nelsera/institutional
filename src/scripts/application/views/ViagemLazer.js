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

    var ViagemLazer = scope.register(
        'views.ViagemLazer',
        client.views.View.extend({
            template: 'templates/ViagemLazer',
            behaviors: {},
            ui: {
                form: '.viagens-lazer__form'
            },
            events: {
                'click .viagens-lazer__send-new': 'sendNewMessage'
            },
            sendNewMessage: function (){
                var me=this;

                me.$el.find('.viagens-lazer__form--message').slideUp('fast');
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
                        },
                        'company':{
                            required: ''  
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
                        console.log('sucesso')
                        $(me.ui.form).slideUp('fast');
                        me.$el.find('.viagens-lazer__form--message').slideDown('fast');
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
                var me=this;
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

                this.formValidation();

                var maskBehavior = function (val) {
                    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
                },
                options = {onKeyPress: function(val, e, field, options) {
                    field.mask(maskBehavior.apply({}, arguments), options);
                }};
 
                this.ui.form.find('input.phone').mask(maskBehavior, options);
            }
        })
    );

    return ViagemLazer;
});
