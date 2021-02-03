var express = require('express');
const db = require('../db/db');
var router = express.Router();
var personneController = require('../controllers/personne.controller');
router.get('/', (req, res) => {
    var persons = [
        { nom: 'Wick', prenom: 'John', age: 40 },
        { nom: 'Doe', prenom: 'John', age: 50 },
        { nom: 'Bat', prenom: 'Jean', age: 30 },
    ];
    var personTitle = "Liste de personnes";
    res.render('index.ejs', {
        personTitle,
        persons
    })
});
// // http://localhost:8080/hello/John
// router.get('/hello/:nom', (req,res) =>{
//     var persons = [
//         {nom : 'Wick', prenom : 'John', age : 40},
//         {nom : 'Doe', prenom : 'John', age : 50},
//         {nom : 'Bat', prenom : 'Jean', age : 30},
//     ];
//     var personTitle = "Liste de personnes";
//     res.render('index.ejs', {
//         personTitle, 
//         persons, 
//         nom : req.params.nom
//     })
//     res.render('index.ejs', { nom : req.params.nom})
// });
// http://localhost:8080/person/forms
router.get('/forms', personneController.show);
// À l'appel de la route http://localhost:8080/ajoutPersonne
router.post('/ajoutPersonne', (req, res) => {
    if (req.body.txtId == 0) {
        var data = {
            nom: req.body.txtNom,
            prenom: req.body.txtPrenom
        };
        db.query("Insert into personne set ? ", data,
            function (err, rows) {
                if (err) throw err;
                console.log("Insertion reussie");
                res.redirect('/person/forms');
            });
    }
    else {
        var data = {
            id: req.body.txtId,
            nom: req.body.txtNom,
            prenom: req.body.txtPrenom
        };
        db.query('UPDATE personne SET ? WHERE id = ' + data.id, data,
            function (err, rows) {
                if (err) throw err;
                console.log("Mise à jour reussie");
                res.redirect('/person/forms');
            });
    }
});
router.get('/editPersonne/:id', (req, res) => {
    var id = req.params.id;
    db.query('SELECT * FROM personne WHERE id = "' + id + '"',
        function (err, rows) {
            if (err) throw err;
            res.render('forms.ejs', {
                personList: [],
                txtId: rows[0].id,
                txtNom: rows[0].nom,
                txtPrenom: rows[0].prenom,
            });
        });
});
router.get('/deletePersonne/:id', (req, res) => {
    var id = req.params.id;
    db.query('DELETE FROM personne WHERE id = "' + id + '"',
        function (err, rows) {
            if (err) throw err;
            console.log("Suppression reussie");
            res.redirect('/person/forms');
        });
});
// // À l'appel de la route http://localhost:8080/person/forms
// // nous affichons dans la vue forms.ejs la liste des personnes 
// // récupérée dans la bd Formation
// app.get('/forms', (req, res) => {
//     // création de la requete 
//     let query = "Select * from personne";
//     // appel de la methode query() prenant en parametre la requete ici query
//     // et une methode callback nous retournant soit une erreur soit le resultat
//     sql.query(query, (err, result) => {
//         if (err) {
//             res.redirect('/forms');
//         }
//         // Renvoie vers la vue forms.ejs avec avec une variable personList 
//         // stockant la resultat recupere du callback 
//         res.render('forms.ejs', {
//             personList: result,
//             txtId: '',
//             txtNom: '',
//             txtPrenom: '',
//         });
//     });
// });

router.get('/search', (req,res) => {
    let query = 'select * from personne';

    db.query(query,(err, result) => {
        if(err) {
            res.redirect('/forms');
        }
        res.json({
            status : 200,
            result,
            message: "Person list retrieved successfully"
        });
    });
});

router.post('/add',(req,res) => {
    var data = {
        nom: req.body.nom,
        prenom: req.body.prenom,
    };
    db.query('insert into personne set ?', data,
    function (err,rows){
        if(err) throw err;
        console.log('Insertion reussie');
        res.json({
            status: 200,
            message: "New person added successfully"
        });

    });
});

router.put('/update', (req,res) =>{
    var data = {
        id: req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom
                }
db.query('UPDATE personne SET ? WHERE id = ' + data.id, data,
            function (err, rows) {
                if (err) throw err;
                console.log("Mise à jour reussie");
                res.json({status: 200,
                message: "person updated successfully"
            });
    });
});

router.get('/select/:id', (req,res) => {
    var id = req.params.id;
    db.query('SELECT * FROM personne WHERE id = "' + id + '"',
        function (err, rows) {
            if (err) throw err;
            res.json( {
                status: 200,
                rows,
                message: "Person retrieved successfully"
            });
        });
});

router.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    db.query('DELETE FROM personne WHERE id = "' + id + '"',
        function (err, rows) {
            if (err) throw err;
            console.log("Suppression reussie");
            res.json({
                status: 200,
                message: "Person deleted successfully "
            });
        });
});




module.exports = router;