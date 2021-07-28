var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       let data = JSON.parse(xhttp.responseText).projects
       setupProjects(data);
    }
};
xhttp.open("GET", "/projects.json", true);
xhttp.send();

const projectModalElements = {
    "image" : document.getElementById("PMImage"),
    "title" : document.getElementById("PMTitle"),
    "desc" : document.getElementById("PMDescription"),
    "languages" : document.getElementById("PMLanguages"),
    "git" : document.getElementById("PMGit"),
    "link" : document.getElementById("PMLink")
}

const langs = {
    "HTML" : '<li><i class="devicon-html5-plain"></i></li>',
    "CSS" : '<li><i class="devicon-css3-plain"></i></li>',
    "PHP" : '<li><i class="devicon-php-plain"></i></li>',
    "LARAVEL" : '<li><i class="devicon-laravel-plain-wordmark"></i></li>',
    "SASS" : '<li><i class="devicon-sass-original"></i></li>',
    "JS" : '<li><i class="devicon-javascript-plain"></i></li>',
    "GULP" : '<li><i class="devicon-gulp-plain"></i></li>',
    "C#" : '<li><i class="devicon-csharp-plain"></i></li>',
    "SQL" : '<li><i class="devicon-mysql-plain"></i></li>',
    "COMPOSER" : '<li><i class="devicon-composer-line"></i></li>',
    // "" : '<li></li>',
    // "" : '<li></li>',
    // "" : '<li></li>',
    // "" : '<li></li>',
}

var projectModal = project => {
    projectModalElements.title.innerText = project.title;
    projectModalElements.image.style.backgroundImage = `url(${project.img})`;
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


    let langHTML = ""
    for (let i = 0; i < project.languages.length;i++)
    {
        let lang = project.languages[i];
        if (langs[lang])
        {
            langHTML += langs[lang];
        }
    }
    projectModalElements.languages.innerHTML = langHTML;

    document.getElementById("projectModalBackground").style.display = "block"
}

document.getElementById("projectModalBackground").onclick = e => {
    if (e.target === document.getElementById("projectModalBackground")) {
        document.getElementById("projectModalBackground").style.display = "none";
    }
}

var setupProjects = projectsArray => {
    for (let i = 0; i < projectsArray.length; i++)
    { 
        let project = projectsArray[i]
        let projHTML = `
            <div class="img" style="background-image: url(${project.img})">

            </div>
            <h4>${project.title}</h4>
            <button>Details <i class="fas fa-arrow-right"></i></button>
        `
        document.getElementById(`p${i}`).innerHTML = projHTML;
        document.getElementById(`p${i}`).onclick = () => {
            projectModal(project)
        }

    }
}
