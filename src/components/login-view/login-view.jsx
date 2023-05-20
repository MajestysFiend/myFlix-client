import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

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
        <AnimatePresence>
            <motion.div className="login-container"
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                transition={{ type: "tween", duration: .5 }}>
                <div className="text-center">
                    <h1><span className="my">my</span><span className="flix">Flix</span></h1>
                    <h2><span className="my">Log</span><span className="flix">in</span></h2>
                </div>
                <motion.Form onSubmit={handleSubmit}>
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
                        </Button>
                    </div>
                </motion.Form>
                <div className="text-center"><br /><br />
                    <small>Not already a member? </small>
                    <Link to="/signup">
                        <Button variant="primary">Sign Up Now!</Button>
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};