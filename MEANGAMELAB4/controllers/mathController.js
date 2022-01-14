module.exports.multiply = function(req,res){
    console.log("Multiply Request Received in Math Controller");
    const number1 = parseInt(req.params.number1);
    const number2 = parseInt(req.query.number2);
    res.status(200).json(number1*number2);
}
