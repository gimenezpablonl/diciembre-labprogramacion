const express = require('express');
const path = require('path');
const adodb = require("node-adodb");
const session = require("express-session");
const connection = adodb.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=db.mdb;');
const router = express.Router();

router.get('/:id', (req, res) => {
    query = "SELECT Users.username, Users.money, Teams.TeamName FROM Users, Teams WHERE Users.UserID = " + req.params.id + " AND Teams.UserID = " + req.params.id + ";    ";
    connection
    .query(query)
    .then(data => {
        res.json(data); 
    })
    .catch(error => {
      console.log(error)
    });
})

module.exports = router;