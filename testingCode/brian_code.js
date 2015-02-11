function charSum (str) {
  var sum = 0
  for (i = 0; i < str.length; i++) {
    if (parseInt(str[i])) {
      sum += parseInt(str[i])
      }
    }
  return sum
}
