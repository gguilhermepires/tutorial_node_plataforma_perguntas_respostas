const Sequelize = require("sequelize");
const con = require("../database/database");
const tabela="Resposta";

const Resposta = con.define(tabela,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false//sempre preenchido
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull:false
    }  
});

Resposta.sync({force:false}).then(_=>{
    console.log("tabela pergunta criada: ",tabela);
})

module.exports = Resposta;