// ===============================================================================
// LOAD DATA

console.log('apiRoutes Connected');
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var express = require("express");
var path = require('path');
//var matches = require("../data/friends.js");

var app = express();
var friendsArray = require("../data/friends.js");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsArray);
  });


 
 

  //POST route to handle incoming surevey results


  app.post("/api/friends", function(req, res) {
    
  var newFriend = req.body;
  for(var i = 0; i < newFriend.scores.length; i++) {
    if(newFriend.scores[i] == "1 (Strongly Disagree)") {

      newFriend.scores[i] = 1;
    } else if(newFriend.scores[i] == "5 (Strongly Agree)") {

      newFriend.scores[i] = 5;
    } else {

      newFriend.scores[i] = parseInt(newFriend.scores[i]);
    }
  }
  
  // comparison array

  var comparisonArray = [];

  for (var i = 0; i < friendsArray.length; i++) {
    var comparedFriend = friendsArray[i];
    var totalDifference = 0;

    for(var k = 0; k < comparedFriend.scores.length; k++) {
      //return the absolute value of a number *use abs()method
      var differenceOneScore = Math.abs(comparedFriend.scores[k] - newFriend.scores[k]);
      totalDifference += differenceOneScore;
    }

    comparisonArray[i] = totalDifference;
  }

  var bestFriendNum = comparisonArray[0];
  var bestFriendI = 0;

  for(var i = 1; i < comparisonArray.length; i++) {
    if(comparisonArray[i] < bestFriendNum) {
      bestFriendNum = comparisonArray[i];
      bestFriendI = i;
    }
  }
  //push new friend
  friendsArray.push(newFriend);
  //json bf to the current friend match array
  res.json(friendsArray[bestFriendI]);
});
};


      



