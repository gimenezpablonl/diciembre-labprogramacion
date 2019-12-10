const express = require('express');
const adodb = require("node-adodb");
const connection = adodb.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=db.mdb;');
const router = express.Router();

router.get('/', (req, res) => {
    const teams = {};
    if(req.session.userid){
    query = "SELECT Teams.TeamName, Players.PlayerID, Players.Lastname, Players.Number, Players.Salary FROM Players, Teams, Users WHERE Users.UserID = " + req.session.userid + " AND Teams.UserID = " + req.session.userid + " AND Players.TeamID = Teams.TeamID;";
    connection
    .query(query)
    .then(data => {
        res.render('myteams', {user: req.session.username, teams: data});
    })
    .catch(error => {
      console.log(error)
    });
}
    else{
        res.redirect('/');
    }})
module.exports = router;