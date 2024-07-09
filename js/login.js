const container = document.getElementById("container");
const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const button = document.getElementById("btn");


function validate() {
    if (username.value < 3) {
        alert("UserName must be more 3 characters");
        username.style.outlineColor = "red";
        username.focus()
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

    const user = {
        username: username.value,
        password: password.value,
    }

    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user),
    })


        .then(res => res.json())
        .then(data => {
            if(data.id) {
                localStorage.setItem('token', data.accessToken)
                localStorage.setItem('user', JSON.stringify(data))
                window.location.assign("http://127.0.0.1:5501/index.html")
            }

            if(data.message == "User Not found") {
                alert(data.message);
                username.focus();
                username.style.outlineColor = "red";
            }

            if(data.message == "Invalid Password!") {
                alert(data.message);
                password.focus();
                password.style.outlineColor = "red";
            }
        })

        .catch(err => {
            console.log(err);
        })

        .finally(function() {
            form.reset();
        })
})