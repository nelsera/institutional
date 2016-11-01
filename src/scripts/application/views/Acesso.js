/* global define */
define([
    'scope',
    'client',
    'underscore',
    'validation'
], function (scope, client, _) {
    'use strict';

    var Acesso = scope.register(
        'views.Acesso',
        client.views.View.extend({
            template: 'templates/Acesso',
            behaviors: {},
            ui: {
                form: '.acesso__form'
            },
            events: {
                'click .acesso__tabs--tab': 'clickTab'
            },
            clickTab:function (e){
                var el =$(e.currentTarget);
                $('.acesso__tabs--tab').removeClass('active');
                el.addClass('active');
                $('.acesso__form div').hide(0);
                $('.acesso__form div').eq(el.index()).show(0);
            },
            formValidation:function(){
                var me=this;

                this.ui.form.validate({
                    ignore: '',
                    messages: {
                        'login': {
                            required: ''
                        },
                        'pass': {
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
                        console.log('sucesso');
                    }
                });
            },
            onShow: function(){
                scope.app.execute('initAnimations', function () {

                });

                this.formValidation();
            }
        })
    );

    return Acesso;
});
