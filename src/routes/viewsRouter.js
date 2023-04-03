//Conexion al servidor

const express = require("express");

//Global Process

const processId = process.pid;
const nodeVersion = process.version;
const nombreDeLaPlataforma = process.platform;
const memoriaTotalReservada = JSON.stringify(process.memoryUsage.rss());
const carpetaDelProyecto = process.cwd();
const argumentosDeEntrada = process.argv;
const processPath = process.execPath;

//Router

const router = express.Router();

//Conexion con MiddleWares Locales

const { checkUserLogged, userNotLogged , isValidToken } = require("../middlewares/auth");


router.get("/" , checkUserLogged , ( req , res ) => {
    res.render("home" , { username: req.session.username });
} );

router.get("/perfil" , isValidToken ,  ( req , res ) => {
        res.render("profile" , { username: req.user.username })
});


router.get("/logout" , ( req , res ) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
            res.redirect("/")
        } else {
            console.log("Se cerro la sesion correctamente");
            res.render("logout")
        }
    })
});

router.get("/info" , ( req, res ) => {

    res.render("serverInfo", { argumentosDeEntrada: argumentosDeEntrada , nombreDeLaPlataforma: nombreDeLaPlataforma , versionNode: nodeVersion , memoriaTotalReservada: memoriaTotalReservada , pathDeEjecucion: processPath , processId: processId , carpetaDelProyecto: carpetaDelProyecto  });
})

module.exports = { viewsRouter: router };