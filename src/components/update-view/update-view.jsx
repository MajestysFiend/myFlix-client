import { Button, Form, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProfileView } from "../profile-view/profile-view";

export const UpdateView = (user, setUser, storedToken) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const setInfo = () => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }

    const showPassword = () => {
        var passwordInput = document.getElementById("passwordInput1");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }
    const data = {
        username,
        password,
        email,
        birthday

    };
    fetch(`https://myflixapplication.herokuapp.com/users/${user.Username}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((res) => {
            console.log("Updated info: ", res);
            alert("Your info has been updated!");
        })
        .then(user => {
            if (user) {
                setInfo(user);
            }
        })
        .catch((e) => {
            console.log("Error: " + e);
        });

    console.log(user);

    return (
        <div className="update-container" >
            <Row className="justify-content-center customHeight">
                <Col md={10} className="my-auto">
                    <Form onSumbit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                minlength="4"
                                id="usernameInput2"
                                autocomplete="username"
                                placeholder={user.Username}
                                required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minlength="4"
                                id="passwordInput1"
                                placeholder={user.Password}
                                required />
                        </Form.Group>

                        <Form.Check
                            type="switch"
                            label="Show Password"
                            onClick={showPassword} />
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                minlength="6"
                                id="emailInput2"
                                placeholder={user.Email}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                id="birthdayInput2"
                                placeholder={user.Birthday}
                                required />
                        </Form.Group>
                        <Link to={"/profile"}>
                            <Button type="submit">Save Changes</Button>
                        </Link>
                        <Link to={"/profile"}>
                            <Button>Cancel</Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}