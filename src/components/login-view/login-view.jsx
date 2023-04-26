import { useState } from "react";

const showPassword = () => {
    var passwordInput = document.getElementById("passwordInput1");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://myflixapplication.herokuapp.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((res) => res.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("User does not exist");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    };

    return (

        <form onSubmit={handleSubmit}>
            <h1>Log in</h1>
            <label>
                Username: <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minlength="4"
                    autocomplete="username"
                    required />

            </label><br /><br />
            <label>
                Password: <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minlength="4"
                    id="passwordInput1"
                    required />

            </label>
            <input type="checkbox" onClick={showPassword} />Show Password<br /><br />
            <button type="submit">
                Submit
            </button>
        </form>
    );
};