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
    'application/views/ViagemLazer'
], function (scope, Marionette, Home) {
    'use strict';
    var ApplicationController = Marionette.Controller.extend({
        home: function () {
            var url = '/';
            scope.app.execute('page:load', url, scope.views.Home);
        },
        acesso: function () {
            var url = '/';
            scope.app.execute('page:load', url, scope.views.Acesso);
        },
        faleConosco: function () {
            var url = '/';
            scope.app.execute('page:load', url, scope.views.FaleConosco);
        },
        paraEmpresa: function () {
            var url = '/';
            scope.app.execute('page:load', url, scope.views.ParaEmpresa);
        },
        paraViagem: function () {
            var url = '/';
            scope.app.execute('page:load', url, scope.views.ParaViagem);
        },
        sobre: function () {
            var url = '/';
            scope.app.execute('page:load', url, scope.views.Sobre);
        },
        viagemLazer: function () {
            var url = '/';
            scope.app.execute('page:load', url, scope.views.ViagemLazer);
        },
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
            'viagens-lazer(/)': 'viagemLazer'
        }
    }));
});
