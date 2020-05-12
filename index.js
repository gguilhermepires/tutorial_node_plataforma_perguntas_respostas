//npm install ejs --save 
//npm install express --save
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/database');

const Pergunta = require("./models/Pergunta");
const Resposta = require("./models/Resposta");

connection.authenticate().then(l => {
    console.log("conexao ");

}).catch(e => {
    console.log(e);
});


const app = express();
const portaExpress = 3002;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {

    Pergunta.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]


    }).then(lista => {
        res.render('index', {
            perguntas: lista
        });

    });

});


app.get('/perguntar', function (req, res) {
    //  const nome = req.params.nome;
    res.render('perguntar');
});

app.post('/salvarpergunta', function (req, res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(result => {
        res.redirect("/");
    }).catch(e => {
        console.log(e);
    });

});

app.get('/pergunta/:id', function (req, res) {
    var id = req.params.id;

    Pergunta.findOne({ where: { id: id } }).then(r => {
        if (r != undefined) {

            Resposta.findAll({ 
                where: { perguntaId: id },
            order:[['id','DESC']]
            }).then(respostas => {
                res.render("pergunta", { pergunta: r , respostas:respostas });
            })

        } else {
            res.redirect("/");
        }
    }).catch(e => {
        console.log(e);
    })
});
app.post('/responder', function (req, res) {
    var pergunta_id = req.body.pergunta;
    var corpo = req.body.corpo;

    Resposta.create({
        corpo: corpo,
        perguntaId: pergunta_id
    }).then(r => {
        if (r != undefined) {
            res.redirect("/pergunta/" + pergunta_id);
        }
    }).catch(e => {
        console.log(e);
    })

});


//************************************************************************************************ */


app.listen(portaExpress, function (erro) {
    if (erro) {
        console.log("erro");
    } else
        console.log("servidor iniciado :", portaExpress);

})
