var express = require('express');
var app = express();


var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kushal:ish123tyle456@cluster0.tsjcf.mongodb.net/network?retryWrites=true&w=majority')
    .catch(function(err){
        console.log(err);
    })
    .then(function(){
        console.log("Connected Successfully")
});


var Network = require('./models/network');
const { Router } = require('express');

app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}))

var port = process.env.port || 8080;


var router = Router()

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/' , function(req , res){
    res.json({message : 'hello! welcome to the local social network'})
});

router.route('/network').post( function(req, res){
        var network = new Network();
        network.name = req.body.name;
        network.mobno = req.body.mobno;
        network.email = req.body.email;
        network.profession = req.body.profession;
        network.place = req.body.place;

        network.save(function(err){
            if(err){
                res.send(err);
            }

            res.send({message : 'Person saved successfully'})
        })
    })
    .get( function(req , res){
        Network.find(function(err , bears){
            if(err){
                res.send(err);
            }
            
            res.json(bears);
        });
    });

    router.route('/network/:prof').get( function(req, res){
        Network.distinct( req.params.prof ,  function(err , professions){
            if(err){
                res.send(err);
            }
            res.json(professions)
        })
    });


app.use('/api' , router);
app.listen(port);
console.log('Magic Happens at port ' + port);