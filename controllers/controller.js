const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");
var db = require("../models");
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/myMongooseApp");

// Importing our scraper function to scrape New York times
const scraper = require("./scraper.js")
let j=0;


// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  db.Article.find({})
    .then(function (dbArticle) {

      //console.log(dbArticle);

      // console.log(dbArticle)
      let hbsObject = {
        articles: dbArticle,
        count : j
      };
      // If we were able to successfully find Articles, send them back to the client
      res.render("index", hbsObject);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });

});

router.post("/", function (req, res) {

j=0;


  scraper(function (scrapedResults) {

    // console.log(scrapedResults.length)

    //console.log(dbArticle)

    for (var i = 0; i < scrapedResults.length; i++) {
      // console.log(i)
      // console.log(scrapedResults[i])
      db.Article.update({ title: scrapedResults[i].title }, scrapedResults[i], { upsert: true, new: true, setDefaultsOnInsert: true })
        .then(function (dbArticle) {
         // console.log(scrapedResults[i])
//console.log(dbArticle);
if (dbArticle.upserted) {
   
j++

   

}



        }).catch(function (err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });

    }

    db.Article.find({})
    .then(function (dbArticle) {
      
      let hbsObject = {
        articles: dbArticle,
       
      };
     //hbsObject.count = j;
      // If we were able to successfully find Articles, send them back to the client
      //console.log(hbsObject)
      console.log(j)
      res.render("index", hbsObject);
     
//console.log(newArticles)
    // console.log(dbArticle)
    // let hbsObject = {
    //   articles: newArticles
    // };
    // If we were able to successfully find Articles, send them back to the client
    //res.send(newArticles);
  });

 // console.log(j)

  });

});


// router.post("/api/cats", function(req, res) {
//   cat.create([
//     "name", "sleepy"
//   ], [
//     req.body.name, req.body.sleepy
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

// router.put("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   cat.update({
//     sleepy: req.body.sleepy
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// router.delete("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   cat.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// // Export routes for server.js to use.
module.exports = router;
