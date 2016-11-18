/* global define */
define([
    'scope',
    'marionette',
    'application/views/Home',
    'application/views/Acesso',
    'application/views/FaleConosco',
    'application/views/ParaEmpresa',
    'application/views/ParaViagem',
    'application/views/Sobre',
    'application/views/ViagemLazer',
    'application/views/ViagensDeLazer'
], function (scope, Marionette, Home) {
    'use strict';
    var ApplicationController = Marionette.Controller.extend({
        home: function () {
            var url = '/';
            scope.app.execute('page:load', url, scope.views.Home);
        },
        acesso: function () {
            var url = '/acesso';
            scope.app.execute('page:load', url, scope.views.Acesso);
        },
        faleConosco: function () {
            var url = '/fale-conosco';
            scope.app.execute('page:load', url, scope.views.FaleConosco);
        },
        paraEmpresa: function () {
            var url = '/para-empresa';
            scope.app.execute('page:load', url, scope.views.ParaEmpresa);
        },
        paraViagem: function () {
            var url = '/para-viagem';
            scope.app.execute('page:load', url, scope.views.ParaViagem);
        },
        sobre: function () {
            var url = '/sobre';
            scope.app.execute('page:load', url, scope.views.Sobre);
        },
        viagemLazer: function () {
            var url = '/viagem-lazer';
            scope.app.execute('page:load', url, scope.views.ViagemLazer);
        },
        viagensDeLazer: function () {
            var url = '/viagens-de-lazer';
            scope.app.execute('page:load', url, scope.views.ViagensDeLazer);
        }
    });
    return scope.register('routers.AppRouter', Marionette.AppRouter.extend({
        controller: new ApplicationController(),
        appRoutes: {
            '(/)': 'home',
            'acesso(/)': 'acesso',
            'fale-conosco(/)': 'faleConosco',
            'para-empresa(/)': 'paraEmpresa',
            'para-viagem(/)': 'paraViagem',
            'sobre(/)': 'sobre',
            'viagens-lazer(/)': 'viagemLazer',
            'viagens-de-lazer(/)(:id)': 'viagensDeLazer'
        }
    }));
});
