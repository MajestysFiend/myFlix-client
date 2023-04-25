import { useState } from "react";

const showPassword = () => {
    var passwordInput = document.getElementById("passwordInput2");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();


        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://myflixapplication.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.ok) {
                alert("Signup successful! :D");
                window.location.reload();
            } else {
                alert("Signup failed! :(");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minlength="4"
                />
            </label><br /><br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="passwordInput2"
                    autocomplete="new-password"
                    required
                    minlength="4"
                />
            </label>
            <input type="checkbox" onClick={showPassword} />Show Password<br /><br />
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autocomplete="email"
                    required
                />
            </label><br /><br />
            <label>
                Birthday:
                <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    autocomplete="bday"
                    required
                />
            </label><br /><br />
            <button type="submit">Submit</button>
        </form>
    )
}