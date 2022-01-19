//export function Token(token : any){
export function Token(token : {course : string, canProgram : boolean}){
    return function(constructor: Function){
        constructor.prototype.course = token.course;
        constructor.prototype.canProgram = token.canProgram;
        if(token.canProgram){
            constructor.prototype.program = function(){
                console.log("I am programming...");
            };
        }
    };
}
//reflection in java allow to access all type of variable or function vs prototype in javascript