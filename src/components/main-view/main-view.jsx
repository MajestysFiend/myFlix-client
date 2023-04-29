import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";
<<<<<<< Updated upstream
=======
import {Button} from "react-bootstrap"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

>>>>>>> Stashed changes

export const MainView = () => {

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

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

<<<<<<< Updated upstream
    if (!user) {
        return (
            <>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user)
                        setToken(token)
                    }} />
                <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        return (
            <MovieView
                movie={selectedMovie}
                onBackClick={() => {
                    setSelectedMovie(null);
                }}
            />
        );
    }
    if (movies.length === 0) {
        return <div>The movie list is empty</div>;
    }

    return (
        <div>
            {movies.map((movie) => {
                return (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                );
            })}
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </div>
=======
    return (
        <>
            <Row className="justify-content-md-center">
                {!user ? (
                    <Col md={4}>
                        <LoginView
                            onLoggedIn={(user, token) => {
                                setUser(user)
                                setToken(token)
                            }} />
                        <SignupView/>
                    </Col>
                ) : selectedMovie ? (
                    <Col md={8}>
                        <MovieView movie={selectedMovie}
                            onBackClick={() => { setSelectedMovie(null) }} /></Col>
                ) : movies.length === 0 ? (
                    <div>The movie list is empty</div>
                ) : (
                    <>
                        {movies.map((movie) => (
                            <Col className="mb-5" key={movie._id} md={3}>
                                <MovieCard
                                    movie={movie}
                                    onMovieClick={(newSelectedMovie) => {
                                        setSelectedMovie(newSelectedMovie);
                                    }}
                                />
                            </Col>
                        ))}
                        <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                    </>
                )}
            </Row>
        </>
>>>>>>> Stashed changes
    );

};