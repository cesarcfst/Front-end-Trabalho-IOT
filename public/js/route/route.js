angular.module("controleCasa").config(function ($routeProvider) {
    $routeProvider.when("/",{
        templateUrl: "view/home/home.html",
    });

    $routeProvider.when("/listarAgenda",{
        templateUrl: "view/listar/listarAgenda.html",
        controller:"controleCasaCtrl"
    });

    $routeProvider.when("/novaAgenda",{
        templateUrl: "view/agendar/formDados.html",
        controller:"controleCasaCtrl"
    });

    $routeProvider.when("/formDados",{
        templateUrl: "view/agendar/formDados.html",
        controller:"formDadosController"
    });

    $routeProvider.otherwise({
        redirectTo: "/home"
    });
});