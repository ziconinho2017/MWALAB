const fibonacci = function(number){
    if(Math.abs(number) <= 2)
        return 1;
    return fibonacci(Math.abs(number) - 1) + fibonacci(Math.abs(number) - 1);
}
console.log(fibonacci(30));
console.log(fibonacci(-15));