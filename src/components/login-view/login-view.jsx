import "./login-view.scss";
import { SignupView } from "../signup-view/signup-view";
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
                    alert("Welcome back, " + username + "!");
                } else {
                    alert("User does not exist");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    };

    return (

<<<<<<< Updated upstream
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
=======
        <div className="login-container">
            <h1 className="logo"><span className="my">my</span><span className="flix">Flix</span></h1>
            <h2 className="logo"><span className="my">Log</span><span className="flix">in</span></h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="forUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        minlength="4"
                        autocomplete="username"
                        placeholder="Username"
                        required />
                </Form.Group>

                <Form.Group controlId="forPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minlength="4"
                        id="passwordInput1"
                        placeholder="Password"
                        required />
                </Form.Group>

                <Form.Check
                    type="switch"
                    label="Show Password"
                    onClick={showPassword} /><br />
                <div className="text-center">

                    <Button variant="outline-primary" type="submit">
                        Login
                    </Button><br /><br /></div>
            </Form>
            <div className="text-center">
                <small>Not already a member?</small><br />
                <Button variant="primary" onClick= {() => (<SignupView />)}>Sign Up Now!</Button>
            </div>
        </div>
>>>>>>> Stashed changes
    );
};