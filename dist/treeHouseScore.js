"use strict";

var scoreEle = document.getElementById("treeHouseScore");
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(xhttp.responseText);
    scoreEle.innerText = data.points.total;
  }
};

xhttp.open("GET", "https://teamtreehouse.com/traffordfewster2.json", true);
xhttp.send();