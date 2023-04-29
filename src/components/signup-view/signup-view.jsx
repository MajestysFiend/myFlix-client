import "./signup-view.scss";
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
                alert("Welcome aboard, " + data.Username + "!");
                window.location.reload();
            } else {
                alert("Signup failed! :(");
            }
        });
    };

    return (
<<<<<<< Updated upstream
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
=======
        <div className="signup-container">
            <h1 className="logo"><span className="my">my</span><span className="flix">Flix</span></h1>
            <h2 className="logo"><span className="my">Sign </span><span className="flix">Up</span></h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="setUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Username"
                        minlength="4"
                    />
                </Form.Group>
                <Form.Group controlId="setPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="passwordInput2"
                        autocomplete="new-password"
                        placeholder="Password"
                        required
                        minlength="4"
                    />
                </Form.Group>
                <Form.Check
                    type="switch"
                    label="Show Password"
                    onClick={showPassword} /><br />
                <Form.Group controlId="setEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autocomplete="email"
                        placeholder="Email"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="setBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        autocomplete="bday"
                        required
                    />
                </Form.Group ><br />
                <div className="text-center">
                    <Button variant="outline-primary" type="submit">Sign me up!</Button>
                </div>
            </Form><br />
            <div className="text-center">
                <small>Already a member?</small><br />
                <Button>Login here!</Button>
            </div>

        </div>
>>>>>>> Stashed changes
    )
}