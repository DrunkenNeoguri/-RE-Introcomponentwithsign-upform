const submitbtn = document.querySelector('[name="submitbtn"]');
const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const message1 = " cannot be empty";
const message2 = "Looks like this is not an email";
const message3 = "Thank You for Your Subscribe!";
let checkarray = []

submitbtn.addEventListener('click', FormVerifiedCheck);

function FormVerifiedCheck() {
    var inputdata = document.getElementsByClassName('form__input');
 
    for (var i = 0; i < inputdata.length; i++) {

        if (inputdata[i].name != "emailaddress") {

            if (inputdata[i].value == "") {
                InputErrorCodeCheck(inputdata[i].name, 1, i);
            } else {
                InputErrorCodeCheck(inputdata[i].name, 0, i);
            }

        } else if (inputdata[i].name == "emailaddress") {
            if (EmailAddressVerifiedCheck() == 0) {
                InputErrorCodeCheck(inputdata[i].name, 1, i);
            } else if (EmailAddressVerifiedCheck() == 1) {
                InputErrorCodeCheck(inputdata[i].name, 2, i);
            } else {
                InputErrorCodeCheck(inputdata[i].name, 0, i);
            }

        }
    }

    for (var j = 0; j < checkarray.length; j++) {
        if (checkarray[j] == "false") {
            return;
        }
    }

    alert(message3);
}


function EmailAddressVerifiedCheck() {
    var emailaddress = document.querySelector('[placeholder="Email Address"]').value;
    if (emailaddress == "") {
        return 0;
    } else if (emailaddress.match(emailformat)) {
        return 2;
    } else {
        return 1;
    }
}


function InputErrorCodeCheck (namevalue, errorcode, index) {
    var inputdata = document.querySelectorAll('.form__input', '[name="'+namevalue+'"]');
    var erroricon = document.querySelector('.form__erroricon'+"."+namevalue);
    var errorbox = document.querySelector('.form__errorbox'+"."+namevalue);
    
    if (errorcode == 0) {
        inputdata[index].style.border = "1px solid var(--base--blue)";
        checkarray[index] = "true";
        erroricon.style.visibility = "hidden";
        errorbox.style.display = "none";
        return;
    } 

    erroricon.style.visibility = "visible";
    errorbox.style.display = "block";
    inputdata[index].style.border = "1px solid var(--alert--red)";
    checkarray[index] = "false";

    if (errorcode == 1) {
        errorbox.textContent = errorbox.getAttribute('name') + message1;
    } else if (errorcode == 2) {
        errorbox.textContent = message2;
    }
}
