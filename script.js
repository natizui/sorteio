
//primeiro criar um array com todos os documentos
//cada documento xml contem os nomes das interessadas no sorteio de cada item

//criar a conexão com o arquivo
if (window.XMLHttpRequest) {
    var conectar = new XMLHttpRequest();
} else {    // IE 5/6
    var conectar = new ActiveXObject("Microsoft.XMLHTTP");
 }
 //função que define qual arquivo pegar, faz a solicitação e coloca o arquivo xml em oDocumento...
 function conexao(documento) {
    conectar.open("GET", documento, false);
    conectar.setRequestHeader("Content-Type", "text/xml");
    conectar.send(null);
    var oDocumento = conectar.responseXML;
    // console.log("oDocumento = " + oDocumento + " documento = " + documento);
    //define item como elemento raíz do arquivo
    var item = oDocumento.childNodes[0];
    //array vai receber os elementos recuperados do arquivo xml
    //recupera um nome por turno
    var paraSortear = [documento];
    // console.log(documento);
    for (var i = 0; i < item.children.length; i++) {
        var candidata = item.children[i];
        //acesso a cada valor
        var nome = candidata.getElementsByTagName("nome");
        // console.log(nome);
        //adiciona no array
        paraSortear.push(nome[0].textContent.toString());
        // console.log("'for' " +paraSortear);
        // console.log(paraSortear);
    }
    return paraSortear;
}
//todosDocumentos=array para chamar todos os documentos xml
var todosDocumentos = ["adesivoArquillian.xml", "adesivoAtomic.xml", "adesivoBranco.xml", "adesivoOVirt.xml", "adesivoVermelho.xml", "bottom.xml", "carteira.xml", "sacola.xml"];
//conectados recebe o resultado da execução da função conexão para cada um dos elementos de todosDocumentos
var conectados = todosDocumentos.map(conexao);
console.log("conectados");
console.log(conectados);
//conectados é um array com todos os paraSortear (que é um array com os nomes a serem sorteados)
//cortando conectados tem-se os arrays paraSortear separados 

var resultadoFinal = [];

function sortear() {
    var itemASerSorteado = document.getElementById("brinde").value;
    var quantidadeDoItem = document.getElementById("quantidade").value;
    console.log("item: " + itemASerSorteado);
    console.log("quantidade: "+ quantidadeDoItem);
    // console.log("realizando sorteio");
    for (let i = 0; i < conectados.length; i++) {
        var paraSortear = conectados[i];
        console.log("paraSortear: "+ paraSortear[0]);
        if(paraSortear[0] == itemASerSorteado) {
            var indiceMax = paraSortear.length-2;
            for  (let i = 0; i < quantidadeDoItem; i++) {
                //sortear um número aleatório
                console.log('sorteio: '+i);
                function sortearUmNumero() {
                    return (Math.floor((Math.random() * indiceMax) + 1));
                }
                var contador = 0;
                do {
                    var resultadoProvisorio = paraSortear[sortearUmNumero()];
                    console.log("resultadoProvisorio: " + resultadoProvisorio);
                    function checarSeNaoEhRepetido() {
                        for (let c = 0; c <= i ; c++){
                            if (resultadoProvisorio != resultadoFinal[c]){
                                var x = true;
                            }
                            else {
                                return false;
                            }
                        }
                        console.log("resultadoFinal: " + resultadoFinal);
                        return true;
                    }
                    contador++;
                } while (!checarSeNaoEhRepetido() && contador<200); 
                resultadoFinal.push(resultadoProvisorio);
                console.log("resultadoFinal final: " + resultadoFinal);
                console.log(i);
                while (i === quantidadeDoItem-1) {
                    console.log("while imprimir");
                    imprimir();                    
                    i++;
                }
            }
        }
    }
}

function imprimir() {
    let imprimirResultado = resultadoFinal.join(" \n "); 
    console.log("imprim: " + imprimirResultado);
    window.alert(imprimirResultado);
    
}
