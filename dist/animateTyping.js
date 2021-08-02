"use strict";

var typingList = document.querySelectorAll(".animateTyping");

var TypeIt = function TypeIt(element) {
  var endGoal = element.innerHTML;
  var length = endGoal.length;
  var speed = 50;
  var extraDeley = 0;
  element.innerHTML = "&zwnj;";

  if (element.classList.contains('typingDeley')) {
    extraDeley = 1300;
  }

  var _loop = function _loop(_currentCount) {
    setTimeout(function () {
      console.log(_currentCount);
      element.innerHTML = endGoal.substr(0, ++_currentCount);
    }, _currentCount * speed + extraDeley);
    currentCount = _currentCount;
  };

  for (var currentCount = 0; currentCount < length; currentCount++) {
    _loop(currentCount);
  }
};

for (var i = 0; i < typingList.length; i++) {
  var item = typingList[i];
  TypeIt(item);
}