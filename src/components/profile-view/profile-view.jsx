import dayjs from "dayjs";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, movies }) => {

    const birthday = dayjs(user.Birthday).format("MM/DD/YYYY");

    const favoriteMovies = movies.filter((movie) => {
        if (user.FavoriteMovies.includes(movie._id)) {
            return (
                movie
            )

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
                        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                            <Button variant="primary" className="seemore-button">See More</Button>
                        </Link>
                    </div>
                </Card>
            </Col>
        )
    })

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