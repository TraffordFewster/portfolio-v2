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
  "HTML": '<li title="HTML5"><i class="devicon-html5-plain"></i></li>',
  "CSS": '<li title="CSS3"><i class="devicon-css3-plain"></i></li>',
  "PHP": '<li title="PHP"><i class="devicon-php-plain"></i></li>',
  "LARAVEL": '<li title="Laravel"><i class="devicon-laravel-plain-wordmark"></i></li>',
  "SASS": '<li title="Sass"><i class="devicon-sass-original"></i></li>',
  "JS": '<li title="Javascript"><i class="devicon-javascript-plain"></i></li>',
  "GULP": '<li title="Gulp.js"><i class="devicon-gulp-plain"></i></li>',
  "C#": '<li title="C#"><i class="devicon-csharp-plain"></i></li>',
  "SQL": '<li title="SQL"><i class="devicon-mysql-plain"></i></li>',
  "COMPOSER": '<li title="Composer"><i class="devicon-composer-line"></i></li>',
  "BOOTSTRAP": '<li title="Bootstrap"><i class="devicon-bootstrap-plain"></i></li>',
  "GIT": '<li><i class="devicon-git-plain"></i></li>',
  "VUE": '<li><i class="devicon-vuejs-plain"></i></li>' // "" : '<li></li>',

};

var projectModal = function projectModal(project) {
  projectModalElements.title.innerText = project.title;
  projectModalElements.image.style.backgroundImage = "url(".concat(project.img, ")");
  projectModalElements.desc.innerHTML = project.description;

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
  if (e.target === document.getElementById("projectModalBackground") || e.target === document.getElementById("modalCloseI")) {
    document.getElementById("projectModalBackground").style.display = "none";
  }
};

var setupProjects = function setupProjects(projectsArray) {
  var _loop = function _loop(i) {
    var project = projectsArray[i];
    var projHTML = "\n            <div class=\"img\" style=\"background-image: url(".concat(project.img, ")\">\n\n            </div>\n            <h4>").concat(project.title, "</h4>\n            <button>Details <i class=\"fas fa-arrow-right\"></i></button>\n        ");
    var element = document.createElement("article");
    element.innerHTML = projHTML;

    element.onclick = function () {
      projectModal(project);
    };

    document.getElementById("projects").appendChild(element);
  };

  for (var i = 0; i < projectsArray.length; i++) {
    _loop(i);
  }
};