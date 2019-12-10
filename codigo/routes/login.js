const express = require('express');
const adodb = require("node-adodb");
const connection = adodb.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=db.mdb;');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        console.log('/ get');
        if(req.session.loggedin){
            res.render('index' ,{user: req.session.username,money: req.session.money});
        }
        else{
            res.render('login');
        }
    })

router.route('/login')
    .get((req, res) => {
        console.log('/login get');
        if (req.session.loggedin) {
            res.redirect('/');
        }
        else{
            res.render('login');
        }
    })
    .post((req, res, next) =>{
        console.log('/login post');
        query = "SELECT UserID, Money FROM Users WHERE Username = '"+ req.body.username + "' AND Passward = '" + req.body.password +"'";
        connection
            .query(query)
            .then(data => {
                if (data[0]){
                    req.session.loggedin = true;
                    req.session.username = req.body.username;
                    req.session.userid = data[0].UserID;
                    req.session.money = data[0].Money;
                    req.session.save();
                    res.json(req.session.userid);
                    }
                })
            .catch(error => {
                console.log(error);
            });
    })

router.route('/register')
    .get((req, res) => {
        console.log('/register get');
        res.render('register');
    })
    .post((req, res)=> {
        console.log('/register post');
        var query = "Insert INTO Users (Username, Passward) values ('" + req.body.username + "', '" + req.body.password + "')";
        console.log(query);
        connection
        .execute(query)
        .then(data => {
            console.log(JSON.stringify(data, null, 2));
        })
        .catch(error => {
            console.log(error);
         });
        res.json({status:"user added successfully"}); 
})


router.get('/logout', (req, res) => {
        req.session.loggedin = false;
        res.redirect('/');
})

module.exports = router;