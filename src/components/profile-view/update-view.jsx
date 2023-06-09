import { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const UpdateView = (user, token, storedToken) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");



    const handleSubmit = (event) => {
        event.preventDefault();
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
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    };

    const updateInfo = () => {
        fetch(`https://myflixapplication.herokuapp.com/users/${user.user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${user.storedToken}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    alert("Could not update info");
                }
            })
            .then(user => {
                if (user) {
                    alert("Successfully changed information");
                }
            })
            .catch((e) => {
                console.log("Error: " + e);
            });
    }

    return (
        <Row className="justify-content-center customHeight">
            <Col md={10} className="my-auto">
                <div className="update-container" >
                    <h1><span className="my">Update</span><span className="flix">Info</span></h1>
                    <Form onSubmit={handleSubmit}>
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
                        <div className="text-center" style={{ marginTop: 50 }}>
                            <Link to={"/profile"}>
                                <Button type="submit" variant="success" onClick={updateInfo} className="edit-info-button">Save Changes</Button>
                            </Link>
                            <Link to={"/profile"}>
                                <Button variant="primary" className="delete-account-button">Cancel</Button>
                            </Link>
                        </div>
                    </Form>
                </div>
            </Col>
        </Row>

    )
}