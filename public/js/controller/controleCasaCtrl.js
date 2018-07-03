angular.module("controleCasa").controller("controleCasaCtrl", function ($scope, $http, $location, $websocket) {
    $scope.app = "Controle Casa";

    var ws = $websocket("ws://controlecasaifms.herokuapp.com/teste/websocket");//conexão com servidor

    $scope.dados = [];

    $scope.ventilador = [
        {estadoV: "L"},
        {estadoV: "D"}
    ];
    $scope.luzDaSala = [
        {estadoLS: "L"},
        {estadoLS: "D"}
    ];
    $scope.tv = [
        {estadoTV: "L"},
        {estadoTV: "D"}
    ];
    $scope.luzDoQuarto = [
        {estadoLQ: "L"},
        {estadoLQ: "D"}
    ];


    $scope.adicionarDados = function (dado) {

        var data = new Date(dado.data);
        var hora = new Date(dado.horario);

        dado.data = data.getTime();
        dado.horario = hora.getTime();

        if (dado.id == null) {
            dado.operacao = "INSERT";
            dado.solicitacao = "ALFA"
            ws.send(JSON.stringify(dado));// enviando
            // $scope.dados.push(angular.copy(dado));
            delete $scope.dado;//limpar os campos
            $location.url("/listarAgenda/");

        } else {
            dado.operacao = "UPDATE";
            dado.solicitacao = "ALFA";
            ws.send(JSON.stringify(dado));
            $location.url("/listarAgenda/");
        }
        $scope.metodo();
    };

    ws.onMessage(function (dados) {
        dados = JSON.parse(dados.data);
        if (dados.horarioServidor) {
            return;
        }
        for (var i = 0; i < dados.length; i++) {
            dados.agendamento[0].data = new Date(new Number(dados.agendamento[0].data));
        }
        $scope.dados = dados.agendamento;

    });

    $scope.remover = function (dado) {
        dado.operacao = "DELETE";
        dado.solicitacao = "ALFA"
        // dado.data = new Date(new Number(dado.data));
        // dado.horario= new Date(new Number(dado.horario));
        
        ws.send(JSON.stringify(dado));
        // for(var i=0; i< $scope.dados.length;i++){
        //     if($scope.dados[i].id==dado.id){
        //         $scope.dados.splice(i,1);
        //         break;
        //     }
        // }
        $location.url("/listarAgenda");
    }

    $scope.editAgenda = function (dado) {
        sessionStorage.setItem("contatos", JSON.stringify(dado));
        $location.url("/formDados/");

    };

    $scope.metodo = function () {
        var dados = {
            solicitacao: "ENVIA",
            id : -1
        };
        ws.send(JSON.stringify(dados));
    };



});