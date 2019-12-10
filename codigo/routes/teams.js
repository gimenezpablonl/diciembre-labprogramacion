const express = require('express');
const adodb = require("node-adodb");
const connection = adodb.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=db.mdb;');
const router = express.Router();

router.route('/')
    .get((req, res)=> {
    if(req.session.userid){
    query = "SELECT Teams.TeamName, Teams.TeamID FROM Teams, Users WHERE Users.UserID = " + req.session.userid + " AND Teams.UserID = " + req.session.userid + ";";
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
    .post((req, res) => {
        console.log('/teams post');
        var query = "Insert INTO Teams (UserID, TeamName) values ('" + req.session.userid + "', '" + req.body.name + "')";
        console.log(query);
        connection
        .execute(query)
        .then(data => {
            console.log(JSON.stringify(data, null, 2));
        })
        .catch(error => {
            console.log(error);
         });
        res.json({status:"team added successfully"}); 
})

router.get('/create', (req, res) =>{
    if(req.session.username){
    res.render('addteam', {user: req.session.username, buy: true})
    }
    else{res.redirect('/');}
})

router.get('/:id', (req, res) => {
    if(req.session.username){
        query = "SELECT Players.PlayerID, Players.Lastname, Players.Number, Players.Salary FROM Players, Teams, Users WHERE Users.UserID = "+ req.session.userid +" AND Teams.UserID = " + req.session.userid + " AND Players.TeamID = " + req.params.id + " GROUP BY Players.PlayerID, Players.Lastname, Players.Number, Players.Salary;";
        console.log(query);
        connection
        .query(query)
        .then(data => {
            res.render('myteamsplayers', {user: req.session.username, teamplayers: data });
        })
        .catch(error => {
            console.log(error);
        });}
    else{res.redirect('/');}
})
module.exports = router;