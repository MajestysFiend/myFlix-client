import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, movies, setMovies, onLoggedOut }) => {


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