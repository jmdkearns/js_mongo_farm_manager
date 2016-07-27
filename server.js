var express = require( 'express' );
var app = express();
var monogodb = require('mongodb');
var MongoClient = require( 'mongodb' ).MongoClient;
var bodyParser = require( 'body-parser' );
var ObjectID = monogodb.ObjectID;


app.use( bodyParser.json() );
var url = 'mongodb://localhost:27017/farm';

app.listen( '3000', function() {
  console.log( 'Running on port 3000!');
})


// INDEX
app.get( '/animals', function(req, res) {

  MongoClient.connect( url, function( err, db ) {
    var collection = db.collection( 'animals' );
    collection.find({}).toArray( function( err, docs ) {
      res.json( docs );
      db.close;
    });
  })
})


// CREATE
app.post( '/animals', function(req, res) {

  MongoClient.connect( url, function( err, db ) {
    var collection = db.collection( 'animals' );
    collection.insert({
      name: req.body.name, 
      type: req.body.type,
      age: req.body.age
    })
    res.status(200).end();
    db.close();
  })
});


// UPDATE
app.put( '/animals/:id', function(req, res) {

  MongoClient.connect( url, function(err, db) {
    var collection = db.collection( 'animals' );

    collection.updateOne( { _id: new ObjectID(req.params.id) }, { $set: {name: "Coco"} } );
    res.status(200).end();
    db.close();
  })
})


// DELETE
app.delete( '/animals/:id', function(req, res) {

  MongoClient.connect( url, function(err, db) {
    var collection = db.collection( 'animals' );

    collection.remove( { _id: new ObjectID(req.params.id) } );
    res.status(200).end();
    db.close();
  })
})



