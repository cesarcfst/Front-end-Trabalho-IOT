/**
 * Created by Gustavo on 10/08/2017.
 */
var sockjs = require('sockjs');
var chatServer = sockjs.createServer();

var pessoas = [];

// Quando algum cliente se conectar
chatServer.on('connection', function (socket) {
    console.log('Um novo usuário se conectou!');
    adicionarNaListaDePessoas(socket);

    // Quando o cliente enviar alguma mensagem
    socket.on('data', broadcast);

    // Quando o cliente desconectar
    socket.on('close', sair);

    setInterval(function () {
            socket.write(JSON.stringify({horarioServidor:new Date().toTimeString()}));
        }, 1000
    );
});

var adicionarNaListaDePessoas = function (socket) {
    var pessoa = {
        socket: socket
    };
    pessoas.push(pessoa);
};

var broadcast = function (dados) {
    for (var i in pessoas) {
        pessoas[i].socket.write(dados);
    }
};

var sair = function () {
    console.log("Pessoa saiu");
};

module.exports = chatServer;