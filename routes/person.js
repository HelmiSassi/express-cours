var express = require('express');
var router = express.Router();

router.get('/search',(req,res) => {
    res.send("Recherche personne");
});

router.post('/add',(req,res) => {
    res.send("Ajout personne");
});

router.put('/edit',(req,res,next) => {
    res.send("Mise à jour personne");
});

router.delete('/delete',(req,res,next) => {
    res.send("Suppression personne");
});

router.get('/', (req,res) =>{

     var persons = [
         {nom : "Wick", prenom: "john", age :40},
         {nom : "Doe", prenom: "john", age :50},
         {nom : "Bat", prenom: "jean", age :30},
     ];
     var personTitle= "Liste des personnes";
     res.render('index.ejs', {
         personTitle,
         persons,
         nom:"wick",

    });
});

// router.get('/hello/:nom',(req,res)=>{
//     var persons = [
//         {nom : "Wick", prenom: "john", age :40},
//         {nom : "Doe", prenom: "john", age :50},
//         {nom : "Bat", prenom: "jean", age :30},
//     ];
//     var personTitle= "Liste des personnes";
//     res.render('index.ejs',{
//         personTitle,
//         persons,
//         nom : req.params.nom
//     });
// });

module.exports = router;