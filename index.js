const { response } = require('express');
var express = require('express');
var app = express();
// Appel du module router person.js
var person = require('./routes/person');
var bodyParser = require('body-parser');

// Déclaration de vues Embedded Javascript (EJS)
app.set('engine_view', 'ejs');

//utilise Body-Parser pour pouvoir lire les entrées d'un formulaire
//et le stocker comme un obj javascript
//accessible via req.body
app.use(bodyParser.urlencoded({extended : false}));

app.get('/forms', (req, res)=>{
    res.render('forms.ejs',);
});

app.post('/',(req,res)=>{
    
    res.render('presentation.ejs', {
        prenom : req.body.prenom,
        nom : req.body.nom,
    })
})
// Appel des routes déclarées dans person,js à partir de la route /person
// http://localhost:8080/person
// http://localhost:8080/person/add
// http://localhost:8080/person/edit
// http://localhost:8080/person/delete
// http://localhost:8080/person/search
app.use('/person', person);
// Un Middleware est essentiellement une fontion qui recevra les object Request et Response
// et Comme 3eme argument, une autre fonction next() que l'on appelera une fois notre code middleware terminé 
// var middleWare = function (req, res, next) {
//     console.log("middleWare:", req.url);
//     next();
// };
// var middleWare2 = function (req, res, next) {
//     console.log("middleWare2:", req.url);
// };
// app.get('/', (req, res, next) => {
//     console.log("requete recu");
//     res.send('hello world');
//     next();
// }, middleWare, middleWare2
// );
// var myLogger = function (req, res, next) {
//     console.log("Vous êtes connecté");
//     next();
// }
 //var requestTime = function(req, res, next) {
 //    req.requestTime = new Date(Date.now());
 //   next();
 //}
// app.use(myLogger);
//app.use(requestTime);
// app.get('/', (req, res) => {
//     var responseText = 'hello world';
//     responseText += ' appelé à :' + req.requestTime + '';
//     res.send(responseText);
// });
// Routage : Interception d'une requête client, via la methode HTTP get()
// puis, redirection vers un composant capable de retourner une reponse
// '/' est la route
// app.get('/', function (req, res) {
//     // Intruction qui nous permet de retourner une reponse au client
//     res.send('Get request to the home page');
// });
// app.post('/', function (req, res) {
//     res.send('Post request to the home page');
// });
// // Precision d'une chaine apres notre route '/' = localhost8080/personne
// app.get('/personne', function (req, res) {
//     res.send('Bonjour personne');
// });
app.listen(8080, function () {
    console.log("Express en attente");
});