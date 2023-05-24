import dayjs from "dayjs";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, movies, token, onLoggedOut }) => {

    const birthday = dayjs(user.Birthday).format("MM/DD/YYYY");

    const removeFromFavorites = (movieId) => {
        fetch(`https://myflixapplication.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movieId)}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json"
        })
            .then(res => {
                if (res.ok) {
                    alert("Movie removed from favorites!")
                    return (res.json)
                } else {
                    alert("Could not remove movie");
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
            <Col className="mb-4" key={movie._id} xs={12} md={6}>
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
        <div className="profile-container">
            <Col className="text-center">
                <h1><span className="my">my</span><span className="flix">Profile</span></h1>
                <p className="label">Username</p>
                <span className="profile-info">{user.Username}</span><br />
                <p className="label">Birthday</p>
                <span className="profile-info">{birthday}</span><br />
                <p className="label">Email</p>
                <span className="profile-info">{user.Email}</span><br />
                <Link to={"/profile/update"}>
                    <Button>Edit User Info</Button>
                </Link>
                <Button onClick={deleteAccount}>Delete Account</Button>
            </Col>
            <Row>
                <Col xs={12} className="text-center">
                    <h2><span className="my">Favorite</span> <span className="flix">Movies</span></h2>
                </Col>
            </Row>
            <div className="favorites-container">
                <Row>
                    {displayFavorite}
                </Row>
            </div>
        </div>
    )
}