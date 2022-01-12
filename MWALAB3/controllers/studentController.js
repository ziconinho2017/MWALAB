const studentData = require("../data/school.json");
module.exports.getAllStudents = function(req,res){
    console.log("GET Received in School Controller");
    res.status(200).json(studentData);
}
module.exports.getOne = function(req,res){
    const studentDataById = studentData.filter(s => s.StudenId == req.params.studentId);
    res.status(200).json(studentDataById);
}