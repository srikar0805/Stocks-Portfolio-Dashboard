function validatepassword() {
    let pw1 = document.getElementById("validationCustom03").value;
    let pw2 = document.getElementById("validationCustom04").value;
    if (pw1 != pw2) {

        document.getElementById("message2").innerHTML = "Passwords are not same";
        return false;
    } else {
        document.getElementById("message2").innerHTML = "";
        return true;
    }
}

function validateForm() {
    if (validatepassword()) {
        document.getElementById("bt").disabled = false;

        return true;
    } else {
        document.getElementById("bt").disabled = true;

        return false;
    }
}