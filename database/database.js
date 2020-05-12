const Sequelize = require ('sequelize');

const conn = new Sequelize(
    'tutorial_pergunta_resposta',
    'root',
    '',
    {host:'localhost', dialect:'mysql'});

module.exports = conn;