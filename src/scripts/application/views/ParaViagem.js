/* global define */
define([
    'scope',
    'client',
    'underscore',
    'skrollr'
], function (scope, client, _, skrollr) {
    'use strict';

    var ParaViagem = scope.register(
        'views.ParaViagem',
        client.views.View.extend({
            template: 'templates/ParaViagem',
            behaviors: {},
            events: {},
            formValidation:function(form){
                var me=this;

                $(form).validate({
                    ignore: '',
                    messages: {
                        'email':{
                            required: '',
                            email:''
                        }
                    },
                    errorClass: "input--error",
                    validClass: "valid",
                    highlight: function(element, errorClass) {
                        $(form).find(element).addClass(errorClass);
                    },
                    unhighlight: function(element, errorClass) {
                        $(form).find(element).removeClass(errorClass);
                    },
                    invalidHandler: function() {},
                    submitHandler: function() {
                        $(form).slideUp('fast');
                        
                        $.ajax({
                            type : "POST",
                            url : "assets/includes/ajax.php",
                            data : "email="+ $(form).find('[name="email"]').val() +"&acao=cadastra_news",
                            success : function(j) {
                                console.log(form);
                                me.$el.find('.para-viagem__form--message'+form).slideDown('fast');
                                $(form)[0].reset();
                            }
                        });
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

                    var distance = $('.para-viagem__masthead').offset().top,
                        $window = $(window);

                    $window.scroll(function() {
                        if ( $window.scrollTop() >= distance ) {
                            $('.para-viagem__masthead').addClass('fixed');
                            $('#content').css('padding-top', $('.para-viagem__masthead').css('height'));
                        } else {
                            $('.para-viagem__masthead').removeClass('fixed');
                            $('#content').css('padding-top', 0);
                        }
                    });

                    $('.opacity-0').animate({opacity: 1, filter:1, top: 0}, 800, 'easeOutQuad');
                    $('.bullet-left').delay(600).animate({opacity: 1, filter:1, top: '-1.4rem'}, 400, 'easeOutQuad');
                    $('.bullet-top').delay(600).animate({opacity: 1, filter:1, left: '-4.5rem'}, 400, 'easeOutQuad');
                    $('.animation__masthead--title span').delay(600).animate({opacity: 1, filter:1, left: '0'}, 400, 'easeOutQuad');
                });

                this.formValidation('.para-viagem__form--1');
                this.formValidation('.para-viagem__form--2');
            }
        })
    );

    return ParaViagem;
});
