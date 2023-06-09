import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import {useState} from "react"

export const NavigationBar = ({ user, movies, setMovies, onLoggedOut, search, setSearch }) => {

return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top">
        <Container>
            <Navbar.Brand as={Link} to="/"><span className="my">My</span><span className="flix">Flix</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {!user && (
                    <>
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/signup" className="signup-button">
                                Signup
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login" className="login-button">
                                Login
                            </Nav.Link>
                        </Nav>
                    </>
                )}
                {user && (
                    <>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                id="searchInput"
                                type="search"
                                placeholder="Type movie name here!"
                                className="me-2"
                                aria-label="Search"
                                onChange={((e) => {setSearch(e.target.value)})}
                            />
                        </Form>
                        
                        <Nav>
                            <Nav.Link onClick={onLoggedOut} className="logout-button">Logout</Nav.Link>
                        </Nav>
                    </>
                )}
            </Navbar.Collapse>
        </Container>
    </Navbar >
)
}