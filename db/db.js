//Preparation de la connexion à la bd
//par l'utilisation du module installé Mysql2
var mysql2      = require('mysql2');

var db = mysql2.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database:'bd_personne'
  });
  
  //connexion à la db:
  db.connect((err) => {
      if(err) {
          throw err;
      };
      console.log('Connected to database');
  });
  //Global permet de rendre la connexion accessible dans tout le projet
  //donne une portée (scope) dans l'ensemble projet
  global.db = db;

  module.exports = db;