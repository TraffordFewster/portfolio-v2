"use strict";

var validateEmail = function validateEmail(email) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
};

var validateText = function validateText(string) {
  return string.length > 0;
};

var elements = [{
  "ele": document.getElementById("first_name"),
  "check": validateText
}, {
  "ele": document.getElementById("last_name"),
  "check": validateText
}, {
  "ele": document.getElementById("email"),
  "check": validateEmail
}, {
  "ele": document.getElementById("message"),
  "check": validateText
}];

var validateContactForm = function validateContactForm() {
  var hasErrored = false;

  for (var k = 0; k < elements.length; k++) {
    var data = elements[k];

    if (!data["check"](data["ele"].value)) {
      hasErrored = true;
      data["ele"].classList.add("errored");
    } else {
      data["ele"].classList.remove("errored");
    }
  }

  return !hasErrored;
};

var _loop = function _loop(k) {
  var ele = elements[k]["ele"];
  ele.addEventListener('change', function (event) {
    if (ele.classList.contains("errored")) {
      ele.classList.remove("errored");
    }
  });
};

for (var k = 0; k < elements.length; k++) {
  _loop(k);
}