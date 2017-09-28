var friends = require('../data/friends.js');

module.exports = function(app) {
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });

  app.post('/api/friends', function(req, res) {
    var newFriend = req.body;

    var bestMatch = {};

    for (var i = 0; i < newFriend.scores.length; i++) {
      if (newFriend.scores[i] == '1 (Strongly Disagree)') {
        newFriend.scores[i] = 1;
      } else if (newFriend.scores[i] == '5 (Strongly Agree)') {
        newFriend.scores[i] = 5;
      } else {
        newFriend.scores[i] = parseInt(newFriend.scores[i]);
      }
    }

    var bestMatchIndex = 0;
    var bestMatchDifference = 40;

    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;

      for (var index = 0; index < friends[i].scores.length; index++) {
        var differenceOneScore = Math.abs(
          friends[i].scores[index] - newFriend.scores[index]
        );
        totalDifference += differenceOneScore;
      }

      if (totalDifference < bestMatchDifference) {
        bestMatchIndex = i;
        bestMatchDifference = totalDifference;
      }
    }

    bestMatch = friends[bestMatchIndex];

    friends.push(newFriend);

    res.json(bestMatch);
  });
};
