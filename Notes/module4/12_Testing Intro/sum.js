function sum(a, b) {
    if(a == Number(a) && b == Number(b)){
        return a + b;
    }else{
        return `Invalid Data Type`
    }
   
  }

// console.log(sum("yes", "no"))
module.exports = sum;