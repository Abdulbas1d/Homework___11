const container = document.getElementById("container");
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("btn");


function validate() {
    if (username.value < 3) {
        alert("UserName must be more 3 characters");
        username.style.outlineColor = "red";
        username.focus()
        return false
    }

    if (email.value < 3) {
        alert("Email must be more 3 characters");
        email.style.outlineColor = "red";
        email.focus()
        return false
    }

    if (password.value < 3) {
        alert("Password must be more 3 characters");
        password.style.outlineColor = "red";
        password.focus()
        return false
    }

    return true
}

button && button.addEventListener('click', function (event) {
    event.preventDefault()
    const isValid = validate()

    if (!isValid) {
        return
    }

    const user = {
        username: username.value,
        email: email.value,
        password: password.value,
    }

    fetch('https://auth-rg69.onrender.com/api/auth/signup', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })

        .then(res => res.json())
        .then(data => {
            if (data.message == "Failed! Username is already in use!") {
                alert(data.message)
            }

            if (data.message == "Failed! Email is already in use!") {
                alert(data.message)
            }

            if (data.message == "User registered succesfully!") {
                window.location.assign('http://127.0.0.1:5501../pages/login.html');
            }
        })
        .catch(err => {
            console.log(err);
        })

        .finally(function () {
            form.reset();
        })

})