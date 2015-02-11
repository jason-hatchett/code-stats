function charSum (str) {
  // Write your code here, and
  // return your final answer.
  var sum = 0
  
  for (i = 0; i < str.length; i++){
    //var num = parseInt(str[i]) || 0;
    //sum += num
    sum += parseInt(str[i]) || 0;
  }
  
  return sum
  
}
