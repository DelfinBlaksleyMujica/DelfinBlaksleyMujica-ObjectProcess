//Conexion con express y Router

const Router = require("express").Router;

const router = Router();

//Child Process

const { fork } = require("child_process");
const { generateRandomNumbers } = require("../childProcess/randoms");


//Endpoints

/*GET*/

router.get("/" , ( req , res ) => {
        const child = fork("./src/childProcess/randoms.js");
        const cant = req.query;
        child.send(cant);
        child.on("message" , ( childMsg ) => {
            console.log("Mensaje del hijo: " , childMsg );
            res.send({ message: childMsg });
        })
});

module.exports = { RandomsRouter: router };