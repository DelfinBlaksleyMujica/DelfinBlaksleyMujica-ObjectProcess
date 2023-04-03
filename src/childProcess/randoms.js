const generateRandomNumbers = ( cant ) => {
    const randomNumbersArr = [];
    for (let i = 0; i < cant; i++) {
        const randomNumber = Math.floor(Math.random() * 1000);
        randomNumbersArr.push(randomNumber);
    }
    let randomNumbWithQty = randomNumbersArr.reduce(function( prev , cur ) {
        prev[cur] = ( prev[cur] || 0 ) + 1;
        return prev;
    } , {} );
    return randomNumbWithQty;
}

//Recibo mensaje del padre

process.on("message" , ( parentMsg ) => {
        const objeto = parentMsg.cant;
        if (objeto == undefined) {
            const resultado = generateRandomNumbers(100000000);
            process.send(resultado);
        }else{
            const resultado = generateRandomNumbers(objeto);
            process.send( resultado );
        }
        
});

module.exports = { generateRandomNumbers };