//Dotenv

const dotenv = require("dotenv");
dotenv.config();
const staticDir = process.env.STATIC_DIR;
const sessionSecret = process.env.SECRET_SESSION;

//Yargs

const argumentos = process.argv.slice(2);
const Yargs = require("yargs/yargs")(argumentos);

const args = Yargs
    .default({
        p: 8080
    })
    .alias({
        p:"port"
    })
    .argv;

//Conexion de Servidor

const express = require("express");
const app = express();
const PORT = args.port;
const server = app.listen( PORT , () => {
    console.log( `Server listening on port ${ server.address().port }` );
});
server.on( "error" , error => console.log(`Error en el servidor: ${error}` ) );

//Conexion con routers

const { viewsRouter } = require("./routes/viewsRouter");
const { AuthRouter } = require("./routes/auth.routes");

//Conexion de Sessions

const session = require("express-session");
const cookieParser = require("cookie-parser");

//Motor de plantilla

const handlebars = require("express-handlebars");
app.engine("handlebars" , handlebars.engine() );
app.set( "views" , __dirname+"/views" );
app.set("view engine" , "handlebars" );

//Interpretacion de formatos

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

//Servicio estaticos

app.use( express.static( __dirname+`/${staticDir}` ) );

//Conexion con Middleware de Autenticacion Passport

const passport = require("passport");

//Conexion con Base de datos 

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const { options } = require("./config/options");
const { RandomsRouter } = require("./routes/randoms.routes");


//Conexion con mongoose

mongoose.connect( options.mongoDB.url , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => {
    console.log("Base de datos conectada exitosamente!!");
});

//Configuracion de la session

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: options.mongoDB.url,
        ttl:600
    }),
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true
}));

//Configuracion de Passport

app.use( passport.initialize() );
app.use( passport.session() );

//Routes

app.use( viewsRouter );
app.use( AuthRouter );
app.use( "/api/randoms" , RandomsRouter );



