import { motion } from "framer-motion";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoginView } from "../login-view/login-view";

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
                alert("Signup successful!");
                return <LoginView/>
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <motion.div className="signup-container"
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ type: "tween", duration: .5 }}>
            <div className="text-center">
                <h1><span className="my">My</span><span className="flix">Flix</span></h1>
                <h2><span className="my">Sign</span><span className="flix">up</span></h2>
            </div>
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
                <motion.div className="text-center"
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 1 }}>
                    <Button variant="primary" type="submit">Sign Me Up!</Button>
                </motion.div>
            </Form>
            <div className="text-center"><br /><br />
                <small>Already a member? </small>
                <Link to="/login">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 1 }}>
                        <Button variant="primary">Log in Now!</Button>
                    </motion.div>
                </Link>
            </div>
        </motion.div>

    )
}