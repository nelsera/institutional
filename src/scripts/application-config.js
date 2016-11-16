/* global require */
require.config({
    deps: ['client/config'],
    callback: function () {
        'use strict';
        require(['application/main']);
    },
    packages: ['application/routers'],
    paths: {
        easing: 'vendors/jquery-easing-original/jquery.easing.min',
        slick: 'vendors/slick-carousel/slick/slick.min',
        flowtype: 'vendors/Flowtype.js/flowtype',
        imagesloaded: 'vendors/imagesloaded/imagesloaded.pkgd',
        skrollr: 'vendors/skrollr/src/skrollr',
        modal: 'vendors/fancybox/source/jquery.fancybox',
        validation: 'vendors/jquery-validation/dist/jquery.validate.min',
        mask: 'vendors/jquery-mask-plugin/dist/jquery.mask.min',
        chosen: 'vendors/chosen/chosen.jquery',
        firebase: 'vendors/firebase/firebase',
        handlebars: 'vendors/handlebars/handlebars.min'
    },
    shim: {
        easing: ['jquery'],
        slick: ['jquery'],
        flowtype: ['jquery'],
        imagesloaded: ['jquery'],
        modal: ['jquery'],
        validation: ['jquery'],
        mask: ['jquery'],
        chosen: ['jquery']
    }
});