var validateEmail = email => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
}

var validateText = string => {
    return string.length > 0;
}

var elements = [
    {
        "ele" : document.getElementById("first_name"),
        "check" : validateText,
    },
    {
        "ele" : document.getElementById("last_name"),
        "check" : validateText,
    },
    {
        "ele" : document.getElementById("email"),
        "check" : validateEmail,
    },
    {
        "ele" : document.getElementById("message"),
        "check" : validateText,
    }
]

var validateContactForm = () => {
    let hasErrored = false;
    for (let k = 0; k < elements.length; k++)
    {
        let data = elements[k];
        console.log(elements[k])
        console.log(data["ele"].value)
        if (!data["check"](data["ele"].value))
        {
            hasErrored = true;
            data["ele"].classList.add("errored")
        } else {
            data["ele"].classList.remove("errored")
        }
    }
    return !hasErrored
}