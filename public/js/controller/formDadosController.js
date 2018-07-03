angular.module("controleCasa").controller("formDadosController", function ($scope, $http, $location, $websocket, $routeParams) {

    $scope.dados = [];

    var d = sessionStorage.getItem("contatos");
    // d.data = new Date(new Number(d.data));
    $scope.dado = JSON.parse(d);



});