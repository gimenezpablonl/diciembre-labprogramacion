const express = require('express');
const path = require('path');
const adodb = require("node-adodb");
const session = require("express-session");
const connection = adodb.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=db.mdb;');
const router = express.Router();
router.route('/')
    .get((req, res) => {
        console.log('/players/ get');
        query = "SELECT * FROM Players;";
        connection
        .query(query)
        .then(data => {
            res.render('players',{user: req.session.username, players: data}); 
        })
        .catch(error => {
          console.log(error)
        });
    })
    router.route('/buy')
    .get((req, res) => {
        console.log('/players/buy get');
        res.render('buy', {user: req.session.username,money: req.session.money, buy: true});
})
    .put((req, res) => {
        console.log('/players/buy put');
        query = "SELECT Salary FROM Players WHERE Players.PlayerID = "+ req.body.playerid +";";
        connection
        .query(query)
        .then(data => {
            if(req.session.money >= data[0].Salary){
                req.session.money -= data[0].Salary;
                var query = "UPDATE Players SET TeamID = " + req.body.teamid + " WHERE PlayerID = "+ req.body.playerid + ";";
                console.log(query);
                connection
                .execute(query)
                .then(data => {
                    var query = "UPDATE Users SET Users.Money = "+ req.session.money + " WHERE Users.UserID = " + req.session.userid + ";"
                    console.log(query);
                    connection.execute(query)
                    .catch(error => {
                       console.log(error);
                    });
                })
                .catch(error => {
                    console.log(error);
                 });
                }
            })
            res.redirect('/');
        })
router.route('/:id')
    .get((req, res) => {
        console.log('/players/:id get');
        res.render('buy', {user: req.session.username,money: req.session.money})
})
    .put((req, res) => {
        console.log('/players/:id put');
        var query = "UPDATE Players SET TeamID = 1 WHERE PlayerID = "+ req.body.id + ";";
        console.log(query);
        connection
        .execute(query)
        .then(data => {
            req.session.money += req.body.salary;
            var query = "UPDATE Users SET Users.Money = "+ req.session.money + " WHERE Users.UserID = " + req.session.userid + ";"
            console.log(query);
            connection.execute(query)
            .then(()=>{
                res.json('vendido');
            })
            .catch(error => {
               console.log(error);
            });
        })
        .catch(error => {
            console.log(error);
         });

    })
module.exports = router;