"use strict";

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(xhttp.responseText).projects;
    setupProjects(data);
  }
};

xhttp.open("GET", "/projects.json", true);
xhttp.send();
var projectModalElements = {
  "image": document.getElementById("PMImage"),
  "title": document.getElementById("PMTitle"),
  "desc": document.getElementById("PMDescription"),
  "languages": document.getElementById("PMLanguages"),
  "git": document.getElementById("PMGit"),
  "link": document.getElementById("PMLink")
};
var langs = {
  "HTML": '<li><i class="fab fa-html5"></i></li>',
  "CSS": '<li><i class="fab fa-css3-alt"></i></li>',
  "PHP": '<li><i class="fab fa-php"></i></li>',
  "LARAVEL": '<li><i class="fab fa-laravel"></i></li>',
  "SASS": '<li><i class="fab fa-sass"></i></li>',
  "JS": '<li><i class="fab fa-js-square"></i></li>'
};

var projectModal = function projectModal(project) {
  projectModalElements.title.innerText = project.title;
  projectModalElements.image.style.backgroundImage = "url(".concat(project.img, ")");
  projectModalElements.desc.innerText = project.description;

  if (project.github) {
    projectModalElements.git.style.display = null;
    projectModalElements.git.href = project.github;
  } else {
    projectModalElements.git.style.display = "none";
  }

  if (project.link) {
    projectModalElements.link.style.display = null;
    projectModalElements.link.href = project.link;
  } else {
    projectModalElements.link.style.display = "none";
  }

  var langHTML = "";

  for (var i = 0; i < project.languages.length; i++) {
    var lang = project.languages[i];

    if (langs[lang]) {
      langHTML += langs[lang];
    }
  }

  projectModalElements.languages.innerHTML = langHTML;
  document.getElementById("projectModalBackground").style.display = "block";
};

document.getElementById("projectModalBackground").onclick = function (e) {
  if (e.target === document.getElementById("projectModalBackground")) {
    document.getElementById("projectModalBackground").style.display = "none";
  }
};

var setupProjects = function setupProjects(projectsArray) {
  var _loop = function _loop(i) {
    var project = projectsArray[i];
    var projHTML = "\n            <div class=\"img\" style=\"background-image: url(".concat(project.img, ")\">\n\n            </div>\n            <h4>").concat(project.title, "</h4>\n            <button>Details <i class=\"fas fa-arrow-right\"></i></button>\n        ");
    document.getElementById("p".concat(i)).innerHTML = projHTML;

    document.getElementById("p".concat(i)).onclick = function () {
      projectModal(project);
    };
  };

  for (var i = 0; i < projectsArray.length; i++) {
    _loop(i);
  }
};