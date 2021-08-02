"use strict";

var projectModalElements = {
  "codeBlock": document.getElementById("PMCode"),
  "title": document.getElementById("PMTitle"),
  "desc": document.getElementById("PMDescription"),
  "languages": document.getElementById("PMLanguages"),
  "git": document.getElementById("PMGit"),
  "link": document.getElementById("PMLink")
};
var langs = {
  "html": '<li><i class="devicon-html5-plain"></i></li>',
  "css": '<li><i class="devicon-css3-plain"></i></li>',
  "php": '<li><i class="devicon-php-plain"></i></li>',
  "scss": '<li><i class="devicon-sass-original"></i></li>',
  "javascript": '<li><i class="devicon-javascript-plain"></i></li>',
  "c#": '<li><i class="devicon-csharp-plain"></i></li>',
  "sql": '<li><i class="devicon-mysql-plain"></i></li>'
};

var projectModal = function projectModal(project) {
  projectModalElements.title.innerText = project.title;
  projectModalElements.codeBlock.innerHTML = project.code;
  projectModalElements.codeBlock.className = "language-".concat(project.language);
  projectModalElements.desc.innerHTML = project.description;

  if (project.git) {
    projectModalElements.git.style.display = null;
    projectModalElements.git.href = project.git;
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

  if (langs[project.language]) {
    langHTML += langs[project.language];
  }

  projectModalElements.languages.innerHTML = langHTML;
  document.getElementById("projectModalBackground").style.display = "block";
  Prism.highlightAll();
};

document.getElementById("projectModalBackground").onclick = function (e) {
  if (e.target === document.getElementById("projectModalBackground")) {
    document.getElementById("projectModalBackground").style.display = "none";
  }
};

var setupExamples = function setupExamples(projectsArray) {
  var _loop = function _loop(i) {
    var project = projectsArray[i];
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var _project = projectsArray[i];
        _project.code = xhttp.responseText;
        var projHTML = "\n                    <pre><code class=\"language-".concat(_project.language, "\">").concat(_project.code, "</code></pre>\n                    <h3>").concat(_project.title, "</h3>\n                    <button>Details <i class=\"fas fa-arrow-right\" aria-hidden=\"true\"></i></button>\n                ");
        var element = document.getElementById("e".concat(i));
        element.innerHTML = projHTML;

        element.onclick = function () {
          projectModal(_project);
        };

        Prism.highlightAll();
      }
    };

    xhttp.open("GET", "".concat(project.code), true);
    xhttp.send();
  };

  for (var i = 0; i < projectsArray.length; i++) {
    _loop(i);
  }
};

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(xhttp.responseText).codeExamples;
    setupExamples(data);
  }
};

xhttp.open("GET", "/projects.json", true);
xhttp.send();