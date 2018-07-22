
// Request is designed to make http calls. It supports HTTPS and follows redirects by default.
// Our scraping tools cheerio
const request = require("request");
const cheerio = require("cheerio");
let results = [];

module.exports = function(callback) {
// First, we grab the body of the html with request
request('https://www.nytimes.com/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    //loading the request's html to cheerio
    var $ = cheerio.load(html);
 
    $("div.wide-b-layout div.collection article").each(function(i, element) {
        
        let result = {};
       
         
         result.title = $(element).find('h2.story-heading').children('a').text();
         result.link = $(element).find('h2.story-heading').children('a').attr("href");
         result.summary= $(element).find('p.summary').text().trim();
         result.author = $(element).find('p.byline').text().trim();
         //
         results.push(result);
//
        results.forEach((element)=> {for (i in element) {

            if (element[i] === undefined || element[i] === ''){

                results = results.filter(word => word !== element);

            }
        }
        });


//
  });

    callback(results);
  //console.log(results.length);
} 
});
}




 
