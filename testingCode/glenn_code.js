function charSum (str) {
  // Write your code here, and
  // return your final answer.
  var sum = 0
  
  str = str.replace(/[^0-9]/g, "")
  
  for(var x=0;x<str.length;x++){
    sum += parseInt(str[x])
  }
  
  return sum
}
