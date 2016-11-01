/* global define */
define([
    'scope',
    'client',
    'underscore',
    'validation',
    'mask'
], function (scope, client, _, skrollr) {
    'use strict';

    var FaleConosco = scope.register(
        'views.FaleConosco',
        client.views.View.extend({
            template: 'templates/FaleConosco',
            behaviors: {},
            ui: {
                form: '.fale-conosco__form'
            },
            events: {
                'click .fale-conosco__send-new': 'sendNewMessage'
            },
            sendNewMessage: function (){
                var me=this;

                me.$el.find('.fale-conosco__form--message').slideUp('fast');
                $(me.ui.form).slideDown('fast');
                me.ui.form.find('input').removeClass('input--error');
                me.ui.form.find('.name').focus();
            },
            formValidation:function(){
                var me=this;

                this.ui.form.validate({
                    ignore: '',
                    messages: {
                        'Nome:': {
                            required: ''
                        },
                        'Telefone:': {
                            required: ''
                        },
                        'Email:':{
                            required: '',
                            email:''
                        },
                        'Empresa:':{
                            required: ''  
                        },
                        'Mensagem:':{
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
                        var data = {
                            'Nome:': $('input[name="Nome:"]').val(),
                            'Telefone:': $('input[name="Telefone:"]').val(),
                            'Email:': $('input[name="Email:"]').val(),
                            'Empresa:': $('input[name="Empresa:"]').val(),
                            'Mensagem:': $('input[name="Mensagem:"]').val(),
                            'EmailDestino': $('input[name="EmailDestino"]').val(),
                            'HTMLResposta': $('input[name="HTMLResposta"]').val(),
                            'Assunto': $('input[name="Assunto"]').val()
                        };

                        $.ajax({
                            type: 'POST',
                            url: 'send_mail.php',
                            data: data,
                            success: function(data) {
                                $('.fale-conosco__form')[0].reset();
                                $(me.ui.form).slideUp('fast');
                                me.$el.find('.fale-conosco__form--message').slideDown('fast');
                            },
                            error: function(data) {
                                console.log('deu erro');
                            }
                        });
                    }
                });
            },
            onShow: function(){
                scope.app.execute('initAnimations', function () {
                    $('.bullet-left').delay(600).animate({opacity: 1, filter:1, top: '-1.4rem'}, 400, 'easeOutQuad');
                    $('.bullet-top').delay(600).animate({opacity: 1, filter:1, left: '-4.5rem'}, 400, 'easeOutQuad');
                    $('.animation__masthead--title span').delay(600).animate({opacity: 1, filter:1, left: '0'}, 400, 'easeOutQuad');

                    $('.fale-conosco__desc').delay(1000).animate({opacity: 1, filter:1,top:0}, 400, 'easeOutQuad');
                    $('.fale-conosco__left').delay(1000).animate({opacity: 1, filter:1,top:0}, 400, 'easeOutQuad');
                    $('.fale-conosco__info').delay(1000).animate({opacity: 1, filter:1,top:0}, 400, 'easeOutQuad');
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

    return FaleConosco;
});
