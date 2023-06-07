import { NavigationBar } from "../navigation-bar/navigation-bar";
import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateView } from "../profile-view/update-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { motion } from "framer-motion";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://myflixapplication.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((movies) => {
                setMovies(movies);
            });
    }, [token]);

    return (

        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null)
                    setToken(null);
                }}
            />
            <Row className="justify-content-center customHeight">
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (<Navigate to="/" />) : (
                                    <Col md={5} className="my-auto">
                                        <motion.div
                                            animate={{ scale: 1 }}
                                            initial={{ scale: 0 }}
                                            transition={{ type: "tween", duration: .5 }}>
                                            <LoginView
                                                onLoggedIn={(user, token) => {
                                                    setUser(user)
                                                    setToken(token)
                                                }} />
                                        </motion.div>
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />) : (
                                    <Col md={5} className="my-auto">
                                        <motion.div
                                            animate={{ scale: 1 }}
                                            initial={{ scale: 0 }}
                                            transition={{ type: "tween", duration: .5 }}>
                                            <SignupView />
                                        </motion.div>
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <>
                                        <Row className="justify-content-center">
                                            {movies.map((movie) => {
                                                return (

                                                    <Col className="mb-4" key={movie._id} sm={6} md={6} lg={4} xl={3}>
                                                        <MovieCard user={user} movie={movie} token={token} />
                                                    </Col>

                                                );
                                            })}
                                        </Row>
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <motion.div
                                            animate={{ scale: 1 }}
                                            initial={{ scale: 0 }}
                                            transition={{ type: "tween", duration: .5 }}>
                                            <MovieView
                                                movies={movies}
                                                user={user}
                                                token={token}
                                            />
                                        </motion.div>
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (<Navigate to="/login" replace />) :
                                    <Col md={8}>
                                        <ProfileView
                                            user={user}
                                            token={token}
                                            movies={movies}
                                            onLoggedOut={() => {
                                                setUser(null)
                                                setToken(null)
                                            }}
                                        />
                                    </Col>}
                            </>
                        }
                    />
                    <Route
                        path="/profile/update"
                        element={
                            <>
                                {!user ? (<Navigate to="/login" replace />) :
                                    <Col md={5}>
                                        <UpdateView
                                            user={user}
                                            token={token}
                                            storedToken={storedToken}
                                            setUser={setUser}
                                        />
                                    </Col>}
                            </>
                        }
                    />

                </Routes>
            </Row>
        </BrowserRouter>

    );
}
