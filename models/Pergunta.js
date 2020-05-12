const Sequelize = require("sequelize");
const con = require("../database/database");

const Pergunta = con.define('Pergunta',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull:false
    }  
});

Pergunta.sync({force:false}).then(_=>{
    console.log("tabela pergunta criada");
})

module.exports = Pergunta;