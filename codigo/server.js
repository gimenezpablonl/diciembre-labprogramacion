const express = require("express");
const exphbs  = require('express-handlebars');
const session = require("express-session");
const path = require('path');
const bodyParser = require("body-parser");
const adodb = require("node-adodb");
const connection = adodb.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=db.mdb;');
const app = express();

// SETTINGS
app.use(express.static(path.join(__dirname + '/public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    cookie: {
      path    : '/',
      httpOnly: false,
      maxAge  : 24*60*60*1000
    },
    secret: '1234567890QWERT',
    resave: true,
    saveUninitialized: true
  }));
app.set("port", process.env.PORT || 3000);

// ROUTES
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const playersRouter = require("./routes/players");
const teamsRouter = require("./routes/teams");
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/players", playersRouter);
app.use("/myteams", teamsRouter);

app.listen(app.get('port'), () => {
    console.log('Server is running on port:', app.get('port'));
})
