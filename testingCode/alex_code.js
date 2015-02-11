function charSum (str) {
  //var a = str.replace(/[^0-9]/g, '')
  var sum = 0
  for (i=0; i<str.length; i++) {
    sum += parseInt(str[i]) || 0
  }
  return sum
}
