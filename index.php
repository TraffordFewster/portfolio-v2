<?php 
    require 'vendor/autoload.php';

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'vendor/phpmailer/phpmailer/src/Exception.php';
    require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
    require 'vendor/phpmailer/phpmailer/src/SMTP.php';
    $formNiceNames = [
        "first_name" => "First Name",
        "last_name" => "Last Name",
        "email" => "Email",
        "subject" => "Subject",
        "message" => "Message",
    ];

    $formResults = [];
    $formResults["first_name"] = isset($_POST["first_name"]) ? filter_input(INPUT_POST,"first_name",FILTER_SANITIZE_STRING) : "";
    $formResults["last_name"] = isset($_POST["last_name"]) ? filter_input(INPUT_POST,"last_name",FILTER_SANITIZE_STRING) : "";
    $formResults["email"] = isset($_POST["email"]) ? filter_input(INPUT_POST,"email",FILTER_SANITIZE_STRING) : "";
    $formResults["subject"] = isset($_POST["subject"]) ? filter_input(INPUT_POST,"subject",FILTER_SANITIZE_STRING) : "";
    $formResults["message"] = isset($_POST["message"]) ? filter_input(INPUT_POST,"message",FILTER_SANITIZE_STRING) : "";
    $emailSent = false;
    $errors = [];
    $elementErrors = [];
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        $requiredPosts = ["first_name", "last_name", "email", "message"];
        for ($i = 0; $i < count( $requiredPosts ); $i++)
        {
            $formItem = $requiredPosts[$i];
            if (strlen( $formResults[$requiredPosts[$i]] ) <= 0)
            {
                $errors[] = "{$formNiceNames[$formItem]} is required!";
                $elementErrors[$formItem] = true;
            }
        }

        if (!filter_var($formResults["email"], FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Invalid email format";
        }

        if (!$errors)
        {
            $mail = new PHPMailer(true);
            try {
                $mail->isSMTP();                                            //Send using SMTP
                $mail->Host       = $_ENV["SMTP_HOST"];                     //Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                $mail->Username   = $_ENV["SMTP_USERNAME"];                     //SMTP username
                $mail->Password   = $_ENV["SMTP_PASSWORD"];                               //SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
                $mail->Port       = 465;                                  //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
            
                $mail->setFrom('noreply@trafford.dev', 'Contact Form');
                $mail->addAddress('contact@trafford.dev');
                $mail->addReplyTo($formResults['email'], $formResults['first_name'] . " " . $formResults['last_name']);
            

                $mail->isHTML(true);                                  //Set email format to HTML
                $mail->Subject = $formResults['subject'];

                $mailBody = "<h1>Contact Form</h1> 
                    <h3>From: {$formResults['first_name']} {$formResults['last_name']}</h3>
                    <h5>{$formResults['email']}</h5>
                    <p>{$formResults['message']}</p>";

                $mail->Body    = $mailBody;
                $mail->send();
                header('Location: /?contactSent');
                exit;
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            };
        }
    }



?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php
    $title = "Home";
    include "includes/head.php"; 
    ?>

    <script src="dist/contactValidation.js" defer></script>
    <script src="dist/projectFiller.js" defer></script>
</head>
<body>

    <?php include "includes/sideMenu.php"; ?>

    <div id="projectModalBackground" style="display: none;">
        <div id="projectModal">
            <div id="PMImage" class="img" style="background-image:url('/img/projects/placeholder.png')"></div>
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
                        <li><a  target="_blank" id="PMGit" href="#" class="coolHover"><i class="fab fa-github-square"></i></a></li>
                        <li><a  target="_blank" id="PMLink" href="#" class="coolHover"><i class="fas fa-link"></i></a></li>
                    </ul>
                </div>
        
            </div>
        </div>
    </div>

    <main>
        <header class="mainPageHeader">
            <div id="titleHolder">
                <h1 class="animateTyping">My Name Is Trafford Fewster</h1>
                <h3 class="animateTyping typingDeley">I'm a developer</h3>
            </div>
        </header>


        <div id="projects">
            <article id="p0"></article>
            <article id="p1"></article>
            <article id="p2"></article>
            <article id="p3"></article>
            <article id="p4"></article>
            <article id="p5"></article>
        </div>


        <footer id="contact">
            <div id="contactDetails">
                <h4>Get In Touch</h4>
                <p>Send me a message with any queries of concerns you might have!</p>
                <h5><a class="coolHover" href="tel:07859878973">07859 878973</a></h5>
                <h5><a class="coolHover" href="mailto:contact@trafford.dev">contact@trafford.dev</a></h5>
                <p>I will try my best get back to you in a reasonable amount of time.</p>
            </div>
            <div id="contactForm">
                <?php 
                    if ($errors)
                    {
                        echo "<div class='errorBox'>";
                        
                        for ($i = 0; $i < count( $errors); $i++ )
                        {
                            echo " <p class='errorLine'>{$errors[$i]}</p>";
                        };

                        echo "</div>";
                    }
                ?>
                <?php
                    if (isset($_GET["contactSent"]))
                    {
                        echo "<div class='successBox'>";
                        echo "<p class='successLine'>Email Sent!</p>";
                        echo "</div>";
                    }
                ?>
                <form id="contactFormForm" action="/" method="POST" onsubmit="return validateContactForm();">
                    <fieldset <?php if ($emailSent) echo "disabled" ?>>
                        <div class="mr">
                            <label for="first_name">First Name <span class="required">*</span></label>
                            <input type="text" name="first_name" id="first_name" value="<?= $formResults["first_name"] ?>" class="<?php if (isset( $elementErrors["first_name"] )) echo 'errored' ?>">
                        </div>
                        <div class="ml">
                            <label for="last_name">Last Name <span class="required">*</span></label>
                            <input type="text" name="last_name" id="last_name" value="<?= $formResults["last_name"] ?>" class="<?php if (isset( $elementErrors["last_name"] )) echo 'errored' ?>">
                        </div>
                    </fieldset>
                    <fieldset <?php if ($emailSent) echo "disabled" ?>>
                        <div>
                            <label for="email">Email <span class="required">*</span></label>
                            <input type="email" name="email" id="email" value="<?= $formResults["email"] ?>" class="<?php if (isset( $elementErrors["email"] )) echo 'errored' ?>">
                        </div>
                    </fieldset>
                    <fieldset <?php if ($emailSent) echo "disabled" ?>>
                        <div>
                            <label for="subject">Subject</label>
                            <input type="text" name="subject" id="subject" value="<?= $formResults["subject"] ?>" class="<?php if (isset( $elementErrors["subject"] )) echo 'errored' ?>">
                        </div>
                    </fieldset>
                    <fieldset <?php if ($emailSent) echo "disabled" ?>>
                        <div>
                            <label for="message">Message <span class="required">*</span></label>
                            <textarea name="message" id="message" class="<?php if (isset( $elementErrors["message"] )) echo 'errored' ?>"><?= $formResults["message"] ?></textarea>
                        </div>
                    </fieldset>
                    <input id="submitButton" type="submit" value="Submit">
                </form>
            </div>
        </footer>
    </main>
    
</body>
</html>