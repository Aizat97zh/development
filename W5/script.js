let display = document.getElementById("display");
let isPow = false;

function isNotAvailable() {
  return isEmpty() || isPow;
}

function isEmpty() {
  return display.value == "0";
}

function clear1() {
  display.value = "0";
  isPow = false;
}
function calc() {
  var expression = display.value;

  if (isPow) {
    isPow = false;
    expression = calcPow(expression);
  }  else {
    expression = eval(expression);
  }
  console.log(expression);
  display.value = expression;
}
function press(x) {
    if(display.value=="0"){
        display.value = x;
    }else
  {display.value += x;}
}

function sqr() {
  if (isNotAvailable()) {
    return;
  }
  var num = display.value;
  display.value = num * num;
}

function sqrt() {
  if (isNotAvailable()) {
    return;
  }
  var num = display.value;
  display.value = Math.sqrt(num);
}

function pow() {
  if (isNotAvailable()) {
    return;
  }
  display.value += "^";
  isPow = true;
}

function calcPow(expression) {
  let subStrings = expression.split("^");
  let num = subStrings[0];
  let pow = subStrings[1];
  let result = 1;
  for (let i = 0; i < pow; i++) {
    result *= num;
  }
  return result;
}

function factorial(){
    var num = display.value;
    var result = 1;
    for(let i=1; i<=num; i++){
        result *= i;
    } 

    display.value = result;
}