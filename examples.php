<!DOCTYPE html>
<html lang="en">
<head>
    <?php
    $title = "Code";
    include "includes/head.php"; 
    ?>

    <link rel="stylesheet" href="dist/prism.css">
    <script src="dist/prism.js" defer></script>
    <script src="dist/exampleFiller.js" defer></script>
</head>
<body>

    <?php include "includes/sideMenu.php"; ?>

    <div id="projectModalBackground" style="display: none;">
        <div id="projectModal">
            <pre><code id="PMCode" class="language-lua">print('hello world')</code></pre>
            <div id="modalClose"><i id="modalCloseI" class="fas fa-times"></i></div>
            <div class="addPadding">
                <h4 id="PMTitle">Placeholder</h4>
                <p id="PMDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac sagittis nulla. Etiam interdum leo rhoncus nunc aliquet, quis commodo neque congue. Integer ultricies velit dolor, eget viverra dui tincidunt id. Nulla facilisi. Nullam posuere ligula in dolor porta egestas. Vivamus ac lacinia magna. Etiam congue leo ut quam iaculis mollis. Phasellus risus dolor, maximus sed dolor sit amet, porta aliquam lectus. Aliquam erat volutpat. Nullam faucibus diam vel rhoncus consectetur. Proin a lacus elementum, faucibus tortor eget, mollis leo.</p>
                <div id="flexHack">
                    <ul id="PMLanguages">
                        <li><i class="fab fa-html5"></i></li>
                        <li><i class="fab fa-css3-alt"></i></li>
                        <li><i class="fab fa-sass"></i></li>
                        <li><i class="fab fa-php"></i></li>
                    </ul>

                    <ul id="links">
                        <li><a target="_blank" id="PMGit" href="#" class="coolHover"><i class="fab fa-github-square"></i></a></li>
                        <li><a target="_blank" id="PMLink" href="#" class="coolHover"><i class="fas fa-link"></i></a></li>
                    </ul>
                </div>
        
            </div>
        </div>
    </div>

    <main>
        <header>
            <div id="titleHolder">
                <h1 class="animateTyping">Code Examples</h1>
                <h3></h3>
            </div>
        </header>

        <div id="examples">
            <article id="e0">
                <pre><code class="language-lua">print('hello world')</code></pre>
                <h3>Basic Hello World</h3>
                <button>Details <i class="fas fa-arrow-right" aria-hidden="true"></i></button>
            </article>
            <article id="e1"></article>
            <article id="e2"></article>
            <article id="e3"></article>
            <article id="e4"></article>
            <article id="e5"></article>
        </div>
    </main>
</body>
