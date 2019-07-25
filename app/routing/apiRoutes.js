var friends = require("../data/friends");

module.exports = function (app) { 
    app.get("/api/friends", function(req, res){
        res.json(friends);
    })
    app.post("/api/friends", function(req,res){
        //calculate the best match
        //send back the besh match info
        var bestMatch = {
            name: "",
            photo: "",
            friendDiff: Infinity
        }
        var userData = req.body;
        var userScores = userData.scores;

        var totalDiff;

        for(var i=0; i< friends.length; i++){
            var currentFriend = friends[i];
            totalDiff = 0;
            for(var j=0; j<currentFriend; j++){
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];
                totalDiff += Math.abs(parseInt(currentUserScore)- parseInt(currentFriend));
            }
            if(totalDiff <= bestMatch.friendDiff){
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDiff = totalDiff;
            }
        }
        friends.push(userData);
        res.json(bestMatch);
    })
 }