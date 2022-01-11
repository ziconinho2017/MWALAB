const fibonacci = function(number){
    if(Math.abs(number) <= 2)
        return 1;
    return fibonacci(Math.abs(number) - 1) + fibonacci(Math.abs(number) - 1);
}
console.log("2 : Fibonacci of 30 :"+fibonacci(30));
console.log("3 : Fibonacci of -15 :"+fibonacci(-15));