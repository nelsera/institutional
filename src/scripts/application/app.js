/* global define */
define([
    'scope',
    'marionette',
    'jquery',
    'firebase',
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

        firebase.initializeApp({
          apiKey: "AIzaSyBZBmCRD-EZJUisa6Lu9cNGEHxW0FDch9E",
          authDomain: "travelplustur-5c1d4.firebaseapp.com",
          databaseURL: "https://travelplustur-5c1d4.firebaseio.com",
          storageBucket: "travelplustur-5c1d4.appspot.com",
          messagingSenderId: "364047226238"
        });
    });

    return app;
});
