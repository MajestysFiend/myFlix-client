import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const NavigationBar = ({ user, movies, setMovies, onLoggedOut, search, setSearch }) => {

    return (
        <Navbar bg="light" variant="light" expand="lg" sticky="top">
            <Container>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 1 }}>
                    <Navbar.Brand as={Link} to="/"><span className="my">My</span><span className="flix">Flix</span></Navbar.Brand>
                </motion.div>
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
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 1 }}>
                                    <Nav.Link as={Link} to="/">
                                        Home

                                    </Nav.Link>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 1 }}>
                                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                </motion.div>
                            </Nav>
                            <Form className="d-flex">
                                <Form.Control
                                    id="searchInput"
                                    type="search"
                                    placeholder="Type movie name here!"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={((e) => { setSearch(e.target.value) })}
                                />
                            </Form>

                            <Nav>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 1 }}>
                                    <Nav.Link onClick={onLoggedOut} className="logout-button">Logout</Nav.Link>
                                </motion.div>
                            </Nav>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}