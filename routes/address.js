var express = require('express');
var router = express.Router();


router.get('/search',(req,res) => {
    res.send("Recherche adresse");
});

router.post('/add',(req,res) => {
    res.send("Ajout adresse");
});

router.put('/edit',(req,res,next) => {
    res.send("Mise à jour adresse");
});

router.delete('/delete',(req,res,next) => {
    res.send("Suppression adresse");
});

module.exports = router;