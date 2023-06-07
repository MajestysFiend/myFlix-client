import dayjs from "dayjs";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export const ProfileView = ({ user, movies, token, onLoggedOut }) => {

    const [rerender, setRerender] = useState("Yes, please!")

    const birthday = dayjs(user.Birthday).format("MMMM D, YYYY");

    // Remove from favorites function (not working properly)
    const removeFromFavorites = (movieId) => {

        fetch(`https://myflixapplication.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movieId)}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json"
        })
            .then(res => {
                if (res.ok) {
                    alert("Movie removed from favorites")
                    return res.json;
                } else {
                    alert("Could not remove movie");
                }
            })
            .then(() => {
                if (rerender === "Yes, please!") {
                    setRerender("Do it!")
                } else {
                    setRerender("Yes, please!")
                }

            })
            .catch((e) => {
                alert("Error: " + e);
            });
    }

    const favoriteMovies = movies.filter((movie) => {
        if (user.FavoriteMovies.includes(movie._id)) {
            return (movie);
        }
    })

    const displayFavorite = favoriteMovies.map((movie) => {
        return (
            <Col className="mb-4" key={movie._id} xs={12} sm={12} md={12} lg={12} xl={6}>
                <Card className="moviecard">
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body className="text-center card-body">
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>{movie.Director.Name}
                        </Card.Text>
                    </Card.Body>
                    <div class="card-footer">
                        <Button variant="danger"
                            className="seemore-button"
                            onClick={() => { removeFromFavorites(movie._id) }}>Remove</Button>
                    </div>
                </Card>
            </Col>
        )
    });

    const deleteAccount = () => {
        fetch(`https://myflixapplication.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json"
        })
            .then(res => {
                if (res.ok) {
                    window.confirm("Are you sure you want to delete your account?")
                    alert("Your account has been deleted");
                    onLoggedOut();
                } else {
                    alert("Could not delete account");
                }
            })
            .catch(e => {
                alert(e);
            });
    }

    return (
        <>
            <div className="profile-container">
                <Row>
                    <Col className="text-center">
                        <h1><span className="my">my</span><span className="flix">Profile</span></h1>
                        <p className="label">Username</p>
                        <span className="profile-info">{user.Username}</span><br />
                        <p className="label">Birthday</p>
                        <span className="profile-info">{birthday}</span><br />
                        <p className="label">Email</p>
                        <span className="profile-info">{user.Email}</span><br />
                        <Link to={"/profile/update"}>
                            <Button className="edit-info-button">Edit User Info</Button>
                        </Link>
                        <Button onClick={deleteAccount} className="delete-account-button">Delete Account</Button>
                    </Col>
                </Row>

            </div>
            <div className="profile-container">
                <Row>
                    <Col className="text-center">
                        <h2><span className="my">Favorite</span> <span className="flix">Movies</span></h2>
                    </Col>
                </Row>
                <Container>
                    <Row className="justify-content-center">
                        <div className="favorites-container animated_gradient2">
                            {displayFavorite}
                        </div>
                    </Row>
                </Container>
            </div >
        </>

    )
}