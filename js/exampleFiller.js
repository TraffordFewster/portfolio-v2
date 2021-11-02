const projectModalElements = {
    "codeBlock" : document.getElementById("PMCode"),
    "title" : document.getElementById("PMTitle"),
    "desc" : document.getElementById("PMDescription"),
    "languages" : document.getElementById("PMLanguages"),
    "git" : document.getElementById("PMGit"),
    "link" : document.getElementById("PMLink")
}

const langs = {
    "html" : '<li title="HTML5"><i class="devicon-html5-plain"></i></li>',
    "css" : '<li title="CSS3"><i class="devicon-css3-plain"></i></li>',
    "php" : '<li title="PHP"><i class="devicon-php-plain"></i></li>',
    "scss" : '<li title="Sass"><i class="devicon-sass-original"></i></li>',
    "javascript" : '<li title="Javascript"><i class="devicon-javascript-plain"></i></li>',
    "c#" : '<li title="C#"><i class="devicon-csharp-plain"></i></li>',
    "sql" : '<li title="SQL"><i class="devicon-mysql-plain"></i></li>',
    "vue" : '<li title="Vue.js"><i class="devicon-vuejs-plain"></i></li>',
}

var projectModal = project => {

    let prismLang = project.language;
    if (prismLang == "vue"){
        prismLang = "js";
    } 

    projectModalElements.title.innerText = project.title;
    projectModalElements.codeBlock.innerHTML = project.code;
    projectModalElements.codeBlock.className = `language-${prismLang}`
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


    let langHTML = ""
    if (langs[project.language])
    {
        langHTML += langs[project.language];
    }
    projectModalElements.languages.innerHTML = langHTML;

    document.getElementById("projectModalBackground").style.display = "block"
    Prism.highlightAll()
}

document.getElementById("projectModalBackground").onclick = e => {
    if (e.target === document.getElementById("projectModalBackground") || e.target === document.getElementById("modalCloseI")) {
        document.getElementById("projectModalBackground").style.display = "none";
    }
}

var setupExamples = projectsArray => {
    for (let i = 0; i < projectsArray.length; i++)
    {
        let project =  projectsArray[i];
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let project = projectsArray[i]
                project.code = xhttp.responseText
                let prismLang = project.language;
                if (prismLang == "vue"){
                    prismLang = "js";
                } 
                let projHTML = `
                    <pre><code class="language-${prismLang}">${project.code}</code></pre>
                    <h3>${project.title}</h3>
                    <button>Details <i class="fas fa-arrow-right" aria-hidden="true"></i></button>
                `
                // let element = document.getElementById(`e${i}`);
                let element = document.createElement("article")
                element.innerHTML = projHTML;
                element.onclick = () => {
                    projectModal(project)
                }
                document.getElementById("examples").appendChild(element)
                Prism.highlightAll()
            }
        };
        xhttp.open("GET", `${project.code}`, true);
        xhttp.send();

    }
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       let data = JSON.parse(xhttp.responseText).codeExamples
       setupExamples(data);
    }
};
xhttp.open("GET", "/projects.json", true);
xhttp.send();
