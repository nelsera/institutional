/* global define, window */

define(['underscoredeep'], function (_) {
    'use strict';
    var scope = window.travelexcellence = window.travelexcellence || {};
    scope.register = function (key, value) {
        _.deep(scope, key, value);
        return value;
    };
    return scope;
});