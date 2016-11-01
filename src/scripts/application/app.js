/* global define */
define([
    'scope',
    'marionette',
    'jquery',
    'flowtype'
], function (scope, Marionette, $) {
    'use strict';

    var app = scope.app = new Marionette.Application();
    app.addRegions({
        main: '#main'
    });


    $(function () {
        $('html').flowtype({
            fontRatio : 100
        });
    });

    return app;
});
